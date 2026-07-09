// QA du server action `saveLead` (diagnostic) SANS infra réelle :
//  - vrai code métier : src/app/actions.ts (via alias résolu par les hooks)
//  - Supabase remplacé par un fake en mémoire (aucune I/O, aucun secret)
//  - saveLead ne valide pas l'email (c'est le front qui le fait) -> cas "email invalide" N/A ici.
import test from "node:test";
import assert from "node:assert/strict";
import { store } from "./store.mjs";

// Le vrai server action, via l'alias résolu par les hooks.
const { saveLead } = await import("@/app/actions");

const DEFAULT_ENV = {
  NEXT_PUBLIC_SUPABASE_URL: "http://fake.local",
  NEXT_PUBLIC_SUPABASE_ANON_KEY: "fake-anon-key",
  SUPABASE_SERVICE_ROLE_KEY: "fake-service-role-key",
};

function setSupabaseEnv({ admin = true, anon = true } = {}) {
  process.env.NEXT_PUBLIC_SUPABASE_URL = admin || anon ? DEFAULT_ENV.NEXT_PUBLIC_SUPABASE_URL : "";
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = anon
    ? DEFAULT_ENV.NEXT_PUBLIC_SUPABASE_ANON_KEY
    : "";
  process.env.SUPABASE_SERVICE_ROLE_KEY = admin ? DEFAULT_ENV.SUPABASE_SERVICE_ROLE_KEY : "";
}

function resetStore() {
  setSupabaseEnv();
  store().leads.length = 0;
  store().leadClientModes.length = 0;
  store().lastLeadClientMode = null;
  store().leadsInsertError = null;
}

function containsEmail(value) {
  return /[^\s@]+@[^\s@]+/.test(typeof value === "string" ? value : JSON.stringify(value));
}

// Capture console.error / console.warn en sérialisant les objets (logStep passe un objet).
async function captureLogs(fn) {
  const origError = console.error;
  const origWarn = console.warn;
  const lines = [];
  const push = (...args) =>
    lines.push(args.map((a) => (typeof a === "string" ? a : JSON.stringify(a))).join(" "));
  console.error = push;
  console.warn = push;
  try {
    const result = await fn();
    return { result, logs: lines.join("\n") };
  } finally {
    console.error = origError;
    console.warn = origWarn;
  }
}

const baseData = () => ({
  exam_goal: "terminale",
  current_level: "moyen",
  difficulties: ["calcul", "fonctions"],
  parent_email: "qa+diag@example.com",
  student_pseudo: "Leo",
  source: "diagnostic_funnel",
});

test("1. admin disponible -> saveLead utilise admin, saved:true, retour sans PII", async () => {
  resetStore();

  const result = await saveLead(baseData());

  assert.equal(result.success, true);
  assert.equal(result.saved, true);
  assert.equal(result.duplicate, false);
  assert.equal(result.clientMode, "admin");
  assert.equal(store().lastLeadClientMode, "admin");

  assert.equal(store().leads.length, 1);
  const lead = store().leads[0];
  assert.equal(lead.parent_email, "qa+diag@example.com");
  assert.equal(lead.student_pseudo, "Leo");
  assert.equal(lead.exam_goal, "terminale");
  assert.equal(lead.source, "diagnostic_funnel");

  // Anti-PII : le retour de la fonction ne contient jamais l'email.
  assert.ok(!containsEmail(result), "le retour ne doit pas contenir d'email");
});

test("2. admin indisponible + anon disponible -> fallback anon, saved:true", async () => {
  resetStore();
  setSupabaseEnv({ admin: false, anon: true });

  const result = await saveLead(baseData());

  assert.equal(result.success, true);
  assert.equal(result.saved, true);
  assert.equal(result.duplicate, false);
  assert.equal(result.clientMode, "anon");
  assert.equal(store().lastLeadClientMode, "anon");
  assert.equal(store().leads.length, 1);
  assert.ok(!containsEmail(result), "le retour ne doit pas contenir d'email");
});

