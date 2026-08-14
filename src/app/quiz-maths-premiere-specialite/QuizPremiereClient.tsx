"use client";

import Link from "next/link";
import { CheckCircle2, RefreshCcw, XCircle } from "lucide-react";
import { useMemo, useState } from "react";
import {
  premiereQuizQuestions,
  quizChapterLabels,
  quizChapterOrder,
} from "./questions";

function scoreInterpretation(score: number) {
  if (score >= 24) {
    return "Les bases de ce quiz sont solides. Passe maintenant à des exercices plus longs et rédigés pour tester la mobilisation de plusieurs notions.";
  }
  if (score >= 15) {
    return "Plusieurs acquis sont en place, mais les chapitres signalés méritent une reprise ciblée avant un nouvel essai.";
  }
  return "Commence par reprendre les formules et les méthodes des chapitres signalés, puis refais le quiz sans chercher à mémoriser les lettres des réponses.";
}

export function QuizPremiereClient() {
  const questions = premiereQuizQuestions;
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [completed, setCompleted] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const score = questions.reduce(
    (total, question) =>
      total + (answers[question.id] === question.correctIndex ? 1 : 0),
    0,
  );

  const chapterResults = useMemo(
    () =>
      quizChapterOrder.map((chapter) => {
        const chapterQuestions = questions.filter(
          (question) => question.chapter === chapter,
        );
        const correct = chapterQuestions.filter(
          (question) => answers[question.id] === question.correctIndex,
        ).length;

        return {
          chapter,
          correct,
          total: chapterQuestions.length,
          reviewQuestion: chapterQuestions.find(
            (question) => answers[question.id] !== question.correctIndex,
          ),
        };
      }),
    [answers, questions],
  );

  function finishQuiz() {
    if (answeredCount !== questions.length) return;
    setRevealed(
      Object.fromEntries(questions.map((question) => [question.id, true])),
    );
    setCompleted(true);
  }

  function restartQuiz() {
    setAnswers({});
    setRevealed({});
    setCompleted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="space-y-10">
      <section
        id="quiz"
        className="scroll-mt-24 rounded-3xl border-2 border-violet-200 bg-violet-50 p-5 sm:p-8"
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-violet-800">
              Mode local · aucune réponse enregistrée
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950">
              Les 30 questions
            </h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-700">
              Choisis une réponse, puis vérifie-la immédiatement ou attends la
              correction finale. Une seule réponse est correcte par question.
            </p>
          </div>
          <div className="shrink-0 rounded-2xl border border-violet-200 bg-white px-5 py-4">
            <p className="text-sm font-bold text-slate-700">Progression</p>
            <p className="mt-1 text-2xl font-extrabold text-violet-900">
              {answeredCount}/30
            </p>
          </div>
        </div>

        <progress
          value={answeredCount}
          max={questions.length}
          aria-label="Progression du quiz"
          className="mt-5 h-3 w-full accent-violet-700"
        >
          {answeredCount} réponses sur {questions.length}
        </progress>
      </section>

      <ol className="grid gap-7">
        {questions.map((question, index) => {
          const selected = answers[question.id];
          const isRevealed = Boolean(revealed[question.id]);
          const isCorrect = selected === question.correctIndex;

          return (
            <li
              key={question.id}
              id={question.id}
              className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.12em]">
                <span className="rounded-full bg-violet-100 px-3 py-1 text-violet-900">
                  Question {index + 1}/30
                </span>
                <span className="text-slate-500">
                  {quizChapterLabels[question.chapter]}
                </span>
              </div>
              <p className="mt-3 text-sm font-semibold text-blue-800">
                Compétence : {question.competency}
              </p>

              <fieldset className="mt-4">
                <legend className="text-lg font-bold leading-8 text-slate-950">
                  {question.prompt}
                </legend>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {question.options.map((option, optionIndex) => {
                    const isSelected = selected === optionIndex;
                    const isExpected = optionIndex === question.correctIndex;
                    const stateClass = isRevealed
                      ? isExpected
                        ? "border-emerald-500 bg-emerald-50"
                        : isSelected
                          ? "border-red-400 bg-red-50"
                          : "border-slate-200 bg-white"
                      : isSelected
                        ? "border-violet-600 bg-violet-50"
                        : "border-slate-200 bg-white hover:border-violet-300";

                    return (
                      <label
                        key={option}
                        className={`flex min-h-14 cursor-pointer gap-3 rounded-xl border-2 p-4 leading-6 text-slate-800 ${stateClass}`}
                      >
                        <input
                          type="radio"
                          name={question.id}
                          checked={isSelected}
                          disabled={isRevealed}
                          onChange={() =>
                            setAnswers((current) => ({
                              ...current,
                              [question.id]: optionIndex,
                            }))
                          }
                          className="mt-1 accent-violet-700"
                        />
                        <span>{option}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {!isRevealed ? (
                <button
                  type="button"
                  disabled={selected === undefined}
                  onClick={() =>
                    setRevealed((current) => ({
                      ...current,
                      [question.id]: true,
                    }))
                  }
                  className="mt-5 min-h-11 w-full rounded-full border border-violet-700 px-5 py-2 font-bold text-violet-800 hover:bg-violet-50 disabled:cursor-not-allowed disabled:border-slate-300 disabled:text-slate-400 sm:w-auto"
                >
                  Vérifier cette réponse
                </button>
              ) : null}

              <div
                hidden={!isRevealed}
                aria-live="polite"
                className={`mt-5 rounded-2xl p-5 ${
                  isCorrect
                    ? "bg-emerald-50 text-emerald-950"
                    : "bg-amber-50 text-amber-950"
                }`}
              >
                <p className="flex items-center gap-2 font-bold">
                  {isCorrect ? (
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <XCircle className="h-5 w-5" aria-hidden="true" />
                  )}
                  {isCorrect ? "Bonne réponse" : "Réponse à corriger"}
                </p>
                <p className="mt-3 leading-7">{question.explanation}</p>
                <p className="mt-3 border-t border-current/15 pt-3 text-sm leading-6">
                  <strong>Piège à éviter :</strong> {question.trap}
                </p>
                <Link
                  href={question.resourceHref}
                  className="mt-4 inline-flex font-bold underline underline-offset-4"
                >
                  {question.resourceLabel}
                </Link>
              </div>
            </li>
          );
        })}
      </ol>

      {!completed ? (
        <section className="rounded-3xl border-2 border-blue-200 bg-blue-50 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-950">Terminer le quiz</h2>
          <p className="mt-3 leading-7 text-slate-700">
            Réponds aux 30 questions pour afficher le score global et le détail
            par chapitre. Les questions déjà vérifiées restent comptées.
          </p>
          <button
            type="button"
            disabled={answeredCount !== questions.length}
            onClick={finishQuiz}
            className="mt-5 min-h-12 w-full rounded-full bg-blue-900 px-6 py-3 font-bold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
          >
            Corriger et voir mon score
          </button>
        </section>
      ) : (
        <section
          id="resultats"
          aria-live="polite"
          className="scroll-mt-24 rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-6 sm:p-8"
        >
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-800">
            Résultat local
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-slate-950">
            Score : {score}/30
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-700">
            {scoreInterpretation(score)} Ce résultat décrit seulement les notions
            testées ici : il ne prédit ni une note au bac ni un niveau général.
          </p>

          <h3 className="mt-8 text-2xl font-bold text-slate-950">
            Résultats par chapitre
          </h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {chapterResults.map((result) => (
              <article
                key={result.chapter}
                className="rounded-xl border border-emerald-100 bg-white p-4"
              >
                <h4 className="font-bold text-slate-950">
                  {quizChapterLabels[result.chapter]}
                </h4>
                <p className="mt-2 text-2xl font-extrabold text-emerald-800">
                  {result.correct}/{result.total}
                </p>
              </article>
            ))}
          </div>

          {chapterResults.some((result) => result.correct < result.total) ? (
            <div className="mt-8 rounded-2xl bg-amber-50 p-5">
              <h3 className="text-xl font-bold text-amber-950">
                Chapitres à retravailler
              </h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {chapterResults
                  .filter((result) => result.correct < result.total)
                  .map((result) => (
                    <li key={result.chapter}>
                      <Link
                        href={result.reviewQuestion?.resourceHref ?? formulasPath}
                        className="block rounded-xl border border-amber-200 bg-white p-4 font-bold text-amber-950 hover:border-amber-400"
                      >
                        {quizChapterLabels[result.chapter]} · revoir la fiche
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ) : (
            <p className="mt-7 rounded-xl bg-white p-4 font-semibold text-emerald-900">
              Aucun chapitre en erreur sur ce quiz. Poursuis avec les exercices
              rédigés pour vérifier ta méthode.
            </p>
          )}

          <button
            type="button"
            onClick={restartQuiz}
            className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-emerald-700 bg-white px-6 py-3 font-bold text-emerald-900 hover:bg-emerald-100 sm:w-auto"
          >
            <RefreshCcw className="h-5 w-5" aria-hidden="true" />
            Recommencer le quiz
          </button>
        </section>
      )}
    </div>
  );
}

const formulasPath = "/formules-maths-premiere-specialite";
