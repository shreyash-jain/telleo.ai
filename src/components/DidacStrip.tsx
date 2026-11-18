/**
 * DIDAC India 2026 strip (25–27 Nov, BIEC Bengaluru, Stall G-60).
 *
 * A thin bar at the very top of the page that links to vacademy.io/didac/.
 * It scrolls away with the page; a fixed header reads `--didac-offset` for its
 * `top`, so the header sits under the strip at the top of the page and moves up
 * to 0 as the strip scrolls out of view.
 *
 * No React state: `DidacStripScript` runs once while the HTML parses and marks
 * <html data-didac="off"> when the visitor closed the strip, when the page is
 * excluded, or once the event is over (after 27 Nov 2026, IST). CSS then hides
 * the strip and the offset drops to 0, so there is no flash and nothing to
 * hydrate. Delete this file and its two usages after the event.
 */

const HREF = "https://vacademy.io/didac/?src=telleo-strip";
const LEAD = "Telleo is at DIDAC India 2026";
const STALL = "Vacademy Stall G-60";
/** Paths that never show the strip (first page load only). */
const EXCLUDE: string[] = [];

const END_UTC = Date.UTC(2026, 10, 27, 18, 30); // 28 Nov 2026 00:00 IST
const HEIGHT = 36;

const CSS = `
:root{--didac-offset:${HEIGHT}px}
html[data-didac="off"]{--didac-offset:0px}
html[data-didac="off"] .didac-strip{display:none}
.didac-strip{position:relative;z-index:30;height:${HEIGHT}px;display:flex;align-items:center;justify-content:center;padding:0 40px 0 12px;background:#151A33;color:#fff;font-size:13px;line-height:1;overflow:hidden}
.didac-strip__link{display:flex;align-items:center;gap:8px;min-width:0;color:inherit;text-decoration:none;white-space:nowrap}
.didac-strip__link:focus-visible{outline:2px solid #ED7424;outline-offset:2px;border-radius:4px}
.didac-strip__dot{flex:none;width:8px;height:8px;border-radius:50%;background:#ED7424;box-shadow:0 0 0 3px rgba(237,116,36,.28)}
.didac-strip__lead{font-weight:700}
.didac-strip__meta{color:#C9CFE3;overflow:hidden;text-overflow:ellipsis}
.didac-strip__cta{flex:none;margin-left:4px;color:#FFB37A;font-weight:700}
.didac-strip__link:hover .didac-strip__cta{text-decoration:underline;text-underline-offset:3px}
.didac-strip__x{position:absolute;right:6px;top:50%;transform:translateY(-50%);width:28px;height:28px;display:flex;align-items:center;justify-content:center;border:0;border-radius:6px;background:transparent;color:#C9CFE3;font-size:18px;line-height:1;cursor:pointer}
.didac-strip__x:hover{background:rgba(255,255,255,.1);color:#fff}
.didac-strip__x:focus-visible{outline:2px solid #ED7424}
@media (max-width:639px){.didac-strip__wide{display:none}}
@media (min-width:640px){.didac-strip__narrow{display:none}}
@media print{.didac-strip{display:none}}
`;

const SCRIPT = `(function(){try{
var d=document.documentElement,K="didac2026-strip-closed",p=location.pathname,ex=${JSON.stringify(EXCLUDE)},c=false;
try{c=localStorage.getItem(K)==="1"}catch(e){}
function off(){d.setAttribute("data-didac","off");d.style.setProperty("--didac-offset","0px")}
if(Date.now()>${END_UTC}||c||ex.some(function(x){return p.indexOf(x)===0})){off();return}
function upd(){if(d.getAttribute("data-didac")!=="off")d.style.setProperty("--didac-offset",Math.max(0,${HEIGHT}-window.scrollY)+"px")}
upd();addEventListener("scroll",upd,{passive:true});
document.addEventListener("click",function(e){var t=e.target;if(t&&t.closest&&t.closest("[data-didac-close]")){off();try{localStorage.setItem(K,"1")}catch(e){}}});
}catch(e){}})();`;

/** Styles + the one-time script. Render once, as early in <body> as possible. */
export function DidacStripScript() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />
    </>
  );
}

/** The strip itself. Render above the header, in normal page flow. */
export function DidacStrip() {
  return (
    <div className="didac-strip" role="region" aria-label="DIDAC India 2026">
      <a className="didac-strip__link" href={HREF}>
        <span className="didac-strip__dot" aria-hidden="true" />
        <span className="didac-strip__lead didac-strip__wide">{LEAD}</span>
        <span className="didac-strip__lead didac-strip__narrow">DIDAC 2026</span>
        <span className="didac-strip__meta didac-strip__wide">· 25–27 Nov · BIEC Bengaluru · {STALL}</span>
        <span className="didac-strip__meta didac-strip__narrow">· Stall G-60 · 25–27 Nov</span>
        <span className="didac-strip__cta">
          <span className="didac-strip__wide">Book a 20-min slot →</span>
          <span className="didac-strip__narrow">Book →</span>
        </span>
      </a>
      <button type="button" className="didac-strip__x" data-didac-close aria-label="Close the DIDAC notice">
        ×
      </button>
    </div>
  );
}
