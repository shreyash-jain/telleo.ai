import Link from "next/link";
import {
  ArrowRight, AudioLines, BadgeCheck, Bot, BrainCircuit, CalendarCheck, CircleGauge, FileSpreadsheet, Globe, Headphones,
  Languages, Lock, Mail, MessageCircle, Mic, PhoneCall, PhoneForwarded, PhoneOutgoing, Repeat, ShieldCheck, Sparkles,
  Timer, UserCheck, Users, Webhook, Workflow, X as XIcon, Zap,
} from "lucide-react";
import { HeroCallDemo } from "@/components/HeroCallDemo";
import { RotatingWords, SamplePlayer } from "@/components/Interactive";
import { RoiCalculator } from "@/components/RoiCalculator";
import { PricingCards } from "@/components/Pricing";
import { DemoForm } from "@/components/DemoForm";
import { BuilderMock, HealthLog, IntelligenceCard, OutcomeFlow } from "@/components/Visuals";
import { Check, CheckList, FaqList, Icon, SectionHeading } from "@/components/ui";
import { USE_CASES } from "@/content/useCases";
import { INDUSTRIES } from "@/content/industries";
import { POSTS, postPath } from "@/content/posts";
import { TEST_LINE, TEST_LINE_DISPLAY, bookHref } from "@/lib/site";

const HBR = "https://hbr.org/2011/03/the-short-life-of-online-sales-leads";

const STATS = [
  { v: "~60 s", l: "from form fill to first call" },
  { v: "80+", l: "voices across 7 speech engines" },
  { v: "3", l: "languages live: Hindi, English, Hinglish" },
  { v: "₹3.49", l: "per minute on the annual plan" },
  { v: "100%", l: "of AI calls transcribed, analysed and graded" },
];

const STEPS = [
  { n: "01", t: "Describe the job", d: "Write a brief in plain words, or pick a template. Telleo drafts the script, the questions to ask and the outcomes to choose from.", I: Bot },
  { n: "02", t: "Pick a voice", d: "Audition 80+ male and female voices in Hindi, English and Hinglish. The preview plays exactly what the caller will hear.", I: Mic },
  { n: "03", t: "Connect your leads", d: "Meta and Google lead forms, your website, a CSV, or any system that can send a webhook. New leads trigger a call in about a minute.", I: Workflow },
  { n: "04", t: "Telleo calls and acts", d: "It talks, captures the answers, books the meeting or transfers the hot lead, then writes the outcome to your CRM and follows up.", I: PhoneOutgoing },
];

const PILLARS = [
  { href: "/ai-voice-agents/", I: PhoneCall, t: "AI voice agents", d: "Outbound and inbound calls that qualify, book and remind, with live transfer to your team when a lead is hot." },
  { href: "/agent-builder/", I: Bot, t: "No-code agent builder", d: "Opening line, script, questions, outcomes, voice and handoff numbers. Drafted from a brief, improved from real calls." },
  { href: "/automations/", I: Zap, t: "Actions after every call", d: "Assign, retry, stop, book, send WhatsApp or email, fire a webhook. Rules you set, run within a minute of hang-up." },
  { href: "/call-intelligence/", I: BrainCircuit, t: "Call intelligence", d: "Summaries, objections, sentiment, talk ratio, coaching tips and rep scores for AI calls and your team's calls." },
  { href: "/call-quality-monitoring/", I: CircleGauge, t: "Call health & QA", d: "Every call gets a green, amber or red verdict with the reason, so you find the bad call before a customer complains." },
  { href: "/voices-and-languages/", I: Languages, t: "Voices & languages", d: "Everyday phone Hindi, Indian English and Hinglish, with correct grammar and honorifics. Regional languages on request." },
];

