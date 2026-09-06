import type Stripe from "stripe";

export type VerifiedPurchase = {
  transaction_id: string;
  value: number;
  currency: string;
  traffic_type?: "internal";
};

// Stripe amounts use minor units (including the special ISK/UGX API format).
const ZERO_DECIMAL_CURRENCIES = new Set([
  "bif", "clp", "djf", "gnf", "jpy", "kmf", "krw", "mga",
  "pyg", "rwf", "vnd", "vuv", "xaf", "xof", "xpf",
]);

export function purchaseFromStripeSession(
  session: Stripe.Checkout.Session,
  paymentLinkUrl: string,
  production: boolean,
): VerifiedPurchase | null {
  const link = session.payment_link;
  if (
    session.mode !== "payment" || session.status !== "complete" ||
    session.payment_status !== "paid" ||
    (production && !session.livemode) ||
    !/^cs_(live|test)_[a-zA-Z0-9]+$/.test(session.id) ||
    !link || typeof link === "string" || link.url !== paymentLinkUrl ||
    !Number.isSafeInteger(session.amount_total) || (session.amount_total ?? 0) <= 0 ||
    !session.currency || !/^[a-z]{3}$/i.test(session.currency)
  ) return null;

  return {
    transaction_id: session.id,
    value: session.amount_total! / (ZERO_DECIMAL_CURRENCIES.has(session.currency.toLowerCase()) ? 1 : 100),
    currency: session.currency.toUpperCase(),
    ...(!session.livemode ? { traffic_type: "internal" as const } : {}),
  };
}
