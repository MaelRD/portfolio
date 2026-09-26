import { CONTACT, CV_FILENAME, CV_PATH } from "../../../data/content";
import { CONTACT_TEXT as T, HEADS, UI_TEXT, type Lang } from "../../../data/space";
import { Eyebrow, Planet, SURFACES } from "./ui";

export default function Contact({ lang }: { lang: Lang }) {
  const channels = [
    { k: T.email[lang], v: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { k: T.github[lang], v: "github.com/MaelRD", href: CONTACT.github, external: true },
    { k: T.cv[lang], v: "cv.pdf", href: CV_PATH, download: true },
  ];

  return (
    <section id="contact" className="signal" aria-labelledby="contact-title">
      <div className="contact__inner">
        <Eyebrow head={HEADS.contact} lang={lang} />
        <h2 className="contact__title" id="contact-title">
          {HEADS.contact.title[lang]}
        </h2>
        <p className="contact__lede">{HEADS.contact.intro![lang]}</p>
        <a href={`mailto:${CONTACT.email}`} className="btn btn--solid btn--signal">
          {T.cta[lang]} <span aria-hidden="true">→</span>
        </a>
        <ul className="channels">
          {channels.map((c) => (
            <li key={c.href}>
              <a
                className="spotlight channel"
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                {...(c.download ? { download: CV_FILENAME } : {})}
              >
                <span className="label">
                  {c.k} <span aria-hidden="true">↗</span>
                </span>
                <span>{c.v}</span>
                {c.external && <span className="sr-only">{UI_TEXT.newTab[lang]}</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="contact__horizon">
        <Planet className="contact__world" surface={SURFACES.horizon} speed={5} />
        <footer className="sky-footer">
          <span>{T.footer[lang]}</span>
          <span>
            <span className="dot-live" data-blink aria-hidden="true" />
            {T.available[lang]}
          </span>
        </footer>
      </div>
    </section>
  );
}
