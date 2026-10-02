import { Brain, CheckCircle2, Ear, FileBarChart, Gavel, PhoneCall, ShieldCheck, Speaker, Zap } from "lucide-react";
import { PageShell, pageMetadata } from "@/components/PageShell";

export const metadata = pageMetadata("/how-it-works/");

const STAGES = [
  {
    I: Zap, t: "1. Something starts the call",
    d: "A new lead arrives from an ad or form, a workflow reaches its call step, a campaign reaches the next name on a list, or a rep clicks “call with AI”.",
    x: ["Meta and Google lead forms, website webhooks, CSV imports", "Or inbound: a caller picks the AI option in the IVR"],
  },
  {
    I: ShieldCheck, t: "2. Checks before dialling",
    d: "Before a number is dialled, Telleo confirms there is balance on the account, the daily cap isn't reached, the lead wasn't just called, and (for workflow calls) no rep already owns the lead.",
    x: ["No balance, no dialling", "30-second duplicate protection", "Daily cap, 500 by default"],
  },
  {
    I: PhoneCall, t: "3. The call connects",
    d: "Telleo dials on its own lines, or on your dedicated AI line. The agent greets the caller by name with its opening line, fitted to the time of day.",
    x: ["Telephony included", "Recording, when switched on for your line"],
  },
  {
    I: Ear, t: "4. Listen",
    d: "Speech recognition turns the caller's words into text as they talk. A turn-taking model decides when they have actually finished, so the agent doesn't jump in on a pause, or leave dead air.",
    x: ["Interruptions stop the agent mid-sentence", "“haan”, “achha”, “okay” don't derail it"],
  },
  {
    I: Brain, t: "5. Think",
    d: "A language model decides the next thing to say, using your script, the lead's details and everything said so far. Rules in code stop it repeating itself or echoing the caller's answers.",
    x: ["One question at a time", "Answers the caller's question first"],
  },
  {
    I: Speaker, t: "6. Speak",
    d: "The reply is spoken in the voice you chose, shaped for a phone line. The live voice pipeline runs on servers in Mumbai, next to the Indian phone network.",
    x: ["80+ voices, 7 speech engines", "Hindi, English, Hinglish"],
  },
  {
    I: Gavel, t: "7. Decide and hand over",
    d: "When the goal is reached the agent closes concretely: a day and time, a WhatsApp on its way, or a live transfer to your team. It ends the call politely and waits a moment in case the caller says something else.",
    x: ["Live transfer to handoff numbers", "Maximum call length per agent"],
  },
  {
    I: FileBarChart, t: "8. Analyse",
    d: "The transcript is read once more to pick the outcome from your list, write a summary, score the lead from 1 to 10 and file the answers against your questions.",
    x: ["No conversation → Incomplete", "Meetings only with a real day and time"],
  },
  {
    I: CheckCircle2, t: "9. Act, bill and grade",
    d: "Your rules run: assign, book, send, retry or stop. The minutes are billed, the call gets its health verdict, and everything appears on the lead and in the call log.",
    x: ["Billed in 30-second pulses", "Green, amber or red health verdict"],
  },
];

const FAQS = [
  { q: "How long does it take the agent to reply?", a: "Speed is a design goal: the live voice pipeline runs on servers in Mumbai, next to the Indian phone network, to keep the round trip short, and slow replies are flagged. Every call's timings are measured and shown in its health panel, so you can check for yourself." },
  { q: "What if the caller interrupts?", a: "The agent stops talking and listens. Short acknowledgements like “haan” or “okay” are treated as the caller following along, so the agent carries on instead of restarting." },
  { q: "What if the line is bad and it can't hear?", a: "It asks once in natural words. If it still can't hear, it closes politely rather than apologising in a loop, and the call is flagged in call health." },
  { q: "What if the call reaches voicemail?", a: "A call where nobody really spoke is marked Incomplete, not Not interested; workflow calls are retried, and a campaign can be re-run to call them again." },
  { q: "Does the analysis make things up?", a: "It is limited to your own outcome list and only records answers that were actually said. A meeting is only counted when a specific day and time were agreed on the call." },
];

export default function Page() {
  return (
    <PageShell
      path="/how-it-works/"
      eyebrow="How it works"
      h1="What happens between “new lead” and “meeting booked”."
      lede="Nine stages. Here is exactly what Telleo does on every call, so you know what to expect and where to look when you want to check."
      faqs={FAQS}
    >
      <section className="wrap py-20 md:py-24">
        <ol className="relative space-y-5 before:absolute before:bottom-6 before:left-[1.45rem] before:top-6 before:w-px before:bg-line md:before:left-[1.7rem]">
          {STAGES.map((s) => (
            <li key={s.t} className="relative grid gap-4 md:grid-cols-[3.5rem_1fr]">
              <span className="relative z-10 grid h-12 w-12 place-items-center rounded-2xl bg-ink text-brand md:h-14 md:w-14"><s.I className="h-5 w-5 md:h-6 md:w-6" /></span>
              <div className="card grid gap-4 p-6 md:grid-cols-[1.4fr_1fr]">
                <div>
                  <h2 className="text-xl font-extrabold text-ink">{s.t}</h2>
                  <p className="mt-2 leading-relaxed text-slate-600">{s.d}</p>
                </div>
                <ul className="space-y-2 self-center">
                  {s.x.map((x) => (
                    <li key={x} className="rounded-lg bg-paper px-3 py-2 text-sm font-medium text-slate-700">{x}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </PageShell>
  );
}
