import Link from "next/link";
import { ResearchShell, KeyStat, fmt, type Source } from "@/components/research/ResearchShell";
import { BarChart, DataTable, Figure, LandscapeMap, Legend } from "@/components/research/charts";
import {
  ALL_CAPS, CAP_LABELS, CONVERSATION_CAPS, LANDSCAPE_CSV, LANDSCAPE_SLUG, OTHERS, PHONE_MAP_LABELS, RESEARCH_PUBLISHED,
  RESEARCH_UPDATED, SEGMENT_LABELS, TELLEO, VENDORS, WORKFLOW_CAPS, averageBreadth, capCount, formatEntryPrice,
  formatPerMinute, landscapeMapPoints, primarySource, type CapValue, type Vendor,
} from "@/content/research/landscape";
import { CHANGES, FIT } from "@/content/research/notes";
import { pageMetadata } from "@/components/PageShell";

const PATH = `/research/${LANDSCAPE_SLUG}/`;
export const metadata = pageMetadata(PATH);

const MARK: Record<CapValue, { glyph: string; text: string; className: string }> = {
  yes: { glyph: "●", text: "Yes", className: "text-ink" },
  partial: { glyph: "◐", text: "Partial", className: "text-slate-600" },
  no: { glyph: "○", text: "No", className: "text-slate-400" },
  unknown: { glyph: "–", text: "Not documented", className: "text-slate-400" },
};

const pct = (n: number, d: number) => `${Math.round((n / d) * 100)}%`;
const names = (vs: Vendor[]) => vs.map((v) => v.name).join(", ");

