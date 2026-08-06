import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Code2,
  Target,
} from "lucide-react";
import { PrintButton } from "@/components/marketing/PrintButton";
import { SeoFaq } from "@/components/marketing/SeoFaq";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/seo";
import styles from "../seo-resource.module.css";

const pagePath = "/preparer-entree-terminale-specialite-maths";
const title = "Préparer son entrée en Terminale spécialité maths";
const description =
  "Les prérequis de Première à revoir avant la Terminale spécialité maths : calcul, fonctions, dérivation, exponentielle, suites, probabilités, vecteurs et Python.";

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

const sectionLinks = [
  { id: "vacances", label: "Travailler pendant les vacances ?" },
  { id: "calcul", label: "Calcul algébrique" },
  { id: "fonctions", label: "Fonctions" },
  { id: "derivation", label: "Dérivation" },
  { id: "exponentielle", label: "Exponentielle" },
  { id: "suites", label: "Suites" },
  { id: "probabilites", label: "Probabilités" },
  { id: "geometrie", label: "Géométrie" },
  { id: "python", label: "Python" },
  { id: "programme-14-jours", label: "Programme 14 jours" },
  { id: "test", label: "Test rapide" },
  { id: "lacunes", label: "En cas de lacunes" },
];

const prerequisites = [
  {
    id: "calcul",
    title: "Les calculs algébriques à maîtriser",
    points: [
      "Développer, réduire et factoriser des expressions simples.",
      "Manipuler les fractions, les puissances et les racines carrées.",
      "Résoudre une équation du premier degré et une équation produit.",
      "Étudier le signe d’un produit ou d’un quotient avec un tableau.",
      "Reconnaître une identité remarquable et choisir la forme la plus utile.",
    ],
    check:
      "Tu dois pouvoir transformer une expression sans perdre le domaine ni changer le signe d’une inégalité au mauvais moment.",
  },
  {
    id: "fonctions",
    title: "Fonctions et variations",
    points: [
      "Lire un domaine, une image, un antécédent et un extremum sur un graphique.",
      "Passer d’un tableau de signes à une information sur la courbe.",
      "Connaître les formes utiles d’un trinôme du second degré.",
      "Résoudre graphiquement puis algébriquement une équation ou une inéquation.",
      "Relier le signe de f′ au sens de variation de f.",
      "Repérer un angle sur le cercle trigonométrique, connaître les valeurs remarquables et utiliser parité et périodicité de sinus et cosinus.",
    ],
    check:
      "Sur une fonction donnée, tu dois distinguer le signe de f, le signe de f′ et les variations de f.",
  },
  {
    id: "derivation",
    title: "Dérivation",
    points: [
      "Connaître les domaines de définition et les dérivées de x, x², x³, 1/x pour x ≠ 0 et √x pour x > 0 ; savoir que √x n’est pas dérivable en 0.",
      "Dériver une somme, un produit simple et une fonction polynomiale.",
      "Calculer l’équation d’une tangente en un point.",
      "Étudier le signe d’une dérivée pour construire un tableau de variation.",
      "Interpréter f′(a) comme coefficient directeur de la tangente.",
    ],
    check:
      "Si tu calcules f′, tu dois ensuite savoir à quoi son signe sert dans l’étude de f.",
  },
  {
    id: "exponentielle",
    title: "Exponentielle",
    points: [
      "Utiliser eᵃ⁺ᵇ = eᵃeᵇ et e⁻ᵃ = 1/eᵃ.",
      "Savoir que eˣ est strictement positive sur ℝ.",
      "Dériver eˣ et une expression simple du type eᵃˣ⁺ᵇ.",
      "Résoudre des équations simples en mettant les exponentielles sous une même forme.",
      "Reconnaître une évolution multiplicative modélisée par une exponentielle ou une suite géométrique.",
    ],
    check:
      "Ne traite jamais l’exponentielle comme une puissance ordinaire : eᵃ⁺ᵇ n’est pas eᵃ + eᵇ.",
  },
  {
    id: "suites",
    title: "Suites",
    points: [
      "Calculer des termes à partir d’une formule explicite ou d’une relation de récurrence.",
      "Reconnaître une suite arithmétique ou géométrique.",
      "Passer de uₙ à uₙ₊₁ sans confondre les indices.",
      "Utiliser uₙ = u₀ + nr ou uₙ = u₀qⁿ dans le bon contexte.",
      "Étudier une variation simple avec uₙ₊₁ − uₙ.",
    ],
    check:
      "Tu dois toujours noter le rang de départ avant d’utiliser une formule explicite.",
  },
  {
    id: "probabilites",
    title: "Probabilités",
    points: [
      "Nommer des événements et leurs contraires.",
      "Lire et compléter un arbre pondéré.",
      "Calculer une intersection en multipliant le long d’un chemin.",
      "Utiliser une probabilité conditionnelle et la formule des probabilités totales.",
      "Calculer l’espérance d’une variable aléatoire finie simple.",
    ],
    check:
      "Avant chaque calcul, écris si tu cherches P(A), P(A ∩ B) ou P_A(B).",
  },
  {
    id: "geometrie",
    title: "Géométrie et vecteurs",
    points: [
      "Calculer les coordonnées d’un vecteur et d’un milieu.",
      "Tester la colinéarité de deux vecteurs.",
      "Utiliser une équation cartésienne de droite dans le plan.",
      "Calculer un produit scalaire dans un repère orthonormé.",
      "Relier produit scalaire nul et orthogonalité.",
    ],
    check:
      "Ces automatismes du plan serviront de base aux droites, plans et vecteurs de l’espace en Terminale.",
  },
];

