import { useEffect, useRef, useState, type KeyboardEvent, type MutableRefObject, type RefObject } from "react";
import { STEP_TEXT, STEPS, type Lang } from "../../../data/space";
import { prefersReducedMotion } from "@/lib/motion";

// The process as a space route: a curved SVG path through six planets, one
// per phase, and a small rocket that flies along it to the active planet.
//
// - The path has three strokes: a faint base, the stretch already flown
//   (bright, it grows with the rocket) and a short trail just behind the
//   rocket while it moves.
// - Each planet is a button: future planets are dim, completed ones are lit
//   and carry a check, the active one is larger, ringed and pulses once.
// - The rocket is tweened along the path (requestAnimationFrame) and turned
//   along the curve's tangent, measured in screen space because the SVG is
//   stretched to the box (preserveAspectRatio="none").
// Reduced motion: same route and states, the rocket is placed, not flown.

/** Planets in the 1200×280 route box. */
export const PTS: [number, number][] = [
  [90, 230],
  [300, 160],
  [510, 195],
  [720, 110],
  [930, 140],
  [1130, 50],
];

/** Catmull-Rom through the planets, as cubic Béziers. */
function route(pts: [number, number][]) {
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    d += ` C${p1[0] + (p2[0] - p0[0]) / 6} ${p1[1] + (p2[1] - p0[1]) / 6},${p2[0] - (p3[0] - p1[0]) / 6} ${p2[1] - (p3[1] - p1[1]) / 6},${p2[0]} ${p2[1]}`;
  }
  return d;
}
const PATH_D = route(PTS);
const pad = (n: number) => String(n).padStart(2, "0");

/** How far from a planet the rocket parks, in screen px (clear of planet and ring). */
const PARK_PX = 40;
/** Length of the trail behind the rocket, in screen px. */
const TRAIL_PX = 64;
/** Samples for the on-screen length table. */
const SAMPLES = 240;

/**
 * Where each planet falls along the curve, as a fraction of its length. The
 * curve moves left to right, so x rises with length: a binary search on x.
 */
function usePlanetFractions(pathRef: RefObject<SVGPathElement>) {
  const [fr, setFr] = useState(() => PTS.map((_, i) => i / (PTS.length - 1)));
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    try {
      const total = path.getTotalLength();
      setFr(
        PTS.map(([x]) => {
          let lo = 0;
          let hi = total;
          for (let k = 0; k < 24; k++) {
            const mid = (lo + hi) / 2;
            if (path.getPointAtLength(mid).x < x) lo = mid;
            else hi = mid;
          }
          return lo / total;
        }),
      );
    } catch {
      /* keep the even spacing */
    }
  }, [pathRef]);
  return fr;
}

