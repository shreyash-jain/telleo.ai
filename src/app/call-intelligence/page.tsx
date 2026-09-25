import { BarChart3, FileAudio, Headphones, Languages, ListTodo, MessageSquareWarning, Target, TrendingUp, Upload, Users } from "lucide-react";
import { PageShell, FeatureRow, pageMetadata } from "@/components/PageShell";
import { IntelligenceCard } from "@/components/Visuals";
import { CheckList } from "@/components/ui";

export const metadata = pageMetadata("/call-intelligence/");

const OUTPUT = [
  { I: Target, t: "What the call was for", d: "The inferred goal and call type: sales outreach, follow-up, demo booking, payment, support." },
  { I: ListTodo, t: "Action items", d: "Each with an owner (rep or lead), a due hint and a priority." },
  { I: MessageSquareWarning, t: "Objections", d: "Every objection raised, whether it was handled, and how." },
  { I: TrendingUp, t: "Sentiment", d: "For the lead and the caller, and whether it improved, stayed flat or declined." },
  { I: BarChart3, t: "Two scores", d: "How well the rep advanced the goal, and how the call landed for the lead, with conversion likelihood." },
  { I: Headphones, t: "Coaching", d: "Specific tips, talk ratio, and verbatim highlights worth sharing with the team." },
];

const FAQS = [
  { q: "What does call intelligence cost?", a: "It is included on every AI call at no extra charge. For your team's human calls it is billed per minute of recording analysed, and only when the analysis succeeds." },
  { q: "Which calls can it analyse?", a: "Telleo AI calls, your team's click-to-call calls on Telleo, Exotel or Airtel IQ, and recordings of calls made anywhere else, which you can upload against the lead." },
  { q: "Does it understand Hindi and Hinglish?", a: "Yes. Calls are transcribed in Hindi, English or a mix, including callers who switch languages mid-sentence, and the analysis reads the whole conversation." },
  { q: "Can we change what reps are scored on?", a: "Yes. The default rubric is rapport, needs discovery, objection handling and next step secured. You can change the qualities and add a hint about what your calls are meant to achieve." },
  { q: "Who can see the analysis?", a: "Reps see their own calls. A sales head sees their reporting line in the team view. Full transcripts are limited to roles with permission to see caller details." },
  { q: "Does it identify who is speaking?", a: "It infers the rep and the lead from what is said; there is no separate voice-based speaker separation yet. For two-person sales calls this is usually clear." },
];

