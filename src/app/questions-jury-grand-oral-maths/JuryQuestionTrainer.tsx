"use client";

import { useMemo, useState } from "react";
import type {
  JuryTrainingCategory,
  JuryTrainingQuestion,
} from "@/data/grandOral";

const categories: JuryTrainingCategory[] = [
  "Général",
  "Probabilités",
  "Fonctions",
  "Suites",
  "Géométrie",
  "Python",
];

export function JuryQuestionTrainer({ questions }: { questions: JuryTrainingQuestion[] }) {
  const [category, setCategory] = useState<JuryTrainingCategory>("Général");
  const [currentQuestion, setCurrentQuestion] = useState<JuryTrainingQuestion | null>(null);
  const [showGuidance, setShowGuidance] = useState(false);

  const categoryQuestions = useMemo(
    () => questions.filter((question) => question.category === category),
    [category, questions],
  );

  function drawQuestion() {
    const alternatives = categoryQuestions.filter(
      (question) => question.id !== currentQuestion?.id,
    );
    const pool = alternatives.length > 0 ? alternatives : categoryQuestions;
    const nextQuestion = pool[Math.floor(Math.random() * pool.length)];

    setCurrentQuestion(nextQuestion ?? null);
    setShowGuidance(false);
  }

  function changeCategory(nextCategory: JuryTrainingCategory) {
    setCategory(nextCategory);
    setCurrentQuestion(null);
    setShowGuidance(false);
  }

  return (
    <section
      aria-labelledby="jury-trainer-title"
      className="rounded-2xl border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-white p-5 sm:p-8"
    >
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">Mode entraînement</p>
      <h2 id="jury-trainer-title" className="mt-3 text-3xl font-bold text-slate-950">
        Tire une question au hasard
      </h2>
      <p className="mt-3 max-w-3xl leading-7 text-slate-700">
        Choisis une famille, réponds à voix haute sans notes, puis affiche les points à
        expliquer. La banque est locale : aucun compte, micro ou service externe.
      </p>

      <fieldset className="mt-6">
        <legend className="font-bold text-slate-950">Type de question</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => changeCategory(option)}
              aria-pressed={category === option}
              className={`min-h-11 rounded-full border px-4 py-2 text-sm font-bold ${
                category === option
                  ? "border-blue-900 bg-blue-900 text-white"
                  : "border-slate-300 bg-white text-slate-800 hover:border-blue-400 hover:bg-blue-50"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      <button
        type="button"
        onClick={drawQuestion}
        className="mt-6 min-h-12 w-full rounded-full bg-blue-900 px-6 py-3 text-lg font-bold text-white hover:bg-blue-800 sm:w-auto"
      >
        Donne-moi une question
      </button>

      <div className="mt-6" aria-live="polite">
        {currentQuestion ? (
          <article className="rounded-2xl bg-slate-950 p-5 text-white sm:p-7">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-200">
              Question — {currentQuestion.category}
            </p>
            <h3 className="mt-3 text-2xl font-bold leading-9">{currentQuestion.question}</h3>

            <button
              type="button"
              onClick={() => setShowGuidance((value) => !value)}
              aria-expanded={showGuidance}
              className="mt-6 min-h-11 rounded-full bg-white px-5 py-2 font-bold text-blue-950 hover:bg-blue-50"
            >
              {showGuidance
                ? "Masquer les points à expliquer"
                : "Voir ce qu’il faut penser à expliquer"}
            </button>

            {showGuidance ? (
              <dl className="mt-5 grid gap-3 text-sm leading-6 md:grid-cols-3">
                <div className="rounded-xl bg-white/10 p-4">
                  <dt className="font-bold text-blue-100">Concepts attendus</dt>
                  <dd className="mt-2 text-slate-200">{currentQuestion.concepts}</dd>
                </div>
                <div className="rounded-xl bg-white/10 p-4">
                  <dt className="font-bold text-blue-100">Point de vigilance</dt>
                  <dd className="mt-2 text-slate-200">{currentQuestion.attention}</dd>
                </div>
                <div className="rounded-xl bg-white/10 p-4">
                  <dt className="font-bold text-blue-100">Structure possible</dt>
                  <dd className="mt-2 text-slate-200">{currentQuestion.structure}</dd>
                </div>
              </dl>
            ) : null}
          </article>
        ) : (
          <p className="rounded-xl border border-dashed border-blue-300 bg-white p-5 text-slate-700">
            La question apparaîtra ici. Essaie de répondre pendant 30 à 60 secondes avant
            d’afficher l’aide.
          </p>
        )}
      </div>
    </section>
  );
}

