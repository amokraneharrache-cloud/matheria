"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, AlertTriangle, Lightbulb, Target } from "lucide-react";
import { methods, MethodCard } from "@/data/methods";

export default function MethodesPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedProfile = localStorage.getItem("matheria_student_profile");
    if (!storedProfile) {
      router.push("/merci");
      return;
    }
    setProfile(JSON.parse(storedProfile));
    setLoading(false);
  }, [router]);

  if (loading) return <div className="text-center mt-20 text-slate-500">Chargement des fiches méthodes...</div>;

  const termMethods = methods.filter((m) => m.examGoal === "terminale");

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-4">
        <Link href="/app" className="p-2 -ml-2 rounded-full hover:bg-slate-200 transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          Fiches Méthodes
        </h1>
      </div>

      <div className="p-5 space-y-6 bg-slate-50">
        <p className="text-sm text-slate-600">
          Retrouve ici les méthodes clés à connaître par cœur pour réussir les exercices du baccalauréat.
        </p>

        <div className="space-y-6">
          {termMethods.map((meth) => (
            <div key={meth.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-100 bg-indigo-50/50">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1 block">
                      {meth.topic}
                    </span>
                    <h2 className="font-bold text-lg text-slate-900">{meth.title}</h2>
                  </div>
                  {meth.linkedTopic && (
                    <Link
                      href={`/app/session?topic=${meth.linkedTopic}`}
                      className="shrink-0 p-2 bg-white border border-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors shadow-sm"
                      title="S'entraîner sur ce chapitre"
                    >
                      <Target className="w-5 h-5" />
                    </Link>
                  )}
                </div>
              </div>

              <div className="p-5 space-y-5">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-slate-400" />
                    Étapes de résolution
                  </h3>
                  <ul className="space-y-2">
                    {meth.steps.map((step, idx) => (
                      <li key={idx} className="text-sm text-slate-700 flex items-start gap-2">
                        <span className="text-indigo-500 font-bold mt-0.5">•</span>
                        <span>{step.substring(step.indexOf(".") + 1).trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
                  <h3 className="text-xs font-bold text-amber-900 mb-1 flex items-center gap-1.5 uppercase tracking-wide">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Erreur fréquente
                  </h3>
                  <p className="text-sm text-amber-800">{meth.commonMistake}</p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <h3 className="text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5 uppercase tracking-wide">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                    Mini exemple
                  </h3>
                  <p className="text-sm text-slate-600 font-mono text-xs overflow-x-auto">{meth.miniExample}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
