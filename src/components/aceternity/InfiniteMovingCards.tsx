import { useRef, useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import { useVisible } from "../kit";

// Aceternity's Infinite Moving Cards, as a slow marquee of any items. The
// list is rendered twice (the copy aria-hidden) so the loop has no seam.
// It pauses on hover, on keyboard focus, off screen, with the pause button
// (WCAG 2.2.2) and under reduced motion; on touch screens it doesn't move at
// all and becomes a swipeable row instead (CSS).

export default function InfiniteMovingCards({
  items,
  label,
  speed = 60,
  pauseLabel,
  playLabel,
  className = "",
}: {
  items: { key: string; node: ReactNode }[];
  label: string;
  /** Seconds for one full loop. */
  speed?: number;
  pauseLabel: string;
  playLabel: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  useVisible(ref, "100px");
  return (
    <div ref={ref} className={`imc ${className}`} data-paused={paused ? "" : undefined} style={{ ["--imc-duration" as string]: `${speed}s` }}>
      <div className="imc__viewport" role="region" aria-label={label} tabIndex={0}>
        <ul className="imc__track">
          {items.map((it) => (
            <li key={it.key} className="imc__item">
              {it.node}
            </li>
          ))}
          {items.map((it) => (
            <li key={`${it.key}-copy`} className="imc__item imc__item--copy" aria-hidden="true">
              {it.node}
            </li>
          ))}
        </ul>
      </div>
      <button type="button" className="imc__toggle" onClick={() => setPaused((p) => !p)} aria-pressed={paused} aria-label={paused ? playLabel : pauseLabel}>
        {paused ? <Play size={14} aria-hidden /> : <Pause size={14} aria-hidden />}
      </button>
    </div>
  );
}
