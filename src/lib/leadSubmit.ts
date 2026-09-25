/**
 * Demo requests go straight from the browser to the Vacademy CRM (Audience
 * Manager → Recent Leads) with Campaign Name "Telleo – Book a demo", so the
 * sales team can filter Telleo leads from vacademy.io ones.
 *
 * Browser-side on purpose (same as vacademy.io and tutezy.ai): a Worker
 * subrequest to backend-stage.vacademy.io 308-loops at the edge.
 * Audience + field ids = the "Vacademy Website" audience used by vacademy.io.
 */
import { utmNote } from "./track";

const CRM_API_BASE = "https://backend-stage.vacademy.io";
const CRM_AUDIENCE_ID = "530d6365-808a-424d-ba6c-80a05ec9b233";
const CAMPAIGN = "Telleo – Book a demo";

// Custom-field ids on that audience (ids, not names).
const CRM_FIELD = {
  fullName: "46d26332-cf27-4db0-955e-f5fec2a95f23",
  email: "307817d3-357a-4db3-a1c2-cbfbe491ef44",
  phone: "0884ac17-d227-49bc-be04-e7ca541eb1d1",
  designation: "b3a88220-ea06-4f87-a812-ef51aae5bcbe",
  instituteName: "aa7667ac-1e34-41a6-ba4d-eaa384656b90",
  campaignName: "784b5a53-f21e-435f-bc45-14c5b89e364c",
} as const;

/**
 * Team alert + auto-reply via the shared `vacademy-send-email` Worker. It only
 * answers once a telleo.ai route and a "telleo" brand are added to it (README →
 * "Lead email"); until then this call fails quietly and the CRM is the record.
 */
const EMAIL_API = "/api/send-email";

export interface DemoLead {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  company?: string;
  industry?: string;
  job?: string;
  volume?: string;
  message?: string;
}

function crmRejection(body: string): string | null {
  const text = (body || "").trim();
  if (!text) return "empty response";
  if (/^[0-9a-f-]{32,36}$/i.test(text)) return null;
  return text;
}

const summary = (l: DemoLead) =>
  ["Telleo", l.industry, l.job, l.volume ? `${l.volume} calls/mo` : "", utmNote()].filter(Boolean).join(" · ");

async function sendToCrm(lead: DemoLead): Promise<{ ok: boolean; note?: string; duplicate?: boolean }> {
  const name = lead.name.trim();
  const email = lead.email.trim();
  const fullPhone = lead.phone.trim() ? `${lead.countryCode}${lead.phone}`.replace(/[^+\d]/g, "") : "";
  const custom: Record<string, string> = {
    [CRM_FIELD.fullName]: name,
    [CRM_FIELD.campaignName]: CAMPAIGN,
    [CRM_FIELD.designation]: [summary(lead), lead.message?.trim()].filter(Boolean).join(" · ").slice(0, 250),
  };
  if (email) custom[CRM_FIELD.email] = email;
  if (fullPhone) custom[CRM_FIELD.phone] = fullPhone;
  if (lead.company?.trim()) custom[CRM_FIELD.instituteName] = lead.company.trim();

  const res = await fetch(`${CRM_API_BASE}/admin-core-service/open/v1/audience/lead/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    keepalive: true,
    body: JSON.stringify({
      audience_id: CRM_AUDIENCE_ID,
      source_type: "AUDIENCE_CAMPAIGN",
      source_id: CRM_AUDIENCE_ID,
      custom_field_values: custom,
      user_dto: {
        id: "", username: email, email, full_name: name, address_line: "", city: "", region: "", pin_code: "",
        mobile_number: fullPhone, date_of_birth: null, gender: "", password: "", profile_pic_file_id: "",
        roles: [], last_login_time: null, root_user: false,
      },
    }),
  });
  const text = await res.text().catch(() => "");
  if (!res.ok) return { ok: false, note: `HTTP ${res.status}` };
  const rejection = crmRejection(text);
  if (rejection && !/duplicate|already/i.test(rejection)) return { ok: false, note: rejection };
  return { ok: true, note: rejection || undefined, duplicate: Boolean(rejection) };
}

/** CRM and email run independently; the visitor sees success if either lands. */
export async function submitDemoLead(lead: DemoLead): Promise<{ ok: boolean; note?: string; duplicate?: boolean }> {
  const crm = sendToCrm(lead).catch((err) => ({ ok: false, note: err instanceof Error ? err.message : "crm failed" }) as { ok: boolean; note?: string; duplicate?: boolean });
  let emailOk = false;
  try {
    const res = await fetch(EMAIL_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        brand: "telleo",
        name: lead.name.trim(),
        email: lead.email.trim(),
        phone: lead.phone.trim(),
        countryCode: lead.countryCode,
        instituteName: lead.company?.trim(),
        reason: summary(lead),
        message: lead.message?.trim(),
        ctaType: CAMPAIGN,
      }),
    });
    emailOk = res.ok;
  } catch {
    /* no route yet — CRM is the record */
  }
  const c = await crm;
  if (!emailOk && !c.ok) return { ok: false, note: c.note || "Could not send" };
  return { ok: true, duplicate: c.duplicate };
}
