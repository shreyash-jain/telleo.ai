import Link from "next/link";
import { BlogShell, postMetadata, Table, WhereTelleoFits } from "@/components/BlogShell";

export const metadata = postMetadata("ai-calling-for-admissions");

export default function Page() {
  return (
    <BlogShell
      slug="ai-calling-for-admissions"
      takeaways={[
        "Start with one admissions task: respond to a fresh enquiry, qualify the requirement and agree a next step.",
        "Give the agent approved course facts and a clear boundary around discounts, eligibility and admission decisions.",
        "Measure attended counselling sessions and complete handoffs, not just calls placed.",
      ]}
      toc={[
        { id: "scope", label: "Choose the first admissions workflow" },
        { id: "questions", label: "Questions worth asking" },
        { id: "script", label: "A parent enquiry script" },
        { id: "handoff", label: "Outcomes and counsellor handoffs" },
        { id: "pilot", label: "Run a useful pilot" },
        { id: "faq", label: "Frequently asked questions" },
      ]}
      faqs={[
        { q: "Can AI calling replace an admissions counsellor?", a: "Use it for a defined first conversation and routine follow-up. Keep academic advice, eligibility exceptions, fee negotiations and final admission decisions with your team. A useful handoff gives the counsellor the parent's question and the information already collected." },
        { q: "Can Telleo make admissions calls in Hindi and Hinglish?", a: "Hindi, English and Hinglish are in production. Other regional languages supported by the voice engines are set up with customers on request. Test your institute's course names and local place names on a real phone call before launch." },
        { q: "Will the AI call back at the exact time a parent requests?", a: "Telleo marks the call as a callback request, with the parent's words in the transcript. It does not automatically redial at that requested time. Assign a person to manage time-specific callbacks; a confirmed counselling meeting is a separate booking workflow." },
      ]}
    >
      <p>AI calling for admissions means using a voice agent to handle a defined part of an enquiry conversation: understand the course requirement, answer approved questions and arrange a counsellor conversation. For a school, coaching centre or training institute, the useful output is a clear next step attached to the right enquiry.</p>
      <p>Consider a parent who submits a form for a weekend maths course. A good first call checks whether the enquiry is for that parent&apos;s child, confirms the class and asks what they need help with. It should not launch into a list of every programme the institute sells. This playbook is a suggested rollout, not a report of customer results.</p>

      <h2 id="scope">Choose the first admissions workflow</h2>
      <p>Start with fresh enquiries for one programme at one branch. Put the branch name, delivery mode, class range, approved fee information and counselling availability in the agent brief. If fees depend on a scholarship review, give the agent that explanation and a handoff rule rather than an estimated discount.</p>
      <p>Keep application follow-up separate. Someone who has already applied needs a precise conversation about their next step, not another qualification interview. A new-enquiry agent and an <Link href="/use-cases/application-follow-up/">application follow-up agent</Link> should have different scripts and outcomes.</p>

      <h2 id="questions">Ask only what helps the counsellor act</h2>
      <p>Use form answers as context and confirm details that matter. Asking a parent to repeat everything from the form makes the conversation longer without improving the handoff. Leave unanswered questions blank instead of treating missing information as a negative signal.</p>
      <Table head={["Information", "Example question", "Why it matters"]} rows={[
        ["Learner and course", "Which class is the course for?", "Selects the right counselling conversation."],
        ["Learning requirement", "What would you most like help with?", "Separates exam preparation from subject support."],
        ["Mode or branch", "Would you prefer online classes or the centre?", "Checks whether the available programme fits."],
        ["Start timeline", "When are you hoping to start?", "Helps the counsellor discuss the right intake."],
        ["Next step", "Would you like to speak with our counsellor?", "Records an explicit request for follow-up."],
      ]} />
      <p>Ask one question per turn. If the parent asks about timings halfway through, answer from the approved timetable before continuing. The <Link href="/blog/ai-calling-script-template/">AI calling script guide</Link> explains how to write those interruption rules.</p>

      <h2 id="script">A parent enquiry script you can adapt</h2>
      <p>The institute and conversation below are illustrative. Replace the name and programme details with your own approved facts.</p>
      <blockquote>
        <p><strong>Agent:</strong> Hello, I&apos;m the AI assistant calling from Example Learning Centre about your maths course enquiry. Is now a good time for two quick questions?</p>
        <p><strong>Parent:</strong> Yes. I wanted to know about weekend classes.</p>
        <p><strong>Agent:</strong> I can help with the available timings. Which class is the course for?</p>
        <p><strong>Parent:</strong> Class nine. She mainly needs help with algebra.</p>
        <p><strong>Agent:</strong> Thanks. Would you prefer online classes or sessions at the centre?</p>
        <p><strong>Parent:</strong> Online, but I need to discuss the fees first.</p>
        <p><strong>Agent:</strong> Our counsellor can explain the approved fee options. Would you like me to connect you?</p>
      </blockquote>
      <p>If nobody can take a transfer, collect the requested next step and give an honest explanation. Do not announce a confirmed meeting until a specific day and time have been agreed and the booking has succeeded.</p>

      <h2 id="handoff">Define outcomes before turning on calls</h2>
      <p>A useful starting list is Counselling_Requested, Meeting_Booked, Callback_Requested, Not_Interested, Wrong_Number and Incomplete. Specify what evidence each outcome requires. A parent asking for a brochure is not automatically ready to enrol; a silent call is not a rejection.</p>
      <p>Attach the learner&apos;s class, programme, preferred mode and unresolved question to the handoff. In Telleo, extracted answers live on the call and can feed workflows; they are not automatically written into lead fields. Decide where the counsellor will read them before launching.</p>
      <p>Have a team-owned process for requests to stop contact. Ending one workflow&apos;s retries is different from excluding a number from every future campaign. Review the calling list before each campaign rather than assuming an old outcome provides that exclusion.</p>

      <h2 id="pilot">Run a pilot that tests the whole handoff</h2>
      <ol>
        <li>Test internally with a busy parent, an unanswered fee question, a wrong number and a request for a person.</li>
        <li>Choose a small, clearly defined enquiry cohort that your counsellors can review individually.</li>
        <li>Check whether transcripts capture the requirement accurately and whether the assigned counsellor receives enough context.</li>
        <li>Compare qualified conversations, booked sessions and attended sessions separately. Use the same lead source and reporting period when comparing workflows.</li>
        <li>Change one weak part of the script, then review another cohort before expanding to more courses.</li>
      </ol>
      <p>Track inaccurate fee answers and failed handoffs alongside outcomes. More meetings are not useful if parents arrive with the wrong expectations. The <Link href="/blog/measure-ai-call-quality/">call-quality measurement guide</Link> provides a broader review rubric.</p>
      <WhereTelleoFits>
        <p>Telleo includes education-first agent templates, form context, extraction questions, configurable outcomes and human transfers. Use the <Link href="/agent-builder/">agent builder</Link> to prepare the conversation and the <Link href="/industries/education/">education workflow overview</Link> to plan where it belongs in admissions.</p>
      </WhereTelleoFits>
    </BlogShell>
  );
}
