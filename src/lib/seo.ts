import type { Metadata } from "next";
import { SITE_NAME } from "./site";

/** Default social card. Next.js replaces (not merges) openGraph/twitter set in layout.tsx, so every page needs these. */
export const OG_IMAGE = { url: "/og.png", width: 1200, height: 630, alt: "Telleo AI voice agents" };

/** A title that already names the brand skips the "%s | Telleo" template, so it never reads "… Telleo | Telleo". */
export const pageTitle = (title: string): Metadata["title"] => (/telleo/i.test(title) ? { absolute: title } : title);

/** Title, description, canonical, Open Graph and Twitter card for one page. */
export function seoMetadata({
  url, title, description, type = "website", extra,
}: {
  url: string;
  title: string;
  description: string;
  type?: "website" | "article";
  /** Extra Open Graph fields, e.g. publishedTime for articles. */
  extra?: Record<string, unknown>;
}): Metadata {
  return {
    title: pageTitle(title),
    description,
    alternates: { canonical: url },
    openGraph: { type, url, title, description, siteName: SITE_NAME, locale: "en_IN", images: [OG_IMAGE], ...extra } as Metadata["openGraph"],
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
  };
}
