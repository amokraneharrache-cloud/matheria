import type Stripe from "stripe";
import { createAccessCodeForEmail } from "@/lib/accessCodes";
import { sendAccessCodeEmail } from "@/lib/email/resend";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";

const HANDLED_EVENT = "checkout.session.completed";

function getWebhookSecret() {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error("STRIPE_WEBHOOK_SECRET non configuré côté serveur.");
  }

  return webhookSecret;
}

function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://www.sprintmaths.com").replace(/\/+$/, "");
}

function getCustomerEmail(session: Stripe.Checkout.Session) {
  const stripeEmail = session.customer_details?.email || session.customer_email;
  if (stripeEmail) {
    return stripeEmail;
  }

  if (process.env.NODE_ENV !== "production") {
    return process.env.SPRINTMATHS_TEST_CUSTOMER_EMAIL || null;
  }

  return null;
}

function getPaymentIntentId(session: Stripe.Checkout.Session) {
  if (!session.payment_intent) {
    return null;
  }

  if (typeof session.payment_intent === "string") {
    return session.payment_intent;
  }

  return session.payment_intent.id;
}

function shouldResendDuplicateEmail() {
  return process.env.RESEND_ACCESS_CODE_ON_DUPLICATE === "true";
}

function logServerFunnelEvent(event: string, params: Record<string, unknown>) {
  console.info("SprintMaths server funnel event:", {
    event,
    ...params,
  });
}

function getSafeErrorLogDetails(error: unknown) {
  if (!(error instanceof Error)) {
    return { message: "Unknown error" };
  }

  const details: {
    name: string;
    message: string;
    type?: string;
    statusCode?: number;
    code?: string;
  } = {
    name: error.name,
    message: error.message,
  };
  const maybeError = error as Error & {
    type?: unknown;
    statusCode?: unknown;
    code?: unknown;
  };

  if (typeof maybeError.type === "string") {
    details.type = maybeError.type;
  }

  if (typeof maybeError.statusCode === "number") {
    details.statusCode = maybeError.statusCode;
  }

  if (typeof maybeError.code === "string") {
    details.code = maybeError.code;
  }

  return details;
}

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return Response.json({ error: "Missing Stripe signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  let webhookSecret: string;

  try {
    webhookSecret = getWebhookSecret();
  } catch (error) {
    console.error("Stripe webhook configuration error:", getSafeErrorLogDetails(error));
    return Response.json({ error: "Stripe webhook configuration error" }, { status: 500 });
  }

  try {
    const rawBody = await request.text();
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    console.error("Stripe webhook signature verification failed:", getSafeErrorLogDetails(error));
    return Response.json({ error: "Invalid Stripe signature" }, { status: 400 });
  }

  if (event.type !== HANDLED_EVENT) {
    return Response.json({ received: true, ignored: true });
  }

  try {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status && session.payment_status !== "paid") {
      console.info("Stripe checkout.session.completed ignored because payment is not paid:", {
        sessionId: session.id,
        paymentStatus: session.payment_status,
      });
      return Response.json({ received: true, ignored: true });
    }

    const customerEmail = getCustomerEmail(session);
    if (!customerEmail) {
      console.error("Stripe checkout.session.completed missing customer email:", {
        sessionId: session.id,
      });
      return Response.json({ error: "Missing customer email" }, { status: 500 });
    }

    const paymentIntentId = getPaymentIntentId(session);
    const baseLogParams = {
      stripeSessionId: session.id,
      paymentIntentId,
      amountTotal: session.amount_total,
      currency: session.currency,
    };

    logServerFunnelEvent("purchase", {
      ...baseLogParams,
      paymentStatus: session.payment_status || "paid",
    });

    const createdCode = await createAccessCodeForEmail({
      parentEmail: customerEmail,
      source: "stripe",
      stripeSessionId: session.id,
      stripePaymentIntentId: paymentIntentId,
      amountTotal: session.amount_total,
      currency: session.currency,
    });

    if (!createdCode.alreadyExisted) {
      logServerFunnelEvent("access_code_created", {
        ...baseLogParams,
        accessCodeId: createdCode.id,
      });
    }

    if (createdCode.alreadyExisted && !shouldResendDuplicateEmail()) {
      console.info("Stripe webhook replay ignored, access code already exists:", {
        sessionId: session.id,
        accessCodeId: createdCode.id,
      });
      return Response.json({ received: true, duplicate: true });
    }

    const emailResult = await sendAccessCodeEmail({
      to: customerEmail,
      customerEmail,
      accessCode: createdCode.code,
      siteUrl: getSiteUrl(),
    });

    const emailSent = !emailResult.error;

    if (emailResult.error) {
      console.error("Resend access code email failed:", {
        stripeSessionId: session.id,
        accessCodeId: createdCode.id,
        error: getSafeErrorLogDetails(emailResult.error),
      });
    } else {
      logServerFunnelEvent("access_code_email_sent", {
        ...baseLogParams,
        accessCodeId: createdCode.id,
        resendEmailId: emailResult.data.id,
        duplicate: createdCode.alreadyExisted,
      });
    }

    return Response.json({
      received: true,
      accessCodeCreated: !createdCode.alreadyExisted,
      duplicate: createdCode.alreadyExisted,
      emailSent,
    });
  } catch (error) {
    console.error("Stripe webhook checkout.session.completed error:", getSafeErrorLogDetails(error));
    return Response.json({ error: "Stripe webhook internal error" }, { status: 500 });
  }
}
