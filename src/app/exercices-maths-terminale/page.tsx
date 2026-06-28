import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  ClipboardList,
  GraduationCap,
  LineChart,
  PlayCircle,
} from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { InternalLinks } from "@/components/marketing/InternalLinks";
import { SeoCta } from "@/components/marketing/SeoCta";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import { guidedExercises } from "@/data/guidedExercises";
import { getProgram } from "@/data/programs";
import { getAvailableTopics } from "@/data/questions";
import { absoluteUrl } from "@/lib/site";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/seo";

const pagePath = "/exercices-maths-terminale";
const subjectsTypeBacPath = "/sujets-type-bac-maths-terminale";

const description =
  "Découvre les exercices de maths Terminale dans SprintMaths : exercices guidés type bac, sessions par chapitre et progression sans afficher toute la base de réponses.";

const terminaleExerciseClusterLinks: Partial<
  Record<
    string,
    {
      href: string;
      eventName:
        | "click_internal_suites_cluster"
        | "click_internal_limites_cluster"
        | "click_internal_derivation_cluster"
        | "click_internal_logarithme_cluster"
        | "click_internal_integrales_cluster"
        | "click_internal_probabilites_cluster"
        | "click_internal_geometrie_cluster";
      cluster:
        | "suites"
        | "limites"
        | "derivation-convexite"
        | "logarithme"
        | "integrales"
        | "probabilites"
        | "geometrie-espace";
    }
  >
> = {
  suites: {
    href: "/exercices-maths-terminale/suites",
    eventName: "click_internal_suites_cluster",
    cluster: "suites",
  },
  limites: {
    href: "/exercices-maths-terminale/limites",
    eventName: "click_internal_limites_cluster",
    cluster: "limites",
  },
  derivation: {
    href: "/exercices-maths-terminale/derivation",
    eventName: "click_internal_derivation_cluster",
    cluster: "derivation-convexite",
  },
  convexite: {
    href: "/exercices-maths-terminale/derivation",
    eventName: "click_internal_derivation_cluster",
    cluster: "derivation-convexite",
  },
  logarithme: {
    href: "/exercices-maths-terminale/logarithme",
    eventName: "click_internal_logarithme_cluster",
    cluster: "logarithme",
  },
  integrales: {
    href: "/exercices-maths-terminale/integrales",
    eventName: "click_internal_integrales_cluster",
    cluster: "integrales",
  },
  probabilites: {
    href: "/exercices-maths-terminale/probabilites",
    eventName: "click_internal_probabilites_cluster",
    cluster: "probabilites",
  },
  "loi-binomiale": {
    href: "/exercices-maths-terminale/probabilites",
    eventName: "click_internal_probabilites_cluster",
    cluster: "probabilites",
  },
  "variables-aleatoires": {
    href: "/exercices-maths-terminale/probabilites",
    eventName: "click_internal_probabilites_cluster",
    cluster: "probabilites",
  },
  "geometrie-espace": {
    href: "/exercices-maths-terminale/geometrie-espace",
    eventName: "click_internal_geometrie_cluster",
    cluster: "geometrie-espace",
  },
  "vecteurs-droites-plans": {
    href: "/exercices-maths-terminale/geometrie-espace",
    eventName: "click_internal_geometrie_cluster",
    cluster: "geometrie-espace",
  },
};

export const metadata: Metadata = {
  title: {
    absolute:
      "Exercices maths Terminale | Guidés type bac & chapitres — SprintMaths",
  },
  description,
  alternates: {
    canonical: absoluteUrl(pagePath),
  },
  openGraph: {
    title: "Exercices maths Terminale | Guidés type bac & chapitres — SprintMaths",
    description,
    url: absoluteUrl(pagePath),
    type: "website",
  },
};

