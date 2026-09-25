import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CRM_MONTHLY, PLANS, PRICING_NOTES } from "@/content/pricing";
import { bookHref } from "@/lib/site";
import { Check } from "./ui";

export function PricingCards({ showNotes = true }: { showNotes?: boolean }) {
  return (
    <div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {PLANS.map((p) => (
          <div
            key={p.key}
            className={`relative flex flex-col rounded-3xl p-6 ${
              p.highlight ? "bg-ink text-white shadow-[0_30px_80px_-30px_rgba(20,196,124,0.55)] ring-2 ring-brand" : "border border-line bg-white"
            }`}
          >
            {p.footnote && (
              <span className={`absolute -top-3 left-6 rounded-full px-3 py-1 text-xs font-bold ${p.highlight ? "bg-brand text-ink" : "bg-mist text-slate-600"}`}>
                {p.footnote}
              </span>
            )}
            <p className={`text-lg font-extrabold ${p.highlight ? "text-white" : "text-ink"}`}>{p.name}</p>
            <p className={`mt-1 min-h-12 text-sm ${p.highlight ? "text-slate-300" : "text-slate-600"}`}>{p.blurb}</p>
            <div className="mt-5 flex items-baseline gap-1.5">
              <span className="h-display text-4xl">{p.price}</span>
              <span className={`text-sm ${p.highlight ? "text-slate-400" : "text-slate-500"}`}>{p.cadence}</span>
            </div>
            <div className={`mt-4 rounded-2xl px-4 py-3 ${p.highlight ? "bg-white/[0.06]" : "bg-paper"}`}>
              <p className={`text-xl font-extrabold ${p.highlight ? "text-brand-300" : "text-brand-700"}`}>{p.rate}</p>
              <p className={`text-xs ${p.highlight ? "text-slate-400" : "text-slate-500"}`}>{p.rateNote}</p>
            </div>
            <ul className="mt-5 flex-1 space-y-2.5 text-[0.93rem]">
              {p.features.map((f) => (
                <li key={f} className={`flex gap-2.5 ${p.highlight ? "text-slate-200" : "text-slate-700"}`}>
                  <Check className="mt-0.5 !h-4 !w-4" /> {f}
                </li>
              ))}
            </ul>
            <Link
              href={bookHref()}
              className={`btn mt-6 w-full ${p.highlight ? "btn-primary" : "btn-outline"}`}
              data-track="pricing_cta"
              data-track-label={p.key}
            >
              {p.cta} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-slate-600">
        Prefer monthly with the CRM? <strong className="text-ink">{CRM_MONTHLY.name}</strong>: {CRM_MONTHLY.price} ({CRM_MONTHLY.detail}).
      </p>
      {showNotes && (
        <ul className="mx-auto mt-6 grid max-w-4xl gap-x-8 gap-y-1.5 text-xs text-slate-500 md:grid-cols-2">
          {PRICING_NOTES.map((n) => (
            <li key={n} className="flex gap-2"><span aria-hidden>•</span>{n}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
