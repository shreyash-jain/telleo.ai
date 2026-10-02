import Link from "next/link";
import { ArrowRight, UserCheck } from "lucide-react";
import { PageShell, FeatureRow, pageMetadata } from "@/components/PageShell";
import { CheckList, Transcript } from "@/components/ui";

export const metadata = pageMetadata("/ai-telecaller/");

// Every claim on this page must be in docs/PRODUCT_FACTS.md.
const ROWS: [string, string, string][] = [
  ["First call to a new lead", "About 60 seconds after the lead arrives, when a workflow starts the call", "Whenever someone is free to dial"],
  ["Calling hours", "Inside the calling shifts you set (default 9 am to 9 pm); queued calls wait for the hours to open", "Shift hours, leave and breaks"],
  ["Languages", "Hindi, English and Hinglish in production; more Indian languages set up on request", "Whatever your team speaks"],
  ["Script", "The same opening, questions and outcomes on every call", "Varies by person and by day"],
  ["Notes after the call", "Transcript, summary, lead rating 1–10 and the answers captured on every connected call", "Whatever the caller types in"],
  ["Telephony", "Included. No SIMs, dialers or telecom contracts", "SIMs or a dialer per seat"],
  ["Cost", "From ₹3.49 a minute, billed per minute of call", "Salary, seat and dialer, whether the phone rings or not"],
];

const FAQS = [
  { q: "What is an AI telecaller?", a: "An AI voice agent that makes the phone calls a telecaller would: it calls new and old leads, has a natural conversation, asks your qualifying questions, books the meeting and hands interested leads to your team. Telleo's agents speak Hindi, English and Hinglish." },
  { q: "Does an AI telecaller replace my team?", a: "It takes the first call and the repetitive follow-ups, so your team spends its time on leads that are ready to talk. Live transfer and outcome rules hand those leads to a person, during the call or as soon as it ends." },
  { q: "How fast does it call a new lead?", a: "When a workflow starts the call as the lead arrives, the first call typically goes out in about a minute, inside your calling hours. A running bulk campaign shares the same queue and can delay it." },
  { q: "Can my team keep calling from Exotel or Airtel IQ?", a: "Yes. The AI calls run on a separate Telleo line, so your team can keep its click-to-call setup, or use Telleo's click-to-call on the Pro plan." },
  { q: "What does an AI telecaller cost?", a: "Plans start at ₹3,499 a month minimum billing at ₹3.99 a minute. The annual plan is ₹19,999 a year with a flat ₹3.49 a minute and no monthly minimum. Prices exclude 18% GST; DLT registration is ₹5,900 a year at actuals. Rates are for our standard voices." },
  { q: "What about TRAI rules on automated calls?", a: "We register DLT with you and you choose the calling windows. TRAI's September 2026 amendment will require every business using automated (A2P) calls to declare them to its telecom provider, with the caller IDs used. Its A2P provisions take effect 60 days after Gazette publication; talk to us about how it applies to your setup." },
];

