import type { Lang } from "@/data/content";
import { CASE_TEXT as T } from "@/data/caseStudy";
import type { Project } from "@/lib/projects";
import ProjectStatus from "../work/ProjectStatus";

export default function CaseStudyHeader({ project: p, lang }: { project: Project; lang: Lang }) {
  const meta = [
    { k: T.category[lang], v: p.category[lang] },
    p.role && { k: T.role[lang], v: p.role[lang] },
    p.year && { k: T.year[lang], v: p.year },
  ].filter(Boolean) as { k: string; v: string }[];

  return (
    <header className="case-head">
      <a href="/#work" className="back-link">
        <span aria-hidden="true">←</span> {T.back[lang]}
      </a>
      <h1 className="case-head__title">{p.title}</h1>
      <p className="case-head__subtitle">{p.subtitle[lang]}</p>
      <ProjectStatus status={p.status} lang={lang} />
      {p.caseStudy?.notice && (
        <p className="case-head__notice" role="note">
          {p.caseStudy.notice[lang]}
        </p>
      )}
      <dl className="case-head__meta">
        {meta.map((m) => (
          <div key={m.k}>
            <dt className="label label--11">{m.k}</dt>
            <dd>{m.v}</dd>
          </div>
        ))}
        <div data-wide="">
          <dt className="label label--11">{T.stack[lang]}</dt>
          <dd>
            <ul className="chips">
              {p.stack.map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
    </header>
  );
}
