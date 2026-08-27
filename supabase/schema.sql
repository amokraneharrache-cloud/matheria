-- Schema de la table leads pour SprintMaths

CREATE TABLE leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  parent_email text NOT NULL,
  student_pseudo text,
  exam_goal text NOT NULL,
  current_level text NOT NULL,
  difficulties text[] NOT NULL,
  source text,
  wants_pack boolean DEFAULT false
);

-- Activation du Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Politique de sécurité : Autoriser les insertions anonymes (pour le diagnostic)
CREATE POLICY "Allow anonymous inserts" ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- MVP Sprint 1 : Tables pour l'accès post-paiement

CREATE TABLE beta_access (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  parent_email text NOT NULL,
  student_pseudo text NOT NULL,
  exam_goal text NOT NULL,
  current_level text NOT NULL,
  access_code text NOT NULL
);

-- Sprint 9 : codes d'accès uniques post-paiement

CREATE TABLE access_codes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now() NOT NULL,
  code text NOT NULL UNIQUE,
  parent_email text,
  source text NOT NULL DEFAULT 'manual',
  stripe_session_id text,
  stripe_payment_intent_id text,
  amount_total integer,
  currency text,
  status text NOT NULL DEFAULT 'unused',
  used_at timestamptz,
  beta_access_id uuid REFERENCES beta_access(id) ON DELETE SET NULL,
  CONSTRAINT access_codes_status_check CHECK (status IN ('unused', 'used', 'revoked')),
  CONSTRAINT access_codes_code_not_empty CHECK (length(btrim(code)) > 0)
);

-- Migration idempotente pour les bases existantes avant l'automatisation Stripe.
ALTER TABLE access_codes ADD COLUMN IF NOT EXISTS source text DEFAULT 'manual';
ALTER TABLE access_codes ADD COLUMN IF NOT EXISTS stripe_session_id text;
ALTER TABLE access_codes ADD COLUMN IF NOT EXISTS stripe_payment_intent_id text;
ALTER TABLE access_codes ADD COLUMN IF NOT EXISTS amount_total integer;
ALTER TABLE access_codes ADD COLUMN IF NOT EXISTS currency text;

UPDATE access_codes SET source = 'manual' WHERE source IS NULL;
ALTER TABLE access_codes ALTER COLUMN source SET DEFAULT 'manual';
ALTER TABLE access_codes ALTER COLUMN source SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS access_codes_stripe_session_id_key
  ON access_codes(stripe_session_id)
  WHERE stripe_session_id IS NOT NULL;

CREATE TABLE practice_sessions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  beta_access_id uuid REFERENCES beta_access(id) ON DELETE CASCADE,
  parent_email text NOT NULL,
  student_pseudo text NOT NULL,
  exam_goal text NOT NULL,
  score integer NOT NULL,
  total_questions integer NOT NULL,
  topics text[] NOT NULL
);

-- Activation du Row Level Security (RLS) sur les nouvelles tables
ALTER TABLE beta_access ENABLE ROW LEVEL SECURITY;
ALTER TABLE access_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_sessions ENABLE ROW LEVEL SECURITY;

-- Note : Nous n'ajoutons PAS de politiques publiques (anon ou authenticated).
-- Les insertions se font côté backend via les Server Actions avec la "Service Role Key",
-- ce qui bypass le RLS. Cela garantit que personne ne peut lire/écrire publiquement depuis le navigateur.

-- ---------------------------------------------------------------------------
-- J58 : consentement marketing, désinscription et séquence email.
-- Le détail est dans supabase/migrations/2026-08-26-email-consent-and-sequence.sql
-- (migration idempotente, à appliquer sur les bases existantes).
--
-- Colonnes ajoutées à `leads` :
--   marketing_consent boolean NOT NULL DEFAULT false
--   marketing_consent_at timestamptz
--   consent_version text
--   acquisition_source text
--   unsubscribe_token text (index unique partiel)
--   marketing_unsubscribed_at timestamptz
--
-- Table ajoutée : email_sequence_sends (lead_id, step) UNIQUE -> idempotence.
--
-- RÈGLE MÉTIER : marketing_consent est faux par défaut et ne doit jamais être
-- passé à true sans action volontaire de la personne concernée.
-- ---------------------------------------------------------------------------
