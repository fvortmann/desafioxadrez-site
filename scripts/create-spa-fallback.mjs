import { copyFileSync } from "node:fs";
import { resolve } from "node:path";

// GitHub Pages serves this document for deep links that have no physical file.
const outputDirectory = resolve(process.argv[2] ?? "dist");
copyFileSync(
  resolve(outputDirectory, "index.html"),
  resolve(outputDirectory, "404.html"),
);