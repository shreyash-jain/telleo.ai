"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, PhoneCall, Play } from "lucide-react";
import { track } from "@/lib/track";
import {
  LIBRARY, SAMPLE_LANGS, VOICE_SCRIPTS, voiceClip, type SampleLang, type VoiceScript,
} from "@/content/voiceSamples";

const LANG_ORDER: SampleLang[] = ["hi", "en", "bn"];
const SCRIPT_ORDER: VoiceScript[] = ["sales", "reminder", "feedback"];
type Gender = "all" | "female" | "male";

/**
 * The voice library: every voice says the same everyday line, so they can be
 * compared by ear. "On a phone line" runs the clip through the telephone band
 * (300-3400 Hz with a presence lift), the way a call sounds.
 */
export function VoiceLibrary() {
  const [lang, setLang] = useState<SampleLang>("hi");
  const [gender, setGender] = useState<Gender>("all");
  const [script, setScript] = useState<VoiceScript>("sales");
  const [phone, setPhone] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audio = useRef<HTMLAudioElement>(null);
  const wanted = useRef<string | null>(null);
  const graph = useRef<{ ctx: AudioContext; src: MediaElementAudioSourceNode; chain: AudioNode[] } | null>(null);

  const voices = LIBRARY.filter((v) => v.langs.includes(lang) && (gender === "all" || v.gender === gender));

  // Route the audio element through the phone-band filters, or straight out.
  const route = (on: boolean) => {
    const a = audio.current;
    if (!a) return;
    if (!graph.current) {
      if (!on) return;
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      const src = ctx.createMediaElementSource(a);
      const hp = ctx.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 300;
      const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 3400;
      const pk = ctx.createBiquadFilter(); pk.type = "peaking"; pk.frequency.value = 1700; pk.gain.value = 2.5;
      graph.current = { ctx, src, chain: [hp, lp, pk] };
    }
    const g = graph.current;
    g.src.disconnect();
    g.chain.forEach((n) => n.disconnect());
    if (on) {
      g.src.connect(g.chain[0]);
      g.chain[0].connect(g.chain[1]);
      g.chain[1].connect(g.chain[2]);
      g.chain[2].connect(g.ctx.destination);
    } else {
      g.src.connect(g.ctx.destination);
    }
    if (g.ctx.state === "suspended") g.ctx.resume();
  };

  useEffect(() => { route(phone); }, [phone]); // eslint-disable-line react-hooks/exhaustive-deps

  // A different language or line stops whatever is playing.
  useEffect(() => {
    audio.current?.pause();
    setPlayingId(null);
  }, [lang, script]);

  const play = (id: string) => {
    const a = audio.current;
    if (!a) return;
    if (playingId === id) {
      a.pause();
      return;
    }
    // The old clip's pause event lands after this; the new clip's play event sets the id.
    wanted.current = id;
    a.src = voiceClip(id, lang, script);
    if (phone) route(true);
    a.play();
    track("play_voice", { voice: id, lang, script, phone });
  };

  const line = VOICE_SCRIPTS[script].text[lang];

  return (
    <div>
      <div className="flex flex-col gap-5 rounded-2xl border border-line bg-white p-4 sm:p-5 lg:flex-row lg:flex-wrap lg:items-end lg:justify-between">
        <Segmented label="Language" value={lang} onChange={setLang}
                   options={LANG_ORDER.map((l) => ({ v: l, label: SAMPLE_LANGS[l].label }))} />
        <Segmented label="Voice" value={gender} onChange={setGender}
                   options={[{ v: "all", label: "All" }, { v: "female", label: "Female" }, { v: "male", label: "Male" }]} />
        <Segmented label="What they say" value={script} onChange={setScript}
                   options={SCRIPT_ORDER.map((s) => ({ v: s, label: VOICE_SCRIPTS[s].label }))} />
        <label className="flex cursor-pointer items-center gap-3 self-start lg:self-end">
          <span className="relative inline-flex">
            <input type="checkbox" className="peer sr-only" checked={phone} onChange={(e) => setPhone(e.target.checked)} />
            <span className="h-6 w-11 rounded-full bg-mist transition peer-checked:bg-brand" />
            <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition peer-checked:translate-x-5" />
          </span>
          <span className="text-sm font-semibold text-ink"><PhoneCall className="mr-1 inline h-4 w-4 text-brand-700" />On a phone line</span>
        </label>
      </div>

      <figure className="mt-5 rounded-2xl bg-paper px-5 py-4">
        <figcaption className="text-xs font-bold uppercase tracking-wider text-slate-500">Every voice says</figcaption>
        <blockquote className="mt-1.5 leading-relaxed text-ink" lang={lang}>
          “{line.replace("{name}", "…")}”
        </blockquote>
        <p className="mt-1.5 text-xs text-slate-500">…with its own name. Showing {voices.length} of {LIBRARY.length} voices.</p>
      </figure>

      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {voices.map((v) => {
          const on = playingId === v.id;
          return (
            <li key={v.id}>
              <button
                type="button"
                onClick={() => play(v.id)}
                aria-label={`${on ? "Pause" : "Play"} ${v.name}, ${v.gender} voice`}
                className={`card card-hover flex w-full items-center gap-3 p-3 text-left sm:p-4 ${on ? "border-brand ring-1 ring-brand" : ""}`}
              >
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full transition ${on ? "bg-brand text-ink" : "bg-ink text-white"}`}>
                  {on ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 translate-x-[1px]" />}
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-bold text-ink">{v.name}</span>
                  <span className="block text-xs text-slate-500">
                    {v.gender === "female" ? "Female" : "Male"} · {v.langs.map((l) => SAMPLE_LANGS[l].short).join(" ")}
                  </span>
                </span>
                {on && (
                  <span className="ml-auto hidden items-end gap-0.5 sm:flex" aria-hidden>
                    {[8, 14, 10, 16, 9].map((h, i) => (
                      <span key={i} className="w-1 animate-wave rounded-full bg-brand" style={{ height: h, animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
      <audio
        ref={audio}
        preload="none"
        onPlay={() => setPlayingId(wanted.current)}
        onEnded={() => setPlayingId(null)}
        onPause={() => setPlayingId(null)}
      />
    </div>
  );
}

function Segmented<T extends string>({
  label, value, onChange, options,
}: { label: string; value: T; onChange: (v: T) => void; options: { v: T; label: string }[] }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p>
      <div role="radiogroup" aria-label={label} className="mt-2 inline-flex flex-wrap rounded-full border border-line bg-paper p-1">
        {options.map((o) => (
          <button
            key={o.v}
            role="radio"
            aria-checked={o.v === value}
            type="button"
            onClick={() => onChange(o.v)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${o.v === value ? "bg-ink text-white" : "text-slate-600 hover:text-ink"}`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
