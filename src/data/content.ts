// Site-wide constants and the bilingual text type every component uses.
//
// Content rules (from the portfolio brief):
// - First person, concrete, no invented metrics, clients, results or titles.
// - Project status is shown exactly as confirmed.
// - Case-study sections without verified information are omitted, never filled in.

export type Lang = "en" | "es";

export interface Bi {
  en: string;
  es: string;
}

/** Text that is the same in both languages can be written once. */
export type Text = string | Bi;

export const tx = (t: Text, lang: Lang) => (typeof t === "string" ? t : t[lang]);

export const bi = (es: string, en: string): Bi => ({ es, en });

export const META = {
  title: "Mario Yael | Software Developer",
  description: bi(
    "Desarrollador de software enfocado en aplicaciones empresariales, backend, integraciones y soluciones Full Stack.",
    "Software Developer focused on business applications, backend systems, integrations and Full Stack solutions.",
  ),
};

export const CONTACT = {
  email: "marioyaelgg@gmail.com",
  github: "https://github.com/MaelRD",
  site: "https://maeldev.netlify.app/",
};

export const CV_PATH = "/cv.pdf";
export const CV_FILENAME = "Mario-Yael-Gordillo-CV.pdf";
export const START_PATH = "/start-a-project";
