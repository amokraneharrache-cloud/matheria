// Fake @supabase/supabase-js : client Postgres en mémoire.
// Couvre les chaînes du webhook (access_codes: select/eq/maybeSingle, insert/select/single),
// la route leads/planning (leads: `await insert([...])` sans .single())
// et l'état d'envoi J74 (access_code_deliveries: insert unique + update
// conditionnel `.eq(...).eq(status).select("id")`, qui porte le compare-and-swap).
//
// LIMITE ASSUMÉE : ces fakes reproduisent les CONDITIONS atomiques attendues
// (violation d'unicité 23505, update filtré ne touchant que les lignes encore
// dans l'état lu) dans un process mono-thread. Ils ne prouvent PAS les
// garanties réelles de Postgres (index UNIQUE, atomicité de l'UPDATE) : cela
// se vérifie sur une base, pas ici.
import { store } from "./store.mjs";

const UNIQUE_VIOLATION = "23505";

class Query {
  constructor(table, clientMode) {
    this.table = table;
    this.clientMode = clientMode;
    this._op = "select";
    this._filters = [];
    this._insertRow = null;
  }
  select() {
    return this;
  }
  insert(row) {
    this._op = "insert";
    this._insertRow = Array.isArray(row) ? row[0] : row;
    return this;
  }
  // J58 : `update(...).eq(...)` (désinscription, finalisation d'un envoi).
  update(patch) {
    this._op = "update";
    this._patch = patch;
    return this;
  }
  eq(col, val) {
    this._filters.push([col, val]);
    return this;
  }
  // Utilisé par le healthcheck (`select("id").limit(1)`), awaité directement.
  limit(n) {
    this._limit = n;
    return this;
  }
  _rows() {
    const s = store();
    if (this.table === "leads") return s.leads;
    if (this.table === "email_sequence_sends") return s.sequenceSends;
    if (this.table === "access_code_deliveries") return s.accessCodeDeliveries;
    return s.accessCodes;
  }
  _match(r) {
    return this._filters.every(([c, v]) => r[c] === v);
  }
  async maybeSingle() {
    return this._exec("maybeSingle");
  }
  async single() {
    return this._exec("single");
  }
  // Rend la Query "awaitable" pour `await client.from(...).insert([...])`
  // (insert sans .single()). Sans effet sur les chaînes qui terminent par
  // .single()/.maybeSingle() (le webhook), qui renvoient déjà une Promise.
  then(onFulfilled, onRejected) {
    return this._exec(null).then(onFulfilled, onRejected);
  }
  async _exec(kind) {
    const s = store();
    if (this._op === "select") {
      // Lenteur simulée (test de timeout du healthcheck).
      if (s.selectDelayMs > 0) {
        await new Promise((resolve) => setTimeout(resolve, s.selectDelayMs));
      }
      // Erreur simulée (Supabase en pause, projet injoignable...).
      if (s.selectError) {
        return { data: null, error: s.selectError };
      }
      // J74 : panne ciblée sur la lecture de l'état d'envoi.
      if (this.table === "access_code_deliveries" && s.deliveriesSelectError) {
        return { data: null, error: s.deliveriesSelectError };
      }
      const found = this._rows().filter((r) => this._match(r));
      // Sans .single()/.maybeSingle(), Supabase renvoie un tableau de lignes.
      if (kind === null) {
        return {
          data: typeof this._limit === "number" ? found.slice(0, this._limit) : found,
          error: null,
        };
      }
      const row = found[0] || null;
      if (!row && kind === "single") {
        return { data: null, error: { code: "PGRST116", message: "no rows" } };
      }
      return { data: row, error: null };
    }
    if (this._op === "update") {
      // J74 : panne ciblée sur l'écriture de l'état d'envoi (réservation,
      // enregistrement d'un succès...).
      if (this.table === "access_code_deliveries" && s.deliveriesUpdateError) {
        return { data: null, error: s.deliveriesUpdateError };
      }
      const matched = this._rows().filter((r) => this._match(r));
      for (const row of matched) {
        Object.assign(row, this._patch);
      }
      // `.update(...).select("id")` renvoie les lignes touchées.
      return { data: matched.map((r) => ({ id: r.id })), error: null };
    }
    if (this._op === "insert") {
      if (this.table === "email_sequence_sends") {
        if (s.sequenceInsertError) {
          return { data: null, error: s.sequenceInsertError };
        }
        const row = { ...this._insertRow };
        // Reproduit l'index UNIQUE(lead_id, step) : c'est lui qui porte
        // l'idempotence en production, le test doit l'exercer vraiment.
        if (
          s.sequenceSends.some((r) => r.lead_id === row.lead_id && r.step === row.step)
        ) {
          return { data: null, error: { code: UNIQUE_VIOLATION, message: "duplicate step" } };
        }
        row.id = "seq_" + ++s.idSeq;
        s.sequenceSends.push(row);
        return { data: { id: row.id }, error: null };
      }
      if (this.table === "access_code_deliveries") {
        if (s.deliveriesInsertError) {
          return { data: null, error: s.deliveriesInsertError };
        }
        const row = { ...this._insertRow };
        // Reproduit UNIQUE(access_code_id, channel) : c'est cet index qui
        // porte la réservation atomique en production.
        if (
          s.accessCodeDeliveries.some(
            (r) => r.access_code_id === row.access_code_id && r.channel === row.channel,
          )
        ) {
          return { data: null, error: { code: UNIQUE_VIOLATION, message: "duplicate delivery" } };
        }
        row.id = "del_" + ++s.idSeq;
        s.accessCodeDeliveries.push(row);
        return { data: { id: row.id }, error: null };
      }
      if (this.table === "leads") {
        s.lastLeadClientMode = this.clientMode;
        s.leadClientModes.push(this.clientMode);
        // Erreur simulée par le test (Supabase indisponible, contrainte, etc.).
        if (s.leadsInsertError) {
          return { data: null, error: s.leadsInsertError };
        }
        const leadRow = { ...this._insertRow, id: "lead_" + ++s.idSeq };
        s.leads.push(leadRow);
        return { data: { id: leadRow.id }, error: null };
      }
      const row = { ...this._insertRow };
      if (s.accessCodes.some((r) => r.code === row.code)) {
        return { data: null, error: { code: UNIQUE_VIOLATION, message: "duplicate code" } };
      }
      if (
        row.stripe_session_id &&
        s.accessCodes.some((r) => r.stripe_session_id === row.stripe_session_id)
      ) {
        return { data: null, error: { code: UNIQUE_VIOLATION, message: "duplicate session" } };
      }
      row.id = "ac_" + ++s.idSeq;
      s.accessCodes.push(row);
      return { data: { id: row.id, code: row.code }, error: null };
    }
    return { data: null, error: null };
  }
}

class FakeSupabase {
  constructor(clientMode) {
    this.clientMode = clientMode;
  }

  from(table) {
    return new Query(table, this.clientMode);
  }
}

export function createClient(_url, key) {
  const clientMode = key === process.env.SUPABASE_SERVICE_ROLE_KEY ? "admin" : "anon";
  store().supabaseClientModes.push(clientMode);
  return new FakeSupabase(clientMode);
}
