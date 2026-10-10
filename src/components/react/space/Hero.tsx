import { Fragment, useEffect, useRef, type CSSProperties } from "react";
import { HERO, type Lang } from "../../../data/space";
import Name from "./Name";
import CornerLoop from "./Loop";
import { Planet, SURFACES } from "./ui";
import BackgroundBeams from "../../aceternity/BackgroundBeams";
import { CTAButton, SplitWords } from "../../kit";
import { HERO_CTA } from "../../../data/v2";
import { CV_FILENAME, CV_PATH } from "../../../data/content";

/**
 * The orrery leans a few degrees toward the pointer, as if lit from where the
 * visitor is looking. Mouse and trackpad only; still under reduced motion.
 */
function useTilt() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    let ok = false;
    try {
      ok = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches;
    } catch {
      /* matchMedia unavailable */
    }
    if (!el || !ok) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      raf = 0;
      el.style.setProperty("--tx", x.toFixed(3));
      el.style.setProperty("--ty", y.toFixed(3));
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)));
      y = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2)));
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);
  return ref;
}

export default function Hero({ lang }: { lang: Lang }) {
  const tiltRef = useTilt();
  return (
    <section id="hero" className="launch" aria-labelledby="hero-title" data-scrub="exit">
      <BackgroundBeams />
      <CornerLoop lang={lang} />
      <div className="hero__grid">
        <div className="hero__copy">
          <Name first={HERO.first} last={HERO.last} />
          <p className="hero__role">
            <span>{HERO.eyebrow[lang]}</span>
          </p>
          <p className="hero__headline">
            <SplitWords text={HERO.statement[lang]} highlight={HERO.highlight[lang]} />
          </p>
          <p className="hero__desc">{HERO.description[lang]}</p>
          <p className="hero__stack">
            <span className="sr-only">{HERO.stackLabel[lang]}: </span>
            {HERO.stack.join(" · ")}
          </p>
          <p className="hero__status">
            <span className="dot-live" data-blink aria-hidden="true" />
            {HERO.status[lang]}
          </p>
          <div className="hero__ctas">
            <CTAButton href="#work" moving magnetic arrow="↓" data-track="View Work" data-track-label="hero">
              {HERO_CTA.work[lang]}
            </CTAButton>
            <CTAButton href="#contact" variant="line" data-track="Contact" data-track-label="hero">
              {HERO_CTA.talk[lang]}
            </CTAButton>
          </div>
          <p className="hero__recruit">
            {HERO_CTA.recruiter[lang]} <a href="#experience">{HERO_CTA.experience[lang]}</a>
            <span aria-hidden="true">·</span>
            <a href={CV_PATH} download={CV_FILENAME} data-track="Download Resume" data-track-label="hero">
              {HERO_CTA.cv[lang]}
            </a>
          </p>
        </div>

        <div className="hero__visual">
          <figure
            ref={tiltRef}
            className="orrery"
            role="img"
            aria-label={HERO.orbitLabel[lang]}
            style={{ margin: 0 }}
          >
            <div className="orrery__glow" />
            <svg viewBox="0 0 100 100" aria-hidden="true">
              {/* Orbits brighten toward the viewer: the far side (top of each
                  ellipse) fades back, the near side comes forward. */}
              <defs>
                <linearGradient id="orbit-depth" gradientUnits="userSpaceOnUse" x1="0" y1="31" x2="0" y2="69">
                  <stop offset="0" stopColor="#A78BFA" stopOpacity=".14" />
                  <stop offset=".55" stopColor="#A78BFA" stopOpacity=".38" />
                  <stop offset="1" stopColor="#C4B5FD" stopOpacity=".7" />
                </linearGradient>
                <linearGradient id="orbit-depth-outer" gradientUnits="userSpaceOnUse" x1="0" y1="31" x2="0" y2="69">
                  <stop offset="0" stopColor="#7DE3FF" stopOpacity=".1" />
                  <stop offset="1" stopColor="#7DE3FF" stopOpacity=".5" />
                </linearGradient>
              </defs>
              <g transform="rotate(-14 50 50)" fill="none" stroke="url(#orbit-depth)" strokeWidth=".22">
                {HERO.orbits.map((o, i) => (
                  <ellipse
                    key={o.rx}
                    cx="50"
                    cy="50"
                    rx={o.rx}
                    ry={o.ry}
                    strokeDasharray={i % 2 ? ".8 1.2" : undefined}
                    stroke={i === HERO.orbits.length - 1 ? "url(#orbit-depth-outer)" : undefined}
                    style={{ ["--k" as string]: i } as CSSProperties}
                  />
                ))}
              </g>
            </svg>
            <div className="orrery__ring orrery__ring--back" />
            <Planet className="orrery__planet" style={{ position: "absolute" }} surface={SURFACES.hero} speed={14}>
              <span className="orrery__rim" />
            </Planet>
            <div className="orrery__ring orrery__ring--front" />
            {HERO.orbits.map((o, i) => {
              const orbit = { "data-orbit": o.rx, "data-ry": o.ry, "data-tilt": "-14", "data-speed": o.speed, "data-phase": o.phase };
              return (
                <Fragment key={o.rx}>
                  {/* The satellite: passes behind the planet. */}
                  <div className="sat" style={{ ["--k" as string]: i } as CSSProperties} aria-hidden="true" data-depth="1" {...orbit}>
                    <span className="sat__dot" style={{ width: o.size, height: o.size, ["--c" as string]: o.color } as CSSProperties} />
                  </div>
                </Fragment>
              );
            })}
          </figure>
        </div>
      </div>
      <span className="hero__scroll" aria-hidden="true">
        <span>{HERO.scroll[lang]}</span>
        <i />
      </span>
    </section>
  );
}