const HUMAN = [
  { t: "It lets people say “haan”", d: "A “haan”, “achha” or “okay” while the agent is talking doesn't derail it. It carries on, and the yes still counts.", ex: "Caller: “haan…” → agent keeps going" },
  { t: "It never parrots answers back", d: "No “Okay, so you scored ninety-four.” It moves to the next question. Phone numbers and booked times are read back once, on purpose.", ex: "“बहुत बढ़िया score है, अब…”" },
  { t: "It never repeats itself", d: "A sentence already said in the call is not said again, so callers never hear the same pitch twice.", ex: "Same line twice → blocked" },
  { t: "Hindi grammar that fits the voice", d: "A female voice says “कर रही हूँ”, a male voice “कर रहा हूँ”. Unsure of the caller's gender? It says “Rahul जी”, never a guess.", ex: "मैं आपकी मदद कर रही हूँ" },
  { t: "Everyday phone Hindi", d: "“Enquiry”, not “पूछताछ”. It speaks the Hinglish your customers speak, not a textbook.", ex: "आपका demo confirm हो गया" },
  { t: "It sounds like a phone line", d: "Telephone-band voice shaping and a faint room tone, so it sounds like a calling desk, not a studio recording.", ex: "Sounds like a calling desk" },
  { t: "It turns “kal shaam” into a time", d: "Relative times become an exact date and time on the lead, so nobody has to guess what “tomorrow evening” meant.", ex: "कल शाम → Sat, 6:00 pm" },
  { t: "It knows when to stop", d: "If it can't hear the caller twice, it closes politely instead of apologising in a loop. It won't hang up on someone who speaks after goodbye.", ex: "No loops, no rude hang-ups" },
];

const COMPARE = [
  { k: "First call after a lead arrives", a: "About 60 seconds, any hour", b: "When someone is free", c: "Instant, but one-way" },
  { k: "Holds a real conversation", a: "Yes, with interruptions", b: "Yes", c: "No, press 1 / press 2" },
  { k: "Hindi, English, Hinglish", a: "All three, same agent", b: "Depends on who you hire", c: "Pre-recorded only" },
  { k: "Captures answers into the CRM", a: "Every call, automatically", b: "If they remember to", c: "Keypad inputs only" },
  { k: "Books meetings and sends WhatsApp", a: "On the call, automatically", b: "Manually, later", c: "No" },
  { k: "Every call transcribed and analysed", a: "Yes, with a health verdict", b: "Rarely reviewed", c: "No" },
  { k: "Scales for a campaign spike", a: "Same day", b: "Hire and train", c: "Yes" },
  { k: "Handles a complex negotiation", a: "No, it transfers to your team", b: "Yes", c: "No" },
];

const INTEGRATIONS = [
  { I: Globe, t: "Meta lead ads", d: "Facebook and Instagram forms" },
  { I: Globe, t: "Google lead forms", d: "Ads and Google Forms" },
  { I: Webhook, t: "Website forms", d: "Any form, via webhook" },
  { I: FileSpreadsheet, t: "CSV & Excel", d: "Import lists in bulk" },
  { I: Users, t: "Built-in CRM", d: "Pipelines, owners, statuses" },
  { I: MessageCircle, t: "WhatsApp Business", d: "Approved templates" },
  { I: Mail, t: "Email", d: "Follow-ups and summaries" },
  { I: CalendarCheck, t: "Booking pages", d: "Meetings booked on the call" },
  { I: Webhook, t: "Webhooks & HTTP", d: "Push outcomes anywhere" },
  { I: PhoneCall, t: "Telephony included", d: "No SIMs or dialers needed" },
  { I: Headphones, t: "Exotel & Airtel IQ", d: "Keep them for your team" },
  { I: Workflow, t: "Workflows", d: "Call → WhatsApp → email → webhook" },
];

