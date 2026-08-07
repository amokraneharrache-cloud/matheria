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

const pagePath = "/programme-maths-terminale/integrales";

const title = "Intégrales en Terminale : programme, méthodes et exercices";
const description =
  "Résumé du chapitre Intégrales en Terminale spécialité maths : primitives, calcul d’intégrale, aire sous la courbe, propriétés et exercices corrigés pour le Bac.";

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
  chapter: "integrales",
  level: "terminale",
  source_page: pagePath,
};

const notionChecklist = [
  "comprendre ce qu’est une primitive",
  "distinguer primitive et dérivée",
  "identifier les bornes a et b",
  "appliquer F(b) - F(a) dans le bon ordre",
  "mettre des parenthèses à la borne inférieure",
  "interpréter une intégrale comme une aire algébrique",
  "utiliser la linéarité",
  "utiliser la positivité si f est positive",
  "surveiller les signes quand la courbe passe sous l’axe",
];

const calculationSteps = [
  "Vérifier la fonction et l’intervalle [a ; b] donnés dans l’énoncé.",
  "Trouver une primitive F de f : il faut que F’(x) = f(x).",
  "Écrire clairement la formule avec les bornes : ∫_a^b f(x) dx = F(b) - F(a).",
  "Remplacer d’abord la borne supérieure b, puis la borne inférieure a.",
  "Soustraire toute l’expression F(a), avec des parenthèses si nécessaire.",
  "Simplifier et vérifier le signe obtenu avec le contexte de l’exercice.",
];

const propertyCards = [
  {
    title: "Linéarité",
    text: "L’intégrale d’une somme est la somme des intégrales, et un coefficient peut sortir de l’intégrale. C’est utile pour traiter un polynôme terme par terme.",
    formula: "∫_a^b (αf(x) + βg(x)) dx = α∫_a^b f(x) dx + β∫_a^b g(x) dx",
  },
  {
    title: "Positivité",
    text: "Si f est positive sur [a ; b], alors son intégrale de a à b est positive. C’est une vérification rapide du résultat.",
    formula: "si f ≥ 0 sur [a ; b], alors ∫_a^b f(x) dx ≥ 0",
  },
  {
    title: "Ordre des bornes",
    text: "Inverser les bornes change le signe de l’intégrale. Beaucoup d’erreurs de calcul viennent d’un F(a) mal soustrait.",
    formula: "∫_b^a f(x) dx = -∫_a^b f(x) dx",
  },
];

const revisionSteps = [
  "Revoir les primitives usuelles avant de faire des calculs longs.",
  "S’entraîner sur des intégrales courtes avec des bornes simples.",
  "Vérifier chaque primitive en la dérivant mentalement.",
  "Refaire des exercices où la courbe est parfois sous l’axe des abscisses.",
  "Comparer la correction avec les étapes, pas seulement avec la valeur finale.",
  "Finir par des exercices intégrales bac maths Terminale reliés aux études de fonctions.",
];

const recommendedExercises = [
  {
    title: "Trouver une primitive simple",
    text: "Un exercice court pour vérifier que la dérivée de la primitive redonne bien la fonction étudiée.",
  },
  {
    title: "Calculer une intégrale avec bornes",
    text: "Un entraînement central pour appliquer F(b) - F(a), garder les parenthèses et éviter les erreurs de signe.",
  },
  {
    title: "Interpréter une aire sous la courbe",
    text: "Un format type bac pour relier le calcul intégral à une aire algébrique et au signe de la fonction.",
  },
];

const internalLinks = [
  {
    href: "/primitives-terminale-specialite-maths",
    label: "Calculer une primitive : méthode complète",
  },
  { href: "/programme-maths-terminale", label: "Programme maths Terminale" },
  {
    href: "/programme-maths-terminale/derivation-convexite",
    label: "Chapitre dérivation et convexité",
  },
  {
    href: "/programme-maths-terminale/fonction-logarithme",
    label: "Chapitre fonction logarithme",
  },
  {
    href: "/exercices-maths-terminale/integrales",
    label: "Exercices intégrales Terminale",
  },
  {
    href: "/methodes-maths-terminale/integrales",
    label: "Méthode intégrales Terminale",
  },
  { href: "/sujets-type-bac-maths-terminale", label: "Sujets type bac Terminale" },
  { href: "/bac-maths-2027", label: "Offre Bac Maths 2027" },
  { href: "/planning-revision-bac-maths", label: "Planning Bac Maths 2027" },
  { href: "/diagnostic", label: "Diagnostic gratuit" },
];

