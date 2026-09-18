import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const distDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "dist",
);

export function distJsFiles(): string[] {
  return readdirSync(distDir).filter((f) => f.endsWith(".js"));
}

export function distJsContents(): string[] {
  return distJsFiles().map((f) => readFileSync(path.join(distDir, f), "utf8"));
}

export function totalDistJsBytes(): number {
  return distJsFiles().reduce(
    (sum, f) => sum + statSync(path.join(distDir, f)).size,
    0,
  );
}
