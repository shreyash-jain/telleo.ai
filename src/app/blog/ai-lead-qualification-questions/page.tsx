import Link from "next/link";
import { BlogShell, postMetadata, Table, WhereTelleoFits } from "@/components/BlogShell";

export const metadata = postMetadata("ai-lead-qualification-questions");

export default function Page() {
  return (
    <BlogShell
      slug="ai-lead-qualification-questions"
      takeaways={[
        "Define a qualified lead in observable terms before writing the agent's questions.",
        "Keep facts, missing answers and inferred ratings separate so a sales rep can verify the result.",
        "A clear outcome and an owned next step are more actionable than a score alone.",
      ]}
      toc={[
        { id: "definition", label: "Define qualification first" },
        { id: "questions", label: "Five useful question types" },
        { id: "script", label: "Example qualification script" },
        { id: "scoring", label: "Build an evidence-based scorecard" },
        { id: "routing", label: "Route outcomes to people" },
        { id: "measurement", label: "Check qualification accuracy" },
        { id: "faq", label: "Frequently asked questions" },
      ]}
      faqs={[
        { q: "What is AI lead qualification?", a: "It is a defined conversation in which a voice agent asks about a prospect's needs, records their answers and selects a next step using your criteria. It should make the sales handoff more useful without treating guesses as facts." },
        { q: "How many qualification questions should an AI ask?", a: "Start with the few questions that change routing or the next step. The five question types in this guide are a planning framework, not a requirement to ask five questions on every call. Skip information already supplied and prioritise the caller's own questions." },
        { q: "Is an AI lead rating enough to assign sales priority?", a: "Use it as a review signal alongside explicit answers and the agreed next step. A numerical rating does not prove purchase intent. Check whether your reps agree with the qualification and record why they reject a handoff." },
      ]}
    >
      <p>AI lead qualification uses a phone conversation to establish what a prospect needs and what should happen next. A useful system does three things separately: collects facts, evaluates them against your criteria and routes the result to a person or workflow.</p>
      <p>Before choosing a voice or writing an opening line, finish this sentence: “A lead is ready for our sales team when…” The answer should name observable conditions. “They sound interested” is hard to audit. “They need an online course we offer and have requested a counselling conversation” is much easier to check.</p>

      <h2 id="definition">Define qualification before writing questions</h2>
      <p>Create a short brief with the offer, service boundaries, useful next steps and disqualifying conditions. For example, a service business might need to establish that the prospect is in its service area and wants a service it actually provides. Budget might be useful later without being a mandatory first-call question.</p>
      <p>Keep “not a fit”, “not interested”, “not enough information” and “not reached” separate. Each requires a different response. An unanswered call tells you nothing about need; a buyer outside your service area may still be interested in the service.</p>
      <p>Document these distinctions with examples your sales team agrees on. Use those examples to review the agent after launch, rather than changing the definition of a qualified lead to match whatever it produces.</p>

      <h2 id="questions">Five question types worth considering</h2>
      <Table head={["Question type", "Example", "Use the answer to"]} rows={[
        ["Need", "What are you hoping to solve?", "Identify the relevant product or service."],
        ["Fit", "Which location or delivery mode would suit you?", "Check a genuine service constraint."],
        ["Timing", "When would you like to get started?", "Choose the appropriate next step."],
        ["Decision process", "Would anyone else like to join the discussion?", "Arrange a useful meeting without guessing authority."],
        ["Requested action", "Would you like a demo or an answer from our team?", "Record the prospect's preferred follow-up."],
      ]} />
      <p>Add a budget question when it changes what you can offer. Explain why you are asking and allow an unknown answer. Avoid collecting details that no one uses. Read the <Link href="/blog/ai-calling-for-admissions/">admissions playbook</Link> or <Link href="/blog/ai-calling-for-real-estate/">real estate playbook</Link> for examples of adapting this framework to a specific enquiry.</p>

      <h2 id="script">A short qualification script</h2>
      <p>This fictional service enquiry shows how to keep the call focused while making room for the prospect&apos;s question.</p>
      <blockquote>
        <p><strong>Agent:</strong> Hello, I&apos;m the AI assistant from Example Services, following up on your enquiry. Is now a good time?</p>
        <p><strong>Prospect:</strong> Yes. I need help setting up a demo for my team.</p>
        <p><strong>Agent:</strong> What would you like the demo to cover?</p>
        <p><strong>Prospect:</strong> Mainly reporting. Can we bring our manager?</p>
        <p><strong>Agent:</strong> Yes, your manager can join. Would you like our team to arrange a reporting demo?</p>
        <p><strong>Prospect:</strong> Yes, please contact me tomorrow to discuss times.</p>
      </blockquote>
      <p>The result is a demo interest signal and a callback request. It is not a booked demo. Preserve that distinction in both the summary and the outcome. Give the follow-up owner the prospect&apos;s words so they do not begin by asking what the enquiry was about.</p>

      <h2 id="scoring">Build a scorecard that preserves evidence</h2>
      <p>Use three columns in your review: criterion, evidence and status. A criterion such as service-area fit can be met, not met or unknown. Quote or summarise the caller&apos;s relevant answer in the evidence column. “Unknown” should remain visible even if another part of the conversation suggests strong interest.</p>
      <p>If you want a priority score, write down how each criterion affects it and test the rule on past calls your team has reviewed. Do not let a high inferred score override an explicit refusal or an unresolved service constraint. Keep the original answers available beside the score.</p>
      <p>Telleo returns a lead rating from one to ten as part of end-of-call analysis. Treat that rating as an inferred assessment, not as a custom scoring model you have configured or proof of purchase intent. Its extracted answers and transcript give your team the evidence to review it.</p>

      <h2 id="routing">Make every actionable outcome someone&apos;s responsibility</h2>
      <p>Define outcomes such as Sales_Conversation_Requested, Callback_Requested, Not_A_Fit, Not_Interested and Incomplete. Then specify which stop the workflow and which require a rep. Check assignment rules before launch: in Telleo, an existing owner is retained, and round-robin assignment depends on the list having the appropriate counsellor pool.</p>
      <p>Do not assume that a callback request produces a timed redial. Telleo preserves the request in the call analysis and transcript, but exact requested-time callbacks need a person or a separately managed process. Likewise, extraction answers belong to the call; mapping them into another CRM&apos;s lead fields requires an integration step.</p>

      <h2 id="measurement">Check whether the qualification is useful</h2>
      <p>Review a sample of both qualified and non-qualified calls. Ask a rep whether the outcome matches the conversation and whether the next step is clear. Looking only at handoffs misses prospects the agent incorrectly rejected.</p>
      <p>Track rep acceptance, missing required answers and incorrect outcomes alongside qualification rate. Define the denominator: qualified leads divided by connected conversations answers a different question from qualified leads divided by all eligible leads. Compare like-for-like cohorts and keep a reason for every disputed classification.</p>
      <WhereTelleoFits>
        <p>Use Telleo&apos;s <Link href="/use-cases/lead-qualification/">lead qualification workflow</Link> to combine extraction questions, custom dispositions and rep assignment. The <Link href="/blog/ai-calling-crm-integration/">CRM integration guide</Link> covers how to carry that outcome into a wider follow-up process.</p>
      </WhereTelleoFits>
    </BlogShell>
  );
}
