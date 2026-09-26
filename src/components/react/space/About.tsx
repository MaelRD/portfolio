import { ABOUT, HEADS, type Lang } from "../../../data/space";
import { Eyebrow, Planet, SURFACES } from "./ui";

export default function About({ lang }: { lang: Lang }) {
  return (
    <section id="about" className="sec" aria-labelledby="about-title">
      <div className="wrap stack-48">
        <div className="split">
          <div className="about__copy">
            <Eyebrow head={HEADS.about} lang={lang} />
            <h2 className="h2" id="about-title">
              {HEADS.about.title[lang]}
            </h2>
            <p className="about__lead">{ABOUT.lead[lang]}</p>
            {ABOUT.paragraphs.map((p) => (
              <p key={p.en} className="body">
                {p[lang]}
              </p>
            ))}
          </div>

          <aside className="spotlight panel dossier">
            <div className="dossier__horizon">
              <Planet className="dossier__earth" surface={SURFACES.earth} speed={6} />
              <span className="label" style={{ left: 20 }}>
                {ABOUT.dossier[lang]}
              </span>
              <span className="label" style={{ right: 20, color: "var(--cyan)" }}>
                {ABOUT.coords[lang]}
              </span>
            </div>
            <dl className="dossier__facts">
              {ABOUT.facts.map((f) => (
                <div key={f.k.en} data-wide={f.wide ? "" : undefined}>
                  <dt className="label">{f.k[lang]}</dt>
                  <dd>{f.v[lang]}</dd>
                  {f.note && <dd><small>{f.note[lang]}</small></dd>}
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <ul className="levels">
          {ABOUT.levels.map((l) => (
            <li key={l.k.en} className="spotlight">
              <span className="label label--12" style={{ color: l.color }}>
                {l.k[lang]}
              </span>
              <strong>{l.v[lang]}</strong>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
