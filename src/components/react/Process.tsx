import { useEffect, useRef } from "react";
import { PROCESS_STEPS, SECTION_HEADERS, type Lang } from "../../data/content";
import { useScrollFill } from "./hooks";
import Reveal from "./Reveal";

const ACCENTS: Record<(typeof PROCESS_STEPS)[number]["accent"], { border: string; color: string }> = {
  violet: { border: "rgba(139,92,246,.45)", color: "#A78BFA" },
  sky: { border: "rgba(56,189,248,.45)", color: "#38BDF8" },
  fuchsia: { border: "rgba(192,38,211,.45)", color: "#E879F9" },
};

export default function Process({ lang }: { lang: Lang }) {
  const h = SECTION_HEADERS.process;
  const beamRef = useScrollFill<HTMLDivElement>("width");
  const trackRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  // The beam only makes sense as a single straight line: once the steps wrap
  // onto more than one row (narrow viewports), hide the track and beam
  // instead of drawing a line across items that no longer sit on one axis.
  useEffect(() => {
    const list = listRef.current;
    const track = trackRef.current;
    const beam = beamRef.current;
    if (!list || !track || !beam) return;
    const check = () => {
      const items = Array.from(list.children) as HTMLElement[];
      const wrapped = items.length > 1 && items[0].offsetTop !== items[items.length - 1].offsetTop;
      track.style.display = wrapped ? "none" : "block";
      beam.style.display = wrapped ? "none" : "block";
    };
    check();
    window.addEventListener("resize", check, { passive: true });
    window.addEventListener("scroll", check, { passive: true });
    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("scroll", check);
    };
  }, [beamRef]);

  return (
    <section
      id="process"
      style={{
        scrollMarginTop: 100,
        padding: "clamp(50px,7vh,90px) clamp(20px,5vw,80px) clamp(60px,9vh,110px)",
        borderTop: "1px solid rgba(148,163,184,.08)",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 18, marginBottom: 56 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <h2 style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(20px,2.2vw,26px)", fontWeight: 500, letterSpacing: ".22em", color: "#F8FAFC" }}>
            {h.title[lang]}
          </h2>
          <span aria-hidden="true" style={{ display: "block", width: "clamp(30px,6vw,80px)", height: 1, background: `linear-gradient(90deg,${h.accent}, transparent)` }} />
        </div>
        <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 10, letterSpacing: ".26em", color: "#64748B" }}>{h.tag[lang]}</span>
      </div>

      <div style={{ position: "relative" }}>
        <div ref={trackRef} aria-hidden="true" style={{ position: "absolute", left: "6%", right: "6%", top: 60, height: 1, background: "rgba(148,163,184,.16)" }} />
        <div
          ref={beamRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "6%",
            top: 60,
            height: 1,
            width: "0%",
            background: "linear-gradient(90deg,#7042F8,#38BDF8)",
            boxShadow: "0 0 12px rgba(56,189,248,.8)",
            transition: "width .2s linear",
          }}
        />
        <ol
          ref={listRef}
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))",
            gap: 26,
          }}
        >
          {PROCESS_STEPS.map((step, i) => {
            const c = ACCENTS[step.accent];
            return (
              <Reveal key={step.n} delay={Math.min(i, 4) * 70}>
                <li style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 12 }}>
                  <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 11, letterSpacing: ".2em", color: "#94A3B8" }}>{step.n}</span>
                  <span
                    aria-hidden="true"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 54,
                      height: 54,
                      borderRadius: "50%",
                      border: `1px solid ${c.border}`,
                      background: "rgba(5,8,22,.9)",
                      color: c.color,
                      fontSize: step.icon === "</>" ? 17 : 19,
                      fontFamily: step.icon === "</>" ? "'Geist Mono',monospace" : undefined,
                    }}
                  >
                    {step.icon}
                  </span>
                  <strong style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 17, fontWeight: 500, color: "#F8FAFC" }}>{step.title[lang]}</strong>
                  <p style={{ margin: 0, maxWidth: 190, fontSize: 13.5, lineHeight: 1.6, color: "#94A3B8" }}>{step.body[lang]}</p>
                </li>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
