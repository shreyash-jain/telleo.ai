/**
 * Site constants and the registry of hand-written pages. Data-driven pages
 * (use cases, industries, comparisons, blog posts) live in src/content and are
 * merged in src/lib/routes.ts, which feeds the sitemap, footer and llms-full.txt.
 */
export const SITE = "https://telleo.ai";
export const SITE_NAME = "Telleo";
export const COMPANY = "Vidyayatan Technologies LLP";
export const TAGLINE = "AI voice agents that call, qualify and book, in Hindi, English and Hinglish.";

/** A live AI agent answers this number (same line as vacademy.io's test drive). */
export const TEST_LINE = "+918035374489";
export const TEST_LINE_DISPLAY = "+91 80353 74489";
export const WHATSAPP_NUMBER = "919993336616";
export const WHATSAPP_DISPLAY = "+91 99933 36616";
/** Mailbox must exist before launch — see README. */
export const SALES_EMAIL = "hello@telleo.ai";
/** Booking page for "Book a demo". Empty = every CTA goes to the /demo/ form. */
export const BOOKING_URL = "";
export const bookHref = () => BOOKING_URL || "/demo/";
export const whatsappHref = (text = "Hi, I'd like to see a Telleo demo.") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const PRIVACY_URL = "https://vacademy.io/privacy-policy";
export const TERMS_URL = "https://vacademy.io/terms-of-service";

export type PageGroup = "product" | "resource" | "company";

export interface SitePage {
  path: string;
  /** Short label for nav/footer. */
  label: string;
  /** <title> without the site suffix. */
  title: string;
  description: string;
  group: PageGroup;
}

export const PAGES: SitePage[] = [
  // Product
  { path: "/ai-voice-agents/", label: "AI voice agents", group: "product", title: "AI Voice Agents for Outbound and Inbound Calls", description: "Telleo's AI voice agents call new leads in about 60 seconds, answer inbound calls, qualify, book meetings and hand hot leads to your team, in Hindi, English and Hinglish." },
  { path: "/agent-builder/", label: "Agent builder", group: "product", title: "No-Code AI Calling Agent Builder", description: "Build an AI calling agent without code: opening line, script, questions to ask, outcomes, voice and handoff. Draft the script from a brief and improve it from real calls." },
  { path: "/automations/", label: "Automations & actions", group: "product", title: "AI Call Automations: Booking, WhatsApp, Transfers", description: "What happens after the AI call: meetings booked on your calendar, WhatsApp and email sent, hot leads assigned, unanswered calls retried and callbacks set for the time the caller asked." },
  { path: "/call-intelligence/", label: "Call intelligence", group: "product", title: "Call Intelligence: AI Analysis of Every Sales Call", description: "Transcripts, summaries, objections, sentiment, talk ratio, coaching tips and rep scores for every AI and human call, in Hindi, English and Hinglish. Free on AI calls." },
  { path: "/call-quality-monitoring/", label: "Call health & QA", group: "product", title: "AI Call Quality Monitoring with Per-Call Health", description: "Every Telleo call gets a green, amber or red health verdict with the reason: silences, missed answers, voicemail, failed transfers. Recordings and transcripts on every call." },
  { path: "/voices-and-languages/", label: "Voices & languages", group: "product", title: "Hindi AI Voice Agent: 80+ Voices, Hinglish Calls", description: "Telleo speaks natural phone Hindi, English and Hinglish with 80+ male and female voices across 7 speech engines, correct Hindi grammar and honorifics, and audition before you ship." },
  { path: "/how-it-works/", label: "How it works", group: "product", title: "How Telleo AI Calling Works, Step by Step", description: "From lead to booked meeting: how a Telleo call is triggered, how the agent listens and speaks, how outcomes are decided and what your team sees after every call." },
  { path: "/pricing/", label: "Pricing", group: "product", title: "AI Calling Pricing in India: From ₹3.49 per Minute", description: "Telleo pricing: AI calls from ₹3.49 a minute, plans from ₹3,499 a month, or ₹19,999 a year with no minute minimum. Telephony, recordings and call analysis included." },
  // Resources
  { path: "/use-cases/", label: "Use cases", group: "resource", title: "AI Calling Use Cases: Qualification to Reminders", description: "Nine jobs Telleo's AI agents do on the phone: lead qualification, 60-second callbacks, appointment booking, payment reminders, reactivation, surveys, reception and follow-ups." },
  { path: "/industries/", label: "Industries", group: "resource", title: "AI Calling Agents by Industry", description: "How Telleo's AI voice agents work for education, real estate, healthcare, lending, insurance, e-commerce, automotive, travel and recruitment teams in India." },
  { path: "/compare/", label: "Compare", group: "resource", title: "Compare Telleo: Telecallers, IVR, Ringg, Vomyra", description: "Honest comparisons of Telleo with human telecalling teams, IVR and robocalls, other Indian voice AI platforms and building your own agent on a developer platform." },
  { path: "/blog/", label: "Blog", group: "resource", title: "The Telleo Blog: Voice AI Guides for Indian Teams", description: "Practical guides on AI calling for Indian sales and support teams: costs, scripts, compliance, speed to lead, Hinglish voice quality and how to evaluate vendors." },
  { path: "/faq/", label: "FAQ", group: "resource", title: "Telleo FAQ: AI Calling Questions Answered", description: "Straight answers on how Telleo AI calls sound, languages, pricing, telephony, DLT, transfers, WhatsApp, data, setup time and what the agent will not do." },
  { path: "/security/", label: "Security & compliance", group: "resource", title: "Security, Privacy and Calling Compliance", description: "How Telleo handles call recordings, transcripts and lead data, who can see what, DLT registration, calling windows, consent and what we do not claim." },
  // Company
  { path: "/about/", label: "About", group: "company", title: "About Telleo", description: "Telleo is AI voice calling built by the team behind Vacademy, first proven on admissions calls for education institutes and now open to every Indian business that lives on the phone." },
  { path: "/demo/", label: "Book a demo", group: "company", title: "Book a Telleo Demo", description: "Book a 20-minute Telleo demo. Hear a live AI call in Hindi, English or Hinglish, see the dashboard, and get a plan for your first agent. Or call our test line now." },
];

export const byGroup = (g: PageGroup) => PAGES.filter((p) => p.group === g);
export const findPage = (path: string) => PAGES.find((p) => p.path === path);
