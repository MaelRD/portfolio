import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type RefObject } from "react";
import { scrollPageTo, useScrollFrame } from "@/lib/motion";
import { HEADS, MACRO, STEP_TEXT, STEPS, type Lang } from "../../../data/space";
import { Head } from "./ui";
import SpaceRoute, { PTS } from "./SpaceRoute";

const pad = (n: number) => String(n).padStart(2, "0");

/** The four stages, in order, each with the first phase it starts at. */
const STAGES = (Object.keys(MACRO) as (keyof typeof MACRO)[]).map((key) => {
  const phases = STEPS.flatMap((s, i) => (s.macro === key ? [i] : []));
  return { key, first: phases[0], last: phases[phases.length - 1] };
});

/**
 * Scroll storytelling, desktop only: the trajectory and its panel stay pinned
 * while the page scrolls through one stretch per phase, and the phase follows
 * the scroll. It switches itself on only with room for it (wide and tall
 * enough for the whole pinned block) and with motion allowed; otherwise the
 * section is the original click-through trajectory in normal flow. Choosing a
 * phase in story mode scrolls to that phase's stretch, so scroll and selection
 * never disagree.
 */
function useStory(storyRef: RefObject<HTMLDivElement>, pinRef: RefObject<HTMLDivElement>, sel: number, setSel: (i: number) => void) {
  const [on, setOn] = useState(false);
  const live = useRef(false);
  live.current = on;

  useEffect(() => {
    const story = storyRef.current;
    const pin = pinRef.current;
    if (!story || !pin) return;
    let mq: MediaQueryList | null = null;
    try {
      mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    } catch {
      return;
    }
    const check = () => {
      const top = parseFloat(getComputedStyle(pin).top) || 0;
      const h = pin.offsetHeight;
      story.style.setProperty("--pin-h", `${h}px`);
      setOn(!!mq?.matches && h + top + 24 <= window.innerHeight);
    };
    check();
    mq.addEventListener("change", check);
    window.addEventListener("resize", check);
    const ro = "ResizeObserver" in window ? new ResizeObserver(check) : null;
    ro?.observe(pin);
    return () => {
      mq?.removeEventListener("change", check);
      window.removeEventListener("resize", check);
      ro?.disconnect();
    };
  }, [storyRef, pinRef]);

  const sel_ = useRef(sel);
  sel_.current = sel;
  useScrollFrame(storyRef, (rect) => {
    const story = storyRef.current;
    const pin = pinRef.current;
    if (!live.current || !story || !pin) return;
    const top = parseFloat(getComputedStyle(pin).top) || 0;
    const travel = Math.max(1, story.offsetHeight - pin.offsetHeight);
    const p = Math.min(1, Math.max(0, (top - rect.top) / travel));
    story.style.setProperty("--story-p", p.toFixed(4));
    const i = Math.min(STEPS.length - 1, Math.floor(p * STEPS.length));
    if (i !== sel_.current) setSel(i);
  });

  const goTo = useCallback(
    (i: number) => {
      const story = storyRef.current;
      const pin = pinRef.current;
      if (!live.current || !story || !pin) return setSel(i);
      const top = parseFloat(getComputedStyle(pin).top) || 0;
      const travel = Math.max(1, story.offsetHeight - pin.offsetHeight);
      const storyTop = story.getBoundingClientRect().top + window.scrollY;
      setSel(i);
      scrollPageTo(storyTop - top + ((i + 0.5) / STEPS.length) * travel);
    },
    [storyRef, pinRef, setSel],
  );

  return [on, goTo] as const;
}

export default function Process({ lang }: { lang: Lang }) {
  const [sel, setSel] = useState(0);
  const step = STEPS[sel];
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const storyRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [story, goTo] = useStory(storyRef, pinRef, sel, setSel);
  const stage = STAGES.findIndex((st) => sel >= st.first && sel <= st.last);

  // Arrow keys move along the trajectory, like a set of tabs.
  const onKey = (e: KeyboardEvent, i: number) => {
    const next = e.key === "ArrowRight" || e.key === "ArrowDown" ? i + 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? i - 1 : e.key === "Home" ? 0 : e.key === "End" ? STEPS.length - 1 : null;
    if (next === null || next < 0 || next >= STEPS.length) return;
    e.preventDefault();
    goTo(next);
    buttons.current[next]?.focus({ preventScroll: true });
  };

  return (
    <section id="process" className="sec" aria-labelledby="process-title">
      <div className="wrap stack-40">
        <Head head={HEADS.process} lang={lang} id="process-title" />

        <div ref={storyRef} className="story" data-on={story ? "" : undefined}>
          <div ref={pinRef} className="story__pin">
            <div className="stages" style={{ ["--sel-p" as string]: (sel + 1) / STEPS.length } as CSSProperties}>
              <ol aria-label={STEP_TEXT.stages[lang]}>
                {STAGES.map((st, k) => (
                  <li key={st.key}>
                    <button type="button" className="stage" aria-current={k === stage ? "step" : undefined} data-done={k < stage ? "" : undefined} onClick={() => goTo(st.first)}>
                      {MACRO[st.key][lang]}
                    </button>
                  </li>
                ))}
              </ol>
              <span className="stages__bar" aria-hidden="true" />
            </div>

            <SpaceRoute lang={lang} sel={sel} onSelect={goTo} onKey={onKey} buttons={buttons} />

            <div id="phase" data-reveal="up" className="spotlight panel phase" style={{ ["--px" as string]: `${PTS[sel][0] / 12}%` } as CSSProperties}>
              <div className="phase__main swap" key={`m${sel}`}>
                <p className="phase__stage">
                  <span className="sr-only">{STEP_TEXT.stage[lang]}: </span>
                  {MACRO[step.macro][lang]}
                </p>
                <div className="phase__title">
                  <span className="phase__n" aria-hidden="true">
                    {pad(sel + 1)}
                  </span>
                  <h3 className="phase__name">{step.name[lang]}</h3>
                </div>
                <p className="phase__desc">{step.desc[lang]}</p>
                <div className="phase__deliv">
                  <p className="label label--11">{STEP_TEXT.deliverables[lang]}</p>
                  <ul>
                    {step.deliverables.map((d) => (
                      <li key={d.en}>{d[lang]}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="phase__side swap" key={`s${sel}`}>
                <p className="label label--11 phase__side-label">{STEP_TEXT.topics[lang]}</p>
                <ul className="tags">
                  {step.tags.map((t) => (
                    <li key={t.en}>{t[lang]}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
