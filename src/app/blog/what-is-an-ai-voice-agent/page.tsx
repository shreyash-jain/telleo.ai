import { BlogShell, postMetadata, Callout, Steps, Table, WhereTelleoFits, Sources } from "@/components/BlogShell";
import Link from "next/link";

export const metadata = postMetadata("what-is-an-ai-voice-agent");

export default function Page() {
  return (
    <BlogShell
      slug="what-is-an-ai-voice-agent"
      takeaways={[
        "An AI voice agent is software that makes or answers phone calls and talks in normal speech: it listens (speech-to-text), decides what to say (a language model) and speaks (text-to-speech).",
        "The hard part is not the words but the timing: knowing when the caller has finished, and not stopping for every “haan” or “achha”.",
        "It is good at repetitive, well-defined calls such as lead callbacks, reminders and booking. Humans still win on judgement, negotiation and upset customers.",
        "Outbound calling in India is regulated: register as a sender on DLT, tell your operator you use automated calls, and use the right number series.",
        "Pilot one narrow call type, listen to the recordings every day, and measure outcomes rather than how human the voice sounds.",
      ]}
      toc={[
        { id: "what-it-is", label: "What an AI voice agent is" },
        { id: "how-it-works", label: "How a call works, step by step" },
        { id: "turn-taking", label: "Turn-taking and barge-in" },
        { id: "can-and-cant", label: "What it can and can’t do" },
        { id: "outbound-inbound", label: "Outbound vs inbound" },
        { id: "ivr-and-humans", label: "Versus IVR and human callers" },
        { id: "how-to-pilot", label: "How to run a pilot" },
        { id: "vendor-questions", label: "Questions to ask a vendor" },
      ]}
      faqs={[
        {
          q: "Is an AI voice agent the same as an IVR?",
          a: "No. An IVR plays recorded menus and waits for key presses or a few fixed words. An AI voice agent understands free speech, asks follow-up questions, and can hold a two-way conversation towards a goal such as booking a visit.",
        },
        {
          q: "Can an AI voice agent speak Hindi and Hinglish?",
          a: "Many can, but quality varies a lot between vendors and voices. Ask which languages are running in production today, not which ones the speech engine supports on paper, and test with your own leads’ accents.",
        },
        {
          q: "Should the agent tell callers it is an AI?",
          a: "We recommend it. Say it plainly in the opening line, and always answer honestly when a caller asks. It is the straightforward thing to do, and it avoids an awkward moment halfway through the call.",
        },
        {
          q: "Is it legal to make AI calls in India?",
          a: "Commercial calls are governed by TRAI’s Telecom Commercial Communications Customer Preference Regulations. Senders must register with an access provider, notify the operator in advance about auto-dialer or robo-calls, and promotional calls must come from the 140 series. Check the current rules with your telecom provider; this is not legal advice.",
        },
        {
          q: "Will an AI voice agent replace my telecallers?",
          a: "Usually it changes what they do. The agent takes the first call, the repeat attempts and the reminders; your people take the qualified, high-intent and difficult conversations.",
        },
      ]}
    >
      <p>
        An AI voice agent is a program that picks up the phone, or dials out, and has a conversation. Not a recorded message and not a “press 1 for admissions” menu, but something closer to a trained telecaller who follows a script, asks questions, understands the answers and writes down what happened.
      </p>
      <p>
        This guide explains how one works under the hood, where it helps an Indian business and where it does not, and how to test one without betting your whole lead pipeline on it.
      </p>

      <h2 id="what-it-is">What an AI voice agent is (and isn’t)</h2>
      <p>
        Think of it as three pieces of software joined by a phone line. One turns the caller’s speech into text. One reads that text, along with your instructions, and decides what to say next. One turns that reply back into speech. The loop repeats every time someone speaks.
      </p>
      <p>What it is not:</p>
      <ul>
        <li><strong>Not an IVR.</strong> An IVR offers fixed menus. An agent handles “actually I wanted to ask about the weekend batch, not the regular one”.</li>
        <li><strong>Not a robocall.</strong> A robocall plays the same recording to everyone. An agent responds to what each person says.</li>
        <li><strong>Not a general chatbot on the phone.</strong> A useful agent has one job per call (qualify this lead, confirm this appointment) and a closed list of outcomes.</li>
      </ul>

      <h2 id="how-it-works">How a call works, step by step</h2>
      <p>Here is what happens between “hello” and the call summary landing in your CRM.</p>
      <Steps
        items={[
          {
            title: "The phone line carries the audio",
            body: "Telephony connects the agent to an ordinary mobile or landline number. Phone audio is much thinner than a studio microphone: Google’s own speech-to-text documentation describes phone-call audio as typically recorded at an 8 kHz sampling rate, which is why models built for phone audio exist.",
          },
          {
            title: "Speech-to-text transcribes as the caller talks",
            body: "A streaming speech-to-text model turns the caller’s words into text while they are still speaking. For Indian callers it has to cope with Hindi, English and the mix of both in one sentence, plus background noise and weak networks.",
          },
          {
            title: "Turn detection decides the caller has finished",
            body: "Silence alone is a poor signal: people pause mid-thought. The system has to judge whether a pause is the end of a turn or just the caller thinking.",
          },
          {
            title: "A language model writes the reply",
            body: "The model reads your script, the facts you gave it, the lead’s details (name, the form they filled) and the conversation so far, then writes the next line. Good agents keep replies to one or two sentences.",
          },
          {
            title: "Text-to-speech speaks the reply",
            body: "The reply is turned into audio, usually sentence by sentence so the agent can start speaking before the whole answer is written.",
          },
          {
            title: "After the call, the transcript becomes data",
            body: "Another pass over the transcript pulls out the outcome, the answers to your questions, and whether the caller asked for a callback, and then triggers the next step: assign to a rep, send a WhatsApp, or schedule a retry.",
          },
        ]}
      />
      <h3>What that sounds like</h3>
      <p>A short outbound call to a new enquiry, with each loop of the steps above producing one agent line:</p>
      <ul>
        <li><strong>Agent:</strong> “Hi Anjali, this is Priya, an AI assistant from [your institute]. You just enquired about the NEET weekend batch. Is this a good time for two minutes?”</li>
        <li><strong>Caller:</strong> “Haan, bolo.”</li>
        <li><strong>Agent:</strong> “Is the course for you, or for someone in your family?”</li>
        <li><strong>Caller:</strong> “For my son, he’s in class eleven.”</li>
        <li><strong>Agent:</strong> “Would a free demo class this Saturday work, at eleven in the morning or five in the evening?”</li>
      </ul>
      <p>
        Note what the agent does not do: it does not repeat “so your son is in class eleven”, and it offers two slots rather than a list.
      </p>
      <p>
        Every hop adds a little delay, and the whole loop has to finish in about the time of a natural pause in conversation. That is why voice agents feel very different from text chatbots: an answer that is correct but slow still sounds broken on a phone call.
      </p>

      <h2 id="turn-taking">Turn-taking and barge-in: the hard part</h2>
      <p>
        Most bad AI calls fail on timing, not on vocabulary. Three problems show up again and again:
      </p>
      <ul>
        <li><strong>Answering too early.</strong> The caller says “haan, wo…” and pauses. An impatient agent answers the “haan” and talks over the real answer.</li>
        <li><strong>Stopping for every sound.</strong> Indian callers often say “haan”, “achha” or “okay” while listening. If the agent treats each one as an interruption, it stops mid-sentence and starts again, over and over.</li>
        <li><strong>Not stopping when it should.</strong> When the caller genuinely interrupts (“no, no, I already joined somewhere else”), the agent has to stop talking and respond to that. This is called barge-in.</li>
      </ul>
      <Callout tone="tip" title="How to test turn-taking in five minutes">
        <p>Call the agent yourself and do four things: pause for two seconds mid-answer, say “haan” while it is talking, interrupt it with a new question, and go silent. A good agent waits, carries on, stops and answers, and finally checks whether you are still there before closing politely.</p>
      </Callout>

      <h2 id="can-and-cant">What it can and can’t do</h2>
      <Table
        head={["Does well", "Does badly or should not do"]}
        rows={[
          ["Call every new lead within a minute, at any hour you allow", "Negotiate prices or approve exceptions"],
          ["Ask the same five qualifying questions consistently, every time", "Calm down a genuinely angry customer"],
          ["Confirm, remind and reschedule appointments", "Answer questions about facts you never gave it (it may guess)"],
          ["Book a slot when the caller agrees to a day and time", "Understand callers on very noisy or breaking lines"],
          ["Retry unanswered numbers on a schedule without forgetting", "Build a long-term relationship with a key account"],
          ["Write a summary and outcome for every call", "Make judgement calls your policy does not cover"],
        ]}
      />
      <p>
        The row that causes most trouble is the third one on the right. Language models can produce confident answers that are wrong. The fix is in the script: list the facts the agent may use, and tell it exactly what to say when asked something outside that list (usually “let me have a counsellor confirm that”). Our guide to <Link href="/blog/ai-calling-script-template/">writing an AI calling script</Link> covers this in detail.
      </p>

      <h2 id="outbound-inbound">Outbound vs inbound calls</h2>
      <p>
        <strong>Outbound</strong> means the agent dials. Typical jobs: calling back a new enquiry, fee or payment reminders, appointment confirmations, re-engaging old leads, and short feedback calls. Outbound is a good first use, because the volume is predictable and the goal is clear.
      </p>
      <p>
        <strong>Inbound</strong> means the agent answers. Typical jobs: answering after office hours, taking the “I want to talk to someone” option from an IVR menu, answering common questions, and booking callbacks for the team.
      </p>
      <Callout tone="warn" title="Outbound calling in India has rules">
        <p>
          Under TRAI’s commercial communication regulations as amended in February 2025, a business must be registered with an access provider before making commercial calls, and must notify the originating operator in advance, in writing, about the use of auto-dialer or robo-calls and their purpose.
        </p>
        <p>
          In July 2026 TRAI clarified that promotional calls from any sector must use 140-series numbers, and that customers can block promotional calls by sector through the DND registry. The 1600 series is for service and transactional calls by RBI, SEBI, IRDAI and PFRDA regulated entities and government bodies. Confirm how your calls are classified with your provider before you launch.
        </p>
      </Callout>

      <h2 id="ivr-and-humans">Where it beats IVR, and where humans still win</h2>
      <Table
        head={["", "IVR menu", "AI voice agent", "Human caller"]}
        rows={[
          ["What the caller does", "Listens to options, presses keys", "Talks normally", "Talks normally"],
          ["Understands free speech", "Barely", "Yes, within its script", "Yes"],
          ["Available at 9 pm on a Sunday", "Yes", "Yes, inside your calling window", "Only if you staff it"],
          ["Asks follow-up questions", "No", "Yes", "Yes"],
          ["Same quality on call 1 and call 500", "Yes", "Yes", "Varies with fatigue and training"],
          ["Judgement, empathy, negotiation", "No", "Limited", "Best"],
          ["Cost grows with volume", "Slowly", "Per minute", "Per person hired"],
        ]}
      />
      <p>
        The practical split in most teams: the IVR stays for simple routing, the agent handles the first call and the repetitive follow-ups, and people handle the conversations that decide revenue or reputation.
      </p>

      <h2 id="how-to-pilot">How to run a pilot</h2>
      <Steps
        items={[
          { title: "Pick one narrow call type", body: "“Call new website enquiries and book a counselling call” is a pilot. “Automate our calling” is not." },
          { title: "Write the script and the outcome list", body: "Decide the four or five things every call must find out and the closed list of outcomes (booked, callback, not interested, wrong number, incomplete). Tie each outcome to an action." },
          { title: "Test on your own phones first", body: "Ten colleagues, different accents, noisy rooms, interruptions, silences, awkward questions. Fix the script before a single lead hears it." },
          { title: "Go live on a slice", body: "Send a fixed share of new leads to the agent and keep the rest on your current process, so you can compare like with like." },
          { title: "Listen every day", body: "Read or listen to a sample of calls daily in the first two weeks. Most early problems are script problems, and they are quick to fix." },
          { title: "Decide on outcomes", body: "Compare contact rate, qualified leads, booked meetings, transfers to humans and complaints. How natural the voice sounds matters less than whether the right leads reached your team." },
        ]}
      />

      <h2 id="vendor-questions">Questions to ask a vendor</h2>
      <ul>
        <li>Which languages are live in production today, and can I hear real call recordings in them?</li>
        <li>Who provides the phone lines and the numbers, and who handles DLT registration?</li>
        <li>What happens when the agent cannot hear the caller, or the caller goes silent?</li>
        <li>Can the agent transfer to a person mid-call, and what does the person see?</li>
        <li>How is a minute billed (per second, 30 seconds, full minute), and are unanswered calls charged? See our <Link href="/blog/ai-calling-cost-india/">AI calling cost guide</Link>.</li>
        <li>Where are recordings and transcripts stored, and who in my team can see them?</li>
        <li>What stops the system from calling the same person twice by mistake, or running up a bill overnight?</li>
      </ul>

      <WhereTelleoFits>
        <p>
          Telleo is an AI voice agent built for Indian businesses. Agents speak <strong>Hindi, English and Hinglish</strong> in production today; other Indian languages are set up with customers on request. Callers can interrupt, and a short “haan” or “okay” does not derail the agent. Phone lines are included, every call is transcribed (recording can be switched on for every call), and each call gets an outcome, a summary and a health check. See <Link href="/how-it-works/">how it works</Link> and the <Link href="/voices-and-languages/">voices and languages</Link>.
        </p>
        <p>
          The quickest test is a real call: dial <strong>+91 80356 14126</strong> and talk to an agent.
        </p>
      </WhereTelleoFits>

      <Sources
        items={[
          { label: "Google Cloud — Speech-to-Text: select a transcription model (telephony model description)", url: "https://docs.cloud.google.com/speech-to-text/docs/transcription-model", checked: "2026-09-25" },
          { label: "TRAI — Telecom Commercial Communications Customer Preference (Second Amendment) Regulations, 2025 (12 February 2025)", url: "https://trai.gov.in/sites/default/files/2025-02/Regulation_12022025.pdf", checked: "2026-09-25" },
          { label: "TRAI — Press Release No. 91/2026: clarifications on the 1600 and 140 series (10 July 2026)", url: "https://trai.gov.in/sites/default/files/2026-07/PR_No91of2026.pdf", checked: "2026-09-25" },
        ]}
      />
    </BlogShell>
  );
}
