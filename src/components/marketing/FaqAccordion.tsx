"use client";

import type { SyntheticEvent } from "react";
import type { FaqItem } from "@/lib/seo";
import { trackEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";

type FaqAccordionProps = {
  className?: string;
  items: FaqItem[];
  sourcePage?: string;
};

export function FaqAccordion({
  className,
  items,
  sourcePage = "faq",
}: FaqAccordionProps) {
  const handleToggle = (
    event: SyntheticEvent<HTMLDetailsElement>,
    question: string,
  ) => {
    if (event.currentTarget.open) {
      trackEvent("faq_expand", {
        source_page: sourcePage,
        faq_question: question,
      });
    }
  };

  return (
    <section className={cn("space-y-5", className)}>
      <h2 className="text-3xl font-bold text-slate-950">Questions fréquentes</h2>
      <div className="grid gap-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            onToggle={(event) => handleToggle(event, item.question)}
          >
            <summary className="cursor-pointer list-none text-lg font-bold text-slate-950 marker:hidden">
              <span className="flex items-center justify-between gap-4">
                {item.question}
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition-transform group-open:rotate-45">
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
