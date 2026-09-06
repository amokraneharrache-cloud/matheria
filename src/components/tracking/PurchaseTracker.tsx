"use client";

import { useEffect } from "react";
import { trackVerifiedPurchase } from "@/lib/purchaseTracking";

export function PurchaseTracker() {
  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get("session_id");
    if (!sessionId) return;
    let cancelled = false;
    async function verify() {
      try {
        const response = await fetch("/api/stripe/purchase", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
          cache: "no-store",
        });
        if (!response.ok || cancelled) return;
        const result = await response.json();
        if (result.verified === true && !cancelled) trackVerifiedPurchase(result.purchase);
      } catch {
        // Measurement must never prevent a customer from activating their access.
      }
    }
    void verify();
    return () => { cancelled = true; };
  }, []);
  return null;
}
