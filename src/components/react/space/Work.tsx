import { useState } from "react";
import { HEADS, PROJECT_TEXT as T, PROJECTS, type Lang } from "../../../data/space";
import BeamDiagram from "./BeamDiagram";
import { Head, Planet, SURFACES } from "./ui";

export default function Work({ lang }: { lang: Lang }) {
  const [sel, setSel] = useState(0);
  const cur = PROJECTS[sel];

  return (
    <section id="work" className="sec" aria-labelledby="work-title">
      <div className="wrap stack-40">
        <Head head={HEADS.work} lang={lang} id="work-title" />

        <ul className="worlds" aria-label={T.select[lang]}>
          {PROJECTS.map((p, i) => (
            <li key={p.name}>
              <button
                type="button"
                className="pick world"
                aria-pressed={i === sel}
                aria-controls="mission"
                onClick={() => setSel(i)}
              >
                <Planet size={54} bg={p.planet} glow={`0 0 24px ${p.glow}`} surface={SURFACES.small} speed={10} />
                <span className="world__text">
                  <span className="label label--11">
                    {p.n} · {p.kind[lang]}
                  </span>
                  <span className="world__name">{p.name}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <article id="mission" className="panel mission" aria-labelledby="mission-title">
          <div className="mission__story swap" key={`s${sel}`}>
            <div className="mission__block" style={{ gap: 10 }}>
              <h3 className="mission__title" id="mission-title">
                {cur.name}
              </h3>
              <p className="mission__tagline">{cur.tagline[lang]}</p>
            </div>
            <div className="mission__block" style={{ gap: 6 }}>
              <span className="label">{T.status[lang]}</span>
              <span className="mission__status">{cur.status[lang]}</span>
            </div>
            <div className="mission__block">
              <span className="label label--11" style={{ color: "var(--pink)" }}>
                {T.problem[lang]}
              </span>
              <p>{cur.problem[lang]}</p>
            </div>
            <div className="mission__block">
              <span className="label label--11" style={{ color: "var(--green)" }}>
                {T.solution[lang]}
              </span>
              <p>{cur.solution[lang]}</p>
            </div>
            <ul className="chips">
              {cur.stack.map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>
            {cur.href ? (
              <a href={cur.href} className="btn btn--solid" style={{ alignSelf: "flex-start", padding: "12px 20px" }}>
                {T.caseStudy[lang]} <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <span className="no-case">{T.noCase[lang]}</span>
            )}
          </div>

          <div className="mission__arch">
            <Planet
              className="mission__planet"
              bg={cur.planet}
              glow={`0 0 90px ${cur.glow}`}
              surface={SURFACES.large}
              speed={9}
            />
            <span className="label label--11" style={{ position: "relative" }}>
              {T.arch[lang]}
            </span>
            <div className="swap" key={`a${sel}`}>
              <BeamDiagram graph={cur.arch} lang={lang} label={`${T.arch[lang]}: ${cur.name}`} />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
