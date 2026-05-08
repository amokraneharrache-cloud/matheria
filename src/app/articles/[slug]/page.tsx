import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { articles, getArticleBySlug } from "@/data/articles";
import { absoluteUrl } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article introuvable",
    };
  }

  const path = `/articles/${article.slug}`;

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: {
      canonical: absoluteUrl(path),
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: absoluteUrl(path),
      type: "article",
      publishedTime: article.publishedAt,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = articles
    .filter((item) => item.slug !== article.slug && item.category === article.category)
    .slice(0, 3);

  return (
    <SeoPageLayout>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Articles", path: "/articles" },
            { name: article.title, path: `/articles/${article.slug}` },
          ]),
        ]}
      />
      <article>
        <header className="bg-gradient-to-b from-blue-50 to-white px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <Link href="/articles" className="text-sm font-bold text-blue-900 hover:underline">
              Articles maths Terminale
            </Link>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-5 text-lg text-slate-700">{article.description}</p>
            <p className="mt-4 text-sm font-semibold text-slate-500">
              Publié le {new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(new Date(article.publishedAt))}
            </p>
          </div>
        </header>

        <div className="px-4 py-14">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="max-w-3xl space-y-10">
              {article.content.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-3xl font-bold text-slate-950">{section.heading}</h2>
                  <div className="mt-5 space-y-4 text-lg leading-8 text-slate-700">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}

              <section>
                <h2 className="text-3xl font-bold text-slate-950">
                  Mettre la méthode en pratique
                </h2>
                <div className="mt-5 space-y-4 text-lg leading-8 text-slate-700">
                  <p>
                    Après avoir lu cet article, l&apos;étape utile consiste à transformer la méthode en gestes d&apos;entraînement. Pour le thème « {article.title} », l&apos;élève peut commencer par une fiche courte, puis faire un exercice guidé et noter les erreurs qui reviennent. Cette boucle simple évite de confondre compréhension immédiate et maîtrise durable.
                  </p>
                  <p>
                    Dans une semaine de révision, il est préférable de mélanger les formats. Une session de questions rapides vérifie les automatismes, tandis qu&apos;un exercice guidé oblige à tenir le raisonnement sur plusieurs étapes. Un entraînement type bac ajoute ensuite la gestion de plusieurs chapitres dans une même séance, avec une note indicative pour repérer les priorités.
                  </p>
                  <p>
                    Le bon rythme dépend du niveau de départ, mais une règle reste efficace : corriger tout de suite, puis refaire une question proche quelques jours plus tard. Si l&apos;erreur porte sur une formule, il faut revoir la fiche méthode. Si l&apos;erreur porte sur le choix de méthode, il faut refaire un exercice guidé en expliquant chaque étape à voix basse ou sur papier.
                  </p>
                  <p>
                    Les liens internes en bas de page permettent aussi de circuler entre les chapitres liés. Par exemple, une difficulté sur les variations renvoie souvent à la dérivée, au tableau de signes ou aux limites. Une difficulté en probabilités peut renvoyer aux arbres pondérés ou à la loi binomiale. Réviser par connexions aide à construire une vision plus solide du programme.
                  </p>
                  <p>
                    Enfin, il faut garder une attente réaliste : une note virtuelle, une fiche méthode ou un diagnostic ne remplacent pas une correction de professeur. Ces outils servent à rendre le travail plus clair, à choisir les prochains chapitres et à installer de meilleurs réflexes. C&apos;est déjà beaucoup lorsque les révisions deviennent régulières et moins dispersées.
                  </p>
                </div>
              </section>

              <section className="rounded-2xl bg-blue-950 p-6 text-white">
                <h2 className="text-2xl font-bold">Travailler ces méthodes dans SprintMaths</h2>
                <p className="mt-3 text-blue-100">
                  Le Mode Bac Terminale propose des exercices guidés, des fiches méthodes et une note virtuelle indicative pour repérer les chapitres à retravailler.
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/bac-terminale-maths"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-bold text-blue-950 hover:bg-blue-50"
                  >
                    Voir le Mode Bac Terminale
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/diagnostic"
                    className="inline-flex items-center justify-center rounded-full border border-blue-200 px-5 py-3 font-bold text-white hover:bg-blue-900"
                  >
                    Faire le diagnostic
                  </Link>
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h2 className="text-xl font-bold text-slate-950">Articles liés</h2>
                <div className="mt-4 space-y-3">
                  {relatedArticles.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/articles/${related.slug}`}
                      className="block rounded-xl border border-slate-200 bg-white p-4 text-sm font-bold text-slate-800 hover:border-blue-200 hover:text-blue-900"
                    >
                      <BookOpen className="mb-2 h-4 w-4 text-blue-800" />
                      {related.title}
                    </Link>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
                <h2 className="text-xl font-bold text-blue-950">Réviser avec un plan</h2>
                <p className="mt-2 text-sm text-blue-900">
                  Commence par un diagnostic, puis cible les chapitres prioritaires avec des sessions courtes.
                </p>
                <Link
                  href="/diagnostic"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-950 hover:underline"
                >
                  Lancer le diagnostic
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </section>
            </aside>
          </div>
        </div>
      </article>
    </SeoPageLayout>
  );
}
