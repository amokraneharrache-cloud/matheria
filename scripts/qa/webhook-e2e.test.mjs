// QA e2e du webhook Stripe SANS infra réelle :
//  - vraie vérification de signature (stripe.webhooks.constructEvent)
//  - vrai code métier (route.ts, accessCodes.ts, resend.ts)
//  - Supabase + Resend remplacés par des fakes en mémoire (aucune I/O, aucun secret)
import test from "node:test";
import assert from "node:assert/strict";
import Stripe from "stripe";
import { store } from "./store.mjs";

const SECRET = "whsec_qa_dummy_secret";
const stripe = new Stripe("sk_test_dummy");

// Le vrai handler, via l'alias résolu par les hooks.
const { POST } = await import("@/app/api/stripe/webhook/route");

function makeRequest(eventObj, { tamper = false, omitSig = false } = {}) {
  const payload = JSON.stringify(eventObj);
  const headers = { "content-type": "application/json" };
  if (!omitSig) {
    let header = stripe.webhooks.generateTestHeaderString({ payload, secret: SECRET });
    if (tamper) header = header.replace(/v1=[a-f0-9]+/, "v1=deadbeefdeadbeefdeadbeef");
    headers["stripe-signature"] = header;
  }
  return new Request("http://localhost/api/stripe/webhook", {
    method: "POST",
    headers,
    body: payload,
  });
}

function checkoutEvent({
  sessionId,
  email = "qa+buyer@sprintmaths.test",
  paymentStatus = "paid",
  amount = 3900,
  pi = "pi_test_1",
}) {
  return {
    id: "evt_" + sessionId,
    type: "checkout.session.completed",
    data: {
      object: {
        id: sessionId,
        object: "checkout.session",
        payment_status: paymentStatus,
        customer_details: { email },
        customer_email: null,
        payment_intent: pi,
        amount_total: amount,
        currency: "eur",
      },
    },
  };
}

test("1. paiement payé -> 200, code d'accès créé + email envoyé", async () => {
  store().accessCodes.length = 0;
  store().emails.length = 0;

  const res = await POST(makeRequest(checkoutEvent({ sessionId: "cs_test_A" })));
  const body = await res.json();

  assert.equal(res.status, 200);
  assert.equal(body.accessCodeCreated, true);
  assert.equal(body.duplicate, false);
  assert.equal(body.emailSent, true);

  assert.equal(store().accessCodes.length, 1);
  const row = store().accessCodes[0];
  assert.equal(row.source, "stripe");
  assert.equal(row.status, "unused");
  assert.equal(row.stripe_session_id, "cs_test_A");
  assert.equal(row.parent_email, "qa+buyer@sprintmaths.test");
  assert.match(row.code, /^MATH-[A-Z0-9]{4}$/);

  assert.equal(store().emails.length, 1);
  const mail = store().emails[0];
  assert.equal(mail.to, "qa+buyer@sprintmaths.test");
  assert.ok(
    mail.text.includes(row.code) && mail.html.includes(row.code),
    "l'email doit contenir le code d'accès",
  );
});

test("2. rejeu même session -> idempotent (pas de doublon code ni email)", async () => {
  const res = await POST(makeRequest(checkoutEvent({ sessionId: "cs_test_A" })));
  const body = await res.json();

  assert.equal(res.status, 200);
  assert.equal(body.duplicate, true);
  assert.equal(store().accessCodes.length, 1, "toujours un seul code");
  assert.equal(store().emails.length, 1, "aucun second email par défaut");
});

test("3. signature falsifiée -> 400", async () => {
  const res = await POST(makeRequest(checkoutEvent({ sessionId: "cs_test_B" }), { tamper: true }));
  const body = await res.json();
  assert.equal(res.status, 400);
  assert.match(body.error, /Invalid Stripe signature/);
});

test("4. signature absente -> 400", async () => {
  const res = await POST(makeRequest(checkoutEvent({ sessionId: "cs_test_C" }), { omitSig: true }));
  const body = await res.json();
  assert.equal(res.status, 400);
  assert.match(body.error, /Missing Stripe signature/);
});

test("5. session non payée -> 200 ignoré, aucun code", async () => {
  const before = store().accessCodes.length;
  const res = await POST(
    makeRequest(checkoutEvent({ sessionId: "cs_test_D", paymentStatus: "unpaid" })),
  );
  const body = await res.json();
  assert.equal(res.status, 200);
  assert.equal(body.ignored, true);
  assert.equal(store().accessCodes.length, before, "aucun code créé pour une session non payée");
});

