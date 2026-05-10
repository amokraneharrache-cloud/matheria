const testimonials: { role: string; quote: string; name?: string }[] = [];

const placeholders = [
  "Élève Terminale — retour en attente",
  "Parent d'élève — retour en attente",
  "Testeur Bac 2026 — retour en attente",
];

export function TestimonialsPlaceholder() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
          Retours utilisateurs
        </p>
        <h2 className="mt-3 text-3xl font-bold text-slate-950">
          Premiers retours en cours de collecte
        </h2>
        <p className="mt-3 max-w-3xl text-slate-700">
          Cette zone est prête pour de vrais témoignages SprintMaths. Aucun avis
          client n&apos;est inventé.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.length > 0
          ? testimonials.map((testimonial) => (
              <article
                key={`${testimonial.role}-${testimonial.name ?? "anonymous"}`}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-slate-700">{testimonial.quote}</p>
                <p className="mt-4 text-sm font-bold text-slate-950">
                  {testimonial.name ?? testimonial.role}
                </p>
              </article>
            ))
          : placeholders.map((placeholder) => (
              <article
                key={placeholder}
                className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5"
              >
                <p className="text-sm font-bold text-slate-500">À venir</p>
                <p className="mt-3 font-semibold text-slate-800">{placeholder}</p>
              </article>
            ))}
      </div>
    </section>
  );
}
