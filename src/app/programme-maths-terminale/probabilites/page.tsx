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

const pagePath = "/programme-maths-terminale/probabilites";

const title = "Probabilités en Terminale : programme, méthodes et exercices";
const description =
  "Résumé du chapitre Probabilités en Terminale spécialité maths : probabilités conditionnelles, arbres pondérés, loi binomiale, variables aléatoires et exercices corrigés.";

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
  chapter: "probabilites",
  level: "terminale",
  source_page: pagePath,
};

const notionChecklist = [
  "identifier les événements",
  "construire un arbre pondéré",
  "lire une probabilité conditionnelle",
  "calculer une intersection",
  "utiliser la formule des probabilités totales",
  "reconnaître l'indépendance",
  "reconnaître une loi binomiale",
  "calculer une probabilité avec une loi binomiale",
  "interpréter un résultat",
];

const notationCards = [
  {
    title: "P(A)",
    text: "La probabilité que l'événement A se réalise. Il faut commencer par écrire ce que A signifie dans l'énoncé.",
  },
  {
    title: "P_A(B)",
    text: "La probabilité de B sachant que A est réalisé. Elle se lit souvent après une formule du type « parmi les A ».",
  },
  {
    title: "P(A ∩ B)",
    text: "La probabilité que A et B se réalisent ensemble. Sur un arbre, c'est un chemin complet.",
  },
];

const treeSteps = [
  "Nommer les événements avant de tracer les branches.",
  "Placer les probabilités du premier niveau, puis les probabilités conditionnelles.",
  "Multiplier les probabilités le long d'un chemin pour calculer une intersection.",
  "Additionner les chemins compatibles pour utiliser les probabilités totales.",
];

const revisionSteps = [
  "Traduire l'énoncé en événements avant de calculer.",
  "Refaire quelques lectures de P(A), P_A(B) et P(A ∩ B).",
  "Construire des arbres pondérés sur des exercices courts.",
  "Vérifier l'indépendance au lieu de la supposer.",
  "Justifier le modèle binomial avant d'utiliser la calculatrice ou une formule.",
];

const recommendedExercises = [
  {
    title: "Lire une probabilité conditionnelle",
    text: "Un exercice court pour distinguer P(A), P_A(B) et P(A ∩ B) dans un énoncé.",
  },
  {
    title: "Construire un arbre pondéré",
    text: "Un entraînement central pour organiser les données, multiplier les chemins et utiliser les probabilités totales.",
  },
  {
    title: "Reconnaître une loi binomiale",
    text: "Un format type bac pour justifier les répétitions identiques et indépendantes, puis calculer la probabilité demandée.",
  },
];

const internalLinks = [
  { href: "/programme-maths-terminale", label: "Programme maths Terminale" },
  {
    href: "/exercices-maths-terminale/probabilites",
    label: "Exercices probabilités Terminale",
  },
  {
    href: "/methodes-maths-terminale/probabilites-conditionnelles",
    label: "Méthode probabilités conditionnelles",
  },
  {
    href: "/programme-maths-terminale/fonction-logarithme",
    label: "Chapitre fonction logarithme",
  },
  {
    href: "/programme-maths-terminale/derivation-convexite",
    label: "Chapitre dérivation et convexité",
  },
  { href: "/exercices-type-bac-maths-terminale", label: "Exercices type bac Terminale" },
  { href: "/bac-maths-2027", label: "Offre Bac Maths 2027" },
  { href: "/planning-revision-bac-maths", label: "Planning Bac Maths 2027" },
  { href: "/diagnostic", label: "Diagnostic gratuit" },
];

