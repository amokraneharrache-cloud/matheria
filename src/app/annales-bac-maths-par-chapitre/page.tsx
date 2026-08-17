import type { Metadata } from "next";
import Link from "next/link";
import { BookOpenCheck, Filter, Map, SlidersHorizontal } from "lucide-react";
import { ChapterHero, ChapterInternalLinks } from "@/components/marketing/ChapterSeoPage";
import { ResourceTable, ResourceToc } from "@/components/marketing/J41SeoBlocks";
import { OfficialSources, QuickAnswer, StaticFaq } from "@/components/marketing/J42SeoBlocks";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/seo";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { ChapterAnnalesFilters } from "./ChapterAnnalesFilters";
import { chapterExercises, chapterGuides, type AnnaleDifficulty, type ChapterName } from "./data";

const pagePath = "/annales-bac-maths-par-chapitre";
const title = "Annales Bac Maths par chapitre : exercices de vrais sujets";
const description = "24 exercices officiels des Bac Maths 2024, 2025 et 2026 classés par chapitre, année et difficulté, avec PDF et corrigés SprintMaths disponibles.";
const eduscolAnnalesUrl = "https://eduscol.education.gouv.fr/5199/annales-des-epreuves-du-baccalaureat-des-voies-generale-et-technologique";

export const metadata: Metadata = {
  title: { absolute: title }, description,
  alternates: { canonical: absoluteUrl(pagePath) },
  openGraph: { title, description, url: absoluteUrl(pagePath), siteName: SITE_NAME, locale: "fr_FR", type: "website" },
  robots: { index: true, follow: true },
};

const faqItems: FaqItem[] = [
  { question: "Où trouver des annales Bac Maths par chapitre ?", answer: "Cette page classe 24 exercices des sujets principaux 2024, 2025 et 2026 par notion. Les filtres permettent de choisir un chapitre, une année et une difficulté sans parcourir chaque PDF." },
  { question: "Quel exercice choisir pour réviser les probabilités ?", answer: "Commence par filtrer “Probabilités conditionnelles”, puis choisis une difficulté adaptée. Les exercices accessibles ou intermédiaires servent à consolider l’arbre et le conditionnement ; les soutenus ajoutent souvent binomiale, variance ou Tchebychev." },
  { question: "Les exercices viennent-ils de vrais sujets ?", answer: "Oui. Chaque carte correspond à un exercice réellement lu dans les sujets officiels des deux jours principaux de 2024, 2025 ou 2026, et renvoie vers le PDF institutionnel." },
  { question: "Les corrections sont-elles officielles ?", answer: "Non. Les PDF de sujets sont officiels ; les liens de correction mènent vers des solutions originales SprintMaths, clairement présentées comme non officielles." },
  { question: "Peut-on travailler seulement des exercices au lieu de sujets complets ?", answer: "Oui pour cibler une notion. Il reste utile d’alterner avec des sujets complets afin de travailler le choix des méthodes, l’endurance et la gestion des quatre exercices." },
];

function matchesChapter(name: ChapterName) {
  return chapterExercises.filter((item) => item.mainChapter === name || item.secondaryChapters.includes(name));
}

function compactExercise(item: (typeof chapterExercises)[number] | undefined, fallback: string) {
  return item ? `${item.year} · ${item.day} · ${item.exercise}` : fallback;
}

function pick(name: ChapterName, difficulty: AnnaleDifficulty) {
  return matchesChapter(name).find((item) => item.difficulty === difficulty);
}

