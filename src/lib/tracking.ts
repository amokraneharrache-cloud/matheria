import { getStoredUtmEventParams } from "@/lib/utm";
import {
  getStorageItem,
  setStorageItem,
  storageKeys,
} from "@/lib/storageKeys";

export const TRACKING_DEBUG_KEY = storageKeys.trackingDebug;
export const TRACKING_PREFERENCE_KEY = storageKeys.trackingPreference;

export type TrackingMode = "off" | "internal" | "gtm-ready" | "ads-ready";

export type SprintMathsEventName =
  | "sprintmaths_page_view"
  | "sprintmaths_diagnostic_started"
  | "sprintmaths_diagnostic_completed"
  | "sprintmaths_lead"
  | "sprintmaths_view_offer"
  | "sprintmaths_initiate_checkout"
  | "sprintmaths_complete_registration"
  | "urgency_banner_click"
  | "click_bac2027_diagnostic"
  | "click_bac2027_exercises"
  | "click_bac2027_stripe"
  | "click_bac2027_offer"
  | "bac2026_primary_cta_click"
  | "bac2026_secondary_cta_click"
  | "guarantee_view"
  | "faq_expand"
  | "pricing_cta_click";

export type TrackingParams = {
  event_name?: string;
  exam_goal?: string;
  level?: string;
  offer?: string;
  price?: number;
  currency?: string;
  coupon_code?: string;
  cta_location?: string;
  faq_question?: string;
  source_page?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  timestamp?: string;
};

export type TrackingPreference = {
  trackingDisabled: boolean;
  updatedAt: string;
};

type DataLayerEvent = TrackingParams & {
  event: string;
  event_name: string;
  timestamp: string;
};

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

const ALLOWED_STRING_PARAMS = [
  "event_name",
  "exam_goal",
  "level",
  "offer",
  "currency",
  "coupon_code",
  "cta_location",
  "faq_question",
  "source_page",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "timestamp",
] as const;

export function getTrackingMode(): TrackingMode {
  const mode = process.env.NEXT_PUBLIC_TRACKING_MODE;

  if (
    mode === "internal" ||
    mode === "gtm-ready" ||
    mode === "ads-ready" ||
    mode === "off"
  ) {
    return mode;
  }

  return "off";
}

function getTrackingPreference(): TrackingPreference | null {
  const rawPreference = getStorageItem("trackingPreference");

  if (!rawPreference) {
    return null;
  }

  try {
    const preference = JSON.parse(rawPreference) as TrackingPreference;
    return {
      trackingDisabled: Boolean(preference.trackingDisabled),
      updatedAt: preference.updatedAt || new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function isTrackingDisabledOnDevice() {
  return Boolean(getTrackingPreference()?.trackingDisabled);
}

export function canTrack() {
  return getTrackingMode() !== "off" && !isTrackingDisabledOnDevice();
}

function sanitizeString(value: unknown) {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, 160) : undefined;
}

export function sanitizeTrackingParams(params: TrackingParams = {}) {
  const sanitized: TrackingParams = {};

  for (const key of ALLOWED_STRING_PARAMS) {
    const value = sanitizeString(params[key]);
    if (value) {
      sanitized[key] = value;
    }
  }

  if (typeof params.price === "number" && Number.isFinite(params.price)) {
    sanitized.price = params.price;
  }

  return sanitized;
}

function getSourcePageFallback() {
  if (typeof window === "undefined") {
    return undefined;
  }

  return window.location.pathname || "/";
}

function writeDebugEvent(event: DataLayerEvent) {
  const rawHistory = getStorageItem("trackingDebug");
  let history: DataLayerEvent[] = [];

  if (rawHistory) {
    try {
      const parsed = JSON.parse(rawHistory) as DataLayerEvent[];
      history = Array.isArray(parsed) ? parsed : [];
    } catch {
      history = [];
    }
  }

  const nextHistory = [...history, event].slice(-50);
  setStorageItem("trackingDebug", JSON.stringify(nextHistory));
}

export function trackEvent(eventName: SprintMathsEventName | string, params: TrackingParams = {}) {
  if (typeof window === "undefined" || !canTrack()) {
    return;
  }

  const safeEventName = sanitizeString(eventName) ?? "sprintmaths_event";
  const eventParams = sanitizeTrackingParams({
    ...getStoredUtmEventParams(),
    source_page: getSourcePageFallback(),
    ...params,
    event_name: safeEventName,
    timestamp: params.timestamp ?? new Date().toISOString(),
  });

  const dataLayerEvent: DataLayerEvent = {
    ...eventParams,
    event: safeEventName,
    event_name: safeEventName,
    timestamp: eventParams.timestamp ?? new Date().toISOString(),
  };

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(dataLayerEvent);
  writeDebugEvent(dataLayerEvent);
}

export function trackLead(params: TrackingParams = {}) {
  trackEvent("sprintmaths_lead", params);
}

export function trackDiagnosticStarted(params: TrackingParams = {}) {
  trackEvent("sprintmaths_diagnostic_started", params);
}

export function trackDiagnosticCompleted(params: TrackingParams = {}) {
  trackEvent("sprintmaths_diagnostic_completed", params);
}

export function trackViewOffer(params: TrackingParams = {}) {
  trackEvent("sprintmaths_view_offer", params);
}

export function trackInitiateCheckout(params: TrackingParams = {}) {
  trackEvent("sprintmaths_initiate_checkout", params);
}

export function trackCompleteRegistration(params: TrackingParams = {}) {
  trackEvent("sprintmaths_complete_registration", params);
}
