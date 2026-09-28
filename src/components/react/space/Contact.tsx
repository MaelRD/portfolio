import { CONTACT, CV_FILENAME, CV_PATH, START_PATH } from "../../../data/content";
import { CONTACT_TEXT as T, FOOTER, HEADS, UI_TEXT, type Lang } from "../../../data/space";
import { Planet, SURFACES } from "./ui";

export default function Contact({ lang }: { lang: Lang }) {
  const channels = [
    { k: T.email[lang], v: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { k: T.github[lang], v: "github.com/MaelRD", href: CONTACT.github, external: true, track: "GitHub" },
    { k: T.cv[lang], v: "cv.pdf", href: CV_PATH, download: true, track: "Download Resume" },
  ];

  return (
    <section id="contact" className="signal" aria-labelledby="contact-title">
      <div className="contact__inner">
        <h2 className="contact__title" id="contact-title">
          {HEADS.contact.title[lang]}
        </h2>
        <p className="contact__lede">{HEADS.contact.intro![lang]}</p>
        <p className="contact__support">{T.support[lang]}</p>
        <a href={START_PATH} className="btn btn--solid btn--signal" data-track="Start Project" data-track-label="open-channel">
          {T.ctaStart[lang]} <span aria-hidden="true">→</span>
        </a>
        <ul className="channels">
          {channels.map((c) => (
            <li key={c.href}>
              <a
                className="spotlight channel"
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                {...(c.download ? { download: CV_FILENAME } : {})}
                {...(c.track ? { "data-track": c.track, "data-track-label": "open-channel" } : {})}
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
          <span>{FOOTER.copyright[lang].toUpperCase()}</span>
          <span>
            <span className="dot-live" data-blink aria-hidden="true" />
            {FOOTER.status[lang].toUpperCase()}
          </span>
        </footer>
      </div>
    </section>
  );
}
