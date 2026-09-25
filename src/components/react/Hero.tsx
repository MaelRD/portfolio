import { CV_PATH, HERO, type Lang } from "../../data/content";
import { useMagnetic } from "./hooks";

const ORBIT_PATHS = [
  "M60.3,324.9 a210,100 -18 1,0 399.4,-129.8 a210,100 -18 1,0 -399.4,129.8",
  "M107.8,309.4 a160,76 -18 1,0 304.3,-98.9 a160,76 -18 1,0 -304.3,98.9",
  "M155.4,294 a110,52 -18 1,0 209.2,-68 a110,52 -18 1,0 -209.2,68",
];

const ORBIT_DOTS: { path: number; r: number; fill: string; duration: number; delay: number }[] = [
  { path: 0, r: 6, fill: "#A78BFA", duration: 46, delay: 0 },
  { path: 0, r: 5, fill: "#38BDF8", duration: 46, delay: -19 },
  { path: 1, r: 5.5, fill: "#60A5FA", duration: 34, delay: -8 },
  { path: 1, r: 4, fill: "#C026D3", duration: 34, delay: -23 },
  { path: 2, r: 4.5, fill: "#8B5CF6", duration: 24, delay: -11 },
];

// Text position for each orbit label.
const NODE_POS: { x: number; y: number; anchor: "start" | "middle" | "end" }[] = [
  { x: 272, y: 60, anchor: "middle" },
  { x: 470, y: 238, anchor: "start" },
  { x: 52, y: 186, anchor: "end" },
  { x: 46, y: 432, anchor: "start" },
  { x: 420, y: 452, anchor: "middle" },
];

export default function Hero({ lang }: { lang: Lang }) {
  const ctaPrimaryRef = useMagnetic<HTMLAnchorElement>();
  const ctaSecondaryRef = useMagnetic<HTMLAnchorElement>();
  const headline = HERO.headline[lang];

  return (
    <section id="hero" aria-labelledby="hero-title" className="hero">
      <div className="hero-copy">
        <p
          style={{
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontFamily: "'Geist Mono',monospace",
            fontSize: 12.5,
            letterSpacing: ".26em",
            color: "#CBD5E1",
          }}
        >
          <span aria-hidden="true" style={{ display: "block", width: 26, height: 1, background: "#8B5CF6" }} />
          {HERO.eyebrow[lang]}
        </p>

        <h1
          id="hero-title"
          style={{
            margin: 0,
            fontFamily: "'Space Grotesk',sans-serif",
            fontWeight: 600,
            fontSize: "clamp(36px,5vw,66px)",
            lineHeight: 1.06,
            letterSpacing: "-.025em",
            color: "#F8FAFC",
            textWrap: "balance",
          }}
        >
          {headline.lead}{" "}
          <span
            style={{
              background: "linear-gradient(100deg,#A78BFA 10%,#38BDF8 90%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {headline.highlight}
          </span>
        </h1>

        <p style={{ margin: 0, maxWidth: "46ch", fontSize: "clamp(16px,1.3vw,18.5px)", lineHeight: 1.65, color: "#CBD5E1" }}>{HERO.body[lang]}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 4 }}>
          <a ref={ctaPrimaryRef} href="#projects" className="mael-btn mael-btn--primary">
            {HERO.ctaPrimary[lang]}
            <span aria-hidden="true">→</span>
          </a>
          <a ref={ctaSecondaryRef} href={CV_PATH} download="Mario-Yael-Gordillo-CV.pdf" className="mael-btn mael-btn--ghost">
            {HERO.ctaSecondary[lang]}
            <span aria-hidden="true">↓</span>
          </a>
        </div>

        <p style={{ margin: "6px 0 0", fontFamily: "'Geist Mono',monospace", fontSize: 13, letterSpacing: ".1em", color: "#94A3B8" }}>{HERO.areas[lang]}</p>
      </div>

      {/* Orbit illustration: desktop/tablet only, so on phones the projects start right after the intro. */}
      <div className="hero-orbit">
        <svg viewBox="0 0 520 520" role="img" aria-label={HERO.orbitLabel[lang]} style={{ width: "100%", maxWidth: 560, overflow: "visible" }}>
          <defs>
            <radialGradient id="core">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="35%" stopColor="#C4B5FD" />
              <stop offset="100%" stopColor="#5B21B6" />
            </radialGradient>
            <radialGradient id="halo">
              <stop offset="0%" stopColor="rgba(139,92,246,.45)" />
              <stop offset="100%" stopColor="rgba(139,92,246,0)" />
            </radialGradient>
            <filter id="glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <circle cx="260" cy="260" r="140" fill="url(#halo)" opacity=".7" style={{ animation: "cosmic-breathe 7s ease-in-out infinite" }} />
          {ORBIT_PATHS.map((d, i) => (
            <path key={d} d={d} fill="none" stroke={`rgba(148,163,184,${0.28 - i * 0.05})`} strokeWidth={1} strokeDasharray={i === 2 ? "3 5" : undefined} />
          ))}

          {ORBIT_DOTS.map((dot, i) => (
            <circle
              key={i}
              r={dot.r}
              fill={dot.fill}
              filter="url(#glow)"
              style={{
                offsetPath: `path('${ORBIT_PATHS[dot.path]}')`,
                offsetRotate: "0deg",
                animation: `cosmic-orbit ${dot.duration}s linear infinite`,
                animationDelay: `${dot.delay}s`,
              }}
            />
          ))}

          <circle cx="260" cy="260" r="26" fill="url(#core)" filter="url(#glow)" />
          <text x="260" y="324" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="12.5" letterSpacing="2.6" fill="#F8FAFC">
            {HERO.orbitCenter[lang]}
          </text>

          {HERO.orbitNodes.map((node, i) => (
            <text
              key={node.en}
              x={NODE_POS[i].x}
              y={NODE_POS[i].y}
              textAnchor={NODE_POS[i].anchor}
              fontFamily="Geist Mono, monospace"
              fontSize="11.5"
              letterSpacing="2"
              fill="#CBD5E1"
            >
              {node[lang]}
            </text>
          ))}
        </svg>
      </div>
    </section>
  );
}
