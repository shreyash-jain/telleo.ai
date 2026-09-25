import { BlogShell, postMetadata, Callout, Steps, Table, WhereTelleoFits, Sources } from "@/components/BlogShell";
import Link from "next/link";

export const metadata = postMetadata("speed-to-lead");

export default function Page() {
  return (
    <BlogShell
      slug="speed-to-lead"
      takeaways={[
        "In HBR’s 2011 research, firms that tried to contact a web lead within an hour were nearly 7 times as likely to qualify it as firms that tried an hour later, and more than 60 times as likely as firms that waited a day or more.",
        "The popular “call within 5 minutes and you are 100 times more likely to connect” figure comes from a 2007 vendor study of six companies. It points the same way, but treat it as a hint, not a law.",
        "No study proves 60 seconds beats 5 minutes. The case for 60 seconds is practical: the lead may still have the phone in hand, and only automation can hit that time at 9 pm or during lunch.",
        "Speed is only half of it: the first call needs a short script, a clear next step, a sensible retry plan and a fast handoff to a human.",
        "Measure time to first attempt for every lead, not the average, and compare qualification rates across response-time buckets in your own data.",
      ]}
      toc={[
        { id: "what-research-says", label: "What the research says" },
        { id: "handle-with-care", label: "Statistics to handle with care" },
        { id: "why-60-seconds", label: "Why aim for 60 seconds" },
        { id: "callback-workflow", label: "The instant callback workflow" },
        { id: "first-call", label: "What the first call should ask" },
        { id: "retry-cadence", label: "Retry cadence for unanswered calls" },
        { id: "handoff", label: "When to hand off to a human" },
        { id: "what-to-measure", label: "What to measure" },
      ]}
      faqs={[
        {
          q: "What is speed to lead?",
          a: "Speed to lead is the time between a prospect submitting an enquiry (a form, an ad lead, a missed call) and your first real attempt to contact them. Shorter is better, because interest fades quickly after someone enquires.",
        },
        {
          q: "What is a good lead response time?",
          a: "The strongest public evidence, HBR’s 2011 research, shows a large advantage for trying within the first hour. With automation, calling within a minute or two is realistic, and there is no reason to wait longer if the lead enquired inside your calling hours.",
        },
        {
          q: "Is the “call within 5 minutes, 100x more likely to connect” statistic real?",
          a: "It comes from a real 2007 executive summary by InsideSales.com with Dr. James Oldroyd, based on data from six companies, over 15,000 leads and over 100,000 call attempts. It is a vendor study with a small number of companies and data from 2007, so use it as directional evidence only.",
        },
        {
          q: "How many times should I call an unanswered lead?",
          a: "There is no universal number. A practical starting point is four or five attempts over three days at different times, followed by a WhatsApp or email, and then stop. Track contact rate by attempt number and cut attempts that rarely connect.",
        },
        {
          q: "Should an AI agent or a human make the first call?",
          a: "Whoever can reliably make it within a minute. For most teams that means an AI agent for the first call and repeat attempts, with qualified or high-intent leads passed to a person straight away.",
        },
        {
          q: "What if a lead comes in late at night?",
          a: "Send an immediate WhatsApp or SMS acknowledgement, queue the call for the start of your calling window the next morning, and make that queue the first thing that gets dialled.",
        },
      ]}
    >
      <p>
        When someone fills in your form, they are thinking about your product at that exact moment. An hour later they are in a meeting, cooking dinner, or talking to your competitor. Speed to lead is simply how long you take to reach them, and it is one of the few sales numbers you fully control.
      </p>
      <p>
        This post covers what the research actually says (and what it does not), then gives a practical playbook: the callback workflow, the first call, retries, handoffs and what to measure.
      </p>

      <h2 id="what-research-says">What the research says</h2>
      <p>
        The most cited source is “The Short Life of Online Sales Leads” by James Oldroyd, Kristina McElheran and David Elkington, published in Harvard Business Review in March 2011. It reports two pieces of work.
      </p>
      <p><strong>An audit of response times.</strong> The authors audited 2,241 US companies by sending each a web-generated test lead:</p>
      <Table
        head={["Response to the test lead", "Share of companies"]}
        rows={[
          ["Responded within an hour", "37%"],
          ["Responded within 1 to 24 hours", "16%"],
          ["Took more than 24 hours", "24%"],
          ["Never responded", "23%"],
        ]}
      />
      <p>Among companies that responded within 30 days, the average response time was 42 hours.</p>
      <p>
        <strong>A study of what speed is worth.</strong> In a separate study of 1.25 million sales leads received by 29 B2C and 13 B2B companies in the US, firms that tried to contact a lead within an hour were nearly <strong>7 times</strong> as likely to qualify it as firms that tried even an hour later, and more than <strong>60 times</strong> as likely as firms that waited 24 hours or longer. “Qualify” here meant having a meaningful conversation with a key decision maker.
      </p>
      <p>
        The article also names why companies are slow: pulling leads from the CRM once a day instead of continuously, salespeople focused on their own prospecting rather than incoming leads, and rules that distribute leads by geography or “fairness”. If any of the three sounds familiar, it is a process problem, not a people problem.
      </p>

      <h2 id="handle-with-care">Statistics to handle with care</h2>
      <p>
        A widely repeated speed-to-lead figure is that calling within 5 minutes instead of 30 makes you 100 times more likely to reach the lead and 21 times more likely to qualify them. It usually travels as “the MIT study”, which is also what its own summary calls it.
      </p>
      <p>
        The source is a 2007 executive summary titled “How Much Time Do You Have Before Web-Generated Leads Go Cold?”, presented by Dave Elkington, then CEO of InsideSales.com, and Dr. James Oldroyd, then a Faculty Fellow at MIT Sloan, at a MarketingSherpa summit. It used data from InsideSales.com’s own system: three years of data across six companies, over 15,000 leads and over 100,000 call attempts. It reports that the odds of contacting a lead drop 100 times, and of qualifying one 21 times, if you call at 30 minutes instead of 5.
      </p>
      <Callout tone="info" title="How to read it">
        <p>
          It is a real study, but a vendor-produced one, based on six companies’ data from 2007, and the summary notes that the clear patterns appeared only when data from several companies was combined. The same summary reports best days of the week and times of day from those companies’ calls, which you should not copy for Indian callers. Use it as a sign that minutes matter, not as a forecast for your business.
        </p>
      </Callout>
      <p>
        You will also meet percentages on vendor blogs and slides with no link to any original study. A simple rule: if you cannot find who ran the study, on how many companies, and when, do not put it in your business case.
      </p>

      <h2 id="why-60-seconds">Why aim for 60 seconds</h2>
      <p>
        To be clear, no public study compares 60 seconds with 5 minutes. The research shows that within the hour is far better than later, and suggests that within minutes is better still. The case for 60 seconds is practical:
      </p>
      <ul>
        <li><strong>The lead may still be holding the phone.</strong> If they enquired from a mobile, a call that arrives while the thank-you page is still open reaches someone who remembers exactly why they enquired.</li>
        <li><strong>They may be comparing.</strong> Someone researching coaching classes or a flat may well have enquired in more than one place. The first useful conversation sets the terms of the comparison.</li>
        <li><strong>It is the only target that forces a fix.</strong> “Within an hour” can be met by a diligent person on a good day. “Within 60 seconds, including at 8 pm and on Sunday inside your calling hours” can only be met by a system, which is exactly what removes the daily-pull and fairness-rule delays HBR described.</li>
      </ul>

      <h2 id="callback-workflow">The instant callback workflow</h2>
      <Steps
        items={[
          { title: "Capture every source in one place, instantly", body: "Meta and Google lead forms, website forms and landing pages should push leads into your CRM or calling system as they arrive, via a webhook or native connector, not a daily CSV download." },
          { title: "Clean before you call", body: "De-duplicate by phone number so a lead who submitted twice is called once, and skip leads that a salesperson already owns." },
          { title: "Check the calling window", body: "Inside your calling hours, call now. Outside them, send an instant WhatsApp or SMS acknowledgement and queue the call for the start of the next window." },
          { title: "Make the first call within a minute", body: "The first call confirms the enquiry, asks a few qualifying questions and aims for one concrete next step." },
          { title: "Route by outcome, automatically", body: "Qualified or high intent goes to a person now. Callback requests get a real time on someone’s list. Unanswered goes on the retry plan. Not interested and wrong number stop." },
          { title: "Log everything", body: "Time of enquiry, time of first attempt, outcome, answers and recording. Without timestamps you cannot measure speed to lead at all." },
        ]}
      />

      <h2 id="first-call">What the first call should ask</h2>
      <p>
        The first call is not a sales pitch. Its job is to confirm interest, learn enough to route the lead, and agree the next step. Keep it to two or three minutes.
      </p>
      <ol>
        <li><strong>Who and why:</strong> “Hi Rohan, this is Priya from [your institute]. You just enquired about our weekend batch on our website.”</li>
        <li><strong>Permission:</strong> “Is this a good time for two minutes?” If not, get a specific day and time and end the call.</li>
        <li><strong>Three to five qualifying questions,</strong> one at a time. Typically: what they need, when they want to start, who decides, location, and a budget range where relevant.</li>
        <li><strong>One next step with a day and time:</strong> a counselling call, a site visit, a demo class. “Thursday at 5 pm” is a next step; “we’ll be in touch” is not.</li>
        <li><strong>What happens next:</strong> “You’ll get a WhatsApp confirmation in a minute.”</li>
      </ol>
      <p>
        We cover wording, objections and templates in <Link href="/blog/ai-calling-script-template/">how to write an AI calling script</Link>.
      </p>

      <h2 id="retry-cadence">Retry cadence for unanswered calls</h2>
      <p>
        Many first calls will not be answered. The 2007 summary above found that repeatedly calling a lead you have not reached, long after the enquiry, stops helping: it reported that after 20 hours every additional dial hurt the chance of contacting and qualifying the lead. Front-load your attempts, vary the time of day, and stop.
      </p>
      <Table
        head={["Attempt", "When", "Why"]}
        rows={[
          ["1", "Within 60 seconds of the enquiry", "Catch them while they are still on the page"],
          ["2", "10 to 15 minutes later", "They may have been on another call or driving"],
          ["3", "2 to 3 hours later", "A different part of their day"],
          ["4", "Next day, a different time slot", "Morning if earlier tries were evening, and the reverse"],
          ["5", "Day 3, then stop calling", "Send a WhatsApp or email with a way to book, and close the loop"],
        ]}
        caption="A starting point, not a rule. Adjust it from your own contact-rate data."
      />
      <ul>
        <li>Stop immediately if the person asks not to be called, and mark wrong numbers so they are never retried.</li>
        <li>If the lead asked for a specific time (“call me tomorrow evening”), record that exact time and make sure a person or the system acts on it; do not leave it on the generic retry plan.</li>
        <li>Respect your calling window and the lead’s DND preferences. TRAI’s rules let customers block promotional calls by sector through the DND registry, so check with your provider how your calls are classified.</li>
      </ul>

      <h2 id="handoff">When to hand off to a human</h2>
      <p>An automated first call earns its place by handing the right leads to people quickly. Set clear triggers:</p>
      <ul>
        <li>The caller asks to speak to a person.</li>
        <li>They are ready to act now: pay, enrol, visit today, or ask for a quote.</li>
        <li>They raise something your script does not cover: a discount, an exception, a complaint.</li>
        <li>They are upset, confused or talking about something sensitive.</li>
        <li>They meet your qualification bar (for example, the right course, a start date within a month, and a budget that fits).</li>
      </ul>
      <p>
        A live transfer is best when someone is free. When no one is, book a specific callback slot during the call rather than promising “someone will call you”. Either way, the person picking up should see the summary and answers before saying hello, so the lead never has to repeat themselves.
      </p>

      <h2 id="what-to-measure">What to measure</h2>
      <Table
        head={["Metric", "How to calculate it", "Why it matters"]}
        rows={[
          ["Time to first attempt", "Median and 90th percentile, from enquiry to first dial", "Averages hide the leads that waited a day"],
          ["Share called within 1 minute and within 1 hour", "Leads attempted in time ÷ all leads in calling hours", "The number to put on the wall"],
          ["Contact rate by attempt", "Answered calls ÷ calls made, for attempt 1, 2, 3…", "Shows which retries are worth keeping"],
          ["Qualification rate by response bucket", "Qualified ÷ contacted, split by 0–1 min, 1–5 min, 5–60 min, 1 hour+", "Your own version of the HBR finding"],
          ["Next steps booked and kept", "Meetings, visits or demos booked, and how many happened", "Speed that does not produce meetings is not helping"],
          ["Handoff time", "From “qualified” to a person speaking with the lead", "A fast first call is wasted if the handoff is slow"],
        ]}
      />

      <WhereTelleoFits>
        <p>
          Telleo can call a new lead within about 60 seconds of it arriving, using a workflow such as “new lead arrives → call it”. Leads come in from Meta lead ads, Google lead forms, any website form via webhook, or CSV import, and are de-duplicated by phone or email. Automation skips leads already assigned to a rep, a 30-second guard stops the same lead being dialled twice by accident, and campaigns can be limited to the time windows you choose.
        </p>
        <p>
          After each call, outcome rules assign the lead to a rep, stop, or retry unanswered calls with a gap and a maximum number of attempts. If a caller asks for a later time (“kal shaam”), the analysis turns it into an exact date and time, saved on the call and shown in the call log for your team. Agents can transfer live to a person mid-call and book meetings on your booking page. See <Link href="/automations/">automations</Link> and <Link href="/how-it-works/">how it works</Link>.
        </p>
      </WhereTelleoFits>

      <Sources
        items={[
          { label: "Harvard Business Review — Oldroyd, McElheran and Elkington, “The Short Life of Online Sales Leads” (2011)", url: "https://hbr.org/2011/03/the-short-life-of-online-sales-leads", checked: "2026-09-25" },
          { label: "InsideSales.com and Dr. James Oldroyd — “How Much Time Do You Have Before Web-Generated Leads Go Cold?”, Lead Response Management executive summary (2007)", url: "https://www.onecavo.com/wp-content/uploads/2015/11/MIT-InsideSales.com_Lead-Response-Management.pdf", checked: "2026-09-25" },
          { label: "TRAI — Press Release No. 91/2026: clarifications on the 1600 and 140 series (10 July 2026)", url: "https://trai.gov.in/sites/default/files/2026-07/PR_No91of2026.pdf", checked: "2026-09-25" },
        ]}
      />
    </BlogShell>
  );
}
