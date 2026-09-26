import Link from "next/link";
import { ArrowRight, Ear, Gauge, Scale, Wrench } from "lucide-react";
import { PageShell, pageMetadata } from "@/components/PageShell";
import { COMPANY, SALES_EMAIL, TEST_LINE, TEST_LINE_DISPLAY, WHATSAPP_DISPLAY, whatsappHref } from "@/lib/site";

export const metadata = pageMetadata("/about/");

const PRINCIPLES = [
  { I: Ear, t: "Listen to real calls", d: "Every rule in the agent exists because a real call went wrong without it. We judge changes on live phone calls, not demos." },
  { I: Wrench, t: "Fix it in code, not in the prompt", d: "When something must never happen, like repeating a sentence, we enforce it in the pipeline instead of hoping the model obeys." },
  { I: Gauge, t: "Measure honestly", d: "If we couldn't measure something on a call, the dashboard says “not measured”, never zero." },
  { I: Scale, t: "Say what we don't do", d: "No invented case studies, no certifications we don't hold. If a competitor fits you better, our comparison pages say so." },
];

export default function Page() {
  return (
    <PageShell
      path="/about/"
      eyebrow="About"
      h1="Telleo started on the admissions desk."
      lede={`Telleo is built by ${COMPANY}, the team behind Vacademy, a platform education institutes use to run courses, tests, live classes and admissions. Telleo began as the AI calling inside Vacademy's CRM and is now its own product for every business that lives on the phone.`}
    >
      <section className="wrap py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="prose-t">
            <h2 className="!mt-0">Why we built it</h2>
            <p>Institutes buy leads from ads and portals, and research reported in Harvard Business Review found that firms which tried to reach a web lead within an hour were nearly seven times as likely to qualify it as those that tried an hour later. Counsellors can&apos;t call every enquiry within minutes, late in the evening and on Sundays, in the language the parent prefers. So we built an agent that could.</p>
            <p>Admissions calls turned out to be a hard school. Parents interrupt, switch between Hindi and English mid-sentence, say &ldquo;haan&rdquo; while you&apos;re talking, and hang up on anything that sounds like a robot. Every one of those moments became a rule in the product: how it handles interruptions, why it never repeats itself or echoes answers back, how it conjugates Hindi verbs for its own voice, how it reads a phone number.</p>
            <p>The same problems exist in real estate, lending, insurance, healthcare and every other business where leads arrive faster than people can call them. Telleo is that agent, with the CRM, automations and call analysis around it.</p>
          </div>
          <div className="grid content-start gap-4 sm:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <div key={p.t} className="card p-6">
                <p.I className="h-5 w-5 text-brand-700" />
                <p className="mt-3 font-bold text-ink">{p.t}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="border-t border-line bg-paper">
        <div className="wrap grid gap-6 py-16 md:grid-cols-3">
          <div className="card p-6">
            <p className="text-sm font-bold uppercase tracking-wider text-slate-500">Talk to an agent</p>
            <a href={`tel:${TEST_LINE}`} className="mt-2 block text-xl font-extrabold text-ink" data-track="call_test_line">{TEST_LINE_DISPLAY}</a>
            <p className="mt-1 text-sm text-slate-600">A live AI agent answers.</p>
          </div>
          <div className="card p-6">
            <p className="text-sm font-bold uppercase tracking-wider text-slate-500">Sales on WhatsApp</p>
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="mt-2 block text-xl font-extrabold text-ink" data-track="whatsapp">{WHATSAPP_DISPLAY}</a>
            <p className="mt-1 text-sm text-slate-600">Weekdays, Indian business hours.</p>
          </div>
          <div className="card p-6">
            <p className="text-sm font-bold uppercase tracking-wider text-slate-500">Email</p>
            <a href={`mailto:${SALES_EMAIL}`} className="mt-2 block text-xl font-extrabold text-ink">{SALES_EMAIL}</a>
            <Link href="/demo/" className="mt-1 inline-flex items-center gap-1 text-sm font-bold text-brand-700">Or book a demo <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
