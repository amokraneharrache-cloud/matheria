// Fake resend : capture les emails au lieu de les envoyer. Aucun email réel.
import { store } from "./store.mjs";

export class Resend {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.emails = {
      send: async (payload, options) => {
        const s = store();
        const idempotencyKey = options?.idempotencyKey ?? null;
        if (idempotencyKey) {
          s.resendIdempotencyKeys.push(idempotencyKey);
        }

        // J74 : dédoublonnage fournisseur. Resend conserve une clé
        // d'idempotence 24 h et renvoie la réponse d'origine au lieu de
        // réexpédier. C'est la garantie sur laquelle s'appuie la reprise d'un
        // envoi au résultat ambigu : on la reproduit pour la tester vraiment.
        if (idempotencyKey && s.resendIdempotency.has(idempotencyKey)) {
          return { data: { id: s.resendIdempotency.get(idempotencyKey) }, error: null };
        }

        // Coupure réseau simulée : le SDK propage l'exception et l'appelant ne
        // sait PAS si le message est parti.
        if (s.emailsSendThrow) {
          // Le message a pu être accepté avant la coupure : on le matérialise
          // côté fournisseur quand le test le demande explicitement.
          if (s.emailsSendThrow.acceptedBeforeThrow && idempotencyKey) {
            const id = "re_fake_" + ++s.idSeq;
            s.resendIdempotency.set(idempotencyKey, id);
            s.emails.push({ id, idempotencyKey, ...payload });
          }
          throw s.emailsSendThrow.error ?? new Error("network down");
        }

        // Échec simulé par le test (API down, clé invalide, etc.) : le SDK
        // Resend renvoie { error } sans throw, on reproduit ce contrat.
        if (s.emailsSendError) {
          return { data: null, error: s.emailsSendError };
        }

        const id = "re_fake_" + ++s.idSeq;
        if (idempotencyKey) {
          s.resendIdempotency.set(idempotencyKey, id);
        }
        s.emails.push({ id, idempotencyKey, ...payload });
        return { data: { id }, error: null };
      },
    };
  }
}
