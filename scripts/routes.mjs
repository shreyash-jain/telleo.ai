// Writes out/_routes.json (every page path, from the exported sitemap) for llms-full.mjs.
import { readFileSync, writeFileSync } from "node:fs";
const xml = readFileSync("out/sitemap.xml", "utf8");
const paths = [...xml.matchAll(/<loc>https:\/\/telleo\.ai([^<]*)<\/loc>/g)].map((m) => m[1] || "/");
writeFileSync("out/_routes.json", JSON.stringify(paths.filter((p) => p !== "/")));
console.log(`routes: ${paths.length}`);
