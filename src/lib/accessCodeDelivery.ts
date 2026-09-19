import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

/**
 * Suivi durable de l'envoi du code d'accès (J74).
 *
 * Problème corrigé : jusqu'ici, un échec Resend laissait un code créé et aucun
 * email, et le rejeu du webhook repartait en « duplicate » sans jamais
 * retenter. Rien ne relisait l'état d'envoi, parce qu'aucun état d'envoi
 * n'existait.
 *
 * Invariants tenus ici :
 *  - Aucun envoi sans réservation écrite AVANT l'appel au fournisseur.
 *    Si l'état ne peut pas être écrit, on n'envoie pas (`unavailable`).
 *  - Un succès accepté par le fournisseur n'est jamais réexpédié.
 *  - Un résultat ambigu n'est jamais réexpédié « à l'aveugle » : il n'est
 *    repris que dans la fenêtre d'idempotence réellement documentée par le
 *    fournisseur, avec la même clé et le même payload. Au-delà, il reste
 *    ambigu et attend un rapprochement manuel.
 *  - Les codes antérieurs au suivi (legacy) ne sont jamais réexpédiés.
 *
 * Ce que ce module ne prétend PAS : garantir « exactement un envoi » dans tous
 * les cas distribués, ni qu'un email accepté par Resend est arrivé en boîte.
 * « sent » signifie « accepté par l'API du fournisseur ».
 */

export const ACCESS_CODE_EMAIL_CHANNEL = "access_code_email";

const POSTGRES_UNIQUE_VIOLATION = "23505";

/**
 * Durée au-delà de laquelle une réservation `pending` est considérée comme
 * abandonnée (worker tué, lambda recyclée). En dessous, un rejeu concurrent
 * n'envoie rien : il laisse la tentative en cours se terminer.
 */
export const CLAIM_TTL_MS = 10 * 60 * 1000;

/**
 * Fenêtre d'idempotence Resend : « Idempotency keys are kept in the system for
 * 24 hours. » — https://resend.com/docs/dashboard/emails/idempotency-keys
 * (consulté le 19/09/2026). Au-delà, la même clé ne dédoublonne plus : une
 * reprise redeviendrait un envoi potentiellement double, donc on s'arrête.
 */
export const PROVIDER_IDEMPOTENCY_WINDOW_MS = 24 * 60 * 60 * 1000;

/**
 * Codes d'erreur Resend qui décrivent une requête REFUSÉE (rien n'a été mis en
 * file d'envoi) : l'échec est certain, la reprise est sûre.
 * Source : union `RESEND_ERROR_CODE_KEY`, resend 6.12.3,
 * node_modules/resend/dist/index.d.mts.
 *
 * Tout ce qui n'est pas dans cette liste (5xx, erreur applicative, requêtes
 * idempotentes concurrentes, code absent ou inconnu) est traité comme AMBIGU :
 * le message a pu partir.
 */
const DEFINITE_REJECTION_CODES = new Set([
  "validation_error",
  "missing_required_field",
  "invalid_parameter",
  "invalid_attachment",
  "invalid_from_address",
  "invalid_access",
  "invalid_region",
  "invalid_idempotency_key",
  "invalid_idempotent_request",
  "missing_api_key",
  "restricted_api_key",
  "invalid_api_key",
  "not_found",
  "method_not_allowed",
  "security_error",
  "monthly_quota_exceeded",
  "daily_quota_exceeded",
  "rate_limit_exceeded",
]);

/**
 * Erreurs de refus qui disparaîtront d'elles-mêmes : il vaut la peine de
 * laisser Stripe rejouer le webhook. Les autres refus (payload invalide, clé
 * d'API invalide) resteront identiques à chaque rejeu : on enregistre l'échec
 * et on rend 200 pour ne pas faire tourner Stripe pour rien.
 */
const TRANSIENT_REJECTION_CODES = new Set([
  "rate_limit_exceeded",
  "monthly_quota_exceeded",
  "daily_quota_exceeded",
]);

export type DeliveryFailureKind = "rejected" | "ambiguous";

export type AccessCodeDeliveryRow = {
  id: string;
  status: "pending" | "sent" | "failed" | "unknown";
  attempts: number;
  claimed_at: string | null;
  idempotency_key: string | null;
  idempotency_key_first_used_at: string | null;
};

