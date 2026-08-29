import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import sharp from "sharp";

const ROOT = path.resolve("docs/social/j60");
const OUTPUT = path.join(ROOT, "output");
const FRAME_ROOT = path.join(ROOT, ".frames");
const WIDTH = 1080;
const HEIGHT = 1920;

const COLORS = {
  navy: "#0b173f",
  blue: "#1e3a8a",
  blueLight: "#274ba8",
  amber: "#f59e0b",
  white: "#ffffff",
  pale: "#dbeafe",
  muted: "#a9b9df",
  green: "#34d399",
  red: "#fb7185",
};

const videos = [
  {
    id: "f01-rentree-terminale-3-actions",
    frames: [
      {
        duration: 2.6,
        kicker: "RENTRÉE 2026",
        title: ["Tu rentres en", "Terminale spé maths ?"],
        accentLine: 1,
        footer: "3 actions avant septembre",
      },
      {
        duration: 2.7,
        kicker: "LE PIÈGE",
        title: ["Ne révise surtout pas", "tout le programme."],
        accentLine: 1,
        body: ["Tu vas perdre du temps."],
      },
      {
        duration: 5.2,
        number: "1",
        kicker: "REPRENDS LES BASES",
        title: ["Celles qui reviennent", "dès septembre"],
        accentLine: 1,
        body: ["Calcul  •  dérivation", "Suites  •  probabilités"],
      },
      {
        duration: 5.5,
        number: "2",
        kicker: "TESTE-TOI",
        title: ["Sans regarder", "ton cours"],
        accentLine: 1,
        body: ["Un exercice court vaut mieux", "que 40 pages relues."],
      },
      {
        duration: 5.5,
        number: "3",
        kicker: "PRIORISE",
        title: ["Choisis 3 points", "vraiment faibles"],
        accentLine: 1,
        body: ["Commence par celui", "qui bloque le reste."],
      },
      {
        duration: 6,
        kicker: "RESSOURCE GRATUITE",
        title: ["Ton planning", "30 jours est prêt."],
        accentLine: 1,
        body: ["SprintMaths  •  lien en bio"],
        cta: "Aucune vente. Un plan clair pour commencer.",
      },
    ],
  },
  {
    id: "a01-evolutions-20",
    frames: [
      {
        duration: 2.8,
        kicker: "QUESTION FLASH",
        title: ["−20 % puis +20 %", "Tu reviens au départ ?"],
        accentLine: 0,
      },
      {
        duration: 3,
        kicker: "10 SECONDES",
        formula: ["100 €  →  −20 %", "→  +20 %  →  ?"],
        body: ["Calcule avant la réponse."],
      },
      {
        duration: 2.7,
        kicker: "RÉPONSE",
        giant: "NON",
        body: ["Le prix final est 96 €."],
      },
      {
        duration: 5,
        kicker: "LE CALCUL",
        formula: ["100 × 0,8 = 80", "80 × 1,2 = 96"],
      },
      {
        duration: 4.7,
        kicker: "COEFFICIENT GLOBAL",
        formula: ["0,8 × 1,2 = 0,96"],
        giant: "−4 %",
      },
      {
        duration: 3.8,
        kicker: "À RETENIR",
        title: ["Les coefficients", "se multiplient."],
        accentLine: 1,
        cta: "Sauvegarde ce piège.",
      },
    ],
  },
  {
    id: "b01-carre-oppose",
    frames: [
      {
        duration: 2.8,
        kicker: "ERREUR CLASSIQUE",
        title: ["Cette ligne coûte", "des points."],
        accentLine: 1,
      },
      {
        duration: 2.4,
        kicker: "VRAI OU FAUX ?",
        giant: "−3² = 9",
        body: ["FAUX"],
        danger: true,
      },
      {
        duration: 4.3,
        kicker: "SANS PARENTHÈSES",
        title: ["La puissance passe", "avant le signe −"],
        accentLine: 1,
      },
      {
        duration: 4.5,
        kicker: "DONC",
        formula: ["−3² = −(3²)", "= −9"],
      },
      {
        duration: 3.4,
        kicker: "AVEC PARENTHÈSES",
        formula: ["(−3)² = 9"],
      },
      {
        duration: 3.8,
        kicker: "À RETENIR",
        title: ["Deux écritures.", "Deux résultats."],
        accentLine: 1,
        cta: "Sauvegarde pour ton prochain DS.",
      },
    ],
  },
];

