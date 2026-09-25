import { useEffect, useRef } from "react";
import { PROCESS_STEPS, SECTIONS, type Lang } from "../../data/content";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

// One sweep of the beam across all steps, in ms. The beam reaches the last
// step at FULL_AT of the cycle, holds briefly, then restarts.
const CYCLE_MS = 1600 * PROCESS_STEPS.length;
const FULL_AT = 0.88;

type StepState = "idle" | "done" | "active";

/**
 * Drives the beam and the step icons from a single clock, so they can never
 * drift apart (two independent CSS animations only stay in phase if they
 * start on the same frame — a resize across the breakpoint used to restart
 * the beam but not the icons). The track is sized from the icons' measured
 * centers, horizontally on desktop and vertically below 1024px, and each
 * icon lights up exactly when the beam tip reaches it.
 */
function useProcessBeam() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    const beam = beamRef.current;
    if (!wrap || !track || !beam) return;

    const icons = Array.from(wrap.querySelectorAll<HTMLElement>(".process-icon"));
    const desktop = window.matchMedia("(min-width: 1024px)");
    let reduce = false;
    try {
      reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      /* matchMedia unavailable */
    }

    let horizontal = desktop.matches;
    let fracs: number[] = icons.map((_, i) => i / Math.max(1, icons.length - 1));
    const states: StepState[] = icons.map(() => "idle");

    const setState = (i: number, s: StepState) => {
      if (states[i] === s) return;
      states[i] = s;
      icons[i].dataset.state = s;
    };

    // Size the track to run exactly from the first icon's center to the
    // last one's, and record where each icon sits along it (0..1).
    const measure = () => {
      horizontal = desktop.matches;
      const w = wrap.getBoundingClientRect();
      const centers = icons.map((ic) => {
        const r = ic.getBoundingClientRect();
        return horizontal ? r.left + r.width / 2 - w.left : r.top + r.height / 2 - w.top;
      });
      const start = centers[0];
      const len = Math.max(1, centers[centers.length - 1] - start);
      const cross = icons[0].getBoundingClientRect();
      const crossPos = horizontal ? cross.top + cross.height / 2 - w.top : cross.left + cross.width / 2 - w.left;
      Object.assign(
        track.style,
        horizontal
          ? { left: `${start}px`, width: `${len}px`, top: `${crossPos}px`, height: "1px", right: "auto", bottom: "auto" }
          : { top: `${start}px`, height: `${len}px`, left: `${crossPos}px`, width: "1px", right: "auto", bottom: "auto" },
      );
      beam.style.transformOrigin = horizontal ? "left center" : "center top";
      fracs = centers.map((c) => (c - start) / len);
    };

    const render = (f: number) => {
      beam.style.transform = horizontal ? `scaleX(${f})` : `scaleY(${f})`;
      // The step the beam most recently reached is "active"; earlier ones stay lit.
      let current = -1;
      fracs.forEach((p, i) => {
        if (f >= p - 0.001) current = i;
      });
      icons.forEach((_, i) => setState(i, i < current ? "done" : i === current ? "active" : "idle"));
    };

    measure();

    if (reduce) {
      // No motion: show the whole path as complete, nothing pulses.
      beam.style.transform = horizontal ? "scaleX(1)" : "scaleY(1)";
      icons.forEach((_, i) => setState(i, "done"));
      const onChange = () => {
        measure();
        beam.style.transform = horizontal ? "scaleX(1)" : "scaleY(1)";
      };
      window.addEventListener("resize", onChange, { passive: true });
      document.fonts?.ready.then(onChange).catch(() => {});
      return () => window.removeEventListener("resize", onChange);
    }

    let raf = 0;
    let origin = 0;
    let running = false;
    const tick = (now: number) => {
      if (!origin) origin = now;
      const p = ((now - origin) % CYCLE_MS) / CYCLE_MS;
      render(Math.min(p / FULL_AT, 1));
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (running) return;
      running = true;
      measure(); // layout may have shifted (fonts, entrance animations) since the last measure
      origin = 0; // each time the section comes into view, the sweep starts from step 01
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Only animate while the section is on screen.
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), { threshold: 0.15 });
    io.observe(wrap);

    const ro = new ResizeObserver(() => measure());
    ro.observe(wrap);
    // Entrance animations (Reveal) and web-font swaps shift the steps; re-measure once they settle.
    wrap.addEventListener("animationend", measure);
    window.addEventListener("load", measure);
    document.fonts?.ready.then(measure).catch(() => {});
    desktop.addEventListener("change", measure);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      wrap.removeEventListener("animationend", measure);
      window.removeEventListener("load", measure);
      desktop.removeEventListener("change", measure);
    };
  }, []);

  return { wrapRef, trackRef, beamRef };
}

export default function Process({ lang }: { lang: Lang }) {
  const { wrapRef, trackRef, beamRef } = useProcessBeam();

  return (
    <section id="process" aria-labelledby="process-title" className="mael-section">
      <SectionHeader header={SECTIONS.process} lang={lang} id="process-title" accent="#38BDF8" />

      {/* Desktop: one row joined by a track the beam sweeps along.
          Below 1024px: vertical cards, same beam running top to bottom. */}
      <div ref={wrapRef} className="process-wrap">
        <div ref={trackRef} className="process-track" aria-hidden="true">
          <div ref={beamRef} className="process-beam" />
        </div>
        <ol className="process-list">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal as="li" key={step.n} delay={Math.min(i, 4) * 70} className="process-step">
              <span
                aria-hidden="true"
                className="process-icon"
                style={{
                  border: `1px solid ${step.accent}80`,
                  color: step.accent,
                  fontSize: step.icon === "</>" ? 16 : 19,
                  fontFamily: step.icon === "</>" ? "'Geist Mono',monospace" : undefined,
                }}
              >
                <span className="process-icon__glyph">{step.icon}</span>
              </span>
              <div className="process-text">
                <h3 style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontSize: 18.5, fontWeight: 500, color: "#F8FAFC" }}>
                  <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 13, letterSpacing: ".1em", color: step.accent, marginRight: 8 }}>
                    {step.n}
                  </span>
                  {step.title[lang]}
                </h3>
                <p style={{ margin: "8px 0 0", fontSize: 15, lineHeight: 1.6, color: "#CBD5E1" }}>{step.body[lang]}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
