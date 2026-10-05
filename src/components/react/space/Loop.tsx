import TextLoop from "../../reactbits/TextLoop/TextLoop";
import { LOOP_TEXT, type Lang } from "../../../data/space";

// The site's thesis on a ribbon across the hero's top-right corner (React Bits
// TextLoop on a straight path, turned 45°). The square frame clips the ribbon's
// ends so it reads as a corner banner; it passes under the glass nav pills.
// Pauses under the pointer; holds still for reduced motion (the component).

// The loop fits a whole number of phrases along its path and stretches or
// squeezes letter spacing to close the gap. The phrase measures ~721 units in
// Geist 800 at 44px in Spanish and ~683 in English (separator included), so a
// straight path of 2106 holds three of either with the adjustment under 3%.
// Centered on the loop's 1200 × 520 viewBox (y = 260); the frame hides the
// overhang. Changing LOOP_TEXT or the display font means re-measuring this path.
const PATH = "M -453 260 L 1653 260";

export default function CornerLoop({ lang }: { lang: Lang }) {
  return (
    <div className="corner-loop" aria-hidden="true">
      {/* Ribbon paint, referenced by the loop's path as url(#loop-ribbon). In
          user-space units (the loop's 1200-wide viewBox): a bounding-box
          gradient paints nothing on a straight line, whose box has no height. */}
      <svg width="0" height="0" focusable="false" style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="loop-ribbon" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1200" y2="0">
            <stop offset="0%" stopColor="#4C2FD6" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#C026D3" />
          </linearGradient>
        </defs>
      </svg>
      <TextLoop
        key={lang}
        text={LOOP_TEXT[lang]}
        path={PATH}
        speed={70}
        fontSize={44}
        fontWeight={800}
        letterSpacing={1}
        color="#F4F1FF"
        ribbonColor="url(#loop-ribbon)"
        ribbonWidth={78}
        className="corner-loop__band"
      />
    </div>
  );
}
