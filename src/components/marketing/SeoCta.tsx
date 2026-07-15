import { TrackedLink } from "@/components/tracking/TrackedLink";
import { Button } from "@/components/ui/button";
import {
  PACK_REVISION_EXPRESS_OFFER_ID,
  PACK_REVISION_EXPRESS_PRICE,
} from "@/lib/offers";
import type { SprintMathsEventName, TrackingParams } from "@/lib/tracking";

type SeoCtaLink = {
  href: string;
  label: string;
  eventName: SprintMathsEventName;
  eventParams?: TrackingParams;
  target?: string;
  rel?: string;
  variant?: "default" | "outline" | "secondary";
};

type SeoCtaProps = {
  title?: string;
  description?: string;
  align?: "left" | "center";
  sourcePage?: string;
  primaryCta?: SeoCtaLink;
  secondaryCta?: SeoCtaLink | false;
};

export function SeoCta({
  title = "Commencer par un diagnostic gratuit",
  description = "SprintMaths aide l'élève à choisir les bons chapitres, à travailler en sessions courtes et à suivre sa progression.",
  align = "center",
  sourcePage = "seo_cta",
  primaryCta,
  secondaryCta,
}: SeoCtaProps) {
  const stripePaymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK;
  const primary: SeoCtaLink = primaryCta ?? {
    href: "/diagnostic",
    label: "Faire le diagnostic gratuit",
    eventName: "click_diagnostic" as const,
    eventParams: {
      source_page: sourcePage,
      cta_location: "seo_cta_primary",
    },
  };
  const defaultSecondary: SeoCtaLink = stripePaymentLink
    ? {
        href: stripePaymentLink,
        target: "_blank",
        rel: "noopener noreferrer",
        label: `Accéder au pack à ${PACK_REVISION_EXPRESS_PRICE} €`,
        eventName: "stripe_click",
        eventParams: {
          source_page: sourcePage,
          offer: PACK_REVISION_EXPRESS_OFFER_ID,
          price: PACK_REVISION_EXPRESS_PRICE,
          currency: "EUR",
          payment_provider: "stripe",
          cta_location: "seo_cta",
        },
        variant: "outline",
      }
    : {
        href: "/bac-maths-2027#offre",
        label: `Voir le pack Bac Maths 2027 à ${PACK_REVISION_EXPRESS_PRICE} €`,
        eventName: "click_offer",
        eventParams: {
          source_page: sourcePage,
          offer: PACK_REVISION_EXPRESS_OFFER_ID,
          price: PACK_REVISION_EXPRESS_PRICE,
          currency: "EUR",
          cta_location: "seo_cta_offer_fallback",
        },
        variant: "outline",
      };
  const secondary = secondaryCta === false ? null : secondaryCta ?? defaultSecondary;

  return (
    <div
      className={`rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8 ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      <h2 className="text-2xl font-bold text-slate-950">{title}</h2>
      <p className="mt-3 text-slate-700">{description}</p>
      <div
        className={`mt-6 flex flex-col gap-3 sm:flex-row ${
          align === "center" ? "sm:justify-center" : ""
        }`}
      >
        <TrackedLink
          href={primary.href}
          className="w-full sm:w-auto"
          target={primary.target}
          rel={primary.rel}
          eventName={primary.eventName}
          eventParams={primary.eventParams}
        >
          <Button variant={primary.variant} size="lg" className="w-full sm:w-auto">
            {primary.label}
          </Button>
        </TrackedLink>
        {secondary && (
          <TrackedLink
            href={secondary.href}
            target={secondary.target}
            rel={secondary.rel}
            className="w-full sm:w-auto"
            eventName={secondary.eventName}
            eventParams={secondary.eventParams}
          >
            <Button
              variant={secondary.variant ?? "outline"}
              size="lg"
              className="w-full sm:w-auto"
            >
              {secondary.label}
            </Button>
          </TrackedLink>
        )}
      </div>
      {secondary?.target === "_blank" && (
        <p className="mt-3 text-xs font-medium text-slate-500">
          Paiement unique sécurisé par Stripe, sans abonnement.
        </p>
      )}
    </div>
  );
}
