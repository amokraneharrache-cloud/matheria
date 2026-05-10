export type MockBacSubject = {
  id: string;
  title: string;
  description: string;
  examGoal: "terminale";
  estimatedMinutes: number;
  exerciseIds: string[];
};

export const mockBacSubjects: MockBacSubject[] = [
  {
    id: "analyse-suites",
    title: "Sujet type bac — Analyse & suites",
    description:
      "Un entraînement guidé pour revoir suites, dérivation, limites et intégrales dans un format en quatre exercices.",
    examGoal: "terminale",
    estimatedMinutes: 35,
    exerciseIds: [
      "term-suites-1",
      "term-derivation-1",
      "term-limites-1",
      "term-integrales-1",
    ],
  },
  {
    id: "probabilites-fonctions",
    title: "Sujet type bac — Probabilités & fonctions",
    description:
      "Un sujet guidé pour enchaîner probabilités, convexité, logarithme et loi binomiale avec une note indicative /20.",
    examGoal: "terminale",
    estimatedMinutes: 35,
    exerciseIds: [
      "term-probabilites-1",
      "term-convexite-1",
      "term-logarithme-1",
      "term-loi-binomiale-1",
    ],
  },
  {
    id: "exponentielle-logarithme-integrales",
    title: "Sujet type bac — Exponentielle, logarithme & intégrales",
    description:
      "Un entraînement type bac centré sur les fonctions, les limites et les calculs classiques de Terminale.",
    examGoal: "terminale",
    estimatedMinutes: 35,
    exerciseIds: [
      "term-suites-1",
      "term-logarithme-1",
      "term-exponentielle-1",
      "term-integrales-1",
    ],
  },
];
