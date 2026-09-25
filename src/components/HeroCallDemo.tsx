"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarCheck, CheckCircle2, MessageCircle, PhoneCall, UserCheck, Clock3, Sparkles } from "lucide-react";
import { LogoMark } from "./Logo";

type Line = { who: "agent" | "caller"; text: string; en?: string; capture?: number };
type Scenario = {
  key: string;
  tab: string;
  agent: string;
  org: string;
  direction: string;
  lines: Line[];
  captures: { label: string; value: string | ((d: Date) => string) }[];
  disposition: string;
  score: number;
  actions: { icon: "cal" | "wa" | "user" | "clock"; text: string | ((d: Date) => string) }[];
};

const tomorrowAt = (d: Date, h: number) => {
  const t = new Date(d);
  t.setDate(t.getDate() + 1);
  t.setHours(h, 0, 0, 0);
  return t.toLocaleString("en-IN", { weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });
};

const SCENARIOS: Scenario[] = [
  {
    key: "admissions",
    tab: "Admissions · Hinglish",
    agent: "Priya",
    org: "Sunrise Academy",
    direction: "Outbound · new enquiry, called in 58 s",
    lines: [
      { who: "agent", text: "नमस्ते, मैं Sunrise Academy से Priya बोल रही हूँ। आपने JEE coaching की enquiry की थी, दो मिनट बात हो सकती है?", en: "Hello, this is Priya from Sunrise Academy. You enquired about JEE coaching. Do you have two minutes?" },
      { who: "caller", text: "हाँ, बोलिए।", en: "Yes, go ahead." },
      { who: "agent", text: "धन्यवाद Rahul जी। बेटा अभी किस class में है?", en: "Thank you, Rahul ji. Which class is your son in?" },
      { who: "caller", text: "Eleventh में है, CBSE.", en: "Eleventh, CBSE.", capture: 0 },
      { who: "agent", text: "आपके लिए weekend batch ठीक रहेगा या weekday evening?", en: "Would a weekend batch suit you, or weekday evenings?" },
      { who: "caller", text: "Weekend बेहतर रहेगा।", en: "Weekend is better.", capture: 1 },
      { who: "agent", text: "शनिवार सुबह 11 बजे free demo class है। आपके लिए book कर दूँ?", en: "There's a free demo class on Saturday at 11. Shall I book it for you?" },
      { who: "caller", text: "हाँ, कर दीजिए।", en: "Yes, please.", capture: 2 },
      { who: "agent", text: "शनिवार, 11 बजे, demo book हो गया। Details WhatsApp पर भेज रही हूँ।", en: "Saturday, 11 am, booked. I'm sending the details on WhatsApp." },
    ],
    captures: [
      { label: "Class", value: "11th · CBSE" },
      { label: "Batch", value: "Weekend" },
      { label: "Demo class", value: "Sat, 11:00 am" },
    ],
    disposition: "Demo_Booked",
    score: 8,
    actions: [
      { icon: "cal", text: "Demo booked on the counselling calendar" },
      { icon: "wa", text: "WhatsApp sent: demo details + location" },
      { icon: "user", text: "Assigned to counsellor Neha" },
    ],
  },
  {
    key: "realestate",
    tab: "Real estate · English",
    agent: "Aarav",
    org: "Greenfield Realty",
    direction: "Outbound · Meta lead ad, called in 41 s",
    lines: [
      { who: "agent", text: "Hi, this is Aarav from Greenfield Realty. You asked about our 2 BHK homes in Wakad. Is this a good time?" },
      { who: "caller", text: "Yes, go ahead." },
      { who: "agent", text: "Great. Is the home for your family, or is it an investment?" },
      { who: "caller", text: "For us. We're moving next year.", capture: 0 },
      { who: "agent", text: "Got it. What budget should I keep in mind?" },
      { who: "caller", text: "Around eighty-five lakhs.", capture: 1 },
      { who: "agent", text: "Two of our towers fit that. Would a site visit this Sunday morning work for you?" },
      { who: "caller", text: "Sunday at ten works.", capture: 2 },
      { who: "agent", text: "Done, Sunday at 10 am. I'll send the location on WhatsApp right away." },
    ],
    captures: [
      { label: "Purpose · move-in", value: "Self-use · next year" },
      { label: "Budget", value: "₹85 lakh" },
      { label: "Site visit", value: "Sun, 10:00 am" },
    ],
    disposition: "Site_Visit_Booked",
    score: 9,
    actions: [
      { icon: "cal", text: "Site visit booked for Sunday 10 am" },
      { icon: "wa", text: "WhatsApp sent: project location" },
      { icon: "user", text: "Hot lead routed to sales: Kunal" },
    ],
  },
  {
    key: "emi",
    tab: "EMI reminder · Hindi",
    agent: "Kavya",
    org: "Lakshmi Finance",
    direction: "Outbound · scheduled reminder",
    lines: [
      { who: "agent", text: "नमस्ते Sharma जी, Lakshmi Finance से Kavya बोल रही हूँ। आपकी EMI की due date 5 तारीख है, बस याद दिलाने के लिए call किया।", en: "Hello Sharma ji, Kavya from Lakshmi Finance. Your EMI is due on the 5th; just a reminder." },
      { who: "caller", text: "हाँ पता है, salary आते ही कर दूँगा।", en: "Yes, I know. I'll pay as soon as my salary comes in.", capture: 0 },
      { who: "agent", text: "जी बिल्कुल। Payment link WhatsApp पर भेज दूँ, ताकि आसानी रहे?", en: "Of course. Shall I send the payment link on WhatsApp to make it easy?" },
      { who: "caller", text: "हाँ भेज दो। और कल शाम एक बार call कर लेना।", en: "Yes, send it. And call me once tomorrow evening.", capture: 1 },
      { who: "agent", text: "ठीक है, कल शाम call के लिए note कर लिया है। Link अभी भेज रही हूँ। और कुछ मदद चाहिए?", en: "Okay, I've noted tomorrow evening for a call. Sending the link now. Anything else I can help with?" },
      { who: "caller", text: "नहीं, बस इतना ही। धन्यवाद।", en: "No, that's all. Thanks.", capture: 2 },
    ],
    captures: [
      { label: "Will pay", value: "After salary" },
      { label: "Callback · \"कल शाम\"", value: (d) => tomorrowAt(d, 18) },
      { label: "Payment link", value: "Accepted" },
    ],
    disposition: "Promise_To_Pay",
    score: 7,
    actions: [
      { icon: "wa", text: "WhatsApp sent: payment link template" },
      { icon: "clock", text: (d) => `Callback time saved for the team: ${tomorrowAt(d, 18)}` },
      { icon: "user", text: "No human needed; lead status updated" },
    ],
  },
];

