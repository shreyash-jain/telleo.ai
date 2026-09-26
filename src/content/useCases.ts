import type { UseCase } from "./types";

/**
 * Use-case pages. Every product claim here is backed by docs/PRODUCT_FACTS.md.
 * The only external statistic is the HBR 2011 speed-to-lead study (PRODUCT_FACTS §9).
 */
export const USE_CASES: UseCase[] = [
  // ---------------------------------------------------------------------------
  // 1. Lead qualification
  // ---------------------------------------------------------------------------
  {
    slug: "lead-qualification",
    label: "Lead qualification",
    title: "AI Lead Qualification Calls for Indian Businesses",
    description:
      "An AI voice agent that calls every lead, asks your qualifying questions in Hindi, English or Hinglish, rates it 1 to 10 and hands hot leads to a sales rep.",
    icon: "UserCheck",
    summary:
      "Ask every lead your qualifying questions, rate it 1 to 10 and send the ready ones to a rep.",
    h1: "Qualify every lead on a call before a rep picks up the phone",
    lede:
      "Your AI agent calls each lead, asks the questions your best rep would ask, one at a time, and rates the lead from 1 to 10. Leads that fit go to a rep with a summary. The rest are retried or stopped by the rules you set.",
    problem: {
      heading: "Reps spend their day on leads that were never going to buy",
      body: [
        "Most lead lists are mixed. Some people filled the form by mistake, some want a different product, some have no budget, and a few are ready to buy this week. Your reps can't tell which is which until they call, so they call everyone in the order the leads arrived.",
        "By the time they reach the good leads, those leads have often spoken to someone else. And the answers from a hundred short calls sit in a rep's head or a notebook, not in your CRM.",
        "Qualification is the same five or six questions every time. That is the part of the job a voice agent can do on every single lead, while writing down every answer.",
      ],
    },
    flow: [
      {
        step: "The call goes out",
        detail:
          "A workflow calls the lead as soon as it arrives, or you run a campaign over a list, or a rep clicks Call on a single lead.",
      },
      {
        step: "Opening line with context",
        detail:
          "The agent greets the lead by name and mentions what they enquired about, using the fields from their form.",
      },
      {
        step: "One question at a time",
        detail:
          "It asks the questions in your script one at a time: need, budget, timeline, location, who decides. Your extraction questions tell the post-call analysis what to pull out. It does not read the caller's answers back to them.",
      },
      {
        step: "Handles questions and interruptions",
        detail:
          "If the caller asks something, it answers from your script and moves to the next question. A quick 'haan' or 'okay' while it is talking does not throw it off.",
      },
      {
        step: "Hot lead? Transfer or book",
        detail:
          "If the caller wants to talk to someone now, the agent transfers the call live to your handoff number. Or it agrees a specific day and time for a meeting.",
      },
      {
        step: "Rated and routed",
        detail:
          "After the call, the lead gets a disposition from your list, a short summary, a 1 to 10 rating and the extracted answers. Your rules assign it to a rep, retry it or stop.",
      },
    ],
    sampleCall: [
      {
        who: "agent",
        text: "नमस्ते Rahul जी, मैं Sunrise Academy की AI assistant Neha बोल रही हूँ। आपने NEET coaching के लिए enquiry की थी, क्या अभी दो मिनट बात हो सकती है?",
        en: "Hello Rahul ji, I'm Neha, the AI assistant at Sunrise Academy. You had enquired about NEET coaching. Can we talk for two minutes?",
      },
      { who: "caller", text: "हाँ, बोलिए।", en: "Yes, go ahead." },
      {
        who: "agent",
        text: "Coaching आपके लिए है या आपके बच्चे के लिए?",
        en: "Is the coaching for you or for your child?",
      },
      {
        who: "caller",
        text: "बेटी के लिए, वो अभी eleventh में है।",
        en: "For my daughter, she is in Class 11 now.",
      },
      {
        who: "agent",
        text: "आप online batch देख रहे हैं या centre पर offline classes?",
        en: "Are you looking at the online batch or offline classes at the centre?",
      },
      {
        who: "caller",
        text: "Offline, अगर Civil Lines वाले centre पर हो तो।",
        en: "Offline, if it's at the Civil Lines centre.",
      },
      {
        who: "agent",
        text: "जी, वहाँ weekday और weekend दोनों batch चलते हैं। सालाना fees के लिए आपने लगभग कितना budget सोचा है?",
        en: "Yes, both weekday and weekend batches run there. Roughly what budget have you planned for the yearly fees?",
      },
      {
        who: "caller",
        text: "सवा लाख तक चल जाएगा।",
        en: "Up to one and a quarter lakh is fine.",
      },
      {
        who: "agent",
        text: "हमारे senior counsellor आपको batch और scholarship की details बता देंगे। क्या मैं अभी आपकी call उनसे connect कर दूँ?",
        en: "Our senior counsellor will give you the batch and scholarship details. Shall I connect your call to them now?",
      },
      { who: "caller", text: "हाँ, कर दीजिए।", en: "Yes, please do." },
    ],
    captures: [
      "Requirement, in the lead's own words",
      "Who the product or course is for",
      "Budget range",
      "Timeline to decide or start",
      "Preferred location, branch or mode",
      "Lead rating from 1 to 10, with a 2 to 3 sentence summary",
      "Meeting day and time if agreed, or a callback request",
    ],
    outcomes: [
      {
        when: "The lead fits (your Qualified disposition)",
        then: "Assigned to a sales rep, round-robin if you use it, with the summary, rating and answers on the lead. The lead is marked AI qualified if that status exists in your CRM.",
      },
      {
        when: "The caller wants to talk to someone now",
        then: "Live transfer to your handoff number. The agent says a short bridge line and connects the call.",
      },
      {
        when: "Not interested or not a fit",
        then: "The outcome is saved as not interested and automated retries stop.",
      },
      {
        when: "The caller says 'call me tomorrow evening'",
        then: "Saved as a callback request, with their words in the transcript, and the lead goes on your retry path.",
      },
      {
        when: "No answer, or nobody really spoke",
        then: "Marked no answer or Incomplete, never Not interested. Workflow calls are retried after the gap you set, up to your maximum attempts, then handed to a human or stopped; a campaign doesn't re-dial, so re-run it over the leads who didn't answer.",
      },
    ],
    metrics: [
      "Connect rate: calls where the lead spoke ÷ calls dialled",
      "Qualification rate: calls marked Qualified ÷ connected calls",
      "Rep agreement: AI-qualified leads your reps also rate as good after their first call",
      "Meetings booked from AI-qualified leads vs leads your reps qualified themselves",
      "Average lead rating by source: Meta, Google, website form, import",
    ],
    setup: [
      "Write the opening line and persona, or describe your business in plain words and let the AI draft the script. Score it against the live-call rubric before going live.",
      "Add your extraction questions: the five or six things every call must find out.",
      "Define dispositions (Qualified, Not interested, Callback, Wrong number) and pick which ones assign to a rep and which ones stop.",
      "Choose language, voice and pace, and play the voice preview to hear exactly what callers will hear.",
      "Add handoff numbers for live transfer, and set the retry gap and maximum attempts.",
      "Connect your lead source (Meta, Google lead forms, a website webhook or a CSV) and switch on the workflow. DLT registration is done with you before calls start.",
    ],
    industries: ["education", "real-estate", "lending", "insurance", "automotive", "travel-hospitality"],
    faqs: [
      {
        q: "How is the 1 to 10 lead rating decided?",
        a: "After the call, the transcript is analysed against your dispositions and extraction questions, and the rating reflects how interested the caller was. The rating comes with a 2 to 3 sentence summary, so a rep can see why one lead scored 8 and another 4. Routing runs on your dispositions, not on the number, so you decide who reaches a rep.",
      },
      {
        q: "Will it fill in answers the caller didn't give?",
        a: "No. Extracted answers are only what was actually said on the call. If the caller skipped the budget question, the budget field stays empty instead of being guessed.",
      },
      {
        q: "Can it hand a hot lead to a rep during the call?",
        a: "Yes. Add handoff numbers to the agent. When the caller wants to talk to a person now, the agent says a short bridge line and connects the call live.",
      },
      {
        q: "Which CRM do the results go to?",
        a: "The call, transcript, recording (when switched on), rating and answers are saved on the call, linked to the lead in Telleo's CRM. To send results to another system, add a webhook or HTTP request step to the workflow. It works with anything that can send or receive a webhook.",
      },
      {
        q: "Which languages can it qualify leads in?",
        a: "Hindi, English and Hinglish are in production. Tamil, Telugu, Marathi, Bengali, Gujarati, Kannada, Malayalam, Punjabi and Odia are supported by the voice engines and are set up with you on request.",
      },
      {
        q: "Can I hear it before my leads do?",
        a: "Yes. Call the live test line on +91 80353 74489 to talk to an AI agent. In the builder, the voice preview plays the exact voice and engine your agent will use on real calls.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 2. Instant lead callback
  // ---------------------------------------------------------------------------
  {
    slug: "instant-lead-callback",
    label: "Instant lead callback",
    title: "Instant Lead Callback: AI Calls New Leads in About a Minute",
    description:
      "Call every Meta, Google or website lead about a minute after it reaches Telleo, inside your calling hours, then qualify it and book a next step.",
    icon: "Zap",
    summary:
      "Call every new lead from ads and forms in about a minute, while they still remember filling the form.",
    h1: "Call every new lead within about a minute of the form",
    lede:
      "When a lead arrives from a Meta ad, a Google lead form or your website, a Telleo workflow calls them in about 60 seconds. The AI agent confirms what they wanted, asks your key questions and moves the good ones to a rep, a meeting or a WhatsApp.",
    problem: {
      heading: "Leads go cold while they wait in a queue",
      body: [
        "Someone fills your form at 11:40 in the morning. Your team sees it after lunch, or the next day. By then the lead has filled two other forms and taken the first call that came.",
        "Research reported in Harvard Business Review in 2011, covering 1.25 million leads at 42 U.S. companies, found that firms which tried to contact a lead within an hour were nearly 7 times as likely to qualify it as firms that tried an hour later, and more than 60 times as likely as firms that waited 24 hours or longer. Channels have changed since then. The idea has not: the first useful reply gets the lead's attention.",
        "Keeping callers free for the lunch hour, the evening rush and the weekend ad spike is expensive. A workflow that dials the moment a lead lands does not need a shift roster.",
      ],
    },
    flow: [
      {
        step: "The lead lands",
        detail:
          "A new lead arrives from Meta (Facebook or Instagram) lead ads, a Google lead form, your website form via webhook, or manual entry. Duplicates are matched by phone or email.",
      },
      {
        step: "The workflow dials in about 60 seconds",
        detail:
          "The first workflow step is an AI call. It follows your time-window condition and daily call cap, and skips leads a rep has already been assigned.",
      },
      {
        step: "Context in the first line",
        detail:
          "The agent opens with the lead's name and what they asked about, so the caller knows why you are calling.",
      },
      {
        step: "Quick qualification",
        detail:
          "It asks the two or three questions that decide the next step, one at a time.",
      },
      {
        step: "Next step on the same call",
        detail:
          "A live transfer to a rep, a meeting booked on your booking page, or a WhatsApp with the brochure or location the caller agreed to receive.",
      },
      {
        step: "Retry if unanswered",
        detail:
          "No answer? The workflow retries after the gap you set, up to your maximum attempts, then hands the lead to a human or stops.",
      },
    ],
    sampleCall: [
      {
        who: "agent",
        text: "नमस्ते Priya जी, मैं Greenfield Realty से Arjun बोल रहा हूँ। आपने अभी Facebook पर Sector 150 वाले 2BHK project के लिए form भरा था। क्या दो मिनट बात हो सकती है?",
        en: "Hello Priya ji, this is Arjun from Greenfield Realty. You just filled a form on Facebook for the 2BHK project in Sector 150. Can we talk for two minutes?",
      },
      {
        who: "caller",
        text: "हाँ, इतनी जल्दी call आ गया! बोलिए।",
        en: "Oh, that was quick! Go ahead.",
      },
      {
        who: "agent",
        text: "आप flat खुद रहने के लिए देख रही हैं या investment के लिए?",
        en: "Are you looking at the flat to live in, or as an investment?",
      },
      {
        who: "caller",
        text: "रहने के लिए। Possession कब तक मिलेगा?",
        en: "To live in. When will we get possession?",
      },
      {
        who: "agent",
        text: "Tower B का possession अगले साल March में planned है। आप कब तक shift होना चाहेंगी?",
        en: "Possession of Tower B is planned for March next year. By when would you like to move in?",
      },
      {
        who: "caller",
        text: "अगले साल के बीच तक।",
        en: "By the middle of next year.",
      },
      {
        who: "agent",
        text: "Site visit के लिए इस Saturday या Sunday में से कौन सा दिन ठीक रहेगा?",
        en: "For a site visit, which day suits you, this Saturday or Sunday?",
      },
      {
        who: "caller",
        text: "Sunday, सुबह ग्यारह बजे।",
        en: "Sunday, eleven in the morning.",
      },
      {
        who: "agent",
        text: "जी, Sunday सुबह ग्यारह बजे आपकी site visit book कर दी है। क्या मैं इसी number पर WhatsApp पर location भेज दूँ?",
        en: "Done, your site visit is booked for Sunday at eleven in the morning. Shall I send the location on WhatsApp to this number?",
      },
      { who: "caller", text: "हाँ, भेज दीजिए।", en: "Yes, please send it." },
    ],
    captures: [
      "Confirmed interest: what they enquired about",
      "Purpose, such as own use or investment",
      "Timeline to buy or start",
      "Budget range",
      "Site visit, demo or meeting day and time, if agreed",
      "Consent to receive a WhatsApp (brochure, location, price sheet)",
    ],
    outcomes: [
      {
        when: "The caller agrees a specific day and time",
        then: "The meeting is booked on your booking page automatically, and the WhatsApp the caller accepted (location, brochure) is sent and tracked for delivery.",
      },
      {
        when: "The caller wants to talk to a person now",
        then: "Live transfer to the rep's handoff number during the call.",
      },
      {
        when: "Interested but busy right now",
        then: "Saved as a callback request, with the time they gave ('kal shaam') in the transcript, and put on your retry path.",
      },
      {
        when: "No answer or voicemail",
        then: "Marked no answer or Incomplete, never Not interested. Retried after your gap, up to your maximum attempts, then handed to a human or stopped.",
      },
      {
        when: "Not interested, or the form was filled by mistake",
        then: "The workflow stops and the outcome is saved as not interested.",
      },
    ],
    metrics: [
      "Time to first call: lead created to first dial, by source",
      "Connect rate on the first attempt vs later attempts",
      "Share of new leads that reach a next step (visit, demo, meeting) on the first call",
      "Leads that arrived outside your calling window, and how soon they were called once it opened",
      "Cost per qualified lead by ad source, now that every lead gets a call",
    ],
    setup: [
      "Connect lead sources: Meta lead ads, Google lead forms, or your website form via webhook.",
      "Create the workflow: new lead arrives, then AI call. Add a time-window condition for the hours calls may go out.",
      "Write a short opening line that uses the lead's name and the form they filled, so the call makes sense in the first few seconds.",
      "Keep extraction questions to the two or three that decide the next step.",
      "Add your booking page, handoff numbers and approved WhatsApp templates (location, brochure).",
      "Set retries: the gap between attempts, the maximum attempts, and whether exhausted leads go to a human.",
    ],
    industries: ["real-estate", "education", "lending", "insurance", "automotive", "travel-hospitality"],
    faqs: [
      {
        q: "How fast is the first call, really?",
        a: "A workflow triggered by a new lead can place the call about 60 seconds after the lead arrives in Telleo. The real gap also depends on how quickly your ad platform or form delivers the lead, on your calling hours and daily cap, and on whether one of your bulk campaigns is still working through its list, because new-lead calls wait in the same queue.",
      },
      {
        q: "What happens to leads that come in at night?",
        a: "Workflow calls respect your calling hours, 9 am to 9 pm unless you change them. A lead that arrives at night waits in the queue and is called automatically when the hours open.",
      },
      {
        q: "Will a lead get two calls if they submit the form twice?",
        a: "Leads are de-duplicated by phone or email, and a 30-second duplicate guard stops the same lead being dialled twice by accident. The automation also skips leads already assigned to a rep.",
      },
      {
        q: "Which lead sources can trigger the call?",
        a: "Meta (Facebook and Instagram) lead ads, Google lead forms, any website form via webhook, CSV or Excel imports and manual entry. Any other tool works if it can send a webhook.",
      },
      {
        q: "Won't a call one minute after the form feel pushy?",
        a: "The person has just asked you for information, and the opening line says why you are calling. If they say they are busy, the agent makes one short offer of a specific time for the next step; if they still decline, it asks when to call back and ends the call, and the call is marked as a callback request with their words in the transcript, instead of pushing on with questions.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 3. Appointment booking
  // ---------------------------------------------------------------------------
  {
    slug: "appointment-booking",
    label: "Appointment booking",
    title: "AI Appointment Booking Calls for Demos and Site Visits",
    description:
      "An AI voice agent that books demos, site visits and consultations on the call, saves them to your booking page and sends the confirmation on WhatsApp.",
    icon: "CalendarCheck",
    summary:
      "Agree a day and time on the call, book it on your booking page and send the confirmation on WhatsApp.",
    h1: "Book demos, site visits and consultations on the call",
    lede:
      "The AI agent offers slots, agrees a specific day and time with the caller, and the meeting lands on your booking page automatically. A WhatsApp confirmation goes out if the caller wants one, and you can run a reminder campaign the day before to check they are still coming.",
    problem: {
      heading: "Every booking takes three calls and a WhatsApp thread",
      body: [
        "Booking a visit by phone sounds simple. In practice it is a missed call, a callback, a 'let me check and tell you', and a WhatsApp thread to confirm. Each step is a chance for the lead to go quiet.",
        "Then the day comes and nobody reminds them. Your counsellor or site manager waits, the slot is lost, and the rep who booked it never finds out why.",
        "The work is repetitive: offer times, agree one, confirm, remind. A voice agent can do all of it and leave a clean record of every booking.",
      ],
    },
    flow: [
      {
        step: "Confirm interest",
        detail:
          "The agent opens with the caller's name and the reason for the call, and checks they still want the demo, visit or consultation.",
      },
      {
        step: "Offer times",
        detail:
          "It offers days and hours from your script, one question at a time, and understands answers like 'kal shaam' or 'Sunday morning'.",
      },
      {
        step: "Agree a specific slot",
        detail:
          "A meeting only counts when a specific day and time were agreed. 'Sometime next week' is not saved as a booking; the lead goes to a person or back on your retry path.",
      },
      {
        step: "Read it back once",
        detail:
          "The agent reads the booked day and time back once, so the caller can correct it.",
      },
      {
        step: "Book and confirm",
        detail:
          "After the call, the meeting is booked on your booking page and the WhatsApp or email confirmation the caller accepted is sent.",
      },
      {
        step: "Remind",
        detail:
          "Run a reminder campaign over the next day's bookings. The agent checks they are still coming and offers a new time if they are not.",
      },
    ],
    sampleCall: [
      {
        who: "agent",
        text: "Good evening, Sharma ji. This is Meera, an AI assistant calling from Riverside Dental Clinic. You asked about a consultation for teeth aligners. Is this a good time to book it?",
      },
      { who: "caller", text: "Yes, go ahead." },
      {
        who: "agent",
        text: "Would a weekday or the weekend suit you better?",
      },
      { who: "caller", text: "Saturday, ideally." },
      {
        who: "agent",
        text: "This Saturday the doctor has slots at 10:30 in the morning and 4 in the afternoon. Which one works for you?",
      },
      { who: "caller", text: "4 pm is fine." },
      {
        who: "agent",
        text: "Done, your consultation is booked for Saturday at 4 pm with Dr Mehta. Shall I send the clinic address and a confirmation on WhatsApp?",
      },
      { who: "caller", text: "Yes, please." },
      {
        who: "agent",
        text: "Is there anything you would like the doctor to know before your visit?",
      },
      { who: "caller", text: "No, that's all. Thanks." },
    ],
    captures: [
      "Meeting type: demo, site visit or consultation",
      "Agreed day and time",
      "Preferred branch, location, or online vs in person",
      "Who will attend",
      "Reason for the visit or main question",
      "Consent to a WhatsApp or email confirmation",
    ],
    outcomes: [
      {
        when: "A specific day and time are agreed",
        then: "Booked on your booking page automatically. The WhatsApp or email confirmation the caller accepted is sent and tracked for delivery.",
      },
      {
        when: "The caller wants a meeting but can't fix a time",
        then: "Saved as a callback request, with any time they mentioned in the transcript, and the lead goes on your retry path.",
      },
      {
        when: "The caller wants to speak to the doctor, manager or counsellor first",
        then: "Live transfer to the handoff number you set for this agent.",
      },
      {
        when: "Reminder call: the caller can't make it",
        then: "Recorded with your disposition, such as Rescheduled or Cancelled, and assigned to a rep who updates the booking.",
      },
      {
        when: "No answer",
        then: "Workflow calls are retried after your gap, up to your maximum attempts; a reminder campaign doesn't re-dial, so re-run it over those customers. Calls where nobody spoke are marked Incomplete, never Not interested.",
      },
    ],
    metrics: [
      "Booking rate: meetings booked ÷ connected calls",
      "Show-up rate: meetings attended ÷ meetings booked, from your own records",
      "Reschedule and cancel rate on reminder calls",
      "Time from a lead arriving to a meeting booked",
    ],
    setup: [
      "Create or pick the booking page the agent books into.",
      "Put your available days, hours and slot rules in the script, so the agent only offers times you can keep.",
      "Add dispositions such as Booked, Callback, Not interested, Rescheduled and Cancelled.",
      "Get your confirmation and location WhatsApp templates approved and link them to the agent.",
      "Set handoff numbers for callers who want to speak to a person first.",
      "For reminders, run a campaign over the next day's bookings inside the calling window you choose.",
    ],
    industries: ["healthcare", "real-estate", "education", "automotive", "insurance"],
    faqs: [
      {
        q: "Does the agent see my live calendar?",
        a: "The agent offers times from your script. After the call, the agreed day and time are booked on your booking page. Keep the slot rules in the script in line with your real availability, so it only offers times you can keep.",
      },
      {
        q: "What counts as a booking?",
        a: "Only a specific day and time that the caller agreed to. 'I will come next week' is not a booking, so nobody waits for a visitor who never fixed a time; the lead goes to a person or back on your retry path.",
      },
      {
        q: "Can it send the address or joining link?",
        a: "Yes, as an approved WhatsApp template or an email, once the caller agrees to receive it. Every send is tracked for delivery and never sent twice.",
      },
      {
        q: "How do reminder calls work?",
        a: "Set up a short reminder agent and run it as a campaign over the next day's bookings. It checks the caller is still coming and records the answer with your dispositions. Rescheduled or cancelled bookings go to a rep to update.",
      },
      {
        q: "What if the caller wants to talk to the doctor or manager first?",
        a: "Add a handoff number to the agent. It says a short bridge line and transfers the call live. The call record shows whether the transfer went through.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 4. Payment reminders
  // ---------------------------------------------------------------------------
  {
    slug: "payment-reminders",
    label: "Payment reminders",
    title: "AI Payment Reminder Calls for Fees, EMIs and Renewals",
    description:
      "Polite AI reminder calls for fees, EMIs, premiums, invoices and renewals. Telleo states what is due, notes when the customer will pay and sends a WhatsApp link.",
    icon: "Wallet",
    summary:
      "Remind customers about fees, EMIs, premiums and renewals, and note when each one plans to pay.",
    h1: "Payment reminder calls that stay polite and end with a date",
    lede:
      "The AI agent calls each customer before or on the due date, tells them what is due, asks when they plan to pay and sends your payment link on WhatsApp if they want it. Anyone with a problem is passed to your team.",
    problem: {
      heading: "Reminders are the calls nobody on your team wants to make",
      body: [
        "Every month someone sits with a due list and a phone. The calls are awkward, so they get pushed to the end of the day, made in a rush, or skipped for the customers who are hardest to talk to.",
        "SMS and email reminders are easy to ignore. A call gets attention, but a pushy call damages a relationship you want to keep, whether that is a parent paying school fees or a customer on their fourth EMI.",
        "Most reminders need the same four things: who you are, what is due, by when, and how to pay. The calls that need judgement are the ones where the customer has a problem, and those should reach a person quickly.",
      ],
    },
    flow: [
      {
        step: "Load the due list",
        detail:
          "Import a CSV or Excel of customers with the amount and due date, or send each due customer to a workflow by webhook.",
      },
      {
        step: "A clear, polite opening",
        detail:
          "The agent says who is calling and why, and states the amount and due date from the customer's record.",
      },
      {
        step: "Ask for a plan",
        detail:
          "It asks when they plan to pay. If they say they have already paid, it notes that and closes the call politely.",
      },
      {
        step: "Offer the payment link",
        detail:
          "If the customer wants it, the agent sends your approved WhatsApp template with the payment link, during the call or right after it.",
      },
      {
        step: "Problems go to a person",
        detail:
          "A dispute, a request for more time or a wrong amount gets your disposition and is assigned to your team, or transferred live.",
      },
    ],
    sampleCall: [
      {
        who: "agent",
        text: "नमस्ते Sharma जी, मैं Northstar Finance की AI assistant Kavya बोल रही हूँ। आपके two-wheeler loan की अगली EMI के बारे में बात करनी थी, क्या अभी एक मिनट है?",
        en: "Hello Sharma ji, I'm Kavya, the AI assistant from Northstar Finance. I wanted to talk about the next EMI on your two-wheeler loan. Do you have a minute?",
      },
      { who: "caller", text: "हाँ, बताइए।", en: "Yes, tell me." },
      {
        who: "agent",
        text: "आपकी चार हज़ार दो सौ रुपये की EMI पाँच तारीख़ को due है। क्या आप उससे पहले payment कर पाएँगे?",
        en: "Your EMI of four thousand two hundred rupees is due on the fifth. Will you be able to pay before then?",
      },
      {
        who: "caller",
        text: "इस बार salary सात तारीख़ को आएगी, तो सात को कर दूँगा।",
        en: "This time my salary comes on the seventh, so I'll pay on the seventh.",
      },
      {
        who: "agent",
        text: "ठीक है जी। क्या मैं WhatsApp पर payment link भेज दूँ, ताकि उस दिन आसानी रहे?",
        en: "All right. Shall I send the payment link on WhatsApp so it's easy on the day?",
      },
      { who: "caller", text: "हाँ, भेज दीजिए।", en: "Yes, send it." },
      {
        who: "agent",
        text: "क्या इस loan से जुड़ा कोई और सवाल है जिसमें मैं मदद कर सकूँ?",
        en: "Is there anything else about this loan I can help with?",
      },
      {
        who: "caller",
        text: "नहीं, बस इतना ही। धन्यवाद।",
        en: "No, that's all. Thank you.",
      },
    ],
    captures: [
      "Payment status: already paid, will pay, needs help",
      "Promise-to-pay date, as the customer said it",
      "Preferred payment mode (UPI, bank transfer, at the branch)",
      "Reason for any delay, in the customer's words",
      "Dispute or wrong-amount flag",
      "Consent to receive the payment link on WhatsApp",
    ],
    outcomes: [
      {
        when: "The customer gives a date to pay",
        then: "The date is saved on the call record with the summary. The WhatsApp payment link goes out if they accepted it, and delivery is tracked.",
      },
      {
        when: "The customer says they have already paid",
        then: "Marked with your Already paid disposition and assigned to accounts to check, instead of being called again.",
      },
      {
        when: "Dispute, wrong amount or a request for more time",
        then: "Assigned to a person on your team with the summary, or transferred live if you set a handoff number.",
      },
      {
        when: "No answer",
        then: "Retried after the gap you set, up to your maximum attempts. Calls where nobody spoke are marked Incomplete.",
      },
      {
        when: "The customer asks not to be called about this",
        then: "Your Do not call disposition stops automated retries for that customer; it is not a do-not-call list, so remove them from future due lists.",
      },
    ],
    metrics: [
      "Reach rate: customers spoken to ÷ customers on the due list",
      "Promise rate: calls that end with a pay date ÷ connected calls",
      "Promises kept: payments received by the promised date, from your own records",
      "Disputes raised per hundred calls, and time to resolve them",
      "Payment link delivery: WhatsApp templates sent vs delivered",
    ],
    setup: [
      "Import your due list with the amount and due date as fields the agent can read, or send due customers to a workflow by webhook.",
      "Write a polite opening that names your business, the amount and the due date. Keep the persona calm and factual.",
      "Add extraction questions: payment status, promised date, payment mode, reason for delay.",
      "Get your payment-link WhatsApp template approved and link it to the agent.",
      "Set dispositions (Will pay, Already paid, Dispute, Needs help, Do not call) and route disputes to a person.",
      "Choose calling windows and a daily cap that suit your customers. DLT registration is done with you before calls start.",
    ],
    industries: ["education", "lending", "insurance", "real-estate"],
    faqs: [
      {
        q: "Can it collect payment on the call?",
        a: "No. The agent does not take card, UPI or bank details on the call. If the customer agrees, it sends your approved WhatsApp template with the payment link, or an email, and that send is tracked for delivery.",
      },
      {
        q: "Is this a debt collection bot?",
        a: "No. It is built for reminders to customers you already have a relationship with: fees, EMIs, premiums, invoices and renewals. You write the persona and script, and we recommend keeping it to the facts: what is due, by when, and how to pay. Customers with a problem should go to a person.",
      },
      {
        q: "Does the agent know each customer's amount and due date?",
        a: "Yes, if they are fields on the customer's record. The agent can use the name and any field from your import or form in what it says.",
      },
      {
        q: "Can each customer get their own payment link?",
        a: "A single payment page link inside the template works for everyone. If each customer needs a unique link, confirm with us during setup how that link reaches the template.",
      },
      {
        q: "What about customers who have already paid?",
        a: "The agent asks, notes it and closes politely. Use an Already paid disposition to send those customers to your accounts team for a check, and upload a fresh due list before each round so paid customers are not called.",
      },
      {
        q: "When do the calls go out?",
        a: "Only inside the time windows you choose, and never beyond your daily call cap. Calls also stop if your balance runs out, so a bill can't run away.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 5. Lead reactivation
  // ---------------------------------------------------------------------------
  {
    slug: "lead-reactivation",
    label: "Lead reactivation",
    title: "AI Lead Reactivation Calls for Old and Cold Lead Lists",
    description:
      "Re-engage old enquiries and cold lead lists with AI calls. Telleo finds who is still interested, hands them to a rep and closes the rest, in Hindi or English.",
    icon: "RefreshCw",
    summary:
      "Call through old enquiry lists, find who is still interested and send them back to your reps.",
    h1: "Re-engage the old leads your team stopped calling",
    lede:
      "Many businesses have a list of last season's enquiries that nobody followed up properly. The AI agent calls the people on it who have given consent you can show, finds out where each person stands now and sends the ones who are still interested to a rep.",
    problem: {
      heading: "Old leads are paid for, then forgotten",
      body: [
        "You spent money on ads to get those enquiries. A few calls were made, some did not pick up, and then the next batch of leads arrived. The old list is still sitting in a spreadsheet.",
        "Nobody wants to call a two-thousand-row list where most people will say no. So it never gets called, and the few who are ready to buy now go to whoever reaches them first.",
        "Reactivation is a volume job with one simple question at its core: is this still relevant to you? That suits an agent that can work through the whole list in your calling hours and write down every answer.",
      ],
    },
    flow: [
      {
        step: "Import and clean the list",
        detail:
          "Upload the old leads as CSV or Excel. Duplicates are matched by phone or email. A bulk campaign does not skip leads a rep is already working, so leave those out of the selection.",
      },
      {
        step: "Remind them who you are",
        detail:
          "The agent opens with the lead's name and what they enquired about earlier, so the call makes sense straight away.",
      },
      {
        step: "Find where they stand",
        detail:
          "Still looking, bought elsewhere, later, or no longer relevant. One question at a time.",
      },
      {
        step: "Offer something current",
        detail:
          "A new batch, a new project, a new model. If they want details, it sends the WhatsApp template they agree to.",
      },
      {
        step: "Route and close",
        detail:
          "Interested leads go to a rep. 'Later' is saved with what they said about timing in the transcript. The rest are stopped so they are not called again by this campaign.",
      },
    ],
    sampleCall: [
      {
        who: "agent",
        text: "नमस्ते Rahul जी, मैं Sunrise Motors से Anjali बोल रही हूँ। आपने कुछ महीने पहले हमारी SUV की test drive के लिए enquiry की थी, क्या अभी बात करने का सही time है?",
        en: "Hello Rahul ji, I'm Anjali from Sunrise Motors. A few months ago you enquired about a test drive of our SUV. Is this a good time to talk?",
      },
      {
        who: "caller",
        text: "हाँ बोलिए, वैसे गाड़ी अभी ली नहीं है।",
        en: "Yes, go ahead. I haven't bought the car yet, actually.",
      },
      {
        who: "agent",
        text: "क्या आप अब भी नई गाड़ी लेने का सोच रहे हैं?",
        en: "Are you still thinking of buying a new car?",
      },
      {
        who: "caller",
        text: "हाँ, दिवाली के आसपास लेनी है।",
        en: "Yes, I want to buy around Diwali.",
      },
      {
        who: "agent",
        text: "इस महीने इसका नया variant आया है, automatic के साथ। क्या आप इस weekend test drive लेना चाहेंगे?",
        en: "A new variant came out this month, with an automatic option. Would you like to take a test drive this weekend?",
      },
      {
        who: "caller",
        text: "इस weekend नहीं हो पाएगा, अगले हफ़्ते देखते हैं।",
        en: "This weekend won't work, let's see next week.",
      },
      {
        who: "agent",
        text: "जी, कोई बात नहीं। क्या मैं नए variant का brochure और price list WhatsApp पर भेज दूँ?",
        en: "No problem. Shall I send the new variant's brochure and price list on WhatsApp?",
      },
      { who: "caller", text: "हाँ, भेज दीजिए।", en: "Yes, send them." },
      {
        who: "agent",
        text: "अगले हफ़्ते किस दिन हमारी team आपको call करे, ताकि test drive का time fix हो जाए?",
        en: "Which day next week should our team call you to fix a time for the test drive?",
      },
      {
        who: "caller",
        text: "बुधवार शाम को कर लीजिए।",
        en: "Call on Wednesday evening.",
      },
    ],
    captures: [
      "Current status: still looking, bought elsewhere, later, not relevant",
      "New timeline to buy or start",
      "What has changed since the first enquiry (budget, requirement)",
      "Callback request, if they asked for one",
      "Consent to receive a brochure or offer on WhatsApp",
      "Lead rating from 1 to 10",
    ],
    outcomes: [
      {
        when: "Still interested and ready to talk",
        then: "Assigned to a rep with the summary and rating, or transferred live to your handoff number.",
      },
      {
        when: "Interested, but later",
        then: "Saved with your Later disposition, with what they said about timing in the transcript. Set Later to assign, so a rep can call them back.",
      },
      {
        when: "Wants details",
        then: "The WhatsApp template they agreed to (brochure, price list) is sent and tracked for delivery.",
      },
      {
        when: "Bought elsewhere or no longer relevant",
        then: "The outcome is saved as not interested and automated retries stop; leave it out when you re-run the campaign.",
      },
      {
        when: "No answer",
        then: "A bulk campaign does not re-dial by itself: unanswered calls show as No answer in the call log, so run the campaign again later over those leads. Old lists have more dead numbers, so keep re-runs few.",
      },
    ],
    metrics: [
      "Reach rate on the old list: leads spoken to ÷ leads dialled",
      "Reactivation rate: leads marked interested ÷ leads spoken to",
      "Wrong-number and not-reachable share, to judge the list's quality",
      "Meetings and sales from reactivated leads, tracked in your CRM",
    ],
    setup: [
      "Import only the old leads who have given consent you can show (under TRAI's September 2026 amendment, once it takes effect, an enquiry alone covers calls for just seven days), and let de-duplication by phone or email run.",
      "Write an opening line that names the old enquiry, using the fields from the list.",
      "Add dispositions: Interested, Later, Bought elsewhere, Not relevant, Wrong number, Do not call. Set Interested and Later to assign, and the rest to stop.",
      "Link the approved WhatsApp templates for your current offer, brochure or price list.",
      "Run it as a bulk campaign inside your chosen time windows, with a daily cap your reps can keep up with.",
    ],
    industries: ["education", "real-estate", "automotive", "insurance", "lending", "travel-hospitality"],
    faqs: [
      {
        q: "How old can the leads be?",
        a: "Check consent first. Under TRAI's September 2026 amendment, once it takes effect, an enquiry supports commercial calls for only seven days from the date it was made, so older leads need explicit consent that you can show. For leads you may call, older lists have more wrong numbers and switched-off phones; keep campaign re-runs few and watch the wrong-number share after the first day.",
      },
      {
        q: "Will it call people who are already with a rep?",
        a: "A bulk campaign will, if you select them: it calls the leads you pick whether or not a rep has them, so leave those out of the selection. A workflow's AI call skips leads already assigned to a rep. Duplicates are matched by phone or email.",
      },
      {
        q: "How many calls go out in a day?",
        a: "The default daily cap is 500 calls and you can change it. Set it to what your reps can follow up, not to the most the system can dial.",
      },
      {
        q: "What if someone asks never to be called again?",
        a: "Add a Do not call disposition and set it to stop. That ends automated retries for the lead, but it is not a do-not-call list: a later campaign or a one-click call can still dial the number, so remove it from future lists.",
      },
      {
        q: "Can the agent offer a discount?",
        a: "It talks about the offers you describe in the script. Write them exactly, with dates and conditions, and tell it to send price questions it can't answer to a rep.",
      },
      {
        q: "What does it cost to call an old list?",
        a: "Billing is per minute of call, rounded up. That is ₹3.99 a minute on the monthly plans (₹3.49 beyond 1,750 minutes in a month) or ₹3.49 flat on the annual plan, plus 18% GST. See the pricing page for plan minimums.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 6. Feedback surveys
  // ---------------------------------------------------------------------------
  {
    slug: "feedback-surveys",
    label: "Feedback surveys",
    title: "AI Feedback and NPS Survey Calls for Indian Businesses",
    description:
      "Feedback, NPS and post-service surveys by phone. Telleo's AI agent asks one question at a time, saves answers in the caller's words and flags unhappy customers.",
    icon: "MessageSquareHeart",
    summary:
      "Ask customers how it went, get a score and the reason behind it, and send unhappy ones to a person.",
    h1: "Feedback and NPS calls that capture the reason behind the score",
    lede:
      "A short call after a visit, delivery, class or service. The AI agent asks for a score, asks why, and saves both in the caller's own words. Unhappy customers are assigned to your team as soon as the call ends.",
    problem: {
      heading: "Survey links get ignored and scores come without reasons",
      body: [
        "A survey link on WhatsApp or email gets a few replies, often from people who are either delighted or upset. Many of the people in between never open it.",
        "When a manager calls customers personally, the answers are richer, but only a handful of calls get made each week and the notes are hard to compare.",
        "A short, consistent call asks every customer the same questions in the same order and saves the answers side by side. An unhappy customer on the phone can also be passed to a person while it still matters.",
      ],
    },
    flow: [
      {
        step: "Call after the service",
        detail:
          "A workflow calls the customer after the visit, delivery or class, triggered by your system through a webhook. Or run a campaign over the week's list.",
      },
      {
        step: "Short, specific opening",
        detail:
          "The agent says who is calling, what the call is about, and that it will take two minutes.",
      },
      {
        step: "Score first",
        detail:
          "It asks for a 0 to 10 score, or whichever scale you use.",
      },
      {
        step: "Then the reason",
        detail:
          "It asks what drove the score, with one follow-up at most. Script it not to argue; it does not read the answer back.",
      },
      {
        step: "Route the unhappy ones",
        detail:
          "Low scores and complaints get your disposition and go to a person, with the summary and the reason.",
      },
    ],
    sampleCall: [
      {
        who: "agent",
        text: "Hello Priya ji, this is Riya, an AI assistant from Greenleaf Home Store, calling about the sofa delivered on Tuesday. Do you have two minutes for some quick feedback?",
      },
      { who: "caller", text: "Sure, go ahead." },
      {
        who: "agent",
        text: "On a scale of 0 to 10, how likely are you to recommend us to a friend?",
      },
      { who: "caller", text: "Maybe a 6." },
      {
        who: "agent",
        text: "What is the main reason for that score?",
      },
      {
        who: "caller",
        text: "The sofa is nice, but the delivery came two days late and nobody called to tell me.",
      },
      {
        who: "agent",
        text: "I'm sorry about that. Would you like someone from our delivery team to call you about it?",
      },
      {
        who: "caller",
        text: "Yes, that would help. After 6 pm is best.",
      },
      {
        who: "agent",
        text: "Thank you, Priya ji. Is there anything else you would like us to do better?",
      },
      { who: "caller", text: "No, that's it." },
    ],
    captures: [
      "Score (0 to 10, or your own scale)",
      "Main reason for the score, in the customer's words",
      "Specific complaint, if any (delivery, staff, product, billing)",
      "Whether they want a call back from your team",
      "Suggestion for improvement",
      "Whether they would buy or visit again",
    ],
    outcomes: [
      {
        when: "High score, no issues",
        then: "Marked with your Promoter disposition and stopped. If you offer a review link and they say yes, that WhatsApp template is sent.",
      },
      {
        when: "Low score or a complaint",
        then: "Assigned to a person on your team with the summary and the reason, so they call back knowing the problem.",
      },
      {
        when: "The customer asks for a call back",
        then: "Saved as a callback request on the call record, with what they said ('after 6 pm') in the transcript. Set Callback to assign so a person calls back.",
      },
      {
        when: "No answer",
        then: "Workflow calls are retried after your gap, up to your maximum attempts, then stopped; a weekly campaign doesn't re-dial, so re-run it over those customers. Calls where nobody spoke are marked Incomplete and carry no score.",
      },
    ],
    metrics: [
      "Response rate: completed surveys ÷ customers called",
      "Score distribution and NPS, by branch, product or team",
      "Top reasons behind low scores, from the captured answers",
      "Time from a low score to a call back from your team",
    ],
    setup: [
      "Pick the scale (0 to 10 NPS, 1 to 5, or yes/no), put the score and reason questions in the script, and add them as extraction questions so the analysis saves the answers.",
      "Keep the script to three or four questions and about two minutes.",
      "Add dispositions such as Promoter, Passive, Detractor and Complaint. Set Promoter and Passive to stop, and assign Detractor and Complaint to a person.",
      "Trigger calls from a workflow after the service, or run a weekly campaign over a list.",
      "Choose a calm voice and pace, and check it with the voice preview.",
      "Optionally link an approved WhatsApp template with your review link for happy customers who agree to it.",
    ],
    industries: ["healthcare", "ecommerce", "education", "travel-hospitality", "automotive"],
    faqs: [
      {
        q: "Is a survey call better than a WhatsApp survey link?",
        a: "They do different jobs. A link is cheap and works for customers who reply. A call gets a score and a reason from people who would never open the link, and lets an unhappy customer ask for help there and then. You can use both, and call the people who ignored the link.",
      },
      {
        q: "Will the agent argue with a customer who gives a low score?",
        a: "It shouldn't, and you control that in the script. We recommend a script that thanks the customer, asks for the reason, offers a call back from your team and moves on. The agent does not read the complaint back to them.",
      },
      {
        q: "How are open answers stored?",
        a: "Extracted answers keep only what the caller actually said, next to the score, a short summary, the recording and the full transcript. You can search, filter and export the call log.",
      },
      {
        q: "How long should a feedback call be?",
        a: "Two to three minutes is enough for a score, a reason and one follow-up. Each agent also has a maximum call length, six minutes by default, which you can change.",
      },
      {
        q: "Can some customers get the survey in Hindi and others in English?",
        a: "Yes. Hindi, English and Hinglish are all in production. Make one agent per language and run each over its own list.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 7. AI receptionist (inbound)
  // ---------------------------------------------------------------------------
  {
    slug: "ai-receptionist",
    label: "AI receptionist",
    title: "AI Receptionist for Inbound Calls in Hindi and English",
    description:
      "An AI receptionist on the Telleo IVR that answers inbound calls, handles common questions, captures the enquiry and transfers to a person when the caller needs one.",
    icon: "Headset",
    summary:
      "Answer inbound calls through the Telleo IVR, handle common questions, capture the enquiry and transfer when needed.",
    h1: "An AI receptionist for the calls your front desk can't take",
    lede:
      "Callers ring your line, pick an option on the IVR and talk to the AI agent. It answers the common questions from your script, notes down the enquiry and transfers the call to a person when the caller needs one.",
    problem: {
      heading: "Missed inbound calls are leads you already paid for",
      body: [
        "An inbound call is usually someone who saw an ad, a hoarding or a listing and wants an answer now. When the front desk is on another call, or at lunch, the phone rings out and the caller tries the next number.",
        "Most of these calls ask the same things: fees, timings, location, availability, documents needed. Your staff answer them over and over, and still miss the calls that come in together.",
        "An AI agent on the IVR takes those calls, answers the routine questions and records who called and what they wanted, so your team spends its time on the callers who need a person.",
      ],
    },
    flow: [
      {
        step: "The caller dials in",
        detail:
          "Your Telleo IVR plays its menu. The option you choose for enquiries hands the caller to the AI agent.",
      },
      {
        step: "Greet and listen",
        detail:
          "The agent greets the caller with a greeting that suits the time of day, and asks how it can help.",
      },
      {
        step: "Answer from your script",
        detail:
          "Fees, timings, location, availability, documents: whatever you put in the script. For anything outside it, the script tells the agent to offer a person.",
      },
      {
        step: "Capture the enquiry",
        detail:
          "It asks the questions in your script one at a time: name, what they need, preferred branch, a good time for a call back.",
      },
      {
        step: "Transfer when needed",
        detail:
          "If the caller wants a person, the agent says a short bridge line and transfers the call live to your handoff number.",
      },
      {
        step: "Leave a record",
        detail:
          "Every call is transcribed (and recorded, with recording on for your line), with a disposition, a summary and the captured answers.",
      },
    ],
    sampleCall: [
      {
        who: "agent",
        text: "नमस्ते, Sunrise Academy में आपका स्वागत है। मैं यहाँ की AI assistant Neha बोल रही हूँ। बताइए, मैं आपकी क्या मदद कर सकती हूँ?",
        en: "Hello, welcome to Sunrise Academy. I'm Neha, the AI assistant here. How can I help you?",
      },
      {
        who: "caller",
        text: "Class six के admission के बारे में पूछना था। अभी admission चल रहे हैं?",
        en: "I wanted to ask about Class 6 admission. Are admissions open now?",
      },
      {
        who: "agent",
        text: "जी, admissions अभी open हैं और entrance test हर शनिवार को होता है। बच्चे का नाम क्या है?",
        en: "Yes, admissions are open and the entrance test is held every Saturday. What is the child's name?",
      },
      { who: "caller", text: "उसका नाम Aarav है।", en: "His name is Aarav." },
      {
        who: "agent",
        text: "आप किस area में रहते हैं, ताकि मैं school bus के route के बारे में बता सकूँ?",
        en: "Which area do you live in, so I can tell you about the school bus route?",
      },
      {
        who: "caller",
        text: "Shastri Nagar में। और fees कितनी है?",
        en: "Shastri Nagar. And what are the fees?",
      },
      {
        who: "agent",
        text: "जी, उस route पर bus आती है। Fees की पूरी details हमारे admission counsellor देंगे। क्या मैं अभी आपकी call उनसे connect कर दूँ?",
        en: "Yes, the bus covers that route. Our admission counsellor will give you the full fee details. Shall I connect your call to them now?",
      },
      { who: "caller", text: "हाँ, कर दीजिए।", en: "Yes, please." },
    ],
    captures: [
      "Caller's name",
      "What they called about",
      "Specific need: course, property, appointment, product",
      "Preferred branch or area",
      "Best time for a call back",
      "Whether a transfer was attempted and whether it connected",
    ],
    outcomes: [
      {
        when: "Question answered, nothing more needed",
        then: "The enquiry is saved with your disposition and a short summary on the call record.",
      },
      {
        when: "The caller wants a person",
        then: "Live transfer to your handoff number, after a short bridge line.",
      },
      {
        when: "The transfer is not picked up",
        then: "The enquiry, summary and transcript are already on the call record, so your team can call back. Keep handoff numbers staffed: the health report only flags a transfer that could not be set up, not one nobody answered.",
      },
      {
        when: "The caller asks for a call back",
        then: "Saved as a callback request, with what they said in the transcript, and assigned to your team if Callback is on your assign list. Switch on inbound lead capture so callers who are not yet leads can be assigned too.",
      },
      {
        when: "The caller wants a visit or appointment",
        then: "If a specific day and time are agreed, the meeting is booked on your booking page.",
      },
    ],
    metrics: [
      "Calls handled by the AI agent ÷ calls routed to it by the IVR",
      "Transfer rate, and the share of transfers that connected",
      "Enquiries captured with a name and a need ÷ calls answered",
      "Time from a callback request to your team's call back",
      "Top questions callers ask, from the summaries, to improve the script",
    ],
    setup: [
      "Set the agent's direction to inbound (or both) and write a greeting that names your business.",
      "Put your common answers in the script: fees, timings, address, documents, availability.",
      "Set up the IVR on your Telleo line and point the enquiry option at the AI agent.",
      "Add handoff numbers for transfers, and keep them staffed during the hours the IVR sends callers to the AI.",
      "Add extraction questions and dispositions for your enquiry types, and assign callbacks to a person.",
      "Add a booking page if callers should be able to book a visit or appointment.",
    ],
    industries: ["healthcare", "education", "real-estate", "travel-hospitality", "automotive"],
    faqs: [
      {
        q: "Does it replace my IVR?",
        a: "It doesn't plug into your current IVR. The agent is reached through an IVR menu option on a Telleo number, and it can transfer the caller to a person when needed., and the agent can transfer the call to a person when needed.",
      },
      {
        q: "Can it answer on my existing business number?",
        a: "The AI agent is reached through the IVR on Telleo's lines. How your current number connects to it depends on your present telephony, so we work that out with you during setup.",
      },
      {
        q: "What if the caller asks something that isn't in the script?",
        a: "Put the questions you get most often in the script, and tell the agent to offer a person for anything else. Every call is transcribed and analysed, including the questions callers asked, so you can find the gaps and add answers.",
      },
      {
        q: "Can it book appointments on inbound calls?",
        a: "Yes. Give the agent a booking page. When the caller agrees a specific day and time, the meeting is booked there after the call.",
      },
      {
        q: "Are inbound calls recorded?",
        a: "Yes. Every call is transcribed, and recorded when recording is switched on for your line.",
      },
      {
        q: "Which languages can callers use?",
        a: "Set the agent to Hindi, English or Hinglish, all in production. A Hinglish agent suits callers who mix the two, which is common on Indian phone calls. Other Indian languages are set up with you on request.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 8. Event confirmation
  // ---------------------------------------------------------------------------
  {
    slug: "event-confirmation",
    label: "Event confirmation",
    title: "AI Event and Webinar Confirmation Calls with Reminders",
    description:
      "AI calls that confirm attendance for webinars, demo classes, open houses and events, send the link or location on WhatsApp and remind people on the day.",
    icon: "Ticket",
    summary:
      "Confirm who is coming to your webinar, demo class or open house, and remind them before it starts.",
    h1: "Confirm attendance for every webinar, demo class and open house",
    lede:
      "Registrations are easy to collect and hard to turn into attendance. The AI agent calls each registrant, confirms whether they are coming, sends the joining link or location on WhatsApp, and a reminder campaign calls again before the start.",
    problem: {
      heading: "Registrations are not attendance",
      body: [
        "A form fill takes ten seconds. Showing up takes an evening. In between, people forget, lose the link, or never saved the date.",
        "Teams send an email and a WhatsApp and hope for the best. Calling every registrant the day before is the job that gets dropped, because it falls on the same team that is running the event.",
        "The calls are short and all alike: are you coming, here is the link, see you at 6. A voice agent can make every one of them and give you a confirmed headcount.",
      ],
    },
    flow: [
      {
        step: "Load registrants",
        detail:
          "Import the registration list, or let a workflow call each person when they register.",
      },
      {
        step: "Confirm the details",
        detail:
          "The agent names the event, the date and the time, and asks if they will attend.",
      },
      {
        step: "Answer the basics",
        detail:
          "Venue, parking, joining link, what to bring, who can attend: whatever is in your script.",
      },
      {
        step: "Send the link or location",
        detail:
          "If they want it, the WhatsApp template with the joining link or map location is sent during the call or right after it.",
      },
      {
        step: "Remind on the day",
        detail:
          "Run a short reminder campaign a few hours before the start for everyone who confirmed.",
      },
      {
        step: "Handle the no's",
        detail:
          "Can't attend? The agent offers the next session if your script has one, and records the outcome with your disposition.",
      },
    ],
    sampleCall: [
      {
        who: "agent",
        text: "Good afternoon, Rahul ji. This is Karan, an AI assistant from Sunrise Institute of Management. You registered for our MBA open house this Saturday at 11 am. Will you be able to attend?",
      },
      {
        who: "caller",
        text: "Yes, I'm planning to. Can my father come along?",
      },
      {
        who: "agent",
        text: "Of course, parents are welcome and there is a separate Q&A for them. Will you be coming by car?",
      },
      { who: "caller", text: "Yes, we'll drive down." },
      {
        who: "agent",
        text: "There is free parking at Gate 2. Shall I send you the campus location on WhatsApp?",
      },
      { who: "caller", text: "Yes, please." },
      {
        who: "agent",
        text: "Would you like a one-to-one with an admissions counsellor after the session?",
      },
      { who: "caller", text: "Sure, around 1 pm if possible." },
      {
        who: "agent",
        text: "Done, your counsellor meeting is booked for Saturday at 1 pm. Is there anything else you would like to know before Saturday?",
      },
      { who: "caller", text: "No, that's all. Thank you." },
    ],
    captures: [
      "Attendance: confirmed, maybe, can't attend",
      "Number of people coming",
      "Mode (in person or online), where you offer both",
      "Questions they want answered at the event",
      "Consent to receive the link or location on WhatsApp",
      "Follow-up meeting day and time, if agreed",
    ],
    outcomes: [
      {
        when: "Confirmed",
        then: "Marked Confirmed. The link or location template they accepted is sent and tracked for delivery.",
      },
      {
        when: "Agrees a follow-up meeting",
        then: "Booked on your booking page when a specific day and time were agreed.",
      },
      {
        when: "Maybe, or not sure yet",
        then: "Saved with your Maybe disposition. Set Maybe to assign so a person follows up, or include the Maybes in the day-of reminder campaign.",
      },
      {
        when: "Wants to talk to someone before deciding",
        then: "Transferred live to your handoff number.",
      },
      {
        when: "No answer",
        then: "Calls started from a workflow are retried after your gap, up to your maximum attempts; a campaign does not re-dial on its own, so run it again over the leads who didn't answer. Calls where nobody spoke are marked Incomplete.",
      },
    ],
    metrics: [
      "Confirmation rate: confirmed ÷ registrants reached",
      "Show-up rate: attendees ÷ confirmed, from your event records",
      "Link or location delivery: WhatsApp templates sent vs delivered",
      "Follow-up meetings booked from confirmation calls",
    ],
    setup: [
      "Put the event name, date, time, venue or link, and answers to common questions in the script.",
      "Add dispositions: Confirmed, Maybe, Can't attend, Wants next session.",
      "Get the joining-link and location WhatsApp templates approved and link them to the agent.",
      "Import registrants, or trigger a call from the registration form by webhook.",
      "Run the day-before confirmation and the day-of reminder as campaigns inside your calling window.",
      "Add a booking page if you want the agent to set follow-up meetings.",
    ],
    industries: ["education", "real-estate", "healthcare", "travel-hospitality", "recruitment"],
    faqs: [
      {
        q: "Can it send the webinar link?",
        a: "Yes, as an approved WhatsApp template or an email, after the registrant says yes on the call. Each send is tracked for delivery and never sent twice.",
      },
      {
        q: "Should the reminder be a call or a WhatsApp?",
        a: "Both have a place. A WhatsApp with the link is cheap and fine for most people. A short call the day before gets a clear yes or no, and reaches people who never saw the message.",
      },
      {
        q: "How much does a confirmation call cost?",
        a: "Billing is per minute of call, rounded up, so keep the script short: confirm, send the link, answer one or two questions. Rates are on the pricing page.",
      },
      {
        q: "Does it work for walk-in drives and open houses with a venue?",
        a: "Yes. Put the venue, timings, parking and what to bring in the script, and link a WhatsApp template with the map location.",
      },
      {
        q: "Can it tell me how many people are coming?",
        a: "Each call gets a disposition from your list, such as Confirmed or Can't attend, and the number of people is in each call's extracted answers if you ask for it. Filter the call log by disposition and export it to count confirmations.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 9. Application follow-up
  // ---------------------------------------------------------------------------
  {
    slug: "application-follow-up",
    label: "Application follow-up",
    title: "AI Application Follow-up Calls for Documents and KYC",
    description:
      "AI calls that chase incomplete applications, pending documents, KYC and forms. Telleo finds what blocks each applicant, sends the link and flags who needs help.",
    icon: "FileCheck2",
    summary:
      "Call applicants who stopped halfway, find what is blocking them and send the link to finish.",
    h1: "Follow up every incomplete application, document and KYC",
    lede:
      "Applicants start forms and stop. The AI agent calls each one, asks what is holding them up, sends the link to finish on WhatsApp and passes anyone who needs real help to your team.",
    problem: {
      heading: "Half-done applications stall in silence",
      body: [
        "An applicant fills three steps of a five-step form, or uploads everything except one document, and then life gets in the way. Unless someone calls, the application just sits there.",
        "Your team knows the list exists, but chasing it is slow. Each call starts with finding the file, then asking what is missing, then explaining the same upload steps again.",
        "Most blockers are simple: a lost link, a document they did not have handy, a doubt about eligibility. A voice agent can find the blocker on every file and send only the real problems to a person.",
      ],
    },
    flow: [
      {
        step: "Load pending applications",
        detail:
          "Import the list of incomplete applications with what is missing, or have your form system send each one to a workflow by webhook.",
      },
      {
        step: "Name what is pending",
        detail:
          "The agent greets the applicant by name and says which step or document is still pending, using fields from the list.",
      },
      {
        step: "Find the blocker",
        detail:
          "It asks what is holding them up, one question at a time: a missing document, a lost link, a doubt about eligibility or fees.",
      },
      {
        step: "Send the link",
        detail:
          "If they want it, the approved WhatsApp template with the form or upload link is sent during the call or right after it.",
      },
      {
        step: "Get a date or hand over",
        detail:
          "It asks when they expect to finish. Questions it cannot answer go to your team, by live transfer or assignment.",
      },
    ],
    sampleCall: [
      {
        who: "agent",
        text: "नमस्ते Priya जी, मैं Sunrise College की AI assistant Pooja बोल रही हूँ। आपका B.Com admission form लगभग पूरा है, बस documents upload होने बाकी हैं। क्या अभी एक मिनट बात हो सकती है?",
        en: "Hello Priya ji, I'm Pooja, the AI assistant at Sunrise College. Your B.Com admission form is almost complete, only the documents are still to be uploaded. Can we talk for a minute?",
      },
      {
        who: "caller",
        text: "हाँ, बोलिए। Twelfth की marksheet अभी तक मिली नहीं है।",
        en: "Yes, go ahead. I haven't received my Class 12 marksheet yet.",
      },
      {
        who: "agent",
        text: "कोई बात नहीं जी, अभी आप online वाली marksheet upload कर सकती हैं। क्या बाकी documents आपके पास ready हैं?",
        en: "No problem, for now you can upload the online marksheet. Do you have the other documents ready?",
      },
      {
        who: "caller",
        text: "Photo और ID तो है, पर upload वाला link कहीं खो गया।",
        en: "I have the photo and ID, but I lost the upload link.",
      },
      {
        who: "agent",
        text: "क्या मैं इसी number पर WhatsApp पर upload का link भेज दूँ?",
        en: "Shall I send the upload link on WhatsApp to this number?",
      },
      { who: "caller", text: "हाँ, भेज दीजिए।", en: "Yes, please send it." },
      {
        who: "agent",
        text: "आप documents कब तक upload कर पाएँगी?",
        en: "By when will you be able to upload the documents?",
      },
      {
        who: "caller",
        text: "आज रात तक कर दूँगी।",
        en: "I'll do it by tonight.",
      },
      {
        who: "agent",
        text: "बहुत अच्छा। Fees या hostel के बारे में कोई सवाल हो तो क्या मैं आपकी बात counsellor से करवा दूँ?",
        en: "Great. If you have any questions about fees or the hostel, shall I connect you to a counsellor?",
      },
      {
        who: "caller",
        text: "नहीं, अभी नहीं। Thank you।",
        en: "No, not now. Thank you.",
      },
    ],
    captures: [
      "What is pending: a step, a document or a KYC item",
      "Reason it is pending, in the applicant's words",
      "Expected completion date, as the applicant said it",
      "Documents they already have ready",
      "Questions about eligibility, fees or process",
      "Consent to receive the form or upload link on WhatsApp",
    ],
    outcomes: [
      {
        when: "The applicant wants the link",
        then: "The approved WhatsApp template with the form or upload link is sent and tracked for delivery.",
      },
      {
        when: "Needs help from a person",
        then: "Assigned to a counsellor or operations executive with the summary, or transferred live to your handoff number.",
      },
      {
        when: "Will finish later",
        then: "Their expected date is on the call record. Run the next follow-up campaign over the applications that are still incomplete.",
      },
      {
        when: "No longer interested",
        then: "The workflow stops and the outcome is saved as not interested, so your team can close the file.",
      },
      {
        when: "No answer",
        then: "Calls from a workflow are retried after your gap, up to your maximum attempts, then handed to a person or stopped. A campaign does not re-dial on its own, so re-run it over the still-pending list.",
      },
    ],
    metrics: [
      "Completion rate: applications finished within 7 days of the call ÷ applicants reached",
      "Top blockers, from the captured reasons",
      "Link delivery: WhatsApp templates sent vs delivered",
      "Share of applicants who need a person, and the time taken to reach them",
    ],
    setup: [
      "Export pending applications with name, phone and what is missing, then import them, or send them to a workflow by webhook.",
      "Write the opening so it names the exact pending step or document, using fields from the list.",
      "Add extraction questions: the blocker, documents ready, expected completion date.",
      "Get your form and upload-link WhatsApp templates approved and link them to the agent.",
      "Add dispositions (Will complete, Needs help, Not interested, Wrong number) and route Needs help to a person.",
      "Re-run the campaign over the still-pending list every few days, inside your calling window.",
    ],
    industries: ["education", "lending", "insurance", "recruitment"],
    faqs: [
      {
        q: "Can the agent collect documents or verify KYC on the call?",
        a: "No. It cannot receive documents or verify identity on a call. It finds out what is missing, sends the form or upload link on WhatsApp if the applicant agrees, and routes KYC questions to your team.",
      },
      {
        q: "Will it ask for Aadhaar or PAN numbers?",
        a: "It shouldn't, and we recommend keeping ID numbers out of the script. Identity details belong in your secure upload flow, not in a call transcript. Transcripts are visible to anyone with call-log access, which is another reason to keep ID numbers out of calls.",
      },
      {
        q: "How does the agent know what is pending for each applicant?",
        a: "Include it in the list you import or the webhook you send, as a field on the lead. The agent can use the applicant's name and any such field in what it says.",
      },
      {
        q: "How often should we follow up?",
        a: "For unanswered calls, set the retry gap and maximum attempts. For applicants who answered but did not finish, re-run the campaign over the still-pending list every few days rather than calling daily.",
      },
      {
        q: "Does it work with our application system?",
        a: "Yes, if your system can send or receive a webhook. Otherwise, export pending applications as CSV or Excel and import them.",
      },
    ],
  },
];

export const findUseCase = (slug: string) => USE_CASES.find((u) => u.slug === slug);
