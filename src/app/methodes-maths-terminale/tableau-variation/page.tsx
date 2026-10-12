import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpenCheck,
  CheckCircle2,
  ClipboardList,
  FunctionSquare,
  LineChart,
  ListChecks,
  PlayCircle,
  Sigma,
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

const pagePath = "/methodes-maths-terminale/tableau-variation";

const title = "Méthode tableau de variation en Terminale";
const description =
  "Méthode simple pour construire un tableau de variation en Terminale : calculer la dérivée, étudier son signe, placer les valeurs clés et conclure sur les variations.";

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
  chapter: "derivation-convexite",
  level: "terminale",
  source_page: pagePath,
};

const fiveSteps = [
  "Déterminer le domaine.",
  "Calculer f’(x).",
  "Résoudre f’(x)=0 et étudier le signe de f’.",
  "Calculer les valeurs utiles de f.",
  "Compléter le tableau et conclure.",
];

const importantValues = [
  "les bornes du domaine, par exemple −∞ et +∞ sur R ;",
  "les valeurs interdites si la fonction n'est pas définie partout ;",
  "les solutions de f’(x)=0 ;",
  "les valeurs de f aux points critiques ;",
  "les limites aux bornes quand elles sont demandées.",
];

const frequentMistakes = [
  "oublier le domaine ;",
  "confondre signe de f et signe de f’ ;",
  "oublier les valeurs de f aux points critiques ;",
  "ne pas conclure en phrase ;",
  "mettre des flèches sans justification.",
];

const internalLinks = [
  {
    href: "/programme-maths-terminale/derivation-convexite",
    label: "Programme Dérivation / Convexité",
  },
  { href: "/exercices-maths-terminale/derivation", label: "Exercices dérivation Terminale" },
  { href: "/exercices-type-bac-maths-terminale", label: "Exercices type bac Terminale" },
  {
    href: "/sujets-type-bac-maths-terminale",
    label: "Sujets type bac corrigés Terminale",
  },
  { href: "/methodes-maths-terminale", label: "Toutes les méthodes Terminale" },
  {
    href: "/formules-bac-maths-terminale#derivation",
    label: "Formules de dérivation",
  },
  {
    href: "/redaction-bac-maths-terminale#variations",
    label: "Rédiger une étude de variations",
  },
  {
    href: "/demonstrations-bac-maths-terminale#variations",
    label: "Démontrer les variations d’une fonction",
  },
  { href: "/programme-maths-terminale/limites", label: "Programme Limites Terminale" },
  { href: "/bac-maths-2027", label: "Bac Maths 2027" },
  { href: "/diagnostic", label: "Diagnostic gratuit" },
];

const faqItems: FaqItem[] = [
  {
    question: "Pourquoi utiliser la dérivée pour un tableau de variation ?",
    answer:
      "La dérivée indique le sens de variation de la fonction. Si f’ est positive sur un intervalle, f est croissante ; si f’ est négative, f est décroissante.",
  },
  {
    question: "Comment trouver le signe de la dérivée ?",
    answer:
      "On résout d'abord f’(x)=0, puis on étudie le signe de l'expression obtenue. Une dérivée factorisée se traite facteur par facteur dans un tableau de signe.",
  },
  {
    question: "Faut-il toujours calculer f’ ?",
    answer:
      "Pour une étude de fonction en Terminale, le tableau de variation se construit presque toujours à partir de f’. Si l'énoncé donne déjà le signe de la dérivée, il faut l'utiliser directement.",
  },
  {
    question: "Que mettre dans un tableau de variation ?",
    answer:
      "On place la ligne des x, le signe de f’, les valeurs importantes de f et les flèches de variation. Les valeurs critiques et les bornes du domaine doivent être visibles.",
  },
  {
    question: "Quelle différence entre tableau de signe et tableau de variation ?",
    answer:
      "Le tableau de signe sert à connaître le signe d'une expression, ici f’. Le tableau de variation utilise ce signe pour décrire si la fonction f augmente ou diminue.",
  },
  {
    question: "Que faire si je ne sais pas démarrer ?",
    answer:
      "Commence par écrire le domaine, puis calcule f’. Ensuite seulement, cherche les valeurs où f’ s'annule et étudie son signe. Si cette étape bloque, reprends un exercice guidé de dérivation.",
  },
];

