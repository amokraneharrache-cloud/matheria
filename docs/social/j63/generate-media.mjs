import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = path.resolve("docs/social/j63");
const OUTPUT = path.join(ROOT, "output");
const WORK = path.join(ROOT, ".work");
const SOURCE = path.resolve("docs/social/j62/output/a62-bac-2026-lancers-francs-master.mp4");
const VOICE = path.join(WORK, "siwis-voice.wav");
const MUSIC = path.join(WORK, "original-music-bed.wav");
const HOOK = path.join(WORK, "original-hook.wav");
const REVEAL = path.join(WORK, "original-reveal.wav");
const MASTER = path.join(OUTPUT, "a63-bac-2026-lancers-francs-audio-master.mp4");

function run(command, args) {
  const result = spawnSync(command, args, { encoding: "utf8" });
  if (result.status !== 0) throw new Error(`${command} a échoué:\n${result.stderr || result.stdout}`);
}

await fs.rm(WORK, { recursive: true, force: true });
await fs.mkdir(WORK, { recursive: true });
await fs.mkdir(OUTPUT, { recursive: true });

run("node", [
  "scripts/social/generate-piper-voice.mjs",
  "--text-file",
  path.join(ROOT, "voice-script.txt"),
  "--output",
  VOICE,
  "--length-scale",
  "0.68",
]);

run("ffmpeg", [
  "-y", "-hide_banner", "-loglevel", "error",
  "-f", "lavfi", "-i", "aevalsrc=0.045*sin(2*PI*220*t)+0.025*sin(2*PI*277.18*t)+0.018*sin(2*PI*329.63*t):s=48000:d=25.2",
  "-af", "lowpass=f=1800,afade=t=in:st=0:d=0.8,afade=t=out:st=23.7:d=1.5",
  "-ac", "2", MUSIC,
]);
run("ffmpeg", [
  "-y", "-hide_banner", "-loglevel", "error",
  "-f", "lavfi", "-i", "aevalsrc=0.22*sin(2*PI*(520+900*t)*t):s=48000:d=0.20",
  "-af", "afade=t=out:st=0.08:d=0.12", "-ac", "2", HOOK,
]);
run("ffmpeg", [
  "-y", "-hide_banner", "-loglevel", "error",
  "-f", "lavfi", "-i", "aevalsrc=0.16*sin(2*PI*740*t)+0.09*sin(2*PI*1110*t):s=48000:d=0.24",
  "-af", "afade=t=in:st=0:d=0.02,afade=t=out:st=0.08:d=0.16", "-ac", "2", REVEAL,
]);

run("node", [
  "scripts/social/mix-social-audio.mjs",
  "--video", SOURCE,
  "--voice", VOICE,
  "--music", MUSIC,
  "--sfx", `${HOOK}@120`,
  "--sfx", `${REVEAL}@18400`,
  "--subtitles", path.join(ROOT, "subtitles.srt"),
  "--output", MASTER,
]);

run("node", ["scripts/social/smoke-social-media.mjs", MASTER]);
run("ffmpeg", [
  "-y", "-hide_banner", "-loglevel", "error", "-ss", "0.7", "-i", MASTER,
  "-frames:v", "1", "-q:v", "2", path.join(OUTPUT, "a63-bac-2026-lancers-francs-audio-apercu.jpg"),
]);
run("ffmpeg", [
  "-y", "-hide_banner", "-loglevel", "error", "-i", VOICE, "-t", "8.5",
  "-af", "loudnorm=I=-16:LRA=7:TP=-1.2", "-c:a", "aac", "-b:a", "160k",
  path.join(OUTPUT, "voice-sample-siwis-maths.m4a"),
]);

await fs.rm(WORK, { recursive: true, force: true });
console.log(JSON.stringify({ master: MASTER, preview: path.join(OUTPUT, "a63-bac-2026-lancers-francs-audio-apercu.jpg") }, null, 2));
