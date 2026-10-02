import type { Lang } from "@/data/content";
import { STEPS_FORM } from "@/data/start";

type Key = keyof typeof STEPS_FORM.review.fields;
const WIDE: Key[] = ["pain", "current", "contact"];

export default function FormSummary({ rows, lang }: { rows: { key: Key; value: string }[]; lang: Lang }) {
  const F = STEPS_FORM.review;
  return (
    <dl className="summary">
      {rows.map((r) => (
        <div key={r.key} data-wide={WIDE.includes(r.key) ? "" : undefined}>
          <dt className="label label--11">{F.fields[r.key][lang]}</dt>
          <dd>{r.value || F.empty[lang]}</dd>
        </div>
      ))}
    </dl>
  );
}
