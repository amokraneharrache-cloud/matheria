import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, History, ShieldCheck } from "lucide-react";
import { ChapterHero, ChapterInternalLinks } from "@/components/marketing/ChapterSeoPage";
import { ResourceTable, ResourceToc } from "@/components/marketing/J41SeoBlocks";
import { OfficialSources, QuickAnswer, StaticFaq } from "@/components/marketing/J42SeoBlocks";
import { OfficialExamCorrection, OfficialPdfLink, type ExamCorrectionExercise } from "@/components/marketing/OfficialExamCorrection";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/seo";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { bac2024J1Exercises, bac2024J1Pdf, bac2024J2Exercises, bac2024J2Pdf } from "./corrections";

const pagePath = "/sujet-bac-maths-2024-corrige";
const title = "Sujet Bac Maths 2024 corrigé : spécialité Terminale";
const description = "Sujets officiels du Bac Maths 2024 Métropole, La Réunion et Mayotte, jours 1 et 2, avec analyses et corrections originales SprintMaths.";
const eduscolAnnalesUrl = "https://eduscol.education.gouv.fr/5199/annales-des-epreuves-du-baccalaureat-des-voies-generale-et-technologique";
const bac2024J1AccessiblePdf = "https://eduscol.education.gouv.fr/sites/default/files/document/24-matj1me1-a20pdf-109098.pdf";

export const metadata: Metadata = {
  title: { absolute: title }, description,
  alternates: { canonical: absoluteUrl(pagePath) },
  openGraph: { title, description, url: absoluteUrl(pagePath), siteName: SITE_NAME, locale: "fr_FR", type: "website" },
  robots: { index: true, follow: true },
};

const faqItems: FaqItem[] = [
  { question: "Où télécharger les sujets officiels de maths 2024 ?", answer: "Cette page renvoie directement vers les PDF Éduscol du Jour 1 et du Jour 2 de la session principale Métropole, La Réunion et Mayotte. Une version officielle accessible en caractères agrandis du Jour 1 est aussi indiquée dans les sources." },
  { question: "Le corrigé 2024 de SprintMaths est-il officiel ?", answer: "Non. Les solutions sont des propositions originales SprintMaths établies depuis les sujets officiels. Elles ne constituent ni un corrigé ministériel ni un barème officiel." },
  { question: "Quelle était la structure des sujets 2024 ?", answer: "Chaque jour durait 4 heures et comportait quatre exercices obligatoires. Les répartitions imprimées étaient 4+5+5+6 au Jour 1 et 5+5+6+4 au Jour 2." },
  { question: "Le sujet de secours du Jour 1 est-il corrigé ici ?", answer: "Non. La page traite le sujet 24-MATJ1ME1 réellement donné le 19 juin 2024, et non le sujet de secours 24-MATJ1ME2." },
  { question: "Les sujets 2024 sont-ils encore pertinents avec le programme actuel ?", answer: "Oui pour les huit exercices présentés : les notions et raisonnements restent exploitables. Il faut néanmoins les utiliser comme entraînement, sans supposer que la structure d’une future session sera identique." },
];

function AnalysisTable({ exercises, caption }: { exercises: readonly ExamCorrectionExercise[]; caption: string }) {
  return <ResourceTable prominent caption={caption} headers={["Exercice", "Points", "Notions", "Difficulté", "Compétence dominante"]} rows={exercises.map((exercise) => ({ key: exercise.id, cells: [exercise.title, exercise.points.replace(" officiels", ""), exercise.topics, `${exercise.difficulty} — estimation SprintMaths`, exercise.skill] }))} />;
}

const relevanceRows = [
  ["J1 · Ex. 1", "Totalement exploitable", "Exponentielle, équation différentielle, limites et logique du contre-exemple restent directement mobilisables."],
  ["J1 · Ex. 2", "Totalement exploitable", "Arbre, loi binomiale, somme de variables indépendantes et Tchebychev restent des entraînements cohérents."],
  ["J1 · Ex. 3", "Totalement exploitable", "Plans, projection, aire, volume et distance travaillent les techniques actuelles de géométrie dans l’espace."],
  ["J1 · Ex. 4", "Totalement exploitable", "Logarithme, variations, convexité, fonction auxiliaire et calcul intégral restent utiles ensemble."],
  ["J2 · Ex. 1", "Totalement exploitable", "Le modèle binomial discret demande seulement de contextualiser le seuil de 65 %, obtenu à l’arrondi pour 12/20."],
  ["J2 · Ex. 2", "Totalement exploitable", "Suite récurrente, Python, conversions d’unités et équation différentielle forment un modèle complet."],
  ["J2 · Ex. 3", "Totalement exploitable", "Étude logarithmique, point d’inflexion et optimisation d’une distance restent des compétences transversales."],
  ["J2 · Ex. 4", "Totalement exploitable", "Équations de plans, intersection et projection orthogonale constituent un exercice court de consolidation."],
] as const;

