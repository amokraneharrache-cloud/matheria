"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, Target, CalendarCheck } from "lucide-react";
import { getProgram, Program } from "@/data/programs";

export default function ProgrammePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedProfile = localStorage.getItem("matheria_student_profile");
    if (!storedProfile) {
      router.push("/merci");
      return;
    }
    const p = JSON.parse(storedProfile);
    setProfile(p);
    setProgram(getProgram(p.examGoal) || null);
    setLoading(false);
  }, [router]);

  if (loading) return <div className="text-center mt-20 text-slate-500">Chargement du programme...</div>;

  if (!program) return <div className="text-center mt-20 text-slate-500">Programme introuvable pour cet objectif.</div>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-4">
        <Link href="/app" className="p-2 -ml-2 rounded-full hover:bg-slate-200 transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <h1 className="text-xl font-bold text-slate-800">Programme {program.title}</h1>
      </div>

      <div className="p-5 space-y-6">
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
          <h2 className="font-bold text-indigo-900 mb-2">{program.title}</h2>
          <p className="text-sm text-indigo-700">{program.subtitle}</p>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-500" />
            Les chapitres au programme
          </h3>
          
          <div className="space-y-3">
            {program.topics.map((topic, index) => (
              <div key={topic.id} className="p-4 rounded-xl border border-slate-200 bg-white">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-400">{(index + 1).toString().padStart(2, '0')}.</span>
                      <h4 className="font-semibold text-slate-800">{topic.label}</h4>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        topic.priority === 'high' ? 'bg-red-100 text-red-700' :
                        topic.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {topic.priority === 'high' ? 'Priorité haute' : topic.priority === 'medium' ? 'Priorité moyenne' : 'Secondaire'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1 pl-6">{topic.description}</p>
                  </div>
                </div>
                
                <div className="mt-3 pl-6 flex items-center gap-3">
                  <Link 
                    href={`/app/session?topic=${topic.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Target className="w-3.5 h-3.5" />
                    S'entraîner
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
          <Link
            href="/app/chapitres"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Tous les chapitres
          </Link>
          <Link
            href="/app/plan"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-indigo-600 bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
          >
            <CalendarCheck className="w-4 h-4" />
            Mon plan d'action
          </Link>
        </div>
      </div>
    </div>
  );
}
