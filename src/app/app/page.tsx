"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Play, BookOpen, LineChart, Target, CalendarCheck, Lightbulb } from "lucide-react";
import { getAvailableTopics, ExamGoal } from "@/data/questions";
import { parseStoredJson, useStorageItemValue } from "@/lib/useStorageItemValue";

type StudentProfile = {
  studentPseudo: string;
  examGoal: ExamGoal;
  currentLevel: string;
};

type SessionHistory = {
  examGoal: ExamGoal;
  score: number;
  totalQuestions: number;
  topics: string[];
};

function getWeakestTopic(examGoal: ExamGoal, history: SessionHistory[]): string | null {
  const available = getAvailableTopics(examGoal);
  let weakest: { label: string; avg: number } | null = null;
  available.forEach(t => {
    const tSessions = history.filter((h) => h.examGoal === examGoal && h.topics.length === 1 && h.topics[0] === t.topic);
    if (tSessions.length > 0) {
      const sum = tSessions.reduce((a, c) => a + c.score, 0);
      const tot = tSessions.reduce((a, c) => a + c.totalQuestions, 0);
      const avg = Math.round((sum / tot) * 100);
      if (avg < 60 && (!weakest || avg < weakest.avg)) {
        weakest = { label: t.label, avg };
      }
    }
  });
  return weakest ? (weakest as { label: string; avg: number }).label : null;
}

export default function AppDashboardPage() {
  const router = useRouter();
  const storedProfile = useStorageItemValue("studentProfile");
  const storedHistory = useStorageItemValue("sessionHistory");
  const profile = useMemo(
    () => parseStoredJson<StudentProfile>(storedProfile),
    [storedProfile],
  );
  const history = useMemo(
    () => {
      const parsed = parseStoredJson<SessionHistory[]>(storedHistory);
      return Array.isArray(parsed) ? parsed : [];
    },
    [storedHistory],
  );

  useEffect(() => {
    if (storedProfile !== undefined && !profile) {
      router.push("/merci");
    }
  }, [profile, router, storedProfile]);

  const { nextStepMessage, stats, topicsCount } = useMemo(() => {
    if (!profile) {
      return {
        nextStepMessage: "",
        stats: { sessions: 0, avgScore: 0, lastScore: null as number | null },
        topicsCount: 0,
      };
    }

    const available = getAvailableTopics(profile.examGoal);
    const relevantHistory = history.filter((h) => h.examGoal === profile.examGoal);
    const computedStats = { sessions: 0, avgScore: 0, lastScore: null as number | null };

    if (relevantHistory.length > 0) {
      const sumScores = relevantHistory.reduce((acc, curr) => acc + curr.score, 0);
      const sumTotal = relevantHistory.reduce((acc, curr) => acc + curr.totalQuestions, 0);
      computedStats.sessions = relevantHistory.length;
      computedStats.avgScore = Math.round((sumScores / sumTotal) * 100);
      computedStats.lastScore = relevantHistory[relevantHistory.length - 1].score;
    }

    const weakLabel = getWeakestTopic(profile.examGoal, history);
    const message =
      !storedHistory || storedHistory === "[]"
        ? "Fais une session rapide pour commencer"
        : weakLabel
          ? `Travaille ${weakLabel}`
          : "Continue ton plan de révision";

    return {
      nextStepMessage: message,
      stats: computedStats,
      topicsCount: available.length,
    };
  }, [history, profile, storedHistory]);

  if (!profile) {
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

        {profile?.examGoal === "terminale" && (
          <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-5 mb-2 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <Target size={80} />
            </div>
            <h3 className="font-bold text-indigo-900 text-lg mb-1 relative z-10 flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-600" />
              Mode Bac Terminale
            </h3>
            <p className="text-sm text-indigo-800 mb-4 relative z-10">
              Travaille des exercices guidés étape par étape, proches de l&apos;esprit du bac.
            </p>
            <div className="flex gap-3 relative z-10">
              <Link href="/app/bac" className="flex-1 py-2.5 px-3 bg-indigo-600 text-white text-sm font-bold rounded-lg text-center shadow-sm hover:bg-indigo-700 transition-colors">
                Lancer le mode bac
              </Link>
              <Link href="/app/methodes" className="flex-1 py-2.5 px-3 bg-white text-indigo-700 text-sm font-bold rounded-lg text-center border border-indigo-200 hover:bg-indigo-50 transition-colors">
                Voir les méthodes
              </Link>
            </div>
          </div>
        )}

        <div className="mb-2 mt-4">
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
