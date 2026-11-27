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

const pagePath = "/programme-maths-terminale/limites";

const title = "Limites de fonctions en Terminale : programme et compétences";
const description =
  "Limites de fonctions en Terminale spécialité : programme officiel (contenus, capacités, démonstration), prérequis, asymptotes et auto-contrôle par compétence.";

const currentProgramUrl =
  "https://eduscol.education.gouv.fr/sites/default/files/document/spe246annexe1158907pdf-84159.pdf";
const futureProgramUrl =
  "https://www.education.gouv.fr/bo/2026/Hebdo14/MENE2602919A";
const methodPath = "/methodes-maths-terminale/calculer-une-limite";
const exercisesPath = "/exercices-maths-terminale/limites";

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: absoluteUrl(pagePath),
  },
  openGraph: {
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "SprintMaths — Exercices corrigés et méthodes de maths, avec une courbe stylisée sur fond bleu.",
      },
    ],
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
  chapter: "limites",
  level: "terminale",
  source_page: pagePath,
};

const officialBlocks = [
  {
    title: "Contenus",
    items: [
      "limite finie ou infinie d’une fonction en +∞, en −∞, en un point ; asymptote parallèle à un axe de coordonnées ;",
      "limites faisant intervenir les fonctions de référence étudiées en Première : puissances entières, racine carrée, fonction exponentielle ;",
      "limites et comparaison (majoration, minoration, encadrement) ;",
      "opérations sur les limites (admises) et utilisation de la composition des limites en contexte.",
    ],
  },
  {
    title: "Capacités attendues",
    items: [
      "déterminer dans des cas simples la limite d’une suite ou d’une fonction en un point ou en ±∞, en utilisant les limites usuelles, les croissances comparées, les opérations sur les limites, des majorations, minorations ou encadrements, et la factorisation du terme prépondérant dans une somme ;",
      "faire le lien entre l’existence d’une asymptote parallèle à un axe (droite horizontale ou verticale) et celle de la limite correspondante.",
    ],
  },
  {
    title: "Démonstration et approfondissements",
    items: [
      "démonstration au programme : croissance comparée de x ↦ xⁿ et exp en +∞ ;",
      "approfondissements possibles (non exigibles) : asymptotes obliques, branches infinies.",
    ],
  },
];

