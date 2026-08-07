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

const pagePath = "/exercices-maths-terminale/integrales";

const title = "Exercices Intégrales Terminale corrigés et guidés";
const description =
  "Travaille les intégrales en Terminale avec des exercices corrigés et guidés : primitives, calculs d’intégrales, aires sous la courbe et méthodes Bac.";

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

const faqItems: FaqItem[] = [
  {
    question: "Quels exercices d’intégrales faut-il savoir faire ?",
    answer:
      "En Terminale, il faut savoir calculer une intégrale simple avec une primitive, utiliser les bornes dans le bon ordre, appliquer la linéarité, interpréter une intégrale comme une aire et reconnaître le cas de 1/x lié au logarithme.",
  },
  {
    question: "Comment trouver une primitive ?",
    answer:
      "On cherche une fonction F dont la dérivée redonne la fonction f. Pour un polynôme, on utilise les primitives usuelles ; par exemple une primitive de 3x² est x³, car la dérivée de x³ vaut 3x².",
  },
  {
    question: "Quelle erreur éviter avec les bornes ?",
    answer:
      "L’erreur classique est d’inverser les bornes : pour calculer une intégrale de a à b avec une primitive F, il faut écrire F(b)-F(a), c’est-à-dire la borne du haut moins la borne du bas.",
  },
  {
    question: "Pourquoi l’intégrale peut représenter une aire ?",
    answer:
      "Si f est positive sur [a,b], l’intégrale de a à b de f(x) dx correspond à l’aire sous la courbe entre x=a, x=b et l’axe des abscisses.",
  },
  {
    question: "Les intégrales sont-elles liées au logarithme ?",
    answer:
      "Oui. Sur un intervalle où x est strictement positif, une primitive de 1/x est ln(x). C’est un lien fréquent entre primitive, intégrale et fonction logarithme en Terminale.",
  },
  {
    question: "Ces exercices sont-ils des annales officielles ?",
    answer:
      "SprintMaths propose des exercices d’entraînement et des sujets type bac guidés, sans revendiquer qu’il s’agit d’annales officielles.",
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
    heading: "Exercice 1 : calculer une intégrale simple",
    label: "Calcul intégral direct",
    statement: <>Calculer ∫_0^2 3x² dx.</>,
    tasks: [
      "Identifier la fonction à intégrer.",
      "Trouver une primitive de 3x².",
      "Appliquer les bornes 0 et 2.",
    ],
    guidedStep:
      "Pour calculer cette intégrale, on ne dérive pas : on cherche une primitive de la fonction 3x².",
    method:
      "Si F est une primitive de f, alors ∫_a^b f(x) dx = F(b)-F(a). Ici, on prend F(x)=x³.",
    correction: [
      "Une primitive de 3x² est x³.",
      "Donc ∫_0^2 3x² dx = 2³ - 0³ = 8.",
    ],
    pitfall:
      "Ne confonds pas dérivée et primitive : la dérivée de 3x² est 6x, mais une primitive de 3x² est x³.",
    revealDetail:
      "Le réflexe SprintMaths : écris F(x)=x³, puis remplace d’abord par la borne du haut, ensuite par la borne du bas. Cela évite d’inverser F(2)-F(0).",
  },
  {
    id: "exercice-2",
    heading: "Exercice 2 : utiliser une primitive",
    label: "Primitive et bornes",
    statement: (
      <>
        Soit f(x)=2x+1 sur [1,3]. Calculer ∫_1^3 f(x) dx.
      </>
    ),
    tasks: [
      "Proposer une primitive de f.",
      "Calculer F(3) puis F(1).",
      "Faire la différence F(3)-F(1).",
    ],
    guidedStep:
      "La fonction est affine : on cherche une primitive de 2x puis une primitive de 1.",
    method:
      "Une primitive de 2x+1 est F(x)=x²+x. Le calcul d’intégrale utilise ensuite F(b)-F(a), pas f(b)-f(a).",
    correction: [
      "Une primitive est F(x)=x²+x.",
      "F(3)-F(1) = (9+3)-(1+1)=12-2=10.",
    ],
    pitfall:
      "Ne calcule pas f(3)-f(1). Les bornes s’appliquent à une primitive F, pas directement à la fonction f.",
    revealDetail:
      "Pour sécuriser la rédaction, écris la primitive sur une ligne, puis la substitution avec des parenthèses : (9+3)-(1+1). C’est souvent là que les signes se perdent.",
  },
  {
    id: "exercice-3",
    heading: "Exercice 3 : interpréter une intégrale comme une aire",
    label: "Aire sous la courbe",
    statement: (
      <>
        Soit f positive sur [a,b]. Expliquer pourquoi ∫_a^b f(x) dx peut
        représenter une aire.
      </>
    ),
    tasks: [
      "Repérer l’hypothèse de positivité.",
      "Identifier la zone comprise entre la courbe et l’axe des abscisses.",
      "Formuler la conclusion avec les bornes a et b.",
    ],
    guidedStep:
      "L’information clé est que f est positive sur tout l’intervalle : la courbe reste au-dessus de l’axe des abscisses.",
    method:
      "Quand f ≥ 0 sur [a,b], l’intégrale mesure l’aire géométrique comprise entre la courbe de f, l’axe des abscisses et les droites x=a et x=b.",
    correction: [
      "Si f est positive sur [a,b], l’intégrale correspond à l’aire sous la courbe entre a et b.",
    ],
    pitfall:
      "Si la fonction prend des valeurs négatives, l’intégrale devient une aire algébrique : on ne peut pas parler directement d’aire positive sans précaution.",
    revealDetail:
      "Dans une copie, cite toujours l’hypothèse f positive avant de parler d’aire. C’est cette phrase qui justifie l’interprétation géométrique.",
  },
];