const fourteenDayPlan = [
  {
    day: "Jour 1",
    topic: "Calcul algébrique",
    task: "Revoir identités remarquables, développement et factorisation ; faire 4 calculs courts.",
  },
  {
    day: "Jour 2",
    topic: "Équations et signes",
    task: "Résoudre 2 équations produit et construire 1 tableau de signes.",
  },
  {
    day: "Jour 3",
    topic: "Fonctions",
    task: "Lire domaine, images, antécédents et variations sur deux représentations.",
  },
  {
    day: "Jour 4",
    topic: "Repos ou rattrapage",
    task: "Aucun nouveau chapitre. Corriger une erreur des trois premiers jours si nécessaire.",
    rest: true,
  },
  {
    day: "Jour 5",
    topic: "Dérivation",
    task: "Revoir les dérivées usuelles et dériver 5 fonctions courtes.",
  },
  {
    day: "Jour 6",
    topic: "Variations",
    task: "Étudier le signe d’une dérivée puis compléter un tableau de variation.",
  },
  {
    day: "Jour 7",
    topic: "Exponentielle",
    task: "Revoir ses propriétés, simplifier 4 expressions et résoudre 2 équations simples.",
  },
  {
    day: "Jour 8",
    topic: "Repos ou correction active",
    task: "Refaire sans modèle les deux questions qui ont demandé le plus d’aide.",
    rest: true,
  },
  {
    day: "Jour 9",
    topic: "Suites",
    task: "Calculer des termes et reconnaître une suite arithmétique puis géométrique.",
  },
  {
    day: "Jour 10",
    topic: "Probabilités",
    task: "Compléter un arbre et calculer une intersection puis une probabilité conditionnelle.",
  },
  {
    day: "Jour 11",
    topic: "Vecteurs",
    task: "Calculer des coordonnées, tester une colinéarité et un produit scalaire.",
  },
  {
    day: "Jour 12",
    topic: "Repos ou rattrapage",
    task: "Relire la fiche d’erreurs ; ne reprendre qu’un point encore fragile.",
    rest: true,
  },
  {
    day: "Jour 13",
    topic: "Python",
    task: "Lire une boucle for et une boucle while, puis modifier une condition ou une borne.",
  },
  {
    day: "Jour 14",
    topic: "Bilan léger",
    task: "Faire le test rapide de cette page, corriger activement et choisir deux priorités pour septembre.",
  },
];

