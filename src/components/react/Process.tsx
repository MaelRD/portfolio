import { useEffect, useRef } from "react";
import { PROCESS_STEPS, SECTION_HEADERS, type Lang } from "../../data/content";
import Reveal from "./Reveal";

const ACCENTS: Record<(typeof PROCESS_STEPS)[number]["accent"], { border: string; color: string }> = {
  violet: { border: "rgba(139,92,246,.45)", color: "#A78BFA" },
  sky: { border: "rgba(56,189,248,.45)", color: "#38BDF8" },
  fuchsia: { border: "rgba(192,38,211,.45)", color: "#E879F9" },
};

const STEP_COUNT = PROCESS_STEPS.length;
const CYCLE_SECONDS = 1.6 * STEP_COUNT;
// The `88%` checkpoint in the `cosmic-flow-sweep` keyframe (global.css) —
// how far into the cycle the beam finishes crossing the track before it
// holds at full width and then resets.
const FULL_AT = 0.88;
// With `repeat(auto-fit, minmax(…,1fr))` and no wrap, the N step columns are
// exactly equal-width, so icon i sits at ((i+0.5)/N) of the row. The track
// itself is inset by that same half-column margin on each side (see
// `EDGE_PERCENT` below), which is what makes the *first* and *last* icon
// sit exactly on the track's two ends — so icon i's position along the
// track (0 = start, 1 = end) reduces to the simple i/(N-1).
const EDGE_PERCENT = 50 / STEP_COUNT;
// Icon i should be lit right when the (linear) beam reaches its position:
// time = positionFraction * timeToFullWidth.
const stepDelay = (i: number) => (STEP_COUNT > 1 ? (i / (STEP_COUNT - 1)) * FULL_AT * CYCLE_SECONDS : 0);

export default function Process({ lang }: { lang: Lang }) {
  const h = SECTION_HEADERS.process;
  const trackRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  // The beam only makes sense as a single straight line: once the steps wrap
  // onto more than one row (narrow viewports), hide the track and beam
  // instead of drawing a line across items that no longer sit on one axis.
  useEffect(() => {
    const list = listRef.current;
    const track = trackRef.current;
    const beam = beamRef.current;
    if (!list || !track || !beam) return;
    const check = () => {
      const items = Array.from(list.children) as HTMLElement[];
      const wrapped = items.length > 1 && items[0].offsetTop !== items[items.length - 1].offsetTop;
      track.style.display = wrapped ? "none" : "block";
      beam.style.display = wrapped ? "none" : "block";
    };
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      id="process"
      style={{
        scrollMarginTop: 100,
        padding: "clamp(50px,7vh,90px) clamp(20px,5vw,80px) clamp(60px,9vh,110px)",
        borderTop: "1px solid rgba(148,163,184,.08)",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 18, marginBottom: 56 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <h2 style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(20px,2.2vw,26px)", fontWeight: 500, letterSpacing: ".22em", color: "#F8FAFC" }}>
            {h.title[lang]}
          </h2>
          <span aria-hidden="true" style={{ display: "block", width: "clamp(30px,6vw,80px)", height: 1, background: `linear-gradient(90deg,${h.accent}, transparent)` }} />
        </div>
        <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 10, letterSpacing: ".26em", color: "#64748B" }}>{h.tag[lang]}</span>
      </div>

      <div style={{ position: "relative" }}>
        {/* Lane wrapper: inset by EDGE_PERCENT on each side so its two ends
            land exactly on the first and last icon's centers (see the
            comment on EDGE_PERCENT above). Track and beam both size
            themselves as 0-100% of THIS element, not of the section — so
            the beam's animated width can never overshoot past the track. */}
        <div ref={trackRef} aria-hidden="true" style={{ position: "absolute", left: `${EDGE_PERCENT}%`, right: `${EDGE_PERCENT}%`, top: 60, height: 1 }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(148,163,184,.16)" }} />
          <div
            ref={beamRef}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "0%",
              background: "linear-gradient(90deg,#7042F8,#38BDF8)",
              boxShadow: "0 0 12px rgba(56,189,248,.8)",
              animation: `cosmic-flow-sweep ${CYCLE_SECONDS}s linear infinite`,
            }}
          />
        </div>
        <ol
          ref={listRef}
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))",
            gap: 26,
          }}
        >
          {PROCESS_STEPS.map((step, i) => {
            const c = ACCENTS[step.accent];
            return (
              <Reveal key={step.n} delay={Math.min(i, 4) * 70}>
                <li style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 12 }}>
                  <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 11, letterSpacing: ".2em", color: "#94A3B8" }}>{step.n}</span>
                  <span
                    aria-hidden="true"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 54,
                      height: 54,
                      borderRadius: "50%",
                      border: `1px solid ${c.border}`,
                      background: "rgba(5,8,22,.9)",
                      color: c.color,
                      fontSize: step.icon === "</>" ? 17 : 19,
                      fontFamily: step.icon === "</>" ? "'Geist Mono',monospace" : undefined,
                      animation: `cosmic-step-pulse ${CYCLE_SECONDS}s ease-in-out infinite`,
                      animationDelay: `${stepDelay(i)}s`,
                    }}
                  >
                    {step.icon}
                  </span>
                  <strong style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 17, fontWeight: 500, color: "#F8FAFC" }}>{step.title[lang]}</strong>
                  <p style={{ margin: 0, maxWidth: 190, fontSize: 13.5, lineHeight: 1.6, color: "#94A3B8" }}>{step.body[lang]}</p>
                </li>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
