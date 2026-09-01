import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleAlert, ListChecks } from "lucide-react";
import { ChapterHero, ChapterInternalLinks } from "@/components/marketing/ChapterSeoPage";
import { GrandOralClusterLinks } from "@/components/marketing/GrandOralClusterLinks";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { grandOralSubjects } from "@/data/grandOral";
import { breadcrumbJsonLd } from "@/lib/seo";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { SubjectFilters } from "./SubjectFilters";

const pagePath = "/sujets-grand-oral-maths";
const title = "Sujets Grand Oral Maths : 50 idées de problématiques";
const description =
  "Trouve une problématique de Grand Oral Maths parmi 50 idées détaillées : notions, piste de raisonnement, vigilance, difficulté et liens avec une seconde spécialité.";

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

const surveySubjects = grandOralSubjects.filter((subject) =>
  subject.question.toLocaleLowerCase("fr").includes("sondage"),
);

const themeSummary = [
  {
    label: "Probabilités et hasard",
    count: grandOralSubjects.filter((subject) => subject.chapter === "Probabilités").length,
    href: "#probabilites",
  },
  { label: "Sondages et statistiques", count: surveySubjects.length, href: "#sondages" },
  { label: "Suites et modèles d’évolution", count: 7, href: "#suites" },
  { label: "Exponentielle et logarithme", count: 6, href: "#exponentielle-logarithme" },
  { label: "Dérivation et optimisation", count: 7, href: "#derivation-optimisation" },
  { label: "Intégrales et quantités cumulées", count: 5, href: "#integrales" },
  { label: "Géométrie et espace", count: 5, href: "#geometrie" },
  { label: "Algorithmique et informatique", count: 5, href: "#algorithmique" },
  { label: "Maths et autres spécialités", count: 6, href: "#autres-specialites" },
] as const;

const choiceChecklist = [
  "que tu comprends réellement, calculs et hypothèses compris ;",
  "qui permet un raisonnement, pas seulement un exposé documentaire ;",
  "qui utilise clairement des mathématiques du cycle terminal ;",
  "que tu peux expliquer simplement à une personne non spécialiste ;",
  "pour laquelle tu peux répondre aux objections et reconnaître les limites.",
];

export default function SujetsGrandOralMathsPage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Grand Oral Maths 2027", path: "/grand-oral-maths-2027" },
          { name: "50 sujets de Grand Oral Maths", path: pagePath },
        ])}
      />

      <ChapterHero
        eyebrow="Idées de problématiques — Grand Oral Maths"
        title="50 sujets de Grand Oral Maths pour trouver ta problématique"
        description="Chaque proposition ci-dessous formule une vraie question, indique les notions mobilisées et suggère une piste de raisonnement au niveau lycée. Utilise-les comme points de départ à comprendre et à personnaliser."
        secondaryDescription="Cette sélection n’est ni une liste officielle, ni une prédiction des sujets qui seront choisis. Ta question doit rester personnelle et être préparée avec tes professeurs de spécialité."
        ctas={[]}
      />

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-6xl space-y-16">
          <nav
            aria-labelledby="theme-navigation-title"
            className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-start"
          >
            <div>
              <h2 id="theme-navigation-title" className="text-3xl font-bold text-slate-950">
                Accéder directement à un thème
              </h2>
              <p className="mt-3 leading-7 text-slate-700">
                Ouvre immédiatement le groupe qui correspond à ta recherche. Les filtres restent
                disponibles ensuite pour croiser chapitre, deuxième spécialité et difficulté.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {themeSummary.map((theme) => (
                <Link
                  key={theme.href}
                  href={theme.href}
                  className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <span className="font-bold text-slate-950 group-hover:text-blue-950">
                    {theme.label}
                  </span>
                  <span className="mt-1 flex items-center justify-between text-sm font-semibold text-blue-900">
                    {theme.count} sujet{theme.count > 1 ? "s" : ""}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </nav>

          <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
            <CircleAlert className="h-7 w-7 text-amber-800" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-bold text-amber-950">
              Une idée devient un sujet seulement quand tu maîtrises son modèle
            </h2>
            <p className="mt-3 max-w-4xl leading-7 text-amber-950">
              Les exemples de données doivent être sourcés ou annoncés comme fictifs. Si une piste
              dépasse ponctuellement le programme, le point de vigilance le signale : ce prolongement
              ne doit jamais masquer les notions du cycle terminal ni introduire de pseudo-science.
            </p>
          </section>

          <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-950">
              Transformer une notion en vraie problématique
            </h2>
            <p className="mt-3 max-w-4xl leading-7 text-slate-700">
              Pars d’un résultat qui surprend, formule une question à laquelle un calcul peut
              répondre, puis annonce les hypothèses et les limites du modèle. « Présenter les
              probabilités » est trop descriptif ; « comment un sondage peut-il désigner le mauvais
              gagnant ? » appelle un raisonnement et une discussion.
            </p>
            <Link
              href="/questions-jury-grand-oral-maths"
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-blue-900 bg-white px-5 py-2 font-bold text-blue-950 hover:bg-blue-100"
            >
              Préparer les questions du jury
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </section>

          <SubjectFilters subjects={grandOralSubjects} />

          <section className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-6 sm:p-8">
            <ListChecks className="h-7 w-7 text-emerald-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">
              Comment choisir ta problématique ?
            </h2>
            <p className="mt-3 leading-7 text-slate-700">Choisis une question :</p>
            <ul className="mt-5 grid gap-3 md:grid-cols-2">
              {choiceChecklist.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-xl border border-emerald-100 bg-white p-4 leading-7 text-slate-800"
                >
                  <span className="text-xl text-emerald-800" aria-hidden="true">
                    □
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/grand-oral-maths-2027"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-emerald-900 px-5 py-2 font-bold text-white hover:bg-emerald-800"
              >
                Construire l’exposé
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/questions-jury-grand-oral-maths"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-emerald-900 bg-white px-5 py-2 font-bold text-emerald-950 hover:bg-emerald-100"
              >
                Tester ta compréhension face aux questions
              </Link>
            </div>
          </section>

          <GrandOralClusterLinks currentPath={pagePath} />

          <ChapterInternalLinks
            title="Revoir les notions avant de choisir"
            variant="cards"
            links={[
              { href: "/programme-maths-terminale/probabilites", label: "Probabilités" },
              { href: "/programme-maths-terminale/suites", label: "Suites" },
              {
                href: "/programme-maths-terminale/derivation-convexite",
                label: "Dérivation et convexité",
              },
              { href: "/programme-maths-terminale/integrales", label: "Intégrales" },
              { href: "/programme-maths-terminale/geometrie-espace", label: "Géométrie dans l’espace" },
              { href: "/python-bac-maths-terminale", label: "Python et algorithmique" },
            ]}
          />
        </div>
      </section>
    </SeoPageLayout>
  );
}
