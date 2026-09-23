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

const pagePath = "/exercices-maths-terminale/logarithme";

const title = "Exercices Logarithme Terminale corrigés et guidés";
const description =
  "Travaille la fonction logarithme en Terminale avec des exercices corrigés et guidés : domaine de définition, propriétés de ln, équations, dérivée, variations et limites.";

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
  chapter: "logarithme",
  level: "terminale",
  source_page: pagePath,
};

const faqItems: FaqItem[] = [
  {
    question: "Quels exercices de logarithme faut-il savoir faire ?",
    answer:
      "En Terminale, il faut savoir déterminer un domaine de définition, utiliser les propriétés de ln, résoudre une équation logarithmique, dériver une fonction avec logarithme, étudier des variations et traiter des limites simples.",
  },
  {
    question: "Pourquoi faut-il vérifier le domaine de définition ?",
    answer:
      "Le logarithme ln(u) existe seulement lorsque u est strictement positif. Vérifier le domaine dès le départ évite d'accepter une solution interdite ou d'étudier une fonction sur un intervalle où elle n'existe pas.",
  },
  {
    question: "Comment résoudre ln(x)=a ?",
    answer:
      "On vérifie d'abord que x > 0, puis on utilise le fait que la fonction exponentielle est la réciproque de ln : ln(x)=a équivaut à x=e^a.",
  },
  {
    question: "Comment résoudre une équation du type ln(A)+ln(B)=ln(C) ?",
    answer:
      "On commence par le domaine : chaque expression placée dans un logarithme doit être strictement positive, ce qui donne une condition sur x. Sur ce domaine seulement, on regroupe la somme avec ln(A)+ln(B)=ln(AB), puis on utilise que ln est strictement croissante sur ]0,+∞[ : ln(AB)=ln(C) équivaut alors à AB=C. On termine en éliminant les solutions de cette équation qui ne sont pas dans le domaine de départ.",
  },
  {
    question: "Quelle est la dérivée de ln(x) ?",
    answer:
      "Sur ]0,+∞[, la dérivée de ln(x) est 1/x. Pour une expression composée ln(u(x)), la dérivée est u'(x)/u(x), sur les intervalles où u(x) > 0.",
  },
  {
    question: "Comment étudier les variations avec ln ?",
    answer:
      "On commence par le domaine, puis on calcule la dérivée. Ensuite, on étudie son signe sur chaque intervalle du domaine et on conclut avec un tableau de variation clair.",
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
  transfer?: {
    question: string;
    solution: string;
  };
};

const visibleExercises: Exercise[] = [
  {
    id: "exercice-1",
    heading: "Exercice 1 : vérifier le domaine de définition",
    label: "Domaine de définition",
    statement: (
      <>
        On considère la fonction f définie par f(x)=ln(x-2).
      </>
    ),
    tasks: ["Donner le domaine de définition.", "Calculer f(3)."],
    guidedStep:
      "Avant de calculer, on regarde l'intérieur du logarithme : pour que ln(x-2) existe, il faut x-2 > 0.",
    method:
      "Avec une expression ln(u(x)), la condition à poser est toujours u(x) > 0. Une fois le domaine trouvé, on peut remplacer x par 3 si 3 appartient bien à ce domaine.",
    correction: [
      "x-2>0 donc x>2.",
      "Le domaine de définition est ]2,+∞[.",
      "Comme 3 appartient au domaine, f(3)=ln(3-2)=ln(1)=0.",
    ],
    pitfall:
      "Ne commence pas par remplacer x sans vérifier le domaine : un logarithme n'est pas défini lorsque son intérieur est nul ou négatif.",
    revealDetail:
      "Le réflexe SprintMaths : entoure l'intérieur du ln, écris la condition de positivité, puis seulement ensuite fais les calculs demandés.",
  },
  {
    id: "exercice-2",
    heading: "Exercice 2 : résoudre une équation avec ln",
    label: "Équation logarithmique",
    statement: <>Résoudre l&apos;équation ln(x)=2.</>,
    tasks: [
      "Préciser la condition sur x.",
      "Utiliser le lien entre ln et exponentielle.",
      "Donner la solution.",
    ],
    guidedStep:
      "L'équation contient ln(x), donc on commence par la condition x > 0.",
    method:
      "La fonction exponentielle est la réciproque du logarithme népérien : si ln(x)=a avec x > 0, alors x=e^a.",
    correction: [
      "La condition de définition est x>0.",
      "ln(x)=2 équivaut à x=e².",
      "La solution est donc x=e², qui vérifie bien x>0.",
    ],
    pitfall:
      "Ne réponds pas x=2 : le logarithme donne l'exposant, donc il faut revenir avec l'exponentielle.",
    revealDetail:
      "Pour sécuriser une équation avec ln, écris toujours la condition avant la transformation. Ici, e² est positif, donc la solution est compatible avec le domaine.",
  },
  {
    id: "exercice-3",
    heading: "Exercice 3 : dériver une fonction avec logarithme",
    label: "Dérivée de ln",
    statement: (
      <>
        On considère g(x)=x ln(x), définie sur ]0,+∞[.
      </>
    ),
    tasks: ["Calculer g'(x)."],
    guidedStep:
      "La fonction est un produit : x multiplié par ln(x). On utilise donc la formule (uv)' = u'v + uv'.",
    method:
      "On pose u(x)=x et v(x)=ln(x). Alors u'(x)=1 et v'(x)=1/x sur ]0,+∞[.",
    correction: [
      "g'(x)=1×ln(x) + x×(1/x).",
      "Donc g'(x)=ln(x)+1.",
    ],
    pitfall:
      "N'oublie pas la formule du produit : la dérivée de x ln(x) n'est pas seulement 1/x.",
    revealDetail:
      "Le détail qui rapporte des points : indiquer le domaine ]0,+∞[ justifie l'utilisation de la dérivée de ln(x), puis la simplification x×(1/x)=1.",
  },
  {
    id: "exercice-4-equation-deux-logarithmes",
    heading: "Exercice 4 : équation avec deux logarithmes et racine à rejeter",
    label: "Deux ln et domaine",
    statement: (
      <>
        Résoudre l&apos;équation ln(x-1)+ln(x+1)=ln(8).
      </>
    ),
    tasks: [
      "Déterminer l'ensemble des valeurs de x pour lesquelles l'équation a un sens.",
      "Regrouper le membre de gauche en un seul logarithme.",
      "Résoudre l'équation obtenue.",
      "Conclure en ne gardant que les solutions acceptables, puis vérifier.",
    ],
    guidedStep:
      "Il y a deux logarithmes, donc deux conditions à écrire, pas une seule : il faut à la fois x-1 > 0 et x+1 > 0.",
    method:
      "On pose d'abord le domaine en imposant la stricte positivité de chaque expression placée dans un ln. Sur ce domaine uniquement, on utilise ln(a)+ln(b)=ln(ab). Comme ln est strictement croissante sur ]0,+∞[, l'égalité ln(A)=ln(B) équivaut ensuite à A=B. Les valeurs trouvées à la fin doivent être confrontées au domaine du départ.",
    correction: [
      "Conditions de définition : x-1>0 et x+1>0, c'est-à-dire x>1 et x>-1. Les deux conditions sont vérifiées en même temps lorsque x>1 : le domaine est ]1,+∞[.",
      "Sur ]1,+∞[, les deux facteurs sont strictement positifs, donc ln(x-1)+ln(x+1)=ln((x-1)(x+1)).",
      "L'équation devient ln((x-1)(x+1))=ln(8). Comme ln est strictement croissante sur ]0,+∞[, elle équivaut à (x-1)(x+1)=8.",
      "(x-1)(x+1)=x²-1, donc x²-1=8, puis x²=9 : les solutions de cette équation sont x=-3 et x=3.",
      "x=-3 n'appartient pas à ]1,+∞[ : il faut la rejeter, car ln(-3-1)=ln(-4) n'existe pas.",
      "La seule solution est x=3, et l'ensemble des solutions est {3}.",
      "Vérification : ln(3-1)+ln(3+1)=ln(2)+ln(4)=ln(2×4)=ln(8). L'égalité est bien vérifiée.",
    ],
    pitfall:
      "Ne garde pas x=-3 sous prétexte que le produit reste positif. Pour x=-3, on a bien (x-1)(x+1)=(-4)×(-2)=8, donc le produit est positif, mais chacun des deux logarithmes du départ porte sur un nombre négatif : ln(-4) et ln(-2) n'existent pas. Un produit positif ne suffit jamais à définir les deux logarithmes de la somme initiale.",
    revealDetail:
      "L'étape que les correcteurs attendent : écrire le domaine ]1,+∞[ avant toute transformation, puis justifier le regroupement ln(x-1)+ln(x+1)=ln((x-1)(x+1)) par la stricte positivité de chaque facteur sur ce domaine. Sans cette phrase, le passage de la somme au produit n'est pas justifié, même si le résultat final x=3 est juste.",
    transfer: {
      question:
        "À toi : résoudre ln(x-2)+ln(x)=ln(8). Écris le domaine, regroupe les deux logarithmes, résous l'équation obtenue puis conclus.",
      solution:
        "Conditions : x-2>0 et x>0, donc le domaine est ]2,+∞[. Sur ce domaine, l'équation devient ln(x(x-2))=ln(8), donc x(x-2)=8, c'est-à-dire x²-2x-8=0. On reconnaît (x-4)(x+2)=0, donc x=4 ou x=-2. La valeur -2 n'est pas dans ]2,+∞[ et donne ln(-4) : on la rejette, même si le produit (-2)×(-4)=8 est positif. L'ensemble des solutions est {4}, et on vérifie : ln(4-2)+ln(4)=ln(2)+ln(4)=ln(8).",
    },
  },
];

const lockedExercises = [
  {
    id: "exercice-4",
    heading: "Exercice 5 : variations d’une fonction avec ln",
    label: "Aperçu verrouillé",
    text: "Déterminer le domaine, calculer une dérivée avec ln, étudier son signe puis construire le tableau de variation.",
  },
  {
    id: "exercice-5",
    heading: "Exercice 6 : limite avec logarithme",
    label: "Aperçu verrouillé",
    text: "Utiliser les limites de référence de ln, par exemple en +∞ ou en 0+, puis rédiger une conclusion compatible avec le domaine.",
  },
];

const internalLinks = [
  {
    href: "/programme-maths-terminale/fonction-logarithme",
    label: "Chapitre fonction logarithme Terminale",
  },
  {
    href: "/methodes-maths-terminale/logarithme",
    label: "Méthode logarithme Terminale",
  },
  {
    href: "/exercices-type-bac-maths-terminale",
    label: "Exercices type bac Terminale",
  },
  { href: "/programme-maths-terminale/limites", label: "Chapitre limites Terminale" },
  {
    href: "/programme-maths-terminale/derivation-convexite",
    label: "Chapitre dérivation et convexité Terminale",
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

        {exercise.transfer ? (
          <div className="mt-5 border-t border-slate-200 pt-5">
            <h3 className="font-bold text-slate-950">Question de transfert</h3>
            <p className="mt-2 leading-7 text-slate-700">
              {exercise.transfer.question}
            </p>
            <h3 className="mt-4 font-bold text-slate-950">
              Solution de la question de transfert
            </h3>
            <p className="mt-2 leading-7 text-slate-700">
              {exercise.transfer.solution}
            </p>
          </div>
        ) : null}

        <ChapterExerciseReveal
          chapter="logarithme"
          exerciseId={exercise.id}
          detail={exercise.revealDetail}
          sourcePage={pagePath}
        />
      </article>
    </section>
  );
}

export default function ExercicesLogarithmeTerminalePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Exercices maths Terminale", path: "/exercices-maths-terminale" },
            { name: "Logarithme", path: pagePath },
          ]),
        ]}
      />

      <ChapterHero
        eyebrow="Logarithme Terminale — exercices corrigés et guidés"
        title="Exercices sur le logarithme en Terminale"
        description={
          <>
            Travaille la fonction logarithme en Terminale avec des exercices
            corrigés : domaine de définition, propriétés de ln, équation
            logarithmique, dérivée, variations et limites.
          </>
        }
        secondaryDescription={
          <>
            Les corrections restent courtes pour t&apos;aider à repérer la méthode,
            éviter les pièges classiques et passer ensuite à un exercice type bac
            logarithme Terminale.
          </>
        }
        ctas={[
          {
            href: "/exercices-type-bac-maths-terminale",
            label: "Essayer les exercices type bac guidés",
            eventName: "click_exercise_chapter_typebac",
            eventParams: {
              ...chapterEventParams,
              cta_location: "logarithme_exercises_hero_typebac",
            },
            icon: <PlayCircle className="h-5 w-5" />,
          },
          {
            href: "/methodes-maths-terminale/logarithme",
            label: "Voir la méthode logarithme",
            eventName: "click_exercise_chapter_method",
            eventParams: {
              ...chapterEventParams,
              cta_location: "logarithme_exercises_hero_method",
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
              href="/programme-maths-terminale/fonction-logarithme"
              className="inline-flex items-center gap-2 text-blue-100 hover:text-white"
            >
              Revoir la fonction logarithme
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/programme-maths-terminale/derivation-convexite"
              className="inline-flex items-center gap-2 text-emerald-100 hover:text-white"
            >
              Relier avec la dérivation
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
                  Exercices guidés sur le logarithme
                </h2>
              </div>
              <div className="space-y-4 text-lg leading-8 text-slate-700">
                <p>
                  Un exercice ln Terminale corrigé commence presque toujours par
                  une condition : l&apos;expression placée dans le logarithme doit
                  être strictement positive.
                </p>
                <p>
                  Cette page rassemble des exercices logarithme Terminale corrigés
                  pour travailler les automatismes essentiels : domaine,
                  résolution d&apos;équation avec ln, dérivée de ln et préparation aux
                  variations ou aux limites logarithmiques.
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
                Comment corriger efficacement un exercice de logarithme
              </h2>
            </div>
            <div className="space-y-5 leading-7 text-slate-700">
              <p>
                Pour corriger un exercice sur la fonction logarithme, ne regarde pas
                seulement le résultat final. Reprends chaque condition, chaque
                transformation de ln et chaque intervalle utilisé dans la conclusion.
              </p>
              <ul className="space-y-3">
                {[
                  "Écrire le domaine avant de résoudre ou de dériver.",
                  "Vérifier que chaque propriété de ln est utilisée avec des quantités positives.",
                  "Contrôler la solution d'une équation dans le domaine trouvé au départ.",
                  "Relier la dérivée au signe puis aux variations si l'exercice le demande.",
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
                  href="/methodes-maths-terminale/logarithme"
                  className="font-bold text-blue-900 hover:underline"
                >
                  méthode logarithme
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
              Après ces exercices corrigés sur le logarithme, tu peux passer à un
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
                href="/methodes-maths-terminale/logarithme"
                eventName="click_exercise_chapter_method"
                eventParams={{
                  ...chapterEventParams,
                  cta_location: "continue_method",
                }}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-blue-200 px-5 py-3 text-center font-bold text-white hover:bg-blue-900"
              >
                <BookOpenCheck className="h-4 w-4" />
                Voir la méthode logarithme
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
