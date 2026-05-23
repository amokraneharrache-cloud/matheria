import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ChevronRight } from "lucide-react";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import { terminaleArticles } from "@/data/articles";
import { absoluteUrl } from "@/lib/site";

const pagePath = "/articles";

export const metadata: Metadata = {
  title: "Articles maths Terminale",
  description:
    "Guides de révision pour préparer le bac de maths Terminale : méthodes, chapitres prioritaires et erreurs fréquentes.",
  alternates: {
    canonical: absoluteUrl(pagePath),
  },
  openGraph: {
    title: "Articles maths Terminale — SprintMaths",
    description:
      "Guides de révision pour préparer le bac de maths Terminale avec méthode.",
    url: absoluteUrl(pagePath),
    type: "website",
  },
};

export default function ArticlesPage() {
  return (
    <SeoPageLayout urgencySourcePage={pagePath}>
      <section className="bg-gradient-to-b from-blue-50 to-white px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-4 inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-900">
            Articles Terminale
          </p>
          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl">
            Méthodes et révisions pour le bac de maths Terminale
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-slate-700">
            Des guides concrets pour revoir les chapitres clés, organiser les révisions et éviter les erreurs fréquentes.
          </p>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="grid gap-5 md:grid-cols-2">
            {terminaleArticles.map((article) => (
              <article
                key={article.slug}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-blue-200"
              >
                <BookOpen className="h-6 w-6 text-blue-800" />
                <p className="mt-4 text-sm font-bold uppercase tracking-wide text-slate-500">
                  Bac maths Terminale
                </p>
                <h2 className="mt-2 text-2xl font-bold text-slate-950">{article.title}</h2>
                <p className="mt-3 text-slate-700">{article.description}</p>
                <Link
                  href={`/articles/${article.slug}`}
                  className="mt-5 inline-flex items-center gap-2 font-bold text-blue-900 hover:underline"
                >
                  Lire l&apos;article
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-950">
              Organiser les révisions après la lecture
            </h2>
            <p className="mt-3 max-w-3xl text-slate-700">
              Le planning gratuit donne un ordre de travail pour les chapitres de
              Terminale. Les exercices type bac guidés permettent ensuite de
              mettre les méthodes en pratique.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href="/planning-revision-bac-maths"
                eventName="click_lead_magnet_planning"
                eventParams={{
                  source_page: pagePath,
                  lead_magnet: "planning_bac_maths_2027",
                  level: "terminale",
                  cta_location: "articles_planning_cta",
                }}
                className="inline-flex justify-center rounded-full bg-blue-900 px-5 py-3 font-bold text-white hover:bg-blue-800"
              >
                Recevoir le planning Bac Maths 2027
              </TrackedLink>
              <TrackedLink
                href="/exercices-type-bac-maths-terminale"
                eventName="click_exercises"
                eventParams={{
                  source_page: pagePath,
                  level: "terminale",
                  cta_location: "articles_typebac_cta",
                }}
                className="inline-flex justify-center rounded-full border border-blue-900 px-5 py-3 font-bold text-blue-900 hover:bg-white"
              >
                Essayer un exercice type bac guidé
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>
    </SeoPageLayout>
  );
}
