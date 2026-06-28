import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  LineChart,
  ListChecks,
  PenTool,
  PlayCircle,
  ShieldCheck,
  Smartphone,
  Target,
} from "lucide-react";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import type { SprintMathsEventName, TrackingParams } from "@/lib/tracking";
import { PACK_REVISION_EXPRESS_PRICE } from "@/lib/offers";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  productJsonLd,
  type FaqItem,
} from "@/lib/seo";

const pagePath = "/sujets-type-bac-maths-terminale";

const title = "Sujets type Bac Maths Terminale avec corrigé guidé";
const description =
  "Entraîne-toi avec des sujets type Bac Maths Terminale corrigés et guidés étape par étape : méthodes, chapitres clés, erreurs fréquentes et préparation Bac 2027.";
const officialContentDisclaimer =
  "SprintMaths propose des sujets et exercices type bac guidés pour s’entraîner. Ces contenus ne sont pas présentés comme des annales officielles ou des sujets officiels du ministère.";

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

const faqItems: FaqItem[] = [
  {
    question: "Est-ce que ces contenus viennent du ministère ?",
    answer: `Non. ${officialContentDisclaimer}`,
  },
  {
    question: "À quoi sert un sujet type bac ?",
    answer:
      "Un sujet type bac sert à s'entraîner sur un format proche des attentes de Terminale : plusieurs questions, des chapitres liés, une méthode à choisir et une conclusion à rédiger clairement.",
  },
  {
    question: "Faut-il faire des sujets complets ou des exercices ciblés ?",
    answer:
      "Les deux sont utiles. Les exercices ciblés consolident une méthode précise, tandis que les sujets type bac aident à enchaîner plusieurs réflexes. SprintMaths met surtout l'accent sur l'entraînement guidé étape par étape.",
  },
  {
    question: "Quelle différence entre un sujet type bac et un exercice type bac ?",
    answer:
      "Un exercice type bac cible une méthode précise, par exemple une limite de suite ou une probabilité conditionnelle. Un sujet type bac enchaîne plusieurs questions liées, parfois sur des chapitres différents, comme une partie d'épreuve. L'exercice consolide un réflexe, le sujet apprend à enchaîner ces réflexes.",
  },
  {
    question: "Quels chapitres travailler en priorité ?",
    answer:
      "Cela dépend de tes points faibles, repérables avec le diagnostic gratuit. En Terminale, les suites, la dérivation, le logarithme, les probabilités et la géométrie dans l'espace reviennent souvent dans les sujets type bac : ce sont des chapitres utiles à sécuriser en premier.",
  },
  {
    question: "Est-ce utile de refaire plusieurs sujets type bac ?",
    answer:
      "Oui, à condition de varier les chapitres et de revenir sur les erreurs commises. Refaire un sujet déjà corrigé aide à vérifier que la méthode est acquise, et pas seulement mémorisée. L'objectif est de gagner en autonomie sur le raisonnement, sans garantir une note précise le jour de l'épreuve.",
  },
  {
    question: "Les corrigés sont-ils détaillés ?",
    answer:
      "Les corrigés SprintMaths sont pensés comme des corrigés guidés : identifier le chapitre, choisir la méthode, poser les calculs puis conclure proprement. Les aperçus de cette page ne sont pas des corrigés exhaustifs de sujets de 2 h.",
  },
  {
    question: "Peut-on utiliser SprintMaths sur téléphone ?",
    answer:
      "Oui. SprintMaths est pensé pour un accès mobile dans le navigateur : exercices guidés, méthodes courtes, planning et progression restent utilisables sur téléphone.",
  },
  {
    question: "Comment accéder au Pack Révision Express ?",
    answer:
      `Le Pack Révision Express est présenté sur la page Bac Maths 2027. Il coûte ${PACK_REVISION_EXPRESS_PRICE} € en paiement unique lorsque l'offre est ouverte, avec un accès par code après paiement.`,
  },
];

const baseEventParams = {
  source_page: pagePath,
  level: "terminale",
  intent: "sujets_type_bac",
  exam_goal: "bac_2027",
};

const packEventParams = {
  ...baseEventParams,
  offer: "pack_revision_express_bac_2027",
  price: PACK_REVISION_EXPRESS_PRICE,
  currency: "EUR",
};

const subjectCompleteBaseEventParams = {
  ...baseEventParams,
  intent: "sujet_type_bac_complet",
  subject: "analyse_suites_limites",
};

const subjectComplete2BaseEventParams = {
  ...baseEventParams,
  intent: "sujet_type_bac_complet",
  subject: "probabilites_geometrie_integrales",
};

const sprintMathsContents = [
  {
    icon: Target,
    title: "Objectif clair",
    text: "Chaque aperçu indique ce que l'élève doit savoir faire avant de se lancer.",
  },
  {
    icon: BookOpenCheck,
    title: "Chapitres travaillés",
    text: "Les notions de Terminale sont nommées explicitement pour relier l'énoncé au programme.",
  },
  {
    icon: PenTool,
    title: "Méthode à appliquer",
    text: "Le corrigé guidé commence par le choix de méthode, avant les calculs.",
  },
  {
    icon: ShieldCheck,
    title: "Erreur fréquente",
    text: "Un point de vigilance aide à éviter les confusions classiques de copie.",
  },
];

const guidedCorrectionSteps = [
  "Étape 1 : identifier le chapitre.",
  "Étape 2 : choisir la méthode.",
  "Étape 3 : poser les calculs.",
  "Étape 4 : conclure proprement.",
];

