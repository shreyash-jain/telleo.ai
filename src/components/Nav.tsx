"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Menu, PhoneCall, X } from "lucide-react";
import { Logo } from "./Logo";
import { COMPARE_NAV, INDUSTRY_NAV, PRODUCT_NAV, RESOURCE_NAV, USE_CASE_NAV } from "@/lib/nav";
import { TEST_LINE, TEST_LINE_DISPLAY, bookHref } from "@/lib/site";

type MenuKey = "product" | "solutions" | "resources" | null;

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<MenuKey>(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    setOpen(null);
    setMobile(false);
  }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  // Over the dark home hero the bar is transparent with light text until the page scrolls.
  const overDark = pathname === "/" && !scrolled && !open;
  const text = overDark ? "text-slate-200 hover:text-white" : "text-slate-700 hover:text-ink";

  const Trigger = ({ k, label }: { k: Exclude<MenuKey, null>; label: string }) => (
    <button
      type="button"
      className={`flex items-center gap-1 rounded-full px-3 py-2 text-[0.92rem] font-semibold transition ${text}`}
      aria-expanded={open === k}
      onClick={() => setOpen(open === k ? null : k)}
      onMouseEnter={() => setOpen(k)}
    >
      {label}
      <ChevronDown className={`h-4 w-4 transition ${open === k ? "rotate-180" : ""}`} />
    </button>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        overDark ? "bg-transparent" : "border-b border-line bg-white/90 backdrop-blur-md"
      }`}
      onMouseLeave={() => setOpen(null)}
    >
      <div className="wrap flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <Link href="/" aria-label="Telleo by Vacademy, home" className="flex shrink-0 items-end gap-2">
          <Logo className="h-7 w-auto md:h-8" tone={overDark ? "light" : "dark"} />
          <span className={`pb-0.5 text-[0.7rem] font-semibold tracking-wide md:text-xs ${overDark ? "text-slate-400" : "text-slate-500"}`}>
            by Vacademy
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
          <Trigger k="product" label="Product" />
          <Trigger k="solutions" label="Solutions" />
          <Link href="/pricing/" className={`rounded-full px-3 py-2 text-[0.92rem] font-semibold transition ${text}`} onMouseEnter={() => setOpen(null)}>
            Pricing
          </Link>
          <Link href="/compare/" className={`rounded-full px-3 py-2 text-[0.92rem] font-semibold transition ${text}`} onMouseEnter={() => setOpen(null)}>
            Compare
          </Link>
          <Trigger k="resources" label="Resources" />
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a href={`tel:${TEST_LINE}`} className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition ${text}`} data-track="call_test_line">
            <PhoneCall className="h-4 w-4 text-brand" />
            <span className="hidden xl:inline">Talk to our AI:</span> {TEST_LINE_DISPLAY}
          </a>
          <Link href={bookHref()} className="btn btn-primary !py-2.5" data-track="book_demo">
            Book a demo
          </Link>
        </div>

        <button
          type="button"
          className={`grid h-10 w-10 place-items-center rounded-full lg:hidden ${overDark ? "text-white" : "text-ink"}`}
          aria-label={mobile ? "Close menu" : "Open menu"}
          aria-expanded={mobile}
          onClick={() => setMobile((m) => !m)}
        >
          {mobile ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Desktop mega menus: always in the HTML (crawlable links), shown only when opened. */}
      <div className={`absolute inset-x-0 top-full hidden border-b border-line bg-white shadow-[0_30px_60px_-30px_rgba(10,15,28,0.35)] ${open ? "lg:block" : ""}`}>
          <div className="wrap py-8">
              <div hidden={open !== "product"}><div className="grid grid-cols-[1fr_1fr_18rem] gap-8">
                <ul className="col-span-2 grid grid-cols-2 gap-2">
                  {PRODUCT_NAV.map((p) => (
                    <li key={p.href}>
                      <Link href={p.href} className="block rounded-xl p-4 transition hover:bg-paper">
                        <span className="font-bold text-ink">{p.label}</span>
                        <span className="mt-1 block text-sm text-slate-500">{p.desc}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="rounded-2xl bg-ink p-6 text-white">
                  <p className="text-sm font-bold text-brand-300">How a call works</p>
                  <p className="mt-2 text-sm text-slate-300">From the lead arriving to the meeting on your calendar, step by step.</p>
                  <Link href="/how-it-works/" className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-white hover:text-brand-300">
                    See how it works <ArrowRight className="h-4 w-4" />
                  </Link>
                </div></div>
              </div>
              <div hidden={open !== "solutions"}><div className="grid grid-cols-2 gap-10">
                <div>
                  <p className="eyebrow">By use case</p>
                  <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1">
                    {USE_CASE_NAV.map((u) => (
                      <li key={u.slug}>
                        <Link href={`/use-cases/${u.slug}/`} className="block rounded-lg px-2 py-1.5 text-[0.95rem] text-slate-700 hover:bg-paper hover:text-ink">{u.label}</Link>
                      </li>
                    ))}
                  </ul>
                  <Link href="/use-cases/" className="mt-3 inline-flex items-center gap-1 px-2 text-sm font-bold text-brand-700">All use cases <ArrowRight className="h-4 w-4" /></Link>
                </div>
                <div>
                  <p className="eyebrow">By industry</p>
                  <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1">
                    {INDUSTRY_NAV.map((u) => (
                      <li key={u.slug}>
                        <Link href={`/industries/${u.slug}/`} className="block rounded-lg px-2 py-1.5 text-[0.95rem] text-slate-700 hover:bg-paper hover:text-ink">{u.label}</Link>
                      </li>
                    ))}
                  </ul>
                  <Link href="/industries/" className="mt-3 inline-flex items-center gap-1 px-2 text-sm font-bold text-brand-700">All industries <ArrowRight className="h-4 w-4" /></Link>
                </div></div>
              </div>
              <div hidden={open !== "resources"}><div className="grid grid-cols-[1fr_1fr] gap-10">
                <ul className="grid grid-cols-2 gap-1">
                  {RESOURCE_NAV.map((r) => (
                    <li key={r.href}>
                      <Link href={r.href} className="block rounded-lg px-3 py-2 font-semibold text-slate-700 hover:bg-paper hover:text-ink">{r.label}</Link>
                    </li>
                  ))}
                </ul>
                <div>
                  <p className="eyebrow">Comparisons</p>
                  <ul className="mt-3 space-y-1">
                    {COMPARE_NAV.map((c) => (
                      <li key={c.slug}>
                        <Link href={`/compare/${c.slug}/`} className="block rounded-lg px-2 py-1.5 text-[0.95rem] text-slate-700 hover:bg-paper hover:text-ink">{c.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div></div>
              </div>
          </div>
        </div>

      {/* Mobile drawer */}
      {mobile && (
        <div className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-white lg:hidden">
          <div className="wrap space-y-6 py-6">
            <MobileGroup title="Product" items={PRODUCT_NAV.map((p) => ({ href: p.href, label: p.label }))} />
            <MobileGroup title="Use cases" items={USE_CASE_NAV.map((u) => ({ href: `/use-cases/${u.slug}/`, label: u.label }))} />
            <MobileGroup title="Industries" items={INDUSTRY_NAV.map((u) => ({ href: `/industries/${u.slug}/`, label: u.label }))} />
            <MobileGroup
              title="Company & resources"
              items={[{ href: "/pricing/", label: "Pricing" }, ...RESOURCE_NAV.map((r) => ({ href: r.href, label: r.label }))]}
            />
            <div className="grid gap-3 pb-8">
              <Link href={bookHref()} className="btn btn-primary btn-lg w-full" data-track="book_demo">Book a demo</Link>
              <a href={`tel:${TEST_LINE}`} className="btn btn-outline btn-lg w-full" data-track="call_test_line">
                <PhoneCall className="h-4 w-4 text-brand-700" /> Talk to our AI: {TEST_LINE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function MobileGroup({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <details className="group border-b border-line pb-4" open={title === "Product"}>
      <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-bold text-ink [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown className="h-5 w-5 transition group-open:rotate-180" />
      </summary>
      <ul className="mt-3 grid grid-cols-1 gap-1 sm:grid-cols-2">
        {items.map((i) => (
          <li key={i.href}>
            <Link href={i.href} className="block rounded-lg py-2 text-slate-700">{i.label}</Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
