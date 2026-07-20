#!/usr/bin/env node
// Smoke test de production SprintMaths : vérifie en lecture seule que le site et
// ses dépendances critiques répondent encore.
//
// Strictement non destructif : aucune soumission de formulaire, aucun lead créé,
// aucun email envoyé, aucun paiement. Uniquement des GET.
//
// Usage :
//   HEALTHCHECK_TOKEN=... npm run qa:prod
//   PROD_BASE_URL=https://staging.example.com HEALTHCHECK_TOKEN=... npm run qa:prod
//
// Le token n'est jamais affiché ni journalisé.

const BASE_URL = (process.env.PROD_BASE_URL || "https://www.sprintmaths.com").replace(/\/+$/, "");
const HEALTHCHECK_TOKEN = process.env.HEALTHCHECK_TOKEN || "";
const REQUEST_TIMEOUT_MS = Number(process.env.SMOKE_TIMEOUT_MS) || 15000;
// Seuil volontairement large : on veut détecter une prod à genoux, pas une latence réseau.
const SLOW_RESPONSE_MS = Number(process.env.SMOKE_SLOW_MS) || 5000;

const results = [];
let deploymentInfo = null;

function record({ name, ok, critical = true, detail = "", durationMs = null }) {
  results.push({ name, ok, critical, detail, durationMs });
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const startedAt = Date.now();

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      redirect: "follow",
      headers: {
        // UA explicite : permet d'exclure ces hits des analyses d'audience.
        "User-Agent": "SprintMaths-SmokeTest/1.0",
        ...(options.headers || {}),
      },
    });
    const body = await response.text();
    return { response, body, durationMs: Date.now() - startedAt };
  } finally {
    clearTimeout(timer);
  }
}

// Détecte l'overlay d'erreur Next.js / une page d'erreur serveur rendue en HTML.
function hasErrorOverlay(html) {
  return (
    html.includes("nextjs-portal") ||
    html.includes("__next_error__") ||
    /Application error: a (client|server)-side exception/i.test(html) ||
    /Internal Server Error/i.test(html)
  );
}

async function checkPage({ path, name, expectedStatus = 200, mustContain = [], mustNotContain = [] }) {
  const url = `${BASE_URL}${path}`;

  try {
    const { response, body, durationMs } = await fetchWithTimeout(url);

    if (response.status !== expectedStatus) {
      record({
        name,
        ok: false,
        detail: `statut ${response.status} (attendu ${expectedStatus})`,
        durationMs,
      });
      return;
    }

    if (!body || body.trim().length === 0) {
      record({ name, ok: false, detail: "corps de réponse vide", durationMs });
      return;
    }

    if (hasErrorOverlay(body)) {
      record({ name, ok: false, detail: "page d'erreur / overlay Next.js détecté", durationMs });
      return;
    }

    const missing = mustContain.filter((needle) => !body.includes(needle));
    if (missing.length > 0) {
      record({
        name,
        ok: false,
        detail: `contenu attendu absent : ${missing.map((m) => `"${m}"`).join(", ")}`,
        durationMs,
      });
      return;
    }

    const forbidden = mustNotContain.filter((needle) => body.includes(needle));
    if (forbidden.length > 0) {
      record({
        name,
        ok: false,
        detail: `contenu interdit présent : ${forbidden.map((m) => `"${m}"`).join(", ")}`,
        durationMs,
      });
      return;
    }

    const slow = durationMs > SLOW_RESPONSE_MS;
    record({
      name,
      ok: true,
      // La lenteur est signalée mais ne fait pas échouer le run (seuil non bloquant).
      critical: false,
      detail: slow ? `⚠ lent (> ${SLOW_RESPONSE_MS} ms)` : "",
      durationMs,
    });
  } catch (error) {
    const reason = error?.name === "AbortError" ? `timeout > ${REQUEST_TIMEOUT_MS} ms` : "requête échouée";
    record({ name, ok: false, detail: reason });
  }
}

