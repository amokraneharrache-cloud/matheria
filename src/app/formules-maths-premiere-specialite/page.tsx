import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CheckCircle2, Code2, TriangleAlert } from "lucide-react";
import {
  ChapterHero,
  ChapterInternalLinks,
} from "@/components/marketing/ChapterSeoPage";
import {
  FrequentMistakesBlock,
  ResourceTable,
  ResourceToc,
} from "@/components/marketing/J41SeoBlocks";
import {
  OfficialSources,
  QuickAnswer,
  StaticFaq,
} from "@/components/marketing/J42SeoBlocks";
import { PrintButton } from "@/components/marketing/PrintButton";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/seo";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import styles from "./formules.module.css";

const pagePath = "/formules-maths-premiere-specialite";
const title = "Formules Maths Première spécialité : fiche complète à imprimer";
const description =
  "Retrouve les formules essentielles de Première spécialité maths : second degré, suites, dérivation, trigonométrie, exponentielle, probabilités, géométrie et produit scalaire.";

const officialProgramUrl =
  "https://www.education.gouv.fr/bo/2026/Hebdo14/MENE2602917A";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: absoluteUrl(pagePath) },
  openGraph: {
    title,
    description,
    url: absoluteUrl(pagePath),
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const faqItems: FaqItem[] = [
  {
    question: "Cette fiche suit-elle le programme de Première 2026-2027 ?",
    answer:
      "Oui. Elle a été construite à partir du programme de Première générale spécialité mathématiques publié au BO du 2 avril 2026 et applicable à la rentrée 2026-2027.",
  },
  {
    question: "Faut-il apprendre toutes les formules par cœur ?",
    answer:
      "Il faut surtout savoir reconnaître leur domaine d’utilisation, vérifier leurs conditions et les appliquer sur des exemples. Une formule isolée ne remplace pas la méthode.",
  },
  {
    question: "Le logarithme est-il au programme de Première spécialité ?",
    answer:
      "Non dans le programme 2026-2027. La fiche traite l’exponentielle sans introduire le logarithme, étudié ensuite en Terminale.",
  },
  {
    question: "Comment imprimer la fiche sans les menus du site ?",
    answer:
      "Le bouton d’impression lance la boîte de dialogue du navigateur. La feuille de style masque les menus et les blocs non nécessaires pour conserver une fiche lisible.",
  },
];

type FormulaItem = {
  title: string;
  formula: ReactNode;
  use: string;
  example: string;
  error: string;
};

function FormulaCard({ item }: { item: FormulaItem }) {
  return (
    <article className={`${styles.formulaCard} rounded-2xl border border-slate-200 bg-white p-5 shadow-sm`}>
      <h3 className="text-lg font-bold text-slate-950">{item.title}</h3>
      <div className={`${styles.formulaDisplay} mt-3 rounded-xl bg-blue-950 px-4 py-3 font-mono text-sm leading-7 text-white sm:text-base`}>
        {item.formula}
      </div>
      <dl className="mt-4 space-y-3 text-sm leading-6">
        <div>
          <dt className="font-bold text-slate-950">Quand l’utiliser ?</dt>
          <dd className="text-slate-700">{item.use}</dd>
        </div>
        <div>
          <dt className="font-bold text-slate-950">Exemple</dt>
          <dd className="text-slate-700">{item.example}</dd>
        </div>
        <div>
          <dt className="font-bold text-red-900">Erreur fréquente</dt>
          <dd className="text-red-900">{item.error}</dd>
        </div>
      </dl>
    </article>
  );
}

function FormulaSection({
  id,
  title: sectionTitle,
  intro,
  items,
  children,
}: {
  id: string;
  title: string;
  intro: string;
  items: FormulaItem[];
  children?: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-3xl font-bold text-slate-950">{sectionTitle}</h2>
      <p className="mt-3 max-w-4xl leading-7 text-slate-700">{intro}</p>
      <div className="mt-7 grid gap-5 md:grid-cols-2">{items.map((item) => <FormulaCard key={item.title} item={item} />)}</div>
      {children}
    </section>
  );
}

const algebraItems: FormulaItem[] = [
  {
    title: "Identités remarquables",
    formula: <><span>(a + b)² = a² + 2ab + b²</span><br /><span>(a − b)² = a² − 2ab + b²</span><br /><span>(a − b)(a + b) = a² − b²</span></>,
    use: "Développer vite, reconnaître un carré ou factoriser une différence de deux carrés.",
    example: "x² − 10x + 25 = (x − 5)².",
    error: "Oublier le terme double 2ab ou changer son signe dans (a − b)².",
  },
  {
    title: "Puissances de même base",
    formula: <><span>Pour a ≠ 0 et m,n ∈ ℤ :</span><br /><span>aᵐ × aⁿ = aᵐ⁺ⁿ ; aᵐ / aⁿ = aᵐ⁻ⁿ</span><br /><span>(aᵐ)ⁿ = aᵐⁿ</span></>,
    use: "Réduire un produit, un quotient ou une puissance de puissance.",
    example: "x⁵/x² = x³ pour x ≠ 0.",
    error: "Additionner les exposants dans une somme : aᵐ + aⁿ ne se réduit pas ainsi.",
  },
  {
    title: "Fractions",
    formula: <><span>a/b + c/d = (ad + bc)/bd, avec b et d non nuls</span><br /><span>(a/b)/(c/d) = ad/bc, avec b, c et d non nuls</span></>,
    use: "Additionner des quotients ou diviser par une fraction, avec des dénominateurs non nuls.",
    example: "2/3 + 1/4 = (8 + 3)/12 = 11/12.",
    error: "Additionner directement les dénominateurs ou oublier qu’on multiplie par l’inverse.",
  },
  {
    title: "Produit nul",
    formula: <span>AB = 0 ⇔ A = 0 ou B = 0</span>,
    use: "Résoudre une équation après factorisation.",
    example: "(2x − 3)(x + 5) = 0 donne x = 3/2 ou x = −5.",
    error: "Utiliser la règle sur une somme au lieu d’un produit.",
  },
  {
    title: "Quotient nul",
    formula: <span>A/B = 0 ⇔ A = 0 et B ≠ 0</span>,
    use: "Résoudre une équation comportant un quotient.",
    example: "(x − 2)/(x + 1) = 0 donne x = 2, valeur autorisée.",
    error: "Annuler le dénominateur : une valeur interdite n’est jamais solution.",
  },
  {
    title: "Signe d’un produit ou quotient",
    formula: <><span>Facteurs non nuls et dénominateur non nul :</span><br /><span>même signe → positif ; signes contraires → négatif</span><br /><span>Si un facteur du produit est nul, le produit est nul.</span></>,
    use: "Construire un tableau de signes facteur par facteur.",
    example: "Sur x &gt; 2, (x − 2)/(x + 1) est positif.",
    error: "Oublier d’exclure les zéros des dénominateurs dans l’ensemble de définition.",
  },
];

const quadraticItems: FormulaItem[] = [
  {
    title: "Forme développée",
    formula: <span>f(x) = ax² + bx + c, avec a ≠ 0</span>,
    use: "Identifier les coefficients a, b, c et calculer le discriminant.",
    example: "Pour 2x² − 3x − 2 : a = 2, b = −3, c = −2.",
    error: "Perdre le signe d’un coefficient lors de son identification.",
  },
  {
    title: "Discriminant",
    formula: <span>Δ = b² − 4ac</span>,
    use: "Connaître le nombre de racines réelles et préparer leur calcul.",
    example: "Pour x² − 4x + 3, Δ = 16 − 12 = 4.",
    error: "Écrire −b² ou oublier les parenthèses lorsque b est négatif.",
  },
  {
    title: "Racines selon Δ",
    formula: <><span>Δ &gt; 0 : x₁ = (−b − √Δ)/(2a), x₂ = (−b + √Δ)/(2a)</span><br /><span>Δ = 0 : x₀ = −b/(2a)</span><br /><span>Δ &lt; 0 : aucune racine réelle</span></>,
    use: "Résoudre ax² + bx + c = 0 dans les réels.",
    example: "x² − 4x + 3 = 0 donne x = 1 ou x = 3.",
    error: "Diviser seulement √Δ par 2a au lieu de tout le numérateur.",
  },
  {
    title: "Forme factorisée",
    formula: <><span>Δ &gt; 0 : f(x) = a(x − x₁)(x − x₂)</span><br /><span>Δ = 0 : f(x) = a(x − x₀)²</span></>,
    use: "Résoudre une équation produit nul ou étudier rapidement le signe.",
    example: "x² − 4x + 3 = (x − 1)(x − 3).",
    error: "Écrire (x + x₁) au lieu de (x − x₁).",
  },
  {
    title: "Somme et produit des racines",
    formula: <span>x₁ + x₂ = −b/a et x₁x₂ = c/a</span>,
    use: "Contrôler des racines ou les détecter mentalement lorsque le trinôme en admet deux.",
    example: "Pour x² − 5x + 6, les racines 2 et 3 ont somme 5 et produit 6.",
    error: "Oublier le signe moins dans la somme des racines.",
  },
  {
    title: "Forme canonique",
    formula: <span>f(x) = a(x − α)² + β, α = −b/(2a), β = f(α)</span>,
    use: "Lire le sommet S(α ; β), l’extrémum et l’axe de symétrie x = α.",
    example: "x² − 6x + 5 = (x − 3)² − 4 : sommet (3 ; −4).",
    error: "Le programme demande surtout de la déterminer dans des cas simples : ne pas développer un calcul général inutilement.",
  },
  {
    title: "Signe d’un trinôme",
    formula: <span>Avec deux racines : signe de a à l’extérieur, signe opposé entre les racines</span>,
    use: "Résoudre une inéquation du second degré après avoir ordonné les racines.",
    example: "Si a &gt; 0, f est négative entre x₁ et x₂ et positive à l’extérieur.",
    error: "Inverser la règle lorsque a est négatif ou inclure les racines dans une inégalité stricte.",
  },
];

const sequenceItems: FormulaItem[] = [
  {
    title: "Suite arithmétique — récurrence",
    formula: <span>uₙ₊₁ = uₙ + r</span>,
    use: "Modéliser une évolution à accroissement constant r.",
    example: "Un stock gagne 15 unités par mois : uₙ₊₁ = uₙ + 15.",
    error: "Confondre accroissement constant et taux constant.",
  },
  {
    title: "Suite arithmétique — terme général",
    formula: <span>uₙ = uₚ + (n − p)r ; en particulier uₙ = u₀ + nr</span>,
    use: "Calculer directement un terme sans produire tous les précédents.",
    example: "u₀ = 4 et r = 3 donnent u₁₀ = 34.",
    error: "Compter n écarts entre u₁ et uₙ : il n’y en a que n − 1.",
  },
  {
    title: "Somme arithmétique",
    formula: <span>somme = nombre de termes × (premier + dernier)/2</span>,
    use: "Additionner des termes consécutifs d’une suite arithmétique.",
    example: "u₀ + … + uₙ = (n + 1)(u₀ + uₙ)/2.",
    error: "Confondre dernier indice et nombre de termes.",
  },
  {
    title: "Somme des entiers",
    formula: <span>1 + 2 + … + n = n(n + 1)/2</span>,
    use: "Calculer une somme arithmétique particulière ou démontrer une formule.",
    example: "1 + … + 10 = 10 × 11/2 = 55.",
    error: "Utiliser n(n − 1)/2, qui correspond à une autre convention de comptage.",
  },
  {
    title: "Suite géométrique — récurrence",
    formula: <span>vₙ₊₁ = qvₙ</span>,
    use: "Modéliser une évolution à taux constant, avec q = 1 + t pour un taux décimal t.",
    example: "Une hausse de 3 % par période donne q = 1,03.",
    error: "Prendre q = 0,03 pour une hausse de 3 %.",
  },
  {
    title: "Suite géométrique — terme général",
    formula: <span>vₙ = vₚqⁿ⁻ᵖ ; en particulier vₙ = v₀qⁿ</span>,
    use: "Calculer directement un terme d’une évolution multiplicative.",
    example: "v₀ = 200 et q = 0,9 donnent v₃ = 200 × 0,9³.",
    error: "Écrire v₀ × n × q au lieu d’une puissance de q.",
  },
  {
    title: "Somme géométrique",
    formula: <><span>1 + q + … + qⁿ = (1 − qⁿ⁺¹)/(1 − q), si q ≠ 1</span><br /><span>v₀ + … + vₙ = v₀(1 − qⁿ⁺¹)/(1 − q)</span></>,
    use: "Additionner des termes géométriques consécutifs.",
    example: "1 + 2 + 4 + 8 = (1 − 2⁴)/(1 − 2) = 15.",
    error: "Mettre n au lieu de n + 1 dans l’exposant : de 0 à n, il y a n + 1 termes.",
  },
  {
    title: "Sens de variation usuel",
    formula: <><span>arithmétique : signe de r</span><br /><span>géométrique positive : q &gt; 1 croissante ; 0 &lt; q &lt; 1 décroissante</span></>,
    use: "Justifier une évolution monotone lorsque les hypothèses de signe sont établies.",
    example: "12 × 0,8ⁿ est positive et strictement décroissante.",
    error: "Appliquer cette règle sans vérifier le signe du premier terme ou lorsque q est négatif.",
  },
];

const derivativeItems: FormulaItem[] = [
  {
    title: "Taux de variation",
    formula: <span>[f(b) − f(a)]/(b − a), avec a ≠ b</span>,
    use: "Calculer la pente d’une sécante ou une variation moyenne.",
    example: "Pour f(x)=x² entre 1 et 3 : (9−1)/(3−1)=4.",
    error: "Inverser un seul des deux écarts au numérateur ou au dénominateur.",
  },
  {
    title: "Équation de la tangente",
    formula: <span>Si f est dérivable en a : y = f(a) + f′(a)(x − a)</span>,
    use: "Écrire la droite tangente à la courbe de f au point d’abscisse a.",
    example: "Pour f(x)=x² en a=2 : y=4+4(x−2)=4x−4.",
    error: "Utiliser f(a) comme pente au lieu de f′(a).",
  },
  {
    title: "Approximation linéaire",
    formula: <span>Si f est dérivable en a : f(a + h) ≈ f(a) + f′(a)h lorsque h est proche de 0</span>,
    use: "Estimer localement une valeur à partir de la tangente.",
    example: "√4,04 ≈ 2 + (1/4)×0,04 = 2,01.",
    error: "Employer l’approximation pour une variation h trop grande sans contrôler la précision.",
  },
  {
    title: "Dérivées des puissances",
    formula: <><span>(xⁿ)′ = nxⁿ⁻¹</span><br /><span>(x²)′=2x ; (x³)′=3x² ; (k)′=0</span></>,
    use: "Dériver polynômes et puissances entières sur leur domaine.",
    example: "(3x³ − 2x + 1)′ = 9x² − 2.",
    error: "Conserver l’exposant n au lieu de le diminuer de 1.",
  },
  {
    title: "Inverse et racine carrée",
    formula: <><span>(1/x)′ = −1/x², x ≠ 0</span><br /><span>(√x)′ = 1/(2√x), x &gt; 0</span></>,
    use: "Dériver les fonctions usuelles inverse et racine sur leur domaine de dérivabilité.",
    example: "Pour f(x)=√x, f′(4)=1/4.",
    error: "Dire que √x est dérivable en 0 : sa dérivée n’y existe pas.",
  },
  {
    title: "Somme et multiple",
    formula: <span>(u + v)′ = u′ + v′ ; (ku)′ = ku′</span>,
    use: "Dériver terme à terme une somme de fonctions.",
    example: "(2x³ + x²)′ = 6x² + 2x.",
    error: "Multiplier les dérivées dans une somme.",
  },
  {
    title: "Produit",
    formula: <span>(uv)′ = u′v + uv′</span>,
    use: "Dériver le produit de deux fonctions dérivables.",
    example: "[x²eˣ]′ = 2xeˣ + x²eˣ.",
    error: "Écrire seulement u′v′.",
  },
  {
    title: "Inverse d’une fonction",
    formula: <span>(1/u)′ = −u′/u², lorsque u ≠ 0</span>,
    use: "Dériver l’inverse d’une fonction dérivable qui ne s’annule pas.",
    example: "[1/(2x+1)]′ = −2/(2x+1)².",
    error: "Oublier u′ au numérateur ou le signe moins.",
  },
  {
    title: "Quotient",
    formula: <span>(u/v)′ = (u′v − uv′)/v², lorsque v ≠ 0</span>,
    use: "Dériver un quotient de fonctions dérivables.",
    example: "[(x+1)/x]′ = [x−(x+1)]/x² = −1/x².",
    error: "Inverser l’ordre du numérateur ou oublier le carré de v.",
  },
  {
    title: "Dérivée et variations",
    formula: <span>Sur un intervalle I où f est dérivable : f′ ≥ 0 ⇒ f croissante ; f′ ≤ 0 ⇒ f décroissante</span>,
    use: "Construire un tableau de variations et trouver des extrémums.",
    example: "Si f′ change de − à + en a, f admet un minimum en a.",
    error: "Étudier le signe de f au lieu de celui de f′.",
  },
];

const exponentialItems: FormulaItem[] = [
  {
    title: "Définition et valeur en 0",
    formula: <span>(eˣ)′ = eˣ et e⁰ = 1</span>,
    use: "Reconnaître la fonction exponentielle définie par f′ = f et f(0)=1.",
    example: "La pente de la courbe de eˣ en 0 vaut 1.",
    error: "Confondre eˣ avec un polynôme xᵉ.",
  },
  {
    title: "Somme des exposants",
    formula: <span>eˣ⁺ʸ = eˣeʸ</span>,
    use: "Décomposer ou regrouper un produit d’exponentielles.",
    example: "eˣ⁺² = eˣe².",
    error: "Écrire eˣ⁺ʸ = eˣ + eʸ.",
  },
  {
    title: "Opposé et quotient",
    formula: <><span>e⁻ˣ = 1/eˣ</span><br /><span>eˣ/eʸ = eˣ⁻ʸ</span></>,
    use: "Simplifier un quotient ou une décroissance exponentielle.",
    example: "e²/e⁵ = e⁻³ = 1/e³.",
    error: "Soustraire les valeurs eˣ et eʸ au lieu des exposants.",
  },
  {
    title: "Dérivée de eᵃᵗ",
    formula: <span>[eᵃᵗ]′ = aeᵃᵗ</span>,
    use: "Étudier une croissance si a &gt; 0 ou une décroissance si a &lt; 0.",
    example: "[e⁻²ᵗ]′ = −2e⁻²ᵗ.",
    error: "Oublier le coefficient a.",
  },
  {
    title: "Signe et comparaison",
    formula: <span>eˣ &gt; 0 ; eᵘ = eᵛ ⇔ u = v ; u &lt; v ⇔ eᵘ &lt; eᵛ</span>,
    use: "Étudier un signe, comparer ou résoudre une égalité d’exponentielles.",
    example: "e²ˣ = e⁶ donne 2x = 6, donc x = 3.",
    error: "Introduire un logarithme inutilement dans une égalité de cette forme.",
  },
];

const trigItems: FormulaItem[] = [
  {
    title: "Degrés et radians",
    formula: <span>180° = π rad ; angle en rad = angle en degrés × π/180</span>,
    use: "Convertir une mesure avant de la placer sur le cercle trigonométrique.",
    example: "60° = 60π/180 = π/3.",
    error: "Écrire 180 rad = π°.",
  },
  {
    title: "Coordonnées sur le cercle",
    formula: <span>M(x) = (cos x ; sin x)</span>,
    use: "Lire cosinus comme abscisse et sinus comme ordonnée du point image.",
    example: "Pour x=π/2, M=(0 ; 1).",
    error: "Inverser sinus et cosinus.",
  },
  {
    title: "Identité fondamentale",
    formula: <span>cos²x + sin²x = 1</span>,
    use: "Calculer l’une des valeurs lorsque l’autre et le quadrant sont connus.",
    example: "Si cos x=3/5 et sin x&gt;0, alors sin x=4/5.",
    error: "Oublier que l’extraction d’une racine donne d’abord deux signes possibles.",
  },
  {
    title: "Périodicité",
    formula: <span>cos(x + 2kπ)=cos x ; sin(x + 2kπ)=sin x, k entier</span>,
    use: "Ramener un angle à une image connue du cercle.",
    example: "−π/3 et 5π/3 ont la même image.",
    error: "Ajouter π au lieu d’un tour complet 2π.",
  },
  {
    title: "Angle opposé",
    formula: <span>cos(−x)=cos x ; sin(−x)=−sin x</span>,
    use: "Déduire les coordonnées par symétrie par rapport à l’axe des abscisses.",
    example: "sin(−π/6)=−1/2.",
    error: "Changer aussi le signe du cosinus.",
  },
  {
    title: "Angles associés à π",
    formula: <><span>cos(π−x)=−cos x ; sin(π−x)=sin x</span><br /><span>cos(π+x)=−cos x ; sin(π+x)=−sin x</span></>,
    use: "Lire les signes par quadrant à partir d’un angle remarquable.",
    example: "cos(5π/6)=−cos(π/6)=−√3/2.",
    error: "Retenir les signes sans visualiser le quadrant.",
  },
  {
    title: "Valeurs remarquables",
    formula: <><span>x : 0 | π/6 | π/4 | π/3 | π/2</span><br /><span>cos x : 1 | √3/2 | √2/2 | 1/2 | 0</span><br /><span>sin x : 0 | 1/2 | √2/2 | √3/2 | 1</span></>,
    use: "Placer les angles remarquables et retrouver les autres valeurs par symétrie.",
    example: "sin(π/3)=√3/2.",
    error: "Intervertir les lignes de π/6 et π/3.",
  },
];

const geometryItems: FormulaItem[] = [
  {
    title: "Coordonnées d’un vecteur",
    formula: <span>AB⃗ = (xB − xA ; yB − yA)</span>,
    use: "Passer de deux points aux coordonnées du vecteur qui les relie.",
    example: "A(1;2), B(4;−1) donnent AB⃗=(3;−3).",
    error: "Soustraire les coordonnées dans des ordres différents.",
  },
  {
    title: "Norme et distance",
    formula: <span>‖u⃗‖ = √(x² + y²) ; AB = √[(xB−xA)²+(yB−yA)²]</span>,
    use: "Calculer une longueur dans un repère orthonormé.",
    example: "La norme de (3;4) vaut 5.",
    error: "Oublier les carrés ou utiliser la formule dans un repère non orthonormé.",
  },
  {
    title: "Produit scalaire par coordonnées",
    formula: <span>u⃗·v⃗ = xx′ + yy′</span>,
    use: "Calculer rapidement un produit scalaire en base orthonormée.",
    example: "(2;3)·(3;−2)=6−6=0.",
    error: "Croiser les coordonnées x avec y′.",
  },
  {
    title: "Produit scalaire et angle",
    formula: <span>Pour u⃗ et v⃗ non nuls : u⃗·v⃗ = ‖u⃗‖ ‖v⃗‖ cos θ</span>,
    use: "Calculer un angle, une longueur ou une projection orthogonale.",
    example: "Si u⃗·v⃗=0 et les vecteurs sont non nuls, θ=π/2.",
    error: "Oublier les normes au dénominateur pour isoler cos θ.",
  },
  {
    title: "Orthogonalité",
    formula: <span>u⃗ ⟂ v⃗ ⇔ u⃗·v⃗ = 0</span>,
    use: "Démontrer qu’un angle est droit ou que deux directions sont perpendiculaires.",
    example: "AB⃗·AC⃗=0 prouve que le triangle ABC est rectangle en A.",
    error: "Conclure à la colinéarité lorsque le produit scalaire est nul.",
  },
  {
    title: "Identités de normes",
    formula: <><span>‖u⃗+v⃗‖²=‖u⃗‖²+2u⃗·v⃗+‖v⃗‖²</span><br /><span>‖u⃗−v⃗‖²=‖u⃗‖²−2u⃗·v⃗+‖v⃗‖²</span></>,
    use: "Transformer une expression métrique ou retrouver un produit scalaire.",
    example: "2u⃗·v⃗=‖u⃗+v⃗‖²−‖u⃗‖²−‖v⃗‖².",
    error: "Oublier le facteur 2 devant le produit scalaire.",
  },
  {
    title: "Formule d’Al-Kashi",
    formula: <span>a² = b² + c² − 2bc cos A</span>,
    use: "Calculer un côté ou un angle dans un triangle quelconque.",
    example: "Pour A=π/2, on retrouve a²=b²+c².",
    error: "Associer l’angle A à un autre côté que le côté opposé a.",
  },
  {
    title: "Droite et vecteur normal",
    formula: <span>Si (a;b) ≠ (0;0), ax + by + c = 0 a pour vecteur normal n⃗=(a;b)</span>,
    use: "Écrire une équation de droite passant par un point et perpendiculaire à une direction.",
    example: "Normale (2;−3) et point A donnent 2(x−xA)−3(y−yA)=0.",
    error: "Confondre le vecteur normal (a;b) et le vecteur directeur (−b;a).",
  },
  {
    title: "Équation d’un cercle",
    formula: <span>centre Ω(a;b), rayon R : (x−a)²+(y−b)²=R²</span>,
    use: "Tester l’appartenance d’un point ou reconnaître centre et rayon.",
    example: "(x−2)²+(y+3)²=25 a pour centre (2;−3) et rayon 5.",
    error: "Lire b=3 dans (y+3)² : le centre a pour ordonnée −3.",
  },
];

const probabilityItems: FormulaItem[] = [
  {
    title: "Probabilité conditionnelle",
    formula: <span>P(B|A) = P(A∩B)/P(A), si P(A) &gt; 0</span>,
    use: "Calculer la probabilité de B lorsque l’on sait que A est réalisé.",
    example: "P(A∩B)=0,18 et P(A)=0,3 donnent P(B|A)=0,6.",
    error: "Diviser par P(B) alors que l’évènement conditionnant est A.",
  },
  {
    title: "Intersection sur un arbre",
    formula: <span>P(A∩B) = P(A) × P(B|A)</span>,
    use: "Calculer la probabilité d’un chemin d’un arbre pondéré.",
    example: "0,4 puis 0,15 donnent 0,4×0,15=0,06.",
    error: "Additionner les probabilités le long d’une branche.",
  },
  {
    title: "Probabilités totales",
    formula: <span>P(B)=P(A)P(B|A)+P(Ā)P(B|Ā)</span>,
    use: "Additionner les chemins incompatibles qui conduisent tous à B.",
    example: "Avec 0,4; 0,15; 0,05 : P(B)=0,4×0,15+0,6×0,05=0,09.",
    error: "Oublier une branche de la partition ou additionner des probabilités conditionnelles seules.",
  },
  {
    title: "Indépendance",
    formula: <span>A et B indépendants ⇔ P(A∩B)=P(A)P(B)</span>,
    use: "Vérifier ou exploiter l’indépendance de deux évènements.",
    example: "0,5×0,2=0,1 : si P(A∩B)=0,1, ils sont indépendants.",
    error: "Confondre indépendance et incompatibilité.",
  },
  {
    title: "Répétitions de Bernoulli",
    formula: <span>un chemin avec k succès sur n essais vaut pᵏ(1−p)ⁿ⁻ᵏ</span>,
    use: "Calculer, avec un arbre pour n ≤ 4 au programme, la probabilité de chemins répétés indépendants.",
    example: "S-E-E avec p=1/4 vaut (1/4)(3/4)².",
    error: "Oublier de compter tous les chemins correspondant au même nombre de succès.",
  },
  {
    title: "Loi et espérance",
    formula: <span>Σpᵢ=1 ; E(X)=Σxᵢpᵢ</span>,
    use: "Vérifier une loi finie et calculer la valeur moyenne théorique.",
    example: "X vaut −1 avec 0,4 et 2 avec 0,6 : E(X)=0,8.",
    error: "Faire une moyenne non pondérée des valeurs.",
  },
  {
    title: "Linéarité de l’espérance",
    formula: <span>E(aX+b)=aE(X)+b</span>,
    use: "Transformer une variable aléatoire sans reconstruire toute sa loi.",
    example: "Si E(X)=3, alors E(2X−1)=5.",
    error: "Écrire E(aX+b)=aE(X) et oublier le terme constant b.",
  },
  {
    title: "Variance et écart type",
    formula: <><span>V(X)=Σ(xᵢ−E(X))²pᵢ = E(X²)−E(X)²</span><br /><span>σ(X)=√V(X)</span></>,
    use: "Mesurer la dispersion d’une variable aléatoire autour de son espérance.",
    example: "Pour X=0 ou 2 équiprobables : E(X)=1, V(X)=2−1=1, σ=1.",
    error: "Calculer E(X²)−E(X) ou prendre une variance négative sans détecter l’erreur.",
  },
];

const decisionRows = [
  { key: "roots", cells: ["Expression développée ax²+bx+c", "Racines", "Calculer Δ, puis utiliser les formules ; tester d’abord une factorisation évidente."] },
  { key: "sign", cells: ["Forme factorisée", "Signe", "Ordonner les racines puis appliquer la règle liée au signe de a."] },
  { key: "extremum", cells: ["Forme canonique", "Sommet ou extrémum", "Lire α et β dans a(x−α)²+β."] },
  { key: "variation", cells: ["Fonction dérivable", "Variations", "Calculer f′, étudier son signe, puis dresser le tableau."] },
  { key: "discrete", cells: ["Accroissement constant", "Valeur après n étapes", "Modéliser par une suite arithmétique."] },
  { key: "rate", cells: ["Taux constant", "Valeur après n étapes", "Modéliser par une suite géométrique avec q=1+t."] },
  { key: "right", cells: ["Coordonnées de trois points", "Angle droit", "Former deux vecteurs issus du même sommet et calculer leur produit scalaire."] },
  { key: "total", cells: ["Arbre avec une partition", "Probabilité d’un évènement final", "Multiplier sur chaque chemin, puis additionner les chemins compatibles avec l’évènement."] },
];

export default function FormulesMathsPremiereSpecialitePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Programme maths Première", path: "/programme-maths-premiere" },
            { name: "Formules Première spécialité", path: pagePath },
          ]),
          faqJsonLd(faqItems),
        ]}
      />

      <div className={styles.screenOnly}>
        <ChapterHero
          eyebrow="Fiche Première · programme 2026-2027 · impression propre"
          title="Formules à connaître en Première spécialité maths"
          description="Une fiche construite pour la Première : chaque formule est reliée à son usage, à un exemple et à l’erreur qui fait perdre le plus souvent le fil du raisonnement."
          secondaryDescription="Le périmètre suit le programme officiel publié au BO du 2 avril 2026. Le logarithme et les formules trigonométriques d’addition, non exigés en Première, ne sont pas ajoutés."
          ctas={[]}
        />
        <ResourceToc
          label="Sommaire de la fiche de formules de Première"
          items={[
            { href: "#algebre", label: "Calcul algébrique" },
            { href: "#second-degre", label: "Second degré" },
            { href: "#suites", label: "Suites" },
            { href: "#derivation", label: "Dérivation" },
            { href: "#exponentielle", label: "Exponentielle" },
            { href: "#trigonometrie", label: "Trigonométrie" },
            { href: "#geometrie", label: "Géométrie" },
            { href: "#probabilites", label: "Probabilités" },
            { href: "#python", label: "Python" },
            { href: "#choisir", label: "Quelle formule ?" },
          ]}
        />
      </div>

      <div className={`${styles.printHeader} px-4`}>
        <p>SprintMaths · Programme 2026-2027</p>
        <h1>Formules à connaître en Première spécialité maths</h1>
      </div>

      <section className="px-4 py-14 print:py-0">
        <div className="mx-auto max-w-6xl space-y-16 print:space-y-8">
          <div className={styles.screenOnly}>
            <QuickAnswer title="Une formule utile est une formule choisie et justifiée" tone="blue">
              <p>
                Avant de calculer, nomme les données, vérifie les conditions et
                annonce l’outil choisi. La fiche sert à retrouver un réflexe ; le
                quiz et les exercices servent ensuite à l’utiliser.
              </p>
              <div className="mt-5">
                <PrintButton label="Imprimer la fiche complète" />
              </div>
            </QuickAnswer>
          </div>

          <FormulaSection id="algebre" title="1. Calcul algébrique" intro="Ces identités et règles soutiennent tous les chapitres. Les conditions de définition font partie de la formule." items={algebraItems} />

          <FormulaSection id="second-degre" title="2. Second degré" intro="Le choix entre forme développée, canonique et factorisée dépend de ce que l’on cherche : coefficients, sommet, racines ou signe." items={quadraticItems}>
            <div className="mt-7">
              <ResourceTable
                caption="Second degré — choisir la bonne forme"
                headers={["Ce que je connais", "Ce que je cherche", "Outil efficace"]}
                rows={[
                  { key: "developed-roots", cells: ["ax²+bx+c", "Les racines", "Δ=b²−4ac, puis les formules de racines"] },
                  { key: "canonical-extremum", cells: ["a(x−α)²+β", "Le sommet ou l’extrémum", "Lire S(α;β) et le signe de a"] },
                  { key: "factor-sign", cells: ["a(x−x₁)(x−x₂)", "Le signe", "Ordonner x₁, x₂ puis appliquer la règle du signe de a"] },
                  { key: "two-roots", cells: ["Deux racines x₁ et x₂ et le coefficient a", "L’expression", "Écrire a(x−x₁)(x−x₂)"] },
                ]}
                prominent
              />
            </div>
          </FormulaSection>

          <FormulaSection id="suites" title="3. Suites numériques" intro="Une suite décrit une évolution discrète. Commence par distinguer accroissement constant, taux constant, formule explicite et relation de récurrence." items={sequenceItems} />
          <FormulaSection id="derivation" title="4. Dérivation et variations" intro="La dérivée relie un comportement local — pente de tangente — à un comportement global — sens de variation et optimisation." items={derivativeItems} />
          <FormulaSection id="exponentielle" title="5. Fonction exponentielle" intro="En Première, on utilise les propriétés algébriques de eˣ, son signe, sa croissance et la dérivée de t ↦ eᵃᵗ, sans logarithme." items={exponentialItems} />
          <FormulaSection id="trigonometrie" title="6. Trigonométrie" intro="Le cercle trigonométrique suffit pour placer un réel, lire sinus et cosinus et retrouver les valeurs associées aux angles remarquables." items={trigItems} />
          <FormulaSection id="geometrie" title="7. Produit scalaire et géométrie repérée" intro="Dans un repère orthonormé, coordonnées, normes et produit scalaire transforment une configuration en calcul contrôlable." items={geometryItems} />
          <FormulaSection id="probabilites" title="8. Probabilités et variables aléatoires" intro="Distingue toujours intersection, conditionnement et indépendance. Pour une variable aléatoire, la loi doit d’abord être complète avant tout calcul." items={probabilityItems} />

          <section id="python" className="scroll-mt-24">
            <Code2 className="h-8 w-8 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">9. Mémo Python</h2>
            <p className="mt-3 max-w-4xl leading-7 text-slate-700">
              Le programme demande de générer, manipuler et parcourir des listes,
              de calculer des termes ou des seuils et de simuler des variables
              aléatoires. Les bornes de <code>range</code> et l’indentation sont essentielles.
            </p>
            <div className="mt-7 grid gap-5 lg:grid-cols-2">
              {[
                ["Liste en compréhension", "carres = [n*n for n in range(1, 6)]\n# [1, 4, 9, 16, 25]", "range(1, 6) s’arrête avant 6."],
                ["Termes d’une suite", "u = 5\nfor n in range(8):\n    u = u + 3\nprint(u)  # u_8", "La boucle effectue ici huit mises à jour depuis u₀."],
                ["Recherche d’un seuil", "n = 0\nu = 100\nwhile u < 200:\n    u = 1.1*u\n    n = n + 1", "À la sortie, n est le premier rang testé pour lequel u ≥ 200."],
                ["Espérance d’une loi", "def esperance(valeurs, probas):\n    total = 0\n    for i in range(len(valeurs)):\n        total += valeurs[i]*probas[i]\n    return total", "Les deux listes doivent avoir la même longueur et les probabilités une somme égale à 1."],
              ].map(([heading, code, note]) => (
                <article key={heading} className={`${styles.formulaCard} rounded-2xl border border-slate-200 bg-white p-5 shadow-sm`}>
                  <h3 className="text-lg font-bold text-slate-950">{heading}</h3>
                  <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm leading-6 text-slate-50"><code>{code}</code></pre>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{note}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="choisir" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-slate-950">Quelle formule utiliser ?</h2>
            <p className="mt-3 max-w-4xl leading-7 text-slate-700">
              Pars de la structure des données et de la question posée. Ce tableau
              ne remplace pas la justification, mais évite de tester des formules au hasard.
            </p>
            <div className="mt-7">
              <ResourceTable caption="Reconnaître la situation avant de calculer" headers={["Je connais", "Je cherche", "Outil"]} rows={decisionRows} prominent />
            </div>
          </section>

          <section className={`${styles.formulaCard} rounded-2xl border-2 border-blue-200 bg-blue-50 p-6 sm:p-8`}>
            <CheckCircle2 className="h-7 w-7 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">Checklist avant d’appliquer une formule</h2>
            <ul className="mt-6 grid gap-3 md:grid-cols-2">
              {[
                "J’ai identifié le chapitre et ce que la question demande.",
                "J’ai nommé les coefficients, points, évènements ou indices.",
                "J’ai vérifié les conditions : dénominateur non nul, domaine, signe ou indépendance.",
                "J’ai choisi une forme adaptée avant de développer.",
                "Je conserve une valeur exacte tant que possible.",
                "Je conclus avec une phrase liée au contexte et je contrôle le signe ou l’ordre de grandeur.",
              ].map((item) => (
                <li key={item} className="flex gap-3 rounded-xl bg-white p-4 leading-7 text-slate-800">
                  <span aria-hidden="true" className="text-blue-900">□</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <div className={styles.screenOnly}>
            <FrequentMistakesBlock
              items={[
                "Appliquer une formule sans identifier les coefficients avec leur signe.",
                "Confondre le nombre de termes d’une suite avec le dernier indice.",
                "Oublier les conditions de définition d’un quotient ou d’une racine.",
                "Utiliser f au lieu de f′ pour étudier des variations.",
                "Intervertir probabilité conditionnelle, intersection et indépendance.",
                "Lire le centre (a;b) avec les mauvais signes dans l’équation d’un cercle.",
              ]}
            />
          </div>

          <div className={styles.screenOnly}>
            <ChapterInternalLinks
              title="Mettre la fiche en pratique"
              variant="cards"
              links={[
                { href: "/quiz-maths-premiere-specialite", label: "Faire le quiz de 30 questions" },
                { href: "/exercices-epreuve-anticipee-maths-premiere", label: "Résoudre les exercices corrigés" },
                { href: "/automatismes-maths-premiere", label: "Travailler les automatismes" },
                { href: "/sujets-zero-maths-premiere", label: "Voir les sujets zéro officiels" },
                { href: "/programme-maths-premiere", label: "Relire le programme Première" },
                { href: "/epreuve-anticipee-maths-premiere", label: "Comprendre l’épreuve anticipée" },
              ]}
            />
          </div>

          <div className={styles.screenOnly}><StaticFaq items={faqItems} /></div>
          <div className={styles.screenOnly}>
            <OfficialSources
              sources={[
                {
                  href: officialProgramUrl,
                  label: "BO du 2 avril 2026 — programme de Première spécialité mathématiques",
                  description: "Programme applicable à la rentrée 2026-2027, utilisé pour délimiter cette fiche.",
                },
              ]}
            />
          </div>

          <p className={`${styles.screenOnly} flex items-start gap-3 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-950`}>
            <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            La fiche est un support de révision SprintMaths. Elle ne constitue ni
            un formulaire officiel fourni lors de l’épreuve ni une liste de questions annoncées.
          </p>
        </div>
      </section>
    </SeoPageLayout>
  );
}
