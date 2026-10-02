import type { Lang } from "@/data/content";
import { START_PATH } from "@/data/content";
import { MID_CTA } from "@/data/space";

// A short stop between the case study and the rest of the page, for visitors
// who already recognize their own process in it.

export default function MidCta({ lang }: { lang: Lang }) {
  return (
    <section className="sec sec--tight" aria-labelledby="mid-cta-title">
      <div className="wrap">
        <div className="spotlight panel mid-cta">
          <h2 className="mid-cta__title" id="mid-cta-title">
            {MID_CTA.title[lang]}
          </h2>
          <div className="mid-cta__body">
            {MID_CTA.paragraphs.map((p) => (
              <p key={p.en}>{p[lang]}</p>
            ))}
          </div>
          <div className="hero__ctas">
            <a href={START_PATH} className="btn btn--solid" data-track="Start Project" data-track-label="mid-cta">
              {MID_CTA.primary[lang]} <span aria-hidden="true">→</span>
            </a>
            <a href="#process" className="btn btn--line">
              {MID_CTA.secondary[lang]}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
