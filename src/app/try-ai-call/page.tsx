import type { Metadata } from "next";
import { TryAiCall } from "@/components/TryAiCall";
import { SITE } from "@/lib/site";

// Event page reached by QR code: not in the nav, the sitemap or search results.
export const metadata: Metadata = {
  title: "Hear your AI admission counsellor, live",
  description: "Type your institute's name, pick a language and call. Telleo's AI answers as your own admission counsellor.",
  alternates: { canonical: `${SITE}/try-ai-call/` },
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <main className="relative min-h-[calc(100svh-4rem)] overflow-hidden bg-ink text-white">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="glow-brand pointer-events-none absolute -left-40 top-10 h-[32rem] w-[32rem] opacity-60" />
      <div className="wrap relative mx-auto max-w-xl py-8 md:py-14">
        <TryAiCall />
      </div>
    </main>
  );
}
