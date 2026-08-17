import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, GraduationCap, Route } from "lucide-react";
import { ChapterHero, ChapterInternalLinks } from "@/components/marketing/ChapterSeoPage";
import { ResourceTable, ResourceToc } from "@/components/marketing/J41SeoBlocks";
import { OfficialSources, QuickAnswer, StaticFaq } from "@/components/marketing/J42SeoBlocks";
import { OfficialExamCorrection, OfficialPdfLink, type ExamCorrectionExercise } from "@/components/marketing/OfficialExamCorrection";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/seo";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { bac2025J1Exercises, bac2025J1Pdf, bac2025J2Exercises, bac2025J2Pdf } from "./corrections";

const pagePath = "/sujet-bac-maths-2025-corrige";
const title = "Sujet Bac Maths 2025 corrigé : spécialité Terminale";
const description = "Sujets officiels du Bac Maths 2025, jours 1 et 2 en Métropole, La Réunion et Mayotte, avec analyses et corrections originales SprintMaths.";
const eduscolAnnalesUrl = "https://eduscol.education.gouv.fr/5199/annales-des-epreuves-du-baccalaureat-des-voies-generale-et-technologique";

export const metadata: Metadata = {
  title: { absolute: title }, description,
  alternates: { canonical: absoluteUrl(pagePath) },
  openGraph: { title, description, url: absoluteUrl(pagePath), siteName: SITE_NAME, locale: "fr_FR", type: "website" },
  robots: { index: true, follow: true },
};

const faqItems: FaqItem[] = [
  { question: "Où télécharger le sujet officiel 2025 ?", answer: "Les boutons Jour 1 et Jour 2 renvoient directement vers les PDF publiés par le ministère pour les 17 et 18 juin 2025. Le catalogue Éduscol est également cité en bas de page." },
  { question: "Le corrigé SprintMaths est-il officiel ?", answer: "Non. Il s’agit d’une correction originale SprintMaths réalisée à partir du sujet officiel. Elle n’est ni un corrigé du ministère ni un barème officiel." },
  { question: "Combien y avait-il d’exercices ?", answer: "Chacun des deux sujets comportait quatre exercices à traiter. Les points imprimés totalisaient 20 : 5+6+4+5 au Jour 1 et 5+5+4+6 au Jour 2." },
  { question: "Faut-il faire le Jour 1 ou le Jour 2 ?", answer: "Le Jour 1 convient bien pour travailler une étude de fonction dense et deux modèles de probabilités ou de suites. Le Jour 2 associe probabilités, géométrie, vrai/faux et un modèle continu complet. Idéalement, fais les deux à des moments différents." },
  { question: "Le sujet 2025 est-il encore utile pour préparer le Bac ?", answer: "Oui, comme entraînement sur les notions et compétences compatibles avec le programme actuel. Une annale passée ne permet toutefois pas d’affirmer que les prochains sujets auront exactement la même structure." },
];

function AnalysisTable({ exercises, caption }: { exercises: readonly ExamCorrectionExercise[]; caption: string }) {
  return <ResourceTable prominent caption={caption} headers={["Exercice", "Points", "Notions", "Difficulté", "Compétence dominante"]} rows={exercises.map((exercise) => ({ key: exercise.id, cells: [exercise.title, exercise.points.replace(" officiels", ""), exercise.topics, `${exercise.difficulty} — estimation SprintMaths`, exercise.skill] }))} />;
}

function DayHeader({ day, date, code, pdf, exercises, summary, tone }: { day: string; date: string; code: string; pdf: string; exercises: readonly ExamCorrectionExercise[]; summary: string; tone: "blue" | "violet" }) {
  const colors = tone === "blue" ? "border-blue-200 bg-blue-50 text-blue-900" : "border-violet-200 bg-violet-50 text-violet-900";
  return (
    <div className={`rounded-2xl border p-6 sm:p-8 ${colors}`}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="flex items-center gap-2 font-bold"><CalendarDays className="h-5 w-5" /> {date}</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950">{day} — sujet {code}</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-700">{summary}</p>
          <p className="mt-3 text-sm font-semibold text-slate-700">4 heures · calculatrice autorisée · {exercises.length} exercices · 20 points indiqués</p>
        </div>
        <OfficialPdfLink href={pdf} label={`PDF officiel ${day.toLowerCase()}`} />
      </div>
    </div>
  );
}

