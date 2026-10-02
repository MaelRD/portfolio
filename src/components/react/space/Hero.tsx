import { Fragment, type CSSProperties } from "react";
import { HERO, type Lang } from "../../../data/space";
import Name from "./Name";
import CornerLoop from "./Loop";
import { Planet, SURFACES } from "./ui";

export default function Hero({ lang }: { lang: Lang }) {
  return (
    <section id="hero" className="launch" aria-labelledby="hero-title">
      <CornerLoop lang={lang} />
      <div className="hero__grid">
        <div className="hero__copy">
          <Name first={HERO.first} last={HERO.last} />
          <p className="hero__role">
            <span>{HERO.eyebrow[lang]}</span>
          </p>
          <p className="hero__headline">{HERO.statement[lang]}</p>
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
            <a href="#work" className="btn btn--solid">
              {HERO.ctaWork[lang]} <span aria-hidden="true">→</span>
            </a>
            <a href="#contact" className="btn btn--line" data-track="Contact" data-track-label="hero">
              {HERO.ctaTalk[lang]} <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <div className="hero__visual">
          <figure
            className="orrery"
            role="img"
            aria-label={HERO.orbitLabel[lang]}
            style={{ margin: 0 }}
          >
            <div className="orrery__glow" />
            <svg viewBox="0 0 100 100" aria-hidden="true">
              <g transform="rotate(-14 50 50)" fill="none" stroke="rgba(167,139,250,.38)" strokeWidth=".22">
                {HERO.orbits.map((o, i) => (
                  <ellipse
                    key={o.rx}
                    cx="50"
                    cy="50"
                    rx={o.rx}
                    ry={o.ry}
                    strokeDasharray={i % 2 ? ".8 1.2" : undefined}
                    stroke={i === HERO.orbits.length - 1 ? "rgba(125,227,255,.3)" : undefined}
                    style={{ ["--k" as string]: i } as CSSProperties}
                  />
                ))}
              </g>
            </svg>
            <div className="orrery__ring orrery__ring--back" />
            <Planet className="orrery__planet" style={{ position: "absolute" }} surface={SURFACES.hero} speed={14} />
            <div className="orrery__ring orrery__ring--front" />
            {HERO.orbits.map((o, i) => {
              const orbit = { "data-orbit": o.rx, "data-ry": o.ry, "data-tilt": "-14", "data-speed": o.speed, "data-phase": o.phase };
              return (
                <Fragment key={o.rx}>
                  {/* The satellite: passes behind the planet. */}
                  <div className="sat" style={{ ["--k" as string]: i } as CSSProperties} aria-hidden="true" data-depth="1" {...orbit}>
                    <span className="sat__dot" style={{ width: o.size, height: o.size, background: o.color, boxShadow: `0 0 12px ${o.color}` }} />
                  </div>
                  {/* Its label: always on top, opening toward the outside of the orbit. */}
                  <div
                    className="sat sat--label"
                    style={{ ["--k" as string]: i, ["--dot" as string]: `${o.size / 2 + 6}px` } as CSSProperties}
                    aria-hidden="true"
                    data-depth="tag"
                    {...orbit}
                  >
                    <span className="sat__tag" style={{ borderColor: `color-mix(in srgb, ${o.color} 40%, transparent)` }}>
                      {o.label[lang]}
                    </span>
                  </div>
                </Fragment>
              );
            })}
          </figure>

        </div>
      </div>
    </section>
  );
}
