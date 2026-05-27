import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  ClipboardList,
  LineChart,
  ListChecks,
  PlayCircle,
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

const pagePath = "/programme-maths-terminale/derivation-convexite";

const title = "Dérivation et convexité en Terminale : programme et méthodes";
const description =
  "Résumé du chapitre Dérivation et convexité en Terminale spécialité maths : dérivée, variations, tableau de variation, dérivée seconde, convexité et exercices corrigés.";

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

const chapterEventParams = {
  chapter: "derivation-convexite",
  level: "terminale",
  source_page: pagePath,
};

const notionChecklist = [
  "calculer une dérivée simple",
  "utiliser les formules de dérivation",
  "factoriser une dérivée",
  "étudier le signe de f'",
  "construire un tableau de variation",
  "lire un extremum",
  "calculer une dérivée seconde",
  "déterminer convexité/concavité",
  "repérer un point d'inflexion",
];

const variationSteps = [
  "Déterminer l'ensemble de définition de la fonction.",
  "Calculer f'(x), puis factoriser si possible.",
  "Étudier le signe de f' sur les intervalles utiles.",
  "En déduire le sens de variation de f.",
  "Placer les valeurs, les limites et les extremums dans le tableau.",
];

const revisionSteps = [
  "Refaire quelques calculs de dérivées pour sécuriser les automatismes.",
  "Travailler le signe de f' avant de passer au tableau de variation.",
  "Construire un tableau complet avec valeurs, limites et extremums.",
  "Ajouter la dérivée seconde pour conclure sur convexité ou concavité.",
  "Comparer la correction avec ton raisonnement, pas seulement avec le résultat.",
];

const recommendedExercises = [
  {
    title: "Calculer et factoriser une dérivée",
    text: "Un exercice court pour revoir les formules de dérivation et préparer l'étude de signe.",
  },
  {
    title: "Construire un tableau de variation",
    text: "Un entraînement central pour relier signe de f', variations, extremum et conclusion.",
  },
  {
    title: "Étudier convexité et point d'inflexion",
    text: "Un format type bac pour utiliser f'' et repérer un changement de convexité.",
  },
];

const internalLinks = [
  { href: "/programme-maths-terminale", label: "Programme maths Terminale" },
  { href: "/exercices-maths-terminale/derivation", label: "Exercices dérivation Terminale" },
  {
    href: "/methodes-maths-terminale/tableau-variation",
    label: "Méthode tableau de variation",
  },
  { href: "/programme-maths-terminale/limites", label: "Chapitre limites Terminale" },
  { href: "/programme-maths-terminale/suites", label: "Chapitre suites Terminale" },
  { href: "/exercices-type-bac-maths-terminale", label: "Exercices type bac Terminale" },
  { href: "/bac-maths-2027", label: "Offre Bac Maths 2027" },
  { href: "/planning-revision-bac-maths", label: "Planning Bac Maths 2027" },
  { href: "/diagnostic", label: "Diagnostic gratuit" },
];

const faqItems: FaqItem[] = [
  {
    question: "La dérivation tombe-t-elle souvent au Bac ?",
    answer:
      "La dérivation est un outil central en analyse et elle est utile dans de nombreux exercices de Terminale, notamment les études de fonctions. On ne peut toutefois jamais garantir qu'un chapitre précis tombera le jour du Bac.",
  },
  {
    question: "À quoi sert le signe de la dérivée ?",
    answer:
      "Le signe de f' permet de déterminer le sens de variation de f. Quand f' est positive sur un intervalle, f est croissante ; quand f' est négative, f est décroissante.",
  },
  {
    question: "Comment faire un tableau de variation ?",
    answer:
      "On calcule la dérivée, on étudie le signe de f', puis on traduit ce signe en variations de f. On ajoute ensuite les valeurs importantes, les limites et les extremums demandés.",
  },
  {
    question: "Quelle différence entre dérivée et dérivée seconde ?",
    answer:
      "La dérivée f' sert surtout à étudier les variations de f. La dérivée seconde f'' sert à étudier la convexité : f'' positive indique une fonction convexe, f'' négative une fonction concave.",
  },
  {
    question: "Comment reconnaître une fonction convexe ?",
    answer:
      "En Terminale, on utilise souvent la dérivée seconde : si f'' est positive sur un intervalle, la fonction est convexe sur cet intervalle. Si f'' est négative, elle est concave.",
  },
  {
    question: "Que faire si je bloque sur une étude de fonction ?",
    answer:
      "Il faut isoler l'étape qui bloque : calcul de la dérivée, factorisation, signe de f', tableau de variation, dérivée seconde ou conclusion. Un diagnostic ou un exercice guidé aide à reprendre seulement la brique fragile.",
  },
];

export default function DerivationConvexiteTerminalePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Programme maths Terminale", path: "/programme-maths-terminale" },
            { name: "Dérivation et convexité en Terminale", path: pagePath },
          ]),
        ]}
      />

      <ChapterHero
        eyebrow="Programme dérivation Terminale — convexité Terminale"
        title="Dérivation et convexité en Terminale : ce qu'il faut savoir pour le Bac"
        description={
          <>
            Ce guide résume le chapitre dérivation Terminale et convexité Terminale :
            dérivée, signe de f&apos;, tableau de variation, dérivée seconde, fonction
            convexe et point d&apos;inflexion.
          </>
        }
        secondaryDescription={
          <>
            L&apos;objectif n&apos;est pas de refaire un cours interminable. Il s&apos;agit de
            comprendre les méthodes qui reviennent dans les études de fonctions et
            de savoir quoi travailler en exercices guidés.
          </>
        }
        ctas={[
          {
            href: "/exercices-maths-terminale/derivation",
            label: "Faire des exercices sur la dérivation",
            eventName: "click_chapter_exercise_cta",
            eventParams: {
              ...chapterEventParams,
              cta_location: "chapter_hero_primary",
            },
            icon: <PlayCircle className="h-5 w-5" />,
          },
          {
            href: "/methodes-maths-terminale/tableau-variation",
            label: "Voir la méthode tableau de variation",
            eventName: "click_chapter_method_cta",
            eventParams: {
              ...chapterEventParams,
              cta_location: "chapter_hero_secondary",
            },
            icon: <BookOpenCheck className="h-5 w-5" />,
            variant: "secondary",
          },
        ]}
        media={
          <div className="mx-auto w-full max-w-[260px] lg:max-w-[300px]">
            <Image
              src="/images/screenshots/sprintmaths-guided-exercise.png"
              alt="Aperçu SprintMaths d'un exercice guidé étape par étape."
              width={390}
              height={844}
              priority
              className="aspect-[390/844] w-full rounded-[28px] border border-slate-200 object-cover object-top shadow-xl"
            />
          </div>
        }
      />

      <section className="border-y border-slate-200 bg-slate-950 px-4 py-5 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm font-semibold sm:flex-row sm:items-center sm:justify-between">
          <span>Besoin d&apos;un plan avant les exercices ?</span>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <TrackedLink
              href="/planning-revision-bac-maths"
              eventName="click_chapter_planning_cta"
              eventParams={{
                ...chapterEventParams,
                lead_magnet: "planning_bac_maths_2027",
                cta_location: "chapter_top_band_planning",
              }}
              className="inline-flex items-center gap-2 text-blue-100 hover:text-white"
            >
              Recevoir le planning Bac Maths 2027
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
            <TrackedLink
              href="/diagnostic"
              eventName="click_chapter_diagnostic_cta"
              eventParams={{
                ...chapterEventParams,
                cta_location: "chapter_top_band_diagnostic",
              }}
              className="inline-flex items-center gap-2 text-emerald-200 hover:text-white"
            >
              Faire le diagnostic gratuit
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
          </div>
        </div>
      </section>

      <div className="px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-14">
          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <Target className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Pourquoi la dérivation est centrale au Bac
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                La dérivée Terminale spécialité maths sert à étudier une fonction :
                variations, extremums, nombre de solutions et comportement global.
                C&apos;est pourquoi la dérivation apparaît souvent comme outil dans un
                exercice d&apos;analyse, parfois même quand le chapitre principal semble
                être une limite, un logarithme ou une exponentielle.
              </p>
              <p>
                Cela ne veut pas dire qu&apos;on peut prédire le sujet. Aucun chapitre ne
                peut être garanti au Bac. En revanche, maîtriser le programme
                dérivation Terminale donne une méthode solide pour aborder beaucoup
                d&apos;études de fonctions.
              </p>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <ClipboardList className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Les notions à maîtriser
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                Cette checklist permet de réviser sans se disperser avant de passer
                aux exercices corrigés.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {notionChecklist.map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />
                  <span className="leading-7 text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <LineChart className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Nombre dérivé et fonction dérivée
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                Le nombre dérivé décrit la pente de la tangente en un point. La
                fonction dérivée, notée f&apos;, donne cette information pour toutes les
                valeurs de x où elle est définie.
              </p>
              <p>
                En pratique, on commence par calculer f&apos;(x) avec les formules de
                dérivation. Une dérivée simple doit ensuite être simplifiée ou
                factorisée, car le calcul prépare l&apos;étude du signe.
              </p>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <LineChart className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Signe de la dérivée et variations
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-xl font-bold text-slate-950">
                  f&apos; positive
                </h3>
                <p className="mt-3 leading-7 text-slate-700">
                  Quand f&apos; est positive sur un intervalle, la fonction f est
                  croissante sur cet intervalle. Si f&apos; est strictement positive,
                  la croissance est stricte.
                </p>
              </article>
              <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-xl font-bold text-slate-950">
                  f&apos; négative
                </h3>
                <p className="mt-3 leading-7 text-slate-700">
                  Quand f&apos; est négative sur un intervalle, la fonction f est
                  décroissante. Le signe de la dérivée donne donc directement le
                  sens de variation.
                </p>
              </article>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <ListChecks className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Tableau de variation
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                Le tableau de variation Terminale est un outil très fréquent : il
                rassemble le signe de f&apos;, les variations de f, les valeurs utiles et
                les limites.
              </p>
            </div>
            <ol className="space-y-3">
              {variationSteps.map((step, index) => (
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
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <BookOpenCheck className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Convexité et dérivée seconde
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                La dérivée seconde convexité Terminale sert à étudier la forme de la
                courbe. On calcule f&apos;&apos;, puis on étudie son signe sur les
                intervalles demandés.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <article className="rounded-xl bg-slate-50 p-5">
                  <h3 className="text-xl font-bold text-slate-950">
                    f&apos;&apos; positive
                  </h3>
                  <p className="mt-3 leading-7 text-slate-700">
                    Si f&apos;&apos; est positive sur un intervalle, f est une fonction
                    convexe Terminale sur cet intervalle.
                  </p>
                </article>
                <article className="rounded-xl bg-slate-50 p-5">
                  <h3 className="text-xl font-bold text-slate-950">
                    f&apos;&apos; négative
                  </h3>
                  <p className="mt-3 leading-7 text-slate-700">
                    Si f&apos;&apos; est négative sur un intervalle, f est concave sur
                    cet intervalle.
                  </p>
                </article>
              </div>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <Target className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Point d&apos;inflexion
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                Un point d&apos;inflexion Terminale correspond à un changement de
                convexité de la courbe. En pratique, on cherche souvent les valeurs où
                f&apos;&apos; s&apos;annule, puis on vérifie que f&apos;&apos; change vraiment de signe.
              </p>
              <p>
                Le changement de signe de f&apos;&apos; indique donc un point
                d&apos;inflexion potentiel. Dire seulement f&apos;&apos;(a) = 0 ne suffit pas :
                il faut vérifier le passage de convexe à concave, ou l&apos;inverse.
              </p>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <BookOpenCheck className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Comment réviser dérivation et convexité
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                Le plus efficace est d&apos;alterner méthode, exercices courts et
                correction active.
              </p>
            </div>
            <ol className="space-y-3">
              {revisionSteps.map((step, index) => (
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
          </section>

          <section>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-bold text-slate-950">
                  Exercices recommandés
                </h2>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
                  Commence par le calcul, puis passe au tableau de variation et à la
                  convexité. Le but est d&apos;apprendre à enchaîner les étapes d&apos;une
                  étude de fonction.
                </p>
              </div>
              <TrackedLink
                href="/exercices-maths-terminale/derivation"
                eventName="click_chapter_exercise_cta"
                eventParams={{
                  ...chapterEventParams,
                  cta_location: "chapter_exercises_section",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-900 px-5 py-3 text-center font-bold text-white hover:bg-blue-800 sm:w-auto"
              >
                Faire des exercices sur la dérivation
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {recommendedExercises.map((exercise) => (
                <article
                  key={exercise.title}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-slate-950">{exercise.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {exercise.text}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-xl bg-blue-950 p-6 text-white sm:p-8">
            <h3 className="text-3xl font-bold">Passer du chapitre au plan Bac 2027</h3>
            <p className="mt-4 max-w-3xl leading-7 text-blue-100">
              Si la dérivation ou la convexité bloque, commence par un exercice guidé,
              puis utilise la méthode tableau de variation. Le diagnostic et le
              planning aident à transformer le blocage en plan de travail.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TrackedLink
                href="/methodes-maths-terminale/tableau-variation"
                eventName="click_chapter_method_cta"
                eventParams={{
                  ...chapterEventParams,
                  cta_location: "chapter_final_method",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-white px-5 py-3 text-center font-bold text-blue-950 hover:bg-blue-50 sm:w-auto"
              >
                Voir la méthode tableau de variation
              </TrackedLink>
              <TrackedLink
                href="/planning-revision-bac-maths"
                eventName="click_chapter_planning_cta"
                eventParams={{
                  ...chapterEventParams,
                  lead_magnet: "planning_bac_maths_2027",
                  cta_location: "chapter_final_planning",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-blue-200 px-5 py-3 text-center font-bold text-white hover:bg-blue-900 sm:w-auto"
              >
                Recevoir le planning Bac Maths 2027
              </TrackedLink>
              <TrackedLink
                href="/diagnostic"
                eventName="click_chapter_diagnostic_cta"
                eventParams={{
                  ...chapterEventParams,
                  cta_location: "chapter_final_diagnostic",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-blue-200 px-5 py-3 text-center font-bold text-white hover:bg-blue-900 sm:w-auto"
              >
                Faire le diagnostic gratuit
              </TrackedLink>
              <TrackedLink
                href="/exercices-type-bac-maths-terminale"
                eventName="click_chapter_exercise_cta"
                eventParams={{
                  ...chapterEventParams,
                  cta_location: "chapter_final_typebac",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-blue-200 px-5 py-3 text-center font-bold text-white hover:bg-blue-900 sm:w-auto"
              >
                Essayer un exercice type bac
              </TrackedLink>
              <Link
                href="/bac-maths-2027#offre"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-emerald-500 px-5 py-3 text-center font-bold text-white hover:bg-emerald-400 sm:w-auto"
              >
                Voir l&apos;offre Bac 2027
              </Link>
            </div>
          </section>

          <ChapterInternalLinks
            title="Continuer dans le cluster dérivation et convexité"
            links={internalLinks}
          />

          <FaqAccordion items={faqItems} sourcePage={pagePath} />
        </div>
      </div>
    </SeoPageLayout>
  );
}