/** PARK_PX as a fraction of the route at its current on-screen size. */
function usePark(box: RefObject<HTMLDivElement>, path: RefObject<SVGPathElement>) {
  const [park, setPark] = useState(0.03);
  useEffect(() => {
    const b = box.current;
    const p = path.current;
    if (!b || !p) return;
    const measure = () => {
      try {
        const onScreen = p.getTotalLength() * (b.getBoundingClientRect().width / 1200);
        if (onScreen > 0) setPark(Math.min(0.08, PARK_PX / onScreen));
      } catch {
        /* keep the default */
      }
    };
    measure();
    const ro = "ResizeObserver" in window ? new ResizeObserver(measure) : null;
    ro?.observe(b);
    return () => ro?.disconnect();
  }, [box, path]);
  return park;
}

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Flies the rocket (and the flown stretch) to `target`, a fraction of the route. */
function useRocket(
  target: number,
  refs: { box: RefObject<HTMLDivElement>; path: RefObject<SVGPathElement>; done: RefObject<SVGPathElement>; trail: RefObject<SVGPathElement>; rocket: RefObject<HTMLSpanElement> },
) {
  const at = useRef<number | null>(null);
  const place = useRef<(f: number) => void>(() => {});

  // Drawing one position: rocket point and heading, flown stretch, trail.
  useEffect(() => {
    const { box, path, done, trail, rocket } = refs;
    let len = 0;
    try {
      len = path.current?.getTotalLength() ?? 0;
    } catch {
      len = 0;
    }
    // Dashes are measured on screen: with non-scaling strokes, Chrome doesn't
    // normalise pathLength once the box stretches the SVG unevenly (phones),
    // so the flown stretch and the trail use a table of on-screen length.
    let table: number[] = [];
    const measure = () => {
      const p = path.current;
      const b = box.current;
      if (!p || !b || !len) return;
      const rect = b.getBoundingClientRect();
      const sx = rect.width / 1200;
      const sy = rect.height / 280;
      table = [0];
      let prev = p.getPointAtLength(0);
      for (let k = 1; k <= SAMPLES; k++) {
        const pt = p.getPointAtLength((k / SAMPLES) * len);
        table.push(table[k - 1] + Math.hypot((pt.x - prev.x) * sx, (pt.y - prev.y) * sy));
        prev = pt;
      }
    };
    const onScreen = (f: number) => {
      if (!table.length) return 0;
      const x = Math.min(SAMPLES, Math.max(0, f * SAMPLES));
      const i = Math.floor(x);
      return table[i] + ((table[Math.min(i + 1, SAMPLES)] ?? table[i]) - table[i]) * (x - i);
    };
    measure();
    place.current = (f: number) => {
      const p = path.current;
      const r = rocket.current;
      const b = box.current;
      if (!p || !r || !b || !len) return;
      const s = f * len;
      const pt = p.getPointAtLength(s);
      const a = p.getPointAtLength(Math.max(0, s - 2));
      const c = p.getPointAtLength(Math.min(len, s + 2));
      const rect = b.getBoundingClientRect();
      const sx = rect.width / 1200;
      const sy = rect.height / 280;
      const deg = (Math.atan2((c.y - a.y) * sy, (c.x - a.x) * sx) * 180) / Math.PI;
      r.style.left = `${pt.x / 12}%`;
      r.style.top = `${pt.y / 2.8}%`;
      r.style.setProperty("--heading", `${deg.toFixed(1)}deg`);
      // Gaps longer than the whole route, so neither pattern ever repeats.
      const flown = onScreen(f);
      const gap = (table[SAMPLES] ?? 0) * 2 + 10;
      const tail = Math.min(TRAIL_PX, flown);
      if (done.current) done.current.style.strokeDasharray = `${flown.toFixed(1)} ${gap.toFixed(0)}`;
      if (trail.current) {
        trail.current.style.strokeDasharray = `${tail.toFixed(1)} ${gap.toFixed(0)}`;
        trail.current.style.strokeDashoffset = `${(tail - flown).toFixed(1)}`;
      }
    };
    if (at.current !== null) place.current(at.current);
    // The heading depends on the box's proportions: redraw when it resizes.
    const ro =
      "ResizeObserver" in window && box.current
        ? new ResizeObserver(() => {
            measure();
            if (at.current !== null) place.current(at.current);
          })
        : null;
    if (box.current) ro?.observe(box.current);
    return () => ro?.disconnect();
  }, [refs]);

  // Flying to a new target.
  useEffect(() => {
    const from = at.current;
    const rocket = refs.rocket.current;
    if (from === null || prefersReducedMotion() || Math.abs(target - from) < 0.001) {
      at.current = target;
      place.current(target);
      return;
    }
    const dur = 650 + 900 * Math.abs(target - from);
    const start = performance.now();
    let raf = 0;
    rocket?.setAttribute("data-moving", "");
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / dur);
      const f = from + (target - from) * ease(k);
      at.current = f;
      place.current(f);
      if (k < 1) raf = requestAnimationFrame(tick);
      else rocket?.removeAttribute("data-moving");
    };
    raf = requestAnimationFrame(tick);
    // A new target mid-flight: continue from wherever the rocket is now.
    return () => {
      cancelAnimationFrame(raf);
      rocket?.removeAttribute("data-moving");
    };
  }, [target, refs]);
}

