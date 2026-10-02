import Link from "next/link";
import { PhoneCall, Mail, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { COMPARE_NAV, INDUSTRY_NAV, PRODUCT_NAV, USE_CASE_NAV } from "@/lib/nav";
import {
  COMPANY, PRIVACY_URL, SALES_EMAIL, TERMS_URL, TEST_LINE, TEST_LINE_DISPLAY, WHATSAPP_DISPLAY, whatsappHref,
} from "@/lib/site";

const COLS: { title: string; links: { href: string; label: string }[] }[] = [
  { title: "Product", links: [...PRODUCT_NAV.map((p) => ({ href: p.href, label: p.label })), { href: "/how-it-works/", label: "How it works" }, { href: "/engine-v2/", label: "What's new: Engine v2" }, { href: "/pricing/", label: "Pricing" }] },
  { title: "Use cases", links: [...USE_CASE_NAV.map((u) => ({ href: `/use-cases/${u.slug}/`, label: u.label }))] },
  { title: "Industries", links: [...INDUSTRY_NAV.map((u) => ({ href: `/industries/${u.slug}/`, label: u.label }))] },
  {
    title: "Resources",
    links: [
      { href: "/blog/", label: "Blog" },
      { href: "/faq/", label: "FAQ" },
      { href: "/security/", label: "Security & compliance" },
      { href: "/compare/", label: "Compare" },
      ...COMPARE_NAV.map((c) => ({ href: `/compare/${c.slug}/`, label: c.label })),
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink text-slate-400">
      <div className="wrap py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2.8fr]">
          <div className="max-w-sm">
            <Logo tone="light" className="h-8 w-auto" />
            <p className="mt-5 leading-relaxed">
              AI voice agents for Indian businesses. Calls every lead, qualifies, books and hands over, in Hindi, English
              and Hinglish, and writes every outcome into your CRM.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a href={`tel:${TEST_LINE}`} className="flex items-center gap-2 text-slate-300 hover:text-white" data-track="call_test_line">
                  <PhoneCall className="h-4 w-4 text-brand" /> Talk to our AI agent: {TEST_LINE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-white" data-track="whatsapp">
                  <MessageCircle className="h-4 w-4 text-brand" /> WhatsApp sales: {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`mailto:${SALES_EMAIL}`} className="flex items-center gap-2 text-slate-300 hover:text-white">
                  <Mail className="h-4 w-4 text-brand" /> {SALES_EMAIL}
                </a>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {COLS.map((c) => (
              <div key={c.title}>
                <p className="text-sm font-bold text-white">{c.title}</p>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {c.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="hover:text-white">{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {COMPANY}. Telleo is built by the team behind{" "}
            <a href="https://vacademy.io" className="text-slate-300 hover:text-white">Vacademy</a>.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><Link href="/about/" className="hover:text-white">About</Link></li>
            <li><Link href="/demo/" className="hover:text-white">Contact</Link></li>
            <li><a href={PRIVACY_URL} className="hover:text-white">Privacy</a></li>
            <li><a href={TERMS_URL} className="hover:text-white">Terms</a></li>
            <li><a href="/sitemap.xml" className="hover:text-white">Sitemap</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
