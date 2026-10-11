import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  ClipboardList,
  ListChecks,
  PlayCircle,
  Target,
} from "lucide-react";
import {
  ChapterHero,
  ChapterInternalLinks,
} from "@/components/marketing/ChapterSeoPage";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/seo";

const pagePath = "/methodes-maths-terminale/calculer-une-limite";

const title = "Méthode pour calculer une limite en Terminale";
const description =
  "Méthode simple pour calculer une limite en Terminale : identifier la forme, lever une indétermination, factoriser et conclure proprement.";

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

const methodEventParams = {
  chapter: "limites",
  level: "terminale",
  source_page: pagePath,
};

const fiveSteps = [
  "Identifier la variable, la borne et le type de limite demandé.",
  "Tester les opérations directes pour voir si la limite se conclut immédiatement.",
  "Nommer la forme indéterminée si elle apparaît.",
  "Transformer l'expression : factoriser, simplifier ou isoler le terme dominant.",
  "Conclure avec la borne, le résultat et l'interprétation graphique si elle est demandée.",
];

const methodCases = [
  {
    title: "Quotient de polynômes",
    steps: [
      "Repérer le plus haut degré.",
      "Factoriser en haut et en bas par la même puissance de x.",
      "Simplifier et utiliser les limites de 1/x, 1/x², etc.",
    ],
  },
  {
    title: "Somme ou différence",
    steps: [
      "Chercher le terme dominant.",
      "Mettre ce terme en facteur.",
      "Étudier le signe de la parenthèse et du facteur.",
    ],
  },
  {
    title: "Asymptote",
    steps: [
      "Calculer la limite à la borne demandée.",
      "Vérifier si le résultat est fini ou infini.",
      "Écrire l'équation de l'asymptote uniquement quand l'énoncé le demande.",
    ],
  },
];

const frequentMistakes = [
  "Conclure trop vite devant une forme indéterminée.",
  "Oublier de factoriser avant d'utiliser les coefficients dominants.",
  "Confondre le signe en plus l'infini et en moins l'infini.",
  "Donner une limite sans préciser la borne étudiée.",
  "Oublier l'interprétation graphique quand la question porte sur la courbe.",
];

const internalLinks = [
  { href: "/programme-maths-terminale/limites", label: "Programme du chapitre Limites" },
  { href: "/exercices-maths-terminale/limites", label: "Exercices limites Terminale" },
  { href: "/exercices-type-bac-maths-terminale", label: "Exercices type bac Terminale" },
  {
    href: "/sujets-type-bac-maths-terminale",
    label: "Sujets type bac corrigés Terminale",
  },
  { href: "/methodes-maths-terminale", label: "Toutes les méthodes Terminale" },
  { href: "/formules-bac-maths-terminale#limites", label: "Formules de limites" },
  {
    href: "/redaction-bac-maths-terminale#tvi",
    label: "Rédiger avec le TVI",
  },
  {
    href: "/demonstrations-bac-maths-terminale#limites",
    label: "Justifier une limite",
  },
  {
    href: "/python-bac-maths-terminale#dichotomie",
    label: "Approcher une solution par dichotomie en Python",
  },
  { href: "/bac-maths-2027", label: "Bac Maths 2027" },
  { href: "/planning-revision-bac-maths", label: "Planning Bac Maths 2027" },
  { href: "/diagnostic", label: "Diagnostic gratuit" },
];

const faqItems: FaqItem[] = [
  {
    question: "Quelle est la première étape pour calculer une limite ?",
    answer:
      "Il faut identifier la borne et tester la substitution mentale. Cette étape dit si une opération directe suffit ou si l'expression donne une forme indéterminée.",
  },
  {
    question: "Que faire avec une forme infini sur infini ?",
    answer:
      "Pour un quotient de polynômes, on factorise par le terme de plus haut degré au numérateur et au dénominateur. Les termes en 1/x ou 1/x² tendent ensuite vers 0.",
  },
  {
    question: "Comment traiter infini moins infini ?",
    answer:
      "On cherche une transformation : mise en facteur du terme dominant, mise au même dénominateur ou autre écriture adaptée. On ne peut pas conclure directement.",
  },
  {
    question: "Quand parler d'asymptote ?",
    answer:
      "Quand une limite donne une information graphique. Une limite finie en plus ou moins l'infini peut donner une asymptote horizontale, tandis qu'une limite infinie près d'une valeur interdite peut indiquer une asymptote verticale.",
  },
  {
    question: "Comment progresser rapidement sur les limites ?",
    answer:
      "Il faut refaire plusieurs exercices courts en classant les erreurs : opération directe, terme dominant, factorisation, signe ou conclusion. Cette classification rend la méthode beaucoup plus stable.",
  },
];

