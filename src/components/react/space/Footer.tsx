import { CONTACT, CV_FILENAME, CV_PATH } from "../../../data/content";
import { FOOTER, UI_TEXT, type Lang } from "../../../data/space";

/** Name, availability and the three ways to reach me; on the home page it sits on the horizon planet. */
export default function Footer({ lang, page = false }: { lang: Lang; page?: boolean }) {
  return (
    <footer className={`sky-footer${page ? " sky-footer--page" : ""}`}>
      <div className="sky-footer__who">
        <strong>{FOOTER.name}</strong>
        <span>{FOOTER.role[lang]}</span>
        <span className="sky-footer__status">
          <span className="dot-live" data-blink aria-hidden="true" />
          {FOOTER.status[lang]}
        </span>
      </div>
      <div className="sky-footer__end">
        <ul className="sky-footer__links">
          <li>
            <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" data-track="GitHub" data-track-label="footer">
              GitHub<span className="sr-only"> {UI_TEXT.newTab[lang]}</span>
            </a>
          </li>
          <li>
            <a href={`mailto:${CONTACT.email}`}>{FOOTER.email[lang]}</a>
          </li>
          <li>
            <a href={CV_PATH} download={CV_FILENAME} data-track="Download Resume" data-track-label="footer">
              {FOOTER.cv[lang]}
            </a>
          </li>
        </ul>
        <small>{FOOTER.copyright}</small>
      </div>
    </footer>
  );
}
