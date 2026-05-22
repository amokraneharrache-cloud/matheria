import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, BookOpen, Lightbulb, ListChecks } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { InternalLinks } from "@/components/marketing/InternalLinks";
import { SeoCta } from "@/components/marketing/SeoCta";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import { methods } from "@/data/methods";
import { absoluteUrl } from "@/lib/site";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/seo";

const pagePath = "/methodes-maths-terminale";

const description =
  "Retrouve les méthodes de maths Terminale travaillées dans SprintMaths : variations, convexité, logarithme, exponentielle, récurrence, limites et intégrales.";

export const metadata: Metadata = {
  title: {
    absolute: "Méthodes maths Terminale | Étapes & erreurs fréquentes — SprintMaths",
  },
  description,
  alternates: {
    canonical: absoluteUrl(pagePath),
  },
  openGraph: {
    title: "Méthodes maths Terminale | Étapes & erreurs fréquentes — SprintMaths",
    description,
    url: absoluteUrl(pagePath),
    type: "website",
  },
};

export default function MethodesMathsTerminalePage() {
  const terminaleMethods = methods.filter((method) => method.examGoal === "terminale");

  return (
    <SeoPageLayout urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          productJsonLd(pagePath),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Bac Terminale maths", path: "/bac-terminale-maths" },
            { name: "Méthodes maths Terminale", path: pagePath },
          ]),
        ]}
      />
      <section className="bg-slate-50 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-900">
            Fiches méthodes Terminale
          </p>
          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl">
            Méthodes de maths Terminale pour structurer les exercices
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-slate-700">
            Les fiches méthodes SprintMaths donnent des étapes concrètes, une
            erreur fréquente à éviter et un mini-exemple pour aider l'élève à
            démarrer ses exercices de Terminale avec plus de méthode.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TrackedLink
              href="/bac-maths-terminale-2026"
              eventName="click_offer"
              eventParams={{
                source_page: pagePath,
                offer: "bac2026",
                cta_location: "methods_hero_offer",
              }}
              className="rounded-full bg-blue-900 px-6 py-3 text-center font-bold text-white hover:bg-blue-800"
            >
              Commencer ma révision Bac 2026
            </TrackedLink>
            <TrackedLink
              href="/diagnostic"
              eventName="click_diagnostic"
              eventParams={{
                source_page: pagePath,
                cta_location: "methods_hero_secondary",
              }}
              className="rounded-full border border-blue-900 px-6 py-3 text-center font-bold text-blue-900 hover:bg-blue-50"
            >
              Faire le diagnostic
            </TrackedLink>
          </div>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-12">
          <section className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: ListChecks,
                title: "3 à 5 étapes",
                text: "Chaque méthode est découpée en actions simples à suivre dans un exercice.",
              },
              {
                icon: AlertTriangle,
                title: "Erreur fréquente",
                text: "L'élève repère le piège classique avant de l'appliquer en session.",
              },
              {
                icon: Lightbulb,
                title: "Mini-exemple",
                text: "Un exemple court sert de point d'appui sans remplacer l'entraînement complet.",
              },
            ].map((item) => (
              <article key={item.title} className="rounded-2xl bg-slate-50 p-6">
                <item.icon className="h-7 w-7 text-blue-800" />
                <h2 className="mt-4 text-xl font-bold text-slate-950">{item.title}</h2>
                <p className="mt-2 text-slate-700">{item.text}</p>
              </article>
            ))}
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-950">
              Les méthodes Terminale disponibles
            </h2>
            <p className="mt-3 max-w-3xl text-slate-700">
              Variations, convexité, logarithme, exponentielle, récurrence,
              limites, loi binomiale, espérance, intégrales, équation
              différentielle, vecteurs de l'espace et tableau de signes.
            </p>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {terminaleMethods.map((method) => (
                <article
                  key={method.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <BookOpen className="mt-1 h-6 w-6 shrink-0 text-blue-800" />
                    <div>
                      <p className="text-sm font-bold uppercase text-slate-500">
                        {method.topic}
                      </p>
                      <h3 className="mt-1 text-xl font-bold text-slate-950">
                        {method.title}
                      </h3>
                    </div>
                  </div>

                  <div className="mt-5">
                    <h4 className="font-bold text-slate-900">Étapes</h4>
                    <ol className="mt-3 space-y-2 text-sm text-slate-700">
                      {method.steps.slice(0, 5).map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="mt-5 rounded-xl bg-red-50 p-4">
                    <h4 className="font-bold text-red-800">Erreur fréquente</h4>
                    <p className="mt-2 text-sm text-red-900">{method.commonMistake}</p>
                  </div>

                  <div className="mt-5 rounded-xl bg-emerald-50 p-4">
                    <h4 className="font-bold text-emerald-900">Mini-exemple</h4>
                    <p className="mt-2 text-sm text-emerald-950">{method.miniExample}</p>
                  </div>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/bac-terminale-maths"
                      className="rounded-full border border-slate-200 px-4 py-2 text-center text-sm font-bold text-slate-700 hover:border-blue-200 hover:text-blue-900"
                    >
                      Parcours Terminale
                    </Link>
                    <TrackedLink
                      href="/diagnostic"
                      eventName="click_diagnostic"
                      eventParams={{
                        source_page: pagePath,
                        cta_location: "methods_card",
                      }}
                      className="rounded-full bg-blue-900 px-4 py-2 text-center text-sm font-bold text-white hover:bg-blue-800"
                    >
                      Diagnostic gratuit
                    </TrackedLink>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <SeoCta
            title="Appliquer les méthodes dans un vrai parcours"
            description="Après le diagnostic, l'élève peut travailler les chapitres associés et suivre sa progression dans SprintMaths."
          />
          <InternalLinks currentPath={pagePath} />
        </div>
      </section>
    </SeoPageLayout>
  );
}
