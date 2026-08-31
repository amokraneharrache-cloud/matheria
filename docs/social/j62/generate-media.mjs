import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import sharp from "sharp";

const ROOT = path.resolve("docs/social/j62");
const OUTPUT = path.join(ROOT, "output");
const FRAMES = path.join(ROOT, ".frames");
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

const video = {
  id: "a62-bac-2026-lancers-francs",
  voice: "Cette question est vraiment tombée au Bac maths 2026, en Asie. Un joueur tente trois lancers francs indépendants, avec une probabilité p de réussite. Quelle valeur minimale de p lui donne au moins quatre-vingt-dix pour cent de chance d'en réussir au moins deux ? On additionne exactement deux réussites et trois réussites. On obtient trois p carré moins deux p cube. En résolvant l'inéquation, p doit être au moins égal à zéro virgule huit zéro quatre environ. Quatre-vingts pour cent ne suffit pas. Quatre-vingt-un pour cent, oui. Le corrigé complet est gratuit sur SprintMaths.",
  frames: [
    {
      duration: 1.8,
      kicker: "VRAI SUJET DE BAC",
      title: ["Cette question est", "vraiment tombée."],
      accentLine: 1,
      body: ["Bac Maths 2026 • Asie • Jour 2"],
    },
    {
      duration: 4.3,
      kicker: "LA QUESTION",
      title: ["3 lancers francs", "indépendants", "réussite : p"],
      accentLine: 0,
      body: ["Quel p minimum pour avoir", "au moins 90 % de réussir ≥ 2 ?"],
    },
    {
      duration: 1.2,
      kicker: "À TOI",
      giant: "3 • 2 • 1",
      body: ["Pose les deux cas avant de répondre."],
    },
    {
      duration: 4,
      kicker: "LA MÉTHODE",
      title: ["Exactement 2", "+", "Exactement 3"],
      accentLine: 1,
      body: ["C(3,2)p²(1−p) + p³"],
    },
    {
      duration: 3,
      kicker: "ON SIMPLIFIE",
      giant: "3p² − 2p³",
      body: ["C'est P(au moins 2 réussites)."],
    },
    {
      duration: 4,
      kicker: "LE SEUIL",
      title: ["3p² − 2p³ ≥ 0,90"],
      accentLine: 0,
      body: ["La fonction croît sur [0 ; 1].", "Seuil : p ≈ 0,8042"],
    },
    {
      duration: 3.2,
      kicker: "RÉPONSE",
      giant: "80,4 %",
      body: ["80 % ne suffit pas.", "81 % suffit."],
    },
    {
      duration: 3.7,
      kicker: "ASIE 2026 • EXERCICE 2",
      title: ["Le corrigé complet", "est gratuit."],
      accentLine: 1,
      body: ["Méthode • calculs • erreurs fréquentes"],
      cta: "SprintMaths  •  lien en bio",
    },
  ],
};

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function tspans(lines, x, y, lineHeight, attrs = "") {
  return lines
    .map((line, index) => `<text x="${x}" y="${y + index * lineHeight}" ${attrs}>${escapeXml(line)}</text>`)
    .join("\n");
}

