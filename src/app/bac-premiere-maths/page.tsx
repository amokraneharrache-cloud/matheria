import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, CalendarDays, CheckCircle2, FunctionSquare, Percent, Sigma } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { InternalLinks } from "@/components/marketing/InternalLinks";
import { SeoCta } from "@/components/marketing/SeoCta";
import { SeoFaq } from "@/components/marketing/SeoFaq";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import { getProgram } from "@/data/programs";
import { absoluteUrl } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd, productJsonLd, type FaqItem } from "@/lib/seo";

const pagePath = "/bac-premiere-maths";

const description =
  "Révise le bac de maths en Première avec des exercices ciblés, les automatismes clés, un plan 7 ou 14 jours et un suivi de progression.";

export const metadata: Metadata = {
  title: {
    absolute:
      "Réviser le bac de maths Première | Exercices & plan de révision — SprintMaths",
  },
  description,
  alternates: {
    canonical: absoluteUrl(pagePath),
  },
  openGraph: {
    title:
      "Réviser le bac de maths Première | Exercices & plan de révision — SprintMaths",
    description,
    url: absoluteUrl(pagePath),
    type: "website",
  },
};

const faqItems: FaqItem[] = [
  {
    question: "Quels chapitres de Première peut-on travailler ?",
    answer:
      "SprintMaths couvre les grands chapitres utiles en Première : fonctions, second degré, dérivation, suites, probabilités, statistiques et automatismes.",
  },
  {
    question: "Le plan de révision convient-il aux dernières semaines ?",
    answer:
      "Oui. Les formats 7 et 14 jours servent à choisir des priorités concrètes sans chercher à tout reprendre en une seule fois.",
  },
  {
    question: "Est-ce adapté à un élève qui manque de méthode ?",
    answer:
      "Oui. Les sessions ciblées et la progression par chapitre aident à repérer les automatismes à consolider et les notions à retravailler.",
  },
];

export default function BacPremiereMathsPage() {
  const program = getProgram("bac-premiere");
  const keyTopics = [
    { icon: Sigma, title: "Automatismes", text: "Fractions, puissances, calcul mental, conversions et réflexes algébriques." },
    { icon: FunctionSquare, title: "Fonctions", text: "Sens de variation, courbes, dérivation, tangentes et extremums." },
    { icon: Percent, title: "Probabilités", text: "Arbres, événements, indépendance, conditionnelles et statistiques." },
    { icon: BarChart3, title: "Second degré", text: "Discriminant, racines, signe du trinôme et formes utiles." },
  ];

  return (
    <SeoPageLayout>
      <JsonLd
        data={[
          productJsonLd(pagePath),
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Bac Première maths", path: pagePath },
          ]),
        ]}
      />
      <section className="bg-slate-50 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-800">
            Bac de maths Première
          </p>
          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl">
            Réviser le bac de maths Première sans s&apos;éparpiller
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-slate-700">
            En Première, les difficultés viennent souvent d&apos;un mélange entre
            automatismes fragiles, fonctions, probabilités et dérivation.
            SprintMaths aide l&apos;élève à cibler les chapitres importants, à
            s&apos;entraîner en sessions courtes et à suivre ses progrès.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TrackedLink
              href="/diagnostic"
              eventName="click_diagnostic"
              eventParams={{
                source_page: pagePath,
                cta_location: "bac_premiere_hero_primary",
              }}
              className="rounded-full bg-blue-900 px-6 py-3 text-center font-bold text-white hover:bg-blue-800"
            >
              Faire le diagnostic gratuit
            </TrackedLink>
            <Link
              href="/programme-maths-premiere"
              className="rounded-full border border-blue-900 px-6 py-3 text-center font-bold text-blue-900 hover:bg-blue-50"
            >
              Voir le programme Première
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-14">
          <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <h2 className="text-3xl font-bold text-slate-950">
                Objectif Bac de maths Première
              </h2>
              <p className="mt-4 text-slate-700">
                L&apos;enjeu n&apos;est pas seulement de relire le cours. L&apos;élève doit
                retrouver les bons automatismes, comprendre quel outil utiliser
                et répéter des exercices ciblés pour devenir plus régulier.
              </p>
              <p className="mt-4 text-slate-700">
                Le parcours SprintMaths organise ce travail autour du diagnostic,
                des chapitres clés et d&apos;un plan de révision simple à suivre.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {keyTopics.map((item) => (
                <article key={item.title} className="rounded-2xl bg-slate-50 p-5">
                  <item.icon className="h-6 w-6 text-blue-800" />
                  <h3 className="mt-3 text-lg font-bold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-700">{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-950">
              Automatismes et chapitres clés
            </h2>
            <p className="mt-3 max-w-3xl text-slate-700">
              Les chapitres affichés dans SprintMaths donnent une carte de travail
              claire pour réviser sans confondre toutes les notions.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {program?.topics.map((topic) => (
                <Link
                  key={topic.id}
                  href="/programme-maths-premiere"
                  className="rounded-xl border border-slate-200 p-4 hover:border-blue-200 hover:bg-blue-50"
                >
                  <h3 className="font-bold text-slate-950">{topic.label}</h3>
                  <p className="mt-1 text-sm text-slate-700">{topic.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: CheckCircle2,
                title: "Exercices ciblés",
                text: "Les sessions courtes permettent de travailler un chapitre précis sans perdre le fil.",
              },
              {
                icon: CalendarDays,
                title: "Plan 7 / 14 jours",
                text: "Un format pratique pour répartir les priorités avant une échéance proche.",
              },
              {
                icon: BarChart3,
                title: "Suivi de progression",
                text: "L'élève voit ses scores par session et peut revenir sur les chapitres fragiles.",
              },
            ].map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 p-6">
                <item.icon className="h-7 w-7 text-emerald-700" />
                <h2 className="mt-4 text-xl font-bold text-slate-950">{item.title}</h2>
                <p className="mt-2 text-slate-700">{item.text}</p>
              </article>
            ))}
          </section>

          <section className="rounded-3xl border-2 border-blue-200 bg-blue-50 p-6 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
              Épreuve anticipée de mathématiques
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950">
              Comprendre le format, puis s’entraîner
            </h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-700">
              Retrouve les règles officielles de l&apos;épreuve, les sujets zéro
              Éduscol et 50 automatismes corrigés sans calculatrice.
            </p>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {[
                ["/epreuve-anticipee-maths-premiere", "Format de l’épreuve"],
                ["/sujets-zero-maths-premiere", "Sujets zéro analysés"],
                ["/automatismes-maths-premiere", "Automatismes corrigés"],
              ].map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-xl border border-blue-100 bg-white p-4 font-bold text-blue-950 hover:border-blue-300"
                >
                  {label}
                </Link>
              ))}
            </div>
          </section>

          <SeoCta
            title="Construire un plan de révision Première"
            description="Le diagnostic gratuit aide à identifier les priorités avant de commencer les sessions par chapitre."
          />
          <SeoFaq items={faqItems} />
          <InternalLinks currentPath={pagePath} />
        </div>
      </section>
    </SeoPageLayout>
  );
}