test("6. statut de paiement absent -> aucun accès ni email", async () => {
  const codesBefore = store().accessCodes.length;
  const emailsBefore = store().emails.length;
  const event = checkoutEvent({ sessionId: "cs_test_missing_status" });
  delete event.data.object.payment_status;
  const response = await POST(makeRequest(event));
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ignored, true);
  assert.equal(store().accessCodes.length, codesBefore);
  assert.equal(store().emails.length, emailsBefore);
});

// ---------------------------------------------------------------------------
// J74 — reprise de l'envoi du code d'accès après un échec.
//
// Défaut reproduit en J73 (ops/J73/B-offre.md) : paiement payé -> code créé ->
// envoi Resend en échec -> le rejeu du même événement Stripe repartait en
// « duplicate » sans jamais retenter l'email. L'acheteur restait sans code.
//
// LIMITE : ces tests s'exécutent contre des fakes en mémoire. Ils vérifient la
// LOGIQUE de reprise et les conditions atomiques attendues, pas les garanties
// SQL réelles (index UNIQUE, atomicité de l'UPDATE) ni le comportement réel de
// Resend. Voir docs/qa/j74-delivery.md.
// ---------------------------------------------------------------------------

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;

function resetDelivery() {
  const s = store();
  s.accessCodes.length = 0;
  s.emails.length = 0;
  s.accessCodeDeliveries.length = 0;
  s.resendIdempotency.clear();
  s.resendIdempotencyKeys.length = 0;
  s.emailsSendError = null;
  s.emailsSendThrow = null;
  s.deliveriesSelectError = null;
  s.deliveriesInsertError = null;
  s.deliveriesUpdateError = null;
}

function delivery() {
  return store().accessCodeDeliveries[0];
}

/** Vieillit la réservation courante pour simuler un worker mort. */
function ageClaim(ms) {
  const row = delivery();
  row.claimed_at = new Date(Date.parse(row.claimed_at) - ms).toISOString();
}

/** Vieillit la clé d'idempotence pour sortir de la fenêtre fournisseur. */
function ageIdempotencyAnchor(ms) {
  const row = delivery();
  row.idempotency_key_first_used_at = new Date(
    Date.parse(row.idempotency_key_first_used_at) - ms,
  ).toISOString();
}

async function post(sessionId, options) {
  const res = await POST(makeRequest(checkoutEvent({ sessionId, ...options })));
  return { res, body: await res.json() };
}

const RESEND_DOWN = { name: "internal_server_error", message: "Resend 500" };
const RESEND_REJECT = { name: "validation_error", message: "from address invalide" };

test("7. J73 corrigé : panne d'envoi puis rejeu Stripe -> email livré, un seul code", async () => {
  resetDelivery();
  store().emailsSendError = RESEND_DOWN;

  const first = await post("cs_j74_retry");
  // Résultat ambigu (5xx fournisseur) : non-2xx pour que Stripe rejoue.
  assert.equal(first.res.status, 503);
  assert.equal(first.body.accessCodeCreated, true);
  assert.equal(first.body.emailSent, false);
  assert.equal(first.body.deliveryState, "unknown");
  assert.equal(store().accessCodes.length, 1);
  assert.equal(store().emails.length, 0);
  assert.equal(delivery().status, "unknown");

  // Rejeu Stripe, fournisseur rétabli. Avant J74 : « duplicate », zéro email.
  store().emailsSendError = null;
  const replay = await post("cs_j74_retry");

  assert.equal(replay.res.status, 200);
  assert.equal(replay.body.duplicate, true, "aucun second code");
  assert.equal(replay.body.emailSent, true, "l'email manquant est enfin envoyé");
  assert.equal(replay.body.deliveryState, "sent");
  assert.equal(store().accessCodes.length, 1, "toujours un seul code");
  assert.equal(store().emails.length, 1, "exactement un email");
  assert.equal(store().emails[0].text.includes(store().accessCodes[0].code), true);
  assert.equal(delivery().status, "sent");
  assert.equal(delivery().attempts, 2);
});

