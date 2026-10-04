import { useEffect, useRef, type RefObject } from "react";

// One requestAnimationFrame loop drives every ambient motion on the page:
// the starfield canvas, orbiting labels, drifting nebulae, rotating planet
// surfaces, data pulses and the probe on the process trajectory. Elements opt
// in with data attributes, so sections stay plain markup:
//
//   data-orbit="rx" data-ry data-tilt data-speed data-phase [data-depth]
//   data-surface="px per second"   data-pulse="cycles per ms"
//   data-drift="index"   data-blink   data-spin="deg per second"   data-probe
//
// Under prefers-reduced-motion the scene renders one still frame (and again on
// resize); nothing moves on its own.

const STAR_COLORS = ["125,227,255", "255,192,122", "249,168,212", "238,235,255"];
const NEBULA = 0.85;
const STILL_T = 9000; // the moment a reduced-motion visitor sees
const BAND_PAD = 80; // px of Milky Way kept past each side for pointer parallax
const CLOUDS = ["139,108,255", "96,165,250", "219,39,119", "125,227,255", "167,139,250"];

/** Standard normal sample (Box–Muller). */
function gauss() {
  return Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random());
}

/**
 * The Milky Way, painted once per viewport size into an offscreen canvas taller
 * than the screen: colored gas clouds, a dense band of stardust, and a dark
 * dust lane cut through its middle. The frame loop only blits it, sliding it
 * with scroll progress so the band sweeps across the sky as you go down.
 */
function paintMilkyWay(W: number, H: number, dpr: number) {
  const BW = W + BAND_PAD * 2;
  const BH = Math.round(H * 1.7);
  const c = document.createElement("canvas");
  c.width = Math.round(BW * dpr);
  c.height = Math.round(BH * dpr);
  const g = c.getContext("2d");
  if (!g) return null;
  g.setTransform(dpr, 0, 0, dpr, 0, 0);

  // Axis from lower left to upper right.
  const x0 = 0;
  const y0 = BH * 0.88;
  const dx = BW;
  const dy = BH * 0.12 - y0;
  const len = Math.hypot(dx, dy);
  const nx = -dy / len;
  const ny = dx / len;
  const angle = Math.atan2(dy, dx);
  const sigma = Math.min(W, H) * 0.13;
  const at = (t: number, off: number) => [x0 + dx * t + nx * off, y0 + dy * t + ny * off];

  // 1 · Gas: large, faint, additive clouds.
  g.globalCompositeOperation = "lighter";
  for (let i = 0; i < 70; i++) {
    const [x, y] = at(Math.random(), gauss() * sigma * 0.75);
    const r = sigma * (0.7 + Math.random() * 1.6);
    const col = CLOUDS[i % CLOUDS.length];
    const grad = g.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, `rgba(${col},${0.03 + Math.random() * 0.04})`);
    grad.addColorStop(1, `rgba(${col},0)`);
    g.fillStyle = grad;
    g.fillRect(x - r, y - r, r * 2, r * 2);
  }

  // 2 · Stardust: thousands of sub-pixel stars, densest along the axis.
  g.globalCompositeOperation = "source-over";
  const dust = Math.round((BW * BH) / (W < 700 ? 420 : 260));
  for (let i = 0; i < dust; i++) {
    const off = gauss() * sigma;
    const [x, y] = at(Math.random(), off);
    const falloff = Math.exp(-((off / sigma) ** 2) / 2);
    const a = (0.06 + Math.random() * 0.4) * falloff;
    const r = 0.25 + Math.random() * 0.6;
    g.fillStyle = Math.random() < 0.15 ? `rgba(196,181,253,${a})` : `rgba(238,235,255,${a})`;
    g.fillRect(x, y, r, r);
  }

  // 3 · Dust lane: soft elongated bites out of the band, just off-center.
  g.globalCompositeOperation = "destination-out";
  for (let i = 0; i < 46; i++) {
    const [x, y] = at(Math.random(), sigma * (0.12 + gauss() * 0.16));
    const rx = sigma * (0.5 + Math.random() * 1.1);
    const ry = sigma * (0.1 + Math.random() * 0.14);
    g.save();
    g.translate(x, y);
    g.rotate(angle + gauss() * 0.06);
    g.scale(1, ry / rx);
    const grad = g.createRadialGradient(0, 0, 0, 0, 0, rx);
    grad.addColorStop(0, "rgba(0,0,0,0.32)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = grad;
    g.fillRect(-rx, -rx, rx * 2, rx * 2);
    g.restore();
  }
  g.globalCompositeOperation = "source-over";
  return { canvas: c, BW, BH };
}

