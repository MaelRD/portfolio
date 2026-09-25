import { useState } from "react";
import { CAPABILITIES, SECTION_HEADERS, type Lang } from "../../data/content";
import Reveal from "./Reveal";

// Orbit geometry shared by the ring halves and the moon's offset-path, so the
// moon rides exactly on the drawn ring.
const RING_W = 136;
const RING_H = 40;
const RX = RING_W / 2;
const RY = RING_H / 2;
// Starts at the left tip and sweeps through the bottom (front) half first,
// then the top (back) half — matching the z-index flip in `planet-moon-depth`.
const MOON_PATH = `M 0 ${RY} A ${RX} ${RY} 0 0 0 ${RING_W} ${RY} A ${RX} ${RY} 0 0 0 0 ${RY}`;

// Small per-card variation so the ten planets read as a system rather than
// ten copies of one sprite.
const SIZES = [58, 50, 54, 60, 48];
const TILTS = [-14, 10, -6, 16, -18, 8, -10, 12, -4, 18];

function Ring({ half, tilt, color }: { half: "back" | "front"; tilt: number; color: string }) {
  // Back half = top arc (drawn under the planet), front half = bottom arc.
  const d = half === "back" ? `M 0 ${RY} A ${RX} ${RY} 0 0 1 ${RING_W} ${RY}` : `M 0 ${RY} A ${RX} ${RY} 0 0 0 ${RING_W} ${RY}`;
  return (
    <svg
      width={RING_W}
      height={RING_H}
      viewBox={`-1 -1 ${RING_W + 2} ${RING_H + 2}`}
      style={{ position: "absolute", overflow: "visible", transform: `rotate(${tilt}deg)`, zIndex: half === "back" ? 1 : 3 }}
    >
      <path d={d} fill="none" stroke={color} strokeWidth={half === "front" ? 1.4 : 1} strokeOpacity={half === "front" ? 1 : 0.55} style={{ transition: "stroke .3s ease" }} />
    </svg>
  );
}

function PlanetCard({ group, lang, index }: { group: (typeof CAPABILITIES)[number]; lang: Lang; index: number }) {
  const [open, setOpen] = useState(false);
  const size = SIZES[index % SIZES.length];
  const tilt = TILTS[index % TILTS.length];
  const period = 10 + (index % 4) * 2.5;
  const ringColor = open ? group.accent : "rgba(148,163,184,.38)";

  return (
    <Reveal delay={Math.min(index, 4) * 60}>
      <article
        onPointerEnter={() => setOpen(true)}
        onPointerLeave={() => setOpen(false)}
        onClick={() => setOpen((o) => !o)}
        style={{
          position: "relative",
          padding: "16px 16px 18px",
          border: `1px solid ${open ? `${group.accent}66` : "rgba(148,163,184,.12)"}`,
          borderRadius: 10,
          background: `radial-gradient(120% 70% at 50% 30%, ${group.accent}${open ? "1F" : "12"}, transparent 60%), linear-gradient(160deg, rgba(7,11,30,.75), rgba(3,0,20,.85))`,
          cursor: "pointer",
          transition: "border-color .3s ease, background .3s ease",
        }}
      >
        {/* Planet system: the ring is split so its back half passes behind the
            planet and its front half in front, and the moon rides that same
            ring — dipping behind the planet on the far side of its orbit. */}
        <div aria-hidden="true" style={{ position: "relative", height: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Ring half="back" tilt={tilt} color={ringColor} />
          <span
            style={{
              position: "absolute",
              zIndex: 2,
              width: size,
              height: size,
              borderRadius: "50%",
              background: `radial-gradient(circle at 34% 30%, #F8FAFC 0%, ${group.accent} 42%, #1E1B4B 82%, #0A0818 100%)`,
              boxShadow: `0 0 ${open ? 48 : 30}px -6px ${group.accent}, inset -6px -8px 14px rgba(3,0,20,.55)`,
              transform: open ? "scale(1.08)" : "scale(1)",
              transition: "transform .35s cubic-bezier(.2,.8,.2,1), box-shadow .35s ease",
            }}
          />
          <Ring half="front" tilt={tilt} color={ringColor} />
          <span
            style={{
              position: "absolute",
              width: RING_W,
              height: RING_H,
              transform: `rotate(${tilt}deg)`,
              animation: `planet-moon-depth ${period}s linear infinite`,
            }}
          >
            <span
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#E2E8F0",
                boxShadow: `0 0 8px ${group.accent}`,
                offsetPath: `path('${MOON_PATH}')`,
                offsetRotate: "0deg",
                animation: `cosmic-orbit ${period}s linear infinite`,
              }}
            />
          </span>
        </div>

        {/* Name sits below the system instead of on top of the planet. */}
        <div style={{ marginTop: 10, textAlign: "center" }}>
          <h3
            style={{
              margin: 0,
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: ".04em",
              color: "#F8FAFC",
            }}
          >
            {group.title[lang]}
          </h3>
          <span style={{ display: "block", marginTop: 4, fontFamily: "'Geist Mono',monospace", fontSize: 9.5, letterSpacing: ".14em", color: open ? group.accent : "#64748B", transition: "color .3s ease" }}>
            {group.items.length} {lang === "es" ? "HABILIDADES" : "SKILLS"}
          </span>
        </div>

        {/* Skills — hidden until the planet is hovered/tapped. */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginTop: open ? 12 : 0,
            maxHeight: open ? 260 : 0,
            opacity: open ? 1 : 0,
            overflow: "hidden",
            transition: "max-height .35s ease, opacity .25s ease, margin-top .35s ease",
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
          <PlanetCard key={group.title.en} group={group} lang={lang} index={i} />
        ))}
      </div>
    </section>
  );
}
