/**
 * Public price list. Mirrors vacademy.io/voice (Sept 2026) — change both together.
 * All prices exclude 18% GST.
 */
export interface Plan {
  key: string;
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
    name: "Annual",
    price: "₹19,999",
    cadence: "/year, paid upfront",
    rate: "₹3.49/min",
    rateNote: "Flat from the first minute · no monthly minimum",
    blurb: "The whole machine at our best rate. Pay nothing for minutes in quiet months.",
    features: [
      "Everything in Pro",
      "Full CRM with pipelines and workflows",
      "Automations after every call",
      "Pure pay-per-use calling",
      "Best per-minute rate on any plan",
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
      "Regional languages set up with you",
      "Agents built with our team",
    ],
    cta: "Contact us",
  },
];

/** Monthly CRM + voice option sits between Pro and Annual. */
export const CRM_MONTHLY = {
  name: "Pro + CRM, monthly",
  price: "₹8,999/month",
  detail: "₹6,999 voice minimum + ₹2,000 CRM, ₹3.99/min, no annual lock-in",
};

export const PRICING_NOTES = [
  "All prices exclude 18% GST.",
  "DLT / PE registration, required for commercial calling in India, is ₹5,900 a year, charged at actuals.",
  "Calls are billed per minute of conversation, rounded up to the next minute.",
  "Beyond 1,750 minutes in a month, every minute is ₹3.49 on monthly plans.",
  "AI call analysis is included on AI calls. Analysis of your team's human calls is billed per minute of recording.",
];

export const RATE_ANNUAL = 3.49;
export const RATE_MONTHLY = 3.99;