export default function ExercicesMathsTerminalePage() {
  const program = getProgram("terminale");
  const availableTopics = getAvailableTopics("terminale");
  const topicCount = new Map(
    availableTopics.map((topic) => [topic.topic, topic.count] as const)
  );
  const terminaleGuidedExercises = guidedExercises.filter(
    (exercise) => exercise.examGoal === "terminale"
  );

  return (
    <SeoPageLayout urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          productJsonLd(pagePath),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Bac Terminale maths", path: "/bac-terminale-maths" },
            { name: "Exercices maths Terminale", path: pagePath },
          ]),
        ]}
      />
      <section className="bg-slate-50 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-900">
            Exercices maths Terminale
          </p>
          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl">
            Exercices de maths Terminale avec guidage et progression
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-slate-700">
            SprintMaths propose des sessions par chapitre et des exercices guidés
            type bac pour travailler les méthodes sans donner toute la base de
            réponses en accès libre. L&apos;objectif est d&apos;aider l&apos;élève à pratiquer,
            pas seulement à lire une correction.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TrackedLink
              href="/exercices-type-bac-maths-terminale"
              eventName="click_exercises"
              eventParams={{
                source_page: pagePath,
                level: "terminale",
                cta_location: "exercises_hero_typebac",
              }}
              className="rounded-full bg-blue-900 px-6 py-3 text-center font-bold text-white hover:bg-blue-800"
            >
              Essayer un exercice type bac guidé
            </TrackedLink>
            <TrackedLink
              href="/planning-revision-bac-maths"
              eventName="click_lead_magnet_planning"
              eventParams={{
                source_page: pagePath,
                lead_magnet: "planning_bac_maths_2027",
                level: "terminale",
                cta_location: "exercises_hero_planning",
              }}
              className="rounded-full border border-blue-900 px-6 py-3 text-center font-bold text-blue-900 hover:bg-blue-50"
            >
              Recevoir le planning Bac Maths 2027
            </TrackedLink>
          </div>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-14">
          <section className="grid gap-5 md:grid-cols-4">
            {[
              {
                icon: GraduationCap,
                title: "Type bac",
                text: "Des exercices guidés en plusieurs étapes pour apprendre à tenir le raisonnement.",
              },
              {
                icon: ClipboardList,
                title: "Par chapitre",
                text: "Des sessions ciblées pour isoler une notion et la retravailler.",
              },
              {
                icon: LineChart,
                title: "Progression",
                text: "Un suivi local aide à voir les scores et les chapitres fragiles.",
              },
              {
                icon: BookOpenCheck,
                title: "Corrections",
                text: "Les explications restent dans l'espace produit pour favoriser l'entraînement.",
              },
            ].map((item) => (
              <article key={item.title} className="rounded-2xl bg-slate-50 p-5">
                <item.icon className="h-6 w-6 text-blue-800" />
                <h2 className="mt-3 text-lg font-bold text-slate-950">{item.title}</h2>
                <p className="mt-2 text-sm text-slate-700">{item.text}</p>
              </article>
            ))}
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-950">
              Chapitres Terminale disponibles
            </h2>
            <p className="mt-3 max-w-3xl text-slate-700">
              Les sessions Terminale s&apos;appuient sur les chapitres structurés du
              programme SprintMaths, avec un nombre d&apos;exercices adapté à chaque
              notion.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {program?.topics.map((topic) => {
                const clusterLink = terminaleExerciseClusterLinks[topic.id];

                return clusterLink ? (
                  <TrackedLink
                    key={topic.id}
                    href={clusterLink.href}
                    eventName={clusterLink.eventName}
                    eventParams={{
                      source_page: pagePath,
                      destination_page: clusterLink.href,
                      cluster: clusterLink.cluster,
                      level: "terminale",
                    }}
                    className="rounded-xl border border-slate-200 p-4 hover:border-blue-200 hover:bg-blue-50"
                  >
                    <h3 className="font-bold text-slate-950">{topic.label}</h3>
                    <p className="mt-2 text-sm text-slate-600">
                      {topicCount.get(topic.id) || 0} exercices courts
                    </p>
                  </TrackedLink>
                ) : (
                  <Link
                    key={topic.id}
                    href="/programme-maths-terminale"
                    className="rounded-xl border border-slate-200 p-4 hover:border-blue-200 hover:bg-blue-50"
                  >
                    <h3 className="font-bold text-slate-950">{topic.label}</h3>
                    <p className="mt-2 text-sm text-slate-600">
                      {topicCount.get(topic.id) || 0} exercices courts
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>

          <section>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-bold text-slate-950">
                  Exercices guidés type bac
                </h2>
                <p className="mt-3 max-w-3xl text-slate-700">
                  Chaque exercice guidé affiche une situation, puis accompagne
                  l&apos;élève étape par étape. Voici les types d&apos;entraînements
                  disponibles, sans publier les réponses complètes.
                </p>
              </div>
              <Link
                href="/bac-terminale-maths"
                className="font-bold text-blue-900 hover:underline"
              >
                Parcours Terminale
              </Link>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {terminaleGuidedExercises.map((exercise) => (
                <article
                  key={exercise.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center gap-2 text-sm font-bold text-blue-800">
                    <PlayCircle className="h-4 w-4" />
                    {exercise.topicLabel}
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-slate-950">
                    {exercise.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-700">{exercise.subtitle}</p>
                  <p className="mt-4 text-xs font-semibold text-slate-500">
                    {exercise.steps.length} étapes, difficulté{" "}
                    {exercise.difficulty === "hard" ? "élevée" : "intermédiaire"}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-blue-950 p-6 text-white sm:p-8">
            <h2 className="text-3xl font-bold">Exemples de travail, sans tout dévoiler</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                "Étudier une suite définie par récurrence.",
                "Lever une forme indéterminée avec une factorisation.",
                "Utiliser une loi binomiale et interpréter une espérance.",
              ].map((example) => (
                <div key={example} className="rounded-xl bg-white/10 p-4 text-blue-50">
                  {example}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
                  Sujets type bac
                </p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950">
                  Passer des exercices ciblés aux sujets type bac corrigés
                </h2>
                <p className="mt-4 max-w-3xl leading-7 text-slate-700">
                  Une fois les chapitres retravaillés, l&apos;élève peut enchaîner
                  plusieurs raisonnements dans des sujets type bac maths Terminale
                  avec corrigé guidé.
                </p>
              </div>
              <TrackedLink
                href={subjectsTypeBacPath}
                eventName="click_internal_subjects_typebac"
                eventParams={{
                  source_page: pagePath,
                  destination_page: subjectsTypeBacPath,
                  level: "terminale",
                  intent: "sujets_type_bac",
                  cta_location: "exercises_subjects_typebac_block",
                }}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-900 px-5 py-3 text-center font-bold text-white hover:bg-blue-800"
              >
                Explorer les sujets type bac corrigés
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </div>
          </section>

          <SeoCta
            title="Lancer un entraînement Terminale structuré"
            description="Commence par un exercice type bac guidé pour travailler le raisonnement, puis organise la suite avec le planning gratuit."
            sourcePage={pagePath}
            primaryCta={{
              href: "/exercices-type-bac-maths-terminale",
              label: "Essayer un exercice type bac guidé",
              eventName: "click_exercises",
              eventParams: {
                source_page: pagePath,
                level: "terminale",
                cta_location: "exercises_seo_cta_typebac",
              },
            }}
            secondaryCta={{
              href: "/planning-revision-bac-maths",
              label: "Recevoir le planning Bac Maths 2027",
              eventName: "click_lead_magnet_planning",
              eventParams: {
                source_page: pagePath,
                lead_magnet: "planning_bac_maths_2027",
                level: "terminale",
                cta_location: "exercises_seo_cta_planning",
              },
              variant: "outline",
            }}
          />
          <InternalLinks currentPath={pagePath} />
        </div>
      </section>
    </SeoPageLayout>
  );
}
