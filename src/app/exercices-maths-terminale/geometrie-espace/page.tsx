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

const pagePath = "/exercices-maths-terminale/geometrie-espace";

const title = "Exercices Géométrie dans l’espace Terminale corrigés";
const description =
  "Travaille la géométrie dans l’espace en Terminale avec des exercices corrigés et guidés : vecteurs, droites, plans, représentations paramétriques, équations cartésiennes et produit scalaire.";

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
  chapter: "geometrie-espace",
  level: "terminale",
  source_page: pagePath,
};

const faqItems: FaqItem[] = [
  {
    question: "Quels exercices de géométrie dans l’espace faut-il savoir faire ?",
    answer:
      "En Terminale, il faut savoir calculer des coordonnées de vecteurs, donner une représentation paramétrique de droite, utiliser une équation cartésienne de plan, reconnaître un vecteur normal, vérifier une appartenance et utiliser le produit scalaire dans l’espace.",
  },
  {
    question: "Comment trouver une représentation paramétrique ?",
    answer:
      "On part d’un point de la droite et d’un vecteur directeur. Si A(x_A, y_A, z_A) est un point et u(a,b,c) un vecteur directeur, on peut écrire x = x_A + at, y = y_A + bt, z = z_A + ct avec t réel.",
  },
  {
    question: "Comment savoir si un point appartient à un plan ?",
    answer:
      "On remplace les coordonnées du point dans l’équation cartésienne du plan. Si l’égalité donne 0, le point appartient au plan. Sinon, il n’appartient pas au plan.",
  },
  {
    question: "À quoi sert un vecteur normal ?",
    answer:
      "Un vecteur normal est orthogonal au plan. Dans une équation ax + by + cz + d = 0, le vecteur n(a,b,c) est un vecteur normal du plan et sert à étudier l’orthogonalité ou à construire l’équation du plan.",
  },
  {
    question: "Comment utiliser le produit scalaire dans l’espace ?",
    answer:
      "On utilise la même logique que dans le plan : si le produit scalaire de deux vecteurs est nul, les vecteurs sont orthogonaux. En coordonnées, on calcule xx' + yy' + zz'.",
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
    heading: "Exercice 1 : calculer un vecteur dans l’espace",
    label: "Vecteur dans l’espace",
    statement: (
      <>
        On considère les points A(1,2,3) et B(4,0,5) dans un repère de
        l’espace.
      </>
    ),
    tasks: ["Calculer le vecteur AB.", "Interpréter ce vecteur."],
    guidedStep:
      "On soustrait les coordonnées de A à celles de B, coordonnée par coordonnée : x_B - x_A, y_B - y_A, puis z_B - z_A.",
    method:
      "Pour deux points A(x_A, y_A, z_A) et B(x_B, y_B, z_B), le vecteur AB a pour coordonnées (x_B - x_A, y_B - y_A, z_B - z_A).",
    correction: [
      "AB = (4-1, 0-2, 5-3) = (3, -2, 2).",
      "Cela signifie que pour aller de A vers B, on avance de 3 unités selon x, on recule de 2 unités selon y et on monte de 2 unités selon z.",
    ],
    pitfall:
      "Ne calcule pas BA à la place de AB : inverser l’ordre des points change tous les signes du vecteur.",
    revealDetail:
      "Le réflexe SprintMaths : écris toujours la formule avec B moins A avant de remplacer. En géométrie dans l’espace, l’erreur la plus rapide est souvent une inversion de sens.",
  },
  {
    id: "exercice-2",
    heading: "Exercice 2 : vérifier une représentation paramétrique",
    label: "Représentation paramétrique",
    statement: (
      <>
        La droite d passe par A(1,2,3) et admet pour vecteur directeur
        u(2,-1,4).
      </>
    ),
    tasks: ["Donner une représentation paramétrique de d."],
    guidedStep:
      "Le point A donne les constantes de départ. Le vecteur directeur u donne les coefficients placés devant le paramètre t.",
    method:
      "Une droite passant par A(x_A, y_A, z_A) et de vecteur directeur u(a,b,c) peut s’écrire x = x_A + at, y = y_A + bt, z = z_A + ct, avec t réel.",
    correction: ["x = 1 + 2t", "y = 2 - t", "z = 3 + 4t", "avec t réel."],
    pitfall:
      "Ne mets pas les coordonnées du vecteur directeur comme un point. Elles indiquent la direction de la droite, pas un point par lequel elle passe forcément.",
    revealDetail:
      "Pour vérifier l’écriture, prends t=0 : on retrouve A(1,2,3). Puis lis les coefficients de t : ils redonnent bien le vecteur directeur u(2,-1,4).",
  },
  {
    id: "exercice-3",
    heading: "Exercice 3 : utiliser une équation cartésienne de plan",
    label: "Équation cartésienne de plan",
    statement: (
      <>
        On considère le plan P d’équation 2x - y + z - 5 = 0 et le point
        A(1,2,3).
      </>
    ),
    tasks: [
      "Vérifier si A appartient à P.",
      "Donner un vecteur normal du plan.",
    ],
    guidedStep:
      "Pour tester l’appartenance, on remplace x, y et z par les coordonnées de A dans l’équation du plan.",
    method:
      "Dans une équation ax + by + cz + d = 0, le vecteur n(a,b,c) est un vecteur normal du plan. Pour un point, le calcul doit donner 0 si le point appartient au plan.",
    correction: [
      "2×1 - 2 + 3 - 5 = -2, donc A n’appartient pas à P.",
      "Un vecteur normal est n(2,-1,1).",
    ],
    pitfall:
      "Ne conclus pas trop vite parce que le calcul est proche de 0. En géométrie analytique, il faut obtenir exactement 0 pour valider l’appartenance.",
    revealDetail:
      "Le bon ordre : test du point d’abord, lecture du vecteur normal ensuite. Ici, les coefficients 2, -1 et 1 se lisent directement dans 2x - y + z - 5 = 0.",
  },
];

