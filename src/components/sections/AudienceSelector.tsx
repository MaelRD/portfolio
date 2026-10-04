import type { Lang } from "@/data/content";
import { AUDIENCE as A } from "@/data/v2";
import { SectionHeader, TiltCard } from "../kit";

// "What are you looking for?" and "Sound familiar?" in one place: two large
// doors, one for recruiters and one for businesses. Each card leans a few
// degrees toward the pointer (TiltCard); the whole card is the link, through
// its call to action stretched over it.

export default function AudienceSelector({ lang }: { lang: Lang }) {
  return (
    <section id="audience" className="sec" aria-labelledby="audience-title">
      <div className="wrap stack-40">
        <SectionHeader id="audience-title" title={A.title[lang]} intro={A.intro[lang]} />
        <div className="doors">
          <TiltCard className="door door--hire">
            <span className="door__glow" aria-hidden="true" />
            <p className="door__kicker">{A.hire.kicker[lang]}</p>
            <h3 className="door__title">{A.hire.title[lang]}</h3>
            <ul className="door__points">
              {A.hire.points.map((p) => (
                <li key={p.en}>{p[lang]}</li>
              ))}
            </ul>
            <a href="#experience" className="door__cta stretch" data-track="Audience" data-track-label="hire">
              {A.hire.cta[lang]} <span aria-hidden="true">→</span>
            </a>
          </TiltCard>
          <TiltCard className="door door--project">
            <span className="door__glow" aria-hidden="true" />
            <p className="door__kicker">{A.project.kicker[lang]}</p>
            <h3 className="door__title">{A.project.title[lang]}</h3>
            <div className="door__chips">
              <p className="label label--11">{A.project.chipsLabel[lang]}</p>
              <ul>
                {A.project.chips.map((c) => (
                  <li key={c.en}>{c[lang]}</li>
                ))}
              </ul>
            </div>
            <a href="#solutions" className="door__cta stretch" data-track="Audience" data-track-label="project">
              {A.project.cta[lang]} <span aria-hidden="true">→</span>
            </a>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