const faqItems: FaqItem[] = [
  {
    question: "Les probabilités tombent-elles souvent au Bac ?",
    answer:
      "Les probabilités sont un chapitre classique de Terminale spécialité maths et très utile pour s'entraîner aux exercices guidés. On ne peut toutefois jamais garantir qu'un chapitre précis tombera le jour du Bac.",
  },
  {
    question: "Comment utiliser un arbre pondéré ?",
    answer:
      "On nomme les événements, puis on place les probabilités sur les branches. Les probabilités d'un même chemin se multiplient pour obtenir une intersection, et plusieurs chemins peuvent ensuite s'additionner avec la formule des probabilités totales.",
  },
  {
    question: "Quelle différence entre P(A ∩ B) et P_A(B) ?",
    answer:
      "P(A ∩ B) désigne la probabilité que A et B se réalisent ensemble. P_A(B) désigne la probabilité de B sachant que A est réalisé. La formule P(A ∩ B) = P(A) × P_A(B) relie les deux.",
  },
  {
    question: "Comment reconnaître une loi binomiale ?",
    answer:
      "On cherche une répétition de n épreuves identiques et indépendantes, avec deux issues à chaque fois : succès ou échec. La variable aléatoire compte alors le nombre de succès.",
  },
  {
    question: "Faut-il connaître les formules par cœur ?",
    answer:
      "Oui, les formules de base doivent être connues, mais elles ne suffisent pas. Il faut surtout savoir les relier à l'énoncé, à l'arbre pondéré ou au modèle de loi binomiale.",
  },
  {
    question: "Que faire si je bloque sur un exercice de probabilités ?",
    answer:
      "Il faut revenir à la traduction : quels sont les événements, que signifie chaque donnée, et quelle probabilité est demandée ? Un exercice guidé aide à reprendre étape par étape au lieu d'appliquer une formule au hasard.",
  },
];

