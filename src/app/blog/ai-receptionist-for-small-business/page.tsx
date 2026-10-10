import Link from "next/link";
import { BlogShell, postMetadata, Table, WhereTelleoFits } from "@/components/BlogShell";

export const metadata = postMetadata("ai-receptionist-for-small-business");

export default function Page() {
  return (
    <BlogShell
      slug="ai-receptionist-for-small-business"
      takeaways={[
        "An AI receptionist needs a narrow answer set, routing rules and a realistic fallback when nobody can take a transfer.",
        "Answering an inbound call and creating a new CRM lead are separate behaviours; test both.",
        "Launch only after testing real phone calls, including interruptions, unclear audio and requests for a person.",
      ]}
      toc={[
        { id: "role", label: "What the receptionist should do" },
        { id: "knowledge", label: "Build an approved answer set" },
        { id: "routing", label: "Plan the phone routing" },
        { id: "script", label: "Example inbound conversation" },
        { id: "fallback", label: "After-hours and transfer fallbacks" },
        { id: "testing", label: "Pre-launch call checklist" },
        { id: "faq", label: "Frequently asked questions" },
      ]}
      faqs={[
        { q: "What does an AI receptionist do for a small business?", a: "It can answer inbound calls, explain approved business information, understand why someone is calling and route them to a person or next step. The actual tasks depend on its script, phone routing and connected workflows." },
        { q: "Can Telleo answer through my existing third-party IVR?", a: "Telleo's documented inbound setup uses a Telleo Plivo number. Its IVR can route to an AI agent immediately or through a menu option. It does not mean an existing third-party IVR is natively connected; discuss your number and routing requirements before changing the phone setup." },
        { q: "Will every unknown caller automatically become a lead?", a: "No. Inbound lead capture is off by default in Telleo. Decide whether you need it, configure the intended process and verify that a test caller creates the expected record before relying on it." },
        { q: "Should an AI receptionist identify itself as AI?", a: "We recommend an honest introduction such as 'I am the AI assistant for Example Services.' Give callers an obvious route to a person, and make the agent answer honestly if asked whether it is AI." },
      ]}
    >
      <p>An AI receptionist is a voice agent that answers incoming business calls and helps the caller reach a useful next step. For a small business, that might mean answering an opening-hours question, understanding a new enquiry or connecting an existing customer to the right person.</p>
      <p>The setup should start with the calls your business actually receives. Write down the common reasons people call and decide which ones have a simple, approved answer. Keep complaints, exceptions and commitments that need staff judgement on a clear human route.</p>

      <h2 id="role">Define the receptionist&apos;s job in plain language</h2>
      <p>A useful brief might say: “Answer questions about our location and opening hours, identify new enquiries, offer the approved next step and transfer existing customers to the service team.” That gives the agent a smaller and more testable role than “handle all our calls”.</p>
      <p>Specify what completion means for each intent. A directions question is complete when the caller has the correct address. A service complaint is not resolved just because the agent recorded a summary. It needs an owner, and the caller needs an accurate explanation of what happens next.</p>
      <p>Separate answering from outbound follow-up. An inbound conversation can lead to a requested callback, but that does not mean a later call has been scheduled. The agent should describe only actions your workflow can complete.</p>

      <h2 id="knowledge">Build a small, approved answer set</h2>
      <Table head={["Topic", "Give the agent", "Escalate when"]} rows={[
        ["Opening hours", "Normal hours and confirmed exceptions", "The caller asks about an unlisted holiday."],
        ["Location", "Branch name, full address and approved directions", "The caller needs an unverified accessibility detail."],
        ["Services", "A concise list with clear service boundaries", "The request does not match an approved service."],
        ["Prices", "Approved public prices or the correct quoting process", "A discount or personalised quote is requested."],
        ["Bookings", "The actual booking process and available action", "A calendar result is missing or a change needs staff."],
      ]} />
      <p>Assign someone to review these facts when the business changes. If your opening hours change, updating a webpage alone is not evidence that the phone agent knows the new hours. Check the facts in its configured script and test the answer on a call.</p>

      <h2 id="routing">Plan how the call reaches the agent</h2>
      <p>With Telleo, the documented inbound route is an IVR on a Telleo Plivo number. The AI can be the first answering step or a menu option. Your human team can retain a separate phone setup, but you should validate the end-to-end route before changing the number customers see.</p>
      <p>Make a simple routing sheet: entry number, agent, caller intent, destination and fallback owner. Test each destination with someone ready to answer. Then test what the caller hears when nobody answers. A configured transfer number alone does not prove that the customer reaches the right team.</p>
      <p>If callers need to become CRM leads, test that independently. Telleo&apos;s inbound lead capture is off by default. A successful conversation and an automatically created lead are different results.</p>

      <h2 id="script">An example inbound conversation</h2>
      <blockquote>
        <p><strong>Agent:</strong> Thank you for calling Example Services. I&apos;m the AI assistant. How can I help?</p>
        <p><strong>Caller:</strong> I want to check your opening time, and I have a question about my booking.</p>
        <p><strong>Agent:</strong> We open at nine on weekdays. Would you like me to connect you to the team about your booking?</p>
        <p><strong>Caller:</strong> Yes, please.</p>
        <p><strong>Agent:</strong> I&apos;ll try to connect you now.</p>
      </blockquote>
      <p>This fictional example answers the approved question first and recognises the separate service request. Replace the hours with verified facts. Avoid implying the transfer succeeded until it actually connects.</p>

      <h2 id="fallback">Give after-hours calls an honest fallback</h2>
      <p>Write separate instructions for times when staff cannot answer. The agent may be able to explain public information and collect a request, but it should not promise that a person is available or that someone will call at an exact time without a process to make that happen.</p>
      <p>A useful fallback is: “The team is unavailable right now. I can record your request for them to review.” Use it only after verifying where that request is stored and who checks it. If your workflow cannot capture a request reliably, provide the approved alternative contact method instead.</p>
      <p>Define what the agent should do when it cannot hear the caller, lacks the answer or receives repeated requests for a human. Do not make the caller repeat the same question through an endless menu or sales script.</p>

      <h2 id="testing">Test the full caller experience before launch</h2>
      <ul>
        <li>Call from an unknown number and check the intended record-creation behaviour.</li>
        <li>Ask about a known fact, an unknown fact and a recently changed fact.</li>
        <li>Interrupt a reply, switch between Hindi and English, and use a local place name.</li>
        <li>Request a person immediately, then test a destination that does not answer.</li>
        <li>Call outside staffed hours and verify the promised follow-up process.</li>
        <li>Review the transcript, outcome and any booking or message the agent says it completed.</li>
      </ul>
      <p>Review misunderstood requests and failed transfers after launch. A connected inbound call is not necessarily a resolved enquiry. Use the <Link href="/blog/measure-ai-call-quality/">call-quality guide</Link> to combine technical checks with a review of whether the caller got help.</p>
      <WhereTelleoFits>
        <p>Telleo supports inbound AI on its calling numbers, configured human handoffs and Hindi, English and Hinglish conversations. Explore the <Link href="/use-cases/ai-receptionist/">AI receptionist workflow</Link> and <Link href="/agent-builder/">agent builder</Link> to scope your first call flow.</p>
      </WhereTelleoFits>
    </BlogShell>
  );
}
