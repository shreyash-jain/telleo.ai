import { Activity, Download, Eye, Radio, Search, ShieldCheck } from "lucide-react";
import { PageShell, FeatureRow, pageMetadata } from "@/components/PageShell";
import { HealthLog } from "@/components/Visuals";
import { CheckList } from "@/components/ui";
import { Steps } from "@/components/BlogShell";

export const metadata = pageMetadata("/call-quality-monitoring/");

const FAULTS = [
  { c: "rose", h: "The agent could not hear the caller", m: "Speech was detected but nothing usable came through. Often a bad line or a very noisy room." },
  { c: "rose", h: "The agent never spoke", m: "The caller spoke and the agent produced no audio. Rare, and always worth a look." },
  { c: "rose", h: "Voice synthesis stalled", m: "The voice engine stopped mid-reply. The agent reconnects and repeats, and the call is flagged." },
  { c: "amber", h: "Long silence", m: "A gap of 3.5 seconds or more during a real conversation, with what the agent was doing at the time." },
  { c: "amber", h: "Caller answers were discarded", m: "Something the caller said never reached the conversation. The exact words are shown." },
  { c: "amber", h: "The agent kept restarting a reply", m: "Two near-identical replies in a row (three turns it red): usually a script or interruption problem." },
  { c: "amber", h: "Probably an answering machine", m: "An estimate only. It never changes the outcome on its own." },
  { c: "amber", h: "Transfer failed · slow responses", m: "A handover that didn't connect, or replies that took too long, measured on the call." },
];

const FAQS = [
  { q: "Is call health the same as call intelligence?", a: "No. Call intelligence is about the conversation: outcome, objections, sentiment. Call health is about the machinery: could the agent hear, did it speak on time, did anything go silent or get lost. You get both on every AI call." },
  { q: "What does ‘not measured’ mean?", a: "Some signals can't be measured on every call. When that happens, the panel says so instead of showing zero, so a clean-looking number is never a guess." },
  { q: "Can we hear the call?", a: "With recording switched on for your line, yes: play the recording next to the transcript and the timings. Every AI call has a full transcript either way." },
  { q: "Who can see transcripts?", a: "Health verdicts and technical diagnostics are shown to your account admins. Anyone with access to the call log can open transcripts; they are not restricted per role. Health verdicts and technical diagnostics are shown only to your account admins, and on the call log you choose which roles see full phone numbers., and on the call log you choose which roles see full phone numbers." },
  { q: "Can we export calls for our own QA?", a: "Yes. Search and filter the call log by outcome, date, team, counsellor and more, and export the results." },
];

export default function Page() {
  return (
    <PageShell
      path="/call-quality-monitoring/"
      dark
      eyebrow="Call health & QA"
      h1="Every AI call gets a health check. Bad calls stand out."
      lede="Too often, a team learns about a bad AI call from an angry customer. Telleo grades every AI call green, amber or red with a plain reason, so you can open the three calls that matter instead of listening to three hundred."
      visual={<HealthLog dark />}
      faqs={FAQS}
    >
      <section className="wrap py-20 md:py-24">
        <p className="eyebrow">What it catches</p>
        <h2 className="h-section mt-3 max-w-3xl text-ink">Plain-language verdicts, not a wall of metrics.</h2>
        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {FAULTS.map((f) => (
            <div key={f.h} className="card flex gap-4 p-5">
              <span className={`mt-1.5 h-3 w-3 shrink-0 rounded-full ${f.c === "rose" ? "bg-rose" : "bg-amber"}`} />
              <div>
                <p className="font-bold text-ink">{f.h}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{f.m}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="wrap space-y-24 py-20 md:py-28">
          <FeatureRow
            eyebrow="Honest numbers"
            title="If we couldn't measure it, we say so."
            body={
              <>
                <p>A quality dashboard that shows zero when it means &ldquo;we don&apos;t know&rdquo; is worse than no dashboard. On Telleo, a signal that wasn&apos;t measured on a call is shown as &ldquo;not measured&rdquo;.</p>
                <p>When a caller&apos;s answer is lost, you see the exact words, not just a count. When there is a long silence, you see what the agent was doing at that moment.</p>
              </>
            }
            visual={
              <div className="card overflow-hidden">
                <div className="flex items-center gap-2 border-b border-line bg-paper px-5 py-3 text-sm font-bold text-ink"><Activity className="h-4 w-4 text-brand-700" /> Call health · Vikram Rao · 3:05</div>
                <dl className="grid grid-cols-2 gap-px bg-line text-sm">
                  {[
                    ["Verdict", <span key="v" className="flex items-center gap-1.5 font-bold text-amber"><span className="h-2 w-2 rounded-full bg-amber" /> Long silence</span>],
                    ["Worst gap", "4.1 s · after the caller's turn"],
                    ["Interruptions handled", "3"],
                    ["Answers discarded", "0"],
                    ["Repeated replies", "0"],
                    ["Speech-to-text delay", <span key="m" className="text-slate-400">not measured</span>],
                  ].map(([k, v], i) => (
                    <div key={i} className="bg-white px-5 py-3">
                      <dt className="text-xs text-slate-500">{k}</dt>
                      <dd className="mt-0.5 font-semibold text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            }
          />
          <FeatureRow
            flip
            eyebrow="The call log"
            title="Search, listen, export."
            body={
              <CheckList
                items={[
                  "A health dot on every AI call, with the headline on hover.",
                  "Transcript, recording (when switched on) and timings on every call.",
                  "Live status while a call is in progress.",
                  "Search, filter and export by outcome, date, team, counsellor and call type.",
                  "Full phone numbers only for roles allowed to see them; diagnostics for admins.",
                ]}
              />
            }
            visual={
              <div className="grid grid-cols-2 gap-3">
                {[
                  { I: Search, t: "Search & filter", d: "By outcome, counsellor, date" },
                  { I: Radio, t: "Live status", d: "Watch calls as they happen" },
                  { I: Eye, t: "Role-based access", d: "Numbers and diagnostics by role" },
                  { I: Download, t: "Export", d: "Take calls into your QA" },
                ].map((x) => (
                  <div key={x.t} className="card p-5">
                    <x.I className="h-5 w-5 text-brand-700" />
                    <p className="mt-3 font-bold text-ink">{x.t}</p>
                    <p className="mt-1 text-sm text-slate-600">{x.d}</p>
                  </div>
                ))}
              </div>
            }
          />
        </div>
      </section>

      <section className="wrap py-20 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <ShieldCheck className="h-7 w-7 text-brand-700" />
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink md:text-4xl">A 20-minute weekly QA routine.</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">What we recommend to every team running AI calls. It catches script problems early and keeps the agent sounding like you.</p>
          </div>
          <Steps
            items={[
              { title: "Scan for red and amber", body: "Scan the call log's health dots and open the week's red calls first, then a sample of amber ones. Read the headline before you listen." },
              { title: "Read three healthy calls too", body: "Pick three green calls at random. A healthy call can still have a weak script." },
              { title: "Check outcomes against transcripts", body: "Did “Demo_Booked” really have a day and time? Did “Not_Interested” really say no?" },
              { title: "Fix the script, not the symptom", body: "Change the opening line, a question or an outcome, then use the feedback tool to revise and re-test on your own phone." },
            ]}
          />
        </div>
      </section>
    </PageShell>
  );
}
