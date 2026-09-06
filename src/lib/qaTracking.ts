export const GA4_MEASUREMENT_ID = "G-761C7Z47JG";
const QA_SESSION_KEY = "sprintmaths_qa_session";
const SESSION_TIMEOUT_MS = 30 * 60 * 1000;
let qaUntil = 0;
let signalApplied = false;

export function isQaSearch(search: string) {
  const params = new URLSearchParams(search);
  return [params.get("utm_source"), params.get("utm_medium")]
    .some((value) => value?.trim().toLowerCase() === "qa");
}

export function isQaSession() {
  if (typeof window === "undefined") return false;
  const now = Date.now();
  try {
    qaUntil = Math.max(qaUntil, Number(window.sessionStorage.getItem(QA_SESSION_KEY)) || 0);
  } catch { /* Explicit UTM and in-memory detection work without storage. */ }
  if (isQaSearch(window.location.search) || qaUntil > now) {
    qaUntil = now + SESSION_TIMEOUT_MS;
    try { window.sessionStorage.setItem(QA_SESSION_KEY, String(qaUntil)); } catch { /* optional */ }
    return true;
  }
  return false;
}

export function pushGoogleTagCommand(...args: unknown[]) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  // gtag's documented command queue uses the Arguments object, not a GTM custom event.
  void args;
  // eslint-disable-next-line prefer-rest-params -- Google tag requires its documented Arguments queue.
  window.dataLayer.push(arguments);
}

export function initializeQaTracking(forceTestSession = false) {
  if (forceTestSession) qaUntil = Date.now() + SESSION_TIMEOUT_MS;
  const qa = isQaSession();
  if (!qa || typeof window === "undefined") return qa;
  // Fail closed: QA cannot reach this production property even if its remote
  // Internal Traffic filter is unavailable, misconfigured, or still propagating.
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA4_MEASUREMENT_ID}`] = true;
  if (!signalApplied) {
    pushGoogleTagCommand("set", { traffic_type: "internal" });
    signalApplied = true;
  }
  return true;
}
