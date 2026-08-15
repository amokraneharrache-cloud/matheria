import type { Metadata } from "next";
import Link from "next/link";
import { Ban, CalendarDays, FileQuestion, GraduationCap } from "lucide-react";
import { ChapterHero, ChapterInternalLinks } from "@/components/marketing/ChapterSeoPage";
import { ResourceTable, ResourceToc } from "@/components/marketing/J41SeoBlocks";
import { OfficialSources, QuickAnswer, StaticFaq } from "@/components/marketing/J42SeoBlocks";
import { OfficialExamCorrection, OfficialPdfLink } from "@/components/marketing/OfficialExamCorrection";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/seo";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { premiere2026Exercises, premiere2026Pdf } from "./corrections";

const pagePath = "/sujet-epreuve-anticipee-maths-2026-corrige";
const title = "Sujet Maths Première 2026 corrigé : épreuve anticipée";
const description = "Sujet officiel et corrigé détaillé de la première épreuve anticipée de Maths 2026, voie générale avec spécialité, Métropole–La Réunion–Mayotte.";
const officialSubjectsUrl = "https://www.education.gouv.fr/brevet-bac-et-cap-les-sujets-des-examens-2026-504911";
const eduscolExamUrl = "https://eduscol.education.gouv.fr/5688/epreuve-anticipee-de-mathematiques-aux-baccalaureats-general-et-technologique";

export const metadata: Metadata = {
  title: { absolute: title }, description,
  alternates: { canonical: absoluteUrl(pagePath) },
  openGraph: { title, description, url: absoluteUrl(pagePath), siteName: SITE_NAME, locale: "fr_FR", type: "website" },
  robots: { index: true, follow: true },
};

const faqItems: FaqItem[] = [
  { question: "Quel sujet de Première 2026 est corrigé sur cette page ?", answer: "Le sujet 26-MATSPEGEME1 donné le vendredi 12 juin 2026 en Métropole, à La Réunion et à Mayotte, pour les candidats de voie générale avec enseignement de spécialité mathématiques." },
  { question: "Combien de QCM comportait l’épreuve anticipée 2026 ?", answer: "La première partie comportait exactement 8 questions à choix multiple, pour un total de 6 points. La seconde partie comportait 3 exercices totalisant 14 points." },
  { question: "La calculatrice était-elle autorisée ?", answer: "Non. La couverture du sujet officiel indique que l’usage de la calculatrice n’était pas autorisé pendant les 2 heures de l’épreuve." },
  { question: "Ce corrigé est-il officiel ?", answer: "Non. Il s’agit d’une correction proposée par SprintMaths à partir du sujet officiel. Le PDF du ministère est le sujet de référence ; cette page ne publie ni corrigé ministériel ni barème détaillé." },
  { question: "Le sujet 2026 permet-il de prévoir la prochaine épreuve ?", answer: "Non. Cette première session fournit un exemple réel de format et de niveau de justification, mais un seul sujet ne permet pas de prévoir les notions, questions ou difficultés d’une future session." },
];

const themeRows = [
  ["Calcul algébrique et puissances", "2 QCM", "Accessible"],
  ["Fonctions et lecture graphique", "2 QCM + 1 vrai/faux", "Intermédiaire"],
  ["Pourcentages, proportion et ordre de grandeur", "3 QCM", "Accessible"],
  ["Conversion d’unités", "1 QCM", "Accessible"],
  ["Probabilités conditionnelles", "1 exercice de 5 points", "Accessible"],
  ["Second degré et suites", "2 vrai/faux dans un exercice de 5 points", "Intermédiaire"],
  ["Produit scalaire et angle", "1 exercice de 4 points", "Intermédiaire"],
] as const;

