import { useEffect, useState } from "react";
import { START_PATH } from "@/data/content";
import { CASE_SECTIONS, CASE_TEXT as T } from "@/data/caseStudy";
import { track } from "@/lib/analytics";
import { useLang } from "@/lib/lang";
import { caseStudyPath, type Project } from "@/lib/projects";
import SiteShell from "./layout/SiteShell";
import CaseStudyHeader from "./case-study/CaseStudyHeader";
import CaseStudySection from "./case-study/CaseStudySection";

// Case-study page: sections in the fixed order Context → Next evolution, only
// the ones with verified content, numbered in sequence. A table of contents
// follows along on wide screens.

function useCurrentSection(ids: string[]) {
  const [current, setCurrent] = useState(ids[0]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(e.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return current;
}

export default function CaseStudyApp({ project: p, next }: { project: Project; next?: Project }) {
  const [lang, setLang] = useLang(p.summary);
  const sections = CASE_SECTIONS.filter((s) => p.caseStudy?.[s.key]).map((s, i) => ({ ...s, id: `s-${s.key}`, n: i + 1 }));
  const [ids] = useState(() => sections.map((s) => s.id));
  const current = useCurrentSection(ids);

  useEffect(() => track("Open Case Study", { project: p.slug }), [p.slug]);

  return (
    <SiteShell lang={lang} setLang={setLang} base="/">
      <article className="case">
        <div className="wrap">
          <CaseStudyHeader project={p} lang={lang} />

          <div className="case__body">
            <nav className="case-toc" aria-label={T.toc[lang]}>
              <p className="label label--11">{T.toc[lang]}</p>
              <ol>
                {sections.map((s) => (
                  <li key={s.key}>
                    <a href={`#${s.id}`} aria-current={current === s.id ? "true" : undefined}>
                      <span>{String(s.n).padStart(2, "0")}</span> {s.label[lang]}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="case__sections">
              {sections.map((s) => (
                <CaseStudySection key={s.key} id={s.id} n={s.n} label={s.label} section={p.caseStudy![s.key]!} lang={lang} />
              ))}
            </div>
          </div>

          <footer className="case__end">
            {next && (
              <a href={caseStudyPath(next.slug)} className="spotlight panel case-next" data-track="View Project" data-track-label={`next:${next.slug}`}>
                <span className="label label--11">{T.next[lang]}</span>
                <span className="case-next__name">
                  {next.title} <span aria-hidden="true">→</span>
                </span>
                <span className="case-next__sub">{next.subtitle[lang]}</span>
              </a>
            )}
            <div className="panel case-start">
              <p className="case-start__title">{T.startTitle[lang]}</p>
              <a href={START_PATH} className="btn btn--solid" data-track="Start Project" data-track-label={`case:${p.slug}`}>
                {T.start[lang]} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </footer>
        </div>
      </article>
    </SiteShell>
  );
}
