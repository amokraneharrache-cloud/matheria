import { ExamGoal } from "./questions";

export type PlanDuration = "7-days" | "14-days" | "exam";

export type RevisionTask = {
  id: string;
  day: number;
  title: string;
  description: string;
  examGoal: ExamGoal;
  topic?: string;
  estimatedMinutes: number;
  taskType: "session" | "review" | "mixed";
};

export type RevisionPlan = {
  examGoal: ExamGoal;
  duration: PlanDuration;
  title: string;
  subtitle: string;
  tasks: RevisionTask[];
};

const br7: RevisionPlan = {
  examGoal: "brevet", duration: "7-days",
  title: "Plan 7 jours — Brevet",
  subtitle: "Un chapitre par jour pour consolider les fondamentaux.",
  tasks: [
    { id:"br7-1", day:1, title:"Fractions", description:"Opérations sur les fractions.", examGoal:"brevet", topic:"fractions", estimatedMinutes:15, taskType:"session" },
    { id:"br7-2", day:2, title:"Calcul littéral", description:"Développer, factoriser, identités remarquables.", examGoal:"brevet", topic:"calcul-litteral", estimatedMinutes:15, taskType:"session" },
    { id:"br7-3", day:3, title:"Équations", description:"Résoudre des équations du premier degré.", examGoal:"brevet", topic:"equations", estimatedMinutes:15, taskType:"session" },
    { id:"br7-4", day:4, title:"Fonctions", description:"Images, antécédents, fonctions linéaires et affines.", examGoal:"brevet", topic:"fonctions", estimatedMinutes:15, taskType:"session" },
    { id:"br7-5", day:5, title:"Géométrie", description:"Pythagore, volumes, transformations.", examGoal:"brevet", topic:"geometrie", estimatedMinutes:15, taskType:"session" },
    { id:"br7-6", day:6, title:"Probabilités & Stats", description:"Probabilités, moyenne, médiane.", examGoal:"brevet", topic:"probas-stats", estimatedMinutes:15, taskType:"session" },
    { id:"br7-7", day:7, title:"Révision générale", description:"Session mixte de consolidation.", examGoal:"brevet", estimatedMinutes:20, taskType:"review" },
  ],
};

const br14: RevisionPlan = {
  examGoal: "brevet", duration: "14-days",
  title: "Plan 14 jours — Brevet",
  subtitle: "Deux passages sur chaque chapitre pour une maîtrise solide.",
  tasks: [
    { id:"br14-1", day:1, title:"Fractions — Découverte", description:"Première session sur les fractions.", examGoal:"brevet", topic:"fractions", estimatedMinutes:15, taskType:"session" },
    { id:"br14-2", day:2, title:"Calcul littéral — Découverte", description:"Développement et factorisation.", examGoal:"brevet", topic:"calcul-litteral", estimatedMinutes:15, taskType:"session" },
    { id:"br14-3", day:3, title:"Équations — Découverte", description:"Équations du premier degré.", examGoal:"brevet", topic:"equations", estimatedMinutes:15, taskType:"session" },
    { id:"br14-4", day:4, title:"Fonctions — Découverte", description:"Vocabulaire des fonctions.", examGoal:"brevet", topic:"fonctions", estimatedMinutes:15, taskType:"session" },
    { id:"br14-5", day:5, title:"Géométrie — Découverte", description:"Pythagore, milieux, volumes.", examGoal:"brevet", topic:"geometrie", estimatedMinutes:15, taskType:"session" },
    { id:"br14-6", day:6, title:"Probabilités — Découverte", description:"Probabilités et statistiques.", examGoal:"brevet", topic:"probas-stats", estimatedMinutes:15, taskType:"session" },
    { id:"br14-7", day:7, title:"Bilan mi-parcours", description:"Session mixte pour identifier les points faibles.", examGoal:"brevet", estimatedMinutes:15, taskType:"review" },
    { id:"br14-8", day:8, title:"Fractions — Renforcement", description:"Monter en précision.", examGoal:"brevet", topic:"fractions", estimatedMinutes:15, taskType:"session" },
    { id:"br14-9", day:9, title:"Calcul littéral — Renforcement", description:"Identités remarquables avancées.", examGoal:"brevet", topic:"calcul-litteral", estimatedMinutes:15, taskType:"session" },
    { id:"br14-10", day:10, title:"Équations — Renforcement", description:"Équations plus difficiles.", examGoal:"brevet", topic:"equations", estimatedMinutes:15, taskType:"session" },
    { id:"br14-11", day:11, title:"Fonctions — Renforcement", description:"Lecture de courbes.", examGoal:"brevet", topic:"fonctions", estimatedMinutes:15, taskType:"session" },
    { id:"br14-12", day:12, title:"Géométrie — Renforcement", description:"Exercices d'application avancés.", examGoal:"brevet", topic:"geometrie", estimatedMinutes:15, taskType:"session" },
    { id:"br14-13", day:13, title:"Probabilités — Renforcement", description:"Situations plus difficiles.", examGoal:"brevet", topic:"probas-stats", estimatedMinutes:15, taskType:"session" },
    { id:"br14-14", day:14, title:"Révision finale", description:"Dernière session générale.", examGoal:"brevet", estimatedMinutes:20, taskType:"review" },
  ],
};

