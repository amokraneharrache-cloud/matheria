import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  LockKeyhole,
  PlayCircle,
  Target,
} from "lucide-react";
import {
  ChapterHero,
  ChapterInternalLinks,
} from "@/components/marketing/ChapterSeoPage";
import { ChapterExerciseReveal } from "@/components/marketing/ChapterExerciseReveal";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/seo";

const pagePath = "/exercices-maths-terminale/derivation";

const title = "Exercices Dérivation Terminale corrigés et guidés";
const description =
  "Travaille la dérivation en Terminale avec des exercices corrigés et guidés : calcul de dérivée, signe de la dérivée, tableau de variation, convexité et dérivée seconde.";

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

const faqItems: FaqItem[] = [
  {
    question: "Quels exercices de dérivation faut-il savoir faire ?",
    answer:
      "En Terminale, il faut savoir calculer une dérivée, résoudre f'(x)=0, étudier le signe de f'(x), construire un tableau de variation, puis utiliser la dérivée seconde pour la convexité.",
  },
  {
    question: "Comment étudier le signe d’une dérivée ?",
    answer:
      "On factorise la dérivée quand c'est possible, on repère les valeurs qui l'annulent, puis on construit un tableau de signes avant de conclure sur les variations de la fonction.",
  },
  {
    question: "Comment construire un tableau de variation ?",
    answer:
      "On place les valeurs importantes de x, on ajoute le signe de la dérivée sur chaque intervalle, puis on traduit ce signe par des flèches de croissance ou de décroissance pour la fonction.",
  },
  {
    question: "À quoi sert la dérivée seconde ?",
    answer:
      "La dérivée seconde sert à étudier la convexité : si f'' est positive, la fonction est convexe ; si f'' est négative, elle est concave sur l'intervalle étudié.",
  },
  {
    question: "Comment étudier la convexité ?",
    answer:
      "On calcule f''(x), on étudie son signe, puis on repère les changements de signe. Un point d'inflexion apparaît lorsque la convexité change réellement.",
  },
  {
    question: "Ces exercices sont-ils des annales officielles ?",
    answer:
      "SprintMaths propose des exercices d’entraînement et des exercices type bac guidés, sans revendiquer qu’il s’agit d’annales officielles.",
  },
];

type Exercise = {
  id: string;
  heading: string;
  label: string;
  statement: ReactNode;
  tasks: string[];
  guidedStep: string;
  method: string;
  correction: string[];
  pitfall: string;
  revealDetail: string;
  table?: ReactNode;
};

