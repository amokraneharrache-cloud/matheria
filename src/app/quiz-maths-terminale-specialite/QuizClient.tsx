"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import type { QuizQuestion } from "./questions";

type QuizClientProps = {
  questions: QuizQuestion[];
};

export function QuizClient({ questions }: QuizClientProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [statusMessage, setStatusMessage] = useState(
    "Choisis une réponse, puis vérifie-la question par question ou corrige tout le quiz à la fin.",
  );

  const correctedCount = questions.reduce(
    (total, question) => total + (revealedAnswers[question.id] ? 1 : 0),
    0,
  );
  const score = questions.reduce(
    (total, question) =>
      total +
      (revealedAnswers[question.id] &&
      selectedAnswers[question.id] === question.correctIndex
        ? 1
        : 0),
    0,
  );

  const themesToReview = new Map<
    string,
    { label: string; href: string; resourceLabel: string; errors: number }
  >();

  for (const question of questions) {
    if (
      revealedAnswers[question.id] &&
      selectedAnswers[question.id] !== question.correctIndex
    ) {
      const current = themesToReview.get(question.themeId);
      themesToReview.set(question.themeId, {
        label: question.themeLabel,
        href: current?.href ?? question.resourceHref,
        resourceLabel: current?.resourceLabel ?? question.resourceLabel,
        errors: (current?.errors ?? 0) + 1,
      });
    }
  }

  function selectAnswer(questionId: string, optionIndex: number) {
    setSelectedAnswers((current) => ({ ...current, [questionId]: optionIndex }));
  }

  function revealQuestion(question: QuizQuestion, questionIndex: number) {
    if (selectedAnswers[question.id] === undefined) {
      setStatusMessage(`Choisis d’abord une réponse à la question ${questionIndex + 1}.`);
      return;
    }

    setRevealedAnswers((current) => ({ ...current, [question.id]: true }));
    setStatusMessage(
      selectedAnswers[question.id] === question.correctIndex
        ? `Question ${questionIndex + 1} : réponse correcte.`
        : `Question ${questionIndex + 1} : réponse à revoir. Lis l’explication affichée.`,
    );
  }

  function revealAll() {
    const allRevealed = Object.fromEntries(
      questions.map((question) => [question.id, true]),
    );
    const unanswered = questions.filter(
      (question) => selectedAnswers[question.id] === undefined,
    ).length;

    setRevealedAnswers(allRevealed);
    setStatusMessage(
      unanswered === 0
        ? "Quiz corrigé : consulte ton score et les chapitres à retravailler."
        : `Quiz corrigé avec ${unanswered} question${unanswered > 1 ? "s" : ""} sans réponse, comptée${unanswered > 1 ? "s" : ""} comme incorrecte${unanswered > 1 ? "s" : ""}.`,
    );
  }

  function restartQuiz() {
    setSelectedAnswers({});
    setRevealedAnswers({});
    setStatusMessage("Quiz recommencé. Les réponses et le score locaux ont été effacés.");
  }

  return (
    <section aria-labelledby="quiz-heading" className="space-y-8">
      <div className="sticky top-16 z-30 rounded-2xl border border-blue-200 bg-white/95 p-4 shadow-sm backdrop-blur print:static">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 id="quiz-heading" className="text-xl font-bold text-slate-950">
              Ton score local
            </h2>
            <p className="mt-1 text-slate-700">
              {correctedCount === questions.length
                ? `${score} bonne${score !== 1 ? "s" : ""} réponse${score !== 1 ? "s" : ""} sur ${questions.length}`
                : `${score} bonne${score !== 1 ? "s" : ""} réponse${score !== 1 ? "s" : ""} parmi ${correctedCount} question${correctedCount !== 1 ? "s" : ""} corrigée${correctedCount !== 1 ? "s" : ""}`}
            </p>
          </div>
          <progress
            aria-label="Questions corrigées"
            value={correctedCount}
            max={questions.length}
            className="h-3 w-full accent-blue-900 sm:max-w-64"
          >
            {correctedCount} sur {questions.length}
          </progress>
        </div>
        <p className="sr-only" aria-live="polite">{statusMessage}</p>
      </div>

      <ol className="space-y-7">
        {questions.map((question, questionIndex) => {
          const selectedIndex = selectedAnswers[question.id];
          const isRevealed = Boolean(revealedAnswers[question.id]);
          const isCorrect = selectedIndex === question.correctIndex;
          const isFirstOfTheme =
            questionIndex === 0 ||
            questions[questionIndex - 1]?.themeId !== question.themeId;

          return (
            <li
              key={question.id}
              id={isFirstOfTheme ? question.themeId : undefined}
              className="scroll-mt-40 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
            >
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-blue-800">
                Question {questionIndex + 1} · {question.themeLabel}
              </p>
              <fieldset className="mt-4">
                <legend className="text-xl font-bold leading-8 text-slate-950">
                  {question.prompt}
                </legend>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {question.options.map((option, optionIndex) => {
                    const isSelected = selectedIndex === optionIndex;
                    const isExpected = optionIndex === question.correctIndex;
                    const correctionClass = isRevealed
                      ? isExpected
                        ? "border-emerald-400 bg-emerald-50 text-emerald-950"
                        : isSelected
                          ? "border-red-400 bg-red-50 text-red-950"
                          : "border-slate-200 bg-slate-50 text-slate-600"
                      : isSelected
                        ? "border-blue-500 bg-blue-50 text-blue-950"
                        : "border-slate-200 bg-white text-slate-800 hover:border-blue-300";

                    return (
                      <label
                        key={option}
                        className={`flex min-h-14 items-start gap-3 rounded-xl border-2 p-4 leading-6 ${isRevealed ? "cursor-default" : "cursor-pointer"} ${correctionClass}`}
                      >
                        <input
                          type="radio"
                          name={question.id}
                          value={optionIndex}
                          checked={isSelected}
                          disabled={isRevealed}
                          onChange={() => selectAnswer(question.id, optionIndex)}
                          className="mt-1 h-4 w-4 shrink-0 accent-blue-900"
                        />
                        <span>{option}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => revealQuestion(question, questionIndex)}
                  disabled={selectedIndex === undefined}
                  className="min-h-12 rounded-full bg-blue-900 px-5 py-3 font-bold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  Vérifier cette réponse
                </button>
                {isRevealed ? (
                  <p className={`flex items-center gap-2 font-bold ${isCorrect ? "text-emerald-700" : "text-red-700"}`}>
                    {isCorrect ? (
                      <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <XCircle className="h-5 w-5" aria-hidden="true" />
                    )}
                    {isCorrect ? "Bonne réponse" : "Réponse incorrecte"}
                  </p>
                ) : null}
              </div>

              {isRevealed ? (
                <div className={`mt-5 rounded-xl p-5 ${isCorrect ? "bg-emerald-50 text-emerald-950" : "bg-amber-50 text-amber-950"}`}>
                  <h3 className="font-bold">Correction expliquée</h3>
                  <p className="mt-2 leading-7">{question.explanation}</p>
                  <Link href={question.resourceHref} className="mt-3 inline-flex font-bold underline underline-offset-4">
                    {question.resourceLabel}
                  </Link>
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>

      <section className="rounded-2xl border-2 border-blue-200 bg-blue-50 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-950">Terminer ou recommencer</h2>
        <p className="mt-3 leading-7 text-slate-700">{statusMessage}</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={revealAll}
            className="min-h-12 rounded-full bg-blue-900 px-5 py-3 font-bold text-white hover:bg-blue-800"
          >
            Corriger toutes mes réponses
          </button>
          <button
            type="button"
            onClick={restartQuiz}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-blue-900 px-5 py-3 font-bold text-blue-900 hover:bg-white"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Recommencer
          </button>
        </div>
      </section>

      {correctedCount > 0 ? (
        <section aria-live="polite" className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-950">Chapitres à retravailler</h2>
          {themesToReview.size > 0 ? (
            <ul className="mt-5 grid gap-4 md:grid-cols-2">
              {[...themesToReview.entries()].map(([themeId, theme]) => (
                <li key={themeId} className="rounded-xl bg-white p-5 shadow-sm">
                  <h3 className="font-bold text-slate-950">{theme.label}</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {theme.errors} réponse{theme.errors > 1 ? "s" : ""} incorrecte{theme.errors > 1 ? "s" : ""} ou absente{theme.errors > 1 ? "s" : ""}.
                  </p>
                  <Link href={theme.href} className="mt-3 inline-flex font-bold text-blue-900 underline underline-offset-4">
                    {theme.resourceLabel}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 leading-7 text-emerald-800">
              Aucune erreur parmi les questions déjà corrigées. Continue à vérifier les autres thèmes pour obtenir une vue complète.
            </p>
          )}
        </section>
      ) : null}
    </section>
  );
}
