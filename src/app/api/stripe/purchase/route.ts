import { stripe } from "@/lib/stripe";
import { purchaseFromStripeSession } from "@/lib/purchase";

export const runtime = "nodejs";

function reply(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return reply({ verified: false }, 403);
  }
  let sessionId: unknown;
  try {
    sessionId = (await request.json())?.sessionId;
  } catch {
    return reply({ verified: false }, 400);
  }
  if (typeof sessionId !== "string" || !/^cs_(live|test)_[a-zA-Z0-9]{8,200}$/.test(sessionId)) {
    return reply({ verified: false }, 400);
  }
  const paymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK;
  if (!paymentLink || !process.env.STRIPE_SECRET_KEY) {
    return reply({ verified: false }, 503);
  }
  try {
    // URL data only identifies the session; the authenticated Stripe API proves payment.
    const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ["payment_link"] });
    const production = process.env.VERCEL_ENV
      ? process.env.VERCEL_ENV === "production"
      : process.env.NODE_ENV === "production";
    const purchase = purchaseFromStripeSession(session, paymentLink, production);
    return reply(purchase ? { verified: true, purchase } : { verified: false });
  } catch {
    // No email, access code, Stripe secret or raw Stripe error reaches the client/log.
    return reply({ verified: false }, 502);
  }
}
