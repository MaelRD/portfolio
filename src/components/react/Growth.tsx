import { DIRECTION, DIRECTION_NOTE, EDUCATION, SECTIONS, type Lang } from "../../data/content";
import { useScrollProgress } from "./motion";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

/** Education, kept deliberately small. */
export function Education({ lang }: { lang: Lang }) {
  return (
    <section id="education" aria-labelledby="education-title" className="mael-section mael-section--compact">
      <SectionHeader header={SECTIONS.education} lang={lang} id="education-title" accent="#38BDF8" />
      <Reveal className="edu-card">
        <div>
          <p className="edu-card__degree">{EDUCATION.degree}</p>
          <p className="body-text">{EDUCATION.school}</p>
        </div>
        <dl className="edu-card__meta">
          <div>
            <dt className="sr-only">{lang === "es" ? "Graduación" : "Graduation"}</dt>
            <dd style={{ color: "#7DD3FC" }}>{EDUCATION.graduation[lang]}</dd>
          </div>
          <div>
            <dt className="sr-only">{lang === "es" ? "Idiomas" : "Languages"}</dt>
            <dd>{EDUCATION.languages[lang]}</dd>
          </div>
        </dl>
      </Reveal>
    </section>
  );
}

/**
 * Professional direction as a trajectory that builds as you scroll: each
 * segment draws from its dot toward the next step (driven by one
 * --progress variable, CSS only), rising like a staircase on wide screens.
 * The current position is labelled CURRENT; the goal is drawn dashed and
 * labelled DIRECTION — a direction, never presented as experience.
 */
export function Direction({ lang }: { lang: Lang }) {
  const ref = useScrollProgress<HTMLOListElement>("--progress", 0.75);
  return (
    <section id="direction" aria-labelledby="direction-title" className="mael-section mael-section--compact">
      <SectionHeader header={SECTIONS.direction} lang={lang} id="direction-title" accent="#E879F9" />
      <ol ref={ref} className="traj" style={{ ["--n" as string]: DIRECTION.length }}>
        {DIRECTION.map((d, i) => (
          <li key={d.title} className="traj__step" data-state={d.state} style={{ ["--i" as string]: i }}>
            <span className="traj__seg" aria-hidden="true">
              <span className="traj__dot" />
              <span className="traj__line" />
            </span>
            <span className="traj__when">{d.state === "now" ? `${d.when[lang]} · CURRENT` : d.when[lang]}</span>
            <span className="traj__title">{d.title}</span>
            {d.detail && <span className="traj__detail">{d.detail}</span>}
          </li>
        ))}
      </ol>
      <p className="direction__note">{DIRECTION_NOTE[lang]}</p>
    </section>
  );
}
