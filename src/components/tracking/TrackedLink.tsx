"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import { trackEvent, type SprintMathsEventName, type TrackingParams } from "@/lib/tracking";

type TrackedLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  prefetch?: boolean;
  eventName?: SprintMathsEventName;
  eventParams?: TrackingParams;
  ariaLabel?: string;
};

function isExternalHref(href: string) {
  return /^https?:\/\//.test(href);
}

export function TrackedLink({
  href,
  children,
  className,
  target,
  rel,
  prefetch,
  eventName,
  eventParams,
  ariaLabel,
}: TrackedLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented || !eventName) {
      return;
    }

    trackEvent(eventName, eventParams);
  };

  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        target={target}
        rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
        className={className}
        aria-label={ariaLabel}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      prefetch={prefetch}
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