export type DeliveryClaim =
  /** Réservation obtenue : l'envoi peut avoir lieu avec cette clé. */
  | {
      outcome: "claimed";
      deliveryId: string;
      idempotencyKey: string;
      attempt: number;
      /** true = reprise protégée par la clé d'idempotence du fournisseur. */
      protectedByProviderKey: boolean;
    }
  /** Le fournisseur a déjà accepté cet email : ne rien renvoyer. */
  | { outcome: "already_sent"; deliveryId: string }
  /** Résultat indécidable : rapprochement manuel, aucun renvoi. */
  | { outcome: "ambiguous"; deliveryId: string; reason: string }
  /** Code créé avant le suivi d'envoi : état inconnu, aucun renvoi. */
  | { outcome: "legacy_untracked" }
  /** Une autre tentative est en cours sur ce code : ne rien envoyer. */
  | { outcome: "busy"; deliveryId: string | null }
  /** État non enregistrable : NE PAS ENVOYER, laisser Stripe rejouer. */
  | { outcome: "unavailable"; reason: string };

function admin() {
  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    throw new Error("Supabase Service Role non configuré. Suivi d'envoi impossible.");
  }

  return supabaseAdmin;
}

function errorMessage(error: unknown) {
  if (error && typeof error === "object" && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string") {
      return message;
    }
  }

  return "erreur inconnue";
}

function providerErrorCode(error: unknown) {
  if (error && typeof error === "object" && "name" in error) {
    const name = (error as { name?: unknown }).name;
    if (typeof name === "string") {
      return name;
    }
  }

  return null;
}

/**
 * Classe une erreur renvoyée par le SDK Resend.
 *
 * `rejected` : le fournisseur a refusé la requête, rien n'est parti.
 * `ambiguous` : on ne sait pas si le message est parti (5xx, erreur inconnue).
 */
export function classifyProviderError(error: unknown): {
  kind: DeliveryFailureKind;
  transient: boolean;
  code: string | null;
} {
  const code = providerErrorCode(error);
  if (code && DEFINITE_REJECTION_CODES.has(code)) {
    return { kind: "rejected", transient: TRANSIENT_REJECTION_CODES.has(code), code };
  }

  return { kind: "ambiguous", transient: true, code };
}

/**
 * Clé d'idempotence stable, liée à la session Stripe (donc au paiement) et au
 * canal. Le payload associé est stable lui aussi (même code, même
 * destinataire, même site), ce que Resend exige : une même clé avec un payload
 * différent est refusée en 409.
 *
 * `attemptSeries` ne bouge que lorsqu'on ouvre délibérément une NOUVELLE série
 * d'envoi, c'est-à-dire après un refus certain (rien n'a été accepté, donc
 * aucun risque de doublon à repartir sur une clé neuve).
 */
export function buildIdempotencyKey(params: {
  stripeSessionId?: string | null;
  accessCodeId: string;
  attemptSeries?: number;
}) {
  const anchor = params.stripeSessionId?.trim() || `code_${params.accessCodeId}`;
  const series = params.attemptSeries && params.attemptSeries > 1 ? `-r${params.attemptSeries}` : "";
  // Resend limite la clé à 256 caractères.
  return `sm-${ACCESS_CODE_EMAIL_CHANNEL}-${anchor}${series}`.slice(0, 256);
}

async function readDelivery(
  accessCodeId: string,
): Promise<{ row: AccessCodeDeliveryRow | null; error: string | null }> {
  const { data, error } = await admin()
    .from("access_code_deliveries")
    .select("id, status, attempts, claimed_at, idempotency_key, idempotency_key_first_used_at")
    .eq("access_code_id", accessCodeId)
    .eq("channel", ACCESS_CODE_EMAIL_CHANNEL)
    .maybeSingle();

  if (error) {
    return { row: null, error: errorMessage(error) };
  }

  return { row: (data as AccessCodeDeliveryRow | null) ?? null, error: null };
}

function isWithinProviderWindow(row: AccessCodeDeliveryRow, now: Date) {
  if (!row.idempotency_key || !row.idempotency_key_first_used_at) {
    return false;
  }

  const firstUsed = Date.parse(row.idempotency_key_first_used_at);
  if (Number.isNaN(firstUsed)) {
    return false;
  }

  return now.getTime() - firstUsed <= PROVIDER_IDEMPOTENCY_WINDOW_MS;
}

function claimAgeMs(row: AccessCodeDeliveryRow, now: Date) {
  if (!row.claimed_at) {
    return Number.POSITIVE_INFINITY;
  }

  const claimedAt = Date.parse(row.claimed_at);
  if (Number.isNaN(claimedAt)) {
    return Number.POSITIVE_INFINITY;
  }

  return now.getTime() - claimedAt;
}

