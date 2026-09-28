import type { Bi, Lang } from "@/data/content";
import { useEntrance } from "@/lib/motion";

// Two states of the same process side by side: the scattered "before" and the
// consolidated "after", joined by the transition between them. Stacks
// vertically on narrow screens.

export default function BeforeAfterFlow({
  before,
  after,
  lang,
}: {
  before: { label: Bi; items: Bi[] };
  after: { label: Bi; title?: string; items: Bi[] };
  lang: Lang;
}) {
  const [ref, state] = useEntrance<HTMLDivElement>();
  return (
    <div ref={ref} className="ba" data-state={state}>
      <section className="ba__side ba__side--before" aria-label={before.label[lang]}>
        <p className="ba__label">{before.label[lang]}</p>
        <ul className="ba__list">
          {before.items.map((it) => (
            <li key={it.en}>{it[lang]}</li>
          ))}
        </ul>
      </section>
      <span className="ba__link" aria-hidden="true" />
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
