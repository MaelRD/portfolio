import type { CSSProperties, ReactNode } from "react";
import type { Lang, SectionHead } from "../../../data/space";

/** A shaded sphere with a slowly rotating surface texture (driven by the engine via data-surface). */
export function Planet({
  size,
  bg,
  glow,
  surface,
  speed,
  className = "",
  style,
  children,
}: {
  size?: number;
  /** Omit to use the background from className. */
  bg?: string;
  glow?: string;
  /** One of SURFACES: "<background-image>|<background-size>". */
  surface: string;
  /** Surface drift in px per second. */
  speed: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const dims = size ? { width: size, height: size } : {};
  const [image, tile] = surface.split("|");
  return (
    <span aria-hidden="true" className={`planet ${className}`} style={{ display: "block", ...dims, ...(bg && { background: bg }), ...(glow && { boxShadow: glow }), ...style }}>
      <span className="planet__surface" data-surface={speed} style={{ backgroundImage: image, backgroundSize: tile }} />
      <span className="planet__shade" />
      {children}
    </span>
  );
}

// Surface textures: soft-light bands and storms, tiled horizontally so the
// engine can scroll them. Format: "<background-image>|<background-size>".
export const SURFACES = {
  small:
    "radial-gradient(ellipse 20px 6px at 25% 35%,rgba(255,255,255,.6),transparent 70%),radial-gradient(ellipse 26px 8px at 70% 65%,rgba(0,0,0,.5),transparent 70%)|80px 100%",
  hero:
    "radial-gradient(ellipse 50px 14px at 20% 30%,rgba(255,255,255,.55),transparent 70%),radial-gradient(ellipse 70px 18px at 70% 58%,rgba(0,0,0,.5),transparent 70%),radial-gradient(ellipse 36px 10px at 45% 78%,rgba(255,255,255,.4),transparent 70%),repeating-linear-gradient(180deg,rgba(255,255,255,.18) 0 5px,transparent 5px 16px,rgba(0,0,0,.2) 16px 20px,transparent 20px 30px)|260px 100%",
  large:
    "radial-gradient(ellipse 80px 22px at 20% 30%,rgba(255,255,255,.55),transparent 70%),radial-gradient(ellipse 120px 30px at 70% 60%,rgba(0,0,0,.5),transparent 70%),radial-gradient(ellipse 60px 16px at 45% 80%,rgba(255,255,255,.4),transparent 70%),repeating-linear-gradient(180deg,rgba(255,255,255,.14) 0 8px,transparent 8px 26px)|420px 100%",
  earth:
    "radial-gradient(ellipse 120px 20px at 20% 6%,rgba(255,255,255,.7),transparent 70%),radial-gradient(ellipse 160px 24px at 70% 10%,rgba(255,255,255,.5),transparent 70%)|700px 100%",
  horizon:
    "radial-gradient(ellipse 260px 30px at 20% 3%,rgba(255,255,255,.7),transparent 70%),radial-gradient(ellipse 340px 40px at 65% 5%,rgba(255,255,255,.45),transparent 70%),radial-gradient(ellipse 200px 24px at 90% 8%,rgba(0,0,0,.5),transparent 70%)|1600px 100%",
};

export function Head({ head, lang, id }: { head: SectionHead; lang: Lang; id: string }) {
  return (
    <header className="head">
      <h2 className="h2" id={id}>
        {head.title[lang]}
      </h2>
      {head.intro && <p className="lede">{head.intro[lang]}</p>}
    </header>
  );
}
