import Link from "next/link";
import { BlogShell, postMetadata, Table, WhereTelleoFits } from "@/components/BlogShell";

export const metadata = postMetadata("ai-calling-crm-integration");

export default function Page() {
  return (
    <BlogShell
      slug="ai-calling-crm-integration"
      takeaways={[
        "Map the lead, call and follow-up as separate records connected by stable identifiers.",
        "A webhook-capable workflow is an integration building block, not proof of a native connector to a specific CRM.",
        "Test duplicate events, missing answers and assignment failures before sending live leads through the workflow.",
      ]}
      toc={[
        { id: "flow", label: "Map the workflow first" },
        { id: "mapping", label: "Define fields and ownership" },
        { id: "entry", label: "Choose the call entry point" },
        { id: "outcomes", label: "Route outcomes correctly" },
        { id: "reliability", label: "Handle retries and duplicate events" },
        { id: "acceptance", label: "Run acceptance checks" },
        { id: "faq", label: "Frequently asked questions" },
      ]}
      faqs={[
        { q: "Can Telleo connect to an external CRM?", a: "Telleo workflows include HTTP requests and webhooks, which can be used in an integration when the other system exposes suitable interfaces. Field mapping, authentication, permissions and failure handling still need to be implemented and tested. This does not imply a native connector to every CRM." },
        { q: "Are extracted call answers automatically written to lead fields?", a: "No. Telleo saves extracted answers on the call and makes them available to workflows. Writing them to an external CRM's lead fields requires an explicit mapping and update step." },
        { q: "Does Telleo have an AI calling API?", a: "Yes. The documented public calling API supports starting a single call or a bulk request of up to 1,000 calls, and retrieving call status. An API key is issued by the team and scoped to the customer's institute. Confirm the current API contract and provisioning with the team before implementation." },
        { q: "Does a completed call mean the CRM follow-up succeeded?", a: "No. Track the call result, record update, assignment and any message as separate actions. A call can complete while a later CRM write or notification fails." },
      ]}
    >
      <p>An AI calling CRM integration connects a lead event to a phone conversation and carries the result into the next action. The useful end state is a record that tells your team who was called, what happened, what information was actually collected and who owns the follow-up.</p>
      <p>Start by drawing that path before choosing an API endpoint. A call that works in isolation may still leave the sales team without context if the result lands on the wrong record or the assignment step fails. The design below is an integration checklist, not a claim that every external CRM is connected automatically.</p>

      <h2 id="flow">Map the smallest complete workflow</h2>
      <ol>
        <li>A reviewed lead event enters the workflow from a form, import or connected source.</li>
        <li>The workflow checks identity, eligibility, ownership and the appropriate calling window.</li>
        <li>The selected agent makes the call with the relevant form context.</li>
        <li>The result records the outcome, summary and extracted answers that are available.</li>
        <li>A routing rule assigns follow-up, stops the sequence or schedules an eligible retry.</li>
        <li>An explicit integration step updates the external system and records whether that update succeeded.</li>
      </ol>
      <p>Choose one lead source and one agent for the first rollout. Mixing multiple forms, products and external systems makes it harder to identify where a missing answer or duplicate call originated. The <Link href="/blog/ai-lead-qualification-questions/">qualification guide</Link> helps define the decision the call is meant to support.</p>

      <h2 id="mapping">Define the field mapping and source of truth</h2>
      <Table head={["Data", "Purpose", "Suggested rule"]} rows={[
        ["External lead ID", "Associate updates with the right CRM record", "Preserve the source system's stable identifier."],
        ["Source event ID", "Recognise a repeated event", "Store and check it before repeating an action."],
        ["Call log ID", "Identify one calling attempt", "Keep each attempt distinct from the lead."],
        ["Outcome and summary", "Explain what happened", "Store the observed result, including incomplete calls."],
        ["Extracted answers", "Supply evidence for follow-up", "Keep missing values unknown; do not invent defaults."],
        ["Follow-up owner", "Make the next step actionable", "Confirm assignment rather than assuming it succeeded."],
      ]} />
      <p>These are suggested integration fields, not a published Telleo webhook payload. Use the current contract supplied for your setup to map actual field names. Decide which system owns each value. For example, a missing answer on one call should not silently erase an existing, verified CRM field.</p>
      <p>Phone numbers help match records, but a shared family or company number can represent multiple enquiries. Preserve lead and call identifiers rather than treating the phone number as the only record key.</p>

      <h2 id="entry">Choose the entry point that matches the job</h2>
      <p>Telleo accepts leads from Meta lead ads, Google lead forms, website forms via webhook, CSV or Excel imports and manual entry. Its workflows include AI calls, WhatsApp, email, HTTP requests and webhooks. Those are building blocks for a configured process; they do not establish native integrations with particular external CRMs.</p>
      <p>There is also a public calling API with a team-issued key for single or bulk calls. Starting an API call is not the same as entering a workflow with all of that workflow&apos;s retry and assignment rules. Decide which behaviour you need and verify it in the chosen path.</p>
      <p>Keep API credentials in your server-side integration. Verify the receiving system&apos;s authentication and accepted fields before connecting production events. Do not invent endpoint names or copy an illustrative payload into production as if it were a supported contract.</p>

      <h2 id="outcomes">Route the actual result, including missing analysis</h2>
      <p>Use explicit outcomes and confirm how they map to the CRM. An unanswered bulk call does not produce a conversation report. Handle the call-log status without waiting forever for extracted answers that cannot exist.</p>
      <p>Telleo stores extracted answers on the call and passes them to workflows; it does not automatically write those answers to lead fields. Assignment also depends on configuration: existing ownership is retained, and round-robin assignment requires the appropriate pool. Agent-defined dispositions outside the stop list are assigned by default, so review the entire outcome list before launch.</p>
      <p>A stop ends automated retries for that workflow; it is not a global do-not-call list. Build your contact-exclusion process into eligibility checks for future campaigns. A callback request similarly needs deliberate handling because it does not create an exact-time automatic redial.</p>

      <h2 id="reliability">Keep call retries separate from delivery retries</h2>
      <p>A repeated webhook delivery should not automatically mean another phone call. Use an event ledger in your integration: record the source event, the action attempted and the result. When the same event arrives again, check whether the action has already succeeded before repeating it.</p>
      <p>If a CRM update fails after a successful call, retry the update, not the call. Make that distinction visible to the person investigating failures. Telleo&apos;s calling duplicate protection is not a substitute for duplicate-event handling across external systems.</p>
      <p>Retry behaviour also differs by call path. Telleo workflow calls can retry unanswered calls with configured gaps and limits. Unanswered bulk-campaign calls are not automatically redialled. Calling windows apply to workflow and bulk calls, while a manually placed one-click call ignores those shifts. Test the path you intend to use.</p>

      <h2 id="acceptance">Run an end-to-end acceptance check</h2>
      <ul>
        <li>Send the same source event twice and confirm only the intended call is initiated.</li>
        <li>Use a lead with an existing owner and verify the assignment behaviour.</li>
        <li>Test no answer, a partial conversation and a qualified result with one missing field.</li>
        <li>Make the external CRM update fail and confirm recovery does not redial the lead.</li>
        <li>Verify a requested message and a meeting separately from the conversation outcome.</li>
        <li>Trace one lead from source event through call log to the final CRM record and follow-up owner.</li>
      </ul>
      <p>Launch when that trace is understandable to the team that will operate it. Monitor failed updates and unassigned follow-ups alongside connected calls; those failures can leave a successful conversation without a useful next step.</p>
      <WhereTelleoFits>
        <p>Start with Telleo&apos;s <Link href="/automations/">workflow tools</Link> and <Link href="/use-cases/instant-lead-callback/">new-lead calling workflow</Link>. Bring your field map and target CRM to the demo so the team can confirm the integration path and API access your setup needs.</p>
      </WhereTelleoFits>
    </BlogShell>
  );
}
