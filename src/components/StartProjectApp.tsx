import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/data/content";
import { START, STEPS_FORM } from "@/data/start";
import { useLang } from "@/lib/lang";
import SiteShell from "./layout/SiteShell";
import { Eyebrow } from "./react/space/ui";
import StartProjectForm from "./contact/StartProjectForm";

function Success({ lang }: { lang: Lang }) {
  const S = STEPS_FORM.success;
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => ref.current?.focus(), []);
  return (
    <div className="pform-done" role="status">
      <span className="pform-done__signal" aria-hidden="true" />
      <h2 ref={ref} tabIndex={-1} className="h2">
        {S.title[lang]}
      </h2>
      <p className="lede">{S.text[lang]}</p>
      <p className="body">{S.support[lang]}</p>
      <div className="hero__ctas">
        <a href="/" className="btn btn--line">
          <span aria-hidden="true">←</span> {S.back[lang]}
        </a>
        <a href="/#work" className="btn btn--solid">
          {S.projects[lang]} <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}

export default function StartProjectApp() {
  const [lang, setLang] = useLang(START.intro);
  const [sent, setSent] = useState(false);

  return (
    <SiteShell lang={lang} setLang={setLang} base="/">
      <section className="sec start" aria-labelledby="start-title">
        <div className="wrap start__grid">
          <header className="start__head">
            <a href="/" className="back-link">
              <span aria-hidden="true">←</span> {START.back[lang]}
            </a>
            <Eyebrow head={{ eyebrow: START.eyebrow }} lang={lang} />
            <h1 className="h2 start__title" id="start-title">
              {START.title[lang]}
            </h1>
            <p className="lede">{START.intro[lang]}</p>
            <p className="start__support">{START.support[lang]}</p>
          </header>

          <div className="panel start__panel">{sent ? <Success lang={lang} /> : <StartProjectForm lang={lang} onSent={() => setSent(true)} />}</div>
        </div>
      </section>
    </SiteShell>
  );
}
