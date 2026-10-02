import type { Lang } from "@/data/content";
import { START_PATH } from "@/data/content";
import { FEATURED, HEADS } from "@/data/space";
import { caseStudyPath } from "@/lib/projects";
import BeforeAfterFlow from "../diagrams/BeforeAfterFlow";
import { Head } from "../react/space/ui";

export default function FeaturedCaseStudy({ lang }: { lang: Lang }) {
  return (
    <section id="case-study" className="sec" aria-labelledby="case-study-title">
      <div className="wrap stack-40">
        <Head head={HEADS.caseStudy} lang={lang} id="case-study-title" />
        <div className="featured__problem">
          <h3 className="ba__label">{FEATURED.problem.label[lang]}</h3>
          {FEATURED.problem.paragraphs.map((p) => (
            <p key={p.en}>{p[lang]}</p>
          ))}
        </div>
        <BeforeAfterFlow before={FEATURED.before} approach={FEATURED.approach} after={FEATURED.after} lang={lang} />
        <figure className="pull-quote">
          <blockquote>
            <p>“{FEATURED.quote[lang]}”</p>
          </blockquote>
        </figure>
        <div className="featured__principle">
          <h3 className="ba__label">{FEATURED.principle.label[lang]}</h3>
          <p>{FEATURED.principle.text[lang]}</p>
        </div>
        <div className="hero__ctas">
          <a href={START_PATH} className="btn btn--solid" data-track="Start Project" data-track-label="featured">
            {FEATURED.cta[lang]} <span aria-hidden="true">→</span>
          </a>
          <a href={caseStudyPath(FEATURED.slug)} className="btn btn--line" data-track="View Project" data-track-label="featured">
            {FEATURED.ctaCase[lang]} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
