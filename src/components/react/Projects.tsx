import { Fragment, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { PROJECT_LABELS as L, PROJECTS, SECTIONS, STATUS_LABELS, type Lang, type Project, type ProjectStatus } from "../../data/content";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const STATUS_COLORS: Record<ProjectStatus, string> = {
  development: "#38BDF8",
  definition: "#E879F9",
  completed: "#4ADE80",
};

const labelStyle = {
  margin: "0 0 8px",
  fontFamily: "'Geist Mono',monospace",
  fontSize: 11.5,
  letterSpacing: ".18em",
  textTransform: "uppercase" as const,
  color: "#94A3B8",
};

function StatusBadge({ status, lang }: { status: ProjectStatus; lang: Lang }) {
  const color = STATUS_COLORS[status];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "4px 11px",
        borderRadius: 999,
        border: `1px solid ${color}66`,
        background: `${color}14`,
        fontFamily: "'Geist Mono',monospace",
        fontSize: 11.5,
        letterSpacing: ".08em",
        color: "#F8FAFC",
        whiteSpace: "nowrap",
      }}
    >
      <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}` }} />
      {STATUS_LABELS[status][lang]}
    </span>
  );
}

function Block({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <h4 style={labelStyle}>{label}</h4>
      {children}
    </div>
  );
}

/** Architecture flow drawn as orbiting nodes joined by a line. */
function Flow({ project, lang, vertical }: { project: Project; lang: Lang; vertical: boolean }) {
  return (
    <Block label={L.flow[lang]}>
      <ol
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: vertical ? "column" : "row",
          flexWrap: vertical ? "nowrap" : "wrap",
          alignItems: vertical ? "stretch" : "center",
          gap: vertical ? 0 : 8,
        }}
      >
        {project.flow.map((node, i) => (
          <Fragment key={node.en}>
            <li
              style={{
                padding: "8px 12px",
                border: `1px solid ${i === 1 ? `${project.accent}80` : "rgba(148,163,184,.24)"}`,
                borderRadius: 8,
                background: i === 1 ? `${project.accent}14` : "rgba(5,8,22,.6)",
                fontFamily: "'Geist Mono',monospace",
                fontSize: 12.5,
                lineHeight: 1.45,
                color: "#F8FAFC",
              }}
            >
              {node[lang]}
            </li>
            {i < project.flow.length - 1 && (
              <li aria-hidden="true" style={{ color: project.accent, fontSize: 13, lineHeight: 1, padding: vertical ? "6px 0 6px 14px" : 0 }}>
                {vertical ? "↓" : "→"}
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </Block>
  );
}

function Stack({ project, lang }: { project: Project; lang: Lang }) {
  return (
    <Block label={L.stack[lang]}>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexWrap: "wrap", gap: 7 }}>
        {project.stack.map((tech) => (
          <li key={tech} style={{ padding: "4px 11px", borderRadius: 999, border: "1px solid rgba(148,163,184,.22)", fontSize: 13, color: "#E2E8F0" }}>
            {tech}
          </li>
        ))}
      </ul>
    </Block>
  );
}

function ProjectTitle({ project, lang, size }: { project: Project; lang: Lang; size: number }) {
  const name = project.href ? (
    <a href={project.href} className="mael-link">
      {project.name}
    </a>
  ) : (
    project.name
  );
  return (
    <div>
      <h3
        style={{
          margin: 0,
          fontFamily: "'Space Grotesk',sans-serif",
          fontSize: size,
          fontWeight: 600,
          letterSpacing: "-.01em",
          color: "#F8FAFC",
          lineHeight: 1.15,
        }}
      >
        {name}
      </h3>
      <p style={{ margin: "6px 0 0", fontSize: 16, color: "#CBD5E1" }}>{project.subtitle[lang]}</p>
    </div>
  );
}

const paragraph = { margin: 0, fontSize: 15.5, lineHeight: 1.7, color: "#CBD5E1", maxWidth: "62ch" } as const;

const pad2 = (n: number) => String(n).padStart(2, "0");

function ProjectSlide({ project, lang, index, total }: { project: Project; lang: Lang; index: number; total: number }) {
  const eyebrowColor = project.accent === "#8B5CF6" ? "#A78BFA" : project.accent;
  return (
    <article
      aria-labelledby={`${project.id}-title`}
      className="project-card"
      style={{
        border: `1px solid ${project.accent}4D`,
        background: `radial-gradient(70% 90% at 100% 0%, ${project.accent}24, transparent 60%), linear-gradient(160deg, rgba(12,10,40,.82), rgba(3,0,20,.92))`,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 11.5, letterSpacing: ".2em", color: eyebrowColor, textTransform: "uppercase" }}>
            {pad2(index + 1)} / {pad2(total)}
            {index === 0 && ` · ${L.featured[lang]}`}
          </span>
          {project.status && <StatusBadge status={project.status} lang={lang} />}
        </div>
        <div id={`${project.id}-title`}>
          <ProjectTitle project={project} lang={lang} size={34} />
        </div>
        <Block label={L.purpose[lang]}>
          <p style={paragraph}>{project.purpose[lang]}</p>
          {project.detail && <p style={{ ...paragraph, marginTop: 10, fontSize: 14.5, color: "#94A3B8" }}>{project.detail[lang]}</p>}
        </Block>
        {project.contribution && (
          <Block label={L.contribution[lang]}>
            <p style={paragraph}>{project.contribution[lang]}</p>
          </Block>
        )}
        <Stack project={project} lang={lang} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          padding: "clamp(18px,3vw,26px)",
          border: "1px solid rgba(148,163,184,.14)",
          borderRadius: 12,
          background: "rgba(5,8,22,.7)",
          alignSelf: "start",
        }}
      >
        <Flow project={project} lang={lang} vertical />
        {project.logic && (
          <Block label={L.logic[lang]}>
            <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 7 }}>
              {project.logic.map((step, i) => (
                <Fragment key={step.en}>
                  <li style={{ padding: "5px 10px", borderRadius: 6, border: "1px solid rgba(56,189,248,.35)", fontSize: 13, color: "#E2E8F0" }}>
                    {step[lang]}
                  </li>
                  {i < project.logic!.length - 1 && (
                    <li aria-hidden="true" style={{ color: "#38BDF8", fontSize: 12 }}>
                      →
                    </li>
                  )}
                </Fragment>
              ))}
            </ol>
          </Block>
        )}
        {project.next && (
          <div style={{ padding: "12px 14px", border: "1px dashed rgba(148,163,184,.35)", borderRadius: 8 }}>
            <h4 style={{ ...labelStyle, marginBottom: 6 }}>{L.next[lang]}</h4>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "#CBD5E1" }}>{project.next[lang]}</p>
          </div>
        )}
      </div>
    </article>
  );
}

function prefersReducedMotion() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

/**
 * Projects carousel. The track is a native horizontal scroller with
 * scroll-snap, so touch swipes and trackpads work without JS and content
 * stays readable if the script never runs. JS only adds the buttons,
 * the project tabs, arrow-key stepping and the position readout.
 * No autoplay: nothing moves while someone is reading.
 */
function ProjectsCarousel({ lang }: { lang: Lang }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [announce, setAnnounce] = useState("");
  const total = PROJECTS.length;

  // Follow the snapped slide as the track scrolls (swipe, trackpad, buttons).
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const i = Math.round(el.scrollLeft / Math.max(1, el.clientWidth));
        setIndex(Math.max(0, Math.min(total - 1, i)));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [total]);

  // Keep the active tab visible when the tab row scrolls sideways (phones).
  useEffect(() => {
    const list = tabsRef.current;
    const tab = list?.children[index] as HTMLElement | undefined;
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({ left: tab.offsetLeft - list.clientWidth / 2 + tab.offsetWidth / 2, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }, [index]);

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const next = Math.max(0, Math.min(total - 1, i));
    el.scrollTo({ left: next * el.clientWidth, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    setIndex(next);
    setAnnounce(`${L.slide[lang]} ${next + 1} ${L.of[lang]} ${total}: ${PROJECTS[next].name}`);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(index + (e.key === "ArrowRight" ? 1 : -1));
    } else if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      goTo(e.key === "Home" ? 0 : total - 1);
    }
  };

  return (
    <div role="region" aria-roledescription={L.carousel[lang]} aria-label={SECTIONS.projects.title[lang]} className="carousel">
      <div className="carousel__bar">
        <ul ref={tabsRef} className="carousel__tabs">
          {PROJECTS.map((p, i) => (
            <li key={p.id}>
              <button
                type="button"
                className="carousel__tab"
                aria-current={i === index ? "true" : undefined}
                aria-controls={`slide-${p.id}`}
                onClick={() => goTo(i)}
                style={{ ["--tab-accent" as string]: p.accent }}
              >
                <span aria-hidden="true" className="carousel__tab-dot" />
                {p.name}
              </button>
            </li>
          ))}
        </ul>
        <div className="carousel__nav">
          <span className="carousel__count" aria-hidden="true">
            {pad2(index + 1)} / {pad2(total)}
          </span>
          <button type="button" className="carousel__arrow" aria-label={L.prevProject[lang]} disabled={index === 0} onClick={() => goTo(index - 1)}>
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" className="carousel__arrow" aria-label={L.nextProject[lang]} disabled={index === total - 1} onClick={() => goTo(index + 1)}>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div ref={trackRef} className="carousel__track" tabIndex={0} aria-label={L.trackHint[lang]} onKeyDown={onKeyDown}>
        {PROJECTS.map((project, i) => (
          <div
            key={project.id}
            id={`slide-${project.id}`}
            role="group"
            aria-roledescription={L.slide[lang]}
            aria-label={`${i + 1} ${L.of[lang]} ${total}: ${project.name}`}
            className="carousel__slide"
          >
            <ProjectSlide project={project} lang={lang} index={i} total={total} />
          </div>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        {announce}
      </p>
    </div>
  );
}

export default function Projects({ lang }: { lang: Lang }) {
  return (
    <section id="projects" aria-labelledby="projects-title" className="mael-section">
      <SectionHeader header={SECTIONS.projects} lang={lang} id="projects-title" />
      <Reveal>
        <ProjectsCarousel lang={lang} />
      </Reveal>
    </section>
  );
}
