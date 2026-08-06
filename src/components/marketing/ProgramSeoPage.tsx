import Link from "next/link";
import { BookOpen, Flag, Target } from "lucide-react";
import { getProgram, ProgramGoal } from "@/data/programs";
import { InternalLinks } from "@/components/marketing/InternalLinks";
import { SeoCta } from "@/components/marketing/SeoCta";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { TrackedLink } from "@/components/tracking/TrackedLink";

const priorityLabels = {
  high: "Priorité forte",
  medium: "Priorité moyenne",
  low: "À revoir ensuite",
} as const;

const levelPages: Record<ProgramGoal, string> = {
  terminale: "/bac-terminale-maths",
  "bac-premiere": "/bac-premiere-maths",
  brevet: "/brevet-maths",
};

const pagePaths: Record<ProgramGoal, string> = {
  terminale: "/programme-maths-terminale",
  "bac-premiere": "/programme-maths-premiere",
  brevet: "/programme-maths-brevet",
};

const terminaleProgramClusterLinks: Partial<
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
    href: "/programme-maths-terminale/suites",
    eventName: "click_internal_suites_cluster",
    cluster: "suites",
  },
  limites: {
    href: "/programme-maths-terminale/limites",
    eventName: "click_internal_limites_cluster",
    cluster: "limites",
  },
  derivation: {
    href: "/programme-maths-terminale/derivation-convexite",
    eventName: "click_internal_derivation_cluster",
    cluster: "derivation-convexite",
  },
  convexite: {
    href: "/programme-maths-terminale/derivation-convexite",
    eventName: "click_internal_derivation_cluster",
    cluster: "derivation-convexite",
  },
  logarithme: {
    href: "/programme-maths-terminale/fonction-logarithme",
    eventName: "click_internal_logarithme_cluster",
    cluster: "logarithme",
  },
  integrales: {
    href: "/programme-maths-terminale/integrales",
    eventName: "click_internal_integrales_cluster",
    cluster: "integrales",
  },
  probabilites: {
    href: "/programme-maths-terminale/probabilites",
    eventName: "click_internal_probabilites_cluster",
    cluster: "probabilites",
  },
  "loi-binomiale": {
    href: "/programme-maths-terminale/probabilites",
    eventName: "click_internal_probabilites_cluster",
    cluster: "probabilites",
  },
  "variables-aleatoires": {
    href: "/programme-maths-terminale/probabilites",
    eventName: "click_internal_probabilites_cluster",
    cluster: "probabilites",
  },
  "geometrie-espace": {
    href: "/programme-maths-terminale/geometrie-espace",
    eventName: "click_internal_geometrie_cluster",
    cluster: "geometrie-espace",
  },
  "vecteurs-droites-plans": {
    href: "/programme-maths-terminale/geometrie-espace",
    eventName: "click_internal_geometrie_cluster",
    cluster: "geometrie-espace",
  },
};

type ProgramSeoPageProps = {
  goal: ProgramGoal;
  h1: string;
  intro: string;
};

