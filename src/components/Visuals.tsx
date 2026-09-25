import {
  ArrowRight, Bot, CalendarCheck, CircleSlash, Clock3, MessageCircle, PhoneForwarded, RefreshCw, Sparkles, UserCheck, Webhook,
} from "lucide-react";

/** After-the-call rules: disposition → action. */
export function OutcomeFlow() {
  const rows = [
    { d: "Hot_Lead / Interested", a: "Assign to a rep now", I: UserCheck, c: "text-brand-700 bg-brand-50" },
    { d: "Meeting agreed", a: "Book it on your calendar", I: CalendarCheck, c: "text-brand-700 bg-brand-50" },
    { d: "\"Send me details\"", a: "WhatsApp or email the template", I: MessageCircle, c: "text-brand-700 bg-brand-50" },
    { d: "\"Call me kal shaam\"", a: "Save the exact callback time", I: Clock3, c: "text-sky bg-sky/10" },
    { d: "No answer", a: "Retry after a gap, up to N times", I: RefreshCw, c: "text-amber bg-amber-50" },
    { d: "Not interested / wrong person", a: "Stop. Never re-dial", I: CircleSlash, c: "text-slate-600 bg-mist" },
    { d: "Any outcome", a: "Fire a webhook to your systems", I: Webhook, c: "text-violet bg-violet-50" },
  ];
  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-line bg-paper px-5 py-3">
        <p className="flex items-center gap-2 text-sm font-bold text-ink"><Sparkles className="h-4 w-4 text-brand-700" /> Outcome rules</p>
        <p className="font-mono text-xs text-slate-500">runs within a minute of hang-up</p>
      </div>
      <ul className="divide-y divide-line">
        {rows.map((r) => (
          <li key={r.a} className="grid grid-cols-[1fr_auto_1.2fr] items-center gap-3 px-5 py-3.5 text-sm">
            <span className="font-mono text-[0.8rem] text-slate-600">{r.d}</span>
            <ArrowRight className="h-4 w-4 text-slate-300" />
            <span className="flex items-center gap-2.5 font-semibold text-ink">
              <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg ${r.c}`}><r.I className="h-4 w-4" /></span>
              {r.a}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** A sample call-intelligence card. */
export function IntelligenceCard() {
  const q = [
    { k: "Rapport", v: 8 },
    { k: "Needs discovery", v: 6 },
    { k: "Objection handling", v: 5 },
    { k: "Next step secured", v: 9 },
  ];
  return (
    <div className="card overflow-hidden shadow-[0_30px_70px_-40px_rgba(10,15,28,0.45)]">
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <div>
          <p className="text-sm font-bold text-ink">Call with Anjali Verma · 6m 12s</p>
          <p className="text-xs text-slate-500">Human call · rep: Karan · Hinglish</p>
        </div>
        <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-800">Connected · positive</span>
      </div>
      <div className="space-y-4 p-5 text-sm">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Two-line update</p>
          <p className="mt-1 text-slate-700">Interested in the weekend batch; worried about fees. Next: send the instalment plan and call back Saturday.</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-paper p-3">
            <p className="text-xs text-slate-500">Objections</p>
            <p className="mt-1 font-semibold text-ink">Fees <span className="font-normal text-amber">· partly handled</span></p>
            <p className="font-semibold text-ink">Travel time <span className="font-normal text-brand-700">· handled</span></p>
          </div>
          <div className="rounded-xl bg-paper p-3">
            <p className="text-xs text-slate-500">Sentiment · talk ratio</p>
            <p className="mt-1 font-semibold text-ink">Neutral → positive</p>
            <p className="font-semibold text-ink">Rep 64% · lead 36%</p>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Rep score against your rubric</p>
          <ul className="mt-2 space-y-2">
            {q.map((x) => (
              <li key={x.k} className="grid grid-cols-[9rem_1fr_2rem] items-center gap-3">
                <span className="text-slate-600">{x.k}</span>
                <span className="h-2 overflow-hidden rounded-full bg-mist">
                  <span className={`block h-full rounded-full ${x.v >= 8 ? "bg-brand" : x.v >= 6 ? "bg-brand-300" : "bg-amber"}`} style={{ width: `${x.v * 10}%` }} />
                </span>
                <span className="text-right font-mono text-xs text-slate-500">{x.v}/10</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-brand-200 bg-brand-50 p-3">
          <p className="text-xs font-bold text-brand-800">Coaching tip</p>
          <p className="mt-0.5 text-slate-700">Ask about budget before quoting fees. The lead raised cost twice before you asked what they expected.</p>
        </div>
      </div>
    </div>
  );
}

/** The call log with per-call health verdicts. */
export function HealthLog({ dark = false }: { dark?: boolean }) {
  const rows = [
    { n: "Rahul Sharma", t: "2:41", dot: "bg-brand", h: "Healthy call", o: "Demo_Booked" },
    { n: "Meena Iyer", t: "1:12", dot: "bg-brand", h: "Healthy call", o: "Callback" },
    { n: "Unknown", t: "0:19", dot: "bg-amber", h: "Probably an answering machine", o: "Incomplete" },
    { n: "Vikram Rao", t: "3:05", dot: "bg-amber", h: "Long silence (4.1 s) mid-call", o: "Interested" },
    { n: "Sana Khan", t: "0:47", dot: "bg-rose", h: "The agent could not hear the caller", o: "Incomplete" },
    { n: "Arjun Mehta", t: "2:10", dot: "bg-brand", h: "Healthy call · transferred to rep", o: "Hot_Lead" },
  ];
  return (
    <div className={`overflow-hidden rounded-2xl ${dark ? "border border-white/10 bg-ink-2" : "card shadow-[0_30px_70px_-40px_rgba(10,15,28,0.45)]"}`}>
      <div className={`flex items-center justify-between px-5 py-3.5 ${dark ? "border-b border-white/10" : "border-b border-line bg-paper"}`}>
        <p className={`text-sm font-bold ${dark ? "text-white" : "text-ink"}`}>Call log · today</p>
        <div className={`flex items-center gap-3 text-xs ${dark ? "text-slate-400" : "text-slate-500"}`}>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-brand" /> healthy</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber" /> check</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-rose" /> problem</span>
        </div>
      </div>
      <ul className={dark ? "divide-y divide-white/5" : "divide-y divide-line"}>
        {rows.map((r) => (
          <li key={r.n + r.t} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-5 py-3 text-sm">
            <span className={`h-2.5 w-2.5 rounded-full ${r.dot}`} />
            <span className="min-w-0">
              <span className={`block truncate font-semibold ${dark ? "text-white" : "text-ink"}`}>{r.n} <span className={`font-mono text-xs font-normal ${dark ? "text-slate-500" : "text-slate-400"}`}>· {r.t}</span></span>
              <span className={`block truncate text-xs ${dark ? "text-slate-400" : "text-slate-500"}`}>{r.h}</span>
            </span>
            <span className={`rounded-md px-2 py-0.5 font-mono text-[0.7rem] ${dark ? "bg-white/5 text-slate-300" : "bg-mist text-slate-600"}`}>{r.o}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Agent-builder form mock. */
export function BuilderMock() {
  const f = (label: string, value: React.ReactNode) => (
    <div>
      <p className="text-[0.7rem] font-bold uppercase tracking-wider text-slate-400">{label}</p>
      <div className="mt-1 rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink">{value}</div>
    </div>
  );
  return (
    <div className="card overflow-hidden shadow-[0_30px_70px_-40px_rgba(10,15,28,0.45)]">
      <div className="flex items-center justify-between border-b border-line bg-paper px-5 py-3">
        <p className="flex items-center gap-2 text-sm font-bold text-ink"><Bot className="h-4 w-4 text-brand-700" /> New agent · Admissions caller</p>
        <span className="rounded-full bg-brand px-2.5 py-1 text-xs font-bold text-ink">Live</span>
      </div>
      <div className="grid gap-4 p-5 md:grid-cols-2">
        {f("Opening line", "नमस्ते {{leadName}} जी, Sunrise Academy से Priya बोल रही हूँ…")}
        {f("Voice", <span className="flex items-center justify-between">Priya · female · Hinglish <span className="text-xs font-semibold text-brand-700">▶ Preview</span></span>)}
        {f("Questions to answer", "Class · board · batch preference · budget")}
        {f("Outcomes (your list)", <span className="flex flex-wrap gap-1">{["Demo_Booked", "Callback", "Not_Interested", "Hot_Lead"].map((x) => <span key={x} className="rounded bg-mist px-1.5 py-0.5 font-mono text-[0.7rem]">{x}</span>)}</span>)}
        {f("Hand over to", <span className="flex items-center gap-1.5"><PhoneForwarded className="h-3.5 w-3.5 text-brand-700" /> Counselling desk, 2 numbers</span>)}
        {f("Max call length", "6 minutes")}
      </div>
      <div className="flex items-center gap-2 border-t border-line bg-brand-50 px-5 py-3 text-sm text-brand-800">
        <Sparkles className="h-4 w-4" /> Script drafted from your brief · 3 suggestions from last week&apos;s calls
      </div>
    </div>
  );
}
