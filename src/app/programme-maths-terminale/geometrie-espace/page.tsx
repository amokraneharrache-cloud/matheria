import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  ClipboardList,
  PlayCircle,
  Ruler,
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

const pagePath = "/programme-maths-terminale/geometrie-espace";

const title = "Géométrie dans l’espace en Terminale : programme et méthodes";
const description =
  "Résumé du chapitre Géométrie dans l’espace en Terminale spécialité maths : vecteurs, droites, plans, équations cartésiennes, représentations paramétriques et exercices corrigés.";

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

const notions = [
  "lire des coordonnées de points",
  "calculer les coordonnées d’un vecteur",
  "vérifier si deux vecteurs sont colinéaires",
  "utiliser un vecteur directeur",
  "écrire ou reconnaître une représentation paramétrique",
  "utiliser une équation cartésienne de plan",
  "identifier un vecteur normal",
  "utiliser le produit scalaire",
  "vérifier une appartenance à une droite ou un plan",
  "interpréter une intersection",
];

const chapterBlocks = [
  {
    title: "Coordonnées et vecteurs",
    text: "Le chapitre commence par la lecture des points et le calcul des vecteurs coordonnée par coordonnée.",
  },
  {
    title: "Droites et représentations paramétriques",
    text: "Une droite se décrit avec un point, un vecteur directeur et un paramètre commun aux trois coordonnées.",
  },
  {
    title: "Plans et vecteurs normaux",
    text: "Une équation ax + by + cz + d = 0 donne un vecteur normal n(a ; b ; c).",
  },
  {
    title: "Produit scalaire dans l’espace",
    text: "Le produit scalaire sert à justifier une orthogonalité entre deux directions ou entre une droite et un plan.",
  },
];

const revisionSteps = [
  "Traduire l’énoncé en points, vecteurs, droites et plans.",
  "Calculer les coordonnées utiles avant de choisir une formule.",
  "Tester l’appartenance d’un point par substitution.",
  "Justifier la direction avec un vecteur directeur ou un vecteur normal.",
  "Revenir aux mots de l’énoncé pour interpréter l’intersection ou l’orthogonalité.",
];

const recommendedExercises = [
  {
    title: "Coordonnées et vecteurs",
    text: "Calculer un vecteur, tester une colinéarité et justifier un alignement.",
  },
  {
    title: "Droite paramétrique",
    text: "Reconnaître une représentation paramétrique et vérifier l’appartenance d’un point.",
  },
  {
    title: "Plan et vecteur normal",
    text: "Utiliser une équation cartésienne de plan et conclure sur une orthogonalité.",
  },
];

const internalLinks = [
  {
    href: "/methodes-maths-terminale/geometrie-espace",
    label: "Méthode géométrie dans l’espace",
  },
  {
    href: "/exercices-maths-terminale/geometrie-espace",
    label: "Exercices géométrie dans l’espace",
  },
  {
    href: "/exercices-type-bac-maths-terminale",
    label: "Exercices type bac Terminale",
  },
  {
    href: "/sujets-type-bac-maths-terminale",
    label: "Sujets type bac guidés",
  },
  {
    href: "/methodes-maths-terminale",
    label: "Toutes les méthodes Terminale",
  },
  {
    href: "/exercices-maths-terminale",
    label: "Tous les exercices Terminale",
  },
  { href: "/programme-maths-terminale", label: "Programme maths Terminale" },
  { href: "/bac-maths-2027", label: "Bac Maths 2027" },
  { href: "/planning-revision-bac-maths", label: "Planning Bac Maths 2027" },
  { href: "/diagnostic", label: "Diagnostic gratuit" },
];

