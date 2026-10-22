import { Breadcrumbs } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { SALES_EMAIL, SITE } from "@/lib/site";

export type Source = { id: string; title: string; publisher: string; url: string; type: "Primary" | "Vendor" | "Press" | "Estimate" };

export type DatasetMeta = {
  name: string;
  description: string;
  /** Path under /public, e.g. "/research/voice-ai-platform-landscape-2026.csv". */
  csv: string;
  keywords: string[];
};

/**
 * Shell for /research/* reports: the key numbers near the top in quotable
 * sentences, a visible updated date, a disclosure, a method section, numbered
 * sources and a downloadable dataset marked up as Dataset. No FAQPage (Google
 * retired FAQ rich results in 2026).
 */
export function ResearchShell({
  slug, eyebrow, title, dek, published, updated, sources, dataset, children,
}: {
  slug: string;
  eyebrow: string;
  title: string;
  dek: string;
  published: string;
  updated: string;
  sources: Source[];
  dataset?: DatasetMeta;
  children: React.ReactNode;
}) {
  const url = `${SITE}/research/${slug}/`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Report",
      "@id": `${url}#report`,
      headline: title,
      description: dek,
      url,
      datePublished: published,
      dateModified: updated,
      inLanguage: "en",
      author: { "@id": `${SITE}/#org` },
      publisher: { "@id": `${SITE}/#org` },
      citation: sources.map((s) => ({ "@type": "CreativeWork", name: s.title, publisher: s.publisher, url: s.url })),
    },
  ];
  if (dataset) {
    graph.push({
      "@type": "Dataset",
      "@id": `${url}#dataset`,
      name: dataset.name,
      description: dataset.description,
      url,
      keywords: dataset.keywords,
      license: "https://creativecommons.org/licenses/by/4.0/",
      isAccessibleForFree: true,
      creator: { "@id": `${SITE}/#org` },
      dateModified: updated,
      distribution: [{ "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: `${SITE}${dataset.csv}` }],
    });
  }

  return (
    <main className="bg-paper pb-16">
      <JsonLd data={{ "@context": "https://schema.org", "@graph": graph }} />
      <article className="mx-auto max-w-4xl px-5 pt-10 sm:px-6 md:pt-14">
        <Breadcrumbs items={[{ label: "Research", href: "/research/" }, { label: title.split(":")[0] }]} />
        <p className="eyebrow mt-8">{eyebrow}</p>
        <h1 className="h-display mt-3 text-3xl text-ink sm:text-4xl lg:text-[2.9rem]">{title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-700">{dek}</p>
        <p className="mt-5 text-sm text-slate-500">
          By the Telleo research team · Published <time dateTime={published}>{fmt(published)}</time> · Updated{" "}
          <time dateTime={updated}>{fmt(updated)}</time>
          {dataset && (
            <>
              {" · "}
              <a href={dataset.csv} download className="font-semibold text-brand-700 underline underline-offset-2">
                Download the data (CSV)
              </a>
            </>
          )}
        </p>

        <div role="note" className="mt-6 rounded-xl border border-amber/40 bg-amber-50 p-4 text-sm leading-relaxed text-slate-700">
          <strong className="text-ink">Disclosure.</strong> Telleo publishes this report and sells AI voice agents, so we are one
          of the vendors in this market. Telleo is scored with the same rubric as everyone else, from its own public product
          pages. Every vendor row links to its sources, the method is published below, and anything we could not verify is
          marked as not documented rather than guessed. Spot an error? Write to{" "}
          <a href={`mailto:${SALES_EMAIL}`} className="font-semibold underline">{SALES_EMAIL}</a> with a link and we will correct it.
        </div>

        <div className="research-prose mt-10">{children}</div>

        <section aria-labelledby="sources" className="mt-14 border-t border-line pt-8">
          <h2 id="sources" className="text-2xl font-extrabold tracking-tight text-ink">Sources</h2>
          <ol className="mt-4 space-y-2 text-sm text-slate-600">
            {sources.map((s) => (
              <li key={s.id} id={`src-${s.id}`} className="scroll-mt-24">
                <span className="font-mono text-xs text-slate-500">[{s.id}]</span>{" "}
                <a href={s.url} rel="noopener nofollow" target="_blank" className="text-ink underline underline-offset-2 hover:text-brand-700">
                  {s.title}
                </a>{" "}
                — {s.publisher} <span className="text-xs text-slate-500">({s.type})</span>
              </li>
            ))}
          </ol>
        </section>
      </article>
    </main>
  );
}

/** A headline number with one quotable sentence beside it. */
export function KeyStat({ value, label }: { value: string; label: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5">
      <div className="h-display text-3xl text-ink">{value}</div>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{label}</p>
    </div>
  );
}

export function fmt(iso: string) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
