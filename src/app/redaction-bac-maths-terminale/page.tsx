import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  MessageSquareText,
  PenLine,
} from "lucide-react";
import { SeoFaq } from "@/components/marketing/SeoFaq";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/seo";
import styles from "../seo-resource.module.css";

const pagePath = "/redaction-bac-maths-terminale";
const title = "Comment bien rédiger au Bac Maths Terminale ?";
const description =
  "Apprends à rédiger une réponse rigoureuse au Bac Maths Terminale : phrases utiles, hypothèses, conclusions, récurrence, TVI, probabilités et géométrie.";

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: absoluteUrl(pagePath),
  },
  openGraph: {
    title,
    description,
    url: absoluteUrl(pagePath),
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const sectionLinks = [
  { id: "calcul-juste", label: "1. Calcul juste" },
  { id: "annoncer-methode", label: "2. Annoncer une méthode" },
  { id: "hypotheses-theoreme", label: "3. Citer les hypothèses" },
  { id: "conclure", label: "4. Conclure" },
  { id: "recurrence", label: "5. Récurrence" },
  { id: "tvi", label: "6. TVI" },
  { id: "variations", label: "7. Variations" },
  { id: "probabilites", label: "8. Probabilités" },
  { id: "geometrie", label: "9. Géométrie" },
  { id: "formulations-eviter", label: "10. À éviter" },
];

const writingExamples = [
  {
    theme: "Variations",
    before: "f est croissante car f’ est positive.",
    after:
      "La fonction f est dérivable sur I et, pour tout x ∈ I, f′(x) ≥ 0. La fonction f est donc croissante sur I.",
    why:
      "L’intervalle et le lien entre le signe de f′ et les variations de f sont explicités.",
  },
  {
    theme: "Croissance comparée",
    before: "La limite vaut 0 car l’exponentielle est plus forte.",
    after:
      "Lorsque x tend vers +∞, x²/eˣ tend vers 0 par croissance comparée de l’exponentielle et des puissances.",
    why:
      "La borne, l’expression et le résultat utilisé sont tous indiqués.",
  },
  {
    theme: "Récurrence — initialisation",
    before: "C’est vrai au début.",
    after:
      "Au rang 0, u₀ = 2 et 2 ≤ 6. La propriété P(0) est donc vraie : elle est initialisée.",
    why:
      "Le premier rang concerné et la vérification numérique apparaissent.",
  },
  {
    theme: "Récurrence — hérédité",
    before: "On suppose que c’est vrai, donc c’est vrai après.",
    after:
      "Soit k ∈ ℕ. Supposons P(k) vraie, c’est-à-dire uₖ ≤ 6. Alors uₖ₊₁ = 0,5uₖ + 3 ≤ 0,5 × 6 + 3 = 6. Ainsi P(k + 1) est vraie.",
    why:
      "L’hypothèse de récurrence est utilisée dans un calcul qui établit le rang suivant.",
  },
  {
    theme: "TVI — existence",
    before: "La courbe coupe l’axe, donc il y a une solution.",
    after:
      "La fonction f est continue sur [1 ; 2]. De plus, f(1) = −1 et f(2) = 3, donc 0 est compris entre f(1) et f(2). D’après le théorème des valeurs intermédiaires, l’équation f(x) = 0 admet au moins une solution α dans [1 ; 2].",
    why:
      "La continuité, l’encadrement de la valeur cherchée et la conclusion d’existence sont cités.",
  },
  {
    theme: "TVI — unicité",
    before: "Il y a une seule solution car f monte.",
    after:
      "La fonction f est strictement croissante sur [1 ; 2]. La solution α obtenue par le théorème des valeurs intermédiaires est donc unique sur cet intervalle.",
    why:
      "L’unicité est séparée de l’existence et repose sur la stricte monotonie.",
  },
  {
    theme: "Probabilité conditionnelle",
    before: "On fait 0,12 ÷ 0,4 = 0,3.",
    after:
      "L’événement recherché est B sachant A. Comme P(A) = 0,4 > 0, P_A(B) = P(A ∩ B)/P(A) = 0,12/0,4 = 0,3.",
    why:
      "Le calcul est rattaché aux événements et la condition P(A) > 0 est vérifiée.",
  },
  {
    theme: "Probabilités totales",
    before: "On additionne les deux branches.",
    after:
      "Si 0 < P(A) < 1, les événements A et A̅ forment une partition de l’univers. D’après la formule des probabilités totales, P(B) = P(A)P_A(B) + P(A̅)P_A̅(B).",
    why:
      "La raison de l’addition et les chemins concernés sont nommés.",
  },
  {
    theme: "Loi binomiale",
    before: "C’est une binomiale.",
    after:
      "On répète 10 épreuves de Bernoulli indépendantes, chacune ayant une probabilité de succès égale à 0,2. La variable X qui compte les succès suit donc la loi binomiale B(10 ; 0,2).",
    why:
      "Le nombre d’essais, l’indépendance, la probabilité constante et la variable comptée sont précisés.",
  },
  {
    theme: "Appartenance à un plan",
    before: "A est dans le plan en remplaçant.",
    after:
      "Si A a pour coordonnées (x_A ; y_A ; z_A), alors 2x_A − y_A + z_A − 4 = 0. Les coordonnées de A vérifient donc l’équation du plan P : le point A appartient à P.",
    why:
      "L’équation testée et la conclusion géométrique sont écrites.",
  },
  {
    theme: "Orthogonalité",
    before: "Les vecteurs sont perpendiculaires.",
    after:
      "Dans le repère orthonormé, AB⃗ · AC⃗ = 0. Comme A, B et C sont distincts, les vecteurs AB⃗ et AC⃗ sont non nuls : le triangle ABC est donc rectangle en A.",
    why:
      "Le calcul du produit scalaire justifie l’orthogonalité et la conclusion répond à la figure.",
  },
  {
    theme: "Convexité",
    before: "f est convexe car f″ est positive.",
    after:
      "La fonction f est deux fois dérivable sur I et, pour tout x ∈ I, f″(x) ≥ 0. La fonction f est donc convexe sur I.",
    why:
      "La dérivabilité, l’intervalle et le lien entre le signe de f″ et la convexité sont explicités.",
  },
];

const usefulPhrases = [
  "La fonction est continue sur l’intervalle…",
  "La fonction est dérivable sur…",
  "Les hypothèses du théorème sont donc vérifiées.",
  "D’après le théorème des valeurs intermédiaires…",
  "Par conséquent…",
  "On en déduit que…",
  "L’événement recherché est…",
  "Les événements … forment une partition de l’univers.",
  "La propriété est initialisée au rang…",
  "La propriété est héréditaire.",
  "La représentation paramétrique est vérifiée pour la même valeur du paramètre.",
  "Ce résultat répond à la question car…",
];

const faqItems: FaqItem[] = [
  {
    question: "Faut-il rédiger toutes les lignes d’un calcul ?",
    answer:
      "Non. Il faut garder les étapes qui montrent la méthode, justifient une transformation ou permettent de contrôler le résultat. Les calculs élémentaires peuvent rester compacts tant que le raisonnement est lisible.",
  },
  {
    question: "Peut-on utiliser des phrases types ?",
    answer:
      "Oui, si elles sont adaptées aux données de l’exercice. Une phrase apprise par cœur ne suffit pas : il faut remplacer les intervalles, événements, fonctions et hypothèses par ceux du problème.",
  },
  {
    question: "Une bonne formulation garantit-elle tous les points ?",
    answer:
      "Non. La rédaction rend le raisonnement vérifiable, mais l’exactitude du calcul, le choix de la méthode et la réponse à la question restent indispensables.",
  },
  {
    question: "Comment faire une copie lisible sans perdre de temps ?",
    answer:
      "Annonce la méthode en une phrase, aligne les étapes utiles, puis termine par une conclusion courte. Cette structure évite les longs paragraphes et les résultats isolés.",
  },
];

export default function RedactionBacMathsTerminalePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Méthodes maths Terminale", path: "/methodes-maths-terminale" },
            { name: "Rédaction Bac Maths Terminale", path: pagePath },
          ]),
        ]}
      />

      <div className={`${styles.printPage} bg-white`}>
        <section className="border-b border-slate-200 bg-gradient-to-b from-violet-50 to-white px-4 py-14 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="mb-4 inline-flex rounded-full bg-violet-100 px-3 py-1 text-sm font-bold text-violet-950">
              Guide pratique de rédaction
            </p>
            <h1 className="max-w-5xl text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl">
              Bien rédiger au Bac Maths : phrases et justifications utiles
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
              Une bonne rédaction ne consiste pas à écrire beaucoup. Elle permet au
              correcteur de suivre la méthode, de vérifier les hypothèses et de
              comprendre exactement ce qui est démontré.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#exemples-avant-apres"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-blue-900 px-5 py-3 font-bold text-white hover:bg-blue-800"
              >
                Voir les exemples avant / après
              </Link>
              <Link
                href="#checklist"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-blue-900 px-5 py-3 font-bold text-blue-900 hover:bg-blue-50"
              >
                Ouvrir la checklist de relecture
              </Link>
            </div>
          </div>
        </section>

        <section className="px-4 py-10">
          <div className="mx-auto max-w-6xl">
            <nav
              aria-label="Sommaire du guide de rédaction"
              className="rounded-2xl border border-violet-100 bg-violet-50 p-5 sm:p-6"
            >
              <h2 className="text-2xl font-bold text-slate-950">Sommaire</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {sectionLinks.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="rounded-xl border border-violet-100 bg-white px-4 py-3 text-sm font-semibold text-violet-950 hover:border-violet-300"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </section>

        <section className="px-4 pb-12">
          <div className="mx-auto max-w-6xl space-y-12">
            <section id="calcul-juste" className="scroll-mt-24 grid gap-7 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-blue-900">
                  1. Donner du sens
                </p>
                <h2 className="mt-2 text-3xl font-bold text-slate-950">
                  Pourquoi un calcul juste ne suffit pas toujours
                </h2>
              </div>
              <div className="space-y-4 leading-7 text-slate-700">
                <p>
                  Une ligne de calcul peut être correcte sans montrer pourquoi elle
                  répond à la question. Il faut parfois définir une variable, citer
                  une propriété, préciser un intervalle ou interpréter le résultat.
                </p>
                <div className="rounded-xl border-l-4 border-blue-700 bg-blue-50 p-4 text-blue-950">
                  <strong>Réflexe :</strong> après le calcul, demande-toi « qu’est-ce
                  que ce nombre, cette limite ou ce signe prouve dans le problème ? »
                </div>
              </div>
            </section>

            <section id="annoncer-methode" className="scroll-mt-24 grid gap-7 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-blue-900">
                  2. Poser la stratégie
                </p>
                <h2 className="mt-2 text-3xl font-bold text-slate-950">
                  Comment annoncer une méthode
                </h2>
              </div>
              <div className="space-y-4 leading-7 text-slate-700">
                <p>
                  Une phrase courte suffit : « Étudions le signe de f′ pour
                  déterminer les variations de f » ou « Utilisons la formule des
                  probabilités totales avec la partition A, A̅ ».
                </p>
                <p>
                  Cette annonce doit correspondre à ce qui suit. Évite les longues
                  introductions générales : nomme l’outil et son objectif.
                </p>
              </div>
            </section>

            <section id="hypotheses-theoreme" className="scroll-mt-24 grid gap-7 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-blue-900">
                  3. Vérifier avant d’appliquer
                </p>
                <h2 className="mt-2 text-3xl font-bold text-slate-950">
                  Comment citer les hypothèses d’un théorème
                </h2>
              </div>
              <div className="space-y-4 leading-7 text-slate-700">
                <p>
                  Écris les hypothèses utiles juste avant le théorème : continuité
                  et encadrement pour le TVI, dérivabilité et signe de la dérivée
                  pour les variations, indépendance et probabilité constante pour
                  une loi binomiale.
                </p>
                <div className="rounded-xl bg-slate-50 p-4">
                  <strong>Structure :</strong> fait vérifié → propriété applicable →
                  conclusion précise.
                </div>
              </div>
            </section>

            <section id="conclure" className="scroll-mt-24 grid gap-7 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-blue-900">
                  4. Répondre à la question
                </p>
                <h2 className="mt-2 text-3xl font-bold text-slate-950">
                  Comment conclure une réponse
                </h2>
              </div>
              <div className="space-y-4 leading-7 text-slate-700">
                <p>
                  Reprends les mots de la question : « La suite converge donc vers
                  6 », « La probabilité recherchée vaut 0,3 », « Le point M
                  appartient donc à la droite d ».
                </p>
                <p>
                  Ajoute l’unité ou l’arrondi demandé. N’annonce pas une valeur
                  approchée comme une égalité exacte.
                </p>
              </div>
            </section>

            <section id="recurrence" className="scroll-mt-24 rounded-2xl border border-slate-200 p-6 sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-blue-900">
                5. Démonstration
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-950">
                Comment rédiger une démonstration par récurrence
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {[
                  {
                    title: "Initialisation",
                    text: "Vérifie la propriété au premier rang concerné, avec le calcul nécessaire.",
                  },
                  {
                    title: "Hérédité",
                    text: "Soit k au moins égal au rang initial. Suppose P(k) vraie, utilise cette hypothèse et démontre P(k + 1).",
                  },
                  {
                    title: "Conclusion",
                    text: "D’après le principe de récurrence, la propriété est vraie pour tout entier n à partir du rang annoncé.",
                  },
                ].map((item) => (
                  <article key={item.title} className="rounded-xl bg-blue-50 p-5">
                    <h3 className="text-lg font-bold text-blue-950">{item.title}</h3>
                    <p className="mt-2 leading-7 text-slate-700">{item.text}</p>
                  </article>
                ))}
              </div>
              <Link
                href="/methodes-maths-terminale/etudier-une-suite"
                className="mt-6 inline-flex items-center gap-2 font-bold text-blue-900 hover:underline"
              >
                Revoir la méthode pour étudier une suite
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </section>

            <section id="tvi" className="scroll-mt-24 rounded-2xl border border-slate-200 p-6 sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-blue-900">
                6. Existence et unicité
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-950">
                Comment utiliser le théorème des valeurs intermédiaires
              </h2>
              <ol className="mt-6 grid gap-4 md:grid-cols-2">
                <li className="rounded-xl bg-slate-50 p-5">
                  <strong>1. Continuité :</strong> indiquer que f est continue sur
                  l’intervalle fermé étudié.
                </li>
                <li className="rounded-xl bg-slate-50 p-5">
                  <strong>2. Encadrement :</strong> montrer que la valeur cherchée
                  est comprise entre les images des bornes.
                </li>
                <li className="rounded-xl bg-slate-50 p-5">
                  <strong>3. Existence :</strong> conclure qu’au moins un antécédent
                  existe dans l’intervalle.
                </li>
                <li className="rounded-xl bg-slate-50 p-5">
                  <strong>4. Unicité :</strong> l’ajouter seulement après avoir
                  établi une stricte monotonie sur l’intervalle.
                </li>
              </ol>
              <Link
                href="/methodes-maths-terminale/calculer-une-limite"
                className="mt-6 inline-flex items-center gap-2 font-bold text-blue-900 hover:underline"
              >
                Revoir continuité et limites dans la méthode
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </section>

            <section id="variations" className="scroll-mt-24 grid gap-7 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-blue-900">
                  7. Signe et variations
                </p>
                <h2 className="mt-2 text-3xl font-bold text-slate-950">
                  Comment justifier les variations d’une fonction
                </h2>
              </div>
              <div className="space-y-4 leading-7 text-slate-700">
                <p>
                  Indique que f est dérivable, calcule f′, étudie son signe sur les
                  intervalles concernés, puis relie explicitement ce signe aux
                  variations de f.
                </p>
                <p>
                  Ne confonds pas le signe de f et celui de f′. Le premier situe la
                  courbe par rapport à l’axe ; le second donne son sens de variation.
                </p>
                <Link
                  href="/methodes-maths-terminale/tableau-variation"
                  className="inline-flex items-center gap-2 font-bold text-blue-900 hover:underline"
                >
                  Revoir la méthode du tableau de variation
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </section>

            <section id="probabilites" className="scroll-mt-24 grid gap-7 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-blue-900">
                  8. Modéliser avant de calculer
                </p>
                <h2 className="mt-2 text-3xl font-bold text-slate-950">
                  Comment rédiger une réponse de probabilités
                </h2>
              </div>
              <div className="space-y-4 leading-7 text-slate-700">
                <p>
                  Définis les événements, traduis la question avec une notation
                  comme P(A ∩ B) ou P_A(B), cite la formule, effectue le calcul et
                  interprète le résultat dans le contexte.
                </p>
                <p>
                  Pour une loi binomiale, définis la variable aléatoire et justifie
                  le schéma de Bernoulli avant d’écrire ses paramètres.
                </p>
                <Link
                  href="/methodes-maths-terminale/probabilites-conditionnelles"
                  className="inline-flex items-center gap-2 font-bold text-blue-900 hover:underline"
                >
                  Revoir la méthode des probabilités conditionnelles
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </section>

            <section id="geometrie" className="scroll-mt-24 grid gap-7 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-blue-900">
                  9. Relier calcul et figure
                </p>
                <h2 className="mt-2 text-3xl font-bold text-slate-950">
                  Comment rédiger en géométrie dans l’espace
                </h2>
              </div>
              <div className="space-y-4 leading-7 text-slate-700">
                <p>
                  Nomme les objets : point, vecteur directeur, vecteur normal,
                  droite ou plan. Après un calcul de coordonnées ou de produit
                  scalaire, écris la conséquence géométrique obtenue.
                </p>
                <p>
                  Pour vérifier qu’un point appartient à une droite paramétrée, une
                  même valeur du paramètre doit satisfaire les trois coordonnées.
                </p>
                <Link
                  href="/methodes-maths-terminale/geometrie-espace"
                  className="inline-flex items-center gap-2 font-bold text-blue-900 hover:underline"
                >
                  Revoir la méthode de géométrie dans l’espace
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </section>

            <section id="formulations-eviter" className="scroll-mt-24 rounded-2xl bg-amber-50 p-6 sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-amber-800">
                10. Rester précis
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-950">
                Les formulations à éviter
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {[
                  ["« On voit que… »", "Remplace par le calcul, le signe ou la propriété qui permet réellement de voir."],
                  ["« Ça monte / ça descend »", "Écris que la fonction est croissante ou décroissante sur un intervalle."],
                  ["« D’après le théorème… »", "Nomme le théorème et vérifie ses hypothèses."],
                  ["« Le dénominateur vaut 0 donc la limite est infinie »", "Étudie aussi le numérateur et le signe du dénominateur de chaque côté."],
                  ["« Les événements sont différents donc indépendants »", "L’indépendance se justifie avec le modèle ou une égalité de probabilités."],
                  ["« Donc voilà »", "Conclue avec les mots exacts de la question et l’unité si nécessaire."],
                ].map(([phrase, advice]) => (
                  <article key={phrase} className="rounded-xl bg-white p-5">
                    <h3 className="font-bold text-amber-950">{phrase}</h3>
                    <p className="mt-2 leading-7 text-slate-700">{advice}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="exemples-avant-apres" className="scroll-mt-24">
              <div className="max-w-3xl">
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-blue-900">
                  Exemples concrets
                </p>
                <h2 className="mt-2 text-3xl font-bold text-slate-950">
                  12 exemples avant / après
                </h2>
                <p className="mt-3 leading-7 text-slate-700">
                  Le but n’est pas de recopier ces phrases partout, mais de
                  reproduire leur structure avec les données de l’exercice.
                </p>
              </div>
              <div className="mt-7 grid gap-5 lg:grid-cols-2">
                {writingExamples.map((example) => (
                  <article
                    key={example.theme}
                    className={`${styles.exampleCard} rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6`}
                  >
                    <p className="text-sm font-bold uppercase tracking-wide text-blue-900">
                      {example.theme}
                    </p>
                    <div className="mt-4 rounded-xl bg-red-50 p-4">
                      <h3 className="font-bold text-red-900">Avant</h3>
                      <p className="mt-2 leading-7 text-red-950">« {example.before} »</p>
                    </div>
                    <div className="mt-3 rounded-xl bg-emerald-50 p-4">
                      <h3 className="font-bold text-emerald-900">Après</h3>
                      <p className="mt-2 leading-7 text-emerald-950">« {example.after} »</p>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-600">
                      <strong>Pourquoi c’est plus rigoureux :</strong> {example.why}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
              <div className="flex items-start gap-3">
                <MessageSquareText className="mt-1 h-7 w-7 shrink-0 text-blue-800" aria-hidden="true" />
                <div>
                  <h2 className="text-3xl font-bold text-slate-950">
                    Phrases utiles à connaître
                  </h2>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {usefulPhrases.map((phrase) => (
                      <p key={phrase} className="rounded-xl bg-white px-4 py-3 text-slate-800">
                        « {phrase} »
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section
              id="checklist"
              className={`${styles.checklistCard} scroll-mt-24 rounded-2xl border-2 border-emerald-300 bg-emerald-50 p-6 sm:p-8`}
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-7 w-7 shrink-0 text-emerald-700" aria-hidden="true" />
                <div>
                  <h2 className="text-3xl font-bold text-slate-950">
                    Checklist de relecture
                  </h2>
                  <ul className="mt-6 grid gap-3 md:grid-cols-2">
                    {[
                      "J’ai défini les objets ou événements que j’utilise.",
                      "J’ai indiqué le domaine ou l’intervalle pertinent.",
                      "J’ai nommé la méthode ou le théorème utile.",
                      "J’ai vérifié les hypothèses avant la conclusion.",
                      "Mes égalités et mes valeurs approchées sont distinguées.",
                      "Mes tableaux et calculs restent lisibles.",
                      "J’ai ajouté l’unité quand elle est demandée.",
                      "Ma dernière phrase répond exactement à la question.",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 rounded-xl bg-white p-4">
                        <span aria-hidden="true" className="mt-0.5 text-lg">□</span>
                        <span className="leading-7 text-slate-800">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className={styles.screenOnly}>
              <h2 className="text-3xl font-bold text-slate-950">
                Mettre ces formulations en pratique
              </h2>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {[
                  {
                    icon: PenLine,
                    title: "Exercices type bac guidés",
                    text: "Travaille la méthode et la conclusion sur des exercices découpés en étapes.",
                    href: "/exercices-type-bac-maths-terminale",
                    label: "Voir les exercices guidés",
                  },
                  {
                    icon: BookOpenCheck,
                    title: "Sujets type bac",
                    text: "Entraîne-toi à tenir une rédaction sur plusieurs questions liées.",
                    href: "/sujets-type-bac-maths-terminale",
                    label: "Voir les sujets type bac",
                  },
                  {
                    icon: CheckCircle2,
                    title: "Fiche de formules",
                    text: "Retrouve les hypothèses qui accompagnent les formules usuelles.",
                    href: "/formules-bac-maths-terminale",
                    label: "Ouvrir la fiche de formules",
                  },
                ].map((item) => (
                  <article key={item.title} className="rounded-2xl bg-slate-50 p-6">
                    <item.icon className="h-7 w-7 text-blue-800" aria-hidden="true" />
                    <h3 className="mt-4 text-xl font-bold text-slate-950">{item.title}</h3>
                    <p className="mt-2 leading-7 text-slate-700">{item.text}</p>
                    <Link
                      href={item.href}
                      className="mt-4 inline-flex items-center gap-2 font-bold text-blue-900 hover:underline"
                    >
                      {item.label}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </article>
                ))}
              </div>
            </section>

            <SeoFaq items={faqItems} />
          </div>
        </section>
      </div>
    </SeoPageLayout>
  );
}
