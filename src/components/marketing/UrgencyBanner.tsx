import { ArrowRight, Clock3 } from "lucide-react";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import {
  BAC_2026_OFFER_PRICE,
  BAC_2026_PROMO_CODE,
  PACK_REVISION_EXPRESS_PRICE,
} from "@/lib/offers";
import { cn } from "@/lib/utils";

type UrgencyBannerProps = {
  className?: string;
  ctaHref?: string;
  sourcePage?: string;
  sticky?: boolean;
};

export function UrgencyBanner({
  className,
  ctaHref = "/diagnostic",
  sourcePage = "seo_page",
  sticky = true,
}: UrgencyBannerProps) {
  return (
    <aside
      className={cn(
        "border-b border-amber-200 bg-amber-50/95 px-4 text-amber-950 shadow-sm backdrop-blur",
        sticky ? "sticky top-16 z-40" : "",
        className,
      )}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-200 text-amber-950">
            <Clock3 className="h-4 w-4" />
          </span>
          <p className="text-sm font-semibold leading-6 sm:text-base">
            Bac de maths 2026 : dernière ligne droite — accès à{" "}
            {BAC_2026_OFFER_PRICE} € avec le code {BAC_2026_PROMO_CODE} au
            lieu de {PACK_REVISION_EXPRESS_PRICE} €.
          </p>
        </div>
        <TrackedLink
          href={ctaHref}
          eventName="urgency_banner_click"
          eventParams={{
            source_page: sourcePage,
            offer: "bac2026",
            price: BAC_2026_OFFER_PRICE,
            currency: "EUR",
            coupon_code: BAC_2026_PROMO_CODE,
            cta_location: "urgency_banner",
          }}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-blue-900 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-800"
        >
          Commencer ma révision
          <ArrowRight className="h-4 w-4" />
        </TrackedLink>
      </div>
    </aside>
  );
}

