import type { Metadata } from "next";
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
