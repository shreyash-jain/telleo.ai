"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CRM_MONTHLY, FREE_TRIAL, PLANS_BY_TRACK, PRICING_NOTES, TRACKS, type Plan, type Track } from "@/content/pricing";
import { bookHref, signupHref } from "@/lib/site";
import { Check } from "./ui";

/**
 * The plans, Dashboard or API only (a toggle). Every plan starts with the free trial; a priced plan can
 * also be bought straight away, which signs up and opens that plan's checkout in the app.
 */
export function PricingCards({ showNotes = true }: { showNotes?: boolean }) {
  const [track, setTrack] = useState<Track>("dashboard");
  const plans = PLANS_BY_TRACK[track];
  return (
    <div>
      <div className="flex flex-col items-center gap-3">
        <div role="tablist" aria-label="How you will use Telleo" className="inline-flex rounded-full border border-line bg-paper p-1">
          {TRACKS.map((tr) => (
            <button
              key={tr.key}
              type="button"
              role="tab"
              aria-selected={track === tr.key}
              onClick={() => setTrack(tr.key)}
              className={`rounded-full px-5 py-2 text-sm font-bold transition-colors ${
                track === tr.key ? "bg-ink text-white" : "text-slate-600 hover:text-ink"
              }`}
              data-track="pricing_track"
              data-track-label={tr.key}
            >
              {tr.label}
            </button>
          ))}
        </div>
        <p className="max-w-xl text-center text-sm text-slate-600">{TRACKS.find((tr) => tr.key === track)?.blurb}</p>
        <p className="rounded-full bg-brand-50 px-4 py-1.5 text-center text-sm font-semibold text-brand-800">
          Every plan starts with a {FREE_TRIAL}.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((p) => (
          <PlanCard key={p.key} plan={p} track={track} />
        ))}
      </div>
      {track === "dashboard" && (
        <p className="mt-6 text-center text-sm text-slate-600">
          Prefer monthly with the CRM? <strong className="text-ink">{CRM_MONTHLY.name}</strong>: {CRM_MONTHLY.price} ({CRM_MONTHLY.detail}).
        </p>
      )}
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

function PlanCard({ plan: p, track }: { plan: Plan; track: Track }) {
  const dark = !!p.highlight;
  const canTrial = !!p.buyKey;
  const canBuy = !!p.buyKey && !p.priceTbd;
  return (
    <div
      className={`relative flex flex-col rounded-3xl p-6 ${
        dark ? "bg-ink text-white shadow-[0_30px_80px_-30px_rgba(20,196,124,0.55)] ring-2 ring-brand" : "border border-line bg-white"
      }`}
    >
      {p.footnote && (
        <span className={`absolute -top-3 left-6 rounded-full px-3 py-1 text-xs font-bold ${dark ? "bg-brand text-ink" : "bg-mist text-slate-600"}`}>
          {p.footnote}
        </span>
      )}
      <p className={`text-lg font-extrabold ${dark ? "text-white" : "text-ink"}`}>{p.name}</p>
      <p className={`mt-1 min-h-12 text-sm ${dark ? "text-slate-300" : "text-slate-600"}`}>{p.blurb}</p>
      <div className="mt-5 flex items-baseline gap-1.5">
        <span className={`h-display ${p.priceTbd ? "text-3xl" : "text-4xl"}`}>{p.price}</span>
        <span className={`text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}>{p.cadence}</span>
      </div>
      <div className={`mt-4 rounded-2xl px-4 py-3 ${dark ? "bg-white/[0.06]" : "bg-paper"}`}>
        <p className={`text-xl font-extrabold ${dark ? "text-brand-300" : "text-brand-700"}`}>{p.rate}</p>
        <p className={`text-xs ${dark ? "text-slate-400" : "text-slate-500"}`}>{p.rateNote}</p>
      </div>
      <ul className="mt-5 flex-1 space-y-2.5 text-[0.93rem]">
        {p.features.map((f) => (
          <li key={f} className={`flex gap-2.5 ${dark ? "text-slate-200" : "text-slate-700"}`}>
            <Check className="mt-0.5 !h-4 !w-4" /> {f}
          </li>
        ))}
      </ul>
      {canTrial ? (
        <div className="mt-6 flex flex-col gap-2">
          <a
            href={signupHref({ mode: track })}
            className={`btn w-full ${dark ? "btn-primary" : "btn-outline"}`}
            data-track="pricing_trial"
            data-track-label={p.key}
          >
            Start free trial <ArrowRight className="h-4 w-4" />
          </a>
          {canBuy && (
            <a
              href={signupHref({ mode: track, buy: p.buyKey })}
              className={`text-center text-sm font-semibold underline-offset-4 hover:underline ${dark ? "text-brand-300" : "text-brand-700"}`}
              data-track="pricing_buy"
              data-track-label={p.key}
            >
              Or buy {p.name} now
            </a>
          )}
        </div>
      ) : (
        <Link
          href={bookHref()}
          className={`btn mt-6 w-full ${dark ? "btn-primary" : "btn-outline"}`}
          data-track="pricing_cta"
          data-track-label={p.key}
        >
          {p.cta} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
