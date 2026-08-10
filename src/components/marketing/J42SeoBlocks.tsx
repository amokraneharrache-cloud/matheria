import type { ReactNode } from "react";
import { ExternalLink, ListChecks } from "lucide-react";
import { PrintButton } from "@/components/marketing/PrintButton";
import type { FaqItem } from "@/lib/seo";

type OfficialSource = {
  href: string;
  label: string;
  description?: string;
};

const quickAnswerToneClassNames = {
  blue: "border-blue-300 bg-blue-50 text-blue-950",
  emerald: "border-emerald-300 bg-emerald-50 text-emerald-950",
  amber: "border-amber-300 bg-amber-50 text-amber-950",
} as const;

export function QuickAnswer({
  title,
  children,
  tone = "blue",
}: {
  title: string;
  children: ReactNode;
  tone?: "blue" | "emerald" | "amber";
}) {
  return (
    <section className={`rounded-2xl border-2 p-6 sm:p-8 ${quickAnswerToneClassNames[tone]}`}>
      <p className="text-sm font-bold uppercase tracking-[0.16em]">Réponse rapide</p>
      <h2 className="mt-3 text-3xl font-bold">{title}</h2>
      <div className="mt-4 space-y-3 text-lg leading-8">{children}</div>
    </section>
  );
}

export function PrintableChecklist({
  heading,
  intro,
  items,
  printLabel,
}: {
  heading: string;
  intro?: string;
  items: string[];
  printLabel: string;
}) {
  return (
    <section className="break-inside-avoid rounded-2xl border-2 border-blue-200 bg-blue-50 p-6 sm:p-8">
      <ListChecks className="h-7 w-7 text-blue-800" aria-hidden="true" />
      <h2 className="mt-4 text-3xl font-bold text-slate-950">{heading}</h2>
      {intro ? <p className="mt-3 leading-7 text-slate-700">{intro}</p> : null}
      <ul className="mt-6 grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex break-inside-avoid gap-3 rounded-xl border border-blue-100 bg-white p-4 leading-7 text-slate-800"
          >
            <span aria-hidden="true" className="text-xl leading-7 text-blue-900">
              □
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 border-t border-blue-200 pt-5">
        <PrintButton label={printLabel} />
      </div>
    </section>
  );
}

export function StaticFaq({ items }: { items: FaqItem[] }) {
  return (
    <section className="space-y-5">
      <h2 className="text-3xl font-bold text-slate-950">Questions fréquentes</h2>
      <div className="grid gap-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <summary className="cursor-pointer list-none rounded-lg text-lg font-bold text-slate-950 outline-none marker:hidden focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-offset-4">
              <span className="flex items-center justify-between gap-4">
                {item.question}
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 leading-7 text-slate-700">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function OfficialSources({
  sources,
  title = "Sources officielles",
}: {
  sources: OfficialSource[];
  title?: string;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-slate-950">{title}</h2>
      <ul className="mt-5 space-y-4">
        {sources.map((source) => (
          <li key={source.href}>
            <a
              href={source.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-start gap-2 font-bold text-blue-900 underline underline-offset-4"
            >
              {source.label}
              <ExternalLink className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
            </a>
            {source.description ? (
              <p className="mt-1 text-sm leading-6 text-slate-600">{source.description}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
