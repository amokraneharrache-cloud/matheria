import type { Metadata } from "next";
import Link from "next/link";
import { BookOpenCheck, BrainCircuit, CheckCircle2, ShieldCheck } from "lucide-react";
import { ChapterHero, ChapterInternalLinks } from "@/components/marketing/ChapterSeoPage";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/seo";
import { QuizClient } from "./QuizClient";
import { quizQuestions, quizThemes } from "./questions";

const pagePath = "/quiz-maths-terminale-specialite";
const title = "Quiz Maths Terminale spécialité : 20 questions corrigées";
const description =
  "Teste tes connaissances en Terminale spécialité maths avec 20 questions corrigées : suites, limites, fonctions, probabilités, intégrales, géométrie, équations différentielles et Python.";

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

const faqItems: FaqItem[] = [
  {
    question: "Le quiz nécessite-t-il un compte ?",
    answer:
      "Non. Le quiz fonctionne directement dans le navigateur, sans compte, sans adresse email et sans envoi des réponses au serveur.",
  },
  {
    question: "Comment le score est-il calculé ?",
    answer:
      "Chaque question possède une seule réponse correcte. Le score augmente lorsque la réponse choisie est correcte et que la question est validée. Une question laissée sans réponse est comptée comme incorrecte lors de la correction finale.",
  },
  {
    question: "Comment interpréter le résultat ?",
    answer:
      "Le score sert de repère ponctuel pour identifier les thèmes à revoir. Il ne prédit pas une note au Bac et ne remplace pas des exercices rédigés ou un travail régulier par chapitre.",
  },
  {
    question: "Les réponses sont-elles enregistrées ?",
    answer:
      "Non. Les choix, le score et les recommandations restent dans l’état local de la page et disparaissent lorsque le quiz est recommencé ou que la session de page est abandonnée.",
  },
];

const internalLinks = [
  { href: "/programme-maths-terminale", label: "Programme de Terminale" },
  { href: "/methodes-maths-terminale", label: "Toutes les méthodes" },
  { href: "/exercices-maths-terminale", label: "Exercices par chapitre" },
  { href: "/python-bac-maths-terminale", label: "Python en Terminale" },
  { href: "/equations-differentielles-terminale", label: "Équations différentielles" },
  { href: "/formules-bac-maths-terminale", label: "Fiche de formules" },
  { href: "/preparer-entree-terminale-specialite-maths", label: "Préparer l’entrée en Terminale" },
];

export default function QuizMathsTerminaleSpecialitePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Programme maths Terminale", path: "/programme-maths-terminale" },
            { name: "Quiz maths Terminale", path: pagePath },
          ]),
        ]}
      />

      <ChapterHero
        eyebrow="20 questions · 9 thèmes · corrections expliquées"
        title="Quiz de maths Terminale spécialité : teste tes connaissances"
        description={
          <>
            Fais un point rapide sur les principaux chapitres de Terminale. Chaque
            question propose plusieurs réponses, une correction pédagogique et une
            ressource ciblée pour reprendre la notion.
          </>
        }
        secondaryDescription={
          <>
            Le quiz fonctionne sans compte ni email. Les réponses, le score et les
            chapitres suggérés restent uniquement dans ton navigateur et aucune donnée
            n’est envoyée au serveur.
          </>
        }
        ctas={[]}
      />

      <section className="border-y border-blue-100 bg-blue-50 px-4 py-10">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {[
            {
              icon: BrainCircuit,
              title: "Une seule réponse correcte",
              text: "Lis les quatre propositions avant de valider ton choix.",
            },
            {
              icon: BookOpenCheck,
              title: "Une explication par question",
              text: "La correction rappelle le raisonnement, pas seulement la lettre attendue.",
            },
            {
              icon: ShieldCheck,
              title: "Aucune donnée transmise",
              text: "Le score et les recommandations sont calculés localement.",
            },
          ].map((item) => (
            <article key={item.title} className="rounded-xl bg-white p-5 shadow-sm">
              <item.icon className="h-6 w-6 text-blue-800" aria-hidden="true" />
              <h2 className="mt-3 text-lg font-bold text-slate-950">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-700">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-5xl space-y-14">
          <section>
            <h2 className="text-3xl font-bold text-slate-950">Sommaire des thèmes</h2>
            <nav aria-label="Thèmes du quiz" className="mt-5 flex flex-wrap gap-3">
              {quizThemes.map((theme) => (
                <a
                  key={theme.id}
                  href={`#${theme.id}`}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-blue-900 hover:border-blue-300 hover:bg-blue-50"
                >
                  {theme.label}
                </a>
              ))}
            </nav>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-950">Comment interpréter le score ?</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {[
                ["0 à 9", "Repère d’abord deux ou trois thèmes prioritaires et reprends les méthodes liées."],
                ["10 à 15", "Les bases sont présentes sur plusieurs thèmes ; travaille surtout les erreurs repérées."],
                ["16 à 20", "Le quiz court est bien maîtrisé ; confirme ces réflexes avec des exercices rédigés."],
              ].map(([range, text]) => (
                <article key={range} className="rounded-xl bg-white p-5">
                  <h3 className="text-xl font-bold text-blue-950">{range} / 20</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{text}</p>
                </article>
              ))}
            </div>
            <p className="mt-5 leading-7 text-slate-700">
              Ce résultat est un indicateur ponctuel. Il ne prédit pas une note au Bac :
              les questions courtes ne mesurent ni toute la rédaction ni la capacité à
              enchaîner plusieurs raisonnements dans un exercice long.
            </p>
          </section>

          <QuizClient questions={quizQuestions} />

          <section aria-labelledby="corrections-indexables" className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 id="corrections-indexables" className="text-3xl font-bold text-slate-950">
              Corrections détaillées des 20 questions
            </h2>
            <p className="mt-3 leading-7 text-slate-700">
              Ces corrections restent accessibles dans le contenu initial de la page.
              Ouvre uniquement celles que tu veux relire après le quiz.
            </p>
            <div className="mt-6 space-y-3">
              {quizQuestions.map((question, index) => (
                <details key={question.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <summary className="cursor-pointer font-bold text-slate-950">
                    Question {index + 1} — {question.themeLabel}
                  </summary>
                  <p className="mt-3 leading-7 text-slate-700">{question.prompt}</p>
                  <p className="mt-3 rounded-lg bg-emerald-50 p-4 leading-7 text-emerald-950">
                    <strong>Réponse :</strong> {question.options[question.correctIndex]}. {question.explanation}
                  </p>
                  <Link href={question.resourceHref} className="mt-3 inline-flex font-bold text-blue-900 underline underline-offset-4">
                    {question.resourceLabel}
                  </Link>
                </details>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-6 sm:p-8">
            <CheckCircle2 className="h-7 w-7 text-emerald-700" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-bold text-emerald-950">Après le quiz</h2>
            <p className="mt-3 leading-7 text-emerald-950">
              Choisis une ressource correspondant à une erreur précise, refais un exemple
              sans regarder la correction, puis passe à un exercice plus long par chapitre.
            </p>
          </section>

          <ChapterInternalLinks title="Continuer les révisions" links={internalLinks} variant="cards" />
          <FaqAccordion items={faqItems} sourcePage={pagePath} />
        </div>
      </section>
    </SeoPageLayout>
  );
}
