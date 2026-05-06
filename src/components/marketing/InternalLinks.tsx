import Link from "next/link";

type InternalLinksProps = {
  currentPath?: string;
  title?: string;
};

const links = [
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
  title = "Continuer les révisions par objectif",
}: InternalLinksProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <h2 className="text-2xl font-bold text-slate-950">{title}</h2>
      <div className="mt-5 flex flex-wrap gap-3">
        {links
          .filter((link) => link.href !== currentPath)
          .map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-200 hover:text-blue-900"
            >
              {link.label}
            </Link>
          ))}
      </div>
    </section>
  );
}
