import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  LineChart,
  ListChecks,
  SquareFunction,
  TriangleAlert,
} from "lucide-react";
import { ChapterHero, ChapterInternalLinks } from "@/components/marketing/ChapterSeoPage";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/seo";

const pagePath = "/equations-differentielles-terminale";
const title = "Équations différentielles Terminale : méthode et exercices corrigés";
const description =
  "Méthode complète sur les équations différentielles en Terminale : y’ = ay, y’ = ay + b, conditions initiales, vérification et exercices corrigés.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: absoluteUrl(pagePath) },
  openGraph: {
    title,
    description,
    url: absoluteUrl(pagePath),
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const caseRows = [
  {
    equation: "y’ = ay",
    condition: "a est un réel",
    particular: "0",
    general: "y(x) = Ceᵃˣ, C ∈ ℝ",
  },
  {
    equation: "y’ = ay + b",
    condition: "a ≠ 0",
    particular: "−b/a",
    general: "y(x) = −b/a + Ceᵃˣ, C ∈ ℝ",
  },
] as const;

const frequentMistakes = [
  "Écrire une constante unique alors qu’aucune condition initiale n’est donnée.",
  "Oublier le terme particulier −b/a dans l’équation y’ = ay + b.",
  "Confondre eᵃˣ et aeˣ.",
  "Déterminer C sans remplacer à la fois x et y(x) par les données initiales.",
  "Vérifier seulement la condition initiale sans vérifier l’équation différentielle.",
  "Conclure sur le comportement sans tenir compte du signe de a et de la constante C.",
];

const checklist = [
  "J’ai identifié la forme y’ = ay ou y’ = ay + b.",
  "Dans le second cas, j’ai vérifié que a ≠ 0.",
  "J’ai distingué une solution particulière de la solution générale.",
  "J’ai conservé une constante réelle C tant qu’aucune valeur initiale ne la fixe.",
  "J’ai remplacé correctement x₀ et y(x₀) pour déterminer C.",
  "Pour une vérification, j’ai calculé y’ puis comparé les deux membres.",
  "Ma conclusion répond au contexte et précise l’unité si nécessaire.",
];

const faqItems: FaqItem[] = [
  {
    question: "Quelle est la solution générale de y’ = ay ?",
    answer:
      "Pour un réel a, les solutions sur ℝ sont les fonctions y définies par y(x) = Ce^(ax), où C est une constante réelle.",
  },
  {
    question: "Comment résoudre y’ = ay + b lorsque a est non nul ?",
    answer:
      "On repère la solution particulière constante −b/a. Toutes les solutions sont alors y(x) = −b/a + Ce^(ax), avec C réel.",
  },
  {
    question: "À quoi sert une condition initiale ?",
    answer:
      "Elle sélectionne une seule solution dans la famille générale. On remplace x et y(x) par la valeur initiale donnée, puis on résout l’équation obtenue pour déterminer C.",
  },
  {
    question: "Comment vérifier qu’une fonction est solution ?",
    answer:
      "On vérifie que la fonction est dérivable sur l’intervalle étudié, on calcule sa dérivée et on montre que l’égalité de l’équation différentielle est vraie pour tout x de cet intervalle.",
  },
];

const internalLinks = [
  { href: "/articles/exponentielle-terminale-methodes", label: "Méthodes sur l’exponentielle" },
  { href: "/methodes-maths-terminale/integrales", label: "Primitives et intégrales" },
  { href: "/formules-bac-maths-terminale", label: "Formules de Terminale" },
  { href: "/redaction-bac-maths-terminale", label: "Rédiger une justification" },
  { href: "/demonstrations-bac-maths-terminale", label: "Construire une démonstration" },
  { href: "/programme-maths-terminale", label: "Programme de Terminale" },
  { href: "/quiz-maths-terminale-specialite#equations-differentielles", label: "Quiz sur les équations différentielles" },
];

type CorrectedExercise = {
  label: string;
  title: string;
  statement: string;
  method: string;
  calculations: string[];
  justification: string;
  conclusion: string;
};

const exercises: CorrectedExercise[] = [
  {
    label: "Exercice 1 — résolution directe",
    title: "Résoudre y’ = −2y",
    statement: "Déterminer toutes les fonctions dérivables sur ℝ qui vérifient y’ = −2y.",
    method: "Reconnaître la forme y’ = ay avec a = −2.",
    calculations: ["La famille attendue est y(x) = Ce⁻²ˣ.", "C est une constante réelle quelconque."],
    justification:
      "Pour y(x) = Ce⁻²ˣ, on obtient y’(x) = −2Ce⁻²ˣ = −2y(x). Réciproquement, le résultat de cours donne toutes les solutions de cette forme.",
    conclusion: "Les solutions sur ℝ sont exactement les fonctions y(x) = Ce⁻²ˣ, avec C ∈ ℝ.",
  },
  {
    label: "Exercice 2 — condition initiale",
    title: "Résoudre y’ = 3y − 6 avec y(0) = 5",
    statement: "Déterminer la solution de l’équation différentielle qui vérifie la valeur initiale donnée.",
    method: "Trouver d’abord la solution générale de y’ = 3y − 6, puis utiliser y(0) = 5.",
    calculations: [
      "La solution particulière constante vaut −b/a = −(−6)/3 = 2.",
      "La solution générale est y(x) = 2 + Ce³ˣ.",
      "y(0) = 2 + Ce⁰ = 2 + C = 5, donc C = 3.",
    ],
    justification:
      "La condition initiale fixe une seule valeur de C dans la famille générale. La fonction obtenue est bien dérivable sur ℝ.",
    conclusion: "L’unique solution vérifiant y(0) = 5 est y(x) = 2 + 3e³ˣ.",
  },
  {
    label: "Exercice 3 — vérification",
    title: "Vérifier une solution proposée",
    statement: "Montrer que f(x) = 4e⁻ˣ + 2 vérifie y’ = −y + 2 sur ℝ.",
    method: "Calculer f’, puis remplacer y par f dans le membre droit.",
    calculations: [
      "f’(x) = −4e⁻ˣ.",
      "−f(x) + 2 = −(4e⁻ˣ + 2) + 2 = −4e⁻ˣ.",
      "Ainsi f’(x) = −f(x) + 2 pour tout réel x.",
    ],
    justification:
      "L’égalité est vérifiée sur tout ℝ, qui est bien l’intervalle de définition et de dérivabilité de f.",
    conclusion: "La fonction f est donc une solution de y’ = −y + 2 sur ℝ.",
  },
  {
    label: "Exercice 4 — modélisation",
    title: "Refroidissement vers la température ambiante",
    statement:
      "Pour t ≥ 0, la température T, en °C, d’un objet vérifie T’ = −0,25T + 5, où t est exprimé en heures. On donne T(0) = 80. Déterminer T(t), puis T(4).",
    method:
      "Résoudre l’équation y’ = ay + b, appliquer la condition initiale, puis interpréter la valeur calculée.",
    calculations: [
      "Ici a = −0,25 et b = 5 ; la solution particulière constante vaut −b/a = 20.",
      "T(t) = 20 + Ce⁻⁰·²⁵ᵗ.",
      "T(0) = 20 + C = 80, donc C = 60.",
      "T(4) = 20 + 60e⁻¹ ≈ 42,1.",
    ],
    justification:
      "La constante 20 correspond à l’état d’équilibre du modèle, car −0,25 × 20 + 5 = 0.",
    conclusion:
      "Selon ce modèle, T(t) = 20 + 60e⁻⁰·²⁵ᵗ et la température après 4 heures est d’environ 42,1 °C.",
  },
];

export default function EquationsDifferentiellesTerminalePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Méthodes maths Terminale", path: "/methodes-maths-terminale" },
            { name: "Équations différentielles", path: pagePath },
          ]),
        ]}
      />

      <ChapterHero
        eyebrow="Chapitre de Terminale — méthode et exercices"
        title="Équations différentielles en Terminale : méthode complète"
        description={
          <>
            Apprends à reconnaître, résoudre et vérifier les équations de la forme
            y’ = ay et y’ = ay + b, puis à utiliser une condition initiale dans un
            problème d’évolution.
          </>
        }
        secondaryDescription={
          <>
            La priorité est de distinguer la famille de solutions générales de la
            solution unique sélectionnée par une valeur initiale.
          </>
        }
        ctas={[]}
      />

      <section className="border-y border-slate-200 bg-slate-50 px-4 py-7">
        <nav aria-label="Sommaire équations différentielles" className="mx-auto max-w-6xl">
          <p className="font-bold text-slate-950">Sommaire</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              ["comprendre", "Comprendre l’équation"],
              ["cas", "Tableau des cas"],
              ["condition-initiale", "Condition initiale"],
              ["verification", "Vérifier une solution"],
              ["comportement", "Comportement"],
              ["modelisation", "Modélisation"],
              ["exercices", "Exercices corrigés"],
            ].map(([id, label]) => (
              <a key={id} href={`#${id}`} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-blue-900">
                {label}
              </a>
            ))}
          </div>
        </nav>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-14">
          <section id="comprendre" className="scroll-mt-24 grid gap-8 lg:grid-cols-[0.75fr_1fr]">
            <div>
              <SquareFunction className="h-7 w-7 text-blue-800" aria-hidden="true" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">1. Qu’est-ce qu’une équation différentielle ?</h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                Une équation différentielle relie une fonction inconnue à une ou plusieurs de ses dérivées. En Terminale, la notation y désigne la fonction cherchée et y’ sa dérivée.
              </p>
              <p>
                Résoudre l’équation consiste à déterminer toutes les fonctions qui rendent l’égalité vraie sur l’intervalle étudié. Une condition comme y(0) = 5 sélectionne ensuite une seule fonction dans cette famille.
              </p>
            </div>
          </section>

          <section id="cas" className="scroll-mt-24">
            <ListChecks className="h-7 w-7 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">2 et 3. Résoudre les deux formes de référence</h2>
            <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
              <table className="min-w-[820px] w-full border-collapse text-left">
                <thead className="bg-slate-950 text-white">
                  <tr>
                    <th className="px-4 py-3">Équation</th>
                    <th className="px-4 py-3">Condition</th>
                    <th className="px-4 py-3">Solution particulière constante</th>
                    <th className="px-4 py-3">Solution générale</th>
                  </tr>
                </thead>
                <tbody>
                  {caseRows.map((row) => (
                    <tr key={row.equation} className="border-t border-slate-200 odd:bg-slate-50">
                      <td className="px-4 py-4 font-mono font-bold text-blue-950">{row.equation}</td>
                      <td className="px-4 py-4">{row.condition}</td>
                      <td className="px-4 py-4 font-mono">{row.particular}</td>
                      <td className="px-4 py-4 font-mono font-semibold">{row.general}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <article className="rounded-xl border border-blue-100 bg-blue-50 p-5">
                <h3 className="text-xl font-bold text-blue-950">4. Trouver une solution particulière constante</h3>
                <p className="mt-3 leading-7 text-blue-950">
                  Pour y’ = ay + b avec a ≠ 0, cherche y(x) = k. Alors y’ = 0 et 0 = ak + b, donc k = −b/a.
                </p>
              </article>
              <article className="rounded-xl border border-emerald-100 bg-emerald-50 p-5">
                <h3 className="text-xl font-bold text-emerald-950">Pourquoi ajouter Ceᵃˣ ?</h3>
                <p className="mt-3 leading-7 text-emerald-950">
                  Si yₚ est une solution particulière, la différence y − yₚ vérifie l’équation homogène z’ = az. Elle est donc de la forme Ceᵃˣ.
                </p>
              </article>
            </div>
          </section>

          <section id="condition-initiale" className="scroll-mt-24 grid gap-8 lg:grid-cols-[0.75fr_1fr]">
            <div>
              <ClipboardCheck className="h-7 w-7 text-blue-800" aria-hidden="true" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">5 et 7. Utiliser une condition initiale</h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                Si y(x) = −b/a + Ceᵃˣ et y(x₀) = y₀, on remplace x par x₀ et y(x₀) par y₀ :
              </p>
              <p className="overflow-x-auto rounded-xl bg-slate-950 p-5 text-center font-mono font-bold text-white">
                y₀ = −b/a + C e^(a x₀)
              </p>
              <p>
                On résout cette équation pour C. Une écriture directe utile est y(x) = −b/a + (y₀ + b/a)e^(a(x − x₀)).
              </p>
            </div>
          </section>

          <section id="verification" className="scroll-mt-24 rounded-2xl border-2 border-blue-200 bg-blue-50 p-6 sm:p-8">
            <h2 className="text-3xl font-bold text-slate-950">6. Vérifier qu’une fonction est solution</h2>
            <ol className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                "Préciser l’intervalle sur lequel la fonction est définie et dérivable.",
                "Calculer sa dérivée avec soin.",
                "Calculer séparément le membre droit ay ou ay + b.",
                "Comparer les expressions pour tout x de l’intervalle, puis vérifier la condition initiale si elle existe.",
              ].map((step, index) => (
                <li key={step} className="flex gap-3 rounded-xl bg-white p-4 leading-7 text-slate-700">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-900 font-bold text-white">{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section id="comportement" className="scroll-mt-24 grid gap-8 lg:grid-cols-[0.75fr_1fr]">
            <div>
              <LineChart className="h-7 w-7 text-blue-800" aria-hidden="true" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">8. Étudier le comportement d’une solution</h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                Dans y(x) = −b/a + Ceᵃˣ, le nombre −b/a est l’état d’équilibre. Si a &lt; 0, eᵃˣ tend vers 0 lorsque x tend vers +∞ : toute solution tend alors vers −b/a.
              </p>
              <p>
                Si a &gt; 0, le terme Ceᵃˣ peut croître en valeur absolue. Le sens de variation dépend aussi de C, puisque y’(x) = aCeᵃˣ et eᵃˣ est strictement positif.
              </p>
            </div>
          </section>

          <section id="modelisation" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-slate-950">9. Modéliser une évolution simple</h2>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
              L’équation décrit un modèle choisi pour la situation. Il faut identifier la grandeur, la variable, l’unité et la valeur initiale avant de calculer.
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {[
                ["Température", "T’ = −k(T − Tₑ) modélise un rapprochement vers une température d’équilibre Tₑ, avec k > 0."],
                ["Population", "P’ = aP décrit une croissance ou une décroissance proportionnelle à la population dans un modèle simplifié."],
                ["Concentration", "C’ = −kC + q peut représenter une élimination proportionnelle et un apport constant."],
                ["Autre évolution", "Une quantité financière ou physique peut suivre le même modèle si les hypothèses du problème le justifient."],
              ].map(([heading, text]) => (
                <article key={heading} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-950">{heading}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{text}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="exercices" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-slate-950">Quatre exercices corrigés progressifs</h2>
            <div className="mt-7 space-y-7">
              {exercises.map((exercise) => (
                <article key={exercise.label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-blue-800">{exercise.label}</p>
                  <h3 className="mt-3 text-2xl font-bold text-slate-950">{exercise.title}</h3>
                  <p className="mt-4 rounded-xl bg-slate-50 p-4 leading-7 text-slate-800"><strong>Énoncé :</strong> {exercise.statement}</p>
                  <div className="mt-5 grid gap-5 lg:grid-cols-2">
                    <div>
                      <h4 className="font-bold text-slate-950">Méthode</h4>
                      <p className="mt-2 leading-7 text-slate-700">{exercise.method}</p>
                      <h4 className="mt-5 font-bold text-slate-950">Calculs</h4>
                      <div className="mt-2 space-y-2 leading-7 text-slate-700">
                        {exercise.calculations.map((calculation) => <p key={calculation}>{calculation}</p>)}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="rounded-xl bg-blue-50 p-4 text-blue-950">
                        <h4 className="font-bold">Justification</h4>
                        <p className="mt-2 leading-7">{exercise.justification}</p>
                      </div>
                      <div className="rounded-xl bg-emerald-50 p-4 text-emerald-950">
                        <h4 className="font-bold">Conclusion</h4>
                        <p className="mt-2 leading-7">{exercise.conclusion}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border-2 border-blue-200 bg-blue-50 p-6">
              <ListChecks className="h-7 w-7 text-blue-800" aria-hidden="true" />
              <h2 className="mt-4 text-2xl font-bold text-slate-950">Fiche méthode</h2>
              <ol className="mt-5 space-y-3 leading-7 text-slate-700">
                {[
                  "Identifier a et, s’il existe, b.",
                  "Écrire la solution générale adaptée.",
                  "Utiliser la condition initiale pour déterminer C.",
                  "Vérifier ou étudier la solution selon la question.",
                  "Conclure dans le contexte.",
                ].map((item, index) => <li key={item}><strong>{index + 1}.</strong> {item}</li>)}
              </ol>
            </article>
            <article className="rounded-2xl border border-red-200 bg-red-50 p-6">
              <TriangleAlert className="h-7 w-7 text-red-700" aria-hidden="true" />
              <h2 className="mt-4 text-2xl font-bold text-red-950">10. Erreurs fréquentes</h2>
              <ul className="mt-5 space-y-3 leading-7 text-red-950">
                {frequentMistakes.map((mistake) => <li key={mistake}>• {mistake}</li>)}
              </ul>
            </article>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <ClipboardCheck className="h-7 w-7 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">Checklist avant de rendre</h2>
            <ul className="mt-6 grid gap-3 md:grid-cols-2">
              {checklist.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl bg-white p-4 leading-7 text-slate-700">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <ChapterInternalLinks title="Ressources liées" links={internalLinks} variant="cards" />

          <section className="rounded-2xl bg-slate-950 p-6 text-white sm:p-8">
            <h2 className="text-2xl font-bold">Vérifie la distinction entre les deux formes</h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-300">
              Deux questions du quiz Terminale portent sur les solutions générales et l’état d’équilibre.
            </p>
            <Link href="/quiz-maths-terminale-specialite#equations-differentielles" className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 py-3 font-bold text-blue-950">
              Faire les questions associées
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </section>

          <FaqAccordion items={faqItems} sourcePage={pagePath} />
        </div>
      </section>
    </SeoPageLayout>
  );
}
