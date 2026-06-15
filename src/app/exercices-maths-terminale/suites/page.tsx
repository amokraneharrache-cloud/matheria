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
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/seo";
import { ChapterExerciseReveal } from "@/components/marketing/ChapterExerciseReveal";

const pagePath = "/exercices-maths-terminale/suites";

const title = "Exercices Suites Terminale corrigés et guidés";
const description =
  "Travaille les suites en Terminale avec des exercices corrigés et guidés : suites arithmétiques, géométriques, récurrence, variations et limites.";

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

const faqItems: FaqItem[] = [
  {
    question: "Quels types d’exercices sur les suites faut-il savoir faire ?",
    answer:
      "En Terminale, il faut savoir calculer des termes, reconnaître une suite arithmétique ou géométrique, utiliser une formule explicite, rédiger une récurrence, étudier un sens de variation et chercher une limite simple.",
  },
  {
    question: "Comment reconnaître une suite arithmétique ?",
    answer:
      "Une suite est arithmétique lorsque la différence u(n+1) - u(n) est constante. Cette constante est la raison r, et si la suite commence à u0, on peut écrire u(n) = u0 + nr.",
  },
  {
    question: "Comment reconnaître une suite géométrique ?",
    answer:
      "Une suite est géométrique lorsque chaque terme s'obtient en multipliant le précédent par une même raison q. Si v0 est le premier terme, alors v(n) = v0 x q^n.",
  },
  {
    question: "Comment réussir une récurrence ?",
    answer:
      "Il faut rédiger trois moments : vérifier l'initialisation, supposer la propriété vraie au rang n, puis démontrer qu'elle est vraie au rang n+1 avant de conclure pour tout entier naturel n.",
  },
  {
    question: "Faut-il apprendre les formules par cœur ?",
    answer:
      "Oui pour les formules de base, mais l'essentiel est de savoir quand les utiliser. Une formule apprise sans méthode ne suffit pas si l'énoncé demande une justification ou une interprétation.",
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
  firstStep: string;
  method: string;
  correction: string[];
  revealDetail: string;
};

const visibleExercises: Exercise[] = [
  {
    id: "exercice-1",
    heading: "Exercice 1 : reconnaître une suite arithmétique",
    label: "Suite arithmétique",
    statement: (
      <>
        On considère la suite (u_n) définie par u_0 = 3 et, pour tout entier
        naturel n, u_(n+1) = u_n + 4.
      </>
    ),
    tasks: [
      "Calculer u_1 et u_2.",
      "Donner une formule explicite de u_n.",
      "Calculer u_10.",
    ],
    firstStep:
      "On repère que l'on ajoute toujours 4 pour passer d'un terme au suivant : la suite est arithmétique de raison 4.",
    method:
      "Pour une suite arithmétique qui commence à u_0, on utilise u_n = u_0 + nr. Ici, u_0 = 3 et r = 4.",
    correction: [
      "u_1 = 3 + 4 = 7 et u_2 = 7 + 4 = 11.",
      "La formule explicite est u_n = 3 + 4n.",
      "Donc u_10 = 3 + 4 x 10 = 43.",
    ],
    revealDetail:
      "Le réflexe SprintMaths : avant de calculer loin, nomme la nature de la suite et sa raison. Cela évite de refaire dix additions pour u_10.",
  },
  {
    id: "exercice-2",
    heading: "Exercice 2 : suite géométrique et formule explicite",
    label: "Suite géométrique",
    statement: (
      <>
        On considère la suite (v_n) définie par v_0 = 5 et, pour tout entier
        naturel n, v_(n+1) = 2v_n.
      </>
    ),
    tasks: [
      "Calculer v_1 et v_2.",
      "Donner l'expression de v_n en fonction de n.",
      "Interpréter la croissance de la suite.",
    ],
    firstStep:
      "On repère que chaque terme est multiplié par 2 : la suite est géométrique de raison 2.",
    method:
      "Pour une suite géométrique qui commence à v_0, on utilise v_n = v_0 x q^n. Ici, v_0 = 5 et q = 2.",
    correction: [
      "v_1 = 2 x 5 = 10 et v_2 = 2 x 10 = 20.",
      "La formule explicite est v_n = 5 x 2^n.",
      "Comme les termes sont positifs et doublent à chaque rang, la suite est strictement croissante.",
    ],
    revealDetail:
      "Le point à verbaliser dans une copie : une raison q = 2 ne signifie pas seulement que la suite augmente, elle indique que chaque terme est le double du précédent.",
  },
  {
    id: "exercice-3",
    heading: "Exercice 3 : raisonnement par récurrence",
    label: "Récurrence",
    statement: (
      <>
        On considère la suite (u_n) définie par u_0 = 1 et, pour tout entier
        naturel n, u_(n+1) = 0,5u_n + 1. Montrer que u_n &gt; 0 pour tout entier
        naturel n.
      </>
    ),
    tasks: [
      "Écrire l'initialisation.",
      "Formuler l'hypothèse de récurrence.",
      "Démontrer la propriété au rang n+1.",
    ],
    firstStep:
      "On commence au rang 0 : u_0 = 1, donc u_0 > 0. L'initialisation est vraie.",
    method:
      "On suppose u_n > 0 pour un entier n fixé. Alors 0,5u_n > 0, donc 0,5u_n + 1 > 1, et en particulier u_(n+1) > 0.",
    correction: [
      "Initialisation : u_0 = 1 > 0.",
      "Hérédité : si u_n > 0, alors u_(n+1) = 0,5u_n + 1 > 0.",
      "Par récurrence, u_n > 0 pour tout entier naturel n.",
    ],
    revealDetail:
      "Le piège évité : on ne calcule pas seulement les premiers termes. La récurrence sert à justifier la propriété pour tous les rangs.",
  },
];

const lockedExercises = [
  {
    id: "exercice-4",
    heading: "Exercice 4 : sens de variation d’une suite",
    label: "Aperçu verrouillé",
    text: "Étudier le signe de u_(n+1) - u_n pour conclure sur le sens de variation d'une suite définie explicitement.",
  },
  {
    id: "exercice-5",
    heading: "Exercice 5 : limite d’une suite",
    label: "Aperçu verrouillé",
    text: "Reconnaître une limite simple, par exemple une suite du type 2 + 3/(n+1), puis rédiger une conclusion claire.",
  },
];

const internalLinks = [
  { href: "/programme-maths-terminale/suites", label: "Chapitre suites Terminale" },
  {
    href: "/methodes-maths-terminale/etudier-une-suite",
    label: "Méthode suites Terminale",
  },
  { href: "/exercices-type-bac-maths-terminale", label: "Exercices type bac Terminale" },
  { href: "/programme-maths-terminale", label: "Programme maths Terminale" },
  { href: "/bac-maths-2027", label: "Bac Maths 2027" },
  { href: "/planning-revision-bac-maths", label: "Planning révision Bac Maths" },
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
            Essayer les exercices guidés complets
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

        <div className="mt-5 grid gap-5 border-t border-slate-200 pt-5 lg:grid-cols-3">
          <div>
            <h3 className="font-bold text-slate-950">Première étape guidée</h3>
            <p className="mt-2 leading-7 text-slate-700">{exercise.firstStep}</p>
          </div>
          <div>
            <h3 className="font-bold text-slate-950">Méthode</h3>
            <p className="mt-2 leading-7 text-slate-700">{exercise.method}</p>
          </div>
          <div>
            <h3 className="font-bold text-slate-950">Correction courte</h3>
            <ul className="mt-2 space-y-2 leading-7 text-slate-700">
              {exercise.correction.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
        </div>

        <ChapterExerciseReveal
          chapter="suites"
          exerciseId={exercise.id}
          detail={exercise.revealDetail}
          sourcePage={pagePath}
        />
      </article>
    </section>
  );
}

export default function ExercicesSuitesTerminalePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Exercices maths Terminale", path: "/exercices-maths-terminale" },
            { name: "Suites", path: pagePath },
          ]),
        ]}
      />

      <ChapterHero
        eyebrow="Suites Terminale — exercices corrigés et guidés"
        title="Exercices sur les suites en Terminale"
        description={
          <>
            Travaille les suites arithmétiques, géométriques, la récurrence, les
            variations et les limites avec des corrections courtes, puis passe aux
            exercices guidés SprintMaths quand tu veux t&apos;entraîner étape par étape.
          </>
        }
        ctas={[
          {
            href: "/exercices-type-bac-maths-terminale",
            label: "Essayer les exercices type bac guidés",
            eventName: "click_exercise_chapter_typebac",
            eventParams: {
              ...chapterEventParams,
              cta_location: "suites_exercises_hero_typebac",
            },
            icon: <PlayCircle className="h-5 w-5" />,
          },
          {
            href: "/diagnostic",
            label: "Faire le diagnostic gratuit",
            eventName: "click_exercise_chapter_diagnostic",
            eventParams: {
              ...chapterEventParams,
              cta_location: "suites_exercises_hero_diagnostic",
            },
            icon: <Target className="h-5 w-5" />,
            variant: "secondary",
          },
        ]}
      />

      <section className="border-y border-slate-200 bg-slate-950 px-4 py-5 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm font-semibold sm:flex-row sm:items-center sm:justify-between">
          <span>Besoin du cours avant les exercices ?</span>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/programme-maths-terminale/suites"
              className="inline-flex items-center gap-2 text-blue-100 hover:text-white"
            >
              Revoir le chapitre suites
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/programme-maths-terminale"
              className="inline-flex items-center gap-2 text-emerald-100 hover:text-white"
            >
              Voir le programme Terminale
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
                  Exercices guidés sur les suites
                </h2>
              </div>
              <div className="space-y-4 text-lg leading-8 text-slate-700">
                <p>
                  Un exercice de suites devient plus simple quand tu sépares les
                  réflexes : identifier la nature de la suite, écrire la bonne
                  formule, puis justifier proprement la conclusion.
                </p>
                <p>
                  Cette page réunit des exercices suites Terminale corrigés, avec
                  un exercice de suite arithmétique, un exercice de suite géométrique
                  et un exercice de récurrence pour s&apos;entraîner avant un exercice
                  type bac sur les suites.
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
            <section key={exercise.heading} className="scroll-mt-24">
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
                  Débloquer les exercices guidés complets
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
              </article>
            </section>
          ))}

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <ClipboardList className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Comment corriger efficacement un exercice de suites
              </h2>
            </div>
            <div className="space-y-5 leading-7 text-slate-700">
              <p>
                Ne lis pas seulement la réponse finale. Reprends la correction en
                cherchant l&apos;étape qui débloque l&apos;exercice : nature de la suite,
                formule, récurrence, variation ou limite.
              </p>
              <ul className="space-y-3">
                {[
                  "Comparer ton premier réflexe avec la méthode attendue.",
                  "Réécrire la ligne de calcul qui justifie le résultat.",
                  "Conclure avec les mots de la question, pas seulement avec un nombre.",
                  "Refaire un exercice proche sans regarder la correction.",
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
                  href="/methodes-maths-terminale/etudier-une-suite"
                  className="font-bold text-blue-900 hover:underline"
                >
                  méthode pour étudier une suite
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
              Après ces exercices corrigés sur les suites, tu peux passer à un
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
                href="/methodes-maths-terminale/etudier-une-suite"
                eventName="click_exercise_chapter_method"
                eventParams={{
                  ...chapterEventParams,
                  cta_location: "continue_method",
                }}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-blue-200 px-5 py-3 text-center font-bold text-white hover:bg-blue-900"
              >
                <BookOpenCheck className="h-4 w-4" />
                Voir la méthode pour étudier une suite
              </TrackedLink>
              <TrackedLink
                href="/sujets-type-bac-maths-terminale"
                eventName="click_exercise_chapter_subjects"
                eventParams={{
                  ...chapterEventParams,
                  destination_page: "/sujets-type-bac-maths-terminale",
                  intent: "sujets_type_bac",
                  cta_location: "continue_subjects",
                }}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-blue-200 px-5 py-3 text-center font-bold text-white hover:bg-blue-900"
              >
                <ClipboardList className="h-4 w-4" />
                Voir les sujets type bac guidés
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
