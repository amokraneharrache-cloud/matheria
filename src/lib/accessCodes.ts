import { randomInt } from "crypto";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export type AccessCodeSource = "manual" | "stripe";

export type CreatedAccessCode = {
  id: string;
  code: string;
  alreadyExisted: boolean;
  /**
   * false = code créé avant le suivi d'envoi J74 (`delivery_tracking_started_at`
   * NULL). Son état d'envoi est inconnu : il ne doit jamais être réexpédié
   * automatiquement. Voir `src/lib/accessCodeDelivery.ts`.
   */
  deliveryTracked: boolean;
};

export type CreateAccessCodeForEmailParams = {
  parentEmail?: string | null;
  source: AccessCodeSource;
  stripeSessionId?: string | null;
  stripePaymentIntentId?: string | null;
  amountTotal?: number | null;
  currency?: string | null;
};

const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const UNIQUE_VIOLATION_CODE = "23505";

function normalizeEmail(email?: string | null) {
  const trimmed = email?.trim().toLowerCase();
  return trimmed || null;
}

function normalizeCurrency(currency?: string | null) {
  const trimmed = currency?.trim().toLowerCase();
  return trimmed || null;
}

export function generateAccessCodeValue() {
  let suffix = "";
  for (let i = 0; i < 4; i += 1) {
    suffix += CODE_ALPHABET[randomInt(0, CODE_ALPHABET.length)];
  }

  return `MATH-${suffix}`;
}

export async function findAccessCodeByStripeSessionId(stripeSessionId: string) {
  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    throw new Error("Supabase Service Role non configuré. Impossible de vérifier le code Stripe.");
  }

  const { data, error } = await supabaseAdmin
    .from("access_codes")
    .select("id, code, delivery_tracking_started_at")
    .eq("stripe_session_id", stripeSessionId)
    .maybeSingle();

  if (error) {
    throw new Error(`Impossible de vérifier l'idempotence Stripe: ${error.message}`);
  }

  return data
    ? {
        id: data.id as string,
        code: data.code as string,
        // NULL => code legacy, antérieur au suivi d'envoi.
        deliveryTracked: Boolean(data.delivery_tracking_started_at),
      }
    : null;
}

export async function createAccessCodeForEmail(
  params: CreateAccessCodeForEmailParams,
): Promise<CreatedAccessCode> {
  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    throw new Error("Supabase Service Role non configuré. Impossible de générer un code.");
  }

  const parentEmail = normalizeEmail(params.parentEmail);
  const stripeSessionId = params.stripeSessionId?.trim() || null;

  if (params.source === "stripe" && stripeSessionId) {
    const existingCode = await findAccessCodeByStripeSessionId(stripeSessionId);
    if (existingCode) {
      return { ...existingCode, alreadyExisted: true };
    }
  }

  for (let attempt = 0; attempt < 8; attempt += 1) {
    const code = generateAccessCodeValue();
    const { data, error } = await supabaseAdmin
      .from("access_codes")
      .insert({
        code,
        parent_email: parentEmail,
        status: "unused",
        source: params.source,
        stripe_session_id: stripeSessionId,
        stripe_payment_intent_id: params.stripePaymentIntentId?.trim() || null,
        amount_total: params.amountTotal ?? null,
        currency: normalizeCurrency(params.currency),
        // Marque ce code comme pris en charge par le suivi d'envoi : lui seul
        // peut être repris après un échec. Les codes historiques restent NULL.
        delivery_tracking_started_at: new Date().toISOString(),
      })
      .select("id, code")
      .single();

    if (!error && data?.id && data?.code) {
      return {
        id: data.id as string,
        code: data.code as string,
        alreadyExisted: false,
        deliveryTracked: true,
      };
    }

    if (error?.code === UNIQUE_VIOLATION_CODE) {
      if (stripeSessionId) {
        const existingCode = await findAccessCodeByStripeSessionId(stripeSessionId);
        if (existingCode) {
          return { ...existingCode, alreadyExisted: true };
        }
      }

      continue;
    }

    throw new Error(error?.message || "Impossible de générer le code d'accès.");
  }

  throw new Error("Collision de code répétée. Relancez la génération.");
}
