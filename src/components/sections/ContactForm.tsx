import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { ArrowUpRight, Mail, Send, MessageCircle, Check } from "lucide-react";
import { CONTACT, type Lang } from "@/data/content";
import { CONTACT_FORM as F } from "@/data/v2";
import { track } from "@/lib/analytics";
import { PREFILL_EVENT, type Prefill } from "@/lib/prefill";
import { SectionHeader } from "../kit";

// The contact form, posted to Netlify Forms (registered as static HTML in
// src/pages/index.astro under the same name and fields).
//
// What makes it feel alive, without hiding anything:
// - "What do you need" is a row of chips (native radios, arrow keys work);
// - each required field shows a check once it's valid, and a bar at the top
//   counts how many are ready;
// - the message has a live counter and three idea starters that write the
//   first words for you;
// - the need and the message are kept as a draft in this browser (not the
//   name or contact details) and cleared once sent;
// - Ctrl/⌘ + Enter sends; an invalid submit focuses the first problem and
//   nudges it; sending shows a spinner, success draws a check.
// Errors appear under the field once it has been left or on submit.
// Solutions can pre-select the need (PREFILL_EVENT).

type Fields = { name: string; company: string; email: string; whatsapp: string; need: string; message: string };
type Status = "idle" | "loading" | "success" | "error";
const EMPTY: Fields = { name: "", company: "", email: "", whatsapp: "", need: "", message: "" };
const REQUIRED: (keyof Fields)[] = ["name", "email", "need", "message"];
const DRAFT_KEY = "mael:contact-draft";

/** The message's own length: an idea starter's opening words don't count toward the minimum. */
function ownLength(message: string) {
  const m = message.trim();
  const starter = F.starters.items.flatMap((s) => [s.es.trim(), s.en.trim()]).find((s) => m.startsWith(s));
  return (starter ? m.slice(starter.length) : m).trim().length;
}

function validate(v: Fields) {
  const e: Partial<Record<keyof Fields, keyof typeof F.errors>> = {};
  if (!v.name.trim()) e.name = "name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "email";
  if (v.whatsapp.trim() && (!/^[+\d\s()-]+$/.test(v.whatsapp) || v.whatsapp.replace(/\D/g, "").length < 8)) e.whatsapp = "whatsapp";
  if (!v.need) e.need = "need";
  if (ownLength(v.message) < 20) e.message = "message";
  return e;
}

/** The draft (need + message only) in this browser; storage can be unavailable, so every access is guarded. */
const draft = {
  read(): Partial<Fields> {
    try {
      return JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}");
    } catch {
      return {};
    }
  },
  write(v: Fields) {
    try {
      if (v.need || v.message.trim()) localStorage.setItem(DRAFT_KEY, JSON.stringify({ need: v.need, message: v.message }));
      else localStorage.removeItem(DRAFT_KEY);
    } catch {
      /* storage unavailable */
    }
  },
  clear() {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      /* storage unavailable */
    }
  },
};

