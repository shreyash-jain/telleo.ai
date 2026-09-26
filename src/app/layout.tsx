import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Noto_Sans_Devanagari, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Tracking } from "@/components/Tracking";
import { COMPANY, SITE, SITE_NAME, WHATSAPP_NUMBER } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-jakarta", display: "swap" });
const deva = Noto_Sans_Devanagari({ subsets: ["devanagari"], weight: ["400", "500", "600", "700"], variable: "--font-deva", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jb", display: "swap" });

/** Same GTM container as vacademy.io and tutezy.ai; configure Telleo triggers there. */
const GTM_ID = "GTM-5C4DDJ6W";

const DESCRIPTION =
  "Telleo's AI voice agents call new leads in about a minute, qualify them, book meetings and hand hot leads to your team, in Hindi, English and Hinglish.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: "Telleo: AI Voice Agents in Hindi, English & Hinglish", template: "%s | Telleo" },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  manifest: "/site.webmanifest",
  keywords: [
    "AI voice agent", "AI calling agent", "AI calling India", "Hindi AI voice agent", "Hinglish voice bot",
    "AI telecaller", "AI lead qualification", "outbound AI calls", "voice AI for sales", "Telleo",
  ],
  openGraph: {
    type: "website",
    url: SITE,
    siteName: SITE_NAME,
    locale: "en_IN",
    title: "Telleo: AI voice agents that call, qualify and book",
    description: "Every lead called in about 60 seconds, in Hindi, English and Hinglish. Outcomes written to your CRM. From ₹3.49 a minute.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Telleo AI voice agents" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Telleo: AI voice agents that call, qualify and book",
    description: "Every lead called in about 60 seconds, in Hindi, English and Hinglish. From ₹3.49 a minute.",
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 } },
  alternates: { canonical: SITE },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#0A0F1C", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE}/#org`,
      name: SITE_NAME,
      legalName: COMPANY,
      url: SITE,
      logo: `${SITE}/logo.png`,
      description: DESCRIPTION,
      sameAs: ["https://vacademy.io"],
      contactPoint: [
        { "@type": "ContactPoint", contactType: "sales", telephone: `+${WHATSAPP_NUMBER}`, areaServed: "IN", availableLanguage: ["en", "hi"] },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      name: SITE_NAME,
      url: SITE,
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE}/#org` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE}/#app`,
      name: "Telleo",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "AI voice agent",
      operatingSystem: "Web",
      url: SITE,
      description: DESCRIPTION,
      inLanguage: ["en", "hi"],
      featureList: [
        "Outbound and inbound AI phone calls in Hindi, English and Hinglish",
        "New leads called in about 60 seconds",
        "No-code agent builder with AI-drafted scripts",
        "80+ voices across 7 speech engines",
        "Live transfer to a human, meeting booking, WhatsApp and email follow-ups",
        "End-of-call disposition, summary, lead score and extracted answers",
        "Call intelligence for AI and human calls",
        "Per-call health verdict for quality monitoring",
      ],
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "INR",
        lowPrice: "3.49",
        highPrice: "3.99",
        offerCount: 4,
        description: "Per minute of AI calling, excluding 18% GST",
      },
      publisher: { "@id": `${SITE}/#org` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${jakarta.variable} ${deva.variable} ${mono.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        <noscript>
          <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} title="gtm" />
        </noscript>
        <Tracking />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <Nav />
        <div id="main" className="pt-16 md:pt-[4.5rem]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
