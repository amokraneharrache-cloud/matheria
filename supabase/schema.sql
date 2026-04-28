-- Schema de la table leads pour Matheria

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
ALTER TABLE practice_sessions ENABLE ROW LEVEL SECURITY;

-- Note : Nous n'ajoutons PAS de politiques publiques (anon ou authenticated).
-- Les insertions se font côté backend via les Server Actions avec la "Service Role Key",
-- ce qui bypass le RLS. Cela garantit que personne ne peut lire/écrire publiquement depuis le navigateur.
