import type { Lang } from "@/data/content";
import { ABOUT_V2 as T } from "@/data/v2";
import { SectionHeader } from "../kit";
import CometCard from "../aceternity/CometCard";

// About, kept human and quiet: a photo, a few lines and three facts. The
// only effect is on the photo (Comet Card), which turns toward the pointer.

export default function About({ lang }: { lang: Lang }) {
  return (
    <section id="about" className="sec" aria-labelledby="about-title">
      <div className="wrap about2">
        <CometCard className="about2__comet">
          <figure className="about2__photo">
            <img src="/about/mario.webp" alt={T.photoAlt[lang]} width={676} height={720} loading="lazy" decoding="async" />
            <figcaption className="about2__caption">
              <span>Mario Yael</span>
              <span className="about2__handle">#MaelRD</span>
            </figcaption>
          </figure>
        </CometCard>
        <div className="about2__copy">
          <SectionHeader id="about-title" title={T.title[lang]} />
          <p className="about2__lead">{T.lead[lang]}</p>
          {T.paragraphs.map((p) => (
            <p key={p.en} className="about2__p">
              {p[lang]}
            </p>
          ))}
          <dl className="about2__facts">
            {T.facts.map((f) => (
              <div key={f.k.en}>
                <dt>{f.k[lang]}</dt>
                <dd>{f.v[lang]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
