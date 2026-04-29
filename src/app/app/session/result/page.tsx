"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Award, Target, Home, RotateCcw, BookOpen, AlertCircle } from "lucide-react";

export default function SessionResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<{score: number, totalQuestions: number, topics: string[]} | null>(null);

  useEffect(() => {
    const storedResult = localStorage.getItem("matheria_last_session_result");
    if (!storedResult) {
      router.push("/app");
    } else {
      setResult(JSON.parse(storedResult));
    }
  }, [router]);

  if (!result) return null;

  const pct = Math.round((result.score / result.totalQuestions) * 100);
  const isTopicSession = result.topics.length === 1;

  let message = "";
  let recMessage = "";
  let icon = <Award size={48} className="text-indigo-500 mx-auto mb-4" />;
  
  if (pct === 100) {
    message = "Excellent travail ! Sans-faute absolu. 🌟";
    recMessage = "Tu peux passer à un autre chapitre !";
    icon = <Award size={64} className="text-amber-400 mx-auto mb-4 drop-shadow-md" />;
  } else if (pct >= 60) {
    message = "Très bon début ! Les bases sont là. 👍";
    recMessage = "Encore un entraînement et ça va monter vers l'excellence.";
    icon = <Target size={56} className="text-emerald-500 mx-auto mb-4" />;
  } else {
    message = "Pas grave, l'important c'est de s'entraîner ! 💪";
    recMessage = "Refais une session sur ce chapitre pour bien assimiler la correction.";
    icon = <Target size={48} className="text-indigo-400 mx-auto mb-4" />;
  }

  const topicQuery = isTopicSession ? `?topic=${result.topics[0]}` : "";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden text-center py-10 px-6">
      
      {icon}

      <h1 className="text-4xl font-extrabold text-slate-900 mb-2">
        {result.score} / {result.totalQuestions}
      </h1>
      
      <p className="text-lg text-slate-800 mb-6 font-medium">
        {message}
      </p>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-8 text-left">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-2">
          <AlertCircle className="w-5 h-5 text-indigo-500" />
          Notre conseil
        </h3>
        <p className="text-slate-600 text-sm">
          {recMessage}
        </p>
      </div>

      <div className="space-y-3">
        <Link 
          href={`/app/session${topicQuery}`}
          className="w-full flex items-center justify-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          <RotateCcw size={20} />
          Refaire une session
        </Link>
        
        <Link 
          href="/app/chapitres"
          className="w-full flex items-center justify-center gap-2 py-4 px-4 border-2 border-slate-200 rounded-xl text-lg font-medium text-slate-700 bg-white hover:bg-slate-50 transition-colors"
        >
          <BookOpen size={20} />
          Choisir un chapitre
        </Link>

        <Link 
          href="/app"
          className="w-full flex items-center justify-center gap-2 py-4 px-4 text-slate-500 hover:text-slate-700 transition-colors"
        >
          <Home size={20} />
          Retour à l'accueil
        </Link>
      </div>

    </div>
  );
}
