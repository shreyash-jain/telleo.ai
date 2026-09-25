import { BlogShell, postMetadata, Callout, Steps, Table, WhereTelleoFits, Sources } from "@/components/BlogShell";
import Link from "next/link";

export const metadata = postMetadata("trai-dlt-rules-ai-calling");

const CHECKED = "2026-09-25";

export default function Page() {
  return (
    <BlogShell
      slug="trai-dlt-rules-ai-calling"
      takeaways={[
        "Any business making commercial calls in India must be registered on the operators’ DLT platform. Calls from unregistered senders are treated as spam.",
        "TRAI’s September 2026 amendment defines A2P calls to include “pre-recorded/artificial voice technologies”. AI voice agents must be declared to your telecom operator in advance, with the number ranges they use.",
        "Promotional calls use 140-series numbers. Service and transactional calls are moving to 1600-series (BFSI and government) and 1601-series (utilities, courier, logistics).",
        "A customer’s enquiry now supports commercial calls for only 7 days, and you must keep the enquiry in a verifiable form. Call web leads quickly and keep the form record.",
        "Several points are still unclear for AI calls, such as content templates for live speech and number series for other sectors. Confirm them with your operator and a lawyer.",
      ]}
      toc={[
        { id: "tcccpr-and-dlt", label: "TCCCPR 2018 and the DLT system" },
        { id: "what-you-register", label: "What you register on DLT" },
        { id: "call-categories", label: "Promotional, service and transactional" },
        { id: "number-series", label: "Number series: 140, 1600, 1601" },
        { id: "dnd-and-consent", label: "DND preferences and consent" },
        { id: "calling-hours", label: "Is there a rule on calling hours?" },
        { id: "penalties", label: "What happens if you break the rules" },
        { id: "what-changed", label: "What changed in 2025 and 2026" },
        { id: "ai-calls", label: "What this means for AI voice calls" },
        { id: "checklist", label: "Pre-launch checklist" },
      ]}
      faqs={[
        {
          q: "Do AI voice calls need DLT registration in India?",
          a: "Yes, if the calls are commercial. TCCCPR requires every sender of commercial communication to be registered with an access provider, and treats commercial calls from unregistered senders as unsolicited commercial communication. Since TRAI’s September 2026 amendment, automated calls, including those using artificial voice, must also be declared to your originating operator as A2P calls, with the number ranges you will use.",
        },
        {
          q: "Can an AI agent call a lead who filled a form on my website?",
          a: "The 2026 amendment allows commercial communication based on a customer’s enquiry for seven days from the enquiry, and the enquiry must be in writing or digital and kept in a verifiable form. After that you need another basis, such as explicit consent recorded on the DLT consent system. How a particular campaign should be classified (promotional or service) and scrubbed against DND preferences is worth confirming with your operator.",
        },
        {
          q: "What is an A2P call under TRAI’s 2026 amendment?",
          a: "An Application-to-Person call is a voice call initiated by an application, software system or automated platform without direct human dialling, including autodialling, robo-calls and pre-recorded or artificial voice. Senders must declare A2P calling to their originating operator in advance. Undeclared A2P calls are treated as unsolicited commercial communication. These provisions come into force 60 days after the amendment’s publication in the Gazette.",
        },
        {
          q: "Which number series should AI calls use?",
          a: "Promotional calls use the 140 series. Service and transactional calls by banks, other financial entities, insurers and government use the 1600 series. Utilities, courier and logistics companies are being moved to the 1601 series from August 2026. For service calls in other sectors we found no sector-specific series announced yet, so ask your operator which numbers to use.",
        },
        {
          q: "Is there a legal calling time window for telemarketing in India?",
          a: "TCCCPR has no single calling-hours clause. Instead, customers set time-band preferences, and four bands (midnight to 10:00 and 21:00 to midnight) are off by default for everyone. In practice that means promotional communication between 10:00 and 21:00 unless a customer opts in to other bands. Sector rules add to this. For example, RBI tells lenders and their agents not to call borrowers before 8:00 a.m. or after 7:00 p.m. about overdue loans.",
        },
        {
          q: "Do I have to tell people they are talking to an AI?",
          a: "The disclosure TCCCPR asks for is to your telecom operator, which must know in advance that you run automated calls. In the TCCCPR text we read, we did not find a rule that the call itself must announce that the caller is an AI. Many businesses say so anyway because it builds trust, and sector regulators or future rules could require it. Check with counsel for your sector.",
        },
      ]}
    >
      <p>
        If you are putting an AI voice agent on the phone in India, the rules that apply were not written for AI. They were
        written for telemarketing: TRAI’s Telecom Commercial Communications Customer Preference Regulations, 2018
        (TCCCPR). TRAI has amended them twice since, in February 2025 and on 18 September 2026. The 2026 amendment is the
        first to name artificial voice directly.
      </p>
      <p>
        This guide covers the rules as they stand on 25 September 2026, what they mean for AI calls, and where they are
        still unclear. Every point comes from TRAI’s published regulations and press releases, listed at the end.
      </p>

      <Callout tone="warn" title="This is not legal advice">
        <p>
          We build AI calling software. We are not lawyers. This is our reading of TRAI’s regulations and press releases
          as of 25 September 2026. Rules change, operators apply them in different ways, and your sector may have its own
          rules. Before you launch a campaign, confirm the details with your telecom operator and, for anything that
          matters, with a lawyer.
        </p>
      </Callout>

      <h2 id="tcccpr-and-dlt">TCCCPR 2018 and the DLT system</h2>
      <p>
        TRAI issued TCCCPR on 19 July 2018. A commercial call or SMS is legitimate only if the sender is registered, the
        person receiving it has not blocked that kind of communication (or has consented to it), and every step is
        recorded on a ledger all operators can check. The regulation required operators (TRAI calls them access
        providers) to adopt Distributed Ledger Technology, hence “DLT”. Since the 2025 amendment, commercial
        communication from an unregistered sender is treated as unsolicited commercial communication (UCC), TRAI’s term
        for spam.
      </p>
      <p>
        Each operator runs its own DLT portal (Vodafone Idea’s is Vilpower, for example). Your business is the{" "}
        <em>principal entity</em> or <em>sender</em>. A <em>telemarketer</em> is a registered entity that delivers the
        calls or messages for you.
      </p>

      <h2 id="what-you-register">What you register on DLT</h2>
      <Steps
        items={[
          {
            title: "Your business (principal entity)",
            body: "Who you are, verified against business documents. Since 2025, registration also involves physical verification, biometric authentication and a linked mobile number.",
          },
          {
            title: "Headers and calling numbers",
            body: "For SMS, the sender ID. For voice, the calling line identity (CLI): the number your calls show, from the 140 series or another series TRAI or DoT designates.",
          },
          {
            title: "Content templates",
            body: "The fixed text of transactional and service messages, with variable parts marked. TRAI’s 2018 explanatory memorandum says transactional voice content should be registered as a template of the transcript.",
          },
          {
            title: "Consent templates and consent records",
            body: "Explicit consent is recorded on the Consent Register: the customer sees the consent template, agrees and confirms by OTP. From the 2026 amendment, consent collected earlier through verifiable means can be registered later.",
          },
          {
            title: "Your telemarketer chain",
            body: "Who delivers your traffic. Since 2025 the number of intermediaries is limited, so every call can be traced back to you.",
          },
        ]}
      />

      <h2 id="call-categories">Promotional, service and transactional calls</h2>
      <p>TCCCPR sorts commercial communication into categories, and the rules differ for each.</p>
      <ul>
        <li>
          <strong>Promotional:</strong> anything containing promotional material or advertising for a product or service.
          If promotional content is mixed into any other commercial call, the whole call counts as promotional.
        </li>
        <li>
          <strong>Transactional:</strong> sent to your customer in response to a transaction the customer started, within
          thirty minutes of it. Examples are OTPs, transaction alerts and confirmations. No explicit consent is needed.
        </li>
        <li>
          <strong>Service:</strong> sent to your customer about a product or service they already have (warranty,
          delivery, recalls, balance alerts and similar), and not promotional. Also covers calls that help complete an
          ongoing purchase after explicit consent. Under the 2026 text, that consent lasts up to seven days, and the customer
          can renew it for another seven days at a time.
        </li>
        <li>
          <strong>Government:</strong> sent on the directions of central or state government, or of TRAI. It cannot be
          blocked through preferences.
        </li>
      </ul>
      <p>
        Rough examples: an AI call pitching a course to a new web lead is promotional; a fee-due reminder to an enrolled
        student is probably service; a call confirming an order placed minutes ago may be transactional. Confirm your own
        campaigns with your operator, and remember that one upsell line makes a service call promotional.
      </p>

      <h2 id="number-series">Number series: 140, 1600 and 1601</h2>
      <p>
        TRAI’s February 2025 amendment stops senders from using ordinary 10-digit numbers for telemarketing. Commercial
        calls come from designated series, so people can tell from the caller ID what kind of call it is.
      </p>
      <Table
        head={["Series", "Meant for", "Who and when"]}
        rows={[
          ["140xx", "Promotional calls", "Continues as the promotional series (2025 amendment)."],
          [
            "1600xx",
            "Service and transactional calls by BFSI and government",
            "Commercial banks by 1 Jan 2026; large NBFCs, payments banks and small finance banks by 1 Feb 2026; mutual funds, AMCs, pension CRAs and fund managers, and IRDAI-regulated insurers by 15 Feb 2026; other NBFCs, co-operative banks and RRBs by 1 Mar 2026; qualified stockbrokers by 15 Mar 2026.",
          ],
          [
            "1601xx",
            "Service and transactional calls by other sectors",
            "Direction of 10 Aug 2026. Phase I covers utilities, courier and logistics, with operators to onboard them within 90 days. Allotted directly to verified entities, not to aggregators. Never for promotional calls.",
          ],
        ]}
        caption="Sources: TRAI and PIB press releases of 12 Feb 2025, 19 Nov 2025, 17 Dec 2025 and 10 Aug 2026."
      />
      <p>
        The 2026 amendment also protects these series. Operators’ AI spam filters may not flag 140xx, 1600xx or 1601xx
        numbers as suspected spam, and call-management apps may not blanket-block or spam-tag them (a user can still block
        any number on their own phone).
      </p>
      <Callout tone="info" title="A gap to ask about">
        <p>
          If you are in education, real estate, healthcare or another sector outside BFSI, government and the Phase I
          1601 sectors, we did not find a service-call series announced for you yet. Ask your operator which numbers your
          service calls should use today.
        </p>
      </Callout>

      <h2 id="dnd-and-consent">DND preferences and consent</h2>
      <p>
        Customers set their preferences by calling or texting 1909, by USSD, through their operator’s app, or with
        TRAI’s DND app. They can block all promotional communication, or only some categories. The categories are
        banking, insurance, financial products and credit cards; real estate; education; health; consumer goods and
        automobiles; communication, broadcasting, entertainment and IT; tourism and leisure; and food and beverages.
      </p>
      <p>
        Customers can also block by <strong>mode</strong>: voice calls, SMS, auto-dialler calls with a pre-recorded
        announcement, auto-dialler calls connected to a live agent, and robo-calls. They can block by{" "}
        <strong>time band</strong> and by <strong>day type</strong> too.
      </p>
      <ul>
        <li>
          <strong>Explicit consent</strong> recorded in the Consent Register lets a promotional call through even when
          the customer has blocked that category.
        </li>
        <li>
          <strong>Enquiries count for seven days.</strong> Under the 2026 amendment, a customer’s enquiry supports
          commercial communication for only seven days from the enquiry. The enquiry must be in writing or digital, and you
          must keep it in a verifiable form. The 2018 text allowed three months for an enquiry.
        </li>
        <li>
          <strong>Opt-outs stick.</strong> Since 2025, you may not ask someone who opted out for consent again for 90
          days. Promotional messages must carry an opt-out option.
        </li>
        <li>
          <strong>Complaints are easier.</strong> Customers can complain within seven days (it used to be three). They can
          complain about unregistered senders without registering any preference first. They can also report suspected
          spam or fraud on the Department of Telecommunications’ Sanchar Saathi portal, through its Chakshu facility.
        </li>
        <li>
          <strong>Data protection still applies.</strong> The 2026 amendment says TCCCPR consent does not exempt a sender
          from its obligations under the Digital Personal Data Protection Act, 2023.
        </li>
      </ul>

      <h2 id="calling-hours">Is there a rule on calling hours?</h2>
      <p>
        We found no single “calling hours” clause for all commercial calls. What TCCCPR has is time-band preferences.
        Of the nine bands in its schedule, four are <strong>off by default</strong> for every
        customer unless the customer switches them on: 00:00–06:00, 06:00–08:00, 08:00–10:00 and 21:00–24:00. Read
        plainly, promotional communication is expected between 10:00 and 21:00 unless a customer has opted in to other
        bands. The 2026 amendment confirms that service and transactional communication is not blocked by time band.
      </p>
      <p>
        Sector rules can add limits. For example, RBI’s 2022 circular on recovery agents tells lenders to make sure
        they and their agents do not call borrowers before 8:00 a.m. or after 7:00 p.m. to recover overdue loans. If your AI
        agent makes collection calls for a lender, that window applies.
      </p>

      <h2 id="penalties">What happens if a sender breaks the rules</h2>
      <ul>
        <li>
          <strong>Complaint-based action (2025):</strong> with complaints from five or more people within ten days, and
          an investigation that finds spam, all your outgoing services (PRI and SIP trunks included) are barred by every
          operator for 15 days. On a repeat, all your telecom resources are disconnected for a year and you are
          blacklisted.
        </li>
        <li>
          <strong>AI-flag-based action (2026):</strong> if operators’ AI/ML systems flag five or more of your numbers
          within ten days, you face KYC re-verification, then physical verification and a 15-day barring if misuse is
          found, then the one-year disconnection. Three complaints plus an AI flag will also trigger action (from 90 days
          after publication).
        </li>
        <li>
          <strong>Security deposits:</strong> operators may take one from senders and telemarketers and forfeit it for
          violations.
        </li>
        <li>
          <strong>Money penalties</strong> mostly fall on operators (for example ₹2 lakh, then ₹5 lakh, then ₹10 lakh per
          instance for misreporting spam counts). For a business, the real cost is losing its phone lines.
        </li>
      </ul>

      <h2 id="what-changed">What changed in 2025 and 2026</h2>
      <Table
        head={["When", "Change", "Why it matters for AI calls"]}
        rows={[
          ["Feb 2025", "10-digit numbers restricted for telemarketing; 140 promotional, 1600 service and transactional", "Your agent’s caller ID must come from the right series"],
          ["Feb 2025", "Advance notice to the operator of auto-dialler or robo-call use; tougher complaint rules", "The first rule aimed at automated calling"],
          ["Sep 2026", "A2P call defined, including “pre-recorded/artificial voice”; advance declaration with CLI ranges; undeclared A2P calls count as spam", "Applies directly to AI voice agents"],
          ["Sep 2026", "Operators may charge each other up to 5 paise a minute for A2P calls, except on designated series", "A cost signal that pushes automated calls onto 140, 1600 and 1601"],
          ["Sep 2026", "Enquiry-based communication limited to seven days, and the enquiry must be verifiable", "Call web leads quickly and keep the form record"],
          ["Sep 2026", "Operators’ AI flags feed enforcement; call-management apps cannot blanket-tag designated series", "Your calling pattern is watched as well as your complaints"],
        ]}
      />
      <p>
        The 2026 amendment was notified on 18 September 2026. Most of it comes into force 30 days after publication in
        the Official Gazette, the A2P declaration and A2P charge after 60 days, and the appeal mechanism and
        AI-corroborated complaint threshold after 90 days. None of it is in force as we write, but plan for it now.
      </p>

      <h2 id="ai-calls">What this means for AI voice calls</h2>
      <p>
        <strong>Your AI agent is an A2P caller.</strong> The 2026 definition covers calls “initiated by an
        application, software system, or automated platform without direct human dialling”, including
        “pre-recorded/artificial voice technologies”. Back in 2018, TCCCPR already defined robo-calls as calls “using an
        artificial or prerecorded voice to interactively deliver a voice message without the involvement of human being on
        calling side”. A conversational AI agent fits both definitions as we read them.
      </p>
      <p>
        <strong>TRAI considered carving AI out, and decided not to.</strong> During consultation, stakeholders asked for
        AI-enabled calls, agent-assisted calls and calls handed from an AI or IVR to a human to be excluded from A2P
        declaration. TRAI kept the definition. It explained that the network cannot tell a human voice from “a
        pre-recorded or artificially generated human voice”, so bulk callers must declare A2P calling themselves.
      </p>
      <p>
        <strong>People can block robo-calls specifically</strong> through the “robo-calls” mode. Ask your operator how AI
        calls are scrubbed against it.
      </p>
      <p>
        <strong>Your calling pattern matters.</strong> The 2025 amendment tells operators to watch for unusually high
        call volumes, short call durations and low incoming-to-outgoing ratios. A campaign with thousands of very short
        calls can look like spam even when the content is fine.
      </p>
      <p>These points are still unclear for AI calls. Raise each one with your operator:</p>
      <ul>
        <li>
          <strong>Content templates for live speech.</strong> An AI agent composes what it says during the call. We found
          no published way to register that. Ask your operator what they expect.
        </li>
        <li>
          <strong>Mixed calls.</strong> A service call that drifts into an offer becomes promotional. Keep the agent in
          its category.
        </li>
        <li>
          <strong>Service calls in other sectors.</strong> Which series to use is not settled in anything we found.
        </li>
        <li>
          <strong>Telling the caller it is an AI.</strong> TCCCPR’s disclosure is to the operator. We found no TCCCPR rule
          that the call must announce an AI. Many teams disclose anyway, and sector rules may differ.
        </li>
        <li>
          <strong>Live transfer to a human.</strong> TRAI declined to exclude AI calls that hand over to a human, so treat
          them as A2P.
        </li>
      </ul>

      <h2 id="checklist">A pre-launch checklist</h2>
      <Steps
        items={[
          { title: "Confirm your DLT registration", body: "Register as a principal entity and find out which registered telemarketer delivers your calls." },
          { title: "Get the right numbers", body: "140 series for promotional campaigns; for service calls, the series your operator confirms for your sector." },
          { title: "Declare A2P calling", body: "Tell your originating operator that you run automated calls, and from which number ranges. Don’t wait for the 60-day date." },
          { title: "Classify each campaign", body: "Promotional or service? Keep offers out of service scripts." },
          { title: "Keep consent and enquiry evidence", body: "Save the form, timestamp, source and the text the person agreed to. Call enquiries within seven days." },
          { title: "Honour opt-outs on the call", body: "When someone says “don’t call me”, stop calling them, record it, and don’t ask again for 90 days." },
          { title: "Set calling windows", body: "Promotional calls between 10:00 and 21:00, plus any sector rules, such as RBI’s 8:00 a.m. to 7:00 p.m. window for recovery calls." },
          { title: "Watch your patterns", body: "Track complaints, very short calls and daily volumes before your operator does." },
        ]}
      />

      <WhereTelleoFits>
        <p>
          Telleo <strong>registers DLT with you</strong>. The principal-entity registration is ₹5,900 a year, charged at
          actuals (see <Link href="/pricing/">pricing</Link>). Campaigns run inside <strong>calling windows you choose</strong>,
          with a daily call cap, duplicate-dial protection and answering-machine handling. Your own dispositions can include
          a “do not call” outcome with a rule that stops further calls. Every AI call has a full transcript, and recording
          can be switched on for every call, so you have a record of what was said.
        </p>
        <p>
          We do not guarantee TRAI or DND compliance. How your calls are classified, the consent you hold and your number
          series are decisions to confirm with your operator and counsel. Our <Link href="/security/">security and compliance
          page</Link> explains what we handle.
        </p>
      </WhereTelleoFits>

      <Sources
        items={[
          { label: "TRAI — Telecom Commercial Communications Customer Preference Regulations, 2018 (notification of 19 July 2018)", url: "https://www.trai.gov.in/sites/default/files/2024-09/RegulationUcc19072018.pdf", checked: CHECKED },
          { label: "TRAI — TCCCPR (Second Amendment) Regulations, 2025", url: "https://trai.gov.in/sites/default/files/2025-02/Regulation_12022025.pdf", checked: CHECKED },
          { label: "PIB — TRAI Strengthens Consumer Protection with Amendments to TCCCPR, 2018 (12 Feb 2025)", url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2102413", checked: CHECKED },
          { label: "TRAI — TCCCPR (Third Amendment) Regulations, 2026, with explanatory memorandum (18 Sep 2026)", url: "https://www.trai.gov.in/sites/default/files/2026-09/Regulation_18092026.pdf", checked: CHECKED },
          { label: "TRAI — Press Release No. 119/2026: Strengthening the framework for curbing UCC (18 Sep 2026)", url: "https://www.trai.gov.in/sites/default/files/2026-09/PR_No119of2026.pdf", checked: CHECKED },
          { label: "TRAI — Press Release No. 135/2025: 1600-series adoption by RBI, SEBI and PFRDA entities (19 Nov 2025)", url: "https://www.trai.gov.in/sites/default/files/2025-11/PR_No.135of2025.pdf", checked: CHECKED },
          { label: "PIB — TRAI mandates 1600-series for IRDAI-regulated entities (17 Dec 2025)", url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2205350", checked: CHECKED },
          { label: "TRAI — Press Release No. 113/2026: 1601-series for utilities, courier and logistics (10 Aug 2026)", url: "https://www.trai.gov.in/sites/default/files/2026-08/PR_No113of2026_1.pdf", checked: CHECKED },
          { label: "RBI — Outsourcing of Financial Services: Responsibilities of regulated entities employing Recovery Agents (12 Aug 2022)", url: "https://www.rbi.org.in/scripts/NotificationUser.aspx?Id=12378&Mode=0", checked: CHECKED },
          { label: "DoT Sanchar Saathi — Chakshu: report suspected fraud and spam communication", url: "https://sancharsaathi.gov.in/sfc/", checked: CHECKED },
          { label: "Vodafone Idea — Vilpower DLT portal", url: "https://www.vilpower.in/", checked: CHECKED },
        ]}
      />
    </BlogShell>
  );
}
