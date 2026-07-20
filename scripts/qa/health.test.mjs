// QA de l'endpoint /api/health SANS infra réelle :
//  - vrai code métier : src/app/api/health/route.ts (via alias résolu par les hooks)
//  - Supabase remplacé par un fake en mémoire (aucune I/O, aucun secret réel)
//  - aucun email envoyé, aucun lead créé : le healthcheck ne fait qu'une lecture jetée.
import test from "node:test";
import assert from "node:assert/strict";
import { store } from "./store.mjs";

const { GET } = await import("@/app/api/health/route");

// Valeurs FACTICES (aucun secret réel) : servent aussi de sondes anti-fuite.
const TOKEN = "qa-healthcheck-token-abcdef123456";
const SERVICE_ROLE_KEY = "fake-service-role-key";
const RESEND_KEY = "re_fake_key";

const RESEND_ENV = {
  RESEND_API_KEY: RESEND_KEY,
  SPRINTMATHS_EMAIL_FROM: "qa@sprintmaths.test",
  SPRINTMATHS_EMAIL_REPLY_TO: "qa-reply@sprintmaths.test",
};

function makeRequest({ token = TOKEN, rawAuthorization = null } = {}) {
  const headers = {};
  if (rawAuthorization !== null) {
    headers.authorization = rawAuthorization;
  } else if (token !== null) {
    headers.authorization = `Bearer ${token}`;
  }
  return new Request("http://localhost/api/health", { method: "GET", headers });
}

function resetEnv() {
  process.env.HEALTHCHECK_TOKEN = TOKEN;
  process.env.NEXT_PUBLIC_SUPABASE_URL = "http://fake.local";
  process.env.SUPABASE_SERVICE_ROLE_KEY = SERVICE_ROLE_KEY;
  Object.assign(process.env, RESEND_ENV);
  delete process.env.HEALTHCHECK_DB_TIMEOUT_MS;
  process.env.VERCEL_ENV = "production";
  process.env.VERCEL_GIT_COMMIT_SHA = "abcdef1234567890abcdef1234567890abcdef12";

  store().leads.length = 0;
  store().selectError = null;
  store().selectDelayMs = 0;
}

async function captureErrorLogs(fn) {
  const original = console.error;
  const lines = [];
  console.error = (...args) =>
    lines.push(args.map((a) => (typeof a === "string" ? a : JSON.stringify(a))).join(" "));
  try {
    const result = await fn();
    return { result, logs: lines.join("\n") };
  } finally {
    console.error = original;
  }
}

// Sondes anti-fuite communes aux réponses ET aux logs : secrets, PII, stack trace.
function assertNoLeak(serialized, label) {
  assert.ok(!/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(serialized), `${label} : aucun email`);
  assert.ok(!serialized.includes(TOKEN), `${label} : aucun HEALTHCHECK_TOKEN`);
  assert.ok(!serialized.includes(SERVICE_ROLE_KEY), `${label} : aucune service role key`);
  assert.ok(!serialized.includes(RESEND_KEY), `${label} : aucune clé Resend`);
  assert.ok(!/\bat\s+\w+.*:\d+:\d+/.test(serialized), `${label} : aucune stack trace`);
}

// Contrainte propre à la RÉPONSE publique : elle ne doit exposer aucune URL
// d'infrastructure. Les logs serveur, eux, peuvent légitimement conserver
// NEXT_PUBLIC_SUPABASE_URL (variable publique) pour rester exploitables.
function assertResponseSafe(serialized, label) {
  assertNoLeak(serialized, label);
  assert.ok(!/https?:\/\/|fake\.local|supabase\.co/.test(serialized), `${label} : aucune URL interne`);
}

test("1. token absent -> 401, aucun détail exposé", async () => {
  resetEnv();

  const res = await GET(makeRequest({ token: null }));
  const body = await res.json();

  assert.equal(res.status, 401);
  assert.equal(body.status, "unauthorized");
  // Un 401 ne doit rien révéler de l'infrastructure.
  assert.equal(body.checks, undefined);
  assert.equal(body.deployment, undefined);
  assertResponseSafe(JSON.stringify(body), "401 sans token");
});

test("2. mauvais token (et schémas invalides) -> 401", async () => {
  resetEnv();

  const cases = [
    { token: "mauvais-token" },
    { token: `${TOKEN}x` }, // bon préfixe, longueur différente
    { rawAuthorization: TOKEN }, // sans le schéma Bearer
    { rawAuthorization: "Bearer" }, // Bearer sans valeur
    { rawAuthorization: `Basic ${TOKEN}` }, // mauvais schéma
  ];

  for (const variant of cases) {
    const res = await GET(makeRequest(variant));
    assert.equal(res.status, 401, `401 attendu pour ${JSON.stringify(variant)}`);
  }
});

test("2b. token serveur non configuré -> endpoint verrouillé (401), jamais ouvert", async () => {
  resetEnv();
  process.env.HEALTHCHECK_TOKEN = "";

  const res = await GET(makeRequest({ token: "" }));

  assert.equal(res.status, 401);
});

test("3. Supabase OK + Resend configuré -> 200 status ok, no-store", async () => {
  resetEnv();

  const res = await GET(makeRequest());
  const body = await res.json();

  assert.equal(res.status, 200);
  assert.equal(body.status, "ok");
  assert.deepEqual(body.checks, { app: "ok", database: "ok", email: "configured" });
  assert.equal(body.deployment.environment, "production");
  assert.match(res.headers.get("cache-control") ?? "", /no-store/);
  assert.match(body.timestamp, /^\d{4}-\d{2}-\d{2}T/);

  // Lecture non destructive : aucun lead créé, aucun email envoyé.
  assert.equal(store().leads.length, 0);
  assert.equal(store().emails.length, 0);
});

