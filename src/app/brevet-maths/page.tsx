import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, Compass, LineChart, ListChecks, Shapes, TimerReset } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { InternalLinks } from "@/components/marketing/InternalLinks";
import { SeoCta } from "@/components/marketing/SeoCta";
import { SeoFaq } from "@/components/marketing/SeoFaq";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import { getProgram } from "@/data/programs";
import { absoluteUrl } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd, productJsonLd, type FaqItem } from "@/lib/seo";

const pagePath = "/brevet-maths";

const description =
  "Prépare le brevet de maths avec des exercices courts, un programme par chapitre, des priorités de révision et un suivi de progression.";

export const metadata: Metadata = {
  title: {
    absolute:
      "Réviser le brevet de maths | Exercices, programme & progression — SprintMaths",
  },
  description,
  alternates: {
    canonical: absoluteUrl(pagePath),
  },
  openGraph: {
    title:
      "Réviser le brevet de maths | Exercices, programme & progression — SprintMaths",
    description,
    url: absoluteUrl(pagePath),
    type: "website",
  },
};

const faqItems: FaqItem[] = [
  {
    question: "Quels thèmes de maths du brevet sont travaillés ?",
    answer:
      "SprintMaths travaille notamment fractions, équations, fonctions, géométrie, Pythagore, Thalès, proportionnalité, probabilités et statistiques.",
  },
  {
    question: "Les sessions sont-elles longues ?",
    answer:
      "Non. Le format privilégie des exercices courts pour aider l'élève à reprendre confiance et à installer une régularité.",
  },
  {
    question: "Le diagnostic est-il obligatoire ?",
    answer:
      "Il est recommandé, car il aide à choisir l'objectif, le niveau ressenti et les difficultés à traiter en priorité.",
  },
];

export default function BrevetMathsPage() {
  const program = getProgram("brevet");
  const priorityTopics = program?.topics.filter((topic) => topic.priority === "high") || [];

  return (
    <SeoPageLayout>
      <JsonLd
        data={[
          productJsonLd(pagePath),
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Brevet maths", path: pagePath },
          ]),
        ]}
      />
      <section className="bg-blue-950 px-4 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-sm font-bold text-blue-100">
            Brevet de maths
          </p>
          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight sm:text-5xl">
            Réviser le brevet de maths avec des chapitres clairs
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-blue-100">
            Pour le brevet, l'élève a besoin de revoir les bases, de pratiquer
            régulièrement et de savoir quels chapitres reprendre en premier.
            SprintMaths transforme le programme en sessions courtes et en
            progression visible.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TrackedLink
              href="/diagnostic"
              eventName="click_diagnostic"
              eventParams={{
                source_page: pagePath,
                cta_location: "brevet_hero_primary",
              }}
              className="rounded-full bg-white px-6 py-3 text-center font-bold text-blue-950 hover:bg-blue-50"
            >
              Faire le diagnostic gratuit
            </TrackedLink>
            <Link
              href="/programme-maths-brevet"
              className="rounded-full border border-white px-6 py-3 text-center font-bold text-white hover:bg-white/10"
            >
              Voir le programme Brevet
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-14">
          <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="text-3xl font-bold text-slate-950">
                Préparer le brevet de maths efficacement
              </h2>
              <p className="mt-4 text-slate-700">
                Beaucoup d'élèves de 3e se perdent entre calcul, géométrie,
                fonctions et probabilités. SprintMaths remet les chapitres dans un
                cadre lisible, avec des exercices courts et des priorités.
              </p>
              <p className="mt-4 text-slate-700">
                Le but est d'aider l'élève à savoir quoi faire aujourd'hui :
                revoir une notion, lancer une session ou suivre son plan.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: Calculator, title: "Fractions et calcul", text: "Reprendre les bases qui bloquent souvent les autres chapitres." },
                { icon: ListChecks, title: "Équations", text: "S'entraîner à isoler l'inconnue et à mettre un problème en équation." },
                { icon: Shapes, title: "Géométrie", text: "Pythagore, Thalès, figures, longueurs, aires et transformations." },
                { icon: Compass, title: "Fonctions", text: "Lire une image, un antécédent et interpréter une situation." },
              ].map((item) => (
                <article key={item.title} className="rounded-2xl bg-slate-50 p-5">
                  <item.icon className="h-6 w-6 text-blue-800" />
                  <h3 className="mt-3 text-lg font-bold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-700">{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-950">
              Chapitres prioritaires
            </h2>
            <p className="mt-3 max-w-3xl text-slate-700">
              Les priorités fortes aident à choisir les notions qui reviennent
              souvent et qui servent aussi de base au reste du programme.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {priorityTopics.map((topic) => (
                <Link
                  key={topic.id}
                  href="/programme-maths-brevet"
                  className="rounded-xl border border-slate-200 p-4 hover:border-blue-200 hover:bg-blue-50"
                >
                  <h3 className="font-bold text-slate-950">{topic.label}</h3>
                  <p className="mt-1 text-sm text-slate-700">{topic.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: TimerReset,
                title: "Exercices courts",
                text: "Des sessions rapides pour travailler sans saturer et garder un rythme régulier.",
              },
              {
                icon: ListChecks,
                title: "Plan de révision",
                text: "Un cadre simple pour répartir les chapitres importants avant le brevet.",
              },
              {
                icon: LineChart,
                title: "Progression par chapitre",
                text: "Les résultats des sessions aident à repérer les notions à retravailler.",
              },
            ].map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 p-6">
                <item.icon className="h-7 w-7 text-blue-800" />
                <h2 className="mt-4 text-xl font-bold text-slate-950">{item.title}</h2>
                <p className="mt-2 text-slate-700">{item.text}</p>
              </article>
            ))}
          </section>

          <SeoCta
            title="Démarrer les révisions du brevet"
            description="Le diagnostic gratuit aide à repérer les chapitres à traiter en priorité avant de lancer les sessions."
          />
          <SeoFaq items={faqItems} />
          <InternalLinks currentPath={pagePath} />
        </div>
      </section>
    </SeoPageLayout>
  );
}