// Garde une expression courte sur une seule ligne, y compris sur mobile.
function Formula({ children }: { children: ReactNode }) {
  return (
    <span className="whitespace-nowrap font-semibold text-slate-950">
      {children}
    </span>
  );
}

// Calcul mis en évidence : une ligne par étape, jamais coupée au milieu.
function FormulaLines({ lines }: { lines: string[] }) {
  return (
    <p className="rounded-lg bg-slate-50 px-4 py-3 text-center font-semibold text-slate-950">
      {lines.map((line) => (
        <span key={line} className="block whitespace-nowrap">
          {line}
        </span>
      ))}
    </p>
  );
}

export default function MethodeCalculerUneLimitePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Méthodes maths Terminale", path: "/methodes-maths-terminale" },
            { name: "Calculer une limite", path: pagePath },
          ]),
        ]}
      />

      <ChapterHero
        eyebrow="Méthode limites Terminale"
        title="Méthode : comment calculer une limite en Terminale"
        description={
          <>
            Devant une limite, le but est de choisir la bonne transformation. Cette
            méthode te donne une routine simple pour identifier la forme, lever une
            indétermination et rédiger une conclusion claire.
          </>
        }
        ctas={[
          {
            href: "/exercices-maths-terminale/limites",
            label: "Faire des exercices sur les limites",
            eventName: "click_method_chapter_exercises",
            eventParams: {
              ...methodEventParams,
              cta_location: "method_hero_exercises",
            },
            icon: <PlayCircle className="h-5 w-5" />,
          },
          {
            href: "/programme-maths-terminale/limites",
            label: "Voir le programme du chapitre Limites",
            eventName: "click_method_chapter_program",
            eventParams: {
              ...methodEventParams,
              cta_location: "method_hero_program",
            },
            icon: <BookOpenCheck className="h-5 w-5" />,
            variant: "secondary",
          },
        ]}
      />

      <section className="border-y border-slate-200 bg-slate-950 px-4 py-5 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm font-semibold sm:flex-row sm:items-center sm:justify-between">
          <span>Besoin d&apos;un repère avant de t&apos;entraîner ?</span>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <TrackedLink
              href="/diagnostic"
              eventName="click_method_chapter_diagnostic"
              eventParams={{
                ...methodEventParams,
                cta_location: "method_top_band_diagnostic",
              }}
              className="inline-flex items-center gap-2 text-emerald-200 hover:text-white"
            >
              Faire le diagnostic gratuit
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
            <TrackedLink
              href="/planning-revision-bac-maths"
              eventName="click_method_chapter_planning"
              eventParams={{
                ...methodEventParams,
                lead_magnet: "planning_bac_maths_2027",
                cta_location: "method_top_band_planning",
              }}
              className="inline-flex items-center gap-2 text-blue-100 hover:text-white"
            >
              Recevoir le planning Bac Maths 2027
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
          </div>
        </div>
      </section>

      <div className="px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-14">
          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <ListChecks className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                La méthode en 5 étapes
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                Cette routine évite de se jeter dans les calculs avant de savoir
                quelle forme on traite.
              </p>
            </div>
            <ol className="space-y-3">
              {fiveSteps.map((step, index) => (
                <li
                  key={step}
                  className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-900 text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <span className="pt-1 leading-7 text-slate-700">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <div className="max-w-3xl">
              <ClipboardList className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Choisir la transformation selon le cas
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                Une limite devient souvent simple quand on reconnaît la famille de
                l&apos;expression. Voici les cas à travailler en priorité.
              </p>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {methodCases.map((item) => (
                <article key={item.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-950">{item.title}</h3>
                  <ul className="mt-4 space-y-3 text-slate-700">
                    {item.steps.map((step) => (
                      <li key={step} className="flex gap-2">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <Target className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Exemple guidé
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                La rédaction doit montrer la transformation, pas seulement le
                résultat final.
              </p>
            </div>
            <article className="rounded-xl bg-slate-50 p-5">
              <p className="font-bold text-slate-950">
                Calculer la limite de (2x² - 3x + 1) / (x² + 5) quand x tend vers
                plus l&apos;infini.
              </p>
              <div className="mt-4 space-y-3 leading-7 text-slate-700">
                <p>
                  On obtient une forme infini sur infini. On factorise par x² en
                  haut et en bas.
                </p>
                <p>
                  (2x² - 3x + 1) / (x² + 5) = x²(2 - 3/x + 1/x²) /
                  x²(1 + 5/x²).
                </p>
                <p>
                  Après simplification, 1/x et 1/x² tendent vers 0. La limite vaut
                  donc 2.
                </p>
              </div>
            </article>
          </section>

          <section
            id="trois-limites-corrigees"
            className="grid scroll-mt-24 gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start"
          >
            <div className="lg:sticky lg:top-24">
              <ListChecks className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Trois limites corrigées pas à pas
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                L’exemple guidé traite un quotient de polynômes. Voici trois
                situations où factoriser par le plus haut degré ne suffit pas :
                un produit avec l’exponentielle, un encadrement et une fonction
                composée. Ce sont des exemples originaux SprintMaths, rédigés
                comme sur une copie.
              </p>
              <p className="mt-4 leading-7 text-slate-700">
                Dans les trois cas, la rédaction suit le même ordre : la forme
                reconnue, la transformation, puis la conclusion avec la borne.
              </p>
            </div>

            <div className="min-w-0 space-y-6">
              <article
                id="limite-produit-exponentielle"
                className="min-w-0 scroll-mt-24 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <h3 className="text-xl font-bold text-slate-950">
                  1. Produit avec l’exponentielle : la forme «&nbsp;∞&nbsp;×&nbsp;0&nbsp;»
                </h3>
                <p className="mt-3 font-bold text-slate-950">
                  Calculer la limite de <Formula>(x² − 3x)eˣ</Formula>{" "}
                  quand x
                  tend vers −∞.
                </p>
                <div className="mt-4 space-y-3 leading-7 text-slate-700">
                  <p>
                    <strong>Forme reconnue :</strong>{" "}
                    quand x tend vers −∞,{" "}
                    <Formula>x²</Formula> et <Formula>−3x</Formula>{" "}
                    tendent vers
                    +∞, donc <Formula>x² − 3x</Formula>{" "}
                    tend vers +∞, tandis que{" "}
                    <Formula>eˣ</Formula>{" "}
                    tend vers 0. Le produit est une forme
                    indéterminée «&nbsp;∞&nbsp;×&nbsp;0&nbsp;».
                  </p>
                  <p>
                    <strong>Transformation :</strong>{" "}
                    on développe pour faire
                    apparaître deux limites de référence.
                  </p>
                  <FormulaLines lines={["(x² − 3x)eˣ", "= x²eˣ − 3xeˣ"]} />
                  <p>
                    Par croissance comparée, <Formula>x²eˣ</Formula>{" "}
                    et{" "}
                    <Formula>xeˣ</Formula>{" "}
                    tendent vers 0 quand x tend vers −∞.
                    Pour s’en convaincre, on écrit{" "}
                    <Formula>x²eˣ = (−x)²/e⁻ˣ</Formula>{" "}
                    : quand x tend vers −∞,{" "}
                    <Formula>−x</Formula>{" "}
                    tend vers +∞, et l’exponentielle
                    l’emporte sur toute puissance.
                  </p>
                  <p>
                    <strong>Conclusion :</strong>{" "}
                    par somme, la limite de{" "}
                    <Formula>(x² − 3x)eˣ</Formula>{" "}
                    quand x tend vers −∞ vaut{" "}
                    <Formula>0 − 3 × 0 = 0</Formula>. L’axe des abscisses est
                    asymptote horizontale à la courbe en −∞.
                  </p>
                </div>
                <p className="mt-4 rounded-lg bg-amber-50 p-4 leading-7 text-amber-950">
                  <strong>Erreur à éviter :</strong>{" "}
                  écrire «&nbsp;∞&nbsp;×&nbsp;0&nbsp;=&nbsp;0&nbsp;» sans
                  justification. Le résultat est juste ici, mais pas grâce à
                  cette règle, qui n’existe pas :{" "}
                  <Formula>e⁻ˣ × eˣ</Formula>{" "}
                  est aussi de la forme «&nbsp;∞&nbsp;×&nbsp;0&nbsp;»
                  en −∞, et vaut pourtant 1 pour tout x.
                </p>
              </article>

              <article
                id="limite-par-encadrement"
                className="min-w-0 scroll-mt-24 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <h3 className="text-xl font-bold text-slate-950">
                  2. Encadrement : quand sin&nbsp;x n’a pas de limite
                </h3>
                <p className="mt-3 font-bold text-slate-950">
                  Calculer la limite de <Formula>(2x + sin x)/x</Formula>{" "}
                  quand
                  x tend vers +∞.
                </p>
                <div className="mt-4 space-y-3 leading-7 text-slate-700">
                  <p>
                    <strong>Forme reconnue :</strong>{" "}
                    sin&nbsp;x n’a pas de limite en
                    +∞, donc les opérations sur les limites ne permettent pas de
                    conclure. En revanche, sin&nbsp;x est borné :{" "}
                    <Formula>−1 ≤ sin x ≤ 1</Formula>{" "}
                    pour tout réel x. C’est le
                    signal d’un encadrement.
                  </p>
                  <p>
                    <strong>Transformation :</strong>{" "}
                    pour x&nbsp;&gt;&nbsp;0, on sépare
                    la fraction en deux.
                  </p>
                  <FormulaLines lines={["(2x + sin x)/x", "= 2 + (sin x)/x"]} />
                  <p>
                    Comme x&nbsp;&gt;&nbsp;0, diviser par x conserve le sens des
                    inégalités : <Formula>−1/x ≤ (sin x)/x ≤ 1/x</Formula>. On
                    ajoute 2 à chaque membre.
                  </p>
                  <FormulaLines
                    lines={["2 − 1/x ≤ (2x + sin x)/x", "≤ 2 + 1/x"]}
                  />
                  <p>
                    <strong>Conclusion :</strong>{" "}
                    <Formula>2 − 1/x</Formula>{" "}
                    et{" "}
                    <Formula>2 + 1/x</Formula>{" "}
                    tendent tous les deux vers 2 quand
                    x tend vers +∞. D’après le théorème des gendarmes, la limite
                    de <Formula>(2x + sin x)/x</Formula>{" "}
                    quand x tend vers +∞
                    vaut 2. La droite d’équation <Formula>y = 2</Formula>{" "}
                    est
                    asymptote horizontale à la courbe en +∞, même si la courbe
                    la traverse chaque fois que sin&nbsp;x s’annule.
                  </p>
                </div>
                <p className="mt-4 rounded-lg bg-amber-50 p-4 leading-7 text-amber-950">
                  <strong>Erreur à éviter :</strong>{" "}
                  affirmer « sin&nbsp;x n’a pas de
                  limite, donc le quotient non plus ». C’est faux : sin&nbsp;x reste
                  entre −1 et 1, et une quantité bornée divisée par x tend vers
                  0. Seul l’encadrement justifie la conclusion.
                </p>
              </article>

              <article
                id="limite-fonction-composee"
                className="min-w-0 scroll-mt-24 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <h3 className="text-xl font-bold text-slate-950">
                  3. Fonction composée : une limite dans l’exposant
                </h3>
                <p className="mt-3 font-bold text-slate-950">
                  Calculer la limite de{" "}
                  <Formula>exp((1 − x)/(x + 2))</Formula>{" "}
                  quand x tend vers +∞.
                </p>
                <div className="mt-4 space-y-3 leading-7 text-slate-700">
                  <p>
                    <strong>Forme reconnue :</strong>{" "}
                    c’est une fonction
                    composée. On calcule d’abord{" "}
                    <Formula>(1 − x)/(x + 2)</Formula>, puis on en prend
                    l’exponentielle. Cet exposant est un quotient de la forme
                    «&nbsp;∞/∞&nbsp;» : le numérateur tend vers −∞ et le dénominateur
                    vers +∞.
                  </p>
                  <p>
                    <strong>Transformation :</strong>{" "}
                    on lève d’abord
                    l’indétermination de l’exposant. Pour x&nbsp;&gt;&nbsp;0, on factorise
                    par x en haut et en bas : <Formula>1 − x = x(1/x − 1)</Formula>{" "}
                    et <Formula>x + 2 = x(1 + 2/x)</Formula>. Après
                    simplification par x :
                  </p>
                  <FormulaLines
                    lines={["(1 − x)/(x + 2)", "= (1/x − 1)/(1 + 2/x)"]}
                  />
                  <p>
                    Quand x tend vers +∞, <Formula>1/x</Formula>{" "}
                    et{" "}
                    <Formula>2/x</Formula>{" "}
                    tendent vers 0 : l’exposant tend vers{" "}
                    <Formula>(0 − 1)/(1 + 0) = −1</Formula>.
                  </p>
                  <p>
                    <strong>Conclusion :</strong>{" "}
                    la fonction exponentielle est
                    continue en −1, donc <Formula>exp(u)</Formula>{" "}
                    tend vers{" "}
                    <Formula>exp(−1)</Formula>{" "}
                    quand u tend vers −1. Par
                    composition, la limite de{" "}
                    <Formula>exp((1 − x)/(x + 2))</Formula>{" "}
                    quand x tend vers +∞
                    vaut <Formula>e⁻¹ = 1/e ≈ 0,368</Formula>.
                  </p>
                </div>
                <p className="mt-4 rounded-lg bg-amber-50 p-4 leading-7 text-amber-950">
                  <strong>Erreur à éviter :</strong>{" "}
                  remplacer x par l’infini
                  dans l’exposant, ou ne regarder que le numérateur : «&nbsp;1&nbsp;−&nbsp;x
                  tend vers −∞, donc l’exponentielle tend vers 0 ». Le
                  dénominateur compte autant : l’exposant tend vers −1, pas vers
                  −∞, et la limite vaut 1/e, pas 0.
                </p>
              </article>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <BookOpenCheck className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Erreurs fréquentes
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {frequentMistakes.map((mistake) => (
                <div
                  key={mistake}
                  className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-red-600" />
                  <span className="leading-7 text-slate-700">{mistake}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="rounded-xl bg-blue-950 p-6 text-white sm:p-8">
              <h3 className="text-2xl font-bold">
                Appliquer la méthode sur des exercices
              </h3>
              <p className="mt-3 max-w-3xl leading-7 text-blue-100">
                Une limite se maîtrise en alternant méthode courte et exercices
                corrigés. Commence par des cas simples, puis passe aux exercices type
                bac guidés.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <TrackedLink
                  href="/exercices-maths-terminale/limites"
                  eventName="click_method_chapter_exercises"
                  eventParams={{
                    ...methodEventParams,
                    cta_location: "method_training_exercises",
                  }}
                  className="rounded-xl border border-slate-200 bg-white p-5 font-semibold text-slate-800 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-blue-950"
                >
                  Faire des exercices sur les limites
                </TrackedLink>
                <TrackedLink
                  href="/exercices-type-bac-maths-terminale"
                  eventName="click_method_chapter_typebac"
                  eventParams={{
                    ...methodEventParams,
                    cta_location: "method_training_typebac",
                  }}
                  className="rounded-xl border border-blue-200 bg-blue-900 p-5 font-semibold text-white shadow-sm hover:bg-blue-800"
                >
                  Essayer un exercice type bac
                </TrackedLink>
                <TrackedLink
                  href="/sujets-type-bac-maths-terminale#sujet-guide-complet"
                  eventName="click_method_chapter_subjects"
                  eventParams={{
                    ...methodEventParams,
                    intent: "sujet_type_bac_corrige",
                    destination_page:
                      "/sujets-type-bac-maths-terminale#sujet-guide-complet",
                    cta_location: "method_training_subject_corrige",
                  }}
                  className="rounded-xl border border-slate-200 bg-white p-5 font-semibold text-slate-800 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-blue-950"
                >
                  S&apos;entraîner avec un sujet type bac corrigé
                </TrackedLink>
                <TrackedLink
                  href="/diagnostic"
                  eventName="click_method_chapter_diagnostic"
                  eventParams={{
                    ...methodEventParams,
                    cta_location: "method_training_diagnostic",
                  }}
                  className="rounded-xl border border-slate-200 bg-white p-5 font-semibold text-slate-800 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-blue-950"
                >
                  Faire le diagnostic gratuit
                </TrackedLink>
              </div>
            </div>
          </section>

          <ChapterInternalLinks
            title="Continuer dans le cluster limites"
            links={internalLinks}
          />

          <FaqAccordion items={faqItems} sourcePage={pagePath} />
        </div>
      </div>
    </SeoPageLayout>
  );
}
