import type { Lang } from "@/data/content";
import { HEADS, SOLUTIONS } from "@/data/space";
import { Head } from "../react/space/ui";
import SolutionCard from "./SolutionCard";

export default function SolutionsGrid({ lang }: { lang: Lang }) {
  return (
    <section id="solutions" className="sec" aria-labelledby="solutions-title">
      <div className="wrap stack-40">
        <Head head={HEADS.solutions} lang={lang} id="solutions-title" />
        <ul className="solutions">
          {SOLUTIONS.map((s) => (
            <li key={s.n}>
              <SolutionCard s={s} lang={lang} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
