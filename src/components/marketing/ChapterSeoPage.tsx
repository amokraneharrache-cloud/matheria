import Link from "next/link";
import type { ReactNode } from "react";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import type { SprintMathsEventName, TrackingParams } from "@/lib/tracking";
import { cn } from "@/lib/utils";

type ChapterHeroCta = {
  href: string;
  label: string;
  eventName: SprintMathsEventName;
  eventParams?: TrackingParams;
  icon?: ReactNode;
  rel?: string;
  target?: string;
  variant?: "primary" | "secondary";
};

type ChapterHeroProps = {
  eyebrow: string;
  title: string;
  description: ReactNode;
  secondaryDescription?: ReactNode;
  ctas?: ChapterHeroCta[];
  media?: ReactNode;
};

const heroCtaClassNames = {
  primary:
    "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-900 px-5 py-3 text-center font-bold text-white hover:bg-blue-800 sm:w-auto",
  secondary:
    "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-blue-900 px-5 py-3 text-center font-bold text-blue-900 hover:bg-blue-50 sm:w-auto",
} as const;

export function ChapterHero({
  eyebrow,
  title,
  description,
  secondaryDescription,
  ctas = [],
  media,
}: ChapterHeroProps) {
  return (
    <section
      className={cn(
        "bg-gradient-to-b from-blue-50 via-white to-white px-4 py-14 sm:py-20",
        media && "overflow-hidden",
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-6xl",
          media && "grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-center",
        )}
      >
        <div>
          <p className="mb-4 inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-900">
            {eyebrow}
          </p>
          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
            {description}
          </p>
          {secondaryDescription ? (
            <p className="mt-4 max-w-3xl leading-7 text-slate-700">
              {secondaryDescription}
            </p>
          ) : null}
          {ctas.length > 0 ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {ctas.map((cta) => (
                <TrackedLink
                  key={`${cta.href}-${cta.label}`}
                  href={cta.href}
                  target={cta.target}
                  rel={cta.rel}
                  eventName={cta.eventName}
                  eventParams={cta.eventParams}
                  className={heroCtaClassNames[cta.variant ?? "primary"]}
                >
                  {cta.icon}
                  {cta.label}
                </TrackedLink>
              ))}
            </div>
          ) : null}
        </div>

        {media}
      </div>
    </section>
  );
}

export type ChapterInternalLink = {
  href: string;
  label: string;
};

type ChapterInternalLinksProps = {
  links: ChapterInternalLink[];
  title: string;
  variant?: "pills" | "cards";
};

export function ChapterInternalLinks({
  links,
  title,
  variant = "pills",
}: ChapterInternalLinksProps) {
  if (variant === "cards") {
    return (
      <section>
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
          {title}
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg border border-slate-200 bg-white p-4 font-semibold text-slate-800 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-blue-950"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-slate-50 p-6">
      <h3 className="text-2xl font-bold text-slate-950">{title}</h3>
      <div className="mt-5 flex flex-wrap gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-200 hover:text-blue-900"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
