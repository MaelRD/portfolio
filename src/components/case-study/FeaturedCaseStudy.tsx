import type { Lang } from "@/data/content";
import { FEATURED, HEADS } from "@/data/space";
import { caseStudyPath } from "@/lib/projects";
import BeforeAfterFlow from "../diagrams/BeforeAfterFlow";
import { Head } from "../react/space/ui";

export default function FeaturedCaseStudy({ lang }: { lang: Lang }) {
  return (
    <section id="case-study" className="sec" aria-labelledby="case-study-title">
      <div className="wrap stack-40">
        <Head head={HEADS.caseStudy} lang={lang} id="case-study-title" />
        <BeforeAfterFlow before={FEATURED.before} after={FEATURED.after} lang={lang} />
        <figure className="pull-quote">
          <blockquote>
            <p>“{FEATURED.quote[lang]}”</p>
          </blockquote>
        </figure>
        <a href={caseStudyPath(FEATURED.slug)} className="btn btn--solid featured__cta" data-track="View Project" data-track-label="featured">
          {FEATURED.cta[lang]} <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
