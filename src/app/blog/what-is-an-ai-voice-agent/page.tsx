import { BlogShell, postMetadata, Callout, Steps, Table, WhereTelleoFits, Sources, InlineCta } from "@/components/BlogShell";
import { Transcript } from "@/components/ui";
import Link from "next/link";

export const metadata = postMetadata("what-is-an-ai-voice-agent");

/** A plain call-flow strip: enquiry → call → answers → next step. */
function CallFlow() {
  const stages = [
    { t: "Enquiry arrives", d: "Website form, Meta or Google lead ad, CSV list" },
    { t: "Agent calls", d: "Within about a minute, inside your calling hours" },
    { t: "Asks your questions", d: "Need, budget, timeline, preferred slot" },
    { t: "Decides the outcome", d: "From your own list: interested, callback, not interested…" },
    { t: "Takes the next step", d: "Books the slot, transfers to a person, sends WhatsApp, or retries" },
  ];
  return (
    <figure className="not-prose my-8">
      <ol className="grid gap-3 md:grid-cols-5" aria-label="AI voice agent call flow">
        {stages.map((s, i) => (
          <li key={s.t} className="relative rounded-2xl border border-line bg-paper p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700">Step {i + 1}</span>
            <p className="mt-1 font-bold leading-snug text-ink">{s.t}</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.d}</p>
          </li>
        ))}
      </ol>
      <figcaption className="mt-3 text-sm text-slate-500">A typical outbound flow: one job per call and a closed list of outcomes, each tied to an action.</figcaption>
    </figure>
  );
}

