"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { track } from "@/lib/track";

/** Cycles through phrases in the hero headline. */
export function RotatingWords({ words, className = "" }: { words: string[]; className?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((x) => (x + 1) % words.length), 2600);
    return () => clearInterval(t);
  }, [words.length]);
  return (
    <span className={`relative inline-grid ${className}`}>
      {/* Invisible longest phrase reserves the width so the line never reflows. */}
      {words.map((w, k) => (
        <span
          key={w}
          aria-hidden={k !== i}
          className={`col-start-1 row-start-1 transition-all duration-500 ${k === i ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
        >
          {w}
        </span>
      ))}
    </span>
  );
}

const SAMPLE_SRC = "/audio/telleo-sample-call-admissions-2.mp3";

/** Compact player for the real recorded call. */
export function SamplePlayer({ dark = true }: { dark?: boolean }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [d, setD] = useState(313);

  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (a.paused) {
      a.play();
      track("play_sample");
    } else a.pause();
  };
  const mmss = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  return (
    <div className={`flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4 ${dark ? "bg-white/[0.06] ring-1 ring-white/10" : "bg-white ring-1 ring-line"}`}>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause the sample call" : "Play the sample call"}
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-ink transition hover:bg-brand-300"
      >
        {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 translate-x-[1px]" />}
      </button>
      <div className="min-w-0 flex-1">
        <p className={`truncate text-sm font-semibold ${dark ? "text-white" : "text-ink"}`}>Hear a real AI admissions call</p>
        <div className="mt-1 flex items-center gap-2">
          <span className={`relative h-1 flex-1 overflow-hidden rounded-full ${dark ? "bg-white/15" : "bg-mist"}`}>
            <span className="absolute inset-y-0 left-0 rounded-full bg-brand" style={{ width: `${(t / d) * 100}%` }} />
          </span>
          <span className={`font-mono text-[0.7rem] ${dark ? "text-slate-400" : "text-slate-500"}`}>{mmss(playing || t ? t : d)}</span>
        </div>
      </div>
      <audio
        ref={ref}
        src={SAMPLE_SRC}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => { setPlaying(false); setT(0); }}
        onTimeUpdate={(e) => setT(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => Number.isFinite(e.currentTarget.duration) && setD(e.currentTarget.duration)}
      />
    </div>
  );
}
