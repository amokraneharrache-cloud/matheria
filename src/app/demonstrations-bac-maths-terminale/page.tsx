import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  GitBranch,
  ListChecks,
  Route,
} from "lucide-react";
import { SeoFaq } from "@/components/marketing/SeoFaq";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/seo";

const pagePath = "/demonstrations-bac-maths-terminale";
const title = "Démonstrations à connaître au Bac Maths Terminale";
const description =
  "Comprends les schémas de démonstration utiles en Terminale spécialité maths : récurrence, monotonie, TVI, convexité, indépendance, limites, primitives et géométrie.";

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

type ProofPattern = {
  id: string;
  title: string;
  objective: string;
  hypotheses: string[];
  logicalSteps: string[];
  example: string;
  wording: string;
  mistake: string;
  methodHref: string;
  methodLabel: string;
};

const sectionLinks = [
  { id: "recurrence", label: "Récurrence" },
  { id: "monotonie-suite", label: "Monotonie d’une suite" },
  { id: "variations", label: "Variations d’une fonction" },
  { id: "tvi", label: "TVI" },
  { id: "convexite", label: "Convexité" },
  { id: "independance", label: "Indépendance" },
  { id: "appartenance", label: "Appartenance" },
  { id: "vecteurs", label: "Vecteurs" },
  { id: "limites", label: "Limites" },
  { id: "primitives", label: "Primitives" },
];

const objectiveTable = [
  { objective: "Prouver une propriété pour tout entier", tool: "Récurrence" },
  { objective: "Montrer qu’une suite monte ou descend", tool: "Différence, quotient ou fonction associée" },
  { objective: "Déterminer les variations d’une fonction", tool: "Signe de la dérivée" },
  { objective: "Établir l’existence d’une solution", tool: "Continuité et TVI" },
  {
    objective: "Établir l’existence et l’unicité d’une solution",
    tool: "TVI pour l’existence, stricte monotonie pour l’unicité",
  },
  { objective: "Montrer qu’une fonction est convexe", tool: "Signe de la dérivée seconde" },
  { objective: "Prouver une indépendance", tool: "Comparer P(A ∩ B) et P(A)P(B)" },
  { objective: "Tester une appartenance", tool: "Substitution ou même paramètre" },
  { objective: "Tester colinéarité ou orthogonalité", tool: "Multiple ou produit scalaire" },
  { objective: "Justifier une limite", tool: "Transformation puis théorème adapté" },
  { objective: "Vérifier une primitive", tool: "Dériver l’expression proposée" },
];

