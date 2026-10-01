import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { allRoutes } from "@/lib/routes";

export const dynamic = "force-static";

// lastModified only where we know a real date (blog posts). A build timestamp on every URL
// changes each deploy, and Google learns to ignore lastmod from sites that do that.
export default function sitemap(): MetadataRoute.Sitemap {
  return allRoutes().map((r) => ({
    url: `${SITE}${r.path}`,
    ...(r.lastModified && { lastModified: new Date(`${r.lastModified}T00:00:00Z`) }),
    changeFrequency: r.path === "/" ? "weekly" : "monthly",
    priority: r.priority,
  }));
}
