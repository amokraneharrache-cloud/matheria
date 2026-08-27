import { sendPlanningRevisionEmail, isResendEmailConfigured } from "@/lib/email/resend";
import { buildConsentFields, normalizeAcquisitionSource } from "@/lib/email/consent";
import { absoluteUrl } from "@/lib/site";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { getSupabaseAdmin, isLocalDevRuntime } from "@/lib/supabaseAdmin";
import type { SupabaseClient } from "@supabase/supabase-js";
import { logStep } from "@/lib/safeLog";

const LEAD_MAGNET = "planning_bac_maths_2027";
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
// Code Postgres pour une violation de contrainte unique (doublon).
const POSTGRES_UNIQUE_VIOLATION = "23505";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

function normalizeEmail(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

function sanitizeSourcePage(value: unknown) {
  if (typeof value !== "string") {
    return "direct";
  }

  const sourcePage = value.trim();
  if (!sourcePage || sourcePage.length > 80 || !sourcePage.startsWith("/")) {
    return "direct";
  }

  return sourcePage;
}

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const firstForwardedIp = forwardedFor?.split(",")[0]?.trim();

  return (
    firstForwardedIp ||
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

const SCOPE = "leads/planning";

type SaveResult = { saved: boolean; duplicate: boolean; mocked: boolean };

async function insertPlanningLead(
  client: SupabaseClient,
  leadRow: Record<string, unknown>,
): Promise<SaveResult> {
  const { error } = await client.from("leads").insert([leadRow]);

  if (!error) {
    return { saved: true, duplicate: false, mocked: false };
  }

  // Doublon (si un index unique sur parent_email est ajouté) : succès idempotent,
  // pas une vraie erreur serveur -> on ne renvoie pas de 500.
  if (error.code === POSTGRES_UNIQUE_VIOLATION) {
    return { saved: true, duplicate: true, mocked: false };
  }

  // On propage l'erreur en conservant le code Postgres pour un log serveur exploitable.
  const failure = new Error(error.message);
  (failure as { code?: string }).code =
    typeof error.code === "string" ? error.code : "supabase_insert_error";
  throw failure;
}

async function savePlanningLead(
  email: string,
  sourcePage: string,
  consent: { marketingConsent: boolean; acquisitionSource: string },
): Promise<SaveResult> {
  const leadRow = {
    parent_email: email,
    exam_goal: "bac_maths_2027",
    current_level: "terminale",
    difficulties: [],
    source: `${LEAD_MAGNET}:${sourcePage}`,
    wants_pack: false,
    acquisition_source: consent.acquisitionSource,
    ...buildConsentFields(consent.marketingConsent),
  };

  const supabaseAdmin = getSupabaseAdmin();
  if (supabaseAdmin) {
    return insertPlanningLead(supabaseAdmin, leadRow);
  }

  if (isSupabaseConfigured && supabase) {
    return insertPlanningLead(supabase, leadRow);
  }

  if (isLocalDevRuntime()) {
    console.warn(
      "[leads/planning] supabase_not_configured — lead non persisté (dev uniquement).",
    );
    return { saved: false, duplicate: false, mocked: true };
  }

  const configError = new Error("Supabase non configuré.");
  (configError as { code?: string }).code = "supabase_not_configured";
  throw configError;
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json(
      { success: false, message: "Requête invalide." },
      { status: 400 },
    );
  }

  const data = payload && typeof payload === "object" ? payload : {};
  const record = data as Record<string, unknown>;
  const honeypot = typeof record.website === "string" ? record.website.trim() : "";

  if (honeypot) {
    return Response.json({ success: true, emailSent: false, saved: false });
  }

  const clientKey = getClientKey(request);
  if (isRateLimited(clientKey)) {
    return Response.json(
      {
        success: false,
        message: "Trop de demandes. Réessaie un peu plus tard.",
      },
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

  const sourcePage = sanitizeSourcePage(record.sourcePage);
  // Opt-in marketing : seul un `true` explicite compte. Toute autre valeur
  // (absente, "false", "on", null…) vaut refus.
  const marketingConsent = record.marketingConsent === true;
  const acquisitionSource = normalizeAcquisitionSource(
    record.utmSource,
    request.headers.get("referer"),
  );

  try {
    const saveResult = await savePlanningLead(email, sourcePage, {
      marketingConsent,
      acquisitionSource,
    });
    let emailSent = false;
    let emailSkippedReason: string | undefined;

    if (saveResult.duplicate) {
      // Email déjà enregistré : on n'envoie pas un second email (idempotence).
      emailSkippedReason = "duplicate_lead";
    } else if (isResendEmailConfigured()) {
      try {
        const emailResult = await sendPlanningRevisionEmail({
          to: email,
          siteUrl: absoluteUrl("/"),
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
      {
        success: false,
        message: "Impossible d'enregistrer la demande pour le moment.",
      },
      { status: 500 },
    );
  }
}
