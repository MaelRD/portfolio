import { HERO, type Lang } from "../../data/content";
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

// Text position for each orbit label, matching the source design's layout.
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
    <section
      id="hero"
      style={{
        scrollMarginTop: 100,
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))",
        alignItems: "center",
        gap: "clamp(32px,5vw,72px)",
        padding: "clamp(120px,14vh,170px) clamp(20px,5vw,80px) clamp(60px,9vh,110px)",
      }}
    >
      <div style={{ maxWidth: 660, display: "flex", flexDirection: "column", gap: 26 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontFamily: "'Geist Mono',monospace",
            fontSize: 10.5,
            letterSpacing: ".3em",
            color: "#94A3B8",
          }}
        >
          <span style={{ display: "block", width: 26, height: 1, background: "#7042F8" }} />
          {HERO.eyebrow[lang]}
        </div>

        <h1
          style={{
            margin: 0,
            fontFamily: "'Space Grotesk',sans-serif",
            fontWeight: 600,
            fontSize: "clamp(38px,5.4vw,70px)",
            lineHeight: 1.03,
            letterSpacing: "-.025em",
            color: "#F8FAFC",
            textWrap: "balance",
          }}
        >
          {headline.lead}
          <span
            style={{
              background: "linear-gradient(100deg,#8B5CF6 10%,#38BDF8 90%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {headline.highlight}
          </span>
        </h1>

        <p style={{ margin: 0, maxWidth: 480, fontSize: "clamp(15px,1.25vw,17.5px)", lineHeight: 1.65, color: "#CBD5E1" }}>
          {HERO.body[lang]}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 6 }}>
          <a
            ref={ctaPrimaryRef}
            href="#work"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              minHeight: 48,
              padding: "14px 26px",
              borderRadius: 6,
              background: "linear-gradient(120deg,#5B32E0,#7042F8)",
              color: "#F8FAFC",
              fontFamily: "'Geist Mono',monospace",
              fontSize: 11.5,
              letterSpacing: ".18em",
              boxShadow: "0 12px 40px -12px rgba(112,66,248,.9)",
              transition: "transform .25s ease, box-shadow .25s ease",
            }}
          >
            {HERO.ctaPrimary[lang]}
            <span aria-hidden="true">→</span>
          </a>
          <a
            ref={ctaSecondaryRef}
            href="/cv.pdf"
            target="_blank"
            rel="noopener"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              minHeight: 48,
              padding: "14px 26px",
              borderRadius: 6,
              background: "rgba(248,250,252,.03)",
              border: "1px solid rgba(148,163,184,.26)",
              color: "#F8FAFC",
              fontFamily: "'Geist Mono',monospace",
              fontSize: 11.5,
              letterSpacing: ".18em",
              transition: "transform .25s ease, border-color .25s ease, background .25s ease",
            }}
          >
            {HERO.ctaSecondary[lang]}
            <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginTop: 22 }}>
          <span aria-hidden="true" style={{ display: "block", width: 18, height: 1, background: "rgba(148,163,184,.45)", marginTop: 7 }} />
          <p style={{ margin: 0, fontFamily: "'Geist Mono',monospace", fontSize: 9.5, lineHeight: 2, letterSpacing: ".26em", color: "#64748B" }}>
            {HERO.footnote[lang][0]}
            <br />
            {HERO.footnote[lang][1]}
          </p>
        </div>
      </div>

      <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <svg
          viewBox="0 0 520 520"
          role="img"
          aria-label="Orbital system: people, data, systems, automation and growth connected around business processes"
          style={{ width: "100%", maxWidth: 620, overflow: "visible" }}
        >
          <defs>
            <radialGradient id="core">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="35%" stopColor="#C4B5FD" />
              <stop offset="100%" stopColor="#5B21B6" />
            </radialGradient>
            <radialGradient id="halo">
              <stop offset="0%" stopColor="rgba(139,92,246,.55)" />
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

          <circle cx="260" cy="260" r="150" fill="url(#halo)" opacity=".8" style={{ animation: "cosmic-breathe 7s ease-in-out infinite" }} />
          {ORBIT_PATHS.map((d, i) => (
            <path
              key={d}
              d={d}
              fill="none"
              stroke={i === 2 ? "rgba(148,163,184,.16)" : `rgba(148,163,184,${0.3 - i * 0.04})`}
              strokeWidth={1}
              strokeDasharray={i === 2 ? "3 5" : undefined}
            />
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
          <text x="260" y="322" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="11.5" letterSpacing="2.4" fill="#F8FAFC">
            {HERO.orbitCenter[lang][0]}
          </text>
          <text x="260" y="340" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="11.5" letterSpacing="2.4" fill="#F8FAFC">
            {HERO.orbitCenter[lang][1]}
          </text>

          {HERO.orbitNodes.map((node, i) => (
            <text
              key={node.en}
              x={NODE_POS[i].x}
              y={NODE_POS[i].y}
              textAnchor={NODE_POS[i].anchor}
              fontFamily="Geist Mono, monospace"
              fontSize="10.5"
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
