// Magasin en mémoire partagé entre les fakes (Supabase/Resend) et le test.
// Aucune I/O réelle : tout vit dans globalThis pour la durée du process de test.
export function store() {
  if (!globalThis.__QA__) {
    globalThis.__QA__ = {
      accessCodes: [],
      leads: [],
      emails: [],
      idSeq: 0,
      // Contrôle de test : simuler une erreur Supabase sur un insert `leads`
      // (null = insert normal). N'affecte ni le webhook ni access_codes.
      leadsInsertError: null,
    };
  }
  return globalThis.__QA__;
}
