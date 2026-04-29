export type ExamGoal = "brevet" | "bac-premiere" | "terminale";
export type Difficulty = "easy" | "medium" | "hard";

export type Question = {
  id: string;
  examGoal: ExamGoal;
  levelLabel: string;
  topic: string;
  topicLabel: string;
  difficulty: Difficulty;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
};

// ---------------------------------------------------------
// DONNÉES LOCALES
// ---------------------------------------------------------

export const questions: Question[] = [
  {
    "id": "q-1",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "fractions",
    "topicLabel": "Fractions",
    "difficulty": "easy",
    "question": "Calculer : 1/2 + 1/4",
    "options": [
      "3/4",
      "2/6",
      "1/6",
      "2/4"
    ],
    "correctOptionIndex": 0,
    "explanation": "Mise au même dénominateur : 2/4 + 1/4 = 3/4."
  },
  {
    "id": "q-2",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "fractions",
    "topicLabel": "Fractions",
    "difficulty": "easy",
    "question": "Calculer : 3/5 - 1/5",
    "options": [
      "2/5",
      "4/5",
      "2/0",
      "3/25"
    ],
    "correctOptionIndex": 0,
    "explanation": "Les dénominateurs sont identiques, on soustrait les numérateurs : 3 - 1 = 2."
  },
  {
    "id": "q-3",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "fractions",
    "topicLabel": "Fractions",
    "difficulty": "medium",
    "question": "Calculer : 2/3 × 4/5",
    "options": [
      "6/8",
      "8/15",
      "10/12",
      "6/15"
    ],
    "correctOptionIndex": 1,
    "explanation": "On multiplie les numérateurs entre eux et les dénominateurs entre eux : (2×4)/(3×5) = 8/15."
  },
  {
    "id": "q-4",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "fractions",
    "topicLabel": "Fractions",
    "difficulty": "medium",
    "question": "Calculer : (3/4) ÷ (1/2)",
    "options": [
      "3/8",
      "3/2",
      "6/4",
      "1/2"
    ],
    "correctOptionIndex": 1,
    "explanation": "Diviser, c'est multiplier par l'inverse : (3/4) × (2/1) = 6/4 = 3/2."
  },
  {
    "id": "q-5",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "fractions",
    "topicLabel": "Fractions",
    "difficulty": "hard",
    "question": "Calculer : 1/3 + 1/4",
    "options": [
      "2/7",
      "7/12",
      "1/12",
      "4/12"
    ],
    "correctOptionIndex": 1,
    "explanation": "Mise au même dénominateur (12) : 4/12 + 3/12 = 7/12."
  },
  {
    "id": "q-6",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "fractions",
    "topicLabel": "Fractions",
    "difficulty": "hard",
    "question": "Simplifier : 45/60",
    "options": [
      "3/4",
      "4/5",
      "5/6",
      "15/20"
    ],
    "correctOptionIndex": 0,
    "explanation": "On divise le haut et le bas par le PGCD qui est 15 : 45÷15=3 et 60÷15=4."
  },
  {
    "id": "q-7",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "fractions",
    "topicLabel": "Fractions",
    "difficulty": "medium",
    "question": "Que vaut 2/5 de 100 ?",
    "options": [
      "20",
      "40",
      "50",
      "10"
    ],
    "correctOptionIndex": 1,
    "explanation": "On fait 100 ÷ 5 = 20, puis on multiplie par 2 : 40."
  },
  {
    "id": "q-8",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "fractions",
    "topicLabel": "Fractions",
    "difficulty": "easy",
    "question": "Quelle fraction est égale à 0.5 ?",
    "options": [
      "1/5",
      "1/2",
      "2/5",
      "5/100"
    ],
    "correctOptionIndex": 1,
    "explanation": "0.5 correspond à la moitié, soit 1/2."
  },
  {
    "id": "q-9",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "calcul-litteral",
    "topicLabel": "Calcul littéral",
    "difficulty": "easy",
    "question": "Développer : 3(x + 2)",
    "options": [
      "3x + 2",
      "3x + 6",
      "x + 6",
      "6x"
    ],
    "correctOptionIndex": 1,
    "explanation": "On distribue le 3 : 3×x + 3×2 = 3x + 6."
  },
  {
    "id": "q-10",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "calcul-litteral",
    "topicLabel": "Calcul littéral",
    "difficulty": "medium",
    "question": "Développer : (x + 2)(x + 3)",
    "options": [
      "x² + 5x + 6",
      "x² + 6",
      "2x + 5",
      "x² + 5"
    ],
    "correctOptionIndex": 0,
    "explanation": "Double distributivité : x² + 3x + 2x + 6 = x² + 5x + 6."
  },
  {
    "id": "q-11",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "calcul-litteral",
    "topicLabel": "Calcul littéral",
    "difficulty": "easy",
    "question": "Factoriser : 4x + 8",
    "options": [
      "4(x + 2)",
      "x(4 + 8)",
      "12x",
      "4(x + 4)"
    ],
    "correctOptionIndex": 0,
    "explanation": "Le facteur commun est 4 : 4×x + 4×2 = 4(x + 2)."
  },
  {
    "id": "q-12",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "calcul-litteral",
    "topicLabel": "Calcul littéral",
    "difficulty": "hard",
    "question": "Développer : (x - 4)²",
    "options": [
      "x² - 16",
      "x² + 16",
      "x² - 8x + 16",
      "x² - 4x + 16"
    ],
    "correctOptionIndex": 2,
    "explanation": "Identité remarquable (a-b)² = a² - 2ab + b² : x² - 8x + 16."
  },
  {
    "id": "q-13",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "calcul-litteral",
    "topicLabel": "Calcul littéral",
    "difficulty": "hard",
    "question": "Factoriser : x² - 25",
    "options": [
      "(x - 5)²",
      "(x - 5)(x + 5)",
      "x(x - 25)",
      "Ne se factorise pas"
    ],
    "correctOptionIndex": 1,
    "explanation": "Identité remarquable a² - b² = (a-b)(a+b) avec a=x et b=5."
  },
  {
    "id": "q-14",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "calcul-litteral",
    "topicLabel": "Calcul littéral",
    "difficulty": "medium",
    "question": "Simplifier : 2x + 3x - x",
    "options": [
      "4x",
      "5x",
      "6x",
      "x"
    ],
    "correctOptionIndex": 0,
    "explanation": "On additionne les coefficients : 2 + 3 - 1 = 4."
  },
  {
    "id": "q-15",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "calcul-litteral",
    "topicLabel": "Calcul littéral",
    "difficulty": "medium",
    "question": "Quelle est la valeur de x² + 2x pour x = 3 ?",
    "options": [
      "15",
      "12",
      "9",
      "21"
    ],
    "correctOptionIndex": 0,
    "explanation": "On remplace x par 3 : 3² + 2×3 = 9 + 6 = 15."
  },
  {
    "id": "q-16",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "equations",
    "topicLabel": "Équations",
    "difficulty": "easy",
    "question": "Résoudre : x + 5 = 12",
    "options": [
      "x = 7",
      "x = 17",
      "x = 5",
      "x = 60"
    ],
    "correctOptionIndex": 0,
    "explanation": "On soustrait 5 de chaque côté : x = 12 - 5 = 7."
  },
  {
    "id": "q-17",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "equations",
    "topicLabel": "Équations",
    "difficulty": "easy",
    "question": "Résoudre : 2x = 10",
    "options": [
      "x = 8",
      "x = 12",
      "x = 5",
      "x = 20"
    ],
    "correctOptionIndex": 2,
    "explanation": "On divise par 2 : x = 10 / 2 = 5."
  },
  {
    "id": "q-18",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "equations",
    "topicLabel": "Équations",
    "difficulty": "medium",
    "question": "Résoudre : 3x - 4 = 11",
    "options": [
      "x = 15",
      "x = 5",
      "x = 4",
      "x = 7/3"
    ],
    "correctOptionIndex": 1,
    "explanation": "On ajoute 4 puis on divise par 3 : 3x = 15 donc x = 5."
  },
  {
    "id": "q-19",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "equations",
    "topicLabel": "Équations",
    "difficulty": "hard",
    "question": "Résoudre : 5x + 2 = 2x + 11",
    "options": [
      "x = 3",
      "x = 9",
      "x = 4",
      "x = 13/7"
    ],
    "correctOptionIndex": 0,
    "explanation": "On regroupe les x : 5x - 2x = 11 - 2 -> 3x = 9 -> x = 3."
  },
  {
    "id": "q-20",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "equations",
    "topicLabel": "Équations",
    "difficulty": "hard",
    "question": "Résoudre : (x - 2)(x + 3) = 0",
    "options": [
      "x=2 ou x=3",
      "x=-2 ou x=3",
      "x=2 ou x=-3",
      "x=-2 ou x=-3"
    ],
    "correctOptionIndex": 2,
    "explanation": "Un produit est nul si au moins un des facteurs est nul. Donc x-2=0 (x=2) ou x+3=0 (x=-3)."
  },
  {
    "id": "q-21",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "equations",
    "topicLabel": "Équations",
    "difficulty": "medium",
    "question": "Si 4x = 0, alors :",
    "options": [
      "x = -4",
      "x = 0",
      "x = 1",
      "Impossible"
    ],
    "correctOptionIndex": 1,
    "explanation": "0 divisé par n'importe quel nombre non nul fait 0."
  },
  {
    "id": "q-22",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "equations",
    "topicLabel": "Équations",
    "difficulty": "easy",
    "question": "Quel nombre a pour double 24 ?",
    "options": [
      "12",
      "48",
      "6",
      "22"
    ],
    "correctOptionIndex": 0,
    "explanation": "L'équation est 2x = 24, donc x = 12."
  },
  {
    "id": "q-23",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "fonctions",
    "topicLabel": "Fonctions",
    "difficulty": "easy",
    "question": "Soit f(x) = 3x. Quelle est l'image de 4 ?",
    "options": [
      "7",
      "1",
      "12",
      "34"
    ],
    "correctOptionIndex": 2,
    "explanation": "On remplace x par 4 : f(4) = 3 × 4 = 12."
  },
  {
    "id": "q-24",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "fonctions",
    "topicLabel": "Fonctions",
    "difficulty": "medium",
    "question": "Soit g(x) = 2x + 1. Quel est l'antécédent de 7 ?",
    "options": [
      "15",
      "3",
      "4",
      "8"
    ],
    "correctOptionIndex": 1,
    "explanation": "On cherche x tel que 2x + 1 = 7. 2x = 6, donc x = 3."
  },
  {
    "id": "q-25",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "fonctions",
    "topicLabel": "Fonctions",
    "difficulty": "easy",
    "question": "Comment appelle-t-on la fonction f(x) = 5x ?",
    "options": [
      "Affine",
      "Linéaire",
      "Constante",
      "Carrée"
    ],
    "correctOptionIndex": 1,
    "explanation": "Une fonction de la forme f(x) = ax est une fonction linéaire."
  },
  {
    "id": "q-26",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "fonctions",
    "topicLabel": "Fonctions",
    "difficulty": "medium",
    "question": "Dans f(x) = 4x - 2, quel est l'ordonnée à l'origine ?",
    "options": [
      "4",
      "-2",
      "2",
      "0"
    ],
    "correctOptionIndex": 1,
    "explanation": "C'est la valeur de f(0), donc -2 (le coefficient b dans ax+b)."
  },
  {
    "id": "q-27",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "fonctions",
    "topicLabel": "Fonctions",
    "difficulty": "hard",
    "question": "Quelle est la représentation graphique d'une fonction affine ?",
    "options": [
      "Une parabole",
      "Un cercle",
      "Une droite",
      "Une hyperbole"
    ],
    "correctOptionIndex": 2,
    "explanation": "Les fonctions affines (ax+b) sont toujours représentées par une droite."
  },
  {
    "id": "q-28",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "fonctions",
    "topicLabel": "Fonctions",
    "difficulty": "hard",
    "question": "La courbe d'une fonction linéaire passe-t-elle par l'origine ?",
    "options": [
      "Oui, toujours",
      "Non, jamais",
      "Seulement si a=0",
      "Ça dépend"
    ],
    "correctOptionIndex": 0,
    "explanation": "Oui, f(0) = a×0 = 0, donc elle passe toujours par (0;0)."
  },
  {
    "id": "q-29",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "geometrie",
    "topicLabel": "Géométrie",
    "difficulty": "easy",
    "question": "Quelle est la somme des angles d'un triangle ?",
    "options": [
      "90°",
      "180°",
      "360°",
      "Dépend du triangle"
    ],
    "correctOptionIndex": 1,
    "explanation": "Dans la géométrie classique, la somme des angles d'un triangle vaut toujours 180°."
  },
  {
    "id": "q-30",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "geometrie",
    "topicLabel": "Géométrie",
    "difficulty": "medium",
    "question": "Théorème de Pythagore pour un triangle ABC rectangle en A :",
    "options": [
      "AB² + BC² = AC²",
      "BC² = AB² + AC²",
      "AB + AC = BC",
      "BC² = AB² - AC²"
    ],
    "correctOptionIndex": 1,
    "explanation": "Le carré de l'hypoténuse (BC) est égal à la somme des carrés des deux autres côtés."
  },
  {
    "id": "q-31",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "geometrie",
    "topicLabel": "Géométrie",
    "difficulty": "medium",
    "question": "Comment calculer l'aire d'un rectangle ?",
    "options": [
      "Longueur + Largeur",
      "(L + l) × 2",
      "Longueur × Largeur",
      "L² + l²"
    ],
    "correctOptionIndex": 2,
    "explanation": "L'aire est le produit des deux dimensions orthogonales : L × l."
  },
  {
    "id": "q-32",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "geometrie",
    "topicLabel": "Géométrie",
    "difficulty": "hard",
    "question": "Dans un triangle, si une droite passe par le milieu de deux côtés...",
    "options": [
      "Elle est perpendiculaire au 3e",
      "Elle est parallèle au 3e côté",
      "Elle coupe le 3e en son milieu",
      "C'est la médiane"
    ],
    "correctOptionIndex": 1,
    "explanation": "C'est le théorème des milieux : la droite est parallèle au 3ème côté."
  },
  {
    "id": "q-33",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "geometrie",
    "topicLabel": "Géométrie",
    "difficulty": "medium",
    "question": "Volume d'un pavé droit (L, l, h) ?",
    "options": [
      "L + l + h",
      "L × l × h",
      "(L×l)/h",
      "2(L+l+h)"
    ],
    "correctOptionIndex": 1,
    "explanation": "Le volume est le produit des trois dimensions : Longueur × largeur × hauteur."
  },
  {
    "id": "q-34",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "geometrie",
    "topicLabel": "Géométrie",
    "difficulty": "hard",
    "question": "Quelle transformation conserve l'orientation mais pas la position ?",
    "options": [
      "Translation",
      "Symétrie axiale",
      "Homothétie (k=-1)",
      "Aucune"
    ],
    "correctOptionIndex": 0,
    "explanation": "La translation fait glisser la figure sans la tourner ni la retourner."
  },
  {
    "id": "q-35",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "probas-stats",
    "topicLabel": "Probabilités & Stats",
    "difficulty": "easy",
    "question": "La probabilité d'un événement est toujours comprise entre :",
    "options": [
      "-1 et 1",
      "0 et 100",
      "0 et 1",
      "1 et 10"
    ],
    "correctOptionIndex": 2,
    "explanation": "Une probabilité est un nombre entre 0 (impossible) et 1 (certain)."
  },
  {
    "id": "q-36",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "probas-stats",
    "topicLabel": "Probabilités & Stats",
    "difficulty": "easy",
    "question": "On lance un dé à 6 faces. Proba de faire un 4 ?",
    "options": [
      "1/4",
      "4/6",
      "1/6",
      "1/2"
    ],
    "correctOptionIndex": 2,
    "explanation": "Il y a une seule face '4' parmi les 6 faces possibles."
  },
  {
    "id": "q-37",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "probas-stats",
    "topicLabel": "Probabilités & Stats",
    "difficulty": "medium",
    "question": "Moyenne de 10, 15 et 20 ?",
    "options": [
      "15",
      "45",
      "12.5",
      "17.5"
    ],
    "correctOptionIndex": 0,
    "explanation": "(10 + 15 + 20) / 3 = 45 / 3 = 15."
  },
  {
    "id": "q-38",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "probas-stats",
    "topicLabel": "Probabilités & Stats",
    "difficulty": "medium",
    "question": "On lance un dé à 6 faces. Proba de faire un nombre pair ?",
    "options": [
      "1/3",
      "1/2",
      "3/4",
      "2/6"
    ],
    "correctOptionIndex": 1,
    "explanation": "Il y a 3 nombres pairs (2, 4, 6) sur 6 : 3/6 = 1/2."
  },
  {
    "id": "q-39",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "probas-stats",
    "topicLabel": "Probabilités & Stats",
    "difficulty": "hard",
    "question": "Médiane de la série : 2, 4, 8, 10, 15 ?",
    "options": [
      "8",
      "7.8",
      "6",
      "10"
    ],
    "correctOptionIndex": 0,
    "explanation": "La série est ordonnée, la valeur centrale (3ème valeur sur 5) est 8."
  },
  {
    "id": "q-40",
    "examGoal": "brevet",
    "levelLabel": "3e / Brevet",
    "topic": "probas-stats",
    "topicLabel": "Probabilités & Stats",
    "difficulty": "hard",
    "question": "Que vaut la somme des probabilités de tous les événements élémentaires ?",
    "options": [
      "0",
      "0.5",
      "1",
      "Dépend du nombre"
    ],
    "correctOptionIndex": 2,
    "explanation": "La somme des probabilités de toutes les issues possibles vaut toujours exactement 1."
  },
  {
    "id": "q-41",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "second-degre",
    "topicLabel": "Second degré",
    "difficulty": "easy",
    "question": "Formule du discriminant Δ ?",
    "options": [
      "b² - 4ac",
      "4ac - b²",
      "(a+b)²",
      "-b / 2a"
    ],
    "correctOptionIndex": 0,
    "explanation": "C'est la définition du discriminant d'un polynôme ax²+bx+c."
  },
  {
    "id": "q-42",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "second-degre",
    "topicLabel": "Second degré",
    "difficulty": "medium",
    "question": "Si Δ < 0, l'équation ax²+bx+c=0 admet :",
    "options": [
      "2 solutions",
      "1 solution",
      "Aucune solution réelle",
      "Une infinité"
    ],
    "correctOptionIndex": 2,
    "explanation": "Dans R, un carré ne peut pas être strictement négatif, donc pas de solution réelle."
  },
  {
    "id": "q-43",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "second-degre",
    "topicLabel": "Second degré",
    "difficulty": "medium",
    "question": "Si Δ = 0, la racine double est :",
    "options": [
      "b/2a",
      "-b/2a",
      "c/a",
      "-c/a"
    ],
    "correctOptionIndex": 1,
    "explanation": "La formule des racines (-b ± √Δ)/2a devient simplement -b/2a quand Δ=0."
  },
  {
    "id": "q-44",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "second-degre",
    "topicLabel": "Second degré",
    "difficulty": "hard",
    "question": "Quel est le sommet de la parabole y = ax² + bx + c ?",
    "options": [
      "(-b/2a ; f(-b/2a))",
      "(b/2a ; 0)",
      "(0 ; c)",
      "(-c/b ; 0)"
    ],
    "correctOptionIndex": 0,
    "explanation": "L'abscisse du sommet (alpha) est toujours égale à -b/(2a)."
  },
  {
    "id": "q-45",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "second-degre",
    "topicLabel": "Second degré",
    "difficulty": "easy",
    "question": "Calculer Δ pour x² - 3x + 2 = 0",
    "options": [
      "1",
      "17",
      "-1",
      "5"
    ],
    "correctOptionIndex": 0,
    "explanation": "a=1, b=-3, c=2. Δ = (-3)² - 4(1)(2) = 9 - 8 = 1."
  },
  {
    "id": "q-46",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "second-degre",
    "topicLabel": "Second degré",
    "difficulty": "medium",
    "question": "Le produit des racines x1 × x2 vaut :",
    "options": [
      "-b/a",
      "c/a",
      "Δ/a",
      "1"
    ],
    "correctOptionIndex": 1,
    "explanation": "C'est une propriété des racines d'un polynôme du second degré : x1×x2 = c/a."
  },
  {
    "id": "q-47",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "second-degre",
    "topicLabel": "Second degré",
    "difficulty": "hard",
    "question": "Forme canonique de ax²+bx+c ?",
    "options": [
      "a(x-α)² + β",
      "a(x-x1)(x-x2)",
      "ax(x+b/a) + c",
      "a²x + b²"
    ],
    "correctOptionIndex": 0,
    "explanation": "La forme canonique met en évidence les coordonnées du sommet S(α ; β)."
  },
  {
    "id": "q-48",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "second-degre",
    "topicLabel": "Second degré",
    "difficulty": "medium",
    "question": "Quelles sont les racines de x² - 1 = 0 ?",
    "options": [
      "1",
      "-1 et 1",
      "0",
      "Aucune"
    ],
    "correctOptionIndex": 1,
    "explanation": "x² = 1 implique x = √1 ou x = -√1, donc 1 et -1."
  },
  {
    "id": "q-49",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "derivation",
    "topicLabel": "Dérivation",
    "difficulty": "easy",
    "question": "Dérivée de f(x) = x³ ?",
    "options": [
      "3x",
      "x²",
      "3x²",
      "1/3 x³"
    ],
    "correctOptionIndex": 2,
    "explanation": "On utilise la formule (x^n)' = n.x^(n-1)."
  },
  {
    "id": "q-50",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "derivation",
    "topicLabel": "Dérivation",
    "difficulty": "medium",
    "question": "Dérivée de f(x) = 1/x ?",
    "options": [
      "ln(x)",
      "-1/x²",
      "1/x²",
      "-1/x"
    ],
    "correctOptionIndex": 1,
    "explanation": "C'est une dérivée usuelle à connaître par cœur : (1/x)' = -1/x²."
  },
  {
    "id": "q-51",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "derivation",
    "topicLabel": "Dérivation",
    "difficulty": "medium",
    "question": "Dérivée de f(x) = √x (pour x > 0) ?",
    "options": [
      "1/√x",
      "1/(2√x)",
      "2√x",
      "x^(-1/2)"
    ],
    "correctOptionIndex": 1,
    "explanation": "Formule de cours usuelle : (√x)' = 1 / (2√x)."
  },
  {
    "id": "q-52",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "derivation",
    "topicLabel": "Dérivation",
    "difficulty": "hard",
    "question": "Formule de (u×v)' ?",
    "options": [
      "u'×v'",
      "u'v - uv'",
      "u'v + uv'",
      "u' + v'"
    ],
    "correctOptionIndex": 2,
    "explanation": "La dérivée d'un produit n'est pas le produit des dérivées ! C'est u'v + uv'."
  },
  {
    "id": "q-53",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "derivation",
    "topicLabel": "Dérivation",
    "difficulty": "hard",
    "question": "Que représente f'(a) graphiquement ?",
    "options": [
      "L'aire sous la courbe",
      "Le sommet",
      "Le coefficient directeur de la tangente en a",
      "L'ordonnée à l'origine"
    ],
    "correctOptionIndex": 2,
    "explanation": "Le nombre dérivé f'(a) donne la pente de la tangente au point d'abscisse a."
  },
  {
    "id": "q-54",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "derivation",
    "topicLabel": "Dérivation",
    "difficulty": "easy",
    "question": "Dérivée d'une constante f(x) = 5 ?",
    "options": [
      "5",
      "1",
      "0",
      "x"
    ],
    "correctOptionIndex": 2,
    "explanation": "La dérivée d'une fonction constante est toujours 0, car elle ne varie pas."
  },
  {
    "id": "q-55",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "derivation",
    "topicLabel": "Dérivation",
    "difficulty": "medium",
    "question": "Dérivée de f(x) = 2x² + 3x ?",
    "options": [
      "4x + 3",
      "2x + 3",
      "4x",
      "4x² + 3"
    ],
    "correctOptionIndex": 0,
    "explanation": "On dérive terme à terme : (2x²)' = 4x et (3x)' = 3."
  },
  {
    "id": "q-56",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "fonctions",
    "topicLabel": "Fonctions",
    "difficulty": "easy",
    "question": "Une fonction dont la dérivée est positive est :",
    "options": [
      "Décroissante",
      "Croissante",
      "Constante",
      "Nulle"
    ],
    "correctOptionIndex": 1,
    "explanation": "Si f'(x) > 0, la pente de la tangente est positive, donc la fonction monte (elle est croissante)."
  },
  {
    "id": "q-57",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "fonctions",
    "topicLabel": "Fonctions",
    "difficulty": "medium",
    "question": "Si f'(a) = 0, que se passe-t-il graphiquement en a ?",
    "options": [
      "Une asymptote",
      "La tangente est horizontale",
      "La tangente est verticale",
      "Rupture de pente"
    ],
    "correctOptionIndex": 1,
    "explanation": "La pente est nulle, ce qui correspond généralement à un extremum local avec une tangente horizontale."
  },
  {
    "id": "q-58",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "fonctions",
    "topicLabel": "Fonctions",
    "difficulty": "hard",
    "question": "Équation de la tangente à Cf en a ?",
    "options": [
      "y = f'(a)(x-a) + f(a)",
      "y = f'(a)x + f(a)",
      "y = a.x + b",
      "y = f(a)(x-a)"
    ],
    "correctOptionIndex": 0,
    "explanation": "C'est la formule d'approximation affine locale."
  },
  {
    "id": "q-59",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "fonctions",
    "topicLabel": "Fonctions",
    "difficulty": "medium",
    "question": "La fonction f(x) = |x| est-elle dérivable en 0 ?",
    "options": [
      "Oui, f'(0)=0",
      "Oui, f'(0)=1",
      "Non",
      "Oui, f'(0)=-1"
    ],
    "correctOptionIndex": 2,
    "explanation": "Graphiquement, la courbe fait une pointe en 0. Elle n'y admet pas de tangente unique."
  },
  {
    "id": "q-60",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "fonctions",
    "topicLabel": "Fonctions",
    "difficulty": "easy",
    "question": "Sens de variation de f(x) = -2x + 5 ?",
    "options": [
      "Croissante",
      "Décroissante",
      "Constante",
      "Parabole"
    ],
    "correctOptionIndex": 1,
    "explanation": "Le coefficient directeur (a = -2) est négatif, la droite 'descend'."
  },
  {
    "id": "q-61",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "fonctions",
    "topicLabel": "Fonctions",
    "difficulty": "medium",
    "question": "Quel est l'ensemble de définition de f(x) = √x ?",
    "options": [
      "R",
      "R*",
      "[0 ; +∞[",
      "]0 ; +∞["
    ],
    "correctOptionIndex": 2,
    "explanation": "La racine carrée d'un nombre négatif n'est pas définie dans R."
  },
  {
    "id": "q-62",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "probabilites",
    "topicLabel": "Probabilités",
    "difficulty": "easy",
    "question": "Formule : P(A U B) =",
    "options": [
      "P(A) + P(B)",
      "P(A)×P(B)",
      "P(A) + P(B) - P(A ∩ B)",
      "1 - P(A)"
    ],
    "correctOptionIndex": 2,
    "explanation": "On additionne A et B mais il faut soustraire l'intersection pour ne pas la compter 2 fois."
  },
  {
    "id": "q-63",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "probabilites",
    "topicLabel": "Probabilités",
    "difficulty": "medium",
    "question": "Comment s'écrit la probabilité de A sachant B ?",
    "options": [
      "P(A|B)",
      "P_B(A)",
      "Les deux",
      "P(A ∩ B)"
    ],
    "correctOptionIndex": 2,
    "explanation": "Les notations P(A|B) et P_B(A) désignent la même chose : probabilité conditionnelle."
  },
  {
    "id": "q-64",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "probabilites",
    "topicLabel": "Probabilités",
    "difficulty": "hard",
    "question": "Formule : P_B(A) = ?",
    "options": [
      "P(A ∩ B) / P(B)",
      "P(A) / P(B)",
      "P(A U B) / P(B)",
      "P(A) × P(B)"
    ],
    "correctOptionIndex": 0,
    "explanation": "C'est la définition mathématique de la probabilité conditionnelle."
  },
  {
    "id": "q-65",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "probabilites",
    "topicLabel": "Probabilités",
    "difficulty": "medium",
    "question": "Deux événements sont incompatibles si :",
    "options": [
      "P(A ∩ B) = P(A)×P(B)",
      "P(A ∩ B) = 0",
      "A = B",
      "P(A U B) = 1"
    ],
    "correctOptionIndex": 1,
    "explanation": "S'ils ne peuvent pas se réaliser en même temps, leur intersection est l'ensemble vide."
  },
  {
    "id": "q-66",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "probabilites",
    "topicLabel": "Probabilités",
    "difficulty": "medium",
    "question": "Que vaut P(A) + P(non A) ?",
    "options": [
      "0",
      "0.5",
      "1",
      "100"
    ],
    "correctOptionIndex": 2,
    "explanation": "La probabilité d'un événement plus celle de son contraire vaut toujours 1 (certitude)."
  },
  {
    "id": "q-67",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "probabilites",
    "topicLabel": "Probabilités",
    "difficulty": "easy",
    "question": "Tirer une carte pique ou trèfle dans un jeu de 32 :",
    "options": [
      "1/4",
      "1/2",
      "1/8",
      "1"
    ],
    "correctOptionIndex": 1,
    "explanation": "Il y a 2 couleurs noires (pique, trèfle) sur 4 couleurs totales : 2/4 = 1/2."
  },
  {
    "id": "q-68",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "suites",
    "topicLabel": "Suites",
    "difficulty": "easy",
    "question": "Une suite arithmétique de raison r vérifie :",
    "options": [
      "u(n+1) = u(n) × r",
      "u(n+1) = u(n) + r",
      "u(n) = n + r",
      "u(n+1) = u(n)²"
    ],
    "correctOptionIndex": 1,
    "explanation": "Pour passer au terme suivant, on ajoute toujours la même quantité r."
  },
  {
    "id": "q-69",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "suites",
    "topicLabel": "Suites",
    "difficulty": "easy",
    "question": "Une suite géométrique de raison q vérifie :",
    "options": [
      "u(n+1) = u(n) × q",
      "u(n+1) = u(n) + q",
      "u(n) = q^n",
      "u(n) = n×q"
    ],
    "correctOptionIndex": 0,
    "explanation": "Pour passer au terme suivant, on multiplie par la raison constante q."
  },
  {
    "id": "q-70",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "suites",
    "topicLabel": "Suites",
    "difficulty": "medium",
    "question": "Expression de u(n) (arithmétique) en fonction de n :",
    "options": [
      "u(n) = u(0) × q^n",
      "u(n) = u(0) + n×r",
      "u(n) = u(0) + r",
      "u(n) = n×r"
    ],
    "correctOptionIndex": 1,
    "explanation": "À partir de u(0), on ajoute n fois la raison r."
  },
  {
    "id": "q-71",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "suites",
    "topicLabel": "Suites",
    "difficulty": "medium",
    "question": "Expression de u(n) (géométrique) en fonction de n :",
    "options": [
      "u(n) = u(0) + n×q",
      "u(n) = u(0) × q^n",
      "u(n) = q^n",
      "u(n) = u(0) × n"
    ],
    "correctOptionIndex": 1,
    "explanation": "À partir de u(0), on multiplie n fois par la raison q."
  },
  {
    "id": "q-72",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "suites",
    "topicLabel": "Suites",
    "difficulty": "hard",
    "question": "Somme des premiers entiers : 1 + 2 + ... + n ?",
    "options": [
      "n(n+1)/2",
      "n²/2",
      "n(n-1)/2",
      "n²"
    ],
    "correctOptionIndex": 0,
    "explanation": "C'est une formule classique (somme des termes d'une suite arithmétique)."
  },
  {
    "id": "q-73",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "suites",
    "topicLabel": "Suites",
    "difficulty": "medium",
    "question": "Si u(n) géométrique avec u(0)=2 et q=3, u(2) = ?",
    "options": [
      "8",
      "18",
      "12",
      "6"
    ],
    "correctOptionIndex": 1,
    "explanation": "u(1) = 2×3 = 6. u(2) = 6×3 = 18. (ou 2×3² = 18)."
  },
  {
    "id": "q-74",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "suites",
    "topicLabel": "Suites",
    "difficulty": "hard",
    "question": "Comment montrer qu'une suite est arithmétique ?",
    "options": [
      "Calculer u(n+1) - u(n)",
      "Calculer u(n+1) / u(n)",
      "Tracer le graphe",
      "Prendre 3 valeurs"
    ],
    "correctOptionIndex": 0,
    "explanation": "On calcule la différence u(n+1) - u(n) et on vérifie qu'elle est constante (égale à r)."
  },
  {
    "id": "q-75",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "statistiques",
    "topicLabel": "Statistiques",
    "difficulty": "easy",
    "question": "La médiane divise la population en :",
    "options": [
      "3 parties égales",
      "4 parties égales",
      "2 parties de même effectif",
      "10 parties"
    ],
    "correctOptionIndex": 2,
    "explanation": "La médiane est la valeur centrale : 50% en dessous, 50% au dessus."
  },
  {
    "id": "q-76",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "statistiques",
    "topicLabel": "Statistiques",
    "difficulty": "medium",
    "question": "Que mesurent les quartiles (Q1, Q3) ?",
    "options": [
      "La moyenne",
      "La dispersion de la série",
      "L'écart-type",
      "La variance"
    ],
    "correctOptionIndex": 1,
    "explanation": "Ils donnent une idée de la répartition des valeurs (intervalle interquartile)."
  },
  {
    "id": "q-77",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "statistiques",
    "topicLabel": "Statistiques",
    "difficulty": "hard",
    "question": "L'écart-type est :",
    "options": [
      "Le carré de la variance",
      "La racine carrée de la variance",
      "La moyenne des écarts",
      "Q3 - Q1"
    ],
    "correctOptionIndex": 1,
    "explanation": "L'écart-type (sigma) est défini comme la racine carrée de la variance (V)."
  },
  {
    "id": "q-78",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "statistiques",
    "topicLabel": "Statistiques",
    "difficulty": "medium",
    "question": "Si on ajoute 2 à toutes les valeurs, la moyenne...",
    "options": [
      "Ne change pas",
      "Est multipliée par 2",
      "Augmente de 2",
      "Devient 0"
    ],
    "correctOptionIndex": 2,
    "explanation": "La moyenne subit la même translation que les données."
  },
  {
    "id": "q-79",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "statistiques",
    "topicLabel": "Statistiques",
    "difficulty": "hard",
    "question": "Si on multiplie toutes les valeurs par 2, l'écart-type...",
    "options": [
      "Est multiplié par 2",
      "Est multiplié par 4",
      "Ne change pas",
      "Augmente de 2"
    ],
    "correctOptionIndex": 0,
    "explanation": "L'écart-type est multiplié par la valeur absolue du coefficient (|2| = 2)."
  },
  {
    "id": "q-80",
    "examGoal": "bac-premiere",
    "levelLabel": "Bac (1ère)",
    "topic": "statistiques",
    "topicLabel": "Statistiques",
    "difficulty": "easy",
    "question": "Le premier quartile (Q1) concentre au moins :",
    "options": [
      "50% des données",
      "75% des données",
      "25% des données",
      "10% des données"
    ],
    "correctOptionIndex": 2,
    "explanation": "Par définition, au moins 25% des valeurs de la série sont inférieures ou égales à Q1."
  },
  {
    "id": "q-81",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "suites",
    "topicLabel": "Suites & Récurrence",
    "difficulty": "easy",
    "question": "Raisonnement par récurrence, étape 1 :",
    "options": [
      "Hérédité",
      "Conclusion",
      "Initialisation",
      "Dérivation"
    ],
    "correctOptionIndex": 2,
    "explanation": "On commence toujours par vérifier que la propriété est vraie au premier rang."
  },
  {
    "id": "q-82",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "suites",
    "topicLabel": "Suites & Récurrence",
    "difficulty": "medium",
    "question": "Si -1 < q < 1, que vaut la limite de q^n ?",
    "options": [
      "+∞",
      "-∞",
      "1",
      "0"
    ],
    "correctOptionIndex": 3,
    "explanation": "Si la raison d'une suite géométrique est strictement entre -1 et 1, elle converge vers 0."
  },
  {
    "id": "q-83",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "suites",
    "topicLabel": "Suites & Récurrence",
    "difficulty": "medium",
    "question": "Toute suite croissante et majorée est :",
    "options": [
      "Divergente",
      "Convergente",
      "Arithmétique",
      "Nulle"
    ],
    "correctOptionIndex": 1,
    "explanation": "C'est le théorème de convergence monotone."
  },
  {
    "id": "q-84",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "suites",
    "topicLabel": "Suites & Récurrence",
    "difficulty": "hard",
    "question": "Une suite qui tend vers l'infini est forcément croissante ?",
    "options": [
      "Oui",
      "Non",
      "Seulement si u(0)>0",
      "Oui, à partir d'un certain rang"
    ],
    "correctOptionIndex": 1,
    "explanation": "Non, elle peut osciller tout en tendant vers l'infini (ex: u(n) = n + (-1)^n * n/2)."
  },
  {
    "id": "q-85",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "suites",
    "topicLabel": "Suites & Récurrence",
    "difficulty": "hard",
    "question": "Si u(n) converge vers L et f est continue en L :",
    "options": [
      "lim f(u(n)) = f(L)",
      "lim f(u(n)) = L",
      "lim f(u(n)) = ∞",
      "Aucun lien"
    ],
    "correctOptionIndex": 0,
    "explanation": "C'est le théorème de composition des limites avec une fonction continue."
  },
  {
    "id": "q-86",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "limites",
    "topicLabel": "Limites",
    "difficulty": "easy",
    "question": "Limite de 1/x quand x tend vers +∞ ?",
    "options": [
      "+∞",
      "0",
      "1",
      "-∞"
    ],
    "correctOptionIndex": 1,
    "explanation": "Plus on divise par un nombre grand, plus le résultat est petit, donc tend vers 0."
  },
  {
    "id": "q-87",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "limites",
    "topicLabel": "Limites",
    "difficulty": "medium",
    "question": "Forme indéterminée classique :",
    "options": [
      "0 / 1",
      "∞ / ∞",
      "0 × 1",
      "∞ + ∞"
    ],
    "correctOptionIndex": 1,
    "explanation": "L'infini divisé par l'infini est une FI car on ne sait pas qui 'l'emporte'."
  },
  {
    "id": "q-88",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "limites",
    "topicLabel": "Limites",
    "difficulty": "medium",
    "question": "Limite d'un polynôme en +∞ :",
    "options": [
      "Limite de son terme de plus bas degré",
      "Limite de son terme de plus haut degré",
      "Toujours 0",
      "La somme des coeffs"
    ],
    "correctOptionIndex": 1,
    "explanation": "En l'infini, c'est le terme de plus haut degré qui impose sa limite (règle des croissances)."
  },
  {
    "id": "q-89",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "limites",
    "topicLabel": "Limites",
    "difficulty": "hard",
    "question": "Théorème des gendarmes : si u(n) < v(n) < w(n) et u, w tendent vers L...",
    "options": [
      "v tend vers 0",
      "v n'a pas de limite",
      "v tend vers L",
      "v tend vers ∞"
    ],
    "correctOptionIndex": 2,
    "explanation": "La suite v(n) étant 'coincée' entre deux suites qui tendent vers L, elle tend aussi vers L."
  },
  {
    "id": "q-90",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "limites",
    "topicLabel": "Limites",
    "difficulty": "hard",
    "question": "Limite de sin(x)/x quand x tend vers 0 ?",
    "options": [
      "0",
      "1",
      "∞",
      "N'existe pas"
    ],
    "correctOptionIndex": 1,
    "explanation": "C'est une limite de référence liée à la dérivée de sin en 0."
  },
  {
    "id": "q-91",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "derivation",
    "topicLabel": "Dérivation avancée",
    "difficulty": "medium",
    "question": "Dérivée de f(u(x)) :",
    "options": [
      "f'(u(x))",
      "u'(x) × f'(u(x))",
      "u'(x) × f(x)",
      "f'(x) × u'(x)"
    ],
    "correctOptionIndex": 1,
    "explanation": "C'est la formule de dérivation d'une fonction composée (chain rule)."
  },
  {
    "id": "q-92",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "derivation",
    "topicLabel": "Dérivation avancée",
    "difficulty": "medium",
    "question": "Si f''(x) > 0 sur un intervalle, la fonction f est :",
    "options": [
      "Convexe",
      "Concave",
      "Croissante",
      "Décroissante"
    ],
    "correctOptionIndex": 0,
    "explanation": "Une dérivée seconde positive indique une convexité (la courbe 'sourit', tangente en dessous)."
  },
  {
    "id": "q-93",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "derivation",
    "topicLabel": "Dérivation avancée",
    "difficulty": "hard",
    "question": "Un point d'inflexion est un point où :",
    "options": [
      "La dérivée s'annule",
      "La fonction s'annule",
      "La courbe traverse sa tangente",
      "La courbe est verticale"
    ],
    "correctOptionIndex": 2,
    "explanation": "En ce point, la dérivée seconde s'annule en changeant de signe, la concavité change."
  },
  {
    "id": "q-94",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "derivation",
    "topicLabel": "Dérivation avancée",
    "difficulty": "medium",
    "question": "Dérivée de e^(2x) ?",
    "options": [
      "e^(2x)",
      "2e^(2x)",
      "2xe^(2x)",
      "e^(x)"
    ],
    "correctOptionIndex": 1,
    "explanation": "On applique la règle de composition avec u(x)=2x : u' × e^u."
  },
  {
    "id": "q-95",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "derivation",
    "topicLabel": "Dérivation avancée",
    "difficulty": "easy",
    "question": "Que permet d'étudier le signe de la dérivée ?",
    "options": [
      "L'aire",
      "Les variations de la fonction",
      "Les limites",
      "La convexité"
    ],
    "correctOptionIndex": 1,
    "explanation": "Signe de f' = variations de f."
  },
  {
    "id": "q-96",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "logarithme",
    "topicLabel": "Logarithme ln",
    "difficulty": "easy",
    "question": "Ensemble de définition de ln(x) ?",
    "options": [
      "R",
      "R*",
      "[0 ; +∞[",
      "]0 ; +∞["
    ],
    "correctOptionIndex": 3,
    "explanation": "Le logarithme népérien n'est défini que pour les réels strictement positifs."
  },
  {
    "id": "q-97",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "logarithme",
    "topicLabel": "Logarithme ln",
    "difficulty": "medium",
    "question": "Propriété fondamentale : ln(a × b) = ?",
    "options": [
      "ln(a) × ln(b)",
      "ln(a) + ln(b)",
      "a + b",
      "e^(a+b)"
    ],
    "correctOptionIndex": 1,
    "explanation": "Le log transforme les produits en sommes."
  },
  {
    "id": "q-98",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "logarithme",
    "topicLabel": "Logarithme ln",
    "difficulty": "easy",
    "question": "Que vaut ln(e) ?",
    "options": [
      "0",
      "1",
      "e",
      "n'existe pas"
    ],
    "correctOptionIndex": 1,
    "explanation": "La fonction ln et la fonction exp sont réciproques, donc ln(e^1) = 1."
  },
  {
    "id": "q-99",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "logarithme",
    "topicLabel": "Logarithme ln",
    "difficulty": "medium",
    "question": "Que vaut ln(1) ?",
    "options": [
      "0",
      "1",
      "e",
      "n'existe pas"
    ],
    "correctOptionIndex": 0,
    "explanation": "C'est la racine de la fonction ln : e^0 = 1 donc ln(1) = 0."
  },
  {
    "id": "q-100",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "logarithme",
    "topicLabel": "Logarithme ln",
    "difficulty": "hard",
    "question": "Dérivée de ln(u(x)) ?",
    "options": [
      "1 / u(x)",
      "u'(x) / u(x)",
      "u'(x) × ln(u(x))",
      "e^(u(x))"
    ],
    "correctOptionIndex": 1,
    "explanation": "Application de la dérivée des fonctions composées avec ln'(x)=1/x."
  },
  {
    "id": "q-101",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "logarithme",
    "topicLabel": "Logarithme ln",
    "difficulty": "hard",
    "question": "Limite de ln(x) quand x tend vers 0 (x>0) ?",
    "options": [
      "0",
      "+∞",
      "-∞",
      "1"
    ],
    "correctOptionIndex": 2,
    "explanation": "La courbe plonge vers le bas pour se rapprocher de l'axe des ordonnées."
  },
  {
    "id": "q-102",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "exponentielle",
    "topicLabel": "Exponentielle",
    "difficulty": "easy",
    "question": "L'exponentielle e^x est toujours :",
    "options": [
      "Strictement positive",
      "Positive ou nulle",
      "Peut être négative",
      "Dépend de x"
    ],
    "correctOptionIndex": 0,
    "explanation": "Pour tout réel x, e^x > 0."
  },
  {
    "id": "q-103",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "exponentielle",
    "topicLabel": "Exponentielle",
    "difficulty": "medium",
    "question": "Propriété : e^(a) × e^(b) = ?",
    "options": [
      "e^(a×b)",
      "e^(a+b)",
      "e^(a) + e^(b)",
      "a×b"
    ],
    "correctOptionIndex": 1,
    "explanation": "L'exponentielle transforme les sommes en produits."
  },
  {
    "id": "q-104",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "exponentielle",
    "topicLabel": "Exponentielle",
    "difficulty": "easy",
    "question": "Dérivée de f(x) = e^x ?",
    "options": [
      "x e^(x-1)",
      "ln(x)",
      "e^x",
      "e"
    ],
    "correctOptionIndex": 2,
    "explanation": "C'est la seule fonction usuelle (avec ses multiples) qui est sa propre dérivée."
  },
  {
    "id": "q-105",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "exponentielle",
    "topicLabel": "Exponentielle",
    "difficulty": "hard",
    "question": "Limite de e^x / x quand x tend vers +∞ ?",
    "options": [
      "0",
      "+∞",
      "1",
      "e"
    ],
    "correctOptionIndex": 1,
    "explanation": "Croissance comparée : l'exponentielle 'l'emporte' toujours sur les polynômes en +∞."
  },
  {
    "id": "q-106",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "exponentielle",
    "topicLabel": "Exponentielle",
    "difficulty": "medium",
    "question": "Que vaut e^0 ?",
    "options": [
      "e",
      "0",
      "1",
      "n'existe pas"
    ],
    "correctOptionIndex": 2,
    "explanation": "N'importe quel nombre non nul à la puissance 0 donne 1."
  },
  {
    "id": "q-107",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "exponentielle",
    "topicLabel": "Exponentielle",
    "difficulty": "hard",
    "question": "Quelle équation différentielle vérifie y = e^x ?",
    "options": [
      "y' = 0",
      "y' = y",
      "y'' = -y",
      "y' = x"
    ],
    "correctOptionIndex": 1,
    "explanation": "Puisque la dérivée de l'exponentielle est elle-même, on a bien f'(x) = f(x)."
  },
  {
    "id": "q-108",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "probabilites",
    "topicLabel": "Probabilités",
    "difficulty": "easy",
    "question": "Dans une loi binomiale B(n,p), que représentent n et p ?",
    "options": [
      "Essais, succès",
      "Succès, échecs",
      "Échantillon, variance",
      "Rien"
    ],
    "correctOptionIndex": 0,
    "explanation": "n est le nombre de répétitions identiques et indépendantes, p la probabilité de succès."
  },
  {
    "id": "q-109",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "probabilites",
    "topicLabel": "Probabilités",
    "difficulty": "medium",
    "question": "Espérance d'une loi binomiale B(n,p) ?",
    "options": [
      "n / p",
      "n × p",
      "n × p(1-p)",
      "p^n"
    ],
    "correctOptionIndex": 1,
    "explanation": "C'est le nombre moyen de succès que l'on peut attendre sur n essais."
  },
  {
    "id": "q-110",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "probabilites",
    "topicLabel": "Probabilités",
    "difficulty": "medium",
    "question": "Loi uniforme sur [a,b]. P(c <= X <= d) = ?",
    "options": [
      "(d-c)/(b-a)",
      "(b-a)/(d-c)",
      "(d+c)/2",
      "1"
    ],
    "correctOptionIndex": 0,
    "explanation": "C'est la longueur de l'intervalle cible divisée par la longueur de l'intervalle total."
  },
  {
    "id": "q-111",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "probabilites",
    "topicLabel": "Probabilités",
    "difficulty": "hard",
    "question": "Que vaut la variance d'une loi binomiale B(n,p) ?",
    "options": [
      "n.p",
      "n.p(1-p)",
      "√np",
      "p(1-p)/n"
    ],
    "correctOptionIndex": 1,
    "explanation": "V(X) = n×p×q (avec q = 1-p)."
  },
  {
    "id": "q-112",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "probabilites",
    "topicLabel": "Probabilités",
    "difficulty": "hard",
    "question": "Schéma de Bernoulli ?",
    "options": [
      "Une épreuve à 2 issues",
      "Une épreuve infinie",
      "Un tirage sans remise",
      "Une fonction"
    ],
    "correctOptionIndex": 0,
    "explanation": "Succès ou Échec, c'est la base de la loi binomiale."
  },
  {
    "id": "q-113",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "probabilites",
    "topicLabel": "Probabilités",
    "difficulty": "medium",
    "question": "Que représente (n k) ou 'k parmi n' ?",
    "options": [
      "Nombre de chemins avec k succès",
      "Probabilité de k succès",
      "n divisé par k",
      "k à la puissance n"
    ],
    "correctOptionIndex": 0,
    "explanation": "C'est le coefficient binomial : le nombre d'agencements possibles pour k succès parmi n essais."
  },
  {
    "id": "q-114",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "probabilites",
    "topicLabel": "Probabilités",
    "difficulty": "hard",
    "question": "Si X suit B(10, 0.5), que vaut P(X=0) ?",
    "options": [
      "0.5^10",
      "10×0.5",
      "0",
      "1"
    ],
    "correctOptionIndex": 0,
    "explanation": "C'est faire 10 échecs de suite : (1-0.5)^10 = 0.5^10."
  },
  {
    "id": "q-115",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "integrales",
    "topicLabel": "Intégrales simples",
    "difficulty": "easy",
    "question": "Que représente géométriquement l'intégrale de a à b de f(x) (f > 0) ?",
    "options": [
      "La dérivée",
      "L'aire sous la courbe",
      "Le volume",
      "La tangente"
    ],
    "correctOptionIndex": 1,
    "explanation": "Pour une fonction positive, c'est l'aire du domaine sous la courbe entre a et b."
  },
  {
    "id": "q-116",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "integrales",
    "topicLabel": "Intégrales simples",
    "difficulty": "medium",
    "question": "Relation entre intégrale et primitive F de f ?",
    "options": [
      "F(a) - F(b)",
      "F(b) - F(a)",
      "F(a×b)",
      "F'(b) - F'(a)"
    ],
    "correctOptionIndex": 1,
    "explanation": "Théorème fondamental de l'analyse : l'intégrale de a à b est F(b) - F(a)."
  },
  {
    "id": "q-117",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "integrales",
    "topicLabel": "Intégrales simples",
    "difficulty": "easy",
    "question": "Une primitive de f(x) = 2x est :",
    "options": [
      "2",
      "x²",
      "2x²",
      "x"
    ],
    "correctOptionIndex": 1,
    "explanation": "Quand on dérive x², on retrouve bien 2x."
  },
  {
    "id": "q-118",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "integrales",
    "topicLabel": "Intégrales simples",
    "difficulty": "medium",
    "question": "Une primitive de f(x) = e^x est :",
    "options": [
      "e^x",
      "x.e^x",
      "e^x / 2",
      "ln(x)"
    ],
    "correctOptionIndex": 0,
    "explanation": "Comme la dérivée de exp est exp, une primitive de exp est aussi exp."
  },
  {
    "id": "q-119",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "integrales",
    "topicLabel": "Intégrales simples",
    "difficulty": "hard",
    "question": "Propriété de linéarité : intégrale de (f+g) = ?",
    "options": [
      "int(f) × int(g)",
      "int(f) + int(g)",
      "int(f-g)",
      "f(b) + g(a)"
    ],
    "correctOptionIndex": 1,
    "explanation": "L'intégrale de la somme est la somme des intégrales."
  },
  {
    "id": "q-120",
    "examGoal": "terminale",
    "levelLabel": "Terminale (Bêta)",
    "topic": "integrales",
    "topicLabel": "Intégrales simples",
    "difficulty": "hard",
    "question": "Une primitive de f(x) = 1/x (pour x > 0) est :",
    "options": [
      "-1/x²",
      "ln(x)",
      "e^x",
      "x²"
    ],
    "correctOptionIndex": 1,
    "explanation": "La dérivée de ln(x) étant 1/x, une primitive de 1/x est ln(x)."
  }
];

// ---------------------------------------------------------
// HELPERS
// ---------------------------------------------------------

export function getQuestionsByExamGoal(goal: ExamGoal): Question[] {
  return questions.filter((q) => q.examGoal === goal);
}

export function getQuestionsByTopic(goal: ExamGoal, topic: string): Question[] {
  return questions.filter((q) => q.examGoal === goal && q.topic === topic);
}

export function getAvailableTopics(goal: ExamGoal): { topic: string; label: string; count: number }[] {
  const filtered = getQuestionsByExamGoal(goal);
  
  const topicMap = new Map<string, { label: string; count: number }>();
  
  filtered.forEach((q) => {
    if (!topicMap.has(q.topic)) {
      topicMap.set(q.topic, { label: q.topicLabel, count: 0 });
    }
    topicMap.get(q.topic)!.count++;
  });

  return Array.from(topicMap.entries()).map(([topic, data]) => ({
    topic,
    label: data.label,
    count: data.count
  }));
}

export function pickRandomQuestions(sourceList: Question[], count: number): Question[] {
  const shuffled = [...sourceList].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
