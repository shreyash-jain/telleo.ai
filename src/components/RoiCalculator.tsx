"use client";

import { useMemo, useState } from "react";
import { RATE_ANNUAL } from "@/content/pricing";

const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

function Slider({
  label, hint, value, min, max, step, onChange, format,
}: { label: string; hint?: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; format: (v: number) => string }) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-semibold text-slate-200">{label}</span>
        <span className="font-mono text-sm font-semibold text-brand-300">{format(value)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-[#14c47c]"
      />
      {hint && <span className="mt-1.5 block text-xs text-slate-500">{hint}</span>}
    </label>
  );
}

export function RoiCalculator() {
  const [leads, setLeads] = useState(3000);
  const [connect, setConnect] = useState(55);
  const [mins, setMins] = useState(2);
  const [salary, setSalary] = useState(22000);
  const [perDay, setPerDay] = useState(120);

  const r = useMemo(() => {
    const connected = leads * (connect / 100);
    const minutes = connected * mins;
    const telleo = minutes * RATE_ANNUAL + 19999 / 12;
    const callers = Math.max(1, Math.ceil(leads / (perDay * 25)));
    const team = callers * salary;
    return { connected, minutes, telleo, callers, team, perLead: telleo / Math.max(1, leads) };
  }, [leads, connect, mins, salary, perDay]);

  return (
    <div className="grid overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink-2 lg:grid-cols-[1.1fr_1fr]">
      <div className="space-y-6 p-6 md:p-8">
        <Slider label="New leads per month" value={leads} min={200} max={30000} step={100} onChange={setLeads} format={(v) => v.toLocaleString("en-IN")} />
        <Slider label="Share of calls answered" hint="Your connect rate. Unanswered calls are not billed; workflow calls retry them automatically." value={connect} min={20} max={90} step={5} onChange={setConnect} format={(v) => `${v}%`} />
        <Slider label="Billed minutes per answered call" hint="Calls bill in 30-second pulses, so a 1 min 10 s call counts as 1.5." value={mins} min={0.5} max={8} step={0.5} onChange={setMins} format={(v) => `${v} min`} />
        <Slider label="Your cost per telecaller per month" hint="Salary plus overheads. Use your own number." value={salary} min={10000} max={60000} step={1000} onChange={setSalary} format={inr} />
        <Slider label="Leads one telecaller can call per day" hint="Assumes 25 working days a month." value={perDay} min={40} max={250} step={10} onChange={setPerDay} format={(v) => `${v}`} />
      </div>
      <div className="flex flex-col justify-between gap-6 border-t border-white/10 bg-white/[0.03] p-6 md:p-8 lg:border-l lg:border-t-0">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Telleo on the annual plan</p>
          <p className="h-display mt-2 text-5xl text-white">{inr(r.telleo)}<span className="text-lg font-semibold text-slate-400">/month</span></p>
          <p className="mt-2 text-sm text-slate-400">
            {Math.round(r.minutes).toLocaleString("en-IN")} minutes at ₹{RATE_ANNUAL}/min + the ₹19,999 yearly fee spread over 12 months. About {inr(r.perLead)} per lead.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white/[0.05] p-4">
            <p className="text-xs text-slate-400">Telecallers to call every lead once</p>
            <p className="mt-1 text-2xl font-extrabold text-white">{r.callers}</p>
            <p className="whitespace-nowrap text-xs text-slate-500">≈&nbsp;{inr(r.team)}/mo</p>
          </div>
          <div className="rounded-2xl bg-white/[0.05] p-4">
            <p className="text-xs text-slate-400">First call after a lead arrives</p>
            <p className="mt-1 text-2xl font-extrabold text-brand-300">~60 s</p>
            <p className="text-xs text-slate-500">inside your calling hours</p>
          </div>
        </div>
        <p className="text-xs leading-relaxed text-slate-500">
          An estimate, not a quote. Excludes 18% GST, DLT registration and WhatsApp template fees. Keep your best people
          for the hot leads Telleo hands over; the saving is in the dialling, not the closing.
        </p>
      </div>
    </div>
  );
}
