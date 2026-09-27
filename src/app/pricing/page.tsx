import { Check as CheckIcon, Minus } from "lucide-react";
import { PageShell, pageMetadata } from "@/components/PageShell";
import { PricingCards } from "@/components/Pricing";
import { RoiCalculator } from "@/components/RoiCalculator";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata("/pricing/");

const EXAMPLES = [
  {
    t: "A small team trying AI calling",
    s: "1,000 new leads a month · 55% answer · 2 minutes each = 1,100 minutes",
    rows: [
      ["Starter", "1,100 × ₹3.99 = ₹4,389/month (above the ₹3,499 minimum)"],
      ["Annual", "1,100 × ₹3.49 = ₹3,839 + ₹19,999/year (≈ ₹1,667/month) = ≈ ₹5,506/month"],
    ],
    v: "Starter is cheaper here if you don't need the CRM. Pick Annual when you want the CRM and automations too.",
  },
  {
    t: "A growing sales or admissions desk",
    s: "3,000 leads a month · 55% answer · 2 minutes each = 3,300 minutes",
    rows: [
      ["Pro", "1,750 × ₹3.99 + 1,550 × ₹3.49 = ₹12,392/month"],
      ["Pro + CRM, monthly", "₹12,392 + ₹2,000 CRM = ₹14,392/month"],
      ["Annual (CRM included)", "3,300 × ₹3.49 = ₹11,517 + ≈ ₹1,667 = ≈ ₹13,184/month"],
    ],
    v: "With the CRM, Annual saves about ₹1,200 a month over Pro + CRM, and has no monthly minimum.",
  },
  {
    t: "A seasonal business",
    s: "8,000 minutes a month for 4 peak months, almost nothing for the other 8",
    rows: [
      ["Pro + CRM, all year", "4 × ₹30,795 + 8 × ₹8,999 minimum = ₹1,95,172/year"],
      ["Annual", "32,000 × ₹3.49 = ₹1,11,680 + ₹19,999 = ₹1,31,679/year"],
    ],
    v: "Annual saves about ₹63,500 a year because quiet months cost nothing in minutes.",
  },
];

const INCLUDED: [string, boolean, string][] = [
  ["Telephony (calls on Telleo's lines)", true, "Included in the per-minute rate"],
  ["AI agents: speech, language model, voices", true, "Included in the per-minute rate"],
  ["Transcripts and end-of-call analysis on AI calls", true, "Included"],
  ["Call health verdict on every AI call", true, "Included"],
  ["Call recordings (when switched on)", true, "Included"],
  ["Analysis of your team's human calls", false, "Billed per minute of recording"],
  ["DLT / PE registration", false, "₹5,900 a year, at actuals"],
  ["WhatsApp template messages", false, "Charged by your WhatsApp provider / Meta"],
  ["GST", false, "18% on all prices"],
];

const FAQS = [
  { q: "How are minutes counted?", a: "Per minute of connected conversation, rounded up to the next minute. Calls that aren't answered don't use minutes. Workflow calls are retried after your gap; re-run a campaign to call its unanswered leads again." },
  { q: "What does the Starter minimum mean?", a: "Starter bills at least ₹3,499 a month, which covers about 875 minutes at ₹3.99. Use more and you pay for what you use; use less and the minimum applies. It's meant as an entry plan for up to three months." },
  { q: "When does ₹3.49 a minute apply?", a: "On the Annual plan, from the first minute. On monthly plans, for every minute beyond 1,750 in a month." },
  { q: "What else might we pay for?", a: "DLT registration, which Indian regulation requires for commercial calling (₹5,900 a year, at actuals); WhatsApp template messages, charged by Meta through your WhatsApp provider; analysis of your team's human calls, per minute of recording; and 18% GST." },
  { q: "Are prices inclusive of GST?", a: "No. All prices exclude 18% GST." },
  { q: "Do you offer volume pricing?", a: "Yes. For high volumes, multiple teams or a dedicated calling line, talk to us about Enterprise pricing." },
  { q: "How do we pay for calls?", a: "Calls draw on your account balance, and dialling stops if the balance runs out, so a bill can never run away. Top up to resume." },
];

