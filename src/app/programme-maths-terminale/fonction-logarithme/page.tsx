import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  ClipboardList,
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
import { OfficialSources, QuickAnswer } from "@/components/marketing/J42SeoBlocks";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/seo";

const pagePath = "/programme-maths-terminale/fonction-logarithme";

const title = "Logarithme en Terminale : programme et compétences à maîtriser";
const description =
  "Logarithme en Terminale spécialité : ce que le programme officiel exige (contenus, capacités, démonstrations), les prérequis et un test rapide par compétence.";

const currentProgramUrl =
  "https://eduscol.education.gouv.fr/sites/default/files/document/spe246annexe1158907pdf-84159.pdf";
const futureProgramUrl =
  "https://www.education.gouv.fr/bo/2026/Hebdo14/MENE2602919A";
const methodPath = "/methodes-maths-terminale/logarithme";
const exercisesPath = "/exercices-maths-terminale/logarithme";

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

// Garde chaque opérateur sur la même ligne que ce qui le suit (« x > 0 » ne se coupe pas après « > »).
function mathText(text: string) {
  return text.replace(/ ([=<>≤≥⇔→×]) /g, " $1\u00a0").replace(/ ([;:])/g, "\u00a0$1");
}

const chapterEventParams = {
  chapter: "logarithme",
  level: "terminale",
  source_page: pagePath,
};

const officialBlocks = [
  {
    title: "Contenus",
    items: [
      "la fonction logarithme népérien, notée ln, construite comme réciproque de la fonction exponentielle ;",
      "les propriétés algébriques du logarithme ;",
      "la fonction dérivée de ln et ses variations ;",
      "les limites en 0 et en +∞, la courbe représentative et son lien avec celle de l’exponentielle ;",
      "la croissance comparée de ln et de x ↦ xⁿ en 0 et en +∞.",
    ],
  },
  {
    title: "Capacités attendues",
    items: [
      "utiliser l’équation fonctionnelle de l’exponentielle ou du logarithme pour transformer une écriture, résoudre une équation ou une inéquation ;",
      "dans une résolution de problème, utiliser les propriétés des fonctions exponentielle et logarithme.",
    ],
  },
  {
    title: "Démonstrations et algorithme",
    items: [
      "démonstration : calcul de la dérivée de ln, sa dérivabilité étant admise ;",
      "démonstration : limite en 0 de x ↦ x ln(x) ;",
      "exemple d’algorithme : l’algorithme de Briggs pour calculer un logarithme.",
    ],
  },
];

const prerequisites = [
  {
    status: "Texte officiel",
    title: "La fonction exponentielle de Première",
    text: "Le programme introduit ln comme réciproque de l’exponentielle étudiée en Première. Il faut donc maîtriser exp(a + b) = exp(a) × exp(b), le fait que exp(x) > 0 pour tout réel x, la stricte croissance de exp et l’allure de sa courbe.",
  },
  {
    status: "Programme de Terminale, autres chapitres",
    title: "Dérivée d’une composée et opérations sur les limites",
    text: "La formule (v ∘ u)′ = (v′ ∘ u) × u′ et les opérations sur les limites figurent dans les chapitres dérivation et limites. Elles servent à dériver ln(u) et à lever les formes indéterminées.",
  },
  {
    status: "Conseil SprintMaths",
    title: "Signe d’une expression et tableau de signes",
    text: "Chaque ln impose une condition du type u(x) > 0. Savoir résoudre une inéquation du premier ou du second degré donne directement le domaine de travail.",
  },
  {
    status: "Conseil SprintMaths",
    title: "Signe de la dérivée et tableau de variation",
    text: "Calculer une dérivée, étudier son signe puis dresser un tableau de variation : c’est le cadre de presque toute étude de fonction contenant ln.",
  },
];

type SkillRow = {
  source: string;
  skill: string;
  know: string;
  check: string;
  answer: string;
  resource: { href: string; label: string };
};

