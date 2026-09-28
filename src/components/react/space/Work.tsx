import { useState } from "react";
import { bi, tx, type Bi, type Text } from "../../../data/content";
import { HEADS, PLANETS, PROJECT_TEXT as T, type Lang } from "../../../data/space";
import { caseStudyPath, type Project } from "@/lib/projects";
import BeamDiagram, { type ArchGraph } from "./BeamDiagram";
import { Head, Planet, SURFACES } from "./ui";

const both = (t: Text): Bi => bi(tx(t, "es"), tx(t, "en"));

/** One color per area, for stages that group several areas (sales, purchasing, logistics…). */
const AREA_TONES = ["#6EF3A5", "#FFC07A", "#F9A8D4", "#9DB4FF"];

/** A project's flow as the beam diagram's columns: each stage a column, every node linked to the next stage. */
function toGraph(p: Project): ArchGraph {
  const cols = p.diagram.flow.stages.map((stage, i) =>
    stage.map((n, j) => ({
      id: `${i}-${j}`,
      l: both(n.label),
      s: n.sub ? both(n.sub) : undefined,
      tone: stage.length > 1 ? AREA_TONES[j % AREA_TONES.length] : undefined,
    })),
  );
  const edges = cols.slice(1).flatMap((col, i) => cols[i].flatMap((a) => col.map((b) => [a.id, b.id] as [string, string])));
  return { cols, edges };
}

function toMission(p: Project, i: number) {
  return {
    n: String(i + 1).padStart(2, "0"),
    name: p.title,
    kind: p.category,
    status: p.status,
    tagline: p.subtitle,
    problem: p.problem,
    solution: p.solution,
    stack: p.stack,
    arch: toGraph(p),
    href: caseStudyPath(p.slug),
    slug: p.slug,
    cta: p.links.cta,
    ...(PLANETS[p.slug] ?? PLANETS["gbs-builder"]),
  };
}

export default function Work({ projects, lang }: { projects: Project[]; lang: Lang }) {
  const [sel, setSel] = useState(0);
  const PROJECTS = projects.map(toMission);
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
                className="spotlight pick world"
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

        <article id="mission" className="spotlight panel mission" aria-labelledby="mission-title">
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
            <a href={cur.href} className="btn btn--solid" style={{ alignSelf: "flex-start", padding: "12px 20px" }} data-track="View Project" data-track-label={cur.slug}>
              {cur.cta[lang]} <span aria-hidden="true">↗</span>
            </a>
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