function VariationTableExample() {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-[560px] border-collapse text-center text-sm">
        <tbody>
          <tr className="border-b border-slate-200">
            <th className="w-32 border-r border-slate-200 bg-slate-50 px-4 py-3 text-left font-bold text-slate-950">
              x
            </th>
            <td className="px-5 py-3 font-semibold text-slate-700">−∞</td>
            <td className="px-5 py-3 font-semibold text-slate-700">2</td>
            <td className="px-5 py-3 font-semibold text-slate-700">+∞</td>
          </tr>
          <tr className="border-b border-slate-200">
            <th className="border-r border-slate-200 bg-slate-50 px-4 py-3 text-left font-bold text-slate-950">
              signe de f’
            </th>
            <td className="px-5 py-3 text-lg font-bold text-red-700">−</td>
            <td className="px-5 py-3 font-bold text-slate-950">0</td>
            <td className="px-5 py-3 text-lg font-bold text-emerald-700">+</td>
          </tr>
          <tr>
            <th className="border-r border-slate-200 bg-slate-50 px-4 py-4 text-left font-bold text-slate-950">
              variations de f
            </th>
            <td className="px-5 py-4 text-slate-700">décroît</td>
            <td className="px-5 py-4">
              <span className="rounded-full bg-emerald-50 px-3 py-1 font-bold text-emerald-900">
                minimum −3
              </span>
            </td>
            <td className="px-5 py-4 text-slate-700">croît</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

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
    <p className="rounded-lg bg-slate-50 px-3 py-3 text-center font-semibold text-slate-950 sm:px-4">
      {lines.map((line) => (
        <span key={line} className="block whitespace-nowrap">
          {line}
        </span>
      ))}
    </p>
  );
}

type VariationColumn =
  | {
      kind: "value";
      x: string;
      derivative?: string;
      value: string;
      position: "top" | "bottom";
      extremum?: boolean;
    }
  | { kind: "interval"; sign: "+" | "−"; direction: "croît" | "décroît" }
  | { kind: "forbidden"; x: string; leftLimit?: string; rightLimit: string };

const doubleBarClass = "w-10 border-r-[6px] border-double border-slate-900";

