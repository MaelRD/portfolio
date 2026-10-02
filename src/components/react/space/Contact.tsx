import { CONTACT, CV_FILENAME, CV_PATH, START_PATH } from "../../../data/content";
import { CONTACT_TEXT as T, HEADS, UI_TEXT, type Lang } from "../../../data/space";
import Footer from "./Footer";
import { Planet, SURFACES } from "./ui";

export default function Contact({ lang }: { lang: Lang }) {
  return (
    <section id="contact" className="signal" aria-labelledby="contact-title">
      <div className="contact__inner">
        <h2 className="contact__title" id="contact-title">
          {HEADS.contact.title[lang]}
        </h2>
        <p className="contact__lede">{HEADS.contact.intro![lang]}</p>

        <ul className="paths">
          <li className="spotlight panel path">
            <h3 id="path-talent">{T.talent.title[lang]}</h3>
            <p>{T.talent.text[lang]}</p>
            <div className="path__actions">
              <a href={CV_PATH} download={CV_FILENAME} className="btn btn--solid" data-track="Download Resume" data-track-label="contact">
                {T.talent.cv[lang]} <span aria-hidden="true">↓</span>
              </a>
              <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className="btn btn--line" data-track="GitHub" data-track-label="contact">
                {T.talent.github[lang]} <span aria-hidden="true">↗</span>
                <span className="sr-only">{UI_TEXT.newTab[lang]}</span>
              </a>
              <a href={`mailto:${CONTACT.email}`} className="btn btn--line">
                {T.talent.email[lang]}
              </a>
            </div>
          </li>
          <li className="spotlight panel path path--project">
            <h3 id="path-project">{T.project.title[lang]}</h3>
            {T.project.text.map((p) => (
              <p key={p.en}>{p[lang]}</p>
            ))}
            <div className="path__actions">
              <a href={START_PATH} className="btn btn--solid btn--signal" data-track="Start Project" data-track-label="open-channel">
                {T.project.cta[lang]} <span aria-hidden="true">→</span>
              </a>
            </div>
          </li>
        </ul>
      </div>
      <div className="contact__horizon">
        <Planet className="contact__world" surface={SURFACES.horizon} speed={5} />
        <Footer lang={lang} />
      </div>
    </section>
  );
}
