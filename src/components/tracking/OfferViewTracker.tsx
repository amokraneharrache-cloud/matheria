"use client";

import { useEffect, useRef } from "react";
import { trackViewOffer } from "@/lib/tracking";

type OfferViewTrackerProps = {
  sourcePage: string;
  offer: string;
  price: number;
  currency: string;
  ctaLocation: string;
};

export function OfferViewTracker({
  sourcePage,
  offer,
  price,
  currency,
  ctaLocation,
}: OfferViewTrackerProps) {
  const markerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker) {
      return;
    }

    let tracked = false;
    const trackView = () => {
      if (tracked) {
        return;
      }

      tracked = true;
      trackViewOffer({
        source_page: sourcePage,
        offer,
        price,
        currency,
        cta_location: ctaLocation,
      });
    };

    if (!("IntersectionObserver" in window)) {
      trackView();
      return;
    }

    const markerRect = marker.getBoundingClientRect();
    if (markerRect.top < window.innerHeight && markerRect.bottom > 0) {
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
      { threshold: 0.1 },
    );

    observer.observe(marker);

    return () => observer.disconnect();
  }, [ctaLocation, currency, offer, price, sourcePage]);

  return (
    <span
      ref={markerRef}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 h-px w-full"
    />
  );
}
