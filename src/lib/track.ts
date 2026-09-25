/**
 * Analytics glue. Everything goes through GTM's dataLayer so triggers are
 * configured there, not here. UTM parameters are captured once per session and
 * attached to every event and to the lead that reaches the CRM.
 */
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "ref"] as const;
const STORE = "telleo.utm";

export type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>> & { landing?: string };

export function captureUtm(): Utm {
  if (typeof window === "undefined") return {};
  try {
    const q = new URLSearchParams(window.location.search);
    const found: Utm = {};
    for (const k of UTM_KEYS) {
      const v = q.get(k);
      if (v) found[k] = v.slice(0, 120);
    }
    if (Object.keys(found).length) {
      found.landing = window.location.pathname;
      sessionStorage.setItem(STORE, JSON.stringify(found));
      return found;
    }
    return getUtm();
  } catch {
    return {};
  }
}

export function getUtm(): Utm {
  try {
    return JSON.parse(sessionStorage.getItem(STORE) || "{}");
  } catch {
    return {};
  }
}

/** One-line attribution for the CRM note field, e.g. "src: email/outbound-us-sept". */
export function utmNote(): string {
  const u = getUtm();
  const bits = [u.utm_source, u.utm_medium, u.utm_campaign, u.utm_content].filter(Boolean);
  return bits.length ? `src: ${bits.join("/")}` : "";
}

export function track(event: string, props: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[] };
  (w.dataLayer ||= []).push({ event, ...getUtm(), ...props });
}
