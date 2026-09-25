// Build out/llms-full.txt from the exported pages: the <main> of every route as
// plain text, in registry order, so what a model reads is exactly what a
// visitor reads. Runs after `next build` (see package.json).
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
const SITE = "https://telleo.ai";
const routes = ["/", ...JSON.parse(readFileSync(join(OUT, "_routes.json"), "utf8"))];

const decode = (s) =>
  s
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'").replace(/&nbsp;/g, " ").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(n));

function textOf(html) {
  const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? html;
  return decode(
    main
      .replace(/<script[\s\S]*?<\/script>/g, "")
      .replace(/<style[\s\S]*?<\/style>/g, "")
      .replace(/<(h1|h2|h3)[^>]*>/g, (_, t) => `\n\n${"#".repeat(Number(t[1]) + 0)} `)
      .replace(/<\/(h1|h2|h3)>/g, "\n")
      .replace(/<li[^>]*>/g, "\n- ").replace(/<\/(p|div|section|article|tr|details|summary|table|thead|tbody|ol|ul)>/g, "\n")
      .replace(/<\/(td|th)>/g, " | ").replace(/<br\s*\/?>/g, "\n").replace(/<\/(a|span|button)>/g, "$& ")
      .replace(/<[^>]+>/g, "")
      .replace(/[ \t]+/g, " ").replace(/ *\n */g, "\n").replace(/\n{3,}/g, "\n\n"),
  ).trim();
}

let doc = `# Telleo — full site text\n\nGenerated ${new Date().toISOString().slice(0, 10)} from ${SITE}. Short summary: ${SITE}/llms.txt\n`;
for (const r of routes) {
  const file = join(OUT, r === "/" ? "index.html" : `${r.replace(/^\/|\/$/g, "")}/index.html`);
  if (!existsSync(file)) continue;
  const html = readFileSync(file, "utf8");
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? r);
  doc += `\n\n---\n\n# ${title}\nURL: ${SITE}${r}\n\n${textOf(html)}\n`;
}
writeFileSync(join(OUT, "llms-full.txt"), doc);
writeFileSync("public/llms-full.txt", doc); // committed, so it ships even when the host runs plain `next build`
console.log(`llms-full.txt: ${routes.length} routes, ${(doc.length / 1024).toFixed(0)} KB`);
