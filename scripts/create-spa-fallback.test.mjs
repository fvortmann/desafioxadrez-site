import { strict as assert } from "node:assert";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";

test("GitHub Pages fallback preserves the complete application entry document", () => {
  const directory = mkdtempSync(join(tmpdir(), "chess-spa-fallback-"));
  try {
    const document = '<!doctype html><html><body><div id="root"></div><script type="module" src="/assets/app.js"></script></body></html>';
    writeFileSync(join(directory, "index.html"), document);
    execFileSync(process.execPath, [
      new URL("./create-spa-fallback.mjs", import.meta.url).pathname,
      directory,
    ]);
    assert.equal(readFileSync(join(directory, "404.html"), "utf8"), document);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});