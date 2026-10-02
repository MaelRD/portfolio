import type { Lang } from "@/data/content";
import type { INTENTS } from "@/data/space";

// The whole card is clickable through its call to action (a stretched link),
// so the heading and text stay plain content for assistive technology.

export default function IntentCard({ intent, lang }: { intent: (typeof INTENTS)[number]; lang: Lang }) {
  const titleId = `intent-${intent.key}`;
  return (
    <article className="spotlight panel intent" data-intent={intent.key} aria-labelledby={titleId}>
      <p className="intent__label">{intent.label[lang]}</p>
      <h3 className="intent__title" id={titleId}>
        {intent.title[lang]}
      </h3>
      <p className="intent__text">{intent.text[lang]}</p>
      <a href={intent.href} className="intent__cta stretch">
        {intent.cta[lang]} <span aria-hidden="true">→</span>
      </a>
    </article>
  );
}
