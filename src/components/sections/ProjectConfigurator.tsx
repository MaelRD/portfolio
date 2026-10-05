import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { AppWindow, ChartColumn, Check, Clock, Copy, FileSpreadsheet, Network, PenLine, Sparkles, TriangleAlert, UserX, Zap } from "lucide-react";
import { siGooglesheets, siWhatsapp, type SimpleIcon } from "simple-icons";
import type { Lang } from "@/data/content";
import { AREAS, CONFIG_TEXT as T, PAINS, TOOLS, type Area, type PainKey, type ToolKey } from "@/data/v2";
import { SectionHeader } from "../kit";

// "Tell me how you work": two numbered questions answered in the browser
// only, and beside them the visitor's own process drawn as a small system —
// today's tools, the problem, and the proposal — that fills in as they
// choose (dashed outlines stand for what's still missing). Each tool and pain
// points toward one or two areas; the two strongest are proposed, with a few
// systems they'd lead to. The call to action carries the answers into the
// contact form (PREFILL_EVENT) so nobody types them twice.

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

/** Brand marks where the tool has one, line icons otherwise. */
const Brand = ({ icon }: { icon: SimpleIcon }) => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill={`#${icon.hex}`} aria-hidden="true">
    <path d={icon.path} />
  </svg>
);
const TOOL_ICON: Record<ToolKey, ReactNode> = {
  excel: <FileSpreadsheet size={18} strokeWidth={1.6} aria-hidden />,
  whatsapp: <Brand icon={siWhatsapp} />,
  sheets: <Brand icon={siGooglesheets} />,
  erp: <Network size={18} strokeWidth={1.6} aria-hidden />,
  software: <AppWindow size={18} strokeWidth={1.6} aria-hidden />,
  manual: <PenLine size={18} strokeWidth={1.6} aria-hidden />,
};
const PAIN_ICON: Record<PainKey, ReactNode> = {
  time: <Clock size={18} strokeWidth={1.6} aria-hidden />,
  duplicate: <Copy size={18} strokeWidth={1.6} aria-hidden />,
  errors: <TriangleAlert size={18} strokeWidth={1.6} aria-hidden />,
  followup: <UserX size={18} strokeWidth={1.6} aria-hidden />,
  metrics: <ChartColumn size={18} strokeWidth={1.6} aria-hidden />,
  automate: <Zap size={18} strokeWidth={1.6} aria-hidden />,
  new: <Sparkles size={18} strokeWidth={1.6} aria-hidden />,
};

