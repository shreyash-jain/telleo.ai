import Link from "next/link";
import {
  ArrowRight, Ban, Clock3, Copy, CreditCard, Hourglass, PhoneIncoming, PhoneForwarded, PhoneOff, PhoneOutgoing, UserX, Voicemail,
} from "lucide-react";
import { PageShell, FeatureRow, pageMetadata } from "@/components/PageShell";
import { HeroCallDemo } from "@/components/HeroCallDemo";
import { OutcomeFlow } from "@/components/Visuals";
import { CheckList, Transcript } from "@/components/ui";

export const metadata = pageMetadata("/ai-voice-agents/");

const GUARDS = [
  { I: CreditCard, t: "No balance, no dialling", d: "Calls stop before a bill can run away. Top up and they resume." },
  { I: Hourglass, t: "Daily call cap", d: "500 calls a day by default, set to whatever your team can follow up." },
  { I: Copy, t: "Duplicate protection", d: "A lead can't be dialled twice by accident in the same 30 seconds." },
  { I: UserX, t: "Skips assigned leads", d: "Automated calls leave alone leads that a rep already owns." },
  { I: Clock3, t: "Maximum call length", d: "6 minutes by default per agent, so a runaway call can't run up minutes." },
  { I: PhoneOff, t: "Idle hang-up", d: "If the line goes quiet, it nudges twice, then ends the call politely." },
  { I: Voicemail, t: "Voicemail aware", d: "A call where nobody really spoke is marked Incomplete, never Not interested." },
  { I: Ban, t: "Stops on no", d: "Not interested or wrong person? Your rules stop further calls to that lead." },
];

const FAQS = [
  { q: "How quickly does Telleo call a new lead?", a: "When a workflow starts the call as the lead arrives, the first call typically goes out in about a minute. Bulk campaigns work through a list at the pace your daily cap allows." },
  { q: "Can the agent answer our incoming calls?", a: "Yes. An option in the Telleo IVR can hand callers to an AI agent, which answers questions from its script, captures the enquiry and transfers to a person when needed. Connecting your existing business number is worked out during setup." },
  { q: "How does live transfer work?", a: "Each agent has handoff numbers. When the caller asks for a person or your script says a lead is hot, the agent says a short bridge line and the call is connected to your team, while the caller is still on the line." },
  { q: "What caller ID do leads see?", a: "Calls go out on Telleo's lines. If you want your own dedicated caller ID for AI calls, we can set up a separate AI line for your account." },
  { q: "How long can a call be?", a: "You set a maximum per agent. The default is 6 minutes, which is plenty for qualification and booking; longer consultative calls should go to your team." },
  { q: "Can we run AI calls and human calls side by side?", a: "Yes. Your team can keep calling on Exotel or Airtel IQ, or use Telleo's click-to-call on the Pro plan. The AI and your people share the same leads, outcomes and history." },
];

