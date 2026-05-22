"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { captureUtmContext } from "@/lib/utm";
import { trackPageView } from "@/lib/tracking";

function canTrackPageView(pathname: string) {
  return !(
    pathname.startsWith("/app") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname === "/merci" ||
    pathname === "/connexion" ||
    pathname === "/acces"
  );
}

export function UtmCapture() {
  const pathname = usePathname();
  const trackedPageViews = useRef<Set<string>>(new Set());

  useEffect(() => {
    captureUtmContext();

    if (canTrackPageView(pathname) && !trackedPageViews.current.has(pathname)) {
      trackedPageViews.current.add(pathname);
      trackPageView({ source_page: pathname });
    }
  }, [pathname]);

  return null;
}
