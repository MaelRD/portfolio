import { useEffect, useRef, useState, type KeyboardEvent, type RefObject } from "react";
import { HEADS, STEP_TEXT, STEPS, type Lang } from "../../../data/space";
import { Head } from "./ui";

// Waypoints in the 1200×280 trajectory box.
const PTS: [number, number][] = [
  [90, 230],
  [300, 160],
  [510, 195],
  [720, 110],
  [930, 140],
  [1130, 50],
];

/** Catmull-Rom through the waypoints, as cubic Béziers. */
function trajectory(pts: [number, number][]) {
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
const PATH_D = trajectory(PTS);
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Where each waypoint falls along the curve, as a fraction of its length, so
 * the travelled part of the trajectory can end exactly on the chosen phase.
 * The curve moves left to right, so x rises with length: a binary search on x.
 */
function useWaypointFractions(pathRef: RefObject<SVGPathElement>) {
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

export default function Process({ lang, pathRef }: { lang: Lang; pathRef: RefObject<SVGPathElement> }) {
  const [sel, setSel] = useState(0);
  const step = STEPS[sel];
  const fractions = useWaypointFractions(pathRef);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  // Arrow keys move along the trajectory, like a set of tabs.
  const onKey = (e: KeyboardEvent, i: number) => {
    const next = e.key === "ArrowRight" || e.key === "ArrowDown" ? i + 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? i - 1 : e.key === "Home" ? 0 : e.key === "End" ? STEPS.length - 1 : null;
    if (next === null || next < 0 || next >= STEPS.length) return;
    e.preventDefault();
    setSel(next);
    buttons.current[next]?.focus();
  };

  return (
    <section id="process" className="sec" aria-labelledby="process-title">
      <div className="wrap stack-40">
        <Head head={HEADS.process} lang={lang} id="process-title" />

        <div className="trajectory" role="group" aria-label={STEP_TEXT.pathLabel[lang]}>
          <svg viewBox="0 0 1200 280" preserveAspectRatio="none" aria-hidden="true">
            <path d={PATH_D} fill="none" stroke="rgba(167,139,250,.25)" strokeWidth="10" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
            <path ref={pathRef} d={PATH_D} fill="none" stroke="rgba(125,227,255,.7)" strokeWidth="1.5" strokeDasharray="4 6" vectorEffect="non-scaling-stroke" />
            {/* The stretch already travelled, up to the chosen phase. */}
            <path className="trajectory__done" d={PATH_D} pathLength={1} style={{ strokeDasharray: `${fractions[sel]} 1` }} vectorEffect="non-scaling-stroke" />
          </svg>
          <span className="probe" data-probe aria-hidden="true" />
          <span className="trajectory__star" aria-hidden="true" />
          <ol className="waypoints">
            {STEPS.map((s, i) => (
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
                  data-done={i < sel ? "" : undefined}
                  onClick={() => setSel(i)}
                  onKeyDown={(e) => onKey(e, i)}
                >
                  <span className="waypoint__dot" />
                  <span className="waypoint__label">
                    <span className="waypoint__n">{pad(i + 1)}</span>
                    <span className="waypoint__name">{s.name[lang]}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div id="phase" className="spotlight panel phase">
          <div className="phase__main swap" key={`m${sel}`}>
            <span className="label label--12" style={{ color: "var(--cyan)" }}>
              {STEP_TEXT.phase[lang]} {pad(sel + 1)} · {step.code[lang]}
            </span>
            <div className="phase__title">
              <span className="phase__n" aria-hidden="true">
                {pad(sel + 1)}
              </span>
              <h3 className="phase__name">{step.name[lang]}</h3>
            </div>
            <p className="phase__desc">{step.desc[lang]}</p>
          </div>
          <div className="phase__side swap" key={`s${sel}`}>
            <ul className="tags">
              {step.tags.map((t) => (
                <li key={t.en}>{t[lang]}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
