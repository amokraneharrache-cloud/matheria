import type { VerifiedPurchase } from "@/lib/purchase";
import { canTrack, trackEvent } from "@/lib/tracking";
import { initializeQaTracking } from "@/lib/qaTracking";

const sent = new Set<string>();
const STORAGE_KEY = "sprintmaths_verified_purchases";

export function trackVerifiedPurchase(purchase: VerifiedPurchase) {
  if (typeof window === "undefined" || !canTrack() ||
    !purchase || !/^cs_(live|test)_[a-zA-Z0-9]+$/.test(purchase.transaction_id) ||
    !Number.isFinite(purchase.value) || purchase.value <= 0 ||
    !/^[A-Z]{3}$/.test(purchase.currency)) return false;
  let previous: string[] = [];
  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
    if (Array.isArray(stored)) previous = stored.filter((value) => typeof value === "string");
  } catch { /* Storage can be unavailable; GA4 also deduplicates transaction_id. */ }
  if (sent.has(purchase.transaction_id) || previous.includes(purchase.transaction_id)) return false;
  if (purchase.traffic_type === "internal" || purchase.transaction_id.startsWith("cs_test_")) {
    initializeQaTracking(true);
  }
  trackEvent("purchase", { ...purchase, source_page: "/merci", payment_provider: "stripe" });
  sent.add(purchase.transaction_id);
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...previous, purchase.transaction_id].slice(-50)));
  } catch { /* The in-memory guard still prevents duplicate component effects. */ }
  return true;
}
