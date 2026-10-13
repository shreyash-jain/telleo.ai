import Link from "next/link";
import { BlogShell, postMetadata, Table, WhereTelleoFits } from "@/components/BlogShell";

export const metadata = postMetadata("sales-call-quality-scorecard");

export default function Page() {
  return (
    <BlogShell
      slug="sales-call-quality-scorecard"
      takeaways={[
        "Score observable sales behaviours and attach evidence instead of relying on a single overall impression.",
        "Use not applicable or not measurable when a call does not provide a fair scoring opportunity.",
        "Turn the review into one specific coaching action, then check it on comparable calls.",
      ]}
      toc={[
        { id: "purpose", label: "Separate process quality from outcome" },
        { id: "rubric", label: "A practical scorecard template" },
        { id: "example", label: "Work through a scoring example" },
        { id: "calibration", label: "Align reviewers on evidence" },
        { id: "coaching", label: "Use the score in coaching" },
        { id: "ai", label: "Review AI-assisted analysis" },
        { id: "faq", label: "Frequently asked questions" },
      ]}
      faqs={[
        { q: "What belongs in a sales call quality scorecard?", a: "Use a small set of observable behaviours, such as a clear opening, relevant discovery, accurate answers, handling questions and agreeing a next step. Define what each score means and keep evidence beside it. Adapt the rubric to the type of call." },
        { q: "Should every sales call use the same rubric?", a: "Keep common standards where useful, but do not score an appointment reminder as if it were a discovery call. Decide which criteria apply to each call type before reviewing, and exclude genuinely inapplicable criteria from the denominator." },
        { q: "Can Telleo analyse calls made by human sales reps?", a: "Yes. It can analyse supported recorded human calls or uploaded recordings. Automatic analysis requires CRM Intelligence to be enabled, a recording and the configured minimum duration, which defaults to 20 seconds. Human-call analysis is charged per minute of recording." },
        { q: "Is an AI-generated rep score a final performance judgement?", a: "Treat it as review assistance. Check the recording, transcript and evidence before using the result in a coaching or performance discussion. An incomplete recording, transcription error or mismatched rubric can make a score misleading." },
      ]}
    >
      <p>A sales call quality scorecard is a shared definition of what a useful customer conversation looks like. It gives reviewers specific behaviours to look for and gives the representative something concrete to improve. It should explain the score, not merely produce a number.</p>
      <p>The template below is a suggested coaching framework. It is designed for human sales conversations and can be adapted to your process. For technical problems in AI calls, such as silence or failed transfers, use the separate <Link href="/blog/measure-ai-call-quality/">AI call-quality measurement guide</Link>.</p>

      <h2 id="purpose">Separate process quality from the sales outcome</h2>
      <p>A representative can handle a conversation well and discover that the product does not fit. Another call can end with a meeting despite unanswered questions or an inaccurate promise. Record the commercial result separately from how the representative conducted the call.</p>
      <p>Choose the call type first: discovery, follow-up, objection discussion or appointment confirmation. Score only the behaviours the call gave the representative a reasonable opportunity to demonstrate. A voicemail does not provide evidence of discovery skill.</p>
      <p>Keep technical recording quality separate too. If part of the conversation is missing, mark the affected criterion not measurable. Do not turn an unavailable signal into a zero and then compare it with a complete recording.</p>

      <h2 id="rubric">A practical scorecard template</h2>
      <p>Start with a simple scale: zero means the behaviour was missed or contradicted; one means it was partially demonstrated; two means it was clearly demonstrated. Use not applicable when the criterion does not belong to this call type. This scale is an example, not a Telleo default.</p>
      <Table head={["Criterion", "Evidence for a clear demonstration", "Coaching prompt"]} rows={[
        ["Opening and purpose", "The rep explains the reason for calling and checks whether the timing works.", "Did the customer know why this conversation was happening?"],
        ["Needs discovery", "The rep asks a relevant question and uses the answer in the conversation.", "Which stated need changed the response?"],
        ["Accurate explanation", "The answer uses approved facts and acknowledges unknown information.", "Was anything promised without support?"],
        ["Question handling", "The rep addresses the customer's actual question before returning to the script.", "What remained unresolved?"],
        ["Next step", "The parties agree an action with an owner and enough timing detail to act.", "Could another teammate fulfil the agreed action?"],
      ]} />
      <p>Write examples of zero, one and two for each criterion using calls your team has reviewed. Attach a timestamp or transcript excerpt to each score. If two reviewers cannot explain their scores using the same definitions, revise the definitions before ranking representatives.</p>

      <h2 id="example">Work through a scoring example</h2>
      <p>Imagine a fictional discovery call. The rep gives a clear introduction, asks why the customer is evaluating the service and answers a pricing question accurately. When the customer asks about onboarding, the rep says the team will confirm, but never assigns that follow-up. The customer requests a demo and the rep ends with “someone will contact you”.</p>
      <p>A reviewer might score the first three criteria two each, question handling one and next step zero. That is seven out of ten on this example rubric. The evidence is the unresolved onboarding question and the missing follow-up owner, not a vague impression that the rep lacked confidence.</p>
      <p>Record the demo interest separately from a booked demo. A positive response does not create a calendar event. The coaching action could be: agree who will answer the open question and establish a specific next step before ending the call.</p>

      <h2 id="calibration">Align reviewers before comparing people</h2>
      <p>Ask two reviewers to score the same small set of calls independently. Compare the largest differences and return to the evidence. If one reviewer rewards talking time and another rewards concise answers, they are not applying the same rubric.</p>
      <p>Document decisions about ambiguous cases. For example, a caller who refuses further questions may make parts of discovery inapplicable. State that rule explicitly so it does not change depending on which representative is being reviewed.</p>
      <p>Sample across comparable call types and include ordinary calls, not only wins or complaints. Keep the reviewed-call count visible beside averages. A score based on one short call should not appear equally reliable as a review of a broader sample.</p>

      <h2 id="coaching">Turn the review into a behaviour to practise</h2>
      <ol>
        <li>Replay one specific moment and ask the representative what they were trying to achieve.</li>
        <li>Agree which observable behaviour would have helped the customer.</li>
        <li>Practise a revised response using the same situation.</li>
        <li>Choose comparable later calls to check whether the change appears.</li>
        <li>Record progress and any process obstacle the representative cannot fix alone.</li>
      </ol>
      <p>Keep the action small enough to practise. “Improve objection handling” is broad; “answer the timing question before returning to the demo pitch” is specific. If the missing answer comes from an outdated knowledge document, fix that document as well as coaching the rep.</p>

      <h2 id="ai">Review AI-assisted analysis as evidence support</h2>
      <p>Telleo Call Intelligence can provide summaries, objections, commitments, action items, rubric scores and coaching tips from recorded conversations. Its default rubric covers rapport, needs discovery, objection handling and next step secured, and the rubric is editable.</p>
      <p>Check analysis against the recording, particularly when names, amounts or mixed-language answers affect the score. Keep inferred sentiment and conversion likelihood distinct from observable behaviours. Neither establishes the customer&apos;s actual decision.</p>
      <p>Automatic analysis of human calls requires the feature to be enabled and an eligible recording. Verify that setup before comparing teams; otherwise differences in recording coverage can look like differences in performance.</p>
      <WhereTelleoFits>
        <p>Use <Link href="/call-intelligence/">Call Intelligence</Link> to support reviews of recorded human and AI conversations. Keep <Link href="/call-quality-monitoring/">AI call health</Link> as a separate operational check, and have reviewers own the final coaching interpretation.</p>
      </WhereTelleoFits>
    </BlogShell>
  );
}
