"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Copy, Languages, Loader2, PhoneCall, PhoneOff, Sparkles } from "lucide-react";
import { DIAL_DISPLAY, DIAL_NUMBER, fetchDemoStatus, LANGUAGES, submitDemoLead, type DemoStatus } from "@/lib/aiDemoCall";
import { track } from "@/lib/track";

const DRAFT_KEY = "telleo_try_ai_call";
const POLL_MS = 3000;
const POLL_MAX_MS = 25 * 60 * 1000;
const TEL = `tel:${DIAL_NUMBER.replace(/[^+\d]/g, "")}`;

const field =
  "w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-base text-white placeholder:text-slate-500 outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/20";

interface Draft {
  name: string;
  organisation: string;
  phone: string;
  language: string;
}

function loadDraft(): Draft {
  try {
    return { name: "", organisation: "", phone: "", language: "", ...JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}") };
  } catch {
    return { name: "", organisation: "", phone: "", language: "" };
  }
}

function saveDraft(d: Draft) {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(d));
  } catch {
    /* private mode: the form just starts empty next time */
  }
}

const tenDigits = (p: string) => {
  const d = p.replace(/\D/g, "");
  const t = d.length === 12 && d.startsWith("91") ? d.slice(2) : d.length === 11 && d.startsWith("0") ? d.slice(1) : d;
  return /^[6-9]\d{9}$/.test(t) ? t : null;
};

