import { CAPABILITIES, SECTION_HEADERS, type Lang } from "../../data/content";
import Reveal from "./Reveal";

// Ring size/rotation and planet size/shadow vary slightly per column, matching
// the source design's hand-tuned values rather than one repeated shape.
const RINGS: { ringW: number; ringH: number; rotate: number; planet: number; shadow: string; dotDelay: number }[] = [
  { ringW: 150, ringH: 64, rotate: -16, planet: 104, shadow: "0 0 60px -8px rgba(37,99,235,.85)", dotDelay: 6 },
  { ringW: 168, ringH: 70, rotate: 12, planet: 92, shadow: "0 0 58px -10px rgba(56,189,248,.8)", dotDelay: 7 },
  { ringW: 158, ringH: 60, rotate: -8, planet: 98, shadow: "0 0 60px -8px rgba(139,92,246,.85)", dotDelay: 9 },
  { ringW: 146, ringH: 74, rotate: 20, planet: 86, shadow: "0 0 56px -10px rgba(192,38,211,.7)", dotDelay: 6.5 },
];

export default function Capabilities({ lang }: { lang: Lang }) {
  const h = SECTION_HEADERS.capabilities;

  return (
    <section
      id="capabilities"
      style={{
        scrollMarginTop: 100,
        padding: "clamp(50px,7vh,90px) clamp(20px,5vw,80px) clamp(60px,9vh,110px)",
        borderTop: "1px solid rgba(148,163,184,.08)",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 18, marginBottom: 46 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <h2 style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(20px,2.2vw,26px)", fontWeight: 500, letterSpacing: ".22em", color: "#F8FAFC" }}>
            {h.title[lang]}
          </h2>
          <span aria-hidden="true" style={{ display: "block", width: "clamp(30px,6vw,80px)", height: 1, background: `linear-gradient(90deg,${h.accent}, transparent)` }} />
        </div>
        <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 10, letterSpacing: ".26em", color: "#64748B" }}>{h.tag[lang]}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: "clamp(22px,3vw,44px)" }}>
        {CAPABILITIES.map((col, i) => {
          const r = RINGS[i];
          return (
            <Reveal key={col.title} delay={Math.min(i, 4) * 70}>
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div aria-hidden="true" style={{ position: "relative", height: 150, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span
                    style={{
                      position: "absolute",
                      width: r.ringW,
                      height: r.ringH,
                      border: "1px solid rgba(148,163,184,.20)",
                      borderRadius: "50%",
                      transform: `rotate(${r.rotate}deg)`,
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      width: r.planet,
                      height: r.planet,
                      borderRadius: "50%",
                      background: col.glow,
                      boxShadow: r.shadow,
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      left: "14%",
                      top: "44%",
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "#CBD5E1",
                      animation: `cosmic-pulse ${r.dotDelay}s ease-in-out infinite`,
                    }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                  <span aria-hidden="true" style={{ color: col.accent, fontSize: 16 }}>
                    {col.icon}
                  </span>
                  <h3 style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 500, color: "#F8FAFC" }}>{col.title}</h3>
                </div>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 9, fontSize: 13.5, color: "#94A3B8" }}>
                  {col.items.map((item) => (
                    <li key={item.en}>{item[lang]}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
