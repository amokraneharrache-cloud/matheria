import { bacPremiereQuestions } from "@/data/questions/bacPremiere";

export const DIAGNOSTIC_VERSION = "diagnostic-2-2026-08";

export const DIAGNOSTIC_DOMAIN_IDS = [
  "calcul",
  "fonctions",
  "suites",
  "probabilites",
  "raisonnement",
] as const;

export type DiagnosticDomainId = (typeof DIAGNOSTIC_DOMAIN_IDS)[number];

export type DiagnosticResource = {
  href: string;
  label: string;
};

export type DiagnosticDomain = {
  id: DiagnosticDomainId;
  label: string;
  resources: readonly DiagnosticResource[];
};

export const DIAGNOSTIC_DOMAINS: readonly DiagnosticDomain[] = [
  {
    id: "calcul",
    label: "Calcul algébrique",
    resources: [
      {
        href: "/formules-maths-premiere-specialite#automatismes",
        label: "Revoir les automatismes de calcul",
      },
      {
        href: "/quiz-maths-premiere-specialite",
        label: "S’entraîner avec le quiz de Première",
      },
    ],
  },
  {
    id: "fonctions",
    label: "Fonctions et dérivation",
    resources: [
      {
        href: "/programme-maths-terminale/derivation-convexite",
        label: "Revoir dérivation et variations",
      },
      {
        href: "/exercices-maths-terminale/derivation",
        label: "Faire des exercices guidés de dérivation",
      },
    ],
  },
  {
    id: "suites",
    label: "Suites",
    resources: [
      {
        href: "/methodes-maths-terminale/etudier-une-suite",
        label: "Revoir la méthode sur les suites",
      },
      {
        href: "/exercices-maths-terminale/suites",
        label: "Faire des exercices guidés sur les suites",
      },
    ],
  },
  {
    id: "probabilites",
    label: "Probabilités",
    resources: [
      {
        href: "/methodes-maths-terminale/probabilites-conditionnelles",
        label: "Revoir les probabilités conditionnelles",
      },
      {
        href: "/exercices-maths-terminale/probabilites",
        label: "Faire des exercices guidés de probabilités",
      },
    ],
  },
  {
    id: "raisonnement",
    label: "Raisonnement et géométrie",
    resources: [
      {
        href: "/preparer-entree-terminale-specialite-maths",
        label: "Revoir les prérequis de Terminale",
      },
      {
        href: "/programme-maths-terminale/geometrie-espace",
        label: "Préparer la géométrie de Terminale",
      },
    ],
  },
] as const;

type Selection = {
  sourceId: string;
  domainId: DiagnosticDomainId;
  optionOrder: readonly number[];
};

const SELECTION: readonly Selection[] = [
  { sourceId: "q-226", domainId: "calcul", optionOrder: [1, 2, 0, 3] },
  { sourceId: "q-124", domainId: "calcul", optionOrder: [0, 2, 1, 3] },
  { sourceId: "q-170", domainId: "fonctions", optionOrder: [2, 0, 3, 1] },
  { sourceId: "q-182", domainId: "fonctions", optionOrder: [1, 2, 3, 0] },
  { sourceId: "q-191", domainId: "suites", optionOrder: [3, 1, 0, 2] },
  { sourceId: "q-197", domainId: "suites", optionOrder: [2, 1, 3, 0] },
  { sourceId: "q-207", domainId: "probabilites", optionOrder: [1, 0, 3, 2] },
  { sourceId: "q-210", domainId: "probabilites", optionOrder: [2, 3, 1, 0] },
  { sourceId: "q-129", domainId: "raisonnement", optionOrder: [3, 0, 2, 1] },
  { sourceId: "q-244", domainId: "raisonnement", optionOrder: [1, 2, 0, 3] },
] as const;

export type DiagnosticQuestion = {
  id: string;
  sourceId: string;
  domainId: DiagnosticDomainId;
  domainLabel: string;
  difficulty: "easy" | "medium" | "hard";
  prompt: string;
  options: readonly string[];
  correctIndex: number;
  explanation: string;
};