const faqItems: FaqItem[] = [
  {
    question: "La géométrie dans l’espace tombe-t-elle souvent au Bac ?",
    answer:
      "La géométrie dans l’espace est un chapitre classique de Terminale spécialité maths. On ne peut jamais garantir qu’un chapitre précis tombera au Bac, mais il est utile de maîtriser les méthodes de lecture, de calcul et de justification.",
  },
  {
    question: "Comment reconnaître une représentation paramétrique ?",
    answer:
      "Une représentation paramétrique d’une droite donne x, y et z en fonction d’un même paramètre. On y retrouve un point de la droite et un vecteur directeur qui indique sa direction.",
  },
  {
    question: "À quoi sert un vecteur normal ?",
    answer:
      "Un vecteur normal est orthogonal à un plan. Dans une équation cartésienne ax + by + cz + d = 0, le vecteur de coordonnées (a, b, c) est un vecteur normal au plan.",
  },
  {
    question: "Comment savoir si un point appartient à un plan ?",
    answer:
      "On remplace les coordonnées du point dans l’équation cartésienne du plan. Si l’égalité est vérifiée, le point appartient au plan ; sinon, il n’y appartient pas.",
  },
  {
    question: "Comment utiliser le produit scalaire dans l’espace ?",
    answer:
      "Le produit scalaire se calcule avec les coordonnées des deux vecteurs. Il sert notamment à montrer que deux vecteurs sont orthogonaux lorsque leur produit scalaire est égal à 0.",
  },
  {
    question: "Que faire si je bloque sur un exercice de géométrie ?",
    answer:
      "Il faut revenir à la traduction de l’énoncé : quels sont les points, les vecteurs, les droites, les plans et ce que l’on doit vérifier ? Un exercice guidé aide ensuite à reprendre les calculs dans le bon ordre.",
  },
];

