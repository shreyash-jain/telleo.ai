"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { API_PLANS, CRM_MONTHLY, FREE_TRIAL, PRICING_NOTES, TRACKS, type Plan, type Track } from "@/content/pricing";
import { dashboardPlans, fetchTelleoOffer, planMonths, type OfferPlan, type ProductOffer } from "@/lib/productOffer";
import { bookHref, signupHref } from "@/lib/site";
import { Check } from "./ui";

/** One minute of AI calling is 5 credits (the 50-credit trial is 10 minutes). */
const CREDITS_PER_MINUTE = 5;

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/**
 * The plans, Dashboard or API only (a toggle). Dashboard plans are read live from the platform
 * (Evalezy's plans, lib/productOffer.ts); API plans are the published list (content/pricing.ts).
 * Every plan starts with the free trial; a plan can also be bought straight away, which signs up and
 * opens that plan's checkout in the app.
 */
export function PricingCards({ showNotes = true }: { showNotes?: boolean }) {
  const [track, setTrack] = useState<Track>("dashboard");
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

      {track === "dashboard" ? (
        <DashboardPlans />
      ) : (
        <>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {API_PLANS.map((p) => (
              <PlanCard key={p.key} plan={p} />
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
        </>
      )}
    </div>
  );
}

/** An API plan from the published list. */
function PlanCard({ plan: p }: { plan: Plan }) {
  const dark = !!p.highlight;
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
        <span className="h-display text-4xl">{p.price}</span>
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
      {p.buyKey ? (
        <PlanButtons track="api" planKey={p.key} buyKey={p.buyKey} name={p.name} dark={dark} />
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

function PlanButtons({ track, planKey, buyKey, name, dark }: { track: Track; planKey: string; buyKey: string; name: string; dark: boolean }) {
  return (
    <div className="mt-6 flex flex-col gap-2">
      <a
        href={signupHref({ mode: track })}
        className={`btn w-full ${dark ? "btn-primary" : "btn-outline"}`}
        data-track="pricing_trial"
        data-track-label={planKey}
      >
        Start free trial <ArrowRight className="h-4 w-4" />
      </a>
      <a
        href={signupHref({ mode: track, buy: buyKey })}
        className={`text-center text-sm font-semibold underline-offset-4 hover:underline ${dark ? "text-brand-300" : "text-brand-700"}`}
        data-track="pricing_buy"
        data-track-label={planKey}
      >
        Or buy {name} now
      </a>
    </div>
  );
}

/** The Dashboard plans, read live; while loading or if unreachable, the free trial alone. */
function DashboardPlans() {
  const [offer, setOffer] = useState<ProductOffer | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let live = true;
    fetchTelleoOffer()
      .then((o) => live && setOffer(o))
      .catch(() => live && setFailed(true));
    return () => {
      live = false;
    };
  }, []);

  const plans = offer ? dashboardPlans(offer) : [];
  if (!offer || plans.length === 0) {
    return (
      <div className="mx-auto mt-10 flex max-w-md flex-col items-center gap-4 rounded-3xl border border-line bg-white p-8 text-center">
        <p className="text-lg font-extrabold text-ink">Dashboard</p>
        <p className="text-sm text-slate-600">
          {offer || failed
            ? "Start on the free trial; you'll see the dashboard plans and prices in the app."
            : "Loading the dashboard plans…"}
        </p>
        <a href={signupHref({ mode: "dashboard" })} className="btn btn-primary w-full" data-track="pricing_trial" data-track-label="dashboard">
          Start free trial <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    );
  }
  return (
    <>
      <div className={`mx-auto mt-10 grid gap-5 ${plans.length === 1 ? "max-w-sm" : plans.length === 2 ? "max-w-3xl md:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-3"}`}>
        {plans.map((p) => (
          <DashboardCard key={p.key} offer={offer} plan={p} />
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-slate-500">All prices exclude 18% GST.</p>
    </>
  );
}

function DashboardCard({ offer, plan: p }: { offer: ProductOffer; plan: OfferPlan }) {
  const months = planMonths(offer, p);
  const cadence = months === 1 ? "/month" : months === 12 ? "/year" : `/${months} months`;
  const minutes = Math.round((p.credits ?? 0) / CREDITS_PER_MINUTE);
  return (
    <div className="relative flex flex-col rounded-3xl border border-line bg-white p-6">
      <p className="text-lg font-extrabold text-ink">{p.name}</p>
      <div className="mt-5 flex items-baseline gap-1.5">
        <span className="h-display text-4xl">{inr(p.price_inr ?? 0)}</span>
        <span className="text-sm text-slate-500">{cadence}</span>
      </div>
      <ul className="mt-5 flex-1 space-y-2.5 text-[0.93rem] text-slate-700">
        <li className="flex gap-2.5">
          <Check className="mt-0.5 !h-4 !w-4" />
          {minutes > 0
            ? `${(p.credits ?? 0).toLocaleString("en-IN")} AI credits, about ${minutes.toLocaleString("en-IN")} minutes of AI calling`
            : "Pay per connected minute"}
        </li>
        {p.users != null && (
          <li className="flex gap-2.5">
            <Check className="mt-0.5 !h-4 !w-4" />
            {p.users === 1 ? "1 user" : `Up to ${p.users.toLocaleString("en-IN")} users`}
          </li>
        )}
        <li className="flex gap-2.5">
          <Check className="mt-0.5 !h-4 !w-4" />
          Telleo drafts your first agent; leads, calls and call logs in one place
        </li>
      </ul>
      <PlanButtons track="dashboard" planKey={p.key} buyKey={p.key} name={p.name} dark={false} />
    </div>
  );
}
