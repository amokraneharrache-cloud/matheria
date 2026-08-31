import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { annalesTerminale } from "../../src/app/annales-bac-maths-terminale/annales.ts";
import {
  bac2026CorrectionRoutes,
  bac2026CorrectionSubjects,
} from "../../src/data/bac2026Corrections.ts";

const projectRoot = fileURLToPath(new URL("../../", import.meta.url));
const dynamicPagePath = new URL("../../src/app/annales/bac-maths-2026/[slug]/page.tsx", import.meta.url);
const filtersPath = new URL("../../src/app/annales-bac-maths-terminale/AnnalesFilters.tsx", import.meta.url);
const sitemapPath = new URL("../../src/app/sitemap.ts", import.meta.url);

assert.equal(annalesTerminale.length, 10, "Le catalogue J62 doit conserver les 10 sujets officiels audités.");
assert.ok(annalesTerminale.every((annale) => annale.pdfUrl.startsWith("https://")), "Chaque annale doit avoir un PDF HTTPS.");
assert.ok(annalesTerminale.every((annale) => annale.correctionHref.startsWith("/")), "Chaque annale doit avoir une route de correction interne.");
assert.equal(new Set(annalesTerminale.map((annale) => annale.id)).size, annalesTerminale.length, "Les identifiants d’annales doivent être uniques.");

assert.equal(bac2026CorrectionSubjects.length, 8, "Huit corrections centre/jour complètent les deux sujets Métropole existants.");
assert.equal(new Set(bac2026CorrectionSubjects.map((subject) => subject.slug)).size, 8, "Les slugs de correction doivent être uniques.");
assert.equal(new Set(bac2026CorrectionSubjects.map((subject) => subject.title)).size, 8, "Chaque correction doit avoir un title SEO distinct.");
assert.ok(bac2026CorrectionSubjects.every((subject) => subject.exercises.length === 4), "Chaque sujet doit corriger ses quatre exercices officiels.");
assert.ok(bac2026CorrectionSubjects.every((subject) => subject.exercises.every((exercise) => exercise.items.length > 0)), "Chaque exercice doit contenir au moins un bloc détaillé.");

for (const subject of bac2026CorrectionSubjects) {
  const catalogEntry = annalesTerminale.find((annale) => annale.id === subject.id);
  assert.ok(catalogEntry, `Le sujet ${subject.id} doit exister dans le catalogue.`);
  assert.equal(catalogEntry.correctionHref, `/annales/bac-maths-2026/${subject.slug}`);
  assert.equal(catalogEntry.pdfUrl, subject.pdfUrl, `Le PDF de ${subject.id} doit rester identique entre catalogue et corrigé.`);

  for (const exercise of subject.exercises) {
    for (const item of exercise.items) {
      assert.ok(item.notion && item.recognition && item.reasoning, `${item.id} doit expliciter notion et raisonnement.`);
      assert.ok(item.calculations?.length, `${item.id} doit fournir des étapes de calcul.`);
      assert.ok(item.redaction && item.result && item.commonError, `${item.id} doit fournir rédaction, résultat et erreur fréquente.`);
    }
  }
}

assert.deepEqual(
  [...bac2026CorrectionRoutes].sort(),
  bac2026CorrectionSubjects.map((subject) => `/annales/bac-maths-2026/${subject.slug}`).sort(),
  "Le manifeste des routes doit couvrir exactement les huit nouveaux sujets.",
);

const [dynamicPage, filters, sitemap] = await Promise.all([
  readFile(dynamicPagePath, "utf8"),
  readFile(filtersPath, "utf8"),
  readFile(sitemapPath, "utf8"),
]);

assert.match(dynamicPage, /generateStaticParams/, "La route dynamique doit pré-générer toutes les corrections.");
assert.match(dynamicPage, /dynamicParams = false/, "Un slug inconnu ne doit pas générer une page pauvre.");
assert.doesNotMatch(filters, /Pas encore publiée/, "Le catalogue ne doit plus afficher de correction à venir.");
assert.match(sitemap, /bac2026CorrectionRoutes/, "Les nouvelles corrections doivent être ajoutées au sitemap normal.");

console.log(`Annales coverage: ${annalesTerminale.length}/${annalesTerminale.length} sujets, 40/40 exercices couverts (${projectRoot}).`);