export default function Page() {
  return (
    <PageShell
      path="/call-intelligence/"
      eyebrow="Call intelligence"
      h1="Every sales call, summarised, scored and coached. Human or AI."
      lede="Telleo transcribes each call in Hindi, English or Hinglish and tells you what happened, what was promised, which objections came up and how your rep handled them. Free on AI calls; a small per-minute charge on your team's calls."
      visual={<IntelligenceCard />}
      faqs={FAQS}
    >
      <section className="wrap py-20 md:py-24">
        <p className="eyebrow">On every call</p>
        <h2 className="h-section mt-3 max-w-3xl text-ink">What you get without listening to a minute.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {OUTPUT.map((o) => (
            <div key={o.t} className="card p-6">
              <o.I className="h-5 w-5 text-brand-700" />
              <p className="mt-3 font-bold text-ink">{o.t}</p>
              <p className="mt-1.5 leading-relaxed text-slate-600">{o.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-slate-600">Plus a summary, key topics, the questions the lead asked, commitments made, risk flags, a next best action and a two-line update on the call log row.</p>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="wrap space-y-24 py-20 md:py-28">
          <FeatureRow
            eyebrow="Your team's calls"
            title="The same analysis for the calls your people make."
            body={
              <>
                <p>Telleo was built for Indian sales floors, where a call starts in English, moves to Hindi and closes in Hinglish. Your team's calls get the same analysis as the AI's.</p>
                <CheckList
                  items={[
                    "Click-to-call calls on Telleo, Exotel or Airtel IQ are picked up when the recording lands.",
                    "Calls made on personal phones or elsewhere can be uploaded against the lead.",
                    "Short or unconnected calls can be skipped, so you only pay for real conversations.",
                  ]}
                />
              </>
            }
            visual={
              <div className="grid grid-cols-3 gap-3">
                {[
                  { I: FileAudio, t: "AI calls", d: "Analysed free" },
                  { I: Headphones, t: "Click-to-call", d: "Telleo, Exotel, Airtel IQ" },
                  { I: Upload, t: "Uploads", d: "Any recording" },
                ].map((x) => (
                  <div key={x.t} className="card p-5 text-center">
                    <x.I className="mx-auto h-6 w-6 text-brand-700" />
                    <p className="mt-3 text-sm font-bold text-ink">{x.t}</p>
                    <p className="mt-1 text-xs text-slate-500">{x.d}</p>
                  </div>
                ))}
              </div>
            }
          />
          <FeatureRow
            flip
            eyebrow="Team view"
            title="See the whole floor, not one call at a time."
            body={
              <>
                <p>Roll-ups per rep and per team: calls analysed, average scores, outcomes and sentiment, and a leaderboard. A sales head sees their own reporting line, not the whole company.</p>
                <p>Use it for the weekly review: sort by the lowest objection-handling score, open three calls, share the coaching tips.</p>
              </>
            }
            visual={
              <div className="card overflow-hidden">
                <div className="flex items-center gap-2 border-b border-line bg-paper px-5 py-3 text-sm font-bold text-ink"><Users className="h-4 w-4 text-brand-700" /> Team · this week</div>
                <table className="w-full text-left text-sm">
                  <thead className="text-xs text-slate-500">
                    <tr><th className="px-5 py-2 font-medium">Rep</th><th className="px-3 py-2 font-medium">Calls</th><th className="px-3 py-2 font-medium">Rep score</th><th className="px-3 py-2 font-medium">Positive</th></tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {[["Neha", 142, 7.8, "46%"], ["Karan", 128, 6.4, "38%"], ["Aditi", 97, 8.2, "51%"], ["Rohit", 88, 5.9, "29%"]].map(([n, c, s, p]) => (
                      <tr key={n as string}>
                        <td className="px-5 py-3 font-semibold text-ink">{n}</td>
                        <td className="px-3 py-3 text-slate-600">{c}</td>
                        <td className="px-3 py-3 font-mono text-slate-700">{s}</td>
                        <td className="px-3 py-3 text-slate-600">{p}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="border-t border-line px-5 py-3 text-xs text-slate-500">Illustrative data.</p>
              </div>
            }
          />
        </div>
      </section>

      <section className="wrap py-20 md:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow">Your rubric</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink md:text-4xl">Score reps on what matters to you.</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">The default rubric covers rapport, needs discovery, objection handling and securing a next step. Change the qualities, add a hint about what your calls are for, and every analysis follows it.</p>
          </div>
          <div className="card p-6">
            <p className="flex items-center gap-2 text-sm font-bold text-ink"><Languages className="h-4 w-4 text-brand-700" /> Rubric settings</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["rapport", "needs_discovery", "objection_handling", "next_step_secured", "fee_explanation", "parent_empathy"].map((q, i) => (
                <span key={q} className={`rounded-lg px-2.5 py-1 font-mono text-xs ${i < 4 ? "bg-brand-50 text-brand-800" : "border border-dashed border-line text-slate-500"}`}>{q}</span>
              ))}
            </div>
            <p className="mt-4 rounded-xl bg-paper p-3 text-sm text-slate-600"><span className="font-semibold text-ink">Objective hint:</span> book a campus visit within 7 days.</p>
            <p className="mt-3 text-xs text-slate-500">Minimum call length for analysis: 20 seconds · connected calls only</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
