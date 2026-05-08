"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, BarChart2, Play, FileText, Target } from "lucide-react";
import { guidedExercises } from "@/data/guidedExercises";
import { mockBacSubjects } from "@/data/mockBacSubjects";
import { getStorageItem } from "@/lib/storageKeys";

export default function BacModePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedProfile = getStorageItem("studentProfile");
    if (!storedProfile) {
      router.push("/merci");
      return;
    }
    setProfile(JSON.parse(storedProfile));
    setLoading(false);
  }, [router]);

  if (loading) return <div className="text-center mt-20 text-slate-500">Chargement du Mode Bac...</div>;

  // Not terminale case
  if (profile?.examGoal !== "terminale") {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-4">
          <Link href="/app" className="p-2 -ml-2 rounded-full hover:bg-slate-200 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <h1 className="text-xl font-bold text-slate-800">Mode Bac</h1>
        </div>
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎓</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Réservé aux Terminales</h2>
          <p className="text-slate-600 mb-8 max-w-md mx-auto">
            Le mode Bac Terminale est conçu spécifiquement pour les élèves de Terminale. Vous pouvez continuer à vous entraîner avec les chapitres et votre plan de révision.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/app/chapitres"
              className="py-3 px-6 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors"
            >
              Voir les chapitres
            </Link>
            <Link
              href="/app/plan"
              className="py-3 px-6 rounded-xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
            >
              Mon plan de révision
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Terminale case
  const termExercises = guidedExercises.filter(ex => ex.examGoal === "terminale");

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-4">
        <Link href="/app" className="p-2 -ml-2 rounded-full hover:bg-slate-200 transition-colors">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </Link>
        <h1 className="text-xl font-bold text-slate-800">Mode Bac Terminale</h1>
      </div>

      <div className="p-5 space-y-6">
        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
          <h2 className="font-bold text-indigo-900 text-lg mb-2">Entraînement type Bac</h2>
          <p className="text-sm text-indigo-700">
            Travaille des exercices guidés étape par étape, très proches de l'esprit du baccalauréat. Maîtrise la méthode pour gagner des points le jour J.
          </p>
        </div>

        <section className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-bold text-slate-900 text-lg">Sujets type bac</h2>
              <p className="text-sm text-slate-600">
                Quatre exercices guidés pour obtenir une note virtuelle sur 20.
              </p>
            </div>
            <Link
              href="/app/bac/sujet"
              className="shrink-0 rounded-full bg-indigo-600 p-3 text-white hover:bg-indigo-700 transition-colors"
              aria-label="Commencer un sujet type bac"
            >
              <Target className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {mockBacSubjects.map((subject) => (
              <article
                key={subject.id}
                className="rounded-xl border border-slate-200 bg-white p-4 hover:border-indigo-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-slate-900">{subject.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{subject.description}</p>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
                        <Clock className="h-3.5 w-3.5" />
                        ~{subject.estimatedMinutes} min
                      </span>
                      <Link
                        href={`/app/bac/sujet?subject=${subject.id}`}
                        className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition-colors"
                      >
                        Commencer le sujet
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div>
          <h2 className="font-bold text-slate-900 text-lg mb-3">Exercices guidés</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {termExercises.map((ex) => (
            <div key={ex.id} className="border border-slate-200 rounded-xl p-4 flex flex-col hover:border-indigo-300 hover:shadow-sm transition-all bg-white">
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                    {ex.topicLabel}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
                    ex.difficulty === 'hard' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {ex.difficulty === 'hard' ? 'Difficile' : 'Moyen'}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 line-clamp-2 mt-2">{ex.title}</h3>
                <p className="text-sm text-slate-500 mt-1 line-clamp-2">{ex.subtitle}</p>
              </div>
              
              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    ~{ex.estimatedMinutes} min
                  </span>
                  <span className="flex items-center gap-1">
                    <BarChart2 className="w-3.5 h-3.5" />
                    {ex.steps.length} étapes
                  </span>
                </div>
                <Link
                  href={`/app/bac/${ex.id}`}
                  className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  <Play className="w-4 h-4 ml-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
