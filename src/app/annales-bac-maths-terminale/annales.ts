export type AnnaleTerminale = {
  id: string;
  year: "2026";
  center: string;
  day: "Jour 1" | "Jour 2";
  topics: readonly string[];
  pdfUrl: string;
  correctionHref: string;
};

export const annalesTerminale: readonly AnnaleTerminale[] = [
  {
    id: "metropole-j1",
    year: "2026",
    center: "Métropole, La Réunion et Mayotte",
    day: "Jour 1",
    topics: ["Probabilités", "Variables aléatoires", "Inégalité de Bienaymé-Tchebychev", "Dénombrement", "Géométrie dans l’espace", "Équations différentielles", "Suites", "Python", "Logarithme", "Exponentielle", "Convexité", "Intégrales"],
    pdfUrl: "https://www.education.gouv.fr/sites/default/files/document/baccalaureat-general-2026-mathematiques-517598.pdf",
    correctionHref: "/sujet-bac-maths-2026-corrige#jour-1",
  },
  {
    id: "metropole-j2",
    year: "2026",
    center: "Métropole, La Réunion et Mayotte",
    day: "Jour 2",
    topics: ["Géométrie dans l’espace", "Suites", "Python", "Équations différentielles", "Probabilités", "Loi binomiale", "Variables aléatoires", "Inégalité de Bienaymé-Tchebychev", "Dénombrement", "Fonctions", "Exponentielle", "Intégrales"],
    pdfUrl: "https://www.education.gouv.fr/sites/default/files/document/baccalaureat-general-2026-mathematiques-jour-2-517817.pdf",
    correctionHref: "/sujet-bac-maths-2026-corrige#jour-2",
  },
  {
    id: "antilles-j1",
    year: "2026",
    center: "Antilles-Guyane",
    day: "Jour 1",
    topics: ["Probabilités", "Variables aléatoires", "Inégalité de Bienaymé-Tchebychev", "Équations différentielles", "Suites", "Géométrie dans l’espace", "Logarithme", "Exponentielle", "Convexité", "Intégrales"],
    pdfUrl: "https://www.education.gouv.fr/sites/default/files/document/baccalaureat-general-2026-mathematiques-517718.pdf",
    correctionHref: "/annales/bac-maths-2026/antilles-guyane-jour-1-corrige",
  },
  {
    id: "antilles-j2",
    year: "2026",
    center: "Antilles-Guyane",
    day: "Jour 2",
    topics: ["Probabilités", "Loi binomiale", "Variables aléatoires", "Inégalité de Bienaymé-Tchebychev", "Suites", "Géométrie dans l’espace", "Équations différentielles", "Fonctions", "Logarithme", "Exponentielle", "Trigonométrie", "Convexité", "Intégrales", "Python"],
    pdfUrl: "https://www.education.gouv.fr/sites/default/files/document/baccalaureat-general-2026-mathematiques-jour-2-517928.pdf",
    correctionHref: "/annales/bac-maths-2026/antilles-guyane-jour-2-corrige",
  },
  {
    id: "amerique-nord-j1",
    year: "2026",
    center: "Amérique du Nord",
    day: "Jour 1",
    topics: ["Probabilités", "Loi binomiale", "Variables aléatoires", "Inégalité de Bienaymé-Tchebychev", "Suites", "Python", "Équations différentielles", "Géométrie dans l’espace", "Fonctions", "Logarithme", "Exponentielle", "Convexité"],
    pdfUrl: "https://www.education.gouv.fr/sites/default/files/document/baccalaureat-general-2026-mathematiques-jour-1-517034.pdf",
    correctionHref: "/annales/bac-maths-2026/amerique-du-nord-jour-1-corrige",
  },
  {
    id: "amerique-nord-j2",
    year: "2026",
    center: "Amérique du Nord",
    day: "Jour 2",
    topics: ["Probabilités", "Loi binomiale", "Variables aléatoires", "Inégalité de Bienaymé-Tchebychev", "Suites", "Python", "Géométrie dans l’espace", "Fonctions", "Logarithme", "Intégrales"],
    pdfUrl: "https://www.education.gouv.fr/sites/default/files/document/baccalaureat-general-2026-mathematiques-jour-2-517037.pdf",
    correctionHref: "/annales/bac-maths-2026/amerique-du-nord-jour-2-corrige",
  },
  {
    id: "groupe1-j1",
    year: "2026",
    center: "Centres étrangers — groupe 1",
    day: "Jour 1",
    topics: ["Probabilités", "Loi binomiale", "Variables aléatoires", "Inégalité de Bienaymé-Tchebychev", "Suites", "Python", "Équations différentielles", "Géométrie dans l’espace", "Fonctions", "Logarithme", "Exponentielle", "Trigonométrie", "Convexité", "Intégrales"],
    pdfUrl: "https://www.education.gouv.fr/sites/default/files/document/baccalaureat-general-2026-mathematiques-jour-1-517247.pdf",
    correctionHref: "/annales/bac-maths-2026/centres-etrangers-groupe-1-jour-1-corrige",
  },
  {
    id: "groupe1-j2",
    year: "2026",
    center: "Centres étrangers — groupe 1",
    day: "Jour 2",
    topics: ["Géométrie dans l’espace", "Probabilités", "Loi binomiale", "Variables aléatoires", "Inégalité de Bienaymé-Tchebychev", "Suites", "Python", "Équations différentielles", "Fonctions", "Logarithme", "Exponentielle", "Intégrales"],
    pdfUrl: "https://www.education.gouv.fr/sites/default/files/document/baccalaureat-general-2026-mathematiques-jour-2-517376.pdf",
    correctionHref: "/annales/bac-maths-2026/centres-etrangers-groupe-1-jour-2-corrige",
  },
  {
    id: "asie-j1",
    year: "2026",
    center: "Asie",
    day: "Jour 1",
    topics: ["Probabilités", "Variables aléatoires", "Suites", "Python", "Loi binomiale", "Dénombrement", "Intégrales", "Géométrie dans l’espace", "Fonctions", "Exponentielle", "Trigonométrie"],
    pdfUrl: "https://www.education.gouv.fr/sites/default/files/document/baccalaureat-general-2026-mathematiques-jour-1-517442.pdf",
    correctionHref: "/annales/bac-maths-2026/asie-jour-1-corrige",
  },
  {
    id: "asie-j2",
    year: "2026",
    center: "Asie",
    day: "Jour 2",
    topics: ["Probabilités", "Variables aléatoires", "Fonctions", "Suites", "Python", "Loi binomiale", "Géométrie dans l’espace", "Exponentielle", "Trigonométrie", "Convexité", "Dénombrement", "Équations différentielles"],
    pdfUrl: "https://www.education.gouv.fr/sites/default/files/document/baccalaureat-general-2026-mathematiques-jour-2-517439.pdf",
    correctionHref: "/annales/bac-maths-2026/asie-jour-2-corrige",
  },
] as const;

export const annaleCenters = [...new Set(annalesTerminale.map((annale) => annale.center))];
export const annaleTopics = [...new Set(annalesTerminale.flatMap((annale) => annale.topics))].sort();