export function ProgramSeoPage({ goal, h1, intro }: ProgramSeoPageProps) {
  const program = getProgram(goal);
  const pagePath = pagePaths[goal];
  const isTerminale = goal === "terminale";

  if (!program) {
    return null;
  }

  return (
    <SeoPageLayout urgencySourcePage={pagePath}>
      <section className="bg-slate-50 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-900">
            Les grands chapitres travaillés dans SprintMaths
          </p>
          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl">
            {h1}
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-slate-700">{intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TrackedLink
              href={isTerminale ? "/planning-revision-bac-maths" : "/diagnostic"}
              eventName={isTerminale ? "click_lead_magnet_planning" : "click_diagnostic"}
              eventParams={{
                source_page: pagePath,
                ...(isTerminale
                  ? {
                      lead_magnet: "planning_bac_maths_2027",
                      level: "terminale",
                    }
                  : {}),
                cta_location: "program_hero_primary",
              }}
              className="rounded-full bg-blue-900 px-6 py-3 text-center font-bold text-white hover:bg-blue-800"
            >
              {isTerminale
                ? "Recevoir le planning Bac Maths 2027"
                : "Faire le diagnostic gratuit"}
            </TrackedLink>
            {isTerminale ? (
              <TrackedLink
                href="/exercices-type-bac-maths-terminale"
                eventName="click_exercises"
                eventParams={{
                  source_page: pagePath,
                  level: "terminale",
                  cta_location: "program_hero_typebac",
                }}
                className="rounded-full border border-blue-900 px-6 py-3 text-center font-bold text-blue-900 hover:bg-blue-50"
              >
                Essayer un exercice type bac guidé
              </TrackedLink>
            ) : (
              <Link
                href={levelPages[goal]}
                className="rounded-full border border-blue-900 px-6 py-3 text-center font-bold text-blue-900 hover:bg-blue-50"
              >
                Voir la page niveau
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-5xl space-y-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-950">{program.title}</h2>
            <p className="mt-3 text-slate-700">{program.subtitle}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {program.topics.map((topic, index) => {
              const clusterLink = isTerminale
                ? terminaleProgramClusterLinks[topic.id]
                : undefined;

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
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-200 hover:bg-blue-50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-slate-400">
                        Chapitre {(index + 1).toString().padStart(2, "0")}
                      </p>
                      <h3 className="mt-1 text-xl font-bold text-slate-950">
                        {topic.label}
                      </h3>
                    </div>
                    <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700">
                      {priorityLabels[topic.priority]}
                    </span>
                  </div>
                  <p className="mt-3 text-slate-700">{topic.description}</p>
                </TrackedLink>
              ) : (
                <article
                  key={topic.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-slate-400">
                        Chapitre {(index + 1).toString().padStart(2, "0")}
                      </p>
                      <h3 className="mt-1 text-xl font-bold text-slate-950">
                        {topic.label}
                      </h3>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        topic.priority === "high"
                          ? "bg-red-50 text-red-700"
                          : topic.priority === "medium"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {priorityLabels[topic.priority]}
                    </span>
                  </div>
                  <p className="mt-3 text-slate-700">{topic.description}</p>
                </article>
              );
            })}
          </div>

          {isTerminale ? (
            <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-slate-950">
                Ressources pour utiliser le programme
              </h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <Link
                  href="/formules-bac-maths-terminale"
                  className="rounded-xl border border-blue-100 bg-white p-5 hover:border-blue-300"
                >
                  <h3 className="text-lg font-bold text-blue-950">
                    Retrouver les formules par chapitre
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Une fiche imprimable avec les hypothèses et les erreurs
                    fréquentes.
                  </p>
                </Link>
                <Link
                  href="/preparer-entree-terminale-specialite-maths"
                  className="rounded-xl border border-blue-100 bg-white p-5 hover:border-blue-300"
                >
                  <h3 className="text-lg font-bold text-blue-950">
                    Préparer l&apos;entrée en Terminale
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Les prérequis de Première à revoir avant septembre, sans
                    commencer un planning Bac.
                  </p>
                </Link>
                <Link
                  href="/python-bac-maths-terminale"
                  className="rounded-xl border border-blue-100 bg-white p-5 hover:border-blue-300"
                >
                  <h3 className="text-lg font-bold text-blue-950">
                    Comprendre les programmes Python
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Suites, seuils, sommes, dichotomie et simulations expliqués ligne par ligne.
                  </p>
                </Link>
                <Link
                  href="/equations-differentielles-terminale"
                  className="rounded-xl border border-blue-100 bg-white p-5 hover:border-blue-300"
                >
                  <h3 className="text-lg font-bold text-blue-950">
                    Résoudre les équations différentielles
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Méthode, conditions initiales et quatre exercices corrigés progressifs.
                  </p>
                </Link>
                <Link
                  href="/quiz-maths-terminale-specialite"
                  className="rounded-xl border border-blue-100 bg-white p-5 hover:border-blue-300"
                >
                  <h3 className="text-lg font-bold text-blue-950">
                    Tester les neuf grands thèmes
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Un quiz local de vingt questions avec explications et ressources associées.
                  </p>
                </Link>
              </div>
            </section>
          ) : null}

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: BookOpen,
                title: "Réviser dans l'ordre",
                text: "Les chapitres sont présentés pour aider l'élève à visualiser ce qui doit être travaillé.",
              },
              {
                icon: Target,
                title: "Prioriser les efforts",
                text: "Les priorités signalent les notions à consolider en premier quand le temps manque.",
              },
              {
                icon: Flag,
                title: "Construire un plan",
                text: "Le diagnostic et le plan de révision aident à transformer la liste des chapitres en actions concrètes.",
              },
            ].map((item) => (
              <article key={item.title} className="rounded-2xl bg-slate-50 p-5">
                <item.icon className="h-6 w-6 text-blue-800" />
                <h3 className="mt-3 font-bold text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-700">{item.text}</p>
              </article>
            ))}
          </div>

          <SeoCta
            title="Transformer ce programme en plan de révision"
            description={
              isTerminale
                ? "Le planning gratuit donne un ordre de travail pour les chapitres de Terminale, avant de passer aux exercices type bac guidés."
                : "Le diagnostic gratuit aide à choisir les chapitres à travailler en priorité selon l'objectif et le niveau ressenti."
            }
            sourcePage={pagePath}
            primaryCta={
              isTerminale
                ? {
                    href: "/planning-revision-bac-maths",
                    label: "Recevoir le planning Bac Maths 2027",
                    eventName: "click_lead_magnet_planning",
                    eventParams: {
                      source_page: pagePath,
                      lead_magnet: "planning_bac_maths_2027",
                      level: "terminale",
                      cta_location: "program_seo_cta_planning",
                    },
                  }
                : undefined
            }
            secondaryCta={
              isTerminale
                ? {
                    href: "/exercices-type-bac-maths-terminale",
                    label: "Essayer un exercice type bac guidé",
                    eventName: "click_exercises",
                    eventParams: {
                      source_page: pagePath,
                      level: "terminale",
                      cta_location: "program_seo_cta_typebac",
                    },
                    variant: "outline",
                  }
                : undefined
            }
          />
          <InternalLinks currentPath={pagePath} />
        </div>
      </section>
    </SeoPageLayout>
  );
}