export function TryAiCall() {
  const [draft, setDraft] = useState<Draft>({ name: "", organisation: "", phone: "", language: "" });
  const [step, setStep] = useState<"form" | "call">("form");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [requestId, setRequestId] = useState<string | null>(null);
  const [offline, setOffline] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [status, setStatus] = useState<DemoStatus | null>(null);

  useEffect(() => {
    setDraft(loadDraft());
  }, []);

  // Poll the call status while the visitor is on the call screen.
  useEffect(() => {
    if (step !== "call" || !requestId) return;
    const started = Date.now();
    let stop = false;
    const tick = async () => {
      if (stop) return;
      const s = await fetchDemoStatus(requestId);
      if (s) setStatus(s);
      if (s === "ENDED" || s === "EXPIRED" || Date.now() - started > POLL_MAX_MS) return;
      timer = window.setTimeout(tick, POLL_MS);
    };
    let timer = window.setTimeout(tick, POLL_MS);
    return () => {
      stop = true;
      window.clearTimeout(timer);
    };
  }, [step, requestId]);

  useEffect(() => {
    if (status === "CONNECTED") track("try_ai_call_connected", { language: draft.language });
    if (status === "ENDED") track("try_ai_call_ended", { language: draft.language });
  }, [status, draft.language]);

  const update = (k: keyof Draft, v: string) => setDraft((d) => ({ ...d, [k]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const phone = tenDigits(draft.phone);
    if (draft.name.trim().length < 2) return setError("Please enter your name.");
    if (draft.organisation.trim().length < 2) return setError("Please enter your institute or organisation name.");
    if (!phone) return setError("Please enter a valid 10-digit mobile number.");
    if (!draft.language) return setError("Please choose a language.");
    setError("");
    setSending(true);
    saveDraft(draft);
    const label = LANGUAGES.find((l) => l.code === draft.language)?.label || draft.language;
    const res = await submitDemoLead({ name: draft.name.trim(), organisation: draft.organisation.trim(), phone, language: label });
    setSending(false);
    if (!res.ok && res.error !== "network") return setError(res.error);
    const leadId = res.ok ? res.leadId : null;
    setRequestId(leadId);
    setStatus(leadId ? "PENDING" : null);
    setRepeat(res.ok && !leadId);
    setOffline(!res.ok);
    setStep("call");
    track("try_ai_call_request", { language: draft.language, saved: res.ok, repeat: res.ok && !leadId });
    // Open the dialer straight away; the big button stays for phones that block this.
    window.location.href = TEL;
  }

  const lang = LANGUAGES.find((l) => l.code === draft.language);

  if (step === "call") {
    return (
      <CallScreen
        org={draft.organisation.trim()}
        phone={tenDigits(draft.phone) || draft.phone}
        language={lang ? `${lang.nativeLabel}${lang.nativeLabel !== lang.label ? ` · ${lang.label}` : ""}` : ""}
        status={status}
        offline={offline}
        repeat={repeat}
        onBack={() => {
          setStep("form");
          setStatus(null);
          setRequestId(null);
        }}
      />
    );
  }

  return (
    <div className="animate-rise">
      <p className="eyebrow eyebrow-dark">Live demo</p>
      <h1 className="h-display mt-3 text-[2.1rem] leading-tight md:text-5xl">Hear your AI admission counsellor, live.</h1>
      <p className="mt-4 text-lg leading-relaxed text-slate-300">
        Tell us your institute&apos;s name, pick a language and call. Our AI answers as <span className="text-white">your</span> admission counsellor.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4" noValidate>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-slate-300">Your name</span>
            <input className={field} value={draft.name} onChange={(e) => update("name", e.target.value)} autoComplete="name" maxLength={80} placeholder="Anil Kumar" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-slate-300">Institute / organisation name</span>
            <input className={field} value={draft.organisation} onChange={(e) => update("organisation", e.target.value)} autoComplete="organization" maxLength={120} placeholder="Sunrise Public School" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-slate-300">Your mobile number</span>
            <div className="flex gap-2">
              <span className="flex items-center rounded-xl border border-white/10 bg-white/[0.04] px-3.5 text-slate-300">+91</span>
              <input className={field} value={draft.phone} onChange={(e) => update("phone", e.target.value)} inputMode="tel" autoComplete="tel-national" maxLength={14} placeholder="98765 43210" />
            </div>
            <span className="mt-1.5 block text-xs text-slate-500">Call from this number, so the AI knows it&apos;s you.</span>
          </label>

          <fieldset>
            <legend className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-300">
              <Languages className="h-4 w-4 text-brand" /> Language
            </legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {LANGUAGES.map((l) => {
                const on = draft.language === l.code;
                return (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => update("language", l.code)}
                    aria-pressed={on}
                    className={`rounded-xl border px-3 py-3 text-left transition ${on ? "border-brand bg-brand/15 ring-2 ring-brand/40" : "border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"}`}
                  >
                    <span className="block text-base font-bold leading-tight">{l.nativeLabel}</span>
                    {l.nativeLabel !== l.label && <span className="block text-xs text-slate-400">{l.label}</span>}
                  </button>
                );
              })}
            </div>
          </fieldset>

          {error && <p className="rounded-xl bg-rose/15 px-4 py-3 text-sm text-rose-50">{error}</p>}

          <button
            type="submit"
            disabled={sending}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand px-6 py-4 text-lg font-extrabold text-ink shadow-lg shadow-brand/25 transition hover:bg-brand-300 disabled:opacity-70"
            data-track="try_ai_call_submit"
          >
            {sending ? <Loader2 className="h-5 w-5 animate-spin" /> : <PhoneCall className="h-5 w-5" />}
            {sending ? "Getting your counsellor ready…" : "Call now"}
          </button>
          <p className="text-center text-xs text-slate-500">A normal voice call to a Bengaluru number. Standard call charges apply.</p>
      </form>
    </div>
  );
}

function CallScreen({
  org, phone, language, status, offline, repeat, onBack,
}: {
  org: string;
  phone: string;
  language: string;
  status: DemoStatus | null;
  offline: boolean;
  repeat: boolean;
  onBack: () => void;
}) {
  const tel = TEL;
  const ended = status === "ENDED";
  const expired = status === "EXPIRED";

  return (
    <div className="animate-rise">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white">
        <ArrowLeft className="h-4 w-4" /> Change details
      </button>

      <StatusChip status={status} offline={offline} />

      <h1 className="h-display mt-4 text-3xl leading-tight md:text-4xl">
        {ended ? "Thanks for trying Telleo!" : status === "CONNECTED" ? "You're live. Listen in!" : `Calling ${org}'s AI counsellor`}
      </h1>
      {!ended && (
        <p className="mt-3 text-slate-300">
          {language && <>She&apos;ll speak <span className="font-semibold text-white">{language}</span> and introduce herself as {org}&apos;s admission counsellor. </>}
          Play a parent or student and ask her anything.
        </p>
      )}

      {!ended && (
        <a
          href={tel}
          className="relative mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-brand px-6 py-5 text-xl font-extrabold text-ink shadow-lg shadow-brand/30"
          data-track="try_ai_call_dial"
        >
          <span className="absolute inset-0 animate-ring rounded-2xl border-2 border-brand" />
          <PhoneCall className="h-6 w-6" /> {status === "CONNECTED" ? "Call again" : "Call now"}
        </a>
      )}

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <p className="text-sm text-slate-400">Didn&apos;t the call start? Dial this number from <span className="text-white">+91 {phone}</span>:</p>
        <NumberCard number={DIAL_DISPLAY} dial={DIAL_NUMBER} />
      </div>

      {offline && !ended && (
        <p className="mt-4 rounded-xl bg-amber/15 px-4 py-3 text-sm text-amber-50">
          We couldn&apos;t save your details just now. The AI will still answer, but in Hinglish and without your institute&apos;s name.
        </p>
      )}
      {repeat && !ended && (
        <p className="mt-4 rounded-xl bg-white/[0.06] px-4 py-3 text-sm text-slate-300">
          Welcome back! This number has tried the demo before, so the AI will use the institute and language from your first try.
        </p>
      )}
      {expired && (
        <p className="mt-4 rounded-xl bg-amber/15 px-4 py-3 text-sm text-amber-50">
          This request timed out. Tap <span className="font-semibold">Change details</span> and call again.
        </p>
      )}

      {ended && (
        <div className="mt-8 space-y-3">
          <a
            href={`/demo/?company=${encodeURIComponent(org)}`}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand px-6 py-4 text-lg font-extrabold text-ink"
            data-track="try_ai_call_book"
          >
            <Sparkles className="h-5 w-5" /> Get this for {org} <ArrowRight className="h-5 w-5" />
          </a>
          <button onClick={onBack} className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 px-6 py-4 font-bold hover:bg-white/[0.06]">
            <Languages className="h-5 w-5" /> Try another language
          </button>
        </div>
      )}
    </div>
  );
}

function StatusChip({ status, offline }: { status: DemoStatus | null; offline: boolean }) {
  if (offline || !status) return null;
  const map: Record<DemoStatus, { text: string; cls: string; icon: React.ReactNode }> = {
    PENDING: { text: "Waiting for your call…", cls: "bg-white/10 text-slate-200", icon: <Loader2 className="h-3.5 w-3.5 animate-spin" /> },
    CONNECTED: { text: "Connected", cls: "bg-brand/20 text-brand-200", icon: <span className="h-2 w-2 animate-pulse rounded-full bg-brand" /> },
    ENDED: { text: "Call ended", cls: "bg-white/10 text-slate-300", icon: <PhoneOff className="h-3.5 w-3.5" /> },
    EXPIRED: { text: "Timed out", cls: "bg-amber/20 text-amber-50", icon: <PhoneOff className="h-3.5 w-3.5" /> },
  };
  const s = map[status];
  return (
    <span className={`mt-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${s.cls}`}>
      {s.icon} {s.text}
    </span>
  );
}

function NumberCard({ number, dial }: { number: string; dial: string }) {
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  async function copy() {
    const plain = dial.replace(/[^+\d]/g, "");
    try {
      await navigator.clipboard.writeText(plain);
      setCopied(true);
    } catch {
      // No clipboard API (older iOS, http): select the number so the visitor can copy it.
      const el = ref.current;
      if (el) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    }
    track("try_ai_call_copy");
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mt-3 flex items-center justify-between gap-3">
      <span ref={ref} className="select-all font-mono text-2xl font-bold tracking-wide md:text-3xl">{number}</span>
      <button
        type="button"
        onClick={copy}
        className="flex shrink-0 items-center gap-1.5 rounded-xl border border-white/15 px-3.5 py-2.5 text-sm font-bold hover:bg-white/[0.08]"
        data-track="try_ai_call_copy_btn"
      >
        {copied ? <Check className="h-4 w-4 text-brand" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