const carousel = [
  {
    kicker: "RENTRÉE 2026",
    title: ["Terminale spé maths", "checklist en 5 points"],
    accentLine: 1,
    body: ["À enregistrer avant septembre."],
  },
  {
    number: "1",
    kicker: "CALCUL ALGÉBRIQUE",
    title: ["Reprends les", "automatismes"],
    accentLine: 1,
    body: ["Développer • factoriser", "Fractions • puissances • équations"],
    cta: "Objectif : manipuler sans changer le signe ni le domaine.",
  },
  {
    number: "2",
    kicker: "DÉRIVATION",
    title: ["Relie f′ aux", "variations de f"],
    accentLine: 1,
    body: ["Dérivées usuelles", "Tangente • signe de f′ • tableau"],
  },
  {
    number: "3",
    kicker: "SUITES",
    title: ["Identifie le", "bon modèle"],
    accentLine: 1,
    body: ["Explicite ou récurrence ?", "Arithmétique ou géométrique ?"],
    cta: "Vérifie toujours le rang de départ.",
  },
  {
    number: "4",
    kicker: "PROBABILITÉS",
    title: ["Nomme ce que", "tu calcules"],
    accentLine: 1,
    body: ["P(A)  •  P(A ∩ B)  •  Pₐ(B)", "Arbre pondéré • probabilités totales"],
  },
  {
    number: "5",
    kicker: "DIAGNOSTIC",
    title: ["Choisis 3 points", "vraiment faibles"],
    accentLine: 1,
    body: ["Teste-toi sans le cours.", "Commence par ce qui bloque le reste."],
  },
  {
    kicker: "RESSOURCE GRATUITE",
    title: ["Un cadre clair", "pour démarrer"],
    accentLine: 1,
    body: ["Planning 30 jours gratuit", "SprintMaths  •  lien en bio"],
    cta: "Enregistre la checklist.",
  },
];

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function tspans(lines, x, y, lineHeight, attrs = "") {
  return lines
    .map(
      (line, index) =>
        `<text x="${x}" y="${y + index * lineHeight}" ${attrs}>${escapeXml(line)}</text>`,
    )
    .join("\n");
}

