import type { Bi, Lang } from "@/data/content";
import { useEntrance } from "@/lib/motion";

// Two states of the same process side by side: the scattered "before" and the
// consolidated "after", joined by the transition between them — optionally
// through the questions that shaped it. Stacks vertically on narrow screens.

export default function BeforeAfterFlow({
  before,
  approach,
  after,
  lang,
}: {
  before: { label: Bi; items: Bi[] };
  approach?: { label: Bi; intro?: Bi; items: Bi[] };
  after: { label: Bi; title?: string; items: Bi[] };
  lang: Lang;
}) {
  const [ref, state] = useEntrance<HTMLDivElement>();
  return (
    <div ref={ref} className="ba" data-state={state} data-steps={approach ? 3 : 2}>
      <section className="ba__side ba__side--before" aria-label={before.label[lang]}>
        <p className="ba__label">{before.label[lang]}</p>
        <ul className="ba__list">
          {before.items.map((it) => (
            <li key={it.en}>{it[lang]}</li>
          ))}
        </ul>
      </section>
      <span className="ba__link" aria-hidden="true" />
      {approach && (
        <>
          <section className="ba__side ba__side--approach" aria-label={approach.label[lang]}>
            <p className="ba__label">{approach.label[lang]}</p>
            {approach.intro && <p className="ba__intro">{approach.intro[lang]}</p>}
            <ul className="ba__list">
              {approach.items.map((it) => (
                <li key={it.en}>{it[lang]}</li>
              ))}
            </ul>
          </section>
          <span className="ba__link" aria-hidden="true" />
        </>
      )}
      <section className="ba__side ba__side--after" aria-label={after.label[lang]}>
        <p className="ba__label">{after.label[lang]}</p>
        {after.title && <p className="ba__title">{after.title}</p>}
        <ul className="ba__list">
          {after.items.map((it) => (
            <li key={it.en}>{it[lang]}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
