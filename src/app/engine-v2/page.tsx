import Link from "next/link";
import {
  ArrowRight, AudioLines, Code2, Ear, Gauge, Languages, ListChecks, PauseCircle, PhoneOff, Repeat2, ShieldCheck,
  Sparkles, Timer, UserCheck, Wallet, Workflow,
} from "lucide-react";
import { PageShell, pageMetadata } from "@/components/PageShell";
import { SamplePlayer } from "@/components/Interactive";
import { Transcript } from "@/components/ui";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata("/engine-v2/");

/** Every item here maps to changes shipped in the voice engine between late August and 2 October 2026. */
const ENGINE = [
  {
    I: Ear,
    t: "Turn-taking that feels like a person",
    points: [
      "Talks through “haan”, “जी”, “हम्म” and “Hello” instead of stopping dead. It stops when the caller means something, or keeps talking.",
      "Never starts a reply while the caller is still speaking.",
      "Waits for the whole answer, not the first breath, and waits out a caller who is still answering after “हाँ जी”.",
      "If the caller cuts in with a question, it answers the question.",
      "A cough or a 0.2-second noise is no longer treated as the caller's turn.",
    ],
  },
  {
    I: Timer,
    t: "Faster replies",
    points: [
      "About 0.3 seconds taken off every reply by closing the caller's turn the moment speech recognition finishes.",
      "Sentences your agent says on every call (greetings, standard answers) play from a speech cache instead of being synthesised each time.",
    ],
  },
  {
    I: ShieldCheck,
    t: "A call never stalls on one vendor",
    points: [
      "If a language-model provider stalls or errors, the next one in line takes over within about 3 seconds. The caller hears one slow reply, not a dead call.",
      "If speech recognition fails mid-call, a second provider takes over for the rest of the call.",
      "One reply at a time: the agent can no longer answer twice or talk over its own recovery.",
    ],
  },
  {
    I: Repeat2,
    t: "Says it once",
    points: [
      "Doesn't repeat an opening the caller has already heard, even after an interruption.",
      "Every sentence the caller actually heard is remembered, so the agent picks up where it was cut off instead of starting over.",
      "Call health now flags a replayed opening or a repeated line, so you can see if it ever happens.",
    ],
  },
  {
    I: Languages,
    t: "Hindi that listens",
    points: [
      "“समझ नहीं आया” is treated as a request to say it again.",
      "“क्या बोलूं?” makes the agent re-ask its question instead of moving on.",
      "A caller asking in Hindi to end the call ends the call.",
      "Replies in the caller's other language are pronounced correctly.",
    ],
  },
  {
    I: PhoneOff,
    t: "Voicemail and call screeners",
    points: [
      "Hangs up on voicemail instead of talking to a recording.",
      "Handles call-screening assistants politely, and once a real person picks up, the call carries on as normal.",
    ],
  },
  {
    I: AudioLines,
    t: "Sounds like a calling desk",
    points: [
      "A real call-centre ambience recording sits under every call, at a low level.",
      "The agent's voice is shaped to the telephone band, so it sounds like a phone call, not a studio.",
      "Per-agent voice modulation (Off, Subtle, Conversational, Lively) so the voice rises and falls naturally.",
    ],
  },
  {
    I: ListChecks,
    t: "Tested on real calls before it ships",
    points: [
      "Every live call can be replayed as a regression test against a new build.",
      "Each release runs a conversation simulator and a timing simulator, with difficult callers, before it reaches your calls.",
    ],
  },
];

const PLATFORM = [
  { I: Wallet, t: "30-second billing pulses", d: "Calls are billed in half-minute pulses at the same per-minute rate. A caller who hangs up after 5 seconds no longer costs a full minute." },
  { I: PauseCircle, t: "Pause and resume calling", d: "Pause your account's AI call queue from the dashboard and resume it when you're ready." },
  { I: UserCheck, t: "Smarter handover", d: "Leads that engaged but didn't reach a clear outcome go to a person, with a one-line follow-up note for the counsellor." },
  { I: Workflow, t: "Qualified leads to your team pool", d: "Optionally hand AI-qualified leads to the counsellor pool linked to the list." },
  { I: Sparkles, t: "Script from your notes", d: "The script assistant can regenerate an agent's script from your own notes and keep the rest of the agent in sync." },
  { I: Code2, t: "AI calling API", d: "Start one call or a bulk run of up to 1,000 numbers, and fetch each call's status and recording, with an API key issued by our team." },
];

