import { useEffect, useState } from "react";
import { META, type Lang } from "../../data/content";
import Header from "./Header";
import Hero from "./Hero";
import Projects from "./Projects";
import Process from "./Process";
import Experience from "./Experience";
import { SoftSkills, TechnicalSkills } from "./Skills";
import About from "./About";
import ContactFooter, { Footer } from "./ContactFooter";

// Sections observed for the active nav item. Soft skills live under the
// "Skills" nav entry, so they report as `skills`.
const SECTION_IDS = ["hero", "projects", "process", "experience", "skills", "soft-skills", "about", "contact"];
const NAV_ALIAS: Record<string, string> = { "soft-skills": "skills" };

export default function CosmicApp() {
  const [lang, setLangState] = useState<Lang>("en");
  const [active, setActive] = useState("hero");

  // Resolve the language after mount so the server-rendered and first client
  // render always match (avoids a hydration mismatch): a saved choice wins,
  // otherwise follow the browser's language.
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
    document.title = META.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", META.description[lang]);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", META.description[lang]);
    document.querySelector('meta[property="og:locale"]')?.setAttribute("content", lang === "es" ? "es_MX" : "en_US");
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem("mael.lang", l);
    } catch {
      /* localStorage unavailable */
    }
  };

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(NAV_ALIAS[entry.target.id] ?? entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    // The contact section is short and sits at the very bottom, so it may
    // never cross the observer band — mark it active once the page bottoms out.
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) setActive("contact");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <Header lang={lang} setLang={setLang} active={active} />
      <main id="main" tabIndex={-1} style={{ position: "relative", zIndex: 10 }}>
        <Hero lang={lang} />
        <Projects lang={lang} />
        <Process lang={lang} />
        <Experience lang={lang} />
        <TechnicalSkills lang={lang} />
        <SoftSkills lang={lang} />
        <About lang={lang} />
        <ContactFooter lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
