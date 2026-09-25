import { useEffect, useState } from "react";
import type { Lang } from "../../data/content";
import Header from "./Header";
import Hero from "./Hero";
import FeaturedProject from "./FeaturedProject";
import OtherProjects from "./OtherProjects";
import Experience from "./Experience";
import Process from "./Process";
import Capabilities from "./Capabilities";
import About from "./About";
import ContactFooter from "./ContactFooter";

const SECTION_IDS = ["hero", "work", "work-other", "experience", "process", "capabilities", "about", "contact"];

export default function CosmicApp() {
  const [lang, setLangState] = useState<Lang>("en");
  const [active, setActive] = useState("hero");

  // Resolve a persisted language choice after mount so the server-rendered
  // and first client render always match (avoids a hydration mismatch).
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("mael.lang");
      if (saved === "es" || saved === "en") setLangState(saved);
    } catch {
      /* localStorage unavailable */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
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
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Header lang={lang} setLang={setLang} active={active} />
      <main id="top" style={{ position: "relative", zIndex: 10 }}>
        <Hero lang={lang} />
        <FeaturedProject lang={lang} />
        <OtherProjects lang={lang} />
        <Experience lang={lang} />
        <Process lang={lang} />
        <Capabilities lang={lang} />
        <About lang={lang} />
        <ContactFooter lang={lang} />
      </main>
    </>
  );
}
