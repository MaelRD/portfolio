import { Fragment } from "react";
import { EXPERIENCE, EXPERIENCE_LABELS as XL, SECTIONS, type Lang, type Role } from "../../data/content";
import { useArmed, useInView, useScrollProgress } from "./motion";
import { TechList } from "./Projects";
import SectionHeader from "./SectionHeader";

// "June 2026 – present" → "2026"; the current role reads NOW.
const yearOf = (role: Role, lang: Lang) => (role.current ? XL.now[lang] : (role.period.en.match(/\d{4}/)?.[0] ?? ""));

/** A role on the timeline: its node activates and its content rises in when it enters the viewport. */
function RoleEntry({ role, lang, accent }: { role: Role; lang: Lang; accent: string }) {
  const armed = useArmed();
  const [ref, inView] = useInView<HTMLLIElement>({ threshold: 0.25 });
  return (
    <li
      ref={ref}
      className="tl-role"
      data-in={!armed || inView ? "" : undefined}
      data-current={role.current ? "" : undefined}
      style={{ ["--accent" as string]: accent }}
    >
      <span className="tl-role__year">{yearOf(role, lang)}</span>
      <span className="tl-role__node" aria-hidden="true" />
      <div className="tl-role__body">
        <div className="tl-role__head">
          <h4 className="tl-role__title">{role.title}</h4>
          {role.current && <span className="tl-role__badge">{XL.current[lang]}</span>}
        </div>
        <p className="exp-focus">{role.focus}</p>
        <p className="tl-role__period">{role.period[lang]}</p>
        <p className="body-text" style={{ maxWidth: "68ch" }}>
          {role.context[lang]}
        </p>
        <ul className="exp-work">
          {role.work.map((w) => (
            <li key={w.en}>{w[lang]}</li>
          ))}
        </ul>
        <span className="sr-only">{XL.tech[lang]}: </span>
        <TechList items={role.tech} />
      </div>
    </li>
  );
}

/**
 * Experience as a vertical progression: inside each company the roles read
 * oldest → newest (2025 → 2026 → NOW) so growth is visible, the line fills as
 * you scroll, and each role's node activates as it enters. Official titles
 * are shown unchanged; the trajectory strip only abbreviates them visually.
 */
function Company({ item, lang, index }: { item: (typeof EXPERIENCE)[number]; lang: Lang; index: number }) {
  const lineRef = useScrollProgress<HTMLDivElement>("--progress", 0.6);
  const roles = [...item.roles].reverse();
  return (
    <article aria-labelledby={`company-${index}`} className="tl-company" style={{ ["--accent" as string]: item.accent }}>
      <header className="tl-company__head">
        <h3 id={`company-${index}`} className="tl-company__name">
          {item.company}
        </h3>
        <p className="tl-company__span">{item.span[lang]}</p>
        {roles.length > 1 && (
          <p className="tl-growth">
            <span className="sr-only">{XL.growth[lang]}: </span>
            {roles.map((r, i) => (
              <Fragment key={r.title}>
                <span data-current={r.current ? "" : undefined}>{r.short}</span>
                {i < roles.length - 1 && <span aria-hidden="true"> → </span>}
              </Fragment>
            ))}
          </p>
        )}
      </header>
      <div ref={lineRef} className="tl-line-wrap">
        <div className="tl-line" aria-hidden="true">
          <div className="tl-line__fill" />
        </div>
        <ol className="tl-roles">
          {roles.map((role) => (
            <RoleEntry key={role.title} role={role} lang={lang} accent={item.accent} />
          ))}
        </ol>
      </div>
    </article>
  );
}

export default function Experience({ lang }: { lang: Lang }) {
  return (
    <section id="experience" aria-labelledby="experience-title" className="mael-section">
      <SectionHeader header={SECTIONS.experience} lang={lang} id="experience-title" />
      <div className="tl">
        {EXPERIENCE.map((item, i) => (
          <Company key={item.company} item={item} lang={lang} index={i} />
        ))}
      </div>
    </section>
  );
}
