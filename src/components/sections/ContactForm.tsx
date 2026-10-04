import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { CONTACT, type Lang } from "@/data/content";
import { CONTACT_FORM as F } from "@/data/v2";
import { track } from "@/lib/analytics";
import { PREFILL_EVENT, type Prefill } from "./ProjectConfigurator";
import { SectionHeader } from "../kit";

// The contact form, posted to Netlify Forms (registered as static HTML in
// src/pages/index.astro under the same name and fields). Each field explains
// itself; errors appear under the field once it has been left or on submit,
// and the first invalid field takes focus. States: idle → loading → success
// or error. The configurator can fill "what do you need" and the message.

type Fields = { name: string; company: string; email: string; whatsapp: string; need: string; message: string };
type Status = "idle" | "loading" | "success" | "error";
const EMPTY: Fields = { name: "", company: "", email: "", whatsapp: "", need: "", message: "" };

function validate(v: Fields) {
  const e: Partial<Record<keyof Fields, keyof typeof F.errors>> = {};
  if (!v.name.trim()) e.name = "name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "email";
  if (v.whatsapp.trim() && (!/^[+\d\s()-]+$/.test(v.whatsapp) || v.whatsapp.replace(/\D/g, "").length < 8)) e.whatsapp = "whatsapp";
  if (!v.need) e.need = "need";
  if (v.message.trim().length < 20) e.message = "message";
  return e;
}

