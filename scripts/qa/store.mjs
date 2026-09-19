// Magasin en mémoire partagé entre les fakes (Supabase/Resend) et le test.
// Aucune I/O réelle : tout vit dans globalThis pour la durée du process de test.
export function store() {
  if (!globalThis.__QA__) {
    globalThis.__QA__ = {
      accessCodes: [],
      leads: [],
      // J58 : état de séquence email (table email_sequence_sends).
      sequenceSends: [],
      // J74 : état d'envoi du code d'accès (table access_code_deliveries).
      accessCodeDeliveries: [],
      emails: [],
      idSeq: 0,
      leadClientModes: [],
      lastLeadClientMode: null,
      supabaseClientModes: [],
      // Contrôle de test : simuler une erreur Supabase sur un insert `leads`
      // (null = insert normal). N'affecte ni le webhook ni access_codes.
      leadsInsertError: null,
      // Contrôle de test : simuler une erreur sur un insert email_sequence_sends.
      sequenceInsertError: null,
      // Contrôle de test : simuler un échec Resend sur emails.send
      // (null = envoi normal capturé dans `emails`).
      emailsSendError: null,
      // J74 : simuler une coupure réseau (throw) au lieu d'une réponse
      // d'erreur. Le résultat de l'envoi est alors AMBIGU.
      emailsSendThrow: null,
      // J74 : clés d'idempotence déjà vues par le fournisseur (clé -> id de
      // message). Reproduit le dédoublonnage Resend, sans quoi les tests de
      // reprise ne prouveraient rien.
      resendIdempotency: new Map(),
      // J74 : toutes les clés reçues, dans l'ordre (assertions de test).
      resendIdempotencyKeys: [],
      // J74 : contrôles d'erreur ciblés sur access_code_deliveries.
      deliveriesSelectError: null,
      deliveriesInsertError: null,
      deliveriesUpdateError: null,
      // Contrôles de test pour le healthcheck : simuler une erreur ou une
      // lenteur sur un SELECT (null / 0 = lecture normale immédiate).
      selectError: null,
      selectDelayMs: 0,
    };
  }
  return globalThis.__QA__;
}
