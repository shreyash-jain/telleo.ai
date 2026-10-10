import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BarChart3, ListChecks, PhoneCall } from "lucide-react";
import { USE_CASES, findUseCase } from "@/content/useCases";
import { INDUSTRIES } from "@/content/industries";
import { Breadcrumbs, CheckList, CtaBand, FaqList, Icon, Transcript } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { RelatedPosts } from "@/components/RelatedPosts";
import { seoMetadata } from "@/lib/seo";
import { PRODUCT_NAV } from "@/lib/nav";
import { SITE, TEST_LINE, TEST_LINE_DISPLAY, bookHref } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return USE_CASES.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const u = findUseCase((await params).slug);
  if (!u) return {};
  return seoMetadata({ url: `${SITE}/use-cases/${u.slug}/`, title: u.title, description: u.description, type: "article" });
}

export default async function UseCasePage({ params }: { params: Promise<{ slug: string }> }) {
  const u = findUseCase((await params).slug);
  if (!u) notFound();
  const industries = INDUSTRIES.filter((i) => u.industries.includes(i.slug));
  const others = USE_CASES.filter((x) => x.slug !== u.slug).slice(0, 6);

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: u.title,
          description: u.description,
          url: `${SITE}/use-cases/${u.slug}/`,
          about: { "@type": "Thing", name: u.label },
          isPartOf: { "@id": `${SITE}/#website` },
        }}
      />
      {/* Header */}
      <section className="border-b border-line bg-paper">
        <div className="wrap grid gap-12 py-12 md:py-16 lg:grid-cols-[1.1fr_1fr] lg:items-start [&>*]:min-w-0">
          <div>
            <Breadcrumbs items={[{ label: "Use cases", href: "/use-cases/" }, { label: u.label }]} />
            <p className="eyebrow mt-8"><Icon name={u.icon} className="h-4 w-4" /> Use case</p>
            <h1 className="h-display mt-3 text-4xl text-ink md:text-[3.2rem]">{u.h1}</h1>
            <p className="lede mt-5 max-w-2xl">{u.lede}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={bookHref()} className="btn btn-primary btn-lg" data-track="book_demo">Book a demo <ArrowRight className="h-4 w-4" /></Link>
              <a href={`tel:${TEST_LINE}`} className="btn btn-outline btn-lg" data-track="call_test_line"><PhoneCall className="h-4 w-4 text-brand-700" /> {TEST_LINE_DISPLAY}</a>
            </div>
          </div>
          <Transcript lines={u.sampleCall} title={`Sample call · ${u.label}`} />
        </div>
      </section>

      {/* Problem */}
      <section className="wrap py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <h2 className="h-section text-ink">{u.problem.heading}</h2>
          <div className="space-y-4 text-lg leading-relaxed text-slate-600">
            {u.problem.body.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </section>

      {/* Flow */}
      <section className="border-y border-line bg-paper">
        <div className="wrap py-16 md:py-24">
          <p className="eyebrow">On the call</p>
          <h2 className="h-section mt-3 max-w-3xl text-ink">What the agent does, step by step</h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {u.flow.map((f, i) => (
              <li key={i} className="card p-6">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-ink font-mono text-sm font-bold text-brand">{i + 1}</span>
                <h3 className="mt-4 font-extrabold text-ink">{f.step}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">{f.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Captures + outcomes */}
      <section className="wrap py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Into your CRM</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink">What it captures on every call</h2>
            <div className="mt-6"><CheckList items={u.captures} /></div>
          </div>
          <div>
            <p className="eyebrow">After the call</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink">What happens next</h2>
            <div className="mt-6 overflow-hidden rounded-2xl border border-line">
              <table className="w-full text-left text-sm">
                <thead className="bg-paper">
                  <tr><th className="px-4 py-3 font-bold text-ink">When</th><th className="px-4 py-3 font-bold text-ink">Then</th></tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {u.outcomes.map((o, i) => (
                    <tr key={i}>
                      <td className="px-4 py-3 align-top font-mono text-[0.8rem] text-slate-600">{o.when}</td>
                      <td className="px-4 py-3 align-top text-slate-800">{o.then}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Setup + metrics */}
      <section className="bg-ink text-white">
        <div className="wrap grid gap-10 py-16 md:py-24 lg:grid-cols-2">
          <div className="card-dark p-7">
            <ListChecks className="h-6 w-6 text-brand" />
            <h2 className="mt-4 text-2xl font-extrabold">Set it up</h2>
            <div className="mt-5"><CheckList dark items={u.setup} /></div>
          </div>
          <div className="card-dark p-7">
            <BarChart3 className="h-6 w-6 text-brand" />
            <h2 className="mt-4 text-2xl font-extrabold">What to measure</h2>
            <ul className="mt-5 space-y-3">
              {u.metrics.map((m, i) => (
                <li key={i} className="rounded-xl bg-white/[0.05] px-4 py-3 text-slate-300">{m}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Industries */}
      {industries.length > 0 && (
        <section className="wrap py-16">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">Where teams use it most</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((i) => (
              <Link key={i.slug} href={`/industries/${i.slug}/`} className="card card-hover flex items-start gap-4 p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700"><Icon name={i.icon} className="h-5 w-5" /></span>
                <span>
                  <span className="block font-bold text-ink">{i.label}</span>
                  <span className="mt-1 block text-sm text-slate-600">{i.summary}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="wrap py-16">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <h2 className="h-section text-ink">Questions about {u.label.toLowerCase()}</h2>
          <FaqList faqs={u.faqs} />
        </div>
      </section>

      {/* Related */}
      <section className="border-t border-line bg-paper">
        <div className="wrap py-14">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">More use cases</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/use-cases/${o.slug}/`} className="card card-hover flex items-center gap-3 p-4 font-semibold text-ink">
                <Icon name={o.icon} className="h-5 w-5 text-brand-700" /> {o.label}
                <ArrowRight className="ml-auto h-4 w-4 text-slate-400" />
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm text-slate-600">
            Built on{" "}
            {PRODUCT_NAV.map((p, i) => (
              <span key={p.href}>
                {i > 0 && " · "}
                <Link href={p.href} className="font-semibold text-brand-700 hover:underline">{p.label}</Link>
              </span>
            ))}
          </p>
        </div>
      </section>
      <RelatedPosts path={`/use-cases/${u.slug}/`} />
      <CtaBand />
    </main>
  );
}
