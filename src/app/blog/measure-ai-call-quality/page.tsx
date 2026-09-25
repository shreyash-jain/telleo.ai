import { BlogShell, postMetadata, Callout, Steps, Table, WhereTelleoFits, Sources } from "@/components/BlogShell";
import Link from "next/link";

export const metadata = postMetadata("measure-ai-call-quality");

const CHECKED = "2026-09-25";

export default function Page() {
  return (
    <BlogShell
      slug="measure-ai-call-quality"
      takeaways={[
        "Measure two things: the funnel (connect, conversation, qualified, booked) and the health of each conversation (silences, talk-over, repeats, missed answers).",
        "Write down what counts as a connect, a qualified lead and a booking before you count anything. Most bad numbers come from loose definitions.",
        "Cost per qualified lead, not cost per minute, is the number that tells you whether AI calling is paying off.",
        "Listen to a structured sample every week: random calls, flagged calls and the shortest and longest calls, scored against one rubric.",
        "Use the same rubric on your human team’s calls, so you compare like with like.",
      ]}
      toc={[
        { id: "define-first", label: "Define outcomes before you count" },
        { id: "funnel", label: "The funnel: seven operational metrics" },
        { id: "health", label: "Conversation-health signals" },
        { id: "weekly-listening", label: "A weekly listening routine" },
        { id: "rubric", label: "Build a QA rubric" },
        { id: "human-calls", label: "Use the same tools on human calls" },
        { id: "traps", label: "Mistakes that make the numbers lie" },
      ]}
      faqs={[
        {
          q: "What is a good connect rate for AI calls?",
          a: "We don’t quote a benchmark, because connect rates depend mostly on the lead source, how fresh the leads are, the time of day and the caller ID. Measure your own baseline over two to four weeks, and compare the AI agent with your human team on the same kind of leads at the same times.",
        },
        {
          q: "How many AI calls should I listen to each week?",
          a: "Enough to see patterns. For most teams that is 20 to 40 calls a week: a random sample, every call flagged as a problem, and the shortest and longest calls. Score each against the same rubric, and fix the one or two most common problems before listening again.",
        },
        {
          q: "What is dead air on an AI call and how do I measure it?",
          a: "Dead air is silence where the caller expects the agent to speak, usually after they finish a sentence. Measure the gap between the end of the caller’s speech and the start of the agent’s reply. Track the longest gap per call and the number of gaps above a threshold you set after listening to some calls.",
        },
        {
          q: "How do I calculate cost per qualified lead for AI calling?",
          a: "Add up everything you spent in the period (call minutes, platform minimums, telephony, number rental, DLT, analysis fees and GST) and divide by the number of leads that met your written definition of qualified in the same period. Use the same formula for your human team, including salaries and tools.",
        },
        {
          q: "Can I use the same QA rubric for human and AI calls?",
          a: "Yes, and you should. Score opening, discovery, accuracy, listening, objection handling, next step and compliance for both. Some items will matter more for one than the other, but a shared rubric is the only fair way to compare them.",
        },
      ]}
    >
      <p>
        Two numbers get quoted most about AI calling, and both mislead. “Calls made” measures activity, not results.
        “Accuracy” usually means how well the speech recognition did on a test set, which is not your callers on your
        phone lines.
      </p>
      <p>
        This post covers the numbers that matter: a short funnel of operational metrics, a set of conversation-health
        signals that show <em>why</em> the funnel looks the way it does, and a weekly routine that turns both into fixes.
        It applies to any AI calling setup, and most of it applies to human calling too. We give formulas, not
        benchmarks, because your baseline is the only one that counts.
      </p>

      <h2 id="define-first">Define every outcome before you count it</h2>
      <p>Most arguments about AI calling results are really arguments about definitions. Write these down first:</p>
      <ul>
        <li>
          <strong>Connected:</strong> a person answered and spoke. Voicemail, IVR menus and calls where nobody said
          anything are not connects.
        </li>
        <li>
          <strong>Conversation:</strong> the person engaged, for example by answering at least one of the agent’s
          questions.
        </li>
        <li>
          <strong>Qualified:</strong> your exact criteria, such as budget in range, course of interest, city and timeline.
          Not the agent’s impression.
        </li>
        <li>
          <strong>Booked:</strong> a meeting, visit or demo with a specific day and time agreed. “Call me next week” is not
          a booking.
        </li>
        <li>
          <strong>Incomplete:</strong> a call where the person said nothing. Keep these apart from “not interested”, or you
          will blame the script for what is really a dialling or voicemail problem.
        </li>
      </ul>

      <h2 id="funnel">The funnel: seven operational metrics</h2>
      <Table
        head={["Metric", "Formula", "What it tells you"]}
        rows={[
          ["Connect rate", "Connected calls ÷ dial attempts (also track connected leads ÷ leads dialled)", "Lead quality, freshness, timing and caller ID. Rarely the script."],
          ["Conversation rate", "Conversations ÷ connected calls", "Whether the opening line works. A low number means people hang up early."],
          ["Talk time", "Median and spread of connected call length, per outcome", "Long qualified calls are fine. Long “not interested” calls mean the agent isn’t letting go."],
          ["Qualified rate", "Qualified leads ÷ conversations", "Whether the agent asks the right questions and the lead source fits"],
          ["Booking rate", "Bookings with a set day and time ÷ qualified leads", "Whether the agent asks for the next step clearly"],
          ["Transfer success", "Transfers answered by a person ÷ transfers attempted", "Whether your team is actually available for hot leads"],
          ["Cost per qualified lead", "Total spend in the period ÷ qualified leads in the period", "Whether the whole thing pays off"],
        ]}
      />
      <p>
        Use the median talk time, not the average. A handful of very long calls can hide a pattern where most calls end
        in the first few seconds.
      </p>
      <p>
        For cost per qualified lead, include everything: call minutes, monthly minimums, telephony, number rental, DLT,
        analysis fees and GST. Also count the retries. A lead that takes four attempts to connect costs four attempts.
      </p>
      <Callout tone="tip" title="The arithmetic, with made-up numbers">
        <p>
          Say you dial 2,000 leads in a month. 900 connect, 600 turn into conversations, 150 qualify and 60 book. The total
          bill is ₹30,000. Then the connect rate is 45%, conversation rate 67%, qualified rate 25%, booking rate 40%, and
          cost per qualified lead ₹200. These numbers are invented to show the maths. They are not a benchmark.
        </p>
      </Callout>

      <h2 id="health">Conversation-health signals</h2>
      <p>
        The funnel tells you <em>where</em> leads drop out. These signals tell you <em>why</em>. Most can be measured
        from call timings and the transcript.
      </p>
      <ul>
        <li>
          <strong>Dead air.</strong> Silence where the caller expects a reply. Measure the gap between the end of the
          caller’s speech and the start of the agent’s reply. Track the longest gap per call. Callers on a phone line
          assume a long silence means the call dropped, and start saying “hello?”.
        </li>
        <li>
          <strong>Talk-over and barge-in handling.</strong> Look for both voices at once. There are two failures: the agent
          keeps talking after a real interruption, or it stops mid-sentence for every “haan”. Both show up when you listen.
        </li>
        <li>
          <strong>Repeated questions and repeated lines.</strong> The agent asks something it already asked, or repeats
          a sentence. Search transcripts for duplicate agent sentences in the same call.
        </li>
        <li>
          <strong>Missed answers.</strong> The caller answered but the field is empty, or it holds the wrong value.
          Compare the transcript with the captured fields on a sample. Short answers are the riskiest. In the Voice of India
          speech-recognition benchmark, word error rates for clips under two seconds were far higher than for clips over
          five seconds (for example 18.74% against 10.45% for Amazon’s system).
        </li>
        <li>
          <strong>Voicemail and IVR mistakes.</strong> Calls marked “not interested” where only a machine spoke, or the
          agent talking to a voicemail greeting. These inflate your failure rate and waste minutes.
        </li>
        <li>
          <strong>Early hang-ups.</strong> The share of connected calls that end within the first few seconds after the
          opening line. This is the clearest test of your opening.
        </li>
        <li>
          <strong>Transfer failures.</strong> A transfer attempted and not answered, or answered with no context. A
          qualified lead left on hold is worse than no transfer at all.
        </li>
      </ul>
      <Callout tone="warn" title="Very short calls are also a compliance signal">
        <p>
          TRAI’s February 2025 amendment tells telecom operators to analyse call patterns such as unusually high call
          volumes, short call durations and low ratios of incoming to outgoing calls, to spot spammers. A campaign with
          lots of very short calls is a quality problem, and it can also look like spam to the network.
        </p>
      </Callout>

      <h2 id="weekly-listening">A weekly listening routine</h2>
      <p>Dashboards tell you something is wrong. Listening tells you what. A routine that fits in about two hours a week:</p>
      <Steps
        items={[
          { title: "Pull a structured sample", body: "Take 10 random connected calls, every call flagged as a problem, the five shortest and five longest connected calls, and two or three calls from each outcome. Aim for 20 to 40 calls." },
          { title: "Listen with the transcript open", body: "Listen to the audio, not just the transcript. Silences, talk-over, tone and mispronunciations don’t show up in text." },
          { title: "Score against the rubric", body: "Use the same rubric every week (below), and write one line on the biggest problem in each call." },
          { title: "Pick one or two fixes", body: "Group the problems and fix the most common one or two: the opening line, a missing question, an objection the agent handles badly, a word it mispronounces." },
          { title: "Change one thing at a time", body: "If you change the script and the lead source in the same week, you won’t know which one moved the numbers." },
          { title: "Re-measure next week", body: "Check the funnel metric the fix was meant to move, and listen to calls where the problem used to happen." },
        ]}
      />

      <h2 id="rubric">Build a QA rubric</h2>
      <p>
        Keep it short enough to score a call in two minutes. Score each item 0 (missed), 1 (partly) or 2 (done well), and
        write down what each score means for your business so two people give the same call the same score.
      </p>
      <Table
        head={["Criterion", "Question to ask"]}
        rows={[
          ["Opening", "Did it say who is calling and why, clearly, within the first sentence or two?"],
          ["Discovery", "Did it ask every required question, and follow up on vague answers?"],
          ["Accuracy", "Did it state only correct facts, prices and dates, and admit when it didn’t know?"],
          ["Listening", "Did it handle interruptions and short answers, without repeating itself or talking over the caller?"],
          ["Objections", "Did it address the objection the caller raised, rather than repeat the pitch?"],
          ["Next step", "Did it secure a specific next step: a booking, a transfer or a callback time?"],
          ["Compliance", "Was the call within your calling window, and did it respect “don’t call me” and any required disclosures?"],
          ["Data captured", "Do the captured fields match what the caller actually said?"],
        ]}
      />

      <h2 id="human-calls">Use the same tools on your human calls</h2>
      <p>
        Call-intelligence tools that transcribe and score calls are not only for AI agents. If you run the same rubric
        on your telecallers’ calls, you get three things:
      </p>
      <ul>
        <li>
          <strong>A fair comparison.</strong> AI and human calls scored on the same criteria, on similar leads, at similar
          times. Humans often get the hotter leads, so compare like with like.
        </li>
        <li>
          <strong>Coaching material.</strong> Talk ratio, objections raised and whether they were handled, and whether the
          call ended with a next step. These point to specific coaching topics for each rep.
        </li>
        <li>
          <strong>Better scripts.</strong> The best human calls show the phrasing and objection handling your AI agent
          should use. The worst AI calls show where a human handoff should happen sooner.
        </li>
      </ul>

      <h2 id="traps">Mistakes that make the numbers lie</h2>
      <ul>
        <li><strong>Counting voicemails as connects.</strong> This inflates connect rate and deflates conversation rate.</li>
        <li><strong>Averages instead of medians.</strong> Averages hide the many very short calls.</li>
        <li><strong>Treating “not measured” as zero.</strong> A signal that wasn’t captured is unknown, not perfect.</li>
        <li><strong>Small samples.</strong> A week with 30 conversations can swing either way. Look at trends over several weeks.</li>
        <li><strong>Changing several things at once.</strong> Script, lead source, calling hours and voice all move results.</li>
        <li><strong>Judging by the dashboard alone.</strong> A call can score “qualified” and still sound bad enough to lose the lead.</li>
      </ul>

      <WhereTelleoFits>
        <p>
          Every Telleo AI call gets a <strong>green, amber or red health verdict</strong> with a plain headline. For example:
          the agent could not hear the caller, a long silence, caller answers were discarded, the agent kept restarting a
          reply, voice synthesis stalled, probably an answering machine, a failed transfer or slow responses. A signal
          that could not be measured shows as “not measured”, never as zero. Every call has a transcript and timings, and
          recording can be switched on for every call. The call log has search, filters and export. See{" "}
          <Link href="/call-quality-monitoring/">call health and QA</Link>.
        </p>
        <p>
          After each call you get a disposition from your own list, a summary, a lead rating and the answers captured.{" "}
          <Link href="/call-intelligence/">Call intelligence</Link> is free on AI calls. It also works on your team’s
          human calls or uploaded recordings, charged per minute, and scores reps against a rubric you can edit.
        </p>
      </WhereTelleoFits>

      <Sources
        items={[
          { label: "PIB — TRAI Strengthens Consumer Protection with Amendments to TCCCPR, 2018 (12 Feb 2025)", url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2102413", checked: CHECKED },
          { label: "Bhogale et al. — Voice of India: A Large-Scale Benchmark for Real-World Speech Recognition in India, arXiv 2604.19151 (v4, July 2026)", url: "https://arxiv.org/abs/2604.19151", checked: CHECKED },
        ]}
      />
    </BlogShell>
  );
}
