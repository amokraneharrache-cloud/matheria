'use server';

import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { buildConsentFields, normalizeAcquisitionSource } from '@/lib/email/consent';
import { logStep } from '@/lib/safeLog';
import type { SupabaseClient } from '@supabase/supabase-js';

const SCOPE = 'diagnostic/saveLead';
// Code Postgres pour une violation de contrainte unique (doublon).
const POSTGRES_UNIQUE_VIOLATION = '23505';
type LeadClientMode = 'admin' | 'anon' | 'mock';

export type LeadData = {
  parent_email: string;
  student_pseudo?: string;
  exam_goal: string;
  current_level: string;
  difficulties: string[];
  source?: string;
  wants_pack?: boolean;
  /**
   * Opt-in marketing facultatif. Seul un `true` explicite vaut consentement ;
   * la date et la version de preuve sont toujours calculées côté serveur, et
   * jamais reprises du client.
   */
  marketing_consent?: boolean;
  /** utm_source brut ; normalisé côté serveur avant stockage. */
  utm_source?: string;
};

export type SaveLeadResult = {
  // success = pas d'erreur serveur (persistance réussie OU mock local).
  success: boolean;
  // saved = lead réellement persisté en base.
  saved: boolean;
  duplicate?: boolean;
  mocked?: boolean;
  // Mode de stockage non-sensible, utile pour la QA et l'observabilité.
  clientMode?: LeadClientMode;
  // Code d'erreur court et non-sensible (jamais de message brut / PII).
  errorCode?: string;
};

function getLeadStorageClient():
  | { client: SupabaseClient; clientMode: Exclude<LeadClientMode, 'mock'> }
  | { client: null; clientMode: 'mock' } {
  const supabaseAdmin = getSupabaseAdmin();
  if (supabaseAdmin) {
    return { client: supabaseAdmin, clientMode: 'admin' };
  }

  const hasAnonRuntimeConfig = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  if (hasAnonRuntimeConfig && isSupabaseConfigured && supabase) {
    return { client: supabase, clientMode: 'anon' };
  }

  return { client: null, clientMode: 'mock' };
}

export async function saveLead(data: LeadData): Promise<SaveLeadResult> {
  const storage = getLeadStorageClient();

  if (!storage.client) {
    // Dev local sans clés : on ne persiste pas et on ne logge PAS le payload (PII).
    console.warn(`[${SCOPE}] supabase_not_configured — lead non persisté (dev uniquement).`);
    return { success: true, saved: false, mocked: true, clientMode: 'mock' };
  }

  // Le client ne fournit qu'une intention (`marketing_consent`). La preuve
  // — date, version de wording, jeton de désinscription — est construite ici.
  const { marketing_consent: intent, utm_source: utmSource, ...leadFields } = data;
  const row = {
    ...leadFields,
    acquisition_source: normalizeAcquisitionSource(utmSource),
    ...buildConsentFields(intent === true),
  };

  try {
    const { error } = await storage.client.from('leads').insert([row]);

    if (!error) {
      return { success: true, saved: true, duplicate: false, clientMode: storage.clientMode };
    }

    // Doublon (si un index unique sur parent_email est ajouté) : idempotent,
    // ce n'est pas une erreur serveur.
    if (error.code === POSTGRES_UNIQUE_VIOLATION) {
      return { success: true, saved: true, duplicate: true, clientMode: storage.clientMode };
    }

    // Vraie erreur Supabase (ex. projet en pause -> code 08006) : loggée de façon
    // safe, mais on renvoie un statut clair sans faire planter l'appelant.
    logStep(SCOPE, 'save_failed', error);
    return {
      success: false,
      saved: false,
      clientMode: storage.clientMode,
      errorCode: typeof error.code === 'string' ? error.code : 'supabase_insert_error',
    };
  } catch (error) {
    logStep(SCOPE, 'save_unexpected', error);
    return { success: false, saved: false, clientMode: storage.clientMode, errorCode: 'unexpected' };
  }
}
