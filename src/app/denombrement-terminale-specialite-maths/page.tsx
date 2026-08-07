import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";
import {
  ChapterHero,
  ChapterInternalLinks,
} from "@/components/marketing/ChapterSeoPage";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import {
  ChecklistBlock,
  CorrectedExerciseList,
  FrequentMistakesBlock,
  ResourceTable,
  ResourceToc,
  type CorrectedExercise,
} from "@/components/marketing/J41SeoBlocks";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/seo";

const pagePath = "/denombrement-terminale-specialite-maths";
const title = "Dénombrement Terminale : méthodes et exercices corrigés";
const description =
  "Comprends les méthodes de dénombrement en Terminale : permutations, combinaisons, coefficients binomiaux et exercices corrigés pas à pas.";

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

const decisionRows = [
  {
    key: "addition",
    cells: [
      "Je répartis les possibilités en catégories incompatibles.",
      "Un résultat peut-il appartenir à deux catégories ?",
      "Principe additif : additionner les effectifs des cas disjoints.",
    ],
  },
  {
    key: "multiplication",
    cells: [
      "Je fais plusieurs choix successifs.",
      "Combien de possibilités restent à chaque étape ?",
      "Principe multiplicatif : multiplier le nombre de choix de chaque étape.",
    ],
  },
  {
    key: "permutation",
    cells: [
      "J’ordonne tous les objets distincts.",
      "Deux ordres différents comptent-ils comme deux résultats ?",
      "Permutation de n objets : n!.",
    ],
  },
  {
    key: "arrangement",
    cells: [
      "Je choisis puis j’ordonne k objets distincts parmi n.",
      "L’ordre intervient-il et les répétitions sont-elles interdites ?",
      "Produit n(n−1)…(n−k+1).",
    ],
  },
  {
    key: "combinaison",
    cells: [
      "Je choisis k objets parmi n sans tenir compte de l’ordre.",
      "Le groupe {A, B} est-il le même que {B, A} ?",
      "Combinaison : C(n,k).",
    ],
  },
  {
    key: "parties",
    cells: [
      "Je forme un sous-ensemble de taille quelconque.",
      "Pour chaque élément, ai-je seulement le choix de le prendre ou non ?",
      "Nombre de parties d’un ensemble à n éléments : 2ⁿ.",
    ],
  },
] as const;

