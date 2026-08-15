"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown, ExternalLink, TriangleAlert } from "lucide-react";

export type ExamCorrectionItem = {
  id: string;
  label: string;
  question: string;
  notion: string;
  recognition: string;
  reasoning: string;
  calculations?: readonly string[];
  redaction: string;
  result: string;
  commonError: string;
};

export type ExamCorrectionExercise = {
  id: string;
  title: string;
  points: string;
  topics: string;
  difficulty: "Accessible" | "Intermédiaire" | "Soutenue";
  skill: string;
  items: readonly ExamCorrectionItem[];
};

export function OfficialExamCorrection({
  dayId,
  exercises,
}: {
  dayId: string;
  exercises: readonly ExamCorrectionExercise[];
}) {
  const [allOpen, setAllOpen] = useState(false);
  const [openExercises, setOpenExercises] = useState<Record<string, boolean>>({});

  const isOpen = (exerciseId: string) => allOpen || Boolean(openExercises[exerciseId]);

  return (
    <div className="space-y-7">
      <div className="flex flex-col gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="leading-7 text-blue-950">
          Les corrigés restent dans la page : ce bouton ne fait que les afficher ou les masquer localement.
        </p>
        <button
          type="button"
          onClick={() => setAllOpen((value) => !value)}
          className="min-h-11 shrink-0 rounded-full bg-blue-900 px-5 py-2 font-bold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
        >
          {allOpen ? "Masquer tous les corrigés" : "Afficher tous les corrigés"}
        </button>
      </div>

      {exercises.map((exercise) => {
        const open = isOpen(exercise.id);
        const panelId = `${dayId}-${exercise.id}-correction`;

        return (
          <article
            key={exercise.id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-6 sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-blue-800">
                    {exercise.points}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-slate-950">{exercise.title}</h3>
                  <p className="mt-3 leading-7 text-slate-700">{exercise.topics}</p>
                </div>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => {
                    if (allOpen) setAllOpen(false);
                    setOpenExercises((current) => ({
                      ...current,
                      [exercise.id]: !open,
                    }));
                  }}
                  className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-blue-900 px-4 py-2 font-bold text-blue-900 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
                >
                  {open ? "Masquer" : "Voir le corrigé"}
                  <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
                </button>
              </div>
            </div>

            <div id={panelId} hidden={!open} className="border-t border-slate-200 bg-slate-50 p-6 sm:p-8">
              <p className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 font-semibold leading-7 text-amber-950">
                Correction proposée par SprintMaths à partir du sujet officiel.
              </p>
              <div className="space-y-6">
                {exercise.items.map((item) => (
                  <section key={item.id} className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
                    <p className="text-sm font-bold uppercase tracking-[0.12em] text-blue-800">{item.label}</p>
                    <h4 className="mt-2 text-xl font-bold text-slate-950">{item.question}</h4>

                    <dl className="mt-5 grid gap-4 lg:grid-cols-2">
                      <div className="rounded-lg bg-blue-50 p-4">
                        <dt className="font-bold text-blue-950">Notion à reconnaître</dt>
                        <dd className="mt-2 leading-7 text-slate-700">{item.notion} — {item.recognition}</dd>
                      </div>
                      <div className="rounded-lg bg-slate-100 p-4">
                        <dt className="font-bold text-slate-950">Raisonnement</dt>
                        <dd className="mt-2 leading-7 text-slate-700">{item.reasoning}</dd>
                      </div>
                    </dl>

                    {item.calculations?.length ? (
                      <div className="mt-4 rounded-lg border border-slate-200 p-4">
                        <h5 className="font-bold text-slate-950">Calculs utiles</h5>
                        <div className="mt-2 space-y-2 font-mono text-sm leading-7 text-slate-700 sm:text-base">
                          {item.calculations.map((calculation) => <p key={calculation}>{calculation}</p>)}
                        </div>
                      </div>
                    ) : null}

                    <div className="mt-4 grid gap-4 lg:grid-cols-2">
                      <div className="rounded-lg bg-emerald-50 p-4 text-emerald-950">
                        <h5 className="flex items-center gap-2 font-bold">
                          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                          Rédaction possible et résultat
                        </h5>
                        <p className="mt-2 leading-7">{item.redaction}</p>
                        <p className="mt-2 font-bold leading-7">{item.result}</p>
                      </div>
                      <div className="rounded-lg bg-red-50 p-4 text-red-950">
                        <h5 className="flex items-center gap-2 font-bold">
                          <TriangleAlert className="h-5 w-5" aria-hidden="true" />
                          Erreur fréquente
                        </h5>
                        <p className="mt-2 leading-7">{item.commonError}</p>
                      </div>
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function OfficialPdfLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-blue-900 px-5 py-2 font-bold text-white hover:bg-blue-800"
    >
      {label}
      <ExternalLink className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}