function buildQuestion(selection: Selection): DiagnosticQuestion {
  const source = bacPremiereQuestions.find((question) => question.id === selection.sourceId);
  const domain = DIAGNOSTIC_DOMAINS.find((item) => item.id === selection.domainId);

  if (!source || !domain) {
    throw new Error(`Question de diagnostic introuvable : ${selection.sourceId}`);
  }

  const correctIndex = selection.optionOrder.indexOf(source.correctOptionIndex);
  if (correctIndex < 0 || selection.optionOrder.length !== source.options.length) {
    throw new Error(`Ordre d'options invalide : ${selection.sourceId}`);
  }

  return {
    id: selection.sourceId,
    sourceId: selection.sourceId,
    domainId: selection.domainId,
    domainLabel: domain.label,
    difficulty: source.difficulty,
    prompt: source.question,
    options: selection.optionOrder.map((index) => source.options[index]),
    correctIndex,
    explanation: source.explanation,
  };
}

export const DIAGNOSTIC_QUESTIONS: readonly DiagnosticQuestion[] = SELECTION.map(buildQuestion);

export type DiagnosticAnswers = Record<string, number>;

export type DiagnosticDomainScore = {
  id: DiagnosticDomainId;
  label: string;
  correct: number;
  total: number;
  status: "solid" | "consolidate" | "priority";
  statusLabel: string;
};

export type DiagnosticScore = {
  correct: number;
  total: number;
  level: "fragile" | "intermediate" | "solid";
  headline: string;
  summary: string;
  domains: readonly DiagnosticDomainScore[];
  priorityDomains: readonly DiagnosticDomainScore[];
};

function statusFor(correct: number): Pick<DiagnosticDomainScore, "status" | "statusLabel"> {
  if (correct === 2) {
    return { status: "solid", statusLabel: "Solide sur ce mini-test" };
  }
  if (correct === 1) {
    return { status: "consolidate", statusLabel: "À consolider" };
  }
  return { status: "priority", statusLabel: "Priorité de révision" };
}

export function scoreDiagnostic(answers: DiagnosticAnswers): DiagnosticScore {
  const domains = DIAGNOSTIC_DOMAINS.map((domain) => {
    const questions = DIAGNOSTIC_QUESTIONS.filter((question) => question.domainId === domain.id);
    const correct = questions.filter(
      (question) => answers[question.id] === question.correctIndex,
    ).length;

    return {
      id: domain.id,
      label: domain.label,
      correct,
      total: questions.length,
      ...statusFor(correct),
    };
  });

  const correct = domains.reduce((sum, domain) => sum + domain.correct, 0);
  const priorityDomains = [...domains]
    .filter((domain) => domain.correct < domain.total)
    .sort((a, b) => a.correct - b.correct)
    .slice(0, 2);

  if (correct >= 8) {
    return {
      correct,
      total: DIAGNOSTIC_QUESTIONS.length,
      level: "solid",
      headline: "Des prérequis plutôt solides",
      summary:
        "Ton niveau paraît solide sur ce mini-test. Entretiens ces acquis et travaille surtout avec des exercices variés et des annales.",
      domains,
      priorityDomains,
    };
  }

  if (correct >= 5) {
    return {
      correct,
      total: DIAGNOSTIC_QUESTIONS.length,
      level: "intermediate",
      headline: "Une base présente, avec quelques points à consolider",
      summary:
        "Ce mini-test montre des acquis utiles et quelques priorités. Commence par les domaines les moins réussis avant d’augmenter la difficulté.",
      domains,
      priorityDomains,
    };
  }

  return {
    correct,
    total: DIAGNOSTIC_QUESTIONS.length,
    level: "fragile",
    headline: "Plusieurs prérequis à consolider",
    summary:
      "Commence par des rappels courts et des exercices guidés sur les deux priorités ci-dessous. Ce score décrit seulement ce mini-test, pas ton niveau scolaire officiel.",
    domains,
    priorityDomains,
  };
}

export function getDiagnosticDomain(id: DiagnosticDomainId) {
  return DIAGNOSTIC_DOMAINS.find((domain) => domain.id === id);
}

export function isDiagnosticDomainId(value: unknown): value is DiagnosticDomainId {
  return (
    typeof value === "string" &&
    (DIAGNOSTIC_DOMAIN_IDS as readonly string[]).includes(value)
  );
}
