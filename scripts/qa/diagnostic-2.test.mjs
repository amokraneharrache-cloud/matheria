import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { store } from "./store.mjs";

const {
  DIAGNOSTIC_QUESTIONS,
  DIAGNOSTIC_DOMAINS,
  scoreDiagnostic,
} = await import("@/lib/diagnostic");
const { POST } = await import("@/app/api/leads/diagnostic/route");

let ipSequence = 30;

function makeRequest(body) {
  return new Request("http://localhost/api/leads/diagnostic", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": "198.51.100." + ++ipSequence,
    },
    body: JSON.stringify(body),
  });
}

function resetStore() {
  store().leads.length = 0;
  store().emails.length = 0;
  store().leadsInsertError = null;
  store().emailsSendError = null;
}

function allCorrectAnswers() {
  return Object.fromEntries(
    DIAGNOSTIC_QUESTIONS.map((question) => [question.id, question.correctIndex]),
  );
}

test("1. le diagnostic utilise exactement 10 questions existantes, corrigées et équilibrées", () => {
  assert.deepEqual(
    DIAGNOSTIC_QUESTIONS.map((question) => question.sourceId),
    ["q-226", "q-124", "q-170", "q-182", "q-191", "q-197", "q-207", "q-210", "q-129", "q-244"],
  );
  assert.equal(DIAGNOSTIC_QUESTIONS.length, 10);
  assert.equal(DIAGNOSTIC_DOMAINS.length, 5);

  for (const domain of DIAGNOSTIC_DOMAINS) {
    assert.equal(
      DIAGNOSTIC_QUESTIONS.filter((question) => question.domainId === domain.id).length,
      2,
      domain.label + ": deux questions",
    );
  }
  for (const question of DIAGNOSTIC_QUESTIONS) {
    assert.equal(question.options.length, 4);
    assert.ok(question.explanation.length > 20, question.id + ": correction présente");
    assert.ok(question.correctIndex >= 0 && question.correctIndex < 4);
  }
  assert.ok(
    new Set(DIAGNOSTIC_QUESTIONS.map((question) => question.correctIndex)).size >= 3,
    "les bonnes réponses ne doivent pas toutes occuper la même position",
  );
});

test("2. scoring exact : 10/10 et 2/2 dans chaque domaine", () => {
  const result = scoreDiagnostic(allCorrectAnswers());
  assert.equal(result.correct, 10);
  assert.equal(result.total, 10);
  assert.equal(result.level, "solid");
  assert.equal(result.priorityDomains.length, 0);
  assert.ok(result.domains.every((domain) => domain.correct === 2 && domain.total === 2));
});

test("3. scoring par domaine : une bonne réponse sur deux donne 1/2 partout", () => {
  const answers = {};
  for (const domain of DIAGNOSTIC_DOMAINS) {
    const [correctQuestion, wrongQuestion] = DIAGNOSTIC_QUESTIONS.filter(
      (question) => question.domainId === domain.id,
    );
    answers[correctQuestion.id] = correctQuestion.correctIndex;
    answers[wrongQuestion.id] = (wrongQuestion.correctIndex + 1) % 4;
  }

  const result = scoreDiagnostic(answers);
  assert.equal(result.correct, 5);
  assert.equal(result.level, "intermediate");
  assert.ok(result.domains.every((domain) => domain.correct === 1 && domain.total === 2));
  assert.ok(result.domains.every((domain) => domain.statusLabel === "À consolider"));
});

test("4. résultat visible sans email et aucune friction parent/spinner dans le flow", async () => {
  const source = await readFile(
    new URL("../../src/app/diagnostic/DiagnosticClient.tsx", import.meta.url),
    "utf8",
  );
  assert.match(source, /setPhase\("result"\)/, "le résultat est un état direct du test");
  assert.match(source, /Résultat immédiat/);
  assert.match(source, /Correction des 10 questions/);
  assert.match(source, /Facultatif : ton résultat est déjà complet/);
  assert.doesNotMatch(source, /Email du parent/i);
  assert.doesNotMatch(source, /Analyse en cours/i);
  assert.doesNotMatch(source, /âge exact/i);
});

test("5. email transactionnel sans opt-in : ressource envoyée, marketing false", async () => {
  resetStore();
  const response = await POST(
    makeRequest({
      email: "qa+diagnostic2@example.com",
      score: 4,
      weakDomains: ["probabilites", "calcul"],
      marketingConsent: false,
      utmSource: "instagram",
    }),
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.success, true);
  assert.equal(body.emailSent, true);
  assert.equal(store().leads.length, 1);
  assert.equal(store().leads[0].marketing_consent, false);
  assert.equal(store().leads[0].marketing_consent_at, null);
  assert.equal(store().leads[0].acquisition_source, "instagram");
  assert.deepEqual(store().leads[0].difficulties, ["probabilites", "calcul"]);
  assert.equal(store().emails.length, 1);
  assert.match(store().emails[0].subject, /4\/10/);
  assert.match(store().emails[0].text, /planning-revision-bac-maths/);
  assert.match(store().emails[0].text, /Probabilités/);
  assert.doesNotMatch(store().emails[0].text, /Pack Révision Express|39\s*€/i);
});

test("6. opt-in explicite : consentement, date et version sont stockés", async () => {
  resetStore();
  const response = await POST(
    makeRequest({
      email: "qa+diagnostic-consent@example.com",
      score: 7,
      weakDomains: ["suites"],
      marketingConsent: true,
      utmSource: "youtube",
    }),
  );
  const body = await response.json();

  assert.equal(body.success, true);
  assert.equal(store().leads[0].marketing_consent, true);
  assert.ok(store().leads[0].marketing_consent_at);
  assert.equal(store().leads[0].consent_version, "2026-08-v1");
  assert.equal(store().leads[0].acquisition_source, "youtube");
});

test("7. même email : aucune double inscription et opt-in actuel pris en compte", async () => {
  resetStore();
  const email = "qa+diagnostic-existing@example.com";

  const first = await POST(
    makeRequest({ email, score: 6, weakDomains: ["fonctions"], marketingConsent: false }),
  );
  assert.equal((await first.json()).duplicate, false);

  const second = await POST(
    makeRequest({ email, score: 8, weakDomains: ["calcul"], marketingConsent: true }),
  );
  const body = await second.json();

  assert.equal(body.success, true);
  assert.equal(body.duplicate, true);
  assert.equal(store().leads.length, 1);
  assert.equal(store().leads[0].marketing_consent, true);
  assert.ok(store().leads[0].marketing_consent_at);
});

test("8. payloads invalides : aucun lead et aucun email", async () => {
  resetStore();
  const invalidEmail = await POST(
    makeRequest({ email: "invalide", score: 5, weakDomains: [] }),
  );
  assert.equal(invalidEmail.status, 400);

  const invalidScore = await POST(
    makeRequest({ email: "qa+invalid-score@example.com", score: 11, weakDomains: [] }),
  );
  assert.equal(invalidScore.status, 400);
  assert.equal(store().leads.length, 0);
  assert.equal(store().emails.length, 0);
});
