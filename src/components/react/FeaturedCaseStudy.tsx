import { FEATURED, PROJECT_LABELS as L, PROJECTS, SECTIONS, type Lang } from "../../data/content";
import Flow from "./Flow";
import { Label, StatusBadge, TechList } from "./Projects";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

/**
 * GBS Builder told in four panels, in the order an engineer would ask:
 * what was wrong, how the process works, what was built, what I did.
 */
export default function FeaturedCaseStudy({ lang }: { lang: Lang }) {
  const project = PROJECTS.find((p) => p.id === FEATURED.projectId)!;
  const href = `/projects/${project.slug}`;

  return (
    <section id="case-study" aria-labelledby="case-study-title" className="mael-section">
      <SectionHeader header={SECTIONS.caseStudy} lang={lang} id="case-study-title" accent="#A78BFA" />
      {project.status && (
        <div style={{ marginTop: -18, marginBottom: 26 }}>
          <StatusBadge status={project.status} lang={lang} />
        </div>
      )}

      <div className="case-grid">
        <Reveal className="case-panel">
          <Label as="h3">{L.problem[lang]}</Label>
          <p className="body-text" style={{ fontSize: 16.5 }}>
            {FEATURED.problem[lang]}
          </p>
        </Reveal>

        <Reveal className="case-panel" delay={60}>
          <Label as="h3">{L.process[lang]}</Label>
          <Flow items={FEATURED.process} accent="#38BDF8" label={`GBS Builder — ${L.process[lang]}`} />
        </Reveal>

        <Reveal className="case-panel" delay={120}>
          <Label as="h3">{L.solution[lang]}</Label>
          <Flow items={FEATURED.solution} accent="#8B5CF6" highlight={3} label={`GBS Builder — ${L.solution[lang]}`} />
        </Reveal>

        <Reveal className="case-panel" delay={180}>
          <Label as="h3">{L.role[lang]}</Label>
          <ul className="check-list">
            {FEATURED.role.map((r) => (
              <li key={r.en}>{r[lang]}</li>
            ))}
          </ul>
          <p className="body-text" style={{ marginTop: 14, fontSize: 14, color: "#94A3B8" }}>
            {FEATURED.team[lang]}
          </p>
        </Reveal>
      </div>

      <div className="case-footer">
        <div>
          <Label>{L.tech[lang]}</Label>
          <TechList items={project.stack} />
        </div>
        <a href={href} className="mael-btn mael-btn--primary">
          {L.caseStudy[lang]}
          <span className="sr-only">: {project.name}</span>
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
