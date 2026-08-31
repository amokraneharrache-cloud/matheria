import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookOpenCheck, CalendarDays, GraduationCap } from "lucide-react";
import { ChapterHero, ChapterInternalLinks } from "@/components/marketing/ChapterSeoPage";
import { OfficialSources, QuickAnswer, StaticFaq } from "@/components/marketing/J42SeoBlocks";
import { OfficialExamCorrection, OfficialPdfLink } from "@/components/marketing/OfficialExamCorrection";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { bac2026CorrectionBySlug, bac2026CorrectionSubjects } from "@/data/bac2026Corrections";
import { breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/seo";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return bac2026CorrectionSubjects.map((subject) => ({ slug: subject.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const subject = bac2026CorrectionBySlug.get(slug);

  if (!subject) return {};

  const pagePath = `/annales/bac-maths-2026/${subject.slug}`;
  return {
    title: { absolute: subject.title },
    description: subject.description,
    alternates: { canonical: absoluteUrl(pagePath) },
    openGraph: {
      title: subject.title,
      description: subject.description,
      url: absoluteUrl(pagePath),
      siteName: SITE_NAME,
      locale: "fr_FR",
      type: "article",
    },
    robots: { index: true, follow: true },
  };
}

export default async function Bac2026CenterCorrectionPage({ params }: PageProps) {
  const { slug } = await params;
  const subject = bac2026CorrectionBySlug.get(slug);
  if (!subject) notFound();

  const pagePath = `/annales/bac-maths-2026/${subject.slug}`;
  const faqItems: FaqItem[] = [
    {
      question: `Combien d’exercices du sujet ${subject.center} ${subject.day} sont corrigés ?`,
      answer: "Les quatre exercices du sujet officiel sont corrigés intégralement. Chaque bloc présente la méthode, les calculs utiles, une rédaction possible, le résultat et une erreur fréquente.",
    },
    {
      question: "Ce corrigé du Bac Maths 2026 est-il officiel ?",
      answer: "Non. Le PDF lié est le sujet officiel du ministère ; la correction est une proposition pédagogique originale SprintMaths, sans statut de corrigé officiel ni de barème.",
    },
    {
      question: "Comment travailler avec ce corrigé détaillé ?",
      answer: "Traite d’abord l’exercice dans le PDF sans ouvrir la solution. Compare ensuite la notion reconnue, les étapes de calcul et la conclusion, puis refais les seules questions manquées.",
    },
  ];

  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Annales Bac Maths Terminale", path: "/annales-bac-maths-terminale" },
            { name: `Bac Maths 2026 ${subject.center} ${subject.day}`, path: pagePath },
          ]),
        ]}
      />

      <ChapterHero
        eyebrow={`Session 2026 · ${subject.center} · ${subject.day}`}
        title={`Sujet Bac Maths 2026 ${subject.center} ${subject.day} — corrigé détaillé`}
        description={subject.summary}
        secondaryDescription="Correction proposée par SprintMaths à partir du sujet officiel. Les énoncés sont reformulés brièvement ; le texte complet reste dans le PDF ministériel."
        ctas={[]}
      />

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-14">
          <QuickAnswer title="4 exercices sur 4 corrigés en détail" tone="emerald">
            <p>
              Le sujet {subject.code} comporte quatre exercices, tous couverts ci-dessous. Chaque correction explicite la méthode, les étapes, la justification et le résultat.
            </p>
            <p className="text-base">
              Commence par le PDF officiel, puis ouvre uniquement le corrigé de l’exercice que tu viens de chercher.
            </p>
          </QuickAnswer>

          <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="flex items-center gap-2 font-bold text-blue-900">
                  <CalendarDays className="h-5 w-5" aria-hidden="true" />
                  {subject.center} · {subject.day} · {subject.code}
                </p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950">Sujet officiel et correction SprintMaths</h2>
                <p className="mt-3 max-w-3xl leading-7 text-slate-700">{subject.summary}</p>
              </div>
              <OfficialPdfLink href={subject.pdfUrl} label="Ouvrir le PDF officiel" />
            </div>
          </section>

          <section className="space-y-7">
            <div>
              <BookOpenCheck className="h-8 w-8 text-blue-800" aria-hidden="true" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">Corrigé complet, exercice par exercice</h2>
              <p className="mt-3 max-w-4xl leading-7 text-slate-700">
                Les réponses sont regroupées par parties cohérentes sans reproduire inutilement l’énoncé. Tous les sous-résultats nécessaires figurent dans les calculs utiles.
              </p>
            </div>
            <OfficialExamCorrection
              dayId={subject.id}
              exercises={subject.exercises}
              officialPdfUrl={subject.pdfUrl}
            />
          </section>

          <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
            <GraduationCap className="h-8 w-8 text-emerald-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">Transformer la correction en progrès</h2>
            <ol className="mt-5 grid gap-4 md:grid-cols-3">
              <li className="rounded-xl bg-white p-5 leading-7 text-slate-700"><strong className="text-slate-950">1. Repère</strong><br />Nomme la notion avant de relire les calculs.</li>
              <li className="rounded-xl bg-white p-5 leading-7 text-slate-700"><strong className="text-slate-950">2. Corrige</strong><br />Réécris la première étape où ton raisonnement diverge.</li>
              <li className="rounded-xl bg-white p-5 leading-7 text-slate-700"><strong className="text-slate-950">3. Rejoue</strong><br />Refais la question deux jours plus tard sans le corrigé.</li>
            </ol>
          </section>

          <ChapterInternalLinks
            title="Continuer avec les annales et les chapitres"
            variant="cards"
            links={[
              { href: "/annales-bac-maths-terminale", label: "Toutes les annales 2026" },
              { href: "/annales-bac-maths-par-chapitre", label: "Annales par chapitre" },
              { href: "/programme-maths-terminale/probabilites", label: "Probabilités" },
              { href: "/programme-maths-terminale/suites", label: "Suites" },
              { href: "/programme-maths-terminale/geometrie-espace", label: "Géométrie dans l’espace" },
              { href: "/programme-maths-terminale/integrales", label: "Intégrales" },
            ]}
          />

          <OfficialSources
            sources={[
              { href: subject.pdfUrl, label: `Ministère — PDF ${subject.code}`, description: `Sujet officiel ${subject.center}, ${subject.day}.` },
              { href: "/annales-bac-maths-terminale", label: "SprintMaths — hub des annales", description: "Les dix sujets officiels 2026 avec leur corrigé détaillé." },
              { href: "/annales-bac-maths-par-chapitre", label: "SprintMaths — annales par chapitre", description: "Une autre entrée pour choisir un exercice par notion." },
            ]}
          />

          <div id="faq" className="scroll-mt-24"><StaticFaq items={faqItems} /></div>
        </div>
      </section>
    </SeoPageLayout>
  );
}