const prerequisites = [
  {
    status: "Texte officiel",
    title: "Les fonctions de référence de Première",
    text: "Le programme officiel cite explicitement trois familles étudiées en Première : les puissances entières (x ↦ xⁿ et 1/xⁿ), la fonction racine carrée sur [0 ; +∞[ et la fonction exponentielle (eˣ > 0, e^(a+b) = eᵃ × eᵇ, stricte croissance).",
  },
  {
    status: "Programme de Terminale, autres chapitres",
    title: "Limites de suites, gendarmes et logarithme",
    text: "La section « Suites » définit la convergence/divergence, énonce le théorème des gendarmes et liste la démonstration des limites de exp en +∞ et −∞. La section « Fonction logarithme » ajoute ensuite les limites et croissances comparées avec ln.",
  },
  {
    status: "Conseil SprintMaths",
    title: "Domaine de définition et signe d’un dénominateur",
    text: "Avant de chercher une limite en un point a, vérifie si la fonction y est définie. Quand le dénominateur s’annule en a, le tableau de signes donne le signe de 0⁻ ou 0⁺ et évite l’erreur classique entre +∞ et −∞.",
  },
  {
    status: "Conseil SprintMaths",
    title: "Factorisation par le terme prépondérant",
    text: "Savoir mettre en facteur xⁿ (ou eˣ) dans une somme ou un quotient, puis simplifier proprement sur un domaine où le facteur est non nul, règle la majorité des formes indéterminées rencontrées au Bac.",
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
    skill: "Calculer une limite en ±∞ et interpréter une asymptote horizontale",
    know: "Pour un quotient de polynômes en ±∞, factoriser numérateur et dénominateur par la plus haute puissance de x puis utiliser lim 1/xⁿ = 0. Si f(x) → ℓ (réel fini) en +∞ ou −∞, la droite y = ℓ est asymptote horizontale à la courbe.",
    check:
      "Calcule la limite de f(x) = (4x² − x + 3) / (2x² + 5) quand x → +∞ et donne l’interprétation graphique.",
    answer:
      "Forme indéterminée ∞/∞. Pour x ≠ 0, f(x) = [x²(4 − 1/x + 3/x²)] / [x²(2 + 5/x²)] = (4 − 1/x + 3/x²) / (2 + 5/x²). Quand x → +∞, 1/x → 0 et 1/x² → 0, donc f(x) → 4/2 = 2. La droite d’équation y = 2 est asymptote horizontale à la courbe en +∞.",
    resource: {
      href: `${exercisesPath}#exercice-1`,
      label: "Exercice corrigé : quotient de polynômes en l’infini",
    },
  },
  {
    source: "Contenu",
    skill: "Étudier des limites latérales en un point et conclure sur une asymptote verticale",
    know: "Quand le dénominateur tend vers 0 et le numérateur vers un réel non nul, il faut distinguer x → a⁻ et x → a⁺ en étudiant le signe du dénominateur. Si f(x) → +∞ ou −∞ en a⁻ ou a⁺, la droite x = a est asymptote verticale.",
    check:
      "Calcule les limites de f(x) = (2x + 1) / (x − 3) quand x → 3⁻ puis quand x → 3⁺, et précise l’asymptote.",
    answer:
      "Quand x → 3, le numérateur 2x + 1 tend vers 7 > 0 et le dénominateur x − 3 tend vers 0. Pour x < 3, x − 3 < 0, donc lim (x → 3⁻) f(x) = −∞. Pour x > 3, x − 3 > 0, donc lim (x → 3⁺) f(x) = +∞. La droite d’équation x = 3 est asymptote verticale à la courbe de f.",
    resource: {
      href: `${exercisesPath}#exercice-4-limites-laterales`,
      label: "Exercice corrigé : limites latérales en un point",
    },
  },
  {
    source: "Capacité attendue",
    skill: "Lever une forme +∞ − ∞ par factorisation du terme prépondérant",
    know: "Face à une somme qui donne +∞ − ∞, on ne conclut jamais par « ∞ − ∞ = 0 » : on met en facteur le terme qui domine pour revenir à un produit sans indétermination.",
    check: "Calcule la limite de g(x) = 3x³ − 5x² + 2 quand x → +∞.",
    answer:
      "Forme indéterminée +∞ − ∞. Pour x ≠ 0, g(x) = x³(3 − 5/x + 2/x³). Quand x → +∞, 5/x → 0 et 2/x³ → 0, donc la parenthèse tend vers 3 > 0 et x³ → +∞. Par produit, lim (x → +∞) g(x) = +∞.",
    resource: {
      href: `${exercisesPath}#exercice-2`,
      label: "Exercice corrigé : factoriser par le terme dominant",
    },
  },
  {
    source: "Contenu",
    skill: "Utiliser les théorèmes de comparaison et des gendarmes",
    know: "Quand une expression oscille (sin, cos) ou ne se simplifie pas directement, on l’encadre par deux fonctions ayant la même limite finie (théorème des gendarmes), ou on la minore/majore par une fonction tendant vers +∞ ou −∞.",
    check: "Calcule la limite de h(x) = (2x + sin(x)) / x quand x → +∞.",
    answer:
      "Pour tout x > 0, −1 ≤ sin(x) ≤ 1, donc 2 − 1/x ≤ (2x + sin(x)) / x ≤ 2 + 1/x. Comme 2 − 1/x → 2 et 2 + 1/x → 2 quand x → +∞, le théorème des gendarmes donne lim (x → +∞) h(x) = 2.",
    resource: {
      href: `${methodPath}#limite-par-encadrement`,
      label: "Méthode : calculer une limite par encadrement",
    },
  },
  {
    source: "Contenu",
    skill: "Appliquer la composition des limites en contexte",
    know: "Pour déterminer la limite de v(u(x)), on calcule d’abord la limite b de u(x), puis la limite de v(X) quand X → b, en vérifiant que les bornes correspondent.",
    check:
      "Calcule la limite de e^(2x + 1) quand x → −∞, puis celle de √(4 + 5/x) quand x → +∞.",
    answer:
      "Quand x → −∞, X = 2x + 1 → −∞ et lim (X → −∞) e^X = 0, donc lim (x → −∞) e^(2x + 1) = 0. Quand x → +∞, X = 4 + 5/x → 4 et lim (X → 4) √X = 2, donc lim (x → +∞) √(4 + 5/x) = 2.",
    resource: {
      href: `${methodPath}#limite-fonction-composee`,
      label: "Méthode : limite d’une fonction composée",
    },
  },
  {
    source: "Démonstration",
    skill: "Refaire la démonstration de croissance comparée de xⁿ et exp en +∞",
    know: "Pour tout entier n ≥ 1, eˣ/xⁿ → +∞ en +∞ (et xⁿ eˣ → 0 en −∞). Le cas n = 1 s’établit avec l’inégalité eˣ > x²/2 pour x > 0 ; le cas général s’en déduit en posant X = x/n.",
    check:
      "Montre que lim (x → +∞) eˣ/x = +∞, puis déduis-en lim (x → +∞) (eˣ − 3x).",
    answer:
      "Soit g(x) = eˣ − x²/2 sur [0 ; +∞[. On a g″(x) = eˣ − 1 ≥ 0, g′(0) = 1 > 0 et g(0) = 1 > 0, donc g′ > 0 puis g(x) > 0 pour x > 0, soit eˣ/x > x/2. Comme x/2 → +∞, par comparaison eˣ/x → +∞. Ensuite, pour x > 0, eˣ − 3x = x(eˣ/x − 3) → +∞ par produit. Pour tout entier n ≥ 1, eˣ/xⁿ = (1/nⁿ) × (e^(x/n) / (x/n))ⁿ → +∞ par composition et produit.",
    resource: {
      href: `${methodPath}#limite-produit-exponentielle`,
      label: "Méthode : lever une forme indéterminée avec l’exponentielle",
    },
  },
];