interface Star {
  x: number;
  y: number;
  z: number;
  r: number;
  ph: number;
  tw: number;
  c: string;
}

function reducedMotion() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

export function useSpaceEngine(rootRef: RefObject<HTMLElement>, canvasRef: RefObject<HTMLCanvasElement>, pathRef: RefObject<SVGPathElement>) {
  // Re-query tagged elements after every render: the selection UI swaps nodes.
  const dirty = useRef(true);
  useEffect(() => {
    dirty.current = true;
  });

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;
    const ctx = canvas.getContext("2d");
    const still = reducedMotion();

    let W = 0;
    let H = 0;
    let stars: Star[] = [];
    let mx = 0;
    let my = 0;
    let shoot: { x: number; y: number; vx: number; vy: number; life: number } | null = null;
    let nextShoot = performance.now() + 2500;
    let plen = 0;
    let band: ReturnType<typeof paintMilkyWay> = null;
    let maxScroll = 1;
    let measuredAt = 0;

    let orbits: HTMLElement[] = [];
    let surfaces: HTMLElement[] = [];
    let pulses: HTMLElement[] = [];
    let drifts: HTMLElement[] = [];
    // Satellite labels: their width and the room around their orrery, measured
    // on cache (after renders and resizes), not per frame.
    const fit = new Map<HTMLElement, { w: number; lw: number; lh: number; sl: number; sr: number }>();
    let blinks: HTMLElement[] = [];
    let spins: HTMLElement[] = [];
    let probe: HTMLElement | null = null;

    const cache = () => {
      const q = (s: string) => Array.from(root.querySelectorAll<HTMLElement>(s));
      orbits = q("[data-orbit]");
      surfaces = q("[data-surface]");
      pulses = q("[data-pulse]");
      drifts = q("[data-drift]");
      blinks = q("[data-blink]");
      fit.clear();
      for (const el of orbits) {
        if (el.dataset.depth !== "tag" || !el.parentElement) continue;
        const box = el.parentElement.getBoundingClientRect();
        fit.set(el, { w: box.width, lw: el.offsetWidth, lh: el.offsetHeight, sl: box.left - 8, sr: window.innerWidth - box.right - 8 });
      }
      spins = q("[data-spin]");
      probe = root.querySelector<HTMLElement>("[data-probe]");
      plen = 0;
      dirty.current = false;
    };

    const setupStars = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      band = paintMilkyWay(W, H, dpr);
      measuredAt = 0;
      // Fewer stars on small screens: same look, less work per frame.
      const n = Math.round((W * H) / (W < 700 ? 5200 : 4200));
      stars = Array.from({ length: n }, () => {
        const z = Math.random();
        const k = Math.random();
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          z,
          r: 0.25 + z * z * 1.5,
          ph: Math.random() * 6.28,
          tw: 0.0005 + Math.random() * 0.0025,
          c: k < 0.12 ? STAR_COLORS[0] : k < 0.2 ? STAR_COLORS[1] : k < 0.26 ? STAR_COLORS[2] : STAR_COLORS[3],
        };
      });
    };

    const frame = (t: number) => {
      if (dirty.current) cache();
      const tt = still ? STILL_T : t;
      const sy = still ? 0 : window.scrollY || 0;

      if (ctx) {
        ctx.clearRect(0, 0, W, H);
        if (band) {
          // Page height changes as fonts and images settle; re-measure now and then.
          if (t - measuredAt > 2000) {
            maxScroll = Math.max(1, document.documentElement.scrollHeight - H);
            measuredAt = t;
          }
          const p = Math.min(sy / maxScroll, 1);
          const by = -(band.BH - H) * (0.12 + 0.76 * p);
          ctx.drawImage(band.canvas, -BAND_PAD - mx * 12, by - my * 8, band.BW, band.BH);
        }
        for (const s of stars) {
          const py = (((s.y - sy * (0.02 + s.z * 0.12) - my * s.z * 20) % H) + H) % H;
          const px = s.x - mx * s.z * 30;
          const a = 0.25 + 0.75 * s.z * (0.55 + 0.45 * Math.sin(tt * s.tw + s.ph));
          ctx.fillStyle = `rgba(${s.c},${a})`;
          ctx.beginPath();
          ctx.arc(px, py, s.r, 0, 6.283);
          ctx.fill();
          if (s.r > 1.25) {
            ctx.fillStyle = `rgba(${s.c},${a * 0.12})`;
            ctx.beginPath();
            ctx.arc(px, py, s.r * 4, 0, 6.283);
            ctx.fill();
          }
          // The brightest few get telescope diffraction spikes.
          if (s.r > 1.55) {
            const L = s.r * (5 + 2 * Math.sin(tt * s.tw * 0.7 + s.ph));
            ctx.strokeStyle = `rgba(${s.c},${a * 0.35})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(px - L, py);
            ctx.lineTo(px + L, py);
            ctx.moveTo(px, py - L);
            ctx.lineTo(px, py + L);
            ctx.stroke();
          }
        }
        if (!still && !shoot && t > nextShoot) {
          shoot = { x: W * (0.3 + Math.random() * 0.7), y: H * Math.random() * 0.45, vx: -(7 + Math.random() * 5), vy: 2.5 + Math.random() * 2.5, life: 0 };
        }
        if (shoot) {
          const s = shoot;
          s.x += s.vx;
          s.y += s.vy;
          s.life++;
          const a = Math.sin(Math.min(s.life / 55, 1) * Math.PI);
          const g = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 14, s.y - s.vy * 14);
          g.addColorStop(0, `rgba(255,255,255,${a})`);
          g.addColorStop(1, "rgba(125,227,255,0)");
          ctx.strokeStyle = g;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x - s.vx * 14, s.y - s.vy * 14);
          ctx.stroke();
          if (s.life > 55) {
            shoot = null;
            nextShoot = t + 3500 + Math.random() * 6000;
          }
        }
      }

      const tags: { el: HTMLElement; x0: number; x1: number; y: number; h: number }[] = [];
      for (const el of orbits) {
        const d = el.dataset;
        const rx = +d.orbit!;
        const ry = +(d.ry || rx);
        const f = (+(d.tilt || 0) * Math.PI) / 180;
        const th = (+d.phase! || 0) + tt * (+d.speed! || 0);
        const ax = rx * Math.cos(th);
        const ay = ry * Math.sin(th);
        el.style.left = `${50 + ax * Math.cos(f) - ay * Math.sin(f)}%`;
        el.style.top = `${50 + ax * Math.sin(f) + ay * Math.cos(f)}%`;
        if (d.depth === "tag") {
          // A satellite's label never goes behind the planet: it stays on top,
          // opens toward the outside of the orbit, and is marked (for a gentler
          // look) while its satellite is behind. Written only on change.
          // Outward by default; inward when that would run off the screen.
          const xr = ax * Math.cos(f) - ay * Math.sin(f);
          let side = xr < 0 ? "l" : "r";
          const m = fit.get(el);
          if (m) {
            const px = ((50 + xr) / 100) * m.w;
            if (side === "r" && px + 12 + m.lw > m.w + m.sr) side = "l";
            else if (side === "l" && px - 12 - m.lw < -m.sl) side = "r";
          }
          const behind = Math.sin(th) > 0 ? "0" : "1";
          if (m) {
            const px = ((50 + xr) / 100) * m.w;
            const dot = parseFloat(el.style.getPropertyValue("--dot")) || 0;
            const x0 = side === "r" ? px + dot : px - dot - m.lw;
            tags.push({ el, x0, x1: x0 + m.lw, y: ((50 + ax * Math.sin(f) + ay * Math.cos(f)) / 100) * m.w, h: m.lh });
          }
          if (d.side !== side) d.side = side;
          if (d.behind !== behind) d.behind = behind;
        } else if (d.depth) {
          // Behind the planet: under it and dimmed.
          const front = Math.sin(th) > 0;
          el.style.zIndex = front ? "4" : "1";
          el.style.opacity = front ? "1" : "0.5";
        }
      }
      // Labels from neighbouring orbits can line up: settle any that overlap
      // by sliding the lower one down until it clears (the label's transform
      // transition turns the nudge into a glide). Written only on change.
      tags.sort((p, q) => p.y - q.y);
      const placed: { x0: number; x1: number; y: number; h: number }[] = [];
      for (const tg of tags) {
        let y = tg.y;
        for (const o of placed) {
          if (tg.x0 < o.x1 + 6 && tg.x1 > o.x0 - 6 && Math.abs(y - o.y) < (tg.h + o.h) / 2 + 4) y = o.y + (tg.h + o.h) / 2 + 4;
        }
        placed.push({ x0: tg.x0, x1: tg.x1, y, h: tg.h });
        const ny = `${Math.round(y - tg.y)}px`;
        if (tg.el.style.getPropertyValue("--ny") !== ny) tg.el.style.setProperty("--ny", ny);
      }
      for (const el of surfaces) el.style.backgroundPosition = `${((tt * +el.dataset.surface!) / 1000) % 4000}px 0`;
      for (const el of pulses) {
        const p = (tt * +el.dataset.pulse!) % 1;
        el.style.top = `calc(${p * 100}% - 22px)`;
        el.style.opacity = String(Math.sin(p * Math.PI));
      }
      drifts.forEach((el, i) => {
        const x = Math.sin(tt * 0.00006 + i * 2) * 50;
        const y = Math.cos(tt * 0.00005 + i) * 40 - sy * (0.04 + i * 0.02);
        el.style.transform = `translate(${x}px,${y}px) scale(${1 + Math.sin(tt * 0.00004 + i) * 0.06})`;
        el.style.opacity = String(NEBULA);
      });
      const blink = still ? 1 : 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(tt * 0.004));
      for (const el of blinks) el.style.opacity = String(blink);
      for (const el of spins) el.style.transform = `rotate(${((tt * +el.dataset.spin!) / 1000) % 360}deg)`;

      const path = pathRef.current;
      if (path && probe) {
        if (!plen) {
          try {
            plen = path.getTotalLength();
          } catch {
            plen = 0;
          }
        }
        if (plen) {
          const pt = path.getPointAtLength(((tt * 0.00005) % 1) * plen);
          probe.style.left = `${pt.x / 12}%`;
          probe.style.top = `${pt.y / 2.8}%`;
        }
      }
    };

    setupStars();
    let raf = 0;
    const onResize = () => {
      dirty.current = true; // re-measure label room
      // Mobile browsers resize while the address bar slides; don't reshuffle the sky for that.
      if (window.innerWidth === W && Math.abs(window.innerHeight - H) < 160) return;
      setupStars();
      if (still) requestAnimationFrame(frame);
    };
    window.addEventListener("resize", onResize);

    if (still) {
      // Re-render the still frame when selections change the markup.
      const mo = new MutationObserver(() => {
        dirty.current = true;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(frame);
      });
      mo.observe(root, { childList: true, subtree: true });
      raf = requestAnimationFrame(frame);
      return () => {
        mo.disconnect();
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
      };
    }

    let fine = false;
    try {
      fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    } catch {
      /* matchMedia unavailable */
    }
    const onMove = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    };
    if (fine) window.addEventListener("pointermove", onMove, { passive: true });

    // Own loop until the smooth scroller (Layout.astro) starts ticking; then
    // paint on its tick, right after it has moved the page.
    const loop = (t: number) => {
      frame(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const onTick = (e: Event) => {
      cancelAnimationFrame(raf);
      frame((e as CustomEvent<number>).detail);
    };
    window.addEventListener("mael:frame", onTick);

    return () => {
      window.removeEventListener("mael:frame", onTick);
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [rootRef, canvasRef, pathRef]);
}
