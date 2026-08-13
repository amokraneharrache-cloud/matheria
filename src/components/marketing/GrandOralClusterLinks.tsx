import Link from "next/link";

const clusterPages = [
  {
    href: "/grand-oral-maths-2027",
    label: "Grand Oral Maths 2027",
    description: "Comprendre les modalités et construire sa préparation.",
  },
  {
    href: "/sujets-grand-oral-maths",
    label: "50 idées de sujets",
    description: "Trouver une problématique précise reliée au programme.",
  },
  {
    href: "/questions-jury-grand-oral-maths",
    label: "Questions du jury",
    description: "S’entraîner à expliquer, justifier et nuancer son raisonnement.",
  },
] as const;

export function GrandOralClusterLinks({
  currentPath,
  title = "Continuer dans le cluster Grand Oral Maths",
}: {
  currentPath: string;
  title?: string;
}) {
  return (
    <nav aria-label="Ressources Grand Oral Maths" className="rounded-2xl bg-slate-950 p-6 text-white sm:p-8">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-200">
        Grand Oral Maths
      </p>
      <h2 className="mt-3 text-2xl font-bold sm:text-3xl">{title}</h2>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {clusterPages.map((page) => {
          const isCurrent = page.href === currentPath;

          return (
            <Link
              key={page.href}
              href={page.href}
              aria-current={isCurrent ? "page" : undefined}
              className={`rounded-xl border p-5 transition-colors ${
                isCurrent
                  ? "border-blue-300 bg-blue-900"
                  : "border-white/15 bg-white/5 hover:border-blue-300 hover:bg-white/10"
              }`}
            >
              <span className="font-bold">{page.label}</span>
              <span className="mt-2 block text-sm leading-6 text-slate-200">
                {page.description}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

