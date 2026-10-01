import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Scale } from "lucide-react";
import { COMPARISONS, findComparison } from "@/content/comparisons";
import { Breadcrumbs, CheckList, CtaBand, FaqList } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { seoMetadata } from "@/lib/seo";
import { SITE, bookHref } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = findComparison((await params).slug);
  if (!c) return {};
  return seoMetadata({ url: `${SITE}/compare/${c.slug}/`, title: c.title, description: c.description, type: "article" });
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const fmt = (d: string) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const c = findComparison((await params).slug);
  if (!c) notFound();
  const others = COMPARISONS.filter((x) => x.slug !== c.slug);

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: c.title,
          description: c.description,
          mainEntityOfPage: `${SITE}/compare/${c.slug}/`,
          dateModified: c.sources[0]?.checked ?? "2026-09-25",
          author: { "@type": "Organization", name: "Telleo", url: SITE },
          publisher: { "@id": `${SITE}/#org` },
        }}
      />
      <section className="border-b border-line bg-paper">
        <div className="wrap py-12 md:py-16">
          <Breadcrumbs items={[{ label: "Compare", href: "/compare/" }, { label: c.label }]} />
          <p className="eyebrow mt-8"><Scale className="h-4 w-4" /> Comparison</p>
          <h1 className="h-display mt-3 max-w-4xl text-4xl text-ink md:text-[3.2rem]">{c.h1}</h1>
          <p className="lede mt-5 max-w-3xl">{c.lede}</p>
          <div className="mt-8 max-w-4xl rounded-2xl bg-ink p-6 text-white md:p-8">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-300">The short answer</p>
            <p className="mt-2 text-lg leading-relaxed text-slate-200">{c.verdict}</p>
          </div>
        </div>
      </section>

      <section className="wrap py-16 md:py-20">
        <h2 className="h-section text-ink">Side by side</h2>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[44rem] text-left text-sm">
            <thead>
              <tr className="bg-paper">
                <th className="w-[22%] px-5 py-4 font-semibold text-slate-500" />
                <th className="px-5 py-4 text-base font-extrabold text-ink"><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-brand" /> Telleo</span></th>
                <th className="px-5 py-4 text-base font-bold text-ink">{cap(c.other)}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {c.rows.map((r) => (
                <tr key={r.dimension}>
                  <th scope="row" className="px-5 py-4 align-top font-semibold text-slate-700">{r.dimension}</th>
                  <td className="bg-brand-50/50 px-5 py-4 align-top leading-relaxed text-slate-800">{r.telleo}</td>
                  <td className="px-5 py-4 align-top leading-relaxed text-slate-600">{r.other}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-brand-200 bg-brand-50 p-7">
            <h2 className="text-xl font-extrabold text-ink">Choose Telleo if…</h2>
            <div className="mt-5"><CheckList items={c.chooseTelleoIf} /></div>
          </div>
          <div className="rounded-2xl border border-line bg-white p-7">
            <h2 className="text-xl font-extrabold text-ink">Choose {c.other} if…</h2>
            <ul className="mt-5 space-y-3">
              {c.chooseOtherIf.map((t, i) => (
                <li key={i} className="flex gap-3 leading-relaxed text-slate-700">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="wrap grid gap-12 py-16 md:py-20 lg:grid-cols-[1fr_20rem]">
          <div className="prose-t max-w-3xl">
            {c.sections.map((s) => (
              <div key={s.heading}>
                <h2>{s.heading}</h2>
                {s.body.map((p, i) => <p key={i} className="mt-4">{p}</p>)}
              </div>
            ))}
          </div>
          <aside className="space-y-5">
            <div className="rounded-2xl bg-ink p-6 text-white lg:sticky lg:top-24">
              <p className="font-bold">See it on your own calls</p>
              <p className="mt-2 text-sm text-slate-300">A 20-minute demo on your script. Compare for yourself.</p>
              <Link href={bookHref()} className="btn btn-primary mt-4 w-full" data-track="book_demo">Book a demo</Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="wrap py-16">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <h2 className="h-section text-ink">Questions</h2>
          <FaqList faqs={c.faqs} />
        </div>
        {c.sources.length > 0 && (
          <div className="mt-14 border-t border-line pt-8">
            <h2 className="text-lg font-extrabold text-ink">Sources</h2>
            <p className="mt-1 text-sm text-slate-500">Third-party facts on this page come from these public pages. Vendors change prices and features; check before you buy.</p>
            <ol className="mt-4 space-y-1.5 text-sm">
              {c.sources.map((s, i) => (
                <li key={i}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className="font-semibold text-brand-700 underline underline-offset-4">{s.label}</a>
                  <span className="text-slate-500"> — checked {fmt(s.checked)}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </section>

      <section className="border-t border-line bg-paper">
        <div className="wrap py-14">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">Other comparisons</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <Link key={o.slug} href={`/compare/${o.slug}/`} className="card card-hover flex items-center justify-between gap-3 p-4 font-semibold text-ink">
                {o.label} <ArrowRight className="h-4 w-4 text-slate-400" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </main>
  );
}
