import { CAREER_PATH, SECTION_HEADERS, type Lang } from "../../data/content";
import Reveal from "./Reveal";

const STATE_STYLE: Record<(typeof CAREER_PATH)[number]["state"], { border: string; bg: string; dot: string; textOpacity: number }> = {
  current: { border: "rgba(139,92,246,.6)", bg: "rgba(139,92,246,.12)", dot: "#A78BFA", textOpacity: 1 },
  next: { border: "rgba(56,189,248,.4)", bg: "transparent", dot: "#38BDF8", textOpacity: 0.85 },
  future: { border: "rgba(148,163,184,.25)", bg: "transparent", dot: "#64748B", textOpacity: 0.6 },
};

export default function CareerDirection({ lang }: { lang: Lang }) {
  const h = SECTION_HEADERS.career;

  return (
    <section
      id="career"
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

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "clamp(18px,2.5vw,32px)" }}>
        {CAREER_PATH.map((node, i) => {
          const s = STATE_STYLE[node.state];
          return (
            <Reveal key={node.title} delay={i * 70}>
              <div
                style={{
                  position: "relative",
                  padding: "26px 24px",
                  border: `1px solid ${s.border}`,
                  borderRadius: 10,
                  background: s.bg,
                  opacity: s.textOpacity,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: "50%", background: s.dot, boxShadow: node.state === "current" ? `0 0 12px ${s.dot}` : undefined }} />
                  <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 9.5, letterSpacing: ".2em", color: "#64748B" }}>
                    {node.state === "current"
                      ? lang === "en"
                        ? "CURRENT"
                        : "ACTUAL"
                      : node.state === "next"
                        ? lang === "en"
                          ? "NEXT"
                          : "SIGUIENTE"
                        : lang === "en"
                          ? "DIRECTION"
                          : "DIRECCIÓN"}
                  </span>
                </div>
                <h3 style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontSize: 19, fontWeight: 500, color: "#F8FAFC" }}>{node.title}</h3>
                <p style={{ margin: "10px 0 0", fontSize: 13.5, lineHeight: 1.6, color: "#94A3B8" }}>{node.body[lang]}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
