# Telleo — product facts (the only claims the site may make)

Telleo is Vacademy's AI voice calling, launched as its own product at telleo.ai.
Everything below was read from the platform code and the CRM docs
(`vacademy_platform/docs/crm/AI_CALLING_SYSTEM.md`, `AI_CALL_ACTIONS.md`,
`CALL_INTELLIGENCE.md`, `AI_CALL_DEEP_REVIEW.md`) on 2026-09-25.
If a sentence on the site is not supported by this file, it should not be on the site.

Company: **Telleo is a product of Vidyayatan Technologies LLP, the makers of Vacademy (vacademy.io).**
WhatsApp sales: +91 99933 36616. Live test line (talk to an AI agent): +91 80353 74489.

---

## 1. Calling

- **Outbound AI calls** start three ways: a workflow step (e.g. "new lead arrives → call it"),
  a bulk campaign over a list, or one click on a lead.
- **New leads can be called within about 60 seconds** of arriving (workflow trigger).
- **Inbound:** an IVR menu option can hand the caller to an AI agent.
- **Live transfer to a human** mid-call (per-agent handoff numbers). The agent says a bridge line, then the call is connected.
- **Telephony is included.** Calls run on Telleo's lines (Plivo) — no SIMs, dialers or telecom contracts.
  Optionally a dedicated AI line (your own Plivo sub-account and caller ID). Your human team can stay on
  Airtel IQ or Exotel for click-to-call; the AI line is separate.
- **Every AI call has a full transcript.** Call **recording is a switch on the calling line**: when it is on (the normal setup), every call is recorded. Say "record every call" only as "recording can be switched on for every call".
- **Guardrails (all real):** daily call cap (default 500/day, configurable); 30-second duplicate
  protection so a lead is never dialled twice by accident; automation skips leads already assigned to a
  rep; maximum call length per agent (default 6 minutes); idle hang-up after two nudges; answering-machine
  detection (a call where nobody really spoke is marked *Incomplete*, never *Not interested*);
  **no balance, no dialling** — calls stop before a bill can run away.
- Campaigns can run inside time windows you choose (workflow time-window conditions).

## 2. Agent builder (no code)

Per agent: name · direction (outbound / inbound / both) · language · voice and speech engine · pace ·
expressiveness · **opening line** · persona / script · **extraction questions** (what every call must find
out) · **dispositions** (your own outcome list) · handoff numbers · max call minutes · booking page.

- The agent knows the lead's name and any fields captured on the form (`{{leadName}}`-style placeholders).
- **AI-assisted scripting:** draft a script from a plain-language brief; score a script against a
  live-call rubric; apply suggested fixes; revise from real post-call feedback.
- **Use-case gallery** of ready templates (admissions, fee reminders, re-engagement, parent updates,
  doubt solving, mentoring — education-first today).
- **Voice preview** plays the exact engine and voice that will go out on the call.
- **Voice library: 80+ voices across 7 speech engines** — Google Chirp3-HD, Sarvam Bulbul, Smallest
  Lightning (standard and Pro), Rumik, Microsoft Edge, Deepgram Aura-2 (English). Male and female.
- **Voice modulation:** Off / Subtle / Conversational / Lively.
- **Languages:** Hindi, English and Hinglish are in production. Tamil, Telugu, Marathi, Bengali, Gujarati,
  Kannada, Malayalam, Punjabi and Odia are supported by the voice engines and are **set up with the customer
  on request** — never claim they are proven in production.

## 3. Conversation quality (built into every agent)

- **Barge-in that works on phone lines.** The caller can interrupt. A short "haan / achha / okay / hello"
  while the agent is talking does **not** derail it — the agent carries on and the "yes" still counts.
- **Never repeats itself** — a sentence already said in the call is not said again.
- **Doesn't parrot answers back** ("okay, so you scored ninety-four…") — the most obvious AI tell. The one
  exception is on purpose: a phone number or a booked day/time is read back once.
- **Correct Hindi grammar:** first-person verbs match the voice's gender (*kar rahi hoon / kar raha hoon*);
  correct honorifics; if the caller's gender is unknown it says "<name> ji" instead of guessing.
- Speaks **everyday phone Hindi**, not textbook Hindi. Hindi is written in Devanagari with English business
  words kept in English, which is what the Indian voice engines pronounce best.
- Time-aware greeting; numbers spoken as words; phone numbers digit by digit.
- **Sounds like a phone call:** telephone-band voice shaping plus a faint room tone, so it does not sound like
  a studio recording.
- If it cannot hear the caller twice, it closes politely instead of apologising in a loop.
- If the caller speaks right after the goodbye, the call stays open (a grace window).
- **The live voice pipeline runs on servers in Mumbai**, next to the Indian phone network.

## 4. After every call

**End-of-call analysis** returns: disposition (from *your* list) · 2–3 sentence summary · lead rating 1–10 ·
extracted answers (only what was actually said) · callback requested + time ("kal shaam" becomes an exact
date and time, saved on the call and shown in the call log) · meeting requested + time.
**Not built:** an automatic re-dial AT the requested callback time. A "Callback" outcome goes on the normal retry
path (fixed gap), and the exact requested time is visible to the team. Never say "calls back at the time the
caller asked".
Guards: a call where the caller said nothing is *Incomplete*; a meeting only counts if a specific day and
time were agreed.

**Actions:**
- Outcome rules: **assign** to a sales rep/counsellor on the dispositions you pick; **stop** on others;
  **retry** unanswered calls with a gap and a maximum number of attempts; when retries run out, hand to a
  human or stop.
