import type { Lang } from "@/data/content";
import { STEPS_FORM } from "@/data/start";

export default function FormSummary({ rows, lang }: { rows: { key: keyof typeof STEPS_FORM.review.fields; value: string }[]; lang: Lang }) {
  const F = STEPS_FORM.review;
  return (
    <dl className="summary">
      {rows.map((r) => (
        <div key={r.key} data-wide={r.key === "problem" ? "" : undefined}>
          <dt className="label label--11">{F.fields[r.key][lang]}</dt>
          <dd>{r.value || F.empty[lang]}</dd>
        </div>
      ))}
    </dl>
  );
}
