import type { Lang } from "@/data/content";
import { SOLUTION_TEXT, type SOLUTIONS } from "@/data/space";
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
      <p className="solution__desc">{s.desc[lang]}</p>
      <div className="solution__problems">
        <span className="label label--11">{SOLUTION_TEXT.problems[lang]}</span>
        <ul>
          {s.problems.map((p) => (
            <li key={p.en}>{p[lang]}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
