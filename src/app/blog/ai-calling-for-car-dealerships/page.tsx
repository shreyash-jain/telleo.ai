import Link from "next/link";
import { BlogShell, postMetadata, Table, WhereTelleoFits } from "@/components/BlogShell";

export const metadata = postMetadata("ai-calling-for-car-dealerships");

export default function Page() {
  return (
    <BlogShell
      slug="ai-calling-for-car-dealerships"
      takeaways={[
        "Start a dealership call from the vehicle and branch the customer actually enquired about.",
        "A requested test drive still needs a suitable vehicle, location and confirmed time.",
        "Keep inventory, finance terms, exchange valuations and negotiated offers with a verified source or a person.",
      ]}
      toc={[
        { id: "brief", label: "Prepare the dealership brief" },
        { id: "questions", label: "Questions that help the sales advisor" },
        { id: "script", label: "Test-drive enquiry script" },
        { id: "booking", label: "Confirm the vehicle and appointment" },
        { id: "review", label: "Pilot checklist and metrics" },
        { id: "faq", label: "Frequently asked questions" },
      ]}
      faqs={[
        { q: "How can an AI calling agent help a car dealership?", a: "It can follow up a vehicle enquiry, collect the customer's stated preferences, explain approved information and help arrange a sales conversation or test drive. Inventory and scheduling actions must be verified in the dealership's own process." },
        { q: "Can the agent promise a particular car is available?", a: "Only provide an availability statement from a current, authorised source. If that source is unavailable, record the requested model and variant and have the dealership confirm. A general model brochure is not proof that a test-drive vehicle or sale unit is available." },
        { q: "Does a Telleo meeting booking reserve a test-drive vehicle?", a: "Not by itself. Telleo can book an agreed meeting on a linked booking page. Your dealership must separately verify that the vehicle, advisor and branch can fulfil the appointment, or connect a workflow that checks those resources." },
      ]}
    >
      <p>AI calling for car dealerships can turn an online vehicle enquiry into a useful sales handoff. The first call should establish what the customer wants to see, where they would like to visit and whether a conversation or test drive is the right next step.</p>
      <p>A buyer who enquired about an automatic hatchback should not have to listen to the entire model range. Use the enquiry as context, then ask about the details that would change the visit. This is a suggested dealership playbook with illustrative examples, not a claim about sales results.</p>

      <h2 id="brief">Prepare the dealership brief</h2>
      <p>Give the agent the dealership name, branch address, opening hours, approved model information and the process for confirming a test drive. Assign an owner to changing facts such as display vehicles, promotions and delivery estimates. If a fact cannot be verified, write a handoff instruction instead of an approximate answer.</p>
      <p>Keep new-car enquiries, used-car enquiries and service appointments on distinct paths. A customer calling about a service issue needs the service team, not another purchase qualification call. Match the script and follow-up owner to the original enquiry type.</p>
      <p>Define who handles financing, exchange valuations and negotiated offers. The agent can record those questions and route them; the script should not invent repayment figures, approve a loan or guarantee a trade-in value.</p>

      <h2 id="questions">Ask what the advisor needs to prepare</h2>
      <Table head={["Topic", "Example question", "Use in the handoff"]} rows={[
        ["Vehicle preference", "Are you considering this model or comparing a few options?", "Select the relevant demonstration."],
        ["Variant requirement", "Is an automatic version important for your visit?", "Check the right test-drive vehicle."],
        ["Branch", "Which showroom would be convenient?", "Route the request to the correct location."],
        ["Purchase timing", "When are you hoping to decide?", "Prepare an appropriate follow-up."],
        ["Next step", "Would you prefer a test drive or a conversation with an advisor?", "Respect the customer's requested action."],
      ]} />
      <p>Do not make every answer a condition of receiving help. A customer may want to experience the vehicle before discussing budget. Preserve that preference for the advisor rather than repeatedly demanding a number. The <Link href="/blog/ai-lead-qualification-questions/">qualification guide</Link> explains how to distinguish an unknown answer from poor fit.</p>

      <h2 id="script">A test-drive enquiry script</h2>
      <blockquote>
        <p><strong>Agent:</strong> Hello, I&apos;m the AI assistant from Example Motors about your hatchback enquiry. Is this a convenient time?</p>
        <p><strong>Customer:</strong> Yes. I want to try the automatic.</p>
        <p><strong>Agent:</strong> Which branch would you prefer for a test drive?</p>
        <p><strong>Customer:</strong> The Baner showroom. Do they have the automatic?</p>
        <p><strong>Agent:</strong> The branch needs to confirm the test-drive vehicle. Shall I pass that request to an advisor?</p>
        <p><strong>Customer:</strong> Yes, Saturday morning would work.</p>
        <p><strong>Agent:</strong> I&apos;ll include Saturday morning as your preference. The advisor still needs to confirm the vehicle and time.</p>
      </blockquote>
      <p>The fictional agent records a specific requirement without promising stock it cannot see. If the dealership has a verified availability workflow, the conversation can continue to exact slot selection. Otherwise, stop at a clearly labelled request.</p>

      <h2 id="booking">Confirm more than the date and time</h2>
      <p>Define a confirmed test drive as an appointment your dealership can fulfil: the customer has agreed the branch and exact time, and the necessary vehicle and advisor are available. A successful calendar entry is only one part of that definition.</p>
      <p>Use separate outcomes for Test_Drive_Requested, Visit_Confirmed, Advisor_Requested, Callback_Requested and Incomplete. Check the actual booking result before using a confirmed outcome. For a location message, send the correct branch details only after the customer accepts the follow-up.</p>
      <p>Make the branch identifier visible in the integration. Two showrooms may share a lead source or central sales number. An advisor at the wrong branch cannot necessarily fulfil the promise made during the call. For booking changes, follow the <Link href="/blog/ai-appointment-reminder-calls/">appointment reminder guide</Link> and verify the source appointment is updated.</p>

      <h2 id="review">Review a complete dealership pilot</h2>
      <ol>
        <li>Start with one branch, one enquiry source and a reviewed vehicle brief.</li>
        <li>Test unavailable variants, a customer asking for finance details and a request for a different branch.</li>
        <li>Check the advisor can see the model preference and unanswered question before following up.</li>
        <li>Compare requested visits, confirmed visits and attended test drives separately.</li>
        <li>Review incorrect promises and booking corrections before expanding to more branches.</li>
      </ol>
      <p>Include the time advisors spend correcting records when evaluating the workflow. High call volume can hide a weak handoff. A useful pilot shows whether customers arrive at the right branch with accurate expectations and whether the sales team has enough context to help them.</p>
      <WhereTelleoFits>
        <p>Telleo supports form-aware calls, extraction questions, custom outcomes, human transfers and accepted message follow-ups. Use the <Link href="/industries/automotive/">automotive overview</Link> and <Link href="/use-cases/appointment-booking/">booking workflow</Link> to plan your first dealership agent.</p>
      </WhereTelleoFits>
    </BlogShell>
  );
}