const readinessTest = [
  {
    question: "1. Développe et réduis : 3(2x − 1) − 2(x + 4).",
    answer: "4x − 11.",
  },
  {
    question: "2. Résous : (2x − 3)(x + 1) = 0.",
    answer: "x = 3/2 ou x = −1.",
  },
  {
    question: "3. Sur quels intervalles x² − 4 est-il positif ou nul ?",
    answer: "Sur ]−∞ ; −2] ∪ [2 ; +∞[.",
  },
  {
    question: "4. Si f(x) = x³ − 4x + 1, quelle est f′(x) ?",
    answer: "f′(x) = 3x² − 4.",
  },
  {
    question: "5. Simplifie e²ˣ × e⁻ˣ.",
    answer: "eˣ.",
  },
  {
    question: "6. Une suite arithmétique vérifie u₀ = 3 et r = 2. Calcule u₅.",
    answer: "u₅ = 3 + 5 × 2 = 13.",
  },
  {
    question: "7. Une suite géométrique vérifie u₁ = 4 et q = 0,5. Calcule u₄.",
    answer: "u₄ = 4 × 0,5³ = 0,5.",
  },
  {
    question: "8. Comment calcule-t-on P_A(B) lorsque P(A) > 0 ?",
    answer: "P_A(B) = P(A ∩ B) / P(A).",
  },
  {
    question: "9. Dans un repère orthonormé, calcule (1 ; 2) · (4 ; −2).",
    answer: "1 × 4 + 2 × (−2) = 0 : les deux vecteurs sont orthogonaux.",
  },
  {
    question: "10. Quelle valeur contient s après l’exécution du programme Python ci-dessous ?",
    code: `s = 0
for k in range(4):
    s = s + k`,
    answer: "s vaut 0 + 1 + 2 + 3 = 6.",
  },
];

const faqItems: FaqItem[] = [
  {
    question: "Faut-il travailler tous les jours pendant les vacances ?",
    answer:
      "Non. Trois à cinq séances courtes par semaine suffisent pour une remise en route. Les jours de repos et de rattrapage du programme évitent d’accumuler du retard.",
  },
  {
    question: "Faut-il commencer le programme de Terminale en avance ?",
    answer:
      "Ce n’est pas la priorité. Consolider les automatismes de Première rendra les nouveaux chapitres plus accessibles. Tu peux seulement parcourir le programme pour comprendre ce qui arrive.",
  },
  {
    question: "Quel résultat faut-il obtenir au test rapide ?",
    answer:
      "Il n’y a pas de seuil officiel. Regarde surtout la nature des erreurs : calcul, vocabulaire, choix de formule ou rédaction. Deux ou trois erreurs du même type donnent une priorité de révision.",
  },
  {
    question: "Cette page remplace-t-elle le planning de révision du Bac ?",
    answer:
      "Non. Cette page prépare la rentrée en révisant les prérequis de Première. Le planning Bac sur 30 jours sert plus tard à organiser les chapitres de Terminale avant l’épreuve.",
  },
];

