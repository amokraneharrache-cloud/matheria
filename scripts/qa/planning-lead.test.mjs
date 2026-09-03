// QA e2e de la route /api/leads/planning SANS infra réelle :
//  - vrai code métier : src/app/api/leads/planning/route.ts (via alias résolu par les hooks)
//  - Supabase + Resend remplacés par des fakes en mémoire (aucune I/O, aucun secret)
//  - IP unique par requête pour ne jamais déclencher le rate-limit (5/h/clé)
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
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
  store().emailsSendError = null;
}

// Capture console.error en sérialisant les objets (logStep passe un objet).
async function captureErrorLogs(fn) {
  const origError = console.error;
  const lines = [];
  console.error = (...args) =>
    lines.push(args.map((a) => (typeof a === "string" ? a : JSON.stringify(a))).join(" "));
  try {
    const result = await fn();
    return { result, logs: lines.join("\n") };
  } finally {
    console.error = origError;
  }
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

test("7. échec Resend APRÈS save -> lead sauvé, 200 contrôlé emailSent:false, logs sans PII", async () => {
  resetStore();
  store().emailsSendError = {
    name: "application_error",
    message: "Resend API unavailable for qa+resendfail@example.com",
  };

  const { result: res, logs } = await captureErrorLogs(() =>
    POST(makeRequest({ email: "qa+resendfail@example.com", sourcePage: "/planning-revision-bac-maths" })),
  );
  const body = await res.json();

  // Priorité Supabase : le lead est sauvé même si l'email échoue.
  assert.equal(res.status, 200);
  assert.equal(body.success, true);
  assert.equal(body.saved, true);
  assert.equal(body.emailSent, false);
  assert.equal(body.emailSkippedReason, "resend_send_failed");
  assert.equal(store().leads.length, 1, "le lead doit être persisté malgré l'échec Resend");
  assert.equal(store().emails.length, 0, "aucun email capturé quand Resend échoue");

  // Log serveur présent et safe (email redacté).
  assert.match(logs, /\[leads\/planning\] resend_send_failed/);
  assert.ok(!logs.includes("qa+resendfail@example.com"), "l'email ne doit pas fuiter dans les logs");
  assert.ok(!containsEmail(body), "aucun email dans la réponse HTTP");
});

test("8. contenu de l'email de livraison : ressource + micro-action, sans offre commerciale", async () => {
  resetStore();

  await POST(makeRequest({ email: "qa+content@example.com", sourcePage: "/planning-revision-bac-maths" }));

  assert.equal(store().emails.length, 1);
  const sent = store().emails[0];
  assert.match(sent.subject, /planning/i, "l'objet annonce la ressource demandée");

  for (const part of ["html", "text"]) {
    const content = sent[part];
    assert.match(content, /\/planning-revision-bac-maths/, `${part}: lien planning`);
    assert.match(content, /\/planning-bac-maths-2027\.html/, `${part}: version imprimable`);
    assert.match(content, /\/diagnostic/, `${part}: unique ressource complémentaire`);
    // La micro-action est ce qui distingue une livraison utile d'un simple lien.
    assert.match(content, /surligne les 3 chapitres/i, `${part}: micro-action`);

    // L'email de livraison est transactionnel : il ne prospecte pas.
    assert.doesNotMatch(content, /39\s*€/, `${part}: pas de prix`);
    assert.doesNotMatch(content, /Pack Révision Express/i, `${part}: pas d'offre`);

    // Ton factuel : pas de code promo, pas de fausse urgence, pas de promesse de note.
    assert.doesNotMatch(content, /BAC2026|promo|-\s?\d+\s?%|garanti/i, `${part}: pas de promo/promesse`);
    assert.doesNotMatch(content, /derni(è|e)re chance|vite|urgent/i, `${part}: pas de fausse urgence`);
  }

  // Support/contact présent dans le texte.
  assert.match(sent.text, /@/, "le texte contient un email de contact");
  // Un transactionnel n'a pas d'en-tête de désinscription (rien à désinscrire).
  assert.equal(sent.headers, undefined, "pas d'en-tête List-Unsubscribe sur un transactionnel");
});

test("9. bloc succès : 3 CTAs + lien offre, events dédiés, params 100% whitelist sans PII", async () => {
  const {
    PLANNING_LEAD_MAGNET,
    PLANNING_SUCCESS_CTA_LOCATION,
    PLANNING_SUCCESS_INTENT,
    PLANNING_SUCCESS_LINKS,
    PLANNING_SUCCESS_OFFER_LINK,
  } = await import("@/components/marketing/planningSuccessLinks");
  const { sanitizeTrackingParams } = await import("@/lib/tracking");

  // Les 3 prochaines étapes, dans l'ordre spécifié (diagnostic en premier).
  assert.deepEqual(
    PLANNING_SUCCESS_LINKS.map((l) => [l.eventName, l.href]),
    [
      ["click_planning_success_diagnostic", "/diagnostic"],
      ["click_planning_success_subjects", "/sujets-type-bac-maths-terminale#sujet-corrige-guide"],
      ["click_planning_success_typebac", "/exercices-type-bac-maths-terminale"],
    ],
  );
  assert.equal(PLANNING_SUCCESS_LINKS[0].kind, "primary", "le diagnostic est le CTA principal");
  assert.equal(PLANNING_SUCCESS_OFFER_LINK.eventName, "click_planning_success_offer");
  assert.equal(PLANNING_SUCCESS_OFFER_LINK.href, "/bac-maths-2027#offre");
  assert.equal(PLANNING_SUCCESS_CTA_LOCATION, "planning_success_state");
  assert.equal(PLANNING_SUCCESS_INTENT, "post_optin_next_step");

  // Params composés comme dans PlanningLeadForm.successEventParams(...).
  const params = {
    source_page: "/planning-revision-bac-maths",
    lead_magnet: PLANNING_LEAD_MAGNET,
    level: "terminale",
    destination_page: PLANNING_SUCCESS_LINKS[0].href,
    cta_location: PLANNING_SUCCESS_CTA_LOCATION,
    intent: PLANNING_SUCCESS_INTENT,
  };
  assert.deepEqual(sanitizeTrackingParams(params), params, "tous les params passent la whitelist");

  // Anti-PII : email/prénom/pseudo injectés sont strippés par le sanitizer.
  const polluted = sanitizeTrackingParams({
    ...params,
    email: "leak@example.com",
    parent_email: "leak@example.com",
    student_pseudo: "Leo",
    prenom: "Leo",
  });
  assert.deepEqual(polluted, params, "aucune clé hors whitelist ne survit");
  assert.ok(!containsEmail(polluted), "aucun email après sanitization");
});

test("10. contrat analytics : lead après save, opt-in seulement avec consentement", async () => {
  const source = await readFile(
    new URL("../../src/components/marketing/PlanningLeadForm.tsx", import.meta.url),
    "utf8",
  );
  const fetchIndex = source.indexOf('fetch("/api/leads/planning"');
  const requestEventIndex = source.indexOf('trackEvent("lead_magnet_request"');

  assert.ok(fetchIndex >= 0 && requestEventIndex > fetchIndex, "l'event demande suit la réponse API");
  assert.match(source, /if \(result\.saved\) \{/);
  assert.match(source, /if \(submittedMarketingConsent\) \{\s*trackEvent\("email_optin"/s);
  assert.doesNotMatch(source, /marketing_consent: marketingConsent \? "true" : "false"/);
});
