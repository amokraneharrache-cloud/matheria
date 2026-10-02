import type { Metadata } from "next";
import Link from "next/link";
import { BookOpenCheck, ExternalLink, Filter, Map, Route, SlidersHorizontal } from "lucide-react";
import { ChapterHero, ChapterInternalLinks } from "@/components/marketing/ChapterSeoPage";
import { ResourceTable, ResourceToc } from "@/components/marketing/J41SeoBlocks";
import { OfficialSources, QuickAnswer, StaticFaq } from "@/components/marketing/J42SeoBlocks";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { bac2026CorrectionSubjects } from "@/data/bac2026Corrections";
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

type RevisionStep = { exerciseId: string; points: string; pdfPages: string; pdfStartPage: number; skill: string; reason: string; errorToCheck: string };

// Numéros d’exercice, points et pages relus dans les PDF officiels le 2 octobre 2026.
const revisionPaths: readonly { chapter: ChapterName; title: string; summary: string; steps: readonly [RevisionStep, RevisionStep] }[] = [
  {
    chapter: "Suites",
    title: "Suites : d’une récurrence guidée à un seuil à interpréter",
    summary: "Deux modèles de la forme uₙ₊₁ = a·uₙ + b, suivis d’une équation différentielle : le second ajoute les unités, la boucle de seuil et un jugement sur la limite.",
    steps: [
      { exerciseId: "2026-j2-e2", points: "5 points", pdfPages: "p. 3–4", pdfStartPage: 3, skill: "Calculer V₁ et V₂ avec Vₙ₊₁ = 0,995Vₙ + 6, compléter une boucle for, démontrer par récurrence Vₙ ≤ Vₙ₊₁ ≤ 1\u202f200, puis justifier la convergence et calculer la limite.", reason: "L’énoncé part de V₀ = 0, demande deux calculs directs et annonce les résultats à démontrer, y compris la solution v(t) = 1\u202f200(1 − e^(−0,005t)) du modèle continu : tu travailles la rédaction sans avoir à deviner la réponse.", errorToCheck: "Initialiser v à 6 au lieu de 0, ce qui décale tous les indices ; écrire ℓ = 0,995ℓ + 6 avant d’avoir justifié que la suite converge." },
      { exerciseId: "2024-j2-e2", points: "5 points", pdfPages: "p. 3", pdfStartPage: 3, skill: "Reprendre la même structure avec vₙ₊₁ = 0,92vₙ + 0,3, mais en convertissant d’abord 15 g dans 50 m³ en mg·L⁻¹, en écrivant la condition d’une boucle while de seuil et en réglant les constantes C et q du modèle continu.", reason: "La récurrence et la limite se traitent comme à l’étape 1 ; ce qui change, c’est l’interprétation : dire si le taux reste conforme à la plage de 1 à 3 mg·L⁻¹ et lire la valeur renvoyée par alerte_chlore(3).", errorToCheck: "Conclure que le taux est conforme parce que la suite est majorée par 4, alors que sa limite 3,75 sort de la plage préconisée." },
    ],
  },
  {
    chapter: "Probabilités conditionnelles",
    title: "Probabilités : d’un arbre guidé à des affirmations à trancher",
    summary: "Les mêmes outils — conditionnement, loi binomiale, inégalité de Bienaymé-Tchebychev — d’abord question par question, puis sans aucune étape intermédiaire.",
    steps: [
      { exerciseId: "2024-j1-e2", points: "5 points", pdfPages: "p. 2–3", pdfStartPage: 2, skill: "Compléter un arbre à trois branches, démontrer P(S) = 0,8 par les probabilités totales, calculer P(I|S), reconnaître la loi B(30 ; 0,8), puis minorer P(5 ≤ T ≤ 9) pour T = T₁ + T₂.", reason: "Les sept questions sont numérotées et deux résultats sont donnés par l’énoncé (P(S) = 0,8 et la borne 2/3) : tu peux contrôler ton arbre et ton calcul de variance avant de continuer.", errorToCheck: "Confondre P(I|S) avec P(S|I) = 0,75 ; calculer P(X = 25) alors que la question porte sur P(X ≥ 25)." },
      { exerciseId: "2026-j2-e3", points: "4 points", pdfPages: "p. 4–5", pdfStartPage: 4, skill: "Choisir seul la formule : obtenir P(O|F) à partir de P(F|O), évaluer P(X ≤ 340) pour B(5\u202f000 ; 0,062), décider si Bienaymé-Tchebychev garantit plus de 95\u00a0%, puis dénombrer des équipes.", reason: "C’est un vrai/faux : aucun résultat intermédiaire n’est fourni et l’énoncé précise qu’une réponse non justifiée ne rapporte aucun point. Il vérifie que les réflexes de l’étape 1 tiennent sans guidage.", errorToCheck: "Répondre 0,32 en inversant le sens du conditionnement ; placer l’écart-type à la place de la variance dans l’inégalité de Bienaymé-Tchebychev." },
    ],
  },
  {
    chapter: "Géométrie dans l’espace",
    title: "Géométrie dans l’espace : vérifier, puis construire",
    summary: "Quatre vérifications courtes sur des objets déjà donnés, puis un tétraèdre où il faut établir soi-même le plan, le projeté, l’aire et le volume.",
    steps: [
      { exerciseId: "2024-j2-e4", points: "4 points", pdfPages: "p. 6", pdfStartPage: 6, skill: "Tester une équation de plan avec trois points, décider d’une coplanarité, chercher le point commun de deux droites et contrôler un projeté orthogonal.", reason: "Les coordonnées et les équations de plans sont fournies : chaque affirmation se tranche par une condition courte, ce qui installe les critères avant de devoir les enchaîner.", errorToCheck: "Pour le projeté, vérifier l’orthogonalité sans vérifier que H appartient au plan ; rejeter un paramètre négatif alors qu’on étudie des droites, pas des segments." },
      { exerciseId: "2026-j2-e1", points: "5 points", pdfPages: "p. 2–3", pdfStartPage: 2, skill: "Montrer qu’un vecteur est normal au plan (ABC), en déduire l’équation x − y + 4z − 5 = 0, déterminer le projeté H de D, calculer l’aire de ABC, le volume du tétraèdre, puis l’aire de BCD en changeant de base.", reason: "Sept questions s’enchaînent et chaque résultat sert à la suivante : les critères vérifiés à l’étape 1 deviennent des étapes de construction.", errorToCheck: "Utiliser le cosinus à la place du sinus dans la formule de l’aire ; reprendre DH comme hauteur relative à la base BCD." },
    ],
  },
];

