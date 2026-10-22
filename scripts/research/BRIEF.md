# Voice AI Platform Landscape 2026 — research brief

Purpose: a sourced, fair comparison of AI voice-calling platforms used by Indian and global businesses, published
on telleo.ai/research/. Telleo (the publisher) is scored with the same rubric from its own facts file.
Accuracy beats coverage: an honest "unknown" is better than a guess.

## Output

One JSON array per batch at `scripts/research/raw/<batch>.json`, one object per vendor:

```json
{
  "name": "Vendor name (product name in brackets if different, e.g. 'Gnani.ai (Inya)')",
  "website": "https://…",
  "hq_country": "India | United States | …",
  "founded_year": 2021,
  "segment": "voice-agent-platform | developer-platform | enterprise-conversational-ai | ccaas-telephony | crm-with-ai-calling | conversation-intelligence",
  "target_customers": "one line, from the vendor's own words",
  "pricing": {
    "public_pricing": true,
    "entry_price": { "amount": 0.07, "currency": "USD", "period": "minute | month | year", "plan_name": "…", "notes": "exactly what the page says, incl. what is/isn't included (telephony, LLM, TTS)" },
    "per_minute_from": { "amount": 0.07, "currency": "USD", "notes": "lowest published per-minute price and what it includes; null if not published" },
    "free_trial": true,
    "price_basis": "per minute | per minute + platform fee | monthly bundle | unlimited with fair use | quote only"
  },
  "capabilities": {
    "<key>": { "value": "yes | partial | no | unknown", "evidence": "≤160 chars, paraphrase of what the vendor says" }
  },
  "languages_claimed": "e.g. '20+ languages incl. Hindi, Tamil' — vendor's own wording",
  "india_compliance": "what the vendor says about DLT/TRAI/DPDP/Indian numbers, or null",
  "ratings": { "g2": { "score": 4.6, "reviews": 120 } | null, "capterra": { "score": null, "reviews": null } | null },
  "scale": { "customers_claimed": "…", "total_funding_usd_m": 12.5, "last_round": "Series A, Mar 2025" },
  "notable_2025_2026": "one factual line about a 2025-26 change (funding, launch, acquisition), or null",
  "notable_source": "URL for that line, or null",
  "sources": { "pricing": "URL", "capabilities": "URL ; URL", "ratings": "URL", "scale": "URL" },
  "as_of": "2026-10-22"
}
```

## The 14 capabilities (score each one)

Conversation axis — what the AI agent itself can do on a call:

| key | yes means | partial means |
|---|---|---|
| `hindi_hinglish` | Agent documented to converse in Hindi AND code-mixed Hindi-English (Hinglish) | Hindi only, or Hinglish only via a generic multilingual model with no Indian focus stated |
| `indic_languages` | 5+ Indian languages documented for live voice agents (beyond Hindi/English) | 2–4 Indian languages, or "on request" |
| `outbound_inbound` | Both outbound and inbound AI calls | Only one direction |
| `live_transfer` | Warm/live transfer to a human mid-call | Callback scheduling only, or transfer only in higher plans/enterprise |
| `mid_call_actions` | Agent can act during the call: book a slot, call an API/tool/function, send a message | Only one narrow action (e.g. only send SMS), or actions only after the call |
| `no_code_builder` | Business users build and edit agents without code (form or visual builder) | Templates exist but editing needs developers, or builder is in beta |
| `api_webhooks` | Public API to start calls/manage agents AND outbound webhooks | Only one of the two, or API on request/enterprise only |

Business-workflow axis — what happens around the call:

| key | yes means | partial means |
|---|---|---|
| `built_in_crm` | Native lead/contact management with pipelines/statuses inside the product | Basic contact lists/campaign lists only |
| `lead_source_connectors` | Native connectors that trigger calls from Meta/Facebook lead ads, Google lead forms or web forms (not just Zapier) | Only via Zapier/Make/generic webhook |
| `whatsapp_followup` | Native WhatsApp messaging tied to calls (after or during) | Via third-party integration only, or SMS only |
| `post_call_analysis` | Automatic disposition/outcome, summary and extracted fields per call | Transcript/recording only |
| `call_qa` | Automated quality monitoring/QA scoring of the AI agent's calls (alerts, scores, health flags) | Analytics dashboards only |
| `human_call_intelligence` | Analyses calls made by HUMAN reps (transcribe + score/coach) | Recording/transcription of human calls only |
| `telephony_included` | Phone numbers and carriage provided by the vendor in India (no BYO carrier required) | Numbers provided outside India only, or BYO SIP/Twilio required for India |

Rules:
- Evidence must come from the vendor's OWN site, docs, pricing page or official blog, read today with WebFetch.
  Press releases/news are fine for funding and `notable_2025_2026`. Never use review-site claims as capability evidence.
- If a page does not say it, the value is `unknown` (scores 0). Do not infer from screenshots or marketing adjectives.
- Prices: copy exactly, with currency and period. Never convert currencies.
- G2/Capterra: only if you open the listing (or a search snippet clearly shows score + count; then note "snippet").
- Keep a budget of roughly 45 page fetches. Skip a vendor (and say so) if its site is unreachable.
- Do NOT edit any file except your own `scripts/research/raw/<batch>.json`.
