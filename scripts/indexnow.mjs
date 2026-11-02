// Tell Bing, Yandex, Seznam and Naver (via IndexNow) that URLs changed. Bing's index also feeds
// ChatGPT search and Copilot. Run AFTER a deploy is live:
//   pnpm indexnow                       # every URL in the live sitemap
//   pnpm indexnow /blog/some-post/ ...  # only these paths
// The key file public/50cb5d6e797eaeb5aa0568b1e9c99e9e.txt must stay deployed at the site root.
const SITE = "https://telleo.ai";
const KEY = "50cb5d6e797eaeb5aa0568b1e9c99e9e";

const args = process.argv.slice(2);
let urls = args.map((p) => new URL(p, SITE).href);
if (urls.length === 0) {
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urls.length} URL(s)`);
if (!res.ok && res.status !== 202) process.exit(1);
