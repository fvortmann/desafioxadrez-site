import { copyFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Plugin } from "vite";

export function spaFallback(): Plugin {
  let outputDirectory: string | undefined;

  return {
    name: "github-pages-spa-fallback",
    apply: "build",
    configResolved(config) {
      outputDirectory = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      if (!outputDirectory) return;
      copyFileSync(
        resolve(outputDirectory, "index.html"),
        resolve(outputDirectory, "404.html"),
      );
    },
  };
}