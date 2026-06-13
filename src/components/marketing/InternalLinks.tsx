import Link from "next/link";
import { TrackedLink } from "@/components/tracking/TrackedLink";

type InternalLinksProps = {
  currentPath?: string;
  excludeHrefs?: string[];
  title?: string;
};

const links = [
  { href: "/planning-revision-bac-maths", label: "Planning Bac Maths 30 jours" },
  {
    href: "/exercices-type-bac-maths-terminale",
    label: "Exercices type bac guidés",
  },
  {
    href: "/sujets-type-bac-maths-terminale",
    label: "Sujets type bac corrigés",
  },
  { href: "/bac-maths-2027", label: "Révision Bac Maths 2027" },
  { href: "/bac-terminale-maths", label: "Réviser le bac Terminale" },
  { href: "/programme-maths-terminale", label: "Programme maths Terminale" },
  { href: "/methodes-maths-terminale", label: "Méthodes Terminale" },
  { href: "/exercices-maths-terminale", label: "Exercices Terminale" },
  { href: "/articles", label: "Articles Terminale" },
  { href: "/bac-premiere-maths", label: "Réviser le bac Première" },
  { href: "/programme-maths-premiere", label: "Programme maths Première" },
  { href: "/brevet-maths", label: "Réviser le brevet" },
  { href: "/programme-maths-brevet", label: "Programme maths Brevet" },
];

export function InternalLinks({
  currentPath,
  excludeHrefs = [],
  title = "Continuer les révisions par objectif",
}: InternalLinksProps) {
  const excludedHrefSet = new Set(excludeHrefs);

  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <h2 className="text-2xl font-bold text-slate-950">{title}</h2>
      <div className="mt-5 flex flex-wrap gap-3">
        {links
          .filter((link) => link.href !== currentPath && !excludedHrefSet.has(link.href))
          .map((link) => {
            const className =
              "rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-200 hover:text-blue-900";

            if (link.href === "/sujets-type-bac-maths-terminale") {
              return (
                <TrackedLink
                  key={link.href}
                  href={link.href}
                  eventName="click_internal_subjects_typebac"
                  eventParams={{
                    source_page: currentPath,
                    destination_page: link.href,
                    level: "terminale",
                    intent: "sujets_type_bac",
                    cta_location: "internal_links_subjects_typebac",
                  }}
                  className={className}
                >
                  {link.label}
                </TrackedLink>
              );
            }

            return (
              <Link key={link.href} href={link.href} className={className}>
                {link.label}
              </Link>
            );
          })}
      </div>
    </section>
  );
}