export default function Page() {
  return (
    <BlogShell
      slug="what-is-an-ai-voice-agent"
      takeaways={[
        "An AI voice agent is software that makes or answers phone calls and holds a real two-way conversation: it listens (speech-to-text), decides what to say (a language model) and speaks (text-to-speech).",
        "In business it does one job per call: call back a new lead, qualify it, book a slot, remind, or hand a hot lead to a person. Then it records the outcome.",
        "Unlike an IVR or a robocall, it understands free speech and asks follow-up questions. Unlike a human, it calls every lead the same way, at any hour you allow.",
        "In India it has to handle Hindi, English and Hinglish in the same sentence, and short “haan” or “achha” replies while it is speaking.",
        "Before you buy, check conversation quality on your own leads, the handover rules, call analytics, integrations, consent and calling hours.",
      ]}
      toc={[
        { id: "what-it-is", label: "What is an AI voice agent?" },
        { id: "how-it-works", label: "How does it work?" },
        { id: "vs-ivr", label: "Versus IVR and robocalls" },
        { id: "use-cases", label: "Key business use cases" },
        { id: "languages", label: "Why Hindi, English and Hinglish matter" },
        { id: "choosing", label: "What to check before choosing" },
        { id: "telleo", label: "How Telleo helps" },
        { id: "faq", label: "FAQ" },
      ]}
      faqs={[
        {
          q: "Is an AI voice agent the same as a chatbot?",
          a: "No. A chatbot works in text, in a chat window, and the user can take as long as they like to reply. An AI voice agent works on an ordinary phone call: it has to understand speech over a phone line, reply within the length of a natural pause, and cope with interruptions and silence. Most voice agents also have a narrower job than a chatbot, such as qualifying a lead or confirming an appointment.",
        },
        {
          q: "Can an AI voice agent speak Hindi and Hinglish?",
          a: "Many can, but quality varies a lot between vendors and voices. Ask which languages run in production today, not which ones the speech engine supports on paper, and test with your own leads’ accents. Telleo’s agents speak Hindi, English and Hinglish in production; other Indian languages are set up with customers on request.",
        },
        {
          q: "Can an AI voice agent book appointments and update a CRM?",
          a: "Yes, if it is connected to a calendar or booking page and to your CRM. The agent agrees a specific day and time with the caller, books the slot, and writes the outcome, the answers it collected and a summary to the lead record. With Telleo, a meeting is booked on your booking page when a time was agreed, results are saved in Telleo’s CRM, and any other system can receive them by webhook or the Telleo API.",
        },
        {
          q: "When should an AI voice agent transfer a call to a human?",
          a: "Transfer when the caller asks for a person, when the lead is clearly ready to buy and a salesperson can close, when the question is outside the facts the agent was given (pricing exceptions, complaints, medical, legal or financial specifics), and when the caller is upset. Decide these rules before launch and write them into the script.",
        },
        {
          q: "Should the agent tell callers it is an AI?",
          a: "We recommend it. Say it plainly in the opening line, and always answer honestly when a caller asks. It is the straightforward thing to do, and it avoids an awkward moment halfway through the call.",
        },
        {
          q: "Is it legal to make AI calls in India?",
          a: "Commercial calls are governed by TRAI’s Telecom Commercial Communications Customer Preference Regulations. Senders must register with an access provider and notify the operator about auto-dialer or robo-calls, and promotional calls must come from the 140 series. TRAI’s September 2026 amendment adds a pre-declaration for calls placed by software. Check the current rules with your telecom provider; this is not legal advice.",
        },
        {
          q: "Will an AI voice agent replace my telecallers?",
          a: "Usually it changes what they do. The agent takes the first call, the repeat attempts and the reminders; your people take the qualified, high-intent and difficult conversations.",
        },
      ]}
    >
      <h2 id="what-it-is" className="!mt-0">What is an AI voice agent?</h2>
      <p>
        <strong>An AI voice agent is software that makes or answers phone calls and talks with the caller in normal speech.</strong> It listens to what the person says, understands it, decides what to say next and replies out loud, the way a trained telecaller would. When the call ends it writes down what happened: the answers it collected, the outcome and the next step.
      </p>
      <p>
        A practical example: someone fills in a form on your website at 8:40 pm asking about a course. Within a minute their phone rings. The agent greets them by name, asks who the course is for and which batch suits them, offers two demo slots, books the one they pick, and sends a WhatsApp confirmation. Your counsellor sees the summary on the lead the next morning.
      </p>
      <p>What it is not:</p>
      <ul>
        <li><strong>Not an IVR.</strong> An IVR offers fixed menus (“press 1 for admissions”). An agent handles “actually I wanted to ask about the weekend batch, not the regular one”.</li>
        <li><strong>Not a robocall.</strong> A robocall plays the same recording to everyone. An agent responds to what each person says.</li>
        <li><strong>Not a chatbot on the phone.</strong> A useful agent has one job per call (qualify this lead, confirm this appointment) and a closed list of outcomes.</li>
      </ul>

      <h2 id="how-it-works">How does an AI voice agent work?</h2>
      <p>From the business side, every call follows the same four steps.</p>

      <h3>1. A lead or customer enquiry arrives</h3>
      <p>
        The trigger is usually an event: a new lead from a website form, a Meta or Google lead ad, a row in an uploaded list, or an appointment due tomorrow. For inbound calls, the trigger is simply someone dialling your number. The agent receives the details you already have, such as the person’s name and what they asked about, so it does not open with “how can I help you?”.
      </p>

      <h3>2. The agent calls and follows a conversation script</h3>
      <p>
        The script is a set of instructions, not a word-for-word recording: who the agent is, why it is calling, the facts it may use, the questions it must ask and how to handle common replies. During the call, three pieces of software run in a loop every time someone speaks:
      </p>
      <ul>
        <li><strong>Speech-to-text</strong> turns the caller’s words into text as they talk. Phone audio is thin: Google’s speech-to-text documentation describes phone-call audio as typically recorded at an 8 kHz sampling rate, which is why models built for telephony exist.</li>
        <li><strong>A language model</strong> reads the script, the lead’s details and the conversation so far, and writes the next line, ideally one or two short sentences.</li>
        <li><strong>Text-to-speech</strong> speaks that line, usually sentence by sentence so the reply can start before the whole answer is written.</li>
      </ul>
      <p>
        The whole loop has to finish in about the time of a natural pause. An answer that is correct but slow still sounds broken on a phone call. The other hard part is turn-taking: knowing when the caller has really finished, not stopping for every “haan”, and stopping at once when the caller genuinely interrupts (called barge-in).
      </p>

      <h3>3. It captures answers and identifies the next step</h3>
      <p>
        After the call, the transcript is read again to pull out structured data: the answers to your qualifying questions, an outcome from your own list (interested, callback requested, not interested, wrong number, no real conversation), and a short summary. A meeting should only count as booked when a specific day and time were agreed.
      </p>

      <h3>4. It updates the CRM, books a meeting or hands over a hot lead</h3>
      <p>
        Each outcome is tied to an action: book the agreed slot, assign the lead to a salesperson, transfer the call live to a person while the caller is still on the line, send a WhatsApp or email, schedule a retry for unanswered calls, or stop. This last step is what turns a talking bot into something that actually moves leads forward.
      </p>

      <CallFlow />

      <h3>What that sounds like</h3>
      <Transcript
        title="Illustrative call to a new enquiry"
        lines={[
          { who: "agent", text: "Hi Anjali, this is Priya, an AI assistant from [your institute]. You just enquired about the NEET weekend batch. Is this a good time for two minutes?" },
          { who: "caller", text: "हाँ, बोलो।", en: "Yes, go ahead." },
          { who: "agent", text: "Is the course for you, or for someone in your family?" },
          { who: "caller", text: "मेरे बेटे के लिए, वो class eleven में है।", en: "For my son, he’s in class eleven." },
          { who: "agent", text: "Would a free demo class this Saturday work, at eleven in the morning or five in the evening?" },
          { who: "caller", text: "पाँच बजे ठीक है।", en: "Five is fine." },
          { who: "agent", text: "Done, Saturday at five in the evening. I’ll WhatsApp you the details now." },
        ]}
      />
      <p>
        Notice what the agent does not do: it does not repeat “so your son is in class eleven”, it offers two slots rather than a list, and it reads back only the booked time.
      </p>
      <Callout tone="tip" title="Test turn-taking in five minutes">
        <p>Call the agent yourself and do four things: pause for two seconds mid-answer, say “haan” while it is talking, interrupt it with a new question, and go silent. A good agent waits, carries on, stops and answers, and finally checks whether you are still there before closing politely.</p>
      </Callout>

      <h2 id="vs-ivr">AI voice agents vs traditional IVR and robocalls</h2>
      <p>
        All three put software on a phone call, but they solve different problems. IVR routes callers. Robocalls broadcast one message. An AI voice agent holds a conversation towards a goal.
      </p>
      <Table
        head={["", "IVR menu", "Robocall", "AI voice agent"]}
        rows={[
          ["What the caller does", "Listens to options, presses keys", "Listens", "Talks normally"],
          ["Understands free speech", "Barely, a few fixed words", "No", "Yes, within its script"],
          ["Asks follow-up questions", "No", "No", "Yes"],
          ["Personalised to the lead", "No", "Name at most", "Name, enquiry and earlier answers"],
          ["Result you get", "Which key was pressed", "Whether it was answered", "Answers, outcome, summary, next step"],
          ["Can book or transfer", "Transfer to a queue", "No", "Books a slot or transfers live to a person"],
          ["Best for", "Simple routing", "One-way notices", "Qualification, booking, reminders, follow-ups"],
        ]}
      />
      <p>
        Humans still win on judgement, negotiation, empathy and upset customers. The practical split in most teams: the IVR stays for simple routing, the agent handles the first call and the repetitive follow-ups, and people handle the conversations that decide revenue or reputation. See the full comparisons of <Link href="/compare/telleo-vs-ivr/">AI agents vs IVR</Link> and <Link href="/compare/telleo-vs-telecallers/">AI agents vs telecallers</Link>.
      </p>

      <h2 id="use-cases">Key business use cases for AI voice agents</h2>
      <p>
        Voice agents work best on calls that are frequent, repetitive and have a clear goal. Three groups cover most of what Indian businesses use them for.
      </p>

      <h3>Lead qualification and instant callbacks</h3>
      <p>
        Leads go cold fast. In a Harvard Business Review study of 1.25 million leads, firms that tried to contact a lead within an hour were nearly seven times as likely to qualify it as firms that waited an hour longer. An agent can call each new form fill within about a minute, ask the same qualifying questions every time (need, budget, timeline, location) and pass only interested leads to your team. See <Link href="/use-cases/instant-lead-callback/">instant lead callback</Link>, <Link href="/use-cases/lead-qualification/">lead qualification</Link> and our guide to <Link href="/blog/speed-to-lead/">speed to lead</Link>.
      </p>

      <h3>Appointment booking and reminders</h3>
      <p>
        Booking a demo class, a site visit, a test drive or a clinic appointment is a short, structured conversation: offer slots, agree one, confirm. The same agent can call the day before to confirm and offer to reschedule, which is far cheaper than discovering a no-show on the day. See <Link href="/use-cases/appointment-booking/">appointment booking</Link> and <Link href="/blog/ai-appointment-reminder-calls/">appointment reminder calls</Link>.
      </p>

      <h3>Admissions, payment reminders and lead reactivation</h3>
      <p>
        Education teams use agents to follow up admission enquiries and incomplete applications; lenders, schools and subscription businesses use them for polite payment reminders; and sales teams use them to re-engage older leads. For reactivation, check consent first: TRAI’s September 2026 amendment limits calls based on an enquiry to seven days from that enquiry. See <Link href="/use-cases/payment-reminders/">payment reminders</Link>, <Link href="/use-cases/lead-reactivation/">lead reactivation</Link>, <Link href="/blog/ai-calling-for-admissions/">AI calling for admissions</Link> and the full list of <Link href="/use-cases/">use cases</Link> and <Link href="/industries/">industries</Link>.
      </p>

      <InlineCta title="Hear an AI voice agent on a real phone line">
        Dial the Telleo test line and talk to an agent in Hindi, English or Hinglish, or book a 20-minute demo built around your own leads.
      </InlineCta>

      <h2 id="languages">Why Hindi, English and Hinglish support matters in India</h2>
      <p>
        Indian callers rarely speak one language per call. A caller might answer in Hindi, give a number in English and ask about fees in Hinglish, all in the same sentence. An agent that only handles clean English, or textbook Hindi, will mishear answers and sound out of place. What to listen for:
      </p>
      <ul>
        <li><strong>Code-switching.</strong> “Mere bete ke liye, weekend batch chahiye” should be understood as one answer, not two half-heard ones.</li>
        <li><strong>Everyday phone Hindi.</strong> People say “fees kitni hai”, not formal Hindi. An agent that speaks like a news reader sounds robotic even when the voice is good.</li>
        <li><strong>Backchannels.</strong> Callers say “haan”, “achha” and “okay” while listening. These mean “go on”, not “stop talking”.</li>
        <li><strong>Grammar and respect.</strong> In Hindi the verb changes with the speaker’s gender (<em>kar rahi hoon / kar raha hoon</em>), and the right honorific matters. If the caller’s gender is unknown, “Anjali ji” is safer than a guess.</li>
        <li><strong>Accents and line quality.</strong> Test with callers from the regions your leads actually come from, on mobile networks, not only in a quiet office.</li>
      </ul>
      <p>
        Our <Link href="/blog/hinglish-voice-ai/">Hinglish voice AI guide</Link> explains how to judge this, and you can hear the voices on <Link href="/voices-and-languages/">voices and languages</Link>.
      </p>

      <h2 id="choosing">What to check before choosing an AI calling platform</h2>
      <p>
        Demos are always smooth. The differences show up on your own leads, in the handover to your team and in the paperwork. Check two groups of things.
      </p>

      <h3>Conversation quality, handover rules and call analytics</h3>
      <ul>
        <li><strong>Real recordings.</strong> Ask for production calls in the languages you need, and call the agent yourself as a difficult caller.</li>
        <li><strong>Facts and limits.</strong> Language models can produce confident, wrong answers. You should be able to give the agent a fixed list of facts and a fallback line for anything else (“let me have a counsellor confirm that”). Our <Link href="/blog/ai-calling-script-template/">script guide</Link> covers this.</li>
        <li><strong>Handover.</strong> Can the agent transfer live to a person mid-call? What happens if nobody picks up? What does the salesperson see?</li>
        <li><strong>Your own outcomes.</strong> Can you define the outcome list and what happens after each one, or are you stuck with the vendor’s?</li>
        <li><strong>Analytics.</strong> A transcript and summary for every call, a reliable outcome, and a way to find bad calls (silence, mishearing, answering machines) without listening to all of them. See <Link href="/blog/measure-ai-call-quality/">how to measure AI call quality</Link>.</li>
      </ul>

      <h3>Integrations, consent, calling hours and compliance</h3>
      <ul>
        <li><strong>Lead sources and CRM.</strong> Does it pull leads from Meta and Google lead forms and your website, and push results back to your CRM? Webhooks and an API matter more than a logo wall. See <Link href="/blog/ai-calling-crm-integration/">AI calling CRM integration</Link>.</li>
        <li><strong>Calling hours.</strong> Can you set the hours the agent may call, and does it hold queued calls until those hours open?</li>
        <li><strong>Safety limits.</strong> Daily caps, protection against dialling the same person twice, and a hard stop when credit runs out.</li>
        <li><strong>Consent and regulation.</strong> Under TRAI’s rules a business must register with an access provider and notify its operator about automated calls, and promotional calls must use 140-series numbers. TRAI’s Third Amendment (press release of 18 September 2026) adds a pre-declaration of calls placed by software, with the numbers used, and limits enquiry-based calls to seven days. Confirm with your provider when each part takes effect, and who handles DLT registration. Our <Link href="/blog/trai-dlt-rules-ai-calling/">TRAI and DLT guide</Link> has the details.</li>
        <li><strong>Billing.</strong> Per second, 30-second pulse or full minute? Are unanswered calls charged? See the <Link href="/blog/ai-calling-cost-india/">AI calling cost guide</Link>.</li>
      </ul>
      <Callout tone="info" title="Pilot before you commit">
        <p>
          Pick one narrow call type (“call new website enquiries and book a counselling call”), send a fixed share of new leads to the agent and keep the rest on your current process, and listen to a sample of calls every day for two weeks. Judge it on contact rate, qualified leads, booked meetings, transfers and complaints, not on how human the voice sounds. The <Link href="/blog/ai-calling-vendor-checklist/">vendor checklist</Link> has 20 more questions.
        </p>
      </Callout>

      <h2 id="telleo">How Telleo helps teams turn calls into next steps</h2>
      <WhereTelleoFits>
        <p>
          <Link href="/">Telleo</Link> is an AI voice agent platform built for Indian businesses. New leads from Meta and Google lead forms, your website (by webhook) or an uploaded list can be called <strong>within about 60 seconds</strong>, inside the calling hours you set. Agents speak <strong>Hindi, English and Hinglish</strong> in production today; other Indian languages are set up with customers on request.
        </p>
        <p>
          You write the questions every call must answer and your own outcome list in a no-code builder. After each call Telleo records the outcome, a summary, the answers and a 1–10 lead rating, then acts on it: <strong>books the meeting</strong> on your booking page when a time was agreed, <strong>transfers hot leads live</strong> to your team, sends approved WhatsApp templates or email, retries unanswered workflow calls, and passes everything to your systems through webhooks and a REST API. Every AI call gets a transcript and a green, amber or red health check. Phone lines are included.
        </p>
        <p>
          Pricing starts at ₹3.49 a minute on the annual plan (CRM included) or ₹3.99 a minute on monthly plans, excluding GST; see <Link href="/pricing/">pricing</Link>, <Link href="/how-it-works/">how it works</Link>, <Link href="/use-cases/">use cases</Link> and <Link href="/industries/">industries</Link>. The quickest test is a real call: dial <strong>+91 80356 14126</strong> and talk to an agent.
        </p>
      </WhereTelleoFits>

      <Sources
        items={[
          { label: "Google Cloud — Speech-to-Text: select a transcription model (telephony model description)", url: "https://docs.cloud.google.com/speech-to-text/docs/transcription-model", checked: "2026-09-25" },
          { label: "Harvard Business Review — Oldroyd, McElheran and Elkington, “The Short Life of Online Sales Leads” (2011)", url: "https://hbr.org/2011/03/the-short-life-of-online-sales-leads", checked: "2026-09-25" },
          { label: "TRAI — Telecom Commercial Communications Customer Preference (Second Amendment) Regulations, 2025 (12 February 2025)", url: "https://trai.gov.in/sites/default/files/2025-02/Regulation_12022025.pdf", checked: "2026-09-25" },
          { label: "TRAI — Press Release No. 91/2026: clarifications on the 1600 and 140 series (10 July 2026)", url: "https://trai.gov.in/sites/default/files/2026-07/PR_No91of2026.pdf", checked: "2026-09-25" },
          { label: "TRAI — Press Release No. 119/2026 on the TCCCPR (Third Amendment) Regulations, 2026, including A2P calls (18 September 2026)", url: "https://www.trai.gov.in/sites/default/files/2026-09/PR_No119of2026.pdf", checked: "2026-09-25" },
        ]}
      />
    </BlogShell>
  );
}
