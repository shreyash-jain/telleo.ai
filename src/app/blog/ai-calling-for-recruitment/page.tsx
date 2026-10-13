import Link from "next/link";
import { BlogShell, postMetadata, Table, WhereTelleoFits } from "@/components/BlogShell";

export const metadata = postMetadata("ai-calling-for-recruitment");

export default function Page() {
  return (
    <BlogShell
      slug="ai-calling-for-recruitment"
      takeaways={[
        "Use the first call to confirm role interest and practical details, with hiring decisions owned by a recruiter.",
        "Ask job-related questions consistently and preserve unknown answers instead of guessing.",
        "Measure accurate recruiter handoffs and completed interviews separately from connected calls.",
      ]}
      toc={[
        { id: "scope", label: "Choose a narrow screening task" },
        { id: "questions", label: "Prepare the question set" },
        { id: "script", label: "Candidate screening script" },
        { id: "outcomes", label: "Record outcomes without ranking people" },
        { id: "pilot", label: "Test the recruiter handoff" },
        { id: "faq", label: "Frequently asked questions" },
      ]}
      faqs={[
        { q: "What can an AI calling agent do for recruitment?", a: "A configured agent can confirm interest in a specific role, collect job-related information and help arrange a recruiter conversation. Use it to support a defined administrative step, with recruiters responsible for interpreting the answers and making hiring decisions." },
        { q: "Should a voice agent score candidates by accent or speaking style?", a: "Do not use accent, perceived emotion or speaking style as a proxy for job suitability. This workflow records stated answers to relevant questions. An unclear recording or missing answer should lead to clarification, not an automatic rejection." },
        { q: "Does Telleo write screening answers into an applicant tracking system?", a: "Telleo stores extracted answers on the call and makes them available to workflows. Updating an applicant tracking system requires an explicit integration and field mapping; do not assume a native connector or automatic profile update." },
      ]}
    >
      <p>AI calling for recruitment can handle a short first conversation with an applicant: identify the role, confirm continued interest, collect practical details and agree the next step with a recruiter. The useful result is a clear record of what the candidate said, not an opaque judgement about whether they deserve an interview.</p>
      <p>This playbook is a suggested process for applicants your team has selected for contact. Start with one role and one recruiting team. Do not combine unrelated vacancies into a generic call that leaves the candidate unsure which application you mean.</p>

      <h2 id="scope">Choose a narrow screening task</h2>
      <p>Prepare a role brief with the employer name, job title, work location, working arrangement, approved compensation information and interview process. Name the person who owns changes to that brief. If the location or shift changes, update the call instructions before another applicant hears outdated information.</p>
      <p>Keep the agent&apos;s job administrative: confirm stated experience, explain approved role details and record availability. Route questions about exceptions or personalised offers to the recruiter. Avoid asking the agent to infer honesty, personality or future performance from a short phone conversation.</p>
      <p>Decide how candidates can request another contact method or speak to a person. A busy applicant, an accessibility request and a noisy phone line all need a usable alternative to completing the script immediately.</p>

      <h2 id="questions">Prepare questions that change the next step</h2>
      <Table head={["Question", "Record", "Recruiter use"]} rows={[
        ["Are you still interested in this specific role?", "Yes, no, or a question about the role", "Avoid pursuing an application the candidate has withdrawn."],
        ["Which of the listed tools have you used in your work?", "The candidate's stated experience", "Prepare relevant interview questions; verify later."],
        ["Would the stated work location and arrangement suit you?", "Preference or unresolved concern", "Identify a practical discussion for the recruiter."],
        ["When could you start if an offer were agreed?", "The candidate's own timeframe", "Plan the process without assuming availability."],
        ["Would you like to arrange a recruiter conversation?", "Requested next step and timing", "Coordinate an interview or follow-up."],
      ]} />
      <p>Explain the role before asking whether its conditions work for the candidate. Ask one question per turn, skip answers already confirmed and leave unprovided information unknown. Collect only information the recruiting team needs for this step.</p>

      <h2 id="script">A candidate screening script</h2>
      <p>This fictional conversation is a template. Replace all role details with the approved brief.</p>
      <blockquote>
        <p><strong>Agent:</strong> Hello, I&apos;m the AI assistant for Example Hiring, following up on your application for the customer support role. Is now a good time for a short call?</p>
        <p><strong>Candidate:</strong> Yes. Is the role remote?</p>
        <p><strong>Agent:</strong> The role brief says it is office-based in Pune. Would you like to discuss that with the recruiter?</p>
        <p><strong>Candidate:</strong> Yes, I could relocate, but I need to understand the shifts.</p>
        <p><strong>Agent:</strong> I&apos;ll include that question in the handoff. When would a recruiter conversation suit you?</p>
        <p><strong>Candidate:</strong> Thursday afternoon.</p>
      </blockquote>
      <p>The call has established interest with an unresolved question. “Thursday afternoon” is a preference, not a confirmed interview slot. A booking needs a specific date and time and a successful booking action. Keep those states separate when reporting to the recruiter.</p>

      <h2 id="outcomes">Record outcomes without turning the call into a ranking</h2>
      <p>Use outcomes such as Recruiter_Conversation_Requested, More_Information_Needed, Callback_Requested, Application_Withdrawn and Incomplete. Define the evidence required for each. A candidate who declines to answer one question has not necessarily withdrawn their application.</p>
      <p>Store the role identifier, stated answers, unresolved questions and agreed next step with the call. If one person has applied for two jobs, preserve both application identifiers instead of overwriting one record based only on the phone number. The <Link href="/blog/ai-calling-crm-integration/">CRM workflow guide</Link> covers that mapping problem.</p>
      <p>In Telleo, a callback request is recorded with the caller&apos;s words in the transcript; it does not schedule an exact-time automatic redial. Give requested-time follow-up to an owner. Also exclude withdrawn applications from later contact lists through your own application process.</p>

      <h2 id="pilot">Test whether recruiters can use the handoff</h2>
      <ol>
        <li>Have the recruiter review the role facts, questions and outcome definitions.</li>
        <li>Test an applicant who is busy, asks an unknown question, withdraws, or has applied for another role.</li>
        <li>Check that missing answers remain unknown and that interview requests are not labelled confirmed bookings.</li>
        <li>Review each handoff in a small pilot and compare the extracted answers with the transcript.</li>
        <li>Track corrected records, unresolved requests and interviews attended alongside calls completed.</li>
      </ol>
      <p>Use the review to improve the process rather than rank candidates by call quality. A poor connection is a reason to offer clarification. If the handoff repeatedly lacks information, fix the question or integration before expanding to more roles.</p>
      <WhereTelleoFits>
        <p>Telleo provides configurable scripts, extraction questions, call outcomes, transfers and booking-page support. The <Link href="/industries/recruitment/">recruitment workflow</Link> and <Link href="/agent-builder/">agent builder</Link> can support this first conversation; your team owns candidate evaluation and applicant-system updates.</p>
      </WhereTelleoFits>
    </BlogShell>
  );
}