// Tableau complet : une colonne par valeur, une par intervalle, et deux
// demi-colonnes séparées par une double barre pour une valeur interdite.
function FullVariationTable({
  functionName,
  caption,
  columns,
  tableClassName,
  hintClassName,
}: {
  functionName: string;
  caption: string;
  columns: VariationColumn[];
  tableClassName: string;
  hintClassName: string;
}) {
  const rowHeaderClass =
    "w-28 border-r border-slate-200 bg-slate-50 px-3 py-3 text-left font-bold text-slate-950";

  return (
    <div>
      <div className="relative overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table
          className={`w-full border-collapse text-center text-sm ${tableClassName}`}
        >
          <caption className="sr-only">{caption}</caption>
          <tbody>
            <tr className="border-b border-slate-200">
              <th scope="row" className={rowHeaderClass}>
                x
              </th>
              {columns.map((column, index) =>
                column.kind === "interval" ? (
                  <td key={index} />
                ) : (
                  <td
                    key={index}
                    colSpan={column.kind === "forbidden" ? 2 : 1}
                    className="whitespace-nowrap px-2 py-3 font-semibold text-slate-700"
                  >
                    {column.x}
                  </td>
                ),
              )}
            </tr>
            <tr className="border-b border-slate-200">
              <th scope="row" className={rowHeaderClass}>
                signe de {functionName}’(x)
              </th>
              {columns.flatMap((column, index) => {
                if (column.kind === "forbidden") {
                  return [
                    <td key={`${index}-left`} className={doubleBarClass}>
                      <span className="sr-only">double barre</span>
                    </td>,
                    <td key={`${index}-right`} className="w-10" />,
                  ];
                }
                if (column.kind === "interval") {
                  return [
                    <td
                      key={index}
                      className={`px-2 py-3 text-lg font-bold ${
                        column.sign === "+" ? "text-emerald-700" : "text-red-700"
                      }`}
                    >
                      {column.sign}
                    </td>,
                  ];
                }
                return [
                  <td key={index} className="px-2 py-3 font-bold text-slate-950">
                    {column.derivative}
                  </td>,
                ];
              })}
            </tr>
            <tr>
              <th scope="row" className={rowHeaderClass}>
                variations de {functionName}
              </th>
              {columns.flatMap((column, index) => {
                if (column.kind === "forbidden") {
                  return [
                    <td
                      key={`${index}-left`}
                      className={`h-24 whitespace-nowrap px-2 py-3 align-bottom font-semibold text-slate-700 ${doubleBarClass}`}
                    >
                      {column.leftLimit}
                    </td>,
                    <td
                      key={`${index}-right`}
                      className="h-24 w-10 whitespace-nowrap px-2 py-3 align-top font-semibold text-slate-700"
                    >
                      {column.rightLimit}
                    </td>,
                  ];
                }
                if (column.kind === "interval") {
                  return [
                    <td key={index} className="h-24 px-2 py-3 text-slate-700">
                      {column.direction === "croît" ? (
                        <ArrowUpRight className="mx-auto h-6 w-6 text-slate-950" />
                      ) : (
                        <ArrowDownRight className="mx-auto h-6 w-6 text-slate-950" />
                      )}
                      <span className="mt-1 block text-xs">{column.direction}</span>
                    </td>,
                  ];
                }
                return [
                  <td
                    key={index}
                    className={`h-24 whitespace-nowrap px-2 py-3 font-semibold text-slate-700 ${
                      column.position === "top" ? "align-top" : "align-bottom"
                    }`}
                  >
                    {column.extremum ? (
                      <span className="rounded-full bg-emerald-50 px-2 py-1 font-bold text-emerald-900">
                        {column.value}
                      </span>
                    ) : (
                      column.value
                    )}
                  </td>,
                ];
              })}
            </tr>
          </tbody>
        </table>
      </div>
      <p className={`mt-2 text-xs text-slate-500 ${hintClassName}`}>
        Si le tableau dépasse du cadre, fais-le glisser vers la gauche.
      </p>
    </div>
  );
}

const forbiddenValueColumns: VariationColumn[] = [
  { kind: "value", x: "−∞", value: "−∞", position: "bottom" },
  { kind: "interval", sign: "+", direction: "croît" },
  { kind: "value", x: "−1", derivative: "0", value: "−2", position: "top", extremum: true },
  { kind: "interval", sign: "−", direction: "décroît" },
  { kind: "forbidden", x: "1", leftLimit: "−∞", rightLimit: "+∞" },
  { kind: "interval", sign: "−", direction: "décroît" },
  { kind: "value", x: "3", derivative: "0", value: "6", position: "bottom", extremum: true },
  { kind: "interval", sign: "+", direction: "croît" },
  { kind: "value", x: "+∞", value: "+∞", position: "top" },
];

const logarithmColumns: VariationColumn[] = [
  { kind: "forbidden", x: "0", rightLimit: "+∞" },
  { kind: "interval", sign: "−", direction: "décroît" },
  {
    kind: "value",
    x: "2",
    derivative: "0",
    value: "4 − 8 ln(2)",
    position: "bottom",
    extremum: true,
  },
  { kind: "interval", sign: "+", direction: "croît" },
  { kind: "value", x: "+∞", value: "+∞", position: "top" },
];

