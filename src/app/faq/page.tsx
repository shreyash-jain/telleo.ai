import Link from "next/link";
import { PageShell, pageMetadata } from "@/components/PageShell";
import { FaqList } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import type { Faq } from "@/content/types";

export const metadata = pageMetadata("/faq/");

const GROUPS: { id: string; title: string; faqs: Faq[] }[] = [
  {
    id: "conversation",
    title: "How the calls sound",
    faqs: [
      { q: "Does Telleo sound like a robot?", a: "It is built not to. Agents speak everyday phone Hindi, Indian English and Hinglish, handle interruptions, don't repeat themselves or echo your answers back, and are shaped to sound like a phone line rather than a studio. The quickest way to judge is to call our test line, +91 80353 74489." },
      { q: "Should the agent say it is an AI?", a: "We recommend it. You choose the opening line, and a short “I'm an AI assistant calling from…” sets the right expectation without hurting the call." },
      { q: "What happens if the caller interrupts?", a: "The agent stops and listens. Short acknowledgements such as “haan”, “achha” or “okay” are treated as the caller following along, so the agent carries on and the yes still counts." },
      { q: "Which languages does it speak?", a: "Hindi, English and Hinglish are live. Tamil, Telugu, Marathi, Bengali, Gujarati, Kannada, Malayalam, Punjabi and Odia are supported by the voice engines and set up with you on request." },
      { q: "Can it handle callers who mix Hindi and English?", a: "Yes. That is the normal case on Indian calls, and a Hinglish agent is built for it." },
      { q: "How many voices can we choose from?", a: "More than 80 male and female voices across seven speech engines, with a preview that plays exactly what the caller will hear." },
    ],
  },
  {
    id: "setup",
    title: "Setting up",
    faqs: [
      { q: "How long does it take to go live?", a: "The agent itself can be drafted in a single session. What usually takes longer is outside the product: DLT registration for commercial calling and approval of any WhatsApp templates. We start those in parallel." },
      { q: "Do we need a developer?", a: "No. Agents are built in a no-code builder, and leads can come in from Meta or Google lead forms, CSV imports or your website without code. Webhooks are there if your developers want them." },
      { q: "Can we use our own script?", a: "Yes. Paste it in and Telleo scores it against what works on real calls and suggests fixes. Or write a short brief and let Telleo draft it." },
      { q: "Can we test before calling customers?", a: "Yes. Have the agent call your own phone as often as you like. Test calls get the same transcript, outcome and health verdict as real ones." },
      { q: "Can one account run several agents?", a: "Yes. Most teams run separate agents for qualification, reminders and inbound calls, each with its own script, voice and rules." },
    ],
  },
  {
    id: "calls",
    title: "Calls, telephony and compliance",
    faqs: [
      { q: "Do we need our own phone lines or SIM cards?", a: "No. Telephony is included. A dedicated AI calling line with its own caller ID is available if you want one." },
      { q: "Can our human team keep using Exotel or Airtel IQ?", a: "Yes. Your people can stay on their current provider while the AI calls on Telleo's line. Their calls can still be analysed by call intelligence." },
      { q: "Can the agent transfer a call to a person?", a: "Yes. Each agent has handoff numbers, and it transfers live after a short bridge line when the caller asks or your rules say the lead is hot." },
      { q: "Can it answer inbound calls?", a: "Yes, through an option in the Telleo IVR that hands callers to an AI agent. Connecting your existing business number is worked out during setup." },
      { q: "Is AI calling legal in India?", a: "Yes, within TRAI's rules. Commercial calling needs DLT registration, which we complete with you. Under TRAI's September 2026 amendment, AI voice calls are application-to-person (A2P) calls that must be declared in advance to the telecom operator, and a customer's enquiry supports commercial calls for seven days from the enquiry; beyond that you need explicit, verifiable consent. You choose who is called and when. Confirm your specific case with counsel." },
      { q: "How many calls can it make?", a: "A daily cap protects every account, 500 calls a day by default, and can be raised to match what your team can follow up." },
    ],
  },
  {
    id: "after",
    title: "After the call",
    faqs: [
      { q: "What do we get after each call?", a: "An outcome from your own list, a short summary, a lead score from 1 to 10, the answers the caller gave, and any callback time or meeting agreed, all on the lead." },
      { q: "Can it book meetings?", a: "Yes. Link a booking page and meetings are booked automatically when the caller agrees a specific day and time." },
      { q: "Can it send WhatsApp messages?", a: "Yes, with WhatsApp templates you have had approved, and only when the caller accepted on the call. Sends are tracked for delivery and never duplicated." },
      { q: "Does it call back at the time the caller asked?", a: "It saves the requested time as an exact date and time on the lead so your team can act on it. Unanswered calls are retried automatically after the gap you set." },
      { q: "Does it work with our CRM?", a: "Telleo includes its own CRM. For other systems, leads can come in by webhook or CSV, and outcomes can go out by webhook or HTTP request. There are no native Salesforce, HubSpot or Zoho apps yet." },
    ],
  },
  {
    id: "pricing",
    title: "Pricing",
    faqs: [
      { q: "How much does it cost?", a: "₹3.99 a minute on monthly plans from ₹3,499 a month, or ₹3.49 a minute with no minimum on the ₹19,999-a-year annual plan, which includes the CRM. Prices exclude GST." },
      { q: "Do unanswered calls cost money?", a: "Minutes are billed on connected conversation, rounded up to the next minute. Unanswered calls go back on your retry path." },
      { q: "Is call analysis extra?", a: "Not on AI calls; it's included. Analysing your team's human calls is billed per minute of recording." },
      { q: "Can costs run away?", a: "No. Calls draw on your balance and stop when it runs out, and daily caps and a maximum call length apply to every agent." },
    ],
  },
  {
    id: "data",
    title: "Data and limits",
    faqs: [
      { q: "Who can see transcripts and recordings?", a: "Call outcomes and health verdicts are visible on the dashboard. Full transcripts and diagnostics are limited to roles you allow to see caller details." },
      { q: "Do you have SOC 2 or ISO 27001?", a: "Not today, and we won't claim otherwise. Our security page explains how data is handled." },
      { q: "What won't the agent do?", a: "It won't negotiate complex deals, take card payments on the call, or give medical, legal or financial advice. Script it to hand those moments to your team." },
      { q: "Who is behind Telleo?", a: "Telleo is built by Vidyayatan Technologies LLP, the team behind Vacademy. It started as the AI calling inside Vacademy's CRM for education institutes." },
    ],
  },
];