export default function SujetBacMaths2024CorrigePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd data={[
        faqJsonLd(faqItems),
        breadcrumbJsonLd([{ name: "Accueil", path: "/" }, { name: "Annales Bac Maths Terminale", path: "/annales-bac-maths-terminale" }, { name: "Sujet Bac Maths 2024 corrigé", path: pagePath }]),
      ]} />

      <ChapterHero
        eyebrow="Session 2024 · Métropole, La Réunion et Mayotte"
        title="Sujet et corrigé du Bac Maths 2024 — spécialité Terminale"
        description="Deux vraies journées d’épreuve, deux identités pédagogiques : le 19 juin privilégie les raisonnements en chaîne ; le 20 juin combine modèles, optimisation et vrai/faux géométrique."
        secondaryDescription="Les corrections sont des propositions originales SprintMaths à partir des PDF Éduscol. Aucun énoncé n’est republié intégralement et aucun barème n’est inventé."
        ctas={[]}
      />

      <ResourceToc label="Sommaire du Bac Maths 2024" items={[
        { href: "#jour-1", label: "Jour 1 · 19 juin" }, { href: "#jour-2", label: "Jour 2 · 20 juin" }, { href: "#pertinence", label: "Pertinence actuelle" }, { href: "#comparaison", label: "Comparer 2024–2026" }, { href: "#faq", label: "FAQ" },
      ]} />

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-16">
          <QuickAnswer title="Les 2 jours réellement passés, pas le sujet de secours" tone="emerald">
            <p>Jour 1 : mercredi 19 juin 2024, code 24-MATJ1ME1. Jour 2 : jeudi 20 juin 2024, code 24-MATJ2ME2. Dans les deux cas : 4 heures, calculatrice avec mode examen actif ou modèle sans mémoire autorisée, quatre exercices obligatoires.</p>
            <p className="text-base">Les deux PDF originaux comptent 6 pages. Éduscol propose en plus une version accessible du Jour 1 en 14 pages agrandies, liée dans les sources.</p>
          </QuickAnswer>

          <section id="jour-1" className="scroll-mt-24 space-y-8">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div><p className="flex items-center gap-2 font-bold text-amber-950"><CalendarDays className="h-5 w-5" /> Mercredi 19 juin 2024</p><h2 className="mt-3 text-3xl font-bold text-slate-950">Jour 1 — sujet 24-MATJ1ME1</h2><p className="mt-3 max-w-3xl leading-7 text-slate-700">4, 5, 5 et 6 points : vrai/faux sur fonctions et suites ; satisfaction et livraison ; tétraèdre ; logarithme, fonction auxiliaire et aire.</p></div>
                <OfficialPdfLink href={bac2024J1Pdf} label="PDF officiel Jour 1" />
              </div>
            </div>
            <AnalysisTable exercises={bac2024J1Exercises} caption="Analyse du Jour 1 — points officiels et difficulté pédagogique SprintMaths" />
            <h2 className="text-3xl font-bold text-slate-950">Correction raisonnée du Jour 1</h2>
            <OfficialExamCorrection dayId="2024-jour-1" exercises={bac2024J1Exercises} officialPdfUrl={bac2024J1Pdf} />
          </section>

          <section id="jour-2" className="scroll-mt-24 space-y-8">
            <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-6 sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div><p className="flex items-center gap-2 font-bold text-cyan-950"><CalendarDays className="h-5 w-5" /> Jeudi 20 juin 2024</p><h2 className="mt-3 text-3xl font-bold text-slate-950">Jour 2 — sujet 24-MATJ2ME2</h2><p className="mt-3 max-w-3xl leading-7 text-slate-700">5, 5, 6 et 4 points : réussite à un examen ; chlore d’une piscine ; fonction logarithmique et distance minimale ; quatre affirmations de géométrie.</p></div>
                <OfficialPdfLink href={bac2024J2Pdf} label="PDF officiel Jour 2" />
              </div>
            </div>
            <AnalysisTable exercises={bac2024J2Exercises} caption="Analyse du Jour 2 — points officiels et difficulté pédagogique SprintMaths" />
            <h2 className="text-3xl font-bold text-slate-950">Correction raisonnée du Jour 2</h2>
            <OfficialExamCorrection dayId="2024-jour-2" exercises={bac2024J2Exercises} officialPdfUrl={bac2024J2Pdf} />
          </section>

          <section id="pertinence" className="scroll-mt-24 space-y-6">
            <ShieldCheck className="h-8 w-8 text-emerald-800" aria-hidden="true" />
            <div><h2 className="text-3xl font-bold text-slate-950">Ce sujet est-il toujours pertinent avec le programme actuel ?</h2><p className="mt-3 max-w-4xl leading-7 text-slate-700">Oui. La vérification exercice par exercice ne fait apparaître aucune notion à écarter dans ce périmètre. “Totalement exploitable” signifie ici utile pour les notions et compétences, pas prédictif du format d’une prochaine session.</p></div>
            <ResourceTable caption="Compatibilité pédagogique des huit exercices" headers={["Exercice", "Statut", "Pourquoi / contextualisation"]} rows={relevanceRows.map(([exercise, status, detail]) => ({ key: exercise, cells: [exercise, status, detail] }))} />
          </section>

          <section id="comparaison" className="scroll-mt-24 space-y-6">
            <History className="h-8 w-8 text-blue-800" aria-hidden="true" />
            <div><h2 className="text-3xl font-bold text-slate-950">Comparaison rapide : 2024 / 2025 / 2026</h2><p className="mt-3 max-w-4xl leading-7 text-slate-700">Les caractéristiques ci-dessous sont des constats pédagogiques sur les sujets lus, sans classement artificiel de difficulté.</p></div>
            <ResourceTable caption="Choisir une session selon le travail recherché" headers={["Année", "Principales notions", "Caractéristique intéressante", "Correction"]} rows={[
              { key: "2024", cells: ["2024", "Probabilités, suites, logarithme, intégrales, géométrie, équations différentielles", "Plusieurs preuves courtes puis deux optimisations ou calculs d’aire structurés.", <span key="current" className="font-bold text-slate-700">Page actuelle</span>] },
              { key: "2025", cells: ["2025", "Probabilités, convexité, aire, géométrie, modèles discret et continu", "Deux exercices longs relient représentation, modèle et interprétation physique ou biologique.", <Link key="2025" href="/sujet-bac-maths-2025-corrige" className="font-bold text-blue-900 underline">Corrigé 2025</Link>] },
              { key: "2026", cells: ["2026", "Variables aléatoires, dénombrement, suites, géométrie, logarithme, intégrales", "Des contextes variés et plusieurs questions de justification ou de seuil.", <Link key="2026" href="/sujet-bac-maths-2026-corrige" className="font-bold text-blue-900 underline">Corrigé 2026</Link>] },
            ]} />
          </section>

          <ChapterInternalLinks title="Choisir la suite de l’entraînement" variant="cards" links={[
            { href: "/annales-bac-maths-terminale", label: "Hub des annales" },
            { href: "/annales-bac-maths-par-chapitre", label: "Annales par chapitre" },
            { href: "/sujet-bac-maths-2025-corrige", label: "Sujet 2025 corrigé" },
            { href: "/sujet-bac-maths-2026-corrige", label: "Sujet 2026 corrigé" },
            { href: "/programme-maths-terminale", label: "Programme de Terminale" },
            { href: "/formules-bac-maths-terminale", label: "Formules du Bac" },
          ]} />

          <OfficialSources sources={[
            { href: bac2024J1Pdf, label: "Éduscol — Jour 1", description: "Sujet officiel 24-MATJ1ME1 du 19 juin 2024, 6 pages." },
            { href: bac2024J1AccessiblePdf, label: "Éduscol — Jour 1 accessible", description: "Version officielle en caractères agrandis, 14 pages." },
            { href: bac2024J2Pdf, label: "Éduscol — Jour 2", description: "Sujet officiel 24-MATJ2ME2 du 20 juin 2024, 6 pages." },
            { href: eduscolAnnalesUrl, label: "Éduscol — catalogue des annales", description: "Moteur institutionnel des sujets du baccalauréat." },
          ]} />

          <div id="faq" className="scroll-mt-24"><StaticFaq items={faqItems} /></div>
        </div>
      </section>
    </SeoPageLayout>
  );
}
