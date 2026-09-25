import Link from "next/link";
import {
  ArrowRight, BadgeIndianRupee, BellRing, Briefcase, Building2, CalendarCheck, Car, ClipboardCheck, FileCheck2,
  GraduationCap, Headset, HeartPulse, Home, Landmark, Megaphone, MessageSquareHeart, PhoneCall, PhoneIncoming,
  PhoneOutgoing, Plane, RefreshCw, ShieldCheck, ShoppingBag, Stethoscope, Ticket, UserCheck, Users, Zap,
  type LucideIcon,
} from "lucide-react";
import type { CallLine, Faq, IconName } from "@/content/types";
import { SITE, TEST_LINE, TEST_LINE_DISPLAY, bookHref } from "@/lib/site";
import { JsonLd } from "./JsonLd";

const ICONS: Record<IconName, LucideIcon> = {
  GraduationCap, Building2, Stethoscope, Landmark, ShieldCheck, ShoppingBag, Car, Plane, Briefcase, PhoneIncoming,
  PhoneOutgoing, CalendarCheck, Wallet: BadgeIndianRupee, RefreshCw, MessageSquareHeart, Headset, Ticket, FileCheck2,
  UserCheck, Zap, Home, HeartPulse, Users, Megaphone, ClipboardCheck, BellRing, BadgeIndianRupee,
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const C = ICONS[name] ?? Zap;
  return <C className={className} aria-hidden />;
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          {all.map((c, i) => (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden className="text-slate-300">/</span>}
              {c.href && i < all.length - 1 ? (
                <Link href={c.href} className="hover:text-ink">{c.label}</Link>
              ) : (
                <span className="text-slate-700" aria-current={i === all.length - 1 ? "page" : undefined}>{c.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            ...(c.href ? { item: `${SITE}${c.href}` } : {}),
          })),
        }}
      />
    </>
  );
}

export function SectionHeading({
  eyebrow, title, lede, dark, center, id,
}: { eyebrow?: string; title: React.ReactNode; lede?: React.ReactNode; dark?: boolean; center?: boolean; id?: string }) {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl`}>
      {eyebrow && <p className={`eyebrow ${dark ? "eyebrow-dark" : ""}`}>{eyebrow}</p>}
      <h2 id={id} className={`h-section mt-3 ${dark ? "text-white" : "text-ink"}`}>{title}</h2>
      {lede && <p className={`mt-4 text-lg leading-relaxed ${dark ? "text-slate-300" : "text-slate-600"}`}>{lede}</p>}
    </div>
  );
}

/** FAQ accordion + FAQPage JSON-LD. */
export function FaqList({ faqs, withSchema = true }: { faqs: Faq[]; withSchema?: boolean }) {
  return (
    <>
      <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
        {faqs.map((f, i) => (
          <details key={i} className="group p-5 md:p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left font-semibold text-ink">
              <span>{f.q}</span>
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-line text-slate-500 transition group-open:rotate-45 group-open:border-brand group-open:bg-brand group-open:text-ink">+</span>
            </summary>
            <p className="mt-3 pr-8 leading-relaxed text-slate-600">{f.a}</p>
          </details>
        ))}
      </div>
      {withSchema && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }}
        />
      )}
    </>
  );
}

/** Closing call-to-action band used at the foot of most pages. */
export function CtaBand({
  title = "Hear it on a real phone call.",
  body = "Book a 20-minute demo and we'll build a first agent around your script, or ring our test line and talk to one right now.",
}: { title?: string; body?: string }) {
  return (
    <section className="wrap py-16 md:py-24">
      <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-12 text-white md:px-14 md:py-16">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
        <div className="glow-brand pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem]" />
        <div className="relative grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="h-section text-white">{title}</h2>
            <p className="mt-4 max-w-xl text-lg text-slate-300">{body}</p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <Link href={bookHref()} className="btn btn-primary btn-lg" data-track="book_demo">
              Book a demo <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={`tel:${TEST_LINE}`} className="btn btn-ghost-dark btn-lg" data-track="call_test_line">
              <PhoneCall className="h-4 w-4 text-brand" /> Call {TEST_LINE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/** A static transcript of a sample call (Hindi lines carry an English gloss). */
export function Transcript({ lines, title = "Sample call" }: { lines: CallLine[]; title?: string }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_24px_60px_-40px_rgba(10,15,28,0.5)]">
      <figcaption className="flex items-center justify-between border-b border-line bg-paper px-5 py-3 text-sm">
        <span className="flex items-center gap-2 font-semibold text-ink">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand" />
          </span>
          {title}
        </span>
        <span className="hidden font-mono text-xs text-slate-500 sm:inline">Telleo agent · transcript</span>
      </figcaption>
      <ol className="space-y-3 p-5">
        {lines.map((l, i) => (
          <li key={i} className={`flex ${l.who === "agent" ? "justify-start" : "justify-end"}`}>
            <div className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-[0.95rem] leading-relaxed ${l.who === "agent" ? "rounded-tl-md bg-ink text-white" : "rounded-tr-md bg-brand-50 text-ink"}`}>
              <span className={`mb-0.5 block text-[0.68rem] font-bold uppercase tracking-wider ${l.who === "agent" ? "text-brand-300" : "text-brand-700"}`}>
                {l.who === "agent" ? "AI agent" : "Caller"}
              </span>
              {l.text}
              {l.en && <span className={`mt-1 block text-[0.8rem] italic ${l.who === "agent" ? "text-slate-400" : "text-slate-500"}`}>{l.en}</span>}
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}

export function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`h-5 w-5 shrink-0 ${className}`} aria-hidden>
      <circle cx="10" cy="10" r="10" className="fill-brand-100" />
      <path d="M6 10.4l2.6 2.5L14 7.6" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-brand-700" />
    </svg>
  );
}

export function CheckList({ items, dark }: { items: string[]; dark?: boolean }) {
  return (
    <ul className="space-y-3">
      {items.map((t, i) => (
        <li key={i} className={`flex gap-3 leading-relaxed ${dark ? "text-slate-300" : "text-slate-700"}`}>
          <Check className="mt-0.5" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}
