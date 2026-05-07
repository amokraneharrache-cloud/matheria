"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  RotateCcw,
  Target,
  XCircle,
} from "lucide-react";
import { guidedExercises, type GuidedExercise } from "@/data/guidedExercises";
import { mockBacSubjects } from "@/data/mockBacSubjects";

const HISTORY_KEY = "matheria_bac_mock_exam_history";

type StudentProfile = {
  examGoal?: string;
};

type Answers = Record<string, number>;

type ExerciseResult = {
  exerciseId: string;
  topic: string;
  topicLabel: string;
  score: number;
  total: number;
  scoreSteps: number;
  totalSteps: number;
};

type ExamResult = {
  score20: number;
  percentage: number;
  exercises: ExerciseResult[];
  strongTopics: string[];
  weakTopics: string[];
};

type StoredExamHistory = {
  date: string;
  score20: number;
  exercises: {
    exerciseId: string;
    topic: string;
    score: number;
    total: number;
  }[];
};

function answerKey(exerciseId: string, stepId: string) {
  return `${exerciseId}:${stepId}`;
}

function roundOne(value: number) {
  return Math.round(value * 10) / 10;
}

function formatScore(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1).replace(".", ",");
}

function getSubjectExercises(exerciseIds: string[]) {
  return exerciseIds
    .map((exerciseId) => guidedExercises.find((exercise) => exercise.id === exerciseId))
    .filter((exercise): exercise is GuidedExercise => Boolean(exercise));
}

