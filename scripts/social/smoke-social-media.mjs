#!/usr/bin/env node

import { spawnSync } from "node:child_process";

function run(command, args) {
  const result = spawnSync(command, args, { encoding: "utf8" });
  if (result.status !== 0) throw new Error(`${command} a échoué:\n${result.stderr || result.stdout}`);
  return { stdout: result.stdout, stderr: result.stderr };
}

const target = process.argv[2];
if (!target) throw new Error("Usage: smoke-social-media.mjs master.mp4");

const probe = JSON.parse(
  run("ffprobe", ["-v", "error", "-show_streams", "-show_format", "-of", "json", target]).stdout,
);
const video = probe.streams.find((stream) => stream.codec_type === "video");
const audio = probe.streams.find((stream) => stream.codec_type === "audio");
const assertions = [
  [video?.codec_name === "h264", `codec vidéo attendu h264, reçu ${video?.codec_name}`],
  [video?.width === 1080 && video?.height === 1920, `format attendu 1080x1920, reçu ${video?.width}x${video?.height}`],
  [audio?.codec_name === "aac", `codec audio attendu aac, reçu ${audio?.codec_name}`],
  [Number(audio?.sample_rate) === 48000, `fréquence attendue 48 kHz, reçue ${audio?.sample_rate}`],
  [audio?.channels === 2, `audio attendu stéréo, reçu ${audio?.channels} canaux`],
];

const videoDuration = Number(video?.duration ?? probe.format?.duration);
const audioDuration = Number(audio?.duration ?? probe.format?.duration);
assertions.push([
  Math.abs(videoDuration - audioDuration) <= 0.2,
  `désynchronisation audio/vidéo de ${Math.abs(videoDuration - audioDuration).toFixed(3)} s`,
]);

const volumeLog = run("ffmpeg", ["-hide_banner", "-nostats", "-i", target, "-map", "0:a:0", "-af", "volumedetect", "-f", "null", "-"]).stderr;
const meanVolume = Number(volumeLog.match(/mean_volume:\s*(-?[\d.]+) dB/)?.[1]);
const maxVolume = Number(volumeLog.match(/max_volume:\s*(-?[\d.]+) dB/)?.[1]);
assertions.push([Number.isFinite(meanVolume) && meanVolume > -35, `piste probablement muette : niveau moyen ${meanVolume} dB`]);
assertions.push([Number.isFinite(maxVolume) && maxVolume <= -0.8, `pic trop élevé : ${maxVolume} dBFS`]);

run("ffmpeg", ["-v", "error", "-xerror", "-i", target, "-f", "null", "-"]);

const failures = assertions.filter(([valid]) => !valid).map(([, message]) => message);
if (failures.length) throw new Error(`Smoke test média refusé :\n- ${failures.join("\n- ")}`);

console.log(
  JSON.stringify(
    { target, video: `${video.codec_name} ${video.width}x${video.height}`, audio: `${audio.codec_name} ${audio.sample_rate} Hz ${audio.channels} canaux`, videoDuration, audioDuration, meanVolume, maxVolume },
    null,
    2,
  ),
);