test("8. plusieurs pannes consécutives puis succès -> un seul email", async () => {
  resetDelivery();
  store().emailsSendError = RESEND_DOWN;

  for (let i = 0; i < 3; i += 1) {
    const { res } = await post("cs_j74_multi");
    assert.equal(res.status, 503);
  }
  assert.equal(store().emails.length, 0);
  assert.equal(delivery().attempts, 3);

  store().emailsSendError = null;
  const ok = await post("cs_j74_multi");
  assert.equal(ok.body.emailSent, true);
  assert.equal(store().emails.length, 1);
  assert.equal(store().accessCodes.length, 1);

  // Et un rejeu de plus ne renvoie rien.
  const again = await post("cs_j74_multi");
  assert.equal(again.body.emailSent, false);
  assert.equal(again.body.deliveryState, "already_sent");
  assert.equal(store().emails.length, 1);
});

test("9. succès puis rejeux -> jamais de second email, même avec l'ancien flag", async () => {
  resetDelivery();
  const first = await post("cs_j74_ok");
  assert.equal(first.body.emailSent, true);

  // L'interrupteur global RESEND_ACCESS_CODE_ON_DUPLICATE n'est plus lu : il ne
  // peut plus provoquer de renvoi massif sur les emails déjà livrés.
  process.env.RESEND_ACCESS_CODE_ON_DUPLICATE = "true";
  try {
    for (let i = 0; i < 3; i += 1) {
      const replay = await post("cs_j74_ok");
      assert.equal(replay.res.status, 200);
      assert.equal(replay.body.deliveryState, "already_sent");
    }
  } finally {
    delete process.env.RESEND_ACCESS_CODE_ON_DUPLICATE;
  }

  assert.equal(store().emails.length, 1, "un seul email malgré les rejeux");
  assert.equal(store().accessCodes.length, 1);
});

test("10. concurrence sur la même session -> un seul code, un seul email", async () => {
  resetDelivery();
  const results = await Promise.all([
    post("cs_j74_race"),
    post("cs_j74_race"),
    post("cs_j74_race"),
  ]);

  const sent = results.filter((r) => r.body.emailSent === true);
  assert.equal(sent.length, 1, "un seul appel doit envoyer");
  assert.equal(store().accessCodes.length, 1);
  assert.equal(store().emails.length, 1);
  assert.equal(store().accessCodeDeliveries.length, 1);
  // Les perdants de la course ne renvoient pas : réservation déjà prise.
  const busy = results.filter((r) => r.body.deliveryState === "busy");
  assert.equal(busy.length, 2);
});

test("11. état d'envoi non enregistrable -> aucun envoi, 5xx pour rejeu Stripe", async () => {
  resetDelivery();
  store().deliveriesInsertError = { code: "08006", message: "connection failure" };

  const { res, body } = await post("cs_j74_nostate");
  assert.equal(res.status, 503);
  assert.equal(body.deliveryState, "unavailable");
  assert.equal(store().emails.length, 0, "jamais d'envoi sans état écrit");
  assert.equal(store().accessCodes.length, 1, "le paiement reste matérialisé par le code");

  // Une fois la base revenue, le rejeu livre.
  store().deliveriesInsertError = null;
  const replay = await post("cs_j74_nostate");
  assert.equal(replay.body.emailSent, true);
  assert.equal(store().emails.length, 1);
});

test("12. envoi accepté mais état non écrit -> le rejeu ne double pas l'email", async () => {
  resetDelivery();
  store().deliveriesUpdateError = { code: "08006", message: "connection lost" };

  const first = await post("cs_j74_lost_ack");
  assert.equal(first.body.emailSent, true, "le fournisseur a bien accepté");
  assert.equal(first.body.deliveryState, "sent_state_unrecorded");
  assert.equal(store().emails.length, 1);
  assert.equal(delivery().status, "pending", "l'état est resté à la réservation");

  store().deliveriesUpdateError = null;

  // Rejeu immédiat : une tentative peut encore être en vol, on n'envoie rien.
  const immediate = await post("cs_j74_lost_ack");
  assert.equal(immediate.body.deliveryState, "busy");
  assert.equal(store().emails.length, 1);

  // Rejeu Stripe plus tard : la réservation est périmée, la reprise repart avec
  // la MÊME clé d'idempotence -> Resend dédoublonne, aucun second email.
  ageClaim(11 * MINUTE);
  const later = await post("cs_j74_lost_ack");
  assert.equal(later.body.emailSent, true);
  assert.equal(store().emails.length, 1, "toujours un seul email réellement expédié");
  assert.equal(delivery().status, "sent");

  const keys = store().resendIdempotencyKeys;
  assert.equal(new Set(keys).size, 1, "la clé d'idempotence est restée stable");
});

