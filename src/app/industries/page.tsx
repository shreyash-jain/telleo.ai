import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell, pageMetadata } from "@/components/PageShell";
import { Icon } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { INDUSTRIES } from "@/content/industries";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata("/industries/");

export default function IndustriesIndex() {
  return (
    <PageShell
      path="/industries/"
      eyebrow="Industries"
      h1="AI calling agents for the way your industry sells."
      lede="Telleo started in admissions calling for education institutes, where parents switch languages, interrupt and ask about fees. The same agent now qualifies buyers, books visits, reminds borrowers and screens candidates across Indian businesses."
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: INDUSTRIES.map((u, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/industries/${u.slug}/`, name: u.label })),
        }}
      />
      <section className="wrap py-16 md:py-20">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((i) => (
            <Link key={i.slug} href={`/industries/${i.slug}/`} className="card card-hover group flex flex-col p-7">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700 transition group-hover:bg-brand group-hover:text-ink"><Icon name={i.icon} className="h-6 w-6" /></span>
              <h2 className="mt-5 text-xl font-extrabold text-ink">{i.label}</h2>
              <p className="mt-2 flex-1 leading-relaxed text-slate-600">{i.summary}</p>
              <ul className="mt-5 space-y-1.5 text-sm text-slate-600">
                {i.plays.slice(0, 3).map((p) => (
                  <li key={p.title} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-700" />{p.title}</li>
                ))}
              </ul>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-brand-700">Explore {i.label.toLowerCase()} <ArrowRight className="h-4 w-4" /></span>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