const faqItems: FaqItem[] = [
  {
    question: "Les intégrales tombent-elles souvent au Bac ?",
    answer:
      "Les intégrales font partie des chapitres importants d’analyse en Terminale spécialité maths. Elles apparaissent souvent avec les primitives, les aires ou les études de fonctions, mais aucun chapitre précis ne peut être garanti le jour du Bac.",
  },
  {
    question: "Quelle différence entre primitive et intégrale ?",
    answer:
      "Une primitive F de f est une fonction dont la dérivée redonne f. Une intégrale, elle, calcule une quantité sur un intervalle, souvent grâce à une primitive : ∫_a^b f(x) dx = F(b) - F(a).",
  },
  {
    question: "Comment calculer une intégrale ?",
    answer:
      "On cherche d’abord une primitive F de la fonction f, puis on applique la formule F(b) - F(a) en respectant l’ordre des bornes. Il faut bien soustraire toute l’expression obtenue à la borne inférieure.",
  },
  {
    question: "Pourquoi une intégrale représente une aire ?",
    answer:
      "Lorsque f est positive sur [a ; b], l’intégrale de f entre a et b mesure l’aire située sous la courbe et au-dessus de l’axe des abscisses. Si f devient négative, l’intégrale mesure une aire algébrique, avec des signes.",
  },
  {
    question: "Comment éviter les erreurs de signe ?",
    answer:
      "Il faut écrire les bornes dans l’ordre, calculer F(b) puis F(a), et mettre des parenthèses autour de F(a) avant de soustraire. On peut aussi vérifier le signe final avec le signe de la fonction sur l’intervalle.",
  },
  {
    question: "Que faire si je bloque sur une intégrale ?",
    answer:
      "Il faut isoler le blocage : primitive introuvable, ordre des bornes, signe, parenthèses ou interprétation graphique. Un exercice guidé permet de reprendre l’étape fragile au lieu de relire tout le chapitre.",
  },
];

