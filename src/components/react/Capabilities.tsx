import { useState } from "react";
import { CAPABILITIES, SECTION_HEADERS, type Lang } from "../../data/content";
import Reveal from "./Reveal";

function PlanetCard({ group, lang, delay }: { group: (typeof CAPABILITIES)[number]; lang: Lang; delay: number }) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal delay={delay}>
      <article
        onPointerEnter={() => setOpen(true)}
        onPointerLeave={() => setOpen(false)}
        onClick={() => setOpen((o) => !o)}
        style={{
          position: "relative",
          padding: "14px 16px 18px",
          border: `1px solid ${open ? `${group.accent}66` : "rgba(148,163,184,.12)"}`,
          borderRadius: 10,
          background: "linear-gradient(160deg, rgba(7,11,30,.75), rgba(3,0,20,.85))",
          cursor: "pointer",
          transition: "border-color .3s ease",
        }}
      >
        {/* Planet + ring, with the category name riding the orbit line. */}
        <div aria-hidden="true" style={{ position: "relative", height: 108, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span
            style={{
              position: "absolute",
              width: 122,
              height: 50,
              border: "1px solid rgba(148,163,184,.24)",
              borderRadius: "50%",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: "50%",
              top: 15,
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
              padding: "3px 10px",
              borderRadius: 999,
              background: "#0A0818",
              border: `1px solid ${group.accent}66`,
              fontFamily: "'Geist Mono',monospace",
              fontSize: 9.5,
              letterSpacing: ".08em",
              color: "#F8FAFC",
            }}
          >
            {group.title[lang]}
          </span>
          <span
            style={{
              position: "absolute",
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: `radial-gradient(circle at 35% 32%, #F8FAFC, ${group.accent} 48%, #0A0818 100%)`,
              boxShadow: `0 0 34px -6px ${group.accent}`,
              transform: open ? "scale(1.08)" : "scale(1)",
              transition: "transform .3s ease",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: "22%",
              top: "62%",
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "#CBD5E1",
              animation: "cosmic-pulse 6s ease-in-out infinite",
            }}
          />
        </div>

        {/* Skills — hidden until the planet is hovered/tapped. */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            maxHeight: open ? 260 : 0,
            opacity: open ? 1 : 0,
            overflow: "hidden",
            transition: "max-height .35s ease, opacity .25s ease",
            justifyContent: "center",
          }}
        >
          {group.items.map((item) => (
            <span
              key={item.en}
              style={{
                padding: "4px 10px",
                borderRadius: 999,
                border: `1px solid ${group.accent}3D`,
                background: "rgba(5,8,22,.6)",
                fontSize: 11.5,
                color: "#CBD5E1",
              }}
            >
              {item[lang]}
            </span>
          ))}
        </div>
      </article>
    </Reveal>
  );
}

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
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 18, marginBottom: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <h2 style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(20px,2.2vw,26px)", fontWeight: 500, letterSpacing: ".22em", color: "#F8FAFC" }}>
            {h.title[lang]}
          </h2>
          <span aria-hidden="true" style={{ display: "block", width: "clamp(30px,6vw,80px)", height: 1, background: `linear-gradient(90deg,${h.accent}, transparent)` }} />
        </div>
        <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 10, letterSpacing: ".26em", color: "#64748B" }}>{h.tag[lang]}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "clamp(14px,2vw,20px)", alignItems: "start" }}>
        {CAPABILITIES.map((group, i) => (
          <PlanetCard key={group.title.en} group={group} lang={lang} delay={Math.min(i, 4) * 60} />
        ))}
      </div>
    </section>
  );
}
