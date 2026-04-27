"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, AlertCircle, ArrowRight, Target, BrainCircuit } from "lucide-react";
import { Suspense } from "react";

function ResultContent() {
  const searchParams = useSearchParams();
  const exam = searchParams.get("exam") || "brevet";
  const pseudo = searchParams.get("pseudo") || "";
  const diffParams = searchParams.get("diff") || "";
  const difficulties = diffParams ? diffParams.split(",") : [];

  const isBrevet = exam === "brevet";
  const examName = isBrevet ? "Brevet" : "Bac de maths";

  const diffMap: Record<string, string> = {
    calcul: "Calcul & bases",
    fractions: "Fractions",
    equations: "Équations",
    fonctions: "Fonctions",
    geometrie: "Géométrie",
    probas: "Probabilités & statistiques",
    methode: "Méthodologie",
    confiance: "Confiance en soi",
    nsp: "Plusieurs notions",
  };

  const selectedDiffs = difficulties.map((d) => diffMap[d] || d);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b px-4 py-4">
        <div className="container mx-auto flex items-center justify-center gap-2">
          <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <span className="font-bold text-xl text-slate-900">Matheria</span>
        </div>
      </header>

      <main className="container mx-auto max-w-2xl px-4 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Diagnostic terminé
          </h1>
          <p className="text-lg text-slate-600">
            Voici notre analyse pour préparer {pseudo ? `les révisions de ${pseudo}` : "les révisions"} au {examName}.
          </p>
        </div>

        <Card className="mb-8 border-none shadow-md overflow-hidden">
          <div className="bg-blue-900 p-6 text-white text-center">
            <h2 className="text-xl font-bold mb-2">Analyse du profil</h2>
            <p className="text-blue-200 text-sm">
              Votre enfant semble avoir besoin d’un parcours ciblé avant l’examen. Matheria peut l’aider à réviser en sessions courtes, avec des exercices adaptés et des corrections expliquées.
            </p>
          </div>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" /> Objectif principal
                </h3>
                <div className="bg-slate-50 p-3 rounded-lg border text-slate-700">
                  Réussir le {examName}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-blue-600" /> Points d'attention identifiés
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedDiffs.length > 0 ? (
                    selectedDiffs.map((diff, i) => (
                      <span key={i} className="bg-red-50 text-red-700 border border-red-100 px-3 py-1.5 rounded-full text-sm font-medium">
                        {diff}
                      </span>
                    ))
                  ) : (
                    <span className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full text-sm">
                      Programme complet
                    </span>
                  )}
                </div>
              </div>

              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 mt-6">
                <h3 className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-emerald-600" />
                  La solution Matheria
                </h3>
                <p className="text-emerald-800 text-sm mb-4">
                  Pour surmonter ces difficultés, nous recommandons des sessions de 15 minutes par jour, ciblant exactement ces points de blocage.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-white rounded-2xl p-8 border shadow-sm text-center mb-12 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 to-violet-600"></div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Passez à l'action aujourd'hui</h2>
          <div className="flex items-baseline justify-center gap-2 mb-6">
            <span className="text-4xl font-extrabold text-slate-900">39€</span>
            <span className="text-slate-500 font-medium">paiement unique</span>
          </div>
          
          <ul className="space-y-3 mb-8 text-left max-w-sm mx-auto">
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <span className="text-slate-700">Accès complet jusqu'au jour de l'examen</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <span className="text-slate-700">Parcours personnalisé</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <span className="text-slate-700">Garanti sans abonnement caché</span>
            </li>
          </ul>

          <div className="space-y-3">
            {process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ? (
              <div className="space-y-2 w-full">
                <a href={process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK} target="_blank" rel="noopener noreferrer" className="block w-full">
                  <Button size="lg" className="w-full text-lg h-14 shadow-lg bg-blue-600 hover:bg-blue-700 text-white">
                    Réserver le Pack Révision Express — 39 €
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
                <p className="text-xs text-center text-slate-500 font-medium pb-2">
                  Paiement sécurisé par Stripe. Paiement unique, sans abonnement.
                </p>
              </div>
            ) : (
              <Link href="/diagnostic" className="block w-full">
                <Button size="lg" className="w-full text-lg h-14 shadow-lg bg-blue-600 hover:bg-blue-700 text-white">
                  Réserver le Pack Révision Express — 39 €
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            )}
            <Link href="/" className="block">
              <Button variant="ghost" className="w-full">
                Recevoir les infos par email
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ResultatDiagnostic() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <ResultContent />
    </Suspense>
  );
}
