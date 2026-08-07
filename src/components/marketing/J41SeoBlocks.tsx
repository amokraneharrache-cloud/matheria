import type { ReactNode } from "react";
import { CheckCircle2, ListChecks, TriangleAlert } from "lucide-react";
import { PrintButton } from "@/components/marketing/PrintButton";

export type TocItem = {
  href: `#${string}`;
  label: string;
};

export function ResourceToc({
  items,
  label,
}: {
  items: TocItem[];
  label: string;
}) {
  return (
    <section className="border-y border-slate-200 bg-slate-50 px-4 py-7 print:hidden">
      <nav aria-label={label} className="mx-auto max-w-6xl">
        <p className="font-bold text-slate-950">Sommaire</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-blue-900 hover:border-blue-300 hover:bg-blue-50"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </section>
  );
}

export type ResourceTableRow = {
  key: string;
  cells: readonly ReactNode[];
};

export function ResourceTable({
  caption,
  headers,
  rows,
  prominent = false,
}: {
  caption: string;
  headers: string[];
  rows: ResourceTableRow[];
  prominent?: boolean;
}) {
  return (
    <div
      className={`overflow-x-auto rounded-2xl border ${
        prominent
          ? "border-blue-300 bg-blue-50 shadow-sm"
          : "border-slate-200 bg-white"
      }`}
    >
      <table className="w-full min-w-[720px] border-collapse text-left">
        <caption className="bg-blue-950 px-4 py-3 text-left text-sm font-bold uppercase tracking-[0.12em] text-white">
          {caption}
        </caption>
        <thead className="bg-slate-100 text-slate-950">
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col" className="px-4 py-3 font-bold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key} className="border-t border-slate-200 odd:bg-white even:bg-slate-50/70">
              {row.cells.map((cell, index) => (
                <td
                  key={`${row.key}-${headers[index] ?? index}`}
                  className="px-4 py-4 align-top leading-7 text-slate-700 first:font-semibold first:text-slate-950"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export type CorrectedExercise = {
  label: string;
  title: string;
  statement: string;
  trap: string;
  method: string;
  calculations: string[];
  answer: string;
  why: string;
};

export function CorrectedExerciseList({
  exercises,
  heading,
}: {
  exercises: CorrectedExercise[];
  heading: string;
}) {
  return (
    <section id="exercices" className="scroll-mt-24">
      <h2 className="text-3xl font-bold text-slate-950">{heading}</h2>
      <div className="mt-7 space-y-7">
        {exercises.map((exercise) => (
          <article
            key={exercise.label}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-blue-800">
              {exercise.label}
            </p>
            <h3 className="mt-3 text-2xl font-bold text-slate-950">
              {exercise.title}
            </h3>
            <p className="mt-4 rounded-xl bg-slate-50 p-4 leading-7 text-slate-800">
              <strong>Question :</strong> {exercise.statement}
            </p>
            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              <div className="space-y-5">
                <div>
                  <h4 className="font-bold text-slate-950">Piège à éviter</h4>
                  <p className="mt-2 leading-7 text-red-900">{exercise.trap}</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-950">Méthode</h4>
                  <p className="mt-2 leading-7 text-slate-700">{exercise.method}</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-950">Calcul</h4>
                  <div className="mt-2 space-y-2 font-mono text-sm leading-7 text-slate-700 sm:text-base">
                    {exercise.calculations.map((calculation) => (
                      <p key={calculation}>{calculation}</p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-xl bg-blue-50 p-4 text-blue-950">
                  <h4 className="font-bold">Pourquoi cette méthode ?</h4>
                  <p className="mt-2 leading-7">{exercise.why}</p>
                </div>
                <div className="rounded-xl bg-emerald-50 p-4 text-emerald-950">
                  <h4 className="font-bold">Réponse</h4>
                  <p className="mt-2 leading-7">{exercise.answer}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ChecklistBlock({
  heading,
  items,
  printLabel,
}: {
  heading: string;
  items: string[];
  printLabel?: string;
}) {
  return (
    <section className="rounded-2xl border-2 border-blue-200 bg-blue-50 p-6 sm:p-8">
      <ListChecks className="h-7 w-7 text-blue-800" aria-hidden="true" />
      <h2 className="mt-4 text-3xl font-bold text-slate-950">{heading}</h2>
      <ul className="mt-6 grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 rounded-xl bg-white p-4 leading-7 text-slate-700">
            <CheckCircle2
              className="mt-1 h-5 w-5 shrink-0 text-emerald-600"
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {printLabel ? (
        <div className="mt-6 border-t border-blue-200 pt-5">
          <PrintButton label={printLabel} />
        </div>
      ) : null}
    </section>
  );
}

export function FrequentMistakesBlock({
  items,
  title = "Erreurs fréquentes",
}: {
  items: string[];
  title?: string;
}) {
  return (
    <section className="rounded-2xl border border-red-200 bg-red-50 p-6 sm:p-8">
      <TriangleAlert className="h-7 w-7 text-red-700" aria-hidden="true" />
      <h2 className="mt-4 text-3xl font-bold text-red-950">{title}</h2>
      <ul className="mt-5 grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="rounded-xl bg-white/80 p-4 leading-7 text-red-950">
            • {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
