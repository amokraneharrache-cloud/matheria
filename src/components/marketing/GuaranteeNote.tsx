"use client";

import { useEffect, useRef } from "react";
import { ShieldCheck } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/site";
import { trackEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";

type GuaranteeNoteProps = {
  className?: string;
  sourcePage?: string;
  variant?: "card" | "compact";
};

export function GuaranteeNote({
  className,
  sourcePage = "marketing_page",
  variant = "card",
}: GuaranteeNoteProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    let tracked = false;
    const trackView = () => {
      if (tracked) {
        return;
      }

      tracked = true;
      trackEvent("guarantee_view", {
        source_page: sourcePage,
      });
    };

    if (!("IntersectionObserver" in window)) {
      trackView();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          trackView();
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [sourcePage]);

  return (
    <div
      ref={ref}
      className={cn(
        "flex gap-3 rounded-xl text-left",
        variant === "card"
          ? "border border-emerald-200 bg-emerald-50 p-5 text-emerald-950"
          : "bg-emerald-50 p-4 text-emerald-950",
        className,
      )}
    >
      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
      <div>
        <p className="font-bold">Satisfait ou remboursé sous 7 jours.</p>
        <p className="mt-1 text-sm leading-6 text-emerald-900">
          Essayez SprintMaths. Si l’accès ne correspond pas à vos attentes,
          contactez-nous sous 7 jours à {CONTACT_EMAIL} pour demander un
          remboursement.
        </p>
      </div>
    </div>
  );
}

