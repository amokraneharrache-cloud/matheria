"use client";

import Link from "next/link";
import { CheckCircle2, Eye, Lightbulb, RefreshCcw } from "lucide-react";
import { useState } from "react";
import {
  premiereExamExercises,
  type PremiereExamExercise,
} from "./exercises";

function drawExercises(count: number) {
  const shuffled = [...premiereExamExercises];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[target]] = [shuffled[target], shuffled[index]];
  }
  return shuffled.slice(0, count);
}

function ExerciseCard({
  exercise,
  forceCorrection = false,
  mode = false,
}: {
  exercise: PremiereExamExercise;
  forceCorrection?: boolean;
  mode?: boolean;
}) {
  const [hintVisible, setHintVisible] = useState(false);
  const [correctionVisible, setCorrectionVisible] = useState(false);
  const showCorrection = forceCorrection || correctionVisible;

  return (
    <article
      id={mode ? undefined : exercise.id}
      className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
    >
      <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.12em]">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-900">
          Exercice {exercise.number}
        </span>
        <span className="text-slate-500">{exercise.theme}</span>
      </div>
      <h3 className="mt-4 text-2xl font-bold text-slate-950">{exercise.title}</h3>

      <div className="mt-4 flex flex-wrap gap-2 text-sm font-semibold">
        <span className="rounded-full bg-slate-100 px-3 py-2 text-slate-700">
          Difficulté : {exercise.difficulty}
        </span>
        <span className="rounded-full bg-amber-50 px-3 py-2 text-amber-900">
          Temps pédagogique : {exercise.pedagogicalTime}
        </span>
      </div>

      <div className="mt-5">
        <p className="font-bold text-slate-950">Compétences</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {exercise.skills.map((skill) => (
            <li key={skill} className="rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-700">
              {skill}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 rounded-2xl bg-slate-50 p-5">
        <h4 className="font-bold text-slate-950">Énoncé</h4>
        <p className="mt-3 leading-7 text-slate-800">{exercise.context}</p>
        {exercise.code ? (
          <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm leading-6 text-slate-50">
            <code>{exercise.code}</code>
          </pre>
        ) : null}
        <ol className="mt-5 space-y-3">
          {exercise.questions.map((question, index) => (
            <li key={question} className="flex gap-3 leading-7 text-slate-800">
              <span className="font-bold text-blue-900">{index + 1}.</span>
              <span>{question}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          aria-expanded={hintVisible}
          onClick={() => setHintVisible((current) => !current)}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-amber-600 px-5 py-2 font-bold text-amber-900 hover:bg-amber-50 sm:w-auto"
        >
          <Lightbulb className="h-4 w-4" aria-hidden="true" />
          {hintVisible ? "Masquer l’indice" : "Afficher un indice"}
        </button>
        {!forceCorrection ? (
          <button
            type="button"
            aria-expanded={showCorrection}
            onClick={() => setCorrectionVisible((current) => !current)}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-blue-900 px-5 py-2 font-bold text-white hover:bg-blue-800 sm:w-auto"
          >
            <Eye className="h-4 w-4" aria-hidden="true" />
            {showCorrection ? "Masquer la correction" : "Afficher la correction"}
          </button>
        ) : null}
      </div>

      <div
        hidden={!hintVisible}
        className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 leading-7 text-amber-950"
      >
        <strong>Indice :</strong> {exercise.hint}
      </div>

      <div
        hidden={!showCorrection}
        className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-6"
      >
        <h4 className="text-2xl font-bold text-emerald-950">Correction détaillée</h4>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <section className="rounded-xl bg-white p-4">
            <h5 className="font-bold text-slate-950">1. Ce qu’il fallait reconnaître</h5>
            <p className="mt-2 leading-7 text-slate-700">{exercise.correction.recognition}</p>
          </section>
          <section className="rounded-xl bg-white p-4">
            <h5 className="font-bold text-slate-950">2. Méthode</h5>
            <p className="mt-2 leading-7 text-slate-700">{exercise.correction.method}</p>
          </section>
        </div>

        <section className="mt-5 rounded-xl bg-white p-4">
          <h5 className="font-bold text-slate-950">3. Calculs</h5>
          <ol className="mt-3 space-y-3">
            {exercise.correction.calculations.map((calculation, index) => (
              <li key={calculation} className="flex gap-3 font-mono text-sm leading-7 text-slate-700 sm:text-base">
                <span className="font-sans font-bold text-emerald-800">{index + 1}.</span>
                <span>{calculation}</span>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <section className="rounded-xl bg-white p-4">
            <h5 className="font-bold text-slate-950">4. Rédaction attendue</h5>
            <p className="mt-2 leading-7 text-slate-700">{exercise.correction.writing}</p>
          </section>
          <section className="rounded-xl bg-emerald-900 p-4 text-white">
            <h5 className="font-bold">5. Conclusion</h5>
            <p className="mt-2 leading-7">{exercise.correction.conclusion}</p>
          </section>
        </div>

        <section className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4">
          <h5 className="font-bold text-red-950">Erreurs fréquentes</h5>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-red-950">
            {exercise.commonErrors.map((error) => (
              <li key={error}>• {error}</li>
            ))}
          </ul>
        </section>

        <section className="mt-5">
          <h5 className="font-bold text-slate-950">Notions à revoir</h5>
          <div className="mt-3 flex flex-wrap gap-2">
            {exercise.reviewLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-emerald-300 bg-white px-4 py-2 text-sm font-bold text-emerald-900 hover:border-emerald-500"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}

export function ExerciseTrainingClient() {
  const [selectedExercises, setSelectedExercises] = useState<PremiereExamExercise[]>([]);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [correctionsVisible, setCorrectionsVisible] = useState(false);

  function startSeries(count: number) {
    setSelectedExercises(drawExercises(count));
    setCompletedIds([]);
    setCorrectionsVisible(false);
  }

  function toggleCompleted(id: string) {
    setCompletedIds((current) =>
      current.includes(id)
        ? current.filter((exerciseId) => exerciseId !== id)
        : [...current, id],
    );
  }

  return (
    <div className="space-y-16">
      <section
        id="mode-epreuve"
        className="scroll-mt-24 rounded-3xl border-2 border-violet-200 bg-violet-50 p-5 sm:p-8"
      >
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-violet-800">
          Mode local · sans chronomètre ni stockage
        </p>
        <h2 className="mt-3 text-3xl font-bold text-slate-950">
          Lancer une série d’entraînement
        </h2>
        <p className="mt-4 max-w-3xl leading-7 text-slate-700">
          Tire deux ou trois exercices, traite-les sur papier, marque ta progression,
          puis révèle toutes les corrections. Le tirage ne reproduit aucune
          pondération officielle.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={() => startSeries(2)}
            className="min-h-12 w-full rounded-full bg-violet-800 px-6 py-3 font-bold text-white hover:bg-violet-700 sm:w-auto"
          >
            Tirer 2 exercices
          </button>
          <button
            type="button"
            onClick={() => startSeries(3)}
            className="min-h-12 w-full rounded-full border border-violet-700 bg-white px-6 py-3 font-bold text-violet-900 hover:bg-violet-100 sm:w-auto"
          >
            Tirer 3 exercices
          </button>
        </div>

        {selectedExercises.length > 0 ? (
          <div className="mt-8 space-y-7">
            <div className="rounded-2xl border border-violet-200 bg-white p-4">
              <div className="flex items-center justify-between gap-4 text-sm font-bold text-slate-800">
                <span>Progression</span>
                <span>{completedIds.length}/{selectedExercises.length} exercices traités</span>
              </div>
              <progress
                value={completedIds.length}
                max={selectedExercises.length}
                aria-label="Progression de la série d’exercices"
                className="mt-3 h-3 w-full accent-violet-700"
              >
                {completedIds.length} sur {selectedExercises.length}
              </progress>
            </div>

            <ol className="space-y-7">
              {selectedExercises.map((exercise) => (
                <li key={exercise.id}>
                  <ExerciseCard
                    exercise={exercise}
                    forceCorrection={correctionsVisible}
                    mode
                  />
                  <button
                    type="button"
                    aria-pressed={completedIds.includes(exercise.id)}
                    onClick={() => toggleCompleted(exercise.id)}
                    className={`mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-5 py-2 font-bold sm:w-auto ${
                      completedIds.includes(exercise.id)
                        ? "bg-emerald-700 text-white"
                        : "border border-emerald-700 bg-white text-emerald-900"
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    {completedIds.includes(exercise.id)
                      ? "Exercice marqué comme traité"
                      : "Marquer comme traité"}
                  </button>
                </li>
              ))}
            </ol>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => setCorrectionsVisible((current) => !current)}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-violet-800 px-6 py-3 font-bold text-white hover:bg-violet-700 sm:w-auto"
              >
                <Eye className="h-5 w-5" aria-hidden="true" />
                {correctionsVisible ? "Masquer les corrections" : "Révéler les corrections"}
              </button>
              <button
                type="button"
                onClick={() => startSeries(selectedExercises.length)}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-violet-700 bg-white px-6 py-3 font-bold text-violet-900 hover:bg-violet-100 sm:w-auto"
              >
                <RefreshCcw className="h-5 w-5" aria-hidden="true" />
                Nouveau tirage
              </button>
            </div>
          </div>
        ) : null}
      </section>

      <section id="exercices" className="scroll-mt-24">
        <h2 className="text-3xl font-bold text-slate-950">
          Les 10 exercices corrigés
        </h2>
        <p className="mt-3 max-w-4xl leading-7 text-slate-700">
          Travaille-les dans l’ordre ou choisis un thème. Les temps indiqués sont
          de simples repères pédagogiques SprintMaths, jamais des durées imposées
          pour un exercice officiel.
        </p>
        <ol className="mt-8 space-y-8">
          {premiereExamExercises.map((exercise) => (
            <li key={exercise.id}>
              <ExerciseCard exercise={exercise} />
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
