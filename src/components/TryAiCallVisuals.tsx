"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

/*
 * Visuals for /try-ai-call in the register of modern AI voice products: a glowing, morphing
 * voice orb inside a live-call card with a timer, a waveform and a transcript that types
 * itself. All CSS and React, no image files, sharp at any size. Motion stops under
 * prefers-reduced-motion (globals.css).
 */

/** Vaani's first line in each language, with the institute filled in. */
const OPENERS: Record<string, (org: string) => string> = {
  english: (o) => `Hello! Welcome to ${o} admissions. Which class are you looking at?`,
  hinglish: (o) => `नमस्ते! ${o} में आपका स्वागत है। किस class के लिए admission देख रहे हैं?`,
  hindi: (o) => `नमस्ते! ${o} में आपका स्वागत है। किस कक्षा के लिए प्रवेश देख रहे हैं?`,
  tamil: (o) => `வணக்கம்! ${o}-க்கு வரவேற்கிறோம். எந்த வகுப்பிற்கு சேர்க்கை பார்க்கிறீர்கள்?`,
  malayalam: (o) => `നമസ്കാരം! ${o}-ലേക്ക് സ്വാഗതം. ഏത് ക്ലാസിലേക്കാണ് അഡ്മിഷൻ നോക്കുന്നത്?`,
  kannada: (o) => `ನಮಸ್ಕಾರ! ${o}-ಗೆ ಸ್ವಾಗತ. ಯಾವ ತರಗತಿಗೆ ಪ್ರವೇಶ ನೋಡುತ್ತಿದ್ದೀರಿ?`,
  telugu: (o) => `నమస్కారం! ${o}-కి స్వాగతం. ఏ తరగతికి అడ్మిషన్ చూస్తున్నారు?`,
  marathi: (o) => `नमस्कार! ${o} मध्ये स्वागत आहे. कोणत्या इयत्तेसाठी प्रवेश पाहत आहात?`,
  bengali: (o) => `নমস্কার! ${o}-এ স্বাগত। কোন ক্লাসে ভর্তির কথা ভাবছেন?`,
  gujarati: (o) => `નમસ્તે! ${o} માં સ્વાગત છે. કયા ધોરણ માટે પ્રવેશ જોઈ રહ્યા છો?`,
};
const PREVIEW_ORDER = ["english", "hinglish", "tamil", "malayalam", "kannada", "telugu", "bengali", "marathi", "gujarati"];

/** The glowing voice orb. `speaking` makes it breathe faster and glow brighter. */
export function VoiceOrb({ size = 112, speaking = false, className = "" }: { size?: number; speaking?: boolean; className?: string }) {
  return (
    <span className={`relative inline-flex shrink-0 items-center justify-center ${className}`} style={{ width: size, height: size }} aria-hidden>
      <span className={`orb-glow absolute inset-[-18%] rounded-full bg-brand/35 blur-2xl ${speaking ? "orb-glow-fast" : ""}`} />
      <span className={`orb relative block h-full w-full ${speaking ? "orb-speaking" : ""}`} />
    </span>
  );
}

/** Voice bars. `active=false` lays them flat. */
export function Waveform({ bars = 5, active = true, className = "" }: { bars?: number; active?: boolean; className?: string }) {
  const heights = [10, 18, 26, 16, 22, 12, 20, 14, 24, 9, 17, 23];
  return (
    <span className={`inline-flex items-center gap-[3px] ${className}`} aria-hidden>
      {Array.from({ length: bars }, (_, i) => (
        <span
          key={i}
          className={`w-[3px] rounded-full bg-current ${active ? "animate-wave" : ""}`}
          style={{ height: active ? heights[i % heights.length] : 3, animationDelay: `${(i * 0.11) % 1}s` }}
        />
      ))}
    </span>
  );
}