const proofPatterns: ProofPattern[] = [
  {
    id: "recurrence",
    title: "1. Démonstration par récurrence",
    objective:
      "Établir qu’une propriété P(n) est vraie pour tout entier n à partir d’un rang n₀.",
    hypotheses: [
      "La propriété P(n) est formulée précisément.",
      "Le premier rang n₀ concerné est identifié.",
      "Dans l’hérédité, k est un entier arbitraire vérifiant k ≥ n₀.",
    ],
    logicalSteps: [
      "Initialisation : vérifier directement P(n₀).",
      "Hérédité : supposer P(k) vraie pour un entier k ≥ n₀, puis démontrer P(k + 1).",
      "Conclusion : invoquer le principe de récurrence pour tous les entiers n ≥ n₀.",
    ],
    example:
      "Si u₀ = 1 et uₙ₊₁ = (uₙ + 3)/2, on prouve uₙ ≤ 3. Au rang 0, 1 ≤ 3. Si uₖ ≤ 3, alors uₖ₊₁ ≤ (3 + 3)/2 = 3.",
    wording:
      "La propriété est initialisée au rang 0 et elle est héréditaire. D’après le principe de récurrence, uₙ ≤ 3 pour tout n ∈ ℕ.",
    mistake:
      "Écrire P(k + 1) dans l’hypothèse de récurrence : l’hypothèse porte uniquement sur P(k).",
    methodHref: "/methodes-maths-terminale/etudier-une-suite",
    methodLabel: "Méthode : étudier une suite",
  },
  {
    id: "monotonie-suite",
    title: "2. Montrer qu’une suite est monotone",
    objective:
      "Déterminer si une suite est croissante ou décroissante sur les rangs étudiés.",
    hypotheses: [
      "La suite est définie pour tous les rangs comparés.",
      "Pour utiliser uₙ₊₁/uₙ, les termes concernés sont strictement positifs.",
      "Pour une fonction associée uₙ = f(n), les variations de f sont établies sur un intervalle contenant les rangs.",
    ],
    logicalSteps: [
      "Calculer uₙ₊₁ − uₙ et étudier son signe.",
      "Ou, si uₙ > 0, comparer uₙ₊₁/uₙ à 1.",
      "Ou étudier une fonction f telle que uₙ = f(n), si cette voie simplifie le problème.",
      "Conclure sur l’ensemble exact des rangs concernés.",
    ],
    example:
      "Pour uₙ = 1/(n + 1), uₙ₊₁ − uₙ = −1/[(n + 1)(n + 2)] < 0 pour tout n ∈ ℕ. La suite est donc strictement décroissante.",
    wording:
      "Pour tout n ∈ ℕ, uₙ₊₁ − uₙ < 0. On en déduit que la suite (uₙ) est strictement décroissante.",
    mistake:
      "Comparer le quotient à 1 sans avoir vérifié que les termes sont strictement positifs.",
    methodHref: "/methodes-maths-terminale/etudier-une-suite",
    methodLabel: "Méthode : étudier une suite",
  },
  {
    id: "variations",
    title: "3. Justifier les variations d’une fonction",
    objective:
      "Passer du calcul de f′ au sens de variation de f sur un intervalle.",
    hypotheses: [
      "La fonction f est dérivable sur l’intervalle étudié.",
      "Le signe de f′ est déterminé sur tout cet intervalle.",
    ],
    logicalSteps: [
      "Calculer et simplifier f′(x).",
      "Étudier le signe de f′, en factorisant si nécessaire.",
      "Relier f′ ≥ 0 à la croissance et f′ ≤ 0 à la décroissance.",
      "Indiquer les valeurs de f utiles dans le tableau.",
    ],
    example:
      "Pour f(x) = x² − 4x + 1, f′(x) = 2x − 4. La dérivée est négative si x < 2 et positive si x > 2 : f décroît sur ]−∞ ; 2] puis croît sur [2 ; +∞[.",
    wording:
      "La fonction f est dérivable sur ℝ. Le signe de f′ montre que f est décroissante sur ]−∞ ; 2] puis croissante sur [2 ; +∞[.",
    mistake:
      "Déduire les variations du signe de f au lieu du signe de f′.",
    methodHref: "/methodes-maths-terminale/tableau-variation",
    methodLabel: "Méthode : tableau de variation",
  },
  {
    id: "tvi",
    title: "4. Utiliser le théorème des valeurs intermédiaires",
    objective:
      "Démontrer l’existence d’une solution à f(x) = k, puis son unicité si elle est demandée.",
    hypotheses: [
      "La fonction f est continue sur un intervalle fermé [a ; b].",
      "La valeur k est comprise entre f(a) et f(b).",
      "Pour l’unicité, f est strictement monotone sur l’intervalle.",
    ],
    logicalSteps: [
      "Établir la continuité sur [a ; b].",
      "Calculer f(a) et f(b), puis vérifier l’encadrement de k.",
      "Appliquer le TVI pour obtenir au moins une solution.",
      "Ajouter la stricte monotonie pour conclure à l’unicité.",
    ],
    example:
      "Pour f(x) = x³ + x − 1 sur [0 ; 1], f est continue, f(0) = −1 et f(1) = 1. Il existe donc α ∈ [0 ; 1] tel que f(α) = 0. Comme f′(x) = 3x² + 1 > 0, cette solution est unique.",
    wording:
      "Les hypothèses du TVI sont vérifiées : l’équation f(x) = 0 admet au moins une solution sur [0 ; 1]. La stricte croissance de f assure son unicité.",
    mistake:
      "Dire que le TVI donne directement une solution unique : il donne l’existence, l’unicité exige un argument supplémentaire.",
    methodHref: "/methodes-maths-terminale/calculer-une-limite",
    methodLabel: "Méthode : continuité et limites",
  },
  {
    id: "convexite",
    title: "5. Montrer qu’une fonction est convexe",
    objective:
      "Établir la convexité ou la concavité d’une fonction sur un intervalle.",
    hypotheses: [
      "La fonction est deux fois dérivable sur l’intervalle étudié.",
      "Le signe de f″ est connu sur tout l’intervalle.",
    ],
    logicalSteps: [
      "Calculer f″(x).",
      "Étudier son signe sur l’intervalle.",
      "Conclure : f″ ≥ 0 implique la convexité ; f″ ≤ 0 implique la concavité.",
      "Si f″ change de signe en a, conclure que la courbe admet un point d’inflexion d’abscisse a.",
    ],
    example:
      "Pour f(x) = eˣ + x², f″(x) = eˣ + 2 > 0 pour tout réel x. La fonction f est donc strictement convexe sur ℝ.",
    wording:
      "Pour tout x ∈ ℝ, f″(x) > 0. La fonction f est donc strictement convexe sur ℝ.",
    mistake:
      "Utiliser le signe de f′ pour conclure à la convexité : ce signe décrit les variations de f, pas la courbure.",
    methodHref: "/methodes-maths-terminale/tableau-variation",
    methodLabel: "Méthode : variations et convexité",
  },
  {
    id: "independance",
    title: "6. Prouver l’indépendance de deux événements",
    objective:
      "Vérifier que la réalisation d’un événement ne modifie pas la probabilité de l’autre.",
    hypotheses: [
      "Les probabilités P(A), P(B) et P(A ∩ B) sont connues ou calculables.",
      "Les événements sont définis dans le même univers probabilisé.",
    ],
    logicalSteps: [
      "Calculer P(A ∩ B).",
      "Calculer séparément P(A)P(B).",
      "Comparer les deux valeurs.",
      "Conclure à l’indépendance si et seulement si elles sont égales.",
    ],
    example:
      "On lance un dé équilibré. A = « obtenir un nombre pair » et B = « obtenir un multiple de 3 ». P(A) = 1/2, P(B) = 1/3 et P(A ∩ B) = P({6}) = 1/6 = P(A)P(B). A et B sont indépendants.",
    wording:
      "Comme P(A ∩ B) = P(A)P(B), les événements A et B sont indépendants.",
    mistake:
      "Confondre indépendance et incompatibilité : des événements incompatibles de probabilités non nulles ne sont pas indépendants.",
    methodHref: "/methodes-maths-terminale/probabilites-conditionnelles",
    methodLabel: "Méthode : probabilités conditionnelles",
  },
  {
    id: "appartenance",
    title: "7. Montrer qu’un point appartient à une droite ou un plan",
    objective:
      "Vérifier qu’un point satisfait toutes les contraintes définissant l’objet géométrique.",
    hypotheses: [
      "Les coordonnées du point et une équation ou représentation de l’objet sont connues.",
      "Pour une droite paramétrée, une même valeur du paramètre doit convenir aux trois coordonnées.",
    ],
    logicalSteps: [
      "Pour un plan, remplacer x, y et z dans son équation cartésienne.",
      "Pour une droite, écrire le système obtenu avec les coordonnées du point.",
      "Chercher une seule valeur du paramètre vérifiant toutes les lignes.",
      "Conclure explicitement à l’appartenance ou à la non-appartenance.",
    ],
    example:
      "Le point A(2 ; 1 ; 0) vérifie 2 + 2 × 1 − 0 − 4 = 0. Il appartient donc au plan d’équation x + 2y − z − 4 = 0.",
    wording:
      "Les coordonnées de A vérifient l’équation cartésienne du plan ; par conséquent, A appartient à ce plan.",
    mistake:
      "Trouver des valeurs différentes du paramètre dans les trois coordonnées d’une droite et conclure tout de même à l’appartenance.",
    methodHref: "/methodes-maths-terminale/geometrie-espace",
    methodLabel: "Méthode : géométrie dans l’espace",
  },
  {
    id: "vecteurs",
    title: "8. Montrer que deux vecteurs sont colinéaires ou orthogonaux",
    objective:
      "Comparer les directions de deux vecteurs ou établir leur orthogonalité.",
    hypotheses: [
      "Les vecteurs sont exprimés dans un même repère.",
      "Pour caractériser la colinéarité par v⃗ = λu⃗, le vecteur u⃗ est non nul ; le vecteur nul est colinéaire à tout vecteur.",
      "La formule coordonnée du produit scalaire suppose un repère orthonormé.",
    ],
    logicalSteps: [
      "Si u⃗ ≠ 0⃗, colinéarité : chercher un réel λ tel que v⃗ = λu⃗.",
      "Orthogonalité : calculer u⃗ · v⃗ dans un repère orthonormé.",
      "Conclure avec le vocabulaire géométrique adapté.",
    ],
    example:
      "Les vecteurs u⃗ = (1 ; 2 ; −1) et v⃗ = (2 ; 4 ; −2) vérifient v⃗ = 2u⃗ : ils sont colinéaires. Dans un repère orthonormé, (1 ; 1 ; 0) · (1 ; −1 ; 2) = 0 : ces deux vecteurs sont orthogonaux.",
    wording:
      "Il existe λ = 2 tel que v⃗ = λu⃗ ; les vecteurs sont donc colinéaires.",
    mistake:
      "Comparer séparément des quotients de coordonnées lorsqu’un dénominateur est nul ; l’écriture v⃗ = λu⃗ est plus sûre.",
    methodHref: "/methodes-maths-terminale/geometrie-espace",
    methodLabel: "Méthode : géométrie dans l’espace",
  },
  {
    id: "limites",
    title: "9. Justifier une limite",
    objective:
      "Transformer une expression pour appliquer une limite usuelle ou une opération autorisée sur les limites.",
    hypotheses: [
      "La borne étudiée est indiquée.",
      "L’expression est définie sur un voisinage épointé de la borne ; si la règle du quotient ne s’applique pas directement, l’expression est transformée.",
      "Aucune forme indéterminée n’est traitée comme un calcul ordinaire.",
    ],
    logicalSteps: [
      "Identifier une éventuelle forme indéterminée.",
      "Factoriser, simplifier, encadrer ou utiliser une croissance comparée.",
      "Appliquer les règles sur les limites à l’expression transformée.",
      "Écrire la borne et la valeur dans la conclusion.",
    ],
    example:
      "Quand x tend vers +∞, (3x² − x)/(x² + 1) = (3 − 1/x)/(1 + 1/x²). Les termes 1/x et 1/x² tendent vers 0, donc le quotient tend vers 3.",
    wording:
      "Après factorisation par x² au numérateur et au dénominateur, les règles sur les limites donnent lim f(x) = 3 lorsque x tend vers +∞.",
    mistake:
      "Écrire ∞/∞ = 1 : il s’agit d’une forme indéterminée qu’il faut d’abord transformer.",
    methodHref: "/methodes-maths-terminale/calculer-une-limite",
    methodLabel: "Méthode : calculer une limite",
  },
  {
    id: "primitives",
    title: "10. Montrer qu’une expression est une primitive",
    objective:
      "Vérifier qu’une fonction F est une primitive d’une fonction f sur un intervalle.",
    hypotheses: [
      "La fonction F est dérivable sur l’intervalle étudié.",
      "L’égalité F′(x) = f(x) est vérifiée pour tout x de cet intervalle.",
    ],
    logicalSteps: [
      "Déterminer l’intervalle sur lequel F est dérivable.",
      "Calculer F′(x) en détaillant les règles utiles.",
      "Simplifier et comparer le résultat à f(x).",
      "Conclure sur l’intervalle exact.",
    ],
    example:
      "Pour F(x) = x³/3 + eˣ et f(x) = x² + eˣ, on a F′(x) = x² + eˣ = f(x) pour tout x ∈ ℝ. F est donc une primitive de f sur ℝ.",
    wording:
      "La fonction F est dérivable sur ℝ et F′ = f ; F est donc une primitive de f sur ℝ.",
    mistake:
      "Se contenter de reconnaître la forme sans dériver, ou oublier que toutes les primitives sont ensuite de la forme F + C sur un intervalle.",
    methodHref: "/methodes-maths-terminale/integrales",
    methodLabel: "Méthode : primitives et intégrales",
  },
];

