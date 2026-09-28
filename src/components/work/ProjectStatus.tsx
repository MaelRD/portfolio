import type { Bi, Lang } from "@/data/content";
import { PROJECT_TEXT } from "@/data/space";

/** "STATUS · IN DEVELOPMENT" — stated as it is, never as finished. */
export default function ProjectStatus({ status, lang }: { status: Bi; lang: Lang }) {
  return (
    <span className="status">
      <span className="status__dot" aria-hidden="true" />
      {PROJECT_TEXT.status[lang]} · {status[lang]}
    </span>
  );
}
