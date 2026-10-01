import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Lightbulb, AlertTriangle, Info } from "lucide-react";
import { POSTS, findPost, postPath } from "@/content/posts";
import type { Faq, Source } from "@/content/types";
import { SITE, bookHref } from "@/lib/site";
import { seoMetadata } from "@/lib/seo";
import { Breadcrumbs, CtaBand, FaqList } from "./ui";
import { JsonLd } from "./JsonLd";

const fmt = (d: string) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function postMetadata(slug: string): Metadata {
  const p = findPost(slug);
  if (!p) return {};
  return {
    ...seoMetadata({
      url: `${SITE}${postPath(slug)}`, title: p.title, description: p.description, type: "article",
      extra: { publishedTime: p.published, modifiedTime: p.updated ?? p.published },
    }),
    keywords: p.keywords,
  };
}

export function BlogShell({
  slug, takeaways, toc, faqs, children,
}: {
  slug: string;
  /** 3–5 one-sentence takeaways shown above the article. */
  takeaways: string[];
  /** Section anchors: each id must match an <h2 id> in the article. */
  toc: { id: string; label: string }[];
  faqs?: Faq[];
  children: React.ReactNode;
}) {
  const p = findPost(slug);
  if (!p) throw new Error(`Unknown post ${slug} — add it to src/content/posts-*.ts`);
  const related = POSTS.filter((x) => x.slug !== slug).slice(0, 3);
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: p.title,
          description: p.description,
          datePublished: p.published,
          dateModified: p.updated ?? p.published,
          mainEntityOfPage: `${SITE}${postPath(slug)}`,
          keywords: p.keywords.join(", "),
          author: { "@type": "Organization", name: "Telleo", url: SITE },
          publisher: { "@type": "Organization", name: "Telleo", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.png` } },
          image: `${SITE}/og.png`,
        }}
      />
      <header className="border-b border-line bg-paper">
        <div className="wrap py-10 md:py-14">
          <Breadcrumbs items={[{ label: "Blog", href: "/blog/" }, { label: p.title }]} />
          <p className="eyebrow mt-8">{p.category}</p>
          <h1 className="h-display mt-3 max-w-4xl text-4xl text-ink md:text-5xl">{p.title}</h1>
          <p className="lede mt-5 max-w-3xl">{p.description}</p>
          <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
            <span>By the Telleo team</span>
            <span aria-hidden>·</span>
            <time dateTime={p.updated ?? p.published}>{p.updated ? `Updated ${fmt(p.updated)}` : fmt(p.published)}</time>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {p.readMinutes} min read</span>
          </p>
        </div>
      </header>

      <div className="wrap grid gap-12 py-12 lg:grid-cols-[1fr_17rem] lg:py-16">
        <article className="min-w-0 max-w-3xl">
          <section className="rounded-2xl border border-brand-200 bg-brand-50 p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-brand-800">Key takeaways</h2>
            <ul className="mt-3 space-y-2 text-[0.98rem] leading-relaxed text-slate-800">
              {takeaways.map((t, i) => (
                <li key={i} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-700" />{t}</li>
              ))}
            </ul>
          </section>
          <div className="prose-t mt-10">{children}</div>
          {faqs && faqs.length > 0 && (
            <section className="mt-14">
              <h2 id="faq" className="text-2xl font-extrabold tracking-tight text-ink">Frequently asked questions</h2>
              <div className="mt-5"><FaqList faqs={faqs} /></div>
            </section>
          )}
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            <nav aria-label="On this page" className="rounded-2xl border border-line p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">On this page</p>
              <ol className="mt-3 space-y-2 text-sm">
                {toc.map((t) => (
                  <li key={t.id}><a href={`#${t.id}`} className="text-slate-600 hover:text-brand-700">{t.label}</a></li>
                ))}
              </ol>
            </nav>
            <div className="rounded-2xl bg-ink p-5 text-white">
              <p className="font-bold">See Telleo on a live call</p>
              <p className="mt-2 text-sm text-slate-300">20 minutes. Bring your script; we'll show it on a real phone line.</p>
              <Link href={bookHref()} className="btn btn-primary mt-4 w-full" data-track="book_demo">Book a demo</Link>
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="border-t border-line bg-paper">
          <div className="wrap py-14">
            <h2 className="text-2xl font-extrabold tracking-tight text-ink">Keep reading</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} href={postPath(r.slug)} className="card card-hover group p-6">
                  <p className="eyebrow">{r.category}</p>
                  <p className="mt-2 font-bold leading-snug text-ink group-hover:text-brand-700">{r.title}</p>
                  <p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">Read <ArrowRight className="h-3.5 w-3.5" /></p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <CtaBand />
    </main>
  );
}

const TONES = {
  tip: { Icon: Lightbulb, box: "border-brand-200 bg-brand-50", icon: "text-brand-700" },
  warn: { Icon: AlertTriangle, box: "border-amber/40 bg-amber-50", icon: "text-amber" },
  info: { Icon: Info, box: "border-line bg-paper", icon: "text-sky" },
} as const;

export function Callout({ title, tone = "info", children }: { title?: string; tone?: keyof typeof TONES; children: React.ReactNode }) {
  const t = TONES[tone];
  return (
    <aside className={`not-prose flex gap-3 rounded-2xl border p-5 text-[0.98rem] leading-relaxed text-slate-700 ${t.box}`}>
      <t.Icon className={`mt-0.5 h-5 w-5 shrink-0 ${t.icon}`} aria-hidden />
      <div>
        {title && <p className="mb-1 font-bold text-ink">{title}</p>}
        <div className="space-y-2">{children}</div>
      </div>
    </aside>
  );
}

export function Steps({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ol className="!list-none !pl-0 space-y-4">
      {items.map((s, i) => (
        <li key={i} className="flex gap-4 rounded-2xl border border-line p-5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-sm font-bold text-brand">{i + 1}</span>
          <div>
            <p className="font-bold text-ink">{s.title}</p>
            <p className="mt-1 text-slate-600">{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Table({ head, rows, caption }: { head: string[]; rows: (string | React.ReactNode)[][]; caption?: string }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line">
      <table className="!m-0 min-w-[36rem]">
        {caption && <caption className="px-4 pt-3 text-left text-sm text-slate-500">{caption}</caption>}
        <thead>
          <tr>{head.map((h, i) => <th key={i}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** A short, clearly labelled section on where Telleo fits. Keep it factual. */
export function WhereTelleoFits({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-ink p-6 text-slate-300 md:p-8">
      <p className="text-xs font-bold uppercase tracking-wider text-brand-300">Where Telleo fits</p>
      <div className="mt-3 space-y-3 leading-relaxed [&_a]:text-brand-300 [&_strong]:text-white">{children}</div>
      <Link href={bookHref()} className="btn btn-primary mt-5 !no-underline" data-track="book_demo">Book a demo <ArrowRight className="h-4 w-4" /></Link>
    </section>
  );
}

export function Sources({ items }: { items: Source[] }) {
  return (
    <section className="border-t border-line pt-6">
      <h2 id="sources" className="!mt-0 !text-lg">Sources</h2>
      <ol className="mt-3 space-y-1.5 text-sm">
        {items.map((s, i) => (
          <li key={i}>
            <a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
            <span className="text-slate-500"> — checked {fmt(s.checked)}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
