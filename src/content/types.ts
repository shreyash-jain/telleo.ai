/**
 * Content models for the data-driven pages. Every claim in these files must be
 * supported by docs/PRODUCT_FACTS.md (product) or by a cited public source.
 */

/** Icons the templates can render (lucide-react names). */
export type IconName =
  | "GraduationCap" | "Building2" | "Stethoscope" | "Landmark" | "ShieldCheck" | "ShoppingBag"
  | "Car" | "Plane" | "Briefcase" | "PhoneIncoming" | "PhoneOutgoing" | "CalendarCheck" | "Wallet"
  | "RefreshCw" | "MessageSquareHeart" | "Headset" | "Ticket" | "FileCheck2" | "UserCheck" | "Zap"
  | "Home" | "HeartPulse" | "Users" | "Megaphone" | "ClipboardCheck" | "BellRing" | "BadgeIndianRupee";

export interface Faq {
  q: string;
  a: string;
}

/** One line of a sample call. Hindi in Devanagari with English business words in English. */
export interface CallLine {
  who: "agent" | "caller";
  text: string;
  /** Optional English gloss shown under a Hindi/Hinglish line. */
  en?: string;
}

export interface UseCase {
  slug: string;
  /** Short label for nav, cards and footer (2–4 words). */
  label: string;
  /** <title> without the site suffix, ≤ 60 chars, contains the main keyword. */
  title: string;
  /** Meta description, 140–160 chars. */
  description: string;
  icon: IconName;
  /** One-line card summary for grids (≤ 110 chars). */
  summary: string;
  h1: string;
  lede: string;
  /** Why this job is broken when people do it by hand. 2–3 short paragraphs. */
  problem: { heading: string; body: string[] };
  /** What the agent does on the call, in order. 4–6 steps. */
  flow: { step: string; detail: string }[];
  /** A short, realistic sample call (6–10 lines). */
  sampleCall: CallLine[];
  /** Fields the agent extracts into the CRM (4–7). */
  captures: string[];
  /** What happens after each outcome (3–5 rows). */
  outcomes: { when: string; then: string }[];
  /** What to measure (3–5). */
  metrics: string[];
  /** Setup checklist (4–6 items). */
  setup: string[];
  /** Industry slugs where this use case matters most. */
  industries: string[];
  faqs: Faq[];
}

export interface Industry {
  slug: string;
  label: string;
  title: string;
  description: string;
  icon: IconName;
  summary: string;
  h1: string;
  lede: string;
  /** The phone-work problems in this industry (3–4). */
  challenges: { title: string; body: string }[];
  /** Calls Telleo makes here (4–6); link a use case where one fits. */
  plays: { title: string; body: string; useCase?: string }[];
  sampleCall: CallLine[];
  /** Fields worth capturing in this industry (5–8). */
  captures: string[];
  /** A worked "day one" rollout (3–5 steps). */
  rollout: { step: string; detail: string }[];
  /** Industry-specific cautions, stated honestly (2–4). */
  cautions: string[];
  faqs: Faq[];
}

export interface Source {
  label: string;
  url: string;
  /** ISO date the source was read. */
  checked: string;
}

export interface Comparison {
  slug: string;
  label: string;
  title: string;
  description: string;
  /** The thing being compared, e.g. "Ringg AI", "human telecallers". */
  other: string;
  h1: string;
  lede: string;
  /** Two or three sentence honest verdict. */
  verdict: string;
  rows: { dimension: string; telleo: string; other: string }[];
  chooseTelleoIf: string[];
  chooseOtherIf: string[];
  sections: { heading: string; body: string[] }[];
  sources: Source[];
  faqs: Faq[];
}

export interface Post {
  slug: string;
  title: string;
  /** Meta description 140–160 chars. */
  description: string;
  category: "Guides" | "Playbooks" | "Pricing" | "Compliance" | "Voice AI";
  keywords: string[];
  published: string; // YYYY-MM-DD
  updated?: string;
  readMinutes: number;
  /** Registry paths of site pages this post supports, e.g. "/pricing/". */
  pages?: string[];
}
