"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, ArrowLeft, Target, PlayCircle } from "lucide-react";
import { getAvailableTopics } from "@/data/questions";

export default function ChapitresPage() {
  const router = useRouter();
  const [topics, setTopics] = useState<{ topic: string; label: string; count: number; avgScore: number | null }[]>([]);
  const [loading, setLoading] = useState(true);
  const [goalLabel, setGoalLabel] = useState("");

  useEffect(() => {
    const storedProfile = localStorage.getItem("matheria_student_profile");
    if (!storedProfile) {
      router.push("/merci");
      return;
    }
    const profile = JSON.parse(storedProfile);
    
    setGoalLabel(
      profile.examGoal === "brevet" ? "Brevet" : 
      profile.examGoal === "terminale" ? "Terminale" : 
      "Bac Première"
    );

    const available = getAvailableTopics(profile.examGoal);
    
    // Enrich with history if available
    const historyStr = localStorage.getItem("matheria_session_history");
    let history: any[] = [];
    if (historyStr) {
      try {
        history = JSON.parse(historyStr);
      } catch (e) {}
    }

    const enriched = available.map(t => {
      // Find sessions for this exact topic
      // Note: in quick sessions, topics is an array of all topics seen. 
      // In chapter sessions, it's an array with one element.
      // We estimate score by finding sessions where this topic was the MAIN topic (or only topic)
      const topicSessions = history.filter(h => 
        h.examGoal === profile.examGoal && 
        h.topics.length === 1 && 
        h.topics[0] === t.topic
      );

      let avgScore: number | null = null;
      if (topicSessions.length > 0) {
        const sumScores = topicSessions.reduce((acc, curr) => acc + curr.score, 0);
        const sumTotal = topicSessions.reduce((acc, curr) => acc + curr.totalQuestions, 0);
        avgScore = Math.round((sumScores / sumTotal) * 100);
      }

      return {
        ...t,
        avgScore
      };
    });

    setTopics(enriched);
    setLoading(false);
  }, [router]);

  if (loading) {
    return <div className="text-center mt-20 text-slate-500">Chargement des chapitres...</div>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-4">
        <Link href="/app" className="p-2 -ml-2 rounded-full hover:bg-slate-200 transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <h1 className="text-xl font-bold text-slate-800">Programme {goalLabel}</h1>
      </div>

      <div className="p-4 space-y-3">
        <p className="text-sm text-slate-500 mb-4 px-1">
          Choisis un chapitre pour lancer une session ciblée de 5 questions.
        </p>

        {topics.map((t) => (
          <div key={t.topic} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex-1">
              <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-500" />
                {t.label}
              </h2>
              <div className="flex items-center gap-3 mt-1.5 text-xs font-medium text-slate-500">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                  {t.count} questions
                </span>
                {t.avgScore !== null && (
                  <span className={`flex items-center gap-1 ${
                    t.avgScore >= 80 ? 'text-emerald-600' : 
                    t.avgScore >= 50 ? 'text-amber-600' : 'text-red-600'
                  }`}>
                    <Target className="w-3 h-3" />
                    Moyenne : {t.avgScore}%
                  </span>
                )}
              </div>
            </div>
            
            <Link 
              href={`/app/session?topic=${t.topic}`}
              className="ml-4 p-3 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors shrink-0"
              title="Réviser ce chapitre"
            >
              <PlayCircle className="w-6 h-6" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
