import { TrackedLink } from "@/components/tracking/TrackedLink";
import { Button } from "@/components/ui/button";
import {
  BAC_2026_OFFER_PRICE,
  BAC_2026_PROMO_CODE,
} from "@/lib/offers";

type SeoCtaProps = {
  title?: string;
  description?: string;
  align?: "left" | "center";
};

export function SeoCta({
  title = "Commencer par un diagnostic gratuit",
  description = "SprintMaths aide l'élève à choisir les bons chapitres, à travailler en sessions courtes et à suivre sa progression.",
  align = "center",
}: SeoCtaProps) {
  const stripePaymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK;

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
          href="/diagnostic"
          className="w-full sm:w-auto"
          eventName="click_diagnostic"
          eventParams={{
            source_page: "seo_cta",
            cta_location: "seo_cta_primary",
          }}
        >
          <Button size="lg" className="w-full sm:w-auto">
            Faire le diagnostic gratuit
          </Button>
        </TrackedLink>
        {stripePaymentLink ? (
          <TrackedLink
            href={stripePaymentLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
            eventName="stripe_click"
            eventParams={{
              source_page: "seo_cta",
              offer: "bac2026",
              price: BAC_2026_OFFER_PRICE,
              currency: "EUR",
              coupon_code: BAC_2026_PROMO_CODE,
              payment_provider: "stripe",
              cta_location: "seo_cta",
            }}
          >
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Profiter de l&apos;offre à {BAC_2026_OFFER_PRICE} €
            </Button>
          </TrackedLink>
        ) : (
          <TrackedLink
            href="/#pricing"
            className="w-full sm:w-auto"
            eventName="click_offer"
            eventParams={{
              source_page: "seo_cta",
              offer: "bac2026",
              price: BAC_2026_OFFER_PRICE,
              currency: "EUR",
              coupon_code: BAC_2026_PROMO_CODE,
              cta_location: "seo_cta_offer_fallback",
            }}
          >
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Voir l&apos;offre Bac 2026
            </Button>
          </TrackedLink>
        )}
      </div>
      {stripePaymentLink && (
        <p className="mt-3 text-xs font-medium text-slate-500">
          Paiement unique sécurisé par Stripe, sans abonnement.
        </p>
      )}
    </div>
  );
}