const exercises: CorrectedExercise[] = [
  {
    label: "Exercice 1 — choix simples",
    title: "Répartir les cas avant de compter",
    statement:
      "Une médiathèque propose 4 romans ou 3 bandes dessinées. Combien de livres différents peut-on choisir si l’on n’en prend qu’un ?",
    trap: "Additionner des catégories qui se chevauchent ferait compter certains livres deux fois.",
    method:
      "Les deux catégories sont incompatibles : un livre de la liste est classé ici soit comme roman, soit comme bande dessinée.",
    calculations: ["4 + 3 = 7"],
    answer: "On peut choisir 7 livres différents.",
    why: "On choisit dans un cas ou dans l’autre ; le principe additif est donc adapté.",
  },
  {
    label: "Exercice 2 — principe multiplicatif",
    title: "Construire une tenue",
    statement:
      "On dispose de 4 hauts, 3 pantalons et 2 paires de chaussures. Combien de tenues composées d’un article de chaque type peut-on former ?",
    trap: "Additionner 4, 3 et 2 alors que les choix doivent être réalisés successivement.",
    method:
      "Pour chaque haut, 3 pantalons sont possibles et, pour chaque couple obtenu, 2 paires de chaussures restent possibles.",
    calculations: ["4 × 3 × 2 = 24"],
    answer: "On peut former 24 tenues.",
    why: "La tenue exige un premier choix et un deuxième et un troisième : on multiplie.",
  },
  {
    label: "Exercice 3 — permutation",
    title: "Ordonner cinq présentations",
    statement:
      "Cinq élèves distincts passent successivement à l’oral. Combien d’ordres de passage sont possibles ?",
    trap: "Utiliser 5 choix à chaque place autoriserait qu’un même élève passe plusieurs fois.",
    method:
      "On ordonne les cinq élèves : 5 choix pour la première place, puis 4, puis 3, puis 2, puis 1.",
    calculations: ["5! = 5 × 4 × 3 × 2 × 1", "5! = 120"],
    answer: "Il existe 120 ordres de passage.",
    why: "Tous les objets sont distincts, tous sont utilisés et l’ordre compte : c’est une permutation.",
  },
  {
    label: "Exercice 4 — combinaison",
    title: "Choisir trois délégués",
    statement:
      "On choisit 3 délégués parmi 8 élèves, sans fonction particulière. Combien de groupes sont possibles ?",
    trap: "Compter séparément les ordres A-B-C, B-A-C, etc., alors qu’ils décrivent le même groupe.",
    method:
      "Il faut choisir 3 personnes parmi 8 sans les ordonner : on utilise le coefficient binomial C(8,3).",
    calculations: ["C(8,3) = (8 × 7 × 6) / (3 × 2 × 1)", "C(8,3) = 56"],
    answer: "Il existe 56 groupes de trois délégués.",
    why: "Aucune fonction ne distingue les trois personnes ; seul le sous-ensemble choisi compte.",
  },
  {
    label: "Exercice 5 — méthodes combinées",
    title: "Former un bureau",
    statement:
      "Parmi 10 candidats, on choisit un président puis deux assesseurs de même statut. Combien de bureaux sont possibles ?",
    trap: "Ordonner les deux assesseurs entre eux les compterait deux fois.",
    method:
      "On choisit d’abord le président, puis un groupe non ordonné de 2 assesseurs parmi les 9 personnes restantes.",
    calculations: ["10 × C(9,2)", "10 × 36 = 360"],
    answer: "On peut former 360 bureaux.",
    why: "Le rôle de président rend le premier choix distinct ; les deux assesseurs, eux, forment une combinaison.",
  },
  {
    label: "Exercice 6 — contexte probabiliste",
    title: "Choisir deux boules simultanément",
    statement:
      "Une urne contient 5 boules rouges et 3 bleues. On en choisit 2 simultanément. Quelle est la probabilité d’obtenir exactement une boule de chaque couleur ?",
    trap: "Traiter le tirage simultané comme une liste ordonnée et compter rouge-bleu puis bleu-rouge séparément.",
    method:
      "Les couples de boules sont équiprobables et non ordonnés. On dénombre tous les couples, puis les couples favorables.",
    calculations: [
      "Nombre total : C(8,2) = 28",
      "Nombre favorable : C(5,1) × C(3,1) = 15",
      "P(exactement une de chaque couleur) = 15/28 ≈ 0,536",
    ],
    answer:
      "La probabilité d’obtenir une boule de chaque couleur est 15/28, soit environ 53,6 %.",
    why: "Le dénombrement transforme la probabilité en rapport entre cas favorables et cas possibles équiprobables.",
  },
];

const checklist = [
  "J’ai décrit précisément ce que je compte.",
  "J’ai vérifié si les catégories sont disjointes avant d’additionner.",
  "J’ai repéré les choix successifs avant de multiplier.",
  "J’ai décidé si l’ordre change ou non le résultat.",
  "J’ai vérifié si une répétition est autorisée.",
  "J’ai justifié l’usage de n! ou de C(n,k).",
  "J’ai recherché un éventuel double comptage.",
  "J’ai relu la réponse dans le contexte de la question.",
];