const skillRows: SkillRow[] = [
  {
    source: "Contenu",
    skill: "Relier ln et l’exponentielle",
    know: "Pour x > 0 et y réel, y = ln(x) équivaut à x = exp(y). En pratique : exp(ln x) = x pour x > 0, ln(exp x) = x pour tout réel x, ln(1) = 0 et ln(e) = 1.",
    check: "Résous ln(x) = 2, puis eˣ = 5.",
    answer:
      "ln(x) = 2 équivaut à x = e², qui est bien strictement positif. eˣ = 5 équivaut à x = ln(5).",
    resource: {
      href: `${exercisesPath}#exercice-2`,
      label: "Exercice corrigé : résoudre une équation avec ln",
    },
  },
  {
    source: "Contenu",
    skill: "Utiliser les propriétés algébriques",
    know: "Transformer ln(ab), ln(a/b), ln(1/a), ln(aⁿ) et ln(√a) pour a et b strictement positifs, sans jamais séparer ln(a + b).",
    check: "Exprime ln(12) et ln(1/8) en fonction de ln(2) et ln(3).",
    answer: "ln(12) = ln(4 × 3) = 2 ln(2) + ln(3) et ln(1/8) = −ln(8) = −3 ln(2).",
    resource: {
      href: methodPath,
      label: "Méthode logarithme : utiliser les propriétés de ln",
    },
  },
  {
    source: "Contenu",
    skill: "Dériver et étudier les variations",
    know: "Connaître (ln x)′ = 1/x sur ]0 ; +∞[ et en déduire que ln est strictement croissante. Avec la dérivée d’une composée, dériver ln(u) en u′/u là où u est dérivable et strictement positive.",
    check: "Dérive f(x) = ln(x² + 1) et donne ses variations.",
    answer:
      "x² + 1 > 0 pour tout réel x, donc f est définie et dérivable sur ℝ avec f′(x) = 2x/(x² + 1). f′ a le signe de x : f est décroissante sur ]−∞ ; 0] et croissante sur [0 ; +∞[.",
    resource: {
      href: `${exercisesPath}#exercice-3`,
      label: "Exercice corrigé : dériver une fonction avec logarithme",
    },
  },
  {
    source: "Contenu",
    skill: "Limites, courbe et lien avec exp",
    know: "Quand x tend vers 0⁺, ln(x) tend vers −∞ ; quand x tend vers +∞, ln(x) tend vers +∞. Les courbes de ln et de exp sont symétriques par rapport à la droite d’équation y = x.",
    check: "Donne le signe de ln(x) selon les valeurs de x.",
    answer:
      "ln(x) < 0 sur ]0 ; 1[, ln(1) = 0 et ln(x) > 0 sur ]1 ; +∞[ : c’est la stricte croissance de ln combinée à ln(1) = 0.",
    resource: {
      href: methodPath,
      label: "Méthode logarithme : interpréter limites et variations",
    },
  },
  {
    source: "Contenu",
    skill: "Croissances comparées",
    know: "Pour tout entier n ≥ 1 : ln(x)/xⁿ tend vers 0 quand x tend vers +∞, et xⁿ ln(x) tend vers 0 quand x tend vers 0⁺. La puissance de x l’emporte sur le logarithme.",
    check: "Calcule la limite de x − ln(x) quand x tend vers +∞.",
    answer:
      "C’est une forme indéterminée « +∞ − ∞ ». On factorise : x − ln(x) = x(1 − ln(x)/x). Comme ln(x)/x tend vers 0, la parenthèse tend vers 1, donc x − ln(x) tend vers +∞.",
    resource: {
      href: methodPath,
      label: "Méthode logarithme : limites et croissances comparées",
    },
  },
  {
    source: "Capacité attendue",
    skill: "Transformer une écriture, résoudre une équation ou une inéquation",
    know: "Écrire d’abord le domaine, se ramener à ln(A) = ln(B) ou ln(A) < ln(B), conclure avec la stricte croissance de ln, puis confronter les solutions au domaine.",
    check: "Résous ln(2x − 1) ≤ 0.",
    answer:
      "Domaine : 2x − 1 > 0, soit x > 1/2. Comme 0 = ln(1), l’inéquation équivaut à 2x − 1 ≤ 1, soit x ≤ 1. Avec le domaine : S = ]1/2 ; 1].",
    resource: {
      href: `${methodPath}#equations-inequations-ln-domaine`,
      label: "Méthode : équations et inéquations avec ln, garder le bon domaine",
    },
  },
  {
    source: "Capacité attendue",
    skill: "Utiliser ln dans une résolution de problème",
    know: "Mobiliser ln pour isoler un exposant, par exemple pour savoir à partir de quel rang une suite géométrique passe sous un seuil. Diviser par un logarithme négatif change le sens de l’inégalité.",
    check: "Trouve le plus petit entier n tel que 0,8ⁿ < 0,01.",
    answer:
      "ln étant strictement croissante, 0,8ⁿ < 0,01 équivaut à n ln(0,8) < ln(0,01). Comme ln(0,8) < 0, on obtient n > ln(0,01)/ln(0,8) ≈ 20,6. Le plus petit entier est n = 21 : 0,8²⁰ ≈ 0,0115 et 0,8²¹ ≈ 0,0092.",
    resource: {
      href: exercisesPath,
      label: "Exercices corrigés sur le logarithme",
    },
  },
  {
    source: "Démonstration",
    skill: "Refaire les deux démonstrations du programme",
    know: "Dérivée de ln : la dérivabilité étant admise, on dérive exp(ln x) = x pour x > 0. On obtient (ln x)′ × exp(ln x) = 1, soit (ln x)′ × x = 1, donc (ln x)′ = 1/x.",
    check: "Démontre que x ln(x) tend vers 0 quand x tend vers 0⁺.",
    answer:
      "On pose X = ln(x), donc x = exp(X) et x ln(x) = X exp(X). Quand x tend vers 0⁺, X tend vers −∞. Avec Y = −X, X exp(X) = −Y/exp(Y), et Y/exp(Y) tend vers 0 quand Y tend vers +∞ par croissance comparée de l’exponentielle. Donc x ln(x) tend vers 0.",
    resource: {
      href: methodPath,
      label: "Méthode logarithme : dériver une expression avec ln",
    },
  },
];

