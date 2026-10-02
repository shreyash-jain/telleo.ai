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
- **Retries happen only for workflow calls.** Nothing re-dials an unanswered bulk-campaign call: an unanswered
  call produces no bot report (Plivo only fetches the bot on pickup), so it just shows as No answer / Busy in the
  call log. Re-run the campaign to call again; the same lead is not re-dialled within 60 minutes or more than 3
  times in 24 hours by default. The queue itself re-attempts only failed placements (max 3).
- **Calling hours are enforced for workflow AND bulk-campaign calls:** a queued AI dial outside the account's
  calling shifts waits and is placed automatically when the hours open. Only a one-click call placed by a person
  ignores them. Default shift 09:00–21:00 (Asia/Kolkata). (AiCallQueueService, AiCallQueueDrainJob.)
- **New leads can be called within about 60 seconds** of arriving (workflow trigger).
- **Inbound:** the IVR on a Telleo (Plivo) number can hand the caller to an AI agent, as a menu option or as the
  first step so the AI answers straight away. Not the customer's existing third-party IVR. Inbound lead capture
  (turning unknown callers into leads) is OFF by default.
- **Live transfer to a human** mid-call (per-agent handoff numbers). The agent says a bridge line, then the call is connected.
- **Telephony is included.** Calls run on Telleo's lines (Plivo) — no SIMs, dialers or telecom contracts.
  Optionally a dedicated AI line (your own Plivo sub-account and caller ID). Your human team can stay on
  Airtel IQ or Exotel for click-to-call; the AI line is separate.
