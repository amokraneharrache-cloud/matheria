"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Award, Target, Home, RotateCcw } from "lucide-react";

export default function SessionResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<{score: number, total: number} | null>(null);

  useEffect(() => {
    const storedResult = localStorage.getItem("matheria_last_session_result");
    if (!storedResult) {
      router.push("/app");
    } else {
      setResult(JSON.parse(storedResult));
    }
  }, [router]);

  if (!result) return null;

  let message = "";
  let icon = <Award size={48} className="text-indigo-500 mx-auto mb-4" />;
  
  if (result.score === result.total) {
    message = "Excellent travail ! Sans-faute absolu. 🌟";
    icon = <Award size={64} className="text-amber-400 mx-auto mb-4 drop-shadow-md" />;
  } else if (result.score >= result.total - 2) {
    message = "Très bon début ! Les bases sont là, on continue. 👍";
    icon = <Target size={56} className="text-emerald-500 mx-auto mb-4" />;
  } else {
    message = "Pas grave, l'important c'est de s'entraîner ! 💪";
    icon = <Target size={48} className="text-indigo-400 mx-auto mb-4" />;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden text-center py-12 px-6">
      
      {icon}

      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
        {result.score} / {result.total}
      </h1>
      
      <p className="text-lg text-slate-600 mb-8 font-medium">
        {message}
      </p>

      <div className="space-y-3">
        <Link 
          href="/app/session"
          className="w-full flex items-center justify-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          <RotateCcw size={20} />
          Refaire une session
        </Link>
        
        <Link 
          href="/app"
          className="w-full flex items-center justify-center gap-2 py-4 px-4 border-2 border-slate-200 rounded-xl text-lg font-medium text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 focus:outline-none transition-colors"
        >
          <Home size={20} />
          Retour à l'accueil
        </Link>
      </div>

    </div>
  );
}
