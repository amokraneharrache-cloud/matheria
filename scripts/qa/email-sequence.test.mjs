// QA du moteur email J58 (consentement, email 0, séquence, désinscription)
// SANS infra réelle : Supabase et Resend sont remplacés par les fakes en
// mémoire du harness. Aucun email n'est envoyé, aucune donnée réelle touchée.
import test from "node:test";
import assert from "node:assert/strict";
import { store } from "./store.mjs";

const { POST: planningPost } = await import("@/app/api/leads/planning/route");
const { GET: unsubscribeGet, POST: unsubscribePost } = await import(
  "@/app/api/email/unsubscribe/route"
);
const { runNurtureSequence } = await import("@/lib/email/sequenceRunner");
const { renderEmail0, NURTURE_SEQUENCE, dueSteps, trackedUrl } = await import(
  "@/lib/email/sequence"
);
const { CONSENT_VERSION } = await import("@/lib/email/consentText");
const { createClient } = await import("@supabase/supabase-js");

const SITE = "http://localhost:3000";

function reset() {
  const s = store();
  s.leads.length = 0;
  s.emails.length = 0;
  s.accessCodes.length = 0;
  s.sequenceSends.length = 0;
  s.leadsInsertError = null;
  s.sequenceInsertError = null;
  s.emailsSendError = null;
  s.idSeq = 0;
}

