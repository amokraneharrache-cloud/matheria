import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  ClipboardList,
  LineChart,
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

const pagePath = "/programme-maths-terminale/limites";

const title = "Limites en Terminale : programme, méthodes et exercices";
const description =
  "Résumé du chapitre Limites en Terminale spécialité maths : limites de fonctions, formes indéterminées, asymptotes, méthodes et exercices type bac.";

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

const chapterEventParams = {
  chapter: "limites",
  level: "terminale",
  source_page: pagePath,
};

const notionChecklist = [
  "identifier une limite finie ou infinie",
  "repérer une forme indéterminée",
  "factoriser par le terme dominant",
  "utiliser les limites de référence",
  "traiter une fraction rationnelle",
  "interpréter une asymptote",
  "relier limite et tableau de variations",
  "rédiger une conclusion complète",
];

const revisionSteps = [
  "Reprendre les limites de référence et les opérations sur les limites.",
  "S'entraîner sur des quotients de polynômes en l'infini.",
  "Identifier les formes indéterminées avant de transformer l'expression.",
  "Faire un exercice guidé pour choisir la bonne méthode.",
  "Conclure avec la borne, la valeur de la limite et l'interprétation si besoin.",
];

const limitCases = [
  {
    title: "Quotient en l'infini",
    text: "On factorise souvent par la plus grande puissance de x au numérateur et au dénominateur.",
  },
  {
    title: "Différence de termes dominants",
    text: "On met en évidence le terme qui domine pour lever une forme du type infini moins infini.",
  },
  {
    title: "Asymptote",
    text: "Une limite finie en l'infini peut indiquer une asymptote horizontale à interpréter proprement.",
  },
];

const internalLinks = [
  { href: "/programme-maths-terminale", label: "Programme maths Terminale" },
  { href: "/exercices-maths-terminale/limites", label: "Exercices limites Terminale" },
  {
    href: "/methodes-maths-terminale/calculer-une-limite",
    label: "Méthode pour calculer une limite",
  },
  { href: "/exercices-type-bac-maths-terminale", label: "Exercices type bac Terminale" },
  { href: "/bac-maths-2027", label: "Bac Maths 2027" },
  { href: "/planning-revision-bac-maths", label: "Planning Bac Maths 2027" },
  { href: "/diagnostic", label: "Diagnostic gratuit" },
];

const faqItems: FaqItem[] = [
  {
    question: "Les limites sont-elles importantes en Terminale ?",
    answer:
      "Oui. Les limites interviennent dans les études de fonctions, les tableaux de variations, les asymptotes et certains exercices type bac. Elles servent souvent à conclure une étude complète.",
  },
  {
    question: "Comment reconnaître une forme indéterminée ?",
    answer:
      "On remplace mentalement la variable par la borne visée. Si les opérations donnent une situation comme infini sur infini, zero sur zero ou infini moins infini, il faut transformer l'expression avant de conclure.",
  },
  {
    question: "Quelle méthode utiliser pour un quotient de polynômes ?",
    answer:
      "En l'infini, on factorise par le terme de plus haut degré au numérateur et au dénominateur, puis on utilise les limites de référence comme 1/x qui tend vers 0.",
  },
  {
    question: "Faut-il toujours utiliser les croissances comparées ?",
    answer:
      "Non. Elles sont utiles avec exponentielle, logarithme ou puissances, mais beaucoup de limites de Terminale se traitent d'abord par factorisation, simplification ou opération directe.",
  },
  {
    question: "Que faire si je bloque sur une limite ?",
    answer:
      "Il faut nommer le type de blocage : opération directe impossible, terme dominant mal identifié, factorisation oubliée ou conclusion incomplète. Un exercice guidé aide ensuite à reprendre la méthode étape par étape.",
  },
];

