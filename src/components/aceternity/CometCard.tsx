import { useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

// Aceternity's Comet Card: the card turns toward the pointer, drifts a little
// with it, lifts on hover and catches a light where the pointer is. First
// used on the About photo, now the shared card style across the page (the
// kit's TiltCard is this same component). Mouse and trackpad only (no hover
// to follow on touch); still under reduced motion. Styles: .comet in v2.css.
//
// - `className`     the outer wrapper (perspective; the grid or list item)
// - `cardClassName` the element that moves: give it the card's own classes
//                   (border, radius, background) so the light and the
//                   shadow follow its shape
// - `as`            the wrapper's element, so a card can stay a list item
// - depths and `lift` scale the effect down for larger cards

export default function CometCard({
  rotateDepth = 14,
  translateDepth = 14,
  lift = 1.05,
  as: Wrapper = "div",
  className = "",
  cardClassName = "",
  style,
  children,
}: {
  rotateDepth?: number;
  translateDepth?: number;
  /** Scale on hover. */
  lift?: number;
  as?: "div" | "li";
  className?: string;
  cardClassName?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x);
  const sy = useSpring(y);

  const rotateX = useTransform(sy, [-0.5, 0.5], [`-${rotateDepth}deg`, `${rotateDepth}deg`]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [`${rotateDepth}deg`, `-${rotateDepth}deg`]);
  const translateX = useTransform(sx, [-0.5, 0.5], [`-${translateDepth}px`, `${translateDepth}px`]);
  const translateY = useTransform(sy, [-0.5, 0.5], [`${translateDepth}px`, `-${translateDepth}px`]);
  const glareX = useTransform(sx, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(sy, [-0.5, 0.5], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.9) 10%, rgba(255, 255, 255, 0.75) 20%, rgba(255, 255, 255, 0) 80%)`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (still || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Wrapper className={`comet ${className}`} style={style}>
      <motion.div
        ref={ref}
        className={`comet__card ${cardClassName}`}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={still ? undefined : { rotateX, rotateY, translateX, translateY }}
        whileHover={still ? undefined : { scale: lift, z: 50, transition: { duration: 0.2 } }}
      >
        {children}
        <motion.span className="comet__glare" aria-hidden="true" style={{ background: glare }} />
      </motion.div>
    </Wrapper>
  );
}
