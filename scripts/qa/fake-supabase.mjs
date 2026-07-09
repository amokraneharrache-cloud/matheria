// Fake @supabase/supabase-js : client Postgres en mémoire.
// Couvre les chaînes du webhook (access_codes: select/eq/maybeSingle, insert/select/single)
// et de la route leads/planning (leads: `await insert([...])` sans .single()).
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
  eq(col, val) {
    this._filters.push([col, val]);
    return this;
  }
  _rows() {
    return this.table === "leads" ? store().leads : store().accessCodes;
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
      const found = this._rows().filter((r) => this._match(r));
      const row = found[0] || null;
      if (!row && kind === "single") {
        return { data: null, error: { code: "PGRST116", message: "no rows" } };
      }
      return { data: row, error: null };
    }
    if (this._op === "insert") {
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
