import Link from "next/link";
import { BlogShell, postMetadata, Table, WhereTelleoFits } from "@/components/BlogShell";

export const metadata = postMetadata("ai-event-confirmation-calls");

export default function Page() {
  return (
    <BlogShell
      slug="ai-event-confirmation-calls"
      takeaways={[
        "An event confirmation call checks an existing registration and helps the attendee act on it.",
        "Keep registrations, stated attendance plans and actual check-ins as separate records.",
        "Recheck session changes and cancellations before calling or sending joining instructions.",
      ]}
      toc={[
        { id: "records", label: "Start with the registration record" },
        { id: "questions", label: "Keep the confirmation short" },
        { id: "script", label: "Event confirmation script" },
        { id: "exceptions", label: "Handle changed plans" },
        { id: "measurement", label: "Measure attendance honestly" },
        { id: "launch", label: "Pre-event checklist" },
        { id: "faq", label: "Frequently asked questions" },
      ]}
      faqs={[
        { q: "What is an AI event confirmation call?", a: "It is a short conversation with a registered attendee to confirm the event details, ask whether they plan to attend and handle questions or changes. It should reference the correct registration rather than operate as a generic sales call." },
        { q: "Can a confirmation call guarantee event attendance?", a: "No. A person can confirm and later change plans. Track actual attendance through your event check-in or webinar system, and report it separately from the intent recorded on the call." },
        { q: "Can Telleo send event details on WhatsApp?", a: "Telleo can send an approved WhatsApp template when the agent offers information and the caller accepts. Configure the correct session details and verify delivery. Do not assume that sending a message also updates the event registration platform." },
      ]}
    >
      <p>AI event confirmation calls help an organiser ask a simple question: does a registered attendee still plan to join, and do they need anything to do so? The workflow can suit an open day, workshop, webinar or in-person information session when the event details and follow-up actions are clearly defined.</p>
      <p>Begin with people who have registered for that event and whose contact preferences your team has reviewed. The suggested process below is about confirming a known registration. A campaign to invite people who have not registered needs its own brief and contact review.</p>

      <h2 id="records">Start with the registration record</h2>
      <p>Give every call a registration identifier and a session identifier. Include the event name, full date, time, timezone, venue or joining method and current registration status. A person registered for two sessions should not receive one ambiguous reminder for “your event”.</p>
      <p>Keep the registration system as the source of truth. Recheck it before the call, especially if you prepared a CSV earlier. Remove cancelled or superseded registrations and use the latest location. A reminder with yesterday&apos;s venue can create more work than it saves.</p>
      <Table head={["State", "What it means", "Evidence"]} rows={[
        ["Registered", "A place or registration exists", "The event system's current record."],
        ["Plans to attend", "The attendee has stated an intention", "An explicit answer on the call."],
        ["Change requested", "Someone wants another session or cancellation", "The requested change, awaiting fulfilment."],
        ["Attended", "The person actually joined", "Check-in or attendance data from the event."],
      ]} />

      <h2 id="questions">Keep the confirmation short</h2>
      <p>The core question is whether the attendee plans to join the named session. Ask about directions or joining instructions only when useful. Do not turn a reminder into a new qualification interview about budget or buying plans.</p>
      <p>For an online event, prepare the approved joining process and a fallback if the attendee cannot find the link. For an in-person event, prepare the address and any confirmed arrival instructions. An agent should not invent parking availability, accessibility arrangements or entry requirements.</p>
      <p>If a registration covers several people, confirm whether the respondent is speaking for the whole group. Store that answer explicitly. One person saying “I&apos;ll attend” does not establish attendance for every guest on the registration.</p>

      <h2 id="script">An event confirmation script</h2>
      <p>The following workshop and conversation are fictional. Replace the details with the current session record.</p>
      <blockquote>
        <p><strong>Agent:</strong> Hello, I&apos;m the AI assistant from Example Workshops about your online workshop registration. Is this a good time for a quick confirmation?</p>
        <p><strong>Attendee:</strong> Yes. Which session is this?</p>
        <p><strong>Agent:</strong> The introduction to design workshop on Saturday, 17 October, at eleven in the morning, India time. Do you still plan to join?</p>
        <p><strong>Attendee:</strong> Yes, but I cannot find the joining instructions.</p>
        <p><strong>Agent:</strong> Would you like me to send the joining instructions on WhatsApp to this number?</p>
        <p><strong>Attendee:</strong> Yes, please.</p>
      </blockquote>
      <p>Record attendance intent and the accepted message as separate actions. Check whether the send succeeded before claiming delivery. A person can intend to attend even if the message fails; the failure needs a follow-up owner rather than a changed RSVP.</p>

      <h2 id="exceptions">Handle changed plans without inventing a new booking</h2>
      <p>Use outcomes such as Plans_To_Attend, Cannot_Attend, Session_Change_Requested, Help_Requested and Incomplete. An unanswered call remains unknown. Do not turn it into a cancellation or assume the attendee will attend because they registered.</p>
      <p>If someone wants a different session, record the preference and verify capacity and registration rules through your event process. Do not announce a move until the source system confirms it. A requested cancellation similarly needs a completed update, not just a note on a call.</p>
      <p>Give unresolved questions to the event team. A request to call later needs a managed follow-up: Telleo records the request and the caller&apos;s words, but does not automatically redial at the requested time. The <Link href="/blog/ai-calling-crm-integration/">integration guide</Link> explains how to keep updates and call outcomes distinct.</p>

      <h2 id="measurement">Measure attendance honestly</h2>
      <p>Choose the reporting cohort before calling and keep its size visible. Report registrations reached, plans to attend, requested changes and actual attendance. If you compare two reminder methods, use similar sessions and registration lead times rather than comparing an evening webinar with a weekend campus event.</p>
      <p>For illustration, if 80 of 100 registrants answer and 60 say they will attend, the stated-intent rate among reached registrants is 60 divided by 80, or 75%. It is not a 75% attendance rate. Attendance requires the event&apos;s check-in data. These numbers are an example, not a benchmark.</p>

      <h2 id="launch">Run a pre-event checklist</h2>
      <ul>
        <li>Verify the date, timezone, venue and joining instructions in the actual call script.</li>
        <li>Test a changed session, group registration and cancelled registration.</li>
        <li>Check the correct template is sent only when accepted.</li>
        <li>Assign an owner to unanswered logistical questions and failed messages.</li>
        <li>Join the call results to attendance after the event using registration identifiers.</li>
      </ul>
      <WhereTelleoFits>
        <p>Telleo supports <Link href="/use-cases/event-confirmation/">event confirmation calls</Link>, custom outcomes and accepted message follow-ups. Connect the <Link href="/automations/">workflow steps</Link> to your registration process and verify any session changes separately.</p>
      </WhereTelleoFits>
    </BlogShell>
  );
}
