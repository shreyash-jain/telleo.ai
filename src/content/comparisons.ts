import type { Comparison } from "./types";

/**
 * Comparison pages. Telleo facts come only from docs/PRODUCT_FACTS.md.
 * Every third-party fact was read on the vendor's own site (or another primary
 * source) on 2026-09-25 and is listed in that entry's `sources`.
 */

const CHECKED = "2026-09-25";

export const COMPARISONS: Comparison[] = [
  // ---------------------------------------------------------------------------
  // 1. Telleo vs an in-house telecalling team
  // ---------------------------------------------------------------------------
  {
    slug: "telleo-vs-telecallers",
    label: "Telleo vs telecallers",
    title: "Telleo vs Telecallers: AI Voice Agent or In-House Team",
    description:
      "Telleo AI voice agents vs an in-house telecalling team: cost, speed to lead, coverage, consistency and follow-up. See which calls suit each and how to use both.",
    other: "an in-house telecalling team",
    h1: "Telleo vs an in-house telecalling team",
    lede:
      "Many Indian sales and admissions teams already have telecallers. The useful question is not AI or people, but which calls each should make. This page compares an AI voice agent with a human calling team, job by job, so you can split the work sensibly.",
    verdict:
      "Use Telleo for the first call to every new lead, reminders, retries and routine qualification, where speed and consistency matter most. Keep your telecallers for negotiation, complex questions and relationships, and let Telleo hand them qualified leads with a call summary. Many teams will want both, working together.",
    rows: [
      {
        dimension: "Cost basis",
        telleo:
          "Per minute of call. ₹3.49/min on the annual plan (₹19,999/year upfront, no monthly minimum) or ₹3.99/min on monthly plans. Prices exclude 18% GST.",
        other:
          "Monthly salary plus incentives, hiring, training and supervision. Salary sites list average telecaller pay at about ₹16,000 to ₹17,500 a month (Indeed India, AmbitionBox).",
      },
      {
        dimension: "Speed to a new lead",
        telleo:
          "Can call a new lead within about 60 seconds of it arriving, through a workflow trigger.",
        other:
          "Depends on who is free. Leads that arrive during a busy hour, after office hours or on a holiday wait.",
      },
      {
        dimension: "Coverage",
        telleo:
          "Works through every lead in a campaign, inside the calling windows you choose.",
        other: "Limited by shifts, leave, breaks and how many people are on the floor that day.",
      },
      {
        dimension: "Scaling up and down",
        telleo:
          "Run a bulk campaign over a list, or call from a workflow. A daily call cap (default 500, configurable) keeps volume in check.",
        other: "Adding capacity means hiring and training. Reducing it is slow.",
      },
      {
        dimension: "Consistency",
        telleo:
          "Same opening line, same questions and the same outcome list on every call.",
        other: "Varies by person, experience, mood and time of day.",
      },
      {
        dimension: "Complex conversations",
        telleo:
          "Handles scripted qualification, questions within its brief and bookings. Can transfer the call to a person mid-call.",
        other:
          "Better at negotiation, unusual objections, emotional calls and anything that needs judgement.",
      },
      {
        dimension: "Relationships",
        telleo: "Not a substitute for a named person the customer knows and trusts.",
        other: "A person can build trust over many calls and own the account.",
      },
      {
        dimension: "Record keeping",
        telleo:
          "Every AI call transcribed; recording can be switched on for every call. Disposition, summary, lead rating and the caller's answers saved on the call automatically.",
        other: "Depends on each caller updating the CRM after every call.",
      },
      {
        dimension: "Follow-up",
        telleo:
          "Outcome rules assign, retry or stop. Meetings agreed on the call are booked. WhatsApp or email goes out when the caller said yes.",
        other: "Manual reminders and callbacks, which are easy to miss when volume is high.",
      },
      {
        dimension: "Quality review",
        telleo:
          "A green, amber or red health verdict on every AI call. Human calls can also be transcribed and scored against your rubric, charged per minute of recording.",
        other: "Usually a manager listening to a sample of calls.",
      },
      {
        dimension: "Languages",
        telleo:
          "Hindi, English and Hinglish in production. Nine more Indian languages set up with you on request.",
        other: "Whatever languages your team speaks.",
      },
      {
        dimension: "Best for",
        telleo: "First calls, reminders, re-engagement of leads who have consented, and qualification at volume.",
        other: "Closing, negotiation, escalations and key accounts.",
      },
    ],
    chooseTelleoIf: [
      "New leads wait hours for a first call because your team is busy.",
      "A big part of your team's day goes on unanswered calls, retries and reminders.",
      "You want every call transcribed, summarised and logged without relying on manual notes.",
      "Your lead volume rises and falls, and you don't want to hire for the peak.",
      "The people you call speak Hindi, English or Hinglish.",
    ],
    chooseOtherIf: [
      "Your sale needs negotiation, custom pricing or long consultative conversations.",
      "Customers expect a named relationship manager who knows their history.",
      "Calls involve sensitive or emotional situations that need human judgement.",
      "The people you call mainly speak a language Telleo does not yet run in production.",
      "Your call volume is small enough for one person to handle comfortably.",
    ],
    sections: [
      {
        heading: "Where a telecaller's time goes",
        body: [
          "Much of a telecaller's day is not conversation. It is dialling, waiting on numbers that do not pick up, redialling later and typing notes afterwards.",
          "Telleo takes that routine layer. It dials, retries unanswered workflow calls with a gap and a maximum number of attempts, and writes the outcome to the lead. Your team picks up where a real conversation is needed.",
        ],
      },
      {
        heading: "Speed to lead",
        body: [
          "Research reported in Harvard Business Review in 2011, covering 1.25 million leads at 42 US companies, found that firms which tried to contact a web lead within an hour were nearly 7 times as likely to qualify it as those that tried an hour later, and more than 60 times as likely as those that waited 24 hours or longer. In a separate audit of 2,241 U.S. companies, the same authors found that among companies that responded within 30 days, the average response time was 42 hours.",
          "Telleo can call a new lead within about 60 seconds of it arriving from a Meta lead ad, a Google lead form or a website form. If the lead is interested, outcome rules assign it to a rep along with the call summary.",
        ],
      },
      {
        heading: "What each costs",
        body: [
          "Salary sites give a rough guide. Indeed India lists an average of ₹16,310 a month for a caller, based on 1.9k salaries from job postings (updated 3 July 2026). AmbitionBox lists ₹2.1 lakh a year, about ₹17.5k a month, for a telecaller, based on 23.8k salaries. Pay varies by city, experience and company, and the full cost of a seat also includes incentives, hiring, training and supervision.",
          "Telleo is priced per minute of call. On the annual plan you pay ₹19,999 a year upfront and ₹3.49 a minute from the first minute, with no monthly minimum. Prices exclude 18% GST, and DLT/PE registration is ₹5,900 a year at actuals. It is not a like-for-like swap: an AI agent does not replace a good telecaller's judgement, but it can take the calls that do not need it.",
        ],
      },
      {
        heading: "How the two work together",
        body: [
          "Telleo is built to sit next to a human team. Outcome rules assign a lead to a counsellor or sales rep on the outcomes you pick, workflow calls skip leads already assigned to a rep, and a live transfer can bring a person into the call.",
          "Your team can keep using Airtel IQ or Exotel for click-to-call. Those calls, or recordings uploaded from anywhere, can be transcribed in Hindi, English or Hinglish and scored against your rubric, with coaching tips and a rep leaderboard.",
        ],
      },
    ],
    sources: [
      {
        label: "Harvard Business Review: The Short Life of Online Sales Leads (March 2011)",
        url: "https://hbr.org/2011/03/the-short-life-of-online-sales-leads",
        checked: CHECKED,
      },
      {
        label: "Indeed India: Caller salary in India",
        url: "https://in.indeed.com/career/telecaller/salaries",
        checked: CHECKED,
      },
      {
        label: "AmbitionBox: Telecaller salaries in India",
        url: "https://www.ambitionbox.com/profile/telecaller-salary",
        checked: CHECKED,
      },
    ],
    faqs: [
      {
        q: "Will Telleo replace my telecallers?",
        a: "It is not designed to. Telleo takes first calls, retries, reminders and routine qualification, and passes interested leads to your team with a summary. Negotiation, closing and relationships stay with people.",
      },
      {
        q: "Can a caller speak to a person during an AI call?",
        a: "Yes. Each agent can have handoff numbers. The agent says a short bridge line, then connects the call to a person on your team.",
      },
      {
        q: "How do I know what the AI agent said on a call?",
        a: "Every AI call has a full transcript, and recording can be switched on for every call. You also get an outcome from your own list, a two to three sentence summary, a lead rating from 1 to 10 and the answers the caller actually gave.",
      },
      {
        q: "Can Telleo review my human team's calls too?",
        a: "Yes. Click-to-call calls on Plivo, Exotel or Airtel, or recordings you upload, can be transcribed and scored against your rubric, with objections, next best action and coaching tips. This is charged per minute of recording. Analysis of AI calls is free.",
      },
      {
        q: "Where do the salary figures come from?",
        a: "Indeed India (an average of ₹16,310 a month for a caller, updated 3 July 2026) and AmbitionBox (an average of ₹2.1 lakh a year for a telecaller). We read both on 25 September 2026. Actual pay varies widely by city, experience and company.",
      },
      {
        q: "Which languages can the AI agent speak?",
        a: "Hindi, English and Hinglish are in production. Tamil, Telugu, Marathi, Bengali, Gujarati, Kannada, Malayalam, Punjabi and Odia are supported by the voice engines and set up with you on request.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 2. Telleo vs IVR menus and pre-recorded calls
  // ---------------------------------------------------------------------------
  {
    slug: "telleo-vs-ivr",
    label: "Telleo vs IVR and robocalls",
    title: "Telleo vs IVR and Robocalls: AI Agent or Recorded Menu",
    description:
      "IVR menus and recorded voice broadcasts play a fixed message. Telleo holds a two-way conversation and acts on the reply. Compare fit, setup, cost and results.",
    other: "IVR menus and pre-recorded voice broadcasts",
    h1: "Telleo vs IVR menus and pre-recorded calls",
    lede:
      "An IVR asks callers to press keys. A voice broadcast plays the same recording to everyone. Both are useful, and both are mostly one-way. Telleo holds a spoken conversation, captures the answer and acts on it. Here is how they compare and where each one fits.",
    verdict:
      "If the message is the same for everyone and needs no reply, such as an alert or simple call routing, an IVR or recorded broadcast is the simpler tool. If you need something back, like interest, a preferred time or a booking, Telleo fits better because it understands spoken replies and turns them into CRM actions. On inbound, an IVR menu option on a Telleo number can hand the caller to a Telleo agent.",
    rows: [
      {
        dimension: "How the caller responds",
        telleo:
          "Speaks normally in Hindi, English or Hinglish. Can interrupt, and a short \"haan\" or \"okay\" while the agent talks does not derail it.",
        other:
          "Presses keys on a fixed menu. A broadcast plays a recording and usually expects no reply.",
      },
      {
        dimension: "Personalisation",
        telleo: "Uses the lead's name and the fields captured on their form.",
        other: "Usually one recording or menu for everyone.",
      },
      {
        dimension: "Questions off the menu",
        telleo:
          "Answers within the brief you give it, and can transfer the call to a person mid-call.",
        other: "Only the options on the menu. Anything else goes to a queue or a callback.",
      },
      {
        dimension: "What gets captured",
        telleo:
          "Outcome from your own list, a short summary, a 1 to 10 lead rating, the caller's answers, any callback request, and any agreed meeting time as an exact date and time.",
        other: "Key presses and whether the call was answered.",
      },
      {
        dimension: "What happens next",
        telleo:
          "Assign to a rep, retry, stop, book the meeting, or send WhatsApp or email, automatically.",
        other: "Depends on your setup. Often a report or a list for someone to work through.",
      },
      {
        dimension: "Call length and cost",
        telleo:
          "Billed per minute of call, from ₹3.49/min on the annual plan (excluding GST). A conversation lasts longer than a recording.",
        other: "Calls are short because the message is fixed. Pricing varies by provider.",
      },
      {
        dimension: "Setup",
        telleo:
          "No-code builder: opening line, script, questions to ask and outcome list. A script can be drafted from a plain-language brief.",
        other: "Record prompts and map each key press to an action or queue.",
      },
      {
        dimension: "Changing the message",
        telleo:
          "Edit the script and the next call uses it. Voice preview plays the exact voice that will go out.",
        other: "Re-record the audio and update the menu tree.",
      },
      {
        dimension: "Answering machines",
        telleo:
          "Detects answering machines. A call where nobody really spoke is marked Incomplete, never Not interested.",
        other: "Handling varies by system.",
      },
      {
        dimension: "Best for",
        telleo:
          "Qualification, reminders that need a reply, re-engagement of leads who have consented, and bookings.",
        other: "Alerts, announcements and routing inbound callers to the right team.",
      },
    ],
    chooseTelleoIf: [
      "You need an answer back, not just a message delivered.",
      "You want each reply to update the lead and trigger the next step on its own.",
      "Your callers are more comfortable speaking Hindi or Hinglish than using a keypad.",
      "You want interested people passed to a person, with the context already written down.",
    ],
    chooseOtherIf: [
      "The message is the same for everyone and needs no reply, like an alert or announcement.",
      "You only need to route inbound callers to the right department.",
      "You want the shortest possible calls at very high volume.",
      "Your process requires a fixed, pre-approved recording word for word.",
    ],
    sections: [
      {
        heading: "One-way vs two-way",
        body: [
          "An IVR menu and a voice broadcast are built to deliver a message or sort a caller into a queue. The caller's side is a key press, or nothing at all.",
          "Telleo is built for calls where you need the other person's answer. It asks the questions you set, understands spoken replies, and saves only what was actually said. A meeting only counts if a specific day and time were agreed.",
        ],
      },
      {
        heading: "When a recording is enough",
        body: [
          "Not every call needs a conversation. A payment-due alert, a holiday closure notice or a simple \"press 1 for admissions\" menu works well as a recording, and the calls stay short.",
          "Use Telleo where a reply changes what you do next: whether a lead is interested, when to call back, whether a parent will attend, or which slot suits the customer.",
        ],
      },
      {
        heading: "Using both together",
        body: [
          "On inbound, an IVR menu option can hand the caller to a Telleo AI agent. Set up the IVR on your Telleo number for routing, and point the options where someone needs to talk at the agent.",
          "After every AI call, outcome rules decide what happens: assign to a rep, retry with a gap, stop, book the meeting, or send the WhatsApp message or email the caller agreed to.",
        ],
      },
      {
        heading: "Cost, honestly",
        body: [
          "A recorded message is short, so each call uses less time. A conversation takes longer, and Telleo bills per minute of call, rounded up. Judge the two on cost per useful result, such as a qualified lead or a confirmed booking, rather than cost per dial.",
        ],
      },
    ],
    sources: [],
    faqs: [
      {
        q: "Can Telleo take inbound calls?",
        a: "Yes. An IVR menu option can hand the caller to a Telleo AI agent, which then holds the conversation and saves the outcome like any other call.",
      },
      {
        q: "Does the caller need to press any keys?",
        a: "No. The caller just talks. They can interrupt the agent, and a short \"haan\" or \"okay\" while it is speaking does not derail it.",
      },
      {
        q: "Is an AI call more expensive than a voice broadcast?",
        a: "Per call, usually yes, because a conversation lasts longer than a recording and Telleo bills per minute of call. It pays off when you need a reply or an action. For a pure announcement, a broadcast is the simpler tool.",
      },
      {
        q: "What happens if an answering machine picks up?",
        a: "Telleo detects answering machines. A call where nobody really spoke is marked Incomplete, never Not interested, so the lead is not written off by mistake.",
      },
      {
        q: "Can I control when calls go out?",
        a: "Yes. Campaigns can run inside time windows you choose, and a daily call cap (500 by default) limits volume. We register DLT with you.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 3. Telleo vs Ringg AI
  // ---------------------------------------------------------------------------
  {
    slug: "telleo-vs-ringg",
    label: "Telleo vs Ringg AI",
    title: "Telleo vs Ringg AI: Pricing, Features, Differences",
    description:
      "Telleo vs Ringg AI on published pricing, languages, channels, telephony, CRM follow-up and compliance. Ringg facts checked on its own site in September 2026.",
    other: "Ringg AI",
    h1: "Telleo vs Ringg AI",
    lede:
      "Ringg AI and Telleo both build AI voice agents for Indian businesses. Ringg is a broad platform covering voice, chat, WhatsApp and web agents, with developer tools around them. Telleo is a voice agent built into a CRM that acts on every call outcome. We checked the Ringg facts below on its public website and docs on 25 September 2026. They may have changed since.",
    verdict:
      "Choose Ringg AI if you need many languages, channels beyond voice, developer APIs, published security certifications or on-prem deployment. Choose Telleo if you are a sales, admissions or service team calling in Hindi, English or Hinglish and want the CRM, follow-ups, human-call analysis and simple rupee per-minute pricing in one place, with an annual plan that has no monthly minimum.",
    rows: [
      {
        dimension: "Pricing model",
        telleo:
          "Per minute of call, billed per minute (rounded up). Monthly plans with a minimum, or an annual plan with no minimum. Telephony and analysis of AI calls included.",
        other:
          "Published: usage-based, ₹6 per connected minute for voice agents, prorated by the second. Bundles STT, TTS, LLM, telephony and basic analytics. Pricing also involves a monthly minimum commitment; the amount is not published.",
      },
      {
        dimension: "Entry price",
        telleo:
          "Starter (trial plan, up to 3 months): ₹3,499/month minimum billing at ₹3.99/min. Annual: ₹19,999/year upfront, then ₹3.49/min from minute one, with the full CRM included. Starter and Pro do not include the CRM; Pro + CRM is ₹8,999/month. Prices exclude 18% GST.",
        other:
          "Free credits on sign-up. Phone number ₹499 per month. Advanced analytics ₹2 per call. Their page notes final amounts may vary with exchange rates and taxes.",
      },
      {
        dimension: "Concurrency and volume",
        telleo:
          "A daily call cap (default 500/day, configurable) and 30-second duplicate protection guard volume.",
        other:
          "Per their pricing FAQ, five concurrent calls included, more in blocks of five for Rs 1,995 per block. Their docs list 10,000+ simultaneous calls as platform capacity.",
      },
      {
        dimension: "Languages",
        telleo:
          "Hindi, English and Hinglish in production. Nine more Indian languages set up with you on request.",
        other:
          "Per their site, 20+ languages, including Hindi, English, Tamil, Telugu, Kannada, Malayalam, Marathi, Bengali and Gujarati, plus French, Spanish, Russian and Mandarin.",
      },
      {
        dimension: "Channels",
        telleo:
          "Voice calls, outbound and inbound (via an IVR option), with WhatsApp template and email sends from the CRM.",
        other:
          "Voice, chat, WhatsApp agents, a web widget and browser agents. Chat and WhatsApp agents are ₹2 per 5-minute session.",
      },
      {
        dimension: "Telephony",
        telleo:
          "Included on Telleo's lines (Plivo). Optional dedicated AI line with your own caller ID. No SIMs, dialers or telecom contracts.",
        other:
          "Ringg's telephony is included in the per-minute price, or bring your own: Plivo, Exotel, Twilio or SIP, with Ameyo and Ozonetel guides in their docs. An integration charge may apply.",
      },
      {
        dimension: "CRM and follow-up",
        telleo:
          "Built-in CRM: leads from Meta and Google lead forms, webhooks and CSV; round-robin assignment; rules to assign, retry or stop; meetings auto-booked; WhatsApp and email sent only when the caller agreed.",
        other:
          "Integrations listed on their site include HubSpot, Google Sheets, Calendly, Shopify, Notion and Typeform, plus webhooks, an API and WhatsApp send tools during or after a call.",
      },
      {
        dimension: "Call analysis",
        telleo:
          "Every AI call analysed free: outcome from your list, summary, 1 to 10 lead rating, extracted answers, callback requests and agreed meeting times. Human calls can be analysed and scored too, per minute of recording.",
        other:
          "Custom post-call analysis fields, call history and an analytics dashboard. Advanced analytics at ₹2 per call.",
      },
      {
        dimension: "Quality monitoring",
        telleo:
          "A green, amber or red health verdict on every AI call with a plain headline, such as long silence or transfer failed.",
        other:
          "Per their homepage: QA, analytics and alerts on all conversations, with flags such as hallucination and interruptions.",
      },
      {
        dimension: "Developer tools",
        telleo:
          "No public API or SDK. Connects to anything that can send or receive a webhook.",
        other:
          "REST API, webhooks, an MCP server, and web, React Native and Flutter widgets.",
      },
      {
        dimension: "Security and compliance",
        telleo:
          "No certifications claimed. We register DLT with you. Health verdicts and diagnostics are admin-only; full phone numbers on the call log can be restricted by role.",
        other:
          "Per their docs: SOC 2 Type II audit completed, ISO 27001 certified, GDPR and HIPAA compliant, with a public trust centre. Per their pricing page, on-premise or virtual private cloud deployment is available on the Enterprise plan, and their FAQ says it costs an additional fee.",
      },
      {
        dimension: "Best for",
        telleo:
          "Indian sales, admissions and service teams calling in Hindi, English or Hinglish who want calling and CRM in one tool.",
        other:
          "Businesses that need many languages, several channels, developer control or enterprise security paperwork.",
      },
    ],
    chooseTelleoIf: [
      "Your calls are in Hindi, English or Hinglish, and you want everyday phone Hindi with correct gendered grammar and barge-in that a quick \"haan\" does not break.",
      "You want lead capture, assignment, retries, bookings and WhatsApp or email follow-up in the same tool as the calls.",
      "You want your human team's calls transcribed and scored, not only AI calls.",
      "You prefer simple rupee pricing, with an annual plan that has no monthly minimum.",
      "You want a plain health verdict on every AI call that tells you what went wrong.",
    ],
    chooseOtherIf: [
      "You need languages beyond the three Telleo runs in production, or international ones like French or Spanish.",
      "You want chat, WhatsApp or website agents as well as voice.",
      "Your team wants a REST API, an MCP server or mobile widgets.",
      "Your procurement needs published certifications such as SOC 2 Type II or ISO 27001, or on-prem deployment.",
      "You want a vendor with named enterprise case studies. Ringg's site lists PolicyBazaar, Practo, PharmEasy, smallcase, PlatinumRx and Ekart.",
      "You prefer billing prorated by the second on connected minutes.",
    ],
    sections: [
      {
        heading: "How the two products differ",
        body: [
          "Ringg AI describes itself as AI agents across voice, chat, WhatsApp and web, with a developer platform around them: APIs, webhooks, an MCP server and embeddable widgets. Telleo is narrower. It is an AI voice agent inside a CRM, so the call, the lead record and the next step live in one place.",
          "We read Ringg's homepage, pricing page and documentation on 25 September 2026. Vendors change prices and features, so please confirm on ringg.ai before deciding.",
        ],
      },
      {
        heading: "Pricing compared",
        body: [
          "Ringg publishes ₹6 per connected minute for voice agents, prorated by the second, with STT, TTS, LLM, telephony and basic analytics bundled. A phone number is ₹499 a month, advanced analytics is ₹2 per call, and five concurrent calls are included. Their FAQ says pricing is based on usage and a monthly minimum commitment; the minimum is not stated.",
          "Telleo's annual plan is ₹19,999 a year upfront, then ₹3.49 a minute from the first minute, with no monthly minimum. Monthly plans bill at ₹3.99 a minute, with a minimum of ₹3,499 (Starter, a trial plan for up to 3 months) or ₹6,999 (Pro). Telleo bills per minute, rounded up, and prices exclude 18% GST. Which works out cheaper depends on your call lengths and volume, so compare on your own pattern.",
        ],
      },
      {
        heading: "Where Telleo is different",
        body: [
          "Telleo's work has gone into Hindi and Hinglish phone calls. The caller can interrupt, and a short \"haan\" or \"okay\" does not derail the agent. It never repeats a sentence, does not parrot answers back, and its first-person Hindi verbs match the voice's gender.",
          "After the call, outcome rules assign, retry or stop; a meeting agreed on the call is booked; and WhatsApp or email goes out only if the caller said yes. Call intelligence also covers human calls on Plivo, Exotel or Airtel click-to-call, or uploaded recordings, with rep scores against your rubric and coaching tips.",
        ],
      },
      {
        heading: "Where Ringg is stronger",
        body: [
          "Ringg publishes more languages, more channels, fuller developer tooling, SOC 2 Type II and ISO 27001 per its docs, a trust centre, and on-prem or private cloud options. It also names large customers and case studies. If those matter to how you buy, Ringg is the stronger fit today.",
        ],
      },
    ],
    sources: [
      { label: "Ringg AI homepage", url: "https://www.ringg.ai/", checked: CHECKED },
      { label: "Ringg AI pricing and pricing FAQ", url: "https://www.ringg.ai/pricing", checked: CHECKED },
      {
        label: "Ringg docs: Platform overview",
        url: "https://docs.ringg.ai/get-started/overview/platform",
        checked: CHECKED,
      },
      {
        label: "Ringg docs: Configure an assistant (custom post-call analysis)",
        url: "https://docs.ringg.ai/get-started/guides/configure-assistant",
        checked: CHECKED,
      },
      {
        label: "Ringg docs: Bring Your Own Telephony",
        url: "https://docs.ringg.ai/telephony/byot-overview",
        checked: CHECKED,
      },
      {
        label: "Ringg docs: WhatsApp agents",
        url: "https://docs.ringg.ai/whatsapp/overview",
        checked: CHECKED,
      },
      {
        label: "Ringg docs: Security and Compliance",
        url: "https://docs.ringg.ai/privacy-and-compliance/security-overview",
        checked: CHECKED,
      },
      {
        label: "Ringg docs index (API, MCP server, widgets, Ameyo and Ozonetel guides)",
        url: "https://docs.ringg.ai/llms.txt",
        checked: CHECKED,
      },
    ],
    faqs: [
      {
        q: "Is Telleo cheaper than Ringg AI?",
        a: "On published per-minute rates, Telleo's ₹3.49 to ₹3.99 a minute (excluding GST) is lower than Ringg's ₹6 per connected minute. But Ringg prorates by the second while Telleo rounds up to the minute, Ringg has a monthly minimum whose amount is not published, Telleo's monthly plans have a ₹3,499 or ₹6,999 minimum, and Telleo's annual plan has a ₹19,999 upfront fee. Compare on your own call volume and call lengths.",
      },
      {
        q: "Does Ringg AI support Hindi?",
        a: "Yes. Ringg's site lists Hindi among its 20+ languages. Telleo runs Hindi, English and Hinglish in production.",
      },
      {
        q: "Can I use my own telephony provider?",
        a: "Ringg supports bring-your-own telephony with Plivo, Exotel, Twilio and SIP. Telleo includes telephony on its own lines, with an optional dedicated AI line on your own Plivo sub-account. Your human team can stay on Airtel IQ or Exotel.",
      },
      {
        q: "Does Telleo have an API like Ringg?",
        a: "No public API or SDK today. Telleo connects to other systems through webhooks and HTTP request steps in its workflows. If you need a full developer API, Ringg offers one.",
      },
      {
        q: "Is Telleo SOC 2 or ISO 27001 certified?",
        a: "Telleo does not claim any certifications. Ringg's docs state it has completed a SOC 2 Type II audit and is ISO 27001 certified. If certifications are a hard requirement, weigh that.",
      },
      {
        q: "When were these facts checked?",
        a: "On 25 September 2026, on Ringg's homepage, pricing page and documentation. Vendors change pricing and features often, so please confirm on ringg.ai.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 4. Telleo vs Vomyra
  // ---------------------------------------------------------------------------
  {
    slug: "telleo-vs-vomyra",
    label: "Telleo vs Vomyra",
    title: "Telleo vs Vomyra: Pricing, Features, Differences",
    description:
      "Telleo vs Vomyra on published pricing, unlimited plans, languages, numbers, CRM follow-up and call analysis. Vomyra facts checked on its site in September 2026.",
    other: "Vomyra",
    h1: "Telleo vs Vomyra",
    lede:
      "Vomyra and Telleo both sell no-code AI voice agents to Indian businesses. Vomyra leads with unlimited calling plans, Indian mobile-series numbers, voice cloning and a choice of frontier voice models. Telleo leads with per-minute pricing and a built-in CRM that acts on every call. We checked the Vomyra facts below on its public website and docs on 25 September 2026. They may have changed since.",
    verdict:
      "Pick Vomyra if you make a lot of calls to Indian numbers and want a flat monthly price, or you need voice cloning, many languages, an API and MCP server, white-label resale or ready integrations with Zoho, HubSpot or Salesforce. Pick Telleo if your volume is modest or seasonal and you want to pay per minute with no monthly minimum, with lead capture, assignment, retries, bookings, human-call analysis and per-call health checks in the same tool.",
    rows: [
      {
        dimension: "Pricing model",
        telleo:
          "Metered: per minute of call, billed per minute (rounded up). Monthly plans with a minimum, or an annual plan with no minimum.",
        other:
          "Published: a trial, a metered Developer plan, and Unlimited plans with no per-minute charge. Unlimited covers Indian-number calls within TRAI-permitted hours, under a fair-use policy with an eight-hour daily window. Per-second billing on every plan. Prices shown are on an annual plan.",
      },
      {
        dimension: "Entry price",
        telleo:
          "Starter (trial plan, up to 3 months): ₹3,499/month minimum billing at ₹3.99/min. Annual: ₹19,999/year upfront, then ₹3.49/min, with the full CRM included. Starter and Pro do not include the CRM; Pro + CRM is ₹8,999/month. Prices exclude 18% GST.",
        other:
          "₹599 for a 7-day trial with 500 credits. Developer ₹15,000/month with 2,500 minutes. Unlimited Solo ₹19,999/month, Team ₹39,999/month, Business ₹79,999/month. Concurrency 2, 2, 6 and 15 calls respectively.",
      },
      {
        dimension: "Setup",
        telleo:
          "No-code agent builder. Draft a script from a plain-language brief, or start from a use-case template (education-first today).",
        other:
          "No-code. Per their site, you give your website URL and their setup agent builds a team of AI agents.",
      },
      {
        dimension: "Languages",
        telleo:
          "Hindi, English and Hinglish in production. Nine more Indian languages set up with you on request.",
        other:
          "Per their site, 70+ languages. Their docs name Hindi, Tamil, Telugu, Kannada, Bengali, Marathi, Gujarati and Indian English, with Hinglish code-switching.",
      },
      {
        dimension: "Phone numbers and telephony",
        telleo:
          "Included on Telleo's lines (Plivo). Optional dedicated AI line with your own caller ID.",
        other:
          "Managed Indian mobile-series numbers (98 and 94), or bring your own carrier over SIP, such as Plivo, Twilio or Telnyx. Their integrations page also lists Exotel, Ozonetel and DialShree.",
      },
      {
        dimension: "Voices and models",
        telleo:
          "80+ voices across 7 speech engines, including Google Chirp3-HD, Sarvam Bulbul and Smallest. Voice preview plays the exact voice before calls go out.",
        other:
          "Choice of models including AWS Nova 2 Sonic, OpenAI GPT Realtime, Azure Voice Live, ElevenLabs and Cartesia. Voice cloning included from Unlimited Solo.",
      },
      {
        dimension: "Channels",
        telleo:
          "Phone calls, outbound and inbound (via an IVR option), plus WhatsApp template and email sends.",
        other:
          "Phone calls, WhatsApp voice calls (per their docs), browser test calls and WhatsApp follow-up messages.",
      },
      {
        dimension: "CRM and follow-up",
        telleo:
          "Built-in CRM: leads from Meta and Google lead forms, webhooks and CSV; round-robin assignment; rules to assign, retry or stop; meetings auto-booked; WhatsApp and email sent only when the caller agreed.",
        other:
          "Integrations with Zoho CRM, HubSpot, Salesforce, Google Sheets, Google Calendar, Cal.com, WhatsApp, Razorpay, Slack, Zapier and Make, plus webhooks and a REST API.",
      },
      {
        dimension: "Call analysis",
        telleo:
          "Every AI call analysed free, with a green, amber or red health verdict. Human calls can be analysed and scored too, per minute of recording.",
        other:
          "Per their pricing page, \"Full analytics\" from the Developer plan. Transcripts are available through the API and MCP server.",
      },
      {
        dimension: "Developer tools",
        telleo:
          "No public API or SDK. Connects to anything that can send or receive a webhook.",
        other: "REST API (15 endpoints), webhooks, a hosted MCP server and a Web SDK.",
      },
      {
        dimension: "Security and compliance",
        telleo:
          "No certifications claimed. We register DLT with you. Health verdicts and diagnostics are admin-only; full phone numbers on the call log can be restricted by role.",
        other:
          "Public security page: API-key or OAuth 2.1 access, encryption in transit and at rest, role-based access, audit logs and a DPA. Security review on Enterprise. Live calls need business KYC first.",
      },
      {
        dimension: "Best for",
        telleo:
          "Teams with modest or seasonal volume who want calling, CRM and follow-up in one tool.",
        other:
          "High-volume calling to Indian numbers at a flat price, voice cloning, resellers and developer-led teams.",
      },
    ],
    chooseTelleoIf: [
      "Your call volume is modest or seasonal, and you'd rather pay per minute than a flat monthly fee.",
      "You want lead capture, assignment, retries, bookings and WhatsApp or email follow-up inside one CRM, without wiring integrations.",
      "You want your human team's calls analysed and scored as well.",
      "You want a plain health verdict on every AI call.",
      "Your calls are in Hindi, English or Hinglish and you want everyday phone Hindi with correct gendered grammar.",
    ],
    chooseOtherIf: [
      "You make enough calls to Indian numbers that a flat unlimited plan beats per-minute pricing.",
      "You want mobile-series (98/94) caller IDs, voice cloning or a choice of frontier speech models.",
      "You need more languages than Telleo runs in production.",
      "You want to resell voice agents under your own brand. Vomyra includes white-label access on its Business plan.",
      "You need a REST API, an MCP server or ready integrations with Zoho CRM, HubSpot or Salesforce.",
      "You want per-second billing.",
    ],
    sections: [
      {
        heading: "Two different pricing bets",
        body: [
          "Vomyra's headline offer is unlimited calling: Unlimited Solo is ₹19,999 a month for one agent and two concurrent calls, covering Indian numbers within TRAI-permitted hours under a fair-use policy with an eight-hour daily window. Its pricing page says prices shown are on an annual plan.",
          "Telleo charges per minute. The annual plan is ₹19,999 a year upfront, then ₹3.49 a minute with no monthly minimum, so a quiet month costs nothing in usage. Comparing list prices as published, Telleo's annual plan costs less than Unlimited Solo until you use about 5,250 minutes a month. Above that, a flat plan starts to win. Telleo's prices exclude 18% GST; Vomyra's pricing page does not say either way.",
        ],
      },
      {
        heading: "Where Vomyra is stronger",
        body: [
          "Vomyra offers things Telleo does not: Indian mobile-series numbers, voice cloning, a choice of speech-to-speech models, 70+ languages, a REST API and MCP server, white-label resale, and ready connectors for Zoho CRM, HubSpot and Salesforce. It also names customers on its site, including Bikanervala, Balmer Lawrie and ANI.",
        ],
      },
      {
        heading: "Where Telleo is different",
        body: [
          "Telleo puts the CRM and the call in one place. Leads arrive from Meta and Google lead forms, websites or CSV; the agent calls; and outcome rules assign, retry or stop. Meetings agreed on the call are booked, and WhatsApp or email goes out only when the caller said yes.",
          "Every AI call gets a summary, a lead rating and a green, amber or red health verdict. Your human team's calls can be analysed too, with rep scores and coaching tips. For Hindi calls, the agent matches verbs to the voice's gender, says \"<name> ji\" when it does not know the caller's gender, and does not repeat itself.",
        ],
      },
    ],
    sources: [
      { label: "Vomyra homepage", url: "https://vomyra.com/", checked: CHECKED },
      { label: "Vomyra pricing and pricing FAQ", url: "https://vomyra.com/pricing", checked: CHECKED },
      { label: "Vomyra security", url: "https://vomyra.com/security", checked: CHECKED },
      { label: "Vomyra integrations", url: "https://vomyra.com/integrations", checked: CHECKED },
      {
        label: "Vomyra integrations: Tools and workflows",
        url: "https://vomyra.com/integrations/tools",
        checked: CHECKED,
      },
      { label: "Vomyra customer stories", url: "https://vomyra.com/customers", checked: CHECKED },
      {
        label: "Vomyra docs: Indian language support",
        url: "https://docs.vomyra.com/docs/india/languages",
        checked: CHECKED,
      },
      {
        label: "Vomyra docs: Indian phone numbers (KYC)",
        url: "https://docs.vomyra.com/docs/india/phone-numbers",
        checked: CHECKED,
      },
      {
        label: "Vomyra docs: WhatsApp calling",
        url: "https://docs.vomyra.com/docs/whatsapp-calling",
        checked: CHECKED,
      },
    ],
    faqs: [
      {
        q: "Is Vomyra's unlimited plan cheaper than Telleo?",
        a: "It depends on volume. Comparing list prices as published, Telleo's annual plan (₹19,999 a year plus ₹3.49 a minute) costs less than Vomyra's Unlimited Solo (₹19,999 a month, shown on an annual plan) until you use about 5,250 minutes a month. Above that, the unlimited plan works out cheaper, within its fair-use terms and two-call concurrency.",
      },
      {
        q: "What does \"unlimited\" cover on Vomyra?",
        a: "Per Vomyra's pricing page, unlimited plans cover calling to Indian numbers within TRAI-permitted hours, under a fair-use policy with an eight-hour daily calling window. Concurrency is capped at 2, 6 or 15 calls by plan, and international calls are billed per second.",
      },
      {
        q: "Does Telleo offer mobile-series numbers like Vomyra?",
        a: "No. Telleo calls go out on Telleo's lines (Plivo), or on a dedicated AI line with your own Plivo sub-account and caller ID. Vomyra offers managed 98 and 94 series mobile numbers.",
      },
      {
        q: "Can Telleo clone my voice?",
        a: "No. Telleo offers 80+ ready voices across 7 speech engines, with a preview of the exact voice before calls go out. Vomyra lists voice cloning on its Unlimited plans.",
      },
      {
        q: "Does Telleo connect to Zoho, HubSpot or Salesforce?",
        a: "Not natively. Telleo has its own built-in CRM and connects to other systems through webhooks. Vomyra lists ready integrations with Zoho CRM, HubSpot and Salesforce.",
      },
      {
        q: "When were these facts checked?",
        a: "On 25 September 2026, on Vomyra's website and docs. Vendors change pricing and features often, so please confirm on vomyra.com.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 5. Telleo vs building your own agent
  // ---------------------------------------------------------------------------
  {
    slug: "telleo-vs-build-your-own",
    label: "Telleo vs build your own",
    title: "Telleo vs Building Your Own Voice Agent (Vapi, Retell)",
    description:
      "Build a voice agent on Vapi, Retell AI or Pipecat, or use Telleo? Compare published pricing, telephony, Hindi call quality work, CRM and upkeep before deciding.",
    other: "building your own agent on Vapi, Retell AI, Pipecat or LiveKit",
    h1: "Telleo vs building your own voice agent",
    lede:
      "Developer platforms like Vapi and Retell AI, and open-source frameworks like Pipecat and LiveKit Agents, let an engineering team build a voice agent exactly the way it wants. Telleo is a finished product for teams that would rather not. We checked the platform facts below on each vendor's public site on 25 September 2026. They may have changed since.",
    verdict:
      "Build your own if voice AI is part of your product, you have engineers to own it, and you need full control over models, data and integrations. Use Telleo if you want Hindi and Hinglish calls, telephony, a CRM that acts on outcomes and per-call health checks without building and maintaining them yourself, priced in rupees per minute.",
    rows: [
      {
        dimension: "What you get",
        telleo:
          "A finished product: agent builder, telephony, CRM, follow-up automation and call analysis.",
        other:
          "Building blocks. Vapi and Retell host the voice pipeline; Pipecat and LiveKit Agents are open-source frameworks you run yourself.",
      },
      {
        dimension: "Pricing model",
        telleo:
          "A per-minute rate in rupees that includes telephony: ₹3.49/min on the annual plan, ₹3.99/min on monthly plans. Excludes 18% GST.",
        other:
          "In US dollars and in parts. Vapi: $0.05/min hosting, with models passed through at cost, plus telephony. Retell: $0.07 to $0.31/min for voice agents, depending on the LLM and voice chosen.",
      },
      {
        dimension: "Entry cost",
        telleo:
          "Starter ₹3,499/month minimum billing (a trial plan, up to 3 months), Pro ₹6,999/month, or ₹19,999/year on the annual plan. The full CRM and workflow automations come with the annual plan, or with Pro + CRM at ₹8,999/month.",
        other:
          "Vapi: $0 to start with $5 free credits; support packages from $29/month. Retell: $10 free credits and 20 free concurrent calls. Pipecat and LiveKit Agents: free and open source.",
      },
      {
        dimension: "Engineering effort",
        telleo:
          "No code. Opening line, script, questions, outcomes and handoff numbers are set in a form.",
        other:
          "Engineers write prompts, tools and webhooks. With a framework you also run hosting, scaling and monitoring.",
      },
      {
        dimension: "Telephony",
        telleo:
          "Included on Telleo's lines (Plivo). No SIMs, dialers or telecom contracts.",
        other:
          "You choose the carrier and numbers. Vapi lists its own telephony/SIP as free and Twilio, Vonage and Telnyx transport fees; Retell lists Twilio and Telnyx rates by country, including India.",
      },
      {
        dimension: "Hindi and Hinglish",
        telleo:
          "In production, with the tuning done: barge-in on phone lines, no repeated sentences, no parroting, gendered Hindi grammar, phone numbers read digit by digit.",
        other:
          "Depends on the speech-to-text, LLM and voice you pick. Interruptions, fillers like \"haan\" and Hindi grammar are yours to tune and test.",
      },
      {
        dimension: "CRM and follow-up",
        telleo:
          "Built in: lead sources, round-robin assignment, retries, bookings, WhatsApp and email.",
        other:
          "Build it or connect one. Retell lists integrations such as HubSpot, Make and n8n; otherwise webhooks and APIs.",
      },
      {
        dimension: "Call analysis",
        telleo:
          "Outcome, summary, lead rating and extracted answers on every AI call, free. Human calls analysed per minute of recording.",
        other:
          "Retell lists post-call analysis, and AI quality assurance at $0.10/min after the first 100 free minutes. With a framework, you build it.",
      },
      {
        dimension: "Quality monitoring",
        telleo:
          "A green, amber or red health verdict on every AI call with a plain headline.",
        other:
          "Vapi lists critical monitoring and call simulation; Retell lists simulation testing. With a framework, you build dashboards and alerts.",
      },
      {
        dimension: "Control",
        telleo:
          "You configure the agent and choose its voice and speech engine; Telleo runs the pipeline. No public API or SDK; webhooks for integration.",
        other:
          "Full control of models, prompts, tools, data flow and hosting. Pipecat and LiveKit Agents can run on your own servers.",
      },
      {
        dimension: "Compliance",
        telleo: "No certifications claimed. We register DLT with you.",
        other:
          "Retell: \"SOC 2 certified, HIPAA-ready\". Vapi: HIPAA option at $2,000/month. Self-hosted frameworks: whatever your own setup achieves.",
      },
      {
        dimension: "Best for",
        telleo:
          "Sales, admissions and service teams that want results from calling, not a voice AI project.",
        other: "Product and engineering teams building voice into their own product.",
      },
    ],
    chooseTelleoIf: [
      "You don't have engineers to build and maintain a real-time voice pipeline.",
      "Your calls are in Hindi, English or Hinglish and you don't want to tune interruptions, fillers and grammar yourself.",
      "You want telephony, CRM, follow-ups and call analysis on one bill, in rupees.",
      "You want a per-call health verdict rather than raw logs to dig through.",
    ],
    chooseOtherIf: [
      "Voice AI is part of your own product and you need control of every component.",
      "You need a public API, custom tools during the call or deep integration with your own systems.",
      "You want to choose specific models, voices or carriers, or host everything yourself.",
      "You need compliance options such as HIPAA agreements that a platform publishes.",
      "You need languages Telleo does not yet run in production.",
    ],
    sections: [
      {
        heading: "What building your own involves",
        body: [
          "A phone agent needs speech-to-text, a language model, text-to-speech, telephony, turn-taking, hosting, and somewhere for results to go. Vapi and Retell AI host the real-time pipeline and let you choose the providers. Pipecat (BSD-2 licence, maintained by Daily) and LiveKit Agents (Apache 2.0) are open-source frameworks; you run the servers yourself, or use a hosted option such as Pipecat Cloud for Pipecat or LiveKit Cloud for LiveKit Agents.",
          "In every case your team still writes the prompts, connects your data, picks a carrier and decides what happens after each call.",
        ],
      },
      {
        heading: "What it costs",
        body: [
          "Vapi charges $0.05 a minute for hosting, with speech and model costs passed through at cost and telephony on top. Its pricing calculator's default example puts 1,000 minutes at $82 to $129 a month. Retell publishes $0.07 to $0.31 a minute for voice agents, $10 in free credits, $2 a month per phone number, and 20 free concurrent calls, then $8 per extra concurrent call per month.",
          "Pipecat and LiveKit Agents are free to use, but you pay for the AI services, telephony and servers, plus the engineering time to run them. Telleo's rate of ₹3.49 a minute on the annual plan includes telephony and analysis of AI calls, and excludes GST.",
        ],
      },
      {
        heading: "The part that takes longest",
        body: [
          "A first working agent is quick on any of these tools. Pipecat's quickstart promises a first bot in five minutes, and Retell says you can go live in minutes. Making it hold up on real Indian phone lines is the long part: callers interrupt, say \"haan\" mid-sentence, go silent, or hand the phone to someone else.",
          "Telleo's agents already handle barge-in on phone lines, never repeat a sentence, avoid parroting answers back, match Hindi verbs to the voice's gender and close politely if they cannot hear the caller twice. Every AI call also gets a health verdict, so problems like long silences or a failed transfer show up in plain words.",
        ],
      },
    ],
    sources: [
      { label: "Vapi pricing", url: "https://vapi.ai/pricing", checked: CHECKED },
      { label: "Retell AI pricing", url: "https://www.retellai.com/pricing", checked: CHECKED },
      {
        label: "Pipecat documentation: introduction",
        url: "https://docs.pipecat.ai/getting-started/introduction",
        checked: CHECKED,
      },
      { label: "Pipecat on GitHub (BSD-2-Clause)", url: "https://github.com/pipecat-ai/pipecat", checked: CHECKED },
      { label: "LiveKit Agents on GitHub (Apache-2.0)", url: "https://github.com/livekit/agents", checked: CHECKED },
    ],
    faqs: [
      {
        q: "Is building on Vapi or Retell cheaper than Telleo?",
        a: "It depends on your stack and volume. Vapi and Retell price in US dollars and in parts: platform fee, speech, model, voice, telephony, numbers and concurrency. Add those up for your expected minutes, plus engineering time, before comparing with Telleo's rupee rate, which includes telephony.",
      },
      {
        q: "Are Pipecat and LiveKit Agents really free?",
        a: "The frameworks are open source: Pipecat under the BSD-2 licence and LiveKit Agents under Apache 2.0. You still pay for the AI services, telephony and servers you use, and for the engineers who run them.",
      },
      {
        q: "Does Telleo have an API?",
        a: "No public API or SDK. Telleo connects to other systems through webhooks and HTTP request steps in its workflows. If your use needs a full developer API, a developer platform is the better fit.",
      },
      {
        q: "Which speech engines does Telleo use?",
        a: "Telleo offers 80+ voices across 7 speech engines: Google Chirp3-HD, Sarvam Bulbul, Smallest Lightning (standard and Pro), Rumik, Microsoft Edge and Deepgram Aura-2 for English. Voice preview plays the exact engine and voice that will go out on the call.",
      },
      {
        q: "Can I start with Telleo and build my own later?",
        a: "Yes. Every AI call has a full transcript, recording can be switched on for every call, and the call log supports search, filters and export.",
      },
      {
        q: "When were these facts checked?",
        a: "On 25 September 2026, on the Vapi and Retell AI pricing pages, the Pipecat documentation, and the Pipecat and LiveKit Agents GitHub repositories. Please confirm on each vendor's site before deciding.",
      },
    ],
  },
];

export const findComparison = (slug: string) => COMPARISONS.find((c) => c.slug === slug);
