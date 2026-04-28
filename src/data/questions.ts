export type Question = {
  id: string;
  examGoal: "brevet" | "bac-premiere";
  topic: string;
  difficulty: "easy" | "medium";
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
};

export const questions: Question[] = [
  // --- BREVET ---
  {
    id: "br-1",
    examGoal: "brevet",
    topic: "fractions",
    difficulty: "easy",
    question: "Calculer : 2/3 + 1/4",
    options: ["3/7", "8/12", "11/12", "3/12"],
    correctOptionIndex: 2,
    explanation: "Pour additionner, on met au même dénominateur : (2×4)/(3×4) + (1×3)/(4×3) = 8/12 + 3/12 = 11/12."
  },
  {
    id: "br-2",
    examGoal: "brevet",
    topic: "calcul littéral",
    difficulty: "easy",
    question: "Développer : (x + 3)²",
    options: ["x² + 9", "x² + 6x + 9", "x² + 3x + 9", "2x + 6"],
    correctOptionIndex: 1,
    explanation: "C'est une identité remarquable : (a+b)² = a² + 2ab + b². Ici : x² + 2(x)(3) + 3² = x² + 6x + 9."
  },
  {
    id: "br-3",
    examGoal: "brevet",
    topic: "équations",
    difficulty: "medium",
    question: "Résoudre : 3x - 5 = 10",
    options: ["x = 5", "x = 15", "x = 3", "x = 10"],
    correctOptionIndex: 0,
    explanation: "On isole x : 3x = 10 + 5 -> 3x = 15 -> x = 15/3 = 5."
  },
  {
    id: "br-4",
    examGoal: "brevet",
    topic: "fonctions simples",
    difficulty: "easy",
    question: "Soit f(x) = 2x - 4. Quelle est l'image de 3 ?",
    options: ["2", "-4", "10", "-2"],
    correctOptionIndex: 0,
    explanation: "On remplace x par 3 : f(3) = 2×3 - 4 = 6 - 4 = 2."
  },
  {
    id: "br-5",
    examGoal: "brevet",
    topic: "probabilités",
    difficulty: "medium",
    question: "Dans une urne : 3 boules rouges, 2 bleues. On en tire une au hasard. Quelle est la probabilité d'avoir une rouge ?",
    options: ["3/2", "3/5", "2/5", "1/3"],
    correctOptionIndex: 1,
    explanation: "Il y a 3 boules rouges pour 5 boules au total (3+2). La probabilité est donc de 3/5."
  },
  {
    id: "br-6",
    examGoal: "brevet",
    topic: "calcul littéral",
    difficulty: "medium",
    question: "Factoriser : x² - 25",
    options: ["(x - 5)²", "(x - 5)(x + 5)", "x(x - 25)", "(x - 25)(x + 1)"],
    correctOptionIndex: 1,
    explanation: "Identité remarquable a² - b² = (a-b)(a+b). Ici a=x et b=5, donc (x-5)(x+5)."
  },
  {
    id: "br-7",
    examGoal: "brevet",
    topic: "équations",
    difficulty: "easy",
    question: "Résoudre : 2x = 8",
    options: ["x = 4", "x = 6", "x = 10", "x = 16"],
    correctOptionIndex: 0,
    explanation: "On divise par 2 de chaque côté : x = 8/2 = 4."
  },
  {
    id: "br-8",
    examGoal: "brevet",
    topic: "statistiques",
    difficulty: "easy",
    question: "Quelle est la moyenne des notes : 10, 12, 14 ?",
    options: ["10", "11", "12", "13"],
    correctOptionIndex: 2,
    explanation: "On additionne tout puis on divise par 3 : (10+12+14)/3 = 36/3 = 12."
  },
  {
    id: "br-9",
    examGoal: "brevet",
    topic: "fractions",
    difficulty: "medium",
    question: "Calculer : 3/5 × 10/9",
    options: ["13/14", "30/45", "2/3", "1/2"],
    correctOptionIndex: 2,
    explanation: "On multiplie les numérateurs et dénominateurs : (3×10)/(5×9) = 30/45. En simplifiant par 15, on obtient 2/3."
  },
  {
    id: "br-10",
    examGoal: "brevet",
    topic: "fonctions simples",
    difficulty: "medium",
    question: "Soit g(x) = -x + 5. Quel est l'antécédent de 2 ?",
    options: ["3", "-3", "7", "-7"],
    correctOptionIndex: 0,
    explanation: "On résout -x + 5 = 2. Donc -x = 2 - 5 = -3. Et donc x = 3."
  },

  // --- BAC PREMIERE ---
  {
    id: "bac-1",
    examGoal: "bac-premiere",
    topic: "second degré",
    difficulty: "easy",
    question: "Quelle est la formule du discriminant Δ pour ax² + bx + c = 0 ?",
    options: ["b² - 4ac", "4ac - b²", "b - 4ac", "b² + 4ac"],
    correctOptionIndex: 0,
    explanation: "Par définition, le discriminant est Δ = b² - 4ac."
  },
  {
    id: "bac-2",
    examGoal: "bac-premiere",
    topic: "second degré",
    difficulty: "medium",
    question: "Si Δ > 0, combien de solutions réelles a l'équation ax² + bx + c = 0 ?",
    options: ["Aucune", "1", "2", "Une infinité"],
    correctOptionIndex: 2,
    explanation: "Si Δ est strictement positif, le trinôme admet deux racines réelles distinctes."
  },
  {
    id: "bac-3",
    examGoal: "bac-premiere",
    topic: "dérivation",
    difficulty: "easy",
    question: "Quelle est la dérivée de f(x) = x³ ?",
    options: ["x²", "3x²", "3x", "x⁴/4"],
    correctOptionIndex: 1,
    explanation: "La dérivée de x^n est n*x^(n-1). Ici n=3, donc f'(x) = 3x²."
  },
  {
    id: "bac-4",
    examGoal: "bac-premiere",
    topic: "dérivation",
    difficulty: "medium",
    question: "Soit f(x) = 2x² + 3x - 1. Que vaut f'(1) ?",
    options: ["4", "7", "3", "5"],
    correctOptionIndex: 1,
    explanation: "On dérive : f'(x) = 4x + 3. On calcule en 1 : f'(1) = 4(1) + 3 = 7."
  },
  {
    id: "bac-5",
    examGoal: "bac-premiere",
    topic: "suites simples",
    difficulty: "easy",
    question: "Soit u(n) géométrique de raison q=2 et u(0)=3. Que vaut u(2) ?",
    options: ["6", "9", "12", "15"],
    correctOptionIndex: 2,
    explanation: "u(n) = u(0) × q^n. Donc u(2) = 3 × 2² = 3 × 4 = 12."
  },
  {
    id: "bac-6",
    examGoal: "bac-premiere",
    topic: "suites simples",
    difficulty: "medium",
    question: "Soit v(n) arithmétique de raison r=5 et v(0)=2. Exprimer v(n).",
    options: ["v(n) = 2n + 5", "v(n) = 2 × 5^n", "v(n) = 5n + 2", "v(n) = n + 7"],
    correctOptionIndex: 2,
    explanation: "Pour une suite arithmétique, v(n) = v(0) + n×r. Donc v(n) = 2 + 5n = 5n + 2."
  },
  {
    id: "bac-7",
    examGoal: "bac-premiere",
    topic: "probabilités",
    difficulty: "easy",
    question: "P(A ∪ B) est égale à :",
    options: ["P(A) + P(B)", "P(A) × P(B)", "P(A) + P(B) - P(A ∩ B)", "P(A ∩ B)"],
    correctOptionIndex: 2,
    explanation: "C'est la formule des probabilités totales : on additionne les probabilités et on soustrait l'intersection comptée deux fois."
  },
  {
    id: "bac-8",
    examGoal: "bac-premiere",
    topic: "probabilités",
    difficulty: "medium",
    question: "Si A et B sont indépendants, que vaut P(A ∩ B) ?",
    options: ["P(A) + P(B)", "P(A) × P(B)", "P(A) / P(B)", "0"],
    correctOptionIndex: 1,
    explanation: "Deux événements sont indépendants si la probabilité de leur intersection est le produit de leurs probabilités."
  },
  {
    id: "bac-9",
    examGoal: "bac-premiere",
    topic: "fonctions",
    difficulty: "medium",
    question: "Quel est l'ensemble de définition de f(x) = 1/x ?",
    options: ["R", "R+", "R*", "[-1; 1]"],
    correctOptionIndex: 2,
    explanation: "On ne peut pas diviser par 0, donc le domaine est R sans 0 (noté R*)."
  },
  {
    id: "bac-10",
    examGoal: "bac-premiere",
    topic: "second degré",
    difficulty: "medium",
    question: "Trouver les racines de x² - 4 = 0",
    options: ["{2}", "{-2}", "{-2; 2}", "{4}"],
    correctOptionIndex: 2,
    explanation: "x² = 4 donc x = √4 ou x = -√4, c'est-à-dire x = 2 ou x = -2."
  }
];