export default function ProbabilitesTerminalePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Programme maths Terminale", path: "/programme-maths-terminale" },
            { name: "Probabilités en Terminale", path: pagePath },
          ]),
        ]}
      />

      <ChapterHero
        eyebrow="Programme probabilités Terminale — spécialité maths"
        title="Probabilités en Terminale : ce qu'il faut savoir pour le Bac"
        description={
          <>
            Ce guide résume le chapitre probabilités Terminale spécialité maths :
            probabilités conditionnelles, arbres pondérés, indépendance, loi
            binomiale et variables aléatoires.
          </>
        }
        secondaryDescription={
          <>
            Les probabilités demandent surtout de bien traduire l&apos;énoncé. Avant
            de calculer, il faut nommer les événements, choisir une représentation
            claire et comprendre ce que la question demande vraiment.
          </>
        }
        ctas={[
          {
            href: "/exercices-maths-terminale/probabilites",
            label: "Faire des exercices sur les probabilités",
            eventName: "click_chapter_exercise_cta",
            eventParams: {
              ...chapterEventParams,
              cta_location: "chapter_hero_primary",
            },
            icon: <PlayCircle className="h-5 w-5" />,
          },
          {
            href: "/methodes-maths-terminale/probabilites-conditionnelles",
            label: "Voir la méthode probabilités conditionnelles",
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
                Pourquoi les probabilités sont importantes au Bac
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                Les probabilités sont un chapitre classique du programme de
                Terminale spécialité maths. Elles permettent de travailler la
                lecture d&apos;énoncé, la modélisation et les calculs organisés dans un
                cadre concret.
              </p>
              <p>
                Cela ne veut pas dire qu&apos;on peut prédire le sujet : aucun chapitre
                ne peut être garanti au Bac. En revanche, ce chapitre est très utile
                pour s&apos;entraîner aux exercices guidés, car chaque question oblige à
                traduire précisément les informations données.
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
                Cette checklist permet de réviser le programme probabilités
                Terminale sans se disperser.
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
                Probabilités conditionnelles
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                Une probabilité conditionnelle répond à une question du type :
                quelle est la probabilité de B lorsque A est déjà réalisé ?
              </p>
            </div>
            <div className="space-y-5">
              <div className="grid gap-4 md:grid-cols-3">
                {notationCards.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <h3 className="text-xl font-bold text-slate-950">{item.title}</h3>
                    <p className="mt-3 leading-7 text-slate-700">{item.text}</p>
                  </article>
                ))}
              </div>
              <div className="rounded-xl bg-blue-50 p-5">
                <p className="font-bold text-blue-950">Formule à savoir utiliser</p>
                <p className="mt-2 text-lg leading-8 text-blue-950">
                  P(A ∩ B)=P(A)×P_A(B). Elle sert à passer d&apos;une probabilité
                  conditionnelle à une probabilité d&apos;intersection.
                </p>
              </div>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <ListChecks className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Arbres pondérés
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                L&apos;arbre pondéré aide à organiser les événements et à rendre les
                probabilités conditionnelles visibles.
              </p>
            </div>
            <ol className="space-y-3">
              {treeSteps.map((step, index) => (
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
                Indépendance
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-xl font-bold text-slate-950">
                  Idée principale
                </h3>
                <p className="mt-3 leading-7 text-slate-700">
                  Deux événements sont indépendants lorsque savoir que l&apos;un est
                  réalisé ne change pas la probabilité de l&apos;autre. En notation,
                  cela revient à P_A(B)=P(B), lorsque P(A) n&apos;est pas nul.
                </p>
              </article>
              <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-xl font-bold text-slate-950">
                  Calcul à reconnaître
                </h3>
                <p className="mt-3 leading-7 text-slate-700">
                  Si A et B sont indépendants, alors P(A ∩ B)=P(A)×P(B). Mais
                  l&apos;indépendance ne se suppose pas : elle doit être donnée,
                  démontrée ou justifiée par le contexte.
                </p>
              </article>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <Sigma className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Loi binomiale
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                La loi binomiale Terminale modélise la répétition de n épreuves
                identiques et indépendantes, avec deux issues à chaque épreuve :
                succès ou échec.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <article className="rounded-xl bg-slate-50 p-5">
                  <h3 className="text-xl font-bold text-slate-950">
                    Ce qu&apos;il faut justifier
                  </h3>
                  <p className="mt-3 leading-7 text-slate-700">
                    On définit le succès, sa probabilité p, le nombre de répétitions
                    n et la variable X qui compte les succès.
                  </p>
                </article>
                <article className="rounded-xl bg-slate-50 p-5">
                  <h3 className="text-xl font-bold text-slate-950">
                    Ce qu&apos;il faut calculer
                  </h3>
                  <p className="mt-3 leading-7 text-slate-700">
                    Les questions demandent souvent P(X=k), P(X≤k) ou P(X≥k). La
                    calculatrice peut aider, mais le modèle doit d&apos;abord être
                    reconnu correctement.
                  </p>
                </article>
              </div>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <LineChart className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Variables aléatoires
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                Une variable aléatoire associe une valeur numérique aux issues
                d&apos;une expérience. En Terminale, il faut savoir lire ou construire
                sa loi de probabilité, puis interpréter les résultats obtenus.
              </p>
              <p>
                Une probabilité, une espérance ou un écart-type prend du sens dans
                le contexte de l&apos;énoncé. Le résultat numérique doit donc être
                accompagné d&apos;une phrase d&apos;interprétation.
              </p>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <BookOpenCheck className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Comment réviser les probabilités efficacement
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
                  Commence par les probabilités conditionnelles, puis passe aux
                  arbres pondérés et à la loi binomiale.
                </p>
              </div>
              <TrackedLink
                href="/exercices-maths-terminale/probabilites"
                eventName="click_chapter_exercise_cta"
                eventParams={{
                  ...chapterEventParams,
                  cta_location: "chapter_exercises_section",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-900 px-5 py-3 text-center font-bold text-white hover:bg-blue-800 sm:w-auto"
              >
                Faire des exercices sur les probabilités
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
              Si les probabilités bloquent, commence par la méthode
              conditionnelle, puis fais quelques exercices guidés. Le diagnostic et
              le planning aident à transformer les erreurs de traduction en plan de
              travail.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TrackedLink
                href="/methodes-maths-terminale/probabilites-conditionnelles"
                eventName="click_chapter_method_cta"
                eventParams={{
                  ...chapterEventParams,
                  cta_location: "chapter_final_method",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-white px-5 py-3 text-center font-bold text-blue-950 hover:bg-blue-50 sm:w-auto"
              >
                Voir la méthode probabilités conditionnelles
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
            title="Continuer dans le cluster probabilités"
            links={internalLinks}
          />

          <FaqAccordion items={faqItems} sourcePage={pagePath} />
        </div>
      </div>
    </SeoPageLayout>
  );
}
