import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowRight, BookOpenCheck, CheckCircle2 } from "lucide-react";
import { PrintButton } from "@/components/marketing/PrintButton";
import { SeoFaq } from "@/components/marketing/SeoFaq";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/seo";
import styles from "../seo-resource.module.css";

const pagePath = "/formules-bac-maths-terminale";
const title = "Formules Bac Maths Terminale : fiche complète à imprimer";
const description =
  "Retrouve les formules essentielles de Terminale spécialité maths : suites, limites, dérivées, logarithme, probabilités, intégrales et géométrie.";

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

type FormulaItem = {
  name: string;
  formula: string;
  conditions: string;
  explanation: string;
  mistake: string;
  methodHref: string;
  methodLabel: string;
};

type FormulaChapter = {
  id: string;
  title: string;
  intro: string;
  formulas: FormulaItem[];
};

const formulaChapters: FormulaChapter[] = [
  {
    id: "suites",
    title: "Suites",
    intro:
      "Commence toujours par identifier l’indice de départ et la nature de la suite. Les formules changent si l’on part de u₀, de u₁ ou d’un rang p.",
    formulas: [
      {
        name: "Suite arithmétique",
        formula: "uₙ = uₚ + (n − p)r",
        conditions:
          "La différence uₙ₊₁ − uₙ est constante et égale à r. Les rangs n et p appartiennent à l’ensemble de définition.",
        explanation:
          "Pour n ≥ p, on ajoute r à chacun des n − p passages ; pour n < p, on retranche r à chacun des p − n passages.",
        mistake:
          "Écrire uₙ = u₀ + nr alors que la suite commence à u₁, sans adapter l’indice.",
        methodHref: "/methodes-maths-terminale/etudier-une-suite",
        methodLabel: "Méthode : étudier une suite",
      },
      {
        name: "Somme de termes arithmétiques consécutifs",
        formula: "S = nombre de termes × (premier terme + dernier terme) / 2",
        conditions:
          "Les termes additionnés sont consécutifs dans une même suite arithmétique, de uₚ à uₙ avec p ≤ n.",
        explanation:
          "Le nombre de termes de uₚ à uₙ inclus est n − p + 1.",
        mistake:
          "Utiliser n comme nombre de termes sans vérifier le premier indice de la somme.",
        methodHref: "/methodes-maths-terminale/etudier-une-suite",
        methodLabel: "Méthode : étudier une suite",
      },
      {
        name: "Suite géométrique",
        formula: "Si n > p : uₙ = uₚ × qⁿ⁻ᵖ ; si q ≠ 0, la formule vaut pour tous n et p",
        conditions:
          "Chaque terme est obtenu en multipliant le précédent par une constante q. Pour n = p, on a simplement uₙ = uₚ. La condition q ≠ 0 évite une puissance négative de 0 lorsque n < p.",
        explanation:
          "Pour n ≥ p, on multiplie par q à chacun des n − p passages ; pour n < p et q ≠ 0, on divise par q à chacun des p − n passages.",
        mistake:
          "Confondre la raison multiplicative q avec une différence constante.",
        methodHref: "/methodes-maths-terminale/etudier-une-suite",
        methodLabel: "Méthode : étudier une suite",
      },
      {
        name: "Somme géométrique",
        formula: "1 + q + q² + … + qⁿ = (1 − qⁿ⁺¹) / (1 − q)",
        conditions:
          "q ≠ 1. Pour une somme commençant ailleurs ou ayant un premier terme différent de 1, il faut factoriser ce premier terme.",
        explanation:
          "La puissance du numérateur correspond au nombre de termes de la somme.",
        mistake:
          "Oublier que de q⁰ à qⁿ, il y a n + 1 termes.",
        methodHref: "/methodes-maths-terminale/etudier-une-suite",
        methodLabel: "Méthode : étudier une suite",
      },
      {
        name: "Limite d’une suite géométrique",
        formula: "Si −1 < q < 1, alors qⁿ → 0 ; si q > 1, alors qⁿ → +∞",
        conditions:
          "n tend vers +∞. Pour q = 1, qⁿ = 1 ; pour tout q ≤ −1, la suite qⁿ ne converge pas.",
        explanation:
          "La valeur absolue de q détermine si les puissances se rapprochent de 0 ou grandissent.",
        mistake:
          "Affirmer que qⁿ tend toujours vers 0 dès que q < 1, en oubliant les valeurs q ≤ −1.",
        methodHref: "/methodes-maths-terminale/etudier-une-suite",
        methodLabel: "Méthode : étudier une suite",
      },
      {
        name: "Convergence monotone",
        formula: "Croissante et majorée ⇒ convergente ; décroissante et minorée ⇒ convergente",
        conditions:
          "La monotonie et la borne doivent être démontrées sur tous les rangs concernés.",
        explanation:
          "Le théorème garantit l’existence d’une limite finie, sans en donner directement la valeur.",
        mistake:
          "Conclure que la limite est égale au majorant ou au minorant utilisé.",
        methodHref: "/methodes-maths-terminale/etudier-une-suite",
        methodLabel: "Méthode : étudier une suite",
      },
      {
        name: "Raisonnement par récurrence",
        formula: "Initialisation + [P(k) ⇒ P(k + 1)] ⇒ P(n) pour tout n ≥ n₀",
        conditions:
          "L’initialisation est faite au premier rang n₀ concerné et l’hérédité est démontrée pour un entier k ≥ n₀ arbitraire.",
        explanation:
          "Ce n’est pas une formule de calcul : c’est une structure de démonstration.",
        mistake:
          "Utiliser P(k + 1) pendant l’hérédité avant de l’avoir démontrée.",
        methodHref: "/methodes-maths-terminale/etudier-une-suite",
        methodLabel: "Méthode : étudier une suite",
      },
    ],
  },
  {
    id: "limites",
    title: "Limites",
    intro:
      "Les opérations sur les limites ne s’appliquent directement que lorsqu’elles ne conduisent pas à une forme indéterminée.",
    formulas: [
      {
        name: "Somme et produit de limites finies",
        formula: "Si f → ℓ et g → ℓ′, alors f + g → ℓ + ℓ′ et fg → ℓℓ′",
        conditions:
          "Les limites ℓ et ℓ′ sont finies. Avec des limites infinies, il faut consulter les règles de signe et repérer les formes indéterminées.",
        explanation:
          "Une somme ou un produit se traite terme à terme quand aucune indétermination n’apparaît.",
        mistake:
          "Écrire +∞ − ∞ = 0 : cette écriture est une forme indéterminée, pas un calcul.",
        methodHref: "/methodes-maths-terminale/calculer-une-limite",
        methodLabel: "Méthode : calculer une limite",
      },
      {
        name: "Quotient de limites finies",
        formula: "Si f → ℓ et g → ℓ′ avec ℓ′ ≠ 0, alors f / g → ℓ / ℓ′",
        conditions:
          "Le dénominateur a une limite non nulle. Si g tend vers 0, son signe doit être étudié.",
        explanation:
          "La condition ℓ′ ≠ 0 permet de diviser les limites.",
        mistake:
          "Conclure automatiquement à l’infini lorsqu’un dénominateur tend vers 0, sans étudier son signe ni le numérateur.",
        methodHref: "/methodes-maths-terminale/calculer-une-limite",
        methodLabel: "Méthode : calculer une limite",
      },
      {
        name: "Puissances et inverses usuels",
        formula: "Quand x → +∞ : xⁿ → +∞ et 1 / xⁿ → 0, pour n ≥ 1",
        conditions:
          "n est un entier naturel non nul. En −∞, la parité de n détermine le signe de xⁿ.",
        explanation:
          "Les puissances positives grandissent en valeur absolue et leurs inverses se rapprochent de 0.",
        mistake:
          "Oublier la parité pour la limite de xⁿ lorsque x tend vers −∞.",
        methodHref: "/methodes-maths-terminale/calculer-une-limite",
        methodLabel: "Méthode : calculer une limite",
      },
      {
        name: "Croissance comparée de l’exponentielle",
        formula: "Quand x → +∞ : eˣ / xⁿ → +∞ et xⁿ / eˣ → 0",
        conditions:
          "n est un entier naturel. La comparaison concerne la limite en +∞.",
        explanation:
          "L’exponentielle domine toute puissance de x à l’infini.",
        mistake:
          "Appliquer cette comparaison en une borne finie ou sans avoir ramené l’expression à la forme adaptée.",
        methodHref: "/methodes-maths-terminale/calculer-une-limite",
        methodLabel: "Méthode : calculer une limite",
      },
      {
        name: "Croissance comparée du logarithme",
        formula: "Quand x → +∞ : ln(x) / x → 0",
        conditions:
          "x > 0 et x tend vers +∞.",
        explanation:
          "Le logarithme croît plus lentement que la fonction x.",
        mistake:
          "Utiliser ln(x) lorsque x ≤ 0 ou oublier de préciser la borne.",
        methodHref: "/methodes-maths-terminale/calculer-une-limite",
        methodLabel: "Méthode : calculer une limite",
      },
      {
        name: "Théorème des gendarmes",
        formula: "g ≤ f ≤ h et g → ℓ, h → ℓ ⇒ f → ℓ",
        conditions:
          "Les inégalités sont vraies au voisinage de la borne étudiée et les deux fonctions encadrantes ont la même limite ℓ.",
        explanation:
          "Un encadrement permet d’obtenir une limite quand le calcul direct n’est pas adapté.",
        mistake:
          "Utiliser deux fonctions encadrantes qui n’ont pas la même limite.",
        methodHref: "/methodes-maths-terminale/calculer-une-limite",
        methodLabel: "Méthode : calculer une limite",
      },
      {
        name: "Théorème des valeurs intermédiaires",
        formula: "f continue sur [a ; b], k entre f(a) et f(b) ⇒ ∃c ∈ [a ; b], f(c) = k",
        conditions:
          "a < b. Pour conclure à l’unicité de c, il faut en plus que f soit strictement monotone sur [a ; b].",
        explanation:
          "Le théorème établit l’existence d’un antécédent d’une valeur comprise entre les images des bornes.",
        mistake:
          "Conclure à une solution unique avec la seule continuité.",
        methodHref: "/redaction-bac-maths-terminale#tvi",
        methodLabel: "Rédaction : utiliser le TVI",
      },
    ],
  },
  {
    id: "derivation",
    title: "Dérivation et convexité",
    intro:
      "Avant de dériver, vérifie le domaine et la dérivabilité. Pour une fonction composée, identifie clairement la fonction intérieure.",
    formulas: [
      {
        name: "Dérivées usuelles",
        formula: "(xⁿ)′ = nxⁿ⁻¹ ; (1/x)′ = −1/x² ; (√x)′ = 1/(2√x)",
        conditions:
          "n ≥ 1. La formule de 1/x vaut pour x ≠ 0 ; celle de √x vaut pour x > 0.",
        explanation:
          "Ces dérivées sont les briques de base des calculs plus longs.",
        mistake:
          "Écrire (√x)′ = 1/2√x sans parenthèses : le dénominateur est 2√x.",
        methodHref: "/methodes-maths-terminale/tableau-variation",
        methodLabel: "Méthode : tableau de variation",
      },
      {
        name: "Produit",
        formula: "(uv)′ = u′v + uv′",
        conditions:
          "u et v sont dérivables sur l’intervalle étudié.",
        explanation:
          "On dérive chaque facteur à tour de rôle en conservant l’autre.",
        mistake:
          "Écrire (uv)′ = u′v′.",
        methodHref: "/methodes-maths-terminale/tableau-variation",
        methodLabel: "Méthode : tableau de variation",
      },
      {
        name: "Quotient",
        formula: "(u/v)′ = (u′v − uv′) / v²",
        conditions:
          "u et v sont dérivables et v ne s’annule pas sur l’intervalle étudié.",
        explanation:
          "Le carré au dénominateur est toujours positif lorsque le quotient est défini.",
        mistake:
          "Inverser l’ordre du numérateur ou oublier le carré du dénominateur.",
        methodHref: "/methodes-maths-terminale/tableau-variation",
        methodLabel: "Méthode : tableau de variation",
      },
      {
        name: "Fonction composée",
        formula: "(v ∘ u)′ = u′ × (v′ ∘ u)",
        conditions:
          "u est dérivable et ses valeurs restent dans un intervalle où v est dérivable.",
        explanation:
          "On dérive la fonction extérieure en gardant u, puis on multiplie par u′.",
        mistake:
          "Oublier le facteur u′, par exemple dans la dérivée de eᵘ ou ln(u).",
        methodHref: "/methodes-maths-terminale/tableau-variation",
        methodLabel: "Méthode : tableau de variation",
      },
      {
        name: "Dérivées trigonométriques",
        formula: "(sin x)′ = cos x ; (cos x)′ = −sin x",
        conditions:
          "Les fonctions sinus et cosinus sont dérivables sur ℝ ; les angles sont exprimés en radians.",
        explanation:
          "Ces dérivées permettent d’étudier variations et extrema de fonctions trigonométriques.",
        mistake:
          "Oublier le signe moins dans la dérivée de cos.",
        methodHref: "/methodes-maths-terminale/tableau-variation",
        methodLabel: "Méthode : tableau de variation",
      },
      {
        name: "Convexité",
        formula: "f″ ≥ 0 ⇒ f convexe ; f″ ≤ 0 ⇒ f concave",
        conditions:
          "f est deux fois dérivable sur l’intervalle. Pour un point d’inflexion, la convexité doit effectivement changer.",
        explanation:
          "Le signe de la dérivée seconde décrit la courbure de la représentation graphique.",
        mistake:
          "Déclarer un point d’inflexion dès que f″(a) = 0, sans vérifier le changement de convexité.",
        methodHref: "/methodes-maths-terminale/tableau-variation",
        methodLabel: "Méthode : tableau de variation",
      },
    ],
  },
  {
    id: "exponentielle-logarithme",
    title: "Exponentielle et logarithme",
    intro:
      "L’exponentielle est définie sur ℝ et strictement croissante. Le logarithme népérien n’est défini que sur ]0 ; +∞[ et est lui aussi strictement croissant.",
    formulas: [
      {
        name: "Propriétés de l’exponentielle",
        formula: "eᵃ⁺ᵇ = eᵃeᵇ ; e⁻ᵃ = 1/eᵃ ; eᵃ⁻ᵇ = eᵃ/eᵇ",
        conditions:
          "a et b sont des nombres réels.",
        explanation:
          "L’exponentielle transforme une somme en produit.",
        mistake:
          "Écrire eᵃ⁺ᵇ = eᵃ + eᵇ.",
        methodHref: "/methodes-maths-terminale/logarithme",
        methodLabel: "Méthode : logarithme",
      },
      {
        name: "Dérivée d’une exponentielle composée",
        formula: "(eᵘ)′ = u′eᵘ",
        conditions:
          "u est dérivable sur l’intervalle étudié.",
        explanation:
          "La dérivée de la fonction intérieure multiplie l’exponentielle.",
        mistake:
          "Oublier u′ lorsque l’exposant n’est pas simplement x.",
        methodHref: "/methodes-maths-terminale/tableau-variation",
        methodLabel: "Méthode : tableau de variation",
      },
      {
        name: "Limites usuelles de l’exponentielle",
        formula: "eˣ → 0 quand x → −∞ ; eˣ → +∞ quand x → +∞",
        conditions:
          "La variable x tend respectivement vers −∞ ou +∞. L’exponentielle reste strictement positive sur ℝ.",
        explanation:
          "Ces deux limites servent de repères avant une factorisation ou une croissance comparée.",
        mistake:
          "Écrire que eˣ atteint 0 : elle s’en approche lorsque x tend vers −∞, mais reste toujours positive.",
        methodHref: "/methodes-maths-terminale/calculer-une-limite",
        methodLabel: "Méthode : calculer une limite",
      },
      {
        name: "Propriétés du logarithme",
        formula: "ln(ab) = ln(a) + ln(b) ; ln(a/b) = ln(a) − ln(b) ; ln(aⁿ) = n ln(a)",
        conditions:
          "a > 0 et b > 0. Pour ln(aⁿ), a > 0 et n est entier.",
        explanation:
          "Le logarithme transforme un produit en somme et un quotient en différence.",
        mistake:
          "Écrire ln(a + b) = ln(a) + ln(b), ce qui est faux.",
        methodHref: "/methodes-maths-terminale/logarithme",
        methodLabel: "Méthode : logarithme",
      },
      {
        name: "Dérivée d’un logarithme composé",
        formula: "(ln u)′ = u′ / u",
        conditions:
          "u est dérivable et strictement positive sur l’intervalle étudié.",
        explanation:
          "La condition u > 0 est à vérifier avant tout calcul.",
        mistake:
          "Dériver ln(u) sans étudier où u est positive.",
        methodHref: "/methodes-maths-terminale/logarithme",
        methodLabel: "Méthode : logarithme",
      },
      {
        name: "Limites usuelles du logarithme",
        formula: "ln(x) → −∞ quand x → 0⁺ ; ln(x) → +∞ quand x → +∞",
        conditions:
          "x reste strictement positif. La notation 0⁺ signifie que x tend vers 0 par valeurs positives.",
        explanation:
          "Le domaine du logarithme impose une limite à droite en 0.",
        mistake:
          "Étudier ln(x) lorsque x tend vers 0 par valeurs négatives : la fonction n’y est pas définie.",
        methodHref: "/methodes-maths-terminale/calculer-une-limite",
        methodLabel: "Méthode : calculer une limite",
      },
      {
        name: "Équations et inéquations",
        formula: "eᵘ = eᵛ ⇔ u = v ; ln(u) = ln(v) ⇔ u = v",
        conditions:
          "Pour le logarithme, u > 0 et v > 0. Pour les inéquations, le sens est conservé car exp et ln sont strictement croissantes.",
        explanation:
          "L’exponentielle et le logarithme sont des fonctions réciproques : ln(eˣ) = x et eˡⁿ⁽ˣ⁾ = x pour x > 0.",
        mistake:
          "Résoudre une équation logarithmique sans vérifier les conditions d’existence.",
        methodHref: "/methodes-maths-terminale/logarithme",
        methodLabel: "Méthode : logarithme",
      },
    ],
  },
  {
    id: "integrales",
    title: "Intégrales et primitives",
    intro:
      "Une primitive n’est jamais unique : sur un même intervalle, deux primitives d’une même fonction diffèrent d’une constante.",
    formulas: [
      {
        name: "Primitives des puissances",
        formula: "∫ xⁿ dx = xⁿ⁺¹/(n + 1) + C",
        conditions:
          "n est un entier naturel. Plus généralement, pour α ∈ ℝ avec α ≠ −1, la formule xᵅ⁺¹/(α + 1) vaut sur un intervalle inclus dans ]0 ; +∞[.",
        explanation:
          "On augmente l’exposant de 1 puis on divise par le nouvel exposant.",
        mistake:
          "Appliquer cette formule à 1/x : le cas n = −1 donne ln(x) sur ]0 ; +∞[.",
        methodHref: "/methodes-maths-terminale/integrales",
        methodLabel: "Méthode : calculer une intégrale",
      },
      {
        name: "Primitives avec exponentielle ou logarithme",
        formula: "∫ u′eᵘ dx = eᵘ + C ; ∫ u′/u dx = ln|u| + C",
        conditions:
          "u est dérivable ; pour u′/u, u ne s’annule pas sur l’intervalle. Au programme, on travaille souvent sur un intervalle où u garde un signe.",
        explanation:
          "On reconnaît la dérivée de la fonction intérieure dans le facteur.",
        mistake:
          "Utiliser ln(u) si u peut être négative, sans travailler sur un intervalle adapté.",
        methodHref: "/methodes-maths-terminale/integrales",
        methodLabel: "Méthode : calculer une intégrale",
      },
      {
        name: "Primitives trigonométriques",
        formula: "∫ cos(x) dx = sin(x) + C ; ∫ sin(x) dx = −cos(x) + C",
        conditions:
          "Les formules sont valables sur ℝ, avec les angles exprimés en radians.",
        explanation:
          "Elles se lisent en sens inverse des dérivées de sinus et cosinus.",
        mistake:
          "Oublier le signe moins devant cos dans une primitive de sin.",
        methodHref: "/methodes-maths-terminale/integrales",
        methodLabel: "Méthode : calculer une intégrale",
      },
      {
        name: "Calcul par une primitive",
        formula: "∫ₐᵇ f(x) dx = F(b) − F(a)",
        conditions:
          "f est continue sur [a ; b] et F est une primitive de f sur cet intervalle.",
        explanation:
          "On évalue la primitive à la borne supérieure puis à la borne inférieure.",
        mistake:
          "Inverser l’ordre et calculer F(a) − F(b).",
        methodHref: "/methodes-maths-terminale/integrales",
        methodLabel: "Méthode : calculer une intégrale",
      },
      {
        name: "Linéarité",
        formula: "∫ₐᵇ (λf + μg) = λ∫ₐᵇ f + μ∫ₐᵇ g",
        conditions:
          "f et g sont continues sur [a ; b] et λ, μ sont des réels.",
        explanation:
          "La somme et les facteurs constants peuvent être séparés avant de chercher les primitives.",
        mistake:
          "Croire que l’intégrale d’un produit est le produit des intégrales.",
        methodHref: "/methodes-maths-terminale/integrales",
        methodLabel: "Méthode : calculer une intégrale",
      },
      {
        name: "Intégration par parties",
        formula: "∫ₐᵇ u′v = [uv]ₐᵇ − ∫ₐᵇ uv′",
        conditions:
          "u et v sont dérivables sur [a ; b] et leurs dérivées sont continues sur cet intervalle.",
        explanation:
          "La formule transforme un produit en choisissant la fonction à dériver et celle à intégrer.",
        mistake:
          "Oublier le terme aux bornes [uv]ₐᵇ ou le signe moins.",
        methodHref: "/methodes-maths-terminale/integrales",
        methodLabel: "Méthode : calculer une intégrale",
      },
      {
        name: "Aire et valeur moyenne",
        formula: "Aire = ∫ₐᵇ f(x) dx si f ≥ 0 ; moyenne = (1/(b − a))∫ₐᵇ f(x) dx",
        conditions:
          "a < b et f est continue. La formule d’aire directe exige f ≥ 0 sur [a ; b].",
        explanation:
          "Si f change de signe, l’intégrale calcule une aire algébrique : les zones sous l’axe sont comptées négativement.",
        mistake:
          "Présenter une intégrale négative comme une aire géométrique négative.",
        methodHref: "/methodes-maths-terminale/integrales",
        methodLabel: "Méthode : calculer une intégrale",
      },
      {
        name: "Équations différentielles usuelles",
        formula: "y′ = ay ⇒ y(x) = Ceᵃˣ ; y′ = ay + b ⇒ y(x) = Ceᵃˣ − b/a",
        conditions:
          "C est une constante réelle. La deuxième formule suppose a ≠ 0 ; une condition initiale permet de déterminer C.",
        explanation:
          "Une solution particulière constante de y′ = ay + b est −b/a.",
        mistake:
          "Oublier la famille de solutions représentée par la constante C.",
        methodHref: "/methodes-maths-terminale/integrales",
        methodLabel: "Méthode : primitives et équations différentielles",
      },
    ],
  },
  {
    id: "probabilites",
    title: "Probabilités",
    intro:
      "Nomme les événements avant de calculer. Une formule de probabilité n’a de sens que si les événements et les conditions sont clairement identifiés.",
    formulas: [
      {
        name: "Probabilité conditionnelle",
        formula: "P_A(B) = P(A ∩ B) / P(A)",
        conditions:
          "P(A) > 0.",
        explanation:
          "On mesure la probabilité de B lorsque l’on sait que A est réalisé.",
        mistake:
          "Confondre P_A(B) et P_B(A).",
        methodHref: "/methodes-maths-terminale/probabilites-conditionnelles",
        methodLabel: "Méthode : probabilités conditionnelles",
      },
      {
        name: "Intersection",
        formula: "P(A ∩ B) = P(A) × P_A(B)",
        conditions:
          "P(A) > 0 pour utiliser P_A(B). La formule symétrique avec B est également possible si P(B) > 0.",
        explanation:
          "Dans un arbre, on multiplie les probabilités le long d’un chemin.",
        mistake:
          "Additionner les probabilités des branches successives d’un même chemin.",
        methodHref: "/methodes-maths-terminale/probabilites-conditionnelles",
        methodLabel: "Méthode : probabilités conditionnelles",
      },
      {
        name: "Formule des probabilités totales",
        formula: "P(B) = Σ P(Aᵢ)P_Aᵢ(B)",
        conditions:
          "Les événements Aᵢ forment une partition de l’univers et les conditionnements utilisés ont une probabilité non nulle.",
        explanation:
          "On additionne les probabilités de tous les chemins incompatibles qui conduisent à B.",
        mistake:
          "Oublier un cas de la partition ou additionner des chemins qui ne mènent pas tous à B.",
        methodHref: "/methodes-maths-terminale/probabilites-conditionnelles",
        methodLabel: "Méthode : probabilités conditionnelles",
      },
      {
        name: "Indépendance",
        formula: "A et B indépendants ⇔ P(A ∩ B) = P(A)P(B)",
        conditions:
          "L’indépendance doit être donnée, démontrée ou justifiée par le modèle.",
        explanation:
          "Quand P(A) > 0, l’indépendance équivaut aussi à P_A(B) = P(B).",
        mistake:
          "Déduire l’indépendance du seul fait que les événements sont différents ou incompatibles.",
        methodHref: "/methodes-maths-terminale/probabilites-conditionnelles",
        methodLabel: "Méthode : probabilités conditionnelles",
      },
      {
        name: "Loi binomiale",
        formula: "Si X suit B(n, p), alors P(X = k) = C(n,k)pᵏ(1 − p)ⁿ⁻ᵏ",
        conditions:
          "On répète n épreuves de Bernoulli indépendantes, avec n ∈ ℕ et la même probabilité de succès p ; k ∈ {0, …, n}.",
        explanation:
          "Le coefficient binomial compte les positions possibles des k succès.",
        mistake:
          "Utiliser une loi binomiale alors que les essais ne sont pas indépendants ou que p change.",
        methodHref: "/methodes-maths-terminale/probabilites-conditionnelles",
        methodLabel: "Méthode : probabilités conditionnelles",
      },
      {
        name: "Espérance, variance et écart type d’une loi binomiale",
        formula: "E(X) = np ; V(X) = np(1 − p) ; σ(X) = √[np(1 − p)]",
        conditions:
          "X suit la loi binomiale B(n, p).",
        explanation:
          "L’espérance donne le nombre moyen de succès sur un grand nombre de répétitions du schéma.",
        mistake:
          "Confondre variance et écart type : l’écart type est la racine carrée de la variance.",
        methodHref: "/methodes-maths-terminale/probabilites-conditionnelles",
        methodLabel: "Méthode : probabilités conditionnelles",
      },
    ],
  },
  {
    id: "geometrie",
    title: "Géométrie dans l’espace",
    intro:
      "Précise toujours le repère. Les formules de coordonnées et de distances ci-dessous supposent un repère orthonormé lorsqu’il est indiqué.",
    formulas: [
      {
        name: "Coordonnées d’un vecteur et colinéarité",
        formula: "AB⃗ = (x_B − x_A ; y_B − y_A ; z_B − z_A)",
        conditions:
          "Les points sont repérés dans un même repère. Deux vecteurs sont colinéaires si l’un est un multiple de l’autre.",
        explanation:
          "Les coordonnées d’un vecteur se calculent « arrivée moins départ ».",
        mistake:
          "Inverser une seule coordonnée au lieu de conserver le même ordre pour x, y et z.",
        methodHref: "/methodes-maths-terminale/geometrie-espace",
        methodLabel: "Méthode : géométrie dans l’espace",
      },
      {
        name: "Produit scalaire",
        formula: "u⃗ · v⃗ = xx′ + yy′ + zz′",
        conditions:
          "Le repère est orthonormé et u⃗ = (x ; y ; z), v⃗ = (x′ ; y′ ; z′).",
        explanation:
          "Deux vecteurs non nuls sont orthogonaux si et seulement si leur produit scalaire est nul.",
        mistake:
          "Utiliser cette formule de coordonnées dans un repère qui n’est pas orthonormé.",
        methodHref: "/methodes-maths-terminale/geometrie-espace",
        methodLabel: "Méthode : géométrie dans l’espace",
      },
      {
        name: "Représentation paramétrique d’une droite",
        formula: "(x, y, z) = (x_A, y_A, z_A) + t(a, b, c), t ∈ ℝ",
        conditions:
          "La droite passe par A et a pour vecteur directeur non nul (a ; b ; c).",
        explanation:
          "Un point appartient à la droite si une même valeur de t vérifie les trois coordonnées.",
        mistake:
          "Trouver trois valeurs différentes de t et conclure tout de même que le point appartient à la droite.",
        methodHref: "/methodes-maths-terminale/geometrie-espace",
        methodLabel: "Méthode : géométrie dans l’espace",
      },
      {
        name: "Équation cartésienne d’un plan",
        formula: "ax + by + cz + d = 0",
        conditions:
          "Dans un repère orthonormé, le vecteur n⃗ = (a ; b ; c) est non nul et normal au plan.",
        explanation:
          "Pour déterminer d, on remplace x, y et z par les coordonnées d’un point connu du plan.",
        mistake:
          "Confondre un vecteur normal au plan avec un vecteur directeur d’une droite du plan.",
        methodHref: "/methodes-maths-terminale/geometrie-espace",
        methodLabel: "Méthode : géométrie dans l’espace",
      },
      {
        name: "Orthogonalité droite-plan",
        formula: "d ⟂ P ⇔ un vecteur directeur de d est colinéaire à un vecteur normal de P",
        conditions:
          "La droite et le plan sont définis, avec des vecteurs non nuls.",
        explanation:
          "La direction d’une droite perpendiculaire au plan est portée par une normale au plan.",
        mistake:
          "Chercher un produit scalaire nul entre le directeur de la droite et la normale du plan : cela prouverait un parallélisme avec le plan, pas une perpendicularité.",
        methodHref: "/methodes-maths-terminale/geometrie-espace",
        methodLabel: "Méthode : géométrie dans l’espace",
      },
      {
        name: "Distance d’un point à un plan — formule pratique",
        formula: "d(M, P) = |ax_M + by_M + cz_M + d| / √(a² + b² + c²)",
        conditions:
          "Le repère est orthonormé et P a pour équation ax + by + cz + d = 0 avec (a, b, c) ≠ (0, 0, 0).",
        explanation:
          "Cette formule se déduit du projeté orthogonal de M sur le plan. La valeur absolue rend la distance positive et le dénominateur normalise le vecteur normal.",
        mistake:
          "Oublier la valeur absolue ou utiliser les coefficients d’une équation qui ne représente pas le plan.",
        methodHref: "/methodes-maths-terminale/geometrie-espace",
        methodLabel: "Méthode : géométrie dans l’espace",
      },
    ],
  },
];

