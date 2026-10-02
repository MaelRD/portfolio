import type { Lang } from "@/data/content";
import type { SOLUTIONS } from "@/data/space";
import DataFlow from "../diagrams/DataFlow";

type Solution = (typeof SOLUTIONS)[number];

export default function SolutionCard({ s, lang }: { s: Solution; lang: Lang }) {
  const flow = {
    direction: "horizontal" as const,
    links: s.flow.slice(1).map(() => (s.twoWay ? "two" : "one") as "one" | "two"),
    label: { en: s.flow.map((f) => f.en).join(s.twoWay ? " ↔ " : " → "), es: s.flow.map((f) => f.es).join(s.twoWay ? " ↔ " : " → ") },
    stages: s.flow.map((f) => [{ label: f }]),
  };
  const titleId = `solution-${s.n}`;
  return (
    <article className="spotlight panel solution" aria-labelledby={titleId}>
      <span className="solution__n" aria-hidden="true">
        {s.n}
      </span>
      <DataFlow flow={flow} lang={lang} size="sm" className="solution__flow" />
      <h3 className="solution__title" id={titleId}>
        {s.title[lang]}
      </h3>
      {s.desc.map((d) => (
        <p key={d.en} className="solution__desc">
          {d[lang]}
        </p>
      ))}
      {s.problems && (
        <div className="solution__problems">
          {s.listLabel && <span className="label label--11">{s.listLabel[lang]}</span>}
          <ul>
            {s.problems.map((p) => (
              <li key={p.en}>{p[lang]}</li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
