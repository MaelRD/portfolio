import { Fragment, useLayoutEffect, useRef, useState, type ElementType } from "react";
import { MOTION, useArmed, useInView } from "./motion";

/**
 * Line-by-line mask reveal ("appear"): each word sits in an overflow-hidden
 * slot and rises into view; words on the same rendered line share a delay,
 * so the text reveals line by line whatever its length or language. Lines
 * are measured after layout and re-measured on resize.
 *
 * Server render / no JS / reduced motion: plain, fully visible text.
 */
export default function RevealText({
  text,
  as: Tag = "span",
  className,
  id,
  delay = 0,
  play,
  lineStagger = MOTION.stagger * 2,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
  /** ms before the first line starts */
  delay?: number;
  /** Controlled start (e.g. the hero sequence); otherwise starts when in view. */
  play?: boolean;
  lineStagger?: number;
}) {
  const armed = useArmed();
  const [viewRef, inView] = useInView<HTMLElement>({ threshold: 0.3 });
  const wrapRef = useRef<HTMLElement | null>(null);
  const [lines, setLines] = useState<number[]>([]);
  const words = text.split(" ");

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el || !armed) return;
    const measure = () => {
      const tops: number[] = [];
      const idx = Array.from(el.querySelectorAll<HTMLElement>("[data-w]")).map((w) => {
        const t = w.offsetTop;
        let i = tops.findIndex((x) => Math.abs(x - t) < 4);
        if (i === -1) {
          tops.push(t);
          i = tops.length - 1;
        }
        return i;
      });
      setLines(idx);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [armed, text]);

  const started = play ?? inView;
  const state = !armed ? "static" : started ? "in" : "out";

  return (
    <Tag
      id={id}
      className={className}
      ref={(node: HTMLElement | null) => {
        wrapRef.current = node;
        (viewRef as { current: HTMLElement | null }).current = node;
      }}
      data-reveal={state}
    >
      {/* Screen readers get the sentence once, not word by word. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {/* The space sits outside each slot: an inline-block would swallow it. */}
        {words.map((w, i) => (
          <Fragment key={i}>
            <span className="rv-slot" data-w="">
              <span className="rv-word" style={{ transitionDelay: `${delay + (lines[i] ?? 0) * lineStagger}ms` }}>
                {w}
              </span>
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
