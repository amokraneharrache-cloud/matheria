// Hooks de résolution ESM :
//  - alias "@/x"            -> <repo>/src/x(.ts|.tsx|/index.ts)
//  - "@supabase/supabase-js" et "resend" -> fakes locaux en mémoire
// Tout le reste passe par le résolveur Node natif (stripe, node:*, etc.).
import { fileURLToPath, pathToFileURL } from "node:url";
import { existsSync } from "node:fs";
import { dirname, resolve as pathResolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const srcRoot = pathResolve(here, "..", "..", "src");

const REDIRECT = {
  "@supabase/supabase-js": pathToFileURL(pathResolve(here, "fake-supabase.mjs")).href,
  resend: pathToFileURL(pathResolve(here, "fake-resend.mjs")).href,
};

export async function resolve(specifier, context, nextResolve) {
  if (REDIRECT[specifier]) {
    return { url: REDIRECT[specifier], shortCircuit: true };
  }
  if (specifier.startsWith("@/")) {
    let p = pathResolve(srcRoot, specifier.slice(2));
    if (!/\.[a-z]+$/.test(p)) {
      if (existsSync(p + ".ts")) p += ".ts";
      else if (existsSync(p + ".tsx")) p += ".tsx";
      else if (existsSync(p + "/index.ts")) p += "/index.ts";
    }
    return { url: pathToFileURL(p).href, shortCircuit: true };
  }
  return nextResolve(specifier, context);
}
