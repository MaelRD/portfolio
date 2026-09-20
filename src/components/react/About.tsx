import { ABOUT, SECTION_HEADERS, type Lang } from "../../data/content";
import Reveal from "./Reveal";

export default function About({ lang }: { lang: Lang }) {
  const h = SECTION_HEADERS.about;
  return (
    <section
      id="about"
      style={{
        scrollMarginTop: 100,
        padding: "clamp(50px,7vh,90px) clamp(20px,5vw,80px) clamp(60px,9vh,110px)",
        borderTop: "1px solid rgba(148,163,184,.08)",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
        gap: "clamp(30px,5vw,70px)",
        alignItems: "start",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <h2 style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(20px,2.2vw,26px)", fontWeight: 500, letterSpacing: ".22em", color: "#F8FAFC" }}>
          {h.title[lang]}
        </h2>
        <span aria-hidden="true" style={{ display: "block", width: "clamp(30px,6vw,80px)", height: 1, background: `linear-gradient(90deg,${h.accent}, transparent)` }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: "66ch" }}>
        <Reveal>
          <p style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(20px,2.3vw,28px)", lineHeight: 1.45, color: "#F8FAFC", textWrap: "pretty" }}>
            {ABOUT.lead[lang]}
          </p>
        </Reveal>
        <Reveal delay={70}>
          <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.75, color: "#CBD5E1" }}>{ABOUT.p1[lang]}</p>
        </Reveal>
        <Reveal delay={140}>
          <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.75, color: "#94A3B8" }}>{ABOUT.p2[lang]}</p>
        </Reveal>
        <Reveal delay={210}>
          <dl
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))",
              gap: 20,
              margin: "8px 0 0",
              paddingTop: 24,
              borderTop: "1px solid rgba(148,163,184,.12)",
            }}
          >
            {ABOUT.stats.map((stat) => (
              <div key={stat.label.en}>
                <dt style={{ fontFamily: "'Geist Mono',monospace", fontSize: 9.5, letterSpacing: ".22em", color: "#64748B" }}>{stat.label[lang]}</dt>
                <dd style={{ margin: "8px 0 0", fontSize: 14, color: "#F8FAFC" }}>{stat.value[lang]}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