- Lead status is stamped (AI qualified / not interested / no answer / retry pending).
- **Auto-books the meeting** on your booking page when a time was agreed.
- **Sends WhatsApp (approved templates) or email** — after the call, or during it when the agent promises
  something ("I'll WhatsApp you the brochure") and the caller said yes. Only sends what the caller accepted;
  every send is tracked for delivery and never sent twice.
- Resumes paused workflows. Workflow steps available: AI call, WhatsApp, email, HTTP request, webhook.

**Lead sources:** Meta (Facebook/Instagram) lead ads, Google lead forms, any website form via webhook,
CSV/Excel import, manual entry. Round-robin assignment to reps; de-duplication by phone or email.

## 5. Call intelligence (AI calls and human calls)

- **Every AI call is analysed automatically at no extra charge.**
- **Human calls** (click-to-call on Plivo/Exotel/Airtel, or uploaded recordings of calls made anywhere) are
  transcribed in Hindi, English or Hinglish and scored, charged per minute of recording.
- Output per call: inferred goal of the call · call type · summary · action items with owner and priority ·
  status (positive / neutral / negative / callback / not interested / wrong number…) · key topics ·
  **objections and whether they were handled** · questions the lead asked · commitments · risk flags ·
  sentiment and how it moved · **rep score against your rubric** (default: rapport, needs discovery,
  objection handling, next step secured — editable) · outcome score and conversion likelihood ·
  next best action · **coaching tips** · talk ratio · verbatim highlights · a two-line update on the call row.
- Roll-ups per rep and per team, with a leaderboard; a sales head sees only their own reporting line.

## 6. Call health (quality monitoring)

- Every AI call gets a **green / amber / red health verdict** with a plain headline, e.g. the agent could not
  hear the caller · long silence · caller answers were discarded · the agent kept restarting a reply · voice
  synthesis stalled · probably an answering machine · transfer failed · slow responses.
- A signal that could not be measured is shown as **"not measured", never as zero**.
- Transcript, recording and timings on every call; live call status; search, filters and export on the call log.
- Full transcripts are visible only to roles with permission to see caller details.

## 7. Pricing (public, mirrors vacademy.io/voice, Sept 2026)

All prices exclude 18% GST. DLT / PE registration (Indian telecom regulation) ₹5,900/year at actuals.

| Plan | Price | Rate |
|---|---|---|
| Starter | ₹3,499 / month minimum billing | ₹3.99/min (~875 min) · trial plan, up to 3 months · AI calling, lead import/export, recordings & history |
| Pro | ₹6,999 / month minimum billing | ₹3.99/min (~1,750 min) · + direct human calling, full voice dashboard, advanced call controls |
| Pro + CRM (monthly) | ₹8,999 / month | ₹6,999 voice minimum + ₹2,000 CRM · no annual lock-in |
| Annual (recommended) | ₹19,999 / year upfront | **₹3.49/min flat from minute one, no minimum** — pay nothing for minutes in quiet months · **includes the full CRM** (vacademy.io/voice: "CRM + Voice Annual") |
| Enterprise | Custom | volume rates, dedicated line — talk to us |

Volume rate ₹3.49/min applies to usage beyond 1,750 minutes in a month. Billing is per minute of call
(rounded up). Call intelligence on AI calls is free.

## 8. Never claim

- Customer logos, testimonials, case-study results, call volumes, ratings, "trusted by N companies".
- Certifications: SOC 2, ISO 27001, HIPAA, GDPR/TCPA compliance, "encrypted at rest".
- "Your data stays in India" (only the live voice pipeline is in Mumbai).
- Latency in milliseconds, "unlimited calling", "70+ languages", "clone your voice".
- A public API/SDK/MCP server, or native integrations with Salesforce, HubSpot, Zoho, LeadSquared, Shopify etc.
  (Say instead: "anything that can send or receive a webhook".)
- Guaranteed TRAI/DND compliance. (Say: we register DLT with you and you choose calling windows.)
- Outcomes like "3x conversions". Use sourced public research, clearly attributed, or none.

## 9. Sourced facts usable anywhere

- HBR, "The Short Life of Online Sales Leads" (Oldroyd, McElheran, Elkington, March 2011). TWO datasets in one
  article — never merge them:
  (a) an audit of 2,241 U.S. companies' response to a test web lead: 37% responded within an hour, 24% took more
  than 24 hours, 23% never responded; average response time 42 hours (among those responding within 30 days);
  (b) a separate study of 1.25 million leads at 29 B2C + 13 B2B U.S. companies: firms that tried to contact a lead
  within an hour were nearly **7×** as likely to qualify it as those that tried an hour later, and more than
  **60×** as likely as those that waited 24 hours or longer.
  https://hbr.org/2011/03/the-short-life-of-online-sales-leads
- TRAI Press Release 119/2026 (18 Sept 2026), TCCCPR (Third Amendment) Regulations, 2026: A2P calls are defined
  as calls "initiated by an application, software system or automated platform without direct human dialing,
  including using autodialing, robo-calls and pre-recorded/artificial voice technologies"; every entity using
  A2P calls must pre-declare it to its telecom provider with the CLIs used, otherwise the calls are treated as
  UCC; termination charge up to ₹0.05/min on A2P calls (regulated series exempt); commercial communication based
  on a customer's inquiry is allowed only for 7 days from the inquiry, which must be in writing/digital and kept
  verifiable; action against a sender at 3+ complaints in 10 days when the CLI is also AI-flagged.
  https://www.trai.gov.in/sites/default/files/2026-09/PR_No119of2026.pdf
  Site implication: old-lead reactivation needs explicit consent; never say Telleo handles the A2P declaration
  for the customer (not verified).
