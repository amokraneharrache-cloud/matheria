"use client";

import { useMemo, useSyncExternalStore } from "react";
import { type TrackingPreference } from "@/lib/tracking";
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
  storageEvents,
} from "@/lib/storageKeys";

const DEFAULT_PREFERENCE: TrackingPreference = {
  trackingDisabled: false,
  updatedAt: "",
};

function readPreference(): TrackingPreference {
  if (typeof window === "undefined") {
    return DEFAULT_PREFERENCE;
  }

  try {
    const rawPreference = getStorageItem("trackingPreference");
    if (!rawPreference) {
      return DEFAULT_PREFERENCE;
    }

    const preference = JSON.parse(rawPreference) as TrackingPreference;
    return {
      trackingDisabled: Boolean(preference.trackingDisabled),
      updatedAt: preference.updatedAt || new Date().toISOString(),
    };
  } catch {
    return DEFAULT_PREFERENCE;
  }
}

function subscribeToPreference(callback: () => void) {
  window.addEventListener(storageEvents.trackingPreferenceChanged, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(storageEvents.trackingPreferenceChanged, callback);
    window.removeEventListener("storage", callback);
  };
}

function getPreferenceSnapshot() {
  return JSON.stringify(readPreference());
}

function getServerPreferenceSnapshot() {
  return JSON.stringify(DEFAULT_PREFERENCE);
}

export function TrackingPreferenceControls() {
  const preferenceSnapshot = useSyncExternalStore(
    subscribeToPreference,
    getPreferenceSnapshot,
    getServerPreferenceSnapshot,
  );
  const preference = useMemo(
    () => JSON.parse(preferenceSnapshot) as TrackingPreference,
    [preferenceSnapshot],
  );

  const updatePreference = (trackingDisabled: boolean) => {
    const nextPreference = {
      trackingDisabled,
      updatedAt: new Date().toISOString(),
    };

    try {
      setStorageItem("trackingPreference", JSON.stringify(nextPreference));

      if (trackingDisabled) {
        removeStorageItem("trackingDebug");
      }

      window.dispatchEvent(new Event(storageEvents.trackingPreferenceChanged));
    } catch {
      // Preference storage is best-effort and must not block the page.
    }
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
      <p className="text-sm font-semibold text-slate-950">
        État sur cet appareil :{" "}
        <span className={preference.trackingDisabled ? "text-amber-700" : "text-emerald-700"}>
          {preference.trackingDisabled ? "mesure désactivée" : "mesure active"}
        </span>
      </p>
      {preference.updatedAt && (
        <p className="mt-2 text-xs text-slate-500">
          Dernière mise à jour : {new Date(preference.updatedAt).toLocaleString("fr-FR")}
        </p>
      )}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => updatePreference(true)}
          className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 hover:border-slate-400"
        >
          Désactiver la mesure d’audience sur cet appareil
        </button>
        <button
          type="button"
          onClick={() => updatePreference(false)}
          className="rounded-full bg-blue-900 px-5 py-3 text-sm font-bold text-white hover:bg-blue-800"
        >
          Réactiver la mesure d’audience sur cet appareil
        </button>
      </div>
    </div>
  );
}
