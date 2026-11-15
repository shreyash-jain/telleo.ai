/**
 * "Try the AI call" (exhibition QR page). The form saves the visitor as a lead in the
 * "Telleo – Try AI call (Exhibition)" list on the Telleo demo institute, using the same open
 * lead endpoint as leadSubmit.ts. When that phone rings the demo line, the AI answers as the
 * admission counsellor of the organisation they typed, in the language they picked.
 * Browser-side, like leadSubmit.ts.
 */
import { TEST_LINE, TEST_LINE_DISPLAY } from "./site";
import { utmNote } from "./track";

const API_BASE = "https://backend-stage.vacademy.io";
/** Telleo demo institute (CRM, ex-VOOM Sales) that owns the demo line. */
export const DEMO_INSTITUTE_ID = "3f343028-c866-442d-9b17-5fe681aaaebb";
/** Its "Telleo – Try AI call (Exhibition)" lead list. */
const DEMO_AUDIENCE_ID = "1d7e7d4d-60b8-4865-aff9-4550d43d3ce5";

// Custom-field ids on that list (ids, not names).
const FIELD = {
  fullName: "145b36f8-2e7b-4f50-b579-91b5d872e56c",
  phone: "abe29247-0e9c-4623-a19a-3416e117ceef",
  organisation: "c750cc32-a2ad-4521-bc5e-d140aae43b0d",
  language: "53958528-8be4-4f95-9168-c3d26e8897e4",
} as const;

export const DIAL_NUMBER = TEST_LINE;
export const DIAL_DISPLAY = TEST_LINE_DISPLAY;

export interface DemoLanguage {
  code: string;
  label: string;
  nativeLabel: string;
}

/** Must match AiDemoCallLanguages in admin_core (the label is what the lead stores). */
export const LANGUAGES: DemoLanguage[] = [
  { code: "english", label: "English", nativeLabel: "English" },
  { code: "hinglish", label: "Hinglish", nativeLabel: "Hinglish" },
  { code: "hindi", label: "Hindi", nativeLabel: "हिन्दी" },
  { code: "tamil", label: "Tamil", nativeLabel: "தமிழ்" },
  { code: "malayalam", label: "Malayalam", nativeLabel: "മലയാളം" },
  { code: "kannada", label: "Kannada", nativeLabel: "ಕನ್ನಡ" },
  { code: "telugu", label: "Telugu", nativeLabel: "తెలుగు" },
  { code: "marathi", label: "Marathi", nativeLabel: "मराठी" },
  { code: "bengali", label: "Bengali", nativeLabel: "বাংলা" },
  { code: "gujarati", label: "Gujarati", nativeLabel: "ગુજરાતી" },
];

export type DemoStatus = "PENDING" | "CONNECTED" | "ENDED" | "EXPIRED";

export type SubmitResult =
  | { ok: true; leadId: string | null } // null = this phone was already on the list
  | { ok: false; error: string };

const isLeadId = (s: string) => /^[0-9a-f-]{32,36}$/i.test(s.trim());

/** Saves the visitor as a lead. `phone` is the 10-digit Indian mobile. */
export async function submitDemoLead(input: {
  name: string;
  organisation: string;
  phone: string;
  language: string;
}): Promise<SubmitResult> {
  const mobile = `+91${input.phone}`;
  try {
    const res = await fetch(`${API_BASE}/admin-core-service/open/v1/audience/lead/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        audience_id: DEMO_AUDIENCE_ID,
        source_type: "AUDIENCE_CAMPAIGN",
        source_id: utmNote() || "try-ai-call",
        custom_field_values: {
          [FIELD.fullName]: input.name,
          [FIELD.phone]: mobile,
          [FIELD.organisation]: input.organisation,
          [FIELD.language]: input.language,
        },
        user_dto: {
          id: "", username: "", email: "", full_name: input.name, address_line: "", city: "", region: "",
          pin_code: "", mobile_number: mobile, date_of_birth: null, gender: "", password: "",
          profile_pic_file_id: "", roles: [], last_login_time: null, root_user: false,
        },
      }),
    });
    const text = (await res.text().catch(() => "")).trim();
    if (res.status === 429) return { ok: false, error: "Too many tries from this network. Please wait a minute." };
    if (!res.ok) return { ok: false, error: "network" };
    if (isLeadId(text)) return { ok: true, leadId: text };
    if (/already/i.test(text)) return { ok: true, leadId: null };
    return { ok: false, error: "network" };
  } catch {
    return { ok: false, error: "network" };
  }
}

export async function fetchDemoStatus(leadId: string): Promise<DemoStatus | null> {
  try {
    const res = await fetch(
      `${API_BASE}/admin-core-service/open/v1/ai-demo-call/lead/${encodeURIComponent(leadId)}/status`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    return ((await res.json()) as { status: DemoStatus }).status;
  } catch {
    return null;
  }
}
