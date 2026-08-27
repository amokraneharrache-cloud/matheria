import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { logStep } from "@/lib/safeLog";
import { absoluteUrl } from "@/lib/site";

const SCOPE = "email/unsubscribe";

/**
 * Désinscription marketing sans connexion, via un jeton opaque.
 *
 * - GET  : clic sur le lien en pied d'email -> désinscrit puis redirige vers
 *          la page de confirmation.
 * - POST : désinscription « un clic » RFC 8058, déclenchée par Gmail/Outlook
 *          depuis l'en-tête List-Unsubscribe-Post. Doit répondre 200 sans
 *          redirection.
 *
 * Le jeton n'est jamais dérivé de l'email : l'URL ne révèle rien.
 */

function readToken(request: Request) {
  const token = new URL(request.url).searchParams.get("t");

  if (!token) {
    return null;
  }

  const trimmed = token.trim();
  // Le jeton est un hex de 64 caractères (32 octets). Tout le reste est rejeté
  // sans même toucher la base.
  return /^[a-f0-9]{64}$/.test(trimmed) ? trimmed : null;
}

type UnsubscribeOutcome = "done" | "invalid" | "unavailable";

async function unsubscribe(token: string | null): Promise<UnsubscribeOutcome> {
  if (!token) {
    return "invalid";
  }

  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    logStep(SCOPE, "supabase_not_configured", new Error("service role key manquante"));
    return "unavailable";
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("leads")
      .update({
        marketing_consent: false,
        marketing_unsubscribed_at: new Date().toISOString(),
      })
      .eq("unsubscribe_token", token)
      .select("id");

    if (error) {
      logStep(SCOPE, "update_failed", error);
      return "unavailable";
    }

    // Jeton inconnu : on ne le dit pas différemment d'un succès côté message
    // utilisateur, mais on distingue le cas en interne.
    return Array.isArray(data) && data.length === 0 ? "invalid" : "done";
  } catch (error) {
    logStep(SCOPE, "update_unexpected", error);
    return "unavailable";
  }
}

export async function GET(request: Request) {
  const outcome = await unsubscribe(readToken(request));
  const destination = absoluteUrl(`/desinscription?etat=${outcome}`);

  return Response.redirect(destination, 303);
}

export async function POST(request: Request) {
  const outcome = await unsubscribe(readToken(request));

  // RFC 8058 : le client mail attend un 2xx. On ne renvoie 4xx/5xx que si le
  // traitement a réellement échoué côté serveur, sinon Gmail réessaie.
  if (outcome === "unavailable") {
    return Response.json({ ok: false }, { status: 503 });
  }

  return Response.json({ ok: true });
}