test("13. coupure réseau après acceptation -> état ambigu, reprise protégée", async () => {
  resetDelivery();
  store().emailsSendThrow = { acceptedBeforeThrow: true, error: new Error("socket hang up") };

  const first = await post("cs_j74_throw");
  assert.equal(first.res.status, 503);
  assert.equal(first.body.emailSent, false);
  assert.equal(first.body.deliveryState, "unknown");
  assert.equal(delivery().status, "unknown");
  assert.equal(store().emails.length, 1, "le fournisseur avait accepté avant la coupure");

  store().emailsSendThrow = null;
  const replay = await post("cs_j74_throw");
  assert.equal(replay.body.emailSent, true);
  assert.equal(store().emails.length, 1, "aucun doublon : clé d'idempotence réutilisée");
  assert.equal(new Set(store().resendIdempotencyKeys).size, 1);
});

test("14. au-delà de la fenêtre d'idempotence fournisseur -> ambigu, aucun renvoi", async () => {
  resetDelivery();
  store().emailsSendThrow = { acceptedBeforeThrow: false, error: new Error("socket hang up") };

  const first = await post("cs_j74_stale");
  assert.equal(first.body.deliveryState, "unknown");
  assert.equal(store().emails.length, 0);

  store().emailsSendThrow = null;
  // 25 h plus tard : la clé n'est plus conservée par le fournisseur, un renvoi
  // ne serait plus dédoublonné. On préfère l'ambiguïté au doublon.
  ageIdempotencyAnchor(25 * HOUR);
  ageClaim(25 * HOUR);

  const replay = await post("cs_j74_stale");
  assert.equal(replay.res.status, 200);
  assert.equal(replay.body.emailSent, false);
  assert.equal(replay.body.deliveryState, "ambiguous");
  assert.equal(store().emails.length, 0, "rapprochement manuel, pas de renvoi aveugle");
  assert.equal(delivery().status, "unknown");
});

test("15. code legacy sans état d'envoi -> jamais réexpédié automatiquement", async () => {
  resetDelivery();
  // Code créé avant la migration J74 : aucune trace d'envoi n'a jamais existé.
  store().accessCodes.push({
    id: "ac_legacy",
    code: "MATH-LEG1",
    parent_email: "qa+buyer@sprintmaths.test",
    status: "unused",
    source: "stripe",
    stripe_session_id: "cs_j74_legacy",
    delivery_tracking_started_at: null,
  });

  const { res, body } = await post("cs_j74_legacy");
  assert.equal(res.status, 200);
  assert.equal(body.duplicate, true);
  assert.equal(body.emailSent, false);
  assert.equal(body.deliveryState, "legacy_untracked");
  assert.equal(store().emails.length, 0, "aucun renvoi sur un historique d'état inconnu");
  assert.equal(store().accessCodeDeliveries.length, 0, "aucun état inventé pour l'historique");
  assert.equal(store().accessCodes.length, 1);
});

test("16. refus certain du fournisseur -> échec enregistré, pas de rejeu Stripe inutile", async () => {
  resetDelivery();
  store().emailsSendError = RESEND_REJECT;

  const { res, body } = await post("cs_j74_rejected");
  // Refus définitif (payload invalide) : un rejeu échouerait à l'identique.
  assert.equal(res.status, 200);
  assert.equal(body.emailSent, false);
  assert.equal(body.deliveryState, "failed");
  assert.equal(delivery().status, "failed");
  assert.equal(store().emails.length, 0);

  // Reprise après correction : nouvelle série, clé neuve (rien n'avait été accepté).
  store().emailsSendError = null;
  const fixed = await post("cs_j74_rejected");
  assert.equal(fixed.body.emailSent, true);
  assert.equal(store().emails.length, 1);
  assert.equal(new Set(store().resendIdempotencyKeys).size, 2, "clé neuve après refus certain");
});

test("17. signature invalide et session impayée gardent leurs refus", async () => {
  resetDelivery();
  const tampered = await POST(makeRequest(checkoutEvent({ sessionId: "cs_j74_sig" }), { tamper: true }));
  assert.equal(tampered.status, 400);

  const unpaid = await post("cs_j74_unpaid", { paymentStatus: "unpaid" });
  assert.equal(unpaid.res.status, 200);
  assert.equal(unpaid.body.ignored, true);

  assert.equal(store().accessCodes.length, 0);
  assert.equal(store().emails.length, 0);
  assert.equal(store().accessCodeDeliveries.length, 0);
});
