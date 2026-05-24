"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, ArrowLeft, Target, PlayCircle } from "lucide-react";
import { getAvailableTopics, type ExamGoal } from "@/data/questions";
import { getProgram } from "@/data/programs";
import { parseStoredJson, useStorageItemValue } from "@/lib/useStorageItemValue";

type StudentProfile = {
  examGoal: ExamGoal;
};

type SessionHistory = {
  examGoal: ExamGoal;
  score: number;
  totalQuestions: number;
  topics: string[];
};

export default function ChapitresPage() {
  const router = useRouter();
  const storedProfile = useStorageItemValue("studentProfile");
  const storedHistory = useStorageItemValue("sessionHistory");
  const profile = useMemo(
    () => parseStoredJson<StudentProfile>(storedProfile),
    [storedProfile],
  );

  useEffect(() => {
    if (storedProfile !== undefined && !profile) {
      router.push("/merci");
    }
  }, [profile, router, storedProfile]);

  const goalLabel = profile
    ? profile.examGoal === "brevet"
      ? "Brevet"
      : profile.examGoal === "terminale"
        ? "Bac Terminale"
        : "Bac Première"
    : "";

  const topics = useMemo(() => {
    if (!profile) {
      return [];
    }

    const program = getProgram(profile.examGoal);
    const available = getAvailableTopics(profile.examGoal);
    const parsedHistory = parseStoredJson<SessionHistory[]>(storedHistory);
    const history = Array.isArray(parsedHistory) ? parsedHistory : [];

    if (program) {
      return program.topics.map(t => {
        // Find if we have questions for this topic
        const availableData = available.find(a => a.topic === t.id);
        const count = availableData ? availableData.count : 0;

        // Find sessions for this exact topic
        const topicSessions = history.filter(h => 
          h.examGoal === profile.examGoal && 
          h.topics.length === 1 && 
          h.topics[0] === t.id
        );

        let avgScore: number | null = null;
        if (topicSessions.length > 0) {
          const sumScores = topicSessions.reduce((acc, curr) => acc + curr.score, 0);
          const sumTotal = topicSessions.reduce((acc, curr) => acc + curr.totalQuestions, 0);
          avgScore = Math.round((sumScores / sumTotal) * 100);
        }

        return {
          topic: t.id,
          label: t.label,
          count: count,
          priority: t.priority,
          avgScore
        };
      });
    }

    return [];
  }, [profile, storedHistory]);

  if (!profile) {
    return <div className="text-center mt-20 text-slate-500">Chargement des chapitres...</div>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-4">
        <Link href="/app/programme" className="p-2 -ml-2 rounded-full hover:bg-slate-200 transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <h1 className="text-xl font-bold text-slate-800">Chapitres {goalLabel}</h1>
      </div>

      <div className="p-4 space-y-3">
        <p className="text-sm text-slate-500 mb-4 px-1">
          Choisis un chapitre pour lancer une session ciblée de 5 questions.
        </p>

        {topics.map((t) => (
          <div key={t.topic} className={`flex items-center justify-between p-4 rounded-xl border shadow-sm ${t.count === 0 ? 'bg-slate-50 border-slate-100 opacity-70' : 'bg-white border-slate-200'}`}>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                  <BookOpen className={`w-4 h-4 ${t.count > 0 ? 'text-indigo-500' : 'text-slate-400'}`} />
                  {t.label}
                </h2>
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                  t.priority === 'high' ? 'bg-red-100 text-red-700' :
                  t.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                  'bg-slate-100 text-slate-600'
                }`}>
                  {t.priority === 'high' ? 'Haute' : t.priority === 'medium' ? 'Moyenne' : 'Basse'}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1.5 text-xs font-medium text-slate-500">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                  {t.count > 0 ? `${t.count} questions` : 'Questions à venir'}
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
            
            {t.count > 0 ? (
              <Link 
                href={`/app/session?topic=${t.topic}`}
                className="ml-4 p-3 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors shrink-0"
                title="Réviser ce chapitre"
              >
                <PlayCircle className="w-6 h-6" />
              </Link>
            ) : (
              <div className="ml-4 p-3 rounded-full bg-slate-100 text-slate-300 shrink-0 cursor-not-allowed">
                <PlayCircle className="w-6 h-6" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
