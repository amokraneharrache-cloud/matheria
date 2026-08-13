import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Brain, CircleHelp, ShieldQuestion } from "lucide-react";
import { ChapterHero, ChapterInternalLinks } from "@/components/marketing/ChapterSeoPage";
import { GrandOralClusterLinks } from "@/components/marketing/GrandOralClusterLinks";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  juryTrainingQuestions,
  type JuryTrainingCategory,
  universalJuryQuestions,
} from "@/data/grandOral";
import { breadcrumbJsonLd } from "@/lib/seo";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { JuryQuestionTrainer } from "./JuryQuestionTrainer";

const pagePath = "/questions-jury-grand-oral-maths";
const title = "Questions du jury au Grand Oral Maths : exemples et réponses";
const description =
  "Entraîne-toi aux questions du jury au Grand Oral Maths : 15 questions universelles, questions par chapitre, stratégies de réponse et outil de tirage local.";

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

const chapterCategories: JuryTrainingCategory[] = [
  "Probabilités",
  "Suites",
  "Fonctions",
  "Géométrie",
  "Python",
];

const understandingChecks = [
  ["Pourquoi ?", "Remonte d’une affirmation à sa justification ou à sa définition."],
  ["Comment le savez-vous ?", "Sépare une preuve, un calcul, une donnée et une simple intuition."],
  ["Est-ce toujours vrai ?", "Cherche les conditions, le domaine et un éventuel contre-exemple."],
  ["Quelle hypothèse utilisez-vous ?", "Nomme ce que le modèle suppose constant, indépendant ou négligeable."],
  ["Quel est l’ordre de grandeur ?", "Contrôle les unités et la plausibilité avant les décimales."],
  ["Que se passe-t-il dans le cas limite ?", "Teste ton modèle quand un paramètre vaut 0, devient grand ou atteint une borne."],
] as const;