async function checkHealth() {
  const name = "GET /api/health (authentifié)";

  if (!HEALTHCHECK_TOKEN) {
    record({
      name,
      ok: false,
      detail: "HEALTHCHECK_TOKEN absent de l'environnement — impossible d'interroger le healthcheck",
    });
    return;
  }

  try {
    const { response, body, durationMs } = await fetchWithTimeout(`${BASE_URL}/api/health`, {
      headers: { Authorization: `Bearer ${HEALTHCHECK_TOKEN}` },
    });

    if (response.status === 401) {
      record({ name, ok: false, detail: "401 — le token ne correspond pas à celui de la prod", durationMs });
      return;
    }

    let payload;
    try {
      payload = JSON.parse(body);
    } catch {
      record({ name, ok: false, detail: `réponse non JSON (statut ${response.status})`, durationMs });
      return;
    }

    deploymentInfo = payload.deployment || null;

    if (response.status === 503 || payload.checks?.database !== "ok") {
      record({
        name,
        ok: false,
        detail: `status=${payload.status} database=${payload.checks?.database ?? "inconnu"}`,
        durationMs,
      });
      return;
    }

    if (response.status !== 200) {
      record({ name, ok: false, detail: `statut inattendu ${response.status}`, durationMs });
      return;
    }

    // email=missing => dégradé : signalé, non bloquant (le lead reste enregistré).
    const emailStatus = payload.checks?.email ?? "inconnu";
    record({
      name,
      ok: true,
      critical: false,
      detail: `status=${payload.status} database=ok email=${emailStatus}`,
      durationMs,
    });

    if (emailStatus !== "configured") {
      record({
        name: "Configuration Resend",
        ok: false,
        critical: false,
        detail: `email=${emailStatus} — les emails de planning ne partent probablement plus`,
      });
    }
  } catch (error) {
    const reason = error?.name === "AbortError" ? `timeout > ${REQUEST_TIMEOUT_MS} ms` : "requête échouée";
    record({ name, ok: false, detail: reason });
  }
}

async function main() {
  console.log(`\nSmoke test production — ${BASE_URL}`);
  console.log(`Démarré à ${new Date().toISOString()}\n`);

  await checkHealth();

  await checkPage({ path: "/", name: "GET /" });
  await checkPage({
    path: "/planning-revision-bac-maths",
    name: "GET /planning-revision-bac-maths",
    mustContain: ["Planning de révision Bac Maths 2027"],
    // La page ne doit plus porter d'offre commerciale périmée.
    mustNotContain: ["BAC2026", "29 €"],
  });
  await checkPage({
    path: "/sujets-type-bac-maths-terminale",
    name: "GET /sujets-type-bac-maths-terminale",
    mustContain: ["corrigé guidé"],
    mustNotContain: ["BAC2026", "29 €"],
  });
  await checkPage({ path: "/diagnostic", name: "GET /diagnostic" });
  await checkPage({ path: "/sitemap.xml", name: "GET /sitemap.xml", mustContain: ["<urlset"] });
  await checkPage({ path: "/robots.txt", name: "GET /robots.txt", mustContain: ["User-Agent"] });

  console.log("Résultats :\n");
  for (const { name, ok, critical, detail, durationMs } of results) {
    const icon = ok ? "✔" : critical ? "✖" : "⚠";
    const timing = durationMs === null ? "" : ` (${durationMs} ms)`;
    const suffix = detail ? ` — ${detail}` : "";
    console.log(`  ${icon} ${name}${timing}${suffix}`);
  }

  if (deploymentInfo) {
    console.log(
      `\nDéploiement servi : commit ${deploymentInfo.commit ?? "inconnu"} — environnement ${deploymentInfo.environment ?? "inconnu"}`,
    );
  } else {
    console.log("\nDéploiement servi : inconnu (healthcheck injoignable ou non authentifié)");
  }

  const failures = results.filter((result) => !result.ok && result.critical);
  const warnings = results.filter((result) => !result.ok && !result.critical);

  console.log(
    `\n${results.filter((r) => r.ok).length}/${results.length} checks OK — ${failures.length} échec(s) critique(s), ${warnings.length} avertissement(s).\n`,
  );

  if (failures.length > 0) {
    console.error("Smoke test EN ÉCHEC :");
    for (const failure of failures) {
      console.error(`  - ${failure.name} : ${failure.detail}`);
    }
    console.error("");
    process.exitCode = 1;
    return;
  }

  console.log("Smoke test OK.\n");
}

main().catch((error) => {
  // Jamais de stack brute : elle pourrait contenir une URL ou un en-tête.
  console.error(`Smoke test interrompu : ${error?.message ?? "erreur inconnue"}`);
  process.exitCode = 1;
});