export default function Page() {
  return (
    <PageShell
      path="/ai-telecaller/"
      dark
      eyebrow="AI telecaller"
      h1="An AI telecaller that calls every lead in about a minute."
      lede="Telleo's AI telecaller phones new enquiries in Hindi, English or Hinglish, asks your questions, books the meeting and hands the interested ones to your team, with a transcript and a score for every connected call. From ₹3.49 a minute, telephony included."
      faqs={FAQS}
    >
      <section className="wrap space-y-24 py-20 md:py-28">
        <FeatureRow
          eyebrow="Why speed matters"
          title="The first call decides most leads."
          body={
            <>
              <p>
                In a study of 1.25 million leads, firms that tried to contact a lead within an hour were nearly 7 times as likely to
                qualify it as firms that tried an hour later, and more than 60 times as likely as firms that waited 24 hours or longer
                (Harvard Business Review,{" "}
                <a href="https://hbr.org/2011/03/the-short-life-of-online-sales-leads" className="font-semibold text-brand-700 underline" rel="noopener" target="_blank">
                  The Short Life of Online Sales Leads
                </a>
                , 2011).
              </p>
              <p>A telecalling team can&apos;t staff for every lead at every hour. An AI telecaller doesn&apos;t need to.</p>
              <Link href="/use-cases/instant-lead-callback/" className="inline-flex items-center gap-1 text-base font-bold text-brand-700">
                The 60-second callback playbook <ArrowRight className="h-4 w-4" />
              </Link>
            </>
          }
          visual={
            <Transcript
              title="Sample call · fictional coaching institute"
              lines={[
                { who: "agent", text: "नमस्ते Rohit ji, मैं Bright Path Academy से बात कर रही हूँ। आपने अभी NEET batch के बारे में पूछा था?", en: "Hello Rohit ji, I'm calling from Bright Path Academy. You just asked about the NEET batch?" },
                { who: "caller", text: "हाँ, weekend batch की fees क्या है?", en: "Yes, what are the fees for the weekend batch?" },
                { who: "agent", text: "मैं आपके लिए counsellor के साथ free session book कर देती हूँ, वहाँ fees और instalments दोनों समझा देंगे। कल शाम 6 बजे ठीक रहेगा?", en: "I'll book you a free session with a counsellor, who will explain the fees and instalments. Is tomorrow at 6 pm okay?" },
                { who: "caller", text: "ठीक है।", en: "Okay." },
              ]}
            />
          }
        />

        <FeatureRow
          flip
          eyebrow="What it does"
          title="The whole first-call routine, every time."
          body={
            <CheckList
              items={[
                "Calls new Meta, Google and website leads through a workflow, and works through uploaded lists as campaigns.",
                "Asks the questions you set and saves the answers on the call.",
                "Books the meeting on your booking page when the caller agrees a day and time.",
                "Sends the WhatsApp template or email the caller said yes to.",
                "Transfers hot leads to your team live, or assigns them as soon as the call ends.",
                "Marks callback requests, with the caller's own words in the transcript.",
                "Retries unanswered workflow calls with the gap and number of attempts you choose.",
              ]}
            />
          }
          visual={
            <div className="card p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-50"><UserCheck className="h-5 w-5 text-brand-700" /></span>
                <div>
                  <p className="font-bold text-ink">After every connected call</p>
                  <p className="text-sm text-slate-500">What your team sees on the call record</p>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                {[["Outcome", "From your own list"], ["Summary", "2–3 sentences"], ["Lead rating", "1 to 10"], ["Answers", "Only what was said"]].map(([k, v]) => (
                  <div key={k} className="rounded-xl bg-paper p-3"><p className="text-xs text-slate-500">{k}</p><p className="font-semibold text-ink">{v}</p></div>
                ))}
              </div>
            </div>
          }
        />
      </section>

      <section className="border-y border-line bg-paper">
        <div className="wrap py-20 md:py-24">
          <p className="eyebrow">AI telecaller vs human telecaller</p>
          <h2 className="h-section mt-3 max-w-3xl text-ink">Let the AI take the first call. Let your people close.</h2>
          <div className="mt-10 overflow-x-auto rounded-2xl border border-line bg-white">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <thead className="bg-paper text-ink">
                <tr><th className="p-4 font-bold"></th><th className="p-4 font-bold">Telleo AI telecaller</th><th className="p-4 font-bold">Human telecaller</th></tr>
              </thead>
              <tbody>
                {ROWS.map(([k, ai, human]) => (
                  <tr key={k} className="border-t border-line align-top">
                    <th scope="row" className="p-4 font-semibold text-ink">{k}</th>
                    <td className="p-4 text-slate-700">{ai}</td>
                    <td className="p-4 text-slate-600">{human}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 max-w-3xl text-slate-600">
            People are still better at long, consultative calls, negotiation and relationships. Most teams use both: the AI calls every lead
            first, and the team takes the ones that are ready.{" "}
            <Link href="/compare/telleo-vs-telecallers/" className="font-bold text-brand-700">See the full cost comparison <ArrowRight className="inline h-4 w-4" /></Link>
          </p>
        </div>
      </section>

      <section className="wrap py-20 md:py-24">
        <div className="grid gap-10 lg:grid-cols-3">
          {[
            { href: "/ai-voice-agents/", t: "AI voice agents", d: "Outbound, inbound, live transfer and the guardrails built into every account." },
            { href: "/voices-and-languages/", t: "How it sounds", d: "Everyday phone Hindi, Indian English and Hinglish. 80+ voices across 7 speech engines." },
            { href: "/pricing/", t: "Pricing", d: "From ₹3.49 a minute. Telephony and AI-call analysis included." },
          ].map((x) => (
            <Link key={x.href} href={x.href} className="card card-hover group p-7">
              <p className="text-xl font-extrabold text-ink group-hover:text-brand-700">{x.t}</p>
              <p className="mt-2 text-slate-600">{x.d}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-700">Learn more <ArrowRight className="h-4 w-4" /></span>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-sm text-slate-500">Sample conversations on this page are illustrative, with fictional businesses.</p>
      </section>
    </PageShell>
  );
}
