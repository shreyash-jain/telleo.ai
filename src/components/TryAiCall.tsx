"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft, ArrowRight, Check, Copy, Languages, Loader2, PhoneCall, PhoneOff, Sparkles,
} from "lucide-react";
import { DIAL_DISPLAY, DIAL_NUMBER, fetchDemoStatus, LANGUAGES, submitDemoLead, type DemoStatus } from "@/lib/aiDemoCall";
import { track } from "@/lib/track";
import { Confetti, RingingPhone, VaaniAvatar, VaaniHero, Waveform } from "./TryAiCallVisuals";

/*
 * One question per screen, for a phone held in one hand at an exhibition stall: big type,
 * big targets, the Next button right under the field (so the keyboard never hides it),
 * Enter to advance, swipe right to go back, and answers kept for "try another language".
 *
 * No phone number is asked. The backend links the next inbound call to the oldest form
 * waiting from the last few minutes, so the page dials the moment the form is saved.
 */

const DRAFT_KEY = "telleo_try_ai_call";
const POLL_MS = 3000;
const POLL_MAX_MS = 25 * 60 * 1000;
const TEL = `tel:${DIAL_NUMBER.replace(/[^+\d]/g, "")}`;

type Step = "name" | "org" | "language" | "call";
const QUESTIONS = ["name", "org", "language"] as const;

interface Draft {
  name: string;
  organisation: string;
  language: string;
}

const EMPTY: Draft = { name: "", organisation: "", language: "" };

function loadDraft(): Draft {
  try {
    const d = JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}");
    return { name: d.name || "", organisation: d.organisation || "", language: d.language || "" };
  } catch {
    return EMPTY;
  }
}

function saveDraft(d: Draft) {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(d));
  } catch {
    /* private mode: the form just starts empty next time */
  }
}

