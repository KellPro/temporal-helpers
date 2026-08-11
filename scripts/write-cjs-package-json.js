import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "dist", "cjs");
mkdirSync(outDir, { recursive: true });
writeFileSync(
  join(outDir, "package.json"),
  JSON.stringify({ type: "commonjs" }, null, 2) + "\n",
);
