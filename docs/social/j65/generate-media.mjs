import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import sharp from "sharp";

const ROOT = path.resolve("docs/social/j65");
const OUTPUT = path.join(ROOT, "output");
const WORK = path.join(ROOT, ".work");
const DURATION = 18.6;
const VOICE = path.join(WORK, "siwis-voice.wav");
const MUSIC = path.join(WORK, "original-music-bed.wav");
const HOOK = path.join(WORK, "original-hook.wav");
const REVEAL = path.join(WORK, "original-reveal.wav");
const BASE = path.join(WORK, "j65-base.mp4");
const MASTER = path.join(OUTPUT, "a65-diagnostic-terminale-3-questions-audio-master.mp4");

function run(command, args) {
  const result = spawnSync(command, args, { encoding: "utf8" });
  if (result.status !== 0) throw new Error(`${command} a échoué:\n${result.stderr || result.stdout}`);
  return result.stdout;
}

function escapeXml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function sceneSvg({ eyebrow, title, formula, note, accent = "#62c7ff", progress = 0.2, formulaSize = 86 }) {
  const titleLines = title.split("\n");
  return `<svg width="1080" height="1920" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#050a1f"/><stop offset="0.58" stop-color="#111d46"/><stop offset="1" stop-color="#09132f"/>
      </linearGradient>
      <radialGradient id="glow"><stop offset="0" stop-color="${accent}" stop-opacity="0.34"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="1080" height="1920" fill="url(#bg)"/>
    <circle cx="900" cy="360" r="560" fill="url(#glow)"/>
    <rect x="64" y="80" width="952" height="84" rx="42" fill="#ffffff" fill-opacity="0.09" stroke="#ffffff" stroke-opacity="0.14"/>
    <text x="104" y="135" fill="#d8e3ff" font-family="Helvetica Neue,Arial,sans-serif" font-size="34" font-weight="700">SPRINTMATHS</text>
    <text x="976" y="135" text-anchor="end" fill="#d8e3ff" font-family="Helvetica Neue,Arial,sans-serif" font-size="30" font-weight="650">DIAGNOSTIC · TERMINALE</text>
    <text x="540" y="330" text-anchor="middle" fill="${accent}" font-family="Helvetica Neue,Arial,sans-serif" font-size="56" font-weight="900" letter-spacing="2">${escapeXml(eyebrow)}</text>
    ${titleLines.map((line, index) => `<text x="540" y="${470 + index * 104}" text-anchor="middle" fill="#ffffff" font-family="Helvetica Neue,Arial,sans-serif" font-size="84" font-weight="900">${escapeXml(line)}</text>`).join("\n")}
    <rect x="70" y="760" width="940" height="330" rx="52" fill="#ffffff" fill-opacity="0.08" stroke="${accent}" stroke-width="5"/>
    <text x="540" y="955" text-anchor="middle" fill="#ffffff" font-family="Georgia,Times New Roman,serif" font-size="${formulaSize}" font-weight="700">${escapeXml(formula)}</text>
    <text x="540" y="1195" text-anchor="middle" fill="#d8e3ff" font-family="Helvetica Neue,Arial,sans-serif" font-size="44" font-weight="650">${escapeXml(note)}</text>
    <rect x="78" y="1486" width="924" height="8" rx="4" fill="#ffffff" fill-opacity="0.18"/>
    <rect x="78" y="1486" width="${Math.round(924 * progress)}" height="8" rx="4" fill="${accent}"/>
    <text x="540" y="1580" text-anchor="middle" fill="#8293bd" font-family="Helvetica Neue,Arial,sans-serif" font-size="28" font-weight="650">10 QUESTIONS · RÉSULTAT IMMÉDIAT · EMAIL FACULTATIF</text>
  </svg>`;
}

