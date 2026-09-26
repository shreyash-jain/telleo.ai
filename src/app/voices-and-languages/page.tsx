import { AudioLines, Gauge, Mic, SlidersHorizontal } from "lucide-react";
import { PageShell, FeatureRow, pageMetadata } from "@/components/PageShell";
import { SamplePlayer } from "@/components/Interactive";
import { CheckList, Transcript } from "@/components/ui";

export const metadata = pageMetadata("/voices-and-languages/");

const LANGS = [
  { l: "Hindi", s: "Live", n: "Everyday phone Hindi, written in Devanagari for the cleanest pronunciation." },
  { l: "English", s: "Live", n: "Indian English for callers who prefer it, and English-only agents." },
  { l: "Hinglish", s: "Live", n: "Hindi with English business words, the way most Indian callers actually talk." },
  { l: "Tamil · Telugu · Kannada · Malayalam", s: "On request", n: "Supported by the voice engines; set up and tested with you first." },
  { l: "Marathi · Gujarati · Bengali · Punjabi · Odia", s: "On request", n: "Supported by the voice engines; set up and tested with you first." },
];

const ENGINES = [
  { e: "Google Chirp3-HD", n: "The default for new agents. Natural Hindi voices, picked by ear." },
  { e: "Sarvam Bulbul", n: "Indian-built voices with the widest Hindi palette." },
  { e: "Smallest Lightning", n: "Standard voice set for Hindi and English." },
  { e: "Smallest Lightning Pro", n: "Pro voice set for Hindi and English." },
  { e: "Rumik", n: "Preset male and female voices; audition on your script before choosing." },
  { e: "Microsoft Edge voices", n: "A handful of Hindi and Indian-English voices." },
  { e: "Deepgram Aura-2", n: "English voices with an American accent, for English-only calls." },
];

const FAQS = [
  { q: "How many voices are there?", a: "More than 80, male and female, across seven speech engines. You can audition any of them before you choose, and the preview uses the same engine, voice and pace the call will use (the phone-line shaping is added on the live call)." },
  { q: "Can the agent switch languages mid-call?", a: "Callers often mix Hindi and English, and a Hinglish agent handles that naturally. Each agent has a main language; it stays in it rather than drifting, which keeps calls consistent." },
  { q: "Why write Hindi in Devanagari?", a: "Indian voice engines pronounce Hindi best when it is written in Devanagari, with English business words like demo, fees or booking kept in English. Romanised Hindi reads worse on the phone, so Telleo's scripts and replies follow that rule." },
  { q: "Can you clone our own voice?", a: "Not today. Choose from the voice library; we can help you pick one that fits your brand and your callers." },
  { q: "Will it pronounce our brand name correctly?", a: "Test it in the voice preview. If a name comes out wrong, we adjust how it is written in the script until it sounds right on the phone." },
  { q: "Do you support regional languages?", a: "The voice engines support Tamil, Telugu, Marathi, Bengali, Gujarati, Kannada, Malayalam, Punjabi and Odia. We set these up with you and test them on real calls before you rely on them; Hindi, English and Hinglish are the languages in production today." },
];

