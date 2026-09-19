-- J74 — Reprise de l'envoi du code d'accès après un échec Resend.
--
-- Défaut corrigé (reproduit en local le 18/09/2026, rapport ops/J73/B-offre.md) :
-- paiement payé -> code créé -> envoi Resend en échec -> le rejeu du même
-- événement Stripe repartait en « duplicate » sans jamais retenter l'email.
-- L'acheteur restait sans code, définitivement.
--
-- Migration ADDITIVE et idempotente : elle crée un état d'envoi, elle ne
-- réécrit AUCUNE ligne existante.
--
-- RÈGLE MÉTIER DURE : aucun code d'accès antérieur à cette migration ne doit
-- devenir automatiquement « pending »/« failed » (ce qui déclencherait un
-- renvoi) ni « sent » (ce qui inventerait un succès). Leur état d'envoi est et
-- reste INCONNU. C'est pourquoi cette migration ne crée aucune ligne dans
-- access_code_deliveries et ne renseigne delivery_tracking_started_at sur
-- aucune ligne historique.

-- 1) Discriminant « suivi / legacy » sur access_codes -------------------------

-- NULL = code créé avant le suivi d'envoi : état d'envoi inconnu, jamais
-- réexpédié automatiquement. Renseigné par le code applicatif à l'insertion
-- des nouveaux codes uniquement. Volontairement PAS de DEFAULT now() : un
-- DEFAULT n'aurait pas touché les lignes existantes, mais il rendrait le
-- discriminant dépendant du moteur plutôt que d'une écriture explicite.
ALTER TABLE access_codes ADD COLUMN IF NOT EXISTS delivery_tracking_started_at timestamptz;

COMMENT ON COLUMN access_codes.delivery_tracking_started_at IS
  'Horodatage de prise en charge par le suivi d''envoi (J74). NULL = code legacy : état d''envoi inconnu, aucune reprise automatique.';

-- 2) État d'envoi durable ----------------------------------------------------

-- Une ligne par (code d'accès, canal). L'index UNIQUE porte la réservation
-- atomique : deux workers concurrents sur la même session ne peuvent pas
-- réserver le même envoi, le second reçoit une 23505.
--
-- Statuts :
--   pending : réservation prise, tentative en cours (ou abandonnée si périmée)
--   sent    : le fournisseur a ACCEPTÉ la requête (accusé d'acceptation API).
--             Ce n'est pas une preuve de réception en boîte.
--   failed  : non-acceptation certaine par le fournisseur (erreur API
--             renvoyée sans identifiant de message) -> reprise possible.
--   unknown : résultat AMBIGU (coupure réseau, 5xx, écriture d'état impossible
--             après un envoi accepté). Aucune reprise aveugle : rapprochement
--             manuel au-delà de la fenêtre d'idempotence du fournisseur.
CREATE TABLE IF NOT EXISTS access_code_deliveries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  access_code_id uuid NOT NULL REFERENCES access_codes(id) ON DELETE CASCADE,
  stripe_session_id text,
  channel text NOT NULL DEFAULT 'access_code_email',
  status text NOT NULL DEFAULT 'pending',
  attempts integer NOT NULL DEFAULT 0,
  claimed_at timestamptz,
  sent_at timestamptz,
  provider_message_id text,
  idempotency_key text,
  -- Ancre de la fenêtre d'idempotence fournisseur : première utilisation de la
  -- clé courante. Jamais reculée tant que la clé ne change pas.
  idempotency_key_first_used_at timestamptz,
  last_error text,
  CONSTRAINT access_code_deliveries_status_check
    CHECK (status IN ('pending', 'sent', 'failed', 'unknown'))
);

-- Garantie d'idempotence côté base, pas côté application.
CREATE UNIQUE INDEX IF NOT EXISTS access_code_deliveries_code_channel_key
  ON access_code_deliveries(access_code_id, channel);

-- Recherche des envois à rattraper (supervision / rapprochement manuel).
CREATE INDEX IF NOT EXISTS access_code_deliveries_status_idx
  ON access_code_deliveries(status);

CREATE INDEX IF NOT EXISTS access_code_deliveries_session_idx
  ON access_code_deliveries(stripe_session_id)
  WHERE stripe_session_id IS NOT NULL;

-- 3) Sécurité ----------------------------------------------------------------

ALTER TABLE access_code_deliveries ENABLE ROW LEVEL SECURITY;

-- Aucune politique publique : écriture serveur uniquement via la Service Role
-- Key (qui contourne RLS), comme access_codes et email_sequence_sends.

COMMENT ON TABLE access_code_deliveries IS
  'État d''envoi du code d''accès. UNIQUE(access_code_id, channel) garantit la réservation atomique. « sent » = acceptation fournisseur, pas réception.';
