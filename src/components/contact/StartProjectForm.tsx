import { useEffect, useRef, useState, type FormEvent } from "react";
import { CONTACT, type Lang } from "@/data/content";
import { STEPS_FORM as F, type Option } from "@/data/start";
import { track } from "@/lib/analytics";
import FormSummary from "./FormSummary";
import Question from "./ProjectFormStep";

// Five steps — the problem, how it works today, tools and team, project
// context, contact — then a summary to confirm before sending.
// Submitted to Netlify Forms (the static twin of this form lives in
// start-a-project.astro so Netlify registers its fields at build time).
// Answers are kept in sessionStorage so a reload doesn't lose a long answer;
// they are cleared once sent, and never on an error.

const FORM_NAME = "start-project"; // must match the static form in start-a-project.astro
const TOTAL = 5;
const REVIEW = TOTAL; // the summary comes after the last step
const DRAFT_KEY = "mael.start-project.v2";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface Answers {
  type: string;
  current: string;
  pain: string;
  tools: string[];
  toolsOther: string;
  team: string;
  urgency: string;
  budget: string;
  name: string;
  company: string;
  email: string;
  phone: string;
}
type Errors = Partial<Record<keyof Answers, string>>;

const EMPTY: Answers = { type: "", current: "", pain: "", tools: [], toolsOther: "", team: "", urgency: "", budget: "", name: "", company: "", email: "", phone: "" };
const labelOf = (options: Option[], key: string, lang: Lang) => options.find((o) => o.key === key)?.label[lang] ?? "";
const namesTool = (tools: string[]) => tools.some((t) => F.tools.named.includes(t));

function validate(step: number, a: Answers, lang: Lang): Errors {
  const e: Errors = {};
  if (step === 0 && !a.type) e.type = F.errors.type[lang];
  if (step === 1) {
    if (a.current.trim().length < 15) e.current = F.errors.current[lang];
    if (a.pain.trim().length < 10) e.pain = F.errors.pain[lang];
  }
  if (step === 2) {
    if (!a.tools.length) e.tools = F.errors.tools[lang];
    if (!a.team) e.team = F.errors.team[lang];
  }
  if (step === 3) {
    if (!a.urgency) e.urgency = F.errors.urgency[lang];
    if (!a.budget) e.budget = F.errors.budget[lang];
  }
  if (step === 4) {
    if (!a.name.trim()) e.name = F.errors.name[lang];
    if (!EMAIL_RE.test(a.email.trim())) e.email = F.errors.email[lang];
    if (a.phone.replace(/\D/g, "").length < 10) e.phone = F.errors.phone[lang];
  }
  return e;
}

/** Selectable cards: one answer (radios) or several (checkboxes). */
function Choices({
  name,
  options,
  value,
  onChange,
  lang,
  error,
  multiple = false,
}: {
  name: keyof Answers;
  options: Option[];
  value: string | string[];
  onChange: (v: string) => void;
  lang: Lang;
  error?: string;
  multiple?: boolean;
}) {
  const on = (k: string) => (Array.isArray(value) ? value.includes(k) : value === k);
  return (
    <div className="options" data-multiple={multiple ? "" : undefined}>
      {options.map((o) => (
        <label key={o.key} className="option">
          <input type={multiple ? "checkbox" : "radio"} name={name} value={o.key} checked={on(o.key)} onChange={() => onChange(o.key)} aria-invalid={error ? true : undefined} />
          <span>{o.label[lang]}</span>
        </label>
      ))}
    </div>
  );
}

/** A note that appears under a choice once it is picked; announced politely. */
function Note({ show, children }: { show: boolean; children: string }) {
  return (
    <div aria-live="polite">
      {show && <p className="fnote">{children}</p>}
    </div>
  );
}

