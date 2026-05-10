"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { GuaranteeNote } from "@/components/marketing/GuaranteeNote";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import { CheckCircle2, AlertCircle, ArrowRight, Target, BrainCircuit } from "lucide-react";
import { Suspense, useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import { trackViewOffer } from "@/lib/tracking";
import { getSessionStorageItem, storageEvents } from "@/lib/storageKeys";
import {
  BAC_2026_OFFER_PRICE,
  BAC_2026_PROMO_CODE,
  PACK_REVISION_EXPRESS_PRICE,
} from "@/lib/offers";

type DiagnosticResultContext = {
  exam?: string;
  level?: string;
  difficulties?: string[];
  pseudo?: string;
};

function subscribeToDiagnosticResultContext(callback: () => void) {
  window.addEventListener(storageEvents.diagnosticResultContextChanged, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(storageEvents.diagnosticResultContextChanged, callback);
    window.removeEventListener("storage", callback);
  };
}

function getDiagnosticResultContextSnapshot() {
  if (typeof window === "undefined") {
    return "";
  }

  try {
    return getSessionStorageItem("diagnosticResultContext") ?? "";
  } catch {
    return "";
  }
}

function getServerDiagnosticResultContextSnapshot() {
  return "";
}

function ResultContent() {
  const searchParams = useSearchParams();
  const viewOfferTracked = useRef(false);
  const storedContextSnapshot = useSyncExternalStore(
    subscribeToDiagnosticResultContext,
    getDiagnosticResultContextSnapshot,
    getServerDiagnosticResultContextSnapshot,
  );
  const storedContext = useMemo(() => {
    if (!storedContextSnapshot) {
      return null;
    }

    try {
      return JSON.parse(storedContextSnapshot) as DiagnosticResultContext;
    } catch {
      return null;
    }
  }, [storedContextSnapshot]);

  useEffect(() => {
    if (searchParams.has("pseudo") || searchParams.has("diff")) {
      const sanitizedParams = new URLSearchParams();
      const examParam = searchParams.get("exam");
      const levelParam = searchParams.get("level");

      if (examParam) {
        sanitizedParams.set("exam", examParam);
      }

      if (levelParam) {
        sanitizedParams.set("level", levelParam);
      }

      const nextUrl = sanitizedParams.toString()
        ? `/diagnostic/resultat?${sanitizedParams.toString()}`
        : "/diagnostic/resultat";

      window.history.replaceState(null, "", nextUrl);
    }
  }, [searchParams]);

  const exam = storedContext?.exam || searchParams.get("exam") || "brevet";
  const level = storedContext?.level || searchParams.get("level") || "";
  const pseudo = storedContext?.pseudo || searchParams.get("pseudo") || "";
  const diffParams = searchParams.get("diff") || "";
  const difficulties = storedContext?.difficulties ?? (diffParams ? diffParams.split(",") : []);
  const stripePaymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK;

  const isBrevet = exam === "brevet";
  const isTerminale = exam === "terminale";
  const examName = isBrevet ? "Brevet" : isTerminale ? "Bac de Terminale" : "Bac de maths";

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
  const offerTrackingParams = useMemo(
    () => ({
      exam_goal: exam,
      level,
      offer: "pack_revision_express",
      price: BAC_2026_OFFER_PRICE,
      currency: "EUR",
      coupon_code: BAC_2026_PROMO_CODE,
      source_page: "/diagnostic/resultat",
    }),
    [exam, level],
  );

  useEffect(() => {
    if (viewOfferTracked.current) {
      return;
    }

    viewOfferTracked.current = true;
    trackViewOffer(offerTrackingParams);
  }, [offerTrackingParams]);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b px-4 py-4">
        <div className="container mx-auto flex items-center justify-center gap-2">
          <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="font-bold text-xl text-slate-900">SprintMaths</span>
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
              Votre enfant semble avoir besoin d’un parcours ciblé avant l’examen. SprintMaths peut l’aider à réviser en sessions courtes, avec des exercices adaptés et des corrections expliquées.
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
                      Révision générale
                    </span>
                  )}
                </div>
              </div>

              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100 mt-6">
                <h3 className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-emerald-600" />
                  La solution SprintMaths
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
            <span className="text-4xl font-extrabold text-slate-900">{BAC_2026_OFFER_PRICE}€</span>
            <span className="text-lg font-bold text-slate-400 line-through">{PACK_REVISION_EXPRESS_PRICE}€</span>
            <span className="text-slate-500 font-medium">paiement unique</span>
          </div>
          <p className="mb-6 text-sm font-semibold text-blue-900">
            Code {BAC_2026_PROMO_CODE} : {BAC_2026_OFFER_PRICE} € au lieu de {PACK_REVISION_EXPRESS_PRICE} €.
          </p>
          
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
              <span className="text-slate-700">Paiement unique, sans abonnement</span>
            </li>
          </ul>

          <GuaranteeNote
            className="mb-6"
            sourcePage="/diagnostic/resultat"
            variant="compact"
          />

          <div className="space-y-3">
            {stripePaymentLink ? (
              <div className="space-y-2 w-full">
                <TrackedLink
                  href={stripePaymentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                  eventName="pricing_cta_click"
                  eventParams={{
                    ...offerTrackingParams,
                    cta_location: "diagnostic_result_offer",
                  }}
                >
                  <Button size="lg" className="w-full text-lg h-14 shadow-lg bg-blue-600 hover:bg-blue-700 text-white">
                    Profiter de l'offre à {BAC_2026_OFFER_PRICE} €
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </TrackedLink>
                <p className="text-xs text-center text-slate-500 font-medium pb-2">
                  Paiement sécurisé par Stripe. Paiement unique, sans abonnement.
                </p>
              </div>
            ) : (
              <Link href="/diagnostic" className="block w-full">
                <Button size="lg" className="w-full text-lg h-14 shadow-lg bg-blue-600 hover:bg-blue-700 text-white">
                  Faire le diagnostic gratuit
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            )}
            <Link href="/" className="block">
              <Button variant="ghost" className="w-full">
                Recevoir les infos par email
              </Button>
            </Link>
            <div className="pt-4 mt-4 border-t border-slate-100">
              <Link href="/acces" className="text-sm font-medium text-slate-500 hover:text-slate-800 underline underline-offset-4">
                J'ai déjà réservé mon accès
              </Link>
            </div>
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
