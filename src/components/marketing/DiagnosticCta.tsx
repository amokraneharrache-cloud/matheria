import { ArrowRight } from "lucide-react";
import { TrackedLink } from "@/components/tracking/TrackedLink";

export function DiagnosticCta({
  sourcePage,
  placement,
  context,
}: {
  sourcePage: string;
  placement: "after_intro" | "after_exercise" | "annales_contextual" | "after_correction";
  context?: string;
}) {
  return (
    <aside className="rounded-2xl border border-indigo-200 bg-indigo-50 p-6 print:hidden sm:p-8">
      {context ? <p className="mb-3 leading-7 text-indigo-950">{context}</p> : null}
      <h2 className="text-2xl font-bold text-slate-950">Teste tes bases en 10 questions</h2>
      <p className="mt-3 leading-7 text-slate-700">
        Résultat et corrections immédiats. Aucun email obligatoire.
      </p>
      <TrackedLink
        href="/diagnostic"
        eventName="diagnostic_cta_click"
        eventParams={{ source_page: sourcePage, placement }}
        className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-indigo-700 px-6 py-3 text-center font-bold text-white hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-700"
      >
        Faire le test gratuit <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
      </TrackedLink>
    </aside>
  );
}
