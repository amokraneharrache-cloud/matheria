import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { purchaseFromStripeSession } from "@/lib/purchase";
import { stripe } from "@/lib/stripe";
import { POST } from "@/app/api/stripe/purchase/route";
import { trackEvent } from "@/lib/tracking";
import { trackVerifiedPurchase } from "@/lib/purchaseTracking";
import { isQaSearch, initializeQaTracking, GA4_MEASUREMENT_ID } from "@/lib/qaTracking";

const link = "https://buy.stripe.com/fixture";
const fixture = {
  id: "cs_live_J66fixture123", mode: "payment", status: "complete", payment_status: "paid",
  livemode: true, amount_total: 3900, currency: "eur", payment_link: { url: link },
};

test("purchase: only a completed, paid Stripe session for the configured product is valid", () => {
  assert.deepEqual(purchaseFromStripeSession(fixture, link, true), { transaction_id: fixture.id, value: 39, currency: "EUR" });
  for (const patch of [
    { payment_status: "unpaid" }, { payment_status: undefined }, { status: "open" },
    { status: "expired" }, { mode: "subscription" }, { livemode: false },
    { payment_link: { url: "https://buy.stripe.com/another-product" } },
    { payment_link: "plink_unexpanded" }, { amount_total: null }, { amount_total: 0 },
    { amount_total: -1 }, { currency: null },
  ]) assert.equal(purchaseFromStripeSession({ ...fixture, ...patch }, link, true), null);
});

test("purchase: Stripe amount/currency are authoritative, including discounts and zero-decimal currencies", () => {
  assert.equal(purchaseFromStripeSession({ ...fixture, amount_total: 2900 }, link, true).value, 29);
  assert.equal(purchaseFromStripeSession({ ...fixture, currency: "jpy", amount_total: 3900 }, link, true).value, 3900);
  const testPurchase = purchaseFromStripeSession({ ...fixture, livemode: false, id: "cs_test_J66fixture123" }, link, false);
  assert.equal(testPurchase.traffic_type, "internal");
});

function request(body, origin = "https://www.sprintmaths.com") {
  return new Request("https://www.sprintmaths.com/api/stripe/purchase", {
    method: "POST", headers: { origin, "content-type": "application/json" }, body: JSON.stringify(body),
  });
}

test("purchase endpoint: URL/input is no proof, and invalid/cross-origin requests never reach Stripe", async (t) => {
  const retrieve = t.mock.method(stripe.checkout.sessions, "retrieve", async () => fixture);
  for (const body of [{}, { sessionId: "paid" }, { sessionId: "cs_live_x", value: 39, paid: true }]) {
    assert.equal((await POST(request(body))).status, 400);
  }
  assert.equal((await POST(request({ sessionId: fixture.id }, "https://other.example"))).status, 403);
  assert.equal(retrieve.mock.callCount(), 0);
});

test("purchase endpoint: retrieves Stripe, exposes only verified non-PII parameters, no caching", async (t) => {
  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK = link;
  const retrieve = t.mock.method(stripe.checkout.sessions, "retrieve", async () => ({ ...fixture, customer_email: "private@example.test" }));
  const response = await POST(request({ sessionId: fixture.id, value: 1, currency: "USD" }));
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.deepEqual(await response.json(), { verified: true, purchase: { transaction_id: fixture.id, value: 39, currency: "EUR" } });
  assert.deepEqual(retrieve.mock.calls[0].arguments, [fixture.id, { expand: ["payment_link"] }]);
});

test("purchase endpoint: unpaid sessions and Stripe errors never produce purchase", async (t) => {
  t.mock.method(stripe.checkout.sessions, "retrieve", async () => ({ ...fixture, payment_status: "unpaid" }));
  assert.deepEqual(await (await POST(request({ sessionId: fixture.id }))).json(), { verified: false });
  t.mock.restoreAll();
  t.mock.method(stripe.checkout.sessions, "retrieve", async () => { throw new Error("private stripe detail"); });
  const response = await POST(request({ sessionId: fixture.id }));
  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), { verified: false });
});

function storage() {
  const data = new Map();
  return { getItem: (key) => data.get(key) ?? null, setItem: (key, value) => data.set(key, value) };
}
globalThis.window = {
  localStorage: storage(), sessionStorage: storage(),
  location: { search: "", pathname: "/merci" }, dataLayer: [],
};
process.env.NEXT_PUBLIC_TRACKING_MODE = "gtm-ready";