const ACTION_ICON = {
  cal: CalendarCheck,
  wa: MessageCircle,
  user: UserCheck,
  clock: Clock3,
} as const;

const STEP_MS = 1900;

export function HeroCallDemo() {
  const [s, setS] = useState(0);
  const [step, setStep] = useState(0); // lines shown
  const [phase, setPhase] = useState<"talk" | "analyse" | "done">("talk");
  const [now, setNow] = useState<Date | null>(null);
  const [auto, setAuto] = useState(true);
  const scroller = useRef<HTMLOListElement>(null);
  const sc = SCENARIOS[s];

  useEffect(() => setNow(new Date()), []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStep(sc.lines.length);
      setPhase("done");
      return;
    }
    let t: ReturnType<typeof setTimeout>;
    if (phase === "talk") {
      if (step < sc.lines.length) t = setTimeout(() => setStep((x) => x + 1), step === 0 ? 500 : STEP_MS);
      else t = setTimeout(() => setPhase("analyse"), 900);
    } else if (phase === "analyse") {
      t = setTimeout(() => setPhase("done"), 1400);
    } else if (auto) {
      t = setTimeout(() => select((s + 1) % SCENARIOS.length, true), 6500);
    }
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, phase, s, auto]);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [step]);

  function select(i: number, keepAuto = false) {
    setS(i);
    setStep(0);
    setPhase("talk");
    if (!keepAuto) setAuto(false);
  }

  const captured = new Set(sc.lines.slice(0, step).map((l) => l.capture).filter((c): c is number => c !== undefined));
  const speaking = phase === "talk" && step > 0 ? sc.lines[step - 1].who : null;
  const secs = Math.round((step * STEP_MS) / 1000) + 3;
  const fmt = (v: string | ((d: Date) => string)) => (typeof v === "function" ? (now ? v(now) : "…") : v);

  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-brand/10 blur-2xl" aria-hidden />
      <div className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-ink-2 shadow-[0_40px_120px_-40px_rgba(20,196,124,0.45)]">
        {/* Scenario tabs */}
        <div role="tablist" aria-label="Sample calls" className="no-scrollbar flex gap-1 overflow-x-auto border-b border-white/10 bg-ink px-3 pt-3">
          {SCENARIOS.map((x, i) => (
            <button
              key={x.key}
              role="tab"
              aria-selected={i === s}
              onClick={() => select(i)}
              className={`shrink-0 rounded-t-xl px-3.5 py-2 text-xs font-semibold transition ${i === s ? "bg-ink-2 text-white" : "text-slate-400 hover:text-slate-200"}`}
            >
              {x.tab}
            </button>
          ))}
        </div>

        {/* Call header */}
        <div className="flex items-center justify-between gap-3 px-5 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative">
              <span className={`absolute inset-0 rounded-full bg-brand/40 ${speaking === "agent" ? "animate-ring" : ""}`} />
              <div className="relative grid h-10 w-10 place-items-center rounded-full bg-white/5 ring-1 ring-white/10">
                <LogoMark className="h-6 w-6" />
              </div>
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-white">
                {sc.agent} <span className="font-medium text-slate-400">· AI agent for {sc.org}</span>
              </p>
              <p className="truncate text-xs text-slate-400">{sc.direction}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <div className="flex h-6 items-center gap-[3px]" aria-hidden>
              {Array.from({ length: 7 }).map((_, i) => (
                <span
                  key={i}
                  className={`w-[3px] origin-center rounded-full ${speaking ? "animate-wave" : ""} ${speaking === "caller" ? "bg-sky" : "bg-brand"}`}
                  style={{ height: `${[10, 18, 24, 14, 22, 12, 16][i]}px`, animationDelay: `${i * 0.11}s`, transform: speaking ? undefined : "scaleY(0.3)" }}
                />
              ))}
            </div>
            <span className="rounded-full bg-rose/15 px-2 py-0.5 font-mono text-xs text-rose">
              ● {phase === "talk" ? `00:${String(Math.min(secs, 59)).padStart(2, "0")}` : "ended"}
            </span>
          </div>
        </div>

        {/* Transcript */}
        <ol ref={scroller} className="no-scrollbar h-[17.5rem] space-y-2.5 overflow-y-auto px-5 pb-4 sm:h-[19rem]" aria-live="polite">
          {sc.lines.slice(0, step).map((l, i) => (
            <li key={`${sc.key}-${i}`} className={`flex animate-rise ${l.who === "agent" ? "justify-start" : "justify-end"}`}>
              <div className={`max-w-[88%] rounded-2xl px-3.5 py-2 text-[0.88rem] leading-relaxed ${l.who === "agent" ? "rounded-tl-md bg-white/[0.07] text-slate-100" : "rounded-tr-md bg-brand text-ink"}`}>
                {l.text}
                {l.en && <span className={`mt-0.5 block text-[0.72rem] leading-snug ${l.who === "agent" ? "text-slate-400" : "text-ink/60"}`}>{l.en}</span>}
              </div>
            </li>
          ))}
          {phase === "talk" && step < sc.lines.length && step > 0 && (
            <li className={`flex ${sc.lines[step].who === "agent" ? "justify-start" : "justify-end"}`} aria-hidden>
              <span className="flex gap-1 rounded-full bg-white/[0.06] px-3 py-2">
                {[0, 1, 2].map((d) => (
                  <span key={d} className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-400" style={{ animationDelay: `${d * 0.2}s` }} />
                ))}
              </span>
            </li>
          )}
        </ol>

        {/* Captured + outcome */}
        <div className="grid border-t border-white/10 sm:grid-cols-2">
          <div className="border-b border-white/10 p-5 sm:border-b-0 sm:border-r">
            <p className="text-[0.7rem] font-bold uppercase tracking-wider text-slate-400">Captured to CRM</p>
            <ul className="mt-3 space-y-2">
              {sc.captures.map((c, i) => (
                <li key={i} className="flex items-center justify-between gap-2 text-[0.8rem]">
                  <span className="text-slate-400">{c.label}</span>
                  <span className={`flex items-center gap-1.5 text-right font-semibold transition ${captured.has(i) ? "text-white" : "text-slate-600"}`}>
                    {captured.has(i) ? fmt(c.value) : "listening…"}
                    <CheckCircle2 className={`h-3.5 w-3.5 shrink-0 ${captured.has(i) ? "text-brand" : "text-slate-700"}`} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-5">
            <p className="text-[0.7rem] font-bold uppercase tracking-wider text-slate-400">After the call</p>
            {phase === "talk" && <p className="mt-3 text-[0.8rem] text-slate-500">Outcome appears when the call ends.</p>}
            {phase === "analyse" && (
              <p className="mt-3 flex items-center gap-2 text-[0.8rem] text-brand-300">
                <Sparkles className="h-4 w-4 animate-pulse" /> Analysing the call…
              </p>
            )}
            {phase === "done" && (
              <div className="mt-3 animate-rise space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-brand/15 px-2 py-0.5 font-mono text-[0.72rem] font-semibold text-brand-300">{sc.disposition}</span>
                  <span className="rounded-md bg-white/10 px-2 py-0.5 text-[0.72rem] font-semibold text-slate-200">Lead score {sc.score}/10</span>
                </div>
                <ul className="space-y-1.5">
                  {sc.actions.map((a, i) => {
                    const I = ACTION_ICON[a.icon];
                    return (
                      <li key={i} className="flex items-start gap-2 text-[0.8rem] text-slate-200">
                        <I className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" /> {fmt(a.text)}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-slate-500">
        <PhoneCall className="h-3.5 w-3.5" /> Illustrative calls with fictional businesses. Hindi lines shown with an English gloss.
      </p>
    </div>
  );
}
