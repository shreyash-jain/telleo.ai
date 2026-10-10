import Link from "next/link";
import { BlogShell, postMetadata, Table, WhereTelleoFits } from "@/components/BlogShell";

export const metadata = postMetadata("ai-calling-for-real-estate");

export default function Page() {
  return (
    <BlogShell
      slug="ai-calling-for-real-estate"
      takeaways={[
        "An effective property enquiry call establishes location, requirement, budget range and timeline before offering a visit.",
        "Give the agent approved project facts; route availability, negotiated prices and contractual questions to your team.",
        "Count a site visit as booked only when a specific time is agreed and the booking succeeds.",
      ]}
      toc={[
        { id: "brief", label: "Prepare the project brief" },
        { id: "qualification", label: "Qualify without interrogating" },
        { id: "script", label: "Sample property enquiry call" },
        { id: "booking", label: "Turn interest into a site visit" },
        { id: "review", label: "Measure visits and handoffs" },
        { id: "faq", label: "Frequently asked questions" },
      ]}
      faqs={[
        { q: "What should an AI real estate calling agent ask?", a: "Start with the enquired project or area, property requirement, indicative budget and purchase timeline. Ask about a site visit only after checking fit. Do not require every answer before helping someone who already wants to speak to a sales representative." },
        { q: "Can the AI negotiate a property price?", a: "Keep negotiated offers and commitments with an authorised sales representative. The agent can explain an approved indicative range and record the buyer's question, but its script should not authorise it to invent discounts or guarantee availability." },
        { q: "Does every interested lead count as a booked site visit?", a: "No. Track interest, a requested visit, a confirmed booking and actual attendance separately. A buyer saying 'maybe this weekend' has not agreed a specific appointment." },
      ]}
    >
      <p>AI calling for real estate can handle the first conversation after a property enquiry: confirm what the buyer wants, check whether the project is relevant and arrange a sales conversation or site visit. The call needs to produce usable context, not simply label everyone who answers as a hot lead.</p>
      <p>This suggested workflow is for enquiries your team has reviewed as eligible for follow-up. Start with one project and one source of enquiries so the agent has a clear reason for calling. Treat the sample conversation as a template, not a claim about conversion results.</p>

      <h2 id="brief">Prepare a project brief the agent can safely use</h2>
      <p>Include the project name, area, approved unit types, visit location, sales office hours and the fee or price wording your team has approved. Give every changing fact an owner and a review date. If inventory is not connected to a current source, the agent should say that a representative will confirm availability.</p>
      <p>Write explicit handoff rules for questions about contractual terms, investment returns, loan approval, possession commitments and special offers. A conversational answer should not become a promise that the sales team cannot honour. Remove outdated campaign copy from the script when a promotion ends.</p>
      <p>Separate buyers from other callers. A broker partnership enquiry, a tenant request and a purchaser asking about an existing booking need different routes. They should not all enter the same site-visit sequence.</p>

      <h2 id="qualification">Qualify without turning the call into a form</h2>
      <Table head={["Question", "What to record", "What not to infer"]} rows={[
        ["Are you looking in this area or considering other locations?", "Location preference and flexibility", "That an enquiry proves location fit"],
        ["What kind of home are you looking for?", "Unit type and stated requirements", "Household size from a name or voice"],
        ["Do you have a budget range in mind?", "The buyer's range, or unknown", "Loan eligibility or purchasing power"],
        ["When would you like to make a decision?", "The stated timeline", "Urgency because the buyer answered quickly"],
        ["Would a site visit help you decide?", "Visit interest and proposed timing", "A confirmed appointment from a vague yes"],
      ]} />
      <p>Let the buyer decline a question. A missing budget is a reason to mark the field unknown, not to fabricate a range. If someone asks to visit immediately, prioritise that request over completing a qualification checklist. See the <Link href="/blog/ai-lead-qualification-questions/">lead qualification guide</Link> for outcome rules that preserve missing information.</p>

      <h2 id="script">A sample property enquiry call</h2>
      <p>Use the following fictional example as a starting point, then replace the project and visit options with verified details.</p>
      <blockquote>
        <p><strong>Agent:</strong> Hello, I&apos;m the AI assistant from Example Homes, calling about your two-bedroom apartment enquiry. Is this a convenient time?</p>
        <p><strong>Buyer:</strong> Yes, but I need something close to my office.</p>
        <p><strong>Agent:</strong> Which area would work best for you?</p>
        <p><strong>Buyer:</strong> Wakad. I&apos;m comparing a few projects.</p>
        <p><strong>Agent:</strong> Understood. Do you have a budget range you would like our representative to work with?</p>
        <p><strong>Buyer:</strong> I would rather discuss that at the site. Can I come on Sunday?</p>
        <p><strong>Agent:</strong> I can help arrange a visit. Let&apos;s check a specific time with the sales team.</p>
      </blockquote>
      <p>The agent has learned something useful without pushing for an answer the buyer chose not to give. Its next action depends on the actual booking setup; a scripted suggestion is not evidence that a slot is available.</p>

      <h2 id="booking">Turn visit interest into a confirmed next step</h2>
      <p>For a booking, confirm the project, exact date, time and meeting location. Read the day and time back once. When configured, Telleo can book an agreed meeting on the linked booking page. Test the booking result with your own process before describing it as confirmed to the buyer.</p>
      <p>If the buyer accepts a WhatsApp location message, use an approved template containing the correct project address. Do not send a brochure for a different development because both projects share a sales number. Keep the project identifier attached to the lead and workflow.</p>
      <p>Distinguish a request to call later from a site visit. Telleo marks callback requests and preserves the caller&apos;s words in the transcript; it does not automatically redial at the requested time. Give that task to a named representative. For a buyer who wants a person now, configure a live transfer and test the unanswered-transfer case.</p>

      <h2 id="review">Measure the sales handoff, not just call volume</h2>
      <p>Review a cohort by enquiry source and project. Track connected conversations, relevant buyers, confirmed visits, attended visits and representative follow-up. Keep bookings and attendance separate so a rise in calendar entries does not hide no-shows.</p>
      <p>For illustration, if 12 visits are booked and eight are attended, attendance is eight divided by 12, or about 67%. That is a worked example, not a Telleo benchmark. Record cancellations and reschedules separately so your team can explain the remaining four appointments.</p>
      <p>Listen for wrong project details, unanswered availability questions and buyers forced through unnecessary questions. Review those alongside the <Link href="/blog/measure-ai-call-quality/">technical call-quality checks</Link> before adding more projects.</p>
      <WhereTelleoFits>
        <p>Telleo supports form-aware scripts, extracted answers, human transfers, meeting booking and accepted WhatsApp follow-ups. The <Link href="/industries/real-estate/">real estate overview</Link> and <Link href="/use-cases/appointment-booking/">appointment booking workflow</Link> show the relevant building blocks.</p>
      </WhereTelleoFits>
    </BlogShell>
  );
}
