import { EXPERIENCE, SECTION_HEADERS, type Lang } from "../../data/content";
import { useScrollFill, useTiltHover } from "./hooks";
import Reveal from "./Reveal";

function ExperienceCard({ item, lang, delay }: { item: (typeof EXPERIENCE)[number]; lang: Lang; delay: number }) {
  const ref = useTiltHover<HTMLElement>();
  return (
    <Reveal delay={delay}>
      <article
        ref={ref}
        style={{
          position: "relative",
          padding: "24px 26px",
          border: "1px solid rgba(148,163,184,.12)",
          borderRadius: 10,
          background: "linear-gradient(140deg, rgba(148,163,184,.05), rgba(5,8,22,.65))",
          transition: "border-color .3s ease, transform .3s ease",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "calc(-1 * clamp(22px,3vw,40px) + 2px)",
            top: 32,
            width: 9,
            height: 9,
            borderRadius: "50%",
            background: item.dotColor,
            boxShadow: `0 0 14px ${item.dotColor}E6`,
          }}
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 18px", alignItems: "baseline", justifyContent: "space-between" }}>
          <h3 style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontSize: 20, fontWeight: 500, color: "#F8FAFC" }}>{item.title[lang]}</h3>
          <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 10.5, letterSpacing: ".14em", color: "#38BDF8" }}>{item.date[lang]}</span>
        </div>
        <p style={{ margin: "8px 0 14px", fontSize: 13, fontFamily: "'Geist Mono',monospace", letterSpacing: ".1em", color: "#94A3B8" }}>{item.company}</p>
        <p style={{ margin: "0 0 14px", fontSize: 14.5, lineHeight: 1.65, color: "#CBD5E1", maxWidth: "70ch" }}>{item.body[lang]}</p>
        <p style={{ margin: 0, fontFamily: "'Geist Mono',monospace", fontSize: 10, letterSpacing: ".14em", color: "#64748B" }}>{item.stack}</p>
      </article>
    </Reveal>
  );
}

export default function Experience({ lang }: { lang: Lang }) {
  const h = SECTION_HEADERS.experience;
  const beamRef = useScrollFill<HTMLDivElement>("height");

  return (
    <section
      id="experience"
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
        <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 10, letterSpacing: ".26em", color: "#64748B" }}>{h.tag}</span>
      </div>

      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 30, paddingLeft: "clamp(22px,3vw,40px)" }}>
        <div aria-hidden="true" style={{ position: "absolute", left: 6, top: 8, bottom: 8, width: 1, background: "rgba(148,163,184,.16)" }} />
        <div
          ref={beamRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 6,
            top: 8,
            width: 1,
            height: "0%",
            background: "linear-gradient(180deg,#7042F8,#38BDF8)",
            boxShadow: "0 0 12px rgba(112,66,248,.9)",
            transition: "height .2s linear",
          }}
        />
        {EXPERIENCE.map((item, i) => (
          <ExperienceCard key={item.title.en} item={item} lang={lang} delay={Math.min(i, 4) * 70} />
        ))}
      </div>
    </section>
  );
}
