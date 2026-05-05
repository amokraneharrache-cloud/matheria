import type { FaqItem } from "@/lib/seo";

type SeoFaqProps = {
  items: FaqItem[];
};

export function SeoFaq({ items }: SeoFaqProps) {
  return (
    <section className="space-y-5">
      <h2 className="text-3xl font-bold text-slate-950">Questions fréquentes</h2>
      <div className="grid gap-4">
        {items.map((item) => (
          <article
            key={item.question}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h3 className="text-lg font-bold text-slate-950">{item.question}</h3>
            <p className="mt-2 text-slate-700">{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

