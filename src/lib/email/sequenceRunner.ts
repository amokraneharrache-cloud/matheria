import type { SupabaseClient } from "@supabase/supabase-js";
import { logStep } from "@/lib/safeLog";
import { isResendEmailConfigured, sendNurtureEmail } from "@/lib/email/resend";
import { unsubscribeUrl } from "@/lib/email/consent";
import { dueSteps, type SequenceStep } from "@/lib/email/sequence";

const SCOPE = "email/sequence-runner";
const POSTGRES_UNIQUE_VIOLATION = "23505";

/** Plafond par exécution : borne la durée et le coût d'un run qui déraille. */
export const MAX_SENDS_PER_RUN = 40;

type LeadRow = {
  id: string;
  parent_email: string;
  created_at: string;
  marketing_consent_at?: string | null;
  marketing_consent: boolean | null;
  marketing_unsubscribed_at: string | null;
  unsubscribe_token: string | null;
};

type SendRow = {
  lead_id: string;
  step: string;
  status: string;
};

export type RunSummary = {
  eligibleLeads: number;
  sent: number;
  skippedAlreadySent: number;
  skippedPurchaser: number;
  skippedNoToken: number;
  failed: number;
  capped: boolean;
};

function emptySummary(): RunSummary {
  return {
    eligibleLeads: 0,
    sent: 0,
    skippedAlreadySent: 0,
    skippedPurchaser: 0,
    skippedNoToken: 0,
    failed: 0,
    capped: false,
  };
}

/**
 * Un acheteur ne doit plus recevoir les emails promotionnels de la séquence.
 * Les emails transactionnels liés à l'achat (code d'accès) ne sont pas
 * concernés : ils passent par une autre voie.
 */
async function hasPurchased(client: SupabaseClient, email: string) {
  const { data, error } = await client
    .from("access_codes")
    .select("id")
    .eq("parent_email", email)
    .limit(1);

  if (error) {
    // En cas de doute on considère la personne comme acheteuse : mieux vaut
    // un email promotionnel non envoyé qu'un email promotionnel envoyé à
    // quelqu'un qui vient de payer.
    logStep(SCOPE, "purchase_lookup_failed", error);
    return true;
  }

  return Array.isArray(data) && data.length > 0;
}

/**
 * Exécute une passe de la séquence nurture.
 *
 * Idempotence : chaque envoi est d'abord « réservé » par un INSERT dans
 * `email_sequence_sends`, protégé par UNIQUE(lead_id, step). Si deux
 * exécutions se chevauchent, la seconde reçoit une 23505 et n'envoie rien.
 * L'email n'est envoyé qu'après une réservation réussie.
 */