export function BacMockExamClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subjectId = searchParams.get("subject");
  const subject = mockBacSubjects.find((item) => item.id === subjectId) ?? mockBacSubjects[0];
  const exercises = useMemo(() => getSubjectExercises(subject.exerciseIds), [subject.exerciseIds]);
  const totalSteps = exercises.reduce((total, exercise) => total + exercise.steps.length, 0);

  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<ExamResult | null>(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem("matheria_student_profile");
    if (!storedProfile) {
      router.push("/merci");
      return;
    }

    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProfile(JSON.parse(storedProfile));
      setLoading(false);
    } catch {
      router.push("/merci");
    }
  }, [router]);

  const answeredSteps = Object.keys(answers).length;
  const isComplete = answeredSteps === totalSteps;

  const calculateResult = (): ExamResult => {
    const exerciseResults = exercises.map((exercise) => {
      const scoreSteps = exercise.steps.reduce((count, step) => {
        const selected = answers[answerKey(exercise.id, step.id)];
        return selected === step.correctOptionIndex ? count + 1 : count;
      }, 0);
      const score = roundOne((scoreSteps / exercise.steps.length) * 5);

      return {
        exerciseId: exercise.id,
        topic: exercise.topic,
        topicLabel: exercise.topicLabel,
        score,
        total: 5,
        scoreSteps,
        totalSteps: exercise.steps.length,
      };
    });

    const score20 = roundOne(exerciseResults.reduce((sum, item) => sum + item.score, 0));
    const strongTopics = exerciseResults
      .filter((item) => item.score >= 4)
      .map((item) => item.topicLabel);
    const weakTopics = exerciseResults
      .filter((item) => item.score < 3)
      .map((item) => item.topicLabel);

    return {
      score20,
      percentage: Math.round((score20 / 20) * 100),
      exercises: exerciseResults,
      strongTopics,
      weakTopics,
    };
  };

  const saveHistory = (examResult: ExamResult) => {
    try {
      const storedHistory = localStorage.getItem(HISTORY_KEY);
      const parsed = storedHistory ? JSON.parse(storedHistory) : [];
      const history: StoredExamHistory[] = Array.isArray(parsed) ? parsed : [];
      const entry: StoredExamHistory = {
        date: new Date().toISOString(),
        score20: examResult.score20,
        exercises: examResult.exercises.map((exercise) => ({
          exerciseId: exercise.exerciseId,
          topic: exercise.topic,
          score: exercise.score,
          total: exercise.total,
        })),
      };

      localStorage.setItem(HISTORY_KEY, JSON.stringify([entry, ...history].slice(0, 10)));
    } catch (error) {
      console.error("Failed to save mock bac exam history", error);
    }
  };

  const handleAnswer = (exerciseId: string, stepId: string, optionIndex: number) => {
    if (result) return;
    setAnswers((current) => ({
      ...current,
      [answerKey(exerciseId, stepId)]: optionIndex,
    }));
  };

  const handleSubmit = () => {
    if (!isComplete) return;
    const examResult = calculateResult();
    setResult(examResult);
    saveHistory(examResult);
  };

  const handleRestart = () => {
    setAnswers({});
    setResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return <div className="text-center mt-20 text-slate-500">Chargement du sujet type bac...</div>;
  }

  if (profile?.examGoal !== "terminale") {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-4">
          <Link href="/app/bac" className="p-2 -ml-2 rounded-full hover:bg-slate-200 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <h1 className="text-xl font-bold text-slate-800">Sujet type bac</h1>
        </div>
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-slate-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Pensé pour Terminale</h2>
          <p className="text-slate-600 mb-8">
            Le sujet type bac avec note virtuelle est pensé pour les élèves de Terminale. Tu peux continuer à t&apos;entraîner avec ton programme actuel.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/app/chapitres"
              className="py-3 px-6 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors"
            >
              Voir les chapitres
            </Link>
            <Link
              href="/app/bac"
              className="py-3 px-6 rounded-xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
            >
              Retour au mode bac
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-4">
        <Link href="/app/bac" className="p-2 -ml-2 rounded-full hover:bg-slate-200 transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Sujet type bac — note virtuelle</h1>
          <p className="text-sm text-slate-600 mt-1">
            Entraîne-toi sur plusieurs exercices guidés et obtiens une estimation sur 20.
          </p>
        </div>
      </div>

      <div className="p-5 space-y-6">
        <section className="rounded-xl border border-indigo-100 bg-indigo-50 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">Entraînement type bac</p>
              <h2 className="mt-2 text-lg font-bold text-indigo-950">{subject.title}</h2>
              <p className="mt-2 text-sm text-indigo-800">{subject.description}</p>
            </div>
            <div className="shrink-0 rounded-lg bg-white px-3 py-2 text-center text-indigo-900 shadow-sm">
              <Clock className="mx-auto h-4 w-4 text-indigo-600" />
              <p className="mt-1 text-xs font-bold">~{subject.estimatedMinutes} min</p>
            </div>
          </div>
          {!result && (
            <p className="mt-4 text-xs font-semibold text-indigo-700">
              {answeredSteps} / {totalSteps} étapes répondues
            </p>
          )}
        </section>

        {exercises.map((exercise, exerciseIndex) => (
          <section key={exercise.id} className="rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="border-b border-slate-100 bg-slate-50 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                    Exercice {exerciseIndex + 1} : {exercise.topicLabel} — /5
                  </p>
                  <h2 className="mt-2 font-bold text-slate-900">{exercise.title}</h2>
                  <p className="mt-1 text-sm text-slate-600">{exercise.subtitle}</p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600 border border-slate-200">
                  {exercise.topicLabel}
                </span>
              </div>
              <p className="mt-4 text-sm text-slate-700">{exercise.intro}</p>
            </div>

            <div className="p-4 space-y-5">
              {exercise.steps.map((step, stepIndex) => {
                const key = answerKey(exercise.id, step.id);
                const selectedOption = answers[key];
                const isCorrect = result && selectedOption === step.correctOptionIndex;
                const isWrong =
                  result && selectedOption !== undefined && selectedOption !== step.correctOptionIndex;

                return (
                  <div key={step.id} className="space-y-3">
                    <h3 className="text-sm font-bold text-slate-900">
                      Étape {stepIndex + 1}. {step.question}
                    </h3>
                    <div className="space-y-2">
                      {step.options.map((option, optionIndex) => {
                        const isSelected = selectedOption === optionIndex;
                        const isExpected = result && optionIndex === step.correctOptionIndex;
                        const stateClass = result
                          ? isExpected
                            ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                            : isSelected
                              ? "border-red-500 bg-red-50 text-red-800"
                              : "border-slate-200 bg-slate-50 text-slate-500"
                          : isSelected
                            ? "border-indigo-600 bg-indigo-50 text-indigo-800"
                            : "border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-slate-50";

                        return (
                          <button
                            key={option}
                            type="button"
                            disabled={Boolean(result)}
                            onClick={() => handleAnswer(exercise.id, step.id, optionIndex)}
                            className={`w-full rounded-xl border-2 p-3 text-left text-sm font-medium transition-colors flex items-center justify-between gap-3 ${stateClass}`}
                          >
                            <span>{option}</span>
                            {isExpected && <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />}
                            {isSelected && !isExpected && result && (
                              <XCircle className="h-5 w-5 shrink-0 text-red-600" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {result && (
                      <div
                        className={`rounded-xl border p-3 text-sm ${
                          isCorrect
                            ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                            : isWrong
                              ? "border-red-200 bg-red-50 text-red-800"
                              : "border-slate-200 bg-slate-50 text-slate-600"
                        }`}
                      >
                        {step.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {!result ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isComplete}
            className={`w-full rounded-xl py-4 text-base font-bold transition-colors ${
              isComplete
                ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            Corriger le sujet et calculer la note /20
          </button>
        ) : (
          <section className="rounded-xl border border-indigo-100 bg-indigo-50 p-5">
            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">Note virtuelle</p>
              <div className="mt-2 flex items-end justify-center gap-2">
                <span className="text-5xl font-black text-indigo-700">{formatScore(result.score20)}</span>
                <span className="mb-1 text-2xl font-bold text-indigo-300">/20</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-indigo-800">{result.percentage}% de réussite</p>
            </div>

            <div className="mt-6 grid gap-3">
              {result.exercises.map((exercise) => (
                <div key={exercise.exerciseId} className="rounded-xl bg-white p-4 border border-indigo-100">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-bold text-slate-900">{exercise.topicLabel}</p>
                      <p className="text-xs text-slate-500">
                        {exercise.scoreSteps} / {exercise.totalSteps} étapes justes
                      </p>
                    </div>
                    <p className="font-black text-indigo-700">{formatScore(exercise.score)} /5</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4">
              <div className="rounded-xl bg-white p-4 border border-indigo-100">
                <h3 className="font-bold text-slate-900">Points forts</h3>
                <p className="mt-2 text-sm text-slate-700">
                  {result.strongTopics.length > 0
                    ? result.strongTopics.join(", ")
                    : "Aucun chapitre ne ressort encore comme très solide sur ce sujet."}
                </p>
              </div>
              <div className="rounded-xl bg-white p-4 border border-indigo-100">
                <h3 className="font-bold text-slate-900">Chapitres à retravailler</h3>
                <p className="mt-2 text-sm text-slate-700">
                  {result.weakTopics.length > 0
                    ? result.weakTopics.join(", ")
                    : "Le sujet est équilibré. Garde surtout la régularité sur les méthodes."}
                </p>
              </div>
              <p className="text-xs text-indigo-700">
                Cette note est une estimation indicative pour cibler les révisions. Elle ne remplace pas une vraie correction de professeur.
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={handleRestart}
                className="w-full py-4 rounded-xl flex justify-center items-center gap-2 border-2 border-indigo-200 bg-white text-indigo-700 font-bold hover:bg-indigo-50 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                Refaire un sujet
              </button>
              <Link
                href="/app/methodes"
                className="w-full py-4 rounded-xl flex justify-center items-center gap-2 border-2 border-indigo-600 bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                Voir les méthodes
              </Link>
              <Link
                href="/app/bac"
                className="w-full py-4 rounded-xl flex justify-center items-center gap-2 text-slate-500 font-medium hover:text-slate-800 transition-colors"
              >
                Retour au mode bac
              </Link>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
