/**
 * Public price list. Mirrors vacademy.io/voice (Sept 2026) — change both together.
 * All prices exclude 18% GST.
 *
 * Telleo is sold two ways (docs/PRODUCT_FACTS.md §12): the Dashboard (PLANS) and the API (API_PLANS).
 * `buyKey` is the plan's id in the app (product.telleo plans, platform migration V734): keep them equal,
 * or the Buy button opens the wrong checkout. An API plan's id starts with "api-".
 */
export type Track = "dashboard" | "api";

export interface Plan {
  key: string;
  /** Plan id in the app for "Buy"; none = no Buy button (Enterprise). */
  buyKey?: string;
  /** Price not published yet: no Buy button, only the free trial. */
  priceTbd?: boolean;
  name: string;
  price: string;
  cadence: string;
  rate: string;
  rateNote: string;
  blurb: string;
  features: string[];
  cta: string;
  highlight?: boolean;
  footnote?: string;
}

export const PLANS: Plan[] = [
  {
    key: "starter",
    buyKey: "starter",
    name: "Starter",
    price: "₹3,499",
    cadence: "/month minimum billing",
    rate: "₹3.99/min",
    rateNote: "About 875 minutes covered",
    blurb: "Try AI calling on one list or one campaign before you scale.",
    features: [
      "AI voice agents, outbound and inbound",
      "Telephony included, no SIMs or dialers",
      "Lead import and export",
      "Recordings, transcripts and call history",
      "Call analysis on every AI call",
    ],
    cta: "Start with Starter",
    footnote: "Entry plan, up to 3 months",
  },
  {
    key: "pro",
    buyKey: "pro",
    name: "Pro",
    price: "₹6,999",
    cadence: "/month minimum billing",
    rate: "₹3.99/min",
    rateNote: "About 1,750 minutes covered · ₹3.49/min beyond",
    blurb: "For teams running AI calls every day alongside human callers.",
    features: [
      "Everything in Starter",
      "Direct click-to-call for your team",
      "Full voice dashboard",
      "Advanced call controls",
      "Volume rate beyond 1,750 minutes",
    ],
    cta: "Choose Pro",
  },
  {
    key: "annual",
    buyKey: "annual",
    name: "Annual",
    price: "₹29,999",
    cadence: "/year, paid upfront",
    rate: "₹3.49/min",
    rateNote: "Flat from the first minute · no monthly minimum",
    blurb: "The whole machine at our best rate. Pay nothing for minutes in quiet months.",
    features: [
      "Everything in Pro",
      "Full CRM with pipelines and workflows",
      "Pure pay-per-use calling",
      "Our best published per-minute rate",
    ],
    cta: "Talk to sales",
    highlight: true,
    footnote: "Recommended",
  },
  {
    key: "enterprise",
    name: "Enterprise",
    price: "Custom",
    cadence: "",
    rate: "Volume rates",
    rateNote: "For large or multi-team calling",
    blurb: "High-volume or multi-team calling on a dedicated line.",
    features: [
      "Everything in Annual",
      "Dedicated AI calling line and caller ID",
      "Volume per-minute pricing",
      "Agents built with our team",
    ],
    cta: "Contact us",
  },
];

/**
 * API-only plans: calls from your own software, no dashboard. Same shapes as the dashboard plans,
 * priced below them. Prices are not published yet (PRODUCT_FACTS §12): when they are, set price,
 * cadence, rate and rateNote, drop priceTbd, and add the same plans to product.telleo with
 * access_mode API (health dashboard → Products → Telleo).
 */
export const API_PLANS: Plan[] = [
  {
    key: "api-starter",
    buyKey: "api-starter",
    priceTbd: true,
    name: "API Starter",
    price: "Coming soon",
    cadence: "",
    rate: "Below Starter",
    rateNote: "Price coming soon · start on the free trial today",
    blurb: "Place AI calls from your own software on one list or campaign.",
    features: [
      "A REST API and signed webhooks",
      "One call or a batch of up to 1,000 per request",
      "Outcome, summary, transcript and recording link on every call",
      "Telephony included, no SIMs or dialers",
      "Free test mode",
    ],
    cta: "Start free trial",
  },
  {
    key: "api-pro",
    buyKey: "api-pro",
    priceTbd: true,
    name: "API Pro",
    price: "Coming soon",
    cadence: "",
    rate: "Below Pro",
    rateNote: "Price coming soon · start on the free trial today",
    blurb: "For products that place AI calls every day.",
    features: [
      "Everything in API Starter",
      "More minutes every month",
      "Idempotency keys and webhook retries",
      "Your calling hours and per-number limits apply",
    ],
    cta: "Start free trial",
  },
  {
    key: "api-annual",
    buyKey: "api-annual",
    priceTbd: true,
    name: "API Annual",
    price: "Coming soon",
    cadence: "",
    rate: "Below Annual",
    rateNote: "Price coming soon · pay per use, no monthly minimum",
    blurb: "The API at our best rate. Pay nothing for minutes in quiet months.",
    features: [
      "Everything in API Pro",
      "Pure pay-per-use calling",
      "No monthly minimum",
    ],
    cta: "Start free trial",
    highlight: true,
    footnote: "Recommended",
  },
  {
    key: "api-enterprise",
    name: "API Enterprise",
    price: "Custom",
    cadence: "",
    rate: "Volume rates",
    rateNote: "For high-volume calling from your platform",
    blurb: "High-volume API calling on a dedicated line.",
    features: [
      "Everything in API Annual",
      "Dedicated AI calling line and caller ID",
      "Volume per-minute pricing",
    ],
    cta: "Contact us",
  },
];

export const TRACKS: { key: Track; label: string; blurb: string }[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    blurb: "Telleo drafts your first agent; upload leads, call them and see every call in the dashboard.",
  },
  {
    key: "api",
    label: "API only",
    blurb: "Place calls from your own software with an API key. No dashboard needed.",
  },
];

export const PLANS_BY_TRACK: Record<Track, Plan[]> = { dashboard: PLANS, api: API_PLANS };

/** The free trial every sign-up gets, dashboard or API (PRODUCT_FACTS §12). */
export const FREE_TRIAL = "7-day free trial with 50 credits, about 10 minutes of AI calling";

/** Monthly CRM + voice option sits between Pro and Annual. */
export const CRM_MONTHLY = {
  name: "Pro + CRM, monthly",
  price: "₹8,999/month",
  detail: "₹6,999 voice minimum + ₹2,000 CRM, ₹3.99/min, no annual lock-in",
};

export const PRICING_NOTES = [
  "All prices exclude 18% GST.",
  "DLT / PE registration, required for commercial calling in India, is ₹5,900 a year, charged at actuals.",
  "Calls are billed in 30-second pulses of conversation at the per-minute rate, so a 20-second call costs half a minute.",
  "Rates are for our standard voices. A few premium voice engines are priced differently; we confirm the rate before you pick one.",
  "On monthly plans, minutes beyond 1,750 in a month are billed at ₹3.49.",
  "AI call analysis is included on AI calls. Analysis of your team's human calls is billed per minute of recording.",
];

export const RATE_ANNUAL = 3.49;
export const RATE_MONTHLY = 3.99;
