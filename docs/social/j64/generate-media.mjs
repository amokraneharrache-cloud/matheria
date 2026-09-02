import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import sharp from "sharp";

const ROOT = path.resolve("docs/social/j64");
const OUTPUT = path.join(ROOT, "output");
const WORK = path.join(ROOT, ".work");
const DURATION = 17.2;
const VOICE = path.join(WORK, "siwis-voice.wav");
const MUSIC = path.join(WORK, "original-music-bed.wav");
const HOOK = path.join(WORK, "original-hook.wav");
const COUNTDOWN = path.join(WORK, "original-countdown.wav");
const REVEAL = path.join(WORK, "original-reveal.wav");
const BASE = path.join(WORK, "j64-base.mp4");
const MASTER = path.join(OUTPUT, "a64-bac-2026-integrale-vrai-faux-audio-master.mp4");

function run(command, args) {
  const result = spawnSync(command, args, { encoding: "utf8" });
  if (result.status !== 0) throw new Error(`${command} a échoué:\n${result.stderr || result.stdout}`);
  return result.stdout;
}

function escapeXml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function sceneSvg({ eyebrow, title, formula, note, accent = "#4f7cff", badge = "BAC 2026 · ASIE J1" }) {
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
    <text x="976" y="135" text-anchor="end" fill="#d8e3ff" font-family="Helvetica Neue,Arial,sans-serif" font-size="31" font-weight="650">${escapeXml(badge)}</text>
    <text x="540" y="340" text-anchor="middle" fill="${accent}" font-family="Helvetica Neue,Arial,sans-serif" font-size="62" font-weight="900" letter-spacing="3">${escapeXml(eyebrow)}</text>
    ${titleLines.map((line, index) => `<text x="540" y="${480 + index * 112}" text-anchor="middle" fill="#ffffff" font-family="Helvetica Neue,Arial,sans-serif" font-size="94" font-weight="900">${escapeXml(line)}</text>`).join("\n")}
    ${formula ? `<rect x="78" y="760" width="924" height="330" rx="52" fill="#ffffff" fill-opacity="0.08" stroke="${accent}" stroke-width="5"/><text x="540" y="960" text-anchor="middle" fill="#ffffff" font-family="Georgia,Times New Roman,serif" font-size="102" font-weight="700">${formula}</text>` : ""}
    <text x="540" y="1198" text-anchor="middle" fill="#d8e3ff" font-family="Helvetica Neue,Arial,sans-serif" font-size="48" font-weight="650">${escapeXml(note)}</text>
    <rect x="78" y="1486" width="924" height="8" rx="4" fill="#ffffff" fill-opacity="0.18"/>
    <rect x="78" y="1486" width="470" height="8" rx="4" fill="${accent}"/>
    <text x="540" y="1580" text-anchor="middle" fill="#8293bd" font-family="Helvetica Neue,Arial,sans-serif" font-size="28" font-weight="650">SUJET OFFICIEL · AFFIRMATION 4</text>
  </svg>`;
}

const scenes = [
  { duration: 2.45, data: { eyebrow: "VRAI OU FAUX ?", title: "RÉPONDS\nAVANT LA FIN", formula: "∫₀¹ eⁿˣ dx = eⁿ/n", note: "La borne 0 change tout.", accent: "#ffd84d" } },
  { duration: 3.15, data: { eyebrow: "3  ·  2  ·  1", title: "TON\nVERDICT ?", formula: "∫₀¹ eⁿˣ dx = eⁿ/n", note: "Vrai… ou faux ?", accent: "#ff9f43" } },
  { duration: 0.85, data: { eyebrow: "FAUX", title: "IL MANQUE\nLA BORNE 0", formula: "eⁿ/n  ✕", note: "Ne saute jamais les bornes.", accent: "#ff5f68" } },
  { duration: 4.15, data: { eyebrow: "LE CALCUL", title: "BORNE HAUTE\n− BORNE BASSE", formula: "(eⁿ − 1) / n", note: "Voilà la valeur exacte.", accent: "#62e6a7" } },
  { duration: 2.8, data: { eyebrow: "LE RÉFLEXE", title: "F(1)\n− F(0)", formula: "(eⁿ − 1) / n", note: "Une seconde de vérification.", accent: "#62c7ff" } },
  { duration: 3.8, data: { eyebrow: "ENTRAÎNE-TOI", title: "ANNALES BAC\nGRATUITES", formula: "sprintmaths.com", note: "Tous les sujets, corrigés pas à pas.", accent: "#9c8cff", badge: "TERMINALE · BAC MATHS" } },
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
  "-vf", "fps=30,format=yuv420p",
  "-t", String(DURATION), "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p", "-movflags", "+faststart", BASE,
]);

run("node", [
  "scripts/social/generate-piper-voice.mjs", "--text-file", path.join(ROOT, "voice-script.txt"),
  "--output", VOICE, "--length-scale", "0.80",
]);

run("ffmpeg", [
  "-y", "-hide_banner", "-loglevel", "error", "-f", "lavfi", "-i",
  `aevalsrc=0.034*sin(2*PI*196*t)+0.021*sin(2*PI*246.94*t)+0.014*sin(2*PI*293.66*t):s=48000:d=${DURATION}`,
  "-af", "lowpass=f=1600,afade=t=in:st=0:d=0.35,afade=t=out:st=15.8:d=1.4", "-ac", "2", MUSIC,
]);
run("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", "-f", "lavfi", "-i", "aevalsrc=0.24*sin(2*PI*(700+1050*t)*t):s=48000:d=0.22", "-af", "afade=t=out:st=0.06:d=0.16", "-ac", "2", HOOK]);
run("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", "-f", "lavfi", "-i", "aevalsrc=0.18*sin(2*PI*880*t):s=48000:d=0.10", "-af", "afade=t=out:st=0.025:d=0.075", "-ac", "2", COUNTDOWN]);
run("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", "-f", "lavfi", "-i", "aevalsrc=0.18*sin(2*PI*620*t)+0.11*sin(2*PI*930*t):s=48000:d=0.25", "-af", "afade=t=in:st=0:d=0.02,afade=t=out:st=0.08:d=0.17", "-ac", "2", REVEAL]);

run("node", [
  "scripts/social/mix-social-audio.mjs", "--video", BASE, "--voice", VOICE, "--music", MUSIC,
  "--sfx", `${HOOK}@0`, "--sfx", `${COUNTDOWN}@4200`, "--sfx", `${COUNTDOWN}@4700`, "--sfx", `${COUNTDOWN}@5200`,
  "--sfx", `${REVEAL}@5600`, "--subtitles", path.join(ROOT, "subtitles.srt"), "--output", MASTER,
]);

run("node", ["scripts/social/smoke-social-media.mjs", MASTER]);
run("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", "-ss", "0.25", "-i", MASTER, "-frames:v", "1", "-q:v", "2", path.join(OUTPUT, "a64-bac-2026-integrale-vrai-faux-apercu.jpg")]);
run("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", "-i", VOICE, "-t", "8.5", "-af", "loudnorm=I=-16:LRA=7:TP=-1.2", "-c:a", "aac", "-b:a", "160k", path.join(OUTPUT, "voice-sample-siwis-integrale.m4a")]);

const voiceDuration = Number(run("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", VOICE]).trim());
await fs.rm(WORK, { recursive: true, force: true });
console.log(JSON.stringify({ master: MASTER, duration: DURATION, voiceDuration, preview: path.join(OUTPUT, "a64-bac-2026-integrale-vrai-faux-apercu.jpg") }, null, 2));