export default function Page() {
  return (
    <PageShell
      path="/voices-and-languages/"
      dark
      eyebrow="Voices & languages"
      h1="Speaks the Hindi your customers speak. Not the textbook kind."
      lede="Telleo agents talk in everyday phone Hindi, Indian English and Hinglish, with grammar that matches the voice, honorifics that match the caller and 80+ voices to choose from."
      visual={
        <div className="space-y-4">
          <Transcript
            title="Hinglish · female voice"
            lines={[
              { who: "agent", text: "नमस्ते Meena जी, मैं Brightpath Academy से Kavya बोल रही हूँ। आपका दो minute का time मिल सकता है?", en: "Hello Meena ji, this is Kavya from Brightpath Academy. Could I have two minutes of your time?" },
              { who: "caller", text: "हाँ बोलिए, पर जल्दी।", en: "Yes, go on, but quickly." },
              { who: "agent", text: "जी ज़रूर। बस इतना जानना था, बेटी के लिए online batch चाहिए या offline?", en: "Of course. I just wanted to know, would your daughter prefer an online or offline batch?" },
            ]}
          />
          <SamplePlayer />
        </div>
      }
      faqs={FAQS}
    >
      <section className="wrap py-20 md:py-24">
        <p className="eyebrow">Languages</p>
        <h2 className="h-section mt-3 max-w-3xl text-ink">Three languages live. Nine more on request.</h2>
        <div className="mt-10 overflow-hidden rounded-2xl border border-line">
          <table className="w-full text-left text-sm">
            <tbody className="divide-y divide-line">
              {LANGS.map((x) => (
                <tr key={x.l}>
                  <th scope="row" className="w-1/3 px-5 py-4 font-bold text-ink">{x.l}</th>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${x.s === "Live" ? "bg-brand-50 text-brand-800" : "bg-mist text-slate-600"}`}>{x.s}</span>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{x.n}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="wrap space-y-24 py-20 md:py-28">
          <FeatureRow
            eyebrow="Hindi, done properly"
            title="The details Indian callers notice in one sentence."
            body={
              <CheckList
                items={[
                  "Verbs match the voice: a female agent says “कर रही हूँ”, a male agent “कर रहा हूँ”.",
                  "Honorifics match the caller. If the caller's gender isn't known, it says “Meena जी” instead of guessing.",
                  "Plain phone words: “enquiry”, “performance”, “fees”, not literary Hindi nobody uses on a call.",
                  "Numbers are spoken as words, phone numbers digit by digit, and times in the 12-hour clock.",
                  "The greeting fits the time of day. No “good morning” at 7 pm.",
                ]}
              />
            }
            visual={
              <div className="grid gap-3">
                {[
                  { bad: "मैं आपकी मदद कर रहा हूँ", good: "मैं आपकी मदद कर रही हूँ", why: "Female voice, female verb" },
                  { bad: "आपकी पूछताछ के संदर्भ में", good: "आपकी enquiry के बारे में", why: "Phone Hindi, not a government letter" },
                  { bad: "Ms. Robotics STEM Programs", good: "Sharma जी", why: "Never a non-name as a name" },
                ].map((x) => (
                  <div key={x.good} className="card grid gap-2 p-5 text-sm sm:grid-cols-[1fr_1fr]">
                    <p><span className="text-xs font-bold uppercase tracking-wider text-rose">Not</span><br /><span className="text-slate-500 line-through">{x.bad}</span></p>
                    <p><span className="text-xs font-bold uppercase tracking-wider text-brand-700">Telleo</span><br /><span className="font-semibold text-ink">{x.good}</span></p>
                    <p className="text-xs text-slate-500 sm:col-span-2">{x.why}</p>
                  </div>
                ))}
              </div>
            }
          />
          <FeatureRow
            flip
            eyebrow="Sounds like a phone call"
            title="Tuned for an 8 kHz phone line, not a podcast."
            body={
              <>
                <p>Studio-quality AI voices sound wrong on a phone call: too crisp, too close, too quiet in the background. Telleo shapes the voice to the telephone band and adds a faint room tone, so the agent sounds like someone at a calling desk.</p>
                <p>The live voice pipeline runs on servers in Mumbai, next to the Indian phone network.</p>
              </>
            }
            visual={
              <div className="card flex items-end justify-center gap-1.5 bg-ink p-10" aria-hidden>
                {[18, 30, 52, 70, 88, 76, 94, 64, 48, 72, 58, 36, 24, 14].map((h, i) => (
                  <span key={i} className="w-3 animate-wave rounded-full bg-brand" style={{ height: `${h * 1.3}px`, animationDelay: `${i * 0.08}s` }} />
                ))}
              </div>
            }
          />
        </div>
      </section>

      <section className="wrap py-20 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">The voice library</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink md:text-4xl">80+ voices across seven speech engines.</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">Pick by ear. Every voice can be auditioned with your own opening line before you save the agent, and the preview uses the same engine and settings as the live call.</p>
            <div className="mt-8 grid grid-cols-3 gap-3 text-center">
              {[
                { I: Mic, t: "80+", d: "voices" },
                { I: AudioLines, t: "7", d: "engines" },
                { I: SlidersHorizontal, t: "4", d: "modulation levels" },
              ].map((x) => (
                <div key={x.d} className="card p-4">
                  <x.I className="mx-auto h-5 w-5 text-brand-700" />
                  <p className="mt-2 text-2xl font-extrabold text-ink">{x.t}</p>
                  <p className="text-xs text-slate-500">{x.d}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line">
              {ENGINES.map((x) => (
                <li key={x.e} className="flex items-start gap-4 px-5 py-4">
                  <Gauge className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
                  <div>
                    <p className="font-bold text-ink">{x.e}</p>
                    <p className="text-sm text-slate-600">{x.n}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-slate-500">Also per agent: speaking pace and a modulation level (Off, Subtle, Conversational, Lively) for how much the voice rises and falls.</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
