import { ABOUT, SECTIONS, type Lang } from "../../data/content";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const PATH_COLORS = ["#38BDF8", "#8B5CF6", "#E879F9"];

const sideLabel = {
  margin: "0 0 14px",
  fontFamily: "'Geist Mono',monospace",
  fontSize: 11.5,
  letterSpacing: ".2em",
  textTransform: "uppercase" as const,
  color: "#94A3B8",
};

export default function About({ lang }: { lang: Lang }) {
  return (
    <section id="about" aria-labelledby="about-title" className="mael-section">
      <SectionHeader header={SECTIONS.about} lang={lang} id="about-title" accent="#A78BFA" />
      <div className="about-grid">
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: "64ch" }}>
          {ABOUT.paragraphs.map((p, i) => (
            <Reveal key={p.en} delay={i * 60}>
              <p
                style={
                  i === 0
                    ? {
                        margin: 0,
                        fontFamily: "'Space Grotesk',sans-serif",
                        fontSize: "clamp(19px,2vw,24px)",
                        lineHeight: 1.45,
                        color: "#F8FAFC",
                        textWrap: "pretty",
                      }
                    : { margin: 0, fontSize: 16, lineHeight: 1.75, color: "#CBD5E1" }
                }
              >
                {p[lang]}
              </p>
            </Reveal>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Career path as an outward trajectory: the current role is lit, the goals are still ahead. */}
          <Reveal>
            <div style={{ padding: "20px 22px", border: "1px solid rgba(148,163,184,.14)", borderRadius: 12, background: "rgba(5,8,22,.6)" }}>
              <h3 style={sideLabel}>{ABOUT.pathLabel[lang]}</h3>
              <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" }}>
                {ABOUT.path.map((step, i) => {
                  const color = PATH_COLORS[i];
                  const now = i === 0;
                  return (
                    <li key={step.role} style={{ display: "grid", gridTemplateColumns: "18px 1fr", columnGap: 14 }}>
                      <span aria-hidden="true" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <span
                          style={{
                            marginTop: 5,
                            width: 11,
                            height: 11,
                            borderRadius: "50%",
                            background: now ? color : "transparent",
                            border: `1px ${now ? "solid" : "dashed"} ${color}`,
                            boxShadow: now ? `0 0 14px ${color}` : undefined,
                          }}
                        />
                        {i < ABOUT.path.length - 1 && (
                          <span style={{ flex: 1, width: 1, minHeight: 22, marginTop: 4, background: `linear-gradient(${color}, ${PATH_COLORS[i + 1]}55)` }} />
                        )}
                      </span>
                      <div style={{ paddingBottom: i < ABOUT.path.length - 1 ? 14 : 0 }}>
                        <p style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontSize: 17, color: "#F8FAFC" }}>{step.role}</p>
                        <p style={{ margin: "2px 0 0", fontSize: 13.5, color: now ? "#E0F2FE" : "#94A3B8" }}>{step.note[lang]}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <div style={{ padding: "20px 22px", border: "1px solid rgba(148,163,184,.14)", borderRadius: 12, background: "rgba(5,8,22,.6)" }}>
              <h3 style={sideLabel}>{ABOUT.educationLabel[lang]}</h3>
              <p style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontSize: 17, color: "#F8FAFC" }}>{ABOUT.degree}</p>
              <p style={{ margin: "4px 0 0", fontSize: 14.5, color: "#CBD5E1" }}>{ABOUT.school}</p>
              <p style={{ margin: "10px 0 0", fontSize: 14.5, color: "#7DD3FC" }}>{ABOUT.graduation[lang]}</p>
              <dl style={{ margin: "16px 0 0", paddingTop: 14, borderTop: "1px solid rgba(148,163,184,.12)" }}>
                <dt style={{ ...sideLabel, margin: 0 }}>{ABOUT.languagesLabel[lang]}</dt>
                <dd style={{ margin: "6px 0 0", fontSize: 14.5, color: "#CBD5E1" }}>{ABOUT.languages[lang]}</dd>
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
