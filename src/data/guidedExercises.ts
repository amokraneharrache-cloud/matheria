export type GuidedExerciseStep = {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
};

export type GuidedExercise = {
  id: string;
  examGoal: "terminale" | "bac-premiere" | "brevet";
  title: string;
  subtitle: string;
  topic: string;
  topicLabel: string;
  estimatedMinutes: number;
  difficulty: "medium" | "hard";
  intro: string;
  steps: GuidedExerciseStep[];
  finalMethod: string[];
};

export const guidedExercises: GuidedExercise[] = [
  {
    id: "term-suites-1",
    examGoal: "terminale",
    title: "Étude d'une suite définie par récurrence",
    subtitle: "Montrer qu'une suite est géométrique",
    topic: "suites",
    topicLabel: "Suites",
    estimatedMinutes: 10,
    difficulty: "medium",
    intro: "On considère la suite (u_n) définie par u_0 = 2 et pour tout entier naturel n, u_{n+1} = 0,5 * u_n + 3. On pose v_n = u_n - 6.",
    steps: [
      {
        id: "step-1",
        question: "Exprimer v_{n+1} en fonction de u_{n+1}.",
        options: ["v_{n+1} = u_{n+1} - 6", "v_{n+1} = u_n - 6", "v_{n+1} = u_{n+1} + 6", "v_{n+1} = u_{n+1}"],
        correctOptionIndex: 0,
        explanation: "Puisque v_n = u_n - 6 pour tout n, la relation est vraie au rang n+1 : v_{n+1} = u_{n+1} - 6."
      },
      {
        id: "step-2",
        question: "En remplaçant u_{n+1} par son expression, quelle est la formule de v_{n+1} en fonction de u_n ?",
        options: ["v_{n+1} = 0,5 * u_n - 3", "v_{n+1} = 0,5 * u_n + 3", "v_{n+1} = 0,5 * u_n", "v_{n+1} = u_{n+1}"],
        correctOptionIndex: 0,
        explanation: "v_{n+1} = (0,5 * u_n + 3) - 6 = 0,5 * u_n - 3."
      },
      {
        id: "step-3",
        question: "Factoriser l'expression obtenue par 0,5 pour faire apparaître v_n.",
        options: ["0,5 * (u_n - 6)", "0,5 * (u_n + 3)", "0,5 * (u_n - 3)", "v_{n+1} = -0,5 * u_n"],
        correctOptionIndex: 0,
        explanation: "0,5 * u_n - 3 = 0,5 * (u_n - 3 / 0,5) = 0,5 * (u_n - 6), on retrouve bien v_n dans la parenthèse."
      },
      {
        id: "step-4",
        question: "Quelle est la nature de la suite (v_n) ?",
        options: ["Arithmétique de raison 0,5", "Géométrique de raison 0,5", "Géométrique de raison 6", "v_{n+1} = -0,5 * u_n"],
        correctOptionIndex: 1,
        explanation: "Puisque v_{n+1} = 0,5 * v_n, la suite (v_n) est géométrique de raison q = 0,5."
      },
      {
        id: "step-5",
        question: "Calculer le premier terme v_0.",
        options: ["-4", "4", "-3", "Aucune des réponses"],
        correctOptionIndex: 0,
        explanation: "v_0 = u_0 - 6 = 2 - 6 = -4."
      }
    ],
    finalMethod: [
      "Poser l'expression de v_{n+1}",
      "Remplacer u_{n+1} par sa définition",
      "Simplifier l'expression",
      "Factoriser par le coefficient devant u_n pour retrouver v_n",
      "Conclure sur la nature de la suite (géométrique de raison q) et calculer v_0"
    ]
  },
  {
    id: "term-limites-1",
    examGoal: "terminale",
    title: "Levée d'une forme indéterminée",
    subtitle: "Limite en l'infini avec factorisation",
    topic: "limites",
    topicLabel: "Limites",
    estimatedMinutes: 8,
    difficulty: "medium",
    intro: "On cherche à déterminer la limite quand x tend vers +∞ de la fonction f(x) = (2x² - 3x + 1) / (x² + 5).",
    steps: [
      {
        id: "step-1",
        question: "Quelle est la limite du numérateur et du dénominateur quand x tend vers +∞ ?",
        options: ["Les deux tendent vers 0", "Les deux tendent vers +∞", "Le numérateur tend vers +∞, le dénominateur vers 0", "Aucune des réponses"],
        correctOptionIndex: 1,
        explanation: "En +∞, 2x² et x² tendent vers +∞. C'est une forme indéterminée du type '∞ / ∞'."
      },
      {
        id: "step-2",
        question: "Pour lever l'indétermination, par quel terme doit-on factoriser au numérateur ?",
        options: ["Par x", "Par x²", "Par 2x²", "Aucune des réponses"],
        correctOptionIndex: 1,
        explanation: "On factorise toujours par le terme de plus haut degré, ici x²."
      },
      {
        id: "step-3",
        question: "Quelle est l'expression factorisée de f(x) ?",
        options: ["(x²(2 - 3/x + 1/x²)) / (x²(1 + 5/x²))", "(x(2x - 3)) / (x(x + 5/x))", "(2x²) / (x²)", "Par 3x²"],
        correctOptionIndex: 0,
        explanation: "On met x² en facteur en haut et en bas : x²(2 - 3/x + 1/x²) / x²(1 + 5/x²)."
      },
      {
        id: "step-4",
        question: "Après simplification par x², que deviennent les termes en 1/x et 1/x² quand x tend vers +∞ ?",
        options: ["Ils tendent vers +∞", "Ils tendent vers 1", "Ils tendent vers 0", "Aucune des réponses"],
        correctOptionIndex: 2,
        explanation: "Les limites de 3/x, 1/x² et 5/x² en +∞ sont égales à 0."
      },
      {
        id: "step-5",
        question: "En déduire la limite de f(x) en +∞.",
        options: ["0", "1", "2", "10"],
        correctOptionIndex: 2,
        explanation: "En remplaçant les termes en 1/x par 0, il reste 2 / 1 = 2."
      }
    ],
    finalMethod: [
      "Identifier la forme indéterminée (ici ∞/∞)",
      "Factoriser par le terme de plus haut degré (ici x²)",
      "Simplifier la fraction (barrer x²)",
      "Utiliser les limites de référence (1/x, 1/x² tendent vers 0)",
      "Conclure par opérations sur les limites"
    ]
  },
  {
    id: "term-derivation-1",
    examGoal: "terminale",
    title: "Dérivation d'un produit",
    subtitle: "Utilisation de la formule (uv)'",
    topic: "derivation",
    topicLabel: "Dérivation",
    estimatedMinutes: 8,
    difficulty: "medium",
    intro: "On considère la fonction f définie sur R par f(x) = (2x + 1) * e^x. On cherche à calculer f'(x).",
    steps: [
      {
        id: "step-1",
        question: "Sous quelle forme se présente la fonction f ?",
        options: ["u / v", "u + v", "u * v", "Aucune des réponses"],
        correctOptionIndex: 2,
        explanation: "C'est un produit de deux fonctions : u(x) = 2x+1 et v(x) = e^x."
      },
      {
        id: "step-2",
        question: "Quelle est la formule de dérivation d'un produit ?",
        options: ["u' * v'", "u'v + uv'", "u'v - uv'", "Aucune des réponses"],
        correctOptionIndex: 1,
        explanation: "La dérivée d'un produit uv est u'v + uv'."
      },
      {
        id: "step-3",
        question: "Quelles sont les dérivées u'(x) et v'(x) ?",
        options: ["u'(x)=2, v'(x)=e^x", "u'(x)=2x, v'(x)=e^x", "u'(x)=2, v'(x)=1", "e^x * (x - 1)"],
        correctOptionIndex: 0,
        explanation: "La dérivée de 2x+1 est 2. La dérivée de e^x est e^x."
      },
      {
        id: "step-4",
        question: "Appliquer la formule pour obtenir f'(x).",
        options: ["2 * e^x + (2x+1) * e^x", "2 * e^x", "2 * e^x - (2x+1) * e^x", "e^x * (x - 1)"],
        correctOptionIndex: 0,
        explanation: "On remplace dans u'v + uv' : 2 * e^x + (2x+1) * e^x."
      },
      {
        id: "step-5",
        question: "Factoriser l'expression de f'(x) par e^x.",
        options: ["e^x * (2x + 1)", "e^x * (2x + 3)", "e^x * (2x + 2)", "e^x * (x - 1)"],
        correctOptionIndex: 1,
        explanation: "e^x * (2 + 2x + 1) = e^x * (2x + 3)."
      }
    ],
    finalMethod: [
      "Identifier les fonctions u et v",
      "Calculer séparément u' et v'",
      "Appliquer la formule (uv)' = u'v + uv'",
      "Rassembler les termes",
      "Factoriser, très souvent par l'exponentielle e^x, pour faciliter l'étude de signe"
    ]
  },
  {
    id: "term-convexite-1",
    examGoal: "terminale",
    title: "Étude de la convexité",
    subtitle: "Dérivée seconde et point d'inflexion",
    topic: "convexite",
    topicLabel: "Convexité",
    estimatedMinutes: 10,
    difficulty: "hard",
    intro: "Soit f(x) = x³ - 6x² + 9x + 2. On souhaite étudier sa convexité et trouver son point d'inflexion.",
    steps: [
      {
        id: "step-1",
        question: "Que doit-on calculer pour étudier la convexité d'une fonction ?",
        options: ["La dérivée f'(x)", "La dérivée seconde f''(x)", "La limite de f(x)", "Aucune des réponses"],
        correctOptionIndex: 1,
        explanation: "La convexité se lit sur le signe de la dérivée seconde f''(x)."
      },
      {
        id: "step-2",
        question: "Calculer la dérivée première f'(x).",
        options: ["3x² - 12x + 9", "3x² - 6x + 9", "x² - 12x + 9", "Par 3x²"],
        correctOptionIndex: 0,
        explanation: "La dérivée de x³ est 3x², celle de -6x² est -12x, et celle de 9x est 9."
      },
      {
        id: "step-3",
        question: "Calculer la dérivée seconde f''(x).",
        options: ["6x - 12", "6x - 6", "3x - 12", "Aucune des réponses"],
        correctOptionIndex: 0,
        explanation: "On dérive f'(x) : la dérivée de 3x² est 6x, celle de -12x est -12."
      },
      {
        id: "step-4",
        question: "Résoudre f''(x) = 0 pour trouver l'abscisse du point d'inflexion.",
        options: ["x = -2", "x = 2", "x = 12", "Aucune des réponses"],
        correctOptionIndex: 1,
        explanation: "6x - 12 = 0 <=> 6x = 12 <=> x = 2."
      },
      {
        id: "step-5",
        question: "Étudier le signe de f''(x) et conclure sur la convexité.",
        options: ["Concave puis convexe", "Convexe puis concave", "Toujours convexe", "Aucune des réponses"],
        correctOptionIndex: 0,
        explanation: "6x - 12 < 0 pour x < 2 (concave) et 6x - 12 > 0 pour x > 2 (convexe). La fonction change de convexité en x = 2, c'est un point d'inflexion."
      }
    ],
    finalMethod: [
      "Calculer la dérivée première f'(x)",
      "Dériver à nouveau pour obtenir la dérivée seconde f''(x)",
      "Résoudre f''(x) = 0",
      "Faire un tableau de signe de f''(x)",
      "Conclure : f'' > 0 implique convexe, f'' < 0 implique concave. Un changement de signe indique un point d'inflexion."
    ]
  },
  {
    id: "term-logarithme-1",
    examGoal: "terminale",
    title: "Résolution d'équation avec ln",
    subtitle: "Domaine de définition et propriétés",
    topic: "logarithme",
    topicLabel: "Logarithme",
    estimatedMinutes: 8,
    difficulty: "medium",
    intro: "On cherche à résoudre l'équation : ln(x - 1) + ln(x + 2) = ln(4).",
    steps: [
      {
        id: "step-1",
        question: "Quelle est la première étape indispensable avant de résoudre une équation avec ln ?",
        options: ["Passer à l'exponentielle", "Trouver l'ensemble de définition", "Additionner les x", "Aucune des réponses"],
        correctOptionIndex: 1,
        explanation: "Il faut s'assurer que l'intérieur des logarithmes est strictement positif."
      },
      {
        id: "step-2",
        question: "Quel est l'ensemble de définition de cette équation ?",
        options: ["x > 1", "x > -2", "x > 0", "Aucune des réponses"],
        correctOptionIndex: 0,
        explanation: "Il faut x - 1 > 0 (x > 1) ET x + 2 > 0 (x > -2). L'intersection donne x > 1, soit ]1 ; +∞[."
      },
      {
        id: "step-3",
        question: "Quelle propriété permet de regrouper la somme des logarithmes ?",
        options: ["ln(a) + ln(b) = ln(a+b)", "ln(a) + ln(b) = ln(a*b)", "ln(a) + ln(b) = a*b", "ln(x) = 4"],
        correctOptionIndex: 1,
        explanation: "La propriété fondamentale est ln(a) + ln(b) = ln(a*b)."
      },
      {
        id: "step-4",
        question: "En appliquant la propriété, quelle équation obtient-on ?",
        options: ["ln((x-1)*(x+2)) = ln(4)", "ln(2x+1) = ln(4)", "ln((x-1)/(x+2)) = ln(4)", "ln(x) = 4"],
        correctOptionIndex: 0,
        explanation: "On obtient bien ln((x-1)(x+2)) = ln(4)."
      },
      {
        id: "step-5",
        question: "Que donne l'équation sans les logarithmes (par bijection) ?",
        options: ["x² + x - 2 = 4", "x² - x + 2 = 4", "2x + 1 = 4", "Par 3x²"],
        correctOptionIndex: 0,
        explanation: "On développe (x-1)(x+2) = x² + 2x - x - 2 = x² + x - 2. D'où x² + x - 2 = 4."
      },
      {
        id: "step-6",
        question: "Résoudre x² + x - 6 = 0 et valider avec l'ensemble de définition.",
        options: ["x = -3 et x = 2, la solution est 2", "x = -3 et x = 2, les deux sont solutions", "x = 3 et x = -2, la solution est 3", "Aucune des réponses"],
        correctOptionIndex: 0,
        explanation: "Les racines sont -3 et 2. Or on a vu que x doit être > 1. Donc seule la solution x = 2 est conservée."
      }
    ],
    finalMethod: [
      "Déterminer l'ensemble de définition (conditions intérieur > 0)",
      "Utiliser ln(a) + ln(b) = ln(ab) pour regrouper",
      "Égaler les intérieurs : ln(A) = ln(B) <=> A = B",
      "Développer et résoudre l'équation polynomiale",
      "Vérifier si les solutions appartiennent à l'ensemble de définition"
    ]
  },
  {
    id: "term-exponentielle-1",
    examGoal: "terminale",
    title: "Étude de fonction avec exponentielle",
    subtitle: "Variations et limites",
    topic: "exponentielle",
    topicLabel: "Exponentielle",
    estimatedMinutes: 10,
    difficulty: "hard",
    intro: "On considère la fonction f définie sur R par f(x) = (x - 2) * e^x.",
    steps: [
      {
        id: "step-1",
        question: "Calculer la limite de f(x) quand x tend vers +∞.",
        options: ["-∞", "+∞", "0", "Aucune des réponses"],
        correctOptionIndex: 1,
        explanation: "lim (x-2) = +∞ et lim e^x = +∞. Par produit, la limite est +∞."
      },
      {
        id: "step-2",
        question: "Calculer la limite en -∞ en développant f(x).",
        options: ["+∞", "-∞", "0", "Aucune des réponses"],
        correctOptionIndex: 2,
        explanation: "f(x) = x e^x - 2 e^x. Par croissances comparées, lim x e^x = 0 et lim e^x = 0 en -∞. Donc la limite est 0."
      },
      {
        id: "step-3",
        question: "Calculer f'(x).",
        options: ["e^x", "(x-1) * e^x", "(x-2) * e^x", "e^x * (x - 1)"],
        correctOptionIndex: 1,
        explanation: "f est de la forme uv. u=x-2, u'=1, v=e^x, v'=e^x. f'(x) = 1*e^x + (x-2)e^x = e^x(1 + x - 2) = (x-1)e^x."
      },
      {
        id: "step-4",
        question: "Quel est le signe de f'(x) ?",
        options: ["Du signe de e^x", "Du signe de x-1", "Toujours positif", "e^x * (x - 1)"],
        correctOptionIndex: 1,
        explanation: "Comme e^x > 0 pour tout x réel, le signe de f'(x) ne dépend que de (x-1)."
      },
      {
        id: "step-5",
        question: "En déduire les variations de f.",
        options: ["Décroissante sur R", "Croissante sur R", "Décroissante sur ]-∞ ; 1] puis croissante"],
        correctOptionIndex: 2,
        explanation: "x-1 < 0 pour x < 1 (f décroît) et x-1 > 0 pour x > 1 (f croît). Le minimum est atteint en x=1."
      }
    ],
    finalMethod: [
      "Calculer les limites aux bornes (penser aux croissances comparées en -∞)",
      "Dériver avec la formule (uv)'",
      "Factoriser la dérivée par e^x",
      "Étudier le signe du facteur polynomial car e^x > 0",
      "Dresser le tableau de variations en incluant les limites"
    ]
  },
  {
    id: "term-integrales-1",
    examGoal: "terminale",
    title: "Calcul d'une aire par intégration",
    subtitle: "Trouver une primitive",
    topic: "integrales",
    topicLabel: "Intégrales",
    estimatedMinutes: 8,
    difficulty: "medium",
    intro: "On souhaite calculer l'intégrale I de 0 à 1 de f(x) = 3x² - 4x + 2.",
    steps: [
      {
        id: "step-1",
        question: "Quelle est l'étape principale pour calculer une intégrale de polynôme ?",
        options: ["Dériver la fonction", "Trouver une primitive", "Calculer f(1) - f(0)", "Aucune des réponses"],
        correctOptionIndex: 1,
        explanation: "Le théorème fondamental de l'analyse demande de déterminer une primitive F(x)."
      },
      {
        id: "step-2",
        question: "Trouver une primitive F(x) de f(x).",
        options: ["F(x) = x³ - 2x² + 2x", "F(x) = 6x - 4", "F(x) = x³ - 4x² + 2x", "Par 3x²"],
        correctOptionIndex: 0,
        explanation: "Primitive de 3x² = x³. Primitive de -4x = -2x². Primitive de 2 = 2x."
      },
      {
        id: "step-3",
        question: "Comment utilise-t-on F(x) pour calculer l'intégrale de 0 à 1 ?",
        options: ["I = F(0) - F(1)", "I = F(1) - F(0)", "I = F(1) + F(0)", "Aucune des réponses"],
        correctOptionIndex: 1,
        explanation: "L'intégrale vaut F(borne supérieure) - F(borne inférieure), donc F(1) - F(0)."
      },
      {
        id: "step-4",
        question: "Calculer F(1).",
        options: ["1", "2", "3", "11"],
        correctOptionIndex: 0,
        explanation: "F(1) = 1³ - 2*(1)² + 2*(1) = 1 - 2 + 2 = 1."
      },
      {
        id: "step-5",
        question: "Calculer F(0) et en déduire la valeur de I.",
        options: ["F(0) = 0, I = 1", "F(0) = 2, I = -1", "F(0) = 1, I = 0", "Aucune des réponses"],
        correctOptionIndex: 0,
        explanation: "F(0) = 0. Donc I = 1 - 0 = 1. L'aire sous la courbe vaut 1 unité d'aire."
      }
    ],
    finalMethod: [
      "Identifier la fonction à intégrer",
      "Déterminer une primitive F(x) en utilisant le tableau des primitives",
      "Écrire la formule de l'intégrale : F(b) - F(a)",
      "Calculer séparément F(b) et F(a)",
      "Faire la soustraction pour obtenir le résultat final"
    ]
  },
  {
    id: "term-probabilites-1",
    examGoal: "terminale",
    title: "Arbre pondéré et probabilités totales",
    subtitle: "Probabilités conditionnelles",
    topic: "probabilites",
    topicLabel: "Probabilités",
    estimatedMinutes: 8,
    difficulty: "medium",
    intro: "Dans une usine, on fabrique des pièces. 20% viennent de la machine A, 80% de la machine B. 5% des pièces de A sont défectueuses (D) et 2% des pièces de B le sont.",
    steps: [
      {
        id: "step-1",
        question: "Que valent P(A) et P(B) ?",
        options: ["P(A)=0.5, P(B)=0.5", "P(A)=0.2, P(B)=0.8", "P(A)=0.8, P(B)=0.2", "P(A) * P(B)"],
        correctOptionIndex: 1,
        explanation: "20% correspond à une probabilité de 0.2 pour A, et 80% à 0.8 pour B."
      },
      {
        id: "step-2",
        question: "Que représente le 5% (0.05) dans l'énoncé ?",
        options: ["P(D)", "P_D(A) (Proba de A sachant D)", "P_A(D) (Proba de D sachant A)", "P(A) * P(B)"],
        correctOptionIndex: 2,
        explanation: "C'est la probabilité d'être défectueuse SACHANT qu'elle vient de la machine A."
      },
      {
        id: "step-3",
        question: "Comment calculer P(A ∩ D) ?",
        options: ["P(A) + P_A(D)", "P(A) * P_A(D)", "P(A) / P_A(D)", "P(A) * P(B)"],
        correctOptionIndex: 1,
        explanation: "La probabilité de l'intersection est le produit du chemin sur l'arbre : P(A) * P_A(D)."
      },
      {
        id: "step-4",
        question: "Calculer P(A ∩ D) et P(B ∩ D).",
        options: ["P(A∩D)=0.01, P(B∩D)=0.016", "P(A∩D)=0.1, P(B∩D)=0.16", "P(A∩D)=0.25, P(B∩D)=0.82", "P(A) * P(B)"],
        correctOptionIndex: 0,
        explanation: "P(A∩D) = 0.2 * 0.05 = 0.01. P(B∩D) = 0.8 * 0.02 = 0.016."
      },
      {
        id: "step-5",
        question: "Appliquer la formule des probabilités totales pour trouver P(D).",
        options: ["P(D) = 0.01 + 0.016 = 0.026", "P(D) = 0.01 * 0.016", "P(D) = 0.01 / 0.016", "P(A) * P(B)"],
        correctOptionIndex: 0,
        explanation: "P(D) = P(A∩D) + P(B∩D) = 0.01 + 0.016 = 0.026 (soit 2.6%)."
      }
    ],
    finalMethod: [
      "Traduire l'énoncé en probabilités (événements et conditionnements)",
      "Dessiner un arbre pondéré avec le premier niveau (A, B) et le second niveau (D, non D)",
      "Calculer les probabilités d'intersection (P(A∩D) = P(A)*P_A(D))",
      "Identifier les chemins qui mènent à l'événement cherché (D)",
      "Faire la somme des probabilités de ces chemins (Loi des probabilités totales)"
    ]
  },
  {
    id: "term-loi-binomiale-1",
    examGoal: "terminale",
    title: "Application de la loi binomiale",
    subtitle: "Paramètres et calculs",
    topic: "loi-binomiale",
    topicLabel: "Loi binomiale",
    estimatedMinutes: 8,
    difficulty: "medium",
    intro: "On lance 10 fois de suite une pièce truquée qui donne Pile avec une probabilité p = 0.3. X compte le nombre de Pile obtenus.",
    steps: [
      {
        id: "step-1",
        question: "Quelles sont les conditions pour utiliser une loi binomiale ?",
        options: ["Épreuve répétée 10 fois de manière dépendante", "Schéma de Bernoulli répété de manière identique et indépendante", "Variable continue", "Aucune des réponses"],
        correctOptionIndex: 1,
        explanation: "La loi binomiale nécessite la répétition d'une même épreuve de Bernoulli de façon indépendante."
      },
      {
        id: "step-2",
        question: "Quels sont les paramètres n et p de cette loi binomiale ?",
        options: ["n = 0.3, p = 10", "n = 10, p = 0.3", "n = 3, p = 0.5", "Aucune des réponses"],
        correctOptionIndex: 1,
        explanation: "n est le nombre d'essais (10) et p est la probabilité du succès (0.3)."
      },
      {
        id: "step-3",
        question: "Quelle est la formule générale de P(X = k) ?",
        options: ["(k parmi n) * p^k * (1-p)^(n-k)", "n * p * k", "p^k * (1-p)^(n-k)", "Aucune des réponses"],
        correctOptionIndex: 0,
        explanation: "C'est le coefficient binomial multiplié par la proba des succès et celle des échecs."
      },
      {
        id: "step-4",
        question: "Comment s'écrit P(X = 2) ?",
        options: ["(2 parmi 10) * 0.3^2 * 0.7^8", "(2 parmi 10) * 0.3^8 * 0.7^2", "10 * 0.3^2 * 0.7^8", "Aucune des réponses"],
        correctOptionIndex: 0,
        explanation: "k=2 succès (p=0.3) et n-k=8 échecs (1-p=0.7)."
      },
      {
        id: "step-5",
        question: "Quelle est l'espérance E(X) du nombre de Pile ?",
        options: ["3", "7", "3.33", "13"],
        correctOptionIndex: 0,
        explanation: "Pour une loi binomiale, E(X) = n * p = 10 * 0.3 = 3."
      }
    ],
    finalMethod: [
      "Justifier la loi binomiale (identique et indépendant, succès/échec)",
      "Identifier les paramètres n (essais) et p (proba succès)",
      "Utiliser la formule P(X=k) avec la calculatrice ou manuellement",
      "Faire attention aux questions du type P(X <= k) ou P(X >= 1) = 1 - P(X=0)",
      "Connaître la formule de l'espérance E(X) = np"
    ]
  },
  {
    id: "term-variables-aleatoires-1",
    examGoal: "terminale",
    title: "Loi de probabilité et Espérance",
    subtitle: "Variable aléatoire discrète",
    topic: "variables-aleatoires",
    topicLabel: "Variables aléatoires",
    estimatedMinutes: 8,
    difficulty: "medium",
    intro: "Un jeu consiste à tirer une boule. On gagne 10€ (proba 0.2), 5€ (proba 0.3) ou on perd 2€ (proba 0.5). X est le gain algébrique.",
    steps: [
      {
        id: "step-1",
        question: "Quelles sont les valeurs prises par la variable X ?",
        options: ["0.2, 0.3, 0.5", "10, 5, 2", "10, 5, -2", "Aucune des réponses"],
        correctOptionIndex: 2,
        explanation: "X représente le gain. Gagner 10€ -> X=10, perdre 2€ -> X=-2."
      },
      {
        id: "step-2",
        question: "Que doit-on vérifier sur les probabilités données ?",
        options: ["Qu'elles sont toutes positives", "Que leur produit vaut 1", "Que leur somme vaut 1", "Aucune des réponses"],
        correctOptionIndex: 2,
        explanation: "La somme des probabilités d'une loi de probabilité doit toujours faire 1 (0.2+0.3+0.5 = 1.0)."
      },
      {
        id: "step-3",
        question: "Quelle est la formule de l'espérance E(X) ?",
        options: ["La moyenne des valeurs de X", "La somme des x_i * P(X = x_i)", "La somme des probabilités", "Aucune des réponses"],
        correctOptionIndex: 1,
        explanation: "E(X) est la moyenne pondérée : on multiplie chaque valeur par sa probabilité et on additionne le tout."
      },
      {
        id: "step-4",
        question: "Calculer E(X).",
        options: ["2.5", "4.3", "13", "Aucune des réponses"],
        correctOptionIndex: 0,
        explanation: "E(X) = 10 * 0.2 + 5 * 0.3 + (-2) * 0.5 = 2 + 1.5 - 1 = 2.5."
      },
      {
        id: "step-5",
        question: "Comment interpréter E(X) = 2.5 ?",
        options: ["Sur une partie, on gagne exactement 2.5€", "Sur un grand nombre de parties, on gagne en moyenne 2.5€ par partie", "Le jeu est défavorable", "Aucune des réponses"],
        correctOptionIndex: 1,
        explanation: "L'espérance est un gain moyen théorique répété sur le long terme. Puisque E(X)>0, le jeu est favorable au joueur."
      }
    ],
    finalMethod: [
      "Identifier les valeurs possibles de X (x_i)",
      "Calculer la probabilité de chaque issue P(X=x_i)",
      "Vérifier que la somme des probabilités vaut 1 (faire un tableau)",
      "Appliquer la formule de l'espérance E(X) = Somme des (x_i * p_i)",
      "Interpréter le résultat : favorable (>0), équitable (=0) ou défavorable (<0)"
    ]
  },
  {
    id: "term-geometrie-espace-1",
    examGoal: "terminale",
    title: "Équation cartésienne d'un plan",
    subtitle: "Vecteur normal et produit scalaire",
    topic: "geometrie-espace",
    topicLabel: "Géométrie dans l'espace",
    estimatedMinutes: 10,
    difficulty: "hard",
    intro: "On donne le point A(1; 2; -3) et un vecteur normal n(2; -1; 4). On cherche l'équation cartésienne du plan (P) passant par A et normal à n.",
    steps: [
      {
        id: "step-1",
        question: "Quelle est la forme générale de l'équation d'un plan de vecteur normal n(a; b; c) ?",
        options: ["ax + by + cz + d = 0", "x/a + y/b + z/c = d", "a + bx + cy + dz = 0", "Aucune des réponses"],
        correctOptionIndex: 0,
        explanation: "Les coordonnées du vecteur normal donnent les coefficients a, b, c devant x, y, z."
      },
      {
        id: "step-2",
        question: "En remplaçant a, b, c par les coordonnées de n(2; -1; 4), que devient l'équation ?",
        options: ["x + 2y - 3z + d = 0", "2x - y + 4z + d = 0", "2x - y + 4z = 0", "Aucune des réponses"],
        correctOptionIndex: 1,
        explanation: "On obtient 2x - 1y + 4z + d = 0. Il reste à déterminer d."
      },
      {
        id: "step-3",
        question: "Comment utiliser le point A(1; 2; -3) pour trouver la constante d ?",
        options: ["On ajoute ses coordonnées à a, b, c", "On remplace x, y, z par les coordonnées de A dans l'équation", "d est la somme des coordonnées de A", "Aucune des réponses"],
        correctOptionIndex: 1,
        explanation: "Puisque A appartient au plan, ses coordonnées vérifient l'équation : 2(1) - (2) + 4(-3) + d = 0."
      },
      {
        id: "step-4",
        question: "Calculer la valeur de d.",
        options: ["12", "-12", "10", "22"],
        correctOptionIndex: 0,
        explanation: "2(1) - 2 - 12 + d = 0 <=> 2 - 2 - 12 + d = 0 <=> -12 + d = 0 <=> d = 12."
      },
      {
        id: "step-5",
        question: "Quelle est l'équation finale du plan (P) ?",
        options: ["2x - y + 4z + 12 = 0", "2x - y + 4z - 12 = 0", "x + 2y - 3z + 12 = 0", "Aucune des réponses"],
        correctOptionIndex: 0,
        explanation: "En remplaçant d par 12, on obtient bien 2x - y + 4z + 12 = 0."
      }
    ],
    finalMethod: [
      "Identifier les coordonnées (a,b,c) du vecteur normal n",
      "Écrire l'ébauche de l'équation : ax + by + cz + d = 0",
      "Identifier un point A(x_A, y_A, z_A) appartenant au plan",
      "Substituer les coordonnées de A dans x, y, z pour créer une équation d'inconnue d",
      "Isoler et calculer d, puis conclure avec l'équation complète"
    ]
  },
  {
    id: "term-equations-differentielles-1",
    examGoal: "terminale",
    title: "Résolution d'une équation différentielle",
    subtitle: "Type y' = ay + b",
    topic: "equations-differentielles",
    topicLabel: "Équations différentielles",
    estimatedMinutes: 8,
    difficulty: "medium",
    intro: "On veut résoudre l'équation différentielle (E) : y' = 3y - 6, avec la condition initiale y(0) = 5.",
    steps: [
      {
        id: "step-1",
        question: "Quel type d'équation différentielle a-t-on ?",
        options: ["y' = ay", "y' = ay + b", "y' = f(x)", "Aucune des réponses"],
        correctOptionIndex: 1,
        explanation: "C'est une équation de la forme y' = ay + b avec a = 3 et b = -6."
      },
      {
        id: "step-2",
        question: "Quelle est la forme générale des solutions d'une équation y' = ay + b ?",
        options: ["y(x) = C * e^(ax) - b/a", "y(x) = C * e^(ax) + b", "y(x) = e^(ax) - b/a", "Aucune des réponses"],
        correctOptionIndex: 0,
        explanation: "Le cours indique que les solutions sont de la forme f(x) = C * e^(ax) - b/a, où C est une constante réelle."
      },
      {
        id: "step-3",
        question: "Calculer le terme particulier -b/a.",
        options: ["-2", "2", "6/3", "Aucune des réponses"],
        correctOptionIndex: 1,
        explanation: "-b / a = -(-6) / 3 = 6 / 3 = 2."
      },
      {
        id: "step-4",
        question: "Donner l'expression générale des solutions de (E).",
        options: ["y(x) = C * e^(-3x) + 2", "y(x) = C * e^(3x) - 2", "y(x) = C * e^(3x) + 2", "Aucune des réponses"],
        correctOptionIndex: 2,
        explanation: "On remplace a=3 et -b/a=2 : y(x) = C * e^(3x) + 2."
      },
      {
        id: "step-5",
        question: "Utiliser la condition y(0) = 5 pour trouver la constante C.",
        options: ["C = 5", "C = 3", "C = 2", "Aucune des réponses"],
        correctOptionIndex: 1,
        explanation: "y(0) = C * e^(0) + 2 = C + 2. Or y(0) = 5, donc C + 2 = 5 <=> C = 3. La solution unique est y(x) = 3e^(3x) + 2."
      }
    ],
    finalMethod: [
      "Identifier les coefficients a et b dans la forme y' = ay + b",
      "Calculer la solution particulière constante : -b/a",
      "Écrire la forme générale : y(x) = C * e^(ax) - b/a",
      "Utiliser la condition initiale (ex: y(0) = y_0) en remplaçant x par la valeur",
      "Résoudre l'équation pour trouver C et écrire la solution finale"
    ]
  }
];