const mistakes = [
  "Compter deux fois le même cas parce que deux descriptions représentent le même objet.",
  "Oublier un cas parce que les catégories ne couvrent pas toutes les possibilités.",
  "Confondre une sélection sans ordre et une liste ordonnée.",
  "Utiliser C(n,k) alors que les rôles ou les positions distinguent les éléments.",
  "Écrire n! dès qu’un entier n apparaît, sans identifier une permutation.",
  "Multiplier des effectifs alors que les situations sont des cas alternatifs.",
];

const faqItems: FaqItem[] = [
  {
    question: "Comment savoir s’il faut additionner ou multiplier ?",
    answer:
      "On additionne des cas alternatifs et incompatibles. On multiplie lorsque le résultat final exige plusieurs choix successifs. Les mots « ou » et « puis » donnent un indice, mais il faut toujours vérifier la structure réelle du problème.",
  },
  {
    question: "Quelle différence entre une permutation et une combinaison ?",
    answer:
      "Une permutation ordonne tous les objets distincts, donc l’ordre compte. Une combinaison choisit k objets parmi n sans ordre : choisir A puis B forme le même groupe que choisir B puis A.",
  },
  {
    question: "Pourquoi 0! vaut-il 1 ?",
    answer:
      "Il existe exactement une façon d’ordonner zéro objet : ne rien placer. Cette convention rend aussi cohérentes les formules n! = n × (n−1)! et C(n,0) = 1.",
  },
  {
    question: "La relation de Pascal est-elle au programme de Terminale ?",
    answer:
      "Oui. Le programme officiel de Terminale spécialité comprend la symétrie des coefficients binomiaux ainsi que la relation et le triangle de Pascal.",
  },
  {
    question: "Le dénombrement est-il évalué à l’écrit de spécialité du Bac 2027 ?",
    answer:
      "Oui, il peut être évalué. Depuis la session 2024, l’épreuve porte sur l’ensemble du programme de Terminale en vigueur, qui comprend la combinatoire et le dénombrement. Cela ne permet pas de garantir qu’un sujet précis en contiendra.",
  },
];

const internalLinks = [
  {
    href: "/articles/probabilites-loi-binomiale-terminale",
    label: "Utiliser les coefficients dans la loi binomiale",
  },
  {
    href: "/methodes-maths-terminale/probabilites-conditionnelles",
    label: "Revoir les probabilités conditionnelles",
  },
  {
    href: "/exercices-maths-terminale/probabilites",
    label: "Faire des exercices de probabilités",
  },
  {
    href: "/python-bac-maths-terminale",
    label: "Relier dénombrement et algorithmes Python",
  },
  {
    href: "/quiz-maths-terminale-specialite",
    label: "Tester les automatismes de Terminale",
  },
  {
    href: "/programme-maths-terminale",
    label: "Consulter le programme de Terminale",
  },
];

