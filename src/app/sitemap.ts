import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { allRoutes } from "@/lib/routes";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return allRoutes().map((r) => ({
    url: `${SITE}${r.path}`,
    lastModified: r.lastModified ? new Date(`${r.lastModified}T00:00:00Z`) : now,
    changeFrequency: r.path === "/" ? "weekly" : "monthly",
    priority: r.priority,
  }));
}