export default function SujetEpreuveAnticipeeMaths2026CorrigePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd data={[
        faqJsonLd(faqItems),
        breadcrumbJsonLd([{ name: "Accueil", path: "/" }, { name: "Épreuve anticipée de maths", path: "/epreuve-anticipee-maths-premiere" }, { name: "Sujet Première 2026 corrigé", path: pagePath }]),
      ]} />

      <ChapterHero
        eyebrow="Première session · vendredi 12 juin 2026"
        title="Sujet et corrigé de l’épreuve anticipée de Maths 2026"
        description="Le sujet réellement donné en Métropole, à La Réunion et à Mayotte aux candidats de voie générale avec spécialité mathématiques : 8 QCM, puis 3 exercices, corrigés pas à pas."
        secondaryDescription="Cette page ne mélange pas le sujet sans spécialité, les sujets de voie technologique ni les sujets zéro. Correction proposée par SprintMaths à partir du sujet officiel, sans statut de corrigé ministériel."
        ctas={[]}
      />

      <ResourceToc label="Sommaire du sujet anticipé 2026" items={[
        { href: "#repere", label: "Repères officiels" }, { href: "#analyse", label: "Analyse du sujet" }, { href: "#qcm", label: "8 QCM corrigés" }, { href: "#exercices", label: "3 exercices corrigés" }, { href: "#lecons", label: "Leçons utiles" }, { href: "#faq", label: "FAQ" },
      ]} />

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-16">
          <div id="repere" className="scroll-mt-24">
            <QuickAnswer title="12 juin 2026 · 2 h · coefficient 2 · sans calculatrice" tone="emerald">
              <p>Profil : voie générale avec enseignement de spécialité mathématiques. Sujet 26-MATSPEGEME1 de 6 pages, noté sur 20.</p>
              <p className="text-base"><strong>Partie 1 :</strong> 8 QCM d’automatismes pour 6 points, sans justification demandée et sans pénalité pour une réponse fausse ou absente. <strong>Partie 2 :</strong> 3 exercices pour 14 points, avec justification.</p>
            </QuickAnswer>
          </div>

          <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="flex items-center gap-2 font-bold text-blue-900"><CalendarDays className="h-5 w-5" /> Première épreuve anticipée nationale de la session 2026</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950">Sujet officiel — spécialité mathématiques</h2>
                <p className="mt-3 max-w-3xl leading-7 text-slate-700">Le PDF lié ci-contre contient l’énoncé intégral. Les formulations ci-dessous résument les questions et les pièges sans reproduire l’ensemble des choix ni les pages du sujet.</p>
              </div>
              <OfficialPdfLink href={premiere2026Pdf} label="Ouvrir le PDF officiel" />
            </div>
          </section>

          <section id="analyse" className="scroll-mt-24">
            <FileQuestion className="h-8 w-8 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">Analyse fidèle des thèmes et de la difficulté</h2>
            <p className="mt-4 max-w-4xl leading-7 text-slate-700">Les nombres de questions et les points viennent du PDF. Les mentions « accessible » ou « intermédiaire » sont des estimations pédagogiques SprintMaths, pas une qualification officielle.</p>
            <div className="mt-7"><ResourceTable caption="Répartition observée dans le sujet avec spécialité" headers={["Thème", "Présence réelle", "Difficulté estimée par SprintMaths"]} rows={themeRows.map(([theme, count, difficulty]) => ({ key: theme, cells: [theme, count, difficulty] }))} /></div>
            <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 leading-7 text-amber-950">Ce comptage décrit ce sujet précis. Il ne constitue ni un référentiel complet d’automatismes ni une projection statistique vers les sessions suivantes.</p>
          </section>

          <section id="qcm" className="scroll-mt-24">
            <Ban className="h-8 w-8 text-red-700" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">Les 8 QCM d’automatismes corrigés</h2>
            <p className="mt-4 leading-7 text-slate-700">Aucune calculatrice et aucune justification demandée le jour de l’épreuve ; pour réviser, chaque réponse est néanmoins expliquée avec son piège principal.</p>
          </section>

          <section id="exercices" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-slate-950">Correction des 3 exercices longs</h2>
            <p className="mt-4 leading-7 text-slate-700">Les quatre blocs de correction ci-dessous suivent la structure réelle : le premier réunit les 8 QCM, puis viennent les exercices de probabilités, vrai/faux et géométrie.</p>
            <div className="mt-8"><OfficialExamCorrection dayId="premiere-2026" exercises={premiere2026Exercises} /></div>
          </section>

          <section id="lecons" className="scroll-mt-24 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
            <GraduationCap className="h-8 w-8 text-emerald-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">Leçons utiles pour les élèves de Première 2026-2027</h2>
            <ul className="mt-6 grid gap-3 md:grid-cols-2">
              {["Sécuriser les calculs très courts sans calculatrice.", "Lire exactement le profil du sujet : ici, voie générale avec spécialité.", "Sur un vrai/faux, une conclusion sans justification ne rapporte pas les points annoncés.", "Dans un arbre, distinguer une intersection d’une probabilité conditionnelle.", "Pour un angle, choisir deux vecteurs ayant le même sommet.", "Vérifier unités, signe d’une racine et forme exacte avant de conclure."].map((item) => <li key={item} className="rounded-xl bg-white p-4 leading-7 text-slate-700">• {item}</li>)}
            </ul>
            <p className="mt-5 text-sm leading-6 text-emerald-950">Ces conseils tirent des méthodes de travail d’un sujet passé. Ils ne prédisent pas le contenu d’une future épreuve.</p>
          </section>

          <ChapterInternalLinks title="Réviser l’épreuve anticipée" variant="cards" links={[
            { href: "/epreuve-anticipee-maths-premiere", label: "Format officiel de l’épreuve" },
            { href: "/sujets-zero-maths-premiere", label: "Sujets zéro de Première" },
            { href: "/automatismes-maths-premiere", label: "Automatismes de Première" },
            { href: "/formules-maths-premiere-specialite", label: "Formules de Première spécialité" },
            { href: "/quiz-maths-premiere-specialite", label: "Quiz de Première spécialité" },
            { href: "/exercices-epreuve-anticipee-maths-premiere", label: "Exercices d’épreuve anticipée" },
          ]} />

          <OfficialSources sources={[
            { href: officialSubjectsUrl, label: "Ministère — sujets des examens 2026", description: "Page qui distingue les profils et centres de l’épreuve anticipée de mathématiques." },
            { href: premiere2026Pdf, label: "PDF officiel — candidats avec spécialité mathématiques", description: "Sujet 26-MATSPEGEME1 donné le 12 juin 2026." },
            { href: eduscolExamUrl, label: "Éduscol — épreuve anticipée de mathématiques", description: "Cadre institutionnel, programmes et ressources pour l’épreuve." },
          ]} />

          <p className="rounded-xl border border-slate-200 bg-slate-50 p-5 leading-7 text-slate-700">Tu cherches d’autres centres ou la spécialité de Terminale ? Consulte le <Link href="/annales-bac-maths-terminale" className="font-bold text-blue-900 underline">hub des annales du Bac Maths Terminale</Link> et le <Link href="/sujet-bac-maths-2026-corrige" className="font-bold text-blue-900 underline">corrigé Terminale 2026</Link>.</p>

          <div id="faq" className="scroll-mt-24"><StaticFaq items={faqItems} /></div>
        </div>
      </section>
    </SeoPageLayout>
  );
}