const subjectPreviews = [
  {
    number: 1,
    heading: "Sujet type bac 1 : analyse et suites",
    slug: "analyse-suites",
    objective:
      "Savoir étudier une suite, justifier une variation, trouver une limite simple puis interpréter le résultat dans le contexte de l'énoncé.",
    chapters: ["Suites", "Variations", "Limites simples", "Interprétation"],
    tasks: [
      "Étude d'une suite définie par récurrence ou par formule explicite.",
      "Recherche du sens de variation avec u_(n+1) - u_n ou une fonction associée.",
      "Limite simple lorsque n tend vers +∞.",
      "Phrase d'interprétation finale liée à la situation.",
    ],
    method:
      "Commencer par reconnaître la forme de la suite, choisir l'outil de variation, puis séparer le calcul de limite et l'interprétation.",
    pitfall:
      "Conclure sur la limite sans vérifier ce qu'elle signifie dans le contexte : au bac, une valeur limite doit souvent être interprétée.",
    clusterHref: "/exercices-maths-terminale/suites",
    cluster: "suites",
  },
  {
    number: 2,
    heading: "Sujet type bac 2 : dérivation, logarithme et limites",
    slug: "derivation-logarithme-limites",
    objective:
      "Enchaîner une étude de fonction : domaine de définition, dérivée, tableau de variation, équation avec ln et limite simple.",
    chapters: ["Dérivation", "Fonction logarithme", "Limites", "Tableau de variation"],
    tasks: [
      "Déterminer le domaine de définition avant tout calcul.",
      "Calculer la dérivée et étudier son signe.",
      "Construire un tableau de variation exploitable.",
      "Résoudre une équation avec ln en vérifiant les conditions.",
      "Calculer une limite simple à une borne de l'intervalle.",
    ],
    method:
      "Poser d'abord l'intervalle d'étude, dériver proprement, transformer le signe de f'(x) en variations, puis revenir aux contraintes du logarithme.",
    pitfall:
      "Résoudre une équation avec ln sans vérifier que les expressions à l'intérieur du logarithme restent strictement positives.",
    clusterHref: "/exercices-maths-terminale/derivation",
    cluster: "derivation",
  },
  {
    number: 3,
    heading: "Sujet type bac 3 : probabilités",
    slug: "probabilites",
    objective:
      "Organiser les données avec un arbre pondéré, calculer une probabilité conditionnelle, utiliser une loi binomiale puis interpréter le résultat.",
    chapters: ["Arbre pondéré", "Probabilité conditionnelle", "Loi binomiale", "Interprétation"],
    tasks: [
      "Compléter ou exploiter un arbre pondéré.",
      "Calculer une probabilité conditionnelle.",
      "Reconnaître une situation modélisée par une loi binomiale.",
      "Interpréter une probabilité dans une phrase claire.",
    ],
    method:
      "Nommer les événements, placer les probabilités sur l'arbre, choisir la formule conditionnelle utile, puis vérifier les paramètres de la loi binomiale.",
    pitfall:
      "Confondre P(A ∩ B), P_A(B) et P(B) : l'arbre sert justement à garder le sens de chaque probabilité.",
    clusterHref: "/exercices-maths-terminale/probabilites",
    cluster: "probabilites",
  },
  {
    number: 4,
    heading: "Sujet type bac 4 : géométrie dans l'espace",
    slug: "geometrie-espace",
    objective:
      "Savoir manipuler des vecteurs de l'espace, représenter une droite, étudier une position relative et justifier une intersection ou une orthogonalité.",
    chapters: ["Vecteurs de l'espace", "Droites et plans", "Repérage", "Orthogonalité"],
    tasks: [
      "Lire ou construire une représentation paramétrique de droite.",
      "Utiliser les coordonnées de points et de vecteurs dans un repère.",
      "Tester un alignement, une appartenance ou une intersection.",
      "Rédiger clairement la conclusion géométrique attendue.",
    ],
    method:
      "Commencer par nommer les points et les vecteurs utiles, poser les coordonnées, puis traduire la question géométrique en équations simples.",
    pitfall:
      "Confondre une droite et un plan ou conclure trop vite sur une intersection sans vérifier les paramètres obtenus.",
    clusterHref: "/exercices-maths-terminale/geometrie-espace",
    cluster: "geometrie-espace",
  },
] as const;

const completeSubjectParts = [
  {
    part: "suite",
    label: "PARTIE A — Suite",
    heading: "Suite récurrente",
    statement: [
      "On considère la suite (u_n) définie par u_0 = 2 et, pour tout entier naturel n :",
      "u_{n+1} = 0,5 u_n + 3.",
    ],
    questions: [
      "Calculer u_1 et u_2.",
      "Montrer que si u_n < 6, alors u_{n+1} < 6.",
      "On admet que u_n < 6 pour tout n. Étudier le sens de variation de la suite.",
      "On pose v_n = 6 - u_n. Montrer que (v_n) est géométrique.",
      "En déduire l'expression de u_n en fonction de n, puis la limite de u_n.",
    ],
    correction: [
      "u_1 = 0,5×2 + 3 = 4 ; u_2 = 0,5×4 + 3 = 5.",
      "Si u_n < 6 alors 0,5u_n < 3, donc 0,5u_n + 3 < 6.",
      "u_{n+1}-u_n = 3 - 0,5u_n. Comme u_n < 6, alors 3 - 0,5u_n > 0, donc la suite est croissante.",
      "v_{n+1}=6-u_{n+1}=6-(0,5u_n+3)=3-0,5u_n=0,5(6-u_n)=0,5v_n. Donc v_n est géométrique de raison 0,5.",
      "v_0=6-u_0=4, donc v_n=4×0,5^n. Donc u_n=6-4×0,5^n. Comme 0,5^n tend vers 0, u_n tend vers 6.",
    ],
    method:
      "Pour une suite récurrente affine, chercher le nombre fixe permet souvent de transformer la suite en suite géométrique.",
    pitfall:
      "Ne pas changer la convention : ici v_n = 6 - u_n, d'où v_0 = 4. L'information u_n < 6 sert ensuite à donner le signe positif de u_{n+1}-u_n.",
    links: [
      {
        href: "/exercices-maths-terminale/suites",
        label: "Exercices sur les suites",
        linkType: "exercise",
      },
      {
        href: "/methodes-maths-terminale/etudier-une-suite",
        label: "Méthode : étudier une suite",
        linkType: "method",
      },
    ],
  },
  {
    part: "derivation",
    label: "PARTIE B — Fonction et dérivation",
    heading: "Étude de fonction",
    statement: [
      "On considère la fonction f définie sur ]0,+∞[ par :",
      "f(x) = x - 2 ln(x).",
    ],
    questions: [
      "Calculer f'(x).",
      "Étudier le signe de f'(x).",
      "Dresser le tableau de variation de f.",
      "Calculer f(2).",
      "Interpréter le résultat obtenu.",
    ],
    correction: [
      "f'(x)=1 - 2/x = (x-2)/x.",
      "Sur ]0,+∞[, x est strictement positif. Le signe de f'(x) est donc celui de x-2. Donc f'(x)<0 sur ]0,2[, f'(2)=0, f'(x)>0 sur ]2,+∞[.",
      "f décroît sur ]0,2], puis croît sur [2,+∞[.",
      "f(2)=2 - 2 ln(2).",
      "f admet un minimum sur ]0,+∞[ en x=2, de valeur 2 - 2 ln(2).",
    ],
    method:
      "Sur un intervalle positif, le signe d'une fraction dépend du numérateur si le dénominateur est toujours positif.",
    pitfall:
      "Oublier le domaine ]0,+∞[ avant d'étudier le signe de la dérivée.",
    links: [
      {
        href: "/exercices-maths-terminale/derivation",
        label: "Exercices sur la dérivation",
        linkType: "exercise",
      },
      {
        href: "/methodes-maths-terminale/tableau-variation",
        label: "Méthode : tableau de variation",
        linkType: "method",
      },
    ],
  },
  {
    part: "limite",
    label: "PARTIE C — Limite",
    heading: "Comportement en +∞",
    statement: [
      "On reprend la fonction f définie sur ]0,+∞[ par f(x) = x - 2 ln(x).",
    ],
    questions: [
      "Calculer la limite de f(x) quand x tend vers +∞.",
      "Expliquer pourquoi la croissance de x domine celle de ln(x).",
      "Conclure sur le comportement de f en +∞.",
    ],
    correction: [
      "f(x)=x - 2ln(x). En +∞, x tend vers +∞ et ln(x) aussi, mais beaucoup plus lentement. On peut écrire f(x)=x(1 - 2ln(x)/x).",
      "Par croissance comparée, ln(x)/x tend vers 0 quand x tend vers +∞.",
      "Donc 1 - 2ln(x)/x tend vers 1. Comme x tend vers +∞, f(x) tend vers +∞.",
    ],
    method:
      "Pour comparer x et ln(x), factoriser par x fait apparaître ln(x)/x, une limite de référence.",
    pitfall:
      "Traiter x - 2ln(x) comme une forme indéterminée sans comparer les vitesses de croissance.",
    links: [
      {
        href: "/exercices-maths-terminale/limites",
        label: "Exercices sur les limites",
        linkType: "exercise",
      },
      {
        href: "/methodes-maths-terminale/calculer-une-limite",
        label: "Méthode : calculer une limite",
        linkType: "method",
      },
    ],
  },
] as const;

