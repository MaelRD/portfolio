import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import type { Lang } from "@/data/content";
import { AREAS, CONFIG_TEXT as T, PAINS, TOOLS, type Area, type PainKey, type ToolKey } from "@/data/v2";
import { SectionHeader } from "../kit";

// "Tell me how you work": two multi-choice questions, answered in the
// browser only. Each tool and pain points toward one or two areas; the two
// strongest are suggested. The call to action carries the answers into the
// contact form (PREFILL_EVENT) so nobody has to type them again.

export const PREFILL_EVENT = "mael:prefill";
export type Prefill = { need: number; message: string };

const FROM_TOOL: Record<ToolKey, Area[]> = {
  excel: ["internal"],
  sheets: ["internal"],
  whatsapp: ["automation"],
  erp: ["integration"],
  software: ["integration"],
  manual: ["internal", "automation"],
};
const FROM_PAIN: Record<PainKey, Area[]> = {
  time: ["automation"],
  duplicate: ["integration", "internal"],
  errors: ["internal"],
  followup: ["automation"],
  metrics: ["dashboard"],
  automate: ["automation"],
  new: ["web", "internal"],
};
const ORDER: Area[] = ["automation", "internal", "integration", "dashboard", "web"];

/** The two areas most answers point to (pains weigh double: they're the reason to call). */
export function suggest(tools: ToolKey[], pains: PainKey[]): Area[] {
  const score = new Map<Area, number>();
  for (const t of tools) for (const a of FROM_TOOL[t]) score.set(a, (score.get(a) ?? 0) + 1);
  for (const p of pains) for (const a of FROM_PAIN[p]) score.set(a, (score.get(a) ?? 0) + 2);
  return [...score.entries()].sort((x, y) => y[1] - x[1] || ORDER.indexOf(x[0]) - ORDER.indexOf(y[0])).slice(0, 2).map(([a]) => a);
}

function Choices<K extends string>({ legend, hint, options, picked, toggle, lang }: { legend: string; hint: string; options: { key: K; label: { es: string; en: string } }[]; picked: K[]; toggle: (k: K) => void; lang: Lang }) {
  return (
    <fieldset className="cfg__group">
      <legend className="cfg__q">
        {legend} <span className="cfg__hint">{hint}</span>
      </legend>
      <div className="cfg__options">
        {options.map((o) => {
          const on = picked.includes(o.key);
          return (
            <button key={o.key} type="button" className="cfg__opt" aria-pressed={on} onClick={() => toggle(o.key)}>
              <span className="cfg__check" aria-hidden="true">
                {on && <Check size={13} strokeWidth={2.4} />}
              </span>
              {o.label[lang]}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function ProjectConfigurator({ lang }: { lang: Lang }) {
  const [tools, setTools] = useState<ToolKey[]>([]);
  const [pains, setPains] = useState<PainKey[]>([]);
  const flip = <K,>(list: K[], k: K) => (list.includes(k) ? list.filter((x) => x !== k) : [...list, k]);
  const areas = useMemo(() => (tools.length && pains.length ? suggest(tools, pains) : []), [tools, pains]);

  const send = () => {
    const line = (label: string, items: string[]) => `${label} ${items.join(", ")}`;
    const message = [
      line(T.q1[lang], tools.map((k) => TOOLS.find((t) => t.key === k)!.label[lang])),
      line(T.q2[lang], pains.map((k) => PAINS.find((p) => p.key === k)!.label[lang])),
      line(T.result[lang], areas.map((a) => AREAS[a].name[lang])),
      "",
    ].join("\n");
    // Need option 0 is "improve or automate a process"; 1 is "an internal system".
    const need = areas[0] === "internal" || areas[0] === "web" || areas[0] === "dashboard" ? 1 : areas[0] === "integration" ? 3 : 0;
    window.dispatchEvent(new CustomEvent<Prefill>(PREFILL_EVENT, { detail: { need, message } }));
  };

  return (
    <section id="configurator" className="sec" aria-labelledby="cfg-title">
      <div className="wrap stack-40">
        <SectionHeader id="cfg-title" title={T.title[lang]} intro={T.intro[lang]} />
        <div className="cfg">
          <div className="cfg__questions">
            <Choices legend={T.q1[lang]} hint={T.multi[lang]} options={TOOLS} picked={tools} toggle={(k) => setTools((l) => flip(l, k))} lang={lang} />
            <Choices legend={T.q2[lang]} hint={T.multi[lang]} options={PAINS} picked={pains} toggle={(k) => setPains((l) => flip(l, k))} lang={lang} />
          </div>
          <div className="cfg__result" aria-live="polite">
            {areas.length ? (
              <>
                <p className="cfg__lead">{T.result[lang]}</p>
                <ul className="cfg__areas">
                  {areas.map((a, i) => (
                    <li key={a}>
                      {i > 0 && (
                        <span className="cfg__plus" aria-hidden="true">
                          +
                        </span>
                      )}
                      <strong>{AREAS[a].name[lang]}</strong>
                      <span>{AREAS[a].why[lang]}</span>
                    </li>
                  ))}
                </ul>
                <div className="cfg__actions">
                  <a href="#contact" className="btn btn--solid" onClick={send} data-track="Configurator" data-track-label={areas.join("+")}>
                    {T.cta[lang]} <span aria-hidden="true">→</span>
                  </a>
                  <button
                    type="button"
                    className="cfg__reset"
                    onClick={() => {
                      setTools([]);
                      setPains([]);
                    }}
                  >
                    {T.reset[lang]}
                  </button>
                </div>
              </>
            ) : (
              <p className="cfg__empty">{T.empty[lang]}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
