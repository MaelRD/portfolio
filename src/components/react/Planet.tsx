// A small planet system: the ring is split so its back half passes behind
// the planet and its front half in front, and a moon rides that same ring —
// dipping behind the planet on the far side of its orbit (see
// `planet-moon-depth` in global.css). Purely decorative.

function Ring({ half, w, h, tilt, color }: { half: "back" | "front"; w: number; h: number; tilt: number; color: string }) {
  const rx = w / 2;
  const ry = h / 2;
  // Back half = top arc (drawn under the planet), front half = bottom arc.
  const d = `M 0 ${ry} A ${rx} ${ry} 0 0 ${half === "back" ? 1 : 0} ${w} ${ry}`;
  return (
    <svg
      width={w}
      height={h}
      viewBox={`-1 -1 ${w + 2} ${h + 2}`}
      style={{ position: "absolute", overflow: "visible", transform: `rotate(${tilt}deg)`, zIndex: half === "back" ? 1 : 3 }}
    >
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={half === "front" ? 1.3 : 1}
        strokeOpacity={half === "front" ? 1 : 0.55}
        style={{ transition: "stroke .3s ease" }}
      />
    </svg>
  );
}

export default function Planet({
  accent,
  size = 44,
  ringW = 100,
  tilt = -12,
  period = 12,
  active = false,
  box = 72,
}: {
  accent: string;
  size?: number;
  ringW?: number;
  tilt?: number;
  period?: number;
  active?: boolean;
  /** Height of the square-ish box the system is centered in. */
  box?: number;
}) {
  const ringH = Math.round(ringW * 0.3);
  const ry = ringH / 2;
  const rx = ringW / 2;
  // Starts at the left tip, sweeps the bottom (front) half first, then the
  // top (back) half — matching the z-index flip in `planet-moon-depth`.
  const moonPath = `M 0 ${ry} A ${rx} ${ry} 0 0 0 ${ringW} ${ry} A ${rx} ${ry} 0 0 0 0 ${ry}`;
  const ringColor = active ? accent : "rgba(148,163,184,.4)";

  return (
    <div
      aria-hidden="true"
      style={{ position: "relative", width: ringW + 8, height: box, flex: "none", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Ring half="back" w={ringW} h={ringH} tilt={tilt} color={ringColor} />
      <span
        style={{
          position: "absolute",
          zIndex: 2,
          width: size,
          height: size,
          borderRadius: "50%",
          background: `radial-gradient(circle at 34% 30%, #F8FAFC 0%, ${accent} 42%, #1E1B4B 82%, #0A0818 100%)`,
          boxShadow: `0 0 ${active ? 38 : 24}px -6px ${accent}, inset -5px -7px 12px rgba(3,0,20,.55)`,
          transform: active ? "scale(1.07)" : "scale(1)",
          transition: "transform .35s cubic-bezier(.2,.8,.2,1), box-shadow .35s ease",
        }}
      />
      <Ring half="front" w={ringW} h={ringH} tilt={tilt} color={ringColor} />
      <span
        className="planet-moon-lane"
        style={{
          position: "absolute",
          width: ringW,
          height: ringH,
          transform: `rotate(${tilt}deg)`,
          animation: `planet-moon-depth ${period}s linear infinite`,
        }}
      >
        <span
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#E2E8F0",
            boxShadow: `0 0 8px ${accent}`,
            offsetPath: `path('${moonPath}')`,
            offsetRotate: "0deg",
            animation: `cosmic-orbit ${period}s linear infinite`,
          }}
        />
      </span>
    </div>
  );
}
