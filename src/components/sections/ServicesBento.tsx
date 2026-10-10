import { ArrowUpRight, Bot, Cable, ChartColumn, Globe2, Network } from "lucide-react";
import type { Lang } from "@/data/content";
import { SERVICES, SERVICES_TEXT as T } from "@/data/v2";
import { SectionHeader, TechChip, TiltCard } from "../kit";
import { PREFILL_EVENT } from "@/lib/prefill";

// What I can build: capabilities, not a wall of logos. Each one leads with
// what it solves for the business and a few examples; the technologies sit
// underneath as the second level, and a published demo is linked only where
// one actually shows it. "Let's talk" pre-selects the matching need in the
// contact form.

const ICONS = { web: Globe2, backend: Cable, erp: Network, tools: ChartColumn, ai: Bot };

export default function ServicesBento({ lang }: { lang: Lang }) {
  return (
    <section id="solutions" className="sec service-options" aria-labelledby="solutions-title">
      {/* Old anchors of the retired "examples" and "before/after" sections land here. */}
      <span id="build" className="anchor-alias" aria-hidden="true" />
      <span id="before-after" className="anchor-alias" aria-hidden="true" />
      <div className="wrap stack-40">
        <SectionHeader id="solutions-title" eyebrow={T.eyebrow[lang]} title={T.title[lang]} intro={T.intro[lang]} />
        <ul className="service-options__list" data-reveal="stagger">
          {SERVICES.map((s) => {
            const Icon = ICONS[s.key];
            return (
              <TiltCard key={s.key} as="li" className="service-option spotlight" max={6}>
                <div className="service-option__icon"><Icon size={26} strokeWidth={1.5} aria-hidden="true" /></div>
                <div className="service-option__body">
                  <p className="service-option__kicker">{s.kicker[lang]}</p>
                  <h3>{s.title[lang]}</h3>
                  <p>{s.text[lang]}</p>
                  <ul className="service-option__examples" aria-label={T.examples[lang]}>
                    {s.items.map((item) => <li key={item.en}>{item[lang]}</li>)}
                  </ul>
                  <div className="service-option__tech">
                    <p className="label label--11">{T.tech[lang]}</p>
                    <ul>
                      {s.tech.map((t) => (
                        <li key={t}>
                          <TechChip name={t} size="sm" />
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="service-option__links">
                    {s.demo && (
                      <a className="service-option__link" href={s.demo.href} target="_blank" rel="noopener noreferrer" data-track="View Project" data-track-label={`solutions-${s.key}`}>
                        {T.demo[lang]}: {s.demo.name}
                        <ArrowUpRight size={17} aria-hidden="true" />
                      </a>
                    )}
                    <a
                      className="service-option__link service-option__link--quiet"
                      href="#contact"
                      onClick={() => {
                        window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail: { need: s.need, message: "" } }));
                      }}
                    >
                      {T.cta[lang]}
                      <span aria-hidden="true">→</span>
                      <span className="sr-only">: {s.title[lang]}</span>
                    </a>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
