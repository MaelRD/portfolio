import { useEffect, useState } from "react";
import type { Bi, Lang } from "@/data/content";
import { track } from "./analytics";

/**
 * Active language, shared by every page through localStorage. Resolved after
 * mount so the server-rendered and first client render match (no hydration
 * mismatch): a saved choice wins, otherwise the browser's language. Also keeps
 * <html lang>, the meta description and og:locale in sync.
 */
export function useLang(descriptions: Bi) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    let next: Lang | null = null;
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

  const setLang = (l: Lang) => {
    if (l !== lang) track("Language Change", { to: l });
    setLangState(l);
    try {
      window.localStorage.setItem("mael.lang", l);
    } catch {
      /* localStorage unavailable */
    }
  };

  return [lang, setLang] as const;
}
