"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { questions, Question } from "@/data/questions";
import { savePracticeSession } from "@/actions/beta";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";

export default function SessionPage() {
  const router = useRouter();
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

    // Filter and shuffle questions
    const filtered = questions.filter(q => q.examGoal === parsedProfile.examGoal);
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    setSessionQuestions(shuffled.slice(0, 5)); // Take 5 questions
  }, [router]);

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
      const finalScore = score;
      
      // Save to localStorage
      localStorage.setItem("matheria_last_session_result", JSON.stringify({
        score: finalScore,
        total: sessionQuestions.length
      }));

      // Save to Supabase via Server Action
      await savePracticeSession({
        betaAccessId: profile.betaAccessId,
        parentEmail: profile.parentEmail,
        studentPseudo: profile.studentPseudo,
        examGoal: profile.examGoal,
        score: finalScore,
        totalQuestions: sessionQuestions.length,
        topics: sessionQuestions.map(q => q.topic)
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
              className={`h-2 w-8 rounded-full ${
                idx < currentIndex ? 'bg-indigo-600' : idx === currentIndex ? 'bg-indigo-300' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-8">
          <span className="inline-block px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-semibold mb-3 tracking-wide uppercase">
            {currentQuestion.topic}
          </span>
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
                btnClass += "border-green-500 bg-green-50 text-green-800";
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
                  {showExplanation && idx === currentQuestion.correctOptionIndex && <CheckCircle2 className="text-green-500" size={20} />}
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
                ? "bg-green-50 border border-green-100" 
                : "bg-red-50 border border-red-100"
            }`}>
              <p className="font-semibold mb-1 flex items-center gap-2">
                {selectedOption === currentQuestion.correctOptionIndex ? (
                  <><CheckCircle2 size={18} className="text-green-600"/> Correct !</>
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
