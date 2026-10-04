import { ArrowUpRight, Blocks, Globe2, Workflow, Cable } from "lucide-react";
import type { Lang } from "@/data/content";
import { SERVICES, SERVICES_TEXT as T } from "@/data/v2";
import { SectionHeader } from "../kit";
import { PREFILL_EVENT } from "./ProjectConfigurator";

const ICONS = { business: Blocks, web: Globe2, automation: Workflow, integrations: Cable };
const NEEDS = { business: 1, web: 2, automation: 0, integrations: 3 };

export default function ServicesBento({ lang }: { lang: Lang }) {
  return (
    <section id="solutions" className="sec service-options" aria-labelledby="solutions-title">
      <div className="wrap stack-40">
        <SectionHeader id="solutions-title" title={T.title[lang]} intro={T.intro[lang]} />
        <ul className="service-options__list">
          {SERVICES.map((s) => {
            const Icon = ICONS[s.key];
            return (
              <li key={s.key} className="service-option">
                <div className="service-option__icon"><Icon size={26} strokeWidth={1.5} aria-hidden="true" /></div>
                <div className="service-option__body">
                  <h3>{s.title[lang]}</h3>
                  <p>{s.text[lang]}</p>
                  <ul className="service-option__examples">
                    {s.items.slice(0, 4).map((item) => <li key={item.en}>{item[lang]}</li>)}
                  </ul>
                  <a className="service-option__link" href="#contact" onClick={() => {
                    window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail: { need: NEEDS[s.key], message: "" } }));
                  }}>
                    {lang === "es" ? "Hablemos de esta solución" : "Let's discuss this solution"}
                    <ArrowUpRight size={17} aria-hidden="true" />
                    <span className="sr-only">: {s.title[lang]}</span>
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