const completeSubject2Parts = [
  {
    part: "probabilites",
    label: "PARTIE A — Probabilités",
    heading: "Arbre pondéré et probabilité conditionnelle",
    statement: [
      "Dans une classe, 60 % des élèves suivent une option maths complémentaires. Parmi ces élèves, 40 % réussissent un exercice de probabilités ; parmi les autres élèves, 25 % réussissent cet exercice. On choisit un élève au hasard et on note M : « l’élève suit l’option maths complémentaires » et R : « l’élève réussit l’exercice ».",
    ],
    questions: [
      "Donner P(M), P_M(R), P(non M) et P_{non M}(R).",
      "Calculer P(M ∩ R).",
      "Calculer P(non M ∩ R).",
      "En déduire P(R).",
      "Calculer la probabilité que l’élève suive l’option sachant qu’il a réussi l’exercice.",
    ],
    correction: [
      "P(M) = 0,6 ; P_M(R) = 0,4 ; P(non M) = 0,4 ; P_{non M}(R) = 0,25.",
      "P(M ∩ R) = P(M) × P_M(R) = 0,6 × 0,4 = 0,24.",
      "P(non M ∩ R) = P(non M) × P_{non M}(R) = 0,4 × 0,25 = 0,10.",
      "P(R) = P(M ∩ R) + P(non M ∩ R) = 0,24 + 0,10 = 0,34.",
      "P_R(M) = P(M ∩ R) / P(R) = 0,24 / 0,34 = 12/17 ≈ 0,706.",
    ],
    method:
      "Sur un arbre pondéré, P(R) s’obtient en additionnant les probabilités des chemins qui mènent à R, puis une probabilité « à l’envers » se calcule avec P_R(M) = P(M ∩ R) / P(R).",
    pitfall:
      "Confondre P_M(R) et P_R(M) : la première se lit directement sur l’arbre, la seconde demande de diviser par P(R).",
    links: [
      {
        href: "/exercices-maths-terminale/probabilites",
        label: "Exercices sur les probabilités",
        linkType: "exercise",
      },
      {
        href: "/methodes-maths-terminale/probabilites-conditionnelles",
        label: "Méthode : probabilités conditionnelles",
        linkType: "method",
      },
    ],
  },
  {
    part: "geometrie",
    label: "PARTIE B — Géométrie dans l’espace",
    heading: "Vecteurs, plan et orthogonalité",
    statement: [
      "Dans un repère de l’espace, on considère les points A(1 ; 2 ; 3) et B(4 ; 0 ; 5) ainsi que le plan P d’équation :",
      "2x - y + z - 5 = 0.",
    ],
    questions: [
      "Calculer les coordonnées du vecteur AB.",
      "Vérifier si le point A appartient au plan P.",
      "Donner un vecteur normal au plan P.",
      "Déterminer si le vecteur AB est orthogonal au vecteur normal du plan.",
      "Interpréter le résultat.",
    ],
    correction: [
      "AB = (4 - 1 ; 0 - 2 ; 5 - 3) = (3 ; -2 ; 2).",
      "Pour A : 2 × 1 - 2 + 3 - 5 = -2 ≠ 0, donc A n’appartient pas au plan P.",
      "Les coefficients de l’équation donnent un vecteur normal n = (2 ; -1 ; 1).",
      "AB · n = 3 × 2 + (-2) × (-1) + 2 × 1 = 6 + 2 + 2 = 10 ≠ 0, donc AB n’est pas orthogonal à n.",
      "Comme AB n’est pas orthogonal au vecteur normal, la direction AB n’est pas parallèle au plan P : la droite (AB) coupe le plan.",
    ],
    method:
      "Les coefficients (a ; b ; c) d’une équation ax + by + cz + d = 0 donnent directement un vecteur normal ; un produit scalaire nul entre la direction et ce vecteur normal signifie « parallèle au plan ».",
    pitfall:
      "Croire qu’un produit scalaire non nul prouve l’orthogonalité : c’est l’inverse, l’orthogonalité correspond à un produit scalaire égal à 0.",
    links: [
      {
        href: "/exercices-maths-terminale/geometrie-espace",
        label: "Exercices sur la géométrie dans l’espace",
        linkType: "exercise",
      },
      {
        href: "/methodes-maths-terminale/geometrie-espace",
        label: "Méthode : géométrie dans l’espace",
        linkType: "method",
      },
    ],
  },
  {
    part: "integrales",
    label: "PARTIE C — Intégrales",
    heading: "Intégrale définie et aire",
    statement: [
      "On considère la fonction f définie sur [1 ; 3] par :",
      "f(x) = 2x + 1.",
    ],
    questions: [
      "Trouver une primitive F de f.",
      "Calculer ∫_1^3 (2x + 1) dx.",
      "Interpréter le résultat comme une aire.",
      "Expliquer pourquoi le résultat est positif.",
      "Donner une erreur fréquente à éviter.",
    ],
    correction: [
      "Une primitive de f est F(x) = x² + x.",
      "∫_1^3 (2x + 1) dx = F(3) - F(1), avec F(3) = 9 + 3 = 12 et F(1) = 1 + 1 = 2, donc l’intégrale vaut 12 - 2 = 10.",
      "Comme f est positive sur [1 ; 3], l’intégrale représente l’aire sous la courbe entre x = 1 et x = 3.",
      "f(x) = 2x + 1 est positive sur [1 ; 3], donc cette aire, et donc l’intégrale, est positive.",
      "L’erreur fréquente est d’inverser F(3) - F(1) ou de confondre primitive et dérivée.",
    ],
    method:
      "Pour une intégrale définie, on cherche une primitive F puis on calcule F(b) - F(a) ; lorsque f est positive sur l’intervalle, ce résultat est l’aire sous la courbe.",
    pitfall:
      "Calculer F(1) - F(3) en inversant les bornes, ou dériver f au lieu de chercher une primitive.",
    links: [
      {
        href: "/exercices-maths-terminale/integrales",
        label: "Exercices sur les intégrales",
        linkType: "exercise",
      },
      {
        href: "/methodes-maths-terminale/integrales",
        label: "Méthode : intégrales",
        linkType: "method",
      },
    ],
  },
] as const;

const completeSubjectUseSteps = [
  "Lire tout l'énoncé avant de calculer.",
  "Identifier le chapitre de chaque partie.",
  "Essayer une question avant de regarder le corrigé guidé.",
  "Noter l'erreur fréquente pour ne pas la refaire.",
] as const;

const completeSubject2UseSteps = [
  "Identifier le chapitre de chaque partie.",
  "Essayer les questions sans regarder directement le corrigé.",
  "Comparer sa méthode avec la correction guidée.",
  "Refaire les exercices liés par chapitre.",
] as const;

const completeSubject2Reflexes = [
  "Lire un arbre pondéré et appliquer la formule des probabilités totales.",
  "Utiliser un vecteur normal et un produit scalaire dans l'espace.",
  "Calculer une intégrale avec F(b) - F(a) et l'interpréter comme une aire.",
] as const;

