import { useEffect, useRef, useState } from "react";
import { CV_FILENAME, CV_PATH, HERO, type Lang, type Topology } from "../../data/content";
import ArchitectureDiagram from "./ArchitectureDiagram";
import { useMagnetic } from "./hooks";
import { MOTION, hasFinePointer, prefersReducedMotion, useScramble } from "./motion";
import RevealText from "./RevealText";

// Compact horizontal version of the hero topology for phones.
const MOBILE_TOPOLOGY: Topology = {
  aspect: 4.2,
  nodes: HERO.topology.nodes.map((n, i) => ({ id: n.id, label: n.label, x: 9 + i * 20.5, y: 50 })),
  edges: HERO.topology.edges,
};

/**
 * WOW 1 — the system initializes. Sequence (all timings from MOTION):
 *   intro overlay "MYG / SYSTEM INITIALIZING" (Layout, CSS-only, ~0.6s, once per session)
 *   → name label → role → headline line by line (mask reveal)
 *   → body, actions and stack, staggered
 * while the USER → UI → API → LOGIC → DATA topology builds itself.
 * Server render / no JS / reduced motion: everything visible, no motion.
 */
export default function Hero({ lang }: { lang: Lang }) {
  const primaryRef = useMagnetic<HTMLAnchorElement>();
  const visualRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(-1); // -1 = not started (static render)

  // Start the sequence once the intro overlay is on its way out.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const introPlaying = document.documentElement.dataset.intro === "play";
    const t0 = introPlaying ? 480 : 60;
    setStage(0);
    const timers = [1, 2, 3].map((s, i) => window.setTimeout(() => setStage(s), t0 + [0, MOTION.normal, MOTION.slow + MOTION.normal][i]));
    return () => timers.forEach(clearTimeout);
  }, []);

  // Tiny pointer parallax on the topology (desktop, motion allowed).
  useEffect(() => {
    const el = visualRef.current;
    if (!el || prefersReducedMotion() || !hasFinePointer()) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    const onMove = (e: PointerEvent) => {
      x = e.clientX / window.innerWidth - 0.5;
      y = e.clientY / window.innerHeight - 0.5;
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0;
          el.style.setProperty("--px", x.toFixed(3));
          el.style.setProperty("--py", y.toFixed(3));
        });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const started = stage >= 1;
  const status = useScramble(HERO.status.value[lang], stage >= 3, MOTION.slow);
  const seq = (i: number) => ({ "data-seq": stage === -1 ? "static" : stage >= 3 ? "in" : "out", style: { transitionDelay: `${i * MOTION.stagger}ms` } });

  return (
    <section id="hero" aria-labelledby="hero-title" className="hero">
      {/* Technical background: coordinates and ticks, 3–12% opacity, never behind the text column's contrast. */}
      <div className="hero-coords" aria-hidden="true">
        <span style={{ left: "4%", top: "18%" }}>X 0120 · Y 0048</span>
        <span style={{ left: "4%", bottom: "4%" }}>NODE 05 / 05</span>
        <span style={{ left: "38%", bottom: "4%" }}>LAT 19.43 · LON −99.13</span>
        <span style={{ right: "3%", bottom: "22%" }}>v2026.09</span>
      </div>

      <div className="hero-copy">
        <h1 id="hero-title" className="hero-title">
          <span className="hero-title__name" {...seq(0)} data-seq={stage === -1 ? "static" : stage >= 0 ? "in" : "out"}>
            {HERO.name}
          </span>
          <span className="sr-only">, </span>
          <RevealText text={HERO.role} className="hero-title__role" play={stage === -1 ? undefined : started} delay={0} />
        </h1>

        <RevealText as="p" text={HERO.headline[lang]} className="hero-headline" play={stage === -1 ? undefined : stage >= 2} />

        <p className="hero-body" {...seq(0)}>
          {HERO.body[lang]}
        </p>

        <div className="hero-actions" {...seq(1)}>
          <a ref={primaryRef} href="#work" className="mael-btn mael-btn--primary" data-cursor="link">
            <span className="mael-btn__label">{HERO.ctaWork[lang]}</span>
            <span className="mael-btn__arrow" aria-hidden="true">
              →
            </span>
          </a>
          <a href="#process" className="mael-btn mael-btn--ghost" data-cursor="link">
            <span className="mael-btn__label">{HERO.ctaProcess[lang]}</span>
            <span className="mael-btn__arrow" aria-hidden="true">
              ↓
            </span>
          </a>
          <a href={CV_PATH} download={CV_FILENAME} className="mael-btn mael-btn--text" data-cursor="link">
            <span className="mael-btn__label">{HERO.ctaCv[lang]}</span>
            <span className="mael-btn__arrow" aria-hidden="true">
              ↓
            </span>
          </a>
        </div>

        <p className="hero-stack" {...seq(2)}>
          <span className="sr-only">{HERO.stackLabel[lang]}: </span>
          {HERO.stack.join(" · ")}
        </p>

        <div className="hero-mobile-topology" {...seq(3)}>
          <ArchitectureDiagram topology={MOBILE_TOPOLOGY} size="sm" play={stage === -1 || stage >= 2} label={HERO.topologyLabel[lang]} />
        </div>
      </div>

      <div ref={visualRef} className="hero-visual">
        <div className="hero-status" aria-live="off">
          <span className="hero-status__k">{HERO.status.label}</span>
          <span className="hero-status__v">
            <span className="status-dot" aria-hidden="true" />
            {stage === -1 || stage >= 3 ? status : HERO.status.booting}
          </span>
        </div>
        <ArchitectureDiagram topology={HERO.topology} accent="#8B5CF6" play={stage === -1 || stage >= 0} label={HERO.topologyLabel[lang]} highlight="logic" />
        <dl className="hero-readout">
          {HERO.profile.rows
            .filter((r) => r.k !== "STATUS")
            .map((row) => (
              <div key={row.k}>
                <dt>{row.k}</dt>
                <dd>{row.v[lang]}</dd>
              </div>
            ))}
        </dl>
      </div>
    </section>
  );
}
