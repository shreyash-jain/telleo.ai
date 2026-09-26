import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };
import { PhoneOff } from "lucide-react";

export default function NotFound() {
  return (
    <main className="wrap flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <PhoneOff className="h-10 w-10 text-brand-700" />
      <h1 className="h-display mt-6 text-4xl text-ink">This number is not reachable.</h1>
      <p className="mt-3 max-w-md text-slate-600">The page you were looking for has moved or never existed. Try one of these instead.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-dark">Home</Link>
        <Link href="/use-cases/" className="btn btn-outline">Use cases</Link>
        <Link href="/pricing/" className="btn btn-outline">Pricing</Link>
        <Link href="/demo/" className="btn btn-primary">Book a demo</Link>
      </div>
    </main>
  );
}
