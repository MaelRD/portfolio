import { Fragment, type CSSProperties } from "react";
import { PROJECTS, SECTION_HEADERS, type Lang, type Project } from "../../data/content";
import { useCardSpotlight } from "./hooks";
import Reveal from "./Reveal";

const mockShellStyle: CSSProperties = {
  position: "relative",
  margin: "0 22px",
  border: "1px solid rgba(148,163,184,.12)",
  borderRadius: 8,
  background: "rgba(5,8,22,.75)",
  minHeight: 170,
  overflow: "hidden",
};

const monoTiny: CSSProperties = { fontFamily: "'Geist Mono',monospace", fontSize: 8.5, color: "#94A3B8" };

function LayoutMock() {
  const nodes = [
    { label: "Web App", active: false },
    { label: "Integration Layer", active: true },
    { label: "Odoo · SAT", active: false },
  ];
  const cells = ["APIs", "Sync", "Transform", "Automate"];
  return (
    <div style={{ ...mockShellStyle, padding: "22px 16px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 18 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {nodes.map((n, i) => (
          <Fragment key={n.label}>
            <span
              style={{
                flex: n.active ? 1.2 : 1,
                textAlign: "center",
                padding: "9px 4px",
                border: n.active ? "1px solid rgba(56,189,248,.55)" : "1px solid rgba(148,163,184,.22)",
                borderRadius: 5,
                background: n.active ? "rgba(56,189,248,.10)" : "transparent",
                fontFamily: "'Geist Mono',monospace",
                fontSize: 9,
                color: n.active ? "#F8FAFC" : "#CBD5E1",
                boxShadow: n.active ? "0 0 22px -6px rgba(56,189,248,.8)" : undefined,
              }}
            >
              {n.label}
            </span>
            {i < nodes.length - 1 && (
              <span
                aria-hidden="true"
                style={{ flex: "0 0 26px", height: 1, background: "linear-gradient(90deg,#38BDF8,#8B5CF6)" }}
              />
            )}
          </Fragment>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6 }}>
        {cells.map((c) => (
          <span
            key={c}
            style={{
              textAlign: "center",
              padding: "7px 2px",
              border: "1px solid rgba(148,163,184,.14)",
              borderRadius: 4,
              fontFamily: "'Geist Mono',monospace",
              fontSize: 8.5,
              color: "#94A3B8",
            }}
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

function CrisolMock({ lang }: { lang: Lang }) {
  return (
    <div style={{ ...mockShellStyle, display: "grid", gridTemplateColumns: "84px 1fr" }}>
      <div
        style={{
          borderRight: "1px solid rgba(148,163,184,.10)",
          padding: "12px 9px",
          display: "flex",
          flexDirection: "column",
          gap: 11,
          ...monoTiny,
        }}
      >
        <span>⌕ Ask</span>
        <span>◇ Explore</span>
        <span>≡ Sources</span>
        <span>⚙ Settings</span>
      </div>
      <div style={{ position: "relative", padding: "14px 14px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            right: -40,
            top: -20,
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, rgba(139,92,246,.45), rgba(3,0,20,0) 65%)",
            filter: "blur(2px)",
          }}
        />
        <strong style={{ position: "relative", fontFamily: "'Space Grotesk',sans-serif", fontSize: 13.5, fontWeight: 500, color: "#F8FAFC", lineHeight: 1.35 }}>
          {lang === "en" ? "Turn scattered context into usable knowledge." : "Convierte contexto disperso en conocimiento utilizable."}
        </strong>
        <div
          style={{
            position: "relative",
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 8px 8px 12px",
            border: "1px solid rgba(148,163,184,.18)",
            borderRadius: 999,
            background: "rgba(3,0,20,.7)",
          }}
        >
          <span style={{ flex: 1, fontSize: 9.5, color: "#64748B" }}>{lang === "en" ? "Ask anything…" : "Pregunta lo que sea…"}</span>
          <span
            aria-hidden="true"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "#7042F8",
              color: "#fff",
              fontSize: 10,
            }}
          >
            →
          </span>
        </div>
      </div>
    </div>
  );
}

function ProjectMock({ project, lang }: { project: Project; lang: Lang }) {
  if (project.visual === "layout") return <LayoutMock />;
  return <CrisolMock lang={lang} />;
}

function ProjectCard({ project, lang, delay }: { project: Project; lang: Lang; delay: number }) {
  const { cardRef, spotRef } = useCardSpotlight<HTMLElement, HTMLDivElement>();
  return (
    <Reveal delay={delay}>
      <article
        ref={cardRef}
        tabIndex={0}
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          border: "1px solid rgba(148,163,184,.13)",
          borderRadius: 12,
          background: "linear-gradient(180deg, rgba(7,11,30,.85), rgba(3,0,20,.9))",
          overflow: "hidden",
          transition: "transform .35s cubic-bezier(.2,.7,.3,1), border-color .35s ease, box-shadow .35s ease",
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
            background: `radial-gradient(320px circle at var(--mx,50%) var(--my,0%), ${project.spotColor}, transparent 70%)`,
          }}
        />
        <div style={{ position: "relative", padding: "26px 26px 18px", display: "flex", alignItems: "baseline", gap: 16 }}>
          <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 13, color: project.accent }}>{project.index} /</span>
          <div>
            <h3 style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontSize: 19, fontWeight: 600, letterSpacing: ".06em", color: "#F8FAFC" }}>
              {project.name}
            </h3>
            <p style={{ margin: "6px 0 0", fontSize: 13.5, color: "#94A3B8" }}>{project.subtitle[lang]}</p>
          </div>
        </div>

        <ProjectMock project={project} lang={lang} />

        <p style={{ position: "relative", margin: "18px 26px 0", fontSize: 13.5, lineHeight: 1.6, color: "#94A3B8" }}>{project.description[lang]}</p>
        <div style={{ position: "relative", marginTop: "auto", padding: "18px 26px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 10, letterSpacing: ".12em", color: "#64748B" }}>{project.stack}</span>
          <span aria-hidden="true" style={{ color: project.accent, fontSize: 17 }}>
            →
          </span>
        </div>
      </article>
    </Reveal>
  );
}

export default function OtherProjects({ lang }: { lang: Lang }) {
  const h = SECTION_HEADERS.work;
  return (
    <section id="work-other" style={{ scrollMarginTop: 100, padding: "0 clamp(20px,5vw,80px) clamp(60px,9vh,110px)" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 18, marginBottom: 40 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <h2 style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(20px,2.2vw,26px)", fontWeight: 500, letterSpacing: ".22em", color: "#F8FAFC" }}>
            {h.title[lang]}
          </h2>
          <span aria-hidden="true" style={{ display: "block", width: "clamp(30px,6vw,80px)", height: 1, background: `linear-gradient(90deg,${h.accent}, transparent)` }} />
        </div>
        <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 10, letterSpacing: ".26em", color: "#64748B" }}>{h.tag[lang]}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(310px,1fr))", gap: "clamp(18px,2.2vw,28px)" }}>
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.name} project={project} lang={lang} delay={Math.min(i, 4) * 70} />
        ))}
      </div>
    </section>
  );
}
