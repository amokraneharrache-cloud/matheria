// Magasin en mémoire partagé entre les fakes (Supabase/Resend) et le test.
// Aucune I/O réelle : tout vit dans globalThis pour la durée du process de test.
export function store() {
  if (!globalThis.__QA__) {
    globalThis.__QA__ = {
      accessCodes: [],
      leads: [],
      emails: [],
      idSeq: 0,
      leadClientModes: [],
      lastLeadClientMode: null,
      supabaseClientModes: [],
      // Contrôle de test : simuler une erreur Supabase sur un insert `leads`
      // (null = insert normal). N'affecte ni le webhook ni access_codes.
      leadsInsertError: null,
      // Contrôle de test : simuler un échec Resend sur emails.send
      // (null = envoi normal capturé dans `emails`).
      emailsSendError: null,
      // Contrôles de test pour le healthcheck : simuler une erreur ou une
      // lenteur sur un SELECT (null / 0 = lecture normale immédiate).
      selectError: null,
      selectDelayMs: 0,
    };
  }
  return globalThis.__QA__;
}
