import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";
import sharp from "sharp";

const ROOT = path.resolve("docs/social/j66");
const OUTPUT = path.join(ROOT, "output");
const WORK = path.join(ROOT, ".work");
const DURATION = 15.0;
const VOICE = path.join(WORK, "siwis-voice.wav");
const MUSIC = path.join(WORK, "original-music-bed.wav");
const HOOK = path.join(WORK, "original-hook.wav");
const REVEAL = path.join(WORK, "original-reveal.wav");
const BASE = path.join(WORK, "j66-base.mp4");
const MASTER = path.join(OUTPUT, "a66-80-euros-plus-10-pourcent-audio-master.mp4");

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
  { duration: 4.2, data: { eyebrow: "COMBIEN APRÈS LA HAUSSE ?", title: "80 €\n+ 10 %", formula: "88 € ou 90 € ?", note: "Ta réponse avant la révélation.", accent: "#ffd84d", progress: 0.15 } },
  { duration: 2.0, data: { eyebrow: "LA RÉPONSE", title: "88 €", formula: "10 % de 80 = 8", note: "Le pourcentage porte sur 80.", accent: "#62e6a7", progress: 0.45 } },
  { duration: 4.4, data: { eyebrow: "LE CALCUL", title: "80 + 8\n= 88 €", formula: "80 × 1,10 = 88", note: "+ 10 % ne veut pas dire + 10 €.", accent: "#62c7ff", progress: 0.72 } },
  { duration: 4.4, data: { eyebrow: "TESTE TES BASES", title: "10 QUESTIONS\nGRATUITES", formula: "sprintmaths.com/diagnostic", note: "Résultat immédiat · aucun email obligatoire", accent: "#ffd84d", progress: 1, formulaSize: 58 } },
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

const narration = [
  "Quatre-vingts euros plus dix pour cent, ça fait combien ?",
  "Quatre-vingt-huit !",
  "Dix pour cent de quatre-vingts, c'est huit euros.",
  "Teste tes bases gratuitement sur SprintMaths.",
];
const voiceParts = [];
for (const [index, line] of narration.entries()) {
  const input = path.join(WORK, `voice-${index}.txt`);
  const raw = path.join(WORK, `voice-${index}.wav`);
  const padded = path.join(WORK, `voice-${index}-padded.wav`);
  await fs.writeFile(input, line);
  run("node", ["scripts/social/generate-piper-voice.mjs", "--text-file", input, "--output", raw, "--length-scale", "0.98"]);
  const seconds = Number(run("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", raw]).trim());
  if (seconds > scenes[index].duration) throw new Error(`Narration ${index} too long: ${seconds}`);
  run("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", "-i", raw, "-af", `apad=whole_dur=${scenes[index].duration}`, "-t", String(scenes[index].duration), "-ar", "48000", "-ac", "2", padded]);
  voiceParts.push(`file '${padded}'`);
}
const voiceManifest = path.join(WORK, "voice.ffconcat");
await fs.writeFile(voiceManifest, "ffconcat version 1.0\n" + voiceParts.join("\n") + "\n");
run("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", voiceManifest, "-c:a", "pcm_s16le", VOICE]);

run("ffmpeg", [
  "-y", "-hide_banner", "-loglevel", "error", "-f", "lavfi", "-i",
  `aevalsrc=0.032*sin(2*PI*196*t)+0.019*sin(2*PI*246.94*t)+0.012*sin(2*PI*293.66*t):s=48000:d=${DURATION}`,
  "-af", "lowpass=f=1600,afade=t=in:st=0:d=0.28,afade=t=out:st=13.6:d=1.4", "-ac", "2", MUSIC,
]);
run("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", "-f", "lavfi", "-i", "aevalsrc=0.24*sin(2*PI*(700+1050*t)*t):s=48000:d=0.22", "-af", "afade=t=out:st=0.06:d=0.16", "-ac", "2", HOOK]);
run("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", "-f", "lavfi", "-i", "aevalsrc=0.18*sin(2*PI*620*t)+0.11*sin(2*PI*930*t):s=48000:d=0.25", "-af", "afade=t=in:st=0:d=0.02,afade=t=out:st=0.08:d=0.17", "-ac", "2", REVEAL]);

run("node", [
  "scripts/social/mix-social-audio.mjs", "--video", BASE, "--voice", VOICE, "--music", MUSIC,
  "--sfx", `${HOOK}@0`, "--sfx", `${REVEAL}@4200`,
  "--subtitles", path.join(ROOT, "subtitles.srt"), "--output", MASTER,
]);

run("node", ["scripts/social/smoke-social-media.mjs", MASTER]);
run("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", "-ss", "0.20", "-i", MASTER, "-frames:v", "1", "-q:v", "2", path.join(OUTPUT, "a66-80-euros-plus-10-pourcent-apercu.jpg")]);
run("ffmpeg", ["-y", "-hide_banner", "-loglevel", "error", "-i", VOICE, "-t", "8.5", "-af", "loudnorm=I=-16:LRA=7:TP=-1.2", "-c:a", "aac", "-b:a", "160k", path.join(OUTPUT, "voice-sample-siwis-j66.m4a")]);

const voiceDuration = Number(run("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", VOICE]).trim());
await fs.rm(WORK, { recursive: true, force: true });
console.log(JSON.stringify({ master: MASTER, duration: DURATION, voiceDuration, preview: path.join(OUTPUT, "a66-80-euros-plus-10-pourcent-apercu.jpg") }, null, 2));
