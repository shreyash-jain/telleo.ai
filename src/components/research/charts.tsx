/**
 * Server-rendered SVG charts for the research pages.
 *
 * Deliberately no chart library and no client JS: search crawlers and AI answer
 * engines mostly do not run JavaScript, so every value must be in the HTML —
 * as SVG text, as a <title> per mark (the native hover tooltip), and as a real
 * <table> under each figure. Colours are the dataviz reference palette's first
 * blue = India, violet = global, Telleo green = Telleo (the publisher). Every
 * chart also carries direct labels, marker shapes and a table view, so colour
 * is never the only encoding.
 */

export const SERIES = {
  india: { label: "Indian vendors", color: "#2a78d6" },
  global: { label: "Global vendors", color: "#7c6cf2" },
  telleo: { label: "Telleo", color: "#0a8656" },
} as const;
export type SeriesKey = keyof typeof SERIES;

const INK = { primary: "#111827", secondary: "#4B5563", muted: "#6B7280", grid: "#E5E7EB", axis: "#D1D5DB" };

/* ------------------------------------------------------------------ figure */

export function Figure({
  id,
  title,
  subtitle,
  source,
  children,
  table,
}: {
  id: string;
  title: string;
  subtitle?: string;
  source: React.ReactNode;
  children: React.ReactNode;
  /** The same data as a table: always in the HTML, collapsed by default. */
  table: React.ReactNode;
}) {
  return (
    <figure id={id} className="my-10 rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 scroll-mt-24">
      <figcaption className="mb-4">
        <span className="block text-lg font-bold text-[#111827] sm:text-xl">{title}</span>
        {subtitle && <span className="mt-1 block text-sm text-[#4B5563]">{subtitle}</span>}
      </figcaption>
      {children}
      <p className="mt-4 text-xs leading-relaxed text-[#6B7280]">{source}</p>
      <details className="mt-3 group">
        <summary className="inline-flex min-h-11 cursor-pointer items-center text-sm font-semibold text-[#0A8656] hover:underline">
          Show the data as a table
        </summary>
        <div className="relative mt-2 overflow-x-auto" tabIndex={0} role="region" aria-label={`${title}: data table`}>
          {table}
        </div>
      </details>
    </figure>
  );
}

export function Legend({ keys }: { keys: SeriesKey[] }) {
  return (
    <ul className="mb-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-[#4B5563]">
      {keys.map((k) => (
        <li key={k} className="inline-flex items-center gap-2">
          <svg width="14" height="14" aria-hidden="true">
            <Marker kind={k} x={7} y={7} r={5} />
          </svg>
          {SERIES[k].label}
        </li>
      ))}
    </ul>
  );
}

/** Shape is the secondary encoding: circle = India, square = global, diamond = Telleo. */
function Marker({ kind, x, y, r }: { kind: SeriesKey; x: number; y: number; r: number }) {
  const fill = SERIES[kind].color;
  const ring = { stroke: "#ffffff", strokeWidth: 2 };
  if (kind === "global") return <rect x={x - r} y={y - r} width={r * 2} height={r * 2} rx={1.5} fill={fill} {...ring} />;
  if (kind === "telleo")
    return <path d={`M${x} ${y - r * 1.35} L${x + r * 1.35} ${y} L${x} ${y + r * 1.35} L${x - r * 1.35} ${y} Z`} fill={fill} {...ring} />;
  return <circle cx={x} cy={y} r={r} fill={fill} {...ring} />;
}

/* ----------------------------------------------------------------- scatter */

export type ScatterPoint = {
  label: string;
  x: number;
  y: number;
  series: SeriesKey;
  /** Shown in the tooltip, e.g. "₹1,999/mo · 9 of 13 capabilities". */
  detail: string;
  /** Label placement nudge to avoid collisions. */
  labelSide?: "right" | "left" | "above" | "below";
};

