"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getQuestionsByExamGoal, getQuestionsByTopic, pickRandomQuestions, Question } from "@/data/questions";
import { savePracticeSession } from "@/actions/beta";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";

function SessionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedTopic = searchParams.get("topic");

  const [profile, setProfile] = useState<any>(null);
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const storedProfile = localStorage.getItem("matheria_student_profile");
    if (!storedProfile) {
      router.push("/merci");
      return;
    }
    const parsedProfile = JSON.parse(storedProfile);
    setProfile(parsedProfile);

    // Filter questions based on mode (topic or global)
    let sourceQuestions: Question[] = [];
    if (requestedTopic) {
      sourceQuestions = getQuestionsByTopic(parsedProfile.examGoal, requestedTopic);
    } else {
      sourceQuestions = getQuestionsByExamGoal(parsedProfile.examGoal);
    }

    const selected = pickRandomQuestions(sourceQuestions, 5);
    setSessionQuestions(selected);
  }, [router, requestedTopic]);

  if (!profile || sessionQuestions.length === 0) {
    return <div className="text-center mt-20 text-slate-500">Préparation de ta session...</div>;
  }

  const currentQuestion = sessionQuestions[currentIndex];
  const isLastQuestion = currentIndex === sessionQuestions.length - 1;

  const handleOptionSelect = (index: number) => {
    if (showExplanation) return; // Prevent double clicking
    setSelectedOption(index);
    setShowExplanation(true);

    if (index === currentQuestion.correctOptionIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNext = async () => {
    if (isLastQuestion) {
      setIsSaving(true);
      const finalScore = score; // The user bug fix: score state is already updated!
      
      const topicsSeen = Array.from(new Set(sessionQuestions.map(q => q.topic)));
      const sessionResult = {
        date: new Date().toISOString(),
        examGoal: profile.examGoal,
        score: finalScore,
        totalQuestions: sessionQuestions.length,
        topics: topicsSeen
      };

      // 1. Update matheria_last_session_result (for the result page)
      localStorage.setItem("matheria_last_session_result", JSON.stringify(sessionResult));

      // 2. Update matheria_session_history (for progression)
      try {
        const historyStr = localStorage.getItem("matheria_session_history");
        let history = historyStr ? JSON.parse(historyStr) : [];
        history.push(sessionResult);
        // Keep only the last 20 sessions to avoid bloating localStorage
        if (history.length > 20) {
          history = history.slice(history.length - 20);
        }
        localStorage.setItem("matheria_session_history", JSON.stringify(history));
      } catch(e) {
        console.error("Error saving history to local storage", e);
      }

      // 3. Save to Supabase via Server Action
      await savePracticeSession({
        betaAccessId: profile.betaAccessId,
        parentEmail: profile.parentEmail,
        studentPseudo: profile.studentPseudo,
        examGoal: profile.examGoal,
        score: finalScore,
        totalQuestions: sessionQuestions.length,
        topics: topicsSeen
      });

      router.push("/app/session/result");
    } else {
      setSelectedOption(null);
      setShowExplanation(false);
      setCurrentIndex(i => i + 1);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-[70vh]">
      {/* Header progress */}
      <div className="bg-slate-50 p-4 border-b border-slate-200 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">Question {currentIndex + 1} / {sessionQuestions.length}</span>
        <div className="flex gap-1">
          {sessionQuestions.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-2 w-8 rounded-full transition-colors ${
                idx < currentIndex ? 'bg-indigo-600' : idx === currentIndex ? 'bg-indigo-300' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-block px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-semibold tracking-wide uppercase">
              {currentQuestion.topicLabel}
            </span>
            <span className="text-sm font-bold text-slate-400">Score: {score}</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 leading-snug">
            {currentQuestion.question}
          </h2>
        </div>

        <div className="space-y-3 flex-1">
          {currentQuestion.options.map((option, idx) => {
            let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all ";
            
            if (!showExplanation) {
              btnClass += "border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700 active:bg-slate-100";
            } else {
              if (idx === currentQuestion.correctOptionIndex) {
                btnClass += "border-emerald-500 bg-emerald-50 text-emerald-800";
              } else if (idx === selectedOption) {
                btnClass += "border-red-500 bg-red-50 text-red-800";
              } else {
                btnClass += "border-slate-200 bg-white text-slate-400 opacity-50";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                disabled={showExplanation}
                className={btnClass}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-lg">{option}</span>
                  {showExplanation && idx === currentQuestion.correctOptionIndex && <CheckCircle2 className="text-emerald-500" size={20} />}
                  {showExplanation && idx === selectedOption && idx !== currentQuestion.correctOptionIndex && <XCircle className="text-red-500" size={20} />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation Area */}
        {showExplanation && (
          <div className="mt-6 animate-in slide-in-from-bottom-4 fade-in duration-300">
            <div className={`p-4 rounded-xl ${
              selectedOption === currentQuestion.correctOptionIndex 
                ? "bg-emerald-50 border border-emerald-100" 
                : "bg-red-50 border border-red-100"
            }`}>
              <p className="font-semibold mb-1 flex items-center gap-2">
                {selectedOption === currentQuestion.correctOptionIndex ? (
                  <><CheckCircle2 size={18} className="text-emerald-600"/> Correct !</>
                ) : (
                  <><XCircle size={18} className="text-red-600"/> Pas tout à fait...</>
                )}
              </p>
              <p className="text-slate-700 text-sm leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Action */}
      <div className="p-4 bg-slate-50 border-t border-slate-200">
        <button
          onClick={handleNext}
          disabled={!showExplanation || isSaving}
          className="w-full flex items-center justify-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSaving ? "Sauvegarde..." : isLastQuestion ? "Voir mon résultat" : "Question suivante"}
          {!isSaving && <ArrowRight size={20} />}
        </button>
      </div>
    </div>
  );
}

export default function SessionPage() {
  return (
    <Suspense fallback={<div className="text-center mt-20 text-slate-500">Chargement...</div>}>
      <SessionContent />
    </Suspense>
  );
}
