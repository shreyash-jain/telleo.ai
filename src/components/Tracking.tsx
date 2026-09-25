"use client";

import { useEffect } from "react";
import { captureUtm, track } from "@/lib/track";

/**
 * Mounted once in the root layout:
 * - captures utm_* from the URL into sessionStorage,
 * - turns any click on an element with data-track="<event>" into a dataLayer event
 *   (CTAs: book_demo, call_test_line, whatsapp, play_sample),
 * - listens for Calendly's postMessage and records a booking as `calendly_booked`.
 */
export function Tracking() {
  useEffect(() => {
    captureUtm();
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      track(el.dataset.track as string, { label: el.dataset.trackLabel || el.textContent?.trim().slice(0, 60), href: el.getAttribute("href") || undefined });
    };
    const onMessage = (e: MessageEvent) => {
      const ev = (e.data as { event?: string } | null)?.event;
      if (typeof ev !== "string" || !ev.startsWith("calendly.")) return;
      if (ev === "calendly.event_scheduled") track("calendly_booked");
      else if (ev === "calendly.date_and_time_selected") track("calendly_slot_picked");
    };
    document.addEventListener("click", onClick);
    window.addEventListener("message", onMessage);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("message", onMessage);
    };
  }, []);
  return null;
}
