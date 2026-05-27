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
  PenTool,
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

const pagePath = "/programme-maths-terminale/suites";

const title = "Suites en Terminale : programme, méthodes et exercices";
const description =
  "Résumé du chapitre Suites en Terminale spécialité maths : suites arithmétiques, géométriques, récurrence, variations, limites et exercices type bac.";

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
  chapter: "suites",
  level: "terminale",
  source_page: pagePath,
};

const notionChecklist = [
  "définir une suite",
  "calculer des termes",
  "reconnaître arithmétique/géométrique",
  "utiliser une formule explicite",
  "utiliser une relation de récurrence",
  "démontrer par récurrence",
  "étudier les variations",
  "chercher une limite",
  "interpréter un résultat",
];

const revisionSteps = [
  "Revoir les définitions et les notations de base.",
  "Faire 2 exercices simples pour reprendre les automatismes.",
  "Faire 1 exercice type bac guidé sur les suites.",
  "Corriger activement en réécrivant les étapes utiles.",
  "Noter précisément l'étape où l'on bloque.",
];

const recommendedExercises = [
  {
    title: "Calculer des termes et identifier la nature d'une suite",
    text: "Un entraînement court pour vérifier les bases avant les questions longues.",
  },
  {
    title: "Étudier une suite définie par récurrence",
    text: "Un format utile pour travailler les indices, la suite auxiliaire et la conclusion.",
  },
  {
    title: "Justifier une variation ou une limite",
    text: "Un exercice plus proche du type bac, avec choix de méthode et interprétation.",
  },
];

const internalLinks = [
  { href: "/programme-maths-terminale", label: "Programme maths Terminale" },
  { href: "/exercices-maths-terminale/suites", label: "Exercices suites Terminale" },
  {
    href: "/methodes-maths-terminale/etudier-une-suite",
    label: "Méthode pour étudier une suite",
  },
  { href: "/exercices-type-bac-maths-terminale", label: "Exercices type bac Terminale" },
  { href: "/bac-maths-2027", label: "Offre Bac Maths 2027" },
  { href: "/planning-revision-bac-maths", label: "Planning Bac Maths 2027" },
  { href: "/diagnostic", label: "Diagnostic gratuit" },
];

const faqItems: FaqItem[] = [
  {
    question: "Les suites tombent-elles souvent au Bac ?",
    answer:
      "Les suites sont un chapitre classique de Terminale spécialité maths et reviennent souvent dans les exercices type bac d'entraînement. On ne peut toutefois jamais garantir qu'un chapitre précis tombera le jour de l'épreuve.",
  },
  {
    question: "Faut-il connaître les suites arithmétiques et géométriques ?",
    answer:
      "Oui. Il faut savoir les reconnaître, calculer leurs termes, utiliser une formule explicite et interpréter la raison. Ce sont des bases utiles pour des questions plus longues.",
  },
  {
    question: "Comment réussir une récurrence ?",
    answer:
      "Une récurrence réussie est surtout une rédaction claire : initialiser, formuler l'hypothèse au rang n, montrer le rang n+1, puis conclure. Le piège est d'utiliser la propriété à démontrer sans le dire.",
  },
  {
    question: "Comment savoir si une suite est croissante ?",
    answer:
      "On cherche souvent le signe de u(n+1) - u(n). Si les termes sont strictement positifs, un quotient u(n+1) / u(n) peut aussi aider. La méthode dépend de la définition de la suite.",
  },
  {
    question: "Que faire si je bloque sur un exercice de suites ?",
    answer:
      "Il faut identifier le blocage exact : définition, calcul de termes, choix de méthode, récurrence, variation ou limite. Ensuite, reprendre un exercice guidé court évite de relire tout le cours sans agir.",
  },
];

