"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, XCircle, ChevronRight, RefreshCw, BookOpen, Target } from "lucide-react";
import { guidedExercises, GuidedExercise } from "@/data/guidedExercises";

export default function GuidedExercisePage({ params }: { params: Promise<{ exerciseId: string }> }) {
  const router = useRouter();
  const { exerciseId } = use(params);
  const [exercise, setExercise] = useState<GuidedExercise | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedProfile = localStorage.getItem("matheria_student_profile");
    if (!storedProfile) {
      router.push("/merci");
      return;
    }
    const found = guidedExercises.find((ex) => ex.id === exerciseId);
    if (!found) {
      router.push("/app/bac");
      return;
    }
    setExercise(found);
    setLoading(false);
  }, [exerciseId, router]);

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleValidate = () => {
    if (selectedOption === null || isAnswered || !exercise) return;
    setIsAnswered(true);
    if (selectedOption === exercise.steps[currentStepIndex].correctOptionIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (!exercise) return;
    if (currentStepIndex < exercise.steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      finishExercise();
    }
  };

  const finishExercise = () => {
    setIsFinished(true);
    if (!exercise) return;
    
    // Save locally
    try {
      const historyStr = localStorage.getItem("matheria_guided_exercise_history");
      const history = historyStr ? JSON.parse(historyStr) : [];
      const newEntry = {
        date: new Date().toISOString(),
        exerciseId: exercise.id,
        topic: exercise.topic,
        score: score + (selectedOption === exercise.steps[currentStepIndex].correctOptionIndex ? 1 : 0),
        totalSteps: exercise.steps.length
      };
      const updated = [newEntry, ...history].slice(0, 20); // Keep last 20
      localStorage.setItem("matheria_guided_exercise_history", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save guided exercise history", e);
    }
  };

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  if (loading) return <div className="text-center mt-20 text-slate-500">Chargement de l'exercice...</div>;
  if (!exercise) return null;

  if (isFinished) {
    const finalScore = score;
    const total = exercise.steps.length;
    const percentage = Math.round((finalScore / total) * 100);
    
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 text-center border-b border-slate-100 bg-slate-50">
          <div className="w-16 h-16 bg-white shadow-sm border border-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Exercice terminé !</h2>
          <p className="text-slate-600 mb-6">{exercise.title}</p>
          <div className="flex justify-center items-end gap-2">
            <span className="text-5xl font-black text-indigo-600">{finalScore}</span>
            <span className="text-2xl font-bold text-slate-400 mb-1">/ {total}</span>
          </div>
          <p className="text-sm font-medium text-slate-500 mt-2">Soit {percentage}% de réussite</p>
        </div>

        <div className="p-6">
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 mb-8">
            <h3 className="font-bold text-indigo-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              Méthode à retenir
            </h3>
            <ul className="space-y-3">
              {exercise.finalMethod.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-indigo-800 text-sm">
                  <span className="w-5 h-5 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleRestart}
              className="w-full py-4 rounded-xl flex justify-center items-center gap-2 border-2 border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              Refaire l'exercice
            </button>
            <Link
              href="/app/methodes"
              className="w-full py-4 rounded-xl flex justify-center items-center gap-2 border-2 border-indigo-600 bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              Voir mes fiches méthodes
            </Link>
            <Link
              href="/app/bac"
              className="w-full py-4 rounded-xl flex justify-center items-center gap-2 text-slate-500 font-medium hover:text-slate-800 transition-colors"
            >
              Retour au mode bac
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const step = exercise.steps[currentStepIndex];
  const isCorrect = isAnswered && selectedOption === step.correctOptionIndex;
  const isWrong = isAnswered && selectedOption !== step.correctOptionIndex;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-[80vh]">
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-4 shrink-0">
        <Link href="/app/bac" className="p-2 -ml-2 rounded-full hover:bg-slate-200 transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Étape {currentStepIndex + 1} / {exercise.steps.length}
            </span>
            <span className="text-xs font-bold text-indigo-600">{exercise.topicLabel}</span>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className="bg-indigo-600 h-full transition-all duration-300"
              style={{ width: `${((currentStepIndex) / exercise.steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        {currentStepIndex === 0 && exercise.intro && (
          <div className="bg-slate-100 rounded-xl p-4 mb-6 border border-slate-200">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Énoncé</span>
            <p className="text-slate-800 font-medium">{exercise.intro}</p>
          </div>
        )}

        <h2 className="text-lg font-bold text-slate-900 mb-6">{step.question}</h2>

        <div className="space-y-3 flex-1">
          {step.options.map((opt, idx) => {
            let btnClass = "border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700";
            let icon = null;

            if (isAnswered) {
              if (idx === step.correctOptionIndex) {
                btnClass = "border-emerald-500 bg-emerald-50 text-emerald-800";
                icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
              } else if (idx === selectedOption) {
                btnClass = "border-red-500 bg-red-50 text-red-800";
                icon = <XCircle className="w-5 h-5 text-red-600 shrink-0" />;
              } else {
                btnClass = "border-slate-200 bg-slate-50 text-slate-400 opacity-60";
              }
            } else if (selectedOption === idx) {
              btnClass = "border-indigo-600 bg-indigo-50 text-indigo-800 ring-1 ring-indigo-600";
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(idx)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between gap-3 ${btnClass}`}
              >
                <span className="font-medium">{opt}</span>
                {icon}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className={`mt-6 p-4 rounded-xl border flex gap-3 ${
            isCorrect ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"
          }`}>
            <div className="shrink-0 mt-0.5">
              {isCorrect ? 
                <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : 
                <XCircle className="w-5 h-5 text-red-600" />
              }
            </div>
            <div>
              <p className={`font-bold text-sm mb-1 ${isCorrect ? "text-emerald-800" : "text-red-800"}`}>
                {isCorrect ? "Excellente réponse !" : "Aïe, ce n'est pas ça."}
              </p>
              <p className={`text-sm ${isCorrect ? "text-emerald-700" : "text-red-700"}`}>
                {step.explanation}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-100 bg-white shrink-0">
        {!isAnswered ? (
          <button
            onClick={handleValidate}
            disabled={selectedOption === null}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              selectedOption !== null
                ? "bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 hover:shadow"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            Valider
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full py-4 rounded-xl font-bold text-lg bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
          >
            {currentStepIndex < exercise.steps.length - 1 ? "Étape suivante" : "Terminer l'exercice"}
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
