import type { Lang } from "@/data/content";
import { HEADS, INTENTS } from "@/data/space";
import { Head } from "../react/space/ui";
import IntentCard from "./IntentCard";

export default function IntentSelector({ lang }: { lang: Lang }) {
  return (
    <section id="intent" className="sec sec--tight" aria-labelledby="intent-title">
      <div className="wrap stack-40">
        <Head head={HEADS.intent} lang={lang} id="intent-title" />
        <ul className="intents">
          {INTENTS.map((intent) => (
            <li key={intent.key}>
              <IntentCard intent={intent} lang={lang} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