const faqItems: FaqItem[] = [
  {
    question: "Faut-il apprendre toutes les formules par cœur ?",
    answer:
      "Il faut connaître les formules usuelles, mais surtout savoir vérifier leurs conditions d’utilisation. Une formule mémorisée sans ses hypothèses conduit facilement à une erreur de domaine, de signe ou de modèle.",
  },
  {
    question: "Cette fiche remplace-t-elle le cours ?",
    answer:
      "Non. Elle sert à retrouver rapidement une formule et son principal point de vigilance. Les démonstrations, exemples détaillés et exercices restent nécessaires pour comprendre quand l’utiliser.",
  },
  {
    question: "Comment enregistrer cette fiche en PDF ?",
    answer:
      "Clique sur « Imprimer la fiche », puis choisis l’option d’enregistrement en PDF proposée par ton navigateur. La page ne présente pas ce fichier comme un PDF déjà téléchargeable.",
  },
  {
    question: "Quelle formule choisir dans un exercice ?",
    answer:
      "Commence par nommer le chapitre, relever les données et vérifier les hypothèses. Si plusieurs formules semblent possibles, la question posée et les unités permettent souvent d’écarter les mauvaises pistes.",
  },
];

export default function FormulesBacMathsTerminalePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Méthodes maths Terminale", path: "/methodes-maths-terminale" },
            { name: "Formules Bac Maths Terminale", path: pagePath },
          ]),
        ]}
      />

      <div className={`${styles.printPage} bg-white`}>
        <section className="border-b border-slate-200 bg-gradient-to-b from-blue-50 to-white px-4 py-14 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="mb-4 inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-950">
              Fiche de référence — Terminale spécialité maths
            </p>
            <h1 className="max-w-5xl text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl">
              Formules à connaître pour le Bac Maths Terminale
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
              Retrouve rapidement les formules essentielles, les hypothèses à
              vérifier et les erreurs classiques. Cette fiche aide à mémoriser ;
              les liens de méthode montrent ensuite comment les appliquer.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <PrintButton label="Imprimer la fiche" />
              <p className="text-sm leading-6 text-slate-600 print:hidden">
                Dans la fenêtre d&apos;impression, tu peux aussi choisir « Enregistrer
                au format PDF » si ton navigateur le propose.
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-10">
          <div className="mx-auto max-w-6xl">
            <aside className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 leading-7 text-amber-950">
              <strong>Programme annuel ou épreuve écrite ?</strong> Cette fiche
              couvre les outils du cours de Terminale. Pour la session 2027, le
              périmètre actuel de l’épreuve écrite est plus resserré : les fonctions
              sinus et cosinus, le calcul intégral ainsi que les équations
              différentielles y&apos; = ay et y&apos; = ay + b ne figurent pas parmi
              les contenus évaluables à l’écrit. Ils restent au programme annuel.{" "}
              <a
                href="https://www.education.gouv.fr/bo/22/Hebdo36/MENE2227884N.htm"
                className="font-bold underline underline-offset-4"
              >
                Vérifier le programme officiel de l’épreuve
              </a>
              .
            </aside>
            <nav
              aria-label="Sommaire de la fiche de formules"
              className="rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-6"
            >
              <h2 className="text-2xl font-bold text-slate-950">Sommaire par chapitre</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {formulaChapters.map((chapter) => (
                  <a
                    key={chapter.id}
                    href={`#${chapter.id}`}
                    className="rounded-xl border border-blue-100 bg-white px-4 py-3 font-semibold text-blue-950 hover:border-blue-300"
                  >
                    {chapter.title}
                  </a>
                ))}
              </div>
            </nav>
            <div className="mt-5 rounded-2xl border border-blue-100 bg-white p-5 print:hidden">
              <h2 className="text-xl font-bold text-slate-950">
                Comprendre les équations différentielles
              </h2>
              <p className="mt-2 leading-7 text-slate-700">
                La page dédiée distingue y&apos; = ay, y&apos; = ay + b, solution
                générale et condition initiale avec quatre exercices corrigés.
              </p>
              <Link
                href="/equations-differentielles-terminale"
                className="mt-3 inline-flex font-bold text-blue-900 underline underline-offset-4"
              >
                Voir la méthode complète
              </Link>
            </div>
          </div>
        </section>

        <section className="px-4 pb-12">
          <div className="mx-auto max-w-6xl space-y-14">
            {formulaChapters.map((chapter) => (
              <section key={chapter.id} id={chapter.id} className="scroll-mt-24">
                <div className="max-w-3xl">
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-blue-900">
                    Chapitre
                  </p>
                  <h2 className="mt-2 text-3xl font-bold text-slate-950">
                    {chapter.title}
                  </h2>
                  <p className="mt-3 leading-7 text-slate-700">{chapter.intro}</p>
                </div>

                <div className="mt-7 grid gap-5 lg:grid-cols-2">
                  {chapter.formulas.map((item) => (
                    <article
                      key={item.name}
                      className={`${styles.formulaCard} min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6`}
                    >
                      <h3 className="text-xl font-bold text-slate-950">{item.name}</h3>
                      <div
                        className={`${styles.formula} mt-4 rounded-xl bg-slate-950 px-4 py-3 font-mono text-sm font-bold text-white sm:text-base`}
                      >
                        {item.formula}
                      </div>
                      <dl className="mt-5 space-y-4 text-sm leading-6">
                        <div>
                          <dt className="font-bold text-blue-950">Conditions d’utilisation</dt>
                          <dd className="mt-1 text-slate-700">{item.conditions}</dd>
                        </div>
                        <div>
                          <dt className="font-bold text-slate-950">À quoi elle sert</dt>
                          <dd className="mt-1 text-slate-700">{item.explanation}</dd>
                        </div>
                        <div className="rounded-xl bg-amber-50 p-3">
                          <dt className="font-bold text-amber-950">Erreur fréquente</dt>
                          <dd className="mt-1 text-amber-950">{item.mistake}</dd>
                        </div>
                      </dl>
                      <Link
                        href={item.methodHref}
                        className="mt-5 inline-flex items-center gap-2 font-bold text-blue-900 hover:underline print:hidden"
                      >
                        {item.methodLabel}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            ))}

            <section className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-6 sm:p-8">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-1 h-7 w-7 shrink-0 text-amber-700" aria-hidden="true" />
                <div>
                  <h2 className="text-3xl font-bold text-slate-950">
                    Formules à ne pas utiliser sans vérifier les hypothèses
                  </h2>
                  <ul className="mt-5 space-y-3 leading-7 text-slate-800">
                    <li>
                      <strong>ln(u)</strong> et <strong>u′/u</strong> : vérifier le
                      signe de u et l’intervalle de travail.
                    </li>
                    <li>
                      <strong>Quotient</strong> : vérifier que le dénominateur ne
                      s’annule pas.
                    </li>
                    <li>
                      <strong>Loi binomiale</strong> : vérifier le nombre fixe
                      d’essais, l’indépendance et la probabilité p constante.
                    </li>
                    <li>
                      <strong>Aire par intégrale</strong> : vérifier que la fonction
                      est positive, ou découper l’intervalle selon son signe.
                    </li>
                    <li>
                      <strong>TVI et récurrence</strong> : citer toutes les
                      hypothèses avant la conclusion.
                    </li>
                    <li>
                      <strong>Distance et produit scalaire en coordonnées</strong> :
                      vérifier que le repère est orthonormé.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className={styles.screenOnly}>
              <div className="grid gap-5 md:grid-cols-3">
                {[
                  {
                    icon: BookOpenCheck,
                    title: "Comprendre la méthode",
                    text: "Les fiches méthodes détaillent les étapes et les justifications derrière les formules.",
                    href: "/methodes-maths-terminale",
                    label: "Voir les méthodes Terminale",
                  },
                  {
                    icon: CheckCircle2,
                    title: "S’entraîner par chapitre",
                    text: "Une formule devient utile quand tu sais la reconnaître dans un exercice.",
                    href: "/exercices-maths-terminale",
                    label: "Voir les exercices Terminale",
                  },
                  {
                    icon: AlertTriangle,
                    title: "Soigner la justification",
                    text: "La formule seule ne remplace pas une phrase qui cite les hypothèses et conclut.",
                    href: "/redaction-bac-maths-terminale",
                    label: "Voir le guide de rédaction",
                  },
                ].map((item) => (
                  <article key={item.title} className="rounded-2xl bg-slate-50 p-6">
                    <item.icon className="h-7 w-7 text-blue-800" aria-hidden="true" />
                    <h2 className="mt-4 text-xl font-bold text-slate-950">{item.title}</h2>
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
      </div>
    </SeoPageLayout>
  );
}