/** Text that types itself word by word (word steps keep Indic letters intact). */
function Typed({ text, speed = 140, onDone }: { text: string; speed?: number; onDone?: () => void }) {
  const words = text.split(" ");
  const [n, setN] = useState(0);
  const done = useRef(onDone);
  done.current = onDone;
  useEffect(() => {
    if (n >= words.length) {
      done.current?.();
      return;
    }
    const t = window.setTimeout(() => setN((x) => x + 1), speed);
    return () => window.clearTimeout(t);
  }, [n, words.length, speed]);
  return (
    <>
      {words.slice(0, n).join(" ")}
      {n < words.length && <span className="typing-caret" />}
    </>
  );
}

function useTimer() {
  const [s, setS] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setS((x) => x + 1), 1000);
    return () => window.clearInterval(t);
  }, []);
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

/**
 * The live-call card. `preview` (step 1) cycles Vaani's opener through the languages for
 * "your institute"; `live` (connected) types the conversation in the visitor's language for
 * their institute and runs a call timer.
 */
export function LiveCallCard({
  mode, org, language = "english", compact = false,
}: {
  mode: "preview" | "live";
  org?: string;
  language?: string;
  compact?: boolean;
}) {
  const live = mode === "live";
  const timer = useTimer();
  const institute = org?.trim() || "your institute";
  const [li, setLi] = useState(0);
  const [stage, setStage] = useState(0);
  const lang = live ? language : PREVIEW_ORDER[li % PREVIEW_ORDER.length];
  const opener = (OPENERS[lang] || OPENERS.english)(institute);

  function openerDone() {
    if (live) window.setTimeout(() => setStage((s) => Math.max(s, 1)), 900);
    else window.setTimeout(() => setLi((x) => x + 1), 1800);
  }

  const bubble = "rounded-2xl px-3.5 py-2.5 text-[0.95rem] leading-snug";
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/40 backdrop-blur-md">
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-3">
        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-200">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-brand opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
          </span>
          Live
        </span>
        <span className="truncate text-xs font-semibold text-slate-300">Vaani · AI Admission Counsellor</span>
        <span className="font-mono text-xs tabular-nums text-slate-400">{timer}</span>
      </div>

      <div className={`flex flex-col items-center px-5 ${compact ? "py-5" : "py-7"}`}>
        <VoiceOrb size={compact ? 84 : 120} speaking />
        <Waveform bars={compact ? 14 : 20} className={`text-brand ${compact ? "mt-4" : "mt-5"}`} />
      </div>

      <div className={`space-y-2 px-4 pb-4 ${compact ? "min-h-[5.25rem]" : "min-h-[9rem]"}`}>
        <p className={`${bubble} rounded-tl-sm bg-white/[0.07] text-white`}>
          <Typed key={`${lang}-${institute}`} text={opener} onDone={openerDone} />
        </p>
        {live && stage >= 1 && (
          <p className={`${bubble} ml-auto w-fit max-w-[85%] rounded-tr-sm bg-brand/20 text-brand-50`}>
            <Typed text="Class 6, for my daughter." speed={110} onDone={() => window.setTimeout(() => setStage((s) => Math.max(s, 2)), 700)} />
          </p>
        )}
        {live && stage >= 2 && (
          <p className={`${bubble} rounded-tl-sm bg-white/[0.07] text-white`}>
            <Typed text="Lovely! Shall I book a campus visit for you this Saturday?" />
          </p>
        )}
      </div>
    </div>
  );
}

/** Waiting for the call: the orb, calm, with a soft connecting pulse. */
export function Connecting() {
  return (
    <span className="relative inline-flex h-40 w-40 items-center justify-center">
      <span className="absolute inset-2 rounded-full border border-brand/40 motion-safe:animate-ring" />
      <span className="absolute inset-2 rounded-full border border-brand/30 motion-safe:animate-ring" style={{ animationDelay: "1.2s" }} />
      <VoiceOrb size={104} />
    </span>
  );
}

/** Call ended: a quiet success badge. */
export function DoneBadge() {
  return (
    <span className="relative inline-flex h-24 w-24 items-center justify-center">
      <span className="absolute inset-0 rounded-full bg-brand/20 blur-xl" />
      <span className="relative flex h-20 w-20 items-center justify-center rounded-full border border-brand/40 bg-brand/15 text-brand">
        <Check className="h-10 w-10" strokeWidth={2.5} />
      </span>
    </span>
  );
}