const formulaRows = [
  { formula: "ln(x) existe", condition: "x > 0" },
  { formula: "ln(u(x)) existe", condition: "u(x) > 0" },
  { formula: "ln(1) = 0 et ln(e) = 1", condition: "valeurs de référence" },
  { formula: "exp(ln x) = x", condition: "x > 0" },
  { formula: "ln(exp x) = x", condition: "x réel quelconque" },
  {
    formula: "ln(ab) = ln(a) + ln(b)",
    condition:
      "a > 0 et b > 0. Exemple : ln(x(x − 1)) existe aussi pour x < 0, mais ne se sépare en ln(x) + ln(x − 1) que si x > 1.",
  },
  {
    formula: "ln(a/b) = ln(a) − ln(b) et ln(1/b) = −ln(b)",
    condition: "a > 0 et b > 0",
  },
  {
    formula: "ln(aⁿ) = n ln(a)",
    condition:
      "a > 0 et n entier relatif. ln(x²) existe pour tout x ≠ 0, mais vaut 2 ln(|x|), pas 2 ln(x), lorsque x < 0.",
  },
  { formula: "ln(√a) = ½ ln(a)", condition: "a > 0" },
  {
    formula: "ln(a) = ln(b) ⇔ a = b ; ln(a) < ln(b) ⇔ a < b",
    condition: "a > 0 et b > 0",
  },
  {
    formula: "ln(x) = k ⇔ x = eᵏ",
    condition: "k réel quelconque ; la solution eᵏ est automatiquement strictement positive",
  },
  { formula: "(ln x)′ = 1/x", condition: "sur ]0 ; +∞[" },
  {
    formula: "(ln u)′ = u′/u",
    condition: "sur un intervalle où u est dérivable et strictement positive",
  },
  {
    formula: "une primitive de 1/x est ln(x)",
    condition: "sur ]0 ; +∞[",
  },
  {
    formula: "une primitive de u′/u est ln(u)",
    condition: "sur un intervalle où u est strictement positive et dérivable, avec u′ continue",
  },
  {
    formula: "ln(x) → −∞ quand x → 0⁺ ; ln(x) → +∞ quand x → +∞",
    condition: "limites aux bornes de ]0 ; +∞[",
  },
  {
    formula: "ln(x)/xⁿ → 0 quand x → +∞ ; xⁿ ln(x) → 0 quand x → 0⁺",
    condition: "n entier, n ≥ 1",
  },
];

const revisionSteps = [
  "Fais les tests rapides de la grille sans regarder les réponses : le premier test raté désigne la compétence à reprendre.",
  "Sécurise d’abord le domaine et les propriétés de ln : beaucoup d’erreurs viennent d’un ln appliqué à une quantité négative ou d’une propriété inventée.",
  "Travaille ensuite les équations et inéquations, en écrivant toujours le domaine en premier.",
  "Passe à la dérivation de ln(u) et aux études de variations, puis aux limites et aux croissances comparées.",
  "Termine par une résolution de problème, comme un seuil de suite géométrique, et par les deux démonstrations du programme.",
];