export default function Page() {
  return (
    <PageShell
      path="/ai-voice-agents/"
      dark
      eyebrow="AI voice agents"
      h1="AI voice agents that make the calls your team can't get to."
      lede="Telleo agents call new leads in about a minute, work through lists, answer inbound calls and remind customers, in Hindi, English and Hinglish. When a lead is ready, they hand over to your people, live or with everything written down."
      visual={<HeroCallDemo />}
      faqs={FAQS}
    >
      <section className="wrap space-y-24 py-20 md:py-28">
        <FeatureRow
          eyebrow="Outbound"
          title="Three ways to start a call."
          body={
            <>
              <p>Most teams use all three. The agent, script and outcome rules are the same whichever way the call starts.</p>
              <ul className="space-y-4 text-base">
                <li className="flex gap-3"><PhoneOutgoing className="mt-1 h-5 w-5 shrink-0 text-brand-700" /><span><strong className="text-ink">From a workflow.</strong> A new Meta, Google or website lead arrives and Telleo calls it in about 60 seconds. Or call after a missed payment, a form left half-done, or a demo tomorrow.</span></li>
                <li className="flex gap-3"><PhoneOutgoing className="mt-1 h-5 w-5 shrink-0 text-brand-700" /><span><strong className="text-ink">As a campaign.</strong> Upload a list or pick a segment, and the agent works through it inside the hours you choose.</span></li>
                <li className="flex gap-3"><PhoneOutgoing className="mt-1 h-5 w-5 shrink-0 text-brand-700" /><span><strong className="text-ink">With one click.</strong> A rep clicks &ldquo;call with AI&rdquo; on any lead to have the agent make the first call for them.</span></li>
              </ul>
            </>
          }
          visual={<OutcomeFlow />}
        />
        <FeatureRow
          flip
          eyebrow="Inbound"
          title="An AI receptionist that never puts callers on hold."
          body={
            <>
              <p>Route callers from the Telleo IVR to an AI agent. It answers the common questions from your script, captures who called and why, and transfers to a person when the question needs one.</p>
              <p>Every inbound call gets the same analysis as an outbound one: an outcome, a summary and the answers captured.</p>
              <Link href="/use-cases/ai-receptionist/" className="inline-flex items-center gap-1 text-base font-bold text-brand-700">The AI receptionist playbook <ArrowRight className="h-4 w-4" /></Link>
            </>
          }
          visual={
            <Transcript
              title="Inbound · IVR option 2 → AI agent"
              lines={[
                { who: "agent", text: "नमस्ते, Sunrise Academy में आपका स्वागत है। मैं आपकी क्या मदद कर सकती हूँ?", en: "Hello, welcome to Sunrise Academy. How can I help you?" },
                { who: "caller", text: "NEET की weekend batch कब से start हो रही है?", en: "When does the NEET weekend batch start?" },
                { who: "agent", text: "नया weekend batch 12 October से शुरू हो रहा है। Admission के लिए counsellor से अभी बात करवा दूँ?", en: "The new weekend batch starts on 12 October. Shall I connect you to a counsellor now?" },
                { who: "caller", text: "हाँ, करवा दीजिए।", en: "Yes, please." },
                { who: "agent", text: "एक second, मैं आपको counsellor से जोड़ रही हूँ।", en: "One second, I'm connecting you to a counsellor." },
              ]}
            />
          }
        />
        <FeatureRow
          eyebrow="Handover"
          title="Your people take over at the right moment."
          body={
            <>
              <p>The agent qualifies. Your team closes. Every agent has handoff numbers and rules for when to use them.</p>
              <CheckList
                items={[
                  "Live transfer while the caller is still on the line, after a short bridge line.",
                  "Or assign the hot lead to a rep the moment the call ends, with the summary and answers attached.",
                  "Meetings the caller agreed to are booked on your booking page automatically.",
                  "The exact callback time the caller asked for is saved on the lead for your team.",
                ]}
              />
            </>
          }
          visual={
            <div className="card p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-50"><PhoneForwarded className="h-5 w-5 text-brand-700" /></span>
                <div>
                  <p className="font-bold text-ink">Transferring to Counselling desk</p>
                  <p className="text-sm text-slate-500">Hot lead · score 9/10 · asked about fees and batch timing</p>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                {[["Name", "Rahul Sharma"], ["Class", "11th · CBSE"], ["Batch", "Weekend"], ["Budget", "Asked for instalments"]].map(([k, v]) => (
                  <div key={k} className="rounded-xl bg-paper p-3"><p className="text-xs text-slate-500">{k}</p><p className="font-semibold text-ink">{v}</p></div>
                ))}
              </div>
              <p className="mt-4 rounded-xl bg-ink px-4 py-3 text-sm text-slate-200">&ldquo;एक second, मैं आपको हमारे senior counsellor से जोड़ रही हूँ।&rdquo;</p>
            </div>
          }
        />
      </section>

      <section className="border-y border-line bg-paper">
        <div className="wrap py-20 md:py-24">
          <p className="eyebrow">Guardrails</p>
          <h2 className="h-section mt-3 max-w-3xl text-ink">Safe to leave running overnight.</h2>
          <p className="lede mt-4 max-w-2xl">An AI that calls your customers needs limits it can&apos;t talk its way past. These are built into every account.</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GUARDS.map((g) => (
              <div key={g.t} className="card p-5">
                <g.I className="h-5 w-5 text-brand-700" />
                <p className="mt-3 font-bold text-ink">{g.t}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{g.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-20 md:py-24">
        <div className="grid gap-10 lg:grid-cols-3">
          {[
            { href: "/voices-and-languages/", t: "How it sounds", d: "Everyday phone Hindi, Indian English and Hinglish. 80+ voices, correct grammar and honorifics." },
            { href: "/agent-builder/", t: "How you build it", d: "Opening line, questions, outcomes and handover rules. Drafted from a short brief." },
            { href: "/call-quality-monitoring/", t: "How you check it", d: "Every call gets a green, amber or red health verdict with the reason." },
          ].map((x) => (
            <Link key={x.href} href={x.href} className="card card-hover group p-7">
              <p className="text-xl font-extrabold text-ink group-hover:text-brand-700">{x.t}</p>
              <p className="mt-2 text-slate-600">{x.d}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-700">Learn more <ArrowRight className="h-4 w-4" /></span>
            </Link>
          ))}
        </div>
        <p className="mt-8 flex items-center gap-2 text-sm text-slate-500"><PhoneIncoming className="h-4 w-4" /> Sample conversations on this page are illustrative, with fictional businesses.</p>
      </section>
    </PageShell>
  );
}
