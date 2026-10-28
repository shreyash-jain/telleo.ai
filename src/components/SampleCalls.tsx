"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Pause, Play } from "lucide-react";
import { track } from "@/lib/track";
import { CALLS, CALL_USE_CASES, SAMPLE_LANGS, type SampleLang } from "@/content/voiceSamples";

const LANG_ORDER: SampleLang[] = ["hi", "en", "bn"];
const mmss = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/** Sample calls by use case and language, with a transcript that follows the audio. */
export function SampleCalls() {
  const [useCase, setUseCase] = useState(CALL_USE_CASES[0].slug);
  const [lang, setLang] = useState<SampleLang>("hi");
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const audio = useRef<HTMLAudioElement>(null);
  const list = useRef<HTMLOListElement>(null);

  const call = CALLS.find((c) => c.useCase === useCase && c.lang === lang)!;
  const meta = CALL_USE_CASES.find((u) => u.slug === useCase)!;
  const active = call.turns.reduce((k, turn, i) => (turn.t <= t + 0.05 ? i : k), -1);

  // A new call: stop the old one and start from the top.
  useEffect(() => {
    const a = audio.current;
    if (!a) return;
    a.pause();
    a.currentTime = 0;
    setT(0);
    setPlaying(false);
  }, [useCase, lang]);

  // Keep the spoken line in view inside the transcript, never scrolling the page.
  useEffect(() => {
    const ol = list.current;
    const li = ol?.children[active] as HTMLElement | undefined;
    if (!ol || !li || !playing) return;
    const top = li.offsetTop - ol.offsetTop;
    if (top < ol.scrollTop || top + li.offsetHeight > ol.scrollTop + ol.clientHeight) {
      ol.scrollTo({ top: Math.max(0, top - 16), behavior: "smooth" });
    }
  }, [active, playing]);

  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) {
      a.play();
      track("play_sample_call", { use_case: useCase, lang });
    } else a.pause();
  };
  const seek = (secs: number) => {
    const a = audio.current;
    if (!a) return;
    a.currentTime = secs;
    setT(secs);
    if (a.paused) {
      a.play();
      track("play_sample_call", { use_case: useCase, lang });
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Use case</p>
        <div role="tablist" aria-label="Use case" className="no-scrollbar -mx-1 mt-3 flex gap-2 overflow-x-auto px-1 lg:flex-col">
          {CALL_USE_CASES.map((u) => {
            const on = u.slug === useCase;
            return (
              <button
                key={u.slug}
                role="tab"
                aria-selected={on}
                type="button"
                onClick={() => setUseCase(u.slug)}
                className={`shrink-0 rounded-2xl border px-4 py-3 text-left transition lg:px-5 lg:py-4 ${on ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-slate-300"}`}
              >
                <span className="block font-bold">{u.title}</span>
                <span className={`mt-1 hidden text-sm leading-snug lg:block ${on ? "text-slate-300" : "text-slate-500"}`}>{u.blurb}</span>
              </button>
            );
          })}
        </div>

        <p className="mt-7 text-xs font-bold uppercase tracking-wider text-slate-500">Language</p>
        <div role="radiogroup" aria-label="Language" className="mt-3 inline-flex rounded-full border border-line bg-white p-1">
          {LANG_ORDER.map((l) => (
            <button
              key={l}
              role="radio"
              aria-checked={l === lang}
              type="button"
              onClick={() => setLang(l)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${l === lang ? "bg-brand text-ink" : "text-slate-600 hover:text-ink"}`}
            >
              {SAMPLE_LANGS[l].label}
            </button>
          ))}
        </div>
        {lang === "bn" && (
          <p className="mt-3 max-w-sm text-sm text-slate-500">
            Bengali and other regional languages are set up with you and tested on your calls before you go live.
          </p>
        )}
      </div>

      <figure className="overflow-hidden rounded-2xl bg-ink text-white shadow-[0_30px_70px_-40px_rgba(10,15,28,0.7)]">
        <figcaption className="flex items-center gap-4 border-b border-white/10 p-4 sm:p-5">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause the sample call" : "Play the sample call"}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand text-ink transition hover:bg-brand-300"
          >
            {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 translate-x-[1px]" />}
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold">{meta.title} · {SAMPLE_LANGS[lang].label}</p>
            <p className="truncate text-sm text-slate-400">AI agent: {call.agent} ({call.agentGender} voice)</p>
            <div className="mt-2 flex items-center gap-3">
              <input
                type="range"
                min={0}
                max={call.secs}
                step={0.1}
                value={Math.min(t, call.secs)}
                onChange={(e) => seek(Number(e.target.value))}
                aria-label="Seek"
                className="h-1 flex-1 cursor-pointer accent-[#14c47c]"
              />
              <span className="font-mono text-xs text-slate-400">{mmss(t)} / {mmss(call.secs)}</span>
            </div>
          </div>
        </figcaption>
        <ol ref={list} className="no-scrollbar relative max-h-[22rem] space-y-2.5 overflow-y-auto p-4 sm:p-5" lang={lang === "bn" ? "bn" : lang === "hi" ? "hi" : "en"}>
          {call.turns.map((turn, i) => (
            <li key={i} className={`flex ${turn.who === "agent" ? "justify-start" : "justify-end"}`}>
              <button
                type="button"
                onClick={() => seek(turn.t)}
                className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-left text-[0.95rem] leading-relaxed transition ${turn.who === "agent" ? "rounded-tl-md bg-white/[0.07]" : "rounded-tr-md bg-brand/15"} ${i === active ? "opacity-100 ring-1 ring-brand/60" : t > 0 ? "opacity-55 hover:opacity-90" : "opacity-90 hover:opacity-100"}`}
              >
                <span className={`mb-0.5 block text-[0.68rem] font-bold uppercase tracking-wider ${turn.who === "agent" ? "text-brand-300" : "text-slate-400"}`}>
                  {turn.who === "agent" ? "AI agent" : "Caller"}
                </span>
                {turn.text}
              </button>
            </li>
          ))}
        </ol>
        <p className="border-t border-white/10 px-4 py-3 text-xs leading-relaxed text-slate-400 sm:px-5">
          {meta.context} A sample: the business and the caller are made up, and the caller is voiced by AI too.
        </p>
        <audio
          ref={audio}
          src={call.src}
          preload="none"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => { setPlaying(false); }}
          onTimeUpdate={(e) => setT(e.currentTarget.currentTime)}
        />
      </figure>

      <div className="lg:col-span-2">
        <Link href="/voices-and-languages/#voice-library" className="inline-flex items-center gap-2 font-semibold text-brand-700 hover:text-brand-800">
          Hear all the voices in English, Hinglish and Bengali <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
