"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Play, BookOpen, LineChart, Target, CalendarCheck, Lightbulb } from "lucide-react";
import { getAvailableTopics, ExamGoal } from "@/data/questions";

function getWeakestTopic(examGoal: ExamGoal): string | null {
  if (typeof window === "undefined") return null;
  const historyStr = localStorage.getItem("matheria_session_history");
  if (!historyStr) return null;
  try {
    const history = JSON.parse(historyStr);
    const available = getAvailableTopics(examGoal);
    let weakest: { label: string; avg: number } | null = null;
    available.forEach(t => {
      const tSessions = history.filter((h: any) => h.examGoal === examGoal && h.topics.length === 1 && h.topics[0] === t.topic);
      if (tSessions.length > 0) {
        const sum = tSessions.reduce((a: number, c: any) => a + c.score, 0);
        const tot = tSessions.reduce((a: number, c: any) => a + c.totalQuestions, 0);
        const avg = Math.round((sum / tot) * 100);
        if (avg < 60 && (!weakest || avg < weakest.avg)) {
          weakest = { label: t.label, avg };
        }
      }
    });
    return weakest ? (weakest as { label: string; avg: number }).label : null;
  } catch { return null; }
}

export default function AppDashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState({ sessions: 0, avgScore: 0, lastScore: null as number | null });
  const [topicsCount, setTopicsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [nextStepMessage, setNextStepMessage] = useState("");

  useEffect(() => {
    const storedProfile = localStorage.getItem("matheria_student_profile");
    if (!storedProfile) {
      router.push("/merci");
      return;
    }
    const parsedProfile = JSON.parse(storedProfile);
    setProfile(parsedProfile);

    // Calc topics
    const available = getAvailableTopics(parsedProfile.examGoal);
    setTopicsCount(available.length);

    // Calc stats from history
    const historyStr = localStorage.getItem("matheria_session_history");
    if (historyStr) {
      try {
        const history = JSON.parse(historyStr);
        if (Array.isArray(history) && history.length > 0) {
          // Filter history for current goal just in case they switched
          const relevantHistory = history.filter(h => h.examGoal === parsedProfile.examGoal);
          if (relevantHistory.length > 0) {
            const sumScores = relevantHistory.reduce((acc, curr) => acc + curr.score, 0);
            const sumTotal = relevantHistory.reduce((acc, curr) => acc + curr.totalQuestions, 0);
            const avg = Math.round((sumScores / sumTotal) * 100);
            const last = relevantHistory[relevantHistory.length - 1].score;
            setStats({
              sessions: relevantHistory.length,
              avgScore: avg,
              lastScore: last
            });
          }
        }
      } catch (e) {
        console.error("Error parsing history", e);
      }
    }

    // Next step
    const weakLabel = getWeakestTopic(parsedProfile.examGoal);
    if (!historyStr || historyStr === "[]") {
      setNextStepMessage("Fais une session rapide pour commencer");
    } else if (weakLabel) {
      setNextStepMessage(`Travaille ${weakLabel}`);
    } else {
      setNextStepMessage("Continue ton plan de révision");
    }

    setLoading(false);
  }, [router]);

  if (loading) {
    return <div className="text-center mt-20 text-slate-500">Chargement de l&apos;espace élève...</div>;
  }

  const examGoalLabel = 
    profile?.examGoal === "brevet" ? "Brevet des collèges" : 
    profile?.examGoal === "terminale" ? "Bac Terminale" : 
    "Bac de maths Première";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white relative overflow-hidden">
        {/* Decor */}
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Target size={120} />
        </div>
        
        <h1 className="text-2xl font-bold relative z-10">Salut {profile?.studentPseudo} 👋</h1>
        <p className="mt-2 text-indigo-100 opacity-90 relative z-10 flex flex-col sm:flex-row sm:gap-4 gap-1">
          <span>Objectif : {examGoalLabel}</span>
          <span className="hidden sm:inline">•</span>
          <span>Niveau : {profile?.currentLevel === 'very_hard' ? 'Très en difficulté' : profile?.currentLevel === 'medium' ? 'Moyen' : profile?.currentLevel === 'good' ? 'Plutôt à l\'aise' : 'Très à l\'aise'}</span>
        </p>

        {stats.sessions > 0 && (
          <div className="mt-6 flex gap-4 relative z-10">
            <div className="bg-white/20 rounded-lg p-3 flex-1 backdrop-blur-sm">
              <div className="text-sm text-indigo-100 mb-1">Sessions</div>
              <div className="text-2xl font-bold">{stats.sessions}</div>
            </div>
            <div className="bg-white/20 rounded-lg p-3 flex-1 backdrop-blur-sm">
              <div className="text-sm text-indigo-100 mb-1">Précision</div>
              <div className="text-2xl font-bold">{stats.avgScore}%</div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 space-y-4">
        
        {/* Next Step Card */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 text-sm">Prochaine étape recommandée</h3>
            <p className="text-sm text-amber-800 mt-0.5">{nextStepMessage}</p>
          </div>
        </div>

        <div className="mb-2">
          <p className="text-slate-600 text-sm font-medium">Programme : {topicsCount} chapitres disponibles</p>
        </div>

        <Link 
          href="/app/session"
          className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-xl shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
        >
          <Play size={20} className="fill-current" />
          Session rapide aléatoire
        </Link>

        <Link 
          href="/app/programme"
          className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-xl border-2 border-slate-200 text-lg font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors"
        >
          <BookOpen size={20} />
          Voir mon programme
        </Link>

        <Link 
          href="/app/plan"
          className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-xl shadow-sm text-lg font-medium text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 transition-colors"
        >
          <CalendarCheck size={20} />
          Voir mon plan de révision
        </Link>

        <Link 
          href="/app/chapitres"
          className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-xl border-2 border-slate-200 text-lg font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors"
        >
          <BookOpen size={20} />
          Choisir un chapitre
        </Link>

        <Link 
          href="/app/progression"
          className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-xl border-2 border-slate-200 text-lg font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors"
        >
          <LineChart size={20} />
          Voir ma progression
        </Link>
      </div>
    </div>
  );
}
