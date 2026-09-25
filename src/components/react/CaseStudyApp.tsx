import type { CSSProperties } from "react";
import { CASE_STUDIES, PROJECT_LABELS as L, PROJECTS, UI } from "../../data/content";
import Flow from "./Flow";
import { useLang } from "./hooks";
import Header from "./Header";
import { Footer } from "./ContactFooter";
import { StatusBadge, TechList } from "./Projects";
import Reveal from "./Reveal";
import Cursor from "./Cursor";

const pad2 = (n: number) => String(n).padStart(2, "0");
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

/**
 * Case-study page. Sections follow Context → … → What I learned, but only the
 * ones with real content exist in the data, so numbering is sequential over
 * what's actually there.
 */
export default function CaseStudyApp({ slug }: { slug: string }) {
  const study = CASE_STUDIES.find((c) => c.slug === slug)!;
  const project = PROJECTS.find((p) => p.id === study.projectId)!;
  const [lang, setLang] = useLang(project.tagline);
  const others = CASE_STUDIES.filter((c) => c.slug !== slug).map((c) => ({ c, p: PROJECTS.find((p) => p.id === c.projectId)! }));

  return (
    <>
      <Header lang={lang} setLang={setLang} base="/" active="work" />
      <Cursor />
      <main id="main" tabIndex={-1} className="case-page" style={{ position: "relative", zIndex: 10 }}>
        <header className="case-hero">
          <a href="/#work" className="text-link" style={{ marginBottom: 26 }}>
            <span aria-hidden="true">←</span> {UI.backHome[lang]}
          </a>
          <p className="mono-label" style={{ color: "#A78BFA" }}>
            CASE STUDY
          </p>
          {/* Same view-transition-name as the project title on the home page: the title carries over. */}
          <h1 className="case-hero__title" style={{ viewTransitionName: `project-${project.id}` } as CSSProperties}>
            {project.name}
          </h1>
          <p className="case-hero__tagline">{project.tagline[lang]}</p>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 14, marginTop: 6 }}>
            {project.status && <StatusBadge status={project.status} lang={lang} />}
            <TechList items={project.stack} />
          </div>
        </header>

        <div className="case-body">
          <nav className="case-toc" aria-label={lang === "es" ? "Secciones del caso" : "Case study sections"}>
            <ol>
              {study.sections.map((s, i) => (
                <li key={s.title}>
                  <a href={`#${slugify(s.title)}`}>
                    <span>{pad2(i + 1)}</span> {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="case-sections">
            {study.sections.map((s, i) => (
              <Reveal as="section" key={s.title} className="case-section">
                <h2 id={slugify(s.title)} className="case-section__title">
                  <span>{pad2(i + 1)} /</span> {s.title}
                </h2>
                {s.flow && <Flow items={s.flow} accent={project.accent} orientation="responsive" label={s.title} />}
                {s.body && <p className="body-text case-section__body">{s.body[lang]}</p>}
                {s.list && (
                  <ul className="check-list">
                    {s.list.map((item) => (
                      <li key={item.en}>{item[lang]}</li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}
          </div>
        </div>

        {others.length > 0 && (
          <nav className="case-next" aria-label={lang === "es" ? "Otros casos" : "Other case studies"}>
            {others.map(({ c, p }) => (
              <a key={c.slug} href={`/projects/${c.slug}`} className="case-next__link">
                <span className="mono-label">{L.caseStudy[lang]}</span>
                <span className="case-next__name">
                  {p.name} <span aria-hidden="true">→</span>
                </span>
                <span className="body-text">{p.tagline[lang]}</span>
              </a>
            ))}
          </nav>
        )}
      </main>
      <Footer lang={lang} />
    </>
  );
}