export default function Page() {
  const all = GROUPS.flatMap((g) => g.faqs);
  return (
    <PageShell
      path="/faq/"
      eyebrow="FAQ"
      h1="Straight answers about AI calling with Telleo."
      lede={<>Thirty questions buyers ask us, grouped by topic. Can&apos;t find yours? <Link href="/demo/" className="font-semibold text-brand-700 underline underline-offset-4">Ask us</Link>.</>}
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: all.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <section className="wrap grid gap-12 py-16 md:py-20 lg:grid-cols-[14rem_1fr]">
        <nav aria-label="FAQ topics" className="hidden lg:block">
          <ul className="sticky top-28 space-y-2 text-sm">
            {GROUPS.map((g) => (
              <li key={g.id}><a href={`#${g.id}`} className="text-slate-600 hover:text-brand-700">{g.title}</a></li>
            ))}
          </ul>
        </nav>
        <div className="space-y-14">
          {GROUPS.map((g) => (
            <div key={g.id}>
              <h2 id={g.id} className="text-2xl font-extrabold tracking-tight text-ink">{g.title}</h2>
              <div className="mt-5"><FaqList faqs={g.faqs} withSchema={false} /></div>
            </div>
          ))}
          <p className="text-slate-600">
            More detail: <Link href="/pricing/" className="font-semibold text-brand-700 underline underline-offset-4">pricing</Link>,{" "}
            <Link href="/security/" className="font-semibold text-brand-700 underline underline-offset-4">security</Link>,{" "}
            <Link href="/blog/trai-dlt-rules-ai-calling/" className="font-semibold text-brand-700 underline underline-offset-4">TRAI and DLT rules</Link>.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
