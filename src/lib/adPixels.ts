import {
  getTrackingMode,
  sanitizeTrackingParams,
  type TrackingParams,
} from "@/lib/tracking";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: {
      track?: (eventName: string, params?: TrackingParams) => void;
    };
    snaptr?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

function canUseDirectPixels(pixelId?: string) {
  return (
    typeof window !== "undefined" &&
    getTrackingMode() === "ads-ready" &&
    Boolean(pixelId)
  );
}

export function trackMetaEvent(eventName: string, params: TrackingParams = {}) {
  if (!canUseDirectPixels(process.env.NEXT_PUBLIC_META_PIXEL_ID) || !window.fbq) {
    return;
  }

  window.fbq("trackCustom", eventName, sanitizeTrackingParams(params));
}

export function trackTikTokEvent(eventName: string, params: TrackingParams = {}) {
  if (!canUseDirectPixels(process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID) || !window.ttq?.track) {
    return;
  }

  window.ttq.track(eventName, sanitizeTrackingParams(params));
}

export function trackSnapEvent(eventName: string, params: TrackingParams = {}) {
  if (!canUseDirectPixels(process.env.NEXT_PUBLIC_SNAP_PIXEL_ID) || !window.snaptr) {
    return;
  }

  window.snaptr("track", eventName, sanitizeTrackingParams(params));
}

export function trackGoogleAdsEvent(eventName: string, params: TrackingParams = {}) {
  if (!canUseDirectPixels(process.env.NEXT_PUBLIC_GOOGLE_ADS_ID) || !window.gtag) {
    return;
  }

  window.gtag("event", eventName, {
    ...sanitizeTrackingParams(params),
    send_to: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID,
  });
}
