"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, AlertTriangle, CheckCircle2, PlayCircle, BookOpen, Sparkles, Target } from "lucide-react";
import { getPlan, PlanDuration, RevisionPlan, RevisionTask } from "@/data/revisionPlans";
import { getAvailableTopics, ExamGoal } from "@/data/questions";

type TopicScore = { topic: string; label: string; avg: number; status: "weak" | "ok" | "mastered" };

function computeTopicScores(examGoal: ExamGoal): TopicScore[] {
  const historyStr = typeof window !== "undefined" ? localStorage.getItem("matheria_session_history") : null;
  if (!historyStr) return [];
  try {
    const history = JSON.parse(historyStr);
    const available = getAvailableTopics(examGoal);
    const scores: TopicScore[] = [];
    available.forEach(t => {
      const tSessions = history.filter((h: any) => h.examGoal === examGoal && h.topics.length === 1 && h.topics[0] === t.topic);
      if (tSessions.length > 0) {
        const sum = tSessions.reduce((a: number, c: any) => a + c.score, 0);
        const tot = tSessions.reduce((a: number, c: any) => a + c.totalQuestions, 0);
        const avg = Math.round((sum / tot) * 100);
        scores.push({ topic: t.topic, label: t.label, avg, status: avg < 60 ? "weak" : avg > 80 ? "mastered" : "ok" });
      }
    });
    scores.sort((a, b) => a.avg - b.avg);
    return scores;
  } catch { return []; }
}

export default function PlanPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [duration, setDuration] = useState<PlanDuration>("7-days");
  const [plan, setPlan] = useState<RevisionPlan | null>(null);
  const [topicScores, setTopicScores] = useState<TopicScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedProfile = localStorage.getItem("matheria_student_profile");
    if (!storedProfile) { router.push("/merci"); return; }
    const p = JSON.parse(storedProfile);
    setProfile(p);
    setTopicScores(computeTopicScores(p.examGoal));
    setLoading(false);
  }, [router]);

  useEffect(() => {
    if (!profile) return;
    const p = getPlan(profile.examGoal, duration);
    setPlan(p || null);
  }, [profile, duration]);

  if (loading || !profile) return <div className="text-center mt-20 text-slate-500">Chargement du plan...</div>;

  const goalLabel = profile.examGoal === "brevet" ? "Brevet" : profile.examGoal === "terminale" ? "Bac Terminale" : "Bac Première";
  const weakTopics = topicScores.filter(t => t.status === "weak").slice(0, 3);
  const hasHistory = topicScores.length > 0;

  const totalMinutes = plan ? plan.tasks.reduce((a, t) => a + t.estimatedMinutes, 0) : 0;
  const totalDays = plan ? plan.tasks[plan.tasks.length - 1]?.day || 0 : 0;
  const avgMinPerDay = totalDays > 0 ? Math.round(totalMinutes / totalDays) : 0;

  // Group tasks by day
  const tasksByDay: Record<number, RevisionTask[]> = {};
  plan?.tasks.forEach(t => { if (!tasksByDay[t.day]) tasksByDay[t.day] = []; tasksByDay[t.day].push(t); });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-4">
        <Link href="/app" className="p-2 -ml-2 rounded-full hover:bg-slate-200 transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <h1 className="text-xl font-bold text-slate-800">Ton plan de révision</h1>
      </div>

      <div className="p-5 space-y-6">
        {/* Objectif */}
        <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
          <Calendar className="w-4 h-4 text-indigo-500" />
          Objectif : <span className="font-bold text-slate-800">{goalLabel}</span>
        </div>

        {/* Duration Selector */}
        <div className="flex gap-2">
          {(["7-days", "14-days"] as PlanDuration[]).map(d => (
            <button
              key={d}
              onClick={() => setDuration(d)}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-colors ${
                duration === d
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {d === "7-days" ? "7 jours" : "14 jours"}
            </button>
          ))}
        </div>

        {/* Summary */}
        {plan && (
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
            <h2 className="font-bold text-indigo-900 mb-1">{plan.title}</h2>
            <p className="text-sm text-indigo-700 mb-3">{plan.subtitle}</p>
            <div className="flex gap-4 text-xs font-semibold text-indigo-600">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{totalDays} jours</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />~{avgMinPerDay} min/jour</span>
            </div>
          </div>
        )}

        {/* CTAs Mode Bac */}
        {profile.examGoal === "terminale" && (
          <div className="flex gap-3">
            <Link href="/app/bac" className="flex-1 py-3 px-2 bg-indigo-600 text-white text-sm font-bold rounded-xl text-center shadow-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1.5">
              <Target className="w-4 h-4" />
              Sujets type bac
            </Link>
            <Link href="/app/methodes" className="flex-1 py-3 px-2 bg-white border-2 border-slate-200 text-slate-700 text-sm font-bold rounded-xl text-center hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              Fiches méthodes
            </Link>
          </div>
        )}

        {/* Priorities Section */}
        {hasHistory ? (
          weakTopics.length > 0 ? (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <h3 className="font-semibold text-amber-900 flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Priorités détectées
              </h3>
              <div className="space-y-2">
                {weakTopics.map(t => (
                  <div key={t.topic} className="flex items-center justify-between text-sm">
                    <span className="text-amber-800 font-medium">{t.label}</span>
                    <span className="text-red-600 font-bold">{t.avg}% — à renforcer</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-emerald-900">Aucune faiblesse critique détectée</h3>
                <p className="text-sm text-emerald-700">Continue ton plan pour maintenir ton niveau.</p>
              </div>
            </div>
          )
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-slate-800">Affine ton plan</h3>
              <p className="text-sm text-slate-600">Commence par une session rapide pour que tes priorités apparaissent ici.</p>
            </div>
          </div>
        )}

        {/* Day-by-day tasks */}
        {plan && (
          <div className="space-y-4">
            {Object.entries(tasksByDay).map(([dayStr, tasks]) => {
              const day = parseInt(dayStr);
              return (
                <div key={day}>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Jour {day}</h3>
                  {tasks.map(task => {
                    const topicScore = task.topic ? topicScores.find(ts => ts.topic === task.topic) : null;
                    const href = task.topic ? `/app/session?topic=${task.topic}` : "/app/chapitres";

                    return (
                      <div key={task.id} className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 bg-white mb-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-slate-800 text-sm truncate">{task.title}</h4>
                            {topicScore && (
                              <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                                topicScore.status === "weak" ? "bg-red-100 text-red-700" :
                                topicScore.status === "mastered" ? "bg-emerald-100 text-emerald-700" :
                                "bg-slate-100 text-slate-600"
                              }`}>
                                {topicScore.status === "weak" ? "À renforcer" : topicScore.status === "mastered" ? "Maîtrisé" : `${topicScore.avg}%`}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mb-1.5">{task.description}</p>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> ~{task.estimatedMinutes} min
                          </span>
                        </div>
                        <Link
                          href={href}
                          className="shrink-0 p-2.5 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
                          title="Faire la session"
                        >
                          {task.topic ? <PlayCircle className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
