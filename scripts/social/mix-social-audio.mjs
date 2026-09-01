#!/usr/bin/env node

import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import sharp from "sharp";

function parseArgs(argv) {
  const values = { sfx: [] };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    const value = argv[index + 1];
    if (argument === "--video") values.video = value;
    else if (argument === "--voice") values.voice = value;
    else if (argument === "--music") values.music = value;
    else if (argument === "--output") values.output = value;
    else if (argument === "--subtitles") values.subtitles = value;
    else if (argument === "--sfx") values.sfx.push(value);
    else throw new Error(`Argument inconnu : ${argument}`);
    index += 1;
  }
  for (const required of ["video", "voice", "music", "output"]) {
    if (!values[required]) throw new Error(`Argument requis manquant : --${required}`);
  }
  return values;
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { encoding: "utf8", ...options });
  if (result.status !== 0) {
    throw new Error(`${command} a échoué:\n${result.stderr || result.stdout}`);
  }
  return result.stdout;
}

function probeDuration(file) {
  return Number(
    run("ffprobe", [
      "-v",
      "error",
      "-show_entries",
      "format=duration",
      "-of",
      "default=noprint_wrappers=1:nokey=1",
      file,
    ]).trim(),
  );
}

function parseTimestamp(value) {
  const match = value.match(/^(\d+):(\d+):(\d+)[,.](\d+)$/);
  if (!match) throw new Error(`Horodatage SRT invalide : ${value}`);
  return Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3]) + Number(match[4]) / 1000;
}

function parseSrt(contents) {
  return contents
    .trim()
    .split(/\r?\n\r?\n/)
    .map((block) => block.split(/\r?\n/))
    .map((lines) => {
      const times = lines[1]?.match(/(.+)\s+-->\s+(.+)/);
      if (!times) throw new Error(`Bloc SRT invalide : ${lines.join(" | ")}`);
      return { start: parseTimestamp(times[1].trim()), end: parseTimestamp(times[2].trim()), text: lines.slice(2).join(" ") };
    });
}

function escapeXml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function wrapCaption(text, limit = 38) {
  const words = text.split(/\s+/);
  const lines = [];
  for (const word of words) {
    const current = lines.at(-1);
    if (!current || `${current} ${word}`.length > limit) lines.push(word);
    else lines[lines.length - 1] = `${current} ${word}`;
  }
  return lines.slice(0, 3);
}

async function createCaptionInput(srtFile, duration, temporaryDirectory) {
  const cues = parseSrt(await fs.readFile(srtFile, "utf8"));
  const entries = [];
  let cursor = 0;
  const segments = [];

  for (const cue of cues) {
    if (cue.start > cursor) segments.push({ duration: cue.start - cursor, text: "" });
    segments.push({ duration: Math.max(0.04, cue.end - cue.start), text: cue.text });
    cursor = cue.end;
  }
  if (cursor < duration) segments.push({ duration: duration - cursor, text: "" });

  for (const [index, segment] of segments.entries()) {
    const lines = wrapCaption(segment.text);
    const lineHeight = 58;
    const boxHeight = lines.length ? lines.length * lineHeight + 54 : 1;
    const boxY = 1320 - boxHeight / 2;
    const textMarkup = lines
      .map(
        (line, lineIndex) =>
          `<text x="540" y="${boxY + 50 + lineIndex * lineHeight}" text-anchor="middle" fill="#ffffff" font-family="Helvetica Neue,Arial,sans-serif" font-size="46" font-weight="750">${escapeXml(line)}</text>`,
      )
      .join("\n");
    const svg = `<svg width="1080" height="1920" xmlns="http://www.w3.org/2000/svg">
      ${lines.length ? `<rect x="74" y="${boxY}" width="932" height="${boxHeight}" rx="28" fill="#07122e" fill-opacity="0.88"/>` : ""}
      ${textMarkup}
    </svg>`;
    const file = path.join(temporaryDirectory, `caption-${String(index).padStart(3, "0")}.png`);
    await sharp(Buffer.from(svg)).png().toFile(file);
    entries.push(`file '${file.replaceAll("'", "'\\''")}'`);
    entries.push(`duration ${segment.duration.toFixed(3)}`);
  }
  const finalFile = path.join(temporaryDirectory, `caption-${String(segments.length - 1).padStart(3, "0")}.png`);
  entries.push(`file '${finalFile.replaceAll("'", "'\\''")}'`);
  const manifest = path.join(temporaryDirectory, "captions.ffconcat");
  await fs.writeFile(manifest, `ffconcat version 1.0\n${entries.join("\n")}\n`, "utf8");
  return manifest;
}