const blockedRows = [
  ["J1 · Ex. 1", "Conditionnement ou borne mal reconnue", "Probabilités conditionnelles", "/methodes-maths-terminale/probabilites-conditionnelles", "Revoir la méthode"],
  ["J1 · Ex. 2", "Dérivée seconde ou aire difficile", "Convexité et intégrales", "/methodes-maths-terminale/integrales", "Méthode intégrales"],
  ["J1 · Ex. 3", "Caractérisation d’un plan fragile", "Géométrie dans l’espace", "/methodes-maths-terminale/geometrie-espace", "Méthode géométrie"],
  ["J1 · Ex. 4", "Passage discret-continu confus", "Suites et équations différentielles", "/methodes-maths-terminale/etudier-une-suite", "Méthode suites"],
  ["J2 · Ex. 1", "Événements contraires ou variances", "Probabilités", "/exercices-maths-terminale/probabilites", "Exercices probabilités"],
  ["J2 · Ex. 2", "Projection ou produit scalaire", "Géométrie dans l’espace", "/exercices-maths-terminale/geometrie-espace", "Exercices géométrie"],
  ["J2 · Ex. 3", "Justification d’un vrai/faux", "Limites et convexité", "/programme-maths-terminale/derivation-convexite", "Revoir le cours"],
  ["J2 · Ex. 4", "Lien vitesse-distance incompris", "Équations différentielles et intégrales", "/equations-differentielles-terminale", "Équations différentielles"],
] as const;

