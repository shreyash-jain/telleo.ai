/** Navigation data. Slugs here must match src/content/{useCases,industries,comparisons}.ts. */
export const PRODUCT_NAV = [
  { href: "/ai-voice-agents/", label: "AI voice agents", desc: "Outbound and inbound calls that qualify and book" },
  { href: "/ai-telecaller/", label: "AI telecaller", desc: "The first call to every lead, in about a minute" },
  { href: "/agent-builder/", label: "Agent builder", desc: "Script, questions, outcomes and voice, no code" },
  { href: "/automations/", label: "Automations & actions", desc: "Bookings, WhatsApp, transfers, retries" },
  { href: "/call-intelligence/", label: "Call intelligence", desc: "Summaries, objections, coaching on AI and team calls" },
  { href: "/call-quality-monitoring/", label: "Call health & QA", desc: "A green, amber or red verdict per call" },
  { href: "/voices-and-languages/", label: "Voices & languages", desc: "80+ voices, Hindi, English and Hinglish" },
] as const;

export const USE_CASE_NAV = [
  { slug: "lead-qualification", label: "Lead qualification" },
  { slug: "instant-lead-callback", label: "60-second lead callback" },
  { slug: "appointment-booking", label: "Appointment booking" },
  { slug: "payment-reminders", label: "Payment & EMI reminders" },
  { slug: "lead-reactivation", label: "Old lead reactivation" },
  { slug: "feedback-surveys", label: "Feedback & NPS surveys" },
  { slug: "ai-receptionist", label: "Inbound AI receptionist" },
  { slug: "event-confirmation", label: "Event & demo confirmations" },
  { slug: "application-follow-up", label: "Application & KYC follow-up" },
] as const;

export const INDUSTRY_NAV = [
  { slug: "education", label: "Education & admissions" },
  { slug: "real-estate", label: "Real estate" },
  { slug: "healthcare", label: "Healthcare & clinics" },
  { slug: "lending", label: "Lending & NBFCs" },
  { slug: "insurance", label: "Insurance" },
  { slug: "ecommerce", label: "E-commerce & D2C" },
  { slug: "automotive", label: "Automotive dealers" },
  { slug: "travel-hospitality", label: "Travel & hospitality" },
  { slug: "recruitment", label: "Recruitment & staffing" },
] as const;

export const COMPARE_NAV = [
  { slug: "telleo-vs-telecallers", label: "Telleo vs telecallers" },
  { slug: "telleo-vs-ivr", label: "Telleo vs IVR & robocalls" },
  { slug: "telleo-vs-ringg", label: "Telleo vs Ringg AI" },
  { slug: "telleo-vs-vomyra", label: "Telleo vs Vomyra" },
  { slug: "telleo-vs-build-your-own", label: "Telleo vs build your own" },
] as const;

export const RESOURCE_NAV = [
  { href: "/engine-v2/", label: "What's new: Engine v2" },
  { href: "/how-it-works/", label: "How it works" },
  { href: "/blog/", label: "Blog" },
  { href: "/faq/", label: "FAQ" },
  { href: "/compare/", label: "Compare" },
  { href: "/security/", label: "Security & compliance" },
  { href: "/about/", label: "About Telleo" },
] as const;