const visibleExercises: Exercise[] = [
  {
    id: "exercice-1",
    heading: "Exercice 1 : calculer une dérivée simple",
    label: "Calcul de dérivée",
    statement: (
      <>
        On considère la fonction f définie sur R par f(x) = x² - 4x + 1.
      </>
    ),
    tasks: ["Calculer f'(x).", "Résoudre f'(x)=0."],
    guidedStep:
      "On dérive terme par terme : la dérivée de x² est 2x, celle de -4x est -4 et celle de 1 est 0.",
    method:
      "Pour un polynôme simple, applique les règles usuelles puis résous l'équation linéaire obtenue.",
    correction: ["f'(x)=2x-4.", "f'(x)=0 pour x=2."],
    pitfall:
      "Ne garde pas la constante dans la dérivée : la dérivée de 1 vaut 0, pas 1.",
    revealDetail:
      "Le réflexe SprintMaths : avant de chercher les variations, vérifie que le calcul de f'(x) est parfaitement simplifié. Toute la suite dépend de cette ligne.",
  },
  {
    id: "exercice-2",
    heading: "Exercice 2 : étudier le signe d’une dérivée",
    label: "Signe de f'(x)",
    statement: (
      <>
        On reprend la fonction f définie par f(x) = x² - 4x + 1.
      </>
    ),
    tasks: [
      "Étudier le signe de f'(x).",
      "En déduire les variations de f.",
    ],
    guidedStep:
      "On part de f'(x)=2x-4. Pour connaître son signe, on résout d'abord 2x-4=0, puis on regarde le signe de 2x-4 de chaque côté de 2.",
    method:
      "Une dérivée négative donne une fonction décroissante ; une dérivée positive donne une fonction croissante.",
    correction: [
      "f'(x)=2x-4.",
      "f'(x) est négative si x<2, positive si x>2.",
      "Donc f décroît sur ]-∞,2] et croît sur [2,+∞[.",
    ],
    pitfall:
      "Ne confonds pas le signe de f'(x) avec le signe de f(x) : ce sont les variations qui se lisent sur f'.",
    revealDetail:
      "Le bon automatisme : écris toujours la phrase de conclusion. Au bac, le tableau ou le signe seul ne suffit pas si la question demande les variations.",
  },
  {
    id: "exercice-3",
    heading: "Exercice 3 : construire un tableau de variation",
    label: "Tableau de variation",
    statement: (
      <>
        On considère la fonction f définie sur R par f(x)=x³-3x.
      </>
    ),
    tasks: [
      "Calculer f'(x).",
      "Étudier son signe.",
      "Construire le tableau de variation.",
    ],
    guidedStep:
      "Après le calcul de la dérivée, factorise 3x²-3 sous la forme 3(x-1)(x+1). Les deux valeurs critiques sont donc -1 et 1.",
    method:
      "On place -1 et 1 sur la ligne des x, on renseigne le signe de f'(x), puis on ajoute les valeurs f(-1) et f(1) dans la ligne de f.",
    correction: [
      "f'(x)=3x²-3=3(x-1)(x+1).",
      "Le signe est positif sur ]-∞,-1], négatif sur [-1,1], puis positif sur [1,+∞[.",
      "Donc f croît, décroît, puis croît.",
      "Attention aux valeurs : f(-1)=2 et f(1)=-2.",
    ],
    pitfall:
      "Ne place pas seulement -1 et 1 : il faut aussi calculer f(-1) et f(1) pour compléter le tableau.",
    revealDetail:
      "Pour sécuriser le tableau, lis-le comme une histoire : f monte jusqu'à 2, descend jusqu'à -2, puis remonte. Si les valeurs ne suivent pas les flèches, il y a une erreur.",
    table: (
      <div className="mt-4 w-full max-w-full overflow-x-auto">
        <table className="min-w-[520px] border-collapse text-sm">
          <tbody>
            <tr>
              <th className="border border-slate-200 bg-slate-50 px-3 py-2 text-left text-slate-950">
                x
              </th>
              <td className="border border-slate-200 px-3 py-2">]-∞,-1[</td>
              <td className="border border-slate-200 px-3 py-2">-1</td>
              <td className="border border-slate-200 px-3 py-2">]-1,1[</td>
              <td className="border border-slate-200 px-3 py-2">1</td>
              <td className="border border-slate-200 px-3 py-2">]1,+∞[</td>
            </tr>
            <tr>
              <th className="border border-slate-200 bg-slate-50 px-3 py-2 text-left text-slate-950">
                signe de f&apos;(x)
              </th>
              <td className="border border-slate-200 px-3 py-2 text-emerald-700">+</td>
              <td className="border border-slate-200 px-3 py-2 text-slate-700">0</td>
              <td className="border border-slate-200 px-3 py-2 text-red-700">-</td>
              <td className="border border-slate-200 px-3 py-2 text-slate-700">0</td>
              <td className="border border-slate-200 px-3 py-2 text-emerald-700">+</td>
            </tr>
            <tr>
              <th className="border border-slate-200 bg-slate-50 px-3 py-2 text-left text-slate-950">
                variations de f
              </th>
              <td className="border border-slate-200 px-3 py-2">↗</td>
              <td className="border border-slate-200 px-3 py-2 font-semibold">2</td>
              <td className="border border-slate-200 px-3 py-2">↘</td>
              <td className="border border-slate-200 px-3 py-2 font-semibold">-2</td>
              <td className="border border-slate-200 px-3 py-2">↗</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-2 text-sm text-slate-600">
          Entre -1 et 1, la ligne de f est décroissante : f passe de 2 à -2.
        </p>
      </div>
    ),
  },
];

