import { Fragment } from "react";
import { FEATURED_PROJECT as F, type Lang } from "../../data/content";
import { useCardSpotlight, useTiltHover } from "./hooks";
import Reveal from "./Reveal";

function Block({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: 10, letterSpacing: ".24em", color: F.accent, marginBottom: 8 }}>{label}</div>
      <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.7, color: "#CBD5E1", maxWidth: "62ch" }}>{text}</p>
    </div>
  );
}

function FlowChips({ items, accent }: { items: string[]; accent: string }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
      {items.map((item, i) => (
        <Fragment key={item}>
          <span
            style={{
              padding: "7px 12px",
              border: `1px solid ${accent}55`,
              borderRadius: 6,
              fontFamily: "'Geist Mono',monospace",
              fontSize: 10.5,
              color: "#F8FAFC",
              background: "rgba(5,8,22,.6)",
            }}
          >
            {item}
          </span>
          {i < items.length - 1 && (
            <span aria-hidden="true" style={{ color: accent, fontSize: 12 }}>
              →
            </span>
          )}
        </Fragment>
      ))}
    </div>
  );
}

export default function FeaturedProject({ lang }: { lang: Lang }) {
  const tiltRef = useTiltHover<HTMLDivElement>();
  const { cardRef: spotCardRef, spotRef } = useCardSpotlight<HTMLDivElement, HTMLDivElement>();

  return (
    <section
      id="work"
      style={{
        scrollMarginTop: 100,
        padding: "clamp(50px,7vh,90px) clamp(20px,5vw,80px) clamp(40px,6vh,70px)",
        borderTop: "1px solid rgba(148,163,184,.08)",
      }}
    >
      <Reveal>
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: 10, letterSpacing: ".3em", color: F.accent, marginBottom: 14 }}>
            {F.eyebrow[lang]}
          </div>
          <h2
            style={{
              margin: 0,
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: "clamp(30px,4vw,48px)",
              fontWeight: 600,
              letterSpacing: "-.01em",
              color: "#F8FAFC",
            }}
          >
            {F.name}
          </h2>
          <p style={{ margin: "10px 0 0", fontSize: 15.5, color: "#94A3B8" }}>{F.subtitle[lang]}</p>
        </div>
      </Reveal>

      <div
        ref={tiltRef}
        style={{
          position: "relative",
          border: "1px solid rgba(148,163,184,.14)",
          borderRadius: 14,
          background: "linear-gradient(160deg, rgba(139,92,246,.07), rgba(5,8,22,.75))",
          padding: "clamp(24px,4vw,44px)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
          gap: "clamp(30px,4vw,52px)",
          transition: "border-color .3s ease, transform .3s ease",
        }}
      >
        {/* Narrative column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <Reveal delay={0}>
            <Block label={F.problemLabel[lang]} text={F.problem[lang]} />
          </Reveal>
          <Reveal delay={70}>
            <Block label={F.challengeLabel[lang]} text={F.challenge[lang]} />
          </Reveal>
          <Reveal delay={140}>
            <Block label={F.solutionLabel[lang]} text={F.solution[lang]} />
          </Reveal>
          <Reveal delay={210}>
            <Block label={F.roleLabel[lang]} text={F.role[lang]} />
          </Reveal>
          <Reveal delay={280}>
            <Block label={F.evolutionLabel[lang]} text={F.evolution[lang]} />
          </Reveal>
        </div>

        {/* Technical panel */}
        <Reveal delay={140}>
          <div
            ref={spotCardRef}
            style={{
              position: "relative",
              border: "1px solid rgba(148,163,184,.14)",
              borderRadius: 12,
              background: "rgba(5,8,22,.8)",
              padding: "clamp(20px,3vw,30px)",
              display: "flex",
              flexDirection: "column",
              gap: 26,
              overflow: "hidden",
            }}
          >
            <div
              ref={spotRef}
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0,
                transition: "opacity .35s ease",
                pointerEvents: "none",
                background: `radial-gradient(320px circle at var(--mx,50%) var(--my,0%), ${F.spotColor}, transparent 70%)`,
              }}
            />

            <div style={{ position: "relative" }}>
              <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: 10, letterSpacing: ".24em", color: "#64748B", marginBottom: 12 }}>
                {F.architectureLabel[lang]}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {F.architecture.map((step, i) => (
                  <Fragment key={step.en}>
                    <span
                      style={{
                        padding: "9px 14px",
                        border: "1px solid rgba(148,163,184,.22)",
                        borderRadius: 6,
                        fontFamily: "'Geist Mono',monospace",
                        fontSize: 11,
                        color: "#F8FAFC",
                        background: i === 2 ? "rgba(139,92,246,.10)" : "transparent",
                      }}
                    >
                      {step[lang]}
                    </span>
                    {i < F.architecture.length - 1 && (
                      <span aria-hidden="true" style={{ color: "#64748B", fontSize: 12, paddingLeft: 14 }}>
                        ↓
                      </span>
                    )}
                  </Fragment>
                ))}
              </div>
            </div>

            <div style={{ position: "relative" }}>
              <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: 10, letterSpacing: ".24em", color: "#64748B", marginBottom: 12 }}>
                {F.logicLabel[lang]}
              </div>
              <FlowChips items={F.logic.map((l) => l[lang])} accent="#38BDF8" />
            </div>

            <div style={{ position: "relative" }}>
              <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: 10, letterSpacing: ".24em", color: "#64748B", marginBottom: 12 }}>
                {F.fieldsLabel[lang]}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {F.fields.map((field) => (
                  <span
                    key={field.en}
                    style={{
                      padding: "5px 10px",
                      borderRadius: 999,
                      border: "1px solid rgba(148,163,184,.16)",
                      fontSize: 11,
                      color: "#94A3B8",
                    }}
                  >
                    {field[lang]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
        <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 10.5, letterSpacing: ".12em", color: "#64748B" }}>{F.stack}</span>
      </div>
    </section>
  );
}
