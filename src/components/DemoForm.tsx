"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, MessageCircle, PhoneCall } from "lucide-react";
import { submitDemoLead } from "@/lib/leadSubmit";
import { track } from "@/lib/track";
import { TEST_LINE, TEST_LINE_DISPLAY, whatsappHref } from "@/lib/site";

const INDUSTRIES = [
  "Education & admissions", "Real estate", "Healthcare & clinics", "Lending & NBFC", "Insurance",
  "E-commerce & D2C", "Automotive", "Travel & hospitality", "Recruitment & staffing", "Other",
];
const JOBS = [
  "Qualify new leads", "Call leads within a minute", "Book appointments / demos", "Payment & EMI reminders",
  "Reactivate old leads", "Answer inbound calls", "Surveys & feedback", "Analyse my team's calls", "Not sure yet",
];
const VOLUMES = ["Under 1,000", "1,000 – 5,000", "5,000 – 20,000", "20,000+"];

const field =
  "w-full rounded-xl border border-line bg-white px-3.5 py-3 text-[0.95rem] text-ink placeholder:text-slate-400 outline-none transition focus:border-brand-600 focus:ring-4 focus:ring-brand/15";

export function DemoForm({ compact = false, source = "form" }: { compact?: boolean; source?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [dup, setDup] = useState(false);
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) || "").trim();
    const phone = get("phone").replace(/\D/g, "");
    if (!get("name") || !/^\S+@\S+\.\S+$/.test(get("email")) || phone.length < 8) {
      setErr("Please add your name, a work email and a phone number.");
      return;
    }
    setErr("");
    setState("sending");
    const res = await submitDemoLead({
      name: get("name"),
      email: get("email"),
      phone,
      countryCode: get("cc") || "+91",
      company: get("company"),
      industry: get("industry"),
      job: get("job"),
      volume: get("volume"),
      message: get("message"),
    });
    if (res.ok) {
      setDup(Boolean(res.duplicate));
      setState("done");
      track("demo_request", { source, industry: get("industry"), job: get("job") });
    } else {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-2xl border border-brand-200 bg-brand-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-brand-700" />
        <p className="mt-4 text-xl font-extrabold text-ink">{dup ? "Welcome back. Your details are already with us." : "Got it. We'll call you within one working day."}</p>
        <p className="mt-2 text-slate-600">
          Want to hear the agent right now? Ring our test line and talk to it in Hindi, English or Hinglish.
        </p>
        <a href={`tel:${TEST_LINE}`} className="btn btn-dark mt-5" data-track="call_test_line">
          <PhoneCall className="h-4 w-4 text-brand" /> {TEST_LINE_DISPLAY}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3" noValidate>
      <div className={`grid gap-3 ${compact ? "" : "sm:grid-cols-2"}`}>
        <label className="block">
          <span className="sr-only">Your name</span>
          <input name="name" autoComplete="name" placeholder="Your name *" className={field} required />
        </label>
        <label className="block">
          <span className="sr-only">Work email</span>
          <input name="email" type="email" autoComplete="email" placeholder="Work email *" className={field} required />
        </label>
        <div className="flex gap-2">
          <label className="w-24 shrink-0">
            <span className="sr-only">Country code</span>
            <select name="cc" defaultValue="+91" className={field}>
              <option value="+91">+91</option>
              <option value="+971">+971</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
              <option value="+65">+65</option>
            </select>
          </label>
          <label className="block flex-1">
            <span className="sr-only">Phone</span>
            <input name="phone" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="Phone *" className={field} required />
          </label>
        </div>
        <label className="block">
          <span className="sr-only">Company</span>
          <input name="company" autoComplete="organization" placeholder="Company" className={field} />
        </label>
        <label className="block">
          <span className="sr-only">Industry</span>
          <select name="industry" defaultValue="" className={field}>
            <option value="" disabled>Industry</option>
            {INDUSTRIES.map((x) => <option key={x}>{x}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="sr-only">What should the agent do?</span>
          <select name="job" defaultValue="" className={field}>
            <option value="" disabled>What should the agent do?</option>
            {JOBS.map((x) => <option key={x}>{x}</option>)}
          </select>
        </label>
        <label className={`block ${compact ? "" : "sm:col-span-2"}`}>
          <span className="sr-only">Leads or calls per month</span>
          <select name="volume" defaultValue="" className={field}>
            <option value="" disabled>Leads or calls per month</option>
            {VOLUMES.map((x) => <option key={x}>{x}</option>)}
          </select>
        </label>
        {!compact && (
          <label className="block sm:col-span-2">
            <span className="sr-only">Anything we should know?</span>
            <textarea name="message" rows={3} placeholder="Anything we should know? Languages, your current script, CRM…" className={field} />
          </label>
        )}
      </div>
      {err && <p className="text-sm font-medium text-rose">{err}</p>}
      {state === "error" && (
        <p className="text-sm text-rose">
          That didn&apos;t go through. Please try again, or{" "}
          <a className="font-semibold underline" href={whatsappHref()} target="_blank" rel="noopener noreferrer">message us on WhatsApp</a>.
        </p>
      )}
      <button type="submit" disabled={state === "sending"} className="btn btn-primary btn-lg w-full disabled:opacity-70" data-track="demo_submit">
        {state === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {state === "sending" ? "Sending…" : "Book my demo"} {state !== "sending" && <ArrowRight className="h-4 w-4" />}
      </button>
      <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-xs text-slate-500">
        <span>20 minutes · a real call on your use case · no obligation</span>
        <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-brand-700" data-track="whatsapp">
          <MessageCircle className="h-3.5 w-3.5" /> Prefer WhatsApp?
        </a>
      </p>
    </form>
  );
}