export function TryAiCall() {
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [step, setStep] = useState<Step>("name");
  const [dir, setDir] = useState<1 | -1>(1);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [offline, setOffline] = useState(false);
  const [status, setStatus] = useState<DemoStatus | null>(null);
  const touchX = useRef<number | null>(null);

  useEffect(() => setDraft(loadDraft()), []);

  // Poll the call status while the visitor is on the call screen.
  useEffect(() => {
    if (step !== "call" || !leadId) return;
    const started = Date.now();
    let stop = false;
    let timer = 0;
    const tick = async () => {
      if (stop) return;
      const s = await fetchDemoStatus(leadId);
      if (s) setStatus(s);
      if (s === "ENDED" || s === "EXPIRED" || Date.now() - started > POLL_MAX_MS) return;
      timer = window.setTimeout(tick, POLL_MS);
    };
    timer = window.setTimeout(tick, POLL_MS);
    return () => {
      stop = true;
      window.clearTimeout(timer);
    };
  }, [step, leadId]);

  useEffect(() => {
    if (status === "CONNECTED") track("try_ai_call_connected", { language: draft.language });
    if (status === "ENDED") track("try_ai_call_ended", { language: draft.language });
  }, [status, draft.language]);

  const update = (k: keyof Draft, v: string) => {
    setError("");
    setDraft((d) => ({ ...d, [k]: v }));
  };

  const index = QUESTIONS.indexOf(step as (typeof QUESTIONS)[number]);

  function go(to: Step, d: 1 | -1) {
    setDir(d);
    setError("");
    setStep(to);
  }

  function next() {
    if (step === "name" && draft.name.trim().length < 2) return setError("Please tell us your name.");
    if (step === "org" && draft.organisation.trim().length < 2) return setError("Please enter your institute's name.");
    if (index >= 0 && index < QUESTIONS.length - 1) go(QUESTIONS[index + 1], 1);
  }

  function back() {
    if (index > 0) go(QUESTIONS[index - 1], -1);
  }

  async function submit(language: string) {
    if (sending) return;
    if (draft.name.trim().length < 2) return go("name", -1);
    if (draft.organisation.trim().length < 2) return go("org", -1);
    setSending(true);
    const d = { ...draft, language };
    saveDraft(d);
    const label = LANGUAGES.find((l) => l.code === language)?.label || language;
    const res = await submitDemoLead({ name: d.name.trim(), organisation: d.organisation.trim(), language: label });
    setSending(false);
    if (!res.ok && res.error !== "network") return setError(res.error);
    const id = res.ok ? res.leadId : null;
    setLeadId(id);
    setStatus(id ? "PENDING" : null);
    setOffline(!res.ok);
    go("call", 1);
    track("try_ai_call_request", { language, saved: res.ok });
    // Dial at once: the form waits only a few minutes for its call.
    window.location.href = TEL;
  }

  function pickLanguage(code: string) {
    update("language", code);
    // Tapping a language is the answer: no extra Next tap.
    window.setTimeout(() => submit(code), 180);
  }

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (dx > 70 && step !== "call") back();
  };

  const lang = LANGUAGES.find((l) => l.code === draft.language);
  const firstName = draft.name.trim().split(/\s+/)[0] || "";
  const org = draft.organisation.trim();

  return (
    <div className="flex min-h-[calc(100svh-7rem)] flex-col" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      {step !== "call" && (
        <header className="mb-7">
          <p className="eyebrow eyebrow-dark">Live demo · AI admission counsellor</p>
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={back}
              aria-label="Back"
              className={`-ml-2 rounded-full p-2 text-slate-300 transition hover:bg-white/10 ${index > 0 ? "" : "invisible"}`}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex flex-1 gap-1.5" aria-label={`Step ${index + 1} of ${QUESTIONS.length}`}>
              {QUESTIONS.map((q, i) => (
                <span key={q} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i <= index ? "bg-brand" : "bg-white/15"}`} />
              ))}
            </div>
            <span className="w-8 text-right text-xs tabular-nums text-slate-400">{index + 1}/{QUESTIONS.length}</span>
          </div>
        </header>
      )}

      <div key={step} className={dir === 1 ? "slide-in-right" : "slide-in-left"}>
        {step === "name" && (
          <Question
            visual={<VaaniHero name={firstName} />}
            title="Hear your own AI admission counsellor, live."
            hint="First, what should she call you?"
          >
            <BigInput value={draft.name} onChange={(v) => update("name", v)} onEnter={next} placeholder="Your name" autoComplete="name" maxLength={80} />
          </Question>
        )}

        {step === "org" && (
          <Question
            visual={<VaaniAvatar size="md" />}
            title={firstName ? `Hi ${firstName}! Which institute is this for?` : "Which institute is this for?"}
            hint="She'll pick up as this institute's admission counsellor."
          >
            <BigInput value={draft.organisation} onChange={(v) => update("organisation", v)} onEnter={next} placeholder="e.g. Sunrise Public School" autoComplete="organization" maxLength={120} />
          </Question>
        )}

        {step === "language" && (
          <Question visual={<VaaniAvatar size="md" speaking />} title="Which language should she speak?" hint="Tap one and your phone will dial.">
            <div className="grid grid-cols-2 gap-2.5">
              {LANGUAGES.map((l) => {
                const on = draft.language === l.code;
                return (
                  <button
                    key={l.code}
                    type="button"
                    disabled={sending}
                    onClick={() => pickLanguage(l.code)}
                    aria-pressed={on}
                    className={`relative min-h-[4.25rem] rounded-2xl border px-4 py-3 text-left transition active:scale-[0.97] disabled:opacity-60 ${on ? "border-brand bg-brand/15 ring-2 ring-brand/40" : "border-white/10 bg-white/[0.05] hover:bg-white/[0.09]"}`}
                  >
                    <span className="block text-lg font-bold leading-tight">{l.nativeLabel}</span>
                    {l.nativeLabel !== l.label && <span className="block text-xs text-slate-400">{l.label}</span>}
                    {on && <Waveform bars={4} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand" />}
                  </button>
                );
              })}
            </div>
            {sending && (
              <p className="mt-4 flex items-center gap-2 text-sm text-slate-300">
                <Loader2 className="h-4 w-4 animate-spin" /> Getting your counsellor ready…
              </p>
            )}
          </Question>
        )}

        {step === "call" && (
          <CallScreen
            org={org}
            language={lang ? `${lang.nativeLabel}${lang.nativeLabel !== lang.label ? ` · ${lang.label}` : ""}` : ""}
            status={status}
            offline={offline}
            onEdit={() => go("name", -1)}
            onAnotherLanguage={() => go("language", -1)}
          />
        )}
      </div>

      {error && step !== "call" && (
        <p role="alert" className="mt-4 rounded-xl bg-rose/15 px-4 py-3 text-sm text-rose-50">{error}</p>
      )}

      {(step === "name" || step === "org") && (
        <button
          onClick={next}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand px-6 py-4 text-lg font-extrabold text-ink shadow-lg shadow-brand/25 transition active:scale-[0.98]"
          data-track={`try_ai_call_next_${step}`}
        >
          Next <ArrowRight className="h-5 w-5" />
        </button>
      )}

      {step !== "call" && (
        <p className="mt-auto pt-8 text-center text-xs text-slate-500">
          A normal voice call to a Bengaluru number. Standard call charges apply.
        </p>
      )}
    </div>
  );
}

function Question({ visual, title, hint, children }: { visual: React.ReactNode; title: string; hint: string; children: React.ReactNode }) {
  return (
    <section>
      {visual}
      <h1 className="h-display mt-5 text-[1.9rem] leading-[1.15] md:text-4xl">{title}</h1>
      <p className="mt-2 text-base text-slate-400">{hint}</p>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function BigInput({
  value, onChange, onEnter, ...rest
}: {
  value: string;
  onChange: (v: string) => void;
  onEnter: () => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  const ref = useRef<HTMLInputElement>(null);
  // Focus on arrival so the keyboard is already up; the delay lets the slide finish first,
  // otherwise iOS scrolls the half-animated card.
  useEffect(() => {
    const t = window.setTimeout(() => ref.current?.focus({ preventScroll: true }), 250);
    return () => window.clearTimeout(t);
  }, []);
  return (
    <input
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onEnter();
        }
      }}
      enterKeyHint="next"
      className="w-full min-w-0 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-4 text-xl text-white placeholder:text-slate-500 outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/20"
      {...rest}
    />
  );
}

function CallScreen({
  org, language, status, offline, onEdit, onAnotherLanguage,
}: {
  org: string;
  language: string;
  status: DemoStatus | null;
  offline: boolean;
  onEdit: () => void;
  onAnotherLanguage: () => void;
}) {
  const ended = status === "ENDED";
  const live = status === "CONNECTED";
  const expired = status === "EXPIRED";

  return (
    <section className="relative flex flex-col">
      {ended && <Confetti />}
      <div className="mb-6 flex flex-col items-center gap-3 pt-2 text-center">
        {ended ? (
          <VaaniAvatar size="xl" />
        ) : live ? (
          <>
            <VaaniAvatar size="xl" speaking />
            <span className="flex items-center gap-2 text-sm font-semibold text-brand-200">
              <Waveform bars={7} className="text-brand" /> Vaani is speaking
            </span>
          </>
        ) : expired ? (
          <VaaniAvatar size="xl" />
        ) : (
          <RingingPhone />
        )}
        <StatusChip status={status} offline={offline} />
      </div>

      <h1 className="h-display mt-4 text-[2rem] leading-[1.15] md:text-4xl">
        {ended ? "Thanks for trying Telleo!" : live ? "You're live. Listen in!" : `Calling ${org}'s AI counsellor`}
      </h1>
      {!ended && !expired && (
        <p className="mt-3 text-base leading-relaxed text-slate-300">
          {language && <>She&apos;ll speak <span className="font-semibold text-white">{language}</span> and greet you as {org}&apos;s admission counsellor. </>}
          Play a parent or a student and ask her anything.
        </p>
      )}

      {!ended && !expired && (
        <a
          href={TEL}
          className="relative mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-brand px-6 py-5 text-xl font-extrabold text-ink shadow-lg shadow-brand/30 active:scale-[0.98]"
          data-track="try_ai_call_dial"
        >
          {!live && <span className="pointer-events-none absolute inset-0 animate-ring rounded-2xl border-2 border-brand" />}
          <PhoneCall className="h-6 w-6" /> {live ? "Call again" : "Call now"}
        </a>
      )}

      {!ended && !expired && (
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
          <p className="text-sm text-slate-400">Call didn&apos;t start? Dial this number now:</p>
          <NumberCard />
          <p className="mt-3 text-xs text-slate-500">Please call within the next few minutes so she knows it&apos;s you.</p>
        </div>
      )}

      {offline && !ended && (
        <p className="mt-4 rounded-xl bg-amber/15 px-4 py-3 text-sm text-amber-50">
          We couldn&apos;t save your details just now. She&apos;ll still answer, but won&apos;t know your institute.
        </p>
      )}
      {expired && (
        <div className="mt-6 rounded-2xl bg-amber/15 p-5 text-amber-50">
          <p className="font-semibold">This try timed out.</p>
          <p className="mt-1 text-sm">Pick your language again and call straight away.</p>
          <button onClick={onAnotherLanguage} className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand px-6 py-4 font-extrabold text-ink">
            <Languages className="h-5 w-5" /> Try again
          </button>
        </div>
      )}

      {ended ? (
        <div className="mt-8 space-y-3">
          <a
            href={`/demo/?company=${encodeURIComponent(org)}`}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand px-6 py-4 text-lg font-extrabold text-ink"
            data-track="try_ai_call_book"
          >
            <Sparkles className="h-5 w-5" /> Get this for {org} <ArrowRight className="h-5 w-5" />
          </a>
          <button onClick={onAnotherLanguage} className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 px-6 py-4 font-bold active:bg-white/[0.06]">
            <Languages className="h-5 w-5" /> Try another language
          </button>
        </div>
      ) : (
        !expired && (
          <div className="mt-6 flex justify-center gap-6 text-sm">
            <button onClick={onEdit} className="text-slate-400 underline-offset-4 hover:text-white hover:underline">Edit details</button>
            <button onClick={onAnotherLanguage} className="text-slate-400 underline-offset-4 hover:text-white hover:underline">Change language</button>
          </div>
        )
      )}
    </section>
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
    <span className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${s.cls}`}>
      {s.icon} {s.text}
    </span>
  );
}

function NumberCard() {
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  async function copy() {
    try {
      await navigator.clipboard.writeText(DIAL_NUMBER.replace(/[^+\d]/g, ""));
      setCopied(true);
    } catch {
      // No clipboard API (older iOS, in-app browsers): select the number so it can be copied.
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
      <span ref={ref} className="select-all font-mono text-[1.6rem] font-bold tracking-wide sm:text-3xl">{DIAL_DISPLAY}</span>
      <button
        type="button"
        onClick={copy}
        className="flex min-h-11 shrink-0 items-center gap-1.5 rounded-xl border border-white/15 px-4 text-sm font-bold active:bg-white/[0.08]"
        data-track="try_ai_call_copy_btn"
      >
        {copied ? <Check className="h-4 w-4 text-brand" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