const lockedExercises = [
  {
    id: "exercice-4",
    heading: "Exercice 4 : vecteur normal et orthogonalité",
    label: "Aperçu verrouillé",
    text: "Utiliser un vecteur normal et un produit scalaire nul pour montrer qu’une droite est orthogonale à un plan ou qu’un vecteur est perpendiculaire à une direction donnée.",
  },
  {
    id: "exercice-5",
    heading: "Exercice 5 : produit scalaire dans l’espace",
    label: "Aperçu verrouillé",
    text: "Combiner produit scalaire et intersection droite/plan : remplacer la représentation paramétrique dans l’équation du plan, résoudre le paramètre, puis vérifier la cohérence géométrique.",
  },
];

const internalLinks = [
  {
    href: "/programme-maths-terminale/geometrie-espace",
    label: "Chapitre géométrie dans l’espace",
  },
  {
    href: "/methodes-maths-terminale/geometrie-espace",
    label: "Méthode géométrie dans l’espace",
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
    href: "/programme-maths-terminale",
    label: "Programme maths Terminale",
  },
  {
    href: "/exercices-maths-terminale",
    label: "Tous les exercices Terminale",
  },
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
          </div>
          <div>
            <h3 className="font-bold text-slate-950">Piège fréquent</h3>
            <p className="mt-2 leading-7 text-slate-700">{exercise.pitfall}</p>
          </div>
        </div>

        <ChapterExerciseReveal
          chapter="geometrie-espace"
          exerciseId={exercise.id}
          detail={exercise.revealDetail}
          sourcePage={pagePath}
        />
      </article>
    </section>
  );
}

export default function ExercicesGeometrieEspacePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Exercices maths Terminale", path: "/exercices-maths-terminale" },
            { name: "Géométrie dans l’espace", path: pagePath },
          ]),
        ]}
      />

      <ChapterHero
        eyebrow="Géométrie dans l’espace Terminale — exercices corrigés"
        title="Exercices de géométrie dans l’espace en Terminale"
        description={
          <>
            Travaille les vecteurs, droites, plans, représentations paramétriques,
            équations cartésiennes et produit scalaire avec des exercices corrigés
            et guidés, pensés pour consolider les bases avant un exercice type bac
            géométrie espace Terminale.
          </>
        }
        secondaryDescription={
          <>
            Les exercices visibles installent les réflexes essentiels : calculer
            coordonnée par coordonnée, lire un vecteur directeur, tester un point
            dans un plan et reconnaître un vecteur normal.
          </>
        }
        ctas={[
          {
            href: "/exercices-type-bac-maths-terminale",
            label: "Essayer les exercices type bac guidés",
            eventName: "click_exercise_chapter_typebac",
            eventParams: {
              ...chapterEventParams,
              cta_location: "geometrie_exercises_hero_typebac",
            },
            icon: <PlayCircle className="h-5 w-5" />,
          },
          {
            href: "/methodes-maths-terminale/geometrie-espace",
            label: "Voir la méthode géométrie dans l’espace",
            eventName: "click_exercise_chapter_method",
            eventParams: {
              ...chapterEventParams,
              cta_location: "geometrie_exercises_hero_method",
            },
            icon: <BookOpenCheck className="h-5 w-5" />,
            variant: "secondary",
          },
        ]}
      />

      <section className="border-y border-slate-200 bg-slate-950 px-4 py-5 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm font-semibold sm:flex-row sm:items-center sm:justify-between">
          <span>Besoin du chapitre avant les exercices ?</span>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/programme-maths-terminale/geometrie-espace"
              className="inline-flex items-center gap-2 text-blue-100 hover:text-white"
            >
              Revoir le chapitre géométrie dans l’espace
              <ArrowRight className="h-4 w-4" />
            </Link>
            <TrackedLink
              href="/planning-revision-bac-maths"
              eventName="click_exercise_chapter_planning"
              eventParams={{
                ...chapterEventParams,
                lead_magnet: "planning_bac_maths_2027",
                cta_location: "geometrie_exercises_top_band_planning",
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
                  Exercices guidés de géométrie dans l’espace
                </h2>
              </div>
              <div className="space-y-4 text-lg leading-8 text-slate-700">
                <p>
                  Un exercice géométrie dans l’espace Terminale se gagne en
                  gardant les coordonnées sous contrôle. Avant de chercher une
                  formule, il faut identifier l’objet : point, vecteur, droite ou
                  plan.
                </p>
                <p>
                  Cette page réunit des exercices géométrie espace Terminale
                  corrigés pour travailler les questions fréquentes : vecteur AB,
                  représentation paramétrique droite Terminale exercice, équation
                  cartésienne plan Terminale exercice et vecteur normal plan
                  Terminale exercice.
                </p>
                <p>
                  Les exemples ci-dessous sont des exercices d’entraînement. Ils
                  préparent au raisonnement attendu dans un exercice type bac
                  géométrie espace Terminale, sans revendiquer le statut d’annales
                  officielles.
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
                Comment corriger efficacement un exercice de géométrie dans l’espace
              </h2>
            </div>
            <div className="space-y-5 leading-7 text-slate-700">
              <p>
                Une bonne correction ne vérifie pas seulement le résultat final.
                Elle contrôle l’objet manipulé, le sens du vecteur, les coordonnées
                substituées et la phrase de conclusion.
              </p>
              <ul className="space-y-3">
                {[
                  "Écrire les coordonnées dans le bon ordre avant de calculer.",
                  "Pour une droite, distinguer point de passage et vecteur directeur.",
                  "Pour un plan, remplacer les coordonnées du point dans l’équation.",
                  "Lire le vecteur normal dans les coefficients de ax + by + cz + d = 0.",
                  "Avec un produit scalaire, conclure sur l’orthogonalité seulement si le résultat est nul.",
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
                  href="/methodes-maths-terminale/geometrie-espace"
                  className="font-bold text-blue-900 hover:underline"
                >
                  méthode géométrie dans l’espace
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
              Après ces exercices corrigés, passe à un entraînement type bac guidé,
              révise la méthode, construis ton planning ou débloque le Pack
              Révision Express.
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
                <PlayCircle className="h-4 w-4" />
                Voir les sujets type bac guidés
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
                Essayer les exercices type bac guidés
              </TrackedLink>
              <TrackedLink
                href="/methodes-maths-terminale/geometrie-espace"
                eventName="click_exercise_chapter_method"
                eventParams={{
                  ...chapterEventParams,
                  cta_location: "continue_method",
                }}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-blue-200 px-5 py-3 text-center font-bold text-white hover:bg-blue-900"
              >
                <BookOpenCheck className="h-4 w-4" />
                Voir la méthode géométrie dans l’espace
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
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-center font-bold text-white hover:bg-emerald-400"
              >
                Voir le Pack Révision Express
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
