import Link from "next/link";
import { AlertTriangle, BadgeCheck, Database, Eye, Lock, MapPin, PhoneOff, ServerCog, ShieldCheck, UserCheck } from "lucide-react";
import { PageShell, pageMetadata } from "@/components/PageShell";
import { PRIVACY_URL, SALES_EMAIL } from "@/lib/site";

export const metadata = pageMetadata("/security/");

const BLOCKS = [
  {
    I: Database, t: "What we store",
    d: "For each call: the transcript, the analysis (outcome, summary, score, answers), timings and call-health diagnostics, and the recording when recording is switched on for your line. For each lead: the fields you capture in the CRM.",
  },
  {
    I: Eye, t: "Who can see it",
    d: "Transcripts, summaries and outcomes are visible to team members who can open the call log, and are not restricted per role; health verdicts and technical diagnostics are for your admins, and you choose which roles see full phone numbers. A sales head sees their own reporting line in the team view.",
  },
  {
    I: MapPin, t: "Where it runs",
    d: "The live voice pipeline runs on servers in Mumbai. The platform that stores your CRM data and call records is not hosted only in India. If data residency in India is a requirement for you, tell us before you start.",
  },
  {
    I: ServerCog, t: "Who processes it",
    d: "Like every voice AI product, Telleo relies on specialist providers: telephony (Plivo), speech recognition, language models and voice engines (for example Google Cloud and Sarvam). Audio and text pass through them to run the call and the analysis.",
  },
  {
    I: Lock, t: "In transit",
    d: "Calls are streamed to the voice pipeline over encrypted connections, and each call's audio stream is opened with a single-use token, so a stream link can't be reused.",
  },
  {
    I: UserCheck, t: "Your data",
    d: "Your leads and call records belong to you. To ask for an export or deletion, write to us and we'll tell you what's possible and how long it takes.",
  },
];

const CALLING = [
  { I: BadgeCheck, t: "DLT registration", d: "Commercial calling in India requires DLT registration. We complete it with you; it is charged at actuals, ₹5,900 a year." },
  { I: PhoneOff, t: "Who and when", d: "You decide which leads are called and the hours campaigns run. Your outcome rules stop automated retries to not-interested leads; leave them out of bulk campaigns and manual calls too." },
  { I: ShieldCheck, t: "Built-in limits", d: "Daily call caps, 30-second duplicate protection, a maximum call length per agent and no dialling without balance." },
  { I: UserCheck, t: "Honest agents", d: "We recommend that every agent says it is an AI assistant in its opening line, and that its script steers away from advice only a licensed person should give." },
];

export default function Page() {
  return (
    <PageShell
      path="/security/"
      eyebrow="Security & compliance"
      h1="How Telleo handles your calls, your leads and your customers."
      lede="A plain account of what we store, who can see it, where it runs and what we don't claim. If your security team has questions this page doesn't answer, send them to us."
    >
      <section className="wrap py-16 md:py-20">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {BLOCKS.map((b) => (
            <div key={b.t} className="card p-7">
              <b.I className="h-6 w-6 text-brand-700" />
              <h2 className="mt-4 text-lg font-extrabold text-ink">{b.t}</h2>
              <p className="mt-2 leading-relaxed text-slate-600">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="wrap py-16 md:py-20">
          <p className="eyebrow">Calling responsibly</p>
          <h2 className="h-section mt-3 max-w-3xl text-ink">An AI that calls your customers needs rules it can&apos;t skip.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {CALLING.map((c) => (
              <div key={c.t} className="card p-6">
                <c.I className="h-5 w-5 text-brand-700" />
                <p className="mt-3 font-bold text-ink">{c.t}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{c.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-slate-600">
            Once it comes into force (30 days after Gazette publication; the A2P provisions after 60 days), TRAI&apos;s September 2026 amendment to the commercial-communication rules treats AI voice calls as application-to-person (A2P) calls that must be declared in advance to the telecom operator, and limits calls based on a customer&apos;s enquiry to seven days from that enquiry. Talk to us about how this applies to your campaigns. Read our{" "}
            <Link href="/blog/trai-dlt-rules-ai-calling/" className="font-semibold text-brand-700 underline underline-offset-4">guide to TRAI and DLT rules</Link>{" "}
            and confirm your specific case with your telecom provider or counsel.
          </p>
        </div>
      </section>

      <section className="wrap py-16 md:py-20">
        <div className="rounded-2xl border border-amber/40 bg-amber-50 p-7 md:p-10">
          <p className="flex items-center gap-2 text-lg font-extrabold text-ink"><AlertTriangle className="h-5 w-5 text-amber" /> What we don&apos;t claim</p>
          <ul className="mt-4 space-y-2 text-slate-700">
            <li>We do not hold SOC 2, ISO 27001 or HIPAA certification today.</li>
            <li>We do not claim that all your data stays in India; only the live voice pipeline runs in Mumbai.</li>
            <li>We do not guarantee regulatory compliance on your behalf. You decide who is called, when and with what consent.</li>
          </ul>
          <p className="mt-5 text-sm text-slate-600">
            Questions from your security or legal team: <a href={`mailto:${SALES_EMAIL}`} className="font-semibold text-brand-700 underline underline-offset-4">{SALES_EMAIL}</a>. Privacy policy:{" "}
            <a href={PRIVACY_URL} className="font-semibold text-brand-700 underline underline-offset-4">vacademy.io/privacy-policy</a>.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
