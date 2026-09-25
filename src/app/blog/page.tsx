import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { PageShell, pageMetadata } from "@/components/PageShell";
import { JsonLd } from "@/components/JsonLd";
import { POSTS, postPath } from "@/content/posts";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata("/blog/");

const CAT_TINT: Record<string, string> = {
  Guides: "from-brand-100 to-white",
  Playbooks: "from-sky/15 to-white",
  Pricing: "from-amber-50 to-white",
  Compliance: "from-violet-50 to-white",
  "Voice AI": "from-brand-50 to-white",
};

export default function BlogIndex() {
  const [lead, ...rest] = POSTS;
  return (
    <PageShell
      path="/blog/"
      eyebrow="Blog"
      h1="Voice AI guides for Indian sales and support teams."
      lede="Costs, scripts, compliance, call quality and how to judge a vendor. Written to be useful whether or not you ever buy Telleo, with every outside fact linked to its source."
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "The Telleo Blog",
          url: `${SITE}/blog/`,
          blogPost: POSTS.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${SITE}${postPath(p.slug)}`, datePublished: p.published })),
        }}
      />
      <section className="wrap py-16 md:py-20">
        {lead && (
          <Link href={postPath(lead.slug)} className={`card card-hover group grid overflow-hidden bg-gradient-to-br md:grid-cols-[1.4fr_1fr] ${CAT_TINT[lead.category] ?? ""}`}>
            <div className="p-8 md:p-10">
              <p className="eyebrow">{lead.category}</p>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-ink group-hover:text-brand-700">{lead.title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">{lead.description}</p>
              <p className="mt-6 inline-flex items-center gap-1 font-bold text-brand-700">Read the guide <ArrowRight className="h-4 w-4" /></p>
            </div>
            <div className="hidden items-center justify-center bg-ink p-10 md:flex">
              <div className="flex h-24 items-end gap-2" aria-hidden>
                {[30, 55, 80, 45, 95, 60, 35, 70].map((h, i) => (
                  <span key={i} className="w-3 rounded-full bg-brand" style={{ height: `${h}%`, opacity: 0.35 + i * 0.08 }} />
                ))}
              </div>
            </div>
          </Link>
        )}
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <Link key={p.slug} href={postPath(p.slug)} className={`card card-hover group flex flex-col bg-gradient-to-b p-7 ${CAT_TINT[p.category] ?? ""}`}>
              <p className="eyebrow">{p.category}</p>
              <h2 className="mt-3 text-xl font-extrabold leading-snug text-ink group-hover:text-brand-700">{p.title}</h2>
              <p className="mt-3 flex-1 text-slate-600">{p.description}</p>
              <p className="mt-5 flex items-center gap-1.5 text-sm text-slate-500"><Clock className="h-3.5 w-3.5" /> {p.readMinutes} min read</p>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