export default function ContactForm({ lang }: { lang: Lang }) {
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;
  const [v, setV] = useState<Fields>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [bot, setBot] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLParagraphElement>(null);
  const errors = validate(v);
  const show = (k: keyof Fields) => (submitted || touched[k]) && errors[k];

  // Answers from the configurator.
  useEffect(() => {
    const on = (e: Event) => {
      const d = (e as CustomEvent<Prefill>).detail;
      setV((cur) => ({ ...cur, need: F.needs[d.need]?.es ?? cur.need, message: cur.message.trim() ? cur.message : d.message }));
    };
    window.addEventListener(PREFILL_EVENT, on);
    return () => window.removeEventListener(PREFILL_EVENT, on);
  }, []);

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => setV((cur) => ({ ...cur, [k]: e.target.value }));
  const blur = (k: keyof Fields) => () => setTouched((t) => ({ ...t, [k]: true }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setSubmitted(true);
    const bad = Object.keys(errors) as (keyof Fields)[];
    if (bad.length) {
      formRef.current?.querySelector<HTMLElement>(`[name="${bad[0]}"]`)?.focus();
      return;
    }
    setStatus("loading");
    const need = F.needs.find((n) => n.es === v.need);
    const body = new URLSearchParams({
      "form-name": F.name,
      "bot-field": bot,
      name: v.name.trim(),
      company: v.company.trim(),
      email: v.email.trim(),
      whatsapp: v.whatsapp.trim(),
      need: need ? need.en : v.need,
      message: v.message.trim(),
      language: lang,
    });
    try {
      // Netlify Forms only exists on Netlify; the dev server answers any POST
      // with 200, which would fake a successful send.
      if (import.meta.env.DEV) throw new Error("Netlify Forms is not available in development");
      const res = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: body.toString() });
      if (!res.ok) throw new Error(String(res.status));
      track("Send Message", { need: need?.en ?? "other" });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setV(EMPTY);
    setTouched({});
    setSubmitted(false);
    setStatus("idle");
  };

  const err = (k: keyof Fields) =>
    show(k) ? (
      <p className="field__error" id={id(`${k}-error`)}>
        {F.errors[errors[k]!][lang]}
      </p>
    ) : null;
  const described = (k: keyof Fields, hint = false) => [hint ? id(`${k}-hint`) : "", show(k) ? id(`${k}-error`) : ""].filter(Boolean).join(" ") || undefined;
  const opt = <span className="field__opt">({F.optional[lang]})</span>;

  return (
    <section id="contact" className="sec contact2" aria-labelledby="contact-title">
      <div className="wrap contact2__grid">
        <div className="contact2__intro">
          <SectionHeader id="contact-title" title={F.title[lang]} intro={F.intro[lang]} />
          <p className="contact2__mail">
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </p>
        </div>

        {status === "success" ? (
          <div className="form2 form2--done" role="status">
            <h3>{F.success.title[lang]}</h3>
            <p>{F.success.text[lang]}</p>
            <button type="button" className="btn btn--line" onClick={reset}>
              {F.success.again[lang]}
            </button>
          </div>
        ) : (
          <form ref={formRef} className="form2" name={F.name} method="POST" data-netlify="true" netlify-honeypot="bot-field" noValidate onSubmit={onSubmit}>
            <input type="hidden" name="form-name" value={F.name} />
            <p className="sr-only" aria-hidden="true">
              <label>
                Bot <input name="bot-field" tabIndex={-1} autoComplete="off" value={bot} onChange={(e) => setBot(e.target.value)} />
              </label>
            </p>
            <p className="form2__req">{F.required[lang]}</p>
            {submitted && Object.keys(errors).length > 0 && (
              <p ref={summaryRef} className="form2__summary" role="alert">
                {F.errors.summary[lang]}
              </p>
            )}

            <div className="form2__row">
              <div className="field">
                <label htmlFor={id("name")}>{F.fields.name.label[lang]} *</label>
                <input id={id("name")} name="name" autoComplete="name" required value={v.name} onChange={set("name")} onBlur={blur("name")} placeholder={F.fields.name.placeholder[lang]} aria-invalid={!!show("name")} aria-describedby={described("name")} />
                {err("name")}
              </div>
              <div className="field">
                <label htmlFor={id("company")}>
                  {F.fields.company.label[lang]} {opt}
                </label>
                <input id={id("company")} name="company" autoComplete="organization" value={v.company} onChange={set("company")} placeholder={F.fields.company.placeholder[lang]} />
              </div>
            </div>

            <div className="form2__row">
              <div className="field">
                <label htmlFor={id("email")}>{F.fields.email.label[lang]} *</label>
                <input id={id("email")} name="email" type="email" inputMode="email" autoComplete="email" required value={v.email} onChange={set("email")} onBlur={blur("email")} placeholder={F.fields.email.placeholder[lang]} aria-invalid={!!show("email")} aria-describedby={described("email")} />
                {err("email")}
              </div>
              <div className="field">
                <label htmlFor={id("whatsapp")}>
                  {F.fields.whatsapp.label[lang]} {opt}
                </label>
                <input id={id("whatsapp")} name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" value={v.whatsapp} onChange={set("whatsapp")} onBlur={blur("whatsapp")} placeholder={F.fields.whatsapp.placeholder[lang]} aria-invalid={!!show("whatsapp")} aria-describedby={described("whatsapp", true)} />
                <p className="field__hint" id={id("whatsapp-hint")}>
                  {F.fields.whatsapp.hint[lang]}
                </p>
                {err("whatsapp")}
              </div>
            </div>

            <div className="field">
              <label htmlFor={id("need")}>{F.fields.need.label[lang]} *</label>
              <select id={id("need")} name="need" required value={v.need} onChange={set("need")} onBlur={blur("need")} aria-invalid={!!show("need")} aria-describedby={described("need")}>
                <option value="" disabled>
                  {F.fields.need.placeholder[lang]}
                </option>
                {F.needs.map((n) => (
                  <option key={n.es} value={n.es}>
                    {n[lang]}
                  </option>
                ))}
              </select>
              {err("need")}
            </div>

            <div className="field">
              <label htmlFor={id("message")}>{F.fields.message.label[lang]} *</label>
              <p className="field__hint" id={id("message-hint")}>
                {F.fields.message.hint[lang]}
              </p>
              <textarea id={id("message")} name="message" rows={5} required value={v.message} onChange={set("message")} onBlur={blur("message")} placeholder={F.fields.message.placeholder[lang]} aria-invalid={!!show("message")} aria-describedby={described("message", true)} />
              {err("message")}
            </div>

            {status === "error" && (
              <p className="form2__error" role="alert">
                {F.errors.send[lang]} <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
              </p>
            )}

            <button type="submit" className="btn btn--solid form2__submit" disabled={status === "loading"} aria-busy={status === "loading" || undefined}>
              {status === "loading" ? F.sending[lang] : F.submit[lang]} {status !== "loading" && <span aria-hidden="true">→</span>}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
