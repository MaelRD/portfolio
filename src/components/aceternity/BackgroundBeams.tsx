import { useRef } from "react";
import { useVisible } from "../kit";

// Aceternity's Background Beams, kept quiet: a handful of faint curves sweep
// from the lower left toward the orrery, and a short light runs along three
// of them now and then. Pure SVG + CSS; it pauses while the hero is off
// screen and stays still under reduced motion.

// Curves in a 1440×900 box, each a little lower than the last.
const PATHS = Array.from({ length: 9 }, (_, i) => {
  const o = i * 46;
  return `M-120 ${780 + o * 0.4} C 280 ${640 + o * 0.6}, 620 ${300 + o}, 1560 ${120 + o * 0.9}`;
});
const LIT = [1, 4, 7];

export default function BackgroundBeams() {
  const ref = useRef<HTMLDivElement>(null);
  useVisible(ref);
  return (
    <div ref={ref} className="beams-bg" aria-hidden="true">
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="beam-light" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#7DE3FF" stopOpacity="0" />
            <stop offset=".5" stopColor="#A78BFA" stopOpacity=".9" />
            <stop offset="1" stopColor="#7DE3FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        {PATHS.map((d) => (
          <path key={d} className="beams-bg__line" d={d} />
        ))}
        {LIT.map((i, k) => (
          <path key={i} className="beams-bg__light" d={PATHS[i]} pathLength={1} style={{ animationDelay: `${k * 2.6}s` }} />
        ))}
      </svg>
    </div>
  );
}
