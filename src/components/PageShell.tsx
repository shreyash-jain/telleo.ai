import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";
import type { Faq } from "@/content/types";
import { findPage, SITE, TEST_LINE, TEST_LINE_DISPLAY, bookHref } from "@/lib/site";
import { seoMetadata } from "@/lib/seo";
import { RelatedPosts } from "./RelatedPosts";
import { Breadcrumbs, CtaBand, FaqList } from "./ui";
import { JsonLd } from "./JsonLd";

/** Metadata for a registry page (src/lib/site.ts). */
export function pageMetadata(path: string): Metadata {
  const p = findPage(path);
  if (!p) throw new Error(`Page ${path} missing from PAGES in src/lib/site.ts`);
  return seoMetadata({ url: `${SITE}${path}`, title: p.title, description: p.description });
}

/**
 * Shell for the hand-written product and guide pages: header with breadcrumbs,
 * the page body, an optional FAQ block, related blog posts and a closing CTA.
 */
export function PageShell({
  path, eyebrow, h1, lede, visual, dark = false, faqs, faqTitle = "Frequently asked questions", children, hideCta = false,
}: {
  path: string;
  eyebrow: string;
  h1: React.ReactNode;
  lede: React.ReactNode;
  visual?: React.ReactNode;
  dark?: boolean;
  faqs?: Faq[];
  faqTitle?: string;
  children: React.ReactNode;
  hideCta?: boolean;
}) {
  const p = findPage(path);
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: p?.title,
          description: p?.description,
          url: `${SITE}${path}`,
          isPartOf: { "@id": `${SITE}/#website` },
          about: { "@id": `${SITE}/#app` },
        }}
      />
      <section className={`relative overflow-hidden ${dark ? "bg-ink text-white" : "border-b border-line bg-paper"}`}>
        {dark && <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />}
        {dark && <div className="glow-brand pointer-events-none absolute -right-40 -top-20 h-[32rem] w-[32rem] opacity-60" />}
        <div className={`wrap relative grid gap-12 py-12 md:py-16 [&>*]:min-w-0 ${visual ? "lg:grid-cols-[1.05fr_1fr] lg:items-center" : ""}`}>
          <div>
            <div className={dark ? "[&_a]:text-slate-400 [&_a:hover]:text-white [&_span]:text-slate-400" : ""}>
              <Breadcrumbs items={[{ label: p?.label ?? "" }]} />
            </div>
            <p className={`eyebrow mt-8 ${dark ? "eyebrow-dark" : ""}`}>{eyebrow}</p>
            <h1 className={`h-display mt-3 max-w-4xl text-4xl md:text-[3.3rem] ${dark ? "text-white" : "text-ink"}`}>{h1}</h1>
            <div className={`mt-5 max-w-2xl text-lg leading-relaxed ${dark ? "text-slate-300" : "text-slate-600"}`}>{lede}</div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={bookHref()} className="btn btn-primary btn-lg" data-track="book_demo">Book a demo <ArrowRight className="h-4 w-4" /></Link>
              <a href={`tel:${TEST_LINE}`} className={`btn btn-lg ${dark ? "btn-ghost-dark" : "btn-outline"}`} data-track="call_test_line">
                <PhoneCall className={`h-4 w-4 ${dark ? "text-brand" : "text-brand-700"}`} /> Talk to our AI: {TEST_LINE_DISPLAY}
              </a>
            </div>
          </div>
          {visual && <div>{visual}</div>}
        </div>
      </section>

      {children}

      {faqs && faqs.length > 0 && (
        <section className="wrap py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <h2 className="h-section text-ink">{faqTitle}</h2>
            <FaqList faqs={faqs} />
          </div>
        </section>
      )}

      <RelatedPosts path={path} />
      {!hideCta && <CtaBand />}
    </main>
  );
}

/** A two-column feature row used inside PageShell pages. */
export function FeatureRow({
  eyebrow, title, body, visual, flip = false, id,
}: { eyebrow?: string; title: string; body: React.ReactNode; visual: React.ReactNode; flip?: boolean; id?: string }) {
  return (
    <div id={id} className="grid gap-10 lg:grid-cols-2 lg:items-center [&>*]:min-w-0">
      <div className={flip ? "lg:order-2" : ""}>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink md:text-4xl">{title}</h2>
        <div className="mt-4 space-y-4 text-lg leading-relaxed text-slate-600">{body}</div>
      </div>
      <div className={flip ? "lg:order-1" : ""}>{visual}</div>
    </div>
  );
}
