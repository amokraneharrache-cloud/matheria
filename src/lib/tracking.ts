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
  | "page_view"
  | "click_diagnostic"
  | "click_exercises"
  | "click_offer"
  | "stripe_click"
  | "diagnostic_start"
  | "diagnostic_complete"
  | "click_lead_magnet_planning"
  | "email_optin"
  | "lead_magnet_request"
  | "lead_magnet_download"
  | "click_planning_diagnostic"
  | "click_planning_typebac"
  | "click_planning_subjects"
  | "click_planning_offer"
  | "click_typebac_free_exercise"
  | "click_typebac_subjects_page"
  | "free_exercise_step_reveal"
  | "click_typebac_diagnostic"
  | "click_typebac_planning"
  | "click_typebac_offer"
  | "click_typebac_stripe"
  | "click_subjects_typebac_start"
  | "click_subjects_typebac_planning"
  | "click_subjects_typebac_diagnostic"
  | "click_subjects_typebac_offer"
  | "click_subjects_cluster_exercise"
  | "click_subjects_chapter_table"
  | "click_subjects_page_anchor"
  | "free_exercise_start"
  | "free_exercise_complete"
  | "purchase"
  | "access_code_created"
  | "account_created"
  | "first_session_start"
  | "session_complete"
  | "refund_request"
  | "sprintmaths_page_view"
  | "sprintmaths_diagnostic_started"
  | "sprintmaths_diagnostic_completed"
  | "sprintmaths_lead"
  | "sprintmaths_view_offer"
  | "sprintmaths_initiate_checkout"
  | "sprintmaths_complete_registration"
  | "urgency_banner_click"
  | "click_article_planning_cta"
  | "click_article_diagnostic_cta"
  | "click_article_typebac_cta"
  | "click_article_offer_cta"
  | "click_internal_suites_cluster"
  | "click_internal_limites_cluster"
  | "click_internal_derivation_cluster"
  | "click_internal_logarithme_cluster"
  | "click_internal_probabilites_cluster"
  | "click_internal_geometrie_cluster"
  | "click_internal_subjects_typebac"
  | "click_chapter_exercise_cta"
  | "click_chapter_method_cta"
  | "click_chapter_subjects_cta"
  | "click_chapter_planning_cta"
  | "click_chapter_diagnostic_cta"
  | "click_method_chapter_exercises"
  | "click_method_chapter_program"
  | "click_method_chapter_typebac"
  | "click_method_chapter_subjects"
  | "click_method_chapter_planning"
  | "click_method_chapter_diagnostic"
  | "click_exercise_chapter_typebac"
  | "click_exercise_chapter_subjects"
  | "click_exercise_chapter_method"
  | "click_exercise_chapter_planning"
  | "click_exercise_chapter_diagnostic"
  | "click_exercise_chapter_offer"
  | "free_chapter_exercise_reveal"
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
  anchor?: string;
  chapter?: string;
  cluster?: string;
  destination_page?: string;
  exam_goal?: string;
  intent?: string;
  level?: string;
  offer?: string;
  price?: number;
  currency?: string;
  coupon_code?: string;
  cta_location?: string;
  faq_question?: string;
  lead_magnet?: string;
  link_type?: string;
  payment_provider?: string;
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
  "anchor",
  "chapter",
  "cluster",
  "destination_page",
  "exam_goal",
  "intent",
  "level",
  "offer",
  "currency",
  "coupon_code",
  "cta_location",
  "faq_question",
  "lead_magnet",
  "link_type",
  "payment_provider",
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

export function trackPageView(params: TrackingParams = {}) {
  trackEvent("page_view", params);
}

export function trackClickDiagnostic(params: TrackingParams = {}) {
  trackEvent("click_diagnostic", params);
}

export function trackClickExercises(params: TrackingParams = {}) {
  trackEvent("click_exercises", params);
}

export function trackClickOffer(params: TrackingParams = {}) {
  trackEvent("click_offer", params);
}

export function trackStripeClick(params: TrackingParams = {}) {
  trackEvent("stripe_click", params);
}

export function trackEmailOptin(params: TrackingParams = {}) {
  trackEvent("email_optin", params);
}

export function trackLead(params: TrackingParams = {}) {
  trackEmailOptin(params);
}

export function trackDiagnosticStarted(params: TrackingParams = {}) {
  trackEvent("diagnostic_start", params);
}

export function trackDiagnosticCompleted(params: TrackingParams = {}) {
  trackEvent("diagnostic_complete", params);
}

export function trackViewOffer(params: TrackingParams = {}) {
  trackEvent("sprintmaths_view_offer", params);
}

export function trackInitiateCheckout(params: TrackingParams = {}) {
  trackStripeClick(params);
}

export function trackCompleteRegistration(params: TrackingParams = {}) {
  trackEvent("account_created", params);
}
