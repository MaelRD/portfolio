import type { Lang } from "@/data/content";
import { ORGS } from "@/data/space";
import { EXPERIENCE_V2 as T } from "@/data/v2";
import { SectionHeader, TechChip } from "../kit";

// Experience as an editorial list (deliberately not another timeline): each
// company a ruled block, its name large on the left, its roles to the right
// with period, one short description and the technologies used there.

export default function Experience({ lang }: { lang: Lang }) {
  return (
    <section id="experience" className="sec" aria-labelledby="experience-title">
      <div className="wrap stack-40">
        <SectionHeader id="experience-title" title={T.title[lang]} intro={T.intro[lang]} />
        <div className="xp">
          {ORGS.map((o) => (
            <article key={o.name} className="xp__org" aria-labelledby={`org-${o.name}`}>
              <header className="xp__head">
                <h3 id={`org-${o.name}`}>{o.name}</h3>
                <p className="xp__meta">{o.meta[lang]}</p>
              </header>
              <ol className="xp__roles">
                {o.roles.map((r) => (
                  <li key={r.title.en} className="xp__role">
                    <p className="xp__period">
                      {r.period[lang]}
                      {r.current && <span className="xp__now">{T.now[lang]}</span>}
                    </p>
                    <h4 className="xp__title">{r.title[lang]}</h4>
                    <p className="xp__desc">{r.context[0][lang]}</p>
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
