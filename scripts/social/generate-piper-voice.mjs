#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { spawnSync } from "node:child_process";

const PIPER_VERSION = "1.7.0";
const VOICE = "fr_FR-siwis-medium";
const DEFAULT_CACHE = path.resolve(".audio-cache/piper");

function parseArgs(argv) {
  const values = { lengthScale: "0.82", voiceDir: DEFAULT_CACHE };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    const value = argv[index + 1];
    if (argument === "--text-file") values.textFile = value;
    else if (argument === "--output") values.output = value;
    else if (argument === "--voice-dir") values.voiceDir = path.resolve(value);
    else if (argument === "--length-scale") values.lengthScale = value;
    else throw new Error(`Argument inconnu : ${argument}`);
    index += 1;
  }
  if (!values.textFile || !values.output) {
    throw new Error(
      "Usage: generate-piper-voice.mjs --text-file texte.txt --output voix.wav [--length-scale 0.82]",
    );
  }
  return values;
}

function run(command, args) {
  const result = spawnSync(command, args, { encoding: "utf8" });
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} a échoué:\n${result.stderr || result.stdout}`);
  }
}

const args = parseArgs(process.argv.slice(2));
const uv = process.env.UV_BIN || path.join(process.env.HOME ?? "", ".local/bin/uv");
const model = path.join(args.voiceDir, `${VOICE}.onnx`);
const config = `${model}.json`;

await fs.mkdir(args.voiceDir, { recursive: true });
await fs.mkdir(path.dirname(path.resolve(args.output)), { recursive: true });

try {
  await Promise.all([fs.access(model), fs.access(config)]);
} catch {
  run(uv, [
    "tool",
    "run",
    "--from",
    `piper-tts==${PIPER_VERSION}`,
    "python",
    "-m",
    "piper.download_voices",
    "--download-dir",
    args.voiceDir,
    VOICE,
  ]);
}

run(uv, [
  "tool",
  "run",
  "--from",
  `piper-tts==${PIPER_VERSION}`,
  "piper",
  "--model",
  model,
  "--config",
  config,
  "--input-file",
  path.resolve(args.textFile),
  "--output-file",
  path.resolve(args.output),
  "--length-scale",
  args.lengthScale,
  "--sentence-silence",
  "0.08",
]);

console.log(JSON.stringify({ output: path.resolve(args.output), voice: VOICE, piper: PIPER_VERSION }, null, 2));
