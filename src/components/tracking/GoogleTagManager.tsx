"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { getTrackingMode, isTrackingDisabledOnDevice } from "@/lib/tracking";
import { storageEvents } from "@/lib/storageKeys";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
const trackingMode = getTrackingMode();

export function GoogleTagManager() {
  const [canLoad, setCanLoad] = useState(false);

  useEffect(() => {
    const refreshPreference = () => {
      setCanLoad(!isTrackingDisabledOnDevice());
    };

    refreshPreference();
    window.addEventListener(storageEvents.trackingPreferenceChanged, refreshPreference);

    return () => {
      window.removeEventListener(storageEvents.trackingPreferenceChanged, refreshPreference);
    };
  }, []);

  if (
    !gtmId ||
    !canLoad ||
    (trackingMode !== "gtm-ready" && trackingMode !== "ads-ready")
  ) {
    return null;
  }

  const encodedGtmId = encodeURIComponent(gtmId);

  return (
    <>
      <Script id="sprintmaths-gtm-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
        `}
      </Script>
      <Script
        id="sprintmaths-gtm"
        src={`https://www.googletagmanager.com/gtm.js?id=${encodedGtmId}`}
        strategy="afterInteractive"
      />
    </>
  );
}