export default function LimitesTerminalePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Programme maths Terminale", path: "/programme-maths-terminale" },
            { name: "Limites en Terminale", path: pagePath },
          ]),
        ]}
      />

      <ChapterHero
        eyebrow="Programme limites Terminale — spécialité maths"
        title="Limites en Terminale : ce qu'il faut savoir pour le Bac"
        description={
          <>
            Ce guide résume le chapitre des limites de fonctions en Terminale :
            les notions à connaître, les méthodes à choisir et les liens utiles
            pour passer aux exercices corrigés.
          </>
        }
        secondaryDescription={
          <>
            L&apos;objectif n&apos;est pas de recopier tout le cours, mais de savoir
            reconnaître une forme, transformer l&apos;expression et conclure sans
            perdre le sens de la question.
          </>
        }
        ctas={[
          {
            href: "/exercices-maths-terminale/limites",
            label: "Faire des exercices sur les limites",
            eventName: "click_chapter_exercise_cta",
            eventParams: {
              ...chapterEventParams,
              cta_location: "chapter_hero_primary",
            },
            icon: <PlayCircle className="h-5 w-5" />,
          },
          {
            href: "/methodes-maths-terminale/calculer-une-limite",
            label: "Voir la méthode pour calculer une limite",
            eventName: "click_chapter_method_cta",
            eventParams: {
              ...chapterEventParams,
              cta_location: "chapter_hero_secondary",
            },
            icon: <BookOpenCheck className="h-5 w-5" />,
            variant: "secondary",
          },
        ]}
        media={
          <div className="mx-auto w-full max-w-[260px] lg:max-w-[300px]">
            <Image
              src="/images/screenshots/sprintmaths-guided-exercise.png"
              alt="Aperçu SprintMaths d'un exercice guidé étape par étape."
              width={390}
              height={844}
              priority
              className="aspect-[390/844] w-full rounded-[28px] border border-slate-200 object-cover object-top shadow-xl"
            />
          </div>
        }
      />

      <section className="border-y border-slate-200 bg-slate-950 px-4 py-5 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm font-semibold sm:flex-row sm:items-center sm:justify-between">
          <span>Besoin d&apos;un plan avant les exercices ?</span>
          <div className="flex flex-col gap-3 sm:flex-row">
            <TrackedLink
              href="/planning-revision-bac-maths"
              eventName="click_chapter_planning_cta"
              eventParams={{
                ...chapterEventParams,
                lead_magnet: "planning_bac_maths_2027",
                cta_location: "chapter_top_band_planning",
              }}
              className="inline-flex items-center gap-2 text-blue-100 hover:text-white"
            >
              Recevoir le planning Bac Maths 2027
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
            <TrackedLink
              href="/diagnostic"
              eventName="click_chapter_diagnostic_cta"
              eventParams={{
                ...chapterEventParams,
                cta_location: "chapter_top_band_diagnostic",
              }}
              className="inline-flex items-center gap-2 text-emerald-200 hover:text-white"
            >
              Faire le diagnostic gratuit
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
          </div>
        </div>
      </section>

      <div className="px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-14">
          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <Target className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Pourquoi le chapitre des limites compte au Bac
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                Les limites apparaissent souvent dans les études de fonctions :
                elles donnent le comportement aux bornes, aident à compléter un
                tableau de variations et permettent d&apos;interpréter une asymptote.
              </p>
              <p>
                Le chapitre demande surtout de la méthode. Avant de calculer, il
                faut savoir si une opération directe suffit ou si une forme
                indéterminée impose une transformation.
              </p>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <ClipboardList className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Les notions à maîtriser
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                Cette liste sert de repère pour réviser sans se disperser.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {notionChecklist.map((item) => (
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

          <section>
            <div className="max-w-3xl">
              <LineChart className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Trois situations classiques
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                Les exercices type bac demandent rarement une astuce isolée. Ils
                demandent de reconnaître la famille de limite, puis de justifier la
                transformation.
              </p>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {limitCases.map((item) => (
                <article key={item.title} className="rounded-xl bg-slate-50 p-5">
                  <ListChecks className="h-6 w-6 text-blue-800" />
                  <h3 className="mt-3 text-xl font-bold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 leading-7 text-slate-700">{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <BookOpenCheck className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Comment réviser les limites efficacement
              </h2>
            </div>
            <ol className="space-y-3">
              {revisionSteps.map((step, index) => (
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

          <section className="rounded-xl bg-blue-950 p-6 text-white sm:p-8">
            <h3 className="text-3xl font-bold">Passer du chapitre aux exercices</h3>
            <p className="mt-4 max-w-3xl leading-7 text-blue-100">
              Si les limites sont fragiles, commence par quelques exercices courts,
              puis travaille une méthode détaillée avant de revenir aux sujets type
              bac.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TrackedLink
                href="/exercices-maths-terminale/limites"
                eventName="click_chapter_exercise_cta"
                eventParams={{
                  ...chapterEventParams,
                  cta_location: "chapter_final_exercises",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-emerald-500 px-5 py-3 text-center font-bold text-white hover:bg-emerald-400 sm:w-auto"
              >
                Faire des exercices sur les limites
              </TrackedLink>
              <TrackedLink
                href="/methodes-maths-terminale/calculer-une-limite"
                eventName="click_chapter_method_cta"
                eventParams={{
                  ...chapterEventParams,
                  cta_location: "chapter_final_method",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-blue-200 px-5 py-3 text-center font-bold text-white hover:bg-blue-900 sm:w-auto"
              >
                Revoir la méthode
              </TrackedLink>
              <TrackedLink
                href="/exercices-type-bac-maths-terminale"
                eventName="click_chapter_exercise_cta"
                eventParams={{
                  ...chapterEventParams,
                  cta_location: "chapter_final_typebac",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-blue-200 px-5 py-3 text-center font-bold text-white hover:bg-blue-900 sm:w-auto"
              >
                Essayer un exercice type bac
              </TrackedLink>
              <Link
                href="/bac-maths-2027"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-white px-5 py-3 text-center font-bold text-blue-950 hover:bg-blue-50 sm:w-auto"
              >
                Voir l&apos;offre Bac 2027
              </Link>
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