export default function StartProjectForm({ lang, onSent }: { lang: Lang; onSent: () => void }) {
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [bot, setBot] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const moved = useRef(false);
  const [focusField, setFocusField] = useState<{ name: string } | null>(null);

  useEffect(() => {
    if (focusField) formRef.current?.querySelector<HTMLElement>(`[name="${focusField.name}"]`)?.focus();
  }, [focusField]);

  // Restore a draft from this session.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(DRAFT_KEY);
      if (saved) setA({ ...EMPTY, ...JSON.parse(saved) });
    } catch {
      /* storage unavailable or corrupt: start empty */
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(a));
    } catch {
      /* storage unavailable */
    }
  }, [a]);

  // Focus the question whenever the step changes (not on first load).
  useEffect(() => {
    if (!moved.current) return;
    headingRef.current?.focus();
  }, [step]);

  const set = <K extends keyof Answers>(k: K, v: Answers[K]) => {
    setA((prev) => ({ ...prev, [k]: v }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };
  const toggleTool = (k: string) => set("tools", a.tools.includes(k) ? a.tools.filter((t) => t !== k) : [...a.tools, k]);

  const go = (next: number) => {
    moved.current = true;
    setErrors({});
    setStatus("idle");
    setStep(next);
  };

  const toolsText = (l: Lang) => {
    const names = a.tools.map((t) => labelOf(F.tools.options, t, l)).join(", ");
    return namesTool(a.tools) && a.toolsOther.trim() ? `${names} (${a.toolsOther.trim()})` : names;
  };

  const send = async () => {
    setStatus("sending");
    const body = new URLSearchParams({
      "form-name": FORM_NAME,
      "bot-field": bot,
      project_type: labelOf(F.type.options, a.type, "en"),
      current_process: a.current.trim(),
      pain_point: a.pain.trim(),
      tools: a.tools.map((t) => labelOf(F.tools.options, t, "en")).join(", "),
      tools_other: namesTool(a.tools) ? a.toolsOther.trim() : "",
      team_size: labelOf(F.team.options, a.team, "en"),
      urgency: labelOf(F.urgency.options, a.urgency, "en"),
      budget: labelOf(F.budget.options, a.budget, "en"),
      name: a.name.trim(),
      company: a.company.trim(),
      email: a.email.trim(),
      phone: a.phone.trim(),
      language: lang,
    });
    try {
      // Netlify Forms only exists on Netlify; the dev server answers any POST
      // with 200, which would fake a successful send.
      if (import.meta.env.DEV) throw new Error("Netlify Forms is not available in development");
      const res = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: body.toString() });
      if (!res.ok) throw new Error(String(res.status));
      track("Send Project", { type: a.type });
      try {
        sessionStorage.removeItem(DRAFT_KEY);
      } catch {
        /* storage unavailable */
      }
      onSent();
    } catch {
      setStatus("error");
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    if (step === REVIEW) {
      void send();
      return;
    }
    const errs = validate(step, a, lang);
    if (Object.keys(errs).length) {
      setErrors(errs);
      // Move focus to the first field that needs attention (after it renders as invalid).
      setFocusField({ name: Object.keys(errs)[0] });
      return;
    }
    go(step + 1);
  };

  /** Props for a text field answering question `id` (its heading labels it). */
  const textProps = (k: keyof Answers, q: string, help = true) => ({
    id: `f-${k}`,
    name: k,
    value: a[k] as string,
    "aria-labelledby": `${q}-title`,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": [help && `${q}-help`, errors[k] && `${q}-error`].filter(Boolean).join(" ") || undefined,
  });

  /** Props for a labelled input in the contact step. */
  const inputProps = (k: keyof Answers) => ({
    id: `f-${k}`,
    name: k,
    value: a[k] as string,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `f-${k}-error` : undefined,
    onChange: (e: { target: { value: string } }) => set(k, e.target.value as Answers[typeof k]),
  });
  const fieldError = (k: keyof Answers) =>
    errors[k] && (
      <p id={`f-${k}-error`} className="field-error" role="alert">
        {errors[k]}
      </p>
    );

  const reviewing = step === REVIEW;

  return (
    <form ref={formRef} className="pform" onSubmit={onSubmit} noValidate>
      <div className="pform__progress">
        <p className="pform__count" aria-live="polite">
          {reviewing ? F.nav.reviewStep[lang] : `${F.nav.step[lang]} ${step + 1} ${F.nav.of[lang]} ${TOTAL}`}
        </p>
        <ol className="pform__bar" aria-hidden="true">
          {Array.from({ length: TOTAL }, (_, i) => (
            <li key={i} data-done={i < step ? "" : undefined} data-current={i === step ? "" : undefined} />
          ))}
        </ol>
      </div>

      {/* Honeypot: invisible to people, tempting to bots. */}
      <p className="sr-only" aria-hidden="true">
        <label>
          Leave this empty
          <input name="bot-field" tabIndex={-1} autoComplete="off" value={bot} onChange={(e) => setBot(e.target.value)} />
        </label>
      </p>

      <div className="pform__step" key={step}>
        {step === 0 && (
          <Question id="q-type" group title={F.type.title[lang]} help={F.type.help[lang]} error={errors.type} headingRef={headingRef}>
            <Choices name="type" options={F.type.options} value={a.type} onChange={(v) => set("type", v)} lang={lang} error={errors.type} />
            <Note show={a.type === "not-sure"}>{F.type.notSure[lang]}</Note>
          </Question>
        )}

        {step === 1 && (
          <>
            <Question id="q-current" title={F.current.title[lang]} help={F.current.help[lang]} error={errors.current} headingRef={headingRef}>
              <textarea {...textProps("current", "q-current")} rows={6} placeholder={F.current.placeholder[lang]} onChange={(e) => set("current", e.target.value)} />
              <div className="fhints">
                <p>{F.current.hintsLabel[lang]}</p>
                <ul>
                  {F.current.hints.map((h) => (
                    <li key={h.en}>{h[lang]}</li>
                  ))}
                </ul>
              </div>
            </Question>
            <Question id="q-pain" title={F.pain.title[lang]} help={F.pain.help[lang]} error={errors.pain}>
              <textarea {...textProps("pain", "q-pain")} rows={4} placeholder={F.pain.placeholder[lang]} onChange={(e) => set("pain", e.target.value)} />
            </Question>
          </>
        )}

        {step === 2 && (
          <>
            <Question id="q-tools" group title={F.tools.title[lang]} help={F.tools.help[lang]} error={errors.tools} headingRef={headingRef}>
              <Choices name="tools" multiple options={F.tools.options} value={a.tools} onChange={toggleTool} lang={lang} error={errors.tools} />
              {namesTool(a.tools) && (
                <div className="field">
                  <label htmlFor="f-toolsOther" className="field__label">
                    {F.tools.which[lang]} <span className="field__opt">— {F.contact.optional[lang]}</span>
                  </label>
                  <input {...inputProps("toolsOther")} type="text" placeholder={F.tools.whichPlaceholder[lang]} />
                </div>
              )}
            </Question>
            <Question id="q-team" group title={F.team.title[lang]} help={F.team.help[lang]} error={errors.team}>
              <Choices name="team" options={F.team.options} value={a.team} onChange={(v) => set("team", v)} lang={lang} error={errors.team} />
            </Question>
          </>
        )}

        {step === 3 && (
          <>
            <Question id="q-urgency" group title={F.urgency.title[lang]} help={F.urgency.help[lang]} error={errors.urgency} headingRef={headingRef}>
              <Choices name="urgency" options={F.urgency.options} value={a.urgency} onChange={(v) => set("urgency", v)} lang={lang} error={errors.urgency} />
            </Question>
            <Question id="q-budget" group title={F.budget.title[lang]} help={F.budget.help[lang]} error={errors.budget}>
              <Choices name="budget" options={F.budget.options} value={a.budget} onChange={(v) => set("budget", v)} lang={lang} error={errors.budget} />
              <Note show={a.budget === "guidance"}>{F.budget.guidance[lang]}</Note>
            </Question>
          </>
        )}

        {step === 4 && (
          <Question id="q-contact" title={F.contact.title[lang]} help={F.contact.help[lang]} headingRef={headingRef}>
            <div className="fields">
              <div className="field">
                <label htmlFor="f-name" className="field__label">
                  {F.contact.name[lang]}
                </label>
                <input {...inputProps("name")} type="text" autoComplete="name" placeholder={F.contact.namePlaceholder[lang]} />
                {fieldError("name")}
              </div>
              <div className="field">
                <label htmlFor="f-company" className="field__label">
                  {F.contact.company[lang]} <span className="field__opt">— {F.contact.optional[lang]}</span>
                </label>
                <input {...inputProps("company")} type="text" autoComplete="organization" placeholder={F.contact.companyPlaceholder[lang]} />
              </div>
              <div className="field">
                <label htmlFor="f-email" className="field__label">
                  {F.contact.email[lang]}
                </label>
                <input {...inputProps("email")} type="email" autoComplete="email" inputMode="email" autoCapitalize="off" spellCheck={false} placeholder={F.contact.emailPlaceholder[lang]} />
                {fieldError("email")}
              </div>
              <div className="field">
                <label htmlFor="f-phone" className="field__label">
                  {F.contact.phone[lang]}
                </label>
                <input {...inputProps("phone")} type="tel" autoComplete="tel" inputMode="tel" placeholder={F.contact.phonePlaceholder[lang]} />
                {fieldError("phone")}
              </div>
            </div>
            <p className="field__help">{F.contact.privacy[lang]}</p>
          </Question>
        )}

        {reviewing && (
          <div className="fstep freview">
            <h2 ref={headingRef} tabIndex={-1} className="fstep__title">
              {F.review.title[lang]}
            </h2>
            <p className="fstep__help">{F.review.help[lang]}</p>
            <FormSummary
              lang={lang}
              rows={[
                { key: "type", value: labelOf(F.type.options, a.type, lang) },
                { key: "pain", value: a.pain.trim() },
                { key: "current", value: a.current.trim() },
                { key: "tools", value: toolsText(lang) },
                { key: "team", value: labelOf(F.team.options, a.team, lang) },
                { key: "urgency", value: labelOf(F.urgency.options, a.urgency, lang) },
                { key: "budget", value: labelOf(F.budget.options, a.budget, lang) },
                { key: "contact", value: [a.name, a.company, a.email, a.phone].map((v) => v.trim()).filter(Boolean).join(" · ") },
              ]}
            />
            {status === "error" && (
              <p className="field-error" role="alert">
                {F.errors.send[lang]} <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
              </p>
            )}
          </div>
        )}
      </div>

      <div className="pform__nav">
        {reviewing ? (
          <>
            <button type="button" className="btn btn--line" onClick={() => go(0)}>
              {F.review.edit[lang]}
            </button>
            <button type="submit" className="btn btn--solid" disabled={status === "sending"} aria-busy={status === "sending" || undefined}>
              {status === "sending" ? F.review.sending[lang] : F.review.send[lang]} <span aria-hidden="true">→</span>
            </button>
          </>
        ) : (
          <>
            {step > 0 && (
              <button type="button" className="btn btn--line" onClick={() => go(step - 1)}>
                <span aria-hidden="true">←</span> {F.nav.back[lang]}
              </button>
            )}
            <button type="submit" className="btn btn--solid">
              {step === TOTAL - 1 ? F.nav.review[lang] : F.nav.next[lang]} <span aria-hidden="true">→</span>
            </button>
          </>
        )}
      </div>
    </form>
  );
}