const linkClassName = "font-bold text-blue-900 underline underline-offset-4";
const levelLabels: Record<AnnaleDifficulty, string> = { Accessible: "accessible", Intermédiaire: "intermédiaire", Soutenue: "soutenu" };

function matchesChapter(name: ChapterName) {
  return chapterExercises.filter((item) => item.mainChapter === name || item.secondaryChapters.includes(name));
}

function compactExercise(item: (typeof chapterExercises)[number] | undefined, fallback: string) {
  if (!item) return fallback;
  return (
    <>
      <a href={item.pdfUrl} target="_blank" rel="noreferrer" className={linkClassName}>{item.year} · {item.day} · {item.exercise}</a>
      <span className="block text-sm leading-6 text-slate-600">{item.title} · <Link href={item.correctionHref} aria-label={`Corrigé SprintMaths du Bac ${item.year}, ${item.day}`} className="font-semibold text-blue-900 underline underline-offset-4">corrigé</Link></span>
    </>
  );
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
        { href: "#mode-emploi", label: "Comment utiliser l’index" }, { href: "#chapitres", label: "Chapitres et ressources" }, { href: "#filtres", label: "Filtrer les 24 exercices" }, { href: "#orientation", label: "Quelle annale choisir ?" }, { href: "#progressions", label: "Progressions en deux exercices" }, { href: "#faq", label: "FAQ" },
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
            <div><h2 className="text-3xl font-bold text-slate-950">Quelle annale choisir ?</h2><p className="mt-3 max-w-4xl leading-7 text-slate-700">“Je découvre” prend l’exercice accessible disponible, ou à défaut le premier intermédiaire. “Je maîtrise les bases” cible l’intermédiaire. “Je veux me tester” correspond au niveau Soutenu de SprintMaths. Chaque référence ouvre le PDF officiel du sujet ; le lien “corrigé” mène à la journée correspondante dans la correction SprintMaths.</p></div>
            <ResourceTable caption="Un point de départ par chapitre et par niveau" headers={["Chapitre", "Je découvre", "Je maîtrise les bases", "Je veux me tester"]} rows={orientationRows} />

            <div id="progressions" className="scroll-mt-24 space-y-6 pt-4">
              <Route className="h-8 w-8 text-emerald-800" aria-hidden="true" />
              <div>
                <h3 className="text-2xl font-bold text-slate-950">Par quels exercices commencer : trois progressions en deux étapes</h3>
                <p className="mt-3 max-w-4xl leading-7 text-slate-700">Pour les trois chapitres qui sont le plus souvent la notion principale d’un exercice de la sélection (probabilités conditionnelles et géométrie dans l’espace : 6 exercices sur 24 chacune ; suites : 5), voici deux exercices à enchaîner dans cet ordre. Les sujets, les numéros d’exercice et les points viennent des PDF officiels. L’ordre proposé, les compétences ciblées, les erreurs à vérifier et les corrigés sont des choix pédagogiques SprintMaths, non officiels.</p>
              </div>
              <div className="grid gap-6">
                {revisionPaths.map((path) => (
                  <article key={path.chapter} className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm sm:p-8">
                    <h4 className="text-xl font-bold text-slate-950">{path.title}</h4>
                    <p className="mt-2 leading-7 text-slate-700">{path.summary}</p>
                    <ol className="mt-5 grid gap-5 lg:grid-cols-2">
                      {path.steps.map((step, index) => {
                        const item = chapterExercises.find((exercise) => exercise.id === step.exerciseId);
                        if (!item) return null;
                        return (
                          <li key={step.exerciseId} className="flex flex-col rounded-xl border border-slate-200 bg-slate-50 p-5">
                            <p className="text-sm font-bold uppercase tracking-[0.12em] text-emerald-800">Étape {index + 1} · niveau {levelLabels[item.difficulty]} (estimation SprintMaths)</p>
                            <p className="mt-2 text-lg font-bold text-slate-950">Bac {item.year} · {item.day} · {item.exercise} — {item.title}</p>
                            <p className="mt-1 text-sm leading-6 text-slate-600">{item.center} · {step.points} dans le sujet officiel · {step.pdfPages} du PDF</p>
                            <dl className="mt-4 space-y-3 leading-7">
                              <div><dt className="inline font-bold text-slate-950">Compétence ciblée : </dt><dd className="inline text-slate-700">{step.skill}</dd></div>
                              <div><dt className="inline font-bold text-slate-950">{index === 0 ? "Pourquoi commencer ici : " : "Pourquoi en second : "}</dt><dd className="inline text-slate-700">{step.reason}</dd></div>
                              <div><dt className="inline font-bold text-slate-950">Erreur à vérifier : </dt><dd className="inline text-slate-700">{step.errorToCheck}</dd></div>
                            </dl>
                            <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-5">
                              <a href={`${item.pdfUrl}#page=${step.pdfStartPage}`} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 ${linkClassName}`}>Sujet officiel, {step.pdfPages} <ExternalLink className="h-4 w-4" aria-hidden="true" /></a>
                              <Link href={item.correctionHref} className={linkClassName}>Corrigé SprintMaths · {item.day}</Link>
                              <Link href={item.methodHref} className={linkClassName}>Méthode</Link>
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  </article>
                ))}
              </div>
              <p className="max-w-4xl text-sm leading-6 text-slate-600">Numéros d’exercice, points et pages relus dans les trois PDF officiels concernés le 2 octobre 2026. Le niveau indiqué n’est ni un barème ni une donnée du ministère. Pour les dix autres chapitres, le tableau ci-dessus donne un point de départ par niveau.</p>
            </div>
          </section>

          <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
            <BookOpenCheck className="h-8 w-8 text-emerald-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">Corrigés 2026 des autres centres</h2>
            <p className="mt-3 max-w-4xl leading-7 text-slate-700">L’index par chapitre ci-dessus conserve sa sélection de 24 exercices Métropole 2024–2026. Pour travailler un sujet complet 2026 d’Antilles-Guyane, d’Amérique du Nord, d’Asie ou des centres étrangers, chaque journée possède maintenant sa correction intégrale.</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {bac2026CorrectionSubjects.map((subject) => (
                <Link key={subject.slug} href={`/annales/bac-maths-2026/${subject.slug}`} className="rounded-xl border border-emerald-200 bg-white p-4 font-bold leading-6 text-emerald-950 hover:border-emerald-400 hover:bg-emerald-50">
                  {subject.center}<br /><span className="text-sm font-semibold">{subject.day} · 4 exercices corrigés</span>
                </Link>
              ))}
            </div>
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
            { href: "https://eduscol.education.gouv.fr/sites/default/files/document/24-matj1me1v1-0pdf-106221.pdf", label: "Sujet officiel 2024 — Jour 1 (24-MATJ1ME1)", description: "PDF de 6 pages relu le 2 octobre 2026 pour la progression de probabilités." },
            { href: "https://eduscol.education.gouv.fr/sites/default/files/document/24-matj2me2v1pdf-106281.pdf", label: "Sujet officiel 2024 — Jour 2 (24-MATJ2ME2)", description: "PDF de 6 pages relu le 2 octobre 2026 pour les progressions de suites et de géométrie." },
            { href: "https://www.education.gouv.fr/sites/default/files/document/baccalaureat-general-2026-mathematiques-jour-2-517817.pdf", label: "Sujet officiel 2026 — Jour 2 (26-MATJ2ME1)", description: "PDF de 7 pages relu le 2 octobre 2026 pour les trois progressions." },
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
