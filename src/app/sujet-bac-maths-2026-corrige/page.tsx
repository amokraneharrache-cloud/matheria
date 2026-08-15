import type { Metadata } from "next";
import { CalendarDays, GraduationCap, TriangleAlert } from "lucide-react";
import { ChapterHero, ChapterInternalLinks } from "@/components/marketing/ChapterSeoPage";
import { ResourceTable, ResourceToc } from "@/components/marketing/J41SeoBlocks";
import { OfficialSources, QuickAnswer, StaticFaq } from "@/components/marketing/J42SeoBlocks";
import { OfficialExamCorrection, OfficialPdfLink } from "@/components/marketing/OfficialExamCorrection";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/seo";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { terminaleJ1Exercises, terminaleJ1Pdf, terminaleJ2Exercises, terminaleJ2Pdf } from "./corrections";

const pagePath = "/sujet-bac-maths-2026-corrige";
const title = "Sujet Bac Maths 2026 corrigé : spécialité Terminale";
const description = "Sujets officiels Bac Maths 2026 Terminale spécialité, jours 1 et 2 Métropole–La Réunion–Mayotte, avec analyses et corrections détaillées SprintMaths.";
const officialSubjectsUrl = "https://www.education.gouv.fr/brevet-bac-et-cap-les-sujets-des-examens-2026-504911";

export const metadata: Metadata = {
  title: { absolute: title }, description,
  alternates: { canonical: absoluteUrl(pagePath) },
  openGraph: { title, description, url: absoluteUrl(pagePath), siteName: SITE_NAME, locale: "fr_FR", type: "website" },
  robots: { index: true, follow: true },
};

const faqItems: FaqItem[] = [
  { question: "Quels sujets du Bac Maths 2026 sont corrigés ici ?", answer: "Les deux sujets officiels de spécialité mathématiques donnés les 16 et 17 juin 2026 en Métropole, à La Réunion et à Mayotte. Les autres centres sont accessibles depuis le hub d’annales." },
  { question: "Les corrections SprintMaths sont-elles officielles ?", answer: "Non. Chaque corrigé est une proposition originale de SprintMaths à partir du sujet officiel. Le ministère fournit ici les sujets PDF, pas ces corrections ni un barème détaillé." },
  { question: "Combien de temps durait l’épreuve et la calculatrice était-elle autorisée ?", answer: "Chaque journée durait 4 heures. Une calculatrice avec mode examen actif ou une calculatrice sans mémoire de type collège était autorisée, selon la mention imprimée sur les deux sujets." },
  { question: "Combien d’exercices comportaient les sujets ?", answer: "Chaque journée comportait quatre exercices à traiter. Les points indiqués par exercice totalisaient 20 : 5+4+6+5 au jour 1 et 5+5+4+6 au jour 2." },
  { question: "Peut-on prévoir le Bac 2027 avec ces sujets ?", answer: "Non. Ces annales aident à comprendre le niveau de justification, la variété des contextes et la gestion de quatre exercices, mais elles ne permettent pas de prévoir les chapitres ou la difficulté de la session 2027." },
];

function AnalysisTable({ exercises, caption }: { exercises: typeof terminaleJ1Exercises | typeof terminaleJ2Exercises; caption: string }) {
  return <ResourceTable prominent caption={caption} headers={["Exercice", "Points", "Notions", "Difficulté pédagogique", "Compétence dominante"]} rows={exercises.map((exercise) => ({ key: exercise.id, cells: [exercise.title, exercise.points.replace(" officiels", ""), exercise.topics, `${exercise.difficulty} — estimation SprintMaths`, exercise.skill] }))} />;
}