/**
 * Compare-and-swap : la réservation n'est obtenue que si la ligne est encore
 * exactement dans l'état lu. C'est la base qui arbitre, pas le processus —
 * deux workers concurrents ne peuvent pas réserver la même ligne.
 */
async function reclaim(
  row: AccessCodeDeliveryRow,
  idempotencyKey: string,
  keepKeyAnchor: boolean,
  now: Date,
): Promise<{ claimed: boolean; error: string | null }> {
  const patch: Record<string, unknown> = {
    status: "pending",
    attempts: row.attempts + 1,
    claimed_at: now.toISOString(),
    updated_at: now.toISOString(),
    idempotency_key: idempotencyKey,
    last_error: null,
  };

  if (!keepKeyAnchor) {
    // Nouvelle clé => nouvelle fenêtre d'idempotence.
    patch.idempotency_key_first_used_at = now.toISOString();
  }

  let query = admin()
    .from("access_code_deliveries")
    .update(patch)
    .eq("id", row.id)
    .eq("status", row.status);

  // Sur une reprise de `pending` abandonné, on verrouille aussi sur le
  // claimed_at lu : si un autre worker vient de le rafraîchir, on perd la
  // course et on n'envoie rien.
  if (row.status === "pending") {
    query = query.eq("claimed_at", row.claimed_at);
  }

  const { data, error } = await query.select("id");

  if (error) {
    return { claimed: false, error: errorMessage(error) };
  }

  return { claimed: Array.isArray(data) ? data.length > 0 : Boolean(data), error: null };
}

async function markUnknown(row: AccessCodeDeliveryRow, reason: string, now: Date) {
  await admin()
    .from("access_code_deliveries")
    .update({
      status: "unknown",
      last_error: reason,
      updated_at: now.toISOString(),
    })
    .eq("id", row.id)
    .eq("status", row.status)
    .select("id");
}

async function evaluateExisting(
  row: AccessCodeDeliveryRow,
  params: { stripeSessionId?: string | null; accessCodeId: string },
  now: Date,
): Promise<DeliveryClaim> {
  if (row.status === "sent") {
    return { outcome: "already_sent", deliveryId: row.id };
  }

  if (row.status === "pending" && claimAgeMs(row, now) < CLAIM_TTL_MS) {
    // Tentative en cours ailleurs : on ne double pas l'envoi.
    return { outcome: "busy", deliveryId: row.id };
  }

  // `pending` périmé et `unknown` partagent le même risque : l'email a PEUT-ÊTRE
  // été accepté. La seule reprise sûre est celle que le fournisseur dédoublonne.
  const needsProviderProtection = row.status === "pending" || row.status === "unknown";

  if (needsProviderProtection) {
    if (!isWithinProviderWindow(row, now)) {
      if (row.status !== "unknown") {
        await markUnknown(row, "claim_expired_beyond_provider_idempotency_window", now);
      }

      return {
        outcome: "ambiguous",
        deliveryId: row.id,
        reason:
          row.status === "unknown"
            ? "unresolved_beyond_provider_idempotency_window"
            : "claim_expired_beyond_provider_idempotency_window",
      };
    }

    const { claimed, error } = await reclaim(row, row.idempotency_key as string, true, now);
    if (error) {
      return { outcome: "unavailable", reason: `reclaim_failed: ${error}` };
    }

    return claimed
      ? {
          outcome: "claimed",
          deliveryId: row.id,
          idempotencyKey: row.idempotency_key as string,
          attempt: row.attempts + 1,
          protectedByProviderKey: true,
        }
      : { outcome: "busy", deliveryId: row.id };
  }

  // status === "failed" : refus certain du fournisseur, rien n'a été accepté.
  // Une clé neuve est sûre et évite de rejouer une réponse d'erreur mise en
  // cache par le fournisseur pendant sa fenêtre d'idempotence.
  const nextAttempt = row.attempts + 1;
  const freshKey = buildIdempotencyKey({
    stripeSessionId: params.stripeSessionId,
    accessCodeId: params.accessCodeId,
    attemptSeries: nextAttempt,
  });

  const { claimed, error } = await reclaim(row, freshKey, false, now);
  if (error) {
    return { outcome: "unavailable", reason: `reclaim_failed: ${error}` };
  }

  return claimed
    ? {
        outcome: "claimed",
        deliveryId: row.id,
        idempotencyKey: freshKey,
        attempt: nextAttempt,
        protectedByProviderKey: false,
      }
    : { outcome: "busy", deliveryId: row.id };
}

