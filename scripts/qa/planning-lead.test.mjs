// QA e2e de la route /api/leads/planning SANS infra réelle :
//  - vrai code métier : src/app/api/leads/planning/route.ts (via alias résolu par les hooks)
//  - Supabase + Resend remplacés par des fakes en mémoire (aucune I/O, aucun secret)
//  - IP unique par requête pour ne jamais déclencher le rate-limit (5/h/clé)
import test from "node:test";
import assert from "node:assert/strict";
import { store } from "./store.mjs";

// Le vrai handler, via l'alias résolu par les hooks.
const { POST } = await import("@/app/api/leads/planning/route");

let ipSeq = 0;
function makeRequest(body, { raw = null } = {}) {
  const headers = {
    "content-type": "application/json",
    // Clé de rate-limit unique par requête -> aucun 429 parasite entre tests.
    "x-forwarded-for": `203.0.113.${++ipSeq}`,
  };
  return new Request("http://localhost/api/leads/planning", {
    method: "POST",
    headers,
    body: raw !== null ? raw : JSON.stringify(body),
  });
}

function resetStore() {
  store().leads.length = 0;
  store().emails.length = 0;
  store().leadsInsertError = null;
}

function containsEmail(value) {
  return /[^\s@]+@[^\s@]+/.test(JSON.stringify(value));
}

test("1. email valide -> 200, lead enregistré + email envoyé, réponse sans PII", async () => {
  resetStore();

  const res = await POST(
    makeRequest({ email: "qa+planning@example.com", sourcePage: "/planning-revision-bac-maths" }),
  );
  const body = await res.json();

  assert.equal(res.status, 200);
  assert.equal(body.success, true);
  assert.equal(body.saved, true);
  assert.equal(body.duplicate, false);

  // Lead persisté avec les bons champs.
  assert.equal(store().leads.length, 1);
  const lead = store().leads[0];
  assert.equal(lead.parent_email, "qa+planning@example.com");
  assert.equal(lead.exam_goal, "bac_maths_2027");
  assert.equal(lead.current_level, "terminale");
  assert.equal(lead.wants_pack, false);
  assert.equal(lead.source, "planning_bac_maths_2027:/planning-revision-bac-maths");

  // Email capturé par le fake (aucun envoi réel).
  assert.equal(store().emails.length, 1);
  assert.equal(store().emails[0].to, "qa+planning@example.com");

  // Anti-PII : la réponse HTTP ne contient jamais l'email.
  assert.ok(!containsEmail(body), "la réponse HTTP ne doit pas contenir d'email");
});

test("2. email invalide -> 400, aucun lead, aucun email", async () => {
  resetStore();

  const res = await POST(makeRequest({ email: "pas-un-email", sourcePage: "/x" }));
  const body = await res.json();

  assert.equal(res.status, 400);
  assert.equal(body.success, false);
  assert.equal(store().leads.length, 0);
  assert.equal(store().emails.length, 0);
});

test("3. JSON invalide -> 400", async () => {
  resetStore();

  const res = await POST(makeRequest(null, { raw: "{ ceci n'est pas du json" }));
  const body = await res.json();

  assert.equal(res.status, 400);
  assert.equal(body.success, false);
  assert.equal(store().leads.length, 0);
});

test("4. honeypot rempli -> 200 silencieux, aucun lead, aucun email", async () => {
  resetStore();

  const res = await POST(
    makeRequest({ email: "qa+bot@example.com", website: "http://spam.example", sourcePage: "/x" }),
  );
  const body = await res.json();

  assert.equal(res.status, 200);
  assert.equal(body.success, true);
  assert.equal(body.saved, false);
  assert.equal(store().leads.length, 0);
  assert.equal(store().emails.length, 0);
});

test("5. erreur Supabase simulée -> 500, message générique sans PII", async () => {
  resetStore();
  store().leadsInsertError = { code: "08006", message: "connection to server failed" };

  const res = await POST(makeRequest({ email: "qa+down@example.com", sourcePage: "/x" }));
  const body = await res.json();

  assert.equal(res.status, 500);
  assert.equal(body.success, false);
  assert.match(body.message, /Impossible d'enregistrer/);
  assert.equal(store().leads.length, 0);
  assert.equal(store().emails.length, 0, "pas d'email si la sauvegarde échoue");
  assert.ok(!containsEmail(body), "aucun email dans la réponse d'erreur");
});

test("6. doublon (contrainte unique 23505) -> 200 idempotent, pas de second email", async () => {
  resetStore();
  store().leadsInsertError = {
    code: "23505",
    message: "duplicate key value violates unique constraint",
  };

  const res = await POST(makeRequest({ email: "qa+dup@example.com", sourcePage: "/x" }));
  const body = await res.json();

  assert.equal(res.status, 200);
  assert.equal(body.success, true);
  assert.equal(body.saved, true);
  assert.equal(body.duplicate, true);
  assert.equal(body.emailSkippedReason, "duplicate_lead");
  assert.equal(store().emails.length, 0, "aucun second email sur doublon");
});