const FAQS = [
  { q: "Will callers know they are talking to an AI?", a: "You decide how the agent introduces itself. We recommend saying it is an AI assistant for your business in the opening line. What callers do notice is that it answers their question, doesn't repeat itself and gets them to a person when they need one." },
  { q: "Which languages does Telleo speak?", a: "Hindi, English and Hinglish are live today, including callers who switch between them mid-sentence. The voice engines also support Tamil, Telugu, Marathi, Bengali, Gujarati, Kannada, Malayalam, Punjabi and Odia; we set those up and test them with you before they go on real calls." },
  { q: "Do we need our own telephony, SIM cards or dialer?", a: "No. Calls run on Telleo's lines. If you want a dedicated caller ID, we can put the AI on its own line. Your human team can stay on Exotel or Airtel IQ for their calls." },
  { q: "What happens when a lead is ready to buy?", a: "You choose. The agent can transfer the call live to your team's numbers, book a meeting on your booking page, or mark the lead hot and assign it to a rep the moment the call ends." },
  { q: "Can we hear and check every call?", a: "Yes. Every AI call is transcribed (and recorded, with recording switched on for your line), gets a summary, an outcome and a lead score, and a green, amber or red health verdict that tells you if anything went wrong on the call." },
  { q: "How is Telleo priced?", a: "Per minute of conversation: ₹3.99 a minute on monthly plans from ₹3,499 a month, or ₹3.49 a minute with no minimum on the ₹19,999-a-year annual plan. Telephony, recordings and analysis of AI calls are included. Prices exclude GST; DLT registration is charged at actuals." },
  { q: "Does it work with our CRM?", a: "Telleo comes with its own CRM, so outcomes, owners and follow-ups land in one place. If you run another system, leads can come in by webhook or CSV and outcomes can go out by webhook." },
  { q: "Is AI calling allowed in India?", a: "Yes, within TRAI's rules. Commercial calling needs DLT registration, which we complete with you. Since TRAI's September 2026 amendment, AI voice calls count as application-to-person (A2P) calls that must be declared to the telecom operator, and an enquiry supports commercial calls for seven days; after that you need explicit consent. Read our TRAI and DLT guide and confirm your case with counsel." },
  { q: "What will the agent not do?", a: "It won't negotiate complex deals, take card payments on the call, or give medical, legal or financial advice. Script it to hand those moments to your team. It can send a payment link on WhatsApp if the caller agrees." },
];

