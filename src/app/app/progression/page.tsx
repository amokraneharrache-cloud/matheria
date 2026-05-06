"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Target, Trophy, Flame, PlayCircle, Award } from "lucide-react";
import { getAvailableTopics } from "@/data/questions";

type SessionHistory = {
  date: string;
  examGoal: string;
  score: number;
  totalQuestions: number;
  topics: string[];
};

type BacMockExamHistory = {
  date: string;
  score20: number;
  exercises: {
    exerciseId: string;
    topic: string;
    score: number;
    total: number;
  }[];
};

type BacMockExamStats = {
  count: number;
  lastScore: number;
  bestScore: number;
  averageScore: number;
};

export default function ProgressionPage() {
  const router = useRouter();
  const [history, setHistory] = useState<SessionHistory[]>([]);
  const [stats, setStats] = useState({ totalSessions: 0, avgScore: 0, bestScore: 0 });
  const [topicStats, setTopicStats] = useState<{label: string, sessions: number, avg: number}[]>([]);
  const [bacMockStats, setBacMockStats] = useState<BacMockExamStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem("matheria_student_profile");
    if (!storedProfile) {
      router.push("/merci");
      return;
    }
    const parsedProfile = JSON.parse(storedProfile);
    setProfile(parsedProfile);

    const historyStr = localStorage.getItem("matheria_session_history");
    if (historyStr) {
      try {
        const fullHistory: SessionHistory[] = JSON.parse(historyStr);
        // Filter for current goal
        const relevantHistory = fullHistory.filter(h => h.examGoal === parsedProfile.examGoal);
        setHistory(relevantHistory);

        if (relevantHistory.length > 0) {
          const sumScores = relevantHistory.reduce((acc, curr) => acc + curr.score, 0);
          const sumTotal = relevantHistory.reduce((acc, curr) => acc + curr.totalQuestions, 0);
          const avg = Math.round((sumScores / sumTotal) * 100);
          
          let best = 0;
          relevantHistory.forEach(h => {
            const pct = (h.score / h.totalQuestions) * 100;
            if (pct > best) best = pct;
          });

          setStats({
            totalSessions: relevantHistory.length,
            avgScore: avg,
            bestScore: Math.round(best)
          });

          // Topic stats
          const available = getAvailableTopics(parsedProfile.examGoal);
          const tStats: {label: string, sessions: number, avg: number}[] = [];
          
          available.forEach(t => {
            // Find sessions focused on this topic
            const tSessions = relevantHistory.filter(h => h.topics.length === 1 && h.topics[0] === t.topic);
            if (tSessions.length > 0) {
              const tSum = tSessions.reduce((a, c) => a + c.score, 0);
              const tTot = tSessions.reduce((a, c) => a + c.totalQuestions, 0);
              tStats.push({
                label: t.label,
                sessions: tSessions.length,
                avg: Math.round((tSum / tTot) * 100)
              });
            }
          });

          // Sort by lowest score to show weaknesses first
          tStats.sort((a, b) => a.avg - b.avg);
          setTopicStats(tStats);
        }
      } catch (e) {}
    }

    const bacMockHistoryStr = localStorage.getItem("matheria_bac_mock_exam_history");
    if (bacMockHistoryStr) {
      try {
        const parsed: BacMockExamHistory[] = JSON.parse(bacMockHistoryStr);
        const validHistory = Array.isArray(parsed)
          ? parsed
              .filter((entry) => Number.isFinite(entry.score20))
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          : [];

        if (validHistory.length > 0) {
          const scoreSum = validHistory.reduce((sum, entry) => sum + entry.score20, 0);
          setBacMockStats({
            count: validHistory.length,
            lastScore: validHistory[0].score20,
            bestScore: Math.max(...validHistory.map((entry) => entry.score20)),
            averageScore: Math.round((scoreSum / validHistory.length) * 10) / 10,
          });
        }
      } catch (e) {}
    }

    setLoading(false);
  }, [router]);

  if (loading) {
    return <div className="text-center mt-20 text-slate-500">Chargement de la progression...</div>;
  }

  // EMPTY STATE
  if (history.length === 0 && !bacMockStats) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden text-center p-8">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <LineChartIcon className="w-10 h-10 text-slate-400" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Aucune donnée</h1>
        <p className="text-slate-600 mb-8">
          Ta progression s'affichera ici dès que tu auras terminé ta première session de révision.
        </p>
        <Link 
          href="/app/session"
          className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-colors font-medium"
        >
          <PlayCircle size={20} />
          Démarrer ma 1ère session
        </Link>
        
        <div className="mt-4">
          <Link href="/app" className="text-slate-500 text-sm hover:underline">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-4">
        <Link href="/app" className="p-2 -ml-2 rounded-full hover:bg-slate-200 transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <h1 className="text-xl font-bold text-slate-800">Ma Progression</h1>
      </div>

      <div className="p-5 space-y-6">
        
        {history.length > 0 ? (
          <>
            {/* KPI Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100 text-center">
                <Flame className="w-6 h-6 text-orange-500 mx-auto mb-1" />
                <div className="text-3xl font-bold text-indigo-900">{stats.totalSessions}</div>
                <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mt-1">Sessions</div>
              </div>
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 text-center">
                <Target className="w-6 h-6 text-emerald-500 mx-auto mb-1" />
                <div className="text-3xl font-bold text-emerald-900">{stats.avgScore}%</div>
                <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mt-1">Moyenne</div>
              </div>
            </div>

            {/* Message */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-start gap-3">
              <Trophy className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-slate-800">Meilleur score : {stats.bestScore}%</h3>
                <p className="text-sm text-slate-600 mt-1">
                  {stats.avgScore < 50
                    ? "Continue à t'entraîner, tes scores vont monter !"
                    : stats.avgScore < 80
                    ? "Très bonne régularité, vise le 100% !"
                    : "Très bon niveau global sur tes sessions récentes."}
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-sm text-slate-600">
            Aucune session QCM enregistrée pour le moment.
          </div>
        )}

        {bacMockStats && (
          <section className="rounded-xl border border-indigo-100 bg-indigo-50 p-5">
            <h2 className="font-bold text-indigo-950 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600" />
              Notes virtuelles Bac Terminale
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white p-4 border border-indigo-100">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Dernière note</div>
                <div className="mt-1 text-2xl font-black text-indigo-700">{formatScore20(bacMockStats.lastScore)}</div>
              </div>
              <div className="rounded-xl bg-white p-4 border border-indigo-100">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Meilleure note</div>
                <div className="mt-1 text-2xl font-black text-indigo-700">{formatScore20(bacMockStats.bestScore)}</div>
              </div>
              <div className="rounded-xl bg-white p-4 border border-indigo-100">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Moyenne</div>
                <div className="mt-1 text-2xl font-black text-indigo-700">{formatScore20(bacMockStats.averageScore)}</div>
              </div>
              <div className="rounded-xl bg-white p-4 border border-indigo-100">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Sujets faits</div>
                <div className="mt-1 text-2xl font-black text-indigo-700">{bacMockStats.count}</div>
              </div>
            </div>
          </section>
        )}

        {/* Topic Breakdown */}
        {history.length > 0 && topicStats.length > 0 && (
          <div>
            <h2 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              Bilan par chapitre (ciblé)
            </h2>
            <div className="space-y-3">
              {topicStats.map((t, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-white">
                  <div className="flex-1 pr-4">
                    <div className="font-medium text-sm text-slate-800 truncate">{t.label}</div>
                    <div className="text-xs text-slate-500">{t.sessions} session{t.sessions > 1 ? 's' : ''}</div>
                  </div>
                  <div className={`font-bold ${t.avg >= 80 ? 'text-emerald-600' : t.avg >= 50 ? 'text-amber-500' : 'text-red-500'}`}>
                    {t.avg}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Plan CTA */}
        <Link
          href="/app/plan"
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-indigo-200 text-sm font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors"
        >
          <CalendarCheckIcon className="w-4 h-4" />
          Voir mon plan de révision
        </Link>

      </div>
    </div>
  );
}

function formatScore20(score: number) {
  const formatted = Number.isInteger(score) ? String(score) : score.toFixed(1).replace(".", ",");
  return `${formatted}/20`;
}

function CalendarCheckIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/>
    </svg>
  );
}

// Simple Icon fallback
function LineChartIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  )
}
