import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowRight, PhoneCall } from "lucide-react";
import { INDUSTRIES, findIndustry } from "@/content/industries";
import { findUseCase } from "@/content/useCases";
import { Breadcrumbs, CheckList, CtaBand, FaqList, Icon, Transcript } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { SITE, TEST_LINE, TEST_LINE_DISPLAY, bookHref } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const i = findIndustry((await params).slug);
  if (!i) return {};
  const url = `${SITE}/industries/${i.slug}/`;
  return {
    title: i.title,
    description: i.description,
    alternates: { canonical: url },
    openGraph: { url, title: i.title, description: i.description, type: "article" },
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const ind = findIndustry((await params).slug);
  if (!ind) notFound();
  const others = INDUSTRIES.filter((x) => x.slug !== ind.slug);

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: ind.title,
          description: ind.description,
          url: `${SITE}/industries/${ind.slug}/`,
          isPartOf: { "@id": `${SITE}/#website` },
        }}
      />
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-50" />
        <div className="wrap relative grid gap-12 py-12 md:py-16 lg:grid-cols-[1.1fr_1fr] lg:items-start [&>*]:min-w-0">
          <div>
            <div className="[&_a]:text-slate-400 [&_a:hover]:text-white [&_span]:text-slate-400">
              <Breadcrumbs items={[{ label: "Industries", href: "/industries/" }, { label: ind.label }]} />
            </div>
            <p className="eyebrow eyebrow-dark mt-8"><Icon name={ind.icon} className="h-4 w-4" /> {ind.label}</p>
            <h1 className="h-display mt-3 text-4xl md:text-[3.2rem]">{ind.h1}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">{ind.lede}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={bookHref()} className="btn btn-primary btn-lg" data-track="book_demo">Book a demo <ArrowRight className="h-4 w-4" /></Link>
              <a href={`tel:${TEST_LINE}`} className="btn btn-ghost-dark btn-lg" data-track="call_test_line"><PhoneCall className="h-4 w-4 text-brand" /> {TEST_LINE_DISPLAY}</a>
            </div>
          </div>
          <Transcript lines={ind.sampleCall} title={`Sample call · ${ind.label}`} />
        </div>
      </section>

      {/* Challenges */}
      <section className="wrap py-16 md:py-24">
        <p className="eyebrow">The phone problem</p>
        <h2 className="h-section mt-3 max-w-3xl text-ink">Where calls slip in {ind.label.toLowerCase()}</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {ind.challenges.map((c, i) => (
            <div key={i} className="card p-7">
              <span className="font-mono text-sm text-slate-400">0{i + 1}</span>
              <h3 className="mt-2 text-lg font-extrabold text-ink">{c.title}</h3>
              <p className="mt-2 leading-relaxed text-slate-600">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Plays */}
      <section className="border-y border-line bg-paper">
        <div className="wrap py-16 md:py-24">
          <p className="eyebrow">What Telleo does</p>
          <h2 className="h-section mt-3 max-w-3xl text-ink">The calls your AI agents make</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {ind.plays.map((p, i) => {
              const uc = p.useCase ? findUseCase(p.useCase) : undefined;
              return (
                <div key={i} className="card flex flex-col p-6">
                  {uc && <Icon name={uc.icon} className="h-6 w-6 text-brand-700" />}
                  <h3 className="mt-4 text-lg font-extrabold text-ink">{p.title}</h3>
                  <p className="mt-2 flex-1 leading-relaxed text-slate-600">{p.body}</p>
                  {uc && (
                    <Link href={`/use-cases/${uc.slug}/`} className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-700">
                      {uc.label} <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Captures + rollout */}
      <section className="wrap py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Into your CRM</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink">Answers worth capturing</h2>
            <div className="mt-6"><CheckList items={ind.captures} /></div>
          </div>
          <div>
            <p className="eyebrow">Day one</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink">A first rollout</h2>
            <ol className="mt-6 space-y-4">
              {ind.rollout.map((r, i) => (
                <li key={i} className="flex gap-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink font-mono text-sm font-bold text-brand">{i + 1}</span>
                  <div>
                    <p className="font-bold text-ink">{r.step}</p>
                    <p className="mt-1 text-slate-600">{r.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="mt-12 rounded-2xl border border-amber/40 bg-amber-50 p-6 md:p-8">
          <p className="flex items-center gap-2 font-extrabold text-ink"><AlertTriangle className="h-5 w-5 text-amber" /> Be careful with</p>
          <ul className="mt-4 space-y-2 text-slate-700">
            {ind.cautions.map((c, i) => (
              <li key={i} className="flex gap-2"><span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" /> {c}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="wrap pb-16">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <h2 className="h-section text-ink">{ind.label}: common questions</h2>
          <FaqList faqs={ind.faqs} />
        </div>
      </section>

      <section className="border-t border-line bg-paper">
        <div className="wrap py-14">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">Other industries</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {others.map((o) => (
              <Link key={o.slug} href={`/industries/${o.slug}/`} className="chip hover:border-brand">
                <Icon name={o.icon} className="h-4 w-4 text-brand-700" /> {o.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </main>
  );
}