function frameSvg(frame, index, total, { carouselMode = false } = {}) {
  const titleY = frame.number ? 610 : 560;
  const titleSize = carouselMode ? 90 : 96;
  const titleLineHeight = carouselMode ? 112 : 116;
  const bodyY = titleY + (frame.title?.length ?? 0) * titleLineHeight + 100;
  const accent = frame.danger ? COLORS.red : COLORS.amber;
  const titleMarkup = (frame.title ?? [])
    .map((line, lineIndex) => {
      const fill = lineIndex === frame.accentLine ? accent : COLORS.white;
      return `<text x="96" y="${titleY + lineIndex * titleLineHeight}" fill="${fill}" font-size="${titleSize}" font-weight="800" letter-spacing="-2">${escapeXml(line)}</text>`;
    })
    .join("\n");
  const formulaLines = frame.formula ?? [];
  const formulaY = formulaLines.length > 1 ? 760 : 830;
  const formulaMarkup = tspans(
    formulaLines,
    540,
    formulaY,
    150,
    `fill="${COLORS.white}" font-size="96" font-weight="800" text-anchor="middle"`,
  );
  const giantSize = (frame.giant?.length ?? 0) > 6 ? 150 : 235;
  const giantY = formulaLines.length ? 1270 : 920;
  const giantMarkup = frame.giant
    ? `<text x="540" y="${giantY}" fill="${accent}" font-size="${giantSize}" font-weight="900" text-anchor="middle" letter-spacing="-4">${escapeXml(frame.giant)}</text>`
    : "";
  const bodyBaseY = frame.title ? bodyY : formulaLines.length ? 1260 : giantY + 170;
  const bodyMarkup = tspans(
    frame.body ?? [],
    96,
    bodyBaseY,
    74,
    `fill="${COLORS.pale}" font-size="54" font-weight="600"`,
  );
  const ctaMarkup = frame.cta
    ? `<rect x="96" y="1455" width="888" height="128" rx="34" fill="#ffffff12" stroke="#ffffff38" stroke-width="2"/>
       <text x="540" y="1535" fill="${COLORS.white}" font-size="38" font-weight="700" text-anchor="middle">${escapeXml(frame.cta)}</text>`
    : "";
  const numberMarkup = frame.number
    ? `<circle cx="185" cy="350" r="90" fill="${accent}"/>
       <text x="185" y="384" fill="${COLORS.navy}" font-size="102" font-weight="900" text-anchor="middle">${escapeXml(frame.number)}</text>`
    : "";
  const footer = frame.footer
    ? `<text x="96" y="1515" fill="${COLORS.pale}" font-size="48" font-weight="700">${escapeXml(frame.footer)}</text>`
    : "";

  return `
  <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${COLORS.navy}"/>
        <stop offset="0.55" stop-color="${COLORS.blue}"/>
        <stop offset="1" stop-color="${COLORS.blueLight}"/>
      </linearGradient>
      <filter id="shadow"><feDropShadow dx="0" dy="20" stdDeviation="32" flood-color="#000000" flood-opacity="0.20"/></filter>
    </defs>
    <rect width="1080" height="1920" fill="url(#bg)"/>
    <circle cx="1030" cy="260" r="330" fill="none" stroke="#ffffff10" stroke-width="70"/>
    <circle cx="-70" cy="1700" r="300" fill="none" stroke="#f59e0b14" stroke-width="95"/>
    <rect x="0" y="0" width="1080" height="18" fill="${COLORS.amber}"/>
    <g font-family="Helvetica Neue, Helvetica, Arial, sans-serif" filter="url(#shadow)">
      <text x="96" y="126" fill="${COLORS.white}" font-size="34" font-weight="800" letter-spacing="4">SPRINTMATHS</text>
      <rect x="96" y="148" width="132" height="7" rx="3.5" fill="${COLORS.amber}"/>
      <text x="984" y="126" fill="${COLORS.muted}" font-size="30" font-weight="700" text-anchor="end">${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}</text>
      ${numberMarkup}
      <text x="96" y="${frame.number ? 500 : 355}" fill="${accent}" font-size="38" font-weight="800" letter-spacing="5">${escapeXml(frame.kicker ?? "")}</text>
      ${titleMarkup}
      ${formulaMarkup}
      ${giantMarkup}
      ${bodyMarkup}
      ${ctaMarkup}
      ${footer}
      <text x="96" y="1730" fill="${COLORS.muted}" font-size="30" font-weight="600">Maths Première &amp; Terminale</text>
      <rect x="96" y="1790" width="888" height="10" rx="5" fill="#ffffff20"/>
      <rect x="96" y="1790" width="${Math.round((888 * (index + 1)) / total)}" height="10" rx="5" fill="${accent}"/>
    </g>
  </svg>`;
}

async function renderPng(svg, target) {
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(target);
}

function run(command, args) {
  const result = spawnSync(command, args, { encoding: "utf8" });
  if (result.status !== 0) {
    throw new Error(`${command} failed:\n${result.stderr || result.stdout}`);
  }
}

