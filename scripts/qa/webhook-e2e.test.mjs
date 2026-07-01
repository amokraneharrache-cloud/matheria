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
  amount = 2900,
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