export default function SujetBacMaths2026CorrigePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd data={[
        faqJsonLd(faqItems),
        breadcrumbJsonLd([{ name: "Accueil", path: "/" }, { name: "Annales Bac Maths Terminale", path: "/annales-bac-maths-terminale" }, { name: "Sujet Bac Maths 2026 corrigé", path: pagePath }]),
      ]} />

      <ChapterHero
        eyebrow="Session 2026 · Métropole, La Réunion et Mayotte"
        title="Sujet et corrigé du Bac Maths 2026 — spécialité Terminale"
        description="Les deux sujets réellement donnés les mardi 16 et mercredi 17 juin 2026 : PDF ministériels, analyse exercice par exercice et corrections originales SprintMaths."
        secondaryDescription="Correction proposée par SprintMaths à partir du sujet officiel. Il ne s’agit ni d’un corrigé officiel ni d’un barème du ministère. Les énoncés sont résumés : le texte complet reste dans les PDF liés."
        ctas={[]}
      />

      <ResourceToc label="Sommaire du corrigé 2026" items={[
        { href: "#repere", label: "Repères officiels" }, { href: "#jour-1", label: "Jour 1" }, { href: "#jour-2", label: "Jour 2" }, { href: "#bac-2027", label: "Leçons pour 2027" }, { href: "#erreurs", label: "Erreurs coûteuses" }, { href: "#faq", label: "FAQ" },
      ]} />

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-16">
          <div id="repere" className="scroll-mt-24">
            <QuickAnswer title="2 journées · 4 h chacune · 4 exercices par sujet" tone="emerald">
              <p>Jour 1 : 5 + 4 + 6 + 5 points. Jour 2 : 5 + 5 + 4 + 6 points. Calculatrice autorisée avec mode examen actif, ou modèle sans mémoire de type collège.</p>
              <p className="text-base">Le sujet complet de chaque jour doit être lu dans le PDF officiel. Cette page en donne une reformulation pédagogique suffisamment courte pour expliquer les méthodes sans republier l’épreuve.</p>
            </QuickAnswer>
          </div>

          <section id="jour-1" className="scroll-mt-24 space-y-8">
            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="flex items-center gap-2 font-bold text-blue-900"><CalendarDays className="h-5 w-5" /> Mardi 16 juin 2026</p>
                  <h2 className="mt-3 text-3xl font-bold text-slate-950">Jour 1 — sujet 26-MATJ1ME1</h2>
                  <p className="mt-3 max-w-3xl leading-7 text-slate-700">8 pages, quatre exercices : probabilités et variables aléatoires ; vrai/faux de géométrie et dénombrement ; chauffage par équation différentielle et suite ; fonction logarithme et aire.</p>
                </div>
                <OfficialPdfLink href={terminaleJ1Pdf} label="PDF officiel jour 1" />
              </div>
            </div>
            <AnalysisTable exercises={terminaleJ1Exercises} caption="Analyse du jour 1 — points officiels, difficulté estimée par SprintMaths" />
            <div>
              <h2 className="text-3xl font-bold text-slate-950">Corrigé détaillé du jour 1</h2>
              <p className="mt-3 leading-7 text-slate-700">Ouvre une correction après avoir cherché. Chaque bloc explicite la notion à reconnaître, le raisonnement, une rédaction possible, le résultat et l’erreur la plus probable.</p>
            </div>
            <OfficialExamCorrection dayId="jour-1" exercises={terminaleJ1Exercises} />
          </section>

          <section id="jour-2" className="scroll-mt-24 space-y-8">
            <div className="rounded-2xl border border-violet-200 bg-violet-50 p-6 sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="flex items-center gap-2 font-bold text-violet-900"><CalendarDays className="h-5 w-5" /> Mercredi 17 juin 2026</p>
                  <h2 className="mt-3 text-3xl font-bold text-slate-950">Jour 2 — sujet 26-MATJ2ME1</h2>
                  <p className="mt-3 max-w-3xl leading-7 text-slate-700">7 pages, quatre exercices : tétraèdre et projections ; pollution modélisée par suite et équation différentielle ; vrai/faux de probabilités ; fonction exponentielle, primitives, intégrale et volume.</p>
                </div>
                <OfficialPdfLink href={terminaleJ2Pdf} label="PDF officiel jour 2" />
              </div>
            </div>
            <AnalysisTable exercises={terminaleJ2Exercises} caption="Analyse du jour 2 — points officiels, difficulté estimée par SprintMaths" />
            <div>
              <h2 className="text-3xl font-bold text-slate-950">Corrigé détaillé du jour 2</h2>
              <p className="mt-3 leading-7 text-slate-700">La difficulté indiquée plus haut est un jugement pédagogique SprintMaths, jamais une appréciation officielle ni une prédiction de notation.</p>
            </div>
            <OfficialExamCorrection dayId="jour-2" exercises={terminaleJ2Exercises} />
          </section>

          <section id="bac-2027" className="scroll-mt-24 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
            <GraduationCap className="h-8 w-8 text-emerald-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">Ce que ces sujets apprennent pour préparer le Bac 2027</h2>
            <p className="mt-4 leading-7 text-slate-700">Ils fournissent des situations réelles pour travailler la justification et l’enchaînement des méthodes, pas une liste de chapitres annoncés pour 2027.</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Arbres, lois, moyenne", "Probabilités conditionnelles, binomiale, espérance, variance et borne de Bienaymé-Tchebychev."],
                ["Suites et modèles", "Récurrence, monotonie, bornes, convergence, limite et algorithme de seuil."],
                ["Fonctions", "Dérivée, convexité, exponentielle, logarithme, primitives, intégrales et interprétation d’aire."],
                ["Espace", "Équation de plan, orthogonalité, projection, angle, distance, aire et volume."],
              ].map(([heading, text]) => <article key={heading} className="rounded-xl bg-white p-5"><h3 className="font-bold text-slate-950">{heading}</h3><p className="mt-2 leading-7 text-slate-700">{text}</p></article>)}
            </div>
          </section>

          <section id="erreurs" className="scroll-mt-24 rounded-2xl border border-red-200 bg-red-50 p-6 sm:p-8">
            <TriangleAlert className="h-8 w-8 text-red-700" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-red-950">Erreurs qui coûtent vite des points</h2>
            <ul className="mt-6 grid gap-3 md:grid-cols-2">
              {["Confondre P(A|B) et P(B|A).", "Oublier de justifier un vrai/faux, même si la valeur finale est correcte.", "Passer à la limite d’une suite avant d’avoir prouvé sa convergence.", "Oublier le carré du coefficient dans une variance.", "Donner une valeur numérique sans existence, unicité ou unité.", "Mélanger les unités : dizaines de minutes, heures, litres, centimètres carrés et cubes.", "Utiliser un vecteur normal sans vérifier les produits scalaires.", "Arrondir trop tôt et dégrader le dernier chiffre demandé."].map((item) => <li key={item} className="rounded-xl bg-white/80 p-4 leading-7 text-red-950">• {item}</li>)}
            </ul>
          </section>

          <ChapterInternalLinks title="Poursuivre la révision" variant="cards" links={[
            { href: "/annales-bac-maths-terminale", label: "Toutes les annales 2026" }, { href: "/planning-revision-bac-maths", label: "Planning de révision" }, { href: "/formules-bac-maths-terminale", label: "Formules de Terminale" }, { href: "/redaction-bac-maths-terminale", label: "Rédaction au bac" }, { href: "/quiz-maths-terminale-specialite", label: "Quiz de spécialité" }, { href: "/sujets-type-bac-maths-terminale", label: "Sujets type bac" },
          ]} />

          <OfficialSources sources={[
            { href: officialSubjectsUrl, label: "Ministère — sujets des examens 2026", description: "Page qui répertorie les sujets de spécialité mathématiques par centre et par jour." },
            { href: terminaleJ1Pdf, label: "PDF officiel — jour 1, 16 juin 2026", description: "Sujet 26-MATJ1ME1, 8 pages." },
            { href: terminaleJ2Pdf, label: "PDF officiel — jour 2, 17 juin 2026", description: "Sujet 26-MATJ2ME1, 7 pages." },
          ]} />

          <div id="faq" className="scroll-mt-24"><StaticFaq items={faqItems} /></div>
        </div>
      </section>
    </SeoPageLayout>
  );
}
