import type { Bi, Lang } from "@/data/content";
import type { Project } from "@/lib/projects";
import DataFlow from "../diagrams/DataFlow";
import RuleFlow from "../diagrams/RuleFlow";

type Section = NonNullable<NonNullable<Project["caseStudy"]>["context"]>;

// One case-study section: "02 · PROBLEM" + a narrative heading, then whatever
// the section carries — paragraphs, a diagram, a rule chain, a list, decision
// pairs, grouped technologies or a quote — in that order.

export default function CaseStudySection({ id, n, label, section: s, lang }: { id: string; n: number; label: Bi; section: Section; lang: Lang }) {
  const headingId = `${id}-title`;
  return (
    <section id={id} className="case-sec" aria-labelledby={headingId}>
      <h2 className="case-sec__title" id={headingId}>
        {s.title[lang]}
      </h2>

      {s.paragraphs.map((p) => (
        <p key={p.en} className="case-sec__p">
          {p[lang]}
        </p>
      ))}

      {s.flow && (
        <div className="case-sec__visual">
          <DataFlow flow={s.flow} lang={lang} />
        </div>
      )}

      {s.rules && (
        <div className="case-sec__visual">
          <RuleFlow rules={s.rules} lang={lang} />
        </div>
      )}

      {s.list && (
        <ul className="check-list">
          {s.list.map((item) => (
            <li key={item.en}>{item[lang]}</li>
          ))}
        </ul>
      )}

      {s.pairs && (
        <dl className="decisions">
          {s.pairs.map((d) => (
            <div key={d.q.en} className="decision">
              <dt>{d.q[lang]}</dt>
              <dd>{d.a[lang]}</dd>
            </div>
          ))}
        </dl>
      )}

      {s.groups && (
        <dl className="stack-groups">
          {s.groups.map((g) => (
            <div key={g.name.en}>
              <dt className="label label--11">{g.name[lang]}</dt>
              <dd>
                <ul className="pills">
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      )}

      {s.quote && (
        <figure className="pull-quote">
          <blockquote>
            <p>“{s.quote[lang]}”</p>
          </blockquote>
        </figure>
      )}
    </section>
  );
}
