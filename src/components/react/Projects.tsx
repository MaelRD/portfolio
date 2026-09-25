import { useState, type CSSProperties, type ReactNode } from "react";
import { PROJECT_LABELS as L, PROJECTS, SECTIONS, STATUS_LABELS, type Lang, type Project, type ProjectStatus } from "../../data/content";
import ArchitectureDiagram from "./ArchitectureDiagram";
import { useInView, useMedia } from "./motion";
import SectionHeader from "./SectionHeader";

const STATUS_COLORS: Record<ProjectStatus, string> = {
  development: "#38BDF8",
  definition: "#E879F9",
  completed: "#4ADE80",
};

export function StatusBadge({ status, lang }: { status: ProjectStatus; lang: Lang }) {
  const color = STATUS_COLORS[status];
  return (
    <span className="status-badge" style={{ borderColor: `${color}66`, background: `${color}14` }}>
      <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}` }} />
      {STATUS_LABELS[status][lang]}
    </span>
  );
}

export function Label({ children, as: Tag = "h4" }: { children: ReactNode; as?: "h3" | "h4" | "p" }) {
  return <Tag className="mono-label">{children}</Tag>;
}

export function TechList({ items }: { items: string[] }) {
  return (
    <ul className="tech-list">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

const pad2 = (n: number) => String(n).padStart(2, "0");
const caseHref = (p: Project) => (p.slug ? `/projects/${p.slug}` : undefined);

/**
 * One project as a system readout: coordinates and state up top, the story
 * in two short blocks, and its own architecture building itself on the right.
 * `playKey` changes every time the panel becomes active, replaying the build.
 */
function ProjectPanel({
  project,
  lang,
  index,
  active,
  playKey,
  stacked,
}: {
  project: Project;
  lang: Lang;
  index: number;
  active: boolean;
  playKey: number;
  stacked: boolean;
}) {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.25 });
  const href = caseHref(project);
  return (
    <article
      ref={ref}
      id={`project-${project.id}`}
      aria-labelledby={`${project.id}-title`}
      className="pp"
      data-active={active ? "" : undefined}
      style={{ "--accent": project.accent } as CSSProperties}
    >
      <div className="pp__story">
        <div className="pp__meta">
          <span className="pp__n">{pad2(index + 1)}</span>
          <span className="pp__kind">{project.kind}</span>
        </div>
        <h3 id={`${project.id}-title`} className="pp__name" style={{ viewTransitionName: `project-${project.id}` } as CSSProperties}>
          {project.name}
        </h3>
        <p className="pp__tagline">{project.tagline[lang]}</p>

        <dl className="pp__facts">
          {project.status && (
            <div>
              <dt>{L.status[lang]}</dt>
              <dd>
                <StatusBadge status={project.status} lang={lang} />
              </dd>
            </div>
          )}
          <div>
            <dt>{L.stack[lang]}</dt>
            <dd className="pp__stack">{project.stack.join(" / ")}</dd>
          </div>
        </dl>

        <div className="pp__pair">
          <div>
            <Label>{L.problem[lang]}</Label>
            <p className="body-text">{project.problem[lang]}</p>
          </div>
          <div>
            <Label>{L.solution[lang]}</Label>
            <p className="body-text">{project.solution[lang]}</p>
          </div>
        </div>

        {href ? (
          <a href={href} className="arrow-link" data-cursor="view">
            {L.caseStudy[lang]}
            <span className="sr-only">: {project.name}</span>
            <span className="arrow-link__icon" aria-hidden="true">
              ↗
            </span>
          </a>
        ) : (
          <p className="mono-label" style={{ margin: 0 }}>
            {L.noCase[lang]}
          </p>
        )}
      </div>

      <div className="pp__arch">
        <Label>{L.architecture[lang]}</Label>
        <ArchitectureDiagram
          topology={project.topology}
          accent={project.accent}
          play={(stacked || active) && inView}
          playKey={playKey}
          label={`${project.name} — ${L.architecture[lang]}: ${project.topology.nodes.map((n) => n.label).join(", ")}`}
        />
      </div>
    </article>
  );
}

/**
 * WOW 2 — selecting a project rebuilds its architecture.
 * Desktop (≥1024px): numbered list on the left; hovering or focusing an item
 * switches the panel on the right (old one leaves upward, new one rises in,
 * its topology redraws). All panels share one grid cell, so the section never
 * changes height. Phones/tablets: the list hides and every panel stacks,
 * each building its diagram as it scrolls into view.
 * One DOM for both, readable without JS (the first project shows).
 */
export default function Projects({ lang }: { lang: Lang }) {
  const [activeId, setActiveId] = useState(PROJECTS[0].id);
  const [plays, setPlays] = useState<Record<string, number>>({});
  const stacked = !useMedia("(min-width: 1024px)");

  const select = (id: string) => {
    if (id === activeId) return;
    setActiveId(id);
    setPlays((p) => ({ ...p, [id]: (p[id] ?? 0) + 1 }));
  };

  return (
    <section id="work" aria-labelledby="work-title" className="mael-section">
      <SectionHeader header={SECTIONS.work} lang={lang} id="work-title" />

      <div className="switcher">
        <ol className="switcher__list" aria-label={L.select[lang]}>
          {PROJECTS.map((p, i) => {
            const href = caseHref(p);
            const common = {
              className: "switcher__item",
              "data-active": p.id === activeId ? "" : undefined,
              "aria-current": p.id === activeId ? ("true" as const) : undefined,
              onPointerEnter: () => select(p.id),
              onFocus: () => select(p.id),
              style: { "--accent": p.accent } as CSSProperties,
            };
            const inner = (
              <>
                <span className="switcher__n">{pad2(i + 1)}</span>
                <span className="switcher__body">
                  <span className="switcher__name">{p.name}</span>
                  <span className="switcher__kind">{p.kind}</span>
                </span>
                <span className="switcher__rule" aria-hidden="true" />
                <span className="switcher__cta" aria-hidden="true">
                  {href ? `${L.caseStudy[lang].toUpperCase()} ↗` : "CONCEPT"}
                </span>
              </>
            );
            return (
              <li key={p.id}>
                {href ? (
                  <a href={href} data-cursor="view" {...common}>
                    {inner}
                  </a>
                ) : (
                  <button type="button" data-cursor="link" onClick={() => select(p.id)} {...common}>
                    {inner}
                  </button>
                )}
              </li>
            );
          })}
        </ol>

        <div className="switcher__stage">
          {PROJECTS.map((p, i) => (
            <ProjectPanel key={p.id} project={p} lang={lang} index={i} active={p.id === activeId} playKey={plays[p.id] ?? 0} stacked={stacked} />
          ))}
        </div>
      </div>
    </section>
  );
}