async function renderVideo(video) {
  const videoFrames = path.join(FRAME_ROOT, video.id);
  await fs.rm(videoFrames, { recursive: true, force: true });
  await fs.mkdir(videoFrames, { recursive: true });

  const manifestLines = ["ffconcat version 1.0"];
  for (const [index, frame] of video.frames.entries()) {
    const framePath = path.join(videoFrames, `${String(index + 1).padStart(2, "0")}.png`);
    await renderPng(frameSvg(frame, index, video.frames.length), framePath);
    manifestLines.push(`file '${framePath.replaceAll("'", "'\\''")}'`);
    manifestLines.push(`duration ${frame.duration}`);
  }

  const finalFrame = path.join(
    videoFrames,
    `${String(video.frames.length).padStart(2, "0")}.png`,
  );
  manifestLines.push(`file '${finalFrame.replaceAll("'", "'\\''")}'`);
  const manifest = path.join(videoFrames, "frames.ffconcat");
  await fs.writeFile(manifest, `${manifestLines.join("\n")}\n`, "utf8");

  const duration = video.frames.reduce((sum, frame) => sum + frame.duration, 0);
  const target = path.join(OUTPUT, `${video.id}-master.mp4`);
  await fs.rm(target, { force: true });
  run("ffmpeg", [
    "-hide_banner",
    "-loglevel",
    "error",
    "-f",
    "concat",
    "-safe",
    "0",
    "-i",
    manifest,
    "-f",
    "lavfi",
    "-t",
    String(duration),
    "-i",
    "anullsrc=channel_layout=stereo:sample_rate=48000",
    "-vf",
    "fps=30,format=yuv420p",
    "-c:v",
    "libx264",
    "-preset",
    "medium",
    "-crf",
    "18",
    "-c:a",
    "aac",
    "-b:a",
    "128k",
    "-shortest",
    "-movflags",
    "+faststart",
    target,
  ]);
}

async function renderCarousel() {
  const targetDir = path.join(OUTPUT, "carousel-rentree-terminale");
  await fs.rm(targetDir, { recursive: true, force: true });
  await fs.mkdir(targetDir, { recursive: true });

  for (const [index, slide] of carousel.entries()) {
    const target = path.join(
      targetDir,
      `${String(index + 1).padStart(2, "0")}-${index === 0 ? "couverture" : index === carousel.length - 1 ? "cta" : `point-${index}`}.png`,
    );
    await renderPng(frameSvg(slide, index, carousel.length, { carouselMode: true }), target);
  }

  const thumbs = await Promise.all(
    carousel.map(async (_, index) => {
      const pattern = index === 0 ? "couverture" : index === carousel.length - 1 ? "cta" : `point-${index}`;
      const source = path.join(
        targetDir,
        `${String(index + 1).padStart(2, "0")}-${pattern}.png`,
      );
      return sharp(source).resize({ width: 216, height: 384, fit: "cover" }).png().toBuffer();
    }),
  );
  await sharp({
    create: {
      width: 216 * carousel.length,
      height: 384,
      channels: 4,
      background: COLORS.navy,
    },
  })
    .composite(thumbs.map((input, index) => ({ input, left: index * 216, top: 0 })))
    .jpeg({ quality: 88 })
    .toFile(path.join(OUTPUT, "carousel-rentree-terminale-apercu.jpg"));
}

await fs.mkdir(OUTPUT, { recursive: true });
await fs.mkdir(FRAME_ROOT, { recursive: true });
for (const video of videos) {
  await renderVideo(video);
}
await renderCarousel();
await fs.rm(FRAME_ROOT, { recursive: true, force: true });

console.log(
  JSON.stringify(
    {
      output: OUTPUT,
      videos: videos.map((video) => ({
        id: video.id,
        duration: video.frames.reduce((sum, frame) => sum + frame.duration, 0),
      })),
      carouselSlides: carousel.length,
    },
    null,
    2,
  ),
);
