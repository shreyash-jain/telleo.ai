// Curated from the raw research notes (scripts/research/raw/*.json); each item links to its own source.

/** [vendor, what happened, source URL] */
export const CHANGES: [string, string, string][] = [
  ["Sarvam AI", "Reported a $234M first close of a $300M Series B at a $1.5B valuation (June 2026), and publishes per-minute voice-agent pricing from ₹3 a minute.", "https://www.exchange4media.com/industry-briefing-news/sarvam-raises-234m-in-first-close-of-300m-series-b-at-15b-valuation-155498.html"],
  ["Ringg AI", "Raised a $10M Series A extension led by Peak XV Partners (August 2026), after a $5.5M round in January.", "https://yourstory.com/2026/08/voice-ai-startup-ringg-ai-raises-10m-series-a-peak-xv-partners"],
  ["Bolna", "Raised a $6.3M seed round led by General Catalyst, with Y Combinator and Blume Ventures (January 2026).", "https://www.bolna.ai/newsroom/bolna-bags-63-million-seed-funding-led-by-general-catalyst-to-build-indias-voice-ai-platform"],
  ["Gnani.ai", "Raised a $10M Series B first close led by Aavishkaar Capital (March 2026) and was selected under the IndiaAI Mission to build a voice foundation model.", "https://inc42.com/buzz/gnani-ai-raises-10-mn-to-build-sovereign-ai-voice-agents/"],
  ["Meritto", "Launched Mio AI Voice, an enrolment-calling agent built into its education CRM (December 2025).", "https://www.devdiscourse.com/article/technology/3731348-meritto-introduces-integrated-mio-ai-voice-agents-for-education"],
  ["Exotel", "Launched Harmony, a CX platform that puts voice, messaging, call analysis and human hand-off in one product (November 2025).", "https://exotel.com/newsroom/exotel-harmony-ai-cx-platform-launch/"],
  ["Telnyx", "Started selling Indian mobile numbers in four telecom circles that work with its voice AI agents (September 2026).", "https://telnyx.com/release-notes/india-mobile-numbers"],
  ["Yellow.ai", "Agreed to list on Nasdaq through a merger with Bluerock Acquisition Corp. at about $550M pro forma equity value (August 2026).", "https://www.cmswire.com/contact-center/inside-yellow-ais-550m-ipo-target-and-vision-to-transform-legacy-call-centers-with-ai/"],
  ["Haptik", "Launched WhatsApp and voice AI agents for small businesses through Interakt, from ₹10,000 (September 2025).", "https://uniindia.com/~/jio-s-haptik-launches-whatsapp-ai-agents-at-starting-price-rs-10-000-for-smbs/Business%20Economy/news/3564915.html"],
  ["NiCE Cognigy", "NICE completed its acquisition of Cognigy on 8 September 2025; Cognigy is now part of CXone Mpower.", "https://www.nice.com/fr/press-releases/press-releases-nice-closes-acquisition-of-cognigy-transforming-customer-experience-with-best-in-class-data-driven-cx-ai-platform"],
  ["ElevenLabs", "Raised a $500M Series D at an $11B valuation (February 2026); its agents page now names Hindi, Tamil and Hinglish and offers India data residency.", "https://elevenlabs.io/blog/series-d"],
  ["Vapi", "Raised a $50M Series B led by Peak XV (May 2026), as reported by SiliconANGLE.", "https://siliconangle.com/2026/05/12/vapi-nabs-50m-make-voice-ai-human/"],
  ["Aircall", "Acquired the voice-AI startup Vogent to build out its AI Voice Agent (May 2026).", "https://aircall.io/blog/news/aircall-vogent/"],
  ["PolyAI", "Raised an $86M Series D (December 2025) and opened a self-serve model API at 2¢ a minute in 2026.", "https://siliconangle.com/2025/12/15/call-center-chatbot-startup-polyai-raises-86m-750m-valuation/"],
  ["Synthflow", "Its pricing page now lists only Enterprise contracts, from $30,000 a year, after a $20M Series A in June 2025.", "https://synthflow.ai/news/synthflow-raises-20m-series-a"],
];

/** [need, who serves it better] */
export const FIT: [string, string][] = [
  ["Developers who want full control of the model, tools and telephony", "Vapi, Retell AI, Bland AI, Telnyx and ElevenLabs let you pick each component, call your own APIs mid-call and bring your own SIP trunk. Telleo is a finished product, not a toolkit."],
  ["Tool calling during the call (look up an order, check a slot in your system)", "Most developer and enterprise platforms document general mid-call tool calling. Telleo's agent can send a WhatsApp during the call, but it does not call your APIs mid-call."],
  ["Many Indian languages live from day one", "Sarvam AI, Gnani.ai, Ringg AI, Bolna, SquadStack and Meritto document 9 to 12 Indian languages. Telleo runs Hindi, English and Hinglish live and sets up other languages on request."],
  ["Banks, insurers and others that need certifications", "Gnani.ai, Sarvam AI, Skit.ai and Rezo.ai cite SOC 2 and ISO 27001. Telleo does not hold these certifications."],
  ["Large contact centres with human agents, routing and workforce management", "Talkdesk, NiCE Cognigy, Exotel and Ozonetel are built around the human contact centre, with AI agents added on."],
  ["Debt collection", "Skit.ai now focuses on collections, with checks on every call and scoring of human collectors."],
  ["Analysing human sales calls only", "Gong, Salesken and Convin specialise in recording, scoring and coaching human reps; Telleo's analysis of human calls is part of a calling product."],
  ["Teams already running LeadSquared or Meritto", "Both now include an AI voice agent that writes straight into the CRM you already use."],
];
