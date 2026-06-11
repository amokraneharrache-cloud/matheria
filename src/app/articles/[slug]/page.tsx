import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, Check, ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import { articles, getArticleBySlug, type ArticleCta } from "@/data/articles";
import { absoluteUrl } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

function ArticleCtaButton({ cta, pagePath }: { cta: ArticleCta; pagePath: string }) {
  const isSecondary = cta.style === "secondary";
  const className = isSecondary
    ? "inline-flex items-center justify-center gap-2 rounded-full border border-blue-900 px-5 py-3 font-bold text-blue-900 hover:bg-blue-50"
    : "inline-flex items-center justify-center gap-2 rounded-full bg-blue-900 px-5 py-3 font-bold text-white hover:bg-blue-800";

  return (
    <TrackedLink
      href={cta.href}
      eventName={cta.event}
      eventParams={{
        source_page: pagePath,
        level: "terminale",
        cta_location: cta.location,
      }}
      className={className}
    >
      {cta.label}
      <ArrowRight className="h-4 w-4" />
    </TrackedLink>
  );
}

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

  const pagePath = `/articles/${article.slug}`;
  const isGuide = Boolean(article.faq);
  const relatedArticles = articles
    .filter((item) => item.slug !== article.slug && item.category === article.category)
    .slice(0, 3);

  const jsonLdData: Record<string, unknown>[] = [
    breadcrumbJsonLd([
      { name: "Accueil", path: "/" },
      { name: "Articles", path: "/articles" },
      { name: article.title, path: pagePath },
    ]),
  ];

  if (article.faq && article.faq.length > 0) {
    jsonLdData.push(faqJsonLd(article.faq));
  }

  return (
    <SeoPageLayout urgencySourcePage={pagePath}>
      <JsonLd data={jsonLdData} />
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
              {article.intro && article.intro.length > 0 ? (
                <section className="space-y-4 text-lg leading-8 text-slate-700">
                  {article.intro.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {article.introCta ? (
                    <div className="pt-2">
                      <ArticleCtaButton cta={article.introCta} pagePath={pagePath} />
                    </div>
                  ) : null}
                </section>
              ) : null}

              {article.content.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-3xl font-bold text-slate-950">{section.heading}</h2>
                  <div className="mt-5 space-y-4 text-lg leading-8 text-slate-700">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  {section.plan ? (
                    <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                      {section.plan.caption ? (
                        <p className="bg-blue-900 px-4 py-3 text-sm font-bold uppercase tracking-wide text-white">
                          {section.plan.caption}
                        </p>
                      ) : null}
                      <ul className="divide-y divide-slate-100">
                        {section.plan.days.map((day) => (
                          <li key={day.label} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:gap-4">
                            <span className="shrink-0 font-bold text-blue-900 sm:w-24">{day.label}</span>
                            <span className="text-slate-700">{day.focus}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {section.list ? (
                    <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      {section.list.title ? (
                        <p className="text-base font-bold text-slate-950">{section.list.title}</p>
                      ) : null}
                      <ul className="mt-3 space-y-2 text-slate-700">
                        {section.list.items.map((item) => (
                          <li key={item} className="flex gap-3">
                            {section.list!.variant === "checklist" ? (
                              <Check className="mt-1 h-4 w-4 shrink-0 text-blue-800" />
                            ) : (
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-800" />
                            )}
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {section.internalLinks && section.internalLinks.length > 0 ? (
                    <div className="mt-6 space-y-3">
                      {section.internalLinks.map((link) => {
                        const className =
                          "flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-200";
                        const content = (
                          <>
                            <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-blue-800" />
                            <span>
                              <span className="block font-bold text-blue-900">
                                {link.label}
                              </span>
                              <span className="text-sm text-slate-600">
                                {link.description}
                              </span>
                            </span>
                          </>
                        );

                        return link.cluster ? (
                          <TrackedLink
                            key={link.href}
                            href={link.href}
                            eventName={
                              link.cluster === "limites"
                                ? "click_internal_limites_cluster"
                                : link.cluster === "derivation-convexite"
                                  ? "click_internal_derivation_cluster"
                                  : link.cluster === "logarithme"
                                    ? "click_internal_logarithme_cluster"
                                    : link.cluster === "probabilites"
                                      ? "click_internal_probabilites_cluster"
                                      : "click_internal_suites_cluster"
                            }
                            eventParams={{
                              source_page: pagePath,
                              destination_page: link.href,
                              cluster: link.cluster,
                              level: link.level ?? "terminale",
                            }}
                            className={className}
                          >
                            {content}
                          </TrackedLink>
                        ) : (
                          <Link key={link.href} href={link.href} className={className}>
                            {content}
                          </Link>
                        );
                      })}
                    </div>
                  ) : null}

                  {section.cta ? (
                    <div className="mt-6">
                      <ArticleCtaButton cta={section.cta} pagePath={pagePath} />
                    </div>
                  ) : null}
                </section>
              ))}

              {article.faq && article.faq.length > 0 ? (
                <section>
                  <h2 className="text-3xl font-bold text-slate-950">FAQ</h2>
                  <div className="mt-5 space-y-4">
                    {article.faq.map((item) => (
                      <details
                        key={item.question}
                        className="rounded-2xl border border-slate-200 bg-white p-5"
                      >
                        <summary className="cursor-pointer text-lg font-bold text-slate-950">
                          {item.question}
                        </summary>
                        <p className="mt-3 text-lg leading-8 text-slate-700">{item.answer}</p>
                      </details>
                    ))}
                  </div>
                </section>
              ) : null}

              {article.closingCta ? (
                <section className="rounded-2xl bg-blue-950 p-6 text-white">
                  <h2 className="text-2xl font-bold">Aller plus loin avec SprintMaths</h2>
                  <p className="mt-3 text-blue-100">
                    Le Pack Révision Express regroupe la méthode, les exercices type
                    bac guidés et le suivi de progression pour appliquer ce plan
                    jusqu&apos;à l&apos;épreuve.
                  </p>
                  <div className="mt-5">
                    <ArticleCtaButton cta={article.closingCta} pagePath={pagePath} />
                  </div>
                </section>
              ) : null}

              {article.relatedLinks && article.relatedLinks.length > 0 ? (
                <section className="rounded-2xl border border-slate-200 p-6">
                  <h2 className="text-2xl font-bold text-slate-950">Continuer les révisions</h2>
                  <div className="mt-4 space-y-3">
                    {article.relatedLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 hover:border-blue-200"
                      >
                        <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-blue-800" />
                        <span>
                          <span className="block font-bold text-blue-900">{link.label}</span>
                          <span className="text-sm text-slate-600">{link.description}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}

              {isGuide ? null : (
              <>
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
                    Enfin, il faut garder une attente réaliste : une note indicative /20, une fiche méthode ou un diagnostic ne remplacent pas une correction de professeur. Ces outils servent à rendre le travail plus clair, à choisir les prochains chapitres et à installer de meilleurs réflexes. C&apos;est déjà beaucoup lorsque les révisions deviennent régulières et moins dispersées.
                  </p>
                </div>
              </section>

              <section className="rounded-2xl bg-blue-950 p-6 text-white">
                <h2 className="text-2xl font-bold">Travailler ces méthodes dans SprintMaths</h2>
                <p className="mt-3 text-blue-100">
                  Le planning gratuit aide à organiser les chapitres, puis les
                  exercices type bac guidés permettent d&apos;appliquer la méthode
                  étape par étape.
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <TrackedLink
                    href="/planning-revision-bac-maths"
                    eventName="click_lead_magnet_planning"
                    eventParams={{
                      source_page: pagePath,
                      lead_magnet: "planning_bac_maths_2027",
                      level: "terminale",
                      cta_location: "article_planning_cta",
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-bold text-blue-950 hover:bg-blue-50"
                  >
                    Recevoir le planning Bac Maths 2027
                    <ArrowRight className="h-4 w-4" />
                  </TrackedLink>
                  <TrackedLink
                    href="/exercices-type-bac-maths-terminale"
                    eventName="click_exercises"
                    eventParams={{
                      source_page: pagePath,
                      level: "terminale",
                      cta_location: "article_typebac_cta",
                    }}
                    className="inline-flex items-center justify-center rounded-full border border-blue-200 px-5 py-3 font-bold text-white hover:bg-blue-900"
                  >
                    Essayer un exercice type bac guidé
                  </TrackedLink>
                </div>
              </section>
              </>
              )}
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
                  Commence par un planning clair, puis cible les chapitres avec
                  des exercices guidés.
                </p>
                <TrackedLink
                  href="/planning-revision-bac-maths"
                  eventName="click_lead_magnet_planning"
                  eventParams={{
                    source_page: pagePath,
                    lead_magnet: "planning_bac_maths_2027",
                    level: "terminale",
                    cta_location: "article_sidebar_planning",
                  }}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-950 hover:underline"
                >
                  Recevoir le planning
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
              </section>
            </aside>
          </div>
        </div>
      </article>
    </SeoPageLayout>
  );
}
