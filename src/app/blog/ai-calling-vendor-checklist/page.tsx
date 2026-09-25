import { BlogShell, postMetadata, Callout, Table, WhereTelleoFits, Sources } from "@/components/BlogShell";
import Link from "next/link";

export const metadata = postMetadata("ai-calling-vendor-checklist");

const CHECKED = "2026-09-25";

export default function Page() {
  return (
    <BlogShell
      slug="ai-calling-vendor-checklist"
      takeaways={[
        "Judge a vendor on a real phone call with your own script, not a recorded demo.",
        "Ask what is live in production today, not what the speech engine “supports”, especially for languages.",
        "Ask for the full cost: billing pulse, minimums, retries, number rental, DLT fees, analysis fees and GST.",
        "Under India’s DPDP Act, your business stays responsible for what your vendor does with call data. Ask who can hear recordings, how long they are kept, and ask to see any certification a vendor claims.",
        "Agree the pilot’s success metric and the exit terms, including data export, before you sign.",
      ]}
      toc={[
        { id: "how-to-use", label: "How to use this checklist" },
        { id: "conversation", label: "Conversation quality (1–3)" },
        { id: "languages", label: "Languages (4–5)" },
        { id: "telephony", label: "Telephony and numbers (6–7)" },
        { id: "compliance", label: "Compliance and DLT (8–9)" },
        { id: "workflow", label: "CRM, workflow and actions (10–12)" },
        { id: "analytics", label: "Analytics and QA (13–14)" },
        { id: "pricing", label: "Pricing (15–17)" },
        { id: "data-security", label: "Data and security (18–19)" },
        { id: "pilot-exit", label: "Pilot and exit (20)" },
        { id: "printable", label: "The checklist on one page" },
      ]}
      faqs={[
        {
          q: "What should I ask an AI calling vendor first?",
          a: "Ask to call their agent yourself, on an ordinary phone, with a script close to yours. Then ask what happens after the call: where the outcome goes, who gets notified, and what you see per call. Those two answers tell you more than any feature list.",
        },
        {
          q: "What is a billing pulse and why does it matter?",
          a: "The pulse is the unit a call is billed in, such as per second, per 30 seconds or per minute rounded up. With a per-minute pulse, a 61-second call is billed as two minutes. Because AI campaigns produce many short calls, the pulse can change your real cost noticeably. Ask for it in writing, and ask whether ringing time, unanswered calls and voicemails are billed.",
        },
        {
          q: "How long should an AI calling pilot run?",
          a: "Long enough to reach a few hundred connected conversations on real leads, and to listen to a good sample of them. For most teams that is two to four weeks. Agree the success metric, such as cost per qualified lead against your current process, before the pilot starts.",
        },
        {
          q: "Who is responsible for data protection when a vendor records my calls?",
          a: "Under India’s Digital Personal Data Protection Act, 2023, the business that decides why and how personal data is processed (the data fiduciary) stays responsible for compliance, including processing done on its behalf by a data processor such as a calling vendor. It may use a processor only under a valid contract, and must make the processor erase data when it is no longer needed. Read your vendor contract with that in mind.",
        },
        {
          q: "How do I check a vendor’s security certification?",
          a: "Ask for the document, not the logo. A SOC 2 is a report by a CPA firm, acting as service auditor, on a service organisation’s controls, so ask for the report and the period it covers. For an ISO/IEC 27001 claim, ask for the certificate and check who issued it, what scope it covers and when it expires. If a vendor can’t show the document, treat the claim as unproven.",
        },
      ]}
    >
      <p>
        AI calling demos are easy to make impressive. The agent is polite, the script is short, the caller is a colleague
        who knows what to say. What decides whether it works for you is everything the demo doesn’t show. Real leads who
        interrupt. Hindi on a bad line. What happens after the call. What the bill looks like after a month of retries.
      </p>
      <p>
        These 20 questions cover what a demo usually leaves out. They are grouped by topic, and at the end there is a
        one-page table you can print or paste into an RFP. None of them are specific to any vendor, including us.
      </p>

      <h2 id="how-to-use">How to use this checklist</h2>
      <ul>
        <li>Send the questions in writing and ask for written answers. Vague answers on paper are easier to spot.</li>
        <li>Ask for evidence: a live call, a screen share of the call log, a sample invoice, a contract clause.</li>
        <li>Score each answer 0 (no or unclear), 1 (partly) or 2 (clear, with evidence). Compare vendors on the same sheet.</li>
        <li>Weight the questions that matter most for your use case. For collections, compliance matters more. For admissions, speed and handoff do.</li>
      </ul>

      <h2 id="conversation">Conversation quality</h2>
      <p>
        <strong>1. Can I call your agent right now, on a real phone line, with a script close to mine?</strong> A recorded
        demo tells you almost nothing. Call from an ordinary mobile, interrupt, go quiet, ask something off-script. If the
        vendor needs a week to set up a test call, find out why.
      </p>
      <p>
        <strong>2. What happens when the caller interrupts, goes silent or says “hmm” mid-sentence?</strong> The agent
        should stop for a real interruption but carry on through a short “haan” or “okay”. It should recover from silence
        without looping (“Hello? Are you there? Hello?”) and end politely if it can’t hear the caller.
      </p>
      <p>
        <strong>3. How do you stop the agent from inventing answers?</strong> Ask what the agent does when a caller asks
        something the script doesn’t cover, such as a price it wasn’t given. The right answer is “it says it will find
        out, or hands over”, not “the model is very accurate”.
      </p>

      <h2 id="languages">Languages</h2>
      <p>
        <strong>4. Which languages are in production today, and which are only supported by the speech engine?</strong>{" "}
        Speech engines often list many Indian languages. That doesn’t mean the vendor has tuned scripts, grammar and
        testing for each one. Ask which languages have live customer calls running, and ask to hear one.
      </p>
      <p>
        <strong>5. Can I hear the exact voice and engine that will go out, and change it later?</strong> Preview voices
        on the same phone-quality audio your callers will hear. Ask whether switching voice or engine later means
        rebuilding the agent.
      </p>

      <h2 id="telephony">Telephony and numbers</h2>
      <p>
        <strong>6. Whose phone lines are the calls made on, and what caller ID will my leads see?</strong> Some vendors
        include telephony. Others expect you to bring SIMs, a dialler or a telecom contract. Ask which number series your
        calls will show, and who owns the numbers if you leave.
      </p>
      <p>
        <strong>7. What limits protect me from runaway calling?</strong> Look for a daily call cap, protection against
        dialling the same lead twice, a maximum call length, answering-machine handling, and retry limits with a gap
        between attempts. Ask what happens when your balance runs out: do calls stop, or does the bill keep growing?
      </p>

      <h2 id="compliance">Compliance and DLT</h2>
      <p>
        <strong>8. Who registers us on DLT and declares our automated calling, and who pays for it?</strong> Commercial
        calls in India go through TRAI’s DLT framework. TRAI’s September 2026 amendment defines Application-to-Person
        (A2P) calls to include artificial-voice calls, and requires senders to declare them to their operator in advance,
        with the number ranges used. Calls made without that declaration are treated as spam. Ask exactly which steps the
        vendor handles and which stay with you.
      </p>
      <p>
        <strong>9. How are calling windows, opt-outs and consent records handled?</strong> Can you restrict calls to set
        hours? When a caller says “don’t call me again”, does that stop future calls automatically? Can you export
        evidence of when and how each lead came in? Be wary of any vendor that says it “guarantees” compliance. Your
        consent records and call categories are your responsibility.
      </p>
      <Callout tone="info">
        <p>
          For the rules themselves, see our guide to{" "}
          <Link href="/blog/trai-dlt-rules-ai-calling/">TRAI and DLT rules for AI calling</Link>.
        </p>
      </Callout>

      <h2 id="workflow">CRM, workflow and post-call actions</h2>
      <p>
        <strong>10. How do leads get in, and how do outcomes get out?</strong> Ask for the exact mechanism: native
        integration (name the product and version), webhooks, CSV, or a lead form connector. “We integrate with
        everything” is not an answer. Ask to see a lead arrive and get called in the demo.
      </p>
      <p>
        <strong>11. What happens after each call, and who sets the rules?</strong> You want your own outcome list, clear
        rules for each outcome (assign to a rep, retry, stop), meetings booked on your calendar, and follow-up messages
        sent only when the caller agreed to them. Ask how you change these rules without raising a ticket.
      </p>
      <p>
        <strong>12. How does a live transfer to a human work, and what happens if nobody picks up?</strong> Ask what the
        caller hears during the transfer, how many numbers it tries, and what the lead record shows if the transfer
        fails.
      </p>

      <h2 id="analytics">Analytics and QA</h2>
      <p>
        <strong>13. What do I get for every call, and can I export it?</strong> At minimum you need the transcript, the
        recording (if you switch recording on), the outcome, the answers captured, and timings. Check that export works
        in a format your team can use.
      </p>
      <p>
        <strong>14. How will I know a call went badly without listening to all of them?</strong> Ask whether the system
        flags problem calls on its own: long silences, the agent not hearing the caller, failed transfers, voicemails
        marked as “not interested”. Without that, quality checks mean random listening. See{" "}
        <Link href="/blog/measure-ai-call-quality/">how to measure AI call quality</Link>.
      </p>

      <h2 id="pricing">Pricing</h2>
      <p>
        <strong>15. What is the billing pulse, and what counts as a billable minute?</strong> Per second, per 30 seconds,
        or per minute rounded up? With a per-minute pulse, a 61-second call costs two minutes. Ask whether ringing time,
        unanswered calls, voicemails and failed transfers are billed.
      </p>
      <p>
        <strong>16. What else is on the bill?</strong> Monthly minimums, annual commitments, setup fees, number rental,
        DLT registration, charges for post-call analysis or transcription, WhatsApp message costs, and GST. Ask for a
        sample invoice for a month like yours.
      </p>
      <p>
        <strong>17. How do retries affect cost?</strong> Unanswered leads get called again, and each attempt may carry a
        charge. Ask the vendor to model your volume. A useful number to compare vendors on:
      </p>
      <Callout tone="tip" title="Compare on effective cost">
        <p>
          Effective cost per connected minute = total monthly bill (including minimums, fees and GST) ÷ minutes of calls
          where a person actually spoke. Better still, divide the same bill by the number of qualified leads it produced.
        </p>
      </Callout>

      <h2 id="data-security">Data and security</h2>
      <p>
        <strong>18. Who can hear our recordings and read transcripts, how long are they kept, and can we delete them?</strong>{" "}
        Ask which of the vendor’s staff can access call data and why, whether your own team’s access can be limited by
        role, the retention period, and how deletion works. This matters legally. Under India’s Digital Personal Data
        Protection Act, 2023, the business that decides the purpose of processing (the data fiduciary) is responsible
        for processing done on its behalf by a data processor. It may engage a processor only under a valid contract, and
        it must make the processor erase data once the purpose is served or consent is withdrawn (unless the law requires
        keeping it). The DPDP Rules, notified on 14 November 2025, phase in over 18 months, so build this into the contract
        now.
      </p>
      <p>
        <strong>19. Which security certifications do you actually hold? Show me.</strong> Logos on a website are not
        evidence. A SOC 2 is a report by a CPA firm, acting as service auditor, on controls relevant to security, availability,
        processing integrity, confidentiality or privacy. Ask for the report and the period it covers. For ISO/IEC 27001,
        ask for the certificate, who issued it, its scope and its expiry. “In progress” or “our cloud provider is
        certified” is not the same as the vendor being certified.
      </p>

      <h2 id="pilot-exit">Pilot design and exit</h2>
      <p>
        <strong>20. What does the pilot look like, how will we judge it, and how do we leave?</strong> A good pilot uses
        real leads from one source, runs for two to four weeks, and has one agreed metric, usually cost per qualified lead
        or bookings against your current process. Agree in advance how many calls you will listen to. For exit, get in
        writing: notice period, export of call logs, transcripts and recordings in a standard format, what happens to your
        numbers, and when your data is deleted.
      </p>

      <h2 id="printable">The checklist on one page</h2>
      <Table
        head={["#", "Question", "A good answer includes", "Red flag"]}
        rows={[
          ["1", "Can I call your agent now with my script?", "A live number today, your script within days", "Only recorded demos"],
          ["2", "Interruptions, silence, “hmm”?", "Stops for real interruptions, carries on through backchannels", "Talks over callers or loops"],
          ["3", "What stops invented answers?", "Says it will check or hands over", "“The model is very accurate”"],
          ["4", "Which languages are in production?", "Named languages with live calls", "A long engine-support list"],
          ["5", "Can I hear the exact voice?", "Phone-quality preview, easy switch", "Studio-quality samples only"],
          ["6", "Whose lines and caller ID?", "Clear telephony and number series", "“Bring your own SIMs”"],
          ["7", "Limits on runaway calling?", "Caps, duplicate protection, retry limits", "No limits, post-paid only"],
          ["8", "Who handles DLT and A2P declaration?", "Named steps, named costs", "“Not needed for AI”"],
          ["9", "Calling windows, opt-outs, consent?", "Configurable hours, automatic stop on opt-out", "“We guarantee compliance”"],
          ["10", "How do leads get in and outcomes out?", "Exact mechanism, shown live", "“We integrate with everything”"],
          ["11", "Post-call rules?", "Your outcomes, your rules, self-serve", "Changes need a ticket"],
          ["12", "Live transfer and failure?", "Defined fallback, logged", "Caller left on hold"],
          ["13", "Per-call record and export?", "Transcript, outcome, answers, timings, export", "Summary only"],
          ["14", "Problem calls flagged automatically?", "Reasons shown per call", "Listen to everything yourself"],
          ["15", "Billing pulse?", "Stated in writing", "Evasive, or per-minute plus billed ringing"],
          ["16", "Everything else on the bill?", "Sample invoice", "Surprise fees"],
          ["17", "Cost of retries?", "Modelled on your volume", "Not known"],
          ["18", "Access, retention, deletion?", "Role-based access, set retention, deletion on request", "“Data is kept forever”"],
          ["19", "Certifications?", "Report or certificate shown", "Logos only"],
          ["20", "Pilot metric and exit?", "Agreed metric, export, notice terms", "Lock-in with no export"],
        ]}
        caption="Score each answer 0, 1 or 2. Ask for evidence, not adjectives."
      />

      <WhereTelleoFits>
        <p>
          Our own answers, briefly. You can call a live Telleo agent now on +91 80353 74489. Telephony is included. Billing
          is per minute of call, rounded up, from ₹3.49 a minute, with plan minimums on the monthly plans and none on the
          annual plan. DLT registration is ₹5,900 a year at actuals. Post-call analysis of AI calls is free. The full table
          is on the <Link href="/pricing/">pricing page</Link>.
        </p>
        <p>
          Leads come in from Meta and Google lead forms, CSV and anything that can send a webhook, and outcomes can go out
          by webhook. We don’t have native integrations with third-party CRMs. Every AI call has a transcript, an outcome from your own list and a green, amber or red health
          verdict. Full transcripts are visible only to roles allowed to see caller details. Ask us all 20 questions. See
          also our <Link href="/security/">security page</Link>.
        </p>
      </WhereTelleoFits>

      <Sources
        items={[
          { label: "TRAI — Press Release No. 119/2026 on the TCCCPR (Third Amendment) Regulations, 2026, including A2P calls (18 Sep 2026)", url: "https://www.trai.gov.in/sites/default/files/2026-09/PR_No119of2026.pdf", checked: CHECKED },
          { label: "Government of India — The Digital Personal Data Protection Act, 2023 (Gazette text, via MeitY)", url: "https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf", checked: CHECKED },
          { label: "PIB — DPDP Rules, 2025 Notified (backgrounder, 17 Nov 2025)", url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190655", checked: CHECKED },
          { label: "AICPA & CIMA — SOC 2: SOC for Service Organizations, Trust Services Criteria", url: "https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2", checked: CHECKED },
        ]}
      />
    </BlogShell>
  );
}
