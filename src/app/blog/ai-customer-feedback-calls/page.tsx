import Link from "next/link";
import { BlogShell, postMetadata, Table, WhereTelleoFits } from "@/components/BlogShell";

export const metadata = postMetadata("ai-customer-feedback-calls");

export default function Page() {
  return (
    <BlogShell
      slug="ai-customer-feedback-calls"
      takeaways={[
        "Ask about one identifiable experience and use neutral wording with a clearly explained scale.",
        "Keep the customer's stated rating separate from sentiment inferred from the conversation.",
        "A complaint needs a service owner; collecting a survey answer does not resolve it.",
      ]}
      toc={[
        { id: "scope", label: "Choose the experience to review" },
        { id: "questions", label: "Write neutral survey questions" },
        { id: "script", label: "A customer feedback script" },
        { id: "handoff", label: "Handle complaints and follow-up" },
        { id: "analysis", label: "Read the results carefully" },
        { id: "testing", label: "Survey quality checklist" },
        { id: "faq", label: "Frequently asked questions" },
      ]}
      faqs={[
        { q: "How do AI customer feedback calls work?", a: "A voice agent asks a short set of questions about a defined customer experience, records the answers and routes any requested follow-up. The survey needs approved wording, a clear scale if ratings are used and an owner for service problems." },
        { q: "Can sentiment analysis replace a satisfaction rating?", a: "No. Sentiment is an inferred interpretation of the conversation. A survey rating is an explicit answer to a stated question and scale. Keep them separate, and do not fill in a missing rating from an inferred positive or negative tone." },
        { q: "What should happen when a customer raises a complaint?", a: "Acknowledge the issue, stop pushing survey questions and offer the approved support route. Record the actual concern and whether follow-up was requested. Mark the complaint resolved only when the service process provides evidence of resolution." },
      ]}
    >
      <p>AI customer feedback calls can collect a short account of a recent experience, such as a delivery, service appointment or completed stay. The goal is to learn what happened and identify follow-up that the customer wants. A useful survey gives people room to be critical without turning their answer into another sales opportunity.</p>
      <p>This guide proposes a small survey workflow you can adapt. Its example questions and rating scale are editorial templates, not a validated research instrument or a claim about customer satisfaction results.</p>

      <h2 id="scope">Choose one experience to review</h2>
      <p>Start with a specific completed interaction and its identifier. For a delivery, use the relevant order or delivery record; for a service appointment, use the appointment record. If the customer has several recent interactions, make it clear which one the call concerns.</p>
      <p>Decide when the person will have enough experience to answer. Asking about installation quality before installation is complete produces a different answer from asking after the customer has used the product. Document the timing and keep it consistent within a comparison.</p>
      <p>Prepare the contact list using the customer&apos;s preferences and your team&apos;s review process. Set a limited retry policy and make declining the survey a normal outcome. Do not treat repeated contact as the only way to improve response counts.</p>

      <h2 id="questions">Write neutral survey questions</h2>
      <Table head={["Avoid", "Prefer", "Reason"]} rows={[
        ["How excellent was our service?", "How would you rate the service you received?", "Does not suggest a positive answer."],
        ["Was delivery quick and professional?", "How was the delivery timing? Then ask separately about the interaction.", "Keeps two experiences from being forced into one answer."],
        ["You were satisfied, right?", "What worked well, and what could we improve?", "Allows criticism without contradicting the agent."],
        ["Why did you give us such a low score?", "What was the main reason for that rating?", "Asks for context without disputing the rating."],
      ]} />
      <p>If you use numbers, say the endpoints before asking for a rating. For example: “On a scale from one to five, where one means very dissatisfied and five means very satisfied…” Keep the scale unchanged throughout the survey. Offer an open-ended answer or a skip when the person does not want to give a number.</p>

      <h2 id="script">A customer feedback script</h2>
      <blockquote>
        <p><strong>Agent:</strong> Hello, I&apos;m the AI assistant from Example Services about your installation yesterday. Would you like to answer two short feedback questions?</p>
        <p><strong>Customer:</strong> Okay.</p>
        <p><strong>Agent:</strong> On a scale from one to five, where one means very dissatisfied and five means very satisfied, how would you rate the installation experience?</p>
        <p><strong>Customer:</strong> Three. The installer was helpful, but arrived much later than expected.</p>
        <p><strong>Agent:</strong> Thank you for explaining. Would you like someone from the service team to follow up about the delay?</p>
        <p><strong>Customer:</strong> Yes, please.</p>
      </blockquote>
      <p>This fictional response contains a rating, a positive detail, a negative detail and a follow-up request. Preserve all four. Summarising it only as “negative customer” loses information, while asking for the reason again ignores an answer already given.</p>

      <h2 id="handoff">Separate feedback collection from complaint handling</h2>
      <p>Define outcomes such as Feedback_Collected, Support_Follow_Up_Requested, Survey_Declined, Wrong_Person and Incomplete. Store the rating and comments separately from the outcome so a support request does not erase the feedback already received.</p>
      <p>When the customer raises a problem, script the agent to acknowledge it and offer the approved support route. Do not promise a refund, replacement or resolution deadline unless the process authorises that exact action. A survey agent does not need to persuade someone that their complaint is minor.</p>
      <p>Telleo has configurable human transfer numbers and can record extracted answers on the call. Creating or updating a ticket in another support system needs a verified integration. Use the <Link href="/blog/ai-calling-crm-integration/">CRM workflow guide</Link> to plan the field mapping and recovery when an update fails.</p>

      <h2 id="analysis">Read the results without filling in missing answers</h2>
      <p>Report attempted contacts, reached customers, completed surveys and valid ratings separately. If someone completes the open-ended questions but declines a numerical rating, their comments still count as feedback; they should not receive a made-up score.</p>
      <p>For illustration, 30 valid ratings from 100 eligible contacts give a 30% rating-response rate. An average calculated from those 30 ratings describes those respondents. It does not establish what all 100 customers think. Keep that limitation visible when comparing periods or teams.</p>
      <p>Review the original answers behind each theme. If customers mention both delivery delays and helpful staff, retain both themes. Keep inferred sentiment in a separate field and use it to locate calls for review rather than to overwrite explicit ratings.</p>

      <h2 id="testing">Run a survey quality checklist</h2>
      <ul>
        <li>Test a skipped rating, a changed rating and an answer outside the stated scale.</li>
        <li>Check the agent accepts criticism without arguing or steering the customer toward a higher score.</li>
        <li>Test a service request before the first survey question is complete.</li>
        <li>Verify the recorded rating matches the final answer in the transcript.</li>
        <li>Confirm requested follow-ups reach an owner and remain open until the service team acts.</li>
      </ul>
      <WhereTelleoFits>
        <p>Telleo&apos;s <Link href="/use-cases/feedback-surveys/">feedback survey workflow</Link> supports scripted questions, extracted answers and custom outcomes. <Link href="/call-intelligence/">Call Intelligence</Link> can help review recorded conversations, with inferred analysis kept separate from the customer&apos;s actual survey answers.</p>
      </WhereTelleoFits>
    </BlogShell>
  );
}
