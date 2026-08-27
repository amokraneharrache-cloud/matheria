-- J58 — Lead-to-Revenue Engine
-- Consentement marketing, preuve de consentement, désinscription et état de
-- séquence email. Migration idempotente : rejouable sans effet de bord.
--
-- Principe directeur : le consentement marketing est FAUX par défaut. Les leads
-- collectés avant cette migration l'ont été sous la promesse « Email uniquement
-- pour envoyer le planning. Aucun spam. » — ils ne sont donc pas activables
-- commercialement et ne doivent jamais être basculés à true rétroactivement.

-- 1) Consentement marketing et sa preuve -------------------------------------

ALTER TABLE leads ADD COLUMN IF NOT EXISTS marketing_consent boolean NOT NULL DEFAULT false;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS marketing_consent_at timestamptz;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS consent_version text;

-- Source d'acquisition (utm_source normalisé : organic_google, instagram,
-- tiktok, youtube, direct, email, autre). Jamais de PII ici.
ALTER TABLE leads ADD COLUMN IF NOT EXISTS acquisition_source text;

-- 2) Désinscription ----------------------------------------------------------

-- Jeton opaque permettant la désinscription sans connexion et sans exposer
-- l'email dans une URL publique.
ALTER TABLE leads ADD COLUMN IF NOT EXISTS unsubscribe_token text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS marketing_unsubscribed_at timestamptz;

CREATE UNIQUE INDEX IF NOT EXISTS leads_unsubscribe_token_key
  ON leads(unsubscribe_token)
  WHERE unsubscribe_token IS NOT NULL;

-- Cohérence : un consentement daté implique un consentement vrai.
-- (Contrainte permissive : on veut bloquer l'incohérence, pas la migration.)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'leads_marketing_consent_proof_check'
  ) THEN
    ALTER TABLE leads ADD CONSTRAINT leads_marketing_consent_proof_check
      CHECK (marketing_consent = false OR marketing_consent_at IS NOT NULL);
  END IF;
END $$;

-- 3) État de séquence --------------------------------------------------------

-- Une ligne par (lead, étape). L'index unique EST la garantie d'idempotence :
-- deux exécutions concurrentes du cron ne peuvent pas créer deux envois de la
-- même étape — la seconde échoue en 23505 et est ignorée.
CREATE TABLE IF NOT EXISTS email_sequence_sends (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  lead_id uuid NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  step text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  attempts integer NOT NULL DEFAULT 0,
  sent_at timestamptz,
  last_error text,
  CONSTRAINT email_sequence_sends_status_check
    CHECK (status IN ('pending', 'sent', 'failed', 'skipped'))
);

CREATE UNIQUE INDEX IF NOT EXISTS email_sequence_sends_lead_step_key
  ON email_sequence_sends(lead_id, step);

CREATE INDEX IF NOT EXISTS email_sequence_sends_status_idx
  ON email_sequence_sends(status);

-- 4) Sécurité ----------------------------------------------------------------

ALTER TABLE email_sequence_sends ENABLE ROW LEVEL SECURITY;

-- Aucune politique publique : la table n'est écrite que côté serveur avec la
-- Service Role Key (qui contourne RLS), comme access_codes et practice_sessions.

-- 5) Rappel documentaire -----------------------------------------------------

COMMENT ON COLUMN leads.marketing_consent IS
  'Opt-in marketing explicite. false par défaut. Ne jamais passer à true sans action volontaire de la personne.';
COMMENT ON COLUMN leads.consent_version IS
  'Version du wording affiché au moment du recueil, ex. 2026-08-v1.';
COMMENT ON COLUMN leads.unsubscribe_token IS
  'Jeton opaque de désinscription. Jamais dérivé de l''email.';
COMMENT ON TABLE email_sequence_sends IS
  'État d''avancement de la séquence email par lead. UNIQUE(lead_id, step) garantit l''idempotence.';