test("purchase: refresh/remount deduplication and device tracking preference", () => {
  const purchase = purchaseFromStripeSession(fixture, link, true);
  window.dataLayer.length = 0;
  assert.equal(trackVerifiedPurchase(purchase), true);
  assert.equal(trackVerifiedPurchase(purchase), false);
  const calls = window.dataLayer.map((entry) => Array.from(entry));
  assert.equal(calls.length, 1);
  assert.equal(calls[0][0], "event");
  assert.equal(calls[0][1], "purchase");
  assert.equal(calls[0][2].transaction_id, fixture.id);
  assert.equal(calls[0][2].value, 39);
  assert.equal(calls[0][2].currency, "EUR");
  window.localStorage.setItem("sprintmaths_verified_purchases", JSON.stringify(["cs_live_previouslySent"]));
  assert.equal(trackVerifiedPurchase({ ...purchase, transaction_id: "cs_live_previouslySent" }), false);
  window.localStorage.setItem("sprintmaths_tracking_preference", JSON.stringify({ trackingDisabled: true }));
  assert.equal(trackVerifiedPurchase({ ...purchase, transaction_id: "cs_live_disabled" }), false);
  window.localStorage.setItem("sprintmaths_tracking_preference", JSON.stringify({ trackingDisabled: false }));
});

test("diagnostic CTA: one event, source_page and placement survive the GA command, PII does not", () => {
  window.dataLayer.length = 0;
  trackEvent("diagnostic_cta_click", { source_page: "/exercices-maths-terminale/suites", placement: "after_exercise", email: "private@example.test" });
  assert.equal(window.dataLayer.length, 1);
  const [command, event, params] = Array.from(window.dataLayer[0]);
  assert.equal(command, "event");
  assert.equal(event, "diagnostic_cta_click");
  assert.equal(params.source_page, "/exercices-maths-terminale/suites");
  assert.equal(params.placement, "after_exercise");
  assert.equal(params.send_to, GA4_MEASUREMENT_ID);
  assert.equal(params.email, undefined);
});

test("CTA placement preserves the annales list and first suites exercise", async () => {
  const hub = await readFile("src/app/annales-bac-maths-terminale/page.tsx", "utf8");
  assert.ok(hub.indexOf("<AnnalesFilters") < hub.indexOf("<DiagnosticCta"));
  const suites = await readFile("src/app/exercices-maths-terminale/suites/page.tsx", "utf8");
  assert.ok(suites.indexOf("<ExerciseSection exercise=") < suites.indexOf("<DiagnosticCta"));
  const cta = await readFile("src/components/marketing/DiagnosticCta.tsx", "utf8");
  assert.ok(cta.includes('href="/diagnostic"'));
  assert.ok(cta.includes("Résultat et corrections immédiats. Aucun email obligatoire."));
  for (const route of ["programme-maths-terminale", "automatismes-maths-premiere", "annales/bac-maths-2026/[slug]"]) {
    assert.ok((await readFile(`src/app/${route}/page.tsx`, "utf8")).includes("<DiagnosticCta"));
  }
});

test("QA: explicit source OR medium, never substring matching or ordinary traffic", () => {
  assert.equal(initializeQaTracking(), false);
  assert.equal(window[`ga-disable-${GA4_MEASUREMENT_ID}`], undefined);
  for (const query of ["?utm_source=qa", "?utm_medium=qa", "?utm_source=QA&utm_medium=social", "?utm_source=qa&utm_medium=qa"]) assert.equal(isQaSearch(query), true);
  for (const query of ["", "?utm_source=qwant", "?utm_campaign=qa", "?utm_source=notqa", "?utm_medium=social"]) assert.equal(isQaSearch(query), false);
});

test("QA: signal queued before GTM and persists across clean navigation, collection fails closed", () => {
  window.location.search = "?utm_source=qa&utm_medium=qa";
  window.dataLayer.length = 0;
  assert.equal(initializeQaTracking(), true);
  assert.equal(window[`ga-disable-${GA4_MEASUREMENT_ID}`], true);
  assert.deepEqual(Array.from(window.dataLayer[0]), ["set", { traffic_type: "internal" }]);
  window.location.search = "";
  window.location.pathname = "/diagnostic";
  trackEvent("diagnostic_start");
  assert.equal(window.dataLayer.at(-1).traffic_type, "internal");
  assert.ok(Number(window.sessionStorage.getItem("sprintmaths_qa_session")) > Date.now());
});

test("purchase: test receipts cannot collect a fake production sale even without QA UTM", () => {
  window.location.search = "";
  window[`ga-disable-${GA4_MEASUREMENT_ID}`] = false;
  window.dataLayer.length = 0;
  assert.equal(trackVerifiedPurchase({ transaction_id: "cs_test_J66isolated123", value: 39, currency: "EUR" }), true);
  assert.equal(window[`ga-disable-${GA4_MEASUREMENT_ID}`], true);
  const [command, event, params] = Array.from(window.dataLayer.at(-1));
  assert.equal(command, "event");
  assert.equal(event, "purchase");
  assert.equal(params.traffic_type, "internal");
});
