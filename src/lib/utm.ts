import { getStorageItem, setStorageItem, storageKeys } from "@/lib/storageKeys";

export const UTM_STORAGE_KEY = storageKeys.utmContext;

export type StoredTouch = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  fbclid?: string;
  ttclid?: string;
  snapclid?: string;
  landing_page: string;
};

export type UtmContext = {
  firstTouch: (StoredTouch & { created_at: string }) | null;
  lastTouch: (StoredTouch & { updated_at: string }) | null;
};

export type UtmEventParams = Pick<
  StoredTouch,
  "utm_source" | "utm_medium" | "utm_campaign" | "utm_content" | "utm_term"
>;

const TRACKING_QUERY_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
  "ttclid",
] as const;

const SNAP_CLICK_ID_KEYS = ["ScCid", "sc_cid", "scclid", "snapclid", "_scid"];

function sanitizeQueryValue(value: string | null) {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, 160) : undefined;
}

function getStoredUtmContext(): UtmContext {
  const raw = getStorageItem("utmContext");

  if (!raw) {
    return { firstTouch: null, lastTouch: null };
  }

  try {
    const parsed = JSON.parse(raw) as UtmContext;
    return {
      firstTouch: parsed.firstTouch ?? null,
      lastTouch: parsed.lastTouch ?? null,
    };
  } catch {
    return { firstTouch: null, lastTouch: null };
  }
}

export function readStoredUtmContext() {
  return getStoredUtmContext();
}

export function captureUtmContext() {
  if (typeof window === "undefined") {
    return;
  }

  const searchParams = new URLSearchParams(window.location.search);
  const touch: Partial<StoredTouch> = {};

  for (const key of TRACKING_QUERY_KEYS) {
    const value = sanitizeQueryValue(searchParams.get(key));
    if (value) {
      touch[key] = value;
    }
  }

  for (const key of SNAP_CLICK_ID_KEYS) {
    const value = sanitizeQueryValue(searchParams.get(key));
    if (value) {
      touch.snapclid = value;
      break;
    }
  }

  const hasTrackingParam = Object.keys(touch).length > 0;
  if (!hasTrackingParam) {
    return;
  }

  const now = new Date().toISOString();
  const landingPage = window.location.pathname || "/";
  const stored = getStoredUtmContext();
  const nextTouch = {
    ...touch,
    landing_page: landingPage,
  } as StoredTouch;

  const nextContext: UtmContext = {
    firstTouch:
      stored.firstTouch ??
      {
        ...nextTouch,
        created_at: now,
      },
    lastTouch: {
      ...nextTouch,
      updated_at: now,
    },
  };

  setStorageItem("utmContext", JSON.stringify(nextContext));
}

export function getStoredUtmEventParams(): UtmEventParams {
  const context = getStoredUtmContext();
  const source = context.lastTouch ?? context.firstTouch;

  if (!source) {
    return {};
  }

  return {
    utm_source: source.utm_source,
    utm_medium: source.utm_medium,
    utm_campaign: source.utm_campaign,
    utm_content: source.utm_content,
    utm_term: source.utm_term,
  };
}
