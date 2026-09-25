import { CalendarCheck, MessageCircle, PhoneCall } from "lucide-react";
import { pageMetadata } from "@/components/PageShell";
import { DemoForm } from "@/components/DemoForm";
import { SamplePlayer } from "@/components/Interactive";
import { Breadcrumbs, Check } from "@/components/ui";
import { TEST_LINE, TEST_LINE_DISPLAY, WHATSAPP_DISPLAY, whatsappHref } from "@/lib/site";

export const metadata = pageMetadata("/demo/");

export default function Page() {
  return (
    <main className="relative overflow-hidden bg-ink text-white">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="glow-brand pointer-events-none absolute -left-40 top-20 h-[36rem] w-[36rem] opacity-60" />
      <div className="wrap relative grid gap-12 py-12 md:py-20 lg:grid-cols-[1fr_1.1fr] lg:items-start [&>*]:min-w-0">
        <div>
          <div className="[&_a]:text-slate-400 [&_a:hover]:text-white [&_span]:text-slate-400">
            <Breadcrumbs items={[{ label: "Book a demo" }]} />
          </div>
          <p className="eyebrow eyebrow-dark mt-8">Book a demo</p>
          <h1 className="h-display mt-3 text-4xl md:text-[3.3rem]">Hear Telleo call you with your own script.</h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-300">
            20 minutes with our team. Tell us who you call and why; we&apos;ll set up an agent around it, ring your phone, and walk you through the outcome, the transcript and the dashboard.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "A live call in Hindi, English or Hinglish",
              "Your questions, outcomes and handover rules",
              "What your volume would cost, in writing",
              "No obligation, no card",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3 text-slate-200"><Check /> {t}</li>
            ))}
          </ul>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            <a href={`tel:${TEST_LINE}`} className="card-dark flex items-center gap-3 p-4 hover:bg-white/[0.06]" data-track="call_test_line">
              <PhoneCall className="h-5 w-5 text-brand" />
              <span><span className="block text-xs text-slate-400">Talk to an agent now</span><span className="font-bold">{TEST_LINE_DISPLAY}</span></span>
            </a>
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="card-dark flex items-center gap-3 p-4 hover:bg-white/[0.06]" data-track="whatsapp">
              <MessageCircle className="h-5 w-5 text-brand" />
              <span><span className="block text-xs text-slate-400">WhatsApp sales</span><span className="font-bold">{WHATSAPP_DISPLAY}</span></span>
            </a>
          </div>
          <div className="mt-6 max-w-md"><SamplePlayer /></div>
        </div>
        <div className="rounded-[1.75rem] bg-white p-6 text-ink shadow-2xl md:p-8">
          <p className="flex items-center gap-2 text-lg font-extrabold"><CalendarCheck className="h-5 w-5 text-brand-700" /> Tell us about your calls</p>
          <p className="mt-1 text-sm text-slate-500">We reply within one working day.</p>
          <div className="mt-6"><DemoForm source="demo_page" /></div>
        </div>
      </div>
    </main>
  );
}