export default function ContactForm({ lang }: { lang: Lang }) {
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;
  const [v, setV] = useState<Fields>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [bot, setBot] = useState("");
  const [saved, setSaved] = useState(false);
  const [nudge, setNudge] = useState(0);
  const [mac, setMac] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const sentTo = useRef("");
  const errors = validate(v);
  const show = (k: keyof Fields) => (submitted || touched[k]) && errors[k];
  const ok = (k: keyof Fields) => (touched[k] || submitted) && !errors[k] && !!v[k].trim();
  const ready = REQUIRED.filter((k) => !errors[k]).length;

  // Restore the draft once, after mount (server HTML always starts empty).
  useEffect(() => {
    const d = draft.read();
    if (d.need || d.message) {
      setV((cur) => ({ ...cur, need: d.need || cur.need, message: d.message || cur.message }));
      setSaved(true);
    }
    setMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
  }, []);

  // Keep the draft as the visitor types (debounced).
  useEffect(() => {
    if (status === "success") return;
    const t = window.setTimeout(() => {
      draft.write(v);
      setSaved(!!(v.need || v.message.trim()));
    }, 600);
    return () => window.clearTimeout(t);
  }, [v.need, v.message, status]); // v itself changes on every keystroke in any field

  // A need (and possibly a message) chosen elsewhere on the page.
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

  /** An idea starter: writes the first words, or continues the message, and puts the caret at the end. */
  const start = (text: string) => {
    setV((cur) => ({ ...cur, message: cur.message.trim() ? `${cur.message.trimEnd()} ${text}` : text }));
    requestAnimationFrame(() => {
      const el = messageRef.current;
      if (!el) return;
      el.focus();
      el.setSelectionRange(el.value.length, el.value.length);
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setSubmitted(true);
    const bad = Object.keys(errors) as (keyof Fields)[];
    if (bad.length) {
      const field = formRef.current?.querySelector<HTMLElement>(`[name="${bad[0]}"]`);
      const details = field?.closest("details");
      if (details) details.open = true;
      field?.focus();
      setNudge((n) => n + 1);
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
      sentTo.current = v.email.trim();
      draft.clear();
      setSaved(false);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  // Ctrl/⌘ + Enter sends from anywhere in the form.
  const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      formRef.current?.requestSubmit();
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
      <p className="field__error" id={id(`${k}-error`)} key={`${k}-${nudge}`}>
        {F.errors[errors[k]!][lang]}
      </p>
    ) : null;
  const described = (k: keyof Fields, hint = false) => [hint ? id(`${k}-hint`) : "", show(k) ? id(`${k}-error`) : ""].filter(Boolean).join(" ") || undefined;
  const opt = <span className="field__opt">({F.optional[lang]})</span>;
  const tick = (k: keyof Fields) => (
    <span className="field__ok" data-on={ok(k) ? "" : undefined} aria-hidden="true">
      <Check size={14} strokeWidth={2.5} />
    </span>
  );
  const len = ownLength(v.message);

  return (
    <section id="contact" className="sec contact2" aria-labelledby="contact-title">
      {/* The retired configurator's anchor lands on the form it used to fill. */}
      <span id="configurator" className="anchor-alias" aria-hidden="true" />
      <div className="wrap contact2__grid">
        <div className="contact2__intro">
          <p className="contact2__availability"><span className="dot-live" aria-hidden="true" />{lang === "es" ? "Disponible para nuevos proyectos" : "Available for new projects"}</p>
          <SectionHeader id="contact-title" title={lang === "es" ? "Hablemos de tu idea." : "Let’s talk about your idea."} intro={F.intro[lang]} />
          <p className="contact2__mail">
            <a href={`mailto:${CONTACT.email}`}><Mail size={19} aria-hidden="true" />{CONTACT.email}<ArrowUpRight size={18} aria-hidden="true" /></a>
          </p>
          <p className="contact2__mail">
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={19} aria-hidden="true" />
              WhatsApp · {CONTACT.whatsappLabel}
              <ArrowUpRight size={18} aria-hidden="true" />
              <span className="sr-only">{lang === "es" ? " (se abre en una pestaña nueva)" : " (opens in a new tab)"}</span>
            </a>
          </p>
          <div className="contact2__next">
            <h3>{lang === "es" ? "¿Qué sigue después?" : "What happens next?"}</h3>
            <p>{lang === "es" ? "Reviso tu mensaje y te escribo para entender el contexto. Definimos juntos el siguiente paso." : "I review your message and get back to you to understand the context. We decide on the next step together."}</p>
          </div>
        </div>

        {status === "success" ? (
          <div className="form2 form2--done" role="status">
            <svg className="form2__seal" viewBox="0 0 56 56" width="56" height="56" aria-hidden="true">
              <circle cx="28" cy="28" r="25" pathLength={1} />
              <path d="M17 29 L25 37 L40 20" pathLength={1} />
            </svg>
            <h3>{F.success.title[lang]}</h3>
            <p>{F.success.text[lang]}</p>
            {sentTo.current && (
              <p className="form2__to">
                {F.successTo[lang]} <strong>{sentTo.current}</strong>
              </p>
            )}
            <button type="button" className="btn btn--line" onClick={reset}>
              {F.success.again[lang]}
            </button>
          </div>
        ) : (
          <form
            ref={formRef}
            className="form2"
            name={F.name}
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            noValidate
            onSubmit={onSubmit}
            onKeyDown={onKeyDown}
            data-nudge={nudge % 2 ? "a" : nudge ? "b" : undefined}
          >
            <input type="hidden" name="form-name" value={F.name} />
            <p className="sr-only" aria-hidden="true">
              <label>
                Bot <input name="bot-field" tabIndex={-1} autoComplete="off" value={bot} onChange={(e) => setBot(e.target.value)} />
              </label>
            </p>
            <div className="form2__heading">
              <h3>{lang === "es" ? "Cuéntame qué tienes en mente" : "Tell me what you have in mind"}</h3>
              <p>{lang === "es" ? "Un poco de contexto es suficiente para empezar." : "A little context is enough to get started."}</p>
            </div>

            <div className="form2__progress" data-done={ready === REQUIRED.length ? "" : undefined}>
              <ol aria-hidden="true">
                {REQUIRED.map((k) => (
                  <li key={k} data-on={!errors[k] ? "" : undefined} />
                ))}
              </ol>
              <p>
                {ready === REQUIRED.length ? F.ready[lang] : F.progress(ready, REQUIRED.length)[lang]}
                <span className="form2__req"> · {F.required[lang]}</span>
              </p>
            </div>

            {submitted && Object.keys(errors).length > 0 && (
              <p className="form2__summary" role="alert">
                {F.errors.summary[lang]}
              </p>
            )}

            <div className="form2__row">
              <div className="field">
                <label htmlFor={id("name")}>{F.fields.name.label[lang]} *</label>
                <div className="field__control">
                  <input id={id("name")} name="name" autoComplete="name" required value={v.name} onChange={set("name")} onBlur={blur("name")} placeholder={F.fields.name.placeholder[lang]} aria-invalid={!!show("name")} aria-describedby={described("name")} />
                  {tick("name")}
                </div>
                {err("name")}
              </div>
              <div className="field">
                <label htmlFor={id("email")}>{F.fields.email.label[lang]} *</label>
                <div className="field__control">
                  <input id={id("email")} name="email" type="email" inputMode="email" autoComplete="email" required value={v.email} onChange={set("email")} onBlur={blur("email")} placeholder={F.fields.email.placeholder[lang]} aria-invalid={!!show("email")} aria-describedby={described("email")} />
                  {tick("email")}
                </div>
                {err("email")}
              </div>
            </div>

            <fieldset className="field needs" data-invalid={show("need") ? "" : undefined} aria-describedby={described("need")}>
              <legend>{F.fields.need.label[lang]} *</legend>
              <div className="needs__list">
                {F.needs.map((n) => (
                  <label key={n.es} className="need" data-on={v.need === n.es ? "" : undefined}>
                    <input type="radio" name="need" value={n.es} checked={v.need === n.es} onChange={set("need")} onBlur={blur("need")} />
                    <span>{n[lang]}</span>
                  </label>
                ))}
              </div>
              {err("need")}
            </fieldset>

            <div className="field">
              <label htmlFor={id("message")}>{F.fields.message.label[lang]} *</label>
              <p className="field__hint" id={id("message-hint")}>
                {F.fields.message.hint[lang]}
              </p>
              <div className="starters">
                <span className="starters__label">{F.starters.label[lang]}</span>
                {F.starters.items.map((s, i) => (
                  <button key={s.es} type="button" className="starter" onClick={() => start(s[lang])}>
                    {F.starters.short[i][lang]}
                  </button>
                ))}
              </div>
              <div className="field__control">
                <textarea ref={messageRef} id={id("message")} name="message" rows={5} maxLength={2000} required value={v.message} onChange={set("message")} onBlur={blur("message")} placeholder={F.fields.message.placeholder[lang]} aria-invalid={!!show("message")} aria-describedby={[described("message", true), id("message-count")].filter(Boolean).join(" ")} />
                {tick("message")}
              </div>
              <div className="field__meta">
                <span id={id("message-count")} className="field__count" data-enough={len >= 20 ? "" : undefined}>
                  <span className="field__count-bar" aria-hidden="true" style={{ transform: `scaleX(${Math.min(1, len / 20)})` }} />
                  {F.count(len)[lang]}
                </span>
                {saved && <span className="field__draft">{F.draft[lang]}</span>}
              </div>
              {err("message")}
            </div>

            <details className="form2__optional" open={show("whatsapp") ? true : undefined}>
              <summary>{lang === "es" ? "Añadir empresa o WhatsApp" : "Add company or WhatsApp"} <span>{F.optional[lang]}</span></summary>
              <div className="form2__row">
                <div className="field">
                  <label htmlFor={id("company")}>
                    {F.fields.company.label[lang]} {opt}
                  </label>
                  <input id={id("company")} name="company" autoComplete="organization" value={v.company} onChange={set("company")} placeholder={F.fields.company.placeholder[lang]} />
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
            </details>

            {status === "error" && (
              <p className="form2__error" role="alert">
                {F.errors.send[lang]} <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
              </p>
            )}

            <div className="form2__send">
              <button type="submit" className="btn btn--solid form2__submit" data-ready={ready === REQUIRED.length ? "" : undefined} disabled={status === "loading"} aria-busy={status === "loading" || undefined}>
                {status === "loading" ? (
                  <>
                    <span className="form2__spinner" aria-hidden="true" />
                    {F.sending[lang]}
                  </>
                ) : (
                  <>
                    {F.submit[lang]} <Send size={18} aria-hidden="true" className="form2__plane" />
                  </>
                )}
              </button>
              <p className="form2__shortcut" aria-hidden="true">
                {F.shortcut[lang]} <kbd>{mac ? "⌘" : "Ctrl"}</kbd> + <kbd>Enter</kbd>
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
