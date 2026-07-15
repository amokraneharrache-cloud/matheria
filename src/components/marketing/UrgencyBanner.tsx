import { ArrowRight, GraduationCap } from "lucide-react";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import {
  PACK_REVISION_EXPRESS_OFFER_ID,
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
  ctaHref = "/bac-maths-2027#offre",
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
            <GraduationCap className="h-4 w-4" />
          </span>
          <p className="text-sm font-semibold leading-6 sm:text-base">
            Pack Révision Express Bac Maths 2027 — {PACK_REVISION_EXPRESS_PRICE} €
            en paiement unique, sans abonnement.
          </p>
        </div>
        <TrackedLink
          href={ctaHref}
          eventName="urgency_banner_click"
          eventParams={{
            source_page: sourcePage,
            offer: PACK_REVISION_EXPRESS_OFFER_ID,
            price: PACK_REVISION_EXPRESS_PRICE,
            currency: "EUR",
            cta_location: "urgency_banner",
          }}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-blue-900 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-800"
        >
          Voir le pack 2027
          <ArrowRight className="h-4 w-4" />
        </TrackedLink>
      </div>
    </aside>
  );
}
