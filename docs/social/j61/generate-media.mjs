import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import sharp from "sharp";

const ROOT = path.resolve("docs/social/j61");
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
};

const video = {
  id: "d01-mini-diagnostic-terminale",
  frames: [
    {
      duration: 2.7,
      kicker: "MINI-DIAGNOSTIC",
      title: ["Tu rentres en", "Terminale spé maths ?"],
      accentLine: 1,
      body: ["3 questions. Sans le cours."],
    },
    {
      duration: 4.2,
      kicker: "QUESTION 1 / 3",
      title: ["3/4 + 1/6 = ?"],
      choices: ["A  5/6", "B  11/12", "C  4/10"],
    },
    {
      duration: 2.3,
      kicker: "RÉPONSE",
      giant: "11/12",
      body: ["Dénominateur commun : 12."],
    },
    {
      duration: 4.2,
      kicker: "QUESTION 2 / 3",
      title: ["Suite arithmétique :", "u₀ = 1 et r = 4", "u₃ = ?"],
      accentLine: 1,
      choices: ["A  9", "B  12", "C  13"],
    },
    {
      duration: 2.3,
      kicker: "RÉPONSE",
      giant: "13",
      body: ["u₃ = u₀ + 3r = 1 + 12."],
    },
    {
      duration: 4.2,
      kicker: "QUESTION 3 / 3",
      title: ["A et B indépendants", "P(A)=0,3  •  P(B)=0,4"],
      accentLine: 0,
      choices: ["A  0,7", "B  0,12", "C  0,1"],
    },
    {
      duration: 2.3,
      kicker: "RÉPONSE",
      giant: "0,12",
      body: ["P(A ∩ B) = P(A) × P(B)."],
    },
    {
      duration: 4.8,
      kicker: "TON SCORE SUR 3 ?",
      title: ["Le vrai test gratuit", "fait 10 questions."],
      accentLine: 1,
      body: ["Résultat immédiat • 5 domaines"],
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
    .map(
      (line, index) =>
        `<text x="${x}" y="${y + index * lineHeight}" ${attrs}>${escapeXml(line)}</text>`,
    )
    .join("\n");
}

function frameSvg(frame, index, total) {
  const titleY = 550;
  const titleLineHeight = 112;
  const titleMarkup = (frame.title ?? [])
    .map((line, lineIndex) => {
      const fill = lineIndex === frame.accentLine ? COLORS.amber : COLORS.white;
      const size = line.length > 26 ? 54 : line.length > 20 ? 64 : line.length > 16 ? 78 : 92;
      return `<text x="96" y="${titleY + lineIndex * titleLineHeight}" fill="${fill}" font-size="${size}" font-weight="800" letter-spacing="-2">${escapeXml(line)}</text>`;
    })
    .join("\n");
  const choicesY = titleY + (frame.title?.length ?? 0) * titleLineHeight + 150;
  const choicesMarkup = (frame.choices ?? [])
    .map((choice, choiceIndex) => {
      const y = choicesY + choiceIndex * 150;
      return `<rect x="96" y="${y - 82}" width="888" height="112" rx="28" fill="#ffffff12" stroke="#ffffff30" stroke-width="2"/>
        <text x="145" y="${y}" fill="${COLORS.pale}" font-size="54" font-weight="700">${escapeXml(choice)}</text>`;
    })
    .join("\n");
  const giantSize = (frame.giant?.length ?? 0) > 4 ? 190 : 240;
  const giantMarkup = frame.giant
    ? `<text x="540" y="910" fill="${COLORS.green}" font-size="${giantSize}" font-weight="900" text-anchor="middle" letter-spacing="-4">${escapeXml(frame.giant)}</text>`
    : "";
  const bodyY = frame.giant
    ? 1110
    : frame.choices
      ? choicesY + frame.choices.length * 150 + 30
      : titleY + (frame.title?.length ?? 0) * titleLineHeight + 100;
  const bodyMarkup = tspans(
    frame.body ?? [],
    96,
    bodyY,
    74,
    `fill="${COLORS.pale}" font-size="52" font-weight="600"`,
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
    <rect x="0" y="0" width="1080" height="18" fill="${COLORS.amber}"/>
    <g font-family="Helvetica Neue, Helvetica, Arial, sans-serif" filter="url(#shadow)">
      <text x="96" y="126" fill="${COLORS.white}" font-size="34" font-weight="800" letter-spacing="4">SPRINTMATHS</text>
      <rect x="96" y="148" width="132" height="7" rx="3.5" fill="${COLORS.amber}"/>
      <text x="984" y="126" fill="${COLORS.muted}" font-size="30" font-weight="700" text-anchor="end">${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}</text>
      <text x="96" y="355" fill="${COLORS.amber}" font-size="38" font-weight="800" letter-spacing="5">${escapeXml(frame.kicker)}</text>
      ${titleMarkup}
      ${choicesMarkup}
      ${giantMarkup}
      ${bodyMarkup}
      ${ctaMarkup}
      <text x="96" y="1730" fill="${COLORS.muted}" font-size="30" font-weight="600">Maths Première &amp; Terminale</text>
      <rect x="96" y="1790" width="888" height="10" rx="5" fill="#ffffff20"/>
      <rect x="96" y="1790" width="${Math.round((888 * (index + 1)) / total)}" height="10" rx="5" fill="${COLORS.amber}"/>
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

await fs.rm(FRAMES, { recursive: true, force: true });
await fs.mkdir(FRAMES, { recursive: true });
await fs.mkdir(OUTPUT, { recursive: true });

const manifestLines = ["ffconcat version 1.0"];
for (const [index, frame] of video.frames.entries()) {
  const framePath = path.join(FRAMES, `${String(index + 1).padStart(2, "0")}.png`);
  await renderPng(frameSvg(frame, index, video.frames.length), framePath);
  manifestLines.push(`file '${framePath.replaceAll("'", "'\\''")}'`);
  manifestLines.push(`duration ${frame.duration}`);
}
const finalFrame = path.join(FRAMES, `${String(video.frames.length).padStart(2, "0")}.png`);
manifestLines.push(`file '${finalFrame.replaceAll("'", "'\\''")}'`);
const manifest = path.join(FRAMES, "frames.ffconcat");
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

const preview = path.join(OUTPUT, `${video.id}-apercu.jpg`);
await fs.rm(preview, { force: true });
run("ffmpeg", [
  "-hide_banner",
  "-loglevel",
  "error",
  "-ss",
  "1",
  "-i",
  target,
  "-frames:v",
  "1",
  "-q:v",
  "2",
  preview,
]);

await fs.rm(FRAMES, { recursive: true, force: true });
console.log(JSON.stringify({ target, preview, duration }, null, 2));
