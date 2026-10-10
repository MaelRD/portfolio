import type { Lang } from "@/data/content";
import { ORGS } from "@/data/space";
import { EXPERIENCE_V2 as T } from "@/data/v2";
import { SectionHeader, TechChip } from "../kit";
import DeveloperFile from "./DeveloperFile";

// Experience as an editorial list (deliberately not another timeline): each
// company a ruled block, its name large on the left, its roles to the right
// with period, one short description and the technologies used there. What
// each role actually involved opens on demand ("What I did"), so the list
// stays scannable for a recruiter and the detail is one tap away.
// Above it, the same story as a source file (DeveloperFile). As you read,
// a rail fills down the left and each company and role lights up in turn
// (milestones; nothing is hidden, only the markers change).

export default function Experience({ lang }: { lang: Lang }) {
  return (
    <section id="experience" className="sec" aria-labelledby="experience-title">
      <div className="wrap stack-40">
        <div className="split xp-top">
          <div className="xp-top__copy">
            <SectionHeader id="experience-title" eyebrow={T.eyebrow[lang]} title={T.title[lang]} intro={T.intro[lang]} />
          </div>
          <DeveloperFile lang={lang} />
        </div>
        <div className="xp" data-scrub="read">
          {ORGS.map((o) => (
            <article key={o.name} className="xp__org" aria-labelledby={`org-${o.name}`} data-reveal="milestone">
              <header className="xp__head">
                <h3 id={`org-${o.name}`}>{o.name}</h3>
                <p className="xp__meta">{o.meta[lang]}</p>
              </header>
              <ol className="xp__roles">
                {o.roles.map((r) => (
                  <li key={r.title.en} className="xp__role" data-reveal="milestone">
                    <p className="xp__period">
                      {r.period[lang]}
                      {r.current && <span className="xp__now">{T.now[lang]}</span>}
                    </p>
                    <h4 className="xp__title">{r.title[lang]}</h4>
                    <p className="xp__desc">{r.context[0][lang]}</p>
                    <details className="xp__did" open={r.current || undefined}>
                      <summary>{T.did[lang]}</summary>
                      <ul>
                        {r.contributions.map((c) => (
                          <li key={c.en}>{c[lang]}</li>
                        ))}
                      </ul>
                    </details>
                    <ul className="xp__tech">
                      {r.stack.map((s) => (
                        <li key={s}>
                          <TechChip name={s} size="sm" />
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
