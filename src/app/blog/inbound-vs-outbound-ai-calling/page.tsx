import Link from "next/link";
import { BlogShell, postMetadata, Table, WhereTelleoFits } from "@/components/BlogShell";

export const metadata = postMetadata("inbound-vs-outbound-ai-calling");

export default function Page() {
  return (
    <BlogShell
      slug="inbound-vs-outbound-ai-calling"
      takeaways={[
        "Inbound AI answers a customer-initiated call; outbound AI starts a call for a defined reason.",
        "The two directions need different openings, context checks, routing rules and measures of success.",
        "Choose a first workflow by the business problem and available follow-up process, not by call direction alone.",
      ]}
      toc={[
        { id: "comparison", label: "Compare the two workflows" },
        { id: "inbound", label: "Design an inbound call" },
        { id: "outbound", label: "Design an outbound call" },
        { id: "shared", label: "Share facts, separate instructions" },
        { id: "pilot", label: "Choose and measure a first pilot" },
        { id: "faq", label: "Frequently asked questions" },
      ]}
      faqs={[
        { q: "What is the difference between inbound and outbound AI calling?", a: "An inbound agent answers a call initiated by the customer. An outbound agent initiates a call from a configured workflow, campaign or manual action. The voice technology can be similar, but the context and operating rules differ." },
        { q: "Can one Telleo agent support both directions?", a: "Telleo agents can be configured for inbound, outbound or both. Even when using one agent, define the opening and behaviour for each direction. Separate agents can make testing easier when the goals or routing rules differ substantially." },
        { q: "Are unanswered outbound calls automatically retried?", a: "That depends on the call path. Telleo workflow calls can retry with configured gaps and limits. Unanswered bulk-campaign calls are not automatically redialled. Check the actual path instead of assuming every outbound call shares one retry policy." },
        { q: "Does answering an inbound call automatically create a new lead?", a: "No. Telleo's inbound lead capture is off by default. Test conversation handling and record creation separately if creating a lead from an unknown caller is part of your workflow." },
      ]}
    >
      <p>Inbound AI calling handles someone who has chosen to phone your business. Outbound AI calling starts a conversation for a defined purpose, such as following up a submitted enquiry. Both can use a voice agent, but they should not use identical scripts or success metrics.</p>
      <p>Choose the workflow around a concrete problem. If callers need help finding the right team, start with inbound routing. If fresh enquiries wait for an initial conversation, evaluate outbound follow-up. This guide compares the operating design; it does not assume one direction is always more valuable.</p>

      <h2 id="comparison">Compare the two workflows</h2>
      <Table head={["Decision", "Inbound AI calling", "Outbound AI calling"]} rows={[
        ["Trigger", "The customer calls the business number.", "A workflow, campaign or person initiates a call."],
        ["Starting context", "The caller's intent may be unknown.", "A record should explain the reason for contact."],
        ["Opening", "Identify the business and ask how to help.", "Identify the business, explain why you are calling and check timing."],
        ["Routing", "Discover the request and direct it to the right action.", "Complete the defined task or hand it to its owner."],
        ["No answer", "Test where callers go if the intended route is unavailable.", "Apply the correct eligibility, calling-window and retry rules."],
        ["Useful measures", "Requests handled, transfer success and unresolved calls.", "Reach, accurate outcomes and completed follow-up."],
      ]} />

      <h2 id="inbound">Design an inbound call around the caller&apos;s request</h2>
      <p>An inbound opening can be short: “Thank you for calling Example Services. I&apos;m the AI assistant. How can I help?” The next turn depends on the caller&apos;s answer, not a predetermined qualification checklist.</p>
      <p>Prepare a small intent map. A location question can use an approved answer. An existing-customer issue may need a service transfer. A new enquiry can enter an appropriate discovery or booking flow. Make it easy for the caller to request a person without repeating the original question.</p>
      <p>In Telleo&apos;s documented setup, an IVR on a Telleo Plivo number can route directly to an AI agent or expose it as a menu option. This does not establish a native connection to an existing third-party IVR. Test the full number-to-agent route, then test transfer destinations and the fallback when staff cannot answer.</p>
      <p>Also decide what happens to an unknown caller&apos;s details. Answering and lead creation are separate functions, with inbound lead capture off by default. The <Link href="/blog/ai-receptionist-for-small-business/">AI receptionist setup guide</Link> gives a more detailed test checklist.</p>

      <h2 id="outbound">Design an outbound call around a clear reason</h2>
      <p>An outbound opening needs context: “I&apos;m the AI assistant from Example Services, following up on the demo enquiry you submitted. Is this a convenient time?” The prospect should understand why this call is happening before being asked for more information.</p>
      <p>Attach the relevant enquiry fields, approved product facts and intended next step. Review the contact list and calling preferences before launch. Keep requests to stop contact out of later campaigns through your contact-management process; stopping one workflow&apos;s retries is not a global exclusion.</p>
      <p>Choose the actual initiation path deliberately. Telleo supports workflow calls, bulk campaigns and one-click calls. Workflow retries do not imply bulk retries. Calling windows apply to workflow and bulk calls, while a one-click call placed by a person ignores those shifts.</p>
      <p>Consider capacity as well as the script. New-lead workflow calls and bulk campaigns share a queue, so a campaign can delay fresh-enquiry calls. If response time matters, measure it during realistic campaign activity rather than only in an isolated demonstration.</p>

      <h2 id="shared">Share approved facts, separate the instructions</h2>
      <p>Both agents may need the same branch address, public prices and escalation contacts. Keep an owner for those facts so they do not drift between scripts. The conversation instructions still need to reflect how the call started.</p>
      <p>For example, an inbound customer saying “I already booked” should move to appointment assistance. An outbound new-enquiry call hearing the same statement should first check whether its source record is stale. In both cases, repeating a sales pitch fails to address the information the customer provided.</p>
      <p>Use distinct outcomes when the operational meaning differs. A support transfer, a sales handoff and an unanswered dial should not all appear as generic “completed” calls. Keep transcripts and any action results connected to the correct record through your <Link href="/blog/ai-calling-crm-integration/">CRM workflow</Link>.</p>

      <h2 id="pilot">Choose a pilot with a complete next step</h2>
      <ol>
        <li>Name one problem, such as routing inbound enquiries or following up one source of new leads.</li>
        <li>List the facts the agent needs and who maintains them.</li>
        <li>Confirm where human transfers, requested callbacks and unresolved questions will go.</li>
        <li>Test the appropriate exceptions: unknown callers for inbound, stale records and no answer for outbound.</li>
        <li>Review the conversation and the follow-up action together before expanding.</li>
      </ol>
      <p>For inbound, check whether the original request was handled or reached the right person. For outbound, separate attempted calls, connected conversations and completed next steps. Neither direction is successful merely because the voice sounded natural.</p>
      <p>Record a baseline using your existing process and compare similar call types during the pilot. Include time spent correcting bad handoffs. That gives you evidence about the chosen workflow rather than an unsupported claim that AI calling improves every phone task.</p>
      <WhereTelleoFits>
        <p>Telleo supports <Link href="/ai-voice-agents/">inbound and outbound voice agents</Link>, configurable call outcomes and human handoffs. Start with the <Link href="/use-cases/ai-receptionist/">receptionist workflow</Link> or <Link href="/use-cases/instant-lead-callback/">new-lead calling workflow</Link>, then test the full route for your chosen use case.</p>
      </WhereTelleoFits>
    </BlogShell>
  );
}
