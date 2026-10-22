#!/usr/bin/env python3
"""
Build the Voice AI Platform Landscape dataset from the raw vendor research.

  python3 scripts/research/build_landscape.py

Inputs  scripts/research/raw/*.json        one array of sourced vendor records per batch (schema: BRIEF.md);
                                          telleo.json is our own record, written from docs/PRODUCT_FACTS.md
        scripts/research/corrections.json  later fixes, each with its own source
Outputs src/content/research/voice-landscape.json      (what the page imports)
        public/research/voice-ai-platform-landscape-2026.csv  (the download, CC BY 4.0)

Scoring (published on the page, identical for every vendor, Telleo included):
  yes = 1, partial = 0.5, no / unknown = 0. "Unknown" means the vendor does not document
  the capability publicly, so it scores 0; the page says so.
  Conversation axis = 7 capabilities of the agent on the call.
  Workflow axis     = 7 capabilities around the call (CRM, lead sources, follow-up, analysis, QA, telephony).
  Each axis is reported as a percentage of its maximum.
"""
import csv, json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
RAW = ROOT / "scripts/research/raw"

CONVERSATION = ["hindi_hinglish", "indic_languages", "outbound_inbound", "live_transfer",
                "mid_call_actions", "no_code_builder", "api_webhooks"]
WORKFLOW = ["built_in_crm", "lead_source_connectors", "whatsapp_followup", "post_call_analysis",
            "call_qa", "human_call_intelligence", "telephony_included"]
CAP_LABELS = {
    "hindi_hinglish": "Hindi + Hinglish", "indic_languages": "5+ Indian languages",
    "outbound_inbound": "Outbound + inbound", "live_transfer": "Live transfer",
    "mid_call_actions": "Mid-call actions", "no_code_builder": "No-code builder", "api_webhooks": "API + webhooks",
    "built_in_crm": "Built-in CRM", "lead_source_connectors": "Lead-ad connectors",
    "whatsapp_followup": "WhatsApp follow-up", "post_call_analysis": "Post-call analysis",
    "call_qa": "AI call QA", "human_call_intelligence": "Human-call analysis",
    "telephony_included": "Indian telephony included",
}
POINTS = {"yes": 1.0, "partial": 0.5}
CAPS = CONVERSATION + WORKFLOW

def score(caps, keys):
    return sum(POINTS.get((caps.get(k) or {}).get("value", "unknown"), 0.0) for k in keys)

corr_path = ROOT / "scripts/research/corrections.json"
CORRECTIONS = json.loads(corr_path.read_text()) if corr_path.exists() else []

vendors, seen = [], set()
files = sorted(RAW.glob("*.json"), key=lambda p: (p.name != "telleo.json", p.name))
for f in files:
    for v in json.loads(f.read_text()):
        key = v["name"].split("(")[0].strip().lower()
        if key in seen:
            continue
        seen.add(key)
        caps = v.get("capabilities") or {}
        v.setdefault("pricing", {})
        for c in CORRECTIONS:
            if c["vendor"].lower() != key:
                continue
            if "cap" in c:  # {"vendor", "cap", "value", "evidence", "source"}
                caps[c["cap"]] = {"value": c["value"], "evidence": c["evidence"]}
                v.setdefault("sources", {})[f'capabilities.{c["cap"]}'] = c["source"]
            else:  # {"vendor", "field": "pricing.x", "value", "reason"}: a scope note or a price that is not for AI calling
                obj, leaf = v, c["field"].split(".")
                for part in leaf[:-1]:
                    obj = obj.setdefault(part, {})
                obj[leaf[-1]] = c["value"]
        name = v["name"].split("(")[0].strip()
        hq = (v.get("hq_country") or "").strip().lower()
        if hq in ("", "unknown"):  # not stated on the vendor's pages: fall back to the batch it was researched in
            hq = "india" if f.stem.startswith("india") else "global"
            v["hq_country"] = None
        region = "telleo" if name == "Telleo" else ("india" if hq == "india" else "global")
        c_s, w_s = score(caps, CONVERSATION), score(caps, WORKFLOW)
        vendors.append({
            "name": name,
            "fullName": v["name"],
            "region": region,
            "hq": v.get("hq_country"),
            "segment": v.get("segment"),
            "website": v.get("website"),
            "target": v.get("target_customers"),
            "pricing": v.get("pricing") or {},
            "capabilities": {k: (caps.get(k) or {"value": "unknown", "evidence": ""}) for k in CAPS},
            "conversation": round(c_s / len(CONVERSATION) * 100),
            "workflow": round(w_s / len(WORKFLOW) * 100),
            "breadth": c_s + w_s,
            "languages": v.get("languages_claimed"),
            "indiaCompliance": v.get("india_compliance"),
            "ratings": v.get("ratings") or {},
            "scale": v.get("scale") or {},
            "notable": v.get("notable_2025_2026"),
            "notableSource": v.get("notable_source"),
            "sources": v.get("sources") or {},
            "asOf": v.get("as_of"),
            "batch": f.stem,
        })

out_dir = ROOT / "src/content/research"
out_dir.mkdir(parents=True, exist_ok=True)
(out_dir / "voice-landscape.json").write_text(json.dumps(
    {"capLabels": CAP_LABELS, "conversation": CONVERSATION, "workflow": WORKFLOW, "vendors": vendors},
    ensure_ascii=False, indent=1))

(ROOT / "public/research").mkdir(parents=True, exist_ok=True)
with open(ROOT / "public/research/voice-ai-platform-landscape-2026.csv", "w", newline="", encoding="utf-8") as fh:
    w = csv.writer(fh)
    w.writerow(["vendor", "region", "hq_country", "segment", "conversation_score_pct", "workflow_score_pct",
                "capabilities_out_of_14"] + [CAP_LABELS[k] for k in CAPS] +
               ["public_pricing", "entry_price", "currency", "period", "per_minute_from", "per_minute_currency", "per_minute_covers",
                "price_basis", "languages_claimed", "g2_score", "g2_reviews", "as_of", "pricing_source", "capabilities_source"])
    for v in vendors:
        p = v["pricing"]; e = p.get("entry_price") or {}; pm = p.get("per_minute_from") or {}
        g2 = (v["ratings"].get("g2") or {})
        w.writerow([v["name"], v["region"], v["hq"] or "", v["segment"], v["conversation"], v["workflow"], v["breadth"]]
                   + [v["capabilities"][k]["value"] for k in CAPS]
                   + [p.get("public_pricing"), e.get("amount") if e.get("amount") is not None else "", e.get("currency") or "",
                      e.get("period") or "", pm.get("amount") if pm.get("amount") is not None else "", pm.get("currency") or "",
                      p.get("per_minute_scope") or "", p.get("price_basis") or "", v["languages"] or "", g2.get("score") or "", g2.get("reviews") or "",
                      v["asOf"], v["sources"].get("pricing") or "", v["sources"].get("capabilities") or ""])

for v in sorted(vendors, key=lambda x: -x["breadth"]):
    print(f'{v["name"][:22]:22} {v["region"]:7} C{v["conversation"]:>4} W{v["workflow"]:>4}  {v["breadth"]:>4}/14  {v["batch"]}')
print(len(vendors), "vendors")