export default function SuitesTerminalePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Programme maths Terminale", path: "/programme-maths-terminale" },
            { name: "Suites en Terminale", path: pagePath },
          ]),
        ]}
      />

      <ChapterHero
        eyebrow="Programme suites Terminale — spécialité maths"
        title="Suites en Terminale : ce qu'il faut savoir pour le Bac"
        description={
          <>
            Ce guide résume le chapitre des suites en Terminale spécialité maths :
            les notions à connaître, les méthodes à travailler, puis les liens utiles
            pour passer rapidement aux exercices guidés.
          </>
        }
        secondaryDescription={
          <>
            Ce n&apos;est pas un cours suites Terminale exhaustif. L&apos;objectif est de
            t&apos;aider à repérer ce qui compte, comprendre comment réviser et savoir
            quoi faire quand un exercice bloque.
          </>
        }
        ctas={[
          {
            href: "/exercices-maths-terminale/suites",
            label: "Faire un exercice guidé sur les suites",
            eventName: "click_chapter_exercise_cta",
            eventParams: {
              ...chapterEventParams,
              cta_location: "chapter_hero_primary",
            },
            icon: <PlayCircle className="h-5 w-5" />,
          },
          {
            href: "/methodes-maths-terminale/etudier-une-suite",
            label: "Voir la méthode pour étudier une suite",
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
          <div className="flex flex-col gap-3 sm:flex-row">
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
                Pourquoi le chapitre des suites est important au Bac
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                Les suites reviennent souvent dans les exercices type bac, car le
                chapitre mélange calcul, raisonnement et méthode. Il peut faire
                travailler des automatismes simples, puis demander une vraie
                justification.
              </p>
              <p>
                Il ne faut pas en déduire une garantie de sujet : aucun chapitre ne
                peut être annoncé à l&apos;avance. Mais les suites restent un excellent
                terrain d&apos;entraînement pour apprendre à lire une définition, choisir
                une méthode et conclure proprement.
              </p>
            </div>
          </section>

          <section>
            <div className="max-w-3xl">
              <ListChecks className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Les notions à maîtriser
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                Pour le programme suites Terminale, l&apos;objectif n&apos;est pas de tout
                réciter. Il faut surtout savoir passer d&apos;une définition à une action
                de calcul ou de preuve.
              </p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {notionChecklist.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <span className="font-semibold text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-950">
              Suites arithmétiques et suites géométriques
            </h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <article className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-xl font-bold text-slate-950">
                  Suite arithmétique Terminale
                </h3>
                <p className="mt-3 leading-7 text-slate-700">
                  On ajoute toujours la même raison. Le réflexe utile : repérer une
                  différence constante, puis utiliser la formule explicite adaptée.
                </p>
              </article>
              <article className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-xl font-bold text-slate-950">
                  Suite géométrique Terminale
                </h3>
                <p className="mt-3 leading-7 text-slate-700">
                  On multiplie toujours par la même raison. Le point clé : savoir
                  exploiter le quotient, la formule explicite et le comportement selon
                  la valeur de la raison.
                </p>
              </article>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <div>
              <PenTool className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Raisonnement par récurrence
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                La récurrence terminale sert à démontrer une propriété vraie pour tous
                les entiers d&apos;un certain rang. Ce n&apos;est pas seulement du calcul : il
                faut une rédaction nette.
              </p>
            </div>
            <ol className="space-y-3">
              {["Initialisation", "Hypothèse de récurrence", "Hérédité", "Conclusion"].map(
                (step, index) => (
                  <li
                    key={step}
                    className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-900 text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="pt-1 font-semibold text-slate-800">{step}</span>
                  </li>
                ),
              )}
            </ol>
          </section>

          <section className="grid gap-8 lg:grid-cols-2">
            <div>
              <LineChart className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Sens de variation d&apos;une suite
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                Pour savoir si une suite est croissante ou décroissante, on compare
                souvent deux termes consécutifs. Le plus fréquent est d&apos;étudier le
                signe de u(n+1) - u(n). Quand les termes sont positifs, un quotient
                peut aussi être pertinent.
              </p>
            </div>
            <div>
              <ClipboardList className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Limites de suites
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                Les limites de suites Terminale demandent de relier la forme explicite,
                les limites de référence et parfois le comportement d&apos;une suite
                géométrique. L&apos;important est de justifier le passage à la limite et
                d&apos;interpréter le résultat dans le contexte.
              </p>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.9fr_1fr] lg:items-start">
            <div>
              <BookOpenCheck className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Comment réviser les suites efficacement
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                Le meilleur progrès vient rarement d&apos;une longue relecture. Il vaut
                mieux alterner rappel de cours, exercice court, exercice guidé et
                correction active.
              </p>
            </div>
            <ol className="space-y-3">
              {revisionSteps.map((step, index) => (
                <li
                  key={step}
                  className="flex gap-3 rounded-xl bg-slate-50 p-4 text-slate-800"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <span className="pt-1 font-semibold">{step}</span>
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
                  Commence par des exercices courts, puis passe à un exercice guidé
                  type bac. Le but est de travailler le choix de méthode autant que le
                  calcul.
                </p>
              </div>
              <TrackedLink
                href="/exercices-maths-terminale/suites"
                eventName="click_chapter_exercise_cta"
                eventParams={{
                  ...chapterEventParams,
                  cta_location: "chapter_exercises_section",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-900 px-5 py-3 text-center font-bold text-white hover:bg-blue-800 sm:w-auto"
              >
                Faire un exercice guidé
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
              Si les suites sont fragiles, commence par le diagnostic, puis organise
              la suite avec le planning. Le Pack Bac Maths 2027 peut ensuite servir de
              cadre pour travailler les exercices guidés et suivre la progression.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TrackedLink
                href="/diagnostic"
                eventName="click_chapter_diagnostic_cta"
                eventParams={{
                  ...chapterEventParams,
                  cta_location: "chapter_final_diagnostic",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-emerald-500 px-5 py-3 text-center font-bold text-white hover:bg-emerald-400 sm:w-auto"
              >
                Faire le diagnostic gratuit
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
                href="/bac-maths-2027"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-white px-5 py-3 text-center font-bold text-blue-950 hover:bg-blue-50 sm:w-auto"
              >
                Voir l&apos;offre Bac 2027
              </Link>
            </div>
          </section>

          <ChapterInternalLinks
            title="Continuer dans le cluster suites"
            links={internalLinks}
          />

          <FaqAccordion items={faqItems} sourcePage={pagePath} />
        </div>
      </div>
    </SeoPageLayout>
  );
}