const clusterLinks = [
  {
    href: "/exercices-maths-terminale/suites",
    label: "Suites",
    cluster: "suites",
  },
  {
    href: "/exercices-maths-terminale/derivation",
    label: "Dérivation",
    cluster: "derivation",
  },
  {
    href: "/exercices-maths-terminale/logarithme",
    label: "Logarithme",
    cluster: "logarithme",
  },
  {
    href: "/exercices-maths-terminale/integrales",
    label: "Intégrales",
    cluster: "integrales",
  },
  {
    href: "/exercices-maths-terminale/limites",
    label: "Limites",
    cluster: "limites",
  },
  {
    href: "/exercices-maths-terminale/probabilites",
    label: "Probabilités",
    cluster: "probabilites",
  },
  {
    href: "/exercices-maths-terminale/geometrie-espace",
    label: "Géométrie dans l'espace",
    cluster: "geometrie-espace",
  },
];

const chapterSubjectLinks = [
  {
    chapter: "Suites",
    trackingChapter: "suites",
    work:
      "Étudier une suite explicite ou récurrente, justifier une variation, calculer une limite et interpréter le résultat.",
    pitfall:
      "Appliquer une formule sans vérifier la forme de la suite ni rédiger l'interprétation finale.",
    exerciseHref: "/exercices-maths-terminale/suites",
    methodHref: "/methodes-maths-terminale/etudier-une-suite",
  },
  {
    chapter: "Limites",
    trackingChapter: "limites",
    work:
      "Calculer une limite, lever une forme indéterminée simple et relier le résultat à l'étude d'une fonction.",
    pitfall:
      "Conclure trop vite sur le signe de l'infini sans regarder le terme dominant ou l'intervalle étudié.",
    exerciseHref: "/exercices-maths-terminale/limites",
    methodHref: "/methodes-maths-terminale/calculer-une-limite",
  },
  {
    chapter: "Dérivation / Convexité",
    trackingChapter: "derivation-convexite",
    work:
      "Calculer une dérivée, étudier son signe, construire un tableau de variation et exploiter la convexité.",
    pitfall:
      "Remplir le tableau de variation sans relier clairement le signe de la dérivée aux intervalles.",
    exerciseHref: "/exercices-maths-terminale/derivation",
    methodHref: "/methodes-maths-terminale/tableau-variation",
  },
  {
    chapter: "Fonction logarithme",
    trackingChapter: "logarithme",
    work:
      "Poser le domaine, transformer des expressions avec ln, résoudre une équation et calculer une limite.",
    pitfall:
      "Oublier que l'expression à l'intérieur d'un logarithme doit être strictement positive.",
    exerciseHref: "/exercices-maths-terminale/logarithme",
    methodHref: "/methodes-maths-terminale/logarithme",
  },
  {
    chapter: "Intégrales",
    trackingChapter: "integrales",
    work:
      "Choisir une primitive, calculer une intégrale définie, interpréter une aire et vérifier l'ordre des bornes.",
    pitfall:
      "Oublier que le calcul se fait toujours avec F(b) - F(a), surtout quand la borne inférieure donne une expression négative.",
    exerciseHref: "/exercices-maths-terminale/integrales",
    methodHref: "/methodes-maths-terminale/integrales",
  },
  {
    chapter: "Probabilités",
    trackingChapter: "probabilites",
    work:
      "Organiser un arbre pondéré, calculer une probabilité conditionnelle, reconnaître une loi binomiale et interpréter.",
    pitfall:
      "Confondre P(A ∩ B), P_A(B) et P(B), surtout quand l'arbre contient plusieurs branches.",
    exerciseHref: "/exercices-maths-terminale/probabilites",
    methodHref: "/methodes-maths-terminale/probabilites-conditionnelles",
  },
  {
    chapter: "Géométrie dans l'espace",
    trackingChapter: "geometrie-espace",
    work:
      "Manipuler vecteurs et coordonnées, utiliser une représentation paramétrique et justifier une position relative.",
    pitfall:
      "Conclure une intersection sans vérifier les paramètres obtenus ou l'appartenance au plan.",
    exerciseHref: "/exercices-maths-terminale/geometrie-espace",
    methodHref: "/methodes-maths-terminale/geometrie-espace",
  },
] as const;

const internalLinks = [
  { href: "/bac-maths-2027", label: "Préparation Bac Maths 2027" },
  {
    href: "/exercices-type-bac-maths-terminale",
    label: "Exercices type bac guidés",
  },
  { href: "/planning-revision-bac-maths", label: "Planning révision Bac Maths" },
  { href: "/diagnostic", label: "Diagnostic gratuit" },
  { href: "/programme-maths-terminale", label: "Programme maths Terminale" },
  { href: "/exercices-maths-terminale", label: "Exercices maths Terminale" },
  { href: "/methodes-maths-terminale", label: "Méthodes maths Terminale" },
];

// Sommaire interne : chaque ancre cible un id de section présent plus bas.
const pageAnchors = [
  { href: "#sujets-guides", anchor: "sujets-guides", label: "Sujets guidés" },
  {
    href: "#sujet-guide-complet",
    anchor: "sujet-guide-complet",
    label: "Sujet complet 1",
  },
  {
    href: "#sujet-guide-probabilites-geometrie-integrales",
    anchor: "sujet-guide-probabilites-geometrie-integrales",
    label: "Sujet complet 2",
  },
  {
    href: "#sujets-par-chapitre",
    anchor: "sujets-par-chapitre",
    label: "Sujets par chapitre",
  },
  { href: "#corrige-guide", anchor: "corrige-guide", label: "Corrigé guidé" },
  {
    href: "#transparence",
    anchor: "transparence",
    label: "Transparence",
  },
  { href: "#faq", anchor: "faq", label: "FAQ" },
];

