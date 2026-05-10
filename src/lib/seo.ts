import { absoluteUrl, SITE_NAME } from "@/lib/site";

export type FaqItem = {
  question: string;
  answer: string;
};

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: absoluteUrl("/"),
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: absoluteUrl("/"),
  };
}

type ProductJsonLdOptions = {
  price?: string;
};

export function productJsonLd(path: string, options: ProductJsonLdOptions = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Pack Révision Express SprintMaths",
    description:
      "Pack de révision de mathématiques avec exercices ciblés, programme par chapitre, plan de révision et suivi de progression.",
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    offers: {
      "@type": "Offer",
      price: options.price ?? "39",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: absoluteUrl(path),
    },
  };
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
