import { CV_FILENAME, CV_PATH } from "../../../data/content";
import { HERO, type Lang } from "../../../data/space";
import Name from "./Name";
import { Planet, SURFACES } from "./ui";

export default function Hero({ lang }: { lang: Lang }) {
  return (
    <section id="hero" className="launch" aria-labelledby="hero-title">
      <div className="hero__grid">
        <div className="hero__copy">
          <Name first={HERO.first} last={HERO.last} />
          <p className="hero__role">
            <span>{HERO.role[lang]}</span>
          </p>
          <p className="hero__headline">{HERO.headline[lang]}</p>
          <div className="hero__ctas">
            <a href="#work" className="btn btn--solid">
              {HERO.ctaWork[lang]} <span aria-hidden="true">→</span>
            </a>
            <a href={CV_PATH} download={CV_FILENAME} className="btn btn--line">
              {HERO.ctaCv[lang]} <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <div className="hero__visual">
          <figure className="orrery" role="img" aria-label={HERO.orbitLabel[lang]} style={{ margin: 0 }}>
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
                  />
                ))}
              </g>
            </svg>
            <div className="orrery__ring orrery__ring--back" />
            <Planet className="orrery__planet" style={{ position: "absolute" }} surface={SURFACES.hero} speed={14} />
            <div className="orrery__ring orrery__ring--front" />
            {HERO.orbits.map((o) => (
              <div
                key={o.rx}
                className="sat"
                aria-hidden="true"
                data-orbit={o.rx}
                data-ry={o.ry}
                data-tilt="-14"
                data-speed={o.speed}
                data-phase={o.phase}
                data-depth="1"
              >
                <span className="sat__dot" style={{ width: o.size, height: o.size, background: o.color, boxShadow: `0 0 12px ${o.color}` }} />
                <span className="sat__tag" style={{ borderColor: `color-mix(in srgb, ${o.color} 40%, transparent)` }}>
                  {o.label[lang]}
                </span>
              </div>
            ))}
          </figure>

        </div>
      </div>
    </section>
  );
}
