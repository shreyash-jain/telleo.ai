/**
 * "Try the AI call" (exhibition QR page). The page saves who is calling against their
 * mobile number; when that number rings the demo line, the AI answers as the admission
 * counsellor of the organisation they typed, in the language they picked.
 * Backend: admin_core OpenAiDemoCallController. Browser-side, like leadSubmit.ts.
 */
import { TEST_LINE, TEST_LINE_DISPLAY } from "./site";
import { utmNote } from "./track";

const API_BASE = "https://backend-stage.vacademy.io";
/** Telleo demo institute (CRM, ex-VOOM Sales) that owns the demo line. */
export const DEMO_INSTITUTE_ID = "3f343028-c866-442d-9b17-5fe681aaaebb";
const BASE = `${API_BASE}/admin-core-service/open/v1/ai-demo-call/${DEMO_INSTITUTE_ID}`;

export interface DemoLanguage {
  code: string;
  label: string;
  nativeLabel: string;
}

export interface DemoConfig {
  enabled: boolean;
  dialNumber: string;
  displayNumber: string;
  languages: DemoLanguage[];
}

export interface DemoRequest {
  requestId: string;
  dialNumber: string;
  displayNumber: string;
  telUri: string;
  expiresAt: string;
}

export type DemoStatus = "PENDING" | "CONNECTED" | "ENDED" | "EXPIRED" | "SUPERSEDED";

/** Shown when the backend cannot be reached: the call still works, just unpersonalised. */
export const FALLBACK_CONFIG: DemoConfig = {
  enabled: true,
  dialNumber: TEST_LINE,
  displayNumber: TEST_LINE_DISPLAY,
  languages: [
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
  ],
};

export async function fetchDemoConfig(): Promise<DemoConfig> {
  const res = await fetch(`${BASE}/config`, { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = (await res.json()) as Partial<DemoConfig>;
  return {
    enabled: Boolean(data.enabled),
    dialNumber: data.dialNumber || TEST_LINE,
    displayNumber: data.displayNumber || data.dialNumber || TEST_LINE_DISPLAY,
    languages: data.languages?.length ? data.languages : FALLBACK_CONFIG.languages,
  };
}

export async function createDemoRequest(input: {
  name: string;
  organisation: string;
  phone: string;
  language: string;
}): Promise<{ ok: true; data: DemoRequest } | { ok: false; error: string }> {
  try {
    const res = await fetch(`${BASE}/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...input, source: utmNote() || "try-ai-call" }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) return { ok: false, error: body?.error || "Something went wrong. Please try again." };
    return { ok: true, data: body as DemoRequest };
  } catch {
    return { ok: false, error: "network" };
  }
}

export async function fetchDemoStatus(requestId: string): Promise<DemoStatus | null> {
  try {
    const res = await fetch(`${BASE}/request/${encodeURIComponent(requestId)}`, { cache: "no-store" });
    if (!res.ok) return null;
    return ((await res.json()) as { status: DemoStatus }).status;
  } catch {
    return null;
  }
}
