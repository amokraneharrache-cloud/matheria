"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, RefreshCcw, XCircle } from "lucide-react";
import {
  automationQuestions,
  automationThemeLabels,
  automationThemeOrder,
  type AutomationQuestion,
  type AutomationTheme,
} from "./questions";

type ThemeFilter = "tous" | AutomationTheme;

function drawQuestions(questions: AutomationQuestion[], count: number) {
  const shuffled = [...questions];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const targetIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[targetIndex]] = [
      shuffled[targetIndex],
      shuffled[index],
    ];
  }
  return shuffled.slice(0, count);
}

export function AutomatismesTrainer() {
  const questions = automationQuestions;
  const [filter, setFilter] = useState<ThemeFilter>("tous");
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, number>>({});
  const [practiceRevealed, setPracticeRevealed] = useState<Record<string, boolean>>({});
  const [simulationQuestions, setSimulationQuestions] = useState<AutomationQuestion[]>([]);
  const [simulationAnswers, setSimulationAnswers] = useState<Record<string, number>>({});
  const [simulationCorrected, setSimulationCorrected] = useState(false);

  const visibleQuestions =
    filter === "tous"
      ? questions
      : questions.filter((question) => question.theme === filter);

  const simulationScore = simulationQuestions.reduce(
    (score, question) =>
      score + (simulationAnswers[question.id] === question.correctIndex ? 1 : 0),
    0,
  );
  const simulationProgress = simulationQuestions.filter(
    (question) => simulationAnswers[question.id] !== undefined,
  ).length;

  const themesToReview = useMemo(() => {
    if (!simulationCorrected) return [];

    return automationThemeOrder
      .map((theme) => ({
        theme,
        errors: simulationQuestions.filter(
          (question) =>
            question.theme === theme &&
            simulationAnswers[question.id] !== question.correctIndex,
        ).length,
      }))
      .filter((item) => item.errors > 0);
  }, [simulationAnswers, simulationCorrected, simulationQuestions]);

  function startSimulation() {
    setSimulationQuestions(drawQuestions(questions, 12));
    setSimulationAnswers({});
    setSimulationCorrected(false);
  }

  return (
    <div className="space-y-16">
      <section id="simulation" className="scroll-mt-24 rounded-3xl border-2 border-violet-200 bg-violet-50 p-5 sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-violet-800">
          Mode local · aucune donnée enregistrée
        </p>
        <h2 className="mt-3 text-3xl font-bold text-slate-950">
          Simulation automatismes — 6 points
        </h2>
        <p className="mt-4 max-w-3xl leading-7 text-slate-700">
          Le tirage propose 12 questions tirées au sort. La note locale est ramenée sur 6
          pour rendre l&apos;entraînement lisible ; elle ne prétend pas reproduire la
          distribution d&apos;un futur sujet officiel.
        </p>

        {simulationQuestions.length === 0 ? (
          <button
            type="button"
            onClick={startSimulation}
            className="mt-6 min-h-12 w-full rounded-full bg-violet-800 px-6 py-3 font-bold text-white hover:bg-violet-700 sm:w-auto"
          >
            Lancer une simulation
          </button>
        ) : (
          <div className="mt-7 space-y-7">
            <div className="rounded-2xl border border-violet-200 bg-white p-4">
              <div className="flex items-center justify-between gap-4 text-sm font-bold text-slate-800">
                <span>Progression</span>
                <span>{simulationProgress}/12 réponses</span>
              </div>
              <progress
                value={simulationProgress}
                max={12}
                aria-label="Progression de la simulation"
                className="mt-3 h-3 w-full accent-violet-700"
              >
                {simulationProgress} sur 12
              </progress>
            </div>

            <ol className="grid gap-5 lg:grid-cols-2">
              {simulationQuestions.map((question, index) => {
                const selected = simulationAnswers[question.id];
                const correct = selected === question.correctIndex;

                return (
                  <li key={question.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-violet-800">
                      Question {index + 1} · {question.chapter}
                    </p>
                    <fieldset className="mt-3">
                      <legend className="font-bold leading-7 text-slate-950">
                        {question.prompt}
                      </legend>
                      <div className="mt-4 grid gap-2">
                        {question.options.map((option, optionIndex) => {
                          const isSelected = selected === optionIndex;
                          const isExpected = optionIndex === question.correctIndex;
                          const correctionClass = simulationCorrected
                            ? isExpected
                              ? "border-emerald-400 bg-emerald-50"
                              : isSelected
                                ? "border-red-400 bg-red-50"
                                : "border-slate-200"
                            : isSelected
                              ? "border-violet-500 bg-violet-50"
                              : "border-slate-200 hover:border-violet-300";

                          return (
                            <label
                              key={option}
                              className={`flex cursor-pointer gap-3 rounded-xl border-2 p-3 text-sm leading-6 ${correctionClass}`}
                            >
                              <input
                                type="radio"
                                name={`simulation-${question.id}`}
                                checked={isSelected}
                                disabled={simulationCorrected}
                                onChange={() =>
                                  setSimulationAnswers((current) => ({
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
                    {simulationCorrected ? (
                      <div className={`mt-4 rounded-xl p-4 text-sm leading-6 ${correct ? "bg-emerald-50 text-emerald-950" : "bg-amber-50 text-amber-950"}`}>
                        <p className="flex items-center gap-2 font-bold">
                          {correct ? (
                            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                          ) : (
                            <XCircle className="h-4 w-4" aria-hidden="true" />
                          )}
                          {correct ? "Bonne réponse" : "À revoir"}
                        </p>
                        <p className="mt-2">{question.explanation}</p>
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ol>

            {!simulationCorrected ? (
              <button
                type="button"
                disabled={simulationProgress < 12}
                onClick={() => setSimulationCorrected(true)}
                className="min-h-12 w-full rounded-full bg-violet-800 px-6 py-3 font-bold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
              >
                Terminer et corriger
              </button>
            ) : (
              <section aria-live="polite" className="rounded-2xl border border-violet-200 bg-white p-6">
                <h3 className="text-2xl font-bold text-slate-950">
                  Résultat : {simulationScore}/12, soit {simulationScore / 2}/6
                </h3>
                {themesToReview.length > 0 ? (
                  <div className="mt-4">
                    <p className="font-bold text-slate-950">Thèmes à retravailler</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {themesToReview.map((item) => (
                        <li key={item.theme} className="rounded-full bg-amber-100 px-3 py-2 text-sm font-semibold text-amber-950">
                          {automationThemeLabels[item.theme]} · {item.errors} erreur{item.errors > 1 ? "s" : ""}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="mt-3 font-semibold text-emerald-800">
                    Aucun thème en erreur sur ce tirage.
                  </p>
                )}
                <button
                  type="button"
                  onClick={startSimulation}
                  className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-violet-700 px-5 py-3 font-bold text-violet-800 hover:bg-violet-50 sm:w-auto"
                >
                  <RefreshCcw className="h-4 w-4" aria-hidden="true" />
                  Nouveau tirage
                </button>
              </section>
            )}
          </div>
        )}
      </section>

      <section id="entrainement" className="scroll-mt-24">
        <h2 className="text-3xl font-bold text-slate-950">
          50 exercices et QCM corrigés
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-700">
          Travaille tout le parcours ou sélectionne un thème. Chaque correction
          explique le réflexe attendu et le piège à éviter.
        </p>
        <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filtrer les questions par thème">
          <button
            type="button"
            aria-pressed={filter === "tous"}
            onClick={() => setFilter("tous")}
            className={`rounded-full border px-4 py-2 text-sm font-bold ${filter === "tous" ? "border-blue-900 bg-blue-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"}`}
          >
            Tous ({questions.length})
          </button>
          {automationThemeOrder.map((theme) => {
            const count = questions.filter((question) => question.theme === theme).length;
            return (
              <button
                key={theme}
                type="button"
                aria-pressed={filter === theme}
                onClick={() => setFilter(theme)}
                className={`rounded-full border px-4 py-2 text-sm font-bold ${filter === theme ? "border-blue-900 bg-blue-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"}`}
              >
                {automationThemeLabels[theme]} ({count})
              </button>
            );
          })}
        </div>

        <p className="mt-5 text-sm font-semibold text-slate-600" aria-live="polite">
          {visibleQuestions.length} question{visibleQuestions.length > 1 ? "s" : ""} affichée{visibleQuestions.length > 1 ? "s" : ""}
        </p>

        <ol className="mt-6 grid gap-5 lg:grid-cols-2">
          {visibleQuestions.map((question, index) => {
            const selected = practiceAnswers[question.id];
            const revealed = Boolean(practiceRevealed[question.id]);
            const correct = selected === question.correctIndex;

            return (
              <li key={question.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-800">
                  {automationThemeLabels[question.theme]} · {question.chapter}
                </p>
                <fieldset className="mt-3">
                  <legend className="text-lg font-bold leading-7 text-slate-950">
                    {filter === "tous" ? `${index + 1}. ` : ""}{question.prompt}
                  </legend>
                  <div className="mt-4 grid gap-2">
                    {question.options.map((option, optionIndex) => {
                      const isSelected = selected === optionIndex;
                      const isExpected = optionIndex === question.correctIndex;
                      const correctionClass = revealed
                        ? isExpected
                          ? "border-emerald-400 bg-emerald-50"
                          : isSelected
                            ? "border-red-400 bg-red-50"
                            : "border-slate-200"
                        : isSelected
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-200 hover:border-blue-300";

                      return (
                        <label key={option} className={`flex cursor-pointer gap-3 rounded-xl border-2 p-3 text-sm leading-6 ${correctionClass}`}>
                          <input
                            type="radio"
                            name={`practice-${question.id}`}
                            checked={isSelected}
                            disabled={revealed}
                            onChange={() =>
                              setPracticeAnswers((current) => ({
                                ...current,
                                [question.id]: optionIndex,
                              }))
                            }
                            className="mt-1 accent-blue-900"
                          />
                          <span>{option}</span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
                <button
                  type="button"
                  disabled={selected === undefined || revealed}
                  onClick={() =>
                    setPracticeRevealed((current) => ({
                      ...current,
                      [question.id]: true,
                    }))
                  }
                  className="mt-4 min-h-11 w-full rounded-full bg-blue-900 px-4 py-2 text-sm font-bold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-300 sm:w-auto"
                >
                  Vérifier
                </button>
                {revealed ? (
                  <div className={`mt-4 rounded-xl p-4 text-sm leading-6 ${correct ? "bg-emerald-50 text-emerald-950" : "bg-amber-50 text-amber-950"}`}>
                    <p className="font-bold">{correct ? "Bonne réponse" : `Réponse correcte : ${question.options[question.correctIndex]}`}</p>
                    <p className="mt-2">{question.explanation}</p>
                    {question.trap ? <p className="mt-2"><strong>Piège :</strong> {question.trap}</p> : null}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
