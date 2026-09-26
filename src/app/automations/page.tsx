import { CalendarCheck, FileSpreadsheet, Globe, Mail, MessageCircle, PhoneCall, RefreshCw, Tag, UserCheck, Webhook } from "lucide-react";
import { PageShell, FeatureRow, pageMetadata } from "@/components/PageShell";
import { OutcomeFlow } from "@/components/Visuals";
import { CheckList, Transcript } from "@/components/ui";

export const metadata = pageMetadata("/automations/");

const ANALYSIS = [
  ["Outcome", "Picked from your own list, e.g. Demo_Booked"],
  ["Summary", "Two or three sentences a rep can read in five seconds"],
  ["Lead score", "1 to 10, how warm the lead sounded"],
  ["Answers", "Only what the caller actually said, filed against your questions"],
  ["Callback", "Flagged when the caller asks to be called later; their words stay in the transcript"],
  ["Meeting", "Only counted when a specific day and time were agreed"],
];

const FAQS = [
  { q: "How soon after the call do the actions run?", a: "Within about a minute of hang-up. The call is analysed once, the outcome is written to the lead, and your rules run straight after." },
  { q: "Will it send a WhatsApp the caller didn't agree to?", a: "No. The agent only sends what it offered and the caller accepted on the call, using WhatsApp templates you have had approved. Each send is tracked for delivery and never sent twice." },
  { q: "Does it call back at the time the caller asked for?", a: "Not automatically. The call is marked as a callback request, with what the caller said in the transcript, so your team can follow up, or you can assign Callback outcomes to a rep. Calls started by a workflow are retried after the gap you set." },
  { q: "What if the caller never really spoke?", a: "Then the call is marked Incomplete, not Not interested. Workflow calls are retried after your gap; a campaign doesn't re-dial, so re-run it over those leads. Voicemails and silent pickups never close a lead by mistake." },
  { q: "Can outcomes go to our other systems?", a: "Yes. Workflows can call any URL with an HTTP request or webhook, so outcomes can reach your own CRM, sheet or ERP. There are no native Salesforce, HubSpot or Zoho apps yet." },
  { q: "Where do leads come from?", a: "Meta lead ads, Google lead forms, any website form via webhook, CSV or Excel imports, and manual entry. Leads can be assigned round-robin to reps and de-duplicated by phone or email." },
];