const args = parseArgs(process.argv.slice(2));
const duration = probeDuration(args.video);
if (!Number.isFinite(duration) || duration <= 0) throw new Error("Durée vidéo invalide");

const temporaryDirectory = await fs.mkdtemp(path.join(os.tmpdir(), "sprintmaths-audio-mix-"));
try {
  const ffmpegArgs = ["-y", "-hide_banner", "-loglevel", "error", "-i", args.video, "-i", args.voice, "-i", args.music];
  const sfxInputs = [];
  for (const sfxSpec of args.sfx) {
    const separator = sfxSpec.lastIndexOf("@");
    if (separator < 1) throw new Error(`SFX invalide : ${sfxSpec}. Format attendu : fichier@millisecondes`);
    sfxInputs.push({ file: sfxSpec.slice(0, separator), delay: Number(sfxSpec.slice(separator + 1)) });
    ffmpegArgs.push("-i", sfxInputs.at(-1).file);
  }

  let captionInputIndex = null;
  if (args.subtitles) {
    const manifest = await createCaptionInput(args.subtitles, duration, temporaryDirectory);
    captionInputIndex = 3 + sfxInputs.length;
    ffmpegArgs.push("-f", "concat", "-safe", "0", "-i", manifest);
  }

  const filters = [
    "[1:a]highpass=f=75,lowpass=f=12000,acompressor=threshold=0.10:ratio=3:attack=20:release=250:makeup=1.7,apad=pad_dur=5,asplit=2[voice][voicekey]",
    "[2:a]volume=0.12[musicpre]",
    "[musicpre][voicekey]sidechaincompress=threshold=0.018:ratio=7:attack=12:release=320[music]",
  ];
  const mixInputs = ["[voice]", "[music]"];
  for (const [index, sfx] of sfxInputs.entries()) {
    const label = `sfx${index}`;
    const delay = Number.isFinite(sfx.delay) ? Math.max(0, Math.round(sfx.delay)) : 0;
    filters.push(`[${3 + index}:a]adelay=${delay}|${delay},volume=0.13[${label}]`);
    mixInputs.push(`[${label}]`);
  }
  filters.push(
    `${mixInputs.join("")}amix=inputs=${mixInputs.length}:duration=longest:normalize=0,loudnorm=I=-16:LRA=7:TP=-1.2,alimiter=limit=0.870964,aformat=sample_rates=48000:channel_layouts=stereo[aout]`,
  );

  let videoMap = "0:v";
  if (captionInputIndex !== null) {
    filters.push(
      `[0:v]fps=30,format=yuv420p[base];[${captionInputIndex}:v]fps=30,format=rgba[captions];[base][captions]overlay=0:0:shortest=1[vout]`,
    );
    videoMap = "[vout]";
  }

  await fs.mkdir(path.dirname(path.resolve(args.output)), { recursive: true });
  ffmpegArgs.push(
    "-filter_complex",
    filters.join(";"),
    "-map",
    videoMap,
    "-map",
    "[aout]",
    "-t",
    duration.toFixed(3),
    "-c:v",
    "libx264",
    "-preset",
    "medium",
    "-crf",
    "18",
    "-pix_fmt",
    "yuv420p",
    "-c:a",
    "aac",
    "-b:a",
    "192k",
    "-ar",
    "48000",
    "-ac",
    "2",
    "-movflags",
    "+faststart",
    path.resolve(args.output),
  );
  run("ffmpeg", ffmpegArgs);
} finally {
  await fs.rm(temporaryDirectory, { recursive: true, force: true });
}

console.log(JSON.stringify({ output: path.resolve(args.output), duration, loudnessTarget: "-16 LUFS", truePeakTarget: "-1.2 dBTP" }, null, 2));
