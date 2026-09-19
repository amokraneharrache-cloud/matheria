import type Stripe from "stripe";
import { createAccessCodeForEmail } from "@/lib/accessCodes";
import {
  claimAccessCodeEmailDelivery,
  classifyProviderError,
  markDeliveryAccepted,
  markDeliveryOutcome,
} from "@/lib/accessCodeDelivery";
import { sendAccessCodeEmail } from "@/lib/email/resend";
import { PACK_REVISION_EXPRESS_OFFER_ID } from "@/lib/offers";
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

/**
 * J74 — `RESEND_ACCESS_CODE_ON_DUPLICATE` n'est plus lu.
 *
 * C'était un interrupteur GLOBAL : l'activer pour rattraper un envoi échoué
 * aurait aussi réexpédié les emails déjà correctement livrés, à chaque rejeu
 * Stripe. La reprise est désormais décidée ligne par ligne, à partir de l'état
 * d'envoi réel (`access_code_deliveries`). Ne pas réintroduire ce flag.
 */

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

    if (session.payment_status !== "paid") {
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
      product: PACK_REVISION_EXPRESS_OFFER_ID,
      stripeSessionId: session.id,
      paymentIntentId,
      amountTotal: session.amount_total,
      currency: session.currency,
      timestamp: new Date(
        (event.created ?? Math.floor(Date.now() / 1000)) * 1000,
      ).toISOString(),
    };

    logServerFunnelEvent("purchase", {
      ...baseLogParams,
      paymentStatus: session.payment_status,
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

    // Réservation de l'envoi AVANT tout appel au fournisseur. Tant qu'on ne
    // sait pas écrire l'état, on n'envoie rien : c'est ce qui rend la reprise
    // possible sans risquer un doublon.
    const claim = await claimAccessCodeEmailDelivery({
      accessCodeId: createdCode.id,
      stripeSessionId: session.id,
      deliveryTracked: createdCode.deliveryTracked,
    });

    const replyBase = {
      received: true,
      accessCodeCreated: !createdCode.alreadyExisted,
      duplicate: createdCode.alreadyExisted,
    };

    if (claim.outcome === "unavailable") {
      // État non enregistrable : 5xx pour que Stripe rejoue l'événement.
      console.error("Access code delivery state unavailable, no email attempted:", {
        stripeSessionId: session.id,
        accessCodeId: createdCode.id,
        reason: claim.reason,
      });
      return Response.json(
        { ...replyBase, emailSent: false, deliveryState: "unavailable" },
        { status: 503 },
      );
    }

    if (claim.outcome !== "claimed") {
      // already_sent / busy / ambiguous / legacy_untracked : aucun envoi.
      console.info("Access code email not re-sent:", {
        stripeSessionId: session.id,
        accessCodeId: createdCode.id,
        deliveryState: claim.outcome,
        reason: claim.outcome === "ambiguous" ? claim.reason : undefined,
      });
      return Response.json({
        ...replyBase,
        emailSent: false,
        deliveryState: claim.outcome,
      });
    }

    let emailResult: Awaited<ReturnType<typeof sendAccessCodeEmail>>;

    try {
      emailResult = await sendAccessCodeEmail({
        to: customerEmail,
        customerEmail,
        accessCode: createdCode.code,
        siteUrl: getSiteUrl(),
        idempotencyKey: claim.idempotencyKey,
      });
    } catch (error) {
      // Coupure réseau : le message a PEUT-ÊTRE été accepté. Résultat ambigu,
      // jamais un échec certain.
      console.error("Resend access code email threw, outcome unknown:", {
        stripeSessionId: session.id,
        accessCodeId: createdCode.id,
        error: getSafeErrorLogDetails(error),
      });
      await markDeliveryOutcome({
        deliveryId: claim.deliveryId,
        status: "unknown",
        reason: "send_threw",
      });
      return Response.json(
        { ...replyBase, emailSent: false, deliveryState: "unknown" },
        { status: 503 },
      );
    }

    if (emailResult.error) {
      const classified = classifyProviderError(emailResult.error);
      console.error("Resend access code email failed:", {
        stripeSessionId: session.id,
        accessCodeId: createdCode.id,
        deliveryAttempt: claim.attempt,
        failureKind: classified.kind,
        error: getSafeErrorLogDetails(emailResult.error),
      });

      await markDeliveryOutcome({
        deliveryId: claim.deliveryId,
        status: classified.kind === "rejected" ? "failed" : "unknown",
        reason: classified.code || "provider_error",
      });

      // Refus transitoire ou résultat ambigu : laisser Stripe rejouer.
      // Refus définitif (payload/clé invalides) : un rejeu échouerait pareil,
      // la ligne reste `failed` pour une reprise manuelle.
      const retryable = classified.kind === "ambiguous" || classified.transient;

      return Response.json(
        {
          ...replyBase,
          emailSent: false,
          deliveryState: classified.kind === "rejected" ? "failed" : "unknown",
        },
        retryable ? { status: 503 } : undefined,
      );
    }

    const accepted = await markDeliveryAccepted({
      deliveryId: claim.deliveryId,
      providerMessageId: emailResult.data?.id ?? null,
    });

    logServerFunnelEvent("access_code_email_sent", {
      ...baseLogParams,
      accessCodeId: createdCode.id,
      resendEmailId: emailResult.data?.id ?? null,
      duplicate: createdCode.alreadyExisted,
      deliveryAttempt: claim.attempt,
      deliveryStateRecorded: accepted.recorded,
    });

    if (!accepted.recorded) {
      // Email accepté par le fournisseur, état non écrit : la ligne reste
      // `pending`. Une reprise ultérieure refera l'appel avec la MÊME clé
      // d'idempotence, que Resend dédoublonne pendant 24 h.
      console.error("Access code email accepted but delivery state not recorded:", {
        stripeSessionId: session.id,
        accessCodeId: createdCode.id,
        reason: accepted.error,
      });
    }

    return Response.json({
      ...replyBase,
      emailSent: true,
      deliveryState: accepted.recorded ? "sent" : "sent_state_unrecorded",
    });
  } catch (error) {
    console.error("Stripe webhook checkout.session.completed error:", getSafeErrorLogDetails(error));
    return Response.json({ error: "Stripe webhook internal error" }, { status: 500 });
  }
}
