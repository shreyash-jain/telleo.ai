import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell, pageMetadata } from "@/components/PageShell";
import { Icon } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { USE_CASES } from "@/content/useCases";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata("/use-cases/");

export default function UseCasesIndex() {
  return (
    <PageShell
      path="/use-cases/"
      eyebrow="Use cases"
      h1="Nine calls your team shouldn't be making by hand."
      lede="Each of these is a repeatable phone job with a clear goal, a few questions and a next step. That is where an AI voice agent can be faster, more consistent and cheaper than calling by hand, while your team keeps the conversations that need judgment."
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: USE_CASES.map((u, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/use-cases/${u.slug}/`, name: u.label })),
        }}
      />
      <section className="wrap py-16 md:py-20">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((u) => (
            <Link key={u.slug} href={`/use-cases/${u.slug}/`} className="card card-hover group flex flex-col p-7">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-brand"><Icon name={u.icon} className="h-6 w-6" /></span>
              <h2 className="mt-5 text-xl font-extrabold text-ink group-hover:text-brand-700">{u.label}</h2>
              <p className="mt-2 flex-1 leading-relaxed text-slate-600">{u.summary}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {u.captures.slice(0, 3).map((c) => (
                  <li key={c} className="rounded-md bg-paper px-2 py-1 text-xs text-slate-600">{c}</li>
                ))}
              </ul>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-brand-700">See the playbook <ArrowRight className="h-4 w-4" /></span>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