export function ScatterChart({
  points,
  xLabel,
  yLabel,
  xMax,
  yTicks,
  yFormat,
  yLog = false,
  ariaLabel,
}: {
  points: ScatterPoint[];
  xLabel: string;
  yLabel: string;
  xMax: number;
  yTicks: number[];
  yFormat: (v: number) => string;
  yLog?: boolean;
  ariaLabel: string;
}) {
  const W = 760, H = 460, m = { t: 16, r: 24, b: 52, l: 76 };
  const iw = W - m.l - m.r, ih = H - m.t - m.b;
  const yMin = yTicks[0], yMax = yTicks[yTicks.length - 1];
  const sx = (v: number) => m.l + (v / xMax) * iw;
  const sy = (v: number) => {
    const t = yLog ? (Math.log10(Math.max(v, yMin)) - Math.log10(yMin)) / (Math.log10(yMax) - Math.log10(yMin)) : (v - yMin) / (yMax - yMin);
    return m.t + ih - t * ih;
  };
  const xTicks = Array.from({ length: xMax + 1 }, (_, i) => i).filter((i) => i % 2 === 0 || i === xMax);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={ariaLabel} className="h-auto w-full" style={{ fontFamily: "inherit" }}>
      {/* grid + axes */}
      {yTicks.map((t) => (
        <g key={`y${t}`}>
          <line x1={m.l} x2={W - m.r} y1={sy(t)} y2={sy(t)} stroke={INK.grid} strokeWidth={1} />
          <text x={m.l - 10} y={sy(t)} dy="0.32em" textAnchor="end" fontSize={13} fill={INK.muted}>
            {yFormat(t)}
          </text>
        </g>
      ))}
      {xTicks.map((t) => (
        <text key={`x${t}`} x={sx(t)} y={H - m.b + 22} textAnchor="middle" fontSize={13} fill={INK.muted}>
          {t}
        </text>
      ))}
      <line x1={m.l} x2={W - m.r} y1={m.t + ih} y2={m.t + ih} stroke={INK.axis} />
      <text x={m.l + iw / 2} y={H - 8} textAnchor="middle" fontSize={13} fill={INK.secondary}>
        {xLabel}
      </text>
      <text transform={`translate(16 ${m.t + ih / 2}) rotate(-90)`} textAnchor="middle" fontSize={13} fill={INK.secondary}>
        {yLabel}
      </text>

      {/* marks: Telleo last so it sits on top */}
      {[...points].sort((a, b) => (a.series === "telleo" ? 1 : 0) - (b.series === "telleo" ? 1 : 0)).map((p) => {
        const x = sx(p.x), y = sy(p.y), side = p.labelSide ?? "right";
        const lx = side === "right" ? x + 10 : side === "left" ? x - 10 : x;
        const ly = side === "above" ? y - 11 : side === "below" ? y + 18 : y;
        const anchor = side === "right" ? "start" : side === "left" ? "end" : "middle";
        const isV = p.series === "telleo";
        return (
          <g key={p.label}>
            <title>{`${p.label}: ${p.detail}`}</title>
            {/* invisible larger hit target for the hover tooltip */}
            <circle cx={x} cy={y} r={14} fill="transparent" />
            <Marker kind={p.series} x={x} y={y} r={isV ? 8 : 6} />
            <text
              x={lx}
              y={ly}
              dy={side === "right" || side === "left" ? "0.32em" : undefined}
              textAnchor={anchor}
              fontSize={isV ? 14 : 12}
              fontWeight={isV ? 700 : 500}
              fill={isV ? INK.primary : INK.secondary}
            >
              {p.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* --------------------------------------------------------------- bar chart */

export type BarRow = { label: string; value: number | null; series: SeriesKey; display: string; note?: string };

/**
 * Horizontal bars as HTML, not SVG: text keeps its real size on a phone (an SVG
 * viewBox shrinks 13 px labels to ~5 px at 360 px wide). Label above the bar on
 * phones, beside it from sm. Null renders as "not published".
 */
export function BarChart({ rows, max, ariaLabel }: { rows: BarRow[]; max: number; ariaLabel: string }) {
  return (
    <ul role="list" aria-label={ariaLabel} className="space-y-2.5 sm:space-y-2">
      {rows.map((r) => {
        const isV = r.series === "telleo";
        const w = r.value == null ? 0 : Math.max(1, (r.value / max) * 100);
        return (
          <li key={r.label} title={`${r.label}: ${r.display}${r.note ? ` (${r.note})` : ""}`} className="grid grid-cols-1 gap-1 sm:grid-cols-[150px_1fr] sm:items-center sm:gap-3">
            <span className={`text-sm sm:text-right ${isV ? "font-bold text-[#111827]" : "font-medium text-[#111827]"}`}>{r.label}</span>
            <span className="flex items-center gap-2">
              {r.value == null ? (
                <span className="text-xs italic text-[#6B7280]">{r.display}</span>
              ) : (
                <>
                  <span className="h-4 rounded-r-[4px]" style={{ width: `calc(${w}% * 0.72)`, minWidth: 4, backgroundColor: SERIES[r.series].color }} aria-hidden="true" />
                  <span className={`whitespace-nowrap text-sm ${isV ? "font-bold text-[#111827]" : "text-[#4B5563]"}`}>{r.display}</span>
                </>
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/* ------------------------------------------------------------ data tables */

export function DataTable({ head, rows }: { head: string[]; rows: (string | number)[][] }) {
  return (
    <div className="relative mt-4 overflow-x-auto" tabIndex={0} role="region" aria-label={`Table: ${head.join(", ")}`}>
    <table className="w-full min-w-[480px] border-collapse text-left text-sm">
      <thead>
        <tr className="border-b border-gray-200">
          {head.map((h) => (
            <th key={h} scope="col" className="py-2 pr-4 font-semibold text-[#111827]">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="border-b border-gray-100">
            {r.map((c, j) =>
              j === 0 ? (
                <th key={j} scope="row" className="py-2 pr-4 font-medium text-[#111827]">
                  {c}
                </th>
              ) : (
                <td key={j} className="py-2 pr-4 text-[#4B5563]">
                  {c}
                </td>
              )
            )}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

/* ----------------------------------------------------------- landscape map */

export type MapPoint = {
  label: string;
  x: number; // 0-100
  y: number; // 0-100
  series: SeriesKey;
  detail: string;
  /** Draw a text label (selective labelling; every point keeps its tooltip). */
  showLabel?: boolean;
  labelSide?: "right" | "left" | "above" | "below" | "below-left";
};

/**
 * Two-axis positioning map with four named zones. Points that share exact
 * coordinates are fanned out on a small ring so none hides another; their
 * true values stay in the tooltip and the table.
 */
export function LandscapeMap({
  points,
  xLabel,
  yLabel,
  zones,
  ariaLabel,
  textScale = 1,
  minWidthClass = "min-w-[620px]",
}: {
  points: MapPoint[];
  xLabel: string;
  yLabel: string;
  /** [top-left, top-right, bottom-left, bottom-right] */
  zones: [string, string, string, string];
  ariaLabel: string;
  /** Enlarge text and markers when the map is drawn narrow (homepage card). */
  textScale?: number;
  /** Below this width the map scrolls sideways instead of shrinking its text. */
  minWidthClass?: string;
}) {
  const k = textScale;
  // r leaves room for labels of points at 100% (Telleo's map has several there)
  const W = 760, H = 600, m = { t: 20, r: 20 + 56 / k, b: 40 + 16 * k, l: 44 + 20 * k };
  const iw = W - m.l - m.r, ih = H - m.t - m.b;
  const sx = (v: number) => m.l + (v / 100) * iw;
  const sy = (v: number) => m.t + ih - (v / 100) * ih;
  const ticks = [0, 25, 50, 75, 100];

  // fan out coincident points
  const groups = new Map<string, MapPoint[]>();
  points.forEach((p) => {
    const k = `${p.x}|${p.y}`;
    groups.set(k, [...(groups.get(k) ?? []), p]);
  });
  const placed = points.map((p) => {
    const g = groups.get(`${p.x}|${p.y}`)!;
    if (g.length === 1) return { p, cx: sx(p.x), cy: sy(p.y) };
    const i = g.indexOf(p);
    const a = (2 * Math.PI * i) / g.length - Math.PI / 2;
    const r = 8 + g.length;
    return { p, cx: sx(p.x) + r * Math.cos(a), cy: sy(p.y) + r * Math.sin(a) };
  });

  const zone = (x: number, y: number, text: string, anchor: "start" | "end") => (
    <text x={x} y={y} textAnchor={anchor} fontSize={13 * k} fontWeight={700} fill={INK.muted} letterSpacing="0.06em">
      {text.toUpperCase()}
    </text>
  );

  return (
    <div className="relative -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0" tabIndex={0} role="region" aria-label="Platform map (scrolls sideways on small screens)">
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={ariaLabel} className={`h-auto w-full ${minWidthClass}`} style={{ fontFamily: "inherit" }}>
      {/* quadrants */}
      <rect x={sx(50)} y={sy(100)} width={iw / 2} height={ih / 2} fill="#EBFBF3" />
      <rect x={sx(0)} y={sy(100)} width={iw / 2} height={ih / 2} fill="#F9FAFB" />
      <rect x={sx(0)} y={sy(50)} width={iw / 2} height={ih / 2} fill="#FFFFFF" />
      <rect x={sx(50)} y={sy(50)} width={iw / 2} height={ih / 2} fill="#F9FAFB" />
      {ticks.map((t) => (
        <g key={t}>
          <line x1={sx(t)} x2={sx(t)} y1={m.t} y2={m.t + ih} stroke={t === 50 ? INK.axis : INK.grid} strokeWidth={t === 50 ? 1.5 : 1} />
          <line x1={m.l} x2={m.l + iw} y1={sy(t)} y2={sy(t)} stroke={t === 50 ? INK.axis : INK.grid} strokeWidth={t === 50 ? 1.5 : 1} />
          <text x={sx(t)} y={m.t + ih + 8 + 12 * k} textAnchor="middle" fontSize={12 * k} fill={INK.muted}>{t}%</text>
          <text x={m.l - 8} y={sy(t)} dy="0.32em" textAnchor="end" fontSize={12 * k} fill={INK.muted}>{t}%</text>
        </g>
      ))}
      <rect x={m.l} y={m.t} width={iw} height={ih} fill="none" stroke={INK.axis} />
      {/* zone names sit in the corners nearest the centre lines, leaving the
          outer corners (where extreme points land) free for labels */}
      {zone(sx(0) + 12, sy(100) + 12 + 12 * k, zones[0], "start")}
      {zone(sx(50) + 12, sy(100) + 12 + 12 * k, zones[1], "start")}
      {zone(sx(0) + 12, sy(0) - 14, zones[2], "start")}
      {zone(sx(100) - 12, sy(0) - 14, zones[3], "end")}
      <text x={m.l + iw / 2} y={H - 10} textAnchor="middle" fontSize={13 * k} fill={INK.secondary}>{xLabel} →</text>
      <text transform={`translate(${6 + 12 * k} ${m.t + ih / 2}) rotate(-90)`} textAnchor="middle" fontSize={13 * k} fill={INK.secondary}>{yLabel} →</text>

      {[...placed]
        .sort((a, b) => (a.p.series === "telleo" ? 1 : 0) - (b.p.series === "telleo" ? 1 : 0))
        .map(({ p, cx, cy }) => {
          const isV = p.series === "telleo";
          const side = p.labelSide ?? "right";
          const g = 10 * Math.min(k, 1.4);
          const lx = side === "right" ? cx + g : side === "left" || side === "below-left" ? cx - g : cx;
          const ly = side === "above" ? cy - g - 1 : side === "below" ? cy + 9 + 10 * k : side === "below-left" ? cy + 10 + 12 * k : cy;
          const anchor = side === "right" ? "start" : side === "left" || side === "below-left" ? "end" : "middle";
          return (
            <g key={p.label}>
              <title>{`${p.label}: ${p.detail}`}</title>
              <circle cx={cx} cy={cy} r={12} fill="transparent" />
              <Marker kind={p.series} x={cx} y={cy} r={(isV ? 8 : 5.5) * Math.min(k, 1.4)} />
              {(p.showLabel || isV) && (
                <text
                  x={lx}
                  y={ly}
                  dy={side === "right" || side === "left" ? "0.32em" : undefined}
                  textAnchor={anchor}
                  fontSize={(isV ? 15 : 12) * k}
                  fontWeight={isV ? 700 : 500}
                  fill={isV ? INK.primary : INK.secondary}
                  paintOrder="stroke"
                  stroke="#ffffff"
                  strokeWidth={3}
                  strokeLinejoin="round"
                >
                  {p.label}
                </text>
              )}
            </g>
          );
        })}
    </svg>
    </div>
  );
}
