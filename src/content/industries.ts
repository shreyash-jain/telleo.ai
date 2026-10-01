import type { Industry } from "./types";

/**
 * Industry pages. Product claims follow docs/PRODUCT_FACTS.md.
 * External sources used here:
 * - HBR, "The Short Life of Online Sales Leads" (2011), pre-verified in PRODUCT_FACTS §9.
 * - RBI circular RBI/2022-23/108, 12 Aug 2022, "Outsourcing of Financial Services - Responsibilities
 *   of regulated entities employing Recovery Agents":
 *   https://rbi.org.in/Scripts/NotificationUser.aspx?Id=12378&Mode=0 (read 2026-09-25).
 * All businesses and people in sample calls are fictional.
 */
export const INDUSTRIES: Industry[] = [
  // ─────────────────────────────────────────────────────────────── Education
  {
    slug: "education",
    label: "Education",
    title: "AI Calling Agent for Education and Admissions",
    description:
      "Call new admission enquiries within about a minute, book demo classes and remind parents about fees in Hindi, English or Hinglish. Built first for education.",
    icon: "GraduationCap",
    summary: "Admission enquiries, demo classes, fee reminders and parent calls in Hindi, English or Hinglish.",
    h1: "AI calling for coaching institutes, schools and colleges",
    lede:
      "Telleo started in admissions calling for education institutes. It calls every enquiry while the family is still interested, books the demo class or counselling session, and hands warm families to your counsellors with a summary of the call.",
    challenges: [
      {
        title: "Enquiries arrive when counsellors are busy",
        body:
          "Admission season brings enquiries in bursts: after an ad goes live, after results, on Sunday evenings. Counsellors call back hours or days later, by which time the family has spoken to other institutes.",
      },
      {
        title: "Counsellors spend the day on the wrong calls",
        body:
          "Many enquiries are for another course, another city or a different budget. Each one still takes a counsellor's call to find that out.",
      },
      {
        title: "Fee and parent calls are the same call, again and again",
        body:
          "Fee due dates, missed classes and parent updates are short, repetitive calls. They are the first work to slip when the team is stretched.",
      },
      {
        title: "Nobody remembers what was said",
        body:
          "Notes live in registers and WhatsApp chats. When a parent calls back, the next counsellor starts from zero.",
      },
    ],
    plays: [
      {
        title: "Call every new enquiry",
        body:
          "A form fill from Meta, Google or your website triggers a call within about a minute. The agent asks course, class, city and preferred batch, one question at a time.",
        useCase: "instant-lead-callback",
      },
      {
        title: "Qualify and hand over to counsellors",
        body:
          "Enquiries that match your criteria are assigned to a counsellor with a summary, a 1 to 10 lead rating and the answers captured. The rest are marked and stopped.",
        useCase: "lead-qualification",
      },
      {
        title: "Book demo classes and counselling sessions",
        body:
          "When the family agrees a day and time, the agent books it on your booking page and sends a WhatsApp confirmation from your approved template.",
        useCase: "appointment-booking",
      },
      {
        title: "Fee reminders to parents",
        body:
          "Polite reminders before and after the due date, with the amount and date from your list. Parents who want to speak to accounts are transferred live.",
        useCase: "payment-reminders",
      },
      {
        title: "Re-engage last season's enquiries",
        body:
          "Enquiries that went cold, from families who have consented to hear from you, get a fresh call when a new batch or crash course opens. Interested families go straight to a counsellor.",
        useCase: "lead-reactivation",
      },
      {
        title: "Parent feedback calls",
        body:
          "Short calls after a parent-teacher meeting or at term end to hear what parents think. Every answer is saved on the call record.",
        useCase: "feedback-surveys",
      },
    ],
    sampleCall: [
      {
        who: "agent",
        text: "नमस्ते राहुल जी, मैं Brightpath Academy से Priya बोल रही हूँ। आपने JEE coaching के बारे में enquiry की थी। क्या अभी दो मिनट बात हो सकती है?",
        en: "Hello Rahul ji, this is Priya from Brightpath Academy. You enquired about JEE coaching. Can we talk for two minutes now?",
      },
      { who: "caller", text: "हाँ, बताइए।", en: "Yes, go ahead." },
      {
        who: "agent",
        text: "Coaching आपके लिए है या आपके बच्चे के लिए?",
        en: "Is the coaching for you or for your child?",
      },
      {
        who: "caller",
        text: "मेरे बेटे के लिए। अभी Class 11 में है।",
        en: "For my son. He is in Class 11 now.",
      },
      {
        who: "agent",
        text: "ठीक है। उसके लिए weekday evening batch सही रहेगा या weekend batch?",
        en: "Okay. Would a weekday evening batch suit him, or a weekend batch?",
      },
      {
        who: "caller",
        text: "Weekend वाला। और fees कितनी है?",
        en: "The weekend one. And what are the fees?",
      },
      {
        who: "agent",
        text: "Weekend batch की fee पूरे साल की पचासी हज़ार रुपये है, और यह तीन installments में दी जा सकती है। क्या वो पहले एक free demo class attend करना चाहेगा?",
        en: "The weekend batch fee is eighty-five thousand rupees for the full year, payable in three instalments. Would he like to attend a free demo class first?",
      },
      { who: "caller", text: "हाँ, इस Sunday सुबह ग्यारह बजे हो सकती है?", en: "Yes, can it be this Sunday at 11 am?" },
      {
        who: "agent",
        text: "जी, इस Sunday सुबह ग्यारह बजे की demo class book कर दी है। Details WhatsApp पर भेज दूँ?",
        en: "Done, the demo class is booked for this Sunday at 11 am. Shall I send the details on WhatsApp?",
      },
      { who: "caller", text: "हाँ, भेज दीजिए।", en: "Yes, please send them." },
    ],
    captures: [
      "Student's class or year",
      "Course or exam of interest",
      "City or preferred centre",
      "Preferred batch: weekday, weekend or online",
      "Who decides: student or parent",
      "Fee or scholarship questions raised",
      "Demo class or counselling day and time",
      "Callback request, if the family was busy",
    ],
    rollout: [
      {
        step: "Connect your enquiry sources",
        detail:
          "Link Meta lead ads and Google lead forms, point your website form at a webhook, or import last month's enquiries from a CSV or Excel file.",
      },
      {
        step: "Start from the admissions template",
        detail:
          "Pick the admissions template from the use-case gallery. Add your courses, fees, batch timings and demo schedule, and set the questions every call must answer.",
      },
      {
        step: "Set outcomes and handover",
        detail:
          "Choose which dispositions go to a counsellor and which stop, and how many times to retry an unanswered number. Add a counsellor's number for live transfer.",
      },
      {
        step: "Test on your own phone, then go live",
        detail:
          "Call yourself and a colleague, score the script and apply the suggested fixes, then switch on the new-enquiry trigger inside your calling hours.",
      },
    ],
    cautions: [
      "The agent only knows what is in its script. Keep fees, batch dates and scholarship rules current, or it will quote old figures.",
      "Many enquiry forms are filled by students. Decide in the script when the agent should ask for a parent, especially before it discusses fees.",
      "DLT registration is required for commercial calling in India, and under TRAI's September 2026 amendment, once it takes effect, AI calls must also be declared to your telecom operator in advance. Telleo registers DLT with you, and you choose the hours calls go out.",
      "WhatsApp confirmations and brochures need approved WhatsApp templates before you go live.",
    ],
    faqs: [
      {
        q: "Can the agent speak Hindi and English on the same call?",
        a: "Yes. Hindi, English and Hinglish are all in production. Tamil, Telugu, Marathi, Bengali and other regional languages are supported by the voice engines and are set up with you on request.",
      },
      {
        q: "Will it replace my counsellors?",
        a: "No. It makes the first call, asks the qualifying questions and books the demo. Your counsellors take the families who are ready to talk about admission, with the call summary in front of them.",
      },
      {
        q: "What happens if a parent wants to talk to a person?",
        a: "The agent can transfer the call live to a counsellor's number you set. If the parent would rather be called later, the call is marked as a callback request, with their words in the transcript. Add Callback to the outcomes that assign to a counsellor if you want those families handed to a person; otherwise workflow calls go back on your retry path.",
      },
      {
        q: "Can it call students who enquired months ago?",
        a: "Only with consent. Under TRAI's September 2026 amendment, once it takes effect, an enquiry supports commercial calls for only seven days, so older enquiries need explicit consent you can show. For families who have consented, import the list as a CSV and run a campaign within your calling hours. A bulk campaign calls every lead you select, including families a counsellor is already working, so leave those out of the list. Only workflow calls skip leads already assigned to a counsellor.",
      },
      {
        q: "Can Telleo also review my counsellors' own calls?",
        a: "Yes. Calls your team makes by click-to-call on Plivo, Exotel or Airtel, or recordings you upload, are transcribed and scored against your rubric. That is charged per minute of recording. Analysis of AI calls is free.",
      },
      {
        q: "Does it work with the CRM we already use?",
        a: "Leads, calls and outcomes live in Telleo. To pass them to another system, add a webhook or HTTP request step. Anything that can send or receive a webhook can connect.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── Real estate
  {
    slug: "real-estate",
    label: "Real estate",
    title: "AI Calling Agent for Real Estate in India",
    description:
      "Call property leads within about a minute, qualify budget, location and timeline, and book site visits in Hindi or English. Your sales team meets ready buyers.",
    icon: "Building2",
    summary: "Call property leads fast, qualify budget and location, and book site visits.",
    h1: "AI calling for real estate developers and brokers",
    lede:
      "Property leads go cold quickly, and many are only browsing. Telleo calls each lead within about a minute, asks budget, location, configuration and timeline, and books a site visit for buyers ready to see the project.",
    challenges: [
      {
        title: "Leads cool within hours",
        body:
          "Research reported in Harvard Business Review in 2011, covering 1.25 million leads at 42 U.S. companies, found that firms which tried to reach a web lead within an hour were nearly 7 times as likely to qualify it as those that tried an hour later. Property enquiries from ads often arrive in the evening and on weekends, when the sales team is off.",
      },
      {
        title: "Many leads are only browsing",
        body:
          "Budget, location and possession timeline decide whether a lead is worth a site visit. Finding that out takes a call, and sales teams spend whole days on leads who were only curious.",
      },
      {
        title: "Site visits get missed",
        body:
          "A visit booked on Tuesday for Sunday is easy to forget. Without a reminder call the site team waits and the slot is wasted.",
      },
      {
        title: "Old enquiries sit unused",
        body:
          "Every project builds up a long list of past enquiries. Nobody has time to call them when a new tower, price or offer launches.",
      },
    ],
    plays: [
      {
        title: "Call ad and website leads in about a minute",
        body:
          "Meta and Google lead-form enquiries, and website forms sent by webhook, trigger a call within about a minute, weekends included, inside the hours you set.",
        useCase: "instant-lead-callback",
      },
      {
        title: "Qualify budget, location and timeline",
        body:
          "The agent asks configuration, budget, preferred location, possession timeline and whether the home is for living in or investment. Each lead gets a 1 to 10 rating and a summary.",
        useCase: "lead-qualification",
      },
      {
        title: "Book site visits",
        body:
          "When the buyer agrees a day and time, the visit is booked on your booking page and confirmed on WhatsApp from your approved template.",
        useCase: "appointment-booking",
      },
      {
        title: "Confirm visits the day before",
        body:
          "A short call the day before checks the buyer is still coming and who is coming with them. A buyer who cannot make it can agree a new time on the same call.",
        useCase: "event-confirmation",
      },
      {
        title: "Reactivate old enquiries",
        body:
          "When a new phase, price or offer launches, run a campaign over past enquiries who have consented to hear from you, and pass the interested ones to sales.",
        useCase: "lead-reactivation",
      },
      {
        title: "Transfer serious buyers live",
        body:
          "A buyer who wants to talk price right now is connected to your sales manager mid-call, after the agent says a short bridge line.",
      },
    ],
    sampleCall: [
      {
        who: "agent",
        text: "नमस्ते अमित जी, मैं Greenfield Realty से Neha बोल रही हूँ। आपने Greenfield Heights के 2 BHK के लिए enquiry की थी। क्या अभी बात करने का सही समय है?",
        en: "Hello Amit ji, this is Neha from Greenfield Realty. You enquired about a 2 BHK at Greenfield Heights. Is this a good time to talk?",
      },
      { who: "caller", text: "हाँ, बोलिए।", en: "Yes, tell me." },
      {
        who: "agent",
        text: "Flat आप खुद रहने के लिए देख रहे हैं या investment के लिए?",
        en: "Are you looking at the flat to live in, or as an investment?",
      },
      {
        who: "caller",
        text: "रहने के लिए। अगले साल तक shift होना है।",
        en: "To live in. We need to move by next year.",
      },
      {
        who: "agent",
        text: "समझ गई। आपका budget लगभग कितना है?",
        en: "Understood. Roughly what is your budget?",
      },
      {
        who: "caller",
        text: "सत्तर-अस्सी लाख के आस-पास।",
        en: "Around seventy to eighty lakh.",
      },
      {
        who: "agent",
        text: "उस range में हमारे पास ready-to-move 2 BHK हैं। क्या आप इस weekend site visit के लिए आना चाहेंगे?",
        en: "We have ready-to-move 2 BHKs in that range. Would you like to come for a site visit this weekend?",
      },
      {
        who: "caller",
        text: "Saturday शाम पाँच बजे चलेगा?",
        en: "Would Saturday at five in the evening work?",
      },
      {
        who: "agent",
        text: "जी, Saturday शाम पाँच बजे की site visit book हो गई है। Location WhatsApp पर भेज दूँ?",
        en: "Yes, your site visit is booked for Saturday at 5 pm. Shall I send the location on WhatsApp?",
      },
      { who: "caller", text: "हाँ, भेज दो।", en: "Yes, send it." },
    ],
    captures: [
      "Configuration: 1, 2 or 3 BHK, plot or commercial",
      "Budget range",
      "Preferred location or project",
      "Living in or investment",
      "Possession timeline",
      "Home loan needed or not",
      "Site visit day and time",
      "Who else will join the visit",
    ],
    rollout: [
      {
        step: "Connect lead sources",
        detail:
          "Link Meta lead ads and Google lead forms. Microsites and portals that can post new leads to a webhook connect the same way; for the rest, import exports as CSV.",
      },
      {
        step: "Write the project brief",
        detail:
          "Put projects, configurations, price bands, possession dates and site timings in the script. Draft it from a plain-language brief, then score it before you go live.",
      },
      {
        step: "Decide who gets which lead",
        detail:
          "Route qualified buyers round-robin to your sales team, send visit bookings to the site team, and stop leads marked not interested.",
      },
      {
        step: "Go live on new leads, then the backlog",
        detail:
          "Run fresh leads first and review the transcripts for a few days. Then run a campaign over past enquiries you have explicit consent to call.",
      },
    ],
    cautions: [
      "Keep prices and inventory in the script up to date. The agent quotes only what you give it, so an old price list means wrong answers.",
      "The agent should not promise discounts, returns on investment or approvals your sales team has not signed off. Leave commitments to people.",
      "Portal leads connect only if the portal can send a webhook or export a file. There is no built-in portal integration.",
      "DLT registration is required for commercial calling in India. Telleo registers it with you, and you choose the calling hours.",
    ],
    faqs: [
      {
        q: "Can it call leads from property portals?",
        a: "If the portal can post new leads to a webhook, yes, in the same way as Meta and Google leads. If it only offers downloads, import the file as a CSV and run a campaign.",
      },
      {
        q: "Can the agent share brochures or location links?",
        a: "Yes, on WhatsApp, using templates you have had approved. The agent offers to send, and the message goes only if the buyer says yes. Each send is tracked and never sent twice.",
      },
      {
        q: "What if a buyer wants to negotiate on the call?",
        a: "Set a handoff number. The agent says a short bridge line and connects the buyer to your sales manager live. You can also make 'wants to negotiate' a disposition that assigns the lead to your sales team.",
      },
      {
        q: "Will it call the same lead twice by mistake?",
        a: "Leads are de-duplicated by phone or email, a 30-second guard stops a number being dialled twice by accident, and workflow calls skip leads already assigned to a salesperson (a bulk campaign calls whoever you select), and workflow calls retry unanswered numbers with the gap and limit you set.",
      },
      {
        q: "Do we need our own SIMs or dialer?",
        a: "No. Calls run on Telleo's lines. If you want buyers to see one consistent number, you can take a dedicated AI line with your own caller ID.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── Healthcare
  {
    slug: "healthcare",
    label: "Healthcare",
    title: "AI Calling Agent for Clinics, Hospitals and Labs",
    description:
      "Book appointments, send reminders and make report-ready and follow-up calls in Hindi or English, scripted to pass medical questions to your staff.",
    icon: "Stethoscope",
    summary: "Appointment booking, reminders, report-ready and follow-up calls. Appointment booking, reminders, report-ready and follow-up calls, scripted to pass medical questions to staff.",
    h1: "AI calling for clinics, hospitals and diagnostic labs",
    lede:
      "Front desks spend hours on calls that follow a script: booking, reminding, telling patients a report is ready. Telleo makes those calls in Hindi, English or Hinglish, and you script it to pass anything clinical to your staff.",
    challenges: [
      {
        title: "The front desk is also the phone line",
        body:
          "Receptionists handle walk-ins, billing and calls at the same time. Outbound reminder and follow-up calls are the first to be dropped.",
      },
      {
        title: "Missed appointments waste doctor time",
        body:
          "A no-show leaves a gap another patient could have used. A reminder call the day before gives the patient a chance to confirm or free the slot.",
      },
      {
        title: "Report and follow-up calls repeat all day",
        body:
          "Telling patients their report is ready, or checking in after a procedure, is the same short call made many times a day.",
      },
      {
        title: "Enquiries wait until morning",
        body:
          "Patients who fill a website or ad form in the evening often hear back only the next day, if at all.",
      },
    ],
    plays: [
      {
        title: "Book appointments from enquiries",
        body:
          "Website and ad enquiries get a call within about a minute. The agent asks which department or doctor and a preferred day and time, then books it on your booking page.",
        useCase: "appointment-booking",
      },
      {
        title: "Reminder calls before the visit",
        body:
          "A call the day before confirms the patient is coming. A patient who cannot make it can agree a new time on the same call.",
        useCase: "event-confirmation",
      },
      {
        title: "Report-ready calls",
        body:
          "The agent tells the patient their report is ready and when they can collect it. Script it not to read out or explain results.",
      },
      {
        title: "Post-visit follow-up and feedback",
        body:
          "A short call a few days after a visit or procedure collects feedback. Anyone who mentions a problem is flagged for your staff to call back.",
        useCase: "feedback-surveys",
      },
      {
        title: "Take bookings from the Telleo IVR",
        body:
          "Callers who pick the appointment option on an IVR menu set up on your Telleo number can be handed to the agent. Anything else is transferred to the desk.",
        useCase: "ai-receptionist",
      },
      {
        title: "Qualify health-check package enquiries",
        body:
          "For labs: which package, home collection or walk-in, and a preferred slot. Ready enquiries go to your team with the answers filled in.",
        useCase: "lead-qualification",
      },
    ],
    sampleCall: [
      {
        who: "agent",
        text: "नमस्ते सुनीता जी, मैं CarePlus Clinic से Anjali बोल रही हूँ। कल सुबह दस बजे Dr. Mehra के साथ आपका appointment है। क्या आप आ पाएँगे?",
        en: "Hello Sunita ji, this is Anjali from CarePlus Clinic. You have an appointment with Dr. Mehra tomorrow at 10 am. Will you be able to come?",
      },
      {
        who: "caller",
        text: "कल तो नहीं हो पाएगा। Office में meeting है।",
        en: "Tomorrow won't work. I have a meeting at the office.",
      },
      {
        who: "agent",
        text: "कोई बात नहीं। कौन सा दिन आपके लिए ठीक रहेगा?",
        en: "No problem. Which day would suit you?",
      },
      { who: "caller", text: "Saturday हो सकता है?", en: "Could it be Saturday?" },
      {
        who: "agent",
        text: "Saturday को Dr. Mehra सुबह बैठते हैं। ग्यारह बजे ठीक रहेगा?",
        en: "Dr. Mehra sees patients on Saturday mornings. Would 11 o'clock be fine?",
      },
      {
        who: "caller",
        text: "हाँ, ठीक है। और मेरी पिछली blood report normal थी क्या?",
        en: "Yes, fine. And was my last blood report normal?",
      },
      {
        who: "agent",
        text: "Report के बारे में Doctor साहब ही बताएँगे, Saturday को उनसे बात कर लीजिए। Saturday सुबह ग्यारह बजे का time note कर लिया है, हमारी team आपका appointment update कर देगी। Confirmation WhatsApp पर भेज दूँ?",
        en: "The doctor is the right person to go through your report, please ask on Saturday. I've noted Saturday at 11 am, and our team will update your appointment. Shall I send the confirmation on WhatsApp?",
      },
      { who: "caller", text: "हाँ, भेज दीजिए।", en: "Yes, please send it." },
    ],
    captures: [
      "Department or doctor",
      "Preferred day and time",
      "New or follow-up visit",
      "Confirmed, rescheduled or cancelled",
      "Home collection or walk-in (labs)",
      "Callback requested by the patient",
      "Feedback score and comments",
      "Concern raised, flagged for staff",
    ],
    rollout: [
      {
        step: "Start with reminders",
        detail:
          "Upload tomorrow's appointment list as a CSV and run a reminder campaign inside clinic hours. It is the simplest call to get right first.",
      },
      {
        step: "Write the boundaries into the script",
        detail:
          "List what the agent may talk about, such as timings, doctors' days and preparation instructions you have approved. Tell it to pass every clinical question to staff, then test that it does.",
      },
      {
        step: "Set outcomes",
        detail:
          "Assign reschedules, cancellations and patients flagged with a concern to the staff on this list, so a nurse or coordinator can call back.",
      },
      {
        step: "Add bookings from new enquiries",
        detail:
          "Once reminders run cleanly, connect your website and ad forms so new enquiries get a booking call within about a minute.",
      },
    ],
    cautions: [
      "Don't let the agent discuss diagnoses, results, medicines or doses. Script it to hand every clinical question to your staff, and check recordings to confirm it does.",
      "It is not an emergency line. Script it to tell anyone describing an emergency to go to the nearest hospital or call emergency services, and transfer the call to your desk.",
      "Telleo does not hold HIPAA or other healthcare certifications. Patient calls are sensitive: Patient calls are sensitive, and transcripts can't be restricted by role: give call-log access only to the people who need it, and keep health details out of call fields you do not need., and keep health details out of call fields you do not need.",
      "If you run separate appointment software, bookings made by the agent reach it only through a webhook or when your front desk enters them.",
    ],
    faqs: [
      {
        q: "Can the agent answer medical questions?",
        a: "It should not, and nothing stops it except your script. Configure it to say the doctor or your staff will answer, and to offer a callback. Every call is transcribed (and recorded, with recording on), so you can check how it handled the question.",
      },
      {
        q: "Will it work with our hospital management system?",
        a: "There is no built-in integration with hospital or lab software. Telleo can send each outcome to any system that accepts a webhook or HTTP request; otherwise your front desk updates bookings from the call log.",
      },
      {
        q: "Can patients reach the agent by calling us?",
        a: "Yes, through the Telleo IVR. An IVR menu option on your Telleo line, for example 'press 2 to book an appointment', can hand the caller to the AI agent.",
      },
      {
        q: "Which languages can patients use?",
        a: "Hindi, English and Hinglish are in production. Tamil, Telugu, Marathi, Bengali and other Indian languages are supported by the voice engines and set up with you on request.",
      },
      {
        q: "Who can see what patients said?",
        a: "Transcripts, summaries and captured answers are visible to staff who can open the call log, so keep call-log access to the people who need it. Recordings, when switched on, play there too, and full phone numbers can be restricted by role.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── Lending
  {
    slug: "lending",
    label: "Lending",
    title: "AI Calling Agent for NBFCs and Lenders in India",
    description:
      "Qualify loan leads, nudge applicants to finish their application and KYC, and make courteous EMI reminders in Hindi or English, within the hours you set.",
    icon: "Landmark",
    summary: "Qualify loan leads, follow up on unfinished applications and make courteous EMI reminders.",
    h1: "AI calling for NBFCs, digital lenders and loan DSAs",
    lede:
      "Lending runs on follow-up calls: to new leads, to applicants who stopped halfway, to borrowers before an EMI is due. Telleo makes these calls in Hindi, English or Hinglish, politely and inside your calling hours, and passes anything that needs judgement to your team.",
    challenges: [
      {
        title: "Borrowers enquire with several lenders",
        body:
          "A loan enquiry is often one of several. The lender that calls first and asks the right questions has the best chance of getting the application.",
      },
      {
        title: "Applications stall halfway",
        body:
          "Applicants start, then stop at document upload or KYC. A reminder call helps, but tele-callers rarely get to every drop-off.",
      },
      {
        title: "Reminder calls must be courteous and well timed",
        body:
          "EMI reminders are sensitive. Tone and hours matter, and every call should be on record in case a borrower complains.",
      },
      {
        title: "Volume swings with the due-date cycle",
        body:
          "Reminder calls bunch up around due dates. Staffing for the peak leaves the team idle the rest of the month.",
      },
    ],
    plays: [
      {
        title: "Call new loan leads in about a minute",
        body:
          "Meta, Google and website leads get a call within about a minute of the form, inside the hours you allow.",
        useCase: "instant-lead-callback",
      },
      {
        title: "Qualify loan enquiries",
        body:
          "The agent asks loan type, amount, employment type, income band and city, then rates the lead and assigns the eligible ones to your team.",
        useCase: "lead-qualification",
      },
      {
        title: "Nudge unfinished applications and KYC",
        body:
          "Applicants who stopped at a step are told what is pending and can be sent your link on WhatsApp from an approved template. The agent does not collect or check documents itself.",
        useCase: "application-follow-up",
      },
      {
        title: "Courteous EMI reminders",
        body:
          "A reminder before the due date with the amount and date from your list. If the borrower mentions a problem, script the agent to mark the call for your team rather than press the point.",
        useCase: "payment-reminders",
      },
      {
        title: "Re-engage dropped leads",
        body:
          "When your products or criteria change, call older leads who have consented to be contacted and pass the interested ones to your team.",
        useCase: "lead-reactivation",
      },
    ],
    sampleCall: [
      {
        who: "agent",
        text: "नमस्ते विकास जी, मैं Arth Finance से Pooja बोल रही हूँ। आपके two-wheeler loan की EMI के बारे में एक छोटा सा reminder है। क्या अभी एक मिनट बात हो सकती है?",
        en: "Hello Vikas ji, this is Pooja from Arth Finance. I'm calling with a short reminder about your two-wheeler loan EMI. Can we talk for a minute?",
      },
      { who: "caller", text: "हाँ, बोलिए।", en: "Yes, go ahead." },
      {
        who: "agent",
        text: "आपकी चार हज़ार दो सौ रुपये की EMI पाँच तारीख को due है। क्या उस दिन तक account में balance रहेगा?",
        en: "Your EMI of four thousand two hundred rupees is due on the 5th. Will the balance be in your account by then?",
      },
      {
        who: "caller",
        text: "इस बार salary थोड़ी late आएगी, सात तारीख तक।",
        en: "My salary is a little late this time, by the 7th.",
      },
      {
        who: "agent",
        text: "समझ सकती हूँ। क्या मैं यह note कर लूँ, ताकि हमारी team आपसे payment options पर बात कर ले?",
        en: "I understand. Shall I note this so our team can talk to you about payment options?",
      },
      { who: "caller", text: "हाँ, ठीक है।", en: "Yes, okay." },
      {
        who: "agent",
        text: "Team को आपको किस समय call करना ठीक रहेगा?",
        en: "What time would suit you for the team's call?",
      },
      { who: "caller", text: "कल दोपहर तीन बजे।", en: "Tomorrow at 3 in the afternoon." },
      {
        who: "agent",
        text: "ठीक है, मैंने note कर लिया है कि कल दोपहर तीन बजे के आसपास बात करना ठीक रहेगा, हमारी team आपसे संपर्क करेगी। क्या और किसी चीज़ में मदद कर सकती हूँ?",
        en: "Okay, I've noted that tomorrow around 3 pm suits you, and our team will be in touch. Is there anything else I can help with?",
      },
      { who: "caller", text: "नहीं, बस। Thank you.", en: "No, that's all. Thank you." },
    ],
    captures: [
      "Loan type and amount needed",
      "Employment type: salaried or self-employed",
      "Monthly income band",
      "City or pincode",
      "Application step where the applicant stopped",
      "Reason for a delay, in the borrower's words",
      "Expected payment date, if the borrower offers one",
      "Request to speak to a person",
    ],
    rollout: [
      {
        step: "Start with new-lead qualification",
        detail:
          "Connect Meta and Google lead forms or your website form, and set the questions that decide eligibility.",
      },
      {
        step: "Add application follow-ups",
        detail:
          "Send drop-offs from your loan system to Telleo by webhook, with the pending step as a field the agent can mention.",
      },
      {
        step: "Agree the reminder script with compliance",
        detail:
          "Have your compliance team sign off the reminder script. Set calling windows, cap retries per borrower, and route every dispute or hardship case to a person.",
      },
      {
        step: "Review recordings every week",
        detail:
          "Every call is transcribed, and recorded with recording on. Sample reminder calls weekly and check the tone against your fair-practices policy.",
      },
    ],
    cautions: [
      "Reminder calls must stay courteous. The agent is for reminders, not collections pressure: script it never to threaten, and to send disputes or hardship cases to a person.",
      "RBI's rules on recovery agents (first issued in circular RBI/2022-23/108 in August 2022, now part of RBI's Responsible Business Conduct Directions) say regulated lenders and their agents must not call borrowers about overdue loans before 8 am or after 7 pm, or call persistently. Set calling windows and retry limits to match, and check current RBI directions with your compliance team.",
      "The agent does not collect payments or verify KYC documents; script it not to give financial advice. It tells applicants what is pending and sends your link. It tells applicants what is pending and sends your link.",
      "DLT registration is required for commercial calling in India. Telleo registers it with you.",
    ],
    faqs: [
      {
        q: "Can the agent collect EMI payments on the call?",
        a: "No. It reminds the borrower of the amount and date, and can send your payment link on WhatsApp from an approved template if the borrower agrees. Payment happens in your own system.",
      },
      {
        q: "Can it do KYC?",
        a: "No. It can tell an applicant which step is pending and send the link to finish it. Checking documents stays with your KYC process.",
      },
      {
        q: "Can it make collection calls on overdue loans?",
        a: "We recommend using it for courteous reminders only, before and just after the due date. Anything beyond a reminder, and every dispute or hardship case, should go to a trained person. RBI's rules on recovery agents (first issued in its August 2022 circular, now part of its Responsible Business Conduct Directions) rule out calls about overdue loans before 8 am or after 7 pm; for microfinance loans the window is 9 am to 6 pm.",
      },
      {
        q: "How do we control when and how often borrowers are called?",
        a: "Campaigns run inside time windows you choose. Workflow calls retry with the gap and maximum attempts you set; a campaign never re-dials on its own, so you decide if and when to re-run it. A daily cap limits total calls, and duplicate protection stops a number being dialled twice by accident.",
      },
      {
        q: "Is every call recorded?",
        a: "Yes, with recording switched on for your calling line, which is the normal setup. Every call is also transcribed, with a summary and a disposition, so you can review how each reminder was handled.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── Insurance
  {
    slug: "insurance",
    label: "Insurance",
    title: "AI Calling Agent for Insurance Brokers in India",
    description:
      "Qualify insurance leads, remind customers before renewals and chase pending policy documents in Hindi or English. Advice and sales stay with your team.",
    icon: "ShieldCheck",
    summary: "Qualify leads, remind before renewals and chase pending documents. Advice stays with your team.",
    h1: "AI calling for insurance brokers, agents and insurers",
    lede:
      "Insurance teams make the same three calls over and over: to new leads, to customers whose policy is about to lapse, and to customers who still owe a document. Telleo makes them, and hands anyone ready to buy or asking for advice to your licensed staff.",
    challenges: [
      {
        title: "Lead lists are long and mixed",
        body:
          "Leads from ads range from ready to buy to barely interested. Advisors lose hours finding the few who want a quote today.",
      },
      {
        title: "Renewals slip past the due date",
        body:
          "A reminder that comes too late can mean a lapsed policy and a lost customer. Renewal calls compete with new sales for the same team's time.",
      },
      {
        title: "Paperwork holds up policies",
        body:
          "Proposals wait on a missing document or signature. Chasing by phone is slow, and nobody tracks who was called and what they said.",
      },
    ],
    plays: [
      {
        title: "Call new leads in about a minute",
        body:
          "Meta, Google and website leads get a call within about a minute, while the customer still remembers filling the form.",
        useCase: "instant-lead-callback",
      },
      {
        title: "Qualify interest",
        body:
          "The agent asks the type of cover, who it is for, any current policy, and the best time for an advisor to call. Ready leads go to advisors with a summary.",
        useCase: "lead-qualification",
      },
      {
        title: "Renewal reminders",
        body:
          "Calls ahead of the renewal date with the policy and due date from your list. Customers with questions are transferred to an advisor or flagged for an advisor's callback.",
        useCase: "payment-reminders",
      },
      {
        title: "Pending document follow-up",
        body:
          "Customers are told which document is missing and, if they agree, sent your upload link on WhatsApp from an approved template.",
        useCase: "application-follow-up",
      },
      {
        title: "Reach lapsed customers",
        body:
          "Call lapsed customers who have consented to be contacted and ask if they would like an advisor to call about renewing.",
        useCase: "lead-reactivation",
      },
      {
        title: "Feedback after purchase or claim",
        body:
          "A short call asks how the purchase or claim went. Low scores are assigned to a manager.",
        useCase: "feedback-surveys",
      },
    ],
    sampleCall: [
      {
        who: "agent",
        text: "नमस्ते अरोड़ा जी, मैं Kavach Insurance Brokers से Rohit बोल रहा हूँ। आपकी car insurance policy अगले हफ़्ते expire हो रही है। क्या अभी दो मिनट बात हो सकती है?",
        en: "Hello Arora ji, this is Rohit from Kavach Insurance Brokers. Your car insurance policy expires next week. Can we talk for two minutes?",
      },
      {
        who: "caller",
        text: "अच्छा, मुझे याद नहीं था। हाँ, बताइए।",
        en: "Oh, I had forgotten. Yes, tell me.",
      },
      {
        who: "agent",
        text: "क्या आप इसी policy को renew करना चाहेंगे, या कुछ बदलाव सोच रहे हैं?",
        en: "Would you like to renew the same policy, or are you thinking of changing anything?",
      },
      {
        who: "caller",
        text: "Premium कम हो सकता है क्या? पिछले साल कोई claim नहीं लिया।",
        en: "Can the premium come down? I didn't make a claim last year.",
      },
      {
        who: "agent",
        text: "Premium और discount के बारे में हमारे advisor सही जानकारी दे पाएँगे। क्या मैं अभी आपकी call उनसे connect कर दूँ?",
        en: "Our advisor can give you the right details on premium and discounts. Shall I connect you to them now?",
      },
      {
        who: "caller",
        text: "अभी नहीं, कल सुबह करवा दीजिए।",
        en: "Not now, have them call tomorrow morning.",
      },
      {
        who: "agent",
        text: "ठीक है। कल सुबह कितने बजे call करना ठीक रहेगा?",
        en: "Okay. What time tomorrow morning would suit you?",
      },
      { who: "caller", text: "दस बजे के बाद।", en: "After 10." },
      {
        who: "agent",
        text: "ठीक है, मैंने note कर लिया है कि कल सुबह दस बजे के बाद बात करना ठीक रहेगा, advisor आपसे संपर्क करेंगे। Renewal की details WhatsApp पर भेज दूँ?",
        en: "Okay, I've noted that tomorrow after 10 am suits you, and an advisor will be in touch. Shall I send the renewal details on WhatsApp?",
      },
      { who: "caller", text: "हाँ, भेज दीजिए।", en: "Yes, please send them." },
    ],
    captures: [
      "Type of cover: health, motor, life or other",
      "Who the cover is for",
      "Existing policy and insurer, if any",
      "Renewal intent: renew, change or not renewing",
      "Reason for not renewing",
      "Documents still pending",
      "Whether they want an advisor to call back",
    ],
    rollout: [
      {
        step: "Upload the renewal list",
        detail:
          "Import policies due in the coming weeks as a CSV, with policy type and due date as fields the agent can mention.",
      },
      {
        step: "Script the boundary",
        detail:
          "The agent reminds, qualifies and flags callback requests. Premiums, cover comparisons and recommendations go to licensed advisors by live transfer or callback.",
      },
      {
        step: "Route by outcome",
        detail:
          "Customers who want to renew go to the advisor who owns the policy. Reasons for not renewing are captured for your manager. Re-run the renewal campaign later over the customers who didn't answer.",
      },
      {
        step: "Add new-lead calls",
        detail:
          "Connect Meta and Google lead forms so new leads get a qualifying call within about a minute.",
      },
    ],
    cautions: [
      "The agent should not recommend, compare or quote policies. Leave advice and selling to your licensed staff, and script it to transfer the call or flag a callback request when asked.",
      "Only give the agent premiums or due amounts that come from your records. It repeats what it is given and does not calculate anything.",
      "WhatsApp sends need approved templates, and the agent sends only what the customer agreed to on the call.",
      "DLT registration is required for commercial calling in India. Telleo registers it with you, and you choose the calling hours.",
    ],
    faqs: [
      {
        q: "Can the agent sell a policy?",
        a: "No. It qualifies interest, reminds about renewals and books time with your advisors. Advice, quotes and the sale stay with your licensed team.",
      },
      {
        q: "Can it tell customers their renewal premium?",
        a: "Only if you give it the figure as a field on the list. It reads out what you provide and does not calculate premiums.",
      },
      {
        q: "What if a customer wants to talk to someone right away?",
        a: "Set an advisor's number for live transfer. The agent says a short bridge line and connects the call.",
      },
      {
        q: "Can we review what the agent said?",
        a: "Every call is transcribed, and recorded when recording is on for your line (the normal setup), with a summary, a disposition and a green, amber or red call-health verdict.",
      },
      {
        q: "Does it connect to our policy system?",
        a: "There is no native integration with policy systems. Lists come in by CSV or webhook, and outcomes can go to anything that can receive a webhook or HTTP request.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── E-commerce
  {
    slug: "ecommerce",
    label: "E-commerce & D2C",
    title: "AI Calling Agent for E-commerce and D2C Brands",
    description:
      "Confirm COD orders, call back abandoned carts, handle failed-delivery (NDR) calls and collect feedback in Hindi or English. Outcomes go out by webhook.",
    icon: "ShoppingBag",
    summary: "COD order confirmation, abandoned-cart callbacks, failed-delivery (NDR) calls and feedback.",
    h1: "AI calling for D2C and e-commerce brands",
    lede:
      "COD orders the customer never meant to keep, carts left at checkout, parcels that come back after a failed delivery. Each one needs a short call. Telleo makes those calls and sends the answer to your order system by webhook.",
    challenges: [
      {
        title: "Unwanted COD orders cost you both ways",
        body:
          "A COD order that gets refused still costs shipping out and back. A confirmation call before dispatch gives the customer a chance to confirm, change or cancel.",
      },
      {
        title: "Carts are left for small reasons",
        body:
          "A delivery charge, a size question, a payment that failed. A call can answer the question while the customer still wants the product.",
      },
      {
        title: "Failed deliveries need a quick answer",
        body:
          "When a courier marks a delivery as failed, you need to know what happened before the parcel heads back. Calling each customer by hand does not keep up.",
      },
    ],
    plays: [
      {
        title: "COD order confirmation",
        body:
          "Each new COD order gets a call to confirm the product, quantity and a landmark for the address. Confirmed, changed and cancelled orders are sent to your system by webhook.",
      },
      {
        title: "Abandoned-checkout callbacks",
        body:
          "When your store posts an abandoned checkout to a webhook, the agent calls, asks what stopped the order, and can WhatsApp the checkout link from your approved template.",
      },
      {
        title: "Failed-delivery (NDR) calls",
        body:
          "The agent asks what happened, checks the customer still wants the parcel, and captures a preferred day and any address correction for your shipping team.",
      },
      {
        title: "Post-delivery feedback",
        body:
          "A short call after delivery asks for a rating and what could be better. Unhappy customers are assigned to your support team.",
        useCase: "feedback-surveys",
      },
      {
        title: "Win back past buyers",
        body:
          "Call past customers who have consented to hear from you when a product is back in stock or a new range launches, and send interested ones your link on WhatsApp.",
        useCase: "lead-reactivation",
      },
    ],
    sampleCall: [
      {
        who: "agent",
        text: "नमस्ते प्रिया जी, मैं Leafline Naturals से Kavya बोल रही हूँ। आपने कल हमारी website से hair oil का COD order किया था। क्या मैं order confirm कर दूँ?",
        en: "Hello Priya ji, this is Kavya from Leafline Naturals. You placed a COD order for hair oil on our website yesterday. Shall I confirm the order?",
      },
      {
        who: "caller",
        text: "हाँ, पर मैंने दो bottle order किए थे क्या?",
        en: "Yes, but did I order two bottles?",
      },
      {
        who: "agent",
        text: "जी, order में दो bottles हैं, total सात सौ अट्ठानवे रुपये। क्या दोनों रखनी हैं?",
        en: "Yes, the order has two bottles, seven hundred and ninety-eight rupees in total. Do you want to keep both?",
      },
      { who: "caller", text: "नहीं, एक ही चाहिए।", en: "No, I only need one." },
      {
        who: "agent",
        text: "ठीक है, मैं इसे एक bottle के लिए note कर देती हूँ, team order update कर देगी। Address के पास कोई landmark बता सकते हैं?",
        en: "Okay, I'll note it as one bottle and the team will update the order. Can you tell me a landmark near the address?",
      },
      {
        who: "caller",
        text: "हनुमान मंदिर के पास, Sector बारह।",
        en: "Near the Hanuman temple, Sector 12.",
      },
      {
        who: "agent",
        text: "धन्यवाद। Order दो-तीन दिन में पहुँच जाएगा। Delivery के समय courier वाले इसी number पर call करें?",
        en: "Thank you. The order will reach you in two to three days. Should the courier call you on this number at delivery?",
      },
      { who: "caller", text: "हाँ, इसी पर कीजिए।", en: "Yes, call on this one." },
    ],
    captures: [
      "Order confirmed, changed or cancelled",
      "Reason for cancelling",
      "Quantity or variant change requested",
      "Address landmark or correction",
      "Preferred re-delivery day (NDR)",
      "Why the checkout was left",
      "Feedback rating and comment",
    ],
    rollout: [
      {
        step: "Send orders to Telleo by webhook",
        detail:
          "Send each new COD order to Telleo's webhook as simple fields (phone, items, order value, address), using your order tool or a connector that reshapes the store's own webhook. If your platform cannot send webhooks, a daily CSV import works to start.",
      },
      {
        step: "Keep the confirmation call short",
        detail:
          "Confirm the order, check quantity and variant, ask for a landmark. Set the hours calls may go out.",
      },
      {
        step: "Send outcomes back",
        detail:
          "Add a webhook or HTTP request step so confirmed, changed and cancelled orders reach your order or shipping tool.",
      },
      {
        step: "Add NDR and checkout calls",
        detail:
          "Once COD confirmation runs cleanly, add failed-delivery and abandoned-checkout triggers the same way.",
      },
    ],
    cautions: [
      "There is no native Shopify, WooCommerce or courier integration. Orders come in and outcomes go out through webhooks, HTTP requests or CSV.",
      "The agent does not take payment or edit orders itself, and it cannot look an order up on its own. It reads out the details you send and records what the customer wants; your system or team acts on it.",
      "Abandoned-checkout and win-back calls are sales calls. Register DLT with us, keep to sensible hours, call past buyers only with their consent, and make 'do not call' a disposition that stops retries, then leave those numbers out of future campaign lists.",
    ],
    faqs: [
      {
        q: "Does it integrate with Shopify?",
        a: "Not natively. Anything that can send or receive a webhook can connect: your store app or order tool posts new COD orders to Telleo, and Telleo posts the outcome back.",
      },
      {
        q: "Can the agent cancel or edit the order?",
        a: "It captures the change and sends it to your system or team. Whether the order changes automatically depends on what your system does with that webhook.",
      },
      {
        q: "Can it convert COD orders to prepaid?",
        a: "It can offer to send your payment link on WhatsApp from an approved template, and sends it only if the customer agrees. The payment happens on your own checkout.",
      },
      {
        q: "What if the customer does not pick up?",
        a: "Unanswered calls retry with the gap and number of attempts you set. When retries run out, the order can go to a person or be marked unreachable for your team to decide.",
      },
      {
        q: "Which languages can it use?",
        a: "Hindi, English and Hinglish are in production. Tamil, Telugu, Bengali and other regional languages are supported by the voice engines and set up with you on request.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── Automotive
  {
    slug: "automotive",
    label: "Automotive",
    title: "AI Calling Agent for Car and Bike Dealers in India",
    description:
      "Call new enquiries within about a minute, book test drives, remind customers about service and follow up on quotes in Hindi or English. Telephony included.",
    icon: "Car",
    summary: "Test-drive booking, service reminders and follow-up on enquiries and quotes.",
    h1: "AI calling for car and two-wheeler dealerships",
    lede:
      "Dealers get enquiries from ads and the website, and have a service base that needs reminding every few months. Telleo calls each enquiry, books the test drive and makes the service reminder calls, so your sales and service advisors spend time with customers who are ready.",
    challenges: [
      {
        title: "Buyers enquire at more than one showroom",
        body:
          "A buyer who fills a form is often talking to other dealers too. The showroom that calls back first and books a test drive has the edge.",
      },
      {
        title: "Service reminders fall behind",
        body:
          "Service advisors are busy with vehicles on the floor. Reminder calls for due services get made late or not at all.",
      },
      {
        title: "Quotes go without a second call",
        body:
          "After a showroom visit and a quote, follow-up depends on each salesperson's memory. Some quotes never get a second call.",
      },
    ],
    plays: [
      {
        title: "Call new enquiries",
        body:
          "Meta, Google and website enquiries get a call within about a minute. The agent asks model, variant, fuel type, budget and whether there is a vehicle to exchange.",
        useCase: "instant-lead-callback",
      },
      {
        title: "Book test drives",
        body:
          "When the buyer agrees a day, time and place, the test drive is booked on your booking page and confirmed on WhatsApp from your approved template.",
        useCase: "appointment-booking",
      },
      {
        title: "Service reminders",
        body:
          "Calls customers from your service-due list and books a service slot. Pick-up and drop requests are noted for the service desk.",
        useCase: "appointment-booking",
      },
      {
        title: "Follow up on quotes",
        body:
          "Buyers who took a quote get a call a few days later asking if they have decided and whether they have questions for sales.",
        useCase: "lead-reactivation",
      },
      {
        title: "Feedback after delivery or service",
        body:
          "A short call asks for a rating and comments. Low scores are assigned to the sales or service manager.",
        useCase: "feedback-surveys",
      },
    ],
    sampleCall: [
      {
        who: "agent",
        text: "नमस्ते सिंह जी, मैं Highway Motors से Arjun बोल रहा हूँ। आपने हमारी website पर SUV के बारे में पूछा था। क्या अभी दो मिनट बात हो सकती है?",
        en: "Hello Singh ji, this is Arjun from Highway Motors. You asked about an SUV on our website. Can we talk for two minutes?",
      },
      { who: "caller", text: "हाँ, बोलो।", en: "Yes, go on." },
      {
        who: "agent",
        text: "आप petrol देख रहे हैं या diesel?",
        en: "Are you looking at petrol or diesel?",
      },
      {
        who: "caller",
        text: "Diesel, और automatic चाहिए।",
        en: "Diesel, and I want an automatic.",
      },
      {
        who: "agent",
        text: "ठीक है। क्या आपकी कोई पुरानी गाड़ी है जो आप exchange करना चाहेंगे?",
        en: "Okay. Do you have an old car you'd like to exchange?",
      },
      {
        who: "caller",
        text: "हाँ, एक पुरानी hatchback है।",
        en: "Yes, an old hatchback.",
      },
      {
        who: "agent",
        text: "Test drive के लिए आप showroom आना चाहेंगे, या हम गाड़ी आपके घर ले आएँ?",
        en: "For the test drive, would you like to come to the showroom, or shall we bring the car to your home?",
      },
      {
        who: "caller",
        text: "घर पर ले आइए, Sunday सुबह दस बजे।",
        en: "Bring it home, Sunday at 10 am.",
      },
      {
        who: "agent",
        text: "ठीक है, Sunday सुबह दस बजे घर पर test drive book हो गई है। क्या उसी समय आपकी hatchback की valuation भी करवा दें?",
        en: "Done, your home test drive is booked for Sunday at 10 am. Shall we have your hatchback valued at the same time?",
      },
      { who: "caller", text: "हाँ, ठीक रहेगा।", en: "Yes, that works." },
    ],
    captures: [
      "Model and variant of interest",
      "Fuel and transmission preference",
      "Budget range",
      "Vehicle to exchange, if any",
      "Finance needed or not",
      "Test drive day, time and place",
      "Service due and pick-up request",
      "Reason for not buying (quote follow-ups)",
    ],
    rollout: [
      {
        step: "Connect enquiry sources",
        detail:
          "Link Meta and Google lead forms and your website form. Upload your service-due list as a CSV.",
      },
      {
        step: "Load models and offers into the script",
        detail:
          "Add models, variants, current offers and showroom hours. Update offers every month so the agent never quotes an old scheme.",
      },
      {
        step: "Route by outcome",
        detail:
          "Test-drive bookings go to the sales team round-robin, service bookings to the service desk, and not-interested leads stop.",
      },
      {
        step: "Run service reminders as a campaign",
        detail:
          "Run the service-due list in a morning window each week, and re-run it later over the numbers that didn't answer.",
      },
    ],
    cautions: [
      "Prices, offers and exchange values change often. The agent quotes only what the script says, so keep it current or have it pass price questions to sales.",
      "The agent should not promise an exchange value or a finance approval. It books the evaluation or passes the lead to your finance desk.",
      "There is no native integration with dealer management software. Bookings reach other systems through webhooks, or your team enters them from the call log.",
      "DLT registration is required for commercial calling in India. Telleo registers it with you, and you choose the calling hours.",
    ],
    faqs: [
      {
        q: "Can the agent quote on-road prices?",
        a: "Only prices you put in the script. You can have it give a range and let sales send the exact quote; the agent can transfer the call, or the call is marked as a callback request for sales to follow up.",
      },
      {
        q: "Can it book service appointments?",
        a: "Yes. It calls customers from your service-due list, agrees a day and time, and books it on your booking page. Pick-up requests are captured for the service desk.",
      },
      {
        q: "Can customers call in and reach the agent?",
        a: "Yes, through an IVR menu option on a Telleo number, for example 'press 1 to book a service'. Anything the agent cannot handle can be transferred to your desk.",
      },
      {
        q: "Do we need new phone lines?",
        a: "No. AI calls run on Telleo's lines. Your team can keep using Airtel IQ or Exotel for their own click-to-call; the AI line is separate.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── Travel & hospitality
  {
    slug: "travel-hospitality",
    label: "Travel & hospitality",
    title: "AI Calling Agent for Travel Agencies and Hotels",
    description:
      "Qualify holiday enquiries, confirm bookings and collect guest feedback by phone in English, Hindi or Hinglish. Your travel desk talks to serious travellers.",
    icon: "Plane",
    summary: "Qualify holiday enquiries, confirm bookings and collect guest feedback.",
    h1: "AI calling for travel agencies, tour operators and hotels",
    lede:
      "Holiday enquiries arrive in bulk from ads, and not every one is a trip. Telleo calls each enquiry to learn dates, destination, group size and budget, confirms bookings before arrival, and calls guests after their stay.",
    challenges: [
      {
        title: "Not every enquiry is a trip",
        body:
          "Ads bring enquiries from people still dreaming about a holiday. Consultants spend the day finding the ones with dates and a budget.",
      },
      {
        title: "Travellers decide fast",
        body:
          "Before a long weekend or school holidays, travellers book with whoever comes back first with a clear plan. A callback the next day can be too late.",
      },
      {
        title: "Confirmation calls pull staff from guests",
        body:
          "Hotels call to confirm arrival times and special requests. It is routine work for a front desk that is also checking guests in.",
      },
      {
        title: "Complaints show up online first",
        body:
          "Without a call after checkout, you may hear about a bad stay only in an online review.",
      },
    ],
    plays: [
      {
        title: "Call new holiday enquiries",
        body:
          "Ad and website enquiries get a call within about a minute, inside the hours you set.",
        useCase: "instant-lead-callback",
      },
      {
        title: "Qualify the trip",
        body:
          "Destination, dates, number of travellers, budget, hotel category and whether flights are needed. Qualified trips go to a consultant with the call summary.",
        useCase: "lead-qualification",
      },
      {
        title: "Booking confirmations",
        body:
          "Before arrival or departure, the agent confirms dates, arrival time and special requests, and notes any changes for your team.",
        useCase: "event-confirmation",
      },
      {
        title: "Guest feedback after the stay",
        body:
          "A short call after checkout asks for a rating and what could have been better. Low scores go to the manager.",
        useCase: "feedback-surveys",
      },
      {
        title: "Re-engage past enquiries and guests",
        body:
          "Call past enquiries and guests who have consented to hear from you when a new package launches or a season opens, and pass the interested ones to a consultant.",
        useCase: "lead-reactivation",
      },
    ],
    sampleCall: [
      {
        who: "agent",
        text: "Good afternoon Kapoor ji, this is Tara from Palmgrove Resort, Goa. I'm calling about your stay with us from the 14th. Is this a good time for a quick check?",
      },
      { who: "caller", text: "Yes, go ahead." },
      { who: "agent", text: "What time do you expect to reach the resort on the 14th?" },
      { who: "caller", text: "Around eleven at night. Our flight lands late." },
      {
        who: "agent",
        text: "No problem, the front desk is open all night. Would you like us to arrange an airport pickup?",
      },
      { who: "caller", text: "Yes, please. We're four people with a lot of luggage." },
      {
        who: "agent",
        text: "I'll ask our travel desk to arrange a larger car and share the fare with you on WhatsApp. Is there anything else we should know, like a special occasion?",
      },
      { who: "caller", text: "It's our anniversary, actually." },
      {
        who: "agent",
        text: "Thank you for telling us, I've noted it for the front desk. Would you like them to call you to plan something for the evening?",
      },
      { who: "caller", text: "No, that's fine. Thank you." },
    ],
    captures: [
      "Destination and travel dates",
      "Number of travellers, adults and children",
      "Budget per person or in total",
      "Hotel category and room needs",
      "Flights or transfers needed",
      "Arrival time and special requests",
      "Guest rating and comments",
    ],
    rollout: [
      {
        step: "Connect enquiry forms",
        detail:
          "Link Meta and Google lead forms and your website form. Import past enquiries by CSV.",
      },
      {
        step: "Describe your packages",
        detail:
          "Add destinations, inclusions, seasons and starting prices to the script, and tell the agent to leave custom itineraries to consultants.",
      },
      {
        step: "Route qualified trips",
        detail:
          "Assign trips with dates and a budget to consultants round-robin. Keep 'just browsing' leads aside, and include them in a later re-engagement campaign only if they have consented to be contacted.",
      },
      {
        step: "Add confirmations and feedback",
        detail:
          "Import upcoming arrivals and recent checkouts as CSV files, or push them by webhook from your booking system, and run the calls in set windows.",
      },
    ],
    cautions: [
      "The agent does not make or change reservations or take payments. It confirms details and passes changes to your team, or to your system by webhook.",
      "Prices and availability change daily. Keep the agent to starting prices and inclusions, and let consultants quote the final price.",
      "Language is set per agent. Use an English agent for guests who do not speak Hindi.",
      "DLT registration is required for commercial calling in India. Telleo registers it with you, and you choose the calling hours.",
    ],
    faqs: [
      {
        q: "Can the agent build an itinerary on the call?",
        a: "No. It collects dates, destination, group size and budget so your consultant can build the itinerary. It can describe the packages you put in its script.",
      },
      {
        q: "Can guests call the hotel and reach the agent?",
        a: "Yes, through an IVR menu option on a Telleo line. The agent can take a confirmation or an enquiry and transfer the caller to the front desk when needed.",
      },
      {
        q: "Can it send the booking voucher or itinerary?",
        a: "It can send documents or links on WhatsApp using your approved templates, when the guest agrees on the call. It does not create vouchers itself.",
      },
      {
        q: "Does it work with our hotel or travel software?",
        a: "Not natively. Anything that can send or receive a webhook can connect: arrivals and enquiries in, outcomes out. CSV import works for everything else.",
      },
      {
        q: "Which languages can it speak?",
        a: "English, Hindi and Hinglish are in production. Tamil, Telugu, Malayalam, Bengali and other Indian languages are supported by the voice engines and set up with you on request.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────── Recruitment
  {
    slug: "recruitment",
    label: "Recruitment",
    title: "AI Calling Agent for Recruitment and Staffing",
    description:
      "Screen candidates by phone, schedule interviews and confirm joining in Hindi, English or Hinglish. Recruiters spend their time on candidates who fit the role.",
    icon: "Briefcase",
    summary: "Candidate screening calls, interview scheduling and joining confirmations.",
    h1: "AI calling for staffing firms and volume hiring",
    lede:
      "Volume hiring for BPO, retail and field roles means calling long lists of applicants to ask the same few questions. Telleo makes the screening call, schedules interviews for candidates who fit, and calls again before joining day.",
    challenges: [
      {
        title: "Recruiters spend the day on first calls",
        body:
          "Many first calls go to candidates who don't pick up, are no longer looking, or don't meet the basics. The good ones wait in the queue.",
      },
      {
        title: "Interview no-shows",
        body:
          "Candidates agree to an interview and then do not come. Without a reminder, the panel's time is lost.",
      },
      {
        title: "Joining-day drop-offs",
        body:
          "An offer is accepted and then the candidate joins elsewhere. A call before joining day shows who is still coming.",
      },
    ],
    plays: [
      {
        title: "Call new applicants in about a minute",
        body:
          "Applications from job ads or your careers form get a call within about a minute of arriving, inside the hours you set.",
        useCase: "instant-lead-callback",
      },
      {
        title: "Screening calls",
        body:
          "The agent asks current status, notice period, location, expected salary and shift preference, one at a time, and rates each candidate against your criteria.",
        useCase: "lead-qualification",
      },
      {
        title: "Interview scheduling",
        body:
          "Candidates who fit are offered an interview slot, booked on your booking page and sent a WhatsApp confirmation from your approved template.",
        useCase: "appointment-booking",
      },
      {
        title: "Interview reminders",
        body:
          "A call the day before confirms attendance. Candidates who cannot make it can pick a new slot on the same call.",
        useCase: "event-confirmation",
      },
      {
        title: "Joining confirmations",
        body:
          "Before joining day the agent checks the candidate is still coming and reminds them of the documents your HR team asked for.",
        useCase: "application-follow-up",
      },
      {
        title: "Reactivate your candidate database",
        body:
          "When a new mandate opens, call past applicants who have consented to hear from you to see who is available now.",
        useCase: "lead-reactivation",
      },
    ],
    sampleCall: [
      {
        who: "agent",
        text: "Hi Ravi ji, this is Meera from Northstar Staffing. You applied for the customer support role in Pune. Do you have two minutes for a few quick questions?",
      },
      { who: "caller", text: "Yes, sure." },
      { who: "agent", text: "Are you working at the moment, or free to join right away?" },
      { who: "caller", text: "I'm working in a call centre, but I want to change." },
      { who: "agent", text: "Okay. What is your notice period?" },
      { who: "caller", text: "Thirty days." },
      {
        who: "agent",
        text: "This role has rotational shifts, including some nights. Would that work for you?",
      },
      { who: "caller", text: "Yes, that's fine." },
      {
        who: "agent",
        text: "Good. The interview is at our Pune office. Would Thursday at eleven in the morning suit you?",
      },
      { who: "caller", text: "Yes, Thursday works." },
    ],
    captures: [
      "Current job status and notice period",
      "Current location and ability to commute",
      "Expected salary range",
      "Shift preference, including nights",
      "Languages spoken comfortably",
      "Interview day and time",
      "Joining confirmation and pending documents",
    ],
    rollout: [
      {
        step: "Bring in applicants",
        detail:
          "Connect Meta lead ads, send your careers form to Telleo by webhook, or import applicant lists from job portals as CSV.",
      },
      {
        step: "Write the screening questions",
        detail:
          "Set the must-know questions and what counts as a fit. Keep every question about the job.",
      },
      {
        step: "Route by fit",
        detail:
          "Candidates who fit get an interview slot, borderline ones go to a recruiter, and the rest are closed politely.",
      },
      {
        step: "Add reminders and joining calls",
        detail:
          "Each day, import tomorrow's interviews and this week's joiners as a CSV and run them as a short campaign.",
      },
    ],
    cautions: [
      "Keep screening questions job-related. Don't have the agent ask about religion, caste, marital status or other personal matters, and keep the final decision with a recruiter.",
      "The agent's rating reflects only what was said on the call. Use it to prioritise, not to reject anyone without a human review.",
      "The agent does not verify documents, check references or make offers. It records what the candidate says; your HR team checks it.",
      "DLT registration is required for commercial calling in India. Telleo registers it with you, and you choose the calling hours.",
    ],
    faqs: [
      {
        q: "Can the agent assess a candidate's English?",
        a: "It can run the screening in English, and your recruiter can listen to the recording and read the transcript. It does not give a formal language score.",
      },
      {
        q: "Can it schedule interviews with our panel?",
        a: "It books agreed slots on your booking page. If your panel works from another calendar, send the booking there by webhook or have a coordinator copy it across.",
      },
      {
        q: "Can it call candidates from job portals?",
        a: "If you can export them to a CSV, yes. Import the list and run a screening campaign within the hours you choose.",
      },
      {
        q: "How many candidates can it call in a day?",
        a: "The default daily cap is 500 calls, and you can change it. Unanswered calls from a workflow are retried on the gap and attempt limit you set; a campaign doesn't re-dial, so re-run it over the candidates who didn't answer.",
      },
      {
        q: "Can candidates talk to a recruiter during the call?",
        a: "Yes. Set a recruiter's number for live transfer, and the agent connects the call after a short bridge line.",
      },
    ],
  },
];

export const findIndustry = (slug: string) => INDUSTRIES.find((i) => i.slug === slug);