function SubjectPreviewCard({
  subject,
}: {
  subject: (typeof subjectPreviews)[number];
}) {
  return (
    <section id={subject.slug} className="scroll-mt-24">
      <div className="grid gap-6 lg:grid-cols-[0.88fr_1fr] lg:items-start">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
            Aperçu structuré
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950">
            {subject.heading}
          </h2>
          <p className="mt-4 leading-7 text-slate-700">
            <span className="font-bold text-slate-950">Objectif : </span>
            {subject.objective}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {subject.chapters.map((chapter) => (
              <span
                key={chapter}
                className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-900"
              >
                {chapter}
              </span>
            ))}
          </div>
          <TrackedLink
            href="/exercices-type-bac-maths-terminale"
            eventName="click_subjects_typebac_start"
            eventParams={{
              ...baseEventParams,
              cta_location: `subject_${subject.number}_primary`,
              destination_page: "/exercices-type-bac-maths-terminale",
            }}
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-900 px-5 py-3 text-center font-bold text-white hover:bg-blue-800 sm:w-auto"
          >
            S&apos;entraîner sur ce type de sujet
            <ArrowRight className="h-4 w-4" />
          </TrackedLink>
        </div>

        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h3 className="flex items-center gap-2 text-xl font-bold text-slate-950">
            <ClipboardList className="h-5 w-5 text-blue-800" />
            Questions possibles
          </h3>
          <ul className="mt-4 space-y-3 text-slate-700">
            {subject.tasks.map((task) => (
              <li key={task} className="flex gap-2 leading-7">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                <span>{task}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 grid gap-4 border-t border-slate-200 pt-5 sm:grid-cols-2">
            <div className="rounded-lg bg-slate-50 p-4">
              <h3 className="font-bold text-slate-950">Méthode à appliquer</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {subject.method}
              </p>
            </div>
            <div className="rounded-lg bg-amber-50 p-4">
              <h3 className="font-bold text-slate-950">Erreur fréquente</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {subject.pitfall}
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-blue-100 bg-blue-50 p-4">
            <h3 className="font-bold text-blue-950">Corrigé guidé aperçu</h3>
            <ol className="mt-3 space-y-2 text-sm leading-6 text-blue-950">
              {guidedCorrectionSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="mt-3 text-sm leading-6 text-blue-900">
              Cet aperçu montre le raisonnement attendu, sans présenter un faux
              corrigé exhaustif de sujet complet.
            </p>
          </div>

          <TrackedLink
            href={subject.clusterHref}
            eventName={
              subject.cluster === "geometrie-espace"
                ? "click_internal_geometrie_cluster"
                : "click_subjects_cluster_exercise"
            }
            eventParams={{
              ...baseEventParams,
              cluster: subject.cluster,
              destination_page: subject.clusterHref,
              cta_location: `subject_${subject.number}_cluster`,
            }}
            className="mt-5 inline-flex items-center gap-2 font-bold text-blue-900 hover:underline"
          >
            Revoir les exercices du chapitre
            <ArrowRight className="h-4 w-4" />
          </TrackedLink>
        </article>
      </div>
    </section>
  );
}

function CompleteSubjectPartCard({
  part,
  chapterLinkEventName,
  baseParams,
  ctaPrefix,
}: {
  part:
    | (typeof completeSubjectParts)[number]
    | (typeof completeSubject2Parts)[number];
  chapterLinkEventName: SprintMathsEventName;
  baseParams: TrackingParams;
  ctaPrefix: string;
}) {
  return (
    <article className="border-t border-slate-200 pt-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
            {part.label}
          </p>
          <h3 className="mt-2 text-2xl font-bold text-slate-950">
            {part.heading}
          </h3>
        </div>
        <span className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
          Corrigé guidé étape par étape
        </span>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h4 className="flex items-center gap-2 text-lg font-bold text-slate-950">
            <ClipboardList className="h-5 w-5 text-blue-800" />
            Énoncé
          </h4>
          <div className="mt-4 space-y-2 leading-7 text-slate-700">
            {part.statement.map((line, index) => (
              <p
                key={line}
                className={
                  index > 0
                    ? "break-words font-mono text-sm font-semibold text-slate-950 [overflow-wrap:anywhere]"
                    : undefined
                }
              >
                {line}
              </p>
            ))}
          </div>
          <h5 className="mt-5 font-bold text-slate-950">Questions</h5>
          <ol className="mt-3 list-decimal space-y-2 break-words pl-5 leading-7 text-slate-700">
            {part.questions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ol>
        </div>

        <div className="rounded-lg border border-blue-100 bg-blue-50 p-5 shadow-sm sm:p-6">
          <h4 className="flex items-center gap-2 text-lg font-bold text-blue-950">
            <BookOpenCheck className="h-5 w-5 text-blue-800" />
            Correction guidée
          </h4>
          <ol className="mt-4 list-decimal space-y-3 break-words pl-5 text-sm leading-6 text-blue-950 [overflow-wrap:anywhere] sm:text-base sm:leading-7">
            {part.correction.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div className="border-l-4 border-blue-800 bg-slate-50 p-4">
          <h4 className="font-bold text-slate-950">Méthode à retenir</h4>
          <p className="mt-2 text-sm leading-6 text-slate-700">{part.method}</p>
        </div>
        <div className="border-l-4 border-amber-500 bg-amber-50 p-4">
          <h4 className="font-bold text-slate-950">Erreur fréquente</h4>
          <p className="mt-2 text-sm leading-6 text-slate-700">{part.pitfall}</p>
        </div>
        <div className="border-l-4 border-emerald-600 bg-emerald-50 p-4">
          <h4 className="font-bold text-slate-950">Lien pour s&apos;entraîner</h4>
          <div className="mt-3 grid gap-2">
            {part.links.map((link) => (
              <TrackedLink
                key={link.href}
                href={link.href}
                eventName={chapterLinkEventName}
                eventParams={{
                  ...baseParams,
                  part: part.part,
                  destination_page: link.href,
                  link_type: link.linkType,
                  cta_location: `${ctaPrefix}_${part.part}_${link.linkType}`,
                }}
                className="inline-flex min-h-11 items-center gap-2 rounded-full px-1 text-sm font-bold text-blue-900 hover:underline"
              >
                {link.label}
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function SujetsTypeBacMathsTerminalePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          productJsonLd("/bac-maths-2027#offre", {
            price: String(PACK_REVISION_EXPRESS_PRICE),
          }),
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Bac Maths 2027", path: "/bac-maths-2027" },
            { name: "Sujets type Bac Maths Terminale", path: pagePath },
          ]),
        ]}
      />

      <section className="relative overflow-hidden bg-slate-950 px-4 py-14 text-white sm:py-16">
        <Image
          src="/images/screenshots/sprintmaths-guided-exercise.png"
          alt="Aperçu mobile SprintMaths avec un exercice type bac guidé étape par étape."
          width={390}
          height={844}
          loading="eager"
          className="absolute right-[max(1rem,calc((100vw-72rem)/2))] top-8 hidden w-[245px] rotate-2 rounded-[28px] border border-white/20 shadow-2xl md:block lg:w-[295px]"
        />
        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-950">
              Terminale spécialité maths - Bac 2027
            </p>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
              Sujets type Bac Maths Terminale avec corrigé guidé
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
              Travaille des sujets type bac maths Terminale avec une correction
              guidée : chapitre à reconnaître, méthode à choisir, calculs à poser
              et conclusion à rédiger proprement.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TrackedLink
                href="/exercices-type-bac-maths-terminale"
                eventName="click_subjects_typebac_start"
                eventParams={{
                  ...baseEventParams,
                  cta_location: "subjects_hero_primary",
                  destination_page: "/exercices-type-bac-maths-terminale",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-center font-bold text-white shadow-md hover:bg-emerald-400 sm:w-auto"
              >
                <PlayCircle className="h-5 w-5" />
                Essayer un sujet type bac guidé
              </TrackedLink>
              <TrackedLink
                href="/planning-revision-bac-maths"
                eventName="click_subjects_typebac_planning"
                eventParams={{
                  ...baseEventParams,
                  lead_magnet: "planning_bac_maths_2027",
                  cta_location: "subjects_hero_planning",
                  destination_page: "/planning-revision-bac-maths",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/50 px-5 py-3 text-center font-bold text-white hover:bg-white/10 sm:w-auto"
              >
                <CalendarDays className="h-5 w-5" />
                Recevoir le planning gratuit
              </TrackedLink>
            </div>
            <p className="mt-4 text-sm font-semibold text-slate-300">
              Aperçus d&apos;entraînement, méthodes guidées, accès mobile et Pack
              Révision Express à {PACK_REVISION_EXPRESS_PRICE} €.
            </p>
          </div>

          <div className="mt-8 max-w-[260px] md:hidden">
            <Image
              src="/images/screenshots/sprintmaths-guided-exercise.png"
              alt="Capture mobile SprintMaths d'un exercice guidé type bac."
              width={390}
              height={844}
              loading="eager"
              className="aspect-[390/844] w-full rounded-[28px] border border-white/20 object-cover object-top shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-5">
        <div className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-3">
          {[
            { value: "4", label: "aperçus de sujets type bac" },
            { value: "4", label: "étapes de corrigé guidé" },
            { value: "39 €", label: "Pack Révision Express" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg bg-slate-50 p-4 text-center">
              <p className="text-3xl font-black text-blue-950">{stat.value}</p>
              <p className="mt-1 text-sm font-semibold text-slate-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <nav
        id="sommaire"
        aria-label="Sommaire de la page"
        className="border-b border-slate-200 bg-white px-4 py-4"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
            Sur cette page
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {pageAnchors.map((item) => (
              <li key={item.href}>
                <TrackedLink
                  href={item.href}
                  eventName="click_subjects_page_anchor"
                  eventParams={{
                    source_page: pagePath,
                    anchor: item.anchor,
                    intent: "sujets_type_bac",
                  }}
                  className="inline-flex min-h-11 items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-900"
                >
                  {item.label}
                </TrackedLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <section className="px-4 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl space-y-16">
          <section className="grid gap-8 lg:grid-cols-[0.85fr_1fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
                Entraînement Bac
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Pourquoi travailler des sujets type bac en maths ?
              </h2>
              <div className="mt-5 space-y-4 leading-7 text-slate-700">
                <p>
                  Un sujet type bac maths Terminale oblige à relier plusieurs
                  réflexes : reconnaître le chapitre, choisir une méthode, mener
                  les calculs et rédiger une conclusion. C&apos;est souvent là que
                  l&apos;élève voit la différence entre connaître le cours et savoir
                  l&apos;utiliser.
                </p>
                <p>
                  Travailler des sujets type bac avec corrigé guidé permet de
                  comprendre le chemin avant de mémoriser une réponse. L&apos;objectif
                  n&apos;est pas de deviner le contenu de l&apos;épreuve, mais de
                  progresser sur les formats d&apos;exercices qui reviennent en
                  Terminale.
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Savoir quoi faire au premier brouillon.",
                "Passer d'une correction lue à une méthode réutilisable.",
                "Repérer les erreurs qui coûtent vite des points.",
                "Travailler les chapitres clés sans réviser au hasard.",
              ].map((item) => (
                <article
                  key={item}
                  className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <p className="mt-3 font-semibold leading-6 text-slate-800">
                    {item}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section id="sujets-guides" className="scroll-mt-24">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
                Format SprintMaths
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Ce que contient un sujet type bac SprintMaths
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                Les aperçus de cette première liste ne remplacent pas un sujet
                complet de 2 h. Ils montrent comment SprintMaths structure
                l&apos;entraînement : objectif, chapitres, méthode, erreur fréquente
                et correction guidée aperçu.
              </p>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-4">
              {sprintMathsContents.map((item) => (
                <article key={item.title} className="rounded-lg bg-slate-50 p-5">
                  <item.icon className="h-6 w-6 text-blue-800" />
                  <h3 className="mt-3 text-lg font-bold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {subjectPreviews.map((subject) => (
            <SubjectPreviewCard key={subject.slug} subject={subject} />
          ))}

          <section id="sujet-guide-complet" className="scroll-mt-24">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1fr] lg:items-start">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
                  Sujet complet 1
                </p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950">
                  Sujet complet 1 : analyse, suites et limites
                </h2>
                <p className="mt-4 leading-7 text-slate-700">
                  Voici un sujet d’entraînement SprintMaths, construit dans
                  l’esprit des exercices type bac. Il sert à travailler les
                  méthodes, mais ne constitue pas une annale officielle.
                </p>
                <TrackedLink
                  href="/exercices-type-bac-maths-terminale"
                  eventName="click_subject_complete_typebac_start"
                  eventParams={{
                    ...subjectCompleteBaseEventParams,
                    cta_location: "complete_subject_intro",
                    destination_page: "/exercices-type-bac-maths-terminale",
                  }}
                  className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-900 px-5 py-3 text-center font-bold text-white hover:bg-blue-800 sm:w-auto"
                >
                  Continuer avec les exercices type bac guidés
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <h3 className="flex items-center gap-2 text-xl font-bold text-slate-950">
                  <ListChecks className="h-5 w-5 text-emerald-600" />
                  Ce sujet travaille trois réflexes
                </h3>
                <ul className="mt-4 space-y-3 text-slate-700">
                  {[
                    "Transformer une suite récurrente en suite géométrique.",
                    "Étudier une fonction avec la dérivée et son signe.",
                    "Comparer x et ln(x) pour conclure sur une limite.",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 leading-7">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 space-y-8">
              {completeSubjectParts.map((part) => (
                <CompleteSubjectPartCard
                  key={part.part}
                  part={part}
                  chapterLinkEventName="click_subject_complete_chapter_link"
                  baseParams={subjectCompleteBaseEventParams}
                  ctaPrefix="complete_subject"
                />
              ))}
            </div>

            <div className="mt-10 grid gap-6 rounded-lg border border-slate-200 bg-slate-50 p-5 sm:p-6 lg:grid-cols-[0.85fr_1fr] lg:items-start">
              <div>
                <h3 className="text-2xl font-bold text-slate-950">
                  Comment utiliser le sujet complet 1
                </h3>
                <ol className="mt-5 list-decimal space-y-3 pl-5 leading-7 text-slate-700">
                  {completeSubjectUseSteps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <TrackedLink
                  href="/exercices-type-bac-maths-terminale"
                  eventName="click_subject_complete_typebac_start"
                  eventParams={{
                    ...subjectCompleteBaseEventParams,
                    cta_location: "complete_subject_final_typebac",
                    destination_page: "/exercices-type-bac-maths-terminale",
                  }}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-900 px-5 py-3 text-center font-bold text-white hover:bg-blue-800"
                >
                  Continuer avec les exercices type bac guidés
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
                <TrackedLink
                  href="/planning-revision-bac-maths"
                  eventName="click_subject_complete_planning"
                  eventParams={{
                    ...subjectCompleteBaseEventParams,
                    lead_magnet: "planning_bac_maths_2027",
                    cta_location: "complete_subject_final_planning",
                    destination_page: "/planning-revision-bac-maths",
                  }}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-blue-900 bg-white px-5 py-3 text-center font-bold text-blue-900 hover:bg-blue-50"
                >
                  Recevoir le planning Bac Maths 2027
                </TrackedLink>
                <TrackedLink
                  href="/diagnostic"
                  eventName="click_subject_complete_diagnostic"
                  eventParams={{
                    ...subjectCompleteBaseEventParams,
                    cta_location: "complete_subject_final_diagnostic",
                    destination_page: "/diagnostic",
                  }}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-center font-bold text-slate-800 hover:bg-slate-100"
                >
                  Faire le diagnostic gratuit
                </TrackedLink>
                <TrackedLink
                  href="/bac-maths-2027#offre"
                  eventName="click_subject_complete_offer"
                  eventParams={{
                    ...packEventParams,
                    ...subjectCompleteBaseEventParams,
                    cta_location: "complete_subject_final_offer",
                    destination_page: "/bac-maths-2027#offre",
                  }}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-center font-bold text-white hover:bg-emerald-500"
                >
                  Voir le Pack Révision Express
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
              </div>
            </div>
            <Link
              href="#sommaire"
              className="mt-5 inline-flex min-h-11 items-center text-sm font-bold text-blue-900 hover:underline"
            >
              Retour au sommaire
            </Link>
          </section>

          <section
            id="sujet-guide-probabilites-geometrie-integrales"
            className="scroll-mt-24"
          >
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1fr] lg:items-start">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
                  Sujet complet 2
                </p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950">
                  Sujet complet 2 : probabilités, géométrie et intégrales
                </h2>
                <p className="mt-4 leading-7 text-slate-700">
                  Voici un deuxième sujet d’entraînement SprintMaths, construit
                  dans l’esprit des exercices type bac. Il permet de travailler
                  trois chapitres classiques : probabilités, géométrie dans
                  l’espace et intégrales. Ce contenu n’est pas une annale
                  officielle.
                </p>
                <TrackedLink
                  href="/exercices-type-bac-maths-terminale"
                  eventName="click_subject_complete_2_typebac_start"
                  eventParams={{
                    ...subjectComplete2BaseEventParams,
                    cta_location: "complete_subject_2_intro",
                    destination_page: "/exercices-type-bac-maths-terminale",
                  }}
                  className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-900 px-5 py-3 text-center font-bold text-white hover:bg-blue-800 sm:w-auto"
                >
                  Continuer avec les exercices type bac guidés
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <h3 className="flex items-center gap-2 text-xl font-bold text-slate-950">
                  <ListChecks className="h-5 w-5 text-emerald-600" />
                  Ce sujet travaille trois réflexes
                </h3>
                <ul className="mt-4 space-y-3 text-slate-700">
                  {completeSubject2Reflexes.map((item) => (
                    <li key={item} className="flex gap-3 leading-7">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 space-y-8">
              {completeSubject2Parts.map((part) => (
                <CompleteSubjectPartCard
                  key={part.part}
                  part={part}
                  chapterLinkEventName="click_subject_complete_2_chapter_link"
                  baseParams={subjectComplete2BaseEventParams}
                  ctaPrefix="complete_subject_2"
                />
              ))}
            </div>

            <div className="mt-10 grid gap-6 rounded-lg border border-slate-200 bg-slate-50 p-5 sm:p-6 lg:grid-cols-[0.85fr_1fr] lg:items-start">
              <div>
                <h3 className="text-2xl font-bold text-slate-950">
                  Comment utiliser le sujet complet 2
                </h3>
                <ol className="mt-5 list-decimal space-y-3 pl-5 leading-7 text-slate-700">
                  {completeSubject2UseSteps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <TrackedLink
                  href="/exercices-type-bac-maths-terminale"
                  eventName="click_subject_complete_2_typebac_start"
                  eventParams={{
                    ...subjectComplete2BaseEventParams,
                    cta_location: "complete_subject_2_final_typebac",
                    destination_page: "/exercices-type-bac-maths-terminale",
                  }}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-900 px-5 py-3 text-center font-bold text-white hover:bg-blue-800"
                >
                  Continuer avec les exercices type bac guidés
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
                <TrackedLink
                  href="#sujet-guide-complet"
                  eventName="click_subject_complete_2_first_subject"
                  eventParams={{
                    ...subjectComplete2BaseEventParams,
                    cta_location: "complete_subject_2_final_first_subject",
                    destination_page: "#sujet-guide-complet",
                  }}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-blue-900 bg-white px-5 py-3 text-center font-bold text-blue-900 hover:bg-blue-50"
                >
                  Voir le premier sujet guidé
                </TrackedLink>
                <TrackedLink
                  href="/planning-revision-bac-maths"
                  eventName="click_subject_complete_2_planning"
                  eventParams={{
                    ...subjectComplete2BaseEventParams,
                    lead_magnet: "planning_bac_maths_2027",
                    cta_location: "complete_subject_2_final_planning",
                    destination_page: "/planning-revision-bac-maths",
                  }}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-blue-900 bg-white px-5 py-3 text-center font-bold text-blue-900 hover:bg-blue-50"
                >
                  Recevoir le planning Bac Maths 2027
                </TrackedLink>
                <TrackedLink
                  href="/diagnostic"
                  eventName="click_subject_complete_2_diagnostic"
                  eventParams={{
                    ...subjectComplete2BaseEventParams,
                    cta_location: "complete_subject_2_final_diagnostic",
                    destination_page: "/diagnostic",
                  }}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-center font-bold text-slate-800 hover:bg-slate-100"
                >
                  Faire le diagnostic gratuit
                </TrackedLink>
                <TrackedLink
                  href="/bac-maths-2027#offre"
                  eventName="click_subject_complete_2_offer"
                  eventParams={{
                    ...packEventParams,
                    ...subjectComplete2BaseEventParams,
                    cta_location: "complete_subject_2_final_offer",
                    destination_page: "/bac-maths-2027#offre",
                  }}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-center font-bold text-white hover:bg-emerald-500"
                >
                  Voir le Pack Révision Express
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
              </div>
            </div>
            <Link
              href="#sommaire"
              className="mt-5 inline-flex min-h-11 items-center text-sm font-bold text-blue-900 hover:underline"
            >
              Retour au sommaire
            </Link>
          </section>

          <section id="sujets-par-chapitre" className="scroll-mt-24">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
                Chapitres Terminale
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Sujets type bac par chapitre
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                Pour réviser efficacement, travaille chaque sujet type bac par
                chapitre : commence par identifier la méthode, puis passe au
                corrigé guidé.
              </p>
              <p className="mt-3 leading-7 text-slate-700">
                Pour replacer chaque notion dans l&apos;année, consulte aussi le{" "}
                <Link
                  href="/programme-maths-terminale"
                  className="font-bold text-blue-900 hover:underline"
                >
                  programme maths Terminale
                </Link>
                .
              </p>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {chapterSubjectLinks.map((chapter) => (
                <article
                  key={chapter.trackingChapter}
                  className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-blue-900">
                    Chapitre
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-slate-950">
                    {chapter.chapter}
                  </h3>

                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <div>
                      <p className="text-sm font-bold text-slate-950">
                        Ce qu&apos;on travaille dans un sujet type bac
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        {chapter.work}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-950">
                        Erreur fréquente
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        {chapter.pitfall}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <TrackedLink
                      href={chapter.exerciseHref}
                      eventName={
                        chapter.trackingChapter === "integrales"
                          ? "click_internal_integrales_cluster"
                          : "click_subjects_chapter_table"
                      }
                      eventParams={{
                        source_page: pagePath,
                        chapter: chapter.trackingChapter,
                        destination_page: chapter.exerciseHref,
                        ...(chapter.trackingChapter === "integrales"
                          ? {
                              cluster: "integrales",
                              level: "terminale",
                            }
                          : {}),
                        link_type: "exercise",
                        intent: "sujets_type_bac",
                      }}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-blue-900 px-4 py-2 text-center text-sm font-bold text-white hover:bg-blue-800"
                    >
                      Exercices guidés
                      <ArrowRight className="h-4 w-4" />
                    </TrackedLink>
                    <TrackedLink
                      href={chapter.methodHref}
                      eventName={
                        chapter.trackingChapter === "integrales"
                          ? "click_internal_integrales_cluster"
                          : "click_subjects_chapter_table"
                      }
                      eventParams={{
                        source_page: pagePath,
                        chapter: chapter.trackingChapter,
                        destination_page: chapter.methodHref,
                        ...(chapter.trackingChapter === "integrales"
                          ? {
                              cluster: "integrales",
                              level: "terminale",
                            }
                          : {}),
                        link_type: "method",
                        intent: "sujets_type_bac",
                      }}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-blue-900 px-4 py-2 text-center text-sm font-bold text-blue-900 hover:bg-blue-50"
                    >
                      Méthode
                      <ArrowRight className="h-4 w-4" />
                    </TrackedLink>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section
            id="corrige-guide"
            className="grid scroll-mt-24 gap-8 lg:grid-cols-[0.85fr_1fr] lg:items-start"
          >
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
                Correction guidée
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Comment utiliser un corrigé guidé
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                Lire une correction en entier peut donner l&apos;impression de
                comprendre. Un corrigé guidé sert plutôt à reconstruire le
                raisonnement : on avance étape par étape, puis on vérifie que la
                conclusion répond vraiment à la question.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {guidedCorrectionSteps.map((step, index) => (
                <article
                  key={step}
                  className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <p className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-900 text-sm font-black text-white">
                    {index + 1}
                  </p>
                  <h3 className="mt-4 text-lg font-bold text-slate-950">
                    {step.replace(/^Étape \d : /, "")}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {index === 0 &&
                      "Repérer si la question relève des suites, de l'analyse, des probabilités ou d'un autre chapitre."}
                    {index === 1 &&
                      "Choisir l'outil utile avant de calculer : dérivée, arbre pondéré, tableau de variation, formule de suite."}
                    {index === 2 &&
                      "Écrire les calculs dans l'ordre, avec les conditions nécessaires lorsque l'énoncé en impose."}
                    {index === 3 &&
                      "Transformer le résultat en phrase mathématique claire, liée à la question."}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section
            id="transparence"
            className="grid scroll-mt-24 gap-6 rounded-lg border border-slate-200 bg-slate-50 p-6 sm:p-8 lg:grid-cols-[0.9fr_1fr] lg:items-start"
          >
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
                Transparence
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Sujets type bac SprintMaths : transparence
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                {officialContentDisclaimer}
              </p>
              <p className="mt-4 leading-7 text-slate-700">
                Le but est de travailler les méthodes, les chapitres clés et la
                rédaction attendue dans des formats proches de l&apos;entraînement au
                bac maths Terminale.
              </p>
            </div>
            <div className="rounded-lg bg-white p-5 shadow-sm">
              <GraduationCap className="h-7 w-7 text-blue-800" />
              <h3 className="mt-4 text-2xl font-bold text-slate-950">
                Une page pour s&apos;entraîner, pas pour annoncer le sujet du bac
              </h3>
              <p className="mt-3 leading-7 text-slate-700">
                Les sujets type bac SprintMaths servent à répéter les bons
                gestes : identifier, calculer, justifier, conclure. Ils complètent
                les révisions sans promettre une note ni reproduire un contenu
                ministériel.
              </p>
            </div>
          </section>

          <section>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
                  Chapitres clés
                </p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950">
                  Continuer avec les exercices guidés
                </h2>
                <p className="mt-4 max-w-3xl leading-7 text-slate-700">
                  Après un sujet type bac, renforce le chapitre exact qui a posé
                  problème. Les exercices guidés aident à isoler la méthode avant
                  de revenir à un format plus long.
                </p>
              </div>
              <TrackedLink
                href="/exercices-type-bac-maths-terminale"
                eventName="click_subjects_typebac_start"
                eventParams={{
                  ...baseEventParams,
                  cta_location: "subjects_continue_top",
                  destination_page: "/exercices-type-bac-maths-terminale",
                }}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-blue-900 px-5 py-3 text-center font-bold text-white hover:bg-blue-800"
              >
                Essayer un sujet type bac guidé
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {clusterLinks.map((link) => (
                <TrackedLink
                  key={link.href}
                  href={link.href}
                  eventName={
                    link.cluster === "geometrie-espace"
                      ? "click_internal_geometrie_cluster"
                      : link.cluster === "integrales"
                        ? "click_internal_integrales_cluster"
                      : "click_subjects_cluster_exercise"
                  }
                  eventParams={{
                    ...baseEventParams,
                    cluster: link.cluster,
                    destination_page: link.href,
                    cta_location: "subjects_cluster_grid",
                  }}
                  className="rounded-lg border border-slate-200 bg-white p-4 font-semibold text-slate-800 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-blue-950"
                >
                  {link.label}
                </TrackedLink>
              ))}
            </div>

            <div className="mt-8 grid gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div>
                <h3 className="text-2xl font-bold text-slate-950">
                  Pack Révision Express
                </h3>
                <p className="mt-3 leading-7 text-slate-700">
                  Le pack rassemble des exercices type bac guidés, des méthodes,
                  une progression, un accès mobile et un parcours de révision
                  pour préparer le Bac Maths 2027.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    "Exercices type bac guidés",
                    "Méthodes courtes",
                    "Progression visible",
                    "Accès mobile",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-lg bg-slate-50 p-4">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                      <span className="font-semibold text-slate-800">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border-2 border-blue-900 bg-blue-50 p-6">
                <p className="text-sm font-bold uppercase text-blue-900">
                  Paiement unique
                </p>
                <div className="mt-4 flex items-end gap-2">
                  <span className="text-5xl font-black text-slate-950">
                    {PACK_REVISION_EXPRESS_PRICE} €
                  </span>
                  <span className="pb-2 text-sm font-semibold text-slate-600">
                    Pack Révision Express
                  </span>
                </div>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
                  <li className="flex gap-2">
                    <Smartphone className="h-5 w-5 shrink-0 text-blue-800" />
                    Utilisable sur téléphone, sans application native à installer.
                  </li>
                  <li className="flex gap-2">
                    <LineChart className="h-5 w-5 shrink-0 text-amber-700" />
                    Progression visible, sans garantie de note.
                  </li>
                  <li className="flex gap-2">
                    <ListChecks className="h-5 w-5 shrink-0 text-emerald-600" />
                    Planning et diagnostic gratuits pour commencer.
                  </li>
                </ul>
                <div className="mt-6 grid gap-3">
                  <TrackedLink
                    href="/bac-maths-2027#offre"
                    eventName="click_subjects_typebac_offer"
                    eventParams={{
                      ...packEventParams,
                      cta_location: "subjects_offer_card",
                      destination_page: "/bac-maths-2027#offre",
                    }}
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-900 px-5 py-3 text-center font-bold text-white hover:bg-blue-800"
                  >
                    Voir le Pack Révision Express
                    <ArrowRight className="h-4 w-4" />
                  </TrackedLink>
                  <TrackedLink
                    href="/diagnostic"
                    eventName="click_subjects_typebac_diagnostic"
                    eventParams={{
                      ...baseEventParams,
                      cta_location: "subjects_offer_diagnostic",
                      destination_page: "/diagnostic",
                    }}
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-blue-900 px-5 py-3 text-center font-bold text-blue-900 hover:bg-white"
                  >
                    Faire le diagnostic gratuit
                  </TrackedLink>
                  <TrackedLink
                    href="/planning-revision-bac-maths"
                    eventName="click_subjects_typebac_planning"
                    eventParams={{
                      ...baseEventParams,
                      lead_magnet: "planning_bac_maths_2027",
                      cta_location: "subjects_offer_planning",
                      destination_page: "/planning-revision-bac-maths",
                    }}
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-center font-bold text-slate-800 hover:bg-slate-50"
                  >
                    Voir le planning gratuit
                  </TrackedLink>
                </div>
              </div>
            </div>
          </section>

          <div id="faq" className="scroll-mt-24">
            <FaqAccordion items={faqItems} sourcePage={pagePath} />
          </div>

          <section className="rounded-lg bg-slate-50 p-6">
            <p className="text-2xl font-bold text-slate-950">
              Continuer les révisions Bac Maths Terminale
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {internalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-200 hover:text-blue-900"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>
    </SeoPageLayout>
  );
}