export default function PreparerEntreeTerminaleSpecialiteMathsPage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Bac Maths 2027", path: "/bac-maths-2027" },
            { name: "Préparer l’entrée en Terminale", path: pagePath },
          ]),
        ]}
      />

      <div className={`${styles.printPage} bg-white`}>
        <section className="border-b border-slate-200 bg-gradient-to-b from-emerald-50 to-white px-4 py-14 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="mb-4 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-950">
              Remise à niveau avant septembre
            </p>
            <h1 className="max-w-5xl text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl">
              Que réviser avant d’entrer en Terminale spécialité maths ?
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
              L’objectif n’est pas de prendre de l’avance sur toute la Terminale.
              Il s’agit de consolider les bases de Première qui seront réutilisées
              dès les premières semaines.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#programme-14-jours"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-blue-900 px-5 py-3 font-bold text-white hover:bg-blue-800"
              >
                Voir le programme sur 14 jours
              </Link>
              <Link
                href="#test"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-blue-900 px-5 py-3 font-bold text-blue-900 hover:bg-blue-50"
              >
                Faire le test rapide
              </Link>
            </div>
          </div>
        </section>

        <section className="px-4 py-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-4 md:grid-cols-2">
              <article className="rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-5">
                <h2 className="text-xl font-bold text-emerald-950">
                  Cette page : préparer la rentrée
                </h2>
                <p className="mt-2 leading-7 text-slate-700">
                  Revoir les prérequis de Première, retrouver des automatismes et
                  identifier deux ou trois lacunes avant septembre.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h2 className="text-xl font-bold text-slate-950">
                  Le planning Bac : préparer l’épreuve
                </h2>
                <p className="mt-2 leading-7 text-slate-700">
                  Organiser les révisions des chapitres de Terminale avant le Bac
                  avec un calendrier de 30 jours. Ce n’est pas le même objectif.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="px-4 py-8">
          <div className="mx-auto max-w-6xl">
            <nav
              aria-label="Sommaire de la préparation à la Terminale"
              className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 sm:p-6"
            >
              <h2 className="text-2xl font-bold text-slate-950">Sommaire</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {sectionLinks.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-semibold text-emerald-950 hover:border-emerald-300"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </section>

        <section className="px-4 pb-12">
          <div className="mx-auto max-w-6xl space-y-12">
            <section id="vacances" className="scroll-mt-24 grid gap-7 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-emerald-800">
                  1. Trouver le bon rythme
                </p>
                <h2 className="mt-2 text-3xl font-bold text-slate-950">
                  Faut-il travailler pendant les vacances ?
                </h2>
              </div>
              <div className="space-y-4 leading-7 text-slate-700">
                <p>
                  Ce n’est pas obligatoire de travailler tout l’été. Une reprise
                  légère pendant les deux dernières semaines suffit souvent pour
                  retrouver les automatismes et arriver avec des repères clairs.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-blue-50 p-4">
                    <Clock3 className="h-6 w-6 text-blue-800" aria-hidden="true" />
                    <p className="mt-2 font-bold text-blue-950">30 à 45 minutes</p>
                    <p className="mt-1 text-sm">Une notion, quelques exercices, une correction active.</p>
                  </div>
                  <div className="rounded-xl bg-emerald-50 p-4">
                    <CheckCircle2 className="h-6 w-6 text-emerald-700" aria-hidden="true" />
                    <p className="mt-2 font-bold text-emerald-950">Des jours sans travail</p>
                    <p className="mt-1 text-sm">Le repos et le rattrapage font partie du programme.</p>
                  </div>
                </div>
              </div>
            </section>

            {prerequisites.map((item, index) => (
              <section
                key={item.id}
                id={item.id}
                className="scroll-mt-24 rounded-2xl border border-slate-200 p-6 sm:p-8"
              >
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-emerald-800">
                  {index + 2}. Prérequis de Première
                </p>
                <h2 className="mt-2 text-3xl font-bold text-slate-950">{item.title}</h2>
                <ul className="mt-6 grid gap-3 md:grid-cols-2">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700"
                        aria-hidden="true"
                      />
                      <span className="leading-7 text-slate-700">{point}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 rounded-xl border-l-4 border-emerald-600 bg-emerald-50 p-4 leading-7 text-emerald-950">
                  <strong>Point de contrôle :</strong> {item.check}
                </p>
              </section>
            ))}

            <section id="python" className="scroll-mt-24 rounded-2xl border border-slate-200 p-6 sm:p-8">
              <div className="flex items-start gap-3">
                <Code2 className="mt-1 h-7 w-7 shrink-0 text-blue-800" aria-hidden="true" />
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-emerald-800">
                    9. Algorithmique
                  </p>
                  <h2 className="mt-2 text-3xl font-bold text-slate-950">
                    Algorithmique et Python
                  </h2>
                </div>
              </div>
              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                <div>
                  <ul className="space-y-3 leading-7 text-slate-700">
                    <li>Lire une affectation et suivre la valeur d’une variable.</li>
                    <li>Comprendre une condition <code>if</code> / <code>else</code>.</li>
                    <li>Utiliser une boucle <code>for</code> pour répéter un nombre connu d’étapes.</li>
                    <li>Utiliser une boucle <code>while</code> avec une condition d’arrêt claire.</li>
                    <li>Écrire une fonction simple avec des paramètres et une valeur renvoyée.</li>
                  </ul>
                </div>
                <pre className="overflow-x-auto rounded-xl bg-slate-950 p-5 text-sm leading-7 text-slate-100">
                  <code>{`def terme(u0, q, n):
    u = u0
    for _ in range(n):
        u = q * u
    return u`}</code>
                </pre>
              </div>
              <p className="mt-5 rounded-xl bg-blue-50 p-4 leading-7 text-blue-950">
                Ici, u0 est la valeur initiale et n le nombre de multiplications
                par q. Lis le programme ligne par ligne : que renvoie la fonction ?
                L’objectif est de relier le code au raisonnement mathématique.
              </p>
            </section>

            <section className={styles.screenOnly}>
              <div className="max-w-3xl">
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-emerald-800">
                  Exercices adaptés
                </p>
                <h2 className="mt-2 text-3xl font-bold text-slate-950">
                  Vérifier les automatismes qui se prolongent en Terminale
                </h2>
                <p className="mt-3 leading-7 text-slate-700">
                  Commence par le premier exercice guidé de chaque chapitre : il
                  reprend une base de Première avant d’aller vers les nouvelles
                  notions de Terminale.
                </p>
              </div>
              <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    href: "/exercices-maths-terminale/derivation#exercice-1",
                    title: "Dérivation",
                    text: "Calculer une dérivée polynomiale simple.",
                  },
                  {
                    href: "/exercices-maths-terminale/suites#exercice-1",
                    title: "Suites",
                    text: "Reconnaître une suite arithmétique et calculer ses termes.",
                  },
                  {
                    href: "/exercices-maths-terminale/probabilites#exercice-1",
                    title: "Probabilités",
                    text: "Lire puis calculer une probabilité conditionnelle.",
                  },
                  {
                    href: "/exercices-maths-terminale/geometrie-espace#exercice-1",
                    title: "Vecteurs",
                    text: "Retrouver le calcul de coordonnées dans l’espace.",
                  },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-emerald-300 hover:bg-emerald-50"
                  >
                    <h3 className="font-bold text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{item.text}</p>
                    <span className="mt-4 inline-flex items-center gap-2 font-bold text-blue-900">
                      Ouvrir l’exercice
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            <section id="programme-14-jours" className="scroll-mt-24">
              <div className="max-w-3xl">
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-emerald-800">
                  10. Plan léger
                </p>
                <h2 className="mt-2 text-3xl font-bold text-slate-950">
                  Programme de remise à niveau sur 14 jours
                </h2>
                <p className="mt-3 leading-7 text-slate-700">
                  Chaque séance dure 30 à 45 minutes : 10 minutes de rappel,
                  15 à 25 minutes d’exercices, puis 5 à 10 minutes de correction
                  active. Arrête-toi lorsque l’objectif du jour est atteint.
                </p>
              </div>
              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {fourteenDayPlan.map((item) => (
                  <article
                    key={item.day}
                    className={`${styles.dayCard} rounded-2xl border p-5 ${
                      item.rest
                        ? "border-emerald-200 bg-emerald-50"
                        : "border-slate-200 bg-white shadow-sm"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-bold text-blue-900">{item.day}</p>
                      {item.rest ? (
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-emerald-800">
                          Allégé
                        </span>
                      ) : null}
                    </div>
                    <h3 className="mt-2 text-xl font-bold text-slate-950">{item.topic}</h3>
                    <p className="mt-2 leading-7 text-slate-700">{item.task}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="test" className="scroll-mt-24">
              <div className="max-w-3xl">
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-emerald-800">
                  11. Auto-évaluation
                </p>
                <h2 className="mt-2 text-3xl font-bold text-slate-950">
                  Test rapide de préparation
                </h2>
                <p className="mt-3 leading-7 text-slate-700">
                  Réponds sans regarder la correction. Note surtout les questions
                  qui demandent un rappel de cours ou plusieurs essais.
                </p>
              </div>
              <div className="mt-7 grid gap-4">
                {readinessTest.map((item) => (
                  <article
                    key={item.question}
                    className="rounded-xl border border-slate-200 bg-white p-5"
                  >
                    <p className="font-bold text-slate-950">{item.question}</p>
                    {"code" in item ? (
                      <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm leading-6 text-slate-100">
                        <code>{item.code}</code>
                      </pre>
                    ) : null}
                    <details className="mt-4 rounded-lg bg-slate-50 p-4 open:bg-blue-50">
                      <summary className="cursor-pointer font-semibold text-blue-900">
                        Voir la correction
                      </summary>
                      <p className="mt-3 border-l-4 border-emerald-600 pl-4 leading-7 text-slate-700">
                        {item.answer}
                      </p>
                    </details>
                  </article>
                ))}
              </div>
            </section>

            <section
              className={`${styles.checklistCard} rounded-2xl border-2 border-blue-200 bg-blue-50 p-6 sm:p-8`}
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-blue-800">
                    À imprimer
                  </p>
                  <h2 className="mt-2 text-3xl font-bold text-slate-950">
                    Checklist avant la rentrée
                  </h2>
                </div>
                <PrintButton label="Imprimer la checklist" />
              </div>
              <ul className="mt-6 grid gap-3 md:grid-cols-2">
                {[
                  "□ Je sais développer et factoriser une expression simple.",
                  "□ Je sais résoudre une équation produit et étudier un signe.",
                  "□ Je distingue signe, dérivée et variations d’une fonction.",
                  "□ Je connais les dérivées usuelles de Première.",
                  "□ Je manipule les propriétés de l’exponentielle.",
                  "□ Je reconnais une suite arithmétique ou géométrique.",
                  "□ Je lis un arbre de probabilités et un conditionnement.",
                  "□ Je calcule des coordonnées et un produit scalaire.",
                  "□ Je peux suivre une boucle Python à la main.",
                  "□ J’ai noté deux priorités précises pour septembre.",
                ].map((item) => (
                  <li key={item} className="rounded-xl bg-white p-4 leading-7 text-slate-800">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section id="lacunes" className="scroll-mt-24 rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-amber-800">
                12. Choisir une priorité
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-950">
                Que faire en cas de lacunes ?
              </h2>
              <div className="mt-5 space-y-4 leading-7 text-slate-700">
                <p>
                  Ne reprends pas tout le programme dans l’ordre. Classe les erreurs
                  du test en trois familles : calcul, compréhension de notion,
                  rédaction. Choisis ensuite une seule compétence précise à
                  retravailler pendant deux séances.
                </p>
                <p>
                  Si le blocage porte sur plusieurs bases, utilise le diagnostic
                  pour formuler les priorités, puis reviens aux exercices courts.
                  Un professeur peut aider lorsque les erreurs persistent malgré
                  la correction.
                </p>
              </div>
              <Link
                href="/diagnostic"
                className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-900 px-5 py-3 font-bold text-white hover:bg-blue-800 print:hidden"
              >
                Faire le diagnostic
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </section>

            <section className={styles.screenOnly}>
              <h2 className="text-3xl font-bold text-slate-950">Continuer selon ton besoin</h2>
              <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    icon: BookOpenCheck,
                    title: "Programme de Première",
                    text: "Revoir le détail des notions qui servent de prérequis.",
                    href: "/programme-maths-premiere",
                    label: "Voir le programme de Première",
                  },
                  {
                    icon: Target,
                    title: "Exercices adaptés",
                    text: "Commencer par quelques exercices courts sur suites, dérivation ou probabilités.",
                    href: "/exercices-maths-terminale",
                    label: "Choisir un chapitre",
                  },
                  {
                    icon: CheckCircle2,
                    title: "Programme de Terminale",
                    text: "Visualiser les nouveaux chapitres sans chercher à tout apprendre en avance.",
                    href: "/programme-maths-terminale",
                    label: "Voir le programme de Terminale",
                  },
                  {
                    icon: CalendarDays,
                    title: "Planning Bac 30 jours",
                    text: "À utiliser plus tard pour organiser les révisions avant l’épreuve, pas pour préparer septembre.",
                    href: "/planning-revision-bac-maths",
                    label: "Voir le planning Bac",
                  },
                  {
                    icon: BookOpenCheck,
                    title: "Python en Terminale",
                    text: "Reprendre les boucles et les fonctions avec des exemples de suites, seuils et simulations.",
                    href: "/python-bac-maths-terminale",
                    label: "Voir les exemples Python",
                  },
                  {
                    icon: CheckCircle2,
                    title: "Quiz Terminale",
                    text: "Tester neuf thèmes en vingt questions corrigées, sans compte et sans email.",
                    href: "/quiz-maths-terminale-specialite",
                    label: "Faire le quiz",
                  },
                ].map((item) => (
                  <article key={item.title} className="rounded-2xl bg-slate-50 p-6">
                    <item.icon className="h-7 w-7 text-blue-800" aria-hidden="true" />
                    <h3 className="mt-4 text-xl font-bold text-slate-950">{item.title}</h3>
                    <p className="mt-2 leading-7 text-slate-700">{item.text}</p>
                    <Link
                      href={item.href}
                      className="mt-4 inline-flex items-center gap-2 font-bold text-blue-900 hover:underline"
                    >
                      {item.label}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </article>
                ))}
              </div>
            </section>

            <SeoFaq items={faqItems} />
          </div>
        </section>
      </div>
    </SeoPageLayout>
  );
}