export default function Home() {
  const posts = POSTS.slice(0, 4);
  return (
    <main>
      {/* ───────────── Hero ───────────── */}
      <section className="relative -mt-16 overflow-hidden bg-ink pb-16 pt-28 text-white md:-mt-[4.5rem] md:pb-24 md:pt-36">
        <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
        <div className="glow-brand pointer-events-none absolute -left-40 top-10 h-[36rem] w-[36rem] opacity-70" />
        <div className="wrap relative grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] [&>*]:min-w-0">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" /> AI voice agents for Indian businesses
            </p>
            <h1 className="h-display mt-6 text-[2.6rem] sm:text-6xl xl:text-[4.4rem]">
              AI agents that
              <br />
              <RotatingWords
                className="text-brand"
                words={["call every lead.", "qualify buyers.", "book the demo.", "chase payments.", "answer your line."]}
              />
              <br />
              <span className="text-slate-300">In Hinglish, too.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
              Telleo phones every new enquiry in about 60 seconds, holds a natural conversation in Hindi, English or
              Hinglish, captures the answers you need, books the meeting or hands the hot lead to your team, and writes
              the outcome into your CRM.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={bookHref()} className="btn btn-primary btn-lg" data-track="book_demo">
                Book a demo <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={`tel:${TEST_LINE}`} className="btn btn-ghost-dark btn-lg" data-track="call_test_line">
                <PhoneCall className="h-4 w-4 text-brand" /> Talk to our AI: {TEST_LINE_DISPLAY}
              </a>
            </div>
            <div className="mt-6 max-w-md">
              <SamplePlayer />
            </div>
            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400">
              {["Telephony included", "No code", "Pay per minute", "Every call transcribed"].map((t) => (
                <li key={t} className="flex items-center gap-1.5"><BadgeCheck className="h-4 w-4 text-brand" /> {t}</li>
              ))}
            </ul>
          </div>
          <HeroCallDemo />
        </div>

        <div className="wrap relative mt-16 md:mt-20">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-5">
            {STATS.map((s) => (
              <div key={s.l} className="bg-ink px-5 py-5 last:col-span-2 md:last:col-span-1">
                <dt className="sr-only">{s.l}</dt>
                <dd className="h-display text-3xl text-white">{s.v}</dd>
                <dd className="mt-1 text-sm text-slate-400">{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ───────────── Industries strip ───────────── */}
      <section className="border-b border-line bg-white">
        <div className="wrap flex flex-col gap-4 py-7 md:flex-row md:items-center">
          <p className="shrink-0 text-sm font-semibold text-slate-500">Built for teams that live on the phone</p>
          <ul className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 md:flex-wrap">
            {INDUSTRIES.map((i) => (
              <li key={i.slug} className="shrink-0">
                <Link href={`/industries/${i.slug}/`} className="chip hover:border-brand hover:text-ink">
                  <Icon name={i.icon} className="h-4 w-4 text-brand-700" /> {i.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────── The problem ───────────── */}
      <section className="wrap py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="The problem"
              title="Leads go cold in hours. Most teams call back in days."
              lede="A lead is most likely to talk to you in the first hour after they ask. By the time a busy team gets to them, they have filled three other forms, stopped picking up unknown numbers, or bought."
            />
            <ul className="mt-8 space-y-4">
              {[
                "Your callers can't dial every lead within the hour, at 9 pm, or on a Sunday.",
                "Half the day goes on unanswered calls, voicemails and wrong numbers.",
                "Answers live in notebooks and memory, not in the CRM.",
                "Nobody has time to listen to calls, so nobody knows why leads are lost.",
              ].map((t) => (
                <li key={t} className="flex gap-3 text-slate-700">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-rose-50"><XIcon className="h-3 w-3 text-rose" /></span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <figure className="rounded-[1.75rem] border border-line bg-paper p-6 md:p-8">
            <div className="grid grid-cols-2 gap-4">
              {[
                { v: "7×", l: "more likely to qualify a lead when contacted within an hour, versus an hour later" },
                { v: "60×", l: "more likely than companies that waited 24 hours or longer" },
                { v: "42 h", l: "average first response among companies that replied within 30 days" },
                { v: "23%", l: "of companies never responded to the lead at all" },
              ].map((s) => (
                <div key={s.v} className="rounded-2xl bg-white p-5 ring-1 ring-line">
                  <p className="h-display text-4xl text-brand-700 md:text-5xl">{s.v}</p>
                  <p className="mt-2 text-sm leading-snug text-slate-600">{s.l}</p>
                </div>
              ))}
            </div>
            <figcaption className="mt-5 text-xs leading-relaxed text-slate-500">
              Source: Oldroyd, McElheran &amp; Elkington,{" "}
              <a href={HBR} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-700 underline">
                “The Short Life of Online Sales Leads”
              </a>
              , Harvard Business Review, March 2011. The 42 hours and 23% come from the authors' audit of 2,241 U.S. companies; the 7× and 60× from their separate study of 1.25 million leads at 42 U.S. companies.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ───────────── How it works ───────────── */}
      <section className="border-y border-line bg-paper">
        <div className="wrap py-20 md:py-28">
          <SectionHeading
            center
            eyebrow="How it works"
            title="From a new lead to a booked meeting, without anyone dialling."
            lede="Set it up once. After that, every lead that comes in gets a call, a conversation and a next step."
          />
          <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.n} className="card relative p-6">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink text-brand"><s.I className="h-5 w-5" /></span>
                  <span className="font-mono text-sm text-slate-400">{s.n}</span>
                </div>
                <h3 className="mt-5 text-lg font-extrabold text-ink">{s.t}</h3>
                <p className="mt-2 leading-relaxed text-slate-600">{s.d}</p>
                {i < STEPS.length - 1 && <ArrowRight className="absolute -right-4 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-slate-300 lg:block" aria-hidden />}
              </li>
            ))}
          </ol>
          <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-center">
            <BuilderMock />
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight text-ink">Your script, your outcomes, your rules.</h3>
              <p className="mt-3 leading-relaxed text-slate-600">
                Every agent is built from the same few fields: what it says first, what it must find out, the outcomes it
                can choose, who it hands over to, and how long it may talk. Telleo drafts all of it from a short brief,
                scores the script against what works on real calls, and suggests fixes from last week&apos;s conversations.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/agent-builder/" className="btn btn-dark">Explore the agent builder <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/how-it-works/" className="btn btn-outline">How a call works</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Platform ───────────── */}
      <section className="wrap py-20 md:py-28">
        <SectionHeading
          eyebrow="The platform"
          title="Not just a voice bot. The whole calling desk."
          lede="Telleo is the agent, the phone lines, the CRM that acts on every outcome, and the quality team that checks every call."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p) => (
            <Link key={p.href} href={p.href} className="card card-hover group flex flex-col p-7">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700 transition group-hover:bg-brand group-hover:text-ink">
                <p.I className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-extrabold text-ink">{p.t}</h3>
              <p className="mt-2 flex-1 leading-relaxed text-slate-600">{p.d}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-brand-700">
                Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ───────────── Sounds human ───────────── */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
        <div className="wrap relative py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
            <SectionHeading
              dark
              eyebrow="Conversation quality"
              title="Tuned on real Indian phone calls, not lab demos."
              lede="Telleo grew out of admissions calling, where parents interrupt, switch languages and say “haan” mid-sentence. Every rule below exists because a real call went wrong without it."
            />
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/voices-and-languages/" className="btn btn-primary">Hear the voices <AudioLines className="h-4 w-4" /></Link>
              <a href={`tel:${TEST_LINE}`} className="btn btn-ghost-dark"><PhoneCall className="h-4 w-4 text-brand" /> Test it yourself</a>
            </div>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HUMAN.map((h) => (
              <div key={h.t} className="card-dark flex flex-col p-6">
                <h3 className="font-bold text-white">{h.t}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{h.d}</p>
                <p className="mt-4 rounded-lg bg-white/[0.05] px-3 py-2 text-[0.8rem] font-semibold text-brand-300">{h.ex}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── After the call ───────────── */}
      <section className="wrap py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading
              eyebrow="After the call"
              title="Every call ends with a next step, not a note."
              lede="When the caller hangs up, Telleo reads the whole conversation and picks the outcome from your own list, with a summary, a lead score from 1 to 10 and the answers it heard. Then your rules run."
            />
            <div className="mt-8">
              <CheckList
                items={[
                  "Hot leads assigned to a rep, or transferred live while the caller is still on the line.",
                  "Meetings booked on your booking page when a day and time were agreed.",
                  "WhatsApp and email sent only when the caller said yes, tracked for delivery and never sent twice.",
                  "Unanswered calls retried after a gap you set; “not interested” is never dialled again.",
                  "A call where nobody really spoke is marked Incomplete, never Not interested.",
                ]}
              />
            </div>
            <Link href="/automations/" className="btn btn-dark mt-8">See automations <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <OutcomeFlow />
        </div>
      </section>

      {/* ───────────── Intelligence + health ───────────── */}
      <section className="border-y border-line bg-paper">
        <div className="wrap py-20 md:py-28">
          <SectionHeading
            center
            eyebrow="See every call"
            title="Know what happened on every call. Including your team's."
            lede="Call intelligence analyses AI calls for free and your human calls for a small per-minute fee. Call health grades every AI call so problems surface on their own."
          />
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <div>
              <IntelligenceCard />
              <div className="mt-6 flex items-start gap-3">
                <BrainCircuit className="mt-1 h-5 w-5 shrink-0 text-brand-700" />
                <p className="text-slate-600">
                  <strong className="text-ink">Call intelligence.</strong> Summary, objections and whether they were
                  handled, sentiment, talk ratio, rep score against your rubric and a coaching tip, for AI and human calls,
                  in Hindi, English or Hinglish. <Link href="/call-intelligence/" className="font-semibold text-brand-700 underline underline-offset-4">More</Link>
                </p>
              </div>
            </div>
            <div>
              <HealthLog />
              <div className="mt-6 flex items-start gap-3">
                <CircleGauge className="mt-1 h-5 w-5 shrink-0 text-brand-700" />
                <p className="text-slate-600">
                  <strong className="text-ink">Call health.</strong> A green, amber or red verdict on every AI call with
                  the reason: long silences, a caller it couldn&apos;t hear, answers it missed, a voicemail, a failed
                  transfer. If something wasn&apos;t measured, it says so. <Link href="/call-quality-monitoring/" className="font-semibold text-brand-700 underline underline-offset-4">More</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Use cases ───────────── */}
      <section className="wrap py-20 md:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Use cases" title="Nine jobs Telleo does on the phone every day." />
          <Link href="/use-cases/" className="btn btn-outline shrink-0">All use cases <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((u) => (
            <Link key={u.slug} href={`/use-cases/${u.slug}/`} className="card card-hover group flex gap-4 p-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink text-brand"><Icon name={u.icon} className="h-5 w-5" /></span>
              <span>
                <span className="block font-bold text-ink group-hover:text-brand-700">{u.label}</span>
                <span className="mt-1 block text-sm leading-relaxed text-slate-600">{u.summary}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ───────────── ROI ───────────── */}
      <section className="bg-ink text-white">
        <div className="wrap py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <SectionHeading
                dark
                eyebrow="Cost calculator"
                title="What would it cost to call every lead?"
                lede="Move the sliders to match your business. Telleo is billed per minute of conversation; unanswered calls are retried, not charged."
              />
              <ul className="mt-8 space-y-3 text-slate-300">
                <li className="flex gap-3"><Timer className="mt-0.5 h-5 w-5 shrink-0 text-brand" /> Every lead called in about a minute, day or night.</li>
                <li className="flex gap-3"><UserCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" /> Your team spends its time on leads that said yes.</li>
                <li className="flex gap-3"><Repeat className="mt-0.5 h-5 w-5 shrink-0 text-brand" /> Follow-ups and retries happen without reminders.</li>
              </ul>
            </div>
            <RoiCalculator />
          </div>
        </div>
      </section>

      {/* ───────────── Compare ───────────── */}
      <section className="wrap py-20 md:py-28">
        <SectionHeading
          eyebrow="Compare"
          title="Telleo, a telecalling team, or an IVR?"
          lede="The usual answer is Telleo plus a smaller, sharper human team. Here is the honest split."
        />
        <div className="mt-10 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[46rem] text-left text-sm">
            <thead>
              <tr className="bg-paper">
                <th className="px-5 py-4 font-semibold text-slate-500" />
                <th className="px-5 py-4 text-base font-extrabold text-ink">
                  <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-brand" /> Telleo</span>
                </th>
                <th className="px-5 py-4 font-bold text-ink">Telecalling team</th>
                <th className="px-5 py-4 font-bold text-ink">IVR / robocalls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {COMPARE.map((r) => (
                <tr key={r.k}>
                  <th scope="row" className="px-5 py-4 font-semibold text-slate-700">{r.k}</th>
                  <td className="bg-brand-50/60 px-5 py-4 font-semibold text-ink">{r.a}</td>
                  <td className="px-5 py-4 text-slate-600">{r.b}</td>
                  <td className="px-5 py-4 text-slate-600">{r.c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <Link href="/compare/telleo-vs-telecallers/" className="chip hover:border-brand">Telleo vs telecallers</Link>
          <Link href="/compare/telleo-vs-ivr/" className="chip hover:border-brand">Telleo vs IVR</Link>
          <Link href="/compare/telleo-vs-ringg/" className="chip hover:border-brand">Telleo vs Ringg AI</Link>
          <Link href="/compare/telleo-vs-vomyra/" className="chip hover:border-brand">Telleo vs Vomyra</Link>
          <Link href="/compare/telleo-vs-build-your-own/" className="chip hover:border-brand">Telleo vs build your own</Link>
        </div>
      </section>

      {/* ───────────── Integrations ───────────── */}
      <section className="border-y border-line bg-paper">
        <div className="wrap py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Fits how you work"
                title="Leads in from anywhere. Outcomes out to anywhere."
                lede="Telleo brings its own phone lines and CRM, so you can start on day one without an IT project. If you already run other systems, connect them by webhook or file."
              />
              <p className="mt-6 text-sm text-slate-500">
                No native Salesforce, HubSpot or Zoho app yet. Anything that can send or receive a webhook works.
              </p>
            </div>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {INTEGRATIONS.map((x) => (
                <li key={x.t} className="rounded-2xl border border-line bg-white p-4">
                  <x.I className="h-5 w-5 text-brand-700" />
                  <p className="mt-3 text-sm font-bold text-ink">{x.t}</p>
                  <p className="text-xs text-slate-500">{x.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───────────── Trust ───────────── */}
      <section className="wrap py-20 md:py-28">
        <SectionHeading
          eyebrow="Safe to switch on"
          title="Guardrails first. Because it's calling your customers."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            { I: ShieldCheck, t: "Can't run away", d: "Daily call caps, duplicate protection, a maximum call length per agent, and no dialling without balance." },
            { I: Lock, t: "Transcripts by permission", d: "Full transcripts are visible only to roles you allow to see caller details." },
            { I: BadgeCheck, t: "DLT done with you", d: "We complete DLT registration with you and you choose the hours campaigns run. ₹5,900 a year at actuals." },
            { I: PhoneForwarded, t: "Humans stay in charge", d: "Live transfer, a handover rule for every outcome, and nothing is sent that the caller didn't agree to." },
          ].map((x) => (
            <div key={x.t} className="card p-6">
              <x.I className="h-6 w-6 text-brand-700" />
              <h3 className="mt-4 font-extrabold text-ink">{x.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{x.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-slate-500">
          We don&apos;t hold SOC 2 or ISO 27001 certification today, and we won&apos;t claim we do.{" "}
          <Link href="/security/" className="font-semibold text-brand-700 underline underline-offset-4">Read how we handle data</Link>.
        </p>
      </section>

      {/* ───────────── Pricing ───────────── */}
      <section id="pricing" className="border-t border-line bg-paper">
        <div className="wrap py-20 md:py-28">
          <SectionHeading
            center
            eyebrow="Pricing"
            title="Simple per-minute pricing. Phone lines included."
            lede="No seat licences, no setup project. Pay for the minutes your agents talk."
          />
          <div className="mt-14"><PricingCards /></div>
          <p className="mt-8 text-center">
            <Link href="/pricing/" className="inline-flex items-center gap-1 font-bold text-brand-700">Full pricing, examples and FAQ <ArrowRight className="h-4 w-4" /></Link>
          </p>
        </div>
      </section>

      {/* ───────────── FAQ + resources ───────────── */}
      <section className="wrap py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading eyebrow="FAQ" title="Questions buyers ask us first." />
            <p className="mt-4 text-slate-600">
              More in the <Link href="/faq/" className="font-semibold text-brand-700 underline underline-offset-4">full FAQ</Link>.
            </p>
            {posts.length > 0 && (
              <div className="mt-10 rounded-2xl border border-line p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">From the blog</p>
                <ul className="mt-4 space-y-3">
                  {posts.map((p) => (
                    <li key={p.slug}>
                      <Link href={postPath(p.slug)} className="group flex items-start gap-2 font-semibold text-ink hover:text-brand-700">
                        <Sparkles className="mt-1 h-4 w-4 shrink-0 text-brand-700" /> {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href="/blog/" className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-700">All guides <ArrowRight className="h-4 w-4" /></Link>
              </div>
            )}
          </div>
          <FaqList faqs={FAQS} />
        </div>
      </section>

      {/* ───────────── Demo ───────────── */}
      <section id="demo" className="relative overflow-hidden bg-ink text-white">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
        <div className="glow-brand pointer-events-none absolute -right-40 top-0 h-[36rem] w-[36rem] opacity-60" />
        <div className="wrap relative grid gap-12 py-20 md:py-28 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow eyebrow-dark">Book a demo</p>
            <h2 className="h-section mt-3 text-white">Hear your own script on a real phone call.</h2>
            <p className="mt-4 max-w-lg text-lg text-slate-300">
              In 20 minutes we&apos;ll build a first agent around your use case, call your phone with it, and show you the
              outcome, the recording and the dashboard.
            </p>
            <ul className="mt-8 space-y-3">
              {["A live call in Hindi, English or Hinglish", "Your questions, outcomes and handover rules", "A clear price for your volume"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-slate-200"><Check /> {t}</li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-slate-400">
              Can&apos;t wait? Call <a href={`tel:${TEST_LINE}`} className="font-semibold text-brand-300 underline underline-offset-4">{TEST_LINE_DISPLAY}</a> and talk to one of our agents now.
            </p>
          </div>
          <div className="rounded-[1.75rem] bg-white p-6 text-ink shadow-2xl md:p-8">
            <p className="text-lg font-extrabold">Tell us about your calls</p>
            <p className="mt-1 text-sm text-slate-500">We reply within one working day.</p>
            <div className="mt-6"><DemoForm source="home" /></div>
          </div>
        </div>
      </section>
    </main>
  );
}
