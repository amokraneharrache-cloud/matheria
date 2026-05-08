"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { captureUtmContext } from "@/lib/utm";
import { trackEvent } from "@/lib/tracking";

export function UtmCapture() {
  const pathname = usePathname();
  const trackedPageViews = useRef<Set<string>>(new Set());

  useEffect(() => {
    captureUtmContext();

    if (pathname === "/" && !trackedPageViews.current.has(pathname)) {
      trackedPageViews.current.add(pathname);
      trackEvent("sprintmaths_page_view", { source_page: "/" });
    }
  }, [pathname]);

  return null;
}