function Step<K extends string>({
  n,
  kicker,
  question,
  options,
  icons,
  picked,
  toggle,
  lang,
}: {
  n: string;
  kicker: string;
  question: string;
  options: { key: K; label: { es: string; en: string } }[];
  icons: Record<K, ReactNode>;
  picked: K[];
  toggle: (k: K) => void;
  lang: Lang;
}) {
  const done = picked.length > 0;
  return (
    <fieldset className="cfg__group" data-done={done ? "" : undefined}>
      <legend className="cfg__legend">
        <span className="cfg__n" aria-hidden="true">
          {done ? <Check size={14} strokeWidth={2.4} /> : n}
        </span>
        <span className="cfg__kicker">{kicker}</span>
        <span className="cfg__q">{question}</span>
        <span className="cfg__hint">{done ? T.picked(picked.length)[lang] : T.multi[lang]}</span>
      </legend>
      <div className="cfg__options">
        {options.map((o) => {
          const on = picked.includes(o.key);
          return (
            <button key={o.key} type="button" className="cfg__opt" aria-pressed={on} onClick={() => toggle(o.key)}>
              <span className="cfg__icon">{icons[o.key]}</span>
              <span className="cfg__label">{o.label[lang]}</span>
              <span className="cfg__check" aria-hidden="true">
                {on && <Check size={12} strokeWidth={2.6} />}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

/** One level of the diagram: a label, then its nodes or a dashed placeholder. */
function Level({ kicker, tone, items, missing, k }: { kicker: string; tone: "today" | "pain" | "plan"; items: ReactNode[]; missing: string; k: number }) {
  return (
    <div className={`cfgd__level cfgd__level--${tone}`} data-empty={items.length ? undefined : ""} style={{ ["--k" as string]: k } as CSSProperties}>
      <p className="cfgd__kicker">{kicker}</p>
      {items.length ? <ul className="cfgd__nodes">{items}</ul> : <p className="cfgd__ghost">{missing}</p>}
    </div>
  );
}

export default function ProjectConfigurator({ lang }: { lang: Lang }) {
  const [tools, setTools] = useState<ToolKey[]>([]);
  const [pains, setPains] = useState<PainKey[]>([]);
  const flip = <K,>(list: K[], k: K) => (list.includes(k) ? list.filter((x) => x !== k) : [...list, k]);
  const areas = useMemo(() => (tools.length && pains.length ? suggest(tools, pains) : []), [tools, pains]);
  const label = <K extends string>(list: { key: K; label: { es: string; en: string } }[], k: K) => list.find((x) => x.key === k)!.label[lang];

  const send = () => {
    const line = (q: string, items: string[]) => `${q} ${items.join(", ")}`;
    const message = [
      line(T.q1[lang], tools.map((k) => label(TOOLS, k))),
      line(T.q2[lang], pains.map((k) => label(PAINS, k))),
      line(T.result[lang], areas.map((a) => AREAS[a].name[lang])),
      "",
    ].join("\n");
    // Contact form needs: 0 improve/automate a process · 1 internal system · 3 integrate tools.
    const need = areas[0] === "internal" || areas[0] === "web" || areas[0] === "dashboard" ? 1 : areas[0] === "integration" ? 3 : 0;
    window.dispatchEvent(new CustomEvent<Prefill>(PREFILL_EVENT, { detail: { need, message } }));
  };

  const reset = () => {
    setTools([]);
    setPains([]);
  };

  const ready = areas.length > 0;
  const builds = [...new Set(areas.flatMap((a) => AREAS[a].builds.map((b) => b[lang])))].slice(0, 5);

  return (
    <section id="configurator" className="sec" aria-labelledby="cfg-title">
      <div className="wrap stack-40">
        <SectionHeader id="cfg-title" title={T.title[lang]} intro={T.intro[lang]} />
        <div className="cfg">
          <div className="cfg__questions">
            <Step n="01" kicker={T.step1[lang]} question={T.q1[lang]} options={TOOLS} icons={TOOL_ICON} picked={tools} toggle={(k) => setTools((l) => flip(l, k))} lang={lang} />
            <Step n="02" kicker={T.step2[lang]} question={T.q2[lang]} options={PAINS} icons={PAIN_ICON} picked={pains} toggle={(k) => setPains((l) => flip(l, k))} lang={lang} />
            {/* Narrow screens: the diagram sits below every option, so point to it once it has an answer. */}
            {ready && (
              <a href="#cfg-result" className="cfg__jump">
                {T.jump[lang]} <span aria-hidden="true">↓</span>
              </a>
            )}
          </div>

          <div id="cfg-result" className="cfgd" data-ready={ready ? "" : undefined} aria-live="polite">
            <p className="sr-only">{T.diagram[lang]}</p>
            <Level
              k={0}
              tone="today"
              kicker={T.step1[lang]}
              missing={T.missing1[lang]}
              items={tools.map((k) => (
                <li key={k} className="cfgd__node">
                  {TOOL_ICON[k]}
                  {label(TOOLS, k)}
                </li>
              ))}
            />
            <span className="cfgd__wire" aria-hidden="true" data-on={tools.length ? "" : undefined} />
            <Level
              k={1}
              tone="pain"
              kicker={T.step2[lang]}
              missing={T.missing2[lang]}
              items={pains.map((k) => (
                <li key={k} className="cfgd__node">
                  {PAIN_ICON[k]}
                  {label(PAINS, k)}
                </li>
              ))}
            />
            <span className="cfgd__wire" aria-hidden="true" data-on={ready ? "" : undefined} />
            <div className="cfgd__plan" data-empty={ready ? undefined : ""}>
              <p className="cfgd__kicker">{T.step3[lang]}</p>
              {ready ? (
                <>
                  <p className="cfgd__lead">{T.result[lang]}</p>
                  <ul className="cfgd__areas">
                    {areas.map((a, i) => (
                      <li key={a} style={{ ["--k" as string]: i } as CSSProperties}>
                        <strong>{AREAS[a].name[lang]}</strong>
                        <span>{AREAS[a].why[lang]}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="cfgd__builds">
                    <p className="label label--11">{T.build[lang]}</p>
                    <ul>
                      {builds.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="cfgd__actions">
                    <a href="#contact" className="btn btn--solid" onClick={send} data-track="Configurator" data-track-label={areas.join("+")}>
                      {T.cta[lang]} <span aria-hidden="true">→</span>
                    </a>
                    <button type="button" className="cfg__reset" onClick={reset}>
                      {T.reset[lang]}
                    </button>
                  </div>
                </>
              ) : (
                <p className="cfgd__ghost">{T.waiting[lang]}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