export default function SujetBacMaths2025CorrigePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd data={[
        faqJsonLd(faqItems),
        breadcrumbJsonLd([{ name: "Accueil", path: "/" }, { name: "Annales Bac Maths Terminale", path: "/annales-bac-maths-terminale" }, { name: "Sujet Bac Maths 2025 corrigé", path: pagePath }]),
      ]} />

      <ChapterHero
        eyebrow="Session 2025 · Métropole, La Réunion et Mayotte"
        title="Sujet et corrigé du Bac Maths 2025 — spécialité Terminale"
        description="Les sujets réellement donnés les mardi 17 et mercredi 18 juin 2025 : PDF ministériels, analyse précise et corrections originales exercice par exercice."
        secondaryDescription="Correction originale SprintMaths réalisée à partir du sujet officiel. Les énoncés sont seulement résumés ; le texte complet reste dans les PDF du ministère."
        ctas={[]}
      />

      <ResourceToc label="Accès rapide au Bac Maths 2025" items={[
        { href: "#jour-1", label: "Jour 1 · 17 juin" }, { href: "#jour-2", label: "Jour 2 · 18 juin" }, { href: "#blocages", label: "Notions à revoir" }, { href: "#comparaison", label: "2025 ou 2026 ?" }, { href: "#faq", label: "FAQ" },
      ]} />

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-16">
          <QuickAnswer title="2 sujets officiels · 8 exercices corrigés" tone="emerald">
            <p>Chaque journée durait 4 heures et autorisait une calculatrice avec mode examen actif, ou une calculatrice sans mémoire de type collège. Les deux PDF comportent 7 pages et quatre exercices.</p>
            <p className="text-base">Jour 1 : probabilités, logarithme et intégrales, géométrie, suites et équation différentielle. Jour 2 : probabilités, géométrie, vrai/faux, équation différentielle et distance.</p>
          </QuickAnswer>

          <section id="jour-1" className="scroll-mt-24 space-y-8">
            <DayHeader day="Jour 1" date="Mardi 17 juin 2025" code="25-MATJ1ME1" pdf={bac2025J1Pdf} exercises={bac2025J1Exercises} summary="Quatre exercices notés 5, 6, 4 et 5 points : groupes sanguins ; fonction logarithmique et aire ; vrai/faux de géométrie ; évolution de la posidonie avec deux modèles." tone="blue" />
            <AnalysisTable exercises={bac2025J1Exercises} caption="Analyse du Jour 1 — points du sujet et difficulté pédagogique SprintMaths" />
            <h2 className="text-3xl font-bold text-slate-950">Corrigé détaillé du Jour 1</h2>
            <OfficialExamCorrection dayId="2025-jour-1" exercises={bac2025J1Exercises} officialPdfUrl={bac2025J1Pdf} />
          </section>

          <section id="jour-2" className="scroll-mt-24 space-y-8">
            <DayHeader day="Jour 2" date="Mercredi 18 juin 2025" code="25-MATJ2ME1" pdf={bac2025J2Pdf} exercises={bac2025J2Exercises} summary="Quatre exercices notés 5, 5, 4 et 6 points : centre multisports ; géométrie dans l’espace ; quatre affirmations ; freinage d’un chariot et calcul de distance." tone="violet" />
            <AnalysisTable exercises={bac2025J2Exercises} caption="Analyse du Jour 2 — points du sujet et difficulté pédagogique SprintMaths" />
            <h2 className="text-3xl font-bold text-slate-950">Corrigé détaillé du Jour 2</h2>
            <OfficialExamCorrection dayId="2025-jour-2" exercises={bac2025J2Exercises} officialPdfUrl={bac2025J2Pdf} />
          </section>

          <section id="blocages" className="scroll-mt-24 space-y-6">
            <Route className="h-8 w-8 text-blue-800" aria-hidden="true" />
            <div><h2 className="text-3xl font-bold text-slate-950">Si tu as bloqué sur cet exercice</h2><p className="mt-3 max-w-4xl leading-7 text-slate-700">Repars de la difficulté précise, puis refais la question sans regarder le résultat final.</p></div>
            <ResourceTable caption="Diagnostic et meilleure ressource SprintMaths" headers={["Exercice", "Difficulté rencontrée", "Notion à revoir", "Ressource"]} rows={blockedRows.map(([exercise, issue, notion, href, label]) => ({ key: exercise, cells: [exercise, issue, notion, <Link key={href} href={href} className="font-bold text-blue-900 underline">{label}</Link>] }))} />
          </section>

          <section id="comparaison" className="scroll-mt-24 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
            <GraduationCap className="h-8 w-8 text-emerald-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">2025 ou 2026 : lequel faire en premier ?</h2>
            <p className="mt-4 leading-7 text-slate-700">Commence par 2025 si tu veux deux études longues qui croisent plusieurs registres : fonction et aire au Jour 1, vitesse et distance au Jour 2. Passe ensuite à 2026 pour rencontrer d’autres contextes, davantage de dénombrement et deux nouvelles combinaisons de géométrie et probabilités.</p>
            <p className="mt-4 leading-7 text-slate-700">Ce constat compare uniquement les PDF réellement publiés ; il ne prédit aucun futur sujet.</p>
            <Link href="/sujet-bac-maths-2026-corrige" className="mt-6 inline-flex min-h-11 items-center rounded-full bg-emerald-900 px-5 py-2 font-bold text-white">Voir le sujet Bac Maths 2026 corrigé</Link>
          </section>

          <ChapterInternalLinks title="Continuer avec les annales et les méthodes" variant="cards" links={[
            { href: "/annales-bac-maths-terminale", label: "Hub des annales" },
            { href: "/annales-bac-maths-par-chapitre", label: "Annales par chapitre" },
            { href: "/sujet-bac-maths-2024-corrige", label: "Sujet 2024 corrigé" },
            { href: "/sujet-bac-maths-2026-corrige", label: "Sujet 2026 corrigé" },
            { href: "/formules-bac-maths-terminale", label: "Formules de Terminale" },
            { href: "/methodes-maths-terminale", label: "Méthodes de Terminale" },
          ]} />

          <OfficialSources sources={[
            { href: bac2025J1Pdf, label: "Ministère — sujet 2025 Jour 1", description: "PDF officiel 25-MATJ1ME1, mardi 17 juin 2025, 7 pages." },
            { href: bac2025J2Pdf, label: "Ministère — sujet 2025 Jour 2", description: "PDF officiel 25-MATJ2ME1, mercredi 18 juin 2025, 7 pages." },
            { href: eduscolAnnalesUrl, label: "Éduscol — catalogue des annales", description: "Recherche institutionnelle des sujets du baccalauréat par session et épreuve." },
          ]} />

          <div id="faq" className="scroll-mt-24"><StaticFaq items={faqItems} /></div>
        </div>
      </section>
    </SeoPageLayout>
  );
}