test("3. aucun client disponible -> mocked:true, saved:false, aucun lead", async () => {
  resetStore();
  setSupabaseEnv({ admin: false, anon: false });

  const { result, logs } = await captureLogs(() => saveLead(baseData()));

  assert.equal(result.success, true);
  assert.equal(result.saved, false);
  assert.equal(result.mocked, true);
  assert.equal(result.clientMode, "mock");
  assert.equal(store().leads.length, 0);
  assert.equal(store().lastLeadClientMode, null);
  assert.match(logs, /supabase_not_configured/);
  assert.ok(!containsEmail(result), "le retour mock ne doit pas contenir d'email");
  assert.ok(!logs.includes("qa+diag@example.com"), "les logs mock ne doivent pas contenir l'email");
});

test("4. erreur admin Supabase 08006 -> success:false, saved:false, pas de throw", async () => {
  resetStore();
  store().leadsInsertError = {
    code: "08006",
    status: 503,
    message: "connection to server failed for qa+diag@example.com",
  };

  // Ne doit PAS throw (UX diagnostic doit pouvoir continuer).
  const { result, logs } = await captureLogs(() => saveLead(baseData()));

  assert.equal(result.success, false);
  assert.equal(result.saved, false);
  assert.equal(result.errorCode, "08006");
  assert.equal(result.clientMode, "admin");
  assert.equal(store().lastLeadClientMode, "admin");
  assert.equal(store().leads.length, 0);
  assert.ok(!containsEmail(result), "le retour d'erreur ne doit pas contenir d'email");
  // Le log serveur doit exister avec l'étape + code, mais rester safe.
  assert.match(logs, /\[diagnostic\/saveLead\] save_failed/);
  assert.match(logs, /08006/);
  assert.match(logs, /503/);
  assert.ok(!logs.includes("qa+diag@example.com"), "les logs ne doivent pas contenir l'email");
});

test("5. doublon 23505 -> success:true, saved:true, duplicate:true (idempotent)", async () => {
  resetStore();
  store().leadsInsertError = {
    code: "23505",
    message: "duplicate key value violates unique constraint",
  };

  const result = await saveLead(baseData());

  assert.equal(result.success, true);
  assert.equal(result.saved, true);
  assert.equal(result.duplicate, true);
  assert.equal(result.clientMode, "admin");
  assert.ok(!containsEmail(result));
});

test("6. anti-PII logs : un message d'erreur contenant un email est redacté", async () => {
  resetStore();
  store().leadsInsertError = {
    code: "P0001",
    message: "insert failed for parent_email=leaked@example.com",
  };

  const { result, logs } = await captureLogs(() => saveLead(baseData()));

  assert.equal(result.success, false);
  assert.equal(result.errorCode, "P0001");
  // L'email présent dans le message d'erreur ne doit JAMAIS apparaître en clair.
  assert.ok(!logs.includes("leaked@example.com"), "l'email ne doit pas fuiter dans les logs");
  assert.match(logs, /\[email\]/, "l'email doit être redacté en [email]");
});

test("7. anti-secret logs : un message d'erreur contenant la service role key est redacté", async () => {
  resetStore();
  store().leadsInsertError = {
    code: "P0002",
    message: `insert failed with ${DEFAULT_ENV.SUPABASE_SERVICE_ROLE_KEY} for secret@example.com`,
  };

  const { result, logs } = await captureLogs(() => saveLead(baseData()));

  assert.equal(result.success, false);
  assert.equal(result.errorCode, "P0002");
  assert.ok(
    !logs.includes(DEFAULT_ENV.SUPABASE_SERVICE_ROLE_KEY),
    "la service role key ne doit pas fuiter dans les logs",
  );
  assert.ok(!logs.includes("secret@example.com"), "l'email ne doit pas fuiter dans les logs");
  assert.match(logs, /\[secret\]/, "le secret doit être redacté en [secret]");
  assert.match(logs, /\[email\]/, "l'email doit être redacté en [email]");
});
