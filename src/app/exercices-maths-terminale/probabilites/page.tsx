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

const pagePath = "/exercices-maths-terminale/probabilites";

const title = "Exercices Probabilités Terminale corrigés et guidés";
const description =
  "Travaille les probabilités en Terminale avec des exercices corrigés et guidés : probabilités conditionnelles, arbres pondérés, indépendance, loi binomiale et variables aléatoires.";

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

const faqItems: FaqItem[] = [
  {
    question: "Quels exercices de probabilités faut-il savoir faire ?",
    answer:
      "En Terminale, il faut savoir lire une probabilité conditionnelle, compléter ou exploiter un arbre pondéré, reconnaître l'indépendance, identifier une loi binomiale, calculer une probabilité avec cette loi et interpréter une espérance.",
  },
  {
    question: "Comment lire une probabilité conditionnelle ?",
    answer:
      "La notation P_M(P) signifie la probabilité de P sachant que M est réalisé. On lit d'abord la condition, puis l'événement étudié : ici, parmi les élèves qui font maths, on regarde ceux qui font physique.",
  },
  {
    question: "Comment utiliser un arbre pondéré ?",
    answer:
      "On place les événements par étapes, on écrit les probabilités sur les branches, puis on multiplie les probabilités le long d'un chemin. L'arbre aide surtout à ne pas confondre les branches et à garder l'ordre des expériences.",
  },
  {
    question: "Comment reconnaître une loi binomiale ?",
    answer:
      "On vérifie qu'une même expérience de Bernoulli est répétée n fois de façon indépendante, avec la même probabilité de succès p. Si X compte le nombre de succès, alors X suit une loi binomiale B(n ; p).",
  },
  {
    question: "Faut-il connaître les formules par cœur ?",
    answer:
      "Oui, les formules de base sont indispensables, mais elles doivent être reliées à une méthode : identifier les événements, choisir la bonne formule, justifier l'indépendance ou le schéma binomial, puis conclure avec les mots de l'énoncé.",
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
};

const visibleExercises: Exercise[] = [
  {
    id: "exercice-1",
    heading: "Exercice 1 : lire une probabilité conditionnelle",
    label: "Probabilité conditionnelle",
    statement: (
      <>
        Dans une classe, 60 % des élèves font spécialité maths. Parmi eux, 40 %
        font aussi physique. Notons M : “faire maths”, P : “faire physique”.
      </>
    ),
    tasks: ["Donner P(M).", "Donner P_M(P).", "Calculer P(M ∩ P)."],
    guidedStep:
      "La phrase “Parmi eux” signifie que l'on se place déjà dans le groupe des élèves qui font maths : c'est donc une probabilité conditionnelle sachant M.",
    method:
      "On lit directement P(M), puis P_M(P). Pour l'intersection, on utilise P(M ∩ P) = P(M) × P_M(P).",
    correction: [
      "P(M)=0,6.",
      "P_M(P)=0,4.",
      "P(M ∩ P)=0,6×0,4=0,24.",
    ],
    pitfall:
      "Ne lis pas 40 % comme P(P). Ici, 40 % concerne seulement les élèves qui font déjà spécialité maths.",
    revealDetail:
      "Le réflexe SprintMaths : entoure la condition dans la phrase. Dès que tu lis “parmi”, “sachant” ou “chez ceux qui”, cherche quelle probabilité conditionnelle est demandée.",
  },
  {
    id: "exercice-2",
    heading: "Exercice 2 : utiliser un arbre pondéré",
    label: "Arbre pondéré",
    statement: (
      <>
        Une urne contient 3 boules rouges et 2 boules bleues. On tire une boule,
        on la remet, puis on tire une deuxième boule.
      </>
    ),
    tasks: [
      "Calculer la probabilité d’obtenir deux rouges.",
      "Calculer la probabilité d’obtenir une rouge puis une bleue.",
      "Expliquer pourquoi un arbre pondéré est utile.",
    ],
    guidedStep:
      "Comme la boule est remise, la composition de l'urne reste la même au deuxième tirage : P(R)=3/5 et P(B)=2/5 à chaque étape.",
    method:
      "Dans un arbre pondéré, une issue complète correspond à un chemin. On multiplie les probabilités inscrites sur les branches du chemin choisi.",
    correction: [
      "P(R)=3/5 et P(B)=2/5.",
      "P(R puis R)=3/5×3/5=9/25.",
      "P(R puis B)=3/5×2/5=6/25.",
      "L'arbre pondéré est utile pour visualiser les deux tirages et multiplier les bonnes branches dans le bon ordre.",
    ],
    pitfall:
      "Ne transforme pas le deuxième tirage en 2/4 ou 3/4 : il y a remise, donc les probabilités restent 3/5 et 2/5.",
    revealDetail:
      "Le bon automatisme : écris le mot “remise” près de l'arbre. Il te rappelle que la deuxième série de branches garde les mêmes poids que la première.",
  },
  {
    id: "exercice-3",
    heading: "Exercice 3 : reconnaître une loi binomiale",
    label: "Loi binomiale",
    statement: (
      <>
        On répète 10 fois une expérience avec deux issues : succès avec
        probabilité 0,3, échec avec probabilité 0,7. Les répétitions sont
        indépendantes. On note X le nombre de succès.
      </>
    ),
    tasks: [
      "Identifier le nombre de répétitions.",
      "Identifier la probabilité de succès.",
      "Reconnaître la loi suivie par X.",
    ],
    guidedStep:
      "On vérifie les trois indices : deux issues, même probabilité de succès à chaque répétition, répétitions indépendantes.",
    method:
      "Quand X compte le nombre de succès dans n répétitions indépendantes d'une même expérience de Bernoulli de paramètre p, alors X suit B(n ; p).",
    correction: [
      "Le nombre de répétitions est n=10.",
      "La probabilité de succès est p=0,3.",
      "X suit une loi binomiale B(10 ; 0,3).",
    ],
    pitfall:
      "Ne prends pas 0,7 comme paramètre si X compte les succès. Le paramètre p correspond à la probabilité de l'événement compté par X.",
    revealDetail:
      "Pour une copie solide, ne te contente pas d'écrire la loi : cite les mots-clés de l'énoncé, notamment “deux issues” et “indépendantes”.",
  },
];

const lockedExercises = [
  {
    id: "exercice-4",
    heading: "Exercice 4 : calculer avec une loi binomiale",
    label: "Aperçu verrouillé",
    text: "Calculer P(X=3) pour une variable X qui suit une loi binomiale, en utilisant la formule avec le coefficient binomial, p^3 et (1-p)^(n-3).",
  },
  {
    id: "exercice-5",
    heading: "Exercice 5 : interpréter une espérance",
    label: "Aperçu verrouillé",
    text: "Utiliser E(X)=np dans une loi binomiale, puis expliquer ce que cette valeur moyenne signifie dans le contexte de l'exercice.",
  },
];

const internalLinks = [
  {
    href: "/programme-maths-terminale/probabilites",
    label: "Chapitre probabilités Terminale",
  },
  {
    href: "/methodes-maths-terminale/probabilites-conditionnelles",
    label: "Méthode probabilités conditionnelles",
  },
  {
    href: "/exercices-type-bac-maths-terminale",
    label: "Exercices type bac Terminale",
  },
  {
    href: "/programme-maths-terminale/derivation-convexite",
    label: "Chapitre dérivation et convexité Terminale",
  },
  {
    href: "/programme-maths-terminale/fonction-logarithme",
    label: "Chapitre fonction logarithme Terminale",
  },
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
          </div>
          <div>
            <h3 className="font-bold text-slate-950">Piège fréquent</h3>
            <p className="mt-2 leading-7 text-slate-700">{exercise.pitfall}</p>
          </div>
        </div>

        <ChapterExerciseReveal
          chapter="probabilites"
          exerciseId={exercise.id}
          detail={exercise.revealDetail}
          sourcePage={pagePath}
        />
      </article>
    </section>
  );
}

export default function ExercicesProbabilitesTerminalePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Exercices maths Terminale", path: "/exercices-maths-terminale" },
            { name: "Probabilités", path: pagePath },
          ]),
        ]}
      />

      <ChapterHero
        eyebrow="Probabilités Terminale — exercices corrigés et guidés"
        title="Exercices sur les probabilités en Terminale"
        description={
          <>
            Travaille les probabilités conditionnelles, les arbres pondérés,
            l&apos;indépendance, la loi binomiale et l&apos;espérance avec des exercices
            corrigés courts avant de passer à un exercice type bac probabilités
            Terminale.
          </>
        }
        secondaryDescription={
          <>
            Les exercices visibles installent les réflexes essentiels : lire une
            condition, multiplier les bonnes branches, reconnaître une loi et éviter
            les pièges de notation.
          </>
        }
        ctas={[
          {
            href: "/exercices-type-bac-maths-terminale",
            label: "Essayer les exercices type bac guidés",
            eventName: "click_exercise_chapter_typebac",
            eventParams: {
              ...chapterEventParams,
              cta_location: "probabilites_exercises_hero_typebac",
            },
            icon: <PlayCircle className="h-5 w-5" />,
          },
          {
            href: "/methodes-maths-terminale/probabilites-conditionnelles",
            label: "Voir la méthode probabilités conditionnelles",
            eventName: "click_exercise_chapter_method",
            eventParams: {
              ...chapterEventParams,
              cta_location: "probabilites_exercises_hero_method",
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
              href="/programme-maths-terminale/probabilites"
              className="inline-flex items-center gap-2 text-blue-100 hover:text-white"
            >
              Revoir le chapitre probabilités
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/programme-maths-terminale/derivation-convexite"
              className="inline-flex items-center gap-2 text-emerald-100 hover:text-white"
            >
              Relier avec l&apos;analyse
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
                  Exercices guidés sur les probabilités
                </h2>
              </div>
              <div className="space-y-4 text-lg leading-8 text-slate-700">
                <p>
                  Un exercice de probabilités en Terminale se gagne souvent avant
                  le calcul : il faut nommer les événements, lire correctement la
                  condition et choisir entre arbre pondéré, formule conditionnelle
                  ou loi binomiale.
                </p>
                <p>
                  Cette page réunit des probabilités Terminale exercices corrigés
                  pour travailler les automatismes de base : probabilité
                  conditionnelle, arbre pondéré et reconnaissance d&apos;une loi
                  binomiale.
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
                Comment corriger efficacement un exercice de probabilités
              </h2>
            </div>
            <div className="space-y-5 leading-7 text-slate-700">
              <p>
                Ne regarde pas seulement le résultat numérique. Une bonne correction
                de probabilités vérifie d&apos;abord la lecture de l&apos;énoncé : condition,
                ordre des tirages, indépendance et variable étudiée.
              </p>
              <ul className="space-y-3">
                {[
                  "Réécrire les événements avec leurs notations.",
                  "Repérer si l'énoncé demande une probabilité conditionnelle ou une intersection.",
                  "Pour un arbre, multiplier le long d'un chemin et additionner seulement des chemins compatibles.",
                  "Pour une loi binomiale, justifier n, p et l'indépendance avant de calculer.",
                  "Conclure avec une phrase liée au contexte, pas seulement une fraction ou un décimal.",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                Pour revoir la base, consulte aussi la{" "}
                <Link
                  href="/methodes-maths-terminale/probabilites-conditionnelles"
                  className="font-bold text-blue-900 hover:underline"
                >
                  méthode probabilités conditionnelles
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
              Après ces exercices corrigés sur les probabilités, tu peux passer à
              un entraînement type bac guidé, revoir la méthode, construire ton
              planning ou débloquer le Pack Révision Express.
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
                href="/methodes-maths-terminale/probabilites-conditionnelles"
                eventName="click_exercise_chapter_method"
                eventParams={{
                  ...chapterEventParams,
                  cta_location: "continue_method",
                }}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-blue-200 px-5 py-3 text-center font-bold text-white hover:bg-blue-900"
              >
                <BookOpenCheck className="h-4 w-4" />
                Voir la méthode probabilités conditionnelles
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
