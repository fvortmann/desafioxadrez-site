import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import type { ResolvedConfig } from "vite";
import { spaFallback } from "../../scripts/spa-fallback";

describe("GitHub Pages fallback", () => {
  for (const mode of ["development", "production"]) {
    it(`copies the full entry document using the resolved output directory in ${mode}`, async () => {
      const root = mkdtempSync(join(tmpdir(), "chess-fallback-"));
      try {
        const document = '<!doctype html><html><body><div id="root"></div><script type="module" src="/assets/app.js"></script></body></html>';
        writeFileSync(join(root, "index.html"), document);
        const plugin = spaFallback();
        const config = { root, mode, build: { outDir: "." } } as ResolvedConfig;
        const resolvedHook = plugin.configResolved;
        const closeHook = plugin.closeBundle;
        if (typeof resolvedHook !== "function" || typeof closeHook !== "function") {
          throw new Error("Fallback lifecycle hooks must be present");
        }
        await resolvedHook(config);
        await closeHook.call({} as never);
        expect(readFileSync(join(root, "404.html"), "utf8")).toBe(document);
        expect(plugin.apply).toBe("build");
      } finally {
        rmSync(root, { recursive: true, force: true });
      }
    });
  }
});