export async function runNurtureSequence(
  client: SupabaseClient,
  options: { siteUrl: string; now?: Date } = { siteUrl: "" },
): Promise<RunSummary> {
  const summary = emptySummary();
  const now = options.now ?? new Date();

  if (!isResendEmailConfigured()) {
    logStep(SCOPE, "resend_not_configured", new Error("envoi impossible"));
    return summary;
  }

  const { data: leadsData, error: leadsError } = await client
    .from("leads")
    .select(
      "id, parent_email, created_at, marketing_consent, marketing_consent_at, marketing_unsubscribed_at, unsubscribe_token",
    )
    .eq("marketing_consent", true);

  if (leadsError) {
    logStep(SCOPE, "leads_query_failed", leadsError);
    return summary;
  }

  // Filtre de sécurité côté applicatif : même si la requête change un jour, on
  // ne sort jamais d'ici avec un lead désinscrit ou non consentant.
  const leads = (Array.isArray(leadsData) ? (leadsData as LeadRow[]) : []).filter(
    (lead) => lead.marketing_consent === true && !lead.marketing_unsubscribed_at,
  );

  summary.eligibleLeads = leads.length;

  if (leads.length === 0) {
    return summary;
  }

  const { data: sendsData, error: sendsError } = await client
    .from("email_sequence_sends")
    .select("lead_id, step, status");

  if (sendsError) {
    logStep(SCOPE, "sends_query_failed", sendsError);
    return summary;
  }

  const alreadyHandled = new Set(
    (Array.isArray(sendsData) ? (sendsData as SendRow[]) : []).map(
      (row) => `${row.lead_id}:${row.step}`,
    ),
  );

  const purchaserCache = new Map<string, boolean>();

  for (const lead of leads) {
    // Un lead ancien qui consent aujourd'hui entre dans la séquence à partir
    // de son opt-in explicite, jamais rétroactivement depuis sa création.
    const sequenceStartedAt = lead.marketing_consent_at ?? lead.created_at;
    const pending = dueSteps(new Date(sequenceStartedAt), now).filter(
      (step) => !alreadyHandled.has(`${lead.id}:${step.key}`),
    );

    if (pending.length === 0) {
      continue;
    }

    if (!lead.unsubscribe_token) {
      // Sans jeton, l'email n'aurait pas de lien de désinscription valide :
      // on n'envoie pas. Le lead sera repris dès que le jeton sera présent.
      summary.skippedNoToken += pending.length;
      logStep(SCOPE, "missing_unsubscribe_token", new Error(`lead ${lead.id}`));
      continue;
    }

    for (const step of pending) {
      if (summary.sent >= MAX_SENDS_PER_RUN) {
        summary.capped = true;
        return summary;
      }

      if (step.promotional) {
        let purchased = purchaserCache.get(lead.parent_email);
        if (purchased === undefined) {
          purchased = await hasPurchased(client, lead.parent_email);
          purchaserCache.set(lead.parent_email, purchased);
        }

        if (purchased) {
          await markSkipped(client, lead.id, step, "purchaser");
          summary.skippedPurchaser += 1;
          continue;
        }
      }

      const claimed = await claimStep(client, lead.id, step);
      if (!claimed) {
        summary.skippedAlreadySent += 1;
        continue;
      }

      const outcome = await deliver(client, lead, step, options.siteUrl);
      if (outcome) {
        summary.sent += 1;
      } else {
        summary.failed += 1;
      }
    }
  }

  return summary;
}

/**
 * Réserve l'étape. Renvoie false si elle était déjà réservée (23505) — c'est
 * le point exact où l'idempotence est garantie par la base, pas par le code.
 */
async function claimStep(client: SupabaseClient, leadId: string, step: SequenceStep) {
  const { error } = await client.from("email_sequence_sends").insert([
    {
      lead_id: leadId,
      step: step.key,
      status: "pending",
      attempts: 1,
    },
  ]);

  if (!error) {
    return true;
  }

  if (error.code === POSTGRES_UNIQUE_VIOLATION) {
    return false;
  }

  logStep(SCOPE, "claim_failed", error);
  return false;
}

async function markSkipped(
  client: SupabaseClient,
  leadId: string,
  step: SequenceStep,
  reason: string,
) {
  const { error } = await client.from("email_sequence_sends").insert([
    {
      lead_id: leadId,
      step: step.key,
      status: "skipped",
      attempts: 0,
      last_error: reason,
    },
  ]);

  if (error && error.code !== POSTGRES_UNIQUE_VIOLATION) {
    logStep(SCOPE, "skip_failed", error);
  }
}

async function deliver(
  client: SupabaseClient,
  lead: LeadRow,
  step: SequenceStep,
  siteUrl: string,
) {
  try {
    const result = await sendNurtureEmail({
      to: lead.parent_email,
      siteUrl,
      unsubscribeUrl: unsubscribeUrl(lead.unsubscribe_token as string),
      step,
    });

    if (result.error) {
      logStep(SCOPE, "resend_send_failed", result.error);
      await finalize(client, lead.id, step, "failed", "resend_send_failed");
      return false;
    }

    await finalize(client, lead.id, step, "sent", null);
    return true;
  } catch (error) {
    logStep(SCOPE, "send_unexpected", error);
    await finalize(client, lead.id, step, "failed", "send_unexpected");
    return false;
  }
}

async function finalize(
  client: SupabaseClient,
  leadId: string,
  step: SequenceStep,
  status: "sent" | "failed",
  lastError: string | null,
) {
  const { error } = await client
    .from("email_sequence_sends")
    .update({
      status,
      sent_at: status === "sent" ? new Date().toISOString() : null,
      last_error: lastError,
    })
    .eq("lead_id", leadId)
    .eq("step", step.key);

  if (error) {
    logStep(SCOPE, "finalize_failed", error);
  }
}