function frameSvg(frame, index, total) {
  const titleY = 545;
  const lineHeight = 118;
  const titleMarkup = (frame.title ?? [])
    .map((line, lineIndex) => {
      const fill = lineIndex === frame.accentLine ? COLORS.amber : COLORS.white;
      const size = line.length > 27 ? 54 : line.length > 20 ? 64 : line.length > 15 ? 78 : 92;
      return `<text x="96" y="${titleY + lineIndex * lineHeight}" fill="${fill}" font-size="${size}" font-weight="850" letter-spacing="-2">${escapeXml(line)}</text>`;
    })
    .join("\n");
  const giantSize = (frame.giant?.length ?? 0) > 8 ? 150 : 205;
  const giantMarkup = frame.giant
    ? `<text x="540" y="900" fill="${COLORS.green}" font-size="${giantSize}" font-weight="900" text-anchor="middle" letter-spacing="-4">${escapeXml(frame.giant)}</text>`
    : "";
  const bodyY = frame.giant
    ? 1095
    : titleY + (frame.title?.length ?? 0) * lineHeight + 115;
  const bodyMarkup = tspans(
    frame.body ?? [],
    96,
    bodyY,
    78,
    `fill="${COLORS.pale}" font-size="50" font-weight="650"`,
  );
  const ctaMarkup = frame.cta
    ? `<rect x="96" y="1385" width="888" height="138" rx="34" fill="${COLORS.amber}"/>
       <text x="540" y="1472" fill="${COLORS.navy}" font-size="44" font-weight="850" text-anchor="middle">${escapeXml(frame.cta)}</text>`
    : "";

  return `<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
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
    <rect x="0" y="0" width="1080" height="18" fill="${index === 0 ? COLORS.red : COLORS.amber}"/>
    <g font-family="Helvetica Neue, Helvetica, Arial, sans-serif" filter="url(#shadow)">
      <text x="96" y="126" fill="${COLORS.white}" font-size="34" font-weight="800" letter-spacing="4">SPRINTMATHS</text>
      <rect x="96" y="148" width="132" height="7" rx="3.5" fill="${COLORS.amber}"/>
      <text x="984" y="126" fill="${COLORS.muted}" font-size="30" font-weight="700" text-anchor="end">${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}</text>
      <text x="96" y="355" fill="${index === 0 ? COLORS.red : COLORS.amber}" font-size="38" font-weight="800" letter-spacing="5">${escapeXml(frame.kicker)}</text>
      ${titleMarkup}
      ${giantMarkup}
      ${bodyMarkup}
      ${ctaMarkup}
      <text x="96" y="1730" fill="${COLORS.muted}" font-size="30" font-weight="600">Question reformulée • Bac Maths 2026</text>
      <rect x="96" y="1790" width="888" height="10" rx="5" fill="#ffffff20"/>
      <rect x="96" y="1790" width="${Math.round((888 * (index + 1)) / total)}" height="10" rx="5" fill="${COLORS.amber}"/>
    </g>
  </svg>`;
}

function run(command, args) {
  const result = spawnSync(command, args, { encoding: "utf8" });
  if (result.status !== 0) throw new Error(`${command} failed:\n${result.stderr || result.stdout}`);
}

await fs.rm(FRAMES, { recursive: true, force: true });
await fs.mkdir(FRAMES, { recursive: true });
await fs.mkdir(OUTPUT, { recursive: true });

const manifestLines = ["ffconcat version 1.0"];
for (const [index, frame] of video.frames.entries()) {
  const framePath = path.join(FRAMES, `${String(index + 1).padStart(2, "0")}.png`);
  await sharp(Buffer.from(frameSvg(frame, index, video.frames.length))).png({ compressionLevel: 9 }).toFile(framePath);
  manifestLines.push(`file '${framePath.replaceAll("'", "'\\''")}'`);
  manifestLines.push(`duration ${frame.duration}`);
}
const finalFrame = path.join(FRAMES, `${String(video.frames.length).padStart(2, "0")}.png`);
manifestLines.push(`file '${finalFrame.replaceAll("'", "'\\''")}'`);
const manifest = path.join(FRAMES, "frames.ffconcat");
await fs.writeFile(manifest, `${manifestLines.join("\n")}\n`, "utf8");

const voicePath = path.join(FRAMES, "voice.aiff");
run("say", ["-v", "Thomas", "-r", "255", "-o", voicePath, video.voice]);

const duration = video.frames.reduce((sum, frame) => sum + frame.duration, 0);
const target = path.join(OUTPUT, `${video.id}-master.mp4`);
await fs.rm(target, { force: true });
run("ffmpeg", [
  "-hide_banner", "-loglevel", "error",
  "-f", "concat", "-safe", "0", "-i", manifest,
  "-i", voicePath,
  "-filter_complex", "[1:a]volume=1.05,apad=pad_dur=3[a]",
  "-map", "0:v", "-map", "[a]",
  "-t", String(duration),
  "-vf", "fps=30,format=yuv420p",
  "-c:v", "libx264", "-preset", "medium", "-crf", "18",
  "-c:a", "aac", "-b:a", "160k",
  "-movflags", "+faststart",
  target,
]);

const preview = path.join(OUTPUT, `${video.id}-apercu.jpg`);
await fs.rm(preview, { force: true });
run("ffmpeg", ["-hide_banner", "-loglevel", "error", "-ss", "0.7", "-i", target, "-frames:v", "1", "-q:v", "2", preview]);

await fs.rm(FRAMES, { recursive: true, force: true });
console.log(JSON.stringify({ target, preview, duration }, null, 2));
