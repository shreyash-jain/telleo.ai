import { ClipboardList, FileText, Gauge, MessageSquareText, Mic, PhoneForwarded, Sparkles, Timer, Wand2, ListChecks } from "lucide-react";
import { PageShell, FeatureRow, pageMetadata } from "@/components/PageShell";
import { BuilderMock } from "@/components/Visuals";
import { CheckList } from "@/components/ui";

export const metadata = pageMetadata("/agent-builder/");

const FIELDS = [
  { I: MessageSquareText, t: "Opening line", d: "The first sentence the caller hears. Who you are, why you're calling, and a question. It can use the lead's name and form answers." },
  { I: FileText, t: "Persona and script", d: "Who the agent is, what it may and may not say, the facts it can use (fees, timings, locations) and how to handle objections." },
  { I: ClipboardList, t: "Questions to answer", d: "What every call must find out: budget, timeline, class, location. The answers land on the lead as fields." },
  { I: ListChecks, t: "Outcomes", d: "Your own closed list: Demo_Booked, Callback, Not_Interested, Hot_Lead. The agent picks one after every call." },
  { I: Mic, t: "Voice, pace, expressiveness", d: "Any of 80+ voices, a speaking pace, and a modulation level from Off to Lively." },
  { I: PhoneForwarded, t: "Handoff numbers", d: "Where live transfers go when a caller asks for a person or a lead is hot." },
  { I: Timer, t: "Max call length", d: "A hard limit per call. Six minutes by default." },
  { I: Gauge, t: "Booking page", d: "Where agreed meetings get booked, so a 'yes' becomes a calendar entry." },
];

const FAQS = [
  { q: "Do we need to know prompt writing?", a: "No. Describe the job in plain words and Telleo drafts the script, the questions and the outcomes. You edit it like a document. If you do write your own script, Telleo scores it and suggests fixes." },
  { q: "Can the agent use details from the lead's form?", a: "Yes. The agent knows the lead's name and any fields captured on the form, so it can say “you asked about the 2 BHK in Wakad” instead of a generic opener." },
  { q: "How do we test an agent before it calls customers?", a: "Preview the voice, then have the agent call your own phone. Every test call gets the same transcript, outcome and health verdict as a real one, so you can fix the script before launch." },
  { q: "Can we have different agents for different jobs?", a: "Yes. Most teams run several: one for new-lead qualification, one for reminders, one for inbound. Each has its own script, voice, outcomes and handover rules." },
  { q: "Can the script include our prices and policies?", a: "Yes, and it should. The agent only states facts that are in its script, so put in exactly what it may say about fees, offers and timings, and tell it to transfer anything else." },
  { q: "What stops the agent from rambling?", a: "Every agent follows built-in rules on top of your script: one question at a time, answer the caller's question first, stop the script when the caller is frustrated, and never read lists aloud." },
];

export default function Page() {
  return (
    <PageShell
      path="/agent-builder/"
      eyebrow="Agent builder"
      h1="Build an AI calling agent the way you'd brief a new telecaller."
      lede="Tell Telleo who to call, why, what to find out and when to hand over. It drafts the script, picks sensible outcomes and lets you hear the voice before a single customer does. No code, no prompt engineering."
      visual={<BuilderMock />}
      faqs={FAQS}
    >
      <section className="wrap py-20 md:py-24">
        <p className="eyebrow">Eight fields</p>
        <h2 className="h-section mt-3 max-w-3xl text-ink">Everything an agent needs, on one screen.</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FIELDS.map((f) => (
            <div key={f.t} className="card p-6">
              <f.I className="h-5 w-5 text-brand-700" />
              <p className="mt-3 font-bold text-ink">{f.t}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="wrap space-y-24 py-20 md:py-28">
          <FeatureRow
            eyebrow="AI-assisted scripting"
            title="Draft it, score it, fix it, improve it from real calls."
            body={
              <>
                <p>Four tools sit next to the script editor. Each uses what we&apos;ve learned from live Indian phone calls, not generic chatbot advice.</p>
                <CheckList
                  items={[
                    "Draft: write a two-line brief and get a complete script, questions and outcomes.",
                    "Analyse: score an existing script against a live-call rubric and see what will go wrong on the phone.",
                    "Improve: apply the suggestions you agree with, one click each.",
                    "Feedback: paste what went wrong on real calls and get a revised script.",
                  ]}
                />
              </>
            }
            visual={
              <div className="card overflow-hidden">
                <div className="flex items-center gap-2 border-b border-line bg-paper px-5 py-3 text-sm font-bold text-ink"><Wand2 className="h-4 w-4 text-brand-700" /> Script review</div>
                <ul className="divide-y divide-line text-sm">
                  {[
                    { s: "Ask one question per turn", n: "Turn 3 asks for class, board and budget together." },
                    { s: "Close on a concrete next step", n: "The script ends with “we'll be in touch”. Offer a day and time." },
                    { s: "Answer questions before continuing", n: "No instruction for fee questions. Add the fee range or a transfer rule." },
                    { s: "No lists read aloud", n: "Batch timings are written as a bullet list. Rewrite as one sentence." },
                  ].map((x) => (
                    <li key={x.s} className="flex gap-3 px-5 py-4">
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                      <span><span className="font-semibold text-ink">{x.s}.</span> <span className="text-slate-600">{x.n}</span></span>
                    </li>
                  ))}
                </ul>
              </div>
            }
          />
          <FeatureRow
            flip
            eyebrow="Templates"
            title="Start from a playbook, not a blank page."
            body={
              <>
                <p>A gallery of ready agents answers a few questions about your business and builds the rest: admissions and enquiry calls, fee and payment reminders, re-engagement of old leads, parent and customer updates, and more.</p>
                <p>Templates are education-first today, because that&apos;s where Telleo started. The builder works the same for any industry; our team helps you set up the first agent.</p>
              </>
            }
            visual={
              <div className="grid grid-cols-2 gap-3">
                {["Admissions enquiry", "Fee reminder", "Re-engage old leads", "Parent update", "Demo booking", "Feedback call"].map((t, i) => (
                  <div key={t} className={`rounded-2xl border p-4 ${i === 0 ? "border-brand bg-brand-50" : "border-line bg-white"}`}>
                    <p className="text-sm font-bold text-ink">{t}</p>
                    <p className="mt-1 text-xs text-slate-500">Hinglish · 4 questions · 5 outcomes</p>
                  </div>
                ))}
              </div>
            }
          />
        </div>
      </section>

      <section className="wrap py-20 md:py-24">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Rules on top of your script</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink md:text-4xl">The phone manners every agent gets for free.</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">Your script says what to talk about. Telleo adds the rules that keep a phone call feeling natural, learned from calls that went wrong without them.</p>
          </div>
          <CheckList
            items={[
              "Answer the caller's question before going back to the script.",
              "One question per turn, then stop and listen.",
              "If the caller sounds frustrated, drop the script and deal with it.",
              "Stay in the caller's language; don't switch without a reason.",
              "No bullet points or lists read aloud; numbers spoken as words.",
              "A phone number or booked time is read back once to confirm. Nothing else is echoed.",
              "Never address someone by a word that isn't a name.",
              "Greet for the actual time of day.",
            ]}
          />
        </div>
      </section>
    </PageShell>
  );
}
