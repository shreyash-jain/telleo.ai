import { BlogShell, postMetadata, Callout, Steps, Table, WhereTelleoFits, Sources } from "@/components/BlogShell";
import Link from "next/link";

export const metadata = postMetadata("ai-calling-cost-india");

export default function Page() {
  return (
    <BlogShell
      slug="ai-calling-cost-india"
      takeaways={[
        "India-priced AI calling on the public pages we checked lists at ₹3.49 to ₹6 a minute; US developer platforms quote in dollars and bill each component separately.",
        "The per-minute rate is only part of the bill: minimums, billing pulses, retries, phone numbers, concurrency, WhatsApp fees and DLT registration all add up.",
        "“Unlimited” plans are capped by concurrency and calling hours, so work out the most minutes you could actually use before comparing.",
        "Compare quotes on cost per connected conversation and per qualified lead, using your own call profile, not the headline rate.",
      ]}
      toc={[
        { id: "pricing-models", label: "The four pricing models" },
        { id: "cost-drivers", label: "What a minute is made of" },
        { id: "hidden-costs", label: "Hidden costs to ask about" },
        { id: "worked-example", label: "A worked monthly example" },
        { id: "compare-quotes", label: "How to compare quotes" },
      ]}
      faqs={[
        {
          q: "What does AI calling cost per minute in India?",
          a: "On public pages checked on 25 September 2026, India-priced rates ranged from ₹3.49 to ₹6 a minute as listed (Telleo ₹3.49–₹3.99 excluding GST; Ringg ₹6 per connected minute, with tax treatment not stated). Monthly minimums, phone numbers and billing units change the real figure, so model your own call profile.",
        },
        {
          q: "Are unanswered calls charged?",
          a: "It depends on the vendor. Ask each one how it bills calls that ring out, are busy, or are picked up by voicemail, and whether a connected call has a minimum charge. Ringg, for example, prices per connected minute.",
        },
        {
          q: "Is “unlimited” AI calling really unlimited?",
          a: "Not in practice. Unlimited plans come with a fair-use policy, a daily calling window and a cap on simultaneous calls. Multiply concurrent calls by hours in the window to get the real ceiling on minutes.",
        },
        {
          q: "Do I need DLT registration for AI calls?",
          a: "TRAI’s regulations require a sender to be registered with an access provider before making commercial communications, and to notify the operator in advance about auto-dialer or robo-calls. Ask your vendor who handles the registration and what the yearly fee is.",
        },
        {
          q: "Is GST included in AI calling prices?",
          a: "Check each quote. Telleo’s prices exclude 18% GST. Some vendor pages do not say either way, so ask for a sample invoice before you sign.",
        },
        {
          q: "Is AI calling cheaper than hiring telecallers?",
          a: "Work it out per conversation. For people, include salary, incentives, supervision, phones and attrition. For AI, include minutes, fees and the time someone spends reviewing calls. Then compare the cost of each qualified lead, not each hour.",
        },
      ]}
    >
      <p>
        Ask five AI calling vendors for a price and you will get five different shapes of answer: a per-minute rate, a per-minute rate plus a platform fee, a monthly bundle, an “unlimited” plan, or a component-by-component calculator in US dollars. None of them is wrong, but they are hard to compare.
      </p>
      <p>
        This guide explains the pricing models, what actually goes into a minute of AI calling, the costs that do not appear on the pricing page, and how to turn any quote into a number you can compare. All vendor prices below were read from each vendor’s public pricing page on 25 September 2026 and are listed in the sources. Prices change, so check again before you buy.
      </p>

      <h2 id="pricing-models">The four pricing models</h2>
      <Table
        head={["Model", "How it works", "Public example", "Watch for"]}
        rows={[
          [
            "Bundled per minute",
            "One rate covers speech recognition, the AI model, the voice and the phone line.",
            "Ringg: ₹6 per connected minute, including speech-to-text, text-to-speech, the language model and telephony. Phone number ₹499 a month.",
            "Ringg’s FAQ says pricing is based on usage and a monthly minimum commitment; the amount is not listed.",
          ],
          [
            "Per minute with a minimum or platform fee",
            "A per-minute rate, plus a monthly minimum or yearly fee.",
            "Telleo: ₹3.99 a minute with a ₹3,499 or ₹6,999 monthly minimum, or ₹19,999 a year plus ₹3.49 a minute. Vapi: $0.05 a minute hosting fee plus model costs; its Pro package has a $999 monthly minimum.",
            "Whether unused minimum is lost at month end, and what the platform fee includes.",
          ],
          [
            "Component pricing",
            "You pay separately for the platform, speech-to-text, the language model, the voice and telephony.",
            "Retell: $0.07 to $0.31 a minute pay-as-you-go, built from $0.055 voice infrastructure plus voice, model and telephony choices. Vapi passes model costs through at cost.",
            "Dollar billing, forex charges, and whether Indian numbers and telephony are available.",
          ],
          [
            "Monthly bundle or “unlimited”",
            "A fixed monthly fee for a set number of minutes, or for unlimited minutes under fair use.",
            "Vomyra: Developer ₹15,000 a month with 2,500 minutes; Unlimited Solo ₹19,999 a month. Prices shown are for annual plans.",
            "Fair-use rules, calling windows and the cap on simultaneous calls.",
          ],
        ]}
      />
      <h3>What “unlimited” means in practice</h3>
      <p>
        Vomyra’s page says unlimited covers Indian-number calling within TRAI-permitted hours, under a fair-use policy with an eight-hour daily window, and caps concurrency at 2, 6 or 15 calls depending on the plan. Two lines for eight hours is at most 960 minutes of calling a day. That is not a criticism; a fixed-price plan needs a ceiling somewhere. The useful question is how many minutes you will really use.
      </p>
      <p>
        At ₹19,999 a month, 3,000 minutes of use works out to about ₹6.67 a minute; 10,000 minutes works out to about ₹2. Unlimited plans are good value if you can keep the lines busy, and expensive if you cannot.
      </p>

      <h2 id="cost-drivers">What a minute of AI calling is made of</h2>
      <p>
        Every AI call uses the same five ingredients. Knowing their list prices helps you understand why quotes differ, and which of your choices push the price up.
      </p>
      <Table
        head={["Component", "What it does", "Public reference prices"]}
        rows={[
          ["Telephony", "Carries the call to a normal phone number", "Plivo India: ₹0.38 a minute outbound, billed in 30-second pulses; numbers ₹200 a month"],
          ["Speech-to-text", "Turns the caller’s voice into text as they speak", "Sarvam: ₹30 per hour of audio (₹0.50 a minute). Deepgram, as listed by Vapi: $0.0095 to $0.0099 a minute"],
          ["Language model", "Decides what to say next", "Sarvam 105B: ₹29.28 per million input tokens, ₹10.98 cached, ₹73.20 output. OpenAI models, as listed by Vapi: $0.0077 to $0.0452 a minute"],
          ["Text-to-speech", "Speaks the reply", "Sarvam: ₹3 per 1,000 characters. Retell: $0.015 a minute for most voices, $0.040 for ElevenLabs"],
          ["Post-call analysis", "Summary, outcome, extracted answers", "Often bundled. Ringg lists advanced analytics at ₹2 per call"],
        ]}
      />
      <p>What that means for your bill:</p>
      <ul>
        <li><strong>Talkative scripts cost more.</strong> Per-character voice pricing charges for every word the agent says, and a long-winded agent also makes every call longer. It sounds worse, too.</li>
        <li><strong>Long prompts cost more on every turn.</strong> The language model re-reads your instructions and the conversation so far each time it replies. A very long script is paid for again on every turn. Cached input is cheaper, which is why Sarvam lists a separate cached rate.</li>
        <li><strong>Premium voices carry a premium.</strong> Retell’s own price list shows one voice provider at more than double the others.</li>
        <li><strong>The platform is the rest.</strong> Orchestration, turn-taking, dashboards, retries, reliability, support and margin sit on top of the raw components. Vapi charges $0.05 a minute for hosting; Retell charges $0.055 for voice infrastructure.</li>
      </ul>

      <h2 id="hidden-costs">Hidden costs to ask about</h2>
      <h3>DLT registration and number series</h3>
      <p>
        Under TRAI’s commercial communication regulations, a sender must be registered with an access provider before making commercial calls, and must tell the originating operator in advance about the use of auto-dialer or robo-calls. TRAI also mandates 140-series numbers for promotional calls. Registration is not free: Telleo, for reference, passes DLT/PE registration through at actuals, ₹5,900 a year. Ask every vendor who registers, who pays, and which number series your calls will use.
      </p>
      <h3>WhatsApp template fees</h3>
      <p>
        If the agent sends a WhatsApp after the call, that message is usually a template, and Meta charges for each template message delivered (per-message pricing since 1 July 2025). Utility templates delivered inside an open 24-hour customer service window are free, and service conversations have been free since 1 November 2024. Meta publishes an INR rate card; ask your vendor whether it passes these fees through at cost or adds a margin.
      </p>
      <h3>Billing pulses</h3>
      <p>
        A pulse is the smallest unit you are billed for. Take one call that lasts 2 minutes 5 seconds:
      </p>
      <Table
        head={["Billing unit", "Minutes billed", "At ₹4 a minute"]}
        rows={[
          ["Per second", "2.08", "₹8.33"],
          ["30-second pulse", "2.5", "₹10"],
          ["Per minute, rounded up", "3", "₹12"],
        ]}
      />
      <p>
        On that call, per-minute billing costs 44% more than per-second billing. Plivo bills Indian telephony in 30-second pulses; Retell tracks calls to the nearest second; Vomyra bills per second. Across thousands of short calls, the billing unit can matter as much as the rate.
      </p>
      <h3>Retries and short calls</h3>
      <p>
        A good follow-up plan calls unanswered leads again. Each retry that lands on voicemail, or is picked up and cut in two seconds, may be billed. Ask how the vendor treats calls that ring out, are busy, or reach voicemail.
      </p>
      <h3>Minimums, numbers and concurrency</h3>
      <ul>
        <li><strong>Monthly minimums:</strong> you pay the floor even in a quiet month.</li>
        <li><strong>Phone numbers:</strong> ₹499 a month at Ringg, ₹200 at Plivo, $2 at Retell.</li>
        <li><strong>Concurrency:</strong> how many calls can run at once. Retell includes 20 and charges $8 a month for each extra; Vomyra’s plans cap it at 2, 6 or 15.</li>
        <li><strong>Currency and tax:</strong> dollar pricing moves with the exchange rate and your card’s forex charges. Check whether GST is included.</li>
      </ul>
      <Callout tone="warn" title="The cost nobody quotes: your time">
        <p>Someone has to write the script, listen to calls in the first weeks and fix what goes wrong. Budget a few hours a week at the start. It is the difference between a pilot that improves and one that is quietly switched off.</p>
      </Callout>

      <h2 id="worked-example">A worked monthly example</h2>
      <p>
        Here is the full arithmetic using Telleo’s public prices, because we know exactly how they work. The call numbers are assumptions for illustration; swap in your own. All prices exclude 18% GST.
      </p>
      <p><strong>The business:</strong> a coaching institute gets 1,500 new enquiries a month and calls every one, with retries for unanswered numbers.</p>
      <ul>
        <li>1,000 leads are reached across all attempts. Assume each conversation lasts 2 minutes 40 seconds; Telleo bills each call per minute, rounded up, so each bills as 3 minutes. That is <strong>3,000 minutes</strong>.</li>
        <li>300 more calls reach voicemail or are cut short. To be safe, we assume each bills as 1 minute: <strong>300 minutes</strong>.</li>
        <li>Total: <strong>3,300 billable minutes</strong>.</li>
      </ul>
      <h3>Example A: a steady month on the Pro plan</h3>
      <Table
        head={["Line", "Arithmetic", "Amount"]}
        rows={[
          ["First 1,750 minutes", "1,750 × ₹3.99", "₹6,982.50"],
          ["Minutes beyond 1,750", "1,550 × ₹3.49", "₹5,409.50"],
          ["Usage (above the ₹6,999 minimum, so the minimum does not apply)", "", "₹12,392.00"],
          ["GST at 18%", "₹12,392 × 0.18", "₹2,230.56"],
          ["Total for the month", "", "₹14,622.56"],
        ]}
      />
      <p>
        That is about <strong>₹12.39 per lead reached</strong> before GST (₹12,392 ÷ 1,000). DLT registration is on top, once a year. If you are comparing with a per-second vendor, use the actual talk time instead: 1,000 calls of 160 seconds plus 300 calls of about 15 seconds is roughly 2,742 minutes, so per-minute rounding adds about 20% here.
      </p>
      <h3>Example B: a seasonal year, Pro vs Annual</h3>
      <p>
        If your calling is seasonal, the picture changes. Say the same institute has four busy months at 3,300 minutes and eight quiet months at 300 minutes.
      </p>
      <Table
        head={["Plan", "Arithmetic", "Year total"]}
        rows={[
          ["Pro, monthly", "4 × ₹12,392 busy months + 8 × ₹6,999 minimum (300 × ₹3.99 = ₹1,197, below the minimum)", "₹1,05,560"],
          ["Annual", "₹19,999 upfront + 15,600 minutes × ₹3.49 (₹54,444)", "₹74,443"],
        ]}
      />
      <p>
        The annual plan is ₹31,117 cheaper over the year, before GST, because quiet months cost nothing beyond the minutes used. With steady, high volume the gap closes: both plans charge ₹3.49 for every minute past 1,750, so at 3,300 minutes every month the annual plan works out to about ₹13,184 a month with the upfront fee spread over twelve months, against ₹12,392 on Pro. Check what each plan includes on the <Link href="/pricing/">pricing page</Link> before you choose.
      </p>

      <h2 id="compare-quotes">How to compare two quotes</h2>
      <Steps
        items={[
          { title: "Write down your call profile", body: "Leads a month, attempts per lead, expected answer rate, average talk time, and share of very short calls. Guess if you must, then correct after the first month." },
          { title: "Price that profile on every quote", body: "Apply each vendor’s billing unit, minimum, number rental, concurrency charge and analysis fee. Add GST and forex where they apply." },
          { title: "Divide by outcomes", body: "Cost per connected conversation, and cost per qualified lead or booked meeting. A cheaper minute that qualifies fewer leads is not cheaper." },
          { title: "Ask the awkward questions in writing", body: "How are ring-outs, busy and voicemail billed? Is unused minimum carried forward? Who pays DLT and WhatsApp fees? What happens at the end of the contract?" },
          { title: "Pilot, then check the invoice", body: "Run a small paid pilot and compare the real invoice with your estimate. Differences point straight at the terms you misunderstood." },
        ]}
      />

      <WhereTelleoFits>
        <p>
          Telleo prices in rupees, per minute. <strong>Starter</strong> is ₹3,499 a month minimum at ₹3.99 a minute (a trial plan for up to three months); <strong>Pro</strong> is ₹6,999 a month minimum at ₹3.99, with ₹3.49 a minute beyond 1,750 minutes; <strong>Pro + CRM</strong> is ₹8,999 a month with no annual lock-in; the <strong>Annual</strong> plan is ₹19,999 a year with ₹3.49 a minute from the first minute and no minimum. All prices exclude 18% GST.
        </p>
        <p>
          Phone lines are included, analysis of every AI call is included at no extra charge, and calls stop when your balance runs out, so a bill cannot run away overnight. Details are on the <Link href="/pricing/">pricing page</Link>.
        </p>
      </WhereTelleoFits>

      <Sources
        items={[
          { label: "Ringg AI — Pricing (2026)", url: "https://www.ringg.ai/pricing", checked: "2026-09-25" },
          { label: "Vomyra — Pricing (2026)", url: "https://www.vomyra.com/pricing", checked: "2026-09-25" },
          { label: "Vapi — Pricing (2026)", url: "https://vapi.ai/pricing", checked: "2026-09-25" },
          { label: "Retell AI — Pricing (2026)", url: "https://www.retellai.com/pricing", checked: "2026-09-25" },
          { label: "Plivo — Voice pricing for India (2026)", url: "https://www.plivo.com/voice/pricing/in/", checked: "2026-09-25" },
          { label: "Sarvam AI — API pricing (2026)", url: "https://www.sarvam.ai/api-pricing", checked: "2026-09-25" },
          { label: "Meta for Developers — WhatsApp Business Platform pricing (2026)", url: "https://developers.facebook.com/docs/whatsapp/pricing", checked: "2026-09-25" },
          { label: "TRAI — Telecom Commercial Communications Customer Preference (Second Amendment) Regulations, 2025 (12 February 2025)", url: "https://trai.gov.in/sites/default/files/2025-02/Regulation_12022025.pdf", checked: "2026-09-25" },
          { label: "TRAI — Press Release No. 91/2026: clarifications on the 1600 and 140 series (10 July 2026)", url: "https://trai.gov.in/sites/default/files/2026-07/PR_No91of2026.pdf", checked: "2026-09-25" },
        ]}
      />
    </BlogShell>
  );
}