const lockedExercises = [
  {
    id: "exercice-4",
    heading: "Exercice 4 : utiliser la dérivée seconde",
    label: "Aperçu verrouillé",
    text: "Calculer f''(x), étudier son signe et relier le résultat à la convexité de la courbe.",
  },
  {
    id: "exercice-5",
    heading: "Exercice 5 : convexité et point d’inflexion",
    label: "Aperçu verrouillé",
    text: "Repérer un changement de signe de f''(x), puis justifier proprement l'existence d'un point d'inflexion.",
  },
];

const internalLinks = [
  {
    href: "/programme-maths-terminale/derivation-convexite",
    label: "Chapitre dérivation et convexité Terminale",
  },
  {
    href: "/methodes-maths-terminale/tableau-variation",
    label: "Méthode tableau de variation",
  },
  {
    href: "/exercices-type-bac-maths-terminale",
    label: "Exercices type bac Terminale",
  },
  { href: "/programme-maths-terminale/limites", label: "Chapitre limites Terminale" },
  { href: "/programme-maths-terminale/suites", label: "Chapitre suites Terminale" },
  { href: "/bac-maths-2027", label: "Bac Maths 2027" },
  { href: "/planning-revision-bac-maths", label: "Planning révision Bac Maths" },
  { href: "/diagnostic", label: "Diagnostic gratuit" },
];