export default function Page() {
  const n = OTHERS.length;
  const sorted = [...VENDORS].sort((a, b) => b.breadth - a.breadth || a.name.localeCompare(b.name));
  const runnerUp = sorted.find((v) => v.region !== "telleo")!;
  const tiedRunnersUp = sorted.filter((v) => v.region !== "telleo" && v.breadth === runnerUp.breadth);
  const india = OTHERS.filter((v) => v.region === "india");
  const global = OTHERS.filter((v) => v.region === "global");
  const perMinute = (vs: Vendor[]) => vs.filter((v) => v.pricing.per_minute_from?.amount != null).length;
  const fullStack = OTHERS.filter((v) => v.conversation >= 50 && v.workflow >= 50);
  const hinglishGlobal = capCount("hindi_hinglish", "yes", global);
  const hinglishIndia = capCount("hindi_hinglish", "yes", india);
  const crmAndCalls = OTHERS.filter((v) => v.capabilities.built_in_crm.value === "yes" && v.capabilities.outbound_inbound.value === "yes");

  const segments: [string, (v: Vendor) => boolean, "india" | "global"][] = (
    [
      ["Indian voice-agent platforms", (v) => v.region === "india" && v.segment === "voice-agent-platform", "india"],
      ["Indian enterprise conversational AI", (v) => v.region === "india" && v.segment === "enterprise-conversational-ai", "india"],
      ["Indian cloud telephony & contact centre", (v) => v.region === "india" && v.segment === "ccaas-telephony", "india"],
      ["CRMs with AI calling", (v) => v.segment === "crm-with-ai-calling", "india"],
      ["Global developer platforms", (v) => v.region === "global" && v.segment === "developer-platform", "global"],
      ["Global voice-agent platforms", (v) => v.region === "global" && v.segment === "voice-agent-platform", "global"],
      ["Global contact-centre software", (v) => v.region === "global" && v.segment === "ccaas-telephony", "global"],
      ["Global enterprise conversational AI", (v) => v.region === "global" && v.segment === "enterprise-conversational-ai", "global"],
      ["Conversation intelligence", (v) => v.segment === "conversation-intelligence", "global"],
    ] as [string, (v: Vendor) => boolean, "india" | "global"][]
  ).filter(([, f]) => OTHERS.some(f));

  const sources: Source[] = VENDORS.map((v, i) => ({
    id: String(i + 1),
    title: `${v.name}: product, pricing and documentation pages`,
    publisher: v.region === "telleo" ? "Telleo (self-assessed)" : v.name,
    url: primarySource(v),
    type: "Vendor" as const,
  }));
  const srcId = (name: string) => String(VENDORS.findIndex((v) => v.name === name) + 1);

  return (
    <ResearchShell
      slug={LANDSCAPE_SLUG}
      eyebrow="Telleo Research · Platform landscape"
      title={`Voice AI Platform Landscape 2026: ${VENDORS.length} AI Calling Platforms Compared`}
      dek={`We compared ${VENDORS.length} AI voice-calling platforms from India and abroad on 14 capabilities: what the agent can do on the call, and what happens around it. Most vendors build a good conversation; few run the follow-up. Only ${capCount("built_in_crm")} of the ${n} other vendors document a built-in CRM, ${capCount("lead_source_connectors")} document native lead-ad connectors, and ${capCount("whatsapp_followup")} document native WhatsApp follow-up.`}
      published={RESEARCH_PUBLISHED}
      updated={RESEARCH_UPDATED}
      sources={sources}
      dataset={{
        name: "Voice AI Platform Landscape 2026",
        description: `Capability coverage (14 capabilities), entry and per-minute pricing, languages and ratings for ${VENDORS.length} AI voice-calling platforms in India and abroad, with a source per vendor.`,
        csv: LANDSCAPE_CSV,
        keywords: ["AI voice agent comparison", "AI calling platform India", "voice AI vendors", "Hindi voice bot", "AI telecaller", "conversational AI"],
      }}
    >
      <h2 id="key-findings">Key findings</h2>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <KeyStat value={`${capCount("built_in_crm")} of ${n}`} label="vendors document a built-in CRM with lead stages; most expect you to push call results into another CRM." />
        <KeyStat value={`${capCount("lead_source_connectors")} of ${n}`} label="document native connectors that call a lead straight from a Meta or Google lead form, without Zapier." />
        <KeyStat value={`${capCount("whatsapp_followup")} of ${n}`} label="document native WhatsApp follow-up tied to the call, the channel Indian leads actually reply on." />
        <KeyStat value={`${hinglishIndia} of ${india.length}`} label={`Indian vendors document Hindi and Hinglish conversations, against ${hinglishGlobal} of ${global.length} global vendors.`} />
        <KeyStat value={`${perMinute(india)} of ${india.length}`} label={`Indian vendors publish a per-minute price, against ${perMinute(global)} of ${global.length} global vendors.`} />
        <KeyStat value={`${runnerUp.breadth} of 14`} label={`capabilities: the widest coverage among other vendors (${names(tiedRunnersUp)}).`} />
      </div>

      <h2 id="map">The Telleo Voice AI Platform Map</h2>
      <p>
        Each vendor is placed by how much of the call itself it covers (left to right: languages, directions, transfer,
        mid-call actions, no-code building, API) and how much of the business workflow around the call it covers (bottom
        to top: CRM, lead sources, WhatsApp, post-call analysis, QA, human-call analysis, Indian telephony). Scores come only
        from what each vendor documents publicly; the method is below. Telleo appears on the map with the same rubric,
        scored from its own product pages.
      </p>
      <Figure
        id="platform-map"
        title="Conversation coverage vs. business-workflow coverage, 2026"
        subtitle={`${VENDORS.length} platforms. Conversation: ${CONVERSATION_CAPS.map((k) => CAP_LABELS[k]).join(", ")}. Workflow: ${WORKFLOW_CAPS.map((k) => CAP_LABELS[k]).join(", ")}.`}
        source={<>Source: Telleo Research, vendor websites and documentation read on {fmt(RESEARCH_UPDATED)}. Yes = 1, partial = 0.5, not documented = 0. Hover a point for its scores; the full table is below.</>}
        table={
          <DataTable
            head={["Vendor", "Region", "Conversation %", "Workflow %", "Of 14"]}
            rows={sorted.map((v) => [v.name, v.region === "global" ? "Global" : "India", v.conversation, v.workflow, v.breadth])}
          />
        }
      >
        <Legend keys={["telleo", "india", "global"]} />
        <div className="hidden sm:block">
          <LandscapeMap
            ariaLabel={`Map of ${VENDORS.length} AI calling platforms by conversation and business-workflow coverage. Telleo scores ${TELLEO.conversation}% and ${TELLEO.workflow}%; the next widest is ${runnerUp.name} at ${runnerUp.breadth} of 14 capabilities.`}
            xLabel="Conversation coverage"
            yLabel="Business-workflow coverage"
            zones={["Workflow-first", "Full-stack", "Point tools", "Conversation-first"]}
            points={landscapeMapPoints()}
          />
        </div>
        <div className="sm:hidden">
          <LandscapeMap
            ariaLabel={`Map of ${VENDORS.length} AI calling platforms by conversation and business-workflow coverage.`}
            xLabel="Conversation"
            yLabel="Workflow"
            zones={["Workflow-first", "Full-stack", "Point tools", "Conversation-first"]}
            points={landscapeMapPoints(PHONE_MAP_LABELS)}
            textScale={1.5}
            minWidthClass="min-w-0"
          />
        </div>
      </Figure>
      <p>
        {fullStack.length === 0
          ? `None of the ${n} other vendors reaches half of both axes.`
          : `${fullStack.length} of the ${n} other vendors reach at least half of both axes (${names(fullStack)}).`}{" "}
        Developer platforms sit in the conversation-first corner: strong agents and APIs, but the CRM, lead sources and
        follow-up are left for you to build. Cloud telephony, contact-centre and conversation-intelligence products lean
        the other way: they analyse and route calls well, and AI agents are newer for them.
      </p>

      <h2 id="capability-gaps">Which capabilities are rare</h2>
      <Figure
        id="capability-adoption"
        title={`Share of ${n} vendors that document each capability natively`}
        subtitle="Telleo excluded. Partial support (an add-on, an integration or a limited version) is in the table."
        source={<>Source: Telleo Research, vendor documentation, {fmt(RESEARCH_UPDATED)}.</>}
        table={
          <DataTable
            head={["Capability", "Native (yes)", "Partial", "Share native"]}
            rows={ALL_CAPS.map((k) => [CAP_LABELS[k], capCount(k), capCount(k, "partial"), pct(capCount(k), n)])}
          />
        }
      >
        <BarChart
          ariaLabel="Share of vendors documenting each capability natively"
          max={100}
          rows={[...ALL_CAPS]
            .sort((a, b) => capCount(b) - capCount(a))
            .map((k) => ({ label: CAP_LABELS[k], value: (capCount(k) / n) * 100, series: "india" as const, display: `${pct(capCount(k), n)} (${capCount(k)} of ${n})` }))}
        />
      </Figure>
      <p>
        Outbound and inbound calling ({capCount("outbound_inbound")} of {n}), APIs ({capCount("api_webhooks")}) and post-call
        analysis ({capCount("post_call_analysis")}) are now common. What decides whether a call turns into revenue is much
        rarer: a CRM the call writes into ({capCount("built_in_crm")}), leads that arrive from ads without glue code
        ({capCount("lead_source_connectors")}), WhatsApp follow-up ({capCount("whatsapp_followup")}) and Indian numbers
        supplied by the vendor ({capCount("telephony_included")}). Only {crmAndCalls.length} vendor
        {crmAndCalls.length === 1 ? "" : "s"} document both AI calls in both directions and a built-in CRM
        {crmAndCalls.length > 0 ? ` (${names(crmAndCalls)})` : ""}. A team that needs the whole loop today usually buys
        a voice platform, a CRM and a WhatsApp provider, and connects them itself.
      </p>

      <h2 id="by-type">Coverage by type of platform</h2>
      <Figure
        id="coverage-by-type"
        title="Average capabilities covered, out of 14, by type of platform"
        source={<>Source: Telleo Research, {fmt(RESEARCH_UPDATED)}. Averages of the scores in the matrix below.</>}
        table={
          <DataTable
            head={["Type", "Vendors", "Average of 14"]}
            rows={[
              ...segments.map(([label, f]) => { const a = averageBreadth(f); return [label, a.n, a.avg.toFixed(1)]; }),
              ["Telleo", 1, TELLEO.breadth.toFixed(1)],
            ]}
          />
        }
      >
        <BarChart
          ariaLabel="Average capabilities covered by type of platform"
          max={14}
          rows={[
            ...segments.map(([label, f, s]) => { const a = averageBreadth(f); return { label, value: a.avg, series: s, display: `${a.avg.toFixed(1)} of 14 (${a.n})` }; }),
            { label: "Telleo", value: TELLEO.breadth, series: "telleo" as const, display: `${TELLEO.breadth} of 14` },
          ]}
        />
      </Figure>

      <h2 id="matrix">Full capability matrix</h2>
      <p>
        ● yes · ◐ partial (add-on, integration, higher plan or limited) · ○ not offered · – not documented publicly. Sorted
        by capabilities covered. Hover a symbol for the evidence; the CSV has every value and its source.
      </p>
      {/* relative: the sr-only cell labels are position:absolute and would
          otherwise escape the scroll box and widen the whole page on phones. */}
      <div className="relative mt-6 overflow-x-auto rounded-2xl border border-line bg-white" tabIndex={0} role="region" aria-label="Capability matrix">
        <table className="w-full min-w-[1100px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line align-bottom">
              <th scope="col" className="sticky left-0 z-10 bg-white p-3 font-semibold text-ink">Vendor</th>
              {ALL_CAPS.map((k) => (
                <th key={k} scope="col" className="p-2 text-center text-xs font-semibold text-slate-600">{CAP_LABELS[k]}</th>
              ))}
              <th scope="col" className="p-2 text-center text-xs font-semibold text-ink">Of 14</th>
              <th scope="col" className="p-2 text-xs font-semibold text-ink">Lowest per-minute price</th>
              <th scope="col" className="p-2 text-xs font-semibold text-ink">Entry price</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((v) => (
              <tr key={v.name} className={`border-b border-line/60 ${v.region === "telleo" ? "bg-brand-50" : ""}`}>
                <th scope="row" className={`sticky left-0 z-10 p-3 font-medium text-ink ${v.region === "telleo" ? "bg-brand-50" : "bg-white"}`}>
                  <a href={`#src-${srcId(v.name)}`} className="hover:text-brand-700">{v.name}</a>
                  <span className="block text-xs font-normal text-slate-500">{SEGMENT_LABELS[v.segment] ?? v.segment} · {v.hq ?? (v.region === "global" ? "Global" : "India")}</span>
                </th>
                {ALL_CAPS.map((k) => {
                  const c = v.capabilities[k];
                  const m = MARK[c.value] ?? MARK.unknown;
                  return (
                    <td key={k} className={`p-2 text-center text-base ${m.className}`} title={`${CAP_LABELS[k]}: ${m.text}${c.evidence ? ` — ${c.evidence}` : ""}`}>
                      <span aria-hidden="true">{m.glyph}</span>
                      <span className="sr-only">{m.text}</span>
                    </td>
                  );
                })}
                <td className="p-2 text-center font-semibold text-ink">{v.breadth}</td>
                <td className="p-2 text-xs text-slate-600">
                  {formatPerMinute(v)}
                  {v.pricing.per_minute_scope && <span className="block text-[11px] leading-snug text-slate-500">{v.pricing.per_minute_scope}</span>}
                </td>
                <td className="p-2 text-xs text-slate-600">{formatEntryPrice(v)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-slate-500">
        Prices are copied as each vendor publishes them, in their own currency, and rarely include the same things: some
        include telephony, speech and the language model, others charge for each separately. The line under each per-minute price says what it
        covers; the CSV has the full notes. Read them before comparing two numbers.
      </p>

      <h2 id="changes">What changed in 2025-26</h2>
      <ul>
        {CHANGES.map(([who, what, url]) => (
          <li key={who}>
            <strong>{who}:</strong> {what}{" "}
            <a href={url} target="_blank" rel="noopener nofollow" className="text-sm text-brand-700 underline underline-offset-2">source</a>
          </li>
        ))}
      </ul>

      <h2 id="fit">When another platform is the better fit</h2>
      <p>Breadth is not the only thing that matters. Based on this research, these needs are better served elsewhere:</p>
      <ul>
        {FIT.map(([need, answer]) => (
          <li key={need}><strong>{need}:</strong> {answer}</li>
        ))}
      </ul>

      <h2 id="method">Method</h2>
      <ul>
        <li><strong>Vendors:</strong> {VENDORS.length} platforms that Indian sales, admissions and support teams shortlist for AI calling: Indian voice-agent startups, Indian enterprise conversational AI, Indian cloud telephony and CRMs that added AI calling, global developer platforms, global business voice agents, contact-centre suites and conversation-intelligence tools. Air AI was on the list, but air.ai no longer hosts a voice-agent product, so it is not scored.</li>
        <li><strong>Evidence:</strong> each vendor&apos;s own product, pricing, documentation and help pages, read on {fmt(RESEARCH_UPDATED)}. Funding and 2025-26 events come from company announcements and business press. Review-site ratings are in the CSV and were never used as evidence of a capability.</li>
        <li><strong>Scoring:</strong> yes = 1, partial = 0.5, not offered or not documented = 0. The conversation axis covers {CONVERSATION_CAPS.length} capabilities and the workflow axis {WORKFLOW_CAPS.length}; each is shown as a percentage. The definition of yes and partial for every capability is in the table below.</li>
        <li><strong>Telleo</strong> is scored with the same rubric from its own public product pages. It is the publisher of this report, so treat its position as a vendor claim you can check: it scores partial on Indian languages beyond Hindi and English (set up on request) and partial on mid-call actions (it can send a WhatsApp during the call, but has no general tool calling).</li>
      </ul>
      <div className="relative mt-6 overflow-x-auto rounded-2xl border border-line bg-white" tabIndex={0} role="region" aria-label="Scoring rubric">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="p-3 font-semibold text-ink">Capability</th>
              <th scope="col" className="p-3 font-semibold text-ink">Yes means</th>
              <th scope="col" className="p-3 font-semibold text-ink">Partial means</th>
            </tr>
          </thead>
          <tbody>
            {RUBRIC.map(([k, yes, partial]) => (
              <tr key={k} className="border-b border-line/60 align-top">
                <th scope="row" className="p-3 font-medium text-ink">{CAP_LABELS[k]}</th>
                <td className="p-3 text-slate-600">{yes}</td>
                <td className="p-3 text-slate-600">{partial}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3>Limits</h3>
      <ul>
        <li>The map measures breadth, not depth or quality. A vendor with one excellent capability can score lower than one with many basic ones, and none of this measures how natural an agent sounds. Call each vendor&apos;s demo line before you buy.</li>
        <li>&ldquo;Not documented&rdquo; scores zero. A vendor may offer something it does not describe publicly; tell us and we will update the record with a source.</li>
        <li>Enterprise vendors document less in public than self-serve vendors, so they may be under-scored.</li>
        <li>Prices change often and are shown as published, in their own currency, without conversion.</li>
      </ul>
      <p>
        Related: <Link href="/compare/">Telleo compared with telecallers, IVR and other platforms</Link> ·{" "}
        <Link href="/pricing/">Telleo pricing</Link> · <Link href="/research/">All Telleo research</Link>
      </p>
    </ResearchShell>
  );
}

const RUBRIC: [keyof typeof CAP_LABELS, string, string][] = [
  ["hindi_hinglish", "Agent documented to converse in Hindi and in code-mixed Hindi-English", "Hindi only, or Hinglish only through a generic multilingual model"],
  ["indic_languages", "Five or more Indian languages beyond Hindi and English, live", "Two to four, or on request"],
  ["outbound_inbound", "Both outbound and inbound AI calls", "One direction only"],
  ["live_transfer", "Warm or live transfer to a human during the call", "Callback scheduling only, or transfer on enterprise plans only"],
  ["mid_call_actions", "The agent books, calls an API or tool, or sends a message during the call", "One narrow action, or actions only after the call"],
  ["no_code_builder", "Business users build and edit agents without code", "Templates, but editing needs developers, or the builder is in beta"],
  ["api_webhooks", "Public API to start calls or manage agents, and outbound webhooks", "One of the two, or API on request"],
  ["built_in_crm", "Native lead or contact management with stages", "Contact or campaign lists only"],
  ["lead_source_connectors", "Native connectors that start calls from Meta lead ads, Google lead forms or web forms", "Only through Zapier, Make or a generic webhook"],
  ["whatsapp_followup", "Native WhatsApp messages tied to calls", "Through a third party, or SMS only"],
  ["post_call_analysis", "Automatic outcome, summary and extracted fields per call", "Transcript and recording only"],
  ["call_qa", "Automated quality scoring or health flags for the AI agent's calls", "Analytics dashboards only"],
  ["human_call_intelligence", "Transcribes and scores calls made by human reps", "Records or transcribes human calls only"],
  ["telephony_included", "Indian phone numbers and calling supplied by the vendor", "Numbers outside India only, or bring your own carrier for India"],
];