/**
 * Réserve l'envoi de l'email de code d'accès, ou explique pourquoi il ne doit
 * pas avoir lieu. Aucun envoi ne doit être tenté sans `outcome: "claimed"`.
 */
export async function claimAccessCodeEmailDelivery(params: {
  accessCodeId: string;
  stripeSessionId?: string | null;
  /** false = code créé avant le suivi d'envoi (delivery_tracking_started_at NULL). */
  deliveryTracked: boolean;
  now?: Date;
}): Promise<DeliveryClaim> {
  const now = params.now ?? new Date();

  const existing = await readDelivery(params.accessCodeId);
  if (existing.error) {
    // On ne sait pas si un envoi a déjà eu lieu : ne rien envoyer.
    return { outcome: "unavailable", reason: `delivery_read_failed: ${existing.error}` };
  }

  if (existing.row) {
    return evaluateExisting(existing.row, params, now);
  }

  if (!params.deliveryTracked) {
    // Code antérieur à la migration : aucune trace d'envoi n'a jamais été
    // tenue pour lui. Créer une ligne ici reviendrait à inventer un état et,
    // en pratique, à réexpédier un email peut-être déjà reçu.
    return { outcome: "legacy_untracked" };
  }

  const idempotencyKey = buildIdempotencyKey({
    stripeSessionId: params.stripeSessionId,
    accessCodeId: params.accessCodeId,
  });

  const { error } = await admin()
    .from("access_code_deliveries")
    .insert({
      access_code_id: params.accessCodeId,
      stripe_session_id: params.stripeSessionId?.trim() || null,
      channel: ACCESS_CODE_EMAIL_CHANNEL,
      status: "pending",
      attempts: 1,
      claimed_at: now.toISOString(),
      created_at: now.toISOString(),
      updated_at: now.toISOString(),
      idempotency_key: idempotencyKey,
      idempotency_key_first_used_at: now.toISOString(),
    })
    .select("id")
    .single();

  if (!error) {
    const inserted = await readDelivery(params.accessCodeId);
    if (inserted.error || !inserted.row) {
      // La ligne est écrite (l'insert a réussi) mais illisible : une autre
      // tentative la reprendra. Ne pas envoyer sans identifiant d'état.
      return { outcome: "unavailable", reason: "delivery_reread_failed" };
    }

    return {
      outcome: "claimed",
      deliveryId: inserted.row.id,
      idempotencyKey,
      attempt: 1,
      protectedByProviderKey: false,
    };
  }

  if ((error as { code?: string }).code === POSTGRES_UNIQUE_VIOLATION) {
    // Course perdue : quelqu'un vient de réserver. On relit et on applique la
    // même règle que pour une ligne existante.
    const raced = await readDelivery(params.accessCodeId);
    if (raced.error) {
      return { outcome: "unavailable", reason: `delivery_read_failed: ${raced.error}` };
    }

    if (raced.row) {
      return evaluateExisting(raced.row, params, now);
    }

    return { outcome: "unavailable", reason: "delivery_row_missing_after_conflict" };
  }

  return { outcome: "unavailable", reason: `delivery_claim_failed: ${errorMessage(error)}` };
}

/** Le fournisseur a accepté la requête. Ce n'est pas une preuve de réception. */
export async function markDeliveryAccepted(params: {
  deliveryId: string;
  providerMessageId: string | null;
  now?: Date;
}) {
  const now = params.now ?? new Date();
  const { error } = await admin()
    .from("access_code_deliveries")
    .update({
      status: "sent",
      sent_at: now.toISOString(),
      updated_at: now.toISOString(),
      provider_message_id: params.providerMessageId,
      last_error: null,
    })
    .eq("id", params.deliveryId)
    .select("id");

  // L'email est parti mais l'état n'a pas pu être écrit : la ligne reste
  // `pending`. Une reprise ultérieure la retrouvera et, dans la fenêtre
  // d'idempotence, refera l'appel avec la MÊME clé — que Resend dédoublonne.
  return { recorded: !error, error: error ? errorMessage(error) : null };
}

export async function markDeliveryOutcome(params: {
  deliveryId: string;
  status: "failed" | "unknown";
  reason: string;
  now?: Date;
}) {
  const now = params.now ?? new Date();
  const { error } = await admin()
    .from("access_code_deliveries")
    .update({
      status: params.status,
      updated_at: now.toISOString(),
      last_error: params.reason,
    })
    .eq("id", params.deliveryId)
    .select("id");

  return { recorded: !error, error: error ? errorMessage(error) : null };
}
