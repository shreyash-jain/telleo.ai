/**
 * Telleo's Dashboard plans are Evalezy's, kept in the platform database (product.telleo),
 * so the site reads them live from the public offer the sign-up page also uses.
 * Browser-side on purpose (see leadSubmit.ts: a Worker subrequest to this host loops at the edge).
 */
const API_BASE = "https://backend-stage.vacademy.io";

export interface OfferPlan {
  key: string;
  name: string;
  /** Rupees for one plan period, before GST. */
  price_inr: number | null;
  /** AI credits included for the period. */
  credits: number | null;
  users: number | null;
  /** PLATFORM (dashboard) or API; null = every workspace. */
  access_mode?: "PLATFORM" | "API" | null;
  validity_months?: number | null;
}

export interface ProductOffer {
  trial_days: number | null;
  demo_credits: number | null;
  plans: OfferPlan[] | null;
  plan_validity_months: number | null;
}

let cached: Promise<ProductOffer> | null = null;

/** The Telleo offer, fetched once per page. Rejects when the backend can't be reached. */
export function fetchTelleoOffer(): Promise<ProductOffer> {
  if (!cached) {
    cached = fetch(`${API_BASE}/admin-core-service/public/product/v1/telleo/offer`, { headers: { Accept: "application/json" } })
      .then((r) => {
        if (!r.ok) throw new Error(`offer ${r.status}`);
        return r.json() as Promise<ProductOffer>;
      })
      .catch((e) => {
        cached = null;
        throw e;
      });
  }
  return cached;
}

/** The plans sold with the dashboard: tagged PLATFORM, or not tagged. */
export const dashboardPlans = (offer: ProductOffer) =>
  (offer.plans ?? []).filter((p) => p.access_mode !== "API" && p.price_inr != null);

/** One period's months for a plan (its own length, else the product's). */
export const planMonths = (offer: ProductOffer, p: OfferPlan) => p.validity_months ?? offer.plan_validity_months ?? 12;
