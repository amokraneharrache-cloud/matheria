import type { Metadata } from "next";
import { Clock3, ExternalLink, FileCheck2, Lightbulb, TriangleAlert } from "lucide-react";
import { ChapterHero, ChapterInternalLinks } from "@/components/marketing/ChapterSeoPage";
import {
  ChecklistBlock,
  CorrectedExerciseList,
  ResourceTable,
  ResourceToc,
  type CorrectedExercise,
} from "@/components/marketing/J41SeoBlocks";
import { OfficialSources, QuickAnswer, StaticFaq } from "@/components/marketing/J42SeoBlocks";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/seo";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

const pagePath = "/sujets-zero-maths-premiere";
const title = "Sujets zéro Maths Première : sujets et corrigés expliqués";
const description =
  "Accède aux deux sujets zéro officiels de spécialité maths en Première et découvre leur structure, leurs chapitres, leurs pièges et des corrections pédagogiques originales.";

const eduscolPageUrl =
  "https://eduscol.education.gouv.fr/5688/epreuve-anticipee-de-mathematiques-aux-baccalaureats-general-et-technologique";
const subjectOneUrl =
  "https://eduscol.education.gouv.fr/sites/default/files/document/sujet-specialite-1pdf-112050.pdf";
const subjectTwoUrl =
  "https://eduscol.education.gouv.fr/sites/default/files/document/sujet-specialite-2pdf-112053.pdf";
const newProgramUrl =
  "https://www.education.gouv.fr/bo/2026/Hebdo14/MENE2602917A";

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
    question: "Combien de sujets zéro de spécialité maths sont disponibles ?",
    answer:
      "Éduscol publie deux sujets zéro pour la voie générale avec spécialité mathématiques. Tous parcours confondus, la page officielle en propose sept.",
  },
  {
    question: "Les corrigés SprintMaths sont-ils officiels ?",
    answer:
      "Non. Les analyses et résolutions proposées ici sont des contenus pédagogiques originaux SprintMaths. Éduscol ne joint pas de corrigé officiel à ces deux PDF sur sa page de l’épreuve.",
  },
  {
    question: "Faut-il faire les deux sujets zéro ?",
    answer:
      "Oui, idéalement en deux temps : une première découverte sans pression, puis un second essai chronométré de 2 heures et sans calculatrice.",
  },
  {
    question: "Les sujets zéro couvrent-ils tout le programme 2026-2027 ?",
    answer:
      "Non. Ils illustrent le format et mobilisent de nombreux chapitres, mais ils ne garantissent pas une couverture exhaustive. De nouveaux programmes entrent en vigueur à la rentrée 2026-2027 : il faut donc aussi suivre le programme travaillé en classe.",
  },
];