export default function Page() {
  return (
    <PageShell
      path="/automations/"
      eyebrow="Automations & actions"
      h1="The call ends. The follow-up has already started."
      lede="Telleo reads every conversation, picks the outcome from your list and runs your rules: assign the hot lead, book the meeting, send the brochure on WhatsApp, retry the no-answer, stop the not-interested. Nobody has to remember anything."
      visual={<OutcomeFlow />}
      faqs={FAQS}
    >
      <section className="wrap py-20 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="eyebrow">End-of-call analysis</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink md:text-4xl">Six things every call leaves behind.</h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">One pass over the full transcript, constrained to your own outcome list. Two guards keep it honest: no conversation means Incomplete, and a meeting only counts if a real day and time were agreed.</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-line">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-line">
                {ANALYSIS.map(([k, v]) => (
                  <tr key={k}>
                    <th scope="row" className="w-36 bg-paper px-5 py-4 font-bold text-ink">{k}</th>
                    <td className="px-5 py-4 text-slate-700">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="wrap space-y-24 py-20 md:py-28">
          <FeatureRow
            eyebrow="Outcome rules"
            title="Assign, retry or stop. Decided by you, once."
            body={
              <CheckList
                items={[
                  "Assign to a rep on the outcomes you pick, round-robin across your team.",
                  "Retry unanswered workflow calls after a gap, up to the number of attempts you set.",
                  "Stop on not interested or wrong person, so automated retries end there.",
                  "When retries run out, hand the lead to a person or close it: your choice.",
                  "If you add the matching lead statuses, the lead is marked AI qualified, not interested, no answer or retry pending.",
                ]}
              />
            }
            visual={
              <div className="grid grid-cols-2 gap-3">
                {[
                  { I: UserCheck, t: "Assign", d: "Hot_Lead, Demo_Booked → rep" },
                  { I: RefreshCw, t: "Retry", d: "No answer → again in 2 h, max 3" },
                  { I: Tag, t: "Stamp", d: "Lead status: AI qualified" },
                  { I: PhoneCall, t: "Stop", d: "Not_Interested → stop retries" },
                ].map((x) => (
                  <div key={x.t} className="card p-5">
                    <x.I className="h-5 w-5 text-brand-700" />
                    <p className="mt-3 font-bold text-ink">{x.t}</p>
                    <p className="mt-1 font-mono text-xs text-slate-500">{x.d}</p>
                  </div>
                ))}
              </div>
            }
          />
          <FeatureRow
            flip
            eyebrow="Promises kept"
            title="“I'll WhatsApp you the brochure.” And it does."
            body={
              <>
                <p>AI agents promise things on almost every call. Telleo makes sure the promise is kept: when the agent offers a brochure, a location or a payment link and the caller says yes, the approved template goes out, during the call or within a minute of it.</p>
                <p>Only what the caller accepted is sent. Every message is tracked for delivery, and never sent twice.</p>
              </>
            }
            visual={
              <Transcript
                title="Mid-call send"
                lines={[
                  { who: "agent", text: "क्या मैं इसी number पर course brochure WhatsApp कर दूँ?", en: "Shall I WhatsApp the course brochure to this number?" },
                  { who: "caller", text: "हाँ, भेज दीजिए।", en: "Yes, send it." },
                  { who: "agent", text: "भेज रही हूँ। Brochure में fees और batch timings दोनों हैं। कोई और सवाल है?", en: "Sending it now. It has both fees and batch timings. Any other question?" },
                ]}
              />
            }
          />
          <FeatureRow
            eyebrow="Meetings"
            title="A yes on the phone becomes a slot on the calendar."
            body={
              <p>Link an agent to a booking page. When the caller agrees a specific day and time, the meeting is booked automatically, with the time checked so a past slot is never booked. Your team sees it with the call summary attached.</p>
            }
            visual={
              <div className="card p-6">
                <div className="flex items-center gap-3">
                  <CalendarCheck className="h-6 w-6 text-brand-700" />
                  <div>
                    <p className="font-bold text-ink">Site visit · Greenfield Towers</p>
                    <p className="text-sm text-slate-500">Sunday, 10:00 am · booked by AI agent Aarav</p>
                  </div>
                </div>
                <p className="mt-4 rounded-xl bg-paper p-4 text-sm text-slate-700">Family buying for self-use, moving next year, budget around ₹85 lakh. Asked about parking and possession date.</p>
              </div>
            }
          />
        </div>
      </section>

      <section className="wrap py-20 md:py-24">
        <p className="eyebrow">Workflows</p>
        <h2 className="h-section mt-3 max-w-3xl text-ink">Chain the call with everything else.</h2>
        <p className="lede mt-4 max-w-2xl">A Telleo workflow can wait for a lead, call it, message it and tell your other systems, in any order. The AI call is one step among five.</p>
        <div className="mt-10 grid gap-4 md:grid-cols-5">
          {[
            { I: PhoneCall, t: "AI call", d: "Place a call with any agent and wait for its outcome" },
            { I: MessageCircle, t: "WhatsApp", d: "Send an approved template" },
            { I: Mail, t: "Email", d: "Send a follow-up or summary" },
            { I: Globe, t: "HTTP request", d: "Call any URL with the lead's data" },
            { I: Webhook, t: "Webhook", d: "Notify your systems of an outcome" },
          ].map((x) => (
            <div key={x.t} className="card p-5">
              <x.I className="h-5 w-5 text-brand-700" />
              <p className="mt-3 font-bold text-ink">{x.t}</p>
              <p className="mt-1 text-sm text-slate-600">{x.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border border-line bg-paper p-6">
          <p className="flex items-center gap-2 font-bold text-ink"><FileSpreadsheet className="h-5 w-5 text-brand-700" /> Where leads come in</p>
          <p className="mt-2 text-slate-600">Meta (Facebook and Instagram) lead ads, Google lead forms, any website form via webhook, CSV or Excel imports and manual entry. Round-robin assignment to reps and de-duplication by phone or email are built in.</p>
        </div>
      </section>
    </PageShell>
  );
}
