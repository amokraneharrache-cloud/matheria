import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  ListChecks,
  PlayCircle,
  Sigma,
  Target,
} from "lucide-react";
import {
  ChapterHero,
  ChapterInternalLinks,
} from "@/components/marketing/ChapterSeoPage";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/seo";

const pagePath = "/methodes-maths-terminale/probabilites-conditionnelles";

const title = "Méthode probabilités conditionnelles en Terminale";
const description =
  "Méthode simple pour réussir les probabilités conditionnelles en Terminale : événements, arbres pondérés, intersections, formule des probabilités totales et loi binomiale.";

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: absoluteUrl(pagePath),
  },
  openGraph: {
    title,
    description,
    url: absoluteUrl(pagePath),
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const methodEventParams = {
  chapter: "probabilites",
  level: "terminale",
  source_page: pagePath,
};

const fiveSteps = [
  "Nommer les événements clairement.",
  "Distinguer P(A), P_A(B), P(A ∩ B).",
  "Placer les probabilités sur un arbre.",
  "Multiplier les branches pour une intersection.",
  "Additionner plusieurs chemins si nécessaire.",
];

const probabilityNotations = [
  {
    title: "P(A)",
    text: "Probabilité que l'événement A se réalise dans toute la population.",
  },
  {
    title: "P_A(B)",
    text: "Probabilité que B se réalise sachant que A est déjà réalisé.",
  },
  {
    title: "P(A ∩ B)",
    text: "Probabilité que A et B se réalisent en même temps.",
  },
];

const commonMistakes = [
  "Confondre P(A ∩ B) et P_A(B).",
  "Oublier de multiplier les branches.",
  "Additionner des probabilités qui ne correspondent pas à des chemins différents.",
  "Oublier le complémentaire.",
  "Ne pas définir les événements.",
];

const faqItems: FaqItem[] = [
  {
    question: "Quelle est la différence entre P(A ∩ B) et P_A(B) ?",
    answer:
      "P(A ∩ B) est la probabilité que A et B arrivent ensemble. P_A(B) est une probabilité conditionnelle : elle mesure la probabilité de B une fois que A est déjà réalisé. La relation utile est P(A ∩ B) = P(A) × P_A(B).",
  },
  {
    question: "Comment construire un arbre pondéré ?",
    answer:
      "On commence par les événements de départ, puis on ajoute les issues conditionnelles sur les branches suivantes. Sur chaque paire de branches complémentaires, les probabilités doivent faire 1. Un arbre pondéré sert surtout à ranger les données avant de calculer.",
  },
  {
    question: "Quand multiplier les probabilités ?",
    answer:
      "On multiplie quand on suit un seul chemin dans l'arbre. Par exemple, le chemin A puis B donne P(A ∩ B) = P(A) × P_A(B).",
  },
  {
    question: "Quand additionner les chemins ?",
    answer:
      "On additionne quand plusieurs chemins différents mènent au même événement final. Chaque chemin doit d'abord être calculé par une multiplication, puis seulement ensuite on additionne.",
  },
  {
    question: "Comment utiliser la formule des probabilités totales ?",
    answer:
      "On découpe l'événement demandé selon des cas incompatibles qui couvrent toute la situation. Par exemple, P(R) = P(A ∩ R) + P(non A ∩ R).",
  },
  {
    question: "Que faire si je bloque sur un exercice de probabilités ?",
    answer:
      "Reviens aux événements : nomme-les, écris les données sous forme P(A), P_A(B) ou P(A ∩ B), puis dessine l'arbre. Si le blocage reste flou, commence par un exercice guidé ou par le diagnostic gratuit pour repérer l'étape à retravailler.",
  },
];

const internalLinks = [
  {
    href: "/programme-maths-terminale/probabilites",
    label: "Programme Probabilités Terminale",
  },
  {
    href: "/exercices-maths-terminale/probabilites",
    label: "Exercices Probabilités Terminale",
  },
  {
    href: "/exercices-type-bac-maths-terminale",
    label: "Exercices type bac Terminale",
  },
  {
    href: "/sujets-type-bac-maths-terminale",
    label: "Sujets type bac corrigés Terminale",
  },
  {
    href: "/methodes-maths-terminale",
    label: "Toutes les méthodes Terminale",
  },
  {
    href: "/programme-maths-terminale/derivation-convexite",
    label: "Programme Dérivation et convexité",
  },
  {
    href: "/programme-maths-terminale/fonction-logarithme",
    label: "Programme Fonction logarithme",
  },
  { href: "/bac-maths-2027", label: "Bac Maths 2027" },
  { href: "/diagnostic", label: "Diagnostic gratuit" },
];

export default function MethodeProbabilitesConditionnellesPage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Méthodes maths Terminale", path: "/methodes-maths-terminale" },
            { name: "Probabilités conditionnelles", path: pagePath },
          ]),
        ]}
      />

      <ChapterHero
        eyebrow="Méthode probabilités conditionnelles Terminale"
        title="Méthode : probabilités conditionnelles en Terminale"
        description={
          <>
            Cette méthode de probabilités conditionnelles en Terminale te donne une
            routine simple pour traduire un énoncé, construire un arbre pondéré et
            calculer une probabilité d&apos;intersection sans mélanger les notations.
          </>
        }
        secondaryDescription={
          <>
            L&apos;objectif est de savoir quoi faire dans l&apos;ordre : définir les
            événements, repérer les données, multiplier un chemin, puis additionner
            les chemins quand la formule des probabilités totales est nécessaire.
          </>
        }
        ctas={[
          {
            href: "/exercices-maths-terminale/probabilites",
            label: "Faire des exercices sur les probabilités",
            eventName: "click_method_chapter_exercises",
            eventParams: {
              ...methodEventParams,
              cta_location: "method_hero_exercises",
            },
            icon: <PlayCircle className="h-5 w-5" />,
          },
          {
            href: "/programme-maths-terminale/probabilites",
            label: "Voir le programme Probabilités",
            eventName: "click_method_chapter_program",
            eventParams: {
              ...methodEventParams,
              cta_location: "method_hero_program",
            },
            icon: <BookOpenCheck className="h-5 w-5" />,
            variant: "secondary",
          },
        ]}
      />

      <section className="border-y border-slate-200 bg-slate-950 px-4 py-5 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm font-semibold sm:flex-row sm:items-center sm:justify-between">
          <span>Besoin d&apos;un repère avant de t&apos;entraîner ?</span>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <TrackedLink
              href="/diagnostic"
              eventName="click_method_chapter_diagnostic"
              eventParams={{
                ...methodEventParams,
                cta_location: "method_top_band_diagnostic",
              }}
              className="inline-flex items-center gap-2 text-emerald-200 hover:text-white"
            >
              Faire le diagnostic gratuit
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
            <TrackedLink
              href="/planning-revision-bac-maths"
              eventName="click_method_chapter_planning"
              eventParams={{
                ...methodEventParams,
                lead_magnet: "planning_bac_maths_2027",
                cta_location: "method_top_band_planning",
              }}
              className="inline-flex items-center gap-2 text-blue-100 hover:text-white"
            >
              Recevoir le planning Bac Maths 2027
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
          </div>
        </div>
      </section>

      <div className="px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-14">
          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <ListChecks className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                La méthode en 5 étapes
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                Cette méthode de probabilité conditionnelle en Terminale sert à garder
                une lecture stable, même quand l&apos;énoncé contient des pourcentages et
                des compléments.
              </p>
            </div>
            <div className="space-y-5">
              <ol className="space-y-3">
                {fiveSteps.map((step, index) => (
                  <li
                    key={step}
                    className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-900 text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="pt-1 leading-7 text-slate-700">{step}</span>
                  </li>
                ))}
              </ol>

              <aside className="rounded-xl bg-red-50 p-5">
                <h3 className="font-bold text-red-950">Pièges fréquents</h3>
                <ul className="mt-3 grid gap-2 text-red-950 sm:grid-cols-2">
                  {commonMistakes.map((mistake) => (
                    <li key={mistake} className="flex gap-2">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0" />
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <Target className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Étape 1 : identifier les événements
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                Commence par traduire l&apos;énoncé en événements courts. Par exemple,
                A peut signifier “utilise l&apos;application” et R peut signifier
                “réussit le test”. Cette définition évite de calculer avec des lettres
                vides.
              </p>
              <p>
                Pense aussi au complémentaire : si A désigne les utilisateurs, alors
                non A désigne les non-utilisateurs. Dans un arbre pondéré Terminale
                méthode, ce complémentaire est souvent indispensable.
              </p>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <Sigma className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Étape 2 : repérer les probabilités données
              </h2>
            </div>
            <div>
              <div className="grid gap-4 md:grid-cols-3">
                {probabilityNotations.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <h3 className="text-xl font-bold text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-700">{item.text}</p>
                  </article>
                ))}
              </div>
              <p className="mt-5 text-lg leading-8 text-slate-700">
                Dans la formule des probabilités conditionnelles en Terminale, la
                phrase “parmi les élèves qui vérifient A” correspond à P_A(B), pas à
                P(A ∩ B). C&apos;est le point qui change presque tout.
              </p>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <ClipboardList className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Étape 3 : construire un arbre pondéré
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-8 text-slate-700">
              <p>
                Pour savoir comment utiliser un arbre pondéré, place d&apos;abord les
                événements A et non A sur la première séparation. Ensuite, depuis
                chaque branche, place les probabilités conditionnelles qui décrivent
                le résultat final.
              </p>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <article className="rounded-lg bg-white p-4 shadow-sm">
                    <p className="font-bold text-slate-950">Branche A</p>
                    <p className="mt-2 text-base leading-7">
                      P(A) sur la première branche, puis P_A(R) et P_A(non R) sur les
                      branches suivantes.
                    </p>
                  </article>
                  <article className="rounded-lg bg-white p-4 shadow-sm">
                    <p className="font-bold text-slate-950">Branche non A</p>
                    <p className="mt-2 text-base leading-7">
                      P(non A) sur la première branche, puis la probabilité de R
                      sachant non A et celle de non R sachant non A.
                    </p>
                  </article>
                </div>
                <p className="mt-4 text-base leading-7">
                  Vérification simple : à chaque séparation, les deux branches
                  complémentaires doivent avoir une somme égale à 1.
                </p>
              </div>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <Sigma className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Étape 4 : calculer une intersection
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                Pour une probabilité intersection Terminale, on multiplie les
                probabilités d&apos;un même chemin. La formule centrale est{" "}
                <span className="font-mono text-slate-950">
                  P(A ∩ B) = P(A) × P_A(B)
                </span>
                .
              </p>
              <p>
                Sur une copie, écris d&apos;abord le chemin en mots, puis la formule.
                Cela montre que tu n&apos;as pas confondu une probabilité
                conditionnelle avec une intersection.
              </p>
              <div className="rounded-xl bg-blue-50 p-5">
                <p className="font-bold text-blue-950">Réflexe de calcul</p>
                <p className="mt-2 leading-7 text-blue-950">
                  Si P(A) = 0,3 et P_A(R) = 0,8, alors P(A ∩ R) = 0,3 × 0,8 =
                  0,24.
                </p>
              </div>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <BookOpenCheck className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Étape 5 : utiliser les probabilités totales
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                Quand un événement peut arriver par plusieurs chemins différents, on
                calcule chaque chemin, puis on additionne. Pour un événement R, si les
                deux cas A et non A couvrent toute la situation, on écrit{" "}
                <span className="font-mono text-slate-950">
                  P(R) = P(A ∩ R) + P(non A ∩ R)
                </span>
                .
              </p>
              <p>
                Attention : on n&apos;additionne pas deux branches qui se suivent. On
                additionne seulement des chemins complets, incompatibles, qui mènent
                au même événement demandé.
              </p>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <CheckCircle2 className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Cas fréquent : reconnaître une loi binomiale
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-8 text-slate-700">
              <p>
                Une loi binomiale apparaît quand on répète n fois la même expérience,
                avec deux issues possibles, des essais indépendants et une probabilité
                de succès p constante.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  "Deux issues : succès ou échec.",
                  "La probabilité du succès reste la même.",
                  "Les répétitions sont indépendantes.",
                ].map((criterion) => (
                  <div
                    key={criterion}
                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    <p className="mt-3 leading-7">{criterion}</p>
                  </div>
                ))}
              </div>
              <p>
                Si X compte le nombre de succès, on peut écrire{" "}
                <span className="font-mono text-slate-950">X suit B(n ; p)</span>.
                Ce n&apos;est pas un arbre à refaire n fois : c&apos;est une situation de
                répétition que l&apos;on reconnaît.
              </p>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <ClipboardList className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Exemple guidé
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                On applique la méthode sur un énoncé court, avec un arbre implicite
                et la formule des probabilités totales.
              </p>
            </div>
            <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-lg font-bold leading-8 text-slate-950">
                Dans une population, 30 % des personnes utilisent une application A.
                Parmi les utilisateurs de A, 80 % réussissent un test. Parmi les
                non-utilisateurs, 50 % réussissent.
              </p>
              <p className="mt-4 leading-7 text-slate-700">
                Notons A : “utilise l&apos;application”, et R : “réussit”.
              </p>

              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-5">
                  <h3 className="font-bold text-slate-950">Questions</h3>
                  <ul className="mt-3 space-y-2 leading-7 text-slate-700">
                    <li>Donner P(A).</li>
                    <li>Donner P_A(R).</li>
                    <li>Calculer P(A ∩ R).</li>
                    <li>Calculer P(R).</li>
                  </ul>
                </div>

                <div className="rounded-xl bg-emerald-50 p-5">
                  <h3 className="font-bold text-emerald-950">Correction</h3>
                  <div className="mt-3 space-y-2 leading-7 text-emerald-950">
                    <p>P(A) = 0,3.</p>
                    <p>P_A(R) = 0,8.</p>
                    <p>P(A ∩ R) = 0,3 × 0,8 = 0,24.</p>
                    <p>P(non A) = 0,7.</p>
                    <p>P(non A ∩ R) = 0,7 × 0,5 = 0,35.</p>
                    <p className="font-bold">P(R) = 0,24 + 0,35 = 0,59.</p>
                  </div>
                </div>
              </div>
            </article>
          </section>

          <section>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <CalendarDays className="h-7 w-7 text-blue-800" />
                <h2 className="mt-4 text-3xl font-bold text-slate-950">
                  S’entraîner sur les probabilités
                </h2>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
                  La méthode devient solide quand tu alternes exercices courts,
                  programme du chapitre et sujets guidés type bac.
                </p>
              </div>
              <TrackedLink
                href="/exercices-maths-terminale/probabilites"
                eventName="click_method_chapter_exercises"
                eventParams={{
                  ...methodEventParams,
                  cta_location: "method_training_primary",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-900 px-5 py-3 text-center font-bold text-white hover:bg-blue-800 sm:w-auto"
              >
                Faire des exercices sur les probabilités
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <TrackedLink
                href="/programme-maths-terminale/probabilites"
                eventName="click_method_chapter_program"
                eventParams={{
                  ...methodEventParams,
                  cta_location: "method_training_program",
                }}
                className="rounded-xl border border-slate-200 bg-white p-5 font-semibold text-slate-800 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-blue-950"
              >
                Voir le programme Probabilités
              </TrackedLink>
              <TrackedLink
                href="/exercices-type-bac-maths-terminale"
                eventName="click_method_chapter_typebac"
                eventParams={{
                  ...methodEventParams,
                  cta_location: "method_training_typebac",
                }}
                className="rounded-xl border border-slate-200 bg-white p-5 font-semibold text-slate-800 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-blue-950"
              >
                Essayer un exercice type bac guidé
              </TrackedLink>
              <TrackedLink
                href="/sujets-type-bac-maths-terminale#sujet-guide-probabilites-geometrie-integrales"
                eventName="click_method_chapter_subjects"
                eventParams={{
                  ...methodEventParams,
                  intent: "sujet_type_bac_corrige",
                  destination_page:
                    "/sujets-type-bac-maths-terminale#sujet-guide-probabilites-geometrie-integrales",
                  cta_location: "method_training_subject_corrige",
                }}
                className="rounded-xl border border-slate-200 bg-white p-5 font-semibold text-slate-800 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-blue-950"
              >
                S&apos;entraîner avec un sujet type bac corrigé
              </TrackedLink>
              <TrackedLink
                href="/planning-revision-bac-maths"
                eventName="click_method_chapter_planning"
                eventParams={{
                  ...methodEventParams,
                  lead_magnet: "planning_bac_maths_2027",
                  cta_location: "method_training_planning",
                }}
                className="rounded-xl border border-slate-200 bg-white p-5 font-semibold text-slate-800 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-blue-950"
              >
                Recevoir le planning Bac Maths 2027
              </TrackedLink>
              <TrackedLink
                href="/diagnostic"
                eventName="click_method_chapter_diagnostic"
                eventParams={{
                  ...methodEventParams,
                  cta_location: "method_training_diagnostic",
                }}
                className="rounded-xl border border-slate-200 bg-white p-5 font-semibold text-slate-800 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-blue-950"
              >
                Faire le diagnostic gratuit
              </TrackedLink>
            </div>

            <div className="mt-6 rounded-xl bg-blue-950 p-6 text-white sm:p-8">
              <h3 className="text-2xl font-bold">
                Travailler le chapitre dans le bon ordre
              </h3>
              <p className="mt-3 max-w-3xl leading-7 text-blue-100">
                Commence par vérifier les notations, puis fais quelques arbres
                pondérés simples avant de passer aux exercices type bac.
              </p>
              <TrackedLink
                href="/exercices-maths-terminale/probabilites"
                eventName="click_method_chapter_exercises"
                eventParams={{
                  ...methodEventParams,
                  cta_location: "method_final_exercises",
                }}
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-center font-bold text-blue-950 hover:bg-blue-50 sm:w-auto"
              >
                Faire des exercices sur les probabilités
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </div>
          </section>

          <ChapterInternalLinks
            title="Continuer dans le cluster probabilités"
            links={internalLinks}
          />

          <FaqAccordion items={faqItems} sourcePage={pagePath} />
        </div>
      </div>
    </SeoPageLayout>
  );
}