const recommendedExercises = [
  {
    title: "Manipuler les propriétés de ln",
    text: "Un exercice court pour transformer des expressions avec ln(ab), ln(a/b) et ln(aⁿ) sans erreur de domaine.",
  },
  {
    title: "Résoudre une équation avec ln",
    text: "Un entraînement central pour se ramener à ln(A) = ln(B), résoudre, puis vérifier le domaine.",
  },
  {
    title: "Dériver et étudier une fonction avec ln",
    text: "Un format type bac pour dériver une expression contenant ln et conclure sur les variations.",
  },
];

const internalLinks = [
  { href: "/programme-maths-terminale", label: "Programme maths Terminale" },
  {
    href: "/exercices-maths-terminale/logarithme",
    label: "Exercices logarithme Terminale",
  },
  {
    href: "/methodes-maths-terminale/logarithme",
    label: "Méthode logarithme Terminale",
  },
  { href: "/programme-maths-terminale/limites", label: "Chapitre limites Terminale" },
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
    question: "Quel programme de logarithme s'applique en Terminale en 2026-2027 ?",
    answer:
      "En 2026-2027, la spécialité mathématiques de Terminale suit le programme fixé par l'arrêté du 19 juillet 2019. Un nouveau programme a été publié par l'arrêté du 26 février 2026 (Bulletin officiel n° 14 du 2 avril 2026), mais il n'entre en application qu'à la rentrée 2027-2028.",
  },
  {
    question: "Que demande le programme officiel sur la fonction logarithme ?",
    answer:
      "Le programme introduit ln comme réciproque de l'exponentielle et liste ses propriétés algébriques, sa dérivée, ses variations, ses limites en 0 et en +∞, sa courbe et la croissance comparée avec x ↦ xⁿ. Les capacités attendues consistent à transformer une écriture, résoudre une équation ou une inéquation, et utiliser exp et ln dans une résolution de problème.",
  },
  {
    question: "Quelles démonstrations sur le logarithme sont au programme ?",
    answer:
      "Deux démonstrations sont listées : le calcul de la dérivée de ln, sa dérivabilité étant admise, et la limite en 0 de x ln(x). Le programme cite aussi l'algorithme de Briggs comme exemple d'algorithme.",
  },
  {
    question: "La formule (ln u)' = u'/u est-elle au programme ?",
    answer:
      "La section logarithme ne l'écrit pas telle quelle, mais elle découle de la dérivée d'une composée, (v ∘ u)' = (v' ∘ u) × u', qui figure au programme de Terminale. Elle s'applique sur un intervalle où u est dérivable et strictement positive.",
  },
  {
    question: "Quels prérequis revoir avant le chapitre logarithme ?",
    answer:
      "Le texte officiel s'appuie sur la fonction exponentielle de Première : ses propriétés algébriques, son signe et sa stricte croissance. Il est aussi utile de revoir les tableaux de signes, pour les domaines, et l'étude des variations avec la dérivée.",
  },
  {
    question: "Le logarithme décimal est-il au programme de spécialité en Terminale ?",
    answer:
      "Le texte de spécialité de Terminale ne le mentionne pas : ses contenus portent uniquement sur le logarithme népérien, noté ln.",
  },
];

export default function FonctionLogarithmeTerminalePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Programme maths Terminale", path: "/programme-maths-terminale" },
            { name: "Fonction logarithme en Terminale", path: pagePath },
          ]),
        ]}
      />

      <ChapterHero
        eyebrow="Programme officiel · Terminale spécialité maths 2026-2027"
        title="Logarithme en Terminale : programme et compétences à maîtriser"
        description={
          <>
            En Terminale spécialité, la fonction logarithme népérien ln est
            introduite comme la réciproque de l’exponentielle vue en Première. Le
            programme demande d’en connaître les propriétés algébriques, la dérivée,
            les variations, les limites et les croissances comparées, puis de s’en
            servir pour résoudre équations, inéquations et problèmes.
          </>
        }
        secondaryDescription={
          <>
            Cette page distingue ce que le texte officiel exige, les prérequis à
            vérifier et les conseils SprintMaths, avec un test rapide par compétence
            pour savoir quoi réviser. La méthode pas à pas et les exercices corrigés
            ont chacun leur page.
          </>
        }
        ctas={[
          {
            href: "/exercices-maths-terminale/logarithme",
            label: "Faire des exercices sur le logarithme",
            eventName: "click_chapter_exercise_cta",
            eventParams: {
              ...chapterEventParams,
              cta_location: "chapter_hero_primary",
            },
            icon: <PlayCircle className="h-5 w-5" />,
          },
          {
            href: "/methodes-maths-terminale/logarithme",
            label: "Voir la méthode logarithme",
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
          <QuickAnswer title="Que dit le programme officiel sur le logarithme ?" tone="emerald">
            <p>
              En 2026-2027, la Terminale spécialité mathématiques suit le programme
              fixé par l’arrêté du 19 juillet 2019. Le logarithme y forme une section
              de la partie Analyse : ln est construite comme la réciproque de la
              fonction exponentielle, puis étudiée comme une fonction de référence.
            </p>
            <p>
              Un nouveau programme de Terminale a été publié au Bulletin officiel du
              2 avril 2026, mais il n’entre en application qu’à la rentrée 2027-2028.
              Il ne décrit donc pas l’année 2026-2027.
            </p>
            <p className="text-base">
              Textes officiels relus le 18 octobre 2026.{" "}
              <a
                href={currentProgramUrl}
                className="font-bold underline underline-offset-4"
              >
                Lire le programme applicable (PDF Éduscol)
              </a>
            </p>
          </QuickAnswer>

          <section id="texte-officiel" className="scroll-mt-24">
            <ClipboardList className="h-7 w-7 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">
              La section « Fonction logarithme » du programme, en clair
            </h2>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
              Voici ce que liste le texte officiel, reformulé sans rien ajouter. Les
              conseils SprintMaths viennent après, séparément.
            </p>
            <div className="mt-7 grid gap-5 lg:grid-cols-3">
              {officialBlocks.map((block) => (
                <article
                  key={block.title}
                  className="min-w-0 rounded-2xl border border-emerald-200 bg-emerald-50 p-6"
                >
                  <h3 className="text-xl font-bold text-emerald-950">{block.title}</h3>
                  <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-emerald-950">
                    {block.items.map((item) => (
                      <li key={item}>{mathText(item)}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <p className="mt-5 max-w-4xl leading-7 text-slate-700">
              Le chapitre « Primitives, équations différentielles » du même programme
              cite aussi x ↦ 1/x parmi les primitives de référence : c’est le lien
              entre ln et le calcul de primitives.
            </p>
          </section>

          <section id="prerequis" className="scroll-mt-24">
            <ListChecks className="h-7 w-7 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">
              Prérequis à vérifier avant le chapitre
            </h2>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
              Chaque prérequis indique d’où il vient : le texte officiel lui-même,
              un autre chapitre du programme de Terminale, ou un conseil SprintMaths.
            </p>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {prerequisites.map((item) => (
                <article
                  key={item.title}
                  className="min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <p className="text-sm font-bold uppercase tracking-wide text-blue-800">
                    {item.status}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-3 leading-7 text-slate-700">{mathText(item.text)}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="competences" className="scroll-mt-24">
            <Target className="h-7 w-7 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">
              Compétences à maîtriser : savoir faire, tester, s’entraîner
            </h2>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
              Pour chaque élément du programme : ce qu’il faut savoir faire, un test
              de deux minutes avec sa réponse, et la ressource SprintMaths pour
              t’entraîner. Si tu réussis le test sans notes, passe à la ligne
              suivante ; sinon, ouvre la ressource.
            </p>
            <div className="mt-7 grid gap-5 lg:grid-cols-2">
              {skillRows.map((row) => (
                <article
                  key={row.skill}
                  className="flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">
                    Programme · {row.source}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-slate-950">{row.skill}</h3>
                  <p className="mt-3 leading-7 text-slate-700">{mathText(row.know)}</p>
                  <div className="mt-4 rounded-xl bg-slate-50 p-4">
                    <p className="font-bold text-slate-950">Test rapide</p>
                    <p className="mt-1 leading-7 text-slate-800">{mathText(row.check)}</p>
                    <details className="mt-3">
                      <summary className="cursor-pointer rounded font-semibold text-blue-900 underline underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-offset-2">
                        Voir la réponse
                      </summary>
                      <p className="mt-2 leading-7 text-slate-700">{mathText(row.answer)}</p>
                    </details>
                  </div>
                  <p className="mt-4 leading-7 text-slate-700">
                    S’entraîner :{" "}
                    <Link
                      href={row.resource.href}
                      className="font-bold text-blue-900 underline underline-offset-4"
                    >
                      {row.resource.label}
                    </Link>
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section id="formules" className="scroll-mt-24">
            <Sigma className="h-7 w-7 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">
              Formules de ln et conditions de validité
            </h2>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
              Une formule de ln n’est juste que sous sa condition. Avant de
              l’appliquer, vérifie la colonne de droite.
            </p>
            <div className="mt-7 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="w-full border-collapse text-left">
                <caption className="bg-blue-950 px-4 py-3 text-left text-sm font-bold uppercase tracking-[0.12em] text-white">
                  Formule → condition à vérifier
                </caption>
                <thead className="bg-slate-100 text-slate-950">
                  <tr>
                    <th scope="col" className="px-3 py-3 font-bold sm:px-4">
                      Formule
                    </th>
                    <th scope="col" className="px-3 py-3 font-bold sm:px-4">
                      Condition
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {formulaRows.map((row) => (
                    <tr
                      key={row.formula}
                      className="border-t border-slate-200 odd:bg-white even:bg-slate-50/70"
                    >
                      <td className="px-3 py-3 align-top font-semibold leading-7 text-slate-950 sm:px-4">
                        {mathText(row.formula)}
                      </td>
                      <td className="px-3 py-3 align-top leading-7 text-slate-700 sm:px-4">
                        {mathText(row.condition)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-5 max-w-4xl leading-7 text-slate-700">
              Pour voir ces conditions décider d’une réponse sur des équations
              rédigées comme sur une copie, lis la{" "}
              <Link
                href={`${methodPath}#equations-inequations-ln-domaine`}
                className="font-bold text-blue-900 underline underline-offset-4"
              >
                méthode logarithme sur les domaines
              </Link>
              .
            </p>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <BookOpenCheck className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Comment réviser la fonction logarithme
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                L’ordre conseillé par SprintMaths, qui ne fait pas partie du texte
                officiel : partir des tests ratés plutôt que tout relire.
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
                  Commence par les propriétés de ln, puis passe aux équations et à la
                  dérivation. Le but est d&apos;apprendre à enchaîner les étapes en
                  gardant l&apos;œil sur le domaine.
                </p>
              </div>
              <TrackedLink
                href="/exercices-maths-terminale/logarithme"
                eventName="click_chapter_exercise_cta"
                eventParams={{
                  ...chapterEventParams,
                  cta_location: "chapter_exercises_section",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-900 px-5 py-3 text-center font-bold text-white hover:bg-blue-800 sm:w-auto"
              >
                Faire des exercices sur le logarithme
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
              Si la fonction logarithme bloque, commence par un exercice guidé, puis
              utilise la méthode logarithme. Le diagnostic et le planning aident à
              transformer le blocage en plan de travail.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TrackedLink
                href="/methodes-maths-terminale/logarithme"
                eventName="click_chapter_method_cta"
                eventParams={{
                  ...chapterEventParams,
                  cta_location: "chapter_final_method",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-white px-5 py-3 text-center font-bold text-blue-950 hover:bg-blue-50 sm:w-auto"
              >
                Voir la méthode logarithme
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
            title="Continuer dans le cluster fonction logarithme"
            links={internalLinks}
          />

          <OfficialSources
            title="Sources officielles (vérifiées le 18 octobre 2026)"
            sources={[
              {
                href: currentProgramUrl,
                label:
                  "Programme de spécialité de mathématiques de terminale générale (annexe, Éduscol)",
                description:
                  "Texte applicable en 2026-2027, fixé par l’arrêté du 19 juillet 2019. La section « Fonction logarithme » figure dans la partie Analyse.",
              },
              {
                href: futureProgramUrl,
                label: "Arrêté du 26 février 2026, Bulletin officiel n° 14 du 2 avril 2026",
                description:
                  "Nouveau programme de Terminale, applicable à la rentrée 2027-2028 : il ne concerne pas l’année 2026-2027.",
              },
            ]}
          />

          <FaqAccordion items={faqItems} sourcePage={pagePath} />
        </div>
      </div>
    </SeoPageLayout>
  );
}
