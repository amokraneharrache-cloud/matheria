// Fake resend : capture les emails au lieu de les envoyer. Aucun email réel.
import { store } from "./store.mjs";

export class Resend {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.emails = {
      send: async (payload) => {
        const s = store();
        const id = "re_fake_" + ++s.idSeq;
        s.emails.push({ id, ...payload });
        return { data: { id }, error: null };
      },
    };
  }
}
