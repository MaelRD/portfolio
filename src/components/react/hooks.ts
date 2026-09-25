import { useEffect, useRef, useState } from "react";

function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

/** Buttons that nudge toward the pointer — primary CTAs only, a few px, desktop pointers only. */
export function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    let fine = false;
    try {
      fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    } catch {
      /* matchMedia unavailable */
    }
    if (!el || !fine || prefersReducedMotion()) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      el.style.transform = `translate(${(dx * 4).toFixed(1)}px,${(dy * 3).toFixed(1)}px)`;
    };
    const onLeave = () => {
      el.style.transform = "";
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);
  return ref;
}

/**
 * Active language, shared by every page through localStorage. Resolved after
 * mount so the server-rendered and first client render match (no hydration
 * mismatch): a saved choice wins, otherwise the browser's language. Also keeps
 * <html lang>, the meta description and og:locale in sync.
 */
export function useLang(descriptions: { en: string; es: string }) {
  const [lang, setLangState] = useState<"en" | "es">("en");

  useEffect(() => {
    let next: "en" | "es" | null = null;
    try {
      const saved = window.localStorage.getItem("mael.lang");
      if (saved === "es" || saved === "en") next = saved;
    } catch {
      /* localStorage unavailable */
    }
    if (!next && navigator.language?.toLowerCase().startsWith("es")) next = "es";
    if (next) setLangState(next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    const desc = descriptions[lang];
    document.querySelector('meta[name="description"]')?.setAttribute("content", desc);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", desc);
    document.querySelector('meta[property="og:locale"]')?.setAttribute("content", lang === "es" ? "es_MX" : "en_US");
  }, [lang, descriptions]);

  const setLang = (l: "en" | "es") => {
    setLangState(l);
    try {
      window.localStorage.setItem("mael.lang", l);
    } catch {
      /* localStorage unavailable */
    }
  };

  return [lang, setLang] as const;
}