const scenes = [
  { duration: 3.05, data: { eyebrow: "TERMINALE SPÉ MATHS ?", title: "3 QUESTIONS\nSANS CALCULATRICE", formula: "(x² − 4) / (x − 2)", note: "Q1 · Simplifie pour x ≠ 2", accent: "#ffd84d", progress: 0.08 } },
  { duration: 2.40, data: { eyebrow: "QUESTION 1", title: "TON\nRÉPONSE ?", formula: "(x² − 4) / (x − 2)", note: "Factorise le numérateur.", accent: "#ff9f43", progress: 0.20 } },
  { duration: 1.10, data: { eyebrow: "RÉPONSE", title: "x + 2", formula: "(x − 2)(x + 2) / (x − 2)", note: "Le facteur x − 2 se simplifie.", accent: "#62e6a7", progress: 0.33 } },
  { duration: 3.50, data: { eyebrow: "QUESTION 2", title: "SUITE\nGÉOMÉTRIQUE", formula: "u₀ = 16 · q = 0,5 · u₄ = ?", note: "Chaque terme est divisé par 2.", accent: "#62c7ff", progress: 0.48, formulaSize: 60 } },
  { duration: 1.10, data: { eyebrow: "RÉPONSE", title: "u₄ = 1", formula: "16 × 0,5⁴ = 1", note: "Quatre divisions par 2.", accent: "#62e6a7", progress: 0.60 } },
  { duration: 3.75, data: { eyebrow: "QUESTION 3", title: "PRODUIT\nSCALAIRE", formula: "(2 ; 3) · (−1 ; 4) = ?", note: "Multiplie puis additionne.", accent: "#9c8cff", progress: 0.75 } },
  { duration: 1.05, data: { eyebrow: "RÉPONSE", title: "10", formula: "2 × (−1) + 3 × 4", note: "−2 + 12 = 10.", accent: "#62e6a7", progress: 0.88 } },
  { duration: 2.65, data: { eyebrow: "FAIS LES 10 QUESTIONS", title: "DIAGNOSTIC\nGRATUIT", formula: "sprintmaths.com/diagnostic", note: "Résultat immédiat · aucun email obligatoire", accent: "#ffd84d", progress: 1, formulaSize: 58 } },
];

await fs.rm(WORK, { recursive: true, force: true });
await fs.mkdir(WORK, { recursive: true });
await fs.mkdir(OUTPUT, { recursive: true });

const concatLines = ["ffconcat version 1.0"];
for (const [index, scene] of scenes.entries()) {
  const file = path.join(WORK, `scene-${String(index).padStart(2, "0")}.png`);
  await sharp(Buffer.from(sceneSvg(scene.data))).png().toFile(file);
  concatLines.push(`file '${file.replaceAll("'", "'\\''")}'`);
  concatLines.push(`duration ${scene.duration.toFixed(3)}`);
}
concatLines.push(`file '${path.join(WORK, `scene-${String(scenes.length - 1).padStart(2, "0")}.png`).replaceAll("'", "'\\''")}'`);
const manifest = path.join(WORK, "scenes.ffconcat");
await fs.writeFile(manifest, `${concatLines.join("\n")}\n`, "utf8");

run("ffmpeg", [
  "-y", "-hide_banner", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", manifest,
  "-vf", "fps=30,format=yuv420p", "-t", String(DURATION), "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p", "-movflags", "+faststart", BASE,
]);

run("node", [
  "scripts/social/generate-piper-voice.mjs", "--text-file", path.join(ROOT, "voice-script.txt"),
  "--output", VOICE, "--length-scale", "0.67",
]);

run("ffmpeg", [
  "-y", "-hide_banner", "-loglevel", "error", "-f", "lavfi", "-i",
  `aevalsrc=0.032*sin(2*PI*196*t)+0.019*sin(2*PI*246.94*t)+0.012*sin(2*PI*293.66*t):s=48000:d=${DURATION}`,
  "-af", "lowpass=f=1600,afade=t=in:st=0:d=0.28,afade=t=out:st=17.2:d=1.4", "-ac", "2", MUSIC,
]);
run("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", "-f", "lavfi", "-i", "aevalsrc=0.24*sin(2*PI*(700+1050*t)*t):s=48000:d=0.22", "-af", "afade=t=out:st=0.06:d=0.16", "-ac", "2", HOOK]);
run("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", "-f", "lavfi", "-i", "aevalsrc=0.18*sin(2*PI*620*t)+0.11*sin(2*PI*930*t):s=48000:d=0.25", "-af", "afade=t=in:st=0:d=0.02,afade=t=out:st=0.08:d=0.17", "-ac", "2", REVEAL]);

run("node", [
  "scripts/social/mix-social-audio.mjs", "--video", BASE, "--voice", VOICE, "--music", MUSIC,
  "--sfx", `${HOOK}@0`, "--sfx", `${REVEAL}@5450`, "--sfx", `${REVEAL}@10050`, "--sfx", `${REVEAL}@14900`,
  "--subtitles", path.join(ROOT, "subtitles.srt"), "--output", MASTER,
]);

run("node", ["scripts/social/smoke-social-media.mjs", MASTER]);
run("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", "-ss", "0.20", "-i", MASTER, "-frames:v", "1", "-q:v", "2", path.join(OUTPUT, "a65-diagnostic-terminale-3-questions-apercu.jpg")]);
run("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", "-i", VOICE, "-t", "8.5", "-af", "loudnorm=I=-16:LRA=7:TP=-1.2", "-c:a", "aac", "-b:a", "160k", path.join(OUTPUT, "voice-sample-siwis-j65.m4a")]);

const voiceDuration = Number(run("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", VOICE]).trim());
await fs.rm(WORK, { recursive: true, force: true });
console.log(JSON.stringify({ master: MASTER, duration: DURATION, voiceDuration, preview: path.join(OUTPUT, "a65-diagnostic-terminale-3-questions-apercu.jpg") }, null, 2));
