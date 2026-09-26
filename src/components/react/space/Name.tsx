import { useEffect, useRef, useState } from "react";

// The name as a small planetary system: the letters are lit like the hero
// planet, and the amber ring from the MYG-01 mark orbits them, passing behind
// the first line and in front of the second. A satellite rides the ring.
//
// The ring is drawn twice from the same geometry: once behind the text, and
// once in front of it clipped to its near (lower) half.

const VB_W = 600;
const VB_H = 230;
const CX = VB_W / 2;
const CY = VB_H * 0.5;
const RX = 318;
const RY = 40;
const TILT = -7;
const ORBIT_D = `M ${CX - RX} ${CY} a ${RX} ${RY} 0 1 0 ${RX * 2} 0 a ${RX} ${RY} 0 1 0 ${-RX * 2} 0`;
const ORBIT_S = 14; // seconds per revolution

function useMotionOK() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    try {
      setOk(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    } catch {
      setOk(true);
    }
  }, []);
  return ok;
}

function Satellite() {
  return (
    <circle r="4.2" className="name__sat">
      <animateMotion dur={`${ORBIT_S}s`} repeatCount="indefinite" path={ORBIT_D} begin="1.4s" />
    </circle>
  );
}

export default function Name({ first, last }: { first: string; last: string }) {
  const motion = useMotionOK();
  const ref = useRef<HTMLHeadingElement>(null);

  // Restart the sheen: drop the class, force a style flush, add it back.
  const shine = () => {
    const el = ref.current;
    if (!el) return;
    el.classList.remove("is-shining");
    void el.offsetWidth;
    el.classList.add("is-shining");
  };

  useEffect(() => {
    if (!motion) return;
    const id = window.setTimeout(shine, 1000);
    return () => window.clearTimeout(id);
  }, [motion]);

  return (
    <h1
      ref={ref}
      className="name"
      id="hero-title"
      aria-label={`${first} ${last}`}
      onPointerEnter={(e) => motion && e.pointerType === "mouse" && shine()}
    >
      <svg className="name__orbit name__orbit--back" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="none" aria-hidden="true">
        <g transform={`rotate(${TILT} ${CX} ${CY})`}>
          <path d={ORBIT_D} className="name__ring name__ring--back" pathLength={1} />
          {motion && <Satellite />}
        </g>
      </svg>

      <span className="name__line" aria-hidden="true">
        <span className="name__text">{first}</span>
      </span>
      <span className="name__line" aria-hidden="true">
        <span className="name__text">{last}</span>
      </span>

      <svg className="name__orbit name__orbit--front" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <clipPath id="name-near" clipPathUnits="userSpaceOnUse">
            <rect x={-40} y={CY} width={VB_W + 80} height={VB_H} />
          </clipPath>
        </defs>
        <g transform={`rotate(${TILT} ${CX} ${CY})`} clipPath="url(#name-near)">
          <path d={ORBIT_D} className="name__ring name__ring--front" pathLength={1} />
          {motion && <Satellite />}
        </g>
      </svg>
    </h1>
  );
}
