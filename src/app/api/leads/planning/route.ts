import { sendPlanningRevisionEmail, isResendEmailConfigured } from "@/lib/email/resend";
import { absoluteUrl } from "@/lib/site";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { getSupabaseAdmin, isLocalDevRuntime } from "@/lib/supabaseAdmin";

const LEAD_MAGNET = "planning_bac_maths_2027";
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

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

function getErrorLogDetails(error: unknown) {
  if (!error || typeof error !== "object") {
    return {
      errorName: "Error",
      message: "Unknown error",
    };
  }

  const record = error as Record<string, unknown>;
  return {
    errorName: typeof record.name === "string" ? record.name : "Error",
    statusCode: typeof record.statusCode === "number" ? record.statusCode : undefined,
    message: typeof record.message === "string" ? record.message : "Unknown error",
  };
}

async function savePlanningLead(email: string, sourcePage: string) {
  const supabaseAdmin = getSupabaseAdmin();
  const leadRow = {
    parent_email: email,
    exam_goal: "bac_maths_2027",
    current_level: "terminale",
    difficulties: [],
    source: `${LEAD_MAGNET}:${sourcePage}`,
    wants_pack: false,
  };

  if (supabaseAdmin) {
    const { error } = await supabaseAdmin.from("leads").insert([leadRow]);

    if (error) {
      throw new Error(error.message);
    }

    return { saved: true, mocked: false };
  }

  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from("leads").insert([leadRow]);

    if (error) {
      throw new Error(error.message);
    }

    return { saved: true, mocked: false };
  }

  if (isLocalDevRuntime()) {
    console.warn("Supabase non configuré. Lead planning non persisté en local.");
    return { saved: false, mocked: true };
  }

  throw new Error("Supabase non configuré.");
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

  try {
    const saveResult = await savePlanningLead(email, sourcePage);
    let emailSent = false;
    let emailSkippedReason: string | undefined;

    if (isResendEmailConfigured()) {
      try {
        const emailResult = await sendPlanningRevisionEmail({
          to: email,
          siteUrl: absoluteUrl("/"),
        });

        emailSent = !emailResult.error;

        if (emailResult.error) {
          console.error("Resend planning email failed:", getErrorLogDetails(emailResult.error));
          emailSkippedReason = "resend_send_failed";
        }
      } catch (error) {
        console.error("Resend planning email failed:", getErrorLogDetails(error));
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
    console.error("Planning lead request failed:", getErrorLogDetails(error));
    return Response.json(
      {
        success: false,
        message: "Impossible d'enregistrer la demande pour le moment.",
      },
      { status: 500 },
    );
  }
}