const FAQS = [
  { q: "Do I need to do anything to get Engine v2?", a: "No. Every Telleo call now runs on Engine v2. Your agents, scripts and outcome rules work as before." },
  { q: "Does Engine v2 cost more?", a: "No. Per-minute rates are unchanged. Billing in 30-second pulses only makes short calls cheaper: a full minute costs the same as before." },
  { q: "What made you rebuild the engine?", a: "Listening to real calls. Most changes started from a specific call where a parent interrupted, said “haan” mid-sentence, switched language or hung up, and the agent didn't handle it the way a good telecaller would." },
  { q: "How do I hear the difference?", a: "Call our test line, +91 80353 74489, and try to trip the agent up: interrupt it, say “haan” while it talks, ask it to repeat itself in Hindi. Or book a demo and we'll run your own script." },
  { q: "How do I get API access?", a: "Ask us. We issue an API key for your account; it can start calls with your agents and read their status and recordings." },
];

export default function Page() {
  return (
    <PageShell
      path="/engine-v2/"
      dark
      eyebrow="New · October 2026"
      h1={<>Telleo Engine v2 is live.</>}
      lede={
        <>
          <p>
            The voice engine behind every Telleo call, rebuilt from hundreds of real Indian phone calls. Over 150 changes
            since August make the agent better at the hard parts of a call: interruptions, “haan” mid-sentence, Hindi, and
            staying up when a vendor doesn&apos;t.
          </p>
        </>
      }
      visual={
        <div className="space-y-4">
          <Transcript
            title="Engine v2 · interruption handled"
            lines={[
              { who: "agent", text: "हमारे यहाँ weekend batch भी है और weekday evening भी, आपके लिए…", en: "We have a weekend batch and a weekday evening one, for you…" },
              { who: "caller", text: "haan…", en: "(acknowledging)" },
              { who: "agent", text: "…कौन सा ठीक रहेगा?", en: "…which would suit you?" },
              { who: "caller", text: "Fees कितनी है?", en: "What are the fees?" },
              { who: "agent", text: "Fees program के हिसाब से है, बत्तीस से पचास हज़ार के बीच। Weekend या weekday, क्या ठीक रहेगा?", en: "It depends on the program, between 32 and 50 thousand. Weekend or weekday, which suits you?" },
            ]}
          />
          <SamplePlayer />
        </div>
      }
      faqs={FAQS}
      faqTitle="Engine v2 questions"
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Telleo Engine v2 is live",
          datePublished: "2026-10-02",
          mainEntityOfPage: `${SITE}/engine-v2/`,
          author: { "@type": "Organization", name: "Telleo", url: SITE },
          publisher: { "@id": `${SITE}/#org` },
        }}
      />
      <section className="wrap py-20 md:py-24">
        <p className="eyebrow">What changed on the call</p>
        <h2 className="h-section mt-3 max-w-3xl text-ink">Eight things you&apos;ll hear on every call.</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {ENGINE.map((e, i) => (
            <div key={e.t} className="card p-7">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-brand"><e.I className="h-5 w-5" /></span>
                <span className="font-mono text-xs text-slate-400">0{i + 1}</span>
              </div>
              <h3 className="mt-4 text-xl font-extrabold text-ink">{e.t}</h3>
              <ul className="mt-3 space-y-2">
                {e.points.map((p) => (
                  <li key={p} className="flex gap-2.5 leading-relaxed text-slate-600">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="wrap py-20 md:py-24">
          <p className="eyebrow">Around the engine</p>
          <h2 className="h-section mt-3 max-w-3xl text-ink">Also new in the platform.</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PLATFORM.map((p) => (
              <div key={p.t} className="card p-6">
                <p.I className="h-5 w-5 text-brand-700" />
                <p className="mt-3 font-bold text-ink">{p.t}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-20 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <Gauge className="h-7 w-7 text-brand-700" />
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink md:text-4xl">Try to trip it up.</h2>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-600">
              Ring the test line and interrupt it, say “haan” while it talks, ask it to repeat itself in Hindi, then ask
              about fees halfway through a sentence.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/how-it-works/" className="btn btn-outline">How a call works</Link>
            <Link href="/voices-and-languages/" className="btn btn-dark">Voices & Hindi <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