export default function MethodeTableauVariationPage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Méthodes maths Terminale", path: "/methodes-maths-terminale" },
            { name: "Tableau de variation", path: pagePath },
          ]),
        ]}
      />

      <ChapterHero
        eyebrow="Méthode dérivation Terminale"
        title="Méthode : comment faire un tableau de variation en Terminale"
        description={
          <>
            Un tableau de variation ne se remplit pas au feeling. En Terminale, la
            méthode consiste à partir du domaine, calculer la dérivée, étudier le
            signe de la dérivée, puis traduire ce signe en variations de la fonction.
          </>
        }
        secondaryDescription={
          <>
            Cette fiche te donne une routine claire pour les études de fonction, avec
            l&apos;exemple classique d&apos;une fonction polynôme du second degré.
          </>
        }
        ctas={[
          {
            href: "/exercices-maths-terminale/derivation",
            label: "Faire des exercices sur la dérivation",
            eventName: "click_method_chapter_exercises",
            eventParams: {
              ...methodEventParams,
              cta_location: "method_hero_exercises",
            },
            icon: <PlayCircle className="h-5 w-5" />,
          },
          {
            href: "/programme-maths-terminale/derivation-convexite",
            label: "Voir le programme Dérivation / Convexité",
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
                La méthode tableau de variation Terminale tient en cinq actions. Le
                plus important est de justifier chaque flèche par le signe de la
                dérivée.
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

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <Target className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Étape 1 : identifier la fonction et son domaine
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                Avant de dériver, écris clairement la fonction et son domaine de
                définition. Pour un polynôme, le domaine est souvent{" "}
                <span className="font-mono text-slate-950">R</span>. Pour un quotient,
                une racine ou un logarithme, il faut exclure les valeurs interdites.
              </p>
              <p>
                Le domaine donne la première ligne du tableau. Il évite de placer des
                flèches sur des intervalles où la fonction n&apos;existe pas.
              </p>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <FunctionSquare className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Étape 2 : calculer la dérivée
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                Calcule <span className="font-mono text-slate-950">f’(x)</span> avec
                les formules du cours : somme, produit, quotient, composée, logarithme
                ou exponentielle selon la fonction.
              </p>
              <p>
                Quand c&apos;est possible, factorise la dérivée. Une forme factorisée
                rend l&apos;étude du signe plus lisible et réduit les erreurs dans le
                tableau de signe.
              </p>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <Sigma className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Étape 3 : étudier le signe de la dérivée
              </h2>
            </div>
            <div className="space-y-5 leading-7 text-slate-700">
              <p className="text-lg leading-8">
                Résous <span className="font-mono text-slate-950">f’(x)=0</span>, puis
                place les solutions dans l&apos;ordre croissant. Ensuite, détermine si{" "}
                <span className="font-mono text-slate-950">f’</span> est positive ou
                négative sur chaque intervalle.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="font-bold text-slate-950">Si f’ est positive</h3>
                  <p className="mt-2 text-slate-700">
                    La fonction f est croissante sur l&apos;intervalle.
                  </p>
                </article>
                <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="font-bold text-slate-950">Si f’ est négative</h3>
                  <p className="mt-2 text-slate-700">
                    La fonction f est décroissante sur l&apos;intervalle.
                  </p>
                </article>
              </div>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <ClipboardList className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Étape 4 : placer les valeurs importantes
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {importantValues.map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />
                  <span className="leading-7 text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <LineChart className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Étape 5 : construire le tableau de variation
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-8 text-slate-700">
              <p>
                Le tableau doit faire apparaître les intervalles, le signe de la
                dérivée et les variations de la fonction. Les flèches ne sont pas une
                décoration : elles traduisent le signe de{" "}
                <span className="font-mono text-slate-950">f’</span>.
              </p>
              <p>
                Termine par une phrase de conclusion : “la fonction est décroissante
                sur tel intervalle, croissante sur tel autre, et admet un minimum ou
                un maximum si c&apos;est le cas.”
              </p>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <BookOpenCheck className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Cas fréquent : dérivée factorisée
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                Quand la dérivée est factorisée, par exemple{" "}
                <span className="font-mono text-slate-950">f’(x) = (x-1)(x+3)</span>,
                fais d&apos;abord un tableau de signe. Chaque facteur donne une valeur
                où le signe peut changer.
              </p>
              <p>
                Une fois le signe global de{" "}
                <span className="font-mono text-slate-950">f’</span> obtenu, tu passes
                au tableau de variation. C&apos;est la différence essentielle entre
                tableau de signe et tableau de variation.
              </p>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <ClipboardList className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Exemple guidé
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                On applique la méthode sur une fonction simple pour voir le lien
                entre dérivée, signe et variations.
              </p>
            </div>
            <article className="min-w-0 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-lg font-bold text-slate-950">
                Soit <span className="font-mono">f(x)=x²-4x+1</span> sur{" "}
                <span className="font-mono">R</span>.
              </p>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <div>
                  <h3 className="font-bold text-slate-950">Dérivée</h3>
                  <p className="mt-2 leading-7 text-slate-700">
                    <span className="font-mono text-slate-950">f’(x)=2x-4</span>.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-950">Point critique</h3>
                  <p className="mt-2 leading-7 text-slate-700">
                    <span className="font-mono text-slate-950">f’(x)=0</span> pour{" "}
                    <span className="font-mono text-slate-950">x=2</span>.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-950">Signe de la dérivée</h3>
                  <p className="mt-2 leading-7 text-slate-700">
                    <span className="font-mono text-slate-950">f’</span> est négative
                    avant 2, puis positive après 2.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-950">Valeur utile</h3>
                  <p className="mt-2 leading-7 text-slate-700">
                    <span className="font-mono text-slate-950">f(2)=2²-4×2+1=-3</span>.
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <VariationTableExample />
              </div>
              <p className="mt-5 rounded-xl bg-emerald-50 p-5 leading-7 text-emerald-950">
                Donc f décroît sur <span className="font-mono">]−∞,2]</span> puis
                croît sur <span className="font-mono">[2,+∞[</span>. La fonction admet
                un minimum en <span className="font-mono">x=2</span>, égal à{" "}
                <span className="font-mono">−3</span>.
              </p>
            </article>
          </section>

          <section
            id="deux-tableaux-complets"
            className="grid scroll-mt-24 gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start"
          >
            <div className="lg:sticky lg:top-24">
              <LineChart className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Deux tableaux de variation complets
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                L’exemple guidé traite un polynôme défini partout. Voici deux
                études où le domaine change la forme du tableau : une fonction
                avec une valeur interdite, puis une fonction avec un logarithme.
                Ce sont des exemples originaux SprintMaths, rédigés comme sur
                une copie.
              </p>
              <p className="mt-4 leading-7 text-slate-700">
                Les deux suivent la même routine : domaine, dérivée factorisée,
                signe, valeurs et limites aux bornes, tableau, puis une phrase
                de conclusion.
              </p>
            </div>

            <div className="min-w-0 space-y-6">
              <article
                id="tableau-valeur-interdite"
                className="min-w-0 scroll-mt-24 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <h3 className="text-xl font-bold text-slate-950">
                  1. Avec une valeur interdite : un tableau coupé en deux
                </h3>
                <p className="mt-3 font-bold text-slate-950">
                  Étudier les variations de la fonction f définie par{" "}
                  <Formula>f(x) = (x² + 3)/(x − 1)</Formula>.
                </p>
                <div className="mt-4 space-y-3 leading-7 text-slate-700">
                  <p>
                    <strong>Domaine :</strong>{" "}
                    le dénominateur s’annule pour <Formula>x = 1</Formula>. La
                    fonction f est donc définie sur{" "}
                    <Formula>]−∞ ; 1[</Formula> et sur{" "}
                    <Formula>]1 ; +∞[</Formula>. La valeur interdite 1 coupe le
                    tableau en deux.
                  </p>
                  <p>
                    <strong>Dérivée :</strong>{" "}
                    f est un quotient u/v, avec{" "}
                    <Formula>u(x) = x² + 3</Formula> et{" "}
                    <Formula>v(x) = x − 1</Formula>, donc{" "}
                    <Formula>u’(x) = 2x</Formula> et{" "}
                    <Formula>v’(x) = 1</Formula>. On calcule d’abord le
                    numérateur <Formula>u’v − uv’</Formula> :
                  </p>
                  <FormulaLines
                    lines={[
                      "2x(x − 1) − (x² + 3)",
                      "= x² − 2x − 3",
                      "= (x − 3)(x + 1)",
                    ]}
                  />
                  <p>
                    La dernière ligne vient des racines du trinôme, −1 et 3.
                    Pour tout x différent de 1 :
                  </p>
                  <FormulaLines lines={["f’(x) = (x − 3)(x + 1)/(x − 1)²"]} />
                  <p>
                    <strong>Signe :</strong>{" "}
                    <Formula>(x − 1)²</Formula> est strictement positif dès que
                    x est différent de 1. Donc <Formula>f’(x)</Formula> a le
                    signe du produit <Formula>(x − 3)(x + 1)</Formula> : positif
                    à l’extérieur des racines −1 et 3, négatif entre elles.
                    Comme 1 se trouve entre −1 et 3, le signe « − » se lit sur
                    deux intervalles : <Formula>]−1 ; 1[</Formula> et{" "}
                    <Formula>]1 ; 3[</Formula>.
                  </p>
                  <p>
                    <strong>Valeurs utiles :</strong>{" "}
                    <Formula>f(−1) = 4/(−2) = −2</Formula> et{" "}
                    <Formula>f(3) = 12/2 = 6</Formula>.
                  </p>
                  <p>
                    <strong>Limites à l’infini :</strong>{" "}
                    pour x non nul,{" "}
                    <Formula>f(x) = x(1 + 3/x²)/(1 − 1/x)</Formula>. Le quotient{" "}
                    <Formula>(1 + 3/x²)/(1 − 1/x)</Formula> tend vers 1, donc
                    f(x) tend vers −∞ quand x tend vers −∞, et vers +∞ quand x
                    tend vers +∞.
                  </p>
                  <p>
                    <strong>Limites en 1 :</strong>{" "}
                    le numérateur <Formula>x² + 3</Formula> tend vers 4. Le
                    dénominateur <Formula>x − 1</Formula> tend vers 0 en restant
                    négatif à gauche de 1, positif à droite. Donc f(x) tend vers
                    −∞ à gauche de 1 et vers +∞ à droite de 1.
                  </p>
                </div>
                <div className="mt-5">
                  <FullVariationTable
                    functionName="f"
                    caption="Tableau de variation de f(x) = (x² + 3)/(x − 1), avec une double barre sous la valeur interdite 1"
                    columns={forbiddenValueColumns}
                    tableClassName="min-w-[560px]"
                    hintClassName="xl:hidden"
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  La double barre sous 1 signale la valeur interdite : f n’est
                  pas définie en 1 et aucune flèche ne traverse cette barre.
                </p>
                <p className="mt-4 rounded-xl bg-emerald-50 p-5 leading-7 text-emerald-950">
                  Donc f croît sur <Formula>]−∞ ; −1]</Formula>, décroît sur{" "}
                  <Formula>[−1 ; 1[</Formula> et sur <Formula>]1 ; 3]</Formula>,
                  puis croît sur <Formula>[3 ; +∞[</Formula>. Elle admet un
                  maximum local égal à −2 en <Formula>x = −1</Formula> et un
                  minimum local égal à 6 en <Formula>x = 3</Formula>.
                </p>
                <div className="mt-4 rounded-lg bg-amber-50 p-4 leading-7 text-amber-950">
                  <p>
                    <strong>Deux erreurs à éviter :</strong>
                  </p>
                  <ul className="mt-2 list-disc space-y-2 pl-5">
                    <li>
                      Écrire <Formula>« f décroît sur ]−1 ; 3[ »</Formula>. Cet
                      intervalle contient 1, où f n’existe pas. Vérification
                      rapide : <Formula>f(0) = −3</Formula> et{" "}
                      <Formula>f(2) = 7</Formula>, donc f(0) est plus petit que
                      f(2), ce qu’une fonction décroissante interdit. Il faut
                      citer les deux intervalles séparément.
                    </li>
                    <li>
                      Croire à une faute de calcul parce que le maximum local
                      (−2) est plus petit que le minimum local (6). Ces
                      extremums sont locaux : −2 est la plus grande valeur de f
                      à gauche de 1, et 6 la plus petite à droite de 1.
                    </li>
                  </ul>
                </div>
              </article>

              <article
                id="tableau-logarithme"
                className="min-w-0 scroll-mt-24 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <h3 className="text-xl font-bold text-slate-950">
                  2. Avec un logarithme : un tableau qui commence à 0
                </h3>
                <p className="mt-3 font-bold text-slate-950">
                  Étudier les variations de la fonction g définie par{" "}
                  <Formula>g(x) = x² − 8 ln(x)</Formula>.
                </p>
                <div className="mt-4 space-y-3 leading-7 text-slate-700">
                  <p>
                    <strong>Domaine :</strong>{" "}
                    <Formula>ln(x)</Formula> n’existe que pour{" "}
                    <Formula>{"x > 0"}</Formula>. La fonction g est donc définie
                    sur <Formula>]0 ; +∞[</Formula> : le tableau commence à 0,
                    borne exclue.
                  </p>
                  <p>
                    <strong>Dérivée :</strong>{" "}
                    on dérive terme à terme, puis on réduit au même dénominateur
                    pour pouvoir lire le signe.
                  </p>
                  <FormulaLines
                    lines={[
                      "g’(x) = 2x − 8/x",
                      "= (2x² − 8)/x",
                      "= 2(x − 2)(x + 2)/x",
                    ]}
                  />
                  <p>
                    <strong>Signe :</strong>{" "}
                    sur <Formula>]0 ; +∞[</Formula>, les facteurs x et{" "}
                    <Formula>x + 2</Formula> sont strictement positifs. Donc{" "}
                    <Formula>g’(x)</Formula> a le signe de{" "}
                    <Formula>x − 2</Formula> : négatif sur{" "}
                    <Formula>]0 ; 2[</Formula>, nul en 2, positif sur{" "}
                    <Formula>]2 ; +∞[</Formula>.
                  </p>
                  <p>
                    <strong>Valeur utile :</strong>{" "}
                    <Formula>g(2) = 4 − 8 ln(2)</Formula>, soit environ −1,55.
                  </p>
                  <p>
                    <strong>Limite en 0 :</strong>{" "}
                    quand x tend vers 0 par valeurs positives,{" "}
                    <Formula>x²</Formula> tend vers 0 et{" "}
                    <Formula>ln(x)</Formula> tend vers −∞, donc{" "}
                    <Formula>−8 ln(x)</Formula> tend vers +∞. Par somme, g(x)
                    tend vers +∞.
                  </p>
                  <p>
                    <strong>Limite en +∞ :</strong>{" "}
                    <Formula>x²</Formula> et <Formula>8 ln(x)</Formula> tendent
                    tous les deux vers +∞, la différence est une forme
                    indéterminée. On factorise :{" "}
                    <Formula>g(x) = x²(1 − 8 ln(x)/x²)</Formula>. Par croissance
                    comparée, <Formula>ln(x)/x²</Formula> tend vers 0 : la
                    parenthèse tend vers 1 et g(x) tend vers +∞.
                  </p>
                </div>
                <div className="mt-5">
                  <FullVariationTable
                    functionName="g"
                    caption="Tableau de variation de g(x) = x² − 8 ln(x) sur ]0 ; +∞[, avec une double barre sous 0"
                    columns={logarithmColumns}
                    tableClassName="min-w-[440px]"
                    hintClassName="sm:hidden"
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  La double barre sous 0 rappelle que g n’est pas définie en 0.
                  Aucune valeur négative de x n’apparaît dans le tableau.
                </p>
                <p className="mt-4 rounded-xl bg-emerald-50 p-5 leading-7 text-emerald-950">
                  Donc g décroît sur <Formula>]0 ; 2]</Formula> puis croît sur{" "}
                  <Formula>[2 ; +∞[</Formula>. Elle admet un minimum en{" "}
                  <Formula>x = 2</Formula>, égal à{" "}
                  <Formula>4 − 8 ln(2)</Formula>, soit environ −1,55.
                </p>
                <p className="mt-4 leading-7 text-slate-700">
                  <strong>Ce que le tableau permet de dire :</strong>{" "}
                  le minimum est négatif alors que g(x) tend vers +∞ aux deux
                  bornes. Comme g est continue et strictement monotone sur
                  chacun des deux intervalles, le corollaire du théorème des
                  valeurs intermédiaires s’applique deux fois : l’équation{" "}
                  <Formula>g(x) = 0</Formula> a exactement deux solutions, une
                  dans <Formula>]0 ; 2[</Formula> et une dans{" "}
                  <Formula>]2 ; +∞[</Formula>.
                </p>
                <p className="mt-4 rounded-lg bg-amber-50 p-4 leading-7 text-amber-950">
                  <strong>Erreur à éviter :</strong>{" "}
                  placer −2 dans le tableau. Le nombre −2 annule bien{" "}
                  <Formula>2(x − 2)(x + 2)</Formula>, mais il n’appartient pas à{" "}
                  <Formula>]0 ; +∞[</Formula> : g(−2) n’existe pas. On ne garde
                  que les valeurs du domaine.
                </p>
              </article>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <Target className="h-7 w-7 text-blue-800" />
              <h3 className="mt-4 text-2xl font-bold text-slate-950">
                Pièges fréquents
              </h3>
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
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <PlayCircle className="h-7 w-7 text-blue-800" />
                <h2 className="mt-4 text-3xl font-bold text-slate-950">
                  S’entraîner sur la dérivation
                </h2>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
                  Pour progresser, alterne un exercice court de dérivation, une fiche
                  méthode et un exercice type bac guidé. Le tableau de variation
                  devient plus naturel quand le signe de la dérivée est travaillé
                  plusieurs fois.
                </p>
              </div>
              <TrackedLink
                href="/exercices-maths-terminale/derivation"
                eventName="click_method_chapter_exercises"
                eventParams={{
                  ...methodEventParams,
                  cta_location: "method_training_primary",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-900 px-5 py-3 text-center font-bold text-white hover:bg-blue-800 sm:w-auto"
              >
                Faire des exercices sur la dérivation
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <TrackedLink
                href="/programme-maths-terminale/derivation-convexite"
                eventName="click_method_chapter_program"
                eventParams={{
                  ...methodEventParams,
                  cta_location: "method_training_program",
                }}
                className="rounded-xl border border-slate-200 bg-white p-5 font-semibold text-slate-800 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-blue-950"
              >
                Voir le programme Dérivation / Convexité
              </TrackedLink>
              <TrackedLink
                href="/exercices-type-bac-maths-terminale"
                eventName="click_method_chapter_typebac"
                eventParams={{
                  ...methodEventParams,
                  cta_location: "method_training_typebac",
                }}
                className="rounded-xl border border-slate-200 bg-white p-5 font-semibold text-slate-800 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-blue-950"
              >
                Essayer un exercice type bac guidé
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
                href="/planning-revision-bac-maths"
                eventName="click_method_chapter_planning"
                eventParams={{
                  ...methodEventParams,
                  lead_magnet: "planning_bac_maths_2027",
                  cta_location: "method_training_planning",
                }}
                className="rounded-xl border border-slate-200 bg-white p-5 font-semibold text-slate-800 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-blue-950"
              >
                Recevoir le planning Bac Maths 2027
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
          </section>

          <ChapterInternalLinks
            title="Continuer dans le cluster dérivation"
            links={internalLinks}
          />

          <FaqAccordion items={faqItems} sourcePage={pagePath} />
        </div>
      </div>
    </SeoPageLayout>
  );
}
