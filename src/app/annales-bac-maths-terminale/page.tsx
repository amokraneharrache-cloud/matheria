import { DiagnosticCta } from "@/components/marketing/DiagnosticCta";
import type { Metadata } from "next";
import Link from "next/link";
import { BookOpenCheck, FileCheck2, Layers3 } from "lucide-react";
import { ChapterHero, ChapterInternalLinks } from "@/components/marketing/ChapterSeoPage";
import { ResourceTable, ResourceToc } from "@/components/marketing/J41SeoBlocks";
import { OfficialSources, QuickAnswer, StaticFaq } from "@/components/marketing/J42SeoBlocks";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/seo";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { AnnalesFilters } from "./AnnalesFilters";

const pagePath = "/annales-bac-maths-terminale";
const title = "Annales Bac Maths Terminale : sujets et corrigés";
const description = "Annales officielles du Bac Maths Terminale spécialité : sujets PDF 2026 classés par centre, jour et chapitre, avec corrigés SprintMaths clairement identifiés.";
const officialSubjectsUrl = "https://www.education.gouv.fr/brevet-bac-et-cap-les-sujets-des-examens-2026-504911";
const eduscolAnnalesUrl = "https://eduscol.education.gouv.fr/5199/annales-des-epreuves-du-baccalaureat-des-voies-generale-et-technologique";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: absoluteUrl(pagePath) },
  openGraph: { title, description, url: absoluteUrl(pagePath), siteName: SITE_NAME, locale: "fr_FR", type: "website" },
  robots: { index: true, follow: true },
};

const faqItems: FaqItem[] = [
  { question: "Où trouver les annales officielles du Bac Maths Terminale ?", answer: "Le ministère publie les sujets de la session 2026 et Éduscol conserve un moteur d’annales. Le tableau de cette page renvoie directement vers les PDF officiels disponibles et précise le centre et le jour." },
  { question: "Un corrigé SprintMaths est-il un corrigé officiel ?", answer: "Non. Une correction SprintMaths est une proposition pédagogique originale construite à partir du sujet officiel. Elle n’est ni un corrigé du ministère ni un barème officiel." },
  { question: "Quelle différence entre une annale et un sujet zéro ?", answer: "Une annale est un sujet réellement donné lors d’une session d’examen. Un sujet zéro illustre à l’avance un format ou une évolution d’épreuve ; il ne correspond pas à une session passée." },
  { question: "Comment choisir une annale de maths ?", answer: "Commence par filtrer sur un chapitre à consolider, puis traite un sujet complet récent dans les conditions de l’épreuve. Termine en classant tes erreurs : notion, méthode, calcul ou rédaction." },
  { question: "Les sujets 2026 permettent-ils de prévoir le Bac 2027 ?", answer: "Non. Ils montrent des façons réelles d’évaluer le programme, mais ne prédisent ni les chapitres ni la difficulté d’une future session. Ils servent à varier les raisonnements et à s’entraîner au format." },
];

const chapterRows = [
  ["Probabilités et variables aléatoires", "10 sujets", "Arbres, lois binomiales, espérance, variance, sommes et inégalités"],
  ["Suites et Python", "10 sujets", "Récurrences, convergence, seuils et lecture ou complétion d’algorithmes"],
  ["Géométrie dans l’espace", "10 sujets", "Plans, droites, orthogonalité, projections, distances et volumes"],
  ["Fonctions, logarithme et exponentielle", "10 sujets", "Dérivation, variations, convexité, limites et tangentes"],
  ["Intégrales et primitives", "8 sujets", "Calcul exact, intégration par parties, aire et volume"],
  ["Équations différentielles", "8 sujets", "Résolution, condition initiale, modèle et interprétation"],
] as const;

export default function AnnalesBacMathsTerminalePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd data={[
        faqJsonLd(faqItems),
        breadcrumbJsonLd([{ name: "Accueil", path: "/" }, { name: "Bac Maths Terminale", path: "/bac-terminale-maths" }, { name: "Annales Bac Maths Terminale", path: pagePath }]),
      ]} />

      <ChapterHero
        eyebrow="Annales officielles · spécialité mathématiques · session 2026"
        title="Annales du Bac Maths Terminale spécialité"
        description="Dix sujets officiels 2026, classés par centre, jour et chapitre. Chacun possède son PDF ministériel et un corrigé détaillé SprintMaths couvrant ses quatre exercices."
        secondaryDescription="Ce hub est mis à jour à partir des publications institutionnelles. Il ne transforme ni un sujet zéro, ni un exercice d’entraînement, ni un sujet type SprintMaths en annale officielle."
        ctas={[]}
      />

      <ResourceToc label="Sommaire des annales" items={[
        { href: "#definitions", label: "Bien distinguer les ressources" },
        { href: "#annales", label: "Tableau des sujets" },
        { href: "#choisir", label: "Choisir une annale" },
        { href: "#chapitres", label: "Entrée par chapitre" },
        { href: "#faq", label: "FAQ" },
      ]} />

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-16">
          <QuickAnswer title="10 sujets officiels · 10 corrigés détaillés" tone="emerald">
            <p>Deux journées pour chacun des cinq ensembles de centres recensés : Métropole–La Réunion–Mayotte, Antilles-Guyane, Amérique du Nord, centres étrangers groupe 1 et Asie.</p>
            <p className="text-base">Tous les sujets présentés ci-dessous disposent désormais d’un corrigé détaillé SprintMaths. Les deux journées de Métropole–La Réunion–Mayotte restent réunies dans le <Link href="/sujet-bac-maths-2026-corrige" className="font-bold underline">corrigé détaillé 2026</Link>.</p>
            <p className="text-base">Pour remonter dans les sessions : <Link href="/sujet-bac-maths-2025-corrige" className="font-bold underline">sujet 2025 corrigé</Link>, <Link href="/sujet-bac-maths-2024-corrige" className="font-bold underline">sujet 2024 corrigé</Link> ou <Link href="/annales-bac-maths-par-chapitre" className="font-bold underline">24 exercices classés par chapitre</Link>.</p>
          </QuickAnswer>

          <section id="definitions" className="scroll-mt-24">
            <Layers3 className="h-8 w-8 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">Quatre ressources, quatre statuts différents</h2>
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              {[
                ["Sujet officiel", "PDF publié par le ministère après une session réellement passée. C’est une annale."],
                ["Sujet zéro", "Document institutionnel conçu pour illustrer un format avant ou autour de sa mise en œuvre."],
                ["Sujet type SprintMaths", "Entraînement original inspiré des attendus du programme, sans statut officiel."],
                ["Exercice d’entraînement", "Activité ciblée sur une notion ou une méthode ; ce n’est pas nécessairement un sujet complet."],
              ].map(([heading, text]) => (
                <article key={heading} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-950">{heading}</h3>
                  <p className="mt-3 leading-7 text-slate-700">{text}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="annales" className="scroll-mt-24">
            <FileCheck2 className="h-8 w-8 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">Sujets officiels disponibles</h2>
            <p className="mt-4 max-w-4xl leading-7 text-slate-700">Les filtres sont exécutés uniquement dans le navigateur : aucun compte, stockage, suivi ou envoi au serveur. La liste complète figure dans le HTML initial.</p>
            <div className="mt-7"><AnnalesFilters /></div>
          </section>

          <DiagnosticCta sourcePage={pagePath} placement="annales_contextual" context="Tu ne sais pas quels chapitres revoir avant les annales ? Fais le diagnostic." />

          <section id="choisir" className="scroll-mt-24 rounded-2xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
            <BookOpenCheck className="h-8 w-8 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">Comment choisir et exploiter une annale ?</h2>
            <ol className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                "Ciblage : filtre un chapitre fragile et choisis un sujet qui le travaille dans un contexte varié.",
                "Premier essai : cherche sans corrigé, avec les outils autorisés et une durée fixée.",
                "Correction active : compare la notion reconnue, le raisonnement, les calculs et la conclusion.",
                "Réinvestissement : refais seulement les questions ratées deux ou trois jours plus tard.",
              ].map((item, index) => <li key={item} className="rounded-xl bg-white p-4 leading-7 text-slate-700"><strong>{index + 1}.</strong> {item}</li>)}
            </ol>
          </section>

          <section id="chapitres" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-slate-950">Annales 2026 par grand chapitre</h2>
            <p className="mt-4 max-w-4xl leading-7 text-slate-700">Le comptage indique dans combien des dix sujets le thème apparaît au moins une fois ; il ne mesure ni le nombre de points ni une probabilité de retour.</p>
            <div className="mt-7">
              <ResourceTable caption="Présence des thèmes dans les dix PDF 2026" headers={["Chapitre", "Présence", "Savoir-faire rencontrés"]} rows={chapterRows.map(([chapter, count, uses]) => ({ key: chapter, cells: [chapter, count, uses] }))} />
            </div>
          </section>

          <ChapterInternalLinks title="Préparer, s’entraîner et corriger" variant="cards" links={[
            { href: "/sujet-bac-maths-2026-corrige", label: "Sujet Bac Maths 2026 corrigé" },
            { href: "/sujet-bac-maths-2025-corrige", label: "Sujet Bac Maths 2025 corrigé" },
            { href: "/sujet-bac-maths-2024-corrige", label: "Sujet Bac Maths 2024 corrigé" },
            { href: "/annales-bac-maths-par-chapitre", label: "Annales par chapitre" },
            { href: "/sujets-type-bac-maths-terminale", label: "Sujets type bac SprintMaths" },
            { href: "/exercices-type-bac-maths-terminale", label: "Exercices type bac" },
            { href: "/planning-revision-bac-maths", label: "Planning de révision" },
            { href: "/formules-bac-maths-terminale", label: "Formules de Terminale" },
            { href: "/articles/erreurs-frequentes-bac-maths-terminale", label: "Erreurs fréquentes" },
            { href: "/redaction-bac-maths-terminale", label: "Rédaction au bac" },
            { href: "/quiz-maths-terminale-specialite", label: "Quiz de spécialité" },
          ]} />

          <OfficialSources sources={[
            { href: officialSubjectsUrl, label: "Ministère — sujets des examens 2026", description: "Page source des dix PDF de spécialité mathématiques Terminale recensés ici." },
            { href: eduscolAnnalesUrl, label: "Éduscol — annales des épreuves du baccalauréat", description: "Moteur institutionnel pour rechercher les sujets par session et épreuve." },
          ]} />

          <div id="faq" className="scroll-mt-24"><StaticFaq items={faqItems} /></div>
        </div>
      </section>
    </SeoPageLayout>
  );
}