const referenceRows = [
  {
    family: "Puissances xⁿ (n ≥ 1 entier)",
    behavior: "En +∞ : +∞. En −∞ : +∞ si n pair, −∞ si n impair.",
    note: "Limites usuelles de référence",
  },
  {
    family: "Inverses 1/xⁿ (n ≥ 1 entier)",
    behavior: "En ±∞ : 0. En 0⁺ : +∞. En 0⁻ : +∞ si n pair, −∞ si n impair.",
    note: "Signe crucial en 0⁻ quand n est impair",
  },
  {
    family: "Racine carrée √x",
    behavior: "En +∞ : +∞. En 0⁺ : 0.",
    note: "Définie uniquement sur [0 ; +∞[",
  },
  {
    family: "Exponentielle eˣ",
    behavior: "En +∞ : +∞. En −∞ : 0.",
    note: "Démonstration des deux limites listée dans la section « Suites » du BO",
  },
  {
    family: "Croissances comparées avec exp (n ≥ 1)",
    behavior: "eˣ/xⁿ → +∞ en +∞ ; xⁿ eˣ → 0 en −∞.",
    note: "L’exponentielle l’emporte sur toute puissance xⁿ",
  },
  {
    family: "Les 4 formes indéterminées",
    behavior: "∞ − ∞ ; 0 × ∞ ; ∞ / ∞ ; 0 / 0.",
    note: "Impossible de conclure directement : il faut transformer l’expression",
  },
  {
    family: "Asymptote horizontale",
    behavior: "lim (x → +∞) f(x) = ℓ ou lim (x → −∞) f(x) = ℓ (ℓ réel).",
    note: "Droite d’équation y = ℓ parallèle à l’axe des abscisses",
  },
  {
    family: "Asymptote verticale",
    behavior: "lim (x → a, a⁻ ou a⁺) f(x) = +∞ ou −∞.",
    note: "Droite d’équation x = a parallèle à l’axe des ordonnées",
  },
];

const revisionSteps = [
  "Fais d’abord les 6 tests rapides ci-dessus sans regarder la réponse : le premier test raté indique la compétence précise à reprendre.",
  "Sécurise les limites usuelles (puissances, 1/xⁿ, √x, eˣ) et le signe d’un dénominateur autour d’une valeur interdite.",
  "Entraîne-toi sur les quatre formes indéterminées avec la méthode pas à pas (factorisation, encadrement, composition, croissances comparées).",
  "Vérifie la démonstration exigible de la croissance comparée de xⁿ et exp en +∞ (cas n = 1 puis passage à n quelconque).",
  "Rédige systématiquement la conclusion complète : variable, borne, valeur de la limite et équation d’asymptote si demandée.",
];

