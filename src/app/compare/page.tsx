import Link from "next/link";
import { ArrowRight, Scale } from "lucide-react";
import { PageShell, pageMetadata } from "@/components/PageShell";
import { COMPARISONS } from "@/content/comparisons";

export const metadata = pageMetadata("/compare/");

export default function CompareIndex() {
  return (
    <PageShell
      path="/compare/"
      eyebrow="Compare"
      h1="Honest comparisons, including when not to pick us."
      lede="Every comparison lists the cases where the other option is the better choice. Third-party facts come from the vendor's own public pages, with the date we checked them."
    >
      <section className="wrap py-16 md:py-20">
        <div className="grid gap-5 md:grid-cols-2">
          {COMPARISONS.map((c) => (
            <Link key={c.slug} href={`/compare/${c.slug}/`} className="card card-hover group flex flex-col p-7">
              <Scale className="h-6 w-6 text-brand-700" />
              <h2 className="mt-4 text-xl font-extrabold text-ink group-hover:text-brand-700">{c.h1}</h2>
              <p className="mt-2 flex-1 leading-relaxed text-slate-600">{c.verdict}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-brand-700">Read the comparison <ArrowRight className="h-4 w-4" /></span>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