export default function Page() {
  return (
    <PageShell
      path="/pricing/"
      eyebrow="Pricing"
      h1="Pay for the minutes your agents talk. The few extras are listed below."
      lede="Telephony, speech, voices, transcripts and analysis of AI calls are all in the per-minute rate. From ₹3.99 a minute on monthly plans, or ₹3.49 a minute with no minimum on the annual plan."
      faqs={FAQS}
      faqTitle="Pricing questions"
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Telleo AI voice agents",
          serviceType: "AI voice calling agents",
          description: "AI voice agents for outbound and inbound business calls in Hindi, English and Hinglish, billed per minute.",
          url: `${SITE}/pricing/`,
          provider: { "@id": `${SITE}/#org` },
          areaServed: { "@type": "Country", name: "India" },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Telleo plans",
            itemListElement: [
              { "@type": "Offer", name: "Starter", price: "3499", priceCurrency: "INR", description: "Monthly minimum billing; ₹3.99 per minute; excludes GST" },
              { "@type": "Offer", name: "Pro", price: "6999", priceCurrency: "INR", description: "Monthly minimum billing; ₹3.99 per minute, ₹3.49 beyond 1,750 minutes; excludes GST" },
              { "@type": "Offer", name: "Annual", price: "19999", priceCurrency: "INR", description: "Per year; ₹3.49 per minute, no minimum; CRM included; excludes GST" },
            ],
          },
        }}
      />
      <section className="wrap py-16 md:py-20">
        <PricingCards />
      </section>

      <section className="border-y border-line bg-paper">
        <div className="wrap py-20 md:py-24">
          <p className="eyebrow">Worked examples</p>
          <h2 className="h-section mt-3 max-w-3xl text-ink">What real volumes cost, with the arithmetic.</h2>
          <p className="lede mt-4 max-w-2xl">All figures exclude GST and DLT. The annual fee is spread over 12 months to compare with monthly plans.</p>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {EXAMPLES.map((e) => (
              <div key={e.t} className="card flex flex-col p-6">
                <h3 className="text-lg font-extrabold text-ink">{e.t}</h3>
                <p className="mt-1 text-sm text-slate-500">{e.s}</p>
                <dl className="mt-5 flex-1 space-y-3">
                  {e.rows.map(([k, v]) => (
                    <div key={k} className="rounded-xl bg-paper p-3">
                      <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">{k}</dt>
                      <dd className="mt-1 font-mono text-[0.82rem] text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 rounded-xl border border-brand-200 bg-brand-50 p-3 text-sm font-medium text-brand-800">{e.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-20 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">What&apos;s in the rate</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink md:text-4xl">Included, and what isn&apos;t.</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">Speech, language model and telephony are part of the per-minute rate, not separate line items. The main things billed separately are listed here.</p>
          </div>
          <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line">
            {INCLUDED.map(([k, inc, n]) => (
              <li key={k} className="flex items-center gap-4 px-5 py-3.5">
                <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${inc ? "bg-brand-100 text-brand-800" : "bg-mist text-slate-500"}`}>
                  {inc ? <CheckIcon className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}
                </span>
                <span className="flex-1 font-medium text-ink">{k}</span>
                <span className="text-right text-sm text-slate-500">{n}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ink">
        <div className="wrap py-20 md:py-24">
          <h2 className="h-section text-white">Estimate your own month.</h2>
          <p className="mt-3 max-w-2xl text-lg text-slate-300">Your numbers, the annual rate, and how many telecallers the same coverage would take.</p>
          <div className="mt-10"><RoiCalculator /></div>
        </div>
      </section>
    </PageShell>
  );
}