const internalLinks = [
  { href: "/programme-maths-terminale", label: "Programme maths Terminale" },
  { href: "/exercices-maths-terminale/limites", label: "Exercices limites Terminale" },
  {
    href: "/methodes-maths-terminale/calculer-une-limite",
    label: "Méthode pour calculer une limite",
  },
  { href: "/programme-maths-terminale/suites", label: "Chapitre suites Terminale" },
  {
    href: "/programme-maths-terminale/fonction-logarithme",
    label: "Chapitre logarithme Terminale",
  },
  { href: "/exercices-type-bac-maths-terminale", label: "Exercices type bac Terminale" },
  { href: "/bac-maths-2027", label: "Bac Maths 2027" },
  { href: "/planning-revision-bac-maths", label: "Planning Bac Maths 2027" },
  { href: "/diagnostic", label: "Diagnostic gratuit" },
];

const faqItems: FaqItem[] = [
  {
    question: "Quel programme sur les limites de fonctions s’applique en Terminale en 2026-2027 ?",
    answer:
      "En 2026-2027, la spécialité mathématiques de Terminale suit le programme fixé par l’arrêté du 19 juillet 2019 (Bulletin officiel spécial n° 8 du 25 juillet 2019). Un nouveau programme de Terminale a été publié par l’arrêté du 26 février 2026 (BO n° 14 du 2 avril 2026), mais il n’entre en application qu’à la rentrée 2027-2028.",
  },
  {
    question: "Que demande exactement le programme officiel dans la section « Limites des fonctions » ?",
    answer:
      "Le texte officiel fixe les limites finies ou infinies en +∞, en −∞ et en un point, le lien avec les asymptotes parallèles aux axes, les limites des fonctions de référence de Première (puissances entières, racine carrée, exponentielle), les théorèmes de comparaison et les opérations admises sur les limites, ainsi que la composition des limites en contexte.",
  },
  {
    question: "Quelle démonstration est au programme dans le chapitre Limites des fonctions ?",
    answer:
      "La section « Limites des fonctions » comporte une démonstration exigible : la croissance comparée de x ↦ xⁿ et de la fonction exponentielle en +∞. Les démonstrations des limites de exp en +∞ et −∞ figurent dans la section « Suites », et celle de lim (x → 0⁺) x ln(x) dans la section « Fonction logarithme ».",
  },
  {
    question: "Les asymptotes obliques sont-elles exigibles au Bac de spécialité maths ?",
    answer:
      "Non. Dans le texte officiel applicable en 2026-2027, les asymptotes obliques et les branches infinies figurent uniquement dans la rubrique « Approfondissements possibles ». Les asymptotes exigibles au programme sont les asymptotes parallèles aux axes de coordonnées (horizontales y = ℓ et verticales x = a).",
  },
  {
    question: "Quels prérequis revoir avant d’aborder les limites de fonctions ?",
    answer:
      "Le programme s’appuie directement sur les fonctions de référence de Première (puissances entières, racine carrée, exponentielle) et sur les limites de suites (théorème des gendarmes). Côté méthode, savoir déterminer un domaine, étudier le signe d’un dénominateur et factoriser par le terme prépondérant sécurise la grande majorité des calculs.",
  },
  {
    question: "Où trouver la méthode détaillée et les exercices corrigés sur les limites ?",
    answer:
      "Cette page présente le cadre officiel du programme, les prérequis et un auto-contrôle par compétence. Pour la démarche pas à pas sur chaque forme indéterminée, utilise la page Méthode pour calculer une limite ; pour t’entraîner sur des énoncés complets, passe à la page Exercices limites Terminale.",
  },
];

