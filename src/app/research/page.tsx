import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/components/PageShell";
import { LandscapeMap, Legend } from "@/components/research/charts";
import { fmt } from "@/components/research/ResearchShell";
import { LANDSCAPE_SLUG, OTHERS, RESEARCH_UPDATED, VENDORS, capCount, landscapeMapPoints } from "@/content/research/landscape";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata("/research/");

const REPORTS = [
  {
    href: `/research/${LANDSCAPE_SLUG}/`,
    eyebrow: "Platform landscape",
    title: `Voice AI Platform Landscape 2026: ${VENDORS.length} AI calling platforms compared`,
    summary: `${VENDORS.length} Indian and global voice-AI vendors scored on 14 capabilities, from Hinglish and live transfer to CRM, lead-ad connectors and WhatsApp follow-up. Only ${capCount("built_in_crm")} of ${OTHERS.length} document a built-in CRM. Map, full matrix and a free CSV.`,
    updated: RESEARCH_UPDATED,
  },
];

export default function Page() {
  return (
    <main className="bg-paper pb-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${SITE}/research/#collection`,
          name: "Telleo Research",
          url: `${SITE}/research/`,
          isPartOf: { "@id": `${SITE}/#website` },
          hasPart: REPORTS.map((r) => ({ "@type": "Report", name: r.title, url: `${SITE}${r.href}`, dateModified: r.updated })),
        }}
      />
      <div className="wrap pt-10 md:pt-14">
        <Breadcrumbs items={[{ label: "Research" }]} />
        <p className="eyebrow mt-8">Telleo Research</p>
        <h1 className="h-display mt-3 max-w-3xl text-4xl text-ink md:text-[3.1rem]">Research on AI voice calling</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
          Sourced, downloadable research on the AI calling market for Indian sales, admissions and support teams. Every
          score links to the vendor&apos;s own pages, the method is published, and the data is free to reuse under CC BY 4.0.
        </p>

        <div className="mt-12 grid gap-6">
          {REPORTS.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="group grid gap-8 rounded-3xl border border-line bg-white p-6 transition hover:border-brand-300 hover:shadow-lg md:grid-cols-[1fr_1.1fr] md:p-8"
            >
              <div className="flex flex-col">
                <p className="eyebrow">{r.eyebrow}</p>
                <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-ink md:text-3xl">{r.title}</h2>
                <p className="mt-4 leading-relaxed text-slate-600">{r.summary}</p>
                <p className="mt-4 text-sm text-slate-500">Updated <time dateTime={r.updated}>{fmt(r.updated)}</time></p>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-700">
                  Read the report <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
              <div aria-hidden="true" className="pointer-events-none hidden md:block">
                <Legend keys={["telleo", "india", "global"]} />
                <LandscapeMap
                  ariaLabel="Preview of the Voice AI Platform Map"
                  xLabel="Conversation coverage"
                  yLabel="Business-workflow coverage"
                  zones={["Workflow-first", "Full-stack", "Point tools", "Conversation-first"]}
                  points={landscapeMapPoints({ Telleo: "below-left" })}
                  minWidthClass="min-w-0"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