const logicChecklist = [
  "J’ai reformulé précisément ce qu’il faut démontrer.",
  "J’ai identifié les hypothèses données et celles qu’il faut établir.",
  "Chaque implication repose sur une propriété nommée ou un calcul visible.",
  "Je n’utilise pas la conclusion comme hypothèse.",
  "Les intervalles, rangs ou événements sont explicités.",
  "Ma conclusion reprend exactement l’objectif de départ.",
];

const faqItems: FaqItem[] = [
  {
    question: "Existe-t-il une liste officielle de démonstrations à apprendre par cœur ?",
    answer:
      "Cette page ne présente pas une liste officielle imposée. Elle rassemble des schémas de raisonnement utiles pour comprendre et résoudre des exercices de Terminale et des sujets type Bac.",
  },
  {
    question: "Faut-il mémoriser toutes les rédactions types ?",
    answer:
      "Il vaut mieux mémoriser la structure logique et les hypothèses à vérifier. La rédaction doit ensuite être adaptée aux fonctions, suites, événements et intervalles de l’exercice.",
  },
  {
    question: "Quelle différence avec la page sur la rédaction au Bac Maths ?",
    answer:
      "La page rédaction explique comment formuler une justification. Cette page explique quel raisonnement construire selon l’objectif : récurrence, monotonie, existence, indépendance ou appartenance.",
  },
  {
    question: "Le TVI prouve-t-il qu’une solution est unique ?",
    answer:
      "Non. Le TVI établit l’existence d’au moins une solution sous ses hypothèses. L’unicité demande par exemple de montrer que la fonction est strictement monotone sur l’intervalle.",
  },
];

export default function DemonstrationsBacMathsTerminalePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Méthodes maths Terminale", path: "/methodes-maths-terminale" },
            { name: "Démonstrations Bac Maths Terminale", path: pagePath },
          ]),
        ]}
      />

      <section className="border-b border-slate-200 bg-gradient-to-b from-indigo-50 to-white px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 inline-flex rounded-full bg-indigo-100 px-3 py-1 text-sm font-bold text-indigo-950">
            Schémas de raisonnement — Terminale spécialité maths
          </p>
          <h1 className="max-w-5xl text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl">
            Les démonstrations à connaître en Terminale spécialité maths
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
            Cette page aide à choisir et construire un raisonnement. Elle ne prétend
            pas fournir une liste officielle à réciter : les exemples montrent des
            structures utiles à adapter aux données de chaque exercice.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#objectif-outil"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-900 px-5 py-3 font-bold text-white hover:bg-blue-800"
            >
              Choisir l’outil adapté
              <Route className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              href="#recurrence"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-blue-900 px-5 py-3 font-bold text-blue-900 hover:bg-blue-50"
            >
              Lire les démonstrations
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
              <h2 className="text-xl font-bold text-indigo-950">Construire le raisonnement</h2>
              <p className="mt-2 leading-7 text-slate-700">
                Objectif, hypothèses, étapes logiques et conclusion.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-xl font-bold text-slate-950">Soigner la rédaction</h2>
              <p className="mt-2 leading-7 text-slate-700">
                Le guide rédaction complète cette page avec des formulations utiles.
              </p>
              <Link
                href="/redaction-bac-maths-terminale"
                className="mt-3 inline-flex items-center gap-2 font-bold text-blue-900 hover:underline"
              >
                Voir le guide de rédaction
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-xl font-bold text-slate-950">Appliquer une technique</h2>
              <p className="mt-2 leading-7 text-slate-700">
                Les pages méthodes détaillent chaque technique sur un exercice précis.
              </p>
              <Link
                href="/methodes-maths-terminale"
                className="mt-3 inline-flex items-center gap-2 font-bold text-blue-900 hover:underline"
              >
                Voir toutes les méthodes
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-xl font-bold text-slate-950">Résoudre une équation différentielle</h2>
              <p className="mt-2 leading-7 text-slate-700">
                Une fiche dédiée explique les familles de solutions, la vérification et les conditions initiales.
              </p>
              <Link
                href="/equations-differentielles-terminale"
                className="mt-3 inline-flex items-center gap-2 font-bold text-blue-900 hover:underline"
              >
                Voir la méthode complète
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <nav
            aria-label="Sommaire des démonstrations"
            className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5 sm:p-6"
          >
            <h2 className="text-2xl font-bold text-slate-950">Sommaire</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {sectionLinks.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="rounded-xl border border-indigo-100 bg-white px-4 py-3 text-sm font-semibold text-indigo-950 hover:border-indigo-300"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </section>

      <section id="objectif-outil" className="scroll-mt-24 px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <GitBranch className="h-7 w-7 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">
              Tableau objectif → outil à utiliser
            </h2>
            <p className="mt-3 leading-7 text-slate-700">
              Commence par le verbe de la consigne. Il indique souvent la famille de
              raisonnement avant même le premier calcul.
            </p>
          </div>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead className="bg-slate-950 text-white">
                <tr>
                  <th className="px-5 py-4 font-bold">Objectif</th>
                  <th className="px-5 py-4 font-bold">Outil à envisager</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {objectiveTable.map((item) => (
                  <tr key={item.objective}>
                    <td className="px-5 py-4 font-semibold text-slate-900">{item.objective}</td>
                    <td className="px-5 py-4 text-slate-700">{item.tool}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="px-4 py-10">
        <div className="mx-auto max-w-6xl space-y-10">
          {proofPatterns.map((proof) => (
            <article
              key={proof.id}
              id={proof.id}
              className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <h2 className="text-3xl font-bold text-slate-950">{proof.title}</h2>
              <p className="mt-4 rounded-xl border-l-4 border-blue-700 bg-blue-50 p-4 leading-7 text-blue-950">
                <strong>Objectif :</strong> {proof.objective}
              </p>

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div>
                  <h3 className="text-xl font-bold text-slate-950">Hypothèses nécessaires</h3>
                  <ul className="mt-4 space-y-3">
                    {proof.hypotheses.map((item) => (
                      <li key={item} className="flex gap-3 leading-7 text-slate-700">
                        <CheckCircle2
                          className="mt-1 h-5 w-5 shrink-0 text-emerald-600"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-950">Schéma logique</h3>
                  <ol className="mt-4 space-y-3">
                    {proof.logicalSteps.map((item, index) => (
                      <li key={item} className="flex gap-3 leading-7 text-slate-700">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-900 text-sm font-bold text-white">
                          {index + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-5">
                  <h3 className="font-bold text-slate-950">Exemple court</h3>
                  <p className="mt-2 leading-7 text-slate-700">{proof.example}</p>
                </div>
                <div className="rounded-xl bg-emerald-50 p-5">
                  <h3 className="font-bold text-emerald-950">Rédaction type</h3>
                  <p className="mt-2 leading-7 text-emerald-950">{proof.wording}</p>
                </div>
              </div>

              <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-5">
                <AlertTriangle
                  className="mt-1 h-5 w-5 shrink-0 text-amber-700"
                  aria-hidden="true"
                />
                <p className="leading-7 text-amber-950">
                  <strong>Erreur fréquente :</strong> {proof.mistake}
                </p>
              </div>

              <Link
                href={proof.methodHref}
                className="mt-5 inline-flex items-center gap-2 font-bold text-blue-900 hover:underline"
              >
                {proof.methodLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          ))}

          <section className="rounded-2xl border-2 border-indigo-200 bg-indigo-50 p-6 sm:p-8">
            <ListChecks className="h-7 w-7 text-indigo-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">Checklist logique</h2>
            <ul className="mt-6 grid gap-3 md:grid-cols-2">
              {logicChecklist.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl bg-white p-4 leading-7 text-slate-700">
                  <CheckCircle2
                    className="mt-1 h-5 w-5 shrink-0 text-emerald-600"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-950">Continuer selon l’objectif</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {[
                {
                  icon: BookOpenCheck,
                  title: "Formuler la démonstration",
                  text: "Phrases utiles, hypothèses et conclusions adaptées à une copie.",
                  href: "/redaction-bac-maths-terminale",
                  label: "Voir le guide de rédaction",
                },
                {
                  icon: GitBranch,
                  title: "Appliquer les méthodes",
                  text: "Retrouver les techniques détaillées pour chaque chapitre.",
                  href: "/methodes-maths-terminale",
                  label: "Voir les méthodes Terminale",
                },
                {
                  icon: CheckCircle2,
                  title: "S’entraîner en contexte",
                  text: "Choisir les raisonnements dans un sujet mêlant plusieurs chapitres.",
                  href: "/sujets-type-bac-maths-terminale",
                  label: "Voir les sujets type Bac",
                },
              ].map((item) => (
                <article key={item.title} className="rounded-2xl bg-slate-50 p-6">
                  <item.icon className="h-7 w-7 text-blue-800" aria-hidden="true" />
                  <h3 className="mt-4 text-xl font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-2 leading-7 text-slate-700">{item.text}</p>
                  <Link
                    href={item.href}
                    className="mt-4 inline-flex items-center gap-2 font-bold text-blue-900 hover:underline"
                  >
                    {item.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <SeoFaq items={faqItems} />
        </div>
      </section>
    </SeoPageLayout>
  );
}