export default function LimitesTerminalePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Programme maths Terminale", path: "/programme-maths-terminale" },
            { name: "Limites en Terminale", path: pagePath },
          ]),
        ]}
      />

      <ChapterHero
        eyebrow="Programme officiel · Terminale spécialité maths 2026-2027"
        title="Limites de fonctions en Terminale : programme et compétences"
        description={
          <>
            En Terminale spécialité maths, le chapitre « Limites des fonctions »
            pose le comportement aux bornes du domaine (en +∞, en −∞ et en un
            point), les asymptotes parallèles aux axes, les théorèmes de
            comparaison, les opérations admises et la croissance comparée de xⁿ
            et exp.
          </>
        }
        secondaryDescription={
          <>
            Cette page distingue strictement ce que le Bulletin officiel exige,
            les prérequis à vérifier et les conseils SprintMaths, avec un
            auto-contrôle rapide par compétence. La méthode pas à pas et les
            exercices corrigés ont chacun leur page dédiée.
          </>
        }
        ctas={[
          {
            href: "/exercices-maths-terminale/limites",
            label: "Faire des exercices sur les limites",
            eventName: "click_chapter_exercise_cta",
            eventParams: {
              ...chapterEventParams,
              cta_location: "chapter_hero_primary",
            },
            icon: <PlayCircle className="h-5 w-5" />,
          },
          {
            href: "/methodes-maths-terminale/calculer-une-limite",
            label: "Voir la méthode pour calculer une limite",
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
          <div className="flex flex-col gap-3 sm:flex-row">
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
          <QuickAnswer
            title="Que demande le programme officiel sur les limites de fonctions ?"
            tone="emerald"
          >
            <p>
              En 2026-2027, la Terminale spécialité mathématiques suit le programme
              fixé par l’arrêté du 19 juillet 2019 (BO spécial n° 8 du 25 juillet
              2019). La section « Limites des fonctions » (partie Analyse) demande
              de déterminer dans des cas simples des limites en un point ou en ±∞,
              d’utiliser les opérations admises, la composition en contexte, les
              comparaisons/encadrements, la factorisation du terme prépondérant et
              les croissances comparées, puis de relier chaque limite à une
              asymptote horizontale ou verticale.
            </p>
            <p>
              La seule démonstration listée dans cette section est la croissance
              comparée de x ↦ xⁿ et exp en +∞. Les asymptotes obliques relèvent
              uniquement des approfondissements possibles. Un nouveau programme a
              été publié au BO du 2 avril 2026 mais n’entre en vigueur qu’à la
              rentrée 2027-2028.
            </p>
            <p className="text-base">
              Texte officiel relu le 27 novembre 2026.{" "}
              <a
                href={currentProgramUrl}
                target="_blank"
                rel="noreferrer"
                className="font-bold underline underline-offset-4"
              >
                Lire le programme applicable (PDF Éduscol)
              </a>
            </p>
          </QuickAnswer>

          <section id="texte-officiel" className="scroll-mt-24">
            <ClipboardList className="h-7 w-7 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">
              La section « Limites des fonctions » du programme, en clair
            </h2>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
              Voici le périmètre exact du texte officiel applicable en 2026-2027
              (pages 11–12 de l’annexe), reformulé sans rien ajouter. Les conseils
              SprintMaths apparaissent séparément plus bas.
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
              Le texte officiel précise en chapeau que les opérations sur les
              limites sont admises et que l’utilisation de la composition des
              limites se fait en contexte. Deux sections voisines complètent ce
              chapitre : « Suites » (théorème des gendarmes et démonstration des
              limites de exp en ±∞) et « Fonction logarithme » (limites et
              croissances comparées de ln avec xⁿ).
            </p>
          </section>

          <section id="prerequis" className="scroll-mt-24">
            <ListChecks className="h-7 w-7 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">
              Prérequis à vérifier avant le chapitre
            </h2>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
              Chaque prérequis indique explicitement son origine : le texte
              officiel, un autre chapitre du programme de Terminale, ou un conseil
              de méthode SprintMaths.
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
              Auto-contrôle rapide par compétence
            </h2>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
              Pour chaque compétence du programme : ce qu’il faut savoir faire, un
              test rapide avec correction vérifiée, et le lien direct vers la
              fiche méthode ou l’exercice correspondant.
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

          <section id="reperes-limites" className="scroll-mt-24">
            <Sigma className="h-7 w-7 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">
              Limites usuelles, croissances comparées et asymptotes
            </h2>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
              Tableau de repères à connaître sans hésiter avant de passer aux
              calculs complets.
            </p>
            <div className="mt-7 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="w-full border-collapse text-left">
                <caption className="bg-blue-950 px-4 py-3 text-left text-sm font-bold uppercase tracking-[0.12em] text-white">
                  Famille → comportement aux bornes et point de vigilance
                </caption>
                <thead className="bg-slate-100 text-slate-950">
                  <tr>
                    <th scope="col" className="px-3 py-3 font-bold sm:px-4">
                      Notion
                    </th>
                    <th scope="col" className="px-3 py-3 font-bold sm:px-4">
                      Résultat au programme
                    </th>
                    <th scope="col" className="px-3 py-3 font-bold sm:px-4">
                      Vigilance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {referenceRows.map((row) => (
                    <tr
                      key={row.family}
                      className="border-t border-slate-200 odd:bg-white even:bg-slate-50/70"
                    >
                      <td className="px-3 py-3 align-top font-semibold leading-7 text-slate-950 sm:px-4">
                        {mathText(row.family)}
                      </td>
                      <td className="px-3 py-3 align-top leading-7 text-slate-700 sm:px-4">
                        {mathText(row.behavior)}
                      </td>
                      <td className="px-3 py-3 align-top leading-7 text-slate-700 sm:px-4">
                        {mathText(row.note)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-5 max-w-4xl leading-7 text-slate-700">
              Pour voir trois limites complètes rédigées étape par étape
              (croissance comparée, encadrement et fonction composée), consulte la{" "}
              <Link
                href={`${methodPath}#trois-limites-corrigees`}
                className="font-bold text-blue-900 underline underline-offset-4"
              >
                méthode détaillée pour calculer une limite
              </Link>
              .
            </p>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <BookOpenCheck className="h-7 w-7 text-blue-800" aria-hidden="true" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Comment réviser les limites efficacement
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                Conseil SprintMaths (distinct du texte officiel) : pars des
                compétences ratées dans l’auto-contrôle plutôt que de relire tout
                le cours dans l’ordre.
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

          <section className="rounded-xl bg-blue-950 p-6 text-white sm:p-8">
            <h3 className="text-3xl font-bold">Passer du chapitre aux exercices</h3>
            <p className="mt-4 max-w-3xl leading-7 text-blue-100">
              Une fois le périmètre du programme clair, entraîne-toi sur des
              exercices courts puis sur la méthode détaillée avant de revenir aux
              sujets type bac.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TrackedLink
                href="/exercices-maths-terminale/limites"
                eventName="click_chapter_exercise_cta"
                eventParams={{
                  ...chapterEventParams,
                  cta_location: "chapter_final_exercises",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-emerald-500 px-5 py-3 text-center font-bold text-white hover:bg-emerald-400 sm:w-auto"
              >
                Faire des exercices sur les limites
              </TrackedLink>
              <TrackedLink
                href="/methodes-maths-terminale/calculer-une-limite"
                eventName="click_chapter_method_cta"
                eventParams={{
                  ...chapterEventParams,
                  cta_location: "chapter_final_method",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-blue-200 px-5 py-3 text-center font-bold text-white hover:bg-blue-900 sm:w-auto"
              >
                Revoir la méthode
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
                href="/bac-maths-2027"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-white px-5 py-3 text-center font-bold text-blue-950 hover:bg-blue-50 sm:w-auto"
              >
                Voir l&apos;offre Bac 2027
              </Link>
            </div>
          </section>

          <ChapterInternalLinks
            title="Continuer dans le cluster limites"
            links={internalLinks}
          />

          <OfficialSources
            title="Sources officielles (vérifiées le 27 novembre 2026)"
            sources={[
              {
                href: currentProgramUrl,
                label:
                  "Programme de spécialité de mathématiques de terminale générale (annexe, Éduscol)",
                description:
                  "Texte applicable en 2026-2027, fixé par l’arrêté du 19 juillet 2019 (BO spécial n° 8 du 25 juillet 2019). La section « Limites des fonctions » figure dans la partie Analyse (pages 11–12).",
              },
              {
                href: futureProgramUrl,
                label: "Arrêté du 26 février 2026, Bulletin officiel n° 14 du 2 avril 2026",
                description:
                  "Nouveau programme de Terminale, applicable uniquement à la rentrée 2027-2028 : il ne concerne pas l’année 2026-2027.",
              },
            ]}
          />

          <FaqAccordion items={faqItems} sourcePage={pagePath} />
        </div>
      </div>
    </SeoPageLayout>
  );
}
