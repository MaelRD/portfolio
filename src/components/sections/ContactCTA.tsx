import type { Lang } from "@/data/content";
import { CV_FILENAME, CV_PATH } from "@/data/content";
import { FINAL_CTA as T } from "@/data/v2";
import { CTAButton, TiltCard } from "../kit";

// The closing question, under a restrained Lamp Effect (after Aceternity):
// one thin line of light with a soft cone falling from it, in the page's
// violet. Two doors below: a project, or hiring.

export default function ContactCTA({ lang }: { lang: Lang }) {
  return (
    <section id="cta" className="sec lampsec" aria-labelledby="cta-title">
      <div className="lamp" aria-hidden="true">
        <span className="lamp__cone" />
        <span className="lamp__line" />
      </div>
      <div className="wrap lampsec__inner">
        <h2 className="lampsec__title" id="cta-title">
          {T.title[lang]}
        </h2>
        <div className="paths2">
          <TiltCard className="path2" max={8}>
            <p className="path2__kicker">{T.project.kicker[lang]}</p>
            <p className="path2__text">{T.project.text[lang]}</p>
            <CTAButton href="#contact" moving magnetic data-track="Contact" data-track-label="final-cta">
              {T.project.cta[lang]}
            </CTAButton>
          </TiltCard>
          <TiltCard className="path2" max={8}>
            <p className="path2__kicker">{T.hiring.kicker[lang]}</p>
            <p className="path2__text">{T.hiring.text[lang]}</p>
            <div className="path2__actions">
              <CTAButton href="#experience" variant="line">
                {T.hiring.cta[lang]}
              </CTAButton>
              <CTAButton href={CV_PATH} variant="line" arrow="↓" download={CV_FILENAME} data-track="Download Resume" data-track-label="final-cta">
                {T.hiring.cv[lang]}
              </CTAButton>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