const bp7: RevisionPlan = {
  examGoal: "bac-premiere", duration: "7-days",
  title: "Plan 7 jours — Bac Première",
  subtitle: "Un thème majeur par jour pour être prêt rapidement.",
  tasks: [
    { id:"bp7-1", day:1, title:"Second degré", description:"Discriminant, racines, forme canonique.", examGoal:"bac-premiere", topic:"second-degre", estimatedMinutes:20, taskType:"session" },
    { id:"bp7-2", day:2, title:"Dérivation", description:"Dérivées usuelles, produit, tangente.", examGoal:"bac-premiere", topic:"derivation", estimatedMinutes:20, taskType:"session" },
    { id:"bp7-3", day:3, title:"Fonctions", description:"Variations, extremum, ensemble de définition.", examGoal:"bac-premiere", topic:"fonctions", estimatedMinutes:20, taskType:"session" },
    { id:"bp7-4", day:4, title:"Probabilités", description:"Formules des probabilités, conditionnelles.", examGoal:"bac-premiere", topic:"probabilites", estimatedMinutes:20, taskType:"session" },
    { id:"bp7-5", day:5, title:"Suites", description:"Arithmétiques, géométriques, formules.", examGoal:"bac-premiere", topic:"suites", estimatedMinutes:20, taskType:"session" },
    { id:"bp7-6", day:6, title:"Statistiques", description:"Médiane, quartiles, écart-type.", examGoal:"bac-premiere", topic:"statistiques", estimatedMinutes:20, taskType:"session" },
    { id:"bp7-7", day:7, title:"Révision générale", description:"Session mixte de consolidation.", examGoal:"bac-premiere", estimatedMinutes:25, taskType:"review" },
  ],
};

