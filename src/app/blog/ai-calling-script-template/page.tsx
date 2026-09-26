import { BlogShell, postMetadata, Callout, Steps, Table, WhereTelleoFits, Sources } from "@/components/BlogShell";
import Link from "next/link";

export const metadata = postMetadata("ai-calling-script-template");

const preClass =
  "not-prose overflow-x-auto whitespace-pre-wrap rounded-2xl border border-line bg-paper p-5 font-mono text-[0.85rem] leading-relaxed text-slate-800";

export default function Page() {
  return (
    <BlogShell
      slug="ai-calling-script-template"
      takeaways={[
        "An AI calling script is instructions plus a few fixed lines, not a word-for-word telecaller script. Write it for the ear, not the eye.",
        "Open with who you are, why you are calling and a permission question. Then ask one question per turn.",
        "Give the agent a closed list of outcomes (dispositions), a list of facts it may use, short answers to common objections and explicit handoff rules.",
        "Close on a concrete day and time, read back once. Never let a call end on “we’ll get back to you”.",
        "For Hinglish, write Hindi in Devanagari and keep English business words in English. Romanised Hindi degrades speech quality.",
      ]}
      toc={[
        { id: "script-anatomy", label: "The parts of an AI calling script" },
        { id: "opening-line", label: "The opening line" },
        { id: "one-question", label: "One question per turn" },
        { id: "extraction-questions", label: "Extraction questions" },
        { id: "dispositions", label: "Dispositions: a closed list" },
        { id: "objections", label: "Objection handling" },
        { id: "handoff-rules", label: "Handoff rules" },
        { id: "closing", label: "Closing on a day and time" },
        { id: "what-not-to-write", label: "What not to write" },
        { id: "hinglish-tips", label: "Writing Hinglish scripts" },
        { id: "template-english", label: "Template: English lead qualification" },
        { id: "template-hinglish", label: "Template: Hinglish demo booking" },
        { id: "test-your-script", label: "Test before real leads hear it" },
      ]}
      faqs={[
        {
          q: "How long should an AI calling script be?",
          a: "Long enough to cover the goal, facts, questions, objections, handoffs and outcomes; short enough that every rule matters. As a rule of thumb, aim for about two pages. If yours is much longer, look for duplicated rules and facts the agent will never need.",
        },
        {
          q: "Should the agent say it is an AI?",
          a: "We recommend saying so in the opening line and always answering honestly when asked. The templates below do both.",
        },
        {
          q: "Can I reuse my telecallers’ script?",
          a: "Use it for content, not wording. Human scripts often contain long pitches and lists of options that sound fine from a person and robotic from an agent. Rewrite them as short turns with one question each.",
        },
        {
          q: "Should a Hinglish script be written in Roman letters?",
          a: "No. Write Hindi words in Devanagari and English words in English. Sarvam’s text-to-speech guidance says Romanised Hindi input significantly degrades output quality.",
        },
        {
          q: "How do I know if my script is working?",
          a: "Listen to the first 30 to 50 calls. Look for where callers get confused, interrupt, or hang up, and which dispositions come out wrong. Most fixes are one-line changes to the script.",
        },
      ]}
    >
      <p>
        A script for an AI calling agent is not a telecaller’s script. A person improvises around a script; an agent follows its instructions literally, and will read a whole list aloud if you let it.
      </p>
      <p>
        This guide covers each part of a good script, what to leave out, how to write natural Hinglish, and two full templates you can adapt.
      </p>

      <h2 id="script-anatomy">The parts of an AI calling script</h2>
      <Table
        head={["Part", "What it is"]}
        rows={[
          ["Role and goal", "Who the agent is and the one outcome the call is for"],
          ["Opening line", "A fixed first line: who, why, permission"],
          ["Facts it may use", "Everything it is allowed to say about you, such as batch dates and locations"],
          ["Extraction questions", "What every call must find out"],
          ["Objection answers", "Short replies to the most common pushbacks"],
          ["Handoff rules", "When to transfer to a person, and the bridge line"],
          ["Closing", "How to confirm the next step"],
          ["Dispositions", "The closed list of outcomes"],
          ["Never list", "Hard limits: no discounts, no promises of results"],
        ]}
      />

      <h2 id="opening-line">The opening line: who, why, permission</h2>
      <p>
        The first few seconds matter most. The opening should do three things: say who is calling, say why in terms the caller recognises, and ask permission to continue.
      </p>
      <Table
        head={["Weak opening", "Better opening"]}
        rows={[
          [
            "“Hello sir, I am calling from XYZ Academy, India’s leading institute for competitive exams with 15 years of excellence. How are you today?”",
            "“Hi Rohan, this is Priya, an AI assistant from XYZ Academy. You enquired about our weekend batch a few minutes ago. Is this a good time for two minutes?”",
          ],
        ]}
      />
      <p>
        The better version uses the caller’s name, reminds them what they did, and gives them control. If the answer is “not now”, the agent should get a specific callback time and end politely.
      </p>

      <h2 id="one-question">One question per turn</h2>
      <p>
        On the phone, people answer the last question they heard. Ask two and you get half an answer. Keep each turn to one or two short sentences ending in a single question.
      </p>
      <ul>
        <li><strong>Instead of:</strong> “Can you tell me which course you’re interested in, when you want to start, and whether you prefer online or offline?”</li>
        <li><strong>Write:</strong> “Which course are you looking at?” Then, after the answer: “And when are you hoping to start?”</li>
      </ul>
      <p>
        Tell the agent this in the script itself: “Ask one question per turn. Keep replies to one or two sentences.” It is often the change that helps a script most.
      </p>

      <h2 id="extraction-questions">Extraction questions: decide what you need first</h2>
      <p>
        Before writing a line, list the answers your team needs to act on a lead. Those become the extraction questions and the fields in the post-call summary.
      </p>
      <ul>
        <li>Keep it to four to six questions. More than that feels like an interrogation.</li>
        <li>Order them by importance, so a caller who hangs up early has still answered the key ones.</li>
        <li>Tell the agent to skip any question the caller has already answered on the form or earlier in the call.</li>
        <li>Say what a usable answer looks like: “a month or a date”, “a city name”, “a range in rupees”.</li>
      </ul>

      <h2 id="dispositions">Dispositions: a closed list, each tied to an action</h2>
      <p>
        A disposition is the outcome of the call. Give the agent a fixed list and ask it to choose exactly one. Free-text outcomes like “seems interested, maybe later” cannot trigger anything.
      </p>
      <Table
        head={["Disposition", "Meaning", "What happens next"]}
        rows={[
          ["Booked", "Agreed a day and time for the next step", "Confirmation on WhatsApp, meeting on the calendar"],
          ["Callback", "Asked to be called at a stated time", "Assigned to a person, with the caller's words in the transcript"],
          ["Qualified, transfer", "Ready now and handed to a person", "Rep gets the summary before picking up"],
          ["Not interested", "Clearly declined", "Stop calling"],
          ["Not a fit", "Need or budget outside what you offer", "Stop, or move to a nurture list"],
          ["Wrong number", "Not the person who enquired", "Never retry"],
          ["Do not call", "Asked not to be contacted again", "Stop, and keep the number out of every future list"],
          ["Incomplete", "No real conversation: silence, voicemail, dropped", "Retry on schedule"],
        ]}
      />
      <Callout tone="tip" title="Always include “Incomplete”">
        <p>Without it, a call where nobody spoke gets forced into “Not interested”, and a perfectly good lead is dropped.</p>
      </Callout>

      <h2 id="objections">Objection handling</h2>
      <p>
        List the objections your team hears most, and give each a reply of no more than two sentences that ends by returning to the conversation. Common ones:
      </p>
      <ul>
        <li><strong>“Just send me the details.”</strong> Agree, then ask one question so you send the right thing.</li>
        <li><strong>“It’s too expensive.”</strong> Acknowledge, do not argue, and offer a person who can discuss options.</li>
        <li><strong>“Who gave you my number?”</strong> Say exactly where the enquiry came from, and offer not to call again.</li>
        <li><strong>“Are you a robot?”</strong> Say yes, plainly, and say what you can help with.</li>
      </ul>
      <p>
        Add a rule for persistence: if the caller pushes back twice on the same point, stop and offer a callback from a person or a WhatsApp with the details. And a hard rule: never invent discounts, offers or guarantees.
      </p>

      <h2 id="handoff-rules">Handoff rules</h2>
      <p>Write the triggers as a plain list. The agent should transfer to a person when the caller:</p>
      <ul>
        <li>asks for a person;</li>
        <li>wants to pay, enrol or book right now;</li>
        <li>asks about refunds, discounts, exceptions or anything not in the facts list;</li>
        <li>is upset or has a complaint.</li>
      </ul>
      <p>
        Give the agent a bridge line to say before transferring, and tell it what to do when nobody is available: book a specific callback slot instead.
      </p>

      <h2 id="closing">Closing on a day and time</h2>
      <p>
        “Someone from our team will get back to you” is not a close. A close is a specific next step with a day and time, read back once:
      </p>
      <ul>
        <li>“So that’s Thursday at 5 pm with a counsellor. You’ll get a WhatsApp confirmation now.”</li>
      </ul>
      <p>
        If the caller says “kal shaam” or “next week sometime”, the agent should ask one more question to pin it down: “Tomorrow around 6 or around 7?” Offer two options at most.
      </p>

      <h2 id="what-not-to-write">What not to write</h2>
      <ul>
        <li><strong>Bullet lists meant to be spoken.</strong> “We offer: one, the regular batch; two, the weekend batch; three…” sounds robotic. Offer two options, or ask a question that narrows it down.</li>
        <li><strong>Long monologues.</strong> Company history, awards and full course descriptions belong on WhatsApp, not on the call.</li>
        <li><strong>Echoing answers.</strong> “Okay, so you scored 94 percent and you want to start in June” is one of the quickest ways to sound like a bot. Tell the agent not to repeat answers back, except the booked day and time or a phone number, once.</li>
        <li><strong>Literary Hindi.</strong> Nobody on a phone says “कृपया अपना बहुमूल्य समय प्रदान करें”. Write the way your best telecaller speaks.</li>
        <li><strong>Symbols and shorthand.</strong> “₹5K”, “w/e batch”, “approx.” and URLs are read out oddly. Write them as they should be spoken.</li>
        <li><strong>Placeholders that might be empty.</strong> If the form’s “course” field is sometimes blank, give the agent a fallback line.</li>
      </ul>

      <h2 id="hinglish-tips">Writing Hinglish scripts</h2>
      <p>
        Many callers mix Hindi and English in the same sentence. Your script can too, and the way you write it affects how the voice sounds.
      </p>
      <ul>
        <li><strong>Hindi in Devanagari, English words in English.</strong> Sarvam’s text-to-speech guidance is direct: write English words in English script and Hindi words in Devanagari. It also warns that Romanised or transliterated Indian-language input “significantly degrades output quality”.</li>
        <li><strong>Keep everyday English words in English:</strong> fees, admission, batch, demo, class, online, WhatsApp, counsellor. Translating them makes the agent sound stiff.</li>
        <li><strong>Match verbs to the voice’s gender.</strong> A female voice says “मैं बात कर रही हूँ”; a male voice says “मैं बात कर रहा हूँ”. Getting this wrong is instantly noticeable.</li>
        <li><strong>Don’t guess the caller’s gender.</strong> Use the name with “जी” (“Rohan जी”) rather than sir or ma’am when you are not sure.</li>
        <li><strong>Short sentences, clear punctuation.</strong> Sarvam recommends breaking long sentences up, ending Hindi sentences with “।”, and using commas in numbers over four digits (10,000, not 10000).</li>
      </ul>
      <Table
        head={["Textbook Hindi (avoid)", "Phone Hindi (use)"]}
        rows={[
          ["क्या आप निःशुल्क परीक्षण कक्षा में सम्मिलित होना चाहेंगे?", "क्या आप free demo class attend करना चाहेंगे?"],
          ["आपका पंजीकरण सफलतापूर्वक हो गया है।", "आपका registration हो गया है।"],
          ["कृपया प्रतीक्षा करें, मैं आपको परामर्शदाता से जोड़ रही हूँ।", "एक minute, मैं आपको counsellor से connect कर रही हूँ।"],
        ]}
      />

      <h2 id="template-english">Template 1: English lead qualification</h2>
      <p>
        Replace the double-brace fields with your form fields and the facts with your own. Quoted lines are said as written; the rest are instructions.
      </p>
      <pre className={preClass}>{`ROLE AND GOAL
You are Priya, an AI assistant calling for {{company}}.
{{leadName}} enquired about {{enquiry}} on our website.
Goal: check they are a fit and book a counsellor call.
One question per turn. Replies of one or two sentences.

OPENING LINE (say exactly)
"Hi {{leadName}}, this is Priya, an AI assistant from
{{company}}, calling about your enquiry for {{enquiry}}.
Is this a good time for two minutes?"
If not: get a day and time to call back, confirm it
once, and end politely.

QUESTIONS (in order; skip any already answered)
1. What made you look into {{enquiry}} now?
2. When are you hoping to start?
3. Is this for yourself or someone else?
4. Which city are you in?
5. Do you have a budget range in mind?

FACTS YOU MAY USE (example - replace with yours)
- New batches start on the 1st and 15th of each month.
- Classes run online and at our Pune centre.
- A counsellor shares exact fees.
For anything else, say: "Let me have a counsellor
confirm that for you."

OBJECTIONS
"Just send me the details."
  -> "Sure, I'll WhatsApp them. So I send the right
     brochure, when are you hoping to start?"
"It's too expensive."
  -> "I understand. A counsellor can walk you through
     the options. Shall I book a short call?"
"Who gave you my number?"
  -> "You filled in our enquiry form for {{enquiry}}.
     If you'd rather not get calls, we won't call again."
"Are you a robot?"
  -> "Yes, I'm an AI assistant for {{company}}. I can
     answer basic questions and book a counsellor."
Two pushbacks on the same point: stop and offer a
counsellor callback.

HANDOFF
Transfer if the caller asks for a person, wants to
enrol or pay today, has a complaint, or asks about
discounts or refunds. Say first: "I'm connecting you
to a counsellor now. Please stay on the line."
If no one is free, book a callback slot instead.

CLOSING
Book a specific day and time. Read it back once:
"So that's Thursday at 5 pm. You'll get a WhatsApp
confirmation shortly." Thank them and end the call.

DISPOSITIONS (choose exactly one)
Booked | Callback | Qualified, transfer |
Not interested | Not a fit | Wrong number |
Do not call | Incomplete

NEVER
- Promise discounts, results, placements or refunds.
- Repeat answers back, except the booked day and time.
- Read out lists. Offer at most two options at a time.`}</pre>

      <h2 id="template-hinglish">Template 2: Hinglish demo-class booking</h2>
      <p>
        Instructions can stay in English; the spoken lines are Hinglish. This one uses a female voice, so first-person verbs are feminine.
      </p>
      <pre className={preClass}>{`ROLE AND GOAL
You are Neha, a female AI assistant calling for
{{company}}. {{leadName}} asked about a free demo class
for {{course}}. Goal: book the demo for a specific day
and time. Hindi in Devanagari; English words (demo,
class, batch, fees, online, WhatsApp) in English.
Feminine verbs (कर रही हूँ). Address the caller as
"{{leadName}} जी". One question per turn.

OPENING LINE (say exactly)
"नमस्ते {{leadName}} जी, मैं {{company}} की तरफ़ से Neha
बोल रही हूँ। मैं एक AI assistant हूँ। आपने {{course}} के
free demo class के लिए enquiry की थी। क्या अभी दो मिनट
बात हो सकती है?"
If busy: "कोई बात नहीं। हमारी team आपको कब call करे, कल सुबह
या शाम?" Confirm the time once and end.

QUESTIONS (one at a time; skip what's answered)
1. "Demo किसके लिए है, आपके लिए या बच्चे के लिए?"
2. (only for a child) "बच्चे अभी किस class में हैं?"
3. "Online demo ठीक रहेगा, या आप centre आना चाहेंगे?"
4. "इस हफ़्ते कौन सा दिन ठीक रहेगा?"
5. "उस दिन सुबह ठीक रहेगा या शाम?"
Offer at most two slots: "शनिवार सुबह ग्यारह बजे या
शाम पाँच बजे, कौन सा time ठीक रहेगा?"

FACTS YOU MAY USE (example - replace with yours)
- Demo class free है, online या centre पर।
- Fees batch के हिसाब से अलग होती है; counsellor बताएँगे।

OBJECTIONS
"बस WhatsApp पर details भेज दीजिए।"
  -> "ज़रूर, मैं अभी WhatsApp कर देती हूँ। साथ में demo
     का time भी fix कर दें? शनिवार ठीक रहेगा?"
"Fees कितनी है?"
  -> "Fees batch के हिसाब से अलग होती है, counsellor
     demo के बाद पूरी details बता देंगे। Demo कब रखें?"
"क्या आप robot हैं?"
  -> "जी, मैं {{company}} की AI assistant हूँ। Demo book
     करने में मदद कर सकती हूँ।"
Two no's: don't push. Offer the details on WhatsApp
and end politely.

HANDOFF
Transfer if the caller asks for a person, asks about
scholarships or refunds, or wants to enrol today.
Bridge line: "मैं आपको अभी counsellor से connect कर
रही हूँ, please line पर बने रहिए।"

CLOSING
Read back once: "तो आपका demo शनिवार, सुबह ग्यारह बजे
पक्का है। Link मैं WhatsApp पर भेज रही हूँ।"
Then: "धन्यवाद {{leadName}} जी, आपका दिन अच्छा रहे।"

DISPOSITIONS (choose exactly one)
Demo booked | Callback | Not interested |
Already joined elsewhere | Wrong number |
Do not call | Incomplete`}</pre>

      <h2 id="test-your-script">Test before real leads hear it</h2>
      <p>
        Read the script aloud, then call the agent yourself and be a difficult caller: interrupt, go silent, answer two questions at once, say “kal shaam”. After launch, check the first 30 to 50 calls for wrong dispositions and the turn where callers drop off. For how the pieces work on a live call, see <Link href="/blog/what-is-an-ai-voice-agent/">what an AI voice agent is</Link>.
      </p>

      <WhereTelleoFits>
        <p>
          In Telleo’s no-code <Link href="/agent-builder/">agent builder</Link>, the parts of this guide map to its fields: opening line, persona and script (which holds the role, the questions to ask, facts, objection answers, handoff rules, closing and never list), extraction questions (what the post-call analysis pulls out; the live agent asks what is in the script), dispositions, handoff numbers, maximum call length and booking page. The agent knows the lead’s name and form fields through placeholders like <strong>{"{{leadName}}"}</strong>.
        </p>
        <p>
          AI-assisted scripting can draft a script from a plain-language brief, score it against a live-call rubric, apply suggested fixes, and revise it from real post-call feedback. Agents speak Hindi, English and Hinglish in production, with Hindi written in Devanagari and English business words kept in English. See the <Link href="/voices-and-languages/">voices and languages</Link>.
        </p>
      </WhereTelleoFits>

      <Sources
        items={[
          { label: "Sarvam AI — Best practices for writing text for TTS (2026)", url: "https://docs.sarvam.ai/api/api-guides-tutorials/text-to-speech/best-practices", checked: "2026-09-25" },
        ]}
      />
    </BlogShell>
  );
}
