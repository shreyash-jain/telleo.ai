import { CLIENTS } from "@/content/clients";

/** Logo wall of institutes on Vacademy, the platform Telleo is built on. Scrolls on its own; pauses on hover. */
export function Clients({ dark = false }: { dark?: boolean }) {
  const row = [...CLIENTS, ...CLIENTS];
  return (
    <section aria-label="Clients" className={dark ? "bg-ink" : "border-b border-line bg-white"}>
      <div className="wrap py-10">
        <p className={`text-center text-sm font-semibold ${dark ? "text-slate-400" : "text-slate-500"}`}>
          Trusted by {CLIENTS.length}+ institutes on{" "}
          <a href="https://vacademy.io" className={`underline underline-offset-4 ${dark ? "hover:text-white" : "hover:text-ink"}`}>
            Vacademy
          </a>
          , the platform Telleo is built on
        </p>
        <div className="group relative mt-7 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <ul className="flex w-max animate-marquee items-center gap-12 group-hover:[animation-play-state:paused]">
            {row.map((c, i) => (
              <li key={i} className="shrink-0" aria-hidden={i >= CLIENTS.length}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.src}
                  alt={i < CLIENTS.length ? c.name : ""}
                  width={c.width}
                  height={c.height}
                  loading="lazy"
                  className="h-11 w-auto rounded-md object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
