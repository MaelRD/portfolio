import { EXPERIENCE_TEXT, HEADS, ORGS, type Lang } from "../../../data/space";
import { Head } from "./ui";

export default function Experience({ lang }: { lang: Lang }) {
  return (
    <section id="experience" className="sec" aria-labelledby="experience-title">
      <div className="wrap wrap--narrow stack-40">
        <Head head={HEADS.experience} lang={lang} id="experience-title" />
        {ORGS.map((o) => (
          <div key={o.name} className="org">
            <div className="org__head">
              <h3>{o.name}</h3>
              <span className="label label--12" style={{ letterSpacing: 0 }}>
                {o.meta[lang]}
              </span>
            </div>
            <div style={{ position: "relative" }}>
              <span className="log__rail" aria-hidden="true">
                <span className="pulse" data-pulse="0.00018" />
              </span>
              <ol className="log">
                {o.roles.map((r) => (
                  <li key={r.title} className="spotlight panel entry" data-current={r.current ? "" : undefined}>
                    <span className="entry__dot" aria-hidden="true" />
                    <p className="entry__when">
                      <span>{r.year[lang]}</span>
                      <span>{r.dates[lang]}</span>
                      {r.current && <span className="badge-now">{EXPERIENCE_TEXT.current[lang]}</span>}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <h4>{r.title}</h4>
                      <span className="entry__sub">{r.sub[lang]}</span>
                    </div>
                    <p className="entry__summary">{r.summary[lang]}</p>
                    <ul className="bullets">
                      {r.bullets.map((b) => (
                        <li key={b.en}>{b[lang]}</li>
                      ))}
                    </ul>
                    <ul className="chips" style={{ gap: 6 }}>
                      {r.tech.map((t) => (
                        <li key={t} className="chip chip--sm">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