function planningRequest(body, headers = {}) {
  return new Request("http://localhost:3000/api/leads/planning", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // IP unique par appel : évite que le rate limit (5/h) fasse échouer
      // les tests suivants.
      "x-forwarded-for": `10.0.0.${Math.floor(Math.random() * 250) + 1}`,
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

function adminClient() {
  return createClient("http://fake.local", process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function daysAgo(n) {
  return new Date(Date.now() - n * 86_400_000).toISOString();
}

// --- 1. Formulaire SANS consentement ----------------------------------------

test("sans consentement : le lead est enregistré, marketing_consent reste false", async () => {
  reset();

  const response = await planningPost(
    planningRequest({ email: "sans-optin@example.test", sourcePage: "/planning-revision-bac-maths" }),
  );
  const payload = await response.json();

  assert.equal(response.status, 200);
  assert.equal(payload.success, true);

  const lead = store().leads[0];
  assert.ok(lead, "le lead doit être persisté");
  assert.equal(lead.marketing_consent, false);
  assert.equal(lead.marketing_consent_at, null);
  assert.equal(lead.consent_version, null);
  // Le jeton est généré pour tout le monde, y compris sans opt-in.
  assert.match(lead.unsubscribe_token, /^[a-f0-9]{64}$/);
});

test("sans consentement : la ressource est quand même délivrée", async () => {
  reset();

  await planningPost(
    planningRequest({ email: "livraison@example.test", sourcePage: "/planning-revision-bac-maths" }),
  );

  assert.equal(store().emails.length, 1, "l'email de livraison doit partir");
  const sent = store().emails[0];
  assert.match(sent.text, /planning-revision-bac-maths/);
});

// --- 2. Formulaire AVEC consentement ----------------------------------------

test("avec consentement : la preuve est complète (date + version)", async () => {
  reset();

  await planningPost(
    planningRequest({
      email: "avec-optin@example.test",
      sourcePage: "/planning-revision-bac-maths",
      marketingConsent: true,
      utmSource: "tiktok",
    }),
  );

  const lead = store().leads[0];
  assert.equal(lead.marketing_consent, true);
  assert.ok(lead.marketing_consent_at, "la date de consentement est obligatoire");
  assert.equal(lead.consent_version, CONSENT_VERSION);
  assert.equal(lead.acquisition_source, "tiktok");
});

test("le consentement n'est jamais déduit d'une valeur ambiguë", async () => {
  for (const ambiguous of ["true", "on", 1, null, undefined, {}]) {
    reset();
    await planningPost(
      planningRequest({
        email: "ambigu@example.test",
        sourcePage: "/planning-revision-bac-maths",
        marketingConsent: ambiguous,
      }),
    );
    assert.equal(
      store().leads[0].marketing_consent,
      false,
      `"${JSON.stringify(ambiguous)}" ne doit pas valoir consentement`,
    );
  }
});

// --- 3. Validation email -----------------------------------------------------

test("email invalide : rejet 400, aucun lead, aucun email", async () => {
  reset();

  const response = await planningPost(
    planningRequest({ email: "pas-un-email", sourcePage: "/planning-revision-bac-maths" }),
  );

  assert.equal(response.status, 400);
  assert.equal(store().leads.length, 0);
  assert.equal(store().emails.length, 0);
});

// --- 4. Email 0 : contenu ----------------------------------------------------

test("email 0 : livraison + micro-action, et AUCUNE offre commerciale", () => {
  const email = renderEmail0({ siteUrl: SITE, unsubscribeUrl: "" });
  const body = `${email.text}\n${email.html}`;

  assert.match(email.subject, /planning/i);
  assert.match(body, /planning-revision-bac-maths/);
  assert.match(body, /surligne les 3 chapitres/i, "la micro-action doit être présente");

  // Un email transactionnel n'est pas un support de prospection.
  assert.doesNotMatch(body, /39\s*€/, "pas de prix dans l'email de livraison");
  assert.doesNotMatch(body, /Pack Révision Express/i, "pas d'offre dans l'email de livraison");
});

test("email 0 : les liens portent les UTM et pointent vers le bon domaine", () => {
  const email = renderEmail0({ siteUrl: SITE, unsubscribeUrl: "" });

  assert.match(email.text, /utm_source=email/);
  assert.match(email.text, /utm_medium=email/);
  assert.match(email.text, /utm_campaign=lead_nurture/);
  assert.match(email.text, /utm_content=email_0/);
  assert.doesNotMatch(email.text, /undefined|\[object/);
});

test("trackedUrl place les UTM avant l'ancre", () => {
  const url = trackedUrl(SITE, "/bac-maths-2027#offre", "nurture_4");
  assert.equal(
    url,
    `${SITE}/bac-maths-2027?utm_source=email&utm_medium=email&utm_campaign=lead_nurture&utm_content=nurture_4#offre`,
  );
});

// --- 5. Séquence : contenu et calendrier -------------------------------------

test("la séquence a 5 étapes aux délais annoncés", () => {
  assert.deepEqual(
    NURTURE_SEQUENCE.map((step) => [step.key, step.delayDays]),
    [
      ["nurture_1", 2],
      ["nurture_2", 4],
      ["nurture_3", 7],
      ["nurture_4", 10],
      ["nurture_5", 14],
    ],
  );
});

test("seuls les 2 derniers emails sont promotionnels", () => {
  const promo = NURTURE_SEQUENCE.filter((step) => step.promotional).map((step) => step.key);
  assert.deepEqual(promo, ["nurture_4", "nurture_5"]);
});

test("chaque email nurture contient un lien de désinscription", () => {
  const context = { siteUrl: SITE, unsubscribeUrl: `${SITE}/api/email/unsubscribe?t=abc` };

  for (const step of NURTURE_SEQUENCE) {
    const email = step.render(context);
    assert.ok(email.subject.length > 0, `${step.key} : objet manquant`);
    assert.match(email.text, /Se désinscrire/, `${step.key} : lien texte manquant`);
    assert.match(email.html, /unsubscribe\?t=abc/, `${step.key} : lien HTML manquant`);
  }
});

test("dueSteps ne renvoie que les étapes échues", () => {
  const now = new Date();
  assert.deepEqual(dueSteps(new Date(now.getTime() - 86_400_000), now).map((s) => s.key), []);
  assert.deepEqual(
    dueSteps(new Date(now.getTime() - 5 * 86_400_000), now).map((s) => s.key),
    ["nurture_1", "nurture_2"],
  );
  assert.equal(dueSteps(new Date(now.getTime() - 30 * 86_400_000), now).length, 5);
});

// --- 6. Runner : consentement obligatoire ------------------------------------

test("un lead SANS consentement ne reçoit jamais la séquence", async () => {
  reset();
  store().leads.push({
    id: "lead_no_consent",
    parent_email: "silence@example.test",
    created_at: daysAgo(30),
    marketing_consent: false,
    marketing_unsubscribed_at: null,
    unsubscribe_token: "a".repeat(64),
  });

  const summary = await runNurtureSequence(adminClient(), { siteUrl: SITE });

  assert.equal(summary.eligibleLeads, 0);
  assert.equal(summary.sent, 0);
  assert.equal(store().emails.length, 0);
});

test("un lead désinscrit ne reçoit plus rien, même consentement à true", async () => {
  reset();
  store().leads.push({
    id: "lead_unsub",
    parent_email: "parti@example.test",
    created_at: daysAgo(30),
    marketing_consent: true,
    marketing_unsubscribed_at: new Date().toISOString(),
    unsubscribe_token: "b".repeat(64),
  });

  const summary = await runNurtureSequence(adminClient(), { siteUrl: SITE });

  assert.equal(summary.eligibleLeads, 0);
  assert.equal(store().emails.length, 0);
});

test("un lead consentant reçoit les étapes échues, et seulement elles", async () => {
  reset();
  store().leads.push({
    id: "lead_ok",
    parent_email: "actif@example.test",
    created_at: daysAgo(5),
    marketing_consent: true,
    marketing_unsubscribed_at: null,
    unsubscribe_token: "c".repeat(64),
  });

  const summary = await runNurtureSequence(adminClient(), { siteUrl: SITE });

  assert.equal(summary.eligibleLeads, 1);
  assert.equal(summary.sent, 2, "J+2 et J+4 sont dus à 5 jours");
  assert.equal(store().emails.length, 2);

  const steps = store().sequenceSends.map((row) => row.step);
  assert.deepEqual(steps.sort(), ["nurture_1", "nurture_2"]);
  assert.ok(store().sequenceSends.every((row) => row.status === "sent"));
});

// --- 7. Idempotence ----------------------------------------------------------

test("double exécution : aucun email n'est envoyé deux fois", async () => {
  reset();
  store().leads.push({
    id: "lead_idem",
    parent_email: "unique@example.test",
    created_at: daysAgo(20),
    marketing_consent: true,
    marketing_unsubscribed_at: null,
    unsubscribe_token: "d".repeat(64),
  });

  const client = adminClient();
  const first = await runNurtureSequence(client, { siteUrl: SITE });
  assert.equal(first.sent, 5, "les 5 étapes sont dues à 20 jours");
  assert.equal(store().emails.length, 5);

  const second = await runNurtureSequence(client, { siteUrl: SITE });
  assert.equal(second.sent, 0, "la seconde passe ne doit rien envoyer");
  assert.equal(store().emails.length, 5, "toujours 5 emails au total");

  const third = await runNurtureSequence(client, { siteUrl: SITE });
  assert.equal(third.sent, 0);
  assert.equal(store().emails.length, 5);
});

test("un envoi en échec est marqué failed et n'est pas compté comme envoyé", async () => {
  reset();
  store().leads.push({
    id: "lead_fail",
    parent_email: "echec@example.test",
    created_at: daysAgo(3),
    marketing_consent: true,
    marketing_unsubscribed_at: null,
    unsubscribe_token: "e".repeat(64),
  });
  store().emailsSendError = { name: "api_error", message: "resend down" };

  const summary = await runNurtureSequence(adminClient(), { siteUrl: SITE });

  assert.equal(summary.sent, 0);
  assert.equal(summary.failed, 1);
  assert.equal(store().sequenceSends[0].status, "failed");
  // L'étape reste réservée : elle ne repartira pas en boucle au run suivant.
  store().emailsSendError = null;
  const again = await runNurtureSequence(adminClient(), { siteUrl: SITE });
  assert.equal(again.sent, 0);
});

// --- 8. Achat = sortie de la séquence promotionnelle -------------------------

test("un acheteur ne reçoit pas les emails promotionnels", async () => {
  reset();
  store().leads.push({
    id: "lead_buyer",
    parent_email: "acheteur@example.test",
    created_at: daysAgo(20),
    marketing_consent: true,
    marketing_unsubscribed_at: null,
    unsubscribe_token: "f".repeat(64),
  });
  store().accessCodes.push({
    id: "ac_1",
    code: "ABC123",
    parent_email: "acheteur@example.test",
    status: "used",
  });

  const summary = await runNurtureSequence(adminClient(), { siteUrl: SITE });

  assert.equal(summary.skippedPurchaser, 2, "nurture_4 et nurture_5 sont sautés");
  assert.equal(summary.sent, 3, "les 3 emails pédagogiques partent quand même");

  const promoSent = store().emails.some((email) => /Pack Révision Express/i.test(email.subject));
  assert.equal(promoSent, false, "aucun email d'offre ne doit partir à un acheteur");

  const skipped = store().sequenceSends.filter((row) => row.status === "skipped");
  assert.deepEqual(skipped.map((row) => row.step).sort(), ["nurture_4", "nurture_5"]);
});

// --- 9. Désinscription -------------------------------------------------------

test("désinscription GET : le lead est marqué et redirigé", async () => {
  reset();
  const token = "1".repeat(64);
  store().leads.push({
    id: "lead_unsub_flow",
    parent_email: "aurevoir@example.test",
    created_at: daysAgo(10),
    marketing_consent: true,
    marketing_unsubscribed_at: null,
    unsubscribe_token: token,
  });

  const response = await unsubscribeGet(
    new Request(`http://localhost:3000/api/email/unsubscribe?t=${token}`),
  );

  assert.equal(response.status, 303);
  assert.match(response.headers.get("location"), /\/desinscription\?etat=done/);

  const lead = store().leads[0];
  assert.equal(lead.marketing_consent, false);
  assert.ok(lead.marketing_unsubscribed_at);
});

test("désinscription : plus aucun email de séquence ensuite", async () => {
  reset();
  const token = "2".repeat(64);
  store().leads.push({
    id: "lead_stop",
    parent_email: "stop@example.test",
    created_at: daysAgo(30),
    marketing_consent: true,
    marketing_unsubscribed_at: null,
    unsubscribe_token: token,
  });

  await unsubscribeGet(new Request(`http://localhost:3000/api/email/unsubscribe?t=${token}`));
  const summary = await runNurtureSequence(adminClient(), { siteUrl: SITE });

  assert.equal(summary.eligibleLeads, 0);
  assert.equal(store().emails.length, 0);
});

test("désinscription POST (un clic RFC 8058) : 200 et lead marqué", async () => {
  reset();
  const token = "3".repeat(64);
  store().leads.push({
    id: "lead_oneclick",
    parent_email: "oneclick@example.test",
    created_at: daysAgo(10),
    marketing_consent: true,
    marketing_unsubscribed_at: null,
    unsubscribe_token: token,
  });

  const response = await unsubscribePost(
    new Request(`http://localhost:3000/api/email/unsubscribe?t=${token}`, { method: "POST" }),
  );

  assert.equal(response.status, 200);
  assert.equal(store().leads[0].marketing_consent, false);
});

test("jeton absent ou malformé : rien n'est modifié", async () => {
  reset();
  store().leads.push({
    id: "lead_intact",
    parent_email: "intact@example.test",
    created_at: daysAgo(10),
    marketing_consent: true,
    marketing_unsubscribed_at: null,
    unsubscribe_token: "4".repeat(64),
  });

  for (const url of [
    "http://localhost:3000/api/email/unsubscribe",
    "http://localhost:3000/api/email/unsubscribe?t=",
    "http://localhost:3000/api/email/unsubscribe?t=trop-court",
    "http://localhost:3000/api/email/unsubscribe?t=" + "Z".repeat(64),
  ]) {
    const response = await unsubscribeGet(new Request(url));
    assert.match(response.headers.get("location"), /etat=invalid/);
  }

  assert.equal(store().leads[0].marketing_consent, true, "le lead ne doit pas être touché");
});

test("l'URL de désinscription ne contient jamais l'email", () => {
  const context = {
    siteUrl: SITE,
    unsubscribeUrl: `${SITE}/api/email/unsubscribe?t=${"a".repeat(64)}`,
  };

  for (const step of NURTURE_SEQUENCE) {
    const email = step.render(context);
    assert.doesNotMatch(email.html, /unsubscribe\?[^"]*@/);
    assert.doesNotMatch(email.text, /unsubscribe\?\S*@/);
  }
});
