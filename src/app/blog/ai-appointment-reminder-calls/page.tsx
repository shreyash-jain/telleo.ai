import Link from "next/link";
import { BlogShell, postMetadata, Table, WhereTelleoFits } from "@/components/BlogShell";

export const metadata = postMetadata("ai-appointment-reminder-calls");

export default function Page() {
  return (
    <BlogShell
      slug="ai-appointment-reminder-calls"
      takeaways={[
        "A reminder call should confirm an existing appointment and handle questions, cancellation or rescheduling.",
        "Use appointment IDs and current booking data so an old reminder cannot confirm a cancelled slot.",
        "Evaluate attendance and successful reschedules separately from reminder connections.",
      ]}
      toc={[
        { id: "purpose", label: "Reminder versus booking" },
        { id: "data", label: "Prepare appointment data" },
        { id: "script", label: "A confirmation call script" },
        { id: "outcomes", label: "Handle each response" },
        { id: "workflow", label: "Build and test the workflow" },
        { id: "measurement", label: "Measure attendance fairly" },
        { id: "faq", label: "Frequently asked questions" },
      ]}
      faqs={[
        { q: "Can AI reminder calls reduce no-shows?", a: "They can give people a chance to confirm, cancel or request another time. Whether that improves attendance in your business needs to be measured. Compare similar appointment cohorts and check that cancellations or reschedules are not being counted as attended appointments." },
        { q: "When should an appointment reminder call run?", a: "Choose a time that leaves the person enough room to change plans and your team enough time to act. Test the timing for your appointment type, respect the customer's contact preferences and configure calling windows. There is no single timing that fits every service." },
        { q: "Does Telleo automatically change an existing calendar booking?", a: "Telleo can book an agreed meeting on a linked booking page. Do not assume that this also cancels or edits an existing appointment. Confirm the integration behaviour and route reschedule requests to your booking system or a person until the whole update is verified." },
      ]}
    >
      <p>An AI appointment reminder call is a conversation about an appointment that already exists. The agent confirms the date and time, answers approved logistical questions and records whether the customer plans to attend. A useful reminder also handles “I cannot make it” without treating that answer as a dead end.</p>
      <p>This guide describes a workflow you can adapt for a sales demo, admissions counselling session, property visit or service appointment. The scripts and measurement examples are illustrative; they are not a promise of fewer no-shows.</p>

      <h2 id="purpose">Keep reminders separate from new bookings</h2>
      <p>A booking call discovers a suitable next step and agrees a time. A reminder starts with a known appointment. Repeating the original sales pitch can obscure the actual question: will this person attend, or does something need to change?</p>
      <p>Use a dedicated reminder brief with a short opening, the appointment details and permitted actions. If the person asks a new sales question, answer from approved facts or arrange a handoff. Do not require them to complete another lead qualification interview to confirm attendance.</p>

      <h2 id="data">Prepare the data before scheduling calls</h2>
      <Table head={["Field", "Purpose", "Check before calling"]} rows={[
        ["Appointment ID", "Connect the result to the right booking", "It refers to the current appointment."],
        ["Customer and contact", "Reach the intended person", "The number and contact preferences are current."],
        ["Date, time and timezone", "Say when the appointment happens", "The time is in the future and unambiguous."],
        ["Location or joining method", "Answer arrival questions", "The address or meeting instructions are approved."],
        ["Booking status", "Exclude appointments that no longer need reminders", "Cancelled and superseded bookings are removed."],
        ["Responsible team", "Handle a change or unresolved question", "Someone can act on the outcome."],
      ]} />
      <p>Recheck the booking near the time of the call. An export taken yesterday can still contain an appointment cancelled this morning. Treat this check as a requirement for your workflow or integration; do not assume the calling platform automatically synchronises every external calendar.</p>

      <h2 id="script">A confirmation call script</h2>
      <p>Replace the example organisation and appointment with the current booking record. Keep the opening neutral until you know you have reached the intended person.</p>
      <blockquote>
        <p><strong>Agent:</strong> Hello, I&apos;m the AI assistant from Example Learning Centre. Am I speaking with the person who booked a counselling session?</p>
        <p><strong>Customer:</strong> Yes.</p>
        <p><strong>Agent:</strong> I&apos;m calling about your online session on Tuesday, 13 October at five in the evening, India time. Are you still able to join?</p>
        <p><strong>Customer:</strong> I need a later time.</p>
        <p><strong>Agent:</strong> I can pass a reschedule request to our team. What time would work better?</p>
        <p><strong>Customer:</strong> After seven.</p>
        <p><strong>Agent:</strong> I&apos;ll pass that request on. The new time still needs confirmation from our team.</p>
      </blockquote>
      <p>The final sentence matters: recording a preference does not change a calendar. If your integration can complete a reschedule, confirm the new time only after that action succeeds.</p>

      <h2 id="outcomes">Give every response a distinct outcome</h2>
      <p>Use Confirmed, Reschedule_Requested, Cancellation_Requested, Wrong_Number and Incomplete as a starting set. Keep a requested cancellation distinct from a completed cancellation until the source booking system has been updated. Avoid classifying silence or voicemail as confirmation.</p>
      <p>For a reschedule, store the requested window, timezone and owner of the next action. For a wrong number, route the record for correction and avoid disclosing appointment details to another person. If the customer wants a human, offer the configured transfer or a clearly owned follow-up.</p>
      <p>If they accept a location or joining-instructions message, send the relevant approved template. A request for directions should not trigger unrelated promotional messages.</p>

      <h2 id="workflow">Build a workflow that survives changed plans</h2>
      <ol>
        <li>Select eligible upcoming appointments from the booking system, with a stable appointment identifier.</li>
        <li>Check the latest status and contact preferences before triggering a call within your configured calling window.</li>
        <li>Run the reminder script and record the outcome against that appointment.</li>
        <li>Send requested information and route changes to the booking system or an assigned team member.</li>
        <li>Exclude the completed reminder from repeat processing unless an intentional new reminder is due.</li>
      </ol>
      <p>Test a cancellation after queueing, two appointments on the same phone number, a duplicate event and a calendar update failure. These are suggested integration acceptance tests, not claims of built-in calendar behaviour. The <Link href="/blog/ai-calling-crm-integration/">webhook workflow guide</Link> explains duplicate-event handling.</p>

      <h2 id="measurement">Measure attendance without hiding the other outcomes</h2>
      <p>Define the appointment cohort before the pilot and report attended, cancelled, rescheduled and missed appointments separately. A reminder connection rate measures reach; a confirmation rate measures stated intent; attendance requires evidence from your booking or check-in process.</p>
      <p>For a controlled comparison, split similar eligible appointments between your existing reminder process and the AI-assisted process. Keep appointment type, lead time and reporting window comparable. Include call charges and staff time spent fixing failed reschedules when evaluating cost.</p>
      <WhereTelleoFits>
        <p>Telleo provides AI calls, custom outcomes, accepted WhatsApp or email follow-ups and HTTP or webhook workflow steps. Combine these <Link href="/automations/">automation tools</Link> with your appointment source, and validate changes separately from <Link href="/use-cases/appointment-booking/">new meeting bookings</Link>.</p>
      </WhereTelleoFits>
    </BlogShell>
  );
}