export default function DenombrementTerminalePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Méthodes maths Terminale", path: "/methodes-maths-terminale" },
            { name: "Dénombrement", path: pagePath },
          ]),
        ]}
      />

      <ChapterHero
        eyebrow="Terminale spécialité — combinatoire et dénombrement"
        title="Combinatoire et dénombrement en Terminale spécialité maths"
        description={
          <>
            La vraie difficulté n&apos;est pas de calculer : c&apos;est de répondre à
            deux questions avant tout calcul. <strong>Que dois-je compter ?</strong>{" "}
            Et <strong>dans quel ordre ?</strong>
          </>
        }
        secondaryDescription="Utilise d’abord le tableau de décision, puis justifie la méthode choisie avec les six exercices corrigés."
        ctas={[]}
      />

      <ResourceToc
        label="Sommaire dénombrement Terminale"
        items={[
          { href: "#decision", label: "Tableau de décision" },
          { href: "#principes", label: "Additionner ou multiplier" },
          { href: "#factorielle", label: "Factorielle et permutations" },
          { href: "#combinaisons", label: "Combinaisons" },
          { href: "#parties", label: "Parties d’un ensemble" },
          { href: "#exercices", label: "6 exercices corrigés" },
        ]}
      />

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-14">
          <aside className="rounded-2xl border border-amber-200 bg-amber-50 p-6 leading-7 text-amber-950">
            <h2 className="text-xl font-bold">Périmètre officiel vérifié pour le Bac 2027</h2>
            <p className="mt-3">
              Le programme annuel en vigueur comprend les principes additif et
              multiplicatif, les parties d&apos;un ensemble, les permutations, les
              combinaisons, la symétrie et la relation de Pascal. Depuis la session
              2024, l&apos;épreuve de spécialité porte sur le programme de Terminale en
              vigueur : le dénombrement est donc évaluable à l&apos;écrit du Bac 2027,
              sans qu&apos;un chapitre précis puisse être garanti dans un sujet.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm font-bold">
              <a
                href="https://www.education.gouv.fr/sites/default/files/document/Programme%20de%20sp%C3%A9cialit%C3%A9%20de%20math%C3%A9matiques%20de%20terminale%20g%C3%A9n%C3%A9rale-250863.pdf"
                target="_blank"
                rel="noreferrer"
                className="text-blue-900 underline"
              >
                Programme officiel de Terminale
              </a>
              <a
                href="https://www.education.gouv.fr/bo/2023/Hebdo36/MENE2323020N"
                target="_blank"
                rel="noreferrer"
                className="text-blue-900 underline"
              >
                Programme de l’épreuve
              </a>
            </div>
          </aside>

          <section id="decision" className="scroll-mt-24">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
              Le réflexe central
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950">
              Quelle méthode de dénombrement utiliser ?
            </h2>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
              Décris d&apos;abord l&apos;objet final : une catégorie, une suite de
              choix, un ordre ou un groupe. La formule vient seulement après.
            </p>
            <div className="mt-7">
              <ResourceTable
                prominent
                caption="Situation → question → méthode"
                headers={["Situation", "Question à se poser", "Méthode"]}
                rows={[...decisionRows]}
              />
            </div>
          </section>

          <section id="principes" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-slate-950">
              Principes additif et multiplicatif
            </h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-950">Quand additionner ?</h3>
                <p className="mt-3 leading-7 text-slate-700">
                  Si un résultat appartient à exactement un cas parmi plusieurs cas
                  incompatibles, l&apos;effectif total est la somme des effectifs. Par
                  exemple, choisir un dessert parmi 4 fruits ou 3 yaourts donne 4 + 3
                  = 7 choix.
                </p>
                <p className="mt-3 leading-7 text-red-900">
                  Si les catégories se chevauchent, il faut d&apos;abord retirer ou
                  traiter l&apos;intersection pour éviter un double comptage.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-950">Quand multiplier ?</h3>
                <p className="mt-3 leading-7 text-slate-700">
                  Si la construction exige plusieurs étapes et si le nombre de choix à
                  chaque étape est fixé indépendamment des choix précédents, on
                  multiplie ces nombres. Sinon, on sépare les cas ou on utilise un
                  arbre. Un code de 3 lettres choisies parmi 26 avec répétition
                  autorisée donne 26³ codes.
                </p>
                <p className="mt-3 leading-7 text-blue-950">
                  Sans répétition, les choix diminuent : 26 × 25 × 24.
                </p>
              </article>
            </div>
          </section>

          <section id="factorielle" className="scroll-mt-24 grid gap-8 lg:grid-cols-[0.72fr_1fr]">
            <div>
              <BookOpen className="h-7 w-7 text-blue-800" aria-hidden="true" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Factorielle n! et permutations
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                Pour n ≥ 1, <strong>n! = n × (n−1) × … × 2 × 1</strong>. Par
                exemple, 4! = 24. La convention <strong>0! = 1</strong> traduit le
                fait qu&apos;il existe une seule façon d&apos;ordonner aucun objet : ne
                rien placer.
              </p>
              <p>
                Ordonner n objets distincts utilise tous les objets et donne n!
                permutations. Si l&apos;on remplit seulement k positions sans répétition,
                on obtient n(n−1)…(n−k+1) listes ordonnées.
              </p>
            </div>
          </section>

          <section id="combinaisons" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-slate-950">
              Choisir k éléments parmi n : coefficients binomiaux
            </h2>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
              Pour n∈ℕ et k∈{`{0, …, n}`}, C(n,k) compte les parties à k éléments
              d&apos;un ensemble à n éléments. L&apos;ordre ne compte pas : le groupe
              {"{A, B}"} est identique au groupe {"{B, A}"}.
            </p>
            <div className="mt-7">
              <ResourceTable
                caption="Formules utiles et sens combinatoire"
                headers={["Propriété", "Écriture", "Interprétation"]}
                rows={[
                  {
                    key: "formule",
                    cells: [
                      "Calcul direct",
                      <span key="formula" className="font-mono">C(n,k) = n! / (k!(n−k)!)</span>,
                      "Choisir k objets sans les ordonner.",
                    ],
                  },
                  {
                    key: "symetrie",
                    cells: [
                      "Symétrie",
                      <span key="formula" className="font-mono">C(n,k) = C(n,n−k)</span>,
                      "Choisir les k objets gardés revient à choisir les n−k objets écartés.",
                    ],
                  },
                  {
                    key: "pascal",
                    cells: [
                      "Relation de Pascal",
                      <span key="formula" className="font-mono">C(n,k) = C(n−1,k−1) + C(n−1,k)</span>,
                      "Pour 1≤k≤n−1, on sépare les groupes qui contiennent un élément fixé de ceux qui ne le contiennent pas.",
                    ],
                  },
                  {
                    key: "binomiale",
                    cells: [
                      "Lien avec la loi binomiale",
                      <span key="formula" className="font-mono">P(X=k) = C(n,k)pᵏ(1−p)ⁿ⁻ᵏ</span>,
                      "C(n,k) compte les positions possibles des k succès.",
                    ],
                  },
                ]}
              />
            </div>
          </section>

          <section id="parties" className="scroll-mt-24 rounded-2xl bg-slate-950 p-6 text-white sm:p-8">
            <h2 className="text-3xl font-bold">Parties d’un ensemble</h2>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-200">
              Une partie est un sous-ensemble de taille quelconque, y compris
              l&apos;ensemble vide et l&apos;ensemble entier. Pour chacun des n
              éléments, deux choix sont possibles : le prendre ou ne pas le prendre.
              Il y a donc 2ⁿ parties. Avec 5 garnitures facultatives, on peut composer
              2⁵ = 32 sélections différentes.
            </p>
          </section>

          <CorrectedExerciseList
            heading="Six exercices corrigés progressifs"
            exercises={exercises}
          />

          <FrequentMistakesBlock items={mistakes} />

          <ChecklistBlock
            heading="Avant de calculer, je vérifie…"
            items={checklist}
            printLabel="Imprimer la checklist dénombrement"
          />

          <ChapterInternalLinks
            title="Poursuivre avec les chapitres liés"
            links={internalLinks}
            variant="cards"
          />

          <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
            <CheckCircle2 className="h-7 w-7 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-bold text-slate-950">
              Le test final avant d’écrire une formule
            </h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-700">
              Si échanger deux éléments change le résultat, l&apos;ordre compte. Si
              l&apos;échange ne change rien, cherche plutôt une combinaison. Cette
              question évite l&apos;erreur la plus fréquente du chapitre.
            </p>
            <Link
              href="/articles/probabilites-loi-binomiale-terminale"
              className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-blue-900 px-5 py-3 font-bold text-white hover:bg-blue-800"
            >
              Appliquer le dénombrement à la loi binomiale
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </section>

          <FaqAccordion items={faqItems} sourcePage={pagePath} />
        </div>
      </section>
    </SeoPageLayout>
  );
}
