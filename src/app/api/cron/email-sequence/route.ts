import { timingSafeEqual } from "node:crypto";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { runNurtureSequence } from "@/lib/email/sequenceRunner";
import { absoluteUrl } from "@/lib/site";
import { logStep } from "@/lib/safeLog";

const SCOPE = "cron/email-sequence";

/**
 * Déclencheur quotidien de la séquence nurture.
 *
 * Appelé par Vercel Cron (voir `vercel.json`), qui envoie automatiquement
 * l'en-tête `Authorization: Bearer $CRON_SECRET`. Sans `CRON_SECRET` configuré,
 * la route refuse tout : mieux vaut une séquence qui ne part pas qu'une route
 * d'envoi d'emails ouverte sur Internet.
 */

// Une passe traite au plus MAX_SENDS_PER_RUN envois ; 60 s laisse une marge
// confortable même si Resend est lent.
export const maxDuration = 60;

function isAuthorized(request: Request) {
  const expected = process.env.CRON_SECRET;

  if (!expected) {
    return false;
  }

  const provided = request.headers.get("authorization") ?? "";
  const expectedHeader = `Bearer ${expected}`;

  const a = Buffer.from(provided);
  const b = Buffer.from(expectedHeader);

  return a.length === b.length && timingSafeEqual(a, b);
}

async function handle(request: Request) {
  if (!isAuthorized(request)) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    logStep(SCOPE, "supabase_not_configured", new Error("service role key manquante"));
    return Response.json({ error: "supabase_not_configured" }, { status: 503 });
  }

  const summary = await runNurtureSequence(supabaseAdmin, {
    siteUrl: absoluteUrl("/"),
  });

  // Résumé volontairement agrégé : aucun email, aucun identifiant de lead.
  return Response.json({ ok: true, ...summary });
}

export async function GET(request: Request) {
  return handle(request);
}

export async function POST(request: Request) {
  return handle(request);
}
