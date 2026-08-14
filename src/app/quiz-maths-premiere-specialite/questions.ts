export type QuizChapter =
  | "second-degre"
  | "suites"
  | "derivation"
  | "exponentielle"
  | "trigonometrie"
  | "geometrie"
  | "probabilites"
  | "variables-aleatoires"
  | "algorithmique";

export type PremiereQuizQuestion = {
  id: string;
  chapter: QuizChapter;
  competency: string;
  prompt: string;
  options: readonly string[];
  correctIndex: number;
  explanation: string;
  trap: string;
  resourceHref: string;
  resourceLabel: string;
};

export const quizChapterLabels: Record<QuizChapter, string> = {
  "second-degre": "Second degré",
  suites: "Suites",
  derivation: "Dérivation",
  exponentielle: "Exponentielle",
  trigonometrie: "Trigonométrie",
  geometrie: "Géométrie",
  probabilites: "Probabilités",
  "variables-aleatoires": "Variables aléatoires",
  algorithmique: "Algorithmique et Python",
};

export const quizChapterOrder: QuizChapter[] = [
  "second-degre",
  "suites",
  "derivation",
  "exponentielle",
  "trigonometrie",
  "geometrie",
  "probabilites",
  "variables-aleatoires",
  "algorithmique",
];

const formulasPath = "/formules-maths-premiere-specialite";

