"use client";

import { CheckCircle2, LockKeyhole, PlayCircle } from "lucide-react";
import { useState } from "react";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/tracking";

const pagePath = "/exercices-type-bac-maths-terminale";

const previewSteps = [
  {
    title: "Étape 1 : identifier le chapitre et la méthode",
    text: "On reconnaît une question sur les suites : pour justifier un sens de variation, on cherche souvent le signe de u(n+1) - u(n), ou un quotient si les termes sont positifs.",
  },
  {
    title: "Étape 2 : poser les données utiles",
    text: "Ici, la suite est définie par une formule explicite. On écrit u(n+1), puis on calcule u(n+1) - u(n) avant de simplifier.",
  },
  {
    title: "Étape 3 : conclure proprement",
    text: "Si la différence est positive pour tout n de l'ensemble étudié, la suite est croissante. Si elle est négative, elle est décroissante. La conclusion doit citer l'intervalle ou les rangs concernés.",
  },
];

export function GuidedExercisePreview() {
  const [revealedSteps, setRevealedSteps] = useState(0);

  const revealNextStep = () => {
    const nextStep = Math.min(revealedSteps + 1, previewSteps.length);

    if (revealedSteps === 0) {
      trackEvent("free_exercise_start", {
        source_page: pagePath,
        level: "terminale",
        exam_goal: "bac_2027",
        cta_location: "typebac_demo",
      });
    }

    trackEvent("free_exercise_step_reveal", {
      source_page: pagePath,
      level: "terminale",
      exam_goal: "bac_2027",
      cta_location: `typebac_demo_step_${nextStep}`,
    });

    setRevealedSteps(nextStep);
  };

  return (
    <div
      id="exercice-guide"
      className="scroll-mt-24 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase text-emerald-700">
            <PlayCircle className="h-4 w-4" />
            Démo gratuite
          </p>
          <h3 className="mt-4 text-2xl font-bold text-slate-950">
            Suites : étudier une suite et justifier son sens de variation
          </h3>
          <p className="mt-3 leading-7 text-slate-700">
            On considère la suite définie pour tout entier naturel n par{" "}
            <span className="font-semibold text-slate-950">
              u(n) = n² - 3n + 5
            </span>
            . Justifier le sens de variation de la suite.
          </p>
        </div>
        <div className="rounded-lg bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
          Aperçu en 3 étapes
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        {previewSteps.map((step, index) => {
          const isVisible = index < revealedSteps;

          return (
            <div
              key={step.title}
              className={`rounded-lg border p-4 ${
                isVisible
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    isVisible
                      ? "bg-emerald-600 text-white"
                      : "bg-white text-slate-500"
                  }`}
                >
                  {isVisible ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <LockKeyhole className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-slate-950">
                    {isVisible ? step.title : `Étape ${index + 1}`}
                  </h4>
                  <p className="mt-2 leading-7 text-slate-700">
                    {isVisible
                      ? step.text
                      : "Clique pour révéler cette étape de raisonnement."}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          type="button"
          onClick={revealNextStep}
          disabled={revealedSteps === previewSteps.length}
          className="w-full whitespace-normal px-4 text-base sm:w-auto"
        >
          {revealedSteps === 0
            ? "Voir l'étape 1"
            : revealedSteps < previewSteps.length
              ? `Voir l'étape ${revealedSteps + 1}`
              : "Toutes les étapes sont affichées"}
        </Button>
        <TrackedLink
          href="/bac-maths-2027#offre"
          eventName="click_typebac_offer"
          eventParams={{
            source_page: pagePath,
            level: "terminale",
            offer: "pack_revision_express_bac_2027",
            cta_location: "typebac_demo_unlock",
          }}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-full border-2 border-blue-900 bg-white px-5 py-3 text-center font-bold text-blue-900 hover:bg-blue-50 sm:w-auto"
        >
          Débloquer les exercices guidés complets
        </TrackedLink>
      </div>
    </div>
  );
}