export default function ProgrammeGeometrieEspaceTerminalePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Programme maths Terminale", path: "/programme-maths-terminale" },
            { name: "Géométrie dans l’espace", path: pagePath },
          ]),
        ]}
      />

      <ChapterHero
        eyebrow="Programme géométrie dans l’espace Terminale"
        title="Géométrie dans l’espace en Terminale : ce qu’il faut savoir pour le Bac"
        description={
          <>
            Ce guide résume le chapitre géométrie dans l’espace Terminale :
            vecteurs, droites, plans, représentation paramétrique de droite,
            équation cartésienne de plan, orthogonalité et produit scalaire.
          </>
        }
        secondaryDescription={
          <>
            L’objectif n’est pas de refaire tout le cours. La priorité est de bien
            traduire les objets de l’énoncé, puis de choisir la bonne représentation
            avant de calculer.
          </>
        }
        ctas={[
          {
            href: "/exercices-maths-terminale/geometrie-espace",
            label: "Faire des exercices de géométrie dans l’espace",
            eventName: "click_chapter_exercise_cta",
            eventParams: {
              ...chapterEventParams,
              cta_location: "chapter_hero_primary",
            },
            icon: <PlayCircle className="h-5 w-5" />,
          },
          {
            href: "/methodes-maths-terminale/geometrie-espace",
            label: "Voir la méthode géométrie dans l’espace",
            eventName: "click_chapter_method_cta",
            eventParams: {
              ...chapterEventParams,
              cta_location: "chapter_hero_secondary",
            },
            icon: <BookOpenCheck className="h-5 w-5" />,
            variant: "secondary",
          },
        ]}
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
            <TrackedLink
              href="/sujets-type-bac-maths-terminale"
              eventName="click_chapter_subjects_cta"
              eventParams={{
                ...chapterEventParams,
                cta_location: "chapter_top_band_subjects",
              }}
              className="inline-flex items-center gap-2 text-amber-100 hover:text-white"
            >
              Voir les sujets type bac
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
                Pourquoi la géométrie dans l’espace est importante au Bac
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                La géométrie dans l’espace est un chapitre classique de Terminale
                spécialité maths. Elle oblige à lire précisément l’énoncé, à
                identifier les objets et à justifier chaque calcul.
              </p>
              <p>
                On ne peut pas garantir qu’un chapitre tombera au Bac. En revanche,
                ce chapitre entraîne des réflexes très utiles : traduire une
                situation, vérifier une appartenance, exploiter un vecteur directeur
                ou un vecteur normal, puis conclure proprement.
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
                Cette checklist couvre les automatismes du programme géométrie
                espace Terminale, sans transformer la page en cours exhaustif.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {notions.map((notion) => (
                <li
                  key={notion}
                  className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />
                  <span className="leading-7 text-slate-700">{notion}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <Sigma className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Vecteurs dans l’espace
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                Un point se repère par ses coordonnées et un vecteur donne une
                direction. Les coordonnées d’un vecteur se calculent par différence
                entre le point d’arrivée et le point de départ.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {chapterBlocks.map((block) => (
                <article
                  key={block.title}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <h3 className="text-xl font-bold text-slate-950">
                    {block.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-700">{block.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <Ruler className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Droites et plans
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                Une droite peut être définie par un point et un vecteur directeur.
                Un plan peut être défini par une équation cartésienne ou par des
                informations qui permettent d’identifier ses directions.
              </p>
              <p>
                Beaucoup d’erreurs viennent d’une mauvaise lecture de l’énoncé :
                on confond la direction d’une droite, la position d’un point ou le
                rôle d’un vecteur normal.
              </p>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <Ruler className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Représentation paramétrique d’une droite
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                Une représentation paramétrique d’une droite s’appuie sur un point
                de la droite et un vecteur directeur. Le même paramètre décrit les
                trois coordonnées x, y et z.
              </p>
              <p>
                Pour vérifier qu’un point appartient à la droite, on remplace ses
                coordonnées et on cherche si une seule valeur du paramètre convient
                pour les trois lignes.
              </p>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <ClipboardList className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Équation cartésienne d’un plan
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                Un plan peut être défini par une équation cartésienne de la forme
                ax + by + cz + d = 0. Pour tester l’appartenance d’un point, on
                remplace x, y et z par ses coordonnées.
              </p>
              <p>
                Dans cette équation, le vecteur n(a, b, c) est un vecteur normal au
                plan. C’est un repère essentiel pour interpréter les positions
                relatives.
              </p>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <Sigma className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Orthogonalité et produit scalaire
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                Le produit scalaire aide à traiter l’orthogonalité et les angles
                dans l’espace. Comme dans le plan, un produit scalaire nul permet de
                conclure que deux vecteurs sont orthogonaux.
              </p>
              <p>
                La difficulté vient surtout du choix des vecteurs. Avant de
                calculer, il faut savoir si l’on compare deux directions, une droite
                et un plan, ou deux objets issus d’une intersection.
              </p>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <BookOpenCheck className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Comment réviser la géométrie dans l’espace
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                Le plus efficace est d’alterner méthode, exercices courts et sujets
                guidés.
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
                  Commence par les coordonnées, puis enchaîne avec droites, plans,
                  produit scalaire et exercice type bac.
                </p>
              </div>
              <TrackedLink
                href="/exercices-maths-terminale/geometrie-espace"
                eventName="click_chapter_exercise_cta"
                eventParams={{
                  ...chapterEventParams,
                  cta_location: "chapter_exercises_section",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-900 px-5 py-3 text-center font-bold text-white hover:bg-blue-800 sm:w-auto"
              >
                Faire des exercices de géométrie dans l’espace
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
              Si la géométrie dans l’espace bloque, commence par une méthode de
              traduction, puis fais des exercices guidés. Le diagnostic et le
              planning aident à repérer si le problème vient de la lecture, des
              coordonnées ou de la justification.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TrackedLink
                href="/methodes-maths-terminale/geometrie-espace"
                eventName="click_chapter_method_cta"
                eventParams={{
                  ...chapterEventParams,
                  cta_location: "chapter_final_method",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-white px-5 py-3 text-center font-bold text-blue-950 hover:bg-blue-50 sm:w-auto"
              >
                Voir la méthode géométrie dans l’espace
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
              <TrackedLink
                href="/bac-maths-2027#offre"
                eventName="click_offer"
                eventParams={{
                  ...chapterEventParams,
                  offer: "pack_revision_express_bac_2027",
                  cta_location: "chapter_final_offer",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-emerald-500 px-5 py-3 text-center font-bold text-white hover:bg-emerald-400 sm:w-auto"
              >
                Voir l’offre Bac 2027
              </TrackedLink>
            </div>
          </section>

          <ChapterInternalLinks
            title="Continuer dans le cluster géométrie dans l’espace"
            links={internalLinks}
          />

          <FaqAccordion items={faqItems} sourcePage={pagePath} />
        </div>
      </div>
    </SeoPageLayout>
  );
}