/** A slim rocket drawn pointing right (0°); --heading turns it along the route. */
function RocketMarker({ rocketRef }: { rocketRef: RefObject<HTMLSpanElement> }) {
  return (
    <span ref={rocketRef} className="rocket" aria-hidden="true">
      <svg viewBox="0 0 44 20" width="44" height="20">
        <defs>
          <linearGradient id="rocket-flame" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0" stopColor="#FFF4E0" />
            <stop offset=".45" stopColor="#FFC07A" />
            <stop offset="1" stopColor="#F9A8D4" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="rocket-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#C9C4EA" />
          </linearGradient>
        </defs>
        <path className="rocket__flame" d="M12 10 L1 6.6 Q4 10 1 13.4 Z" fill="url(#rocket-flame)" />
        <path d="M10 5.2 L14.5 2.4 L16.5 6.2 Z M10 14.8 L14.5 17.6 L16.5 13.8 Z" fill="#A78BFA" />
        <path d="M11 6.4 C18 4.2 30 4.4 38.5 8.4 Q41.5 10 38.5 11.6 C30 15.6 18 15.8 11 13.6 Q9.6 10 11 6.4 Z" fill="url(#rocket-body)" />
        <circle cx="29" cy="10" r="2.3" fill="#030014" />
        <circle cx="29" cy="10" r="1.4" fill="#7DE3FF" />
      </svg>
    </span>
  );
}

export default function SpaceRoute({
  lang,
  sel,
  onSelect,
  onKey,
  buttons,
}: {
  lang: Lang;
  sel: number;
  onSelect: (i: number) => void;
  onKey: (e: KeyboardEvent, i: number) => void;
  buttons: MutableRefObject<(HTMLButtonElement | null)[]>;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const fractions = usePlanetFractions(pathRef);
  const box = useRef<HTMLDivElement>(null);
  const done = useRef<SVGPathElement>(null);
  const trail = useRef<SVGPathElement>(null);
  const rocket = useRef<HTMLSpanElement>(null);
  const refs = useRef({ box, path: pathRef, done, trail, rocket }).current;
  const park = usePark(box, pathRef);
  // Parked just short of the active planet, nose toward it; at the first
  // planet it waits just past it, pointing down the route, ready to leave.
  useRocket(sel === 0 ? fractions[0] + park : fractions[sel] - park, refs);

  return (
    <div ref={box} className="trajectory route" role="group" aria-label={STEP_TEXT.pathLabel[lang]} data-reveal="draw">
      <svg viewBox="0 0 1200 280" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="route-flown" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1200" y2="0">
            <stop offset="0" stopColor="#A78BFA" />
            <stop offset="1" stopColor="#7DE3FF" />
          </linearGradient>
        </defs>
        <path className="route__haze" d={PATH_D} vectorEffect="non-scaling-stroke" />
        <path ref={pathRef} className="route__base" d={PATH_D} vectorEffect="non-scaling-stroke" />
        <path ref={done} className="route__flown" d={PATH_D} vectorEffect="non-scaling-stroke" />
        <path ref={trail} className="route__trail" d={PATH_D} vectorEffect="non-scaling-stroke" />
      </svg>
      <span className="trajectory__star" aria-hidden="true" />
      <ol className="waypoints">
        {STEPS.map((s, i) => {
          const state = i < sel ? "done" : i === sel ? "active" : "next";
          return (
            <li key={s.name.en}>
              <button
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                type="button"
                className="waypoint"
                style={{ left: `${PTS[i][0] / 12}%`, top: `${PTS[i][1] / 2.8}%` }}
                aria-pressed={i === sel}
                aria-controls="phase"
                data-state={state}
                data-done={i < sel ? "" : undefined}
                onClick={() => onSelect(i)}
                onKeyDown={(e) => onKey(e, i)}
              >
                <span className="rp" aria-hidden="true" />
                <span className="waypoint__label">
                  <span className="waypoint__n">
                    {pad(i + 1)}
                    {i < sel && <span className="waypoint__check"> ✓</span>}
                  </span>
                  <span className="waypoint__name">{s.name[lang]}</span>
                  {i < sel && <span className="sr-only">, {STEP_TEXT.done[lang]}</span>}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <RocketMarker rocketRef={rocket} />
    </div>
  );
}