const bp14: RevisionPlan = {
  examGoal: "bac-premiere", duration: "14-days",
  title: "Plan 14 jours — Bac Première",
  subtitle: "Deux passages sur chaque thème pour une maîtrise solide.",
  tasks: [
    { id:"bp14-1", day:1, title:"Second degré — Bases", description:"Discriminant, nombre de racines.", examGoal:"bac-premiere", topic:"second-degre", estimatedMinutes:20, taskType:"session" },
    { id:"bp14-2", day:2, title:"Dérivation — Bases", description:"Dérivées usuelles et tangente.", examGoal:"bac-premiere", topic:"derivation", estimatedMinutes:20, taskType:"session" },
    { id:"bp14-3", day:3, title:"Fonctions — Bases", description:"Sens de variation.", examGoal:"bac-premiere", topic:"fonctions", estimatedMinutes:20, taskType:"session" },
    { id:"bp14-4", day:4, title:"Probabilités — Bases", description:"Union, intersection.", examGoal:"bac-premiere", topic:"probabilites", estimatedMinutes:20, taskType:"session" },
    { id:"bp14-5", day:5, title:"Suites — Bases", description:"Arithmétiques et géométriques.", examGoal:"bac-premiere", topic:"suites", estimatedMinutes:20, taskType:"session" },
    { id:"bp14-6", day:6, title:"Statistiques — Bases", description:"Médiane, quartiles.", examGoal:"bac-premiere", topic:"statistiques", estimatedMinutes:20, taskType:"session" },
    { id:"bp14-7", day:7, title:"Bilan mi-parcours", description:"Session mixte pour repérer les lacunes.", examGoal:"bac-premiere", estimatedMinutes:20, taskType:"review" },
    { id:"bp14-8", day:8, title:"Second degré — Approfondissement", description:"Forme canonique, sommet.", examGoal:"bac-premiere", topic:"second-degre", estimatedMinutes:20, taskType:"session" },
    { id:"bp14-9", day:9, title:"Dérivation — Approfondissement", description:"Produit, composition.", examGoal:"bac-premiere", topic:"derivation", estimatedMinutes:20, taskType:"session" },
    { id:"bp14-10", day:10, title:"Fonctions — Approfondissement", description:"Tangente, dérivabilité.", examGoal:"bac-premiere", topic:"fonctions", estimatedMinutes:20, taskType:"session" },
    { id:"bp14-11", day:11, title:"Probabilités — Approfondissement", description:"Conditionnelles, indépendance.", examGoal:"bac-premiere", topic:"probabilites", estimatedMinutes:20, taskType:"session" },
    { id:"bp14-12", day:12, title:"Suites — Approfondissement", description:"Sommes, sens de variation.", examGoal:"bac-premiere", topic:"suites", estimatedMinutes:20, taskType:"session" },
    { id:"bp14-13", day:13, title:"Statistiques — Approfondissement", description:"Variance, écart-type.", examGoal:"bac-premiere", topic:"statistiques", estimatedMinutes:20, taskType:"session" },
    { id:"bp14-14", day:14, title:"Révision finale", description:"Dernière session de consolidation.", examGoal:"bac-premiere", estimatedMinutes:25, taskType:"review" },
  ],
};

const tm7: RevisionPlan = {
  examGoal: "terminale", duration: "7-days",
  title: "Plan 7 jours — Bac Terminale",
  subtitle: "Chapitres prioritaires pour une révision express.",
  tasks: [
    { id:"tm7-1", day:1, title:"Suites & Récurrence", description:"Récurrence, convergence monotone.", examGoal:"terminale", topic:"suites", estimatedMinutes:20, taskType:"session" },
    { id:"tm7-2", day:2, title:"Limites", description:"Formes indéterminées, gendarmes.", examGoal:"terminale", topic:"limites", estimatedMinutes:20, taskType:"session" },
    { id:"tm7-3", day:3, title:"Dérivation avancée", description:"Composition, convexité, inflexion.", examGoal:"terminale", topic:"derivation", estimatedMinutes:20, taskType:"session" },
    { id:"tm7-4", day:4, title:"Logarithme ln", description:"Propriétés de ln, dérivée, limites.", examGoal:"terminale", topic:"logarithme", estimatedMinutes:20, taskType:"session" },
    { id:"tm7-5", day:5, title:"Exponentielle", description:"Propriétés de exp, croissances comparées.", examGoal:"terminale", topic:"exponentielle", estimatedMinutes:20, taskType:"session" },
    { id:"tm7-6", day:6, title:"Probabilités", description:"Loi binomiale, espérance, variance.", examGoal:"terminale", topic:"probabilites", estimatedMinutes:20, taskType:"session" },
    { id:"tm7-7", day:7, title:"Intégrales simples", description:"Primitives, aire sous la courbe.", examGoal:"terminale", topic:"integrales", estimatedMinutes:20, taskType:"session" },
  ],
};

