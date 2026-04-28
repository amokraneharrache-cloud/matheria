"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Play } from "lucide-react";

export default function AppDashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedProfile = localStorage.getItem("matheria_student_profile");
    if (!storedProfile) {
      router.push("/merci");
    } else {
      setProfile(JSON.parse(storedProfile));
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <div className="text-center mt-20 text-slate-500">Chargement de l'espace élève...</div>;
  }

  const examGoalLabel = profile?.examGoal === "brevet" ? "Brevet des collèges" : "Bac de maths Première";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
        <h1 className="text-2xl font-bold">Salut {profile?.studentPseudo} 👋</h1>
        <p className="mt-2 text-indigo-100 opacity-90">Objectif : {examGoalLabel}</p>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <h2 className="font-semibold text-slate-800">Ta session du jour</h2>
          <p className="text-sm text-slate-500 mt-1">
            5 exercices ciblés, correction immédiate. Prêt(e) à t'entraîner ?
          </p>
        </div>

        <Link 
          href="/app/session"
          className="w-full flex items-center justify-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          <Play size={20} className="fill-current" />
          Démarrer (10 min)
        </Link>
      </div>
    </div>
  );
}