const lockedExercises = [
  {
    id: "exercice-4",
    heading: "Exercice 4 : propriétés des intégrales",
    label: "Aperçu verrouillé",
    text: "Utiliser la linéarité pour transformer une somme ou un multiple d’intégrales, puis rédiger proprement la simplification.",
  },
  {
    id: "exercice-5",
    heading: "Exercice 5 : intégrale et fonction logarithme",
    label: "Aperçu verrouillé",
    text: "Calculer une intégrale avec 1/x sur un intervalle positif et utiliser la primitive ln(x) sans oublier le domaine.",
  },
];

const internalLinks = [
  {
    href: "/primitives-terminale-specialite-maths",
    label: "Revoir la méthode des primitives",
  },
  {
    href: "/programme-maths-terminale/integrales",
    label: "Programme Intégrales Terminale",
  },
  {
    href: "/programme-maths-terminale",
    label: "Programme maths Terminale",
  },
  {
    href: "/articles/integrales-terminale-methode",
    label: "Méthode simple sur les intégrales",
  },
  {
    href: "/methodes-maths-terminale/integrales",
    label: "Méthode intégrales Terminale",
  },
  {
    href: "/exercices-type-bac-maths-terminale",
    label: "Exercices type bac Terminale",
  },
  {
    href: "/sujets-type-bac-maths-terminale",
    label: "Sujets type bac maths Terminale",
  },
  {
    href: "/exercices-maths-terminale/logarithme",
    label: "Exercices logarithme Terminale",
  },
  {
    href: "/planning-revision-bac-maths",
    label: "Planning révision Bac Maths",
  },
  { href: "/bac-maths-2027", label: "Bac Maths 2027" },
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
            Essayer les exercices type bac
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
          chapter="integrales"
          exerciseId={exercise.id}
          detail={exercise.revealDetail}
          sourcePage={pagePath}
        />
      </article>
    </section>
  );
}

export default function ExercicesIntegralesTerminalePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Exercices maths Terminale", path: "/exercices-maths-terminale" },
            { name: "Intégrales", path: pagePath },
          ]),
        ]}
      />

      <ChapterHero
        eyebrow="Intégrales Terminale — exercices corrigés et guidés"
        title="Exercices sur les intégrales en Terminale"
        description={
          <>
            Travaille les exercices intégrales Terminale corrigés avec une méthode
            guidée : primitive, calcul intégrale Terminale exercice, propriétés et
            aire sous la courbe exercice Terminale.
          </>
        }
        secondaryDescription={
          <>
            Les exercices visibles installent les réflexes essentiels pour les
            intégrales bac maths exercices corrigés : trouver une primitive,
            appliquer les bornes dans le bon ordre et interpréter le résultat.
          </>
        }
        ctas={[
          {
            href: "/exercices-type-bac-maths-terminale",
            label: "Exercices type bac",
            eventName: "click_exercise_chapter_typebac",
            eventParams: {
              ...chapterEventParams,
              cta_location: "integrales_exercises_hero_typebac",
            },
            icon: <PlayCircle className="h-5 w-5" />,
          },
          {
            href: "/methodes-maths-terminale/integrales",
            label: "Méthode intégrales",
            eventName: "click_exercise_chapter_method",
            eventParams: {
              ...chapterEventParams,
              cta_location: "integrales_exercises_hero_method",
            },
            icon: <BookOpenCheck className="h-5 w-5" />,
            variant: "secondary",
          },
        ]}
      />

      <section className="border-y border-slate-200 bg-slate-950 px-4 py-5 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm font-semibold sm:flex-row sm:items-center sm:justify-between">
          <span>Besoin de revoir la méthode avant les exercices ?</span>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/articles/integrales-terminale-methode"
              className="inline-flex items-center gap-2 text-blue-100 hover:text-white"
            >
              Lire la méthode simple
              <ArrowRight className="h-4 w-4" />
            </Link>
            <TrackedLink
              href="/planning-revision-bac-maths"
              eventName="click_exercise_chapter_planning"
              eventParams={{
                ...chapterEventParams,
                lead_magnet: "planning_bac_maths_2027",
                cta_location: "integrales_exercises_top_band_planning",
              }}
              className="inline-flex items-center gap-2 text-emerald-100 hover:text-white"
            >
              Recevoir le planning Bac Maths 2027
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
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
                  Exercices guidés sur les intégrales
                </h2>
              </div>
              <div className="space-y-4 text-lg leading-8 text-slate-700">
                <p>
                  Un exercice intégrale Terminale se gagne souvent avec trois
                  lignes nettes : choisir une primitive, écrire F(b)-F(a), puis
                  simplifier sans inverser les bornes.
                </p>
                <p>
                  Cette page rassemble des exercices corrigés et guidés pour
                  travailler les primitives, le calcul d’intégrales, la linéarité,
                  l’interprétation comme aire sous la courbe et le cas 1/x lié au
                  logarithme.
                </p>
                <p>
                  Les exemples ci-dessous sont des exercices d’entraînement
                  SprintMaths. Ils préparent aux sujets type bac sans revendiquer
                  le statut d’annales officielles.
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
                Comment corriger efficacement un exercice d’intégrale
              </h2>
            </div>
            <div className="space-y-5 leading-7 text-slate-700">
              <p>
                Pour corriger un exercice d’intégrale, ne regarde pas seulement le
                résultat final. Vérifie la primitive, l’ordre des bornes, les
                parenthèses et le sens de l’interprétation géométrique.
              </p>
              <ul className="space-y-3">
                {[
                  "Dériver la primitive proposée pour vérifier qu’elle redonne la fonction.",
                  "Écrire explicitement F(b)-F(a), avec des parenthèses si F(a) contient plusieurs termes.",
                  "Repérer si l’exercice demande un calcul, une aire ou une propriété de linéarité.",
                  "Pour 1/x, vérifier que l’intervalle reste dans les valeurs strictement positives avant d’utiliser ln(x).",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                Pour revoir le fil complet, consulte aussi la{" "}
                <Link
                  href="/methodes-maths-terminale/integrales"
                  className="font-bold text-blue-900 hover:underline"
                >
                  méthode intégrales
                </Link>
                .
              </p>
            </div>
          </section>

          <section className="rounded-lg bg-blue-950 p-6 text-white sm:p-8">
            <h2 className="text-3xl font-bold">
              Continuer avec les sujets type bac
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-blue-100">
              Après ces exercices corrigés sur les intégrales, passe à un
              entraînement type bac, révise la méthode, construis ton planning ou
              débloque le Pack Révision Express.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <TrackedLink
                href="/sujets-type-bac-maths-terminale"
                eventName="click_exercise_chapter_subjects"
                eventParams={{
                  ...chapterEventParams,
                  destination_page: "/sujets-type-bac-maths-terminale",
                  intent: "sujets_type_bac",
                  cta_location: "continue_subjects",
                }}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-center font-bold text-blue-950 hover:bg-blue-50"
              >
                <ClipboardList className="h-4 w-4" />
                Sujets type bac
              </TrackedLink>
              <TrackedLink
                href="/exercices-type-bac-maths-terminale"
                eventName="click_exercise_chapter_typebac"
                eventParams={{
                  ...chapterEventParams,
                  cta_location: "continue_typebac",
                }}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-blue-200 px-5 py-3 text-center font-bold text-white hover:bg-blue-900"
              >
                <PlayCircle className="h-4 w-4" />
                Exercices type bac
              </TrackedLink>
              <TrackedLink
                href="/methodes-maths-terminale/integrales"
                eventName="click_exercise_chapter_method"
                eventParams={{
                  ...chapterEventParams,
                  cta_location: "continue_method",
                }}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-blue-200 px-5 py-3 text-center font-bold text-white hover:bg-blue-900"
              >
                <BookOpenCheck className="h-4 w-4" />
                Méthode intégrales
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
                Planning
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
                Diagnostic
              </TrackedLink>
              <TrackedLink
                href="/bac-maths-2027#offre"
                eventName="click_exercise_chapter_offer"
                eventParams={{
                  ...chapterEventParams,
                  offer: "pack_revision_express_bac_2027",
                  cta_location: "continue_offer",
                }}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-center font-bold text-white hover:bg-emerald-400"
              >
                Offre
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </div>
          </section>

          <ChapterInternalLinks title="Liens utiles" links={internalLinks} variant="cards" />

          <FaqAccordion items={faqItems} sourcePage={pagePath} />
        </div>
      </div>
    </SeoPageLayout>
  );
}
