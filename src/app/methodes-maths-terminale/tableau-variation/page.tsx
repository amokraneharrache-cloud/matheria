import type { Metadata } from "next";
import {
  ArrowRight,
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
            <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
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