function ExerciseSection({ exercise }: { exercise: Exercise }) {
  return (
    <section id={exercise.id} className="scroll-mt-24">
      <h2 className="text-3xl font-bold text-slate-950">{exercise.heading}</h2>
      <article className="mt-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase text-blue-800">
              <ClipboardList className="h-4 w-4" />
              {exercise.label}
            </p>
            <h3 className="mt-4 text-xl font-bold text-slate-950">Énoncé</h3>
            <p className="mt-2 leading-7 text-slate-700">{exercise.statement}</p>
          </div>
          <TrackedLink
            href="/exercices-type-bac-maths-terminale"
            eventName="click_exercise_chapter_typebac"
            eventParams={{
              ...chapterEventParams,
              cta_location: `${exercise.id}_top_cta`,
            }}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-blue-900 px-4 py-2 text-center text-sm font-bold text-blue-900 hover:bg-blue-50 sm:w-auto"
          >
            Essayer les exercices type bac guidés
            <ArrowRight className="h-4 w-4" />
          </TrackedLink>
        </div>

        <div className="mt-5 border-t border-slate-200 pt-5">
          <h3 className="font-bold text-slate-950">Questions</h3>
          <ul className="mt-3 space-y-2 text-slate-700">
            {exercise.tasks.map((task) => (
              <li key={task} className="flex gap-2">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                <span>{task}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 grid min-w-0 gap-5 border-t border-slate-200 pt-5 lg:grid-cols-2">
          <div>
            <h3 className="font-bold text-slate-950">Étape guidée</h3>
            <p className="mt-2 leading-7 text-slate-700">{exercise.guidedStep}</p>
          </div>
          <div>
            <h3 className="font-bold text-slate-950">Méthode</h3>
            <p className="mt-2 leading-7 text-slate-700">{exercise.method}</p>
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-slate-950">Correction courte</h3>
            <ul className="mt-2 space-y-2 leading-7 text-slate-700">
              {exercise.correction.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
            {exercise.table}
          </div>
          <div>
            <h3 className="font-bold text-slate-950">Piège fréquent</h3>
            <p className="mt-2 leading-7 text-slate-700">{exercise.pitfall}</p>
          </div>
        </div>

        <ChapterExerciseReveal
          chapter="derivation-convexite"
          exerciseId={exercise.id}
          detail={exercise.revealDetail}
          sourcePage={pagePath}
        />
      </article>
    </section>
  );
}

export default function ExercicesDerivationTerminalePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Exercices maths Terminale", path: "/exercices-maths-terminale" },
            { name: "Dérivation", path: pagePath },
          ]),
        ]}
      />

      <ChapterHero
        eyebrow="Dérivation Terminale — exercices corrigés et guidés"
        title="Exercices sur la dérivation en Terminale"
        description={
          <>
            Travaille le calcul de dérivée, le signe de la dérivée, le tableau de
            variation, la dérivée seconde et la convexité avec des exercices
            corrigés avant de passer à un exercice type bac dérivation Terminale.
          </>
        }
        secondaryDescription={
          <>
            Les corrections sont courtes pour t&apos;aider à comprendre la méthode sans
            transformer l&apos;entraînement en lecture passive.
          </>
        }
        ctas={[
          {
            href: "/exercices-type-bac-maths-terminale",
            label: "Essayer les exercices type bac guidés",
            eventName: "click_exercise_chapter_typebac",
            eventParams: {
              ...chapterEventParams,
              cta_location: "derivation_exercises_hero_typebac",
            },
            icon: <PlayCircle className="h-5 w-5" />,
          },
          {
            href: "/methodes-maths-terminale/tableau-variation",
            label: "Voir la méthode tableau de variation",
            eventName: "click_exercise_chapter_method",
            eventParams: {
              ...chapterEventParams,
              cta_location: "derivation_exercises_hero_method",
            },
            icon: <BookOpenCheck className="h-5 w-5" />,
            variant: "secondary",
          },
        ]}
      />

      <section className="border-y border-slate-200 bg-slate-950 px-4 py-5 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm font-semibold sm:flex-row sm:items-center sm:justify-between">
          <span>Besoin du cours avant les exercices ?</span>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/programme-maths-terminale/derivation-convexite"
              className="inline-flex items-center gap-2 text-blue-100 hover:text-white"
            >
              Revoir dérivation et convexité
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/programme-maths-terminale/limites"
              className="inline-flex items-center gap-2 text-emerald-100 hover:text-white"
            >
              Relier avec les limites
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <div className="px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-14">
          <section>
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
              <div>
                <BookOpenCheck className="h-7 w-7 text-blue-800" />
                <h2 className="mt-4 text-3xl font-bold text-slate-950">
                  Exercices guidés sur la dérivation
                </h2>
              </div>
              <div className="space-y-4 text-lg leading-8 text-slate-700">
                <p>
                  Un exercice de dérivation Terminale devient plus clair quand tu
                  sépares les réflexes : calculer f&apos;, résoudre f&apos;(x)=0,
                  étudier le signe de la dérivée, puis traduire le résultat en
                  variations ou en convexité.
                </p>
                <p>
                  Cette page réunit des exercices dérivation Terminale corrigés :
                  calcul de dérivée simple, signe de la dérivée, tableau de
                  variation, puis aperçu sur dérivée seconde et convexité.
                </p>
                <p>
                  Les exemples ci-dessous ne sont pas des annales officielles. Ils
                  servent d&apos;entraînement corrigé avant de passer aux exercices type
                  bac guidés dans SprintMaths.
                </p>
              </div>
            </div>
          </section>

          {visibleExercises.map((exercise) => (
            <ExerciseSection key={exercise.id} exercise={exercise} />
          ))}

          {lockedExercises.map((exercise) => (
            <section key={exercise.heading} id={exercise.id} className="scroll-mt-24">
              <h2 className="text-3xl font-bold text-slate-950">
                {exercise.heading}
              </h2>
              <article className="mt-5 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5 sm:p-6">
                <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase text-slate-700">
                  <LockKeyhole className="h-4 w-4" />
                  {exercise.label}
                </p>
                <p className="mt-4 max-w-3xl leading-7 text-slate-700">
                  {exercise.text}
                </p>
                <TrackedLink
                  href="/bac-maths-2027#offre"
                  eventName="click_exercise_chapter_offer"
                  eventParams={{
                    ...chapterEventParams,
                    offer: "pack_revision_express_bac_2027",
                    cta_location: `${exercise.id}_locked_preview`,
                  }}
                  className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-900 px-5 py-3 text-center font-bold text-white hover:bg-blue-800 sm:w-auto"
                >
                  Voir le Pack Révision Express
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
              </article>
            </section>
          ))}

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <ClipboardList className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Comment corriger efficacement un exercice de dérivation
              </h2>
            </div>
            <div className="space-y-5 leading-7 text-slate-700">
              <p>
                Ne lis pas uniquement la dernière ligne. Reprends la correction en
                cherchant l&apos;étape qui débloque l&apos;exercice : formule de dérivée,
                factorisation, signe, tableau de variation ou dérivée seconde.
              </p>
              <ul className="space-y-3">
                {[
                  "Comparer ton calcul de f' avec la correction avant d'étudier le signe.",
                  "Réécrire le tableau de signes sans regarder le modèle.",
                  "Ajouter une phrase de conclusion sur les variations ou la convexité.",
                  "Refaire un exercice proche en changeant seulement la fonction.",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                Pour revoir la démarche complète, consulte aussi la{" "}
                <Link
                  href="/methodes-maths-terminale/tableau-variation"
                  className="font-bold text-blue-900 hover:underline"
                >
                  méthode tableau de variation
                </Link>
                .
              </p>
            </div>
          </section>

          <section className="rounded-lg bg-blue-950 p-6 text-white sm:p-8">
            <h2 className="text-3xl font-bold">
              Continuer avec les exercices type bac
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-blue-100">
              Après ces exercices corrigés sur la dérivation, tu peux passer à un
              entraînement type bac, revoir la méthode, construire ton planning ou
              débloquer le Pack Révision Express.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <TrackedLink
                href="/exercices-type-bac-maths-terminale"
                eventName="click_exercise_chapter_typebac"
                eventParams={{
                  ...chapterEventParams,
                  cta_location: "continue_typebac",
                }}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-center font-bold text-blue-950 hover:bg-blue-50"
              >
                <PlayCircle className="h-4 w-4" />
                Essayer les exercices type bac guidés
              </TrackedLink>
              <TrackedLink
                href="/methodes-maths-terminale/tableau-variation"
                eventName="click_exercise_chapter_method"
                eventParams={{
                  ...chapterEventParams,
                  cta_location: "continue_method",
                }}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-blue-200 px-5 py-3 text-center font-bold text-white hover:bg-blue-900"
              >
                <BookOpenCheck className="h-4 w-4" />
                Voir la méthode tableau de variation
              </TrackedLink>
              <TrackedLink
                href="/planning-revision-bac-maths"
                eventName="click_exercise_chapter_planning"
                eventParams={{
                  ...chapterEventParams,
                  lead_magnet: "planning_bac_maths_2027",
                  cta_location: "continue_planning",
                }}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-blue-200 px-5 py-3 text-center font-bold text-white hover:bg-blue-900"
              >
                <CalendarDays className="h-4 w-4" />
                Recevoir le planning Bac Maths 2027
              </TrackedLink>
              <TrackedLink
                href="/diagnostic"
                eventName="click_exercise_chapter_diagnostic"
                eventParams={{
                  ...chapterEventParams,
                  cta_location: "continue_diagnostic",
                }}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-blue-200 px-5 py-3 text-center font-bold text-white hover:bg-blue-900"
              >
                <Target className="h-4 w-4" />
                Faire le diagnostic gratuit
              </TrackedLink>
              <TrackedLink
                href="/bac-maths-2027#offre"
                eventName="click_exercise_chapter_offer"
                eventParams={{
                  ...chapterEventParams,
                  offer: "pack_revision_express_bac_2027",
                  cta_location: "continue_offer",
                }}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-center font-bold text-white hover:bg-emerald-400 sm:col-span-2 lg:col-span-1"
              >
                Voir le Pack Révision Express
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </div>
          </section>

          <ChapterInternalLinks
            title="Liens utiles"
            links={internalLinks}
            variant="cards"
          />

          <FaqAccordion items={faqItems} sourcePage={pagePath} />
        </div>
      </div>
    </SeoPageLayout>
  );
}
