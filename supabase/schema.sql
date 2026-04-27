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