const correctedExercises: CorrectedExercise[] = [
  {
    label: "Sujet zéro 1 · probabilité manquante",
    title: "Compléter une loi de probabilité",
    statement: "Une expérience a quatre issues de probabilités 1/2, 1/6, 1/5 et x. Déterminer x.",
    trap: "Additionner des valeurs décimales arrondies et sélectionner trop vite une réponse proche.",
    method: "Utiliser que la somme des probabilités de toutes les issues vaut 1, puis travailler avec un dénominateur commun.",
    calculations: [
      "x = 1 − (1/2 + 1/6 + 1/5)",
      "x = 1 − (15/30 + 5/30 + 6/30)",
      "x = 4/30 = 2/15",
    ],
    answer: "La probabilité manquante vaut 2/15.",
    why: "La somme égale à 1 est le contrôle immédiat d’une loi de probabilité finie.",
  },
  {
    label: "Sujet zéro 1 · géométrie repérée",
    title: "Relier produit scalaire et projection",
    statement: "Avec I(4 ; 3), C(0 ; 4) et H projeté orthogonal de C sur (OI), déterminer OH.",
    trap: "Utiliser une formule de projection sans identifier l’orthogonalité ni calculer correctement la norme de OI.",
    method: "Calculer le produit scalaire avec les coordonnées, puis l’exprimer avec la longueur de la projection sur (OI).",
    calculations: [
      "OI⃗ = (4 ; 3), OC⃗ = (0 ; 4), donc OI⃗ · OC⃗ = 12",
      "OI = √(4² + 3²) = 5",
      "OI⃗ · OC⃗ = OI × OH, donc OH = 12/5",
    ],
    answer: "OH = 2,4.",
    why: "Le projeté H permet de remplacer le vecteur OC par sa composante portée par la direction OI dans le produit scalaire.",
  },
  {
    label: "Sujet zéro 2 · suite auxiliaire",
    title: "Transformer une récurrence affine",
    statement: "On a uₙ₊₁ = 1,08uₙ − 300, u₀ = 10 000 et vₙ = uₙ − 3 750. Montrer que (vₙ) est géométrique.",
    trap: "Remplacer uₙ par vₙ sans tenir compte du décalage de 3 750.",
    method: "Calculer vₙ₊₁, regrouper les constantes, puis reconnaître 4 050 = 1,08 × 3 750.",
    calculations: [
      "vₙ₊₁ = uₙ₊₁ − 3 750 = 1,08uₙ − 4 050",
      "vₙ₊₁ = 1,08(uₙ − 3 750) = 1,08vₙ",
      "v₀ = 10 000 − 3 750 = 6 250",
    ],
    answer: "(vₙ) est géométrique de raison 1,08 et vₙ = 6 250 × 1,08ⁿ.",
    why: "Le décalage choisi transforme la récurrence affine en multiplication par une constante.",
  },
  {
    label: "Sujet zéro 2 · dérivation",
    title: "Dériver un produit avec une exponentielle",
    statement: "Pour f(x) = (4x² − 14x + 8)e^(0,5x), établir une forme factorisée de f′(x).",
    trap: "Oublier le facteur 0,5 en dérivant l’exponentielle, ou ne dériver qu’un facteur du produit.",
    method: "Appliquer la formule (uv)′ = u′v + uv′, factoriser l’exponentielle puis réduire le polynôme.",
    calculations: [
      "f′(x) = (8x − 14)e^(0,5x) + 0,5(4x² − 14x + 8)e^(0,5x)",
      "f′(x) = [8x − 14 + 2x² − 7x + 4]e^(0,5x)",
      "f′(x) = (2x² + x − 10)e^(0,5x)",
    ],
    answer: "f′(x) = (2x² + x − 10)e^(0,5x).",
    why: "L’exponentielle est strictement positive : le signe de f′ est ensuite celui du trinôme, ce qui facilite le tableau de variations.",
  },
];

export default function SujetsZeroMathsPremierePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Épreuve anticipée de maths", path: "/epreuve-anticipee-maths-premiere" },
            { name: "Sujets zéro maths Première", path: pagePath },
          ]),
        ]}
      />

      <ChapterHero
        eyebrow="PDF officiels Éduscol · analyses originales SprintMaths"
        title="Sujets zéro de l’épreuve anticipée de Maths en Première"
        description="Éduscol publie deux sujets zéro pour la voie générale avec spécialité mathématiques. Télécharge les PDF officiels, puis utilise cette page pour comprendre leur structure, leurs chapitres et les méthodes attendues."
        secondaryDescription="Les sujets ne sont pas recopiés ici et aucun PDF n’est réhébergé. Les corrigés proposés sont pédagogiques et originaux : ils ne sont pas des corrigés officiels d’Éduscol."
        ctas={[]}
      />

      <ResourceToc
        label="Sommaire des sujets zéro de maths Première"
        items={[
          { href: "#acces", label: "Accès rapide" },
          { href: "#analyse-1", label: "Analyse sujet 1" },
          { href: "#analyse-2", label: "Analyse sujet 2" },
          { href: "#corrige", label: "Corrigé pédagogique" },
          { href: "#enseignements", label: "Compétences" },
          { href: "#conditions", label: "Conditions réelles" },
          { href: "#faq", label: "FAQ" },
        ]}
      />

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-16">
          <div id="acces" className="scroll-mt-24">
            <QuickAnswer title="2 sujets zéro officiels pour la spécialité maths" tone="emerald">
              <p>
                La page Éduscol recense sept sujets zéro au total : deux en voie
                générale spécialité, trois en enseignement spécifique sans spécialité
                et deux en voie technologique.
              </p>
              <p className="text-base">
                Le tableau ci-dessous se concentre sur les deux sujets correspondant
                à l&apos;intention de cette page : Première générale avec spécialité mathématiques.
              </p>
            </QuickAnswer>

            <div className="mt-7">
              <ResourceTable
                prominent
                caption="Accès aux sujets zéro de spécialité mathématiques"
                headers={["Sujet", "Voie", "Enseignement", "Lien officiel", "Difficulté perçue", "Thèmes présents"]}
                rows={[
                  {
                    key: "subject-1",
                    cells: [
                      "Sujet zéro 1",
                      "Générale",
                      "Spécialité mathématiques",
                      <a key="link-1" href={subjectOneUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-bold text-blue-900 underline underline-offset-4">PDF Éduscol <ExternalLink className="h-4 w-4" aria-hidden="true" /></a>,
                      "Intermédiaire ; second exercice dense",
                      "Calcul exact, évolutions, probabilités, fonctions, second degré, suites, dérivation, produit scalaire et géométrie repérée",
                    ],
                  },
                  {
                    key: "subject-2",
                    cells: [
                      "Sujet zéro 2",
                      "Générale",
                      "Spécialité mathématiques",
                      <a key="link-2" href={subjectTwoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-bold text-blue-900 underline underline-offset-4">PDF Éduscol <ExternalLink className="h-4 w-4" aria-hidden="true" /></a>,
                      "Intermédiaire à soutenue",
                      "Probabilités, proportions, puissances, conversions, droites, second degré, suites, tableur, exponentielle et dérivation",
                    ],
                  },
                ]}
              />
            </div>
            <p className="mt-5 flex items-start gap-3 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-950">
              <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              Ces sujets ont préparé la première édition de juin 2026. De nouveaux
              programmes entrent en vigueur en Première à la rentrée 2026-2027 : les
              PDF restent précieux pour comprendre le format, mais ils ne remplacent
              pas le programme effectivement travaillé en classe.
            </p>
          </div>

          <section id="analyse-1" className="scroll-mt-24">
            <FileCheck2 className="h-8 w-8 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">Analyse du sujet zéro 1</h2>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
              Le PDF comporte 12 QCM sur 6 points, puis deux exercices pour 14 points.
              Le barème interne des deux exercices est laissé « X points » dans le
              document : il ne faut pas inventer une répartition 7/7.
            </p>
            <div className="mt-7 grid gap-5 lg:grid-cols-2">
              {[
                ["Automatismes", "Fractions, substitution dans une formule, coefficients multiplicateurs, variations successives, probabilités, somme d’inverses, inéquation avec x², droites, fonctions affines, parabole et moyenne pondérée."],
                ["Exercice 1", "Géométrie repérée : vecteurs, produit scalaire, projection orthogonale, équation de droite, cercle et vérification d’une appartenance simultanée."],
                ["Exercice 2", "Second degré, signe, pentes entre points d’une parabole, suite arithmétique, fonction rationnelle, dérivée, variations et esquisse."],
                ["Niveau de calcul", "Les valeurs exactes restent praticables sans calculatrice. La difficulté vient surtout des changements de registre : coordonnées, longueurs, signe, suite puis fonction."],
                ["Pièges", "Confondre inverse et double, croire que +10 % puis −10 % s’annulent, mal lire le signe de x·f(x), ou utiliser un résultat sans vérifier ses hypothèses."],
                ["Gestion du temps", "Conseil éditorial : environ 20 min pour le QCM, 35 min pour l’exercice 1, 50 min pour l’exercice 2 et 15 min de relecture."],
              ].map(([heading, text]) => (
                <article key={heading} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-950">{heading}</h3>
                  <p className="mt-3 leading-7 text-slate-700">{text}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="analyse-2" className="scroll-mt-24">
            <FileCheck2 className="h-8 w-8 text-violet-700" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">Analyse du sujet zéro 2</h2>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
              La même structure revient : 12 QCM, puis deux exercices. Ici, les
              enchaînements suites–modélisation et trinôme–dérivation demandent une
              bonne capacité à réutiliser les résultats intermédiaires.
            </p>
            <div className="mt-7 grid gap-5 lg:grid-cols-2">
              {[
                ["Automatismes", "Arbre de probabilités, baisse simple, variations successives, proportion d’une proportion, puissances de 10, conversion d’unités, coefficient directeur, équation de droite, produit factorisé et isolement d’une variable."],
                ["Exercice 1", "Récurrence affine, suite auxiliaire géométrique, formule explicite, lecture d’un tableur, seuil démographique et interprétation du délai de construction."],
                ["Exercice 2", "Racines et signe d’un trinôme, axe de symétrie, lecture graphique de f′, dérivation d’un produit avec une exponentielle et tableau de variations."],
                ["Niveau de calcul", "Le QCM demande des ordres de grandeur sûrs. Les tableaux et valeurs fournies évitent les puissances longues ; l’exponentielle n’a pas à être évaluée numériquement."],
                ["Pièges", "Oublier une branche de l’arbre, perdre un facteur 10⁶, écarter une expression avant de la simplifier, confondre indice et année ou oublier le facteur 0,5 dans la dérivée."],
                ["Gestion du temps", "Conseil éditorial : environ 20 min pour le QCM, 45 min pour l’exercice 1, 40 min pour l’exercice 2 et 15 min de relecture."],
              ].map(([heading, text]) => (
                <article key={heading} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-950">{heading}</h3>
                  <p className="mt-3 leading-7 text-slate-700">{text}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="corrige" className="scroll-mt-24">
            <Lightbulb className="h-8 w-8 text-amber-600" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">Méthodes à reconnaître avant de calculer</h2>
            <p className="mt-4 max-w-4xl leading-7 text-slate-700">
              Ce tableau paraphrase quelques situations représentatives. Il sert à
              identifier le bon outil sans reproduire les énoncés officiels.
            </p>
            <div className="mt-7">
              <ResourceTable
                caption="Lecture pédagogique de questions représentatives"
                headers={["Question / notion", "Méthode à reconnaître", "Idée du calcul", "Erreur fréquente"]}
                rows={[
                  { key: "probability-law", cells: ["Loi de probabilité", "Somme des probabilités = 1", "Passer au dénominateur 30", "Arrondir trop tôt"] },
                  { key: "successive-rates", cells: ["Deux évolutions", "Multiplier les coefficients", "Par exemple 1,10 × 0,90", "Additionner les taux"] },
                  { key: "dot-product", cells: ["Projection orthogonale", "Deux expressions du produit scalaire", "Coordonnées puis OI × OH", "Oublier l’orthogonalité"] },
                  { key: "slope-sequence", cells: ["Pentes successives", "Calculer g(n+1) − g(n)", "Réduire en fonction de n", "Deviner la nature de la suite"] },
                  { key: "total-probability", cells: ["Arbre pondéré", "Additionner toutes les branches vers B", "P(A)P(B|A) + P(non A)P(B|non A)", "Garder une seule branche"] },
                  { key: "energy", cells: ["Conversion d’énergie", "Diviser par l’équivalence fournie", "Simplifier les puissances 10⁶", "Perdre l’unité"] },
                  { key: "aux-sequence", cells: ["Récurrence affine", "Introduire la suite décalée", "Faire apparaître 1,08vₙ", "Mélanger uₙ et vₙ"] },
                  { key: "product-derivative", cells: ["Produit et exponentielle", "Formule du produit puis factorisation", "Sortir e^(0,5x)", "Oublier la dérivée de 0,5x"] },
                ]}
              />
            </div>
          </section>

          <CorrectedExerciseList
            heading="Quatre résolutions pédagogiques originales"
            exercises={correctedExercises}
          />

          <section id="enseignements" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-slate-950">Ce que les sujets zéro nous apprennent</h2>
            <div className="mt-7">
              <ResourceTable
                prominent
                caption="Compétences visibles dans les deux sujets"
                headers={["Compétence", "Où elle intervient", "Comment s’entraîner"]}
                rows={[
                  { key: "exact", cells: ["Calcul exact", "Dans les deux parties QCM et dans plusieurs questions des exercices", "Fractions, puissances, identités et vérification mentale"] },
                  { key: "graphs", cells: ["Lecture graphique", "Droites, paraboles, signe et dérivée", "Lire axes, échelles, intersections, pente et variations"] },
                  { key: "equations", cells: ["Équations et signe", "Second degré et expressions factorisées", "Relier racines, facteurs et tableau de signes"] },
                  { key: "probabilities", cells: ["Probabilités", "QCM des deux sujets", "Arbres, loi totale et probabilités conditionnelles"] },
                  { key: "functions", cells: ["Fonctions et dérivation", "Parties longues des deux sujets", "Dériver, étudier le signe puis construire les variations"] },
                  { key: "sequences", cells: ["Suites", "Pentes du sujet 1 et modélisation du sujet 2", "Passer de récurrence à formule et interpréter les indices"] },
                  { key: "reasoning", cells: ["Raisonnement", "Chaque exercice long", "Citer le résultat réutilisé et justifier chaque conclusion"] },
                ]}
              />
            </div>
          </section>

          <div id="conditions" className="scroll-mt-24">
            <Clock3 className="mb-4 h-8 w-8 text-blue-800" aria-hidden="true" />
            <ChecklistBlock
              heading="Faire le sujet en conditions réelles"
              items={[
                "Prévoir exactement 2 heures pour le second essai.",
                "Ranger la calculatrice pendant toute l’épreuve.",
                "Utiliser une copie et une feuille de brouillon blanches.",
                "Lancer un chronomètre et noter le temps passé par partie.",
                "Ne consulter cette analyse et les corrections qu’à la fin.",
                "Premier essai : découvrir sans contrainte et repérer les méthodes.",
                "Deuxième essai : traiter le PDF complet en temps limité.",
                "Après correction : classer chaque erreur par thème et par cause.",
              ]}
            />
          </div>

          <ChapterInternalLinks
            title="Passer du sujet à l’entraînement"
            variant="cards"
            links={[
              { href: "/epreuve-anticipee-maths-premiere", label: "Format et règles de l’épreuve" },
              { href: "/automatismes-maths-premiere", label: "50 automatismes corrigés" },
              { href: "/programme-maths-premiere", label: "Programme maths Première" },
              { href: "/bac-premiere-maths", label: "Exercices et révisions Première" },
            ]}
          />

          <div id="faq" className="scroll-mt-24">
            <StaticFaq items={faqItems} />
          </div>

          <OfficialSources
            sources={[
              {
                href: eduscolPageUrl,
                label: "Éduscol — page officielle de l’épreuve et liste des sept sujets zéro",
                description: "Source du nombre de sujets disponibles et des liens vers chaque PDF.",
              },
              {
                href: subjectOneUrl,
                label: "Éduscol — sujet zéro 1, voie générale spécialité mathématiques",
                description: "PDF officiel de 5 pages, consulté pour cette analyse.",
              },
              {
                href: subjectTwoUrl,
                label: "Éduscol — sujet zéro 2, voie générale spécialité mathématiques",
                description: "PDF officiel de 5 pages, consulté pour cette analyse.",
              },
              {
                href: newProgramUrl,
                label: "BO du 2 avril 2026 — programme de Première spécialité applicable en 2026-2027",
                description: "À utiliser avec les sujets zéro pour couvrir le programme réellement enseigné à la rentrée 2026.",
              },
            ]}
          />
        </div>
      </section>
    </SeoPageLayout>
  );
}