export default function AnnalesBacMathsParChapitrePage() {
  const orientationRows = chapterGuides.map(({ name }) => {
    const available = matchesChapter(name);
    const easiest = available.find((item) => item.difficulty === "Accessible") ?? available.find((item) => item.difficulty === "Intermédiaire") ?? available[0];
    return {
      key: name,
      cells: [
        name,
        compactExercise(easiest, "Aucun exercice disponible"),
        compactExercise(pick(name, "Intermédiaire"), "Passer au niveau soutenu"),
        compactExercise(pick(name, "Soutenue"), "Aucun sujet soutenu dans la sélection"),
      ],
    };
  });

  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd data={[
        faqJsonLd(faqItems),
        breadcrumbJsonLd([{ name: "Accueil", path: "/" }, { name: "Annales Bac Maths Terminale", path: "/annales-bac-maths-terminale" }, { name: "Annales par chapitre", path: pagePath }]),
      ]} />

      <ChapterHero
        eyebrow="Vrais sujets 2024 · 2025 · 2026"
        title="Annales du Bac Maths classées par chapitre"
        description="Choisis une notion, puis un exercice réellement donné au Bac : 24 exercices des deux journées principales, tous lus et classés manuellement."
        secondaryDescription="Le hub Annales Terminale organise les PDF par année et centre. Cette page répond à une autre intention : partir d’un chapitre précis, sans créer une page pauvre pour chaque exercice."
        ctas={[]}
      />

      <ResourceToc label="Trouver un exercice de Bac" items={[
        { href: "#mode-emploi", label: "Comment utiliser l’index" }, { href: "#chapitres", label: "Chapitres et ressources" }, { href: "#filtres", label: "Filtrer les 24 exercices" }, { href: "#orientation", label: "Quelle annale choisir ?" }, { href: "#faq", label: "FAQ" },
      ]} />

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-16">
          <QuickAnswer title="24 exercices officiels, une seule entrée par exercice" tone="emerald">
            <p>La sélection couvre les deux sujets principaux de Métropole–La Réunion–Mayotte en 2024, 2025 et 2026. Chaque exercice possède un chapitre principal et, seulement lorsqu’elles sont réellement travaillées, des notions secondaires.</p>
            <p className="text-base">La difficulté Accessible, Intermédiaire ou Soutenue est une estimation pédagogique SprintMaths. Elle n’est ni une donnée du ministère ni un barème.</p>
          </QuickAnswer>

          <section id="mode-emploi" className="scroll-mt-24 rounded-2xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
            <Map className="h-8 w-8 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">Annales par année ou annales par chapitre ?</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <article className="rounded-xl bg-white p-5"><h3 className="font-bold text-slate-950">Je veux faire un sujet complet</h3><p className="mt-2 leading-7 text-slate-700">Passe par le <Link href="/annales-bac-maths-terminale" className="font-bold text-blue-900 underline">hub des annales Terminale</Link> pour choisir une année, un centre et un jour.</p></article>
              <article className="rounded-xl bg-white p-5"><h3 className="font-bold text-slate-950">Je veux cibler une notion</h3><p className="mt-2 leading-7 text-slate-700">Reste ici : filtre le chapitre, choisis un niveau, ouvre le PDF officiel puis la correction annuelle si nécessaire.</p></article>
            </div>
          </section>

          <section id="chapitres" className="scroll-mt-24 space-y-7">
            <BookOpenCheck className="h-8 w-8 text-blue-800" aria-hidden="true" />
            <div><h2 className="text-3xl font-bold text-slate-950">Chapitres réellement présents</h2><p className="mt-3 max-w-4xl leading-7 text-slate-700">Aucune section vide : chaque catégorie ci-dessous apparaît comme notion principale ou secondaire dans au moins un des 24 exercices. Les liens reconnectent l’annale au cours, à la méthode, aux exercices ou aux formules disponibles.</p></div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {chapterGuides.map((guide) => {
                const count = matchesChapter(guide.name).length;
                return (
                  <article key={guide.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-bold uppercase tracking-[0.12em] text-blue-800">{count} exercice{count > 1 ? "s" : ""}</p>
                    <h3 className="mt-2 text-xl font-bold text-slate-950">{guide.name}</h3>
                    <p className="mt-3 leading-7 text-slate-700">{guide.intro}</p>
                    <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">{guide.links.map((link) => <Link key={link.href} href={link.href} className="font-bold text-blue-900 underline underline-offset-4">{link.label}</Link>)}</div>
                  </article>
                );
              })}
            </div>
          </section>

          <section id="filtres" className="scroll-mt-24 space-y-7">
            <SlidersHorizontal className="h-8 w-8 text-blue-800" aria-hidden="true" />
            <div><h2 className="text-3xl font-bold text-slate-950">Filtrer les exercices de vrais sujets</h2><p className="mt-3 max-w-4xl leading-7 text-slate-700">Les filtres sont entièrement locaux : aucun compte, serveur ou suivi. Les 24 cartes sont présentes dans le HTML initial ; le navigateur ne fait que masquer celles qui ne correspondent pas.</p></div>
            <ChapterAnnalesFilters />
          </section>

          <section id="orientation" className="scroll-mt-24 space-y-7">
            <Filter className="h-8 w-8 text-emerald-800" aria-hidden="true" />
            <div><h2 className="text-3xl font-bold text-slate-950">Quelle annale choisir ?</h2><p className="mt-3 max-w-4xl leading-7 text-slate-700">“Je découvre” prend l’exercice accessible disponible, ou à défaut le premier intermédiaire. “Je maîtrise les bases” cible l’intermédiaire. “Je veux me tester” correspond au niveau Soutenu de SprintMaths.</p></div>
            <ResourceTable caption="Un point de départ par chapitre et par niveau" headers={["Chapitre", "Je découvre", "Je maîtrise les bases", "Je veux me tester"]} rows={orientationRows} />
          </section>

          <ChapterInternalLinks title="Naviguer entre les trois sessions" variant="cards" links={[
            { href: "/annales-bac-maths-terminale", label: "Hub par année et centre" },
            { href: "/sujet-bac-maths-2024-corrige", label: "Sujet 2024 corrigé" },
            { href: "/sujet-bac-maths-2025-corrige", label: "Sujet 2025 corrigé" },
            { href: "/sujet-bac-maths-2026-corrige", label: "Sujet 2026 corrigé" },
            { href: "/sujets-type-bac-maths-terminale", label: "Sujets type SprintMaths" },
            { href: "/programme-maths-terminale", label: "Programme de Terminale" },
          ]} />

          <OfficialSources sources={[
            { href: eduscolAnnalesUrl, label: "Éduscol — annales du baccalauréat", description: "Catalogue institutionnel utilisé pour contrôler les sessions et les PDF." },
            { href: "/sujet-bac-maths-2024-corrige", label: "Inventaire SprintMaths — session 2024", description: "Deux jours et huit exercices corrigés à partir des PDF officiels." },
            { href: "/sujet-bac-maths-2025-corrige", label: "Inventaire SprintMaths — session 2025", description: "Deux jours et huit exercices corrigés à partir des PDF officiels." },
            { href: "/sujet-bac-maths-2026-corrige", label: "Inventaire SprintMaths — session 2026", description: "Deux jours et huit exercices corrigés à partir des PDF officiels." },
          ]} />

          <div id="faq" className="scroll-mt-24"><StaticFaq items={faqItems} /></div>
        </div>
      </section>
    </SeoPageLayout>
  );
}