test("4. Supabase indisponible -> 503 status down, logs safe", async () => {
  resetEnv();
  store().selectError = {
    code: "08006",
    message: `connection to server at fake.local failed using ${SERVICE_ROLE_KEY} for admin@sprintmaths.com`,
  };

  const { result: res, logs } = await captureErrorLogs(() => GET(makeRequest()));
  const body = await res.json();

  assert.equal(res.status, 503);
  assert.equal(body.status, "down");
  assert.equal(body.checks.database, "down");
  assert.equal(body.checks.app, "ok");

  // La réponse ne doit contenir ni message brut, ni secret, ni PII, ni nom de table.
  const serialized = JSON.stringify(body);
  assertResponseSafe(serialized, "réponse 503");
  assert.ok(!serialized.includes("connection to server"), "aucun message d'erreur brut");
  assert.ok(!serialized.includes("leads"), "aucun nom de table");

  // Le log serveur existe et reste exploitable, mais redacté.
  assert.match(logs, /\[health\] database_check_failed/);
  assert.match(logs, /08006/);
  assertNoLeak(logs, "logs 503");
  assert.match(logs, /\[secret\]/, "la service role key doit être redactée");
  assert.match(logs, /\[email\]/, "l'email doit être redacté");
});

test("4b. client admin indisponible (config critique manquante) -> 503", async () => {
  resetEnv();
  process.env.SUPABASE_SERVICE_ROLE_KEY = "";

  const { result: res, logs } = await captureErrorLogs(() => GET(makeRequest()));
  const body = await res.json();

  assert.equal(res.status, 503);
  assert.equal(body.checks.database, "down");
  assert.match(logs, /\[health\] database_not_configured/);
  assertNoLeak(logs, "logs config manquante");
});

test("5. Resend manquant -> 200 status degraded (décision documentée : lead toujours sauvé)", async () => {
  resetEnv();
  process.env.RESEND_API_KEY = "";

  const res = await GET(makeRequest());
  const body = await res.json();

  // Choix assumé : l'email est un service non critique (le lead est persisté même
  // si Resend échoue) -> degraded + 200, et non down + 503.
  assert.equal(res.status, 200);
  assert.equal(body.status, "degraded");
  assert.equal(body.checks.email, "missing");
  assert.equal(body.checks.database, "ok");
});

test("6. délai Supabase dépassé -> 503 maîtrisé (pas de pendaison)", async () => {
  resetEnv();
  process.env.HEALTHCHECK_DB_TIMEOUT_MS = "500";
  store().selectDelayMs = 900;

  const startedAt = Date.now();
  const { result: res, logs } = await captureErrorLogs(() => GET(makeRequest()));
  const elapsed = Date.now() - startedAt;
  const body = await res.json();

  assert.equal(res.status, 503);
  assert.equal(body.checks.database, "down");
  // Le timeout doit trancher avant la fin de la requête lente.
  assert.ok(elapsed < 900, `le handler doit rendre la main avant la requête lente (${elapsed}ms)`);
  assert.match(logs, /\[health\] database_check_failed/);
  assert.match(logs, /ETIMEDOUT/);
  assertNoLeak(logs, "logs timeout");
});

test("7. aucune réponse ne contient de secret, de PII ou de stack trace", async () => {
  resetEnv();
  store().leads.push({
    id: "lead_1",
    parent_email: "eleve@example.com",
    student_pseudo: "Leo",
  });

  const scenarios = [
    async () => GET(makeRequest()),
    async () => GET(makeRequest({ token: "mauvais" })),
    async () => {
      store().selectError = { code: "08006", message: `boom ${SERVICE_ROLE_KEY} eleve@example.com` };
      return GET(makeRequest());
    },
  ];

  for (const [index, scenario] of scenarios.entries()) {
    const { result: res } = await captureErrorLogs(scenario);
    const serialized = JSON.stringify(await res.json());
    assertResponseSafe(serialized, `scénario ${index + 1}`);
    // Le lead présent en base ne doit jamais ressortir de l'endpoint.
    assert.ok(!serialized.includes("Leo"), `scénario ${index + 1} : aucun pseudo`);
    assert.ok(!serialized.includes("lead_1"), `scénario ${index + 1} : aucun identifiant métier`);
  }
});

test("8. aucune variable d'environnement ne transite dans la réponse", async () => {
  resetEnv();

  const res = await GET(makeRequest());
  const body = await res.json();
  const keys = JSON.stringify(body);

  for (const envKey of [
    "HEALTHCHECK_TOKEN",
    "SUPABASE_SERVICE_ROLE_KEY",
    "RESEND_API_KEY",
    "NEXT_PUBLIC_SUPABASE_URL",
    "VERCEL_GIT_COMMIT_SHA",
  ]) {
    assert.ok(!keys.includes(envKey), `le nom de variable ${envKey} ne doit pas apparaître`);
  }
});

test("9. commit retourné limité à 7 caractères, environnement inconnu si absent", async () => {
  resetEnv();

  const res = await GET(makeRequest());
  const body = await res.json();

  assert.equal(body.deployment.commit, "abcdef1");
  assert.equal(body.deployment.commit.length, 7);

  // Hors Vercel : dégradation propre, jamais de champ absent ou d'URL interne.
  delete process.env.VERCEL_GIT_COMMIT_SHA;
  delete process.env.VERCEL_ENV;

  const fallbackBody = await (await GET(makeRequest())).json();
  assert.equal(fallbackBody.deployment.commit, "unknown");
  assert.equal(fallbackBody.deployment.environment, "unknown");
});
