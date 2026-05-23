import type { Metadata } from "next";
import Link from "next/link";
import { Award, BookOpen, CalendarCheck, FileText, GraduationCap, LineChart, PenTool, Target } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { GuaranteeNote } from "@/components/marketing/GuaranteeNote";
import { InternalLinks } from "@/components/marketing/InternalLinks";
import { SeoCta } from "@/components/marketing/SeoCta";
import { SeoFaq } from "@/components/marketing/SeoFaq";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import { guidedExercises } from "@/data/guidedExercises";
import { mockBacSubjects } from "@/data/mockBacSubjects";
import { getProgram } from "@/data/programs";
import { methods } from "@/data/methods";
import { PACK_REVISION_EXPRESS_PRICE } from "@/lib/offers";
import { absoluteUrl, TERMINALE_CONVERSION_TAGLINE } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd, productJsonLd, type FaqItem } from "@/lib/seo";

const pagePath = "/bac-terminale-maths";

const description =
  "Prépare le bac de maths Terminale avec des exercices guidés type bac, des méthodes, un plan de révision et une progression par chapitre.";

export const metadata: Metadata = {
  title: {
    absolute:
      "Réviser le bac de maths Terminale | Exercices guidés & méthodes — SprintMaths",
  },
  description,
  alternates: {
    canonical: absoluteUrl(pagePath),
  },
  openGraph: {
    title:
      "Réviser le bac de maths Terminale | Exercices guidés & méthodes — SprintMaths",
    description,
    url: absoluteUrl(pagePath),
    type: "website",
  },
};

const faqItems: FaqItem[] = [
  {
    question: "SprintMaths remplace-t-il les cours de maths en Terminale ?",
    answer:
      "Non. SprintMaths sert surtout à structurer les révisions, travailler les chapitres prioritaires et répéter les méthodes avec des exercices courts ou guidés.",
  },
  {
    question: "Les exercices guidés sont-ils adaptés au bac de maths Terminale ?",
    answer:
      "Ils reprennent l'esprit des exercices attendus en Terminale : plusieurs étapes, choix de méthode, calculs intermédiaires et correction immédiate.",
  },
  {
    question: "Peut-on utiliser SprintMaths si le bac approche ?",
    answer:
      "Oui. Le diagnostic, les priorités par chapitre et les plans de révision 7 ou 14 jours aident à organiser les dernières semaines sans tout reprendre au hasard.",
  },
];