- **Every AI call has a full transcript.** Call **recording is a switch on the calling line**: when it is on (the normal setup), every call is recorded. Say "record every call" only as "recording can be switched on for every call".
- New-lead workflow calls share one queue with bulk-campaign calls, so a running campaign can delay them.
- **Guardrails (all real):** daily call cap (default 500/day, configurable); 30-second duplicate
  protection so a lead is never dialled twice by accident; by default **workflow** calls skip leads already
  assigned to a rep (a workflow's AI-call step can be set to "also call leads that already have a counsellor");
  bulk campaigns and one-click calls do NOT skip them; maximum call length per agent (default 6 minutes); idle hang-up after two nudges; answering-machine
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
extracted answers (only what was actually said) · callback requested (true/false) + the caller's own words ·
meeting requested + an exact date and time (relative phrases like "kal shaam 6 baje" are resolved for MEETINGS).
**Callbacks (verified in code 2026-09-25):** Telleo's voice bot sends only `callbackRequested` and
`callbackTimeText` (the caller's words). It never sends a resolved `callbackAt`, so NO exact callback time is
stored for AI calls, and callbackTimeText is not shown in the UI. There is no re-dial at a requested time.
Say only: "the call is marked as a callback request, with what the caller said in the transcript". Callback
outcomes go on the retry path (workflow calls) or to a rep if the customer assigns them.
Guards: a call where the caller said nothing is *Incomplete*; a meeting only counts if a specific day and
time were agreed.

**Actions:**
- Outcome rules: **assign** to a sales rep/counsellor on the dispositions you pick: the lead keeps its existing
  owner, or goes round-robin (optionally only to on-shift reps) through the counsellor pool linked to the list; if
  the list has no pool, or the pool is manual, nobody is assigned. No per-disposition assignee; **stop** on others. Agent-defined dispositions
  not on the stop list are ASSIGNED by default. A stop ends that lead's automated retries only; it is not a
  do-not-call list (a later campaign or click can dial the number again);
  **retry** unanswered calls with a gap and a maximum number of attempts; when retries run out, hand to a
  human or stop.
- Lead status is stamped (AI qualified / not interested / no answer / retry pending) ONLY if the account has created
  lead statuses with those keys (nothing seeds them), and only when an AI report arrives (a picked-up call).
- **Auto-books the meeting** on your booking page when a time was agreed.
- When an agent has a full written script (≥600 chars) the live agent follows the SCRIPT; extraction questions
  only drive the post-call analysis. Answers are saved on the call (and passed to workflows), not written to
  lead fields.
- **Sends WhatsApp (approved templates) or email** — after the call, or during it when the agent promises
  something ("I'll WhatsApp you the brochure") and the caller said yes. Only sends what the caller accepted;
  every send is tracked for delivery and never sent twice.
- Resumes paused workflows. Workflow steps available: AI call, WhatsApp, email, HTTP request, webhook.

**Lead sources:** Meta (Facebook/Instagram) lead ads, Google lead forms, any website form via webhook,
CSV/Excel import, manual entry. Round-robin assignment to reps; de-duplication by phone or email.

## 5. Call intelligence (AI calls and human calls)

- Every connected AI call gets the agent's own end-of-call analysis (§4). The deeper **Call Intelligence** analysis
  below runs automatically and free on AI calls that are **recorded** and last at least the minimum length (20 s
  by default); with recording off, AI calls get only the end-of-call analysis.
- **Human calls** (click-to-call on Plivo/Exotel/Airtel, or uploaded recordings of calls made anywhere) are
  transcribed in Hindi, English or Hinglish and scored, charged per minute of recording, automatically only when CRM
  Intelligence is switched on (off by default), a recording exists and the call lasts at least the minimum length
  (20 s by default, adjustable). A user can also run Analyze on one recorded call, which skips the length check.
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
- Transcript on every AI call, recording when switched on, timings; live call status; search, filters and export on
  the call log (filters: outcome, date, team, counsellor, direction, type, provider, status, name, number; there is
  NO filter by health or by agent, and no alerts for red calls).
- **Visibility (verified 2026-09-25):** health verdicts and diagnostics are shown to account ADMINS only. Full phone
  numbers on the Call Log (table, export, call details) are masked for every role, admins included, until an admin
  sets that role to show full numbers (Settings → Display Settings). It is a Call Log display setting only; lead
  lists, the lead board and lead profiles still show full numbers. Transcripts are NOT role-gated (the
  call-intelligence transcript endpoint has no per-call access check; flagged to the owner as a security issue).
  Never claim transcripts are restricted by role.

## 7. Pricing (public, mirrors vacademy.io/voice, Sept 2026)

All prices exclude 18% GST. DLT / PE registration (Indian telecom regulation) ₹5,900/year at actuals.

| Plan | Price | Rate |
|---|---|---|
| Starter | ₹3,499 / month minimum billing | ₹3.99/min (~875 min) · trial plan, up to 3 months · AI calling, lead import/export, recordings & history |
| Pro | ₹6,999 / month minimum billing | ₹3.99/min (~1,750 min) · + direct human calling, full voice dashboard, advanced call controls |
| Pro + CRM (monthly) | ₹8,999 / month | ₹6,999 voice minimum + ₹2,000 CRM · no annual lock-in |
| Annual (recommended) | ₹19,999 / year upfront | **₹3.49/min flat from minute one, no minimum** — pay nothing for minutes in quiet months · **includes the full CRM** (vacademy.io/voice: "CRM + Voice Annual") |
| Enterprise | Custom | volume rates, dedicated line — talk to us |

Volume rate ₹3.49/min applies to usage beyond 1,750 minutes in a month. The platform adds a per-engine surcharge
by default (Sarvam voices cost more, Edge less); say "rates are for our standard voices". Billing is in **30-second pulses** at the per-minute rate
(platform default since 30 Sept 2026; a per-institute override can set 60). Call intelligence on AI calls is free.

## 8. Never claim

- Customer logos, testimonials, case-study results, call volumes, ratings, "trusted by N companies".
- Certifications: SOC 2, ISO 27001, HIPAA, GDPR/TCPA compliance, "encrypted at rest".
- "Your data stays in India" (only the live voice pipeline is in Mumbai).
- Latency in milliseconds, "unlimited calling", "70+ languages", "clone your voice".
- An SDK/MCP server, or native integrations with Salesforce, HubSpot, Zoho, LeadSquared, Shopify etc.
  (Say instead: "anything that can send or receive a webhook".)
- Guaranteed TRAI/DND compliance. (Say: we register DLT with you and you choose calling windows.)
- That the agent "never" gives medical/legal/financial advice or "never argues": there is no built-in guard, and
  every agent's prompt includes a sales rule to redirect a first brush-off once. Say "script it to…".
- The TRAI Sept 2026 amendment as already in force: it takes effect 30 days after Gazette publication (A2P
  provisions after 60 days).
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
- RBI/2022-23/108 (12 Aug 2022, recovery calls only 8 am–7 pm) was repealed on 28 Nov 2025 and folded into RBI's
  Responsible Business Conduct Directions; cite it that way.
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

## 10. Added 2026-10-02

- **Clients:** the site may show the vacademy.io client logos, framed as institutes on Vacademy (the platform
  Telleo is built on), not as Telleo case studies. Owner decision 2026-10-02.
- **AI calling API exists** (docs/AI_CALLING_PUBLIC_API.md in the platform repo): an admin-issued `X-API-Key`;
  `POST /admin-core-service/open/ai-calling/v1` starts one call (CLICK_TO_CALL) or up to 1,000 (BULK_CALL);
  `GET …/{callLogId}` returns status, duration, timestamps and recordingUrl; scoped to the key's institute.
  Say "API key issued by our team", not self-serve.
- **Engine v2** (announced 2026-10-02) = the voice_bot_service changes since late Aug 2026 (169 commits):
  backchannel talk-through, FloorGate (never starts over a talking caller), answers a question that cuts in,
  short-answer grace, ~0.30 s off every reply (Sarvam flushed final), speech cache, LLM waterfall (Vertex fails
  over in 3 s), STT waterfall, single-flight replies, no replayed opening, heard-sentence history, Hindi hang-up /
  "समझ नहीं आया" / "क्या बोलूं?" handling, voicemail hang-up, screener handling, real call-centre ambience,
  telephone-band EQ, voice modulation, replay + simulator CI gates. Platform: 30 s billing pulse, pause/resume
  queue, engaged-call routing + follow-up gist, AI-qualified → pool, regenerate script from notes, API.
  NOT claimed: Navana TTS (not in the voice catalog yet), caller-gender detection (shadow mode).
