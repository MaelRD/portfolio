import { CURRENT_LABEL, EXPERIENCE, SECTIONS, type Lang } from "../../data/content";
import { useScrollFill } from "./hooks";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

function Company({ item, lang, index }: { item: (typeof EXPERIENCE)[number]; lang: Lang; index: number }) {
  const beamRef = useScrollFill<HTMLDivElement>("height");
  const titleId = `company-${index}`;

  return (
    <Reveal>
      <article aria-labelledby={titleId} className="exp-company">
        <header>
          <h3 id={titleId} style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontSize: 24, fontWeight: 500, color: "#F8FAFC" }}>
            {item.company}
          </h3>
          <p style={{ margin: "6px 0 0", fontFamily: "'Geist Mono',monospace", fontSize: 12, letterSpacing: ".08em", color: "#94A3B8" }}>{item.span[lang]}</p>
        </header>

        {/* Roles newest-first along one orbit line, so the progression inside a company is visible. */}
        <div style={{ position: "relative", paddingLeft: 28 }}>
          <div aria-hidden="true" style={{ position: "absolute", left: 4, top: 10, bottom: 10, width: 1, background: "rgba(148,163,184,.2)" }} />
          <div
            ref={beamRef}
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 4,
              top: 10,
              width: 1,
              height: "0%",
              maxHeight: "calc(100% - 20px)",
              background: `linear-gradient(180deg,${item.accent},#38BDF8)`,
              boxShadow: `0 0 10px ${item.accent}`,
              transition: "height .2s linear",
            }}
          />
          <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 26 }}>
            {item.roles.map((role) => (
              <li key={role.title} style={{ position: "relative" }}>
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: -28,
                    top: 7,
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    background: role.current ? item.accent : "#0A0818",
                    border: `1px solid ${item.accent}`,
                    boxShadow: role.current ? `0 0 12px ${item.accent}` : undefined,
                  }}
                />
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "6px 14px" }}>
                  <h4 style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 500, color: "#F8FAFC" }}>{role.title}</h4>
                  {role.current && (
                    <span
                      style={{
                        padding: "2px 9px",
                        borderRadius: 999,
                        border: "1px solid rgba(56,189,248,.45)",
                        fontFamily: "'Geist Mono',monospace",
                        fontSize: 11,
                        letterSpacing: ".08em",
                        color: "#E0F2FE",
                      }}
                    >
                      {CURRENT_LABEL[lang]}
                    </span>
                  )}
                </div>
                <p style={{ margin: "5px 0 10px", fontFamily: "'Geist Mono',monospace", fontSize: 12.5, letterSpacing: ".04em", color: "#7DD3FC" }}>
                  {role.period[lang]}
                </p>
                <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.7, color: "#CBD5E1", maxWidth: "68ch" }}>{role.body[lang]}</p>
              </li>
            ))}
          </ol>
        </div>
      </article>
    </Reveal>
  );
}

export default function Experience({ lang }: { lang: Lang }) {
  return (
    <section id="experience" aria-labelledby="experience-title" className="mael-section">
      <SectionHeader header={SECTIONS.experience} lang={lang} id="experience-title" />
      <div style={{ display: "flex", flexDirection: "column", gap: "clamp(18px,2.4vw,26px)" }}>
        {EXPERIENCE.map((item, i) => (
          <Company key={item.company} item={item} lang={lang} index={i} />
        ))}
      </div>
    </section>
  );
}