export default function QuestionsJuryGrandOralMathsPage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Grand Oral Maths 2027", path: "/grand-oral-maths-2027" },
          { name: "Questions du jury", path: pagePath },
        ])}
      />

      <ChapterHero
        eyebrow="Entraînement à l’échange — Grand Oral Maths"
        title="Grand Oral Maths : les questions du jury auxquelles te préparer"
        description="Personne ne peut annoncer les questions exactes qui te seront posées. Cette banque réunit des questions d’entraînement qui testent ta compréhension, tes choix de modèle et ta capacité à interpréter un résultat."
        secondaryDescription="Les exemples de réponses montrent une démarche courte, pas une phrase magique à apprendre. Adapte toujours les mots, les données et les limites à ton propre sujet."
        ctas={[]}
      />

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-6xl space-y-16">
          <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
            <CircleHelp className="h-7 w-7 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-bold text-blue-950">
              À quoi sert l’échange avec le jury ?
            </h2>
            <p className="mt-3 max-w-4xl leading-7 text-blue-950">
              Pendant les 10 minutes d’échange, le jury réagit à ta présentation pour te faire
              préciser et approfondir ta pensée. Il peut revenir sur les points du programme du
              cycle terminal liés à la question retenue. Il s’agit donc de défendre un raisonnement,
              pas de réciter une deuxième présentation.
            </p>
            <a
              href="https://www.education.gouv.fr/reussir-au-lycee/baccalaureat-comment-se-passe-le-grand-oral-100028"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-blue-900 px-5 py-2 font-bold text-white hover:bg-blue-800"
            >
              Consulter le déroulement officiel
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-950">15 questions universelles à travailler</h2>
            <p className="mt-3 max-w-4xl leading-7 text-slate-700">
              Pour chaque question, réponds d’abord avec ton sujet. Lis ensuite la stratégie et
              compare-la à ta réponse : l’objectif est de repérer un manque de compréhension, pas
              de mémoriser l’exemple.
            </p>
            <div className="mt-7 grid gap-5 lg:grid-cols-2">
              {universalJuryQuestions.map((item, index) => (
                <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-900 font-bold text-white">
                      {index + 1}
                    </span>
                    <h3 className="pt-1 text-xl font-bold leading-8 text-slate-950">
                      {item.question}
                    </h3>
                  </div>
                  <dl className="mt-5 space-y-4 text-sm leading-6">
                    <div>
                      <dt className="font-bold text-slate-950">Ce que la question teste</dt>
                      <dd className="text-slate-700">{item.tests}</dd>
                    </div>
                    <div className="rounded-xl bg-rose-50 p-4 text-rose-950">
                      <dt className="font-bold">Mauvaise façon de répondre</dt>
                      <dd>{item.badAnswer}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-slate-950">Bonne stratégie</dt>
                      <dd className="text-slate-700">{item.strategy}</dd>
                    </div>
                    <div className="rounded-xl bg-emerald-50 p-4 text-emerald-950">
                      <dt className="font-bold">Exemple de réponse courte</dt>
                      <dd>« {item.example} »</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-950">Questions par chapitre</h2>
            <p className="mt-3 max-w-4xl leading-7 text-slate-700">
              Ces formulations permettent de vérifier que chaque notion joue un rôle précis dans
              ton sujet. Elles ne constituent pas une liste de questions annoncées par le jury.
            </p>
            <div className="mt-8 space-y-9">
              {chapterCategories.map((category) => {
                const questions = juryTrainingQuestions.filter(
                  (question) => question.category === category,
                );

                return (
                  <section key={category} aria-labelledby={`chapter-${category.toLowerCase()}`}>
                    <h3
                      id={`chapter-${category.toLowerCase()}`}
                      className="text-2xl font-bold text-blue-950"
                    >
                      {category}
                    </h3>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      {questions.map((question) => (
                        <article key={question.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                          <h4 className="text-lg font-bold leading-7 text-slate-950">
                            {question.question}
                          </h4>
                          <p className="mt-3 text-sm leading-6 text-slate-700">
                            <strong>À expliquer :</strong> {question.concepts}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-amber-950">
                            <strong>Vigilance :</strong> {question.attention}
                          </p>
                        </article>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </section>

          <JuryQuestionTrainer questions={juryTrainingQuestions} />

          <section>
            <ShieldQuestion className="h-7 w-7 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">
              Des questions qui révèlent vite si tu comprends ton sujet
            </h2>
            <p className="mt-3 max-w-4xl leading-7 text-slate-700">
              Ce ne sont pas des « pièges du jury ». Ce sont des relances très courtes auxquelles un
              raisonnement appris mécaniquement résiste mal. Prépare-les comme des contrôles de
              solidité.
            </p>
            <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {understandingChecks.map(([question, purpose]) => (
                <article key={question} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-950">« {question} »</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{purpose}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-slate-950 p-6 text-white sm:p-8">
            <Brain className="h-7 w-7 text-blue-200" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold">Que faire si tu ne sais pas répondre ?</h2>
            <p className="mt-3 max-w-4xl leading-7 text-slate-200">
              Ne fabrique pas un résultat. Une réponse honnête peut montrer ton raisonnement sans
              prétendre connaître ce qui te manque.
            </p>
            <ol className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {[
                ["1", "Reformule", "Vérifie que tu as compris le sens exact de la question."],
                ["2", "Délimite", "Dis clairement ce que tu sais et ce qui te manque."],
                ["3", "Pose l’hypothèse", "Annonce la condition sous laquelle tu peux raisonner."],
                ["4", "Repars du modèle", "Utilise la définition, les unités ou un cas simple."],
                ["5", "Nuance", "Présente ta conclusion comme une piste si elle reste incomplète."],
              ].map(([number, heading, text]) => (
                <li key={number} className="rounded-xl bg-white/10 p-4">
                  <span className="text-sm font-bold text-blue-200">Étape {number}</span>
                  <h3 className="mt-2 font-bold">{heading}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-200">{text}</p>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-sm leading-6 text-slate-300">
              Cette stratégie ne garantit aucun résultat à l’épreuve ; elle évite surtout d’ajouter
              une affirmation fausse à une difficulté réelle.
            </p>
          </section>

          <section className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-emerald-950">
              Ton sujet résiste-t-il à ces questions ?
            </h2>
            <p className="mt-3 max-w-3xl leading-7 text-emerald-950">
              Reprends la fiche de ton idée et ajoute, sous chaque calcul, trois lignes : pourquoi
              cet outil, ce que le résultat signifie et dans quel cas il ne suffirait plus.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/sujets-grand-oral-maths"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-emerald-900 px-5 py-2 font-bold text-white hover:bg-emerald-800"
              >
                Revoir les 50 problématiques
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/grand-oral-maths-2027"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-emerald-900 bg-white px-5 py-2 font-bold text-emerald-950 hover:bg-emerald-100"
              >
                Reprendre la méthode complète
              </Link>
            </div>
          </section>

          <GrandOralClusterLinks currentPath={pagePath} />

          <ChapterInternalLinks
            title="Renforcer l’argumentation mathématique"
            variant="cards"
            links={[
              { href: "/redaction-bac-maths-terminale", label: "Justifier et rédiger" },
              { href: "/demonstrations-bac-maths-terminale", label: "Comprendre une démonstration" },
              { href: "/methodes-maths-terminale", label: "Méthodes de Terminale" },
              { href: "/quiz-maths-terminale-specialite", label: "Tester les notions" },
              { href: "/programme-maths-terminale", label: "Revoir le programme" },
              { href: "/python-bac-maths-terminale", label: "Expliquer un algorithme Python" },
            ]}
          />
        </div>
      </section>
    </SeoPageLayout>
  );
}