export default function BacTerminaleMathsPage() {
  const terminaleProgram = getProgram("terminale");
  const terminaleMethods = methods.filter((method) => method.examGoal === "terminale");
  const terminaleExercises = guidedExercises.filter(
    (exercise) => exercise.examGoal === "terminale"
  );

  return (
    <SeoPageLayout urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          productJsonLd(pagePath),
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Bac Terminale maths", path: pagePath },
          ]),
        ]}
      />
      <section className="bg-gradient-to-b from-blue-50 to-white px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-4xl">
            <p className="mb-4 inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-900">
              Bac de maths Terminale
            </p>
            <h1 className="text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl">
              {TERMINALE_CONVERSION_TAGLINE}
            </h1>
            <p className="mt-5 max-w-3xl text-lg text-slate-700">
              En Terminale, il ne suffit pas d&apos;enchaîner des réponses rapides.
              SprintMaths aide l&apos;élève à revoir le programme par chapitre, à
              travailler les méthodes et à suivre une progression claire jusqu&apos;à
              l&apos;examen.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href="/diagnostic"
                eventName="click_diagnostic"
                eventParams={{
                  source_page: pagePath,
                  cta_location: "terminale_hero_primary",
                }}
                className="rounded-full bg-blue-900 px-6 py-3 text-center font-bold text-white hover:bg-blue-800"
              >
                Faire le diagnostic gratuit
              </TrackedLink>
              <TrackedLink
                href="/planning-revision-bac-maths"
                eventName="click_lead_magnet_planning"
                eventParams={{
                  source_page: pagePath,
                  lead_magnet: "planning_bac_maths_2027",
                  level: "terminale",
                  cta_location: "terminale_hero_planning",
                }}
                className="rounded-full border border-blue-900 px-6 py-3 text-center font-bold text-blue-900 hover:bg-blue-50"
              >
                Recevoir le planning Bac Maths 2027
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-14">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Target,
                title: "Chapitres prioritaires",
                text: "Suites, limites, dérivation, exponentielle, logarithme, probabilités, intégrales et géométrie dans l'espace.",
              },
              {
                icon: PenTool,
                title: "Méthodes Terminale",
                text: "Des étapes de résolution pour savoir comment démarrer et éviter les erreurs fréquentes.",
              },
              {
                icon: LineChart,
                title: "Progression visible",
                text: "Les sessions par chapitre aident l'élève à voir ce qui avance et ce qui doit être renforcé.",
              },
            ].map((item) => (
              <article key={item.title} className="rounded-2xl bg-slate-50 p-6">
                <item.icon className="h-7 w-7 text-blue-800" />
                <h2 className="mt-4 text-xl font-bold text-slate-950">{item.title}</h2>
                <p className="mt-2 text-slate-700">{item.text}</p>
              </article>
            ))}
          </div>

          <section className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-start">
            <div>
              <h2 className="text-3xl font-bold text-slate-950">
                Pourquoi les QCM seuls ne suffisent pas en Terminale
              </h2>
              <div className="mt-5 space-y-4 text-slate-700">
                <p>
                  Le bac de maths demande de tenir un raisonnement, de choisir
                  une méthode et d&apos;enchaîner plusieurs étapes. Un QCM peut aider
                  à vérifier un automatisme, mais il ne prépare pas toujours à
                  l&apos;effort de rédaction et de stratégie.
                </p>
                <p>
                  SprintMaths combine donc des questions courtes, des exercices
                  guidés type bac, des fiches méthodes et un plan de révision.
                  L&apos;objectif est simple : donner à l&apos;élève un cadre de travail
                  sérieux sans promettre de résultat automatique.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-950">
                Ce que SprintMaths propose pour Terminale
              </h3>
              <ul className="mt-4 space-y-3 text-slate-700">
                {[
                  "Des exercices guidés type bac en plusieurs étapes.",
                  "Des fiches méthodes Terminale claires et actionnables.",
                  "Des sujets guidés avec note indicative /20.",
                  "Un programme par chapitre avec priorités.",
                  "Un plan de révision 7 ou 14 jours.",
                  "Un suivi de progression par session et par chapitre.",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[0.9fr_1fr] lg:items-start">
            <div className="rounded-2xl bg-indigo-950 p-6 text-white">
              <Award className="h-7 w-7 text-indigo-200" />
              <h2 className="mt-4 text-3xl font-bold">
                Note indicative /20
              </h2>
              <p className="mt-4 text-indigo-100">
                Le mode Bac Terminale permet de s’entraîner sur des sujets guidés et d’obtenir une note indicative /20. Cette note sert à identifier les chapitres à retravailler, sans remplacer une vraie correction de professeur ni prédire une note au bac.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-950">
                Sujets type bac guidés
              </h2>
              <p className="mt-3 text-slate-700">
                Chaque sujet regroupe quatre exercices guidés pour travailler plusieurs réflexes dans une même séance : méthodes, calculs intermédiaires et correction étape par étape.
              </p>
              <div className="mt-5 grid gap-3">
                {mockBacSubjects.map((subject) => (
                  <article key={subject.id} className="rounded-xl border border-slate-200 bg-white p-4">
                    <div className="flex items-start gap-3">
                      <FileText className="mt-1 h-5 w-5 shrink-0 text-blue-800" />
                      <div>
                        <h3 className="font-bold text-slate-950">{subject.title}</h3>
                        <p className="mt-1 text-sm text-slate-700">{subject.description}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-bold text-slate-950">
                  Exercices guidés type bac
                </h2>
                <p className="mt-3 max-w-3xl text-slate-700">
                  Les exercices guidés découpent le raisonnement en étapes :
                  comprendre la question, choisir l&apos;outil, calculer, puis
                  conclure proprement.
                </p>
              </div>
              <TrackedLink
                href="/exercices-type-bac-maths-terminale"
                eventName="click_exercises"
                eventParams={{
                  source_page: pagePath,
                  level: "terminale",
                  cta_location: "terminale_typebac_section",
                }}
                className="font-bold text-blue-900 hover:underline"
              >
                Essayer un exercice type bac guidé
              </TrackedLink>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {terminaleExercises.slice(0, 6).map((exercise) => (
                <article
                  key={exercise.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <p className="text-sm font-bold text-blue-800">{exercise.topicLabel}</p>
                  <h3 className="mt-2 text-lg font-bold text-slate-950">
                    {exercise.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-700">{exercise.subtitle}</p>
                  <p className="mt-4 text-xs font-semibold text-slate-500">
                    {exercise.steps.length} étapes guidées, environ{" "}
                    {exercise.estimatedMinutes} min
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-slate-950">
                Méthodes Terminale
              </h2>
              <p className="mt-3 text-slate-700">
                Les fiches méthodes aident l&apos;élève à revoir les réflexes de
                résolution : dériver, étudier un signe, lever une forme
                indéterminée, utiliser une loi binomiale ou calculer une
                intégrale.
              </p>
              <Link
                href="/methodes-maths-terminale"
                className="mt-5 inline-block font-bold text-blue-900 hover:underline"
              >
                Consulter les fiches méthodes
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {terminaleMethods.slice(0, 8).map((method) => (
                <div key={method.id} className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase text-slate-500">
                    {method.topic}
                  </p>
                  <h3 className="mt-1 font-bold text-slate-950">{method.title}</h3>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-950">
              Chapitres travaillés
            </h2>
            <p className="mt-3 max-w-3xl text-slate-700">
              SprintMaths s&apos;appuie sur les grands chapitres de Terminale pour
              organiser les sessions et les priorités de révision.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {terminaleProgram?.topics.slice(0, 12).map((topic) => (
                <Link
                  key={topic.id}
                  href="/programme-maths-terminale"
                  className="rounded-xl border border-slate-200 p-4 text-sm font-semibold text-slate-700 hover:border-blue-200 hover:text-blue-900"
                >
                  {topic.label}
                </Link>
              ))}
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: CalendarCheck,
                title: "Plan de révision",
                text: "Un cadre sur 7 ou 14 jours pour éviter les révisions dispersées.",
              },
              {
                icon: GraduationCap,
                title: "Pour qui est-ce utile ?",
                text: "Pour un élève de Terminale qui veut revoir les méthodes, cibler ses lacunes et travailler régulièrement.",
              },
              {
                icon: BookOpen,
                title: "Prix du Pack Révision Express",
                text: `${PACK_REVISION_EXPRESS_PRICE} € en paiement unique, sans abonnement.`,
              },
            ].map((item) => (
              <article key={item.title} className="rounded-2xl bg-blue-950 p-6 text-white">
                <item.icon className="h-7 w-7 text-blue-200" />
                <h2 className="mt-4 text-xl font-bold">{item.title}</h2>
                <p className="mt-2 text-blue-100">{item.text}</p>
              </article>
            ))}
          </section>

          <SeoCta
            title="Préparer Terminale avec un parcours concret"
            description="Le diagnostic gratuit aide à choisir les bons chapitres avant de lancer un plan de révision et des sessions ciblées."
            sourcePage={pagePath}
            secondaryCta={{
              href: "/planning-revision-bac-maths",
              label: "Recevoir le planning Bac Maths 2027",
              eventName: "click_lead_magnet_planning",
              eventParams: {
                source_page: pagePath,
                lead_magnet: "planning_bac_maths_2027",
                level: "terminale",
                cta_location: "terminale_seo_cta_planning",
              },
              variant: "outline",
            }}
          />
          <GuaranteeNote sourcePage={pagePath} />
          <SeoFaq items={faqItems} />
          <InternalLinks currentPath={pagePath} />
        </div>
      </section>
    </SeoPageLayout>
  );
}
