import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BookOpenCheck,
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

const pagePath = "/exercices-maths-terminale/limites";

const title = "Exercices Limites Terminale corrigés et guidés";
const description =
  "Travaille les limites en Terminale avec des exercices corrigés et guidés : formes indéterminées, quotients, asymptotes et rédaction.";

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
  chapter: "limites",
  level: "terminale",
  source_page: pagePath,
};

const faqItems: FaqItem[] = [
  {
    question: "Quels exercices de limites faut-il savoir faire en Terminale ?",
    answer:
      "Il faut savoir traiter les limites directes, les quotients de polynômes, les formes indéterminées, quelques limites avec exponentielle ou logarithme, et interpréter les asymptotes.",
  },
  {
    question: "Comment lever une forme indéterminée ?",
    answer:
      "On commence par nommer la forme, puis on transforme l'expression : factorisation, mise au même dénominateur, simplification ou terme dominant selon le cas.",
  },
  {
    question: "Pourquoi factoriser par le terme de plus haut degré ?",
    answer:
      "En l'infini, cette factorisation fait apparaître des termes comme 1/x ou 1/x² qui tendent vers 0. Elle justifie le résultat au lieu de donner seulement une intuition.",
  },
  {
    question: "Comment rédiger une conclusion de limite ?",
    answer:
      "La conclusion doit rappeler la variable, la borne et le résultat. Si l'exercice porte sur une courbe, on ajoute l'interprétation graphique demandée, par exemple une asymptote.",
  },
  {
    question: "Ces exercices sont-ils des annales officielles ?",
    answer:
      "SprintMaths propose des exercices d'entraînement et des exercices type bac guidés, sans revendiquer qu'il s'agit d'annales officielles.",
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
    heading: "Exercice 1 : quotient de polynômes en l'infini",
    label: "Quotient",
    statement: (
      <>
        On considère la fonction f définie par f(x) = (3x² - 2x + 1) / (x² + 4).
        Calculer la limite de f(x) quand x tend vers plus l&apos;infini.
      </>
    ),
    tasks: [
      "Identifier la forme obtenue en l'infini.",
      "Factoriser le numérateur et le dénominateur par x².",
      "Conclure sur la limite.",
    ],
    firstStep:
      "En plus l'infini, le numérateur et le dénominateur tendent vers plus l'infini : on obtient une forme indéterminée du type infini sur infini.",
    method:
      "On factorise par x² en haut et en bas : les termes 1/x et 1/x² tendent vers 0, puis il reste le rapport des coefficients dominants.",
    correction: [
      "f(x) = x²(3 - 2/x + 1/x²) / x²(1 + 4/x²).",
      "Pour x non nul, on simplifie par x².",
      "La limite est donc (3 - 0 + 0) / (1 + 0) = 3.",
    ],
    revealDetail:
      "Le réflexe SprintMaths : ne pas écrire seulement le rapport des coefficients. La factorisation montre pourquoi les autres termes disparaissent.",
  },
  {
    id: "exercice-2",
    heading: "Exercice 2 : forme infini moins infini",
    label: "Terme dominant",
    statement: (
      <>
        On considère g(x) = 2x² - 5x + 1. Calculer la limite de g(x) quand x
        tend vers plus l&apos;infini.
      </>
    ),
    tasks: [
      "Repérer les termes qui divergent.",
      "Mettre en évidence le terme dominant.",
      "Déterminer le signe de la limite.",
    ],
    firstStep:
      "Les termes 2x² et -5x divergent lorsque x tend vers plus l'infini : on obtient une forme indéterminée du type infini moins infini.",
    method:
      "On factorise par x² : g(x) = x²(2 - 5/x + 1/x²). Comme x² tend vers plus l'infini et la parenthèse tend vers 2, la limite est plus l'infini.",
    correction: [
      "g(x) = x²(2 - 5/x + 1/x²).",
      "Quand x tend vers plus l'infini, 1/x et 1/x² tendent vers 0.",
      "La parenthèse tend vers 2 et x² tend vers plus l'infini, donc g(x) tend vers plus l'infini.",
    ],
    revealDetail:
      "Le piège évité : devant infini moins infini, on ne soustrait pas les infinis. On isole le terme dominant.",
  },
  {
    id: "exercice-3",
    heading: "Exercice 3 : asymptote horizontale",
    label: "Interprétation",
    statement: (
      <>
        On considère h(x) = 4 + 3/(x + 1). Calculer la limite de h(x) quand x
        tend vers plus l&apos;infini et interpréter le résultat graphiquement.
      </>
    ),
    tasks: [
      "Utiliser la limite de référence de 1/x.",
      "Trouver la limite de h(x).",
      "Interpréter le résultat pour la courbe de h.",
    ],
    firstStep:
      "Quand x tend vers plus l'infini, x + 1 tend vers plus l'infini, donc 3/(x + 1) tend vers 0.",
    method:
      "On applique les opérations sur les limites : 4 reste constant et le terme fractionnaire tend vers 0.",
    correction: [
      "lim 3/(x + 1) = 0 quand x tend vers plus l'infini.",
      "Donc lim h(x) = 4 + 0 = 4.",
      "La droite d'équation y = 4 est une asymptote horizontale à la courbe de h en plus l'infini.",
    ],
    revealDetail:
      "La conclusion attendue ne s'arrête pas au nombre 4 si l'énoncé demande une interprétation graphique.",
  },
];

