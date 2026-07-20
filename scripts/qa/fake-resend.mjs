// Fake resend : capture les emails au lieu de les envoyer. Aucun email réel.
import { store } from "./store.mjs";

export class Resend {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.emails = {
      send: async (payload) => {
        const s = store();
        // Échec simulé par le test (API down, clé invalide, etc.) : le SDK
        // Resend renvoie { error } sans throw, on reproduit ce contrat.
        if (s.emailsSendError) {
          return { data: null, error: s.emailsSendError };
        }
        const id = "re_fake_" + ++s.idSeq;
        s.emails.push({ id, ...payload });
        return { data: { id }, error: null };
      },
    };
  }
}
