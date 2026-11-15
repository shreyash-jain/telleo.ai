"use client";

import { useEffect, useState } from "react";
import { PhoneCall } from "lucide-react";

/*
 * Motion for /try-ai-call, drawn in CSS and SVG rather than GIFs: it is instant on
 * exhibition mobile data, needs no third-party host and stays on brand. Every animation
 * stops under prefers-reduced-motion (globals.css).
 */

/** "Hello" in each demo language, in its own script. */
const GREETINGS = ["Hello!", "नमस्ते!", "வணக்கம்!", "നമസ്കാരം!", "ನಮಸ್ಕಾರ!", "నమస్కారం!", "नमस्कार!", "নমস্কার!", "નમસ્તે!"];

/** Live voice bars. `active=false` freezes them low. */
export function Waveform({ bars = 5, active = true, className = "" }: { bars?: number; active?: boolean; className?: string }) {
  const heights = [10, 18, 26, 16, 22, 12, 20, 14, 24];
  return (
    <span className={`inline-flex items-center gap-[3px] ${className}`} aria-hidden>
      {Array.from({ length: bars }, (_, i) => (
        <span
          key={i}
          className={`w-[3px] rounded-full bg-current ${active ? "animate-wave" : ""}`}
          style={{ height: active ? heights[i % heights.length] : 4, animationDelay: `${(i * 0.12) % 0.9}s` }}
        />
      ))}
    </span>
  );
}

/** Vaani: a friendly avatar with a speaking mouth, soft pulse rings and a greeting bubble. */
export function VaaniHero({ name }: { name?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setI((n) => (n + 1) % GREETINGS.length), 1600);
    return () => window.clearInterval(t);
  }, []);
  return (
    <div className="flex items-center gap-4">
      <VaaniAvatar size="lg" speaking />
      <div className="relative rounded-2xl rounded-bl-sm bg-white px-4 py-3 text-ink shadow-xl">
        <span key={i} className="greet-in block text-lg font-extrabold leading-tight">
          {GREETINGS[i]}{name ? ` ${name}` : ""}
        </span>
        <span className="mt-0.5 block text-xs font-semibold text-slate-500">I&apos;m Vaani, your AI counsellor</span>
      </div>
    </div>
  );
}

export function VaaniAvatar({ size = "md", speaking = false, ringing = false }: { size?: "md" | "lg" | "xl"; speaking?: boolean; ringing?: boolean }) {
  const px = size === "xl" ? 132 : size === "lg" ? 76 : 52;
  return (
    <span className="relative inline-flex shrink-0 items-center justify-center" style={{ width: px, height: px }}>
      {(speaking || ringing) && (
        <>
          <span className="absolute inset-0 animate-ring rounded-full border-2 border-brand/70" />
          <span className="absolute inset-0 animate-ring rounded-full border-2 border-brand/50" style={{ animationDelay: "0.8s" }} />
        </>
      )}
      <span className={`relative inline-flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-brand-300 to-brand-700 shadow-lg shadow-brand/30 ${ringing ? "" : "float-soft"}`}>
        <svg viewBox="0 0 64 64" className="h-[78%] w-[78%]" aria-hidden>
          {/* headset band */}
          <path d="M14 34a18 18 0 0 1 36 0" fill="none" stroke="#0a0f1c" strokeWidth="3.5" strokeLinecap="round" />
          {/* face */}
          <circle cx="32" cy="34" r="15" fill="#f5f7fa" />
          {/* eyes, blinking */}
          <g className="blink-soft">
            <circle cx="26.5" cy="31.5" r="2" fill="#0a0f1c" />
            <circle cx="37.5" cy="31.5" r="2" fill="#0a0f1c" />
          </g>
          {/* mouth */}
          <rect x="27" y="38" width="10" height="3" rx="1.5" fill="#0a8656" className={speaking ? "talk" : ""} />
          {/* ear cups + mic */}
          <rect x="10" y="30" width="6" height="11" rx="3" fill="#0a0f1c" />
          <rect x="48" y="30" width="6" height="11" rx="3" fill="#0a0f1c" />
          <path d="M51 40c0 6-5 9-11 9" fill="none" stroke="#0a0f1c" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="39" cy="49" r="2.5" fill="#0a0f1c" />
        </svg>
      </span>
    </span>
  );
}

/** Waiting for the call: a phone that rings and wiggles. */
export function RingingPhone() {
  return (
    <span className="relative inline-flex h-28 w-28 items-center justify-center">
      <span className="absolute inset-0 animate-ring rounded-full border-2 border-brand/70" />
      <span className="absolute inset-0 animate-ring rounded-full border-2 border-brand/50" style={{ animationDelay: "0.8s" }} />
      <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-brand text-ink shadow-xl shadow-brand/40">
        <PhoneCall className="wiggle h-9 w-9" />
      </span>
    </span>
  );
}

/** A one-shot confetti burst for the end of the call. */
export function Confetti() {
  const colors = ["#14c47c", "#6fdfab", "#f5a524", "#3b82f6", "#7c6cf2", "#ef4444"];
  const pieces = Array.from({ length: 28 }, (_, i) => {
    const angle = (i / 28) * Math.PI * 2;
    const dist = 90 + (i % 5) * 22;
    return {
      x: Math.round(Math.cos(angle) * dist),
      y: Math.round(Math.sin(angle) * dist - 40),
      r: (i * 47) % 360,
      c: colors[i % colors.length],
      d: (i % 7) * 0.03,
    };
  });
  return (
    <span className="pointer-events-none absolute left-1/2 top-10 h-0 w-0" aria-hidden>
      {pieces.map((p, i) => (
        <span
          key={i}
          className="confetti absolute block h-2.5 w-1.5 rounded-sm"
          style={{
            background: p.c,
            animationDelay: `${p.d}s`,
            ["--x" as string]: `${p.x}px`,
            ["--y" as string]: `${p.y}px`,
            ["--r" as string]: `${p.r}deg`,
          }}
        />
      ))}
    </span>
  );
}