export default function IntegralesTerminalePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Programme maths Terminale", path: "/programme-maths-terminale" },
            { name: "Intégrales en Terminale", path: pagePath },
          ]),
        ]}
      />

      <ChapterHero
        eyebrow="Programme intégrales Terminale — primitive et aire sous la courbe"
        title="Intégrales en Terminale : ce qu’il faut savoir pour le Bac"
        description={
          <>
            Ce guide résume le chapitre intégrales Terminale spécialité maths :
            primitives, calcul d’intégrale, aire sous la courbe, propriétés des
            intégrales et exercices corrigés pour préparer le Bac.
          </>
        }
        secondaryDescription={
          <>
            L’objectif est de savoir quoi faire devant une intégrale : trouver la
            bonne primitive, appliquer les bornes dans le bon ordre et interpréter
            le résultat sans se faire piéger par les signes.
          </>
        }
        ctas={[
          {
            href: "/exercices-maths-terminale/integrales",
            label: "Faire des exercices sur les intégrales",
            eventName: "click_chapter_exercise_cta",
            eventParams: {
              ...chapterEventParams,
              cta_location: "chapter_hero_primary",
            },
            icon: <PlayCircle className="h-5 w-5" />,
          },
          {
            href: "/methodes-maths-terminale/integrales",
            label: "Voir la méthode intégrales",
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
              alt="Aperçu SprintMaths d’un exercice guidé étape par étape."
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
          <span>Besoin d’un plan avant les exercices ?</span>
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
                Pourquoi les intégrales sont importantes au Bac
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                Les intégrales bac maths Terminale sont importantes parce qu’elles
                relient plusieurs réflexes du programme : dérivation, primitives,
                étude de fonction, signe d’une expression et lecture graphique.
              </p>
              <p>
                Dans un sujet, une intégrale peut servir à calculer une valeur
                exacte, comparer des aires ou exploiter une fonction déjà étudiée.
                On ne peut pas prédire le sujet du Bac, mais savoir traiter le
                calcul intégrale Terminale donne un vrai point d’appui en analyse.
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
                Cette checklist aide à réviser le programme intégrales Terminale
                sans mélanger les outils.
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
              <Sigma className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Primitive et intégrale
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                Une primitive est une fonction dont la dérivée donne la fonction
                étudiée. Autrement dit, F est une primitive de f si F’ = f. C’est
                le point à garder en tête pour éviter la confusion entre primitive
                et dérivée.
              </p>
              <p>
                Une intégrale, elle, porte sur un intervalle avec deux bornes. Si
                F est une primitive de f, alors{" "}
                <span className="font-semibold text-slate-950">
                  ∫_a^b f(x) dx = F(b) - F(a)
                </span>
                . Le calcul repose donc souvent sur les primitives, mais il faut
                ensuite appliquer les bornes avec méthode.
              </p>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <ListChecks className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Calculer une intégrale
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                Le calcul doit rester très mécanique : primitive, borne du haut,
                borne du bas, puis simplification.
              </p>
            </div>
            <ol className="space-y-3">
              {calculationSteps.map((step, index) => (
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
              <LineChart className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Interpréter une intégrale comme une aire
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-xl font-bold text-slate-950">f positive</h3>
                <p className="mt-3 leading-7 text-slate-700">
                  Si f est positive sur [a ; b], l’intégrale mesure l’aire sous
                  la courbe et au-dessus de l’axe des abscisses.
                </p>
              </article>
              <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-xl font-bold text-slate-950">f négative</h3>
                <p className="mt-3 leading-7 text-slate-700">
                  Si f est négative, l’intégrale est négative : elle représente
                  une aire algébrique, pas une aire géométrique positive.
                </p>
              </article>
              <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-xl font-bold text-slate-950">Signe variable</h3>
                <p className="mt-3 leading-7 text-slate-700">
                  Si la courbe coupe l’axe, il faut parfois découper l’intervalle
                  pour distinguer les zones positives et négatives.
                </p>
              </article>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <BookOpenCheck className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Propriétés des intégrales
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                Ces propriétés servent autant à calculer qu’à vérifier un résultat.
              </p>
            </div>
            <div className="grid gap-4">
              {propertyCards.map((property) => (
                <article
                  key={property.title}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <h3 className="text-xl font-bold text-slate-950">
                    {property.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-700">{property.text}</p>
                  <p className="mt-3 rounded-lg bg-slate-50 px-4 py-3 font-semibold text-slate-950">
                    {property.formula}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <LineChart className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Lien entre dérivation et intégration
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                La dérivation et l’intégration fonctionnent comme deux démarches
                liées : dériver F donne f, tandis que chercher une primitive de f
                revient à remonter vers une fonction F possible.
              </p>
              <p>
                Dans un exercice, la bonne vérification est simple : après avoir
                trouvé une primitive, on la dérive. Si on ne retrouve pas la
                fonction de départ, c’est probablement qu’un coefficient, un signe
                ou une puissance a été oublié.
              </p>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <BookOpenCheck className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Comment réviser les intégrales
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                Le plus efficace est d’alterner rappel de cours, calculs courts
                et exercices type bac avec interprétation.
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
                  Commence par les primitives, puis ajoute les bornes et termine
                  par l’interprétation graphique. C’est l’ordre le plus robuste
                  pour progresser sur les exercices intégrales Terminale corrigés.
                </p>
              </div>
              <TrackedLink
                href="/exercices-maths-terminale/integrales"
                eventName="click_chapter_exercise_cta"
                eventParams={{
                  ...chapterEventParams,
                  cta_location: "chapter_exercises_section",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-900 px-5 py-3 text-center font-bold text-white hover:bg-blue-800 sm:w-auto"
              >
                Faire des exercices intégrales
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {recommendedExercises.map((exercise) => (
                <article
                  key={exercise.title}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-slate-950">
                    {exercise.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {exercise.text}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-xl bg-blue-950 p-6 text-white sm:p-8">
            <h3 className="text-3xl font-bold">
              Passer des intégrales au plan Bac 2027
            </h3>
            <p className="mt-4 max-w-3xl leading-7 text-blue-100">
              Si les intégrales bloquent, commence par la méthode, fais quelques
              calculs guidés, puis passe à des sujets type bac où l’intégrale est
              reliée à une étude de fonction.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TrackedLink
                href="/methodes-maths-terminale/integrales"
                eventName="click_chapter_method_cta"
                eventParams={{
                  ...chapterEventParams,
                  cta_location: "chapter_final_method",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-white px-5 py-3 text-center font-bold text-blue-950 hover:bg-blue-50 sm:w-auto"
              >
                Voir la méthode intégrales
              </TrackedLink>
              <TrackedLink
                href="/sujets-type-bac-maths-terminale"
                eventName="click_chapter_subjects_cta"
                eventParams={{
                  ...chapterEventParams,
                  cta_location: "chapter_final_subjects",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-blue-200 px-5 py-3 text-center font-bold text-white hover:bg-blue-900 sm:w-auto"
              >
                Voir les sujets type bac
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
              <Link
                href="/bac-maths-2027#offre"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-emerald-500 px-5 py-3 text-center font-bold text-white hover:bg-emerald-400 sm:w-auto"
              >
                Voir l’offre Bac 2027
              </Link>
            </div>
          </section>

          <ChapterInternalLinks
            title="Continuer dans le cluster intégrales"
            links={internalLinks}
          />

          <FaqAccordion items={faqItems} sourcePage={pagePath} />
        </div>
      </div>
    </SeoPageLayout>
  );
}
