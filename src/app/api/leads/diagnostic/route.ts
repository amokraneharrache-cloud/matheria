import type { SupabaseClient } from "@supabase/supabase-js";
import {
  DIAGNOSTIC_QUESTIONS,
  isDiagnosticDomainId,
  type DiagnosticDomainId,
} from "@/lib/diagnostic";
import {
  buildConsentFields,
  normalizeAcquisitionSource,
} from "@/lib/email/consent";
import {
  isResendEmailConfigured,
  sendDiagnosticResultEmail,
} from "@/lib/email/resend";
import { logStep } from "@/lib/safeLog";
import { absoluteUrl } from "@/lib/site";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { getSupabaseAdmin, isLocalDevRuntime } from "@/lib/supabaseAdmin";

const SCOPE = "leads/diagnostic";
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type RateLimitEntry = { count: number; resetAt: number };
type SaveResult = { saved: boolean; duplicate: boolean; mocked: boolean };

const rateLimitStore = new Map<string, RateLimitEntry>();

function normalizeEmail(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return (
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

function isRateLimited(clientKey: string) {
  const now = Date.now();
  const current = rateLimitStore.get(clientKey);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(clientKey, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }
  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }
  current.count += 1;
  return false;
}

function getLevel(score: number) {
  if (score >= 8) return "solid";
  if (score >= 5) return "intermediate";
  return "fragile";
}

function buildLeadRow(
  email: string,
  score: number,
  weakDomains: readonly DiagnosticDomainId[],
  marketingConsent: boolean,
  acquisitionSource: string,
) {
  return {
    parent_email: email,
    exam_goal: "terminale",
    current_level: getLevel(score),
    difficulties: weakDomains,
    source: "diagnostic_2:/diagnostic",
    wants_pack: false,
    acquisition_source: acquisitionSource,
    ...buildConsentFields(marketingConsent),
  };
}

async function saveWithAdmin(
  client: SupabaseClient,
  leadRow: ReturnType<typeof buildLeadRow>,
  marketingConsent: boolean,
): Promise<SaveResult> {
  const { data: existingRows, error: findError } = await client
    .from("leads")
    .select("id, marketing_consent")
    .eq("parent_email", leadRow.parent_email)
    .limit(1);

  if (findError) {
    throw findError;
  }

  const existing = Array.isArray(existingRows) ? existingRows[0] : null;
  if (existing?.id) {
    // Un opt-in explicite actuel peut réactiver un lead existant. Un formulaire
    // laissé décoché ne révoque ni ne crée jamais un consentement.
    if (marketingConsent) {
      const { error: updateError } = await client
        .from("leads")
        .update({
          ...buildConsentFields(true),
          acquisition_source: leadRow.acquisition_source,
          marketing_unsubscribed_at: null,
        })
        .eq("id", existing.id);

      if (updateError) {
        throw updateError;
      }
    }

    return { saved: true, duplicate: true, mocked: false };
  }

  const { error: insertError } = await client.from("leads").insert([leadRow]);
  if (insertError) {
    throw insertError;
  }
  return { saved: true, duplicate: false, mocked: false };
}

async function saveDiagnosticLead(
  leadRow: ReturnType<typeof buildLeadRow>,
  marketingConsent: boolean,
): Promise<SaveResult> {
  const admin = getSupabaseAdmin();
  if (admin) {
    return saveWithAdmin(admin, leadRow, marketingConsent);
  }

  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from("leads").insert([leadRow]);
    if (error) {
      throw error;
    }
    return { saved: true, duplicate: false, mocked: false };
  }

  if (isLocalDevRuntime()) {
    console.warn(
      `[${SCOPE}] supabase_not_configured — demande non persistée (dev uniquement).`,
    );
    return { saved: false, duplicate: false, mocked: true };
  }

  throw new Error("Supabase non configuré.");
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ success: false, message: "Requête invalide." }, { status: 400 });
  }

  const record =
    payload && typeof payload === "object" ? (payload as Record<string, unknown>) : {};
  const honeypot = typeof record.website === "string" ? record.website.trim() : "";
  if (honeypot) {
    return Response.json({ success: true, emailSent: false, saved: false });
  }

  if (isRateLimited(getClientKey(request))) {
    return Response.json(
      { success: false, message: "Trop de demandes. Réessaie un peu plus tard." },
      { status: 429 },
    );
  }

  const email = normalizeEmail(record.email);
  if (!isValidEmail(email)) {
    return Response.json(
      { success: false, message: "Entre une adresse email valide." },
      { status: 400 },
    );
  }

  const score =
    typeof record.score === "number" && Number.isInteger(record.score) ? record.score : -1;
  if (score < 0 || score > DIAGNOSTIC_QUESTIONS.length) {
    return Response.json({ success: false, message: "Résultat invalide." }, { status: 400 });
  }

  const weakDomains = Array.isArray(record.weakDomains)
    ? [...new Set(record.weakDomains.filter(isDiagnosticDomainId))].slice(0, 5)
    : [];
  const marketingConsent = record.marketingConsent === true;
  const acquisitionSource = normalizeAcquisitionSource(
    record.utmSource,
    request.headers.get("referer"),
  );
  const leadRow = buildLeadRow(
    email,
    score,
    weakDomains,
    marketingConsent,
    acquisitionSource,
  );

  try {
    const saveResult = await saveDiagnosticLead(leadRow, marketingConsent);
    let emailSent = false;
    let emailSkippedReason: string | undefined;

    if (isResendEmailConfigured()) {
      try {
        const emailResult = await sendDiagnosticResultEmail({
          to: email,
          siteUrl: absoluteUrl("/"),
          score,
          total: DIAGNOSTIC_QUESTIONS.length,
          weakDomains,
        });
        emailSent = !emailResult.error;
        if (emailResult.error) {
          logStep(SCOPE, "resend_send_failed", emailResult.error);
          emailSkippedReason = "resend_send_failed";
        }
      } catch (error) {
        logStep(SCOPE, "resend_send_failed", error);
        emailSkippedReason = "resend_send_failed";
      }
    } else {
      emailSkippedReason = "resend_not_configured";
    }

    return Response.json({
      success: true,
      emailSent,
      emailSkippedReason,
      ...saveResult,
    });
  } catch (error) {
    logStep(SCOPE, "save_failed", error);
    return Response.json(
      { success: false, message: "Impossible d’enregistrer la demande pour le moment." },
      { status: 500 },
    );
  }
}