export const premiereQuizQuestions: PremiereQuizQuestion[] = [
  {
    id: "q01-discriminant",
    chapter: "second-degre",
    competency: "Calculer un discriminant",
    prompt: "Quel est le discriminant de 2x² − 3x − 2 ?",
    options: ["−7", "9", "25", "17"],
    correctIndex: 2,
    explanation:
      "Ici a = 2, b = −3 et c = −2. Donc Δ = b² − 4ac = (−3)² − 4 × 2 × (−2) = 9 + 16 = 25.",
    trap: "Dans −4ac, le coefficient c est négatif : le produit soustrait est donc lui-même négatif.",
    resourceHref: `${formulasPath}#second-degre`,
    resourceLabel: "Revoir le second degré",
  },
  {
    id: "q02-racines",
    chapter: "second-degre",
    competency: "Résoudre une équation du second degré",
    prompt: "Quelles sont les solutions de x² + 4x + 3 = 0 ?",
    options: ["1 et 3", "−1 et −3", "−2 et 2", "Aucune solution réelle"],
    correctIndex: 1,
    explanation:
      "x² + 4x + 3 = (x + 1)(x + 3). Un produit est nul si l’un de ses facteurs est nul : x = −1 ou x = −3.",
    trap: "Les nombres cherchés ont pour somme −4 et pour produit 3, pas pour somme 4.",
    resourceHref: `${formulasPath}#second-degre`,
    resourceLabel: "Revoir racines et factorisation",
  },
  {
    id: "q03-forme-canonique",
    chapter: "second-degre",
    competency: "Reconnaître une forme canonique",
    prompt: "Quelle est la forme canonique de x² − 6x + 5 ?",
    options: ["(x − 3)² − 4", "(x − 3)² + 5", "(x + 3)² − 4", "(x − 6)² − 31"],
    correctIndex: 0,
    explanation:
      "x² − 6x = (x − 3)² − 9. Ainsi x² − 6x + 5 = (x − 3)² − 4.",
    trap: "Après avoir complété le carré, il faut compenser le +9 créé dans (x − 3)².",
    resourceHref: `${formulasPath}#second-degre`,
    resourceLabel: "Revoir la forme canonique",
  },
  {
    id: "q04-signe-trinome",
    chapter: "second-degre",
    competency: "Étudier le signe d’un trinôme factorisé",
    prompt: "Sur quel intervalle −2(x − 1)(x + 3) est-il strictement positif ?",
    options: ["]−∞ ; −3[", "]−3 ; 1[", "]1 ; +∞[", "]−∞ ; −3[ ∪ ]1 ; +∞["],
    correctIndex: 1,
    explanation:
      "Les racines sont −3 et 1. Le coefficient de x² est négatif, donc le trinôme est positif entre ses deux racines et négatif à l’extérieur.",
    trap: "La règle « positif à l’extérieur » ne vaut que lorsque le coefficient dominant est positif.",
    resourceHref: `${formulasPath}#second-degre`,
    resourceLabel: "Revoir le signe d’un trinôme",
  },
  {
    id: "q05-suite-arithmetique",
    chapter: "suites",
    competency: "Calculer un terme d’une suite arithmétique",
    prompt: "Une suite arithmétique vérifie u₀ = 7 et a pour raison 3. Combien vaut u₈ ?",
    options: ["24", "28", "31", "35"],
    correctIndex: 2,
    explanation:
      "Avec un indice initial 0, uₙ = u₀ + nr. Donc u₈ = 7 + 8 × 3 = 31.",
    trap: "De u₀ à u₈, on effectue huit ajouts de la raison, et non sept.",
    resourceHref: `${formulasPath}#suites`,
    resourceLabel: "Revoir les suites arithmétiques",
  },
  {
    id: "q06-somme-arithmetique",
    chapter: "suites",
    competency: "Calculer une somme de termes consécutifs",
    prompt: "Pour uₙ = 2n + 1, combien vaut u₁ + u₂ + … + u₁₀ ?",
    options: ["100", "110", "120", "121"],
    correctIndex: 2,
    explanation:
      "Les dix termes vont de u₁ = 3 à u₁₀ = 21. Leur somme vaut nombre de termes × (premier + dernier)/2, soit 10 × 24/2 = 120.",
    trap: "Il y a dix termes de l’indice 1 à l’indice 10 inclus.",
    resourceHref: `${formulasPath}#suites`,
    resourceLabel: "Revoir les sommes de suites",
  },
  {
    id: "q07-suite-geometrique",
    chapter: "suites",
    competency: "Calculer un terme d’une suite géométrique",
    prompt: "Une suite géométrique vérifie v₀ = 5 et a pour raison 2. Combien vaut v₆ ?",
    options: ["60", "160", "320", "640"],
    correctIndex: 2,
    explanation:
      "vₙ = v₀qⁿ. Ainsi v₆ = 5 × 2⁶ = 5 × 64 = 320.",
    trap: "Une suite géométrique multiplie par la raison ; elle n’ajoute pas 2 à chaque étape.",
    resourceHref: `${formulasPath}#suites`,
    resourceLabel: "Revoir les suites géométriques",
  },
  {
    id: "q08-variation-suite",
    chapter: "suites",
    competency: "Déterminer le sens de variation d’une suite géométrique",
    prompt: "Quel est le sens de variation de wₙ = 12 × 0,8ⁿ ?",
    options: ["Strictement croissante", "Strictement décroissante", "Constante", "Alternée"],
    correctIndex: 1,
    explanation:
      "Les termes sont positifs et chaque terme est obtenu en multipliant le précédent par 0,8, nombre compris entre 0 et 1. La suite est donc strictement décroissante.",
    trap: "Une raison positive inférieure à 1 produit une décroissance, même si tous les termes restent positifs.",
    resourceHref: `${formulasPath}#suites`,
    resourceLabel: "Revoir les variations de suites",
  },
  {
    id: "q09-derivee-polynome",
    chapter: "derivation",
    competency: "Dériver un polynôme",
    prompt: "Si f(x) = x³ − 2x + 5, quelle est f′(x) ?",
    options: ["3x² − 2", "x² − 2", "3x² − 2x", "3x³ − 2"],
    correctIndex: 0,
    explanation:
      "La dérivée de x³ est 3x², celle de −2x est −2 et celle de la constante 5 est 0. Donc f′(x) = 3x² − 2.",
    trap: "Une constante disparaît à la dérivation ; un terme ax donne la constante a.",
    resourceHref: `${formulasPath}#derivation`,
    resourceLabel: "Revoir les dérivées usuelles",
  },
  {
    id: "q10-derivee-quotient",
    chapter: "derivation",
    competency: "Dériver un quotient",
    prompt: "Pour x ≠ 1, quelle est la dérivée de f(x) = (2x + 1)/(x − 1) ?",
    options: ["3/(x − 1)²", "−3/(x − 1)²", "2/(x − 1)", "−1/(x − 1)²"],
    correctIndex: 1,
    explanation:
      "Avec u = 2x + 1 et v = x − 1, (u/v)′ = (u′v − uv′)/v². Le numérateur vaut 2(x − 1) − (2x + 1) = −3.",
    trap: "Dans la formule du quotient, l’ordre u′v − uv′ est essentiel et le dénominateur est au carré.",
    resourceHref: `${formulasPath}#derivation`,
    resourceLabel: "Revoir la dérivée d’un quotient",
  },
  {
    id: "q11-tangente",
    chapter: "derivation",
    competency: "Déterminer une équation de tangente",
    prompt: "Quelle est l’équation de la tangente à y = x² au point d’abscisse 2 ?",
    options: ["y = 2x", "y = 4x − 4", "y = 4x + 4", "y = 2x + 2"],
    correctIndex: 1,
    explanation:
      "f(2) = 4 et f′(2) = 4. La tangente a pour équation y = f(2) + f′(2)(x − 2) = 4 + 4(x − 2) = 4x − 4.",
    trap: "Le nombre dérivé donne la pente, mais la droite doit aussi passer par le point (2 ; 4).",
    resourceHref: `${formulasPath}#derivation`,
    resourceLabel: "Revoir l’équation de la tangente",
  },
  {
    id: "q12-signe-derivee",
    chapter: "derivation",
    competency: "Déduire les variations du signe de la dérivée",
    prompt: "La fonction h est dérivable sur ℝ et, pour tout réel x, h′(x) = (x + 2)(x − 1). Sur quel intervalle h est-elle décroissante ?",
    options: ["]−∞ ; −2]", "[−2 ; 1]", "[1 ; +∞[", "]−∞ ; −2] ∪ [1 ; +∞["],
    correctIndex: 1,
    explanation:
      "Le trinôme h′ a un coefficient dominant positif : il est négatif entre ses racines −2 et 1. Une fonction est décroissante là où sa dérivée est négative.",
    trap: "On étudie le signe de h′, pas celui de h.",
    resourceHref: `${formulasPath}#derivation`,
    resourceLabel: "Revoir dérivée et variations",
  },
  {
    id: "q13-exponentielle-propriete",
    chapter: "exponentielle",
    competency: "Transformer une expression exponentielle",
    prompt: "Pour tout réel x, à quoi est égal e^(x+2) / e^x ?",
    options: ["e²", "e^(2x+2)", "2e^x", "1"],
    correctIndex: 0,
    explanation:
      "e^(x+2) = e^x × e². Comme e^x est strictement positif, le quotient se simplifie en e².",
    trap: "Dans un quotient de puissances de même base, on soustrait les exposants.",
    resourceHref: `${formulasPath}#exponentielle`,
    resourceLabel: "Revoir les propriétés de l’exponentielle",
  },
  {
    id: "q14-derivee-exponentielle",
    chapter: "exponentielle",
    competency: "Dériver t ↦ e^(at)",
    prompt: "Quelle est la dérivée de g(t) = e^(−3t) ?",
    options: ["e^(−3t)", "−3e^(−3t)", "3e^(−3t)", "−3t e^(−3t)"],
    correctIndex: 1,
    explanation:
      "Pour une constante a, la dérivée de t ↦ e^(at) est ae^(at). Ici a = −3, donc g′(t) = −3e^(−3t).",
    trap: "Le coefficient −3 de l’exposant doit apparaître devant l’exponentielle.",
    resourceHref: `${formulasPath}#exponentielle`,
    resourceLabel: "Revoir la dérivée de e^(at)",
  },
  {
    id: "q15-equation-exponentielle",
    chapter: "exponentielle",
    competency: "Utiliser l’injectivité de l’exponentielle",
    prompt: "Quelle est la solution de e^(2x) = e^6 ?",
    options: ["x = 2", "x = 3", "x = 4", "x = 6"],
    correctIndex: 1,
    explanation:
      "La fonction exponentielle est strictement croissante, donc elle prend une même valeur seulement pour un même exposant. Ainsi 2x = 6, d’où x = 3.",
    trap: "Il n’est pas nécessaire d’utiliser un logarithme : comparer les exposants suffit ici.",
    resourceHref: `${formulasPath}#exponentielle`,
    resourceLabel: "Revoir l’exponentielle",
  },
  {
    id: "q16-valeur-remarquable",
    chapter: "trigonometrie",
    competency: "Lire une valeur remarquable",
    prompt: "Combien vaut cos(5π/6) ?",
    options: ["√3/2", "−√3/2", "1/2", "−1/2"],
    correctIndex: 1,
    explanation:
      "5π/6 = π − π/6. Sur le cercle, le cosinus est négatif dans le deuxième quadrant et sa valeur absolue est cos(π/6) = √3/2.",
    trap: "L’angle de référence donne la valeur absolue ; le quadrant donne le signe.",
    resourceHref: `${formulasPath}#trigonometrie`,
    resourceLabel: "Revoir le cercle trigonométrique",
  },
  {
    id: "q17-angles-associes",
    chapter: "trigonometrie",
    competency: "Identifier deux angles de même image",
    prompt: "Quel angle de [0 ; 2π[ a la même image sur le cercle que −π/3 ?",
    options: ["π/3", "2π/3", "4π/3", "5π/3"],
    correctIndex: 3,
    explanation:
      "On ajoute un tour complet : −π/3 + 2π = −π/3 + 6π/3 = 5π/3.",
    trap: "Deux angles ont la même image lorsqu’ils diffèrent d’un multiple de 2π, pas de π.",
    resourceHref: `${formulasPath}#trigonometrie`,
    resourceLabel: "Revoir l’enroulement du cercle",
  },
  {
    id: "q18-equation-sinus",
    chapter: "trigonometrie",
    competency: "Lire les antécédents d’une valeur sur le cercle",
    prompt: "Quelles sont les solutions de sin(x) = 1/2 sur [0 ; 2π] ?",
    options: ["π/6 seulement", "π/6 et 5π/6", "π/6 et 7π/6", "5π/6 et 11π/6"],
    correctIndex: 1,
    explanation:
      "Le sinus est l’ordonnée sur le cercle. L’ordonnée 1/2 est atteinte dans les premier et deuxième quadrants : x = π/6 et x = 5π/6.",
    trap: "Les points des troisième et quatrième quadrants ont un sinus négatif.",
    resourceHref: `${formulasPath}#trigonometrie`,
    resourceLabel: "Revoir sinus et cosinus",
  },
  {
    id: "q19-produit-scalaire",
    chapter: "geometrie",
    competency: "Calculer un produit scalaire avec des coordonnées",
    prompt: "Dans un repère orthonormé, combien vaut (3 ; −1) · (2 ; 4) ?",
    options: ["−2", "2", "6", "10"],
    correctIndex: 1,
    explanation:
      "Le produit scalaire vaut 3 × 2 + (−1) × 4 = 6 − 4 = 2.",
    trap: "On additionne les produits coordonnée par coordonnée ; on ne multiplie pas les normes.",
    resourceHref: `${formulasPath}#geometrie`,
    resourceLabel: "Revoir le produit scalaire",
  },
  {
    id: "q20-orthogonalite",
    chapter: "geometrie",
    competency: "Reconnaître deux vecteurs orthogonaux",
    prompt: "Que peut-on affirmer pour u = (2 ; 3) et v = (3 ; −2) ?",
    options: ["u et v sont colinéaires", "u et v sont orthogonaux", "u · v = 13", "u + v est nul"],
    correctIndex: 1,
    explanation:
      "u · v = 2 × 3 + 3 × (−2) = 6 − 6 = 0. Deux vecteurs non nuls dont le produit scalaire est nul sont orthogonaux.",
    trap: "Un produit scalaire nul caractérise l’orthogonalité, pas la colinéarité.",
    resourceHref: `${formulasPath}#geometrie`,
    resourceLabel: "Revoir le critère d’orthogonalité",
  },
  {
    id: "q21-vecteur-normal",
    chapter: "geometrie",
    competency: "Lire un vecteur normal à une droite",
    prompt: "Quel vecteur est normal à la droite 2x − 3y + 5 = 0 ?",
    options: ["(2 ; −3)", "(−3 ; 2)", "(2 ; 3)", "(3 ; 2)"],
    correctIndex: 0,
    explanation:
      "Pour une droite d’équation ax + by + c = 0, le vecteur (a ; b) est normal. Ici, un vecteur normal est donc (2 ; −3).",
    trap: "Le vecteur (−b ; a) est directeur ; le vecteur (a ; b) est normal.",
    resourceHref: `${formulasPath}#geometrie`,
    resourceLabel: "Revoir droites et vecteurs normaux",
  },
  {
    id: "q22-equation-cercle",
    chapter: "geometrie",
    competency: "Reconnaître une équation de cercle",
    prompt: "Quel est le centre du cercle x² − 4x + y² + 6y − 12 = 0 ?",
    options: ["(−2 ; 3)", "(2 ; −3)", "(4 ; −6)", "(2 ; 3)"],
    correctIndex: 1,
    explanation:
      "En complétant les carrés : (x − 2)² + (y + 3)² = 25. Le centre est donc (2 ; −3) et le rayon vaut 5.",
    trap: "Dans (y + 3)², l’ordonnée du centre est −3.",
    resourceHref: `${formulasPath}#geometrie`,
    resourceLabel: "Revoir les équations de cercle",
  },
  {
    id: "q23-probabilites-totales",
    chapter: "probabilites",
    competency: "Appliquer la formule des probabilités totales",
    prompt: "On a P(A) = 0,4, P(B|A) = 0,15 et P(B|Ā) = 0,05. Combien vaut P(B) ?",
    options: ["0,02", "0,08", "0,09", "0,20"],
    correctIndex: 2,
    explanation:
      "A et Ā forment une partition. P(B) = 0,4 × 0,15 + 0,6 × 0,05 = 0,06 + 0,03 = 0,09.",
    trap: "La deuxième branche est pondérée par P(Ā) = 0,6, pas par P(A).",
    resourceHref: `${formulasPath}#probabilites`,
    resourceLabel: "Revoir les probabilités totales",
  },
  {
    id: "q24-probabilite-conditionnelle",
    chapter: "probabilites",
    competency: "Calculer une probabilité conditionnelle",
    prompt: "Si P(A ∩ B) = 0,18 et P(A) = 0,30, combien vaut P(B|A) ?",
    options: ["0,054", "0,12", "0,48", "0,60"],
    correctIndex: 3,
    explanation:
      "P(B|A) = P(A ∩ B)/P(A) = 0,18/0,30 = 0,60.",
    trap: "Une probabilité conditionnelle se calcule en divisant l’intersection par la probabilité de l’évènement conditionnant.",
    resourceHref: `${formulasPath}#probabilites`,
    resourceLabel: "Revoir les probabilités conditionnelles",
  },
  {
    id: "q25-independance",
    chapter: "probabilites",
    competency: "Vérifier une indépendance",
    prompt: "P(A) = 0,5, P(B) = 0,2 et P(A ∩ B) = 0,1. Que peut-on conclure ?",
    options: ["A et B sont incompatibles", "A et B sont indépendants", "A est inclus dans B", "On ne peut rien conclure"],
    correctIndex: 1,
    explanation:
      "P(A)P(B) = 0,5 × 0,2 = 0,1 = P(A ∩ B). Le critère d’indépendance est satisfait.",
    trap: "Des évènements indépendants peuvent se produire ensemble ; ils ne sont pas incompatibles.",
    resourceHref: `${formulasPath}#probabilites`,
    resourceLabel: "Revoir l’indépendance",
  },
  {
    id: "q26-bernoulli",
    chapter: "probabilites",
    competency: "Calculer sur trois épreuves de Bernoulli",
    prompt: "Trois essais indépendants ont chacun une probabilité de succès 1/4. Quelle est la probabilité d’obtenir exactement un succès ?",
    options: ["9/64", "27/64", "3/16", "37/64"],
    correctIndex: 1,
    explanation:
      "Le succès peut occuper trois positions. Chaque chemin avec un succès et deux échecs vaut (1/4)(3/4)² = 9/64. Au total : 3 × 9/64 = 27/64.",
    trap: "Il faut compter les trois positions possibles du succès, pas un seul chemin de l’arbre.",
    resourceHref: `${formulasPath}#probabilites`,
    resourceLabel: "Revoir les répétitions de Bernoulli",
  },
  {
    id: "q27-esperance",
    chapter: "variables-aleatoires",
    competency: "Calculer une espérance",
    prompt: "X vaut −1 avec probabilité 0,4 et 2 avec probabilité 0,6. Combien vaut E(X) ?",
    options: ["0,2", "0,8", "1", "1,4"],
    correctIndex: 1,
    explanation:
      "E(X) = (−1) × 0,4 + 2 × 0,6 = −0,4 + 1,2 = 0,8.",
    trap: "L’espérance est une moyenne pondérée par les probabilités, pas la moyenne simple des valeurs.",
    resourceHref: `${formulasPath}#probabilites`,
    resourceLabel: "Revoir espérance et loi",
  },
  {
    id: "q28-variance",
    chapter: "variables-aleatoires",
    competency: "Calculer variance et écart type",
    prompt: "X vaut 0 ou 2 avec la même probabilité. Quelle est sa variance ?",
    options: ["0", "1", "2", "4"],
    correctIndex: 1,
    explanation:
      "E(X) = 1 et E(X²) = (0² + 2²)/2 = 2. Par König-Huygens, V(X) = E(X²) − E(X)² = 2 − 1 = 1.",
    trap: "La variance n’est pas E(X²) : il faut retrancher le carré de l’espérance.",
    resourceHref: `${formulasPath}#probabilites`,
    resourceLabel: "Revoir variance et écart type",
  },
  {
    id: "q29-liste-python",
    chapter: "algorithmique",
    competency: "Lire une liste définie en compréhension",
    prompt: "Que produit en Python [n*n for n in range(1, 5)] ?",
    options: ["[1, 4, 9, 16]", "[1, 4, 9, 16, 25]", "[0, 1, 4, 9, 16]", "[2, 4, 6, 8]"],
    correctIndex: 0,
    explanation:
      "range(1, 5) fournit 1, 2, 3 et 4 : la borne 5 est exclue. La compréhension calcule le carré de chacun de ces entiers.",
    trap: "Dans range(début, fin), la borne de fin n’est pas incluse.",
    resourceHref: `${formulasPath}#python`,
    resourceLabel: "Revoir le mémo Python",
  },
  {
    id: "q30-boucle-seuil",
    chapter: "algorithmique",
    competency: "Comprendre une boucle de seuil",
    prompt: "Avec u = 100 et n = 0, on répète « u = 1,2 × u ; n = n + 1 » tant que u < 140. Quelles valeurs obtient-on à l’arrêt ?",
    options: ["n = 1 et u = 120", "n = 2 et u = 140", "n = 2 et u = 144", "n = 3 et u = 172,8"],
    correctIndex: 2,
    explanation:
      "Après un tour, u = 120 et la condition reste vraie. Après deux tours, u = 144 et n = 2 ; 144 < 140 est faux, donc la boucle s’arrête.",
    trap: "La valeur qui provoque la sortie est la première valeur supérieure ou égale au seuil ; elle peut dépasser 140.",
    resourceHref: `${formulasPath}#python`,
    resourceLabel: "Revoir les boucles Python",
  },
];