const lockedExercises = [
  {
    id: "exercice-4",
    heading: "Exercice 4 : limite avec logarithme",
    label: "Aperçu verrouillé",
    text: "Reconnaître le domaine, utiliser les limites de référence de ln et conclure proprement.",
  },
  {
    id: "exercice-5",
    heading: "Exercice 5 : croissance comparée",
    label: "Aperçu verrouillé",
    text: "Comparer une exponentielle et une puissance dans une limite type bac.",
  },
];

const internalLinks = [
  { href: "/programme-maths-terminale/limites", label: "Chapitre limites Terminale" },
  {
    href: "/methodes-maths-terminale/calculer-une-limite",
    label: "Méthode limites Terminale",
  },
  { href: "/exercices-type-bac-maths-terminale", label: "Exercices type bac Terminale" },
  { href: "/programme-maths-terminale", label: "Programme maths Terminale" },
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
            <ul className="mt-2 space-y-2 text-slate-700">
              {exercise.correction.map((item) => (
                <li key={item} className="leading-7">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-5 rounded-xl bg-emerald-50 p-4">
          <p className="font-bold text-emerald-900">À retenir</p>
          <p className="mt-2 leading-7 text-emerald-950">{exercise.revealDetail}</p>
        </div>
      </article>
    </section>
  );
}

export default function ExercicesLimitesTerminalePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Exercices maths Terminale", path: "/exercices-maths-terminale" },
            { name: "Exercices limites Terminale", path: pagePath },
          ]),
        ]}
      />

      <ChapterHero
        eyebrow="Limites Terminale — exercices corrigés et guidés"
        title="Exercices sur les limites en Terminale"
        description={
          <>
            Travaille les quotients de polynômes, les formes indéterminées et les
            asymptotes avec des exercices courts, puis passe aux exercices type bac
            guidés.
          </>
        }
        secondaryDescription={
          <>
            Les corrections visibles donnent la méthode sans remplacer
            l&apos;entraînement complet du pack. Le but est d&apos;apprendre à choisir
            la transformation utile.
          </>
        }
        ctas={[
          {
            href: "/exercices-type-bac-maths-terminale",
            label: "Essayer un exercice type bac guidé",
            eventName: "click_exercise_chapter_typebac",
            eventParams: {
              ...chapterEventParams,
              cta_location: "limits_exercises_hero_typebac",
            },
            icon: <PlayCircle className="h-5 w-5" />,
          },
          {
            href: "/methodes-maths-terminale/calculer-une-limite",
            label: "Revoir la méthode limites",
            eventName: "click_exercise_chapter_method",
            eventParams: {
              ...chapterEventParams,
              cta_location: "limits_exercises_hero_method",
            },
            icon: <BookOpenCheck className="h-5 w-5" />,
            variant: "secondary",
          },
        ]}
      />

      <div className="px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-14">
          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <Target className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Comment utiliser ces exercices
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                Commence par identifier la forme de la limite, puis écris la
                transformation avant de calculer. Cette page donne quelques
                corrections courtes pour installer les réflexes de base.
              </p>
              <p>
                Si une étape bloque, reviens à la méthode détaillée plutôt que de
                relire tout le programme. Les limites progressent vite quand on
                classe les erreurs par type de forme indéterminée.
              </p>
            </div>
          </section>

          {visibleExercises.map((exercise) => (
            <ExerciseSection key={exercise.id} exercise={exercise} />
          ))}

          <section>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-bold text-slate-950">
                  Aperçu des exercices guidés complets
                </h2>
                <p className="mt-3 max-w-3xl leading-7 text-slate-700">
                  Le pack va plus loin avec des étapes guidées, des corrections
                  progressives et une note indicative pour prioriser les prochaines étapes.
                </p>
              </div>
              <TrackedLink
                href="/bac-maths-2027#offre"
                eventName="click_exercise_chapter_offer"
                eventParams={{
                  ...chapterEventParams,
                  offer: "pack_revision_express_bac_2027",
                  cta_location: "limits_locked_top",
                }}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-blue-900 px-5 py-3 text-center font-bold text-white hover:bg-blue-800"
              >
                Voir le pack
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {lockedExercises.map((exercise) => (
                <article key={exercise.id} className="rounded-xl bg-slate-50 p-5">
                  <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase text-slate-600">
                    <LockKeyhole className="h-4 w-4" />
                    {exercise.label}
                  </p>
                  <h3 className="mt-4 text-xl font-bold text-slate-950">
                    {exercise.heading}
                  </h3>
                  <p className="mt-2 leading-7 text-slate-700">{exercise.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-xl bg-blue-950 p-6 text-white sm:p-8">
            <h3 className="text-3xl font-bold">Continuer après les exercices</h3>
            <p className="mt-4 max-w-3xl leading-7 text-blue-100">
              Après ces exercices corrigés sur les limites, tu peux revoir le
              chapitre, travailler la méthode détaillée ou passer à un exercice type
              bac guidé.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TrackedLink
                href="/methodes-maths-terminale/calculer-une-limite"
                eventName="click_exercise_chapter_method"
                eventParams={{
                  ...chapterEventParams,
                  cta_location: "limits_exercises_final_method",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-white px-5 py-3 text-center font-bold text-blue-950 hover:bg-blue-50 sm:w-auto"
              >
                Revoir la méthode
              </TrackedLink>
              <TrackedLink
                href="/exercices-type-bac-maths-terminale"
                eventName="click_exercise_chapter_typebac"
                eventParams={{
                  ...chapterEventParams,
                  cta_location: "limits_exercises_final_typebac",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-blue-200 px-5 py-3 text-center font-bold text-white hover:bg-blue-900 sm:w-auto"
              >
                Essayer un exercice type bac
              </TrackedLink>
              <TrackedLink
                href="/sujets-type-bac-maths-terminale"
                eventName="click_exercise_chapter_subjects"
                eventParams={{
                  ...chapterEventParams,
                  destination_page: "/sujets-type-bac-maths-terminale",
                  intent: "sujets_type_bac",
                  cta_location: "limits_exercises_final_subjects",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-blue-200 px-5 py-3 text-center font-bold text-white hover:bg-blue-900 sm:w-auto"
              >
                <ClipboardList className="h-4 w-4" />
                Voir les sujets type bac guidés
              </TrackedLink>
              <Link
                href="/programme-maths-terminale/limites"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-emerald-500 px-5 py-3 text-center font-bold text-white hover:bg-emerald-400 sm:w-auto"
              >
                Revoir le chapitre limites
              </Link>
              <TrackedLink
                href="/planning-revision-bac-maths"
                eventName="click_exercise_chapter_planning"
                eventParams={{
                  ...chapterEventParams,
                  lead_magnet: "planning_bac_maths_2027",
                  cta_location: "limits_exercises_final_planning",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-blue-200 px-5 py-3 text-center font-bold text-white hover:bg-blue-900 sm:w-auto"
              >
                Recevoir le planning Bac Maths 2027
              </TrackedLink>
              <TrackedLink
                href="/diagnostic"
                eventName="click_exercise_chapter_diagnostic"
                eventParams={{
                  ...chapterEventParams,
                  cta_location: "limits_exercises_final_diagnostic",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-blue-200 px-5 py-3 text-center font-bold text-white hover:bg-blue-900 sm:w-auto"
              >
                Faire le diagnostic gratuit
              </TrackedLink>
            </div>
          </section>

          <ChapterInternalLinks
            title="Continuer dans le cluster limites"
            links={internalLinks}
          />

          <FaqAccordion items={faqItems} sourcePage={pagePath} />
        </div>
      </div>
    </SeoPageLayout>
  );
}