const tm14: RevisionPlan = {
  examGoal: "terminale", duration: "14-days",
  title: "Plan 14 jours — Bac Terminale",
  subtitle: "Deux passages complets sur les chapitres prioritaires.",
  tasks: [
    { id:"tm14-1", day:1, title:"Suites — Bases", description:"Récurrence, initialisation, hérédité.", examGoal:"terminale", topic:"suites", estimatedMinutes:20, taskType:"session" },
    { id:"tm14-2", day:2, title:"Limites — Bases", description:"Limites usuelles, polynômes.", examGoal:"terminale", topic:"limites", estimatedMinutes:20, taskType:"session" },
    { id:"tm14-3", day:3, title:"Dérivation — Bases", description:"Composition et signe de la dérivée.", examGoal:"terminale", topic:"derivation", estimatedMinutes:20, taskType:"session" },
    { id:"tm14-4", day:4, title:"Logarithme — Bases", description:"Définition et propriétés.", examGoal:"terminale", topic:"logarithme", estimatedMinutes:20, taskType:"session" },
    { id:"tm14-5", day:5, title:"Exponentielle — Bases", description:"Propriétés de exp, y'=y.", examGoal:"terminale", topic:"exponentielle", estimatedMinutes:20, taskType:"session" },
    { id:"tm14-6", day:6, title:"Probabilités — Bases", description:"Bernoulli, binomiale, espérance.", examGoal:"terminale", topic:"probabilites", estimatedMinutes:20, taskType:"session" },
    { id:"tm14-7", day:7, title:"Intégrales — Bases", description:"Primitives, théorème fondamental.", examGoal:"terminale", topic:"integrales", estimatedMinutes:20, taskType:"session" },
    { id:"tm14-8", day:8, title:"Suites — Approfondissement", description:"Convergence monotone, composition.", examGoal:"terminale", topic:"suites", estimatedMinutes:20, taskType:"session" },
    { id:"tm14-9", day:9, title:"Limites — Approfondissement", description:"Gendarmes, sin(x)/x.", examGoal:"terminale", topic:"limites", estimatedMinutes:20, taskType:"session" },
    { id:"tm14-10", day:10, title:"Dérivation — Approfondissement", description:"Convexité, concavité.", examGoal:"terminale", topic:"derivation", estimatedMinutes:20, taskType:"session" },
    { id:"tm14-11", day:11, title:"Logarithme — Approfondissement", description:"Dérivée de ln(u), limites.", examGoal:"terminale", topic:"logarithme", estimatedMinutes:20, taskType:"session" },
    { id:"tm14-12", day:12, title:"Exponentielle — Approfondissement", description:"Croissances comparées.", examGoal:"terminale", topic:"exponentielle", estimatedMinutes:20, taskType:"session" },
    { id:"tm14-13", day:13, title:"Probabilités — Approfondissement", description:"Variance, loi uniforme.", examGoal:"terminale", topic:"probabilites", estimatedMinutes:20, taskType:"session" },
    { id:"tm14-14", day:14, title:"Intégrales — Approfondissement", description:"Linéarité, primitives de 1/x.", examGoal:"terminale", topic:"integrales", estimatedMinutes:20, taskType:"session" },
  ],
};

export const allPlans: RevisionPlan[] = [br7, br14, bp7, bp14, tm7, tm14];

export function getPlan(goal: ExamGoal, duration: PlanDuration): RevisionPlan | undefined {
  return allPlans.find(p => p.examGoal === goal && p.duration === duration);
}

export function getAvailableDurations(goal: ExamGoal): PlanDuration[] {
  return allPlans.filter(p => p.examGoal === goal).map(p => p.duration);
}
