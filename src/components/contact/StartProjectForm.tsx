import { useEffect, useRef, useState, type FormEvent } from "react";
import { CONTACT, type Lang } from "@/data/content";
import { STEPS_FORM as F, type Option } from "@/data/start";
import { track } from "@/lib/analytics";
import FormSummary from "./FormSummary";
import ProjectFormStep from "./ProjectFormStep";

// Five steps, one question each: what, how today, the problem, who, review.
// Submitted to Netlify Forms (the static twin of this form lives in
// start-a-project.astro so Netlify registers its fields at build time).
// Answers are kept in sessionStorage so a reload doesn't lose a long answer;
// they are cleared once sent.

const FORM_NAME = "start-project"; // must match the static form in start-a-project.astro
const TOTAL = 5;
const DRAFT_KEY = "mael.start-project";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface Answers {
  type: string;
  current: string;
  problem: string;
  name: string;
  company: string;
  email: string;
  budget: string;
}
type Errors = Partial<Record<keyof Answers, string>>;

const EMPTY: Answers = { type: "", current: "", problem: "", name: "", company: "", email: "", budget: "" };
const pad = (n: number) => String(n).padStart(2, "0");
const labelOf = (options: Option[], key: string, lang: Lang) => options.find((o) => o.key === key)?.label[lang] ?? "";

function validate(step: number, a: Answers, lang: Lang): Errors {
  const e: Errors = {};
  if (step === 0 && !a.type) e.type = F.errors.choose[lang];
  if (step === 1 && !a.current) e.current = F.errors.choose[lang];
  if (step === 2 && a.problem.trim().length < 20) e.problem = F.errors.problem[lang];
  if (step === 3) {
    if (!a.name.trim()) e.name = F.errors.name[lang];
    if (!EMAIL_RE.test(a.email.trim())) e.email = F.errors.email[lang];
  }
  return e;
}

function Choices({ name, options, value, onChange, lang, invalid }: { name: keyof Answers; options: Option[]; value: string; onChange: (v: string) => void; lang: Lang; invalid: boolean }) {
  return (
    <div className="options">
      {options.map((o) => (
        <label key={o.key} className="option">
          <input type="radio" name={name} value={o.key} checked={value === o.key} onChange={() => onChange(o.key)} aria-invalid={invalid || undefined} />
          <span>{o.label[lang]}</span>
        </label>
      ))}
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

  const go = (next: number) => {
    moved.current = true;
    setErrors({});
    setStatus("idle");
    setStep(next);
  };

  const send = async () => {
    setStatus("sending");
    const body = new URLSearchParams({
      "form-name": FORM_NAME,
      "bot-field": bot,
      project_type: labelOf(F.type.options, a.type, "en"),
      current_process: labelOf(F.current.options, a.current, "en"),
      problem: a.problem.trim(),
      name: a.name.trim(),
      company: a.company.trim(),
      email: a.email.trim(),
      budget: labelOf(F.about.budgets, a.budget, "en"),
      language: lang,
    });
    try {
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
    if (step === TOTAL - 1) {
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

  const fieldProps = (k: keyof Answers) => ({
    id: `f-${k}`,
    name: k,
    value: a[k],
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `f-${k}-error` : undefined,
  });

  return (
    <form ref={formRef} className="pform" onSubmit={onSubmit} noValidate>
      <div className="pform__progress">
        <p className="pform__count">
          <span className="sr-only">
            {F.nav.step[lang]} {step + 1} {F.nav.of[lang]} {TOTAL}:{" "}
          </span>
          <span aria-hidden="true">
            {pad(step + 1)} / {pad(TOTAL)}
          </span>
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
          <ProjectFormStep id="s-type" title={F.type.title[lang]} help={F.type.help[lang]} error={errors.type} headingRef={headingRef}>
            <Choices name="type" options={F.type.options} value={a.type} onChange={(v) => set("type", v)} lang={lang} invalid={!!errors.type} />
          </ProjectFormStep>
        )}

        {step === 1 && (
          <ProjectFormStep id="s-current" title={F.current.title[lang]} help={F.current.help[lang]} error={errors.current} headingRef={headingRef}>
            <Choices name="current" options={F.current.options} value={a.current} onChange={(v) => set("current", v)} lang={lang} invalid={!!errors.current} />
          </ProjectFormStep>
        )}

        {step === 2 && (
          <ProjectFormStep id="s-problem" title={F.problem.title[lang]} help={F.problem.help[lang]} headingRef={headingRef}>
            <div className="field">
              <label htmlFor="f-problem" className="field__label">
                {F.problem.label[lang]}
              </label>
              <textarea {...fieldProps("problem")} rows={7} placeholder={F.problem.placeholder[lang]} onChange={(e) => set("problem", e.target.value)} />
              {errors.problem && (
                <p id="f-problem-error" className="field-error" role="alert">
                  {errors.problem}
                </p>
              )}
            </div>
          </ProjectFormStep>
        )}

        {step === 3 && (
          <ProjectFormStep id="s-about" title={F.about.title[lang]} headingRef={headingRef}>
            <div className="fields">
              <div className="field">
                <label htmlFor="f-name" className="field__label">
                  {F.about.name[lang]}
                </label>
                <input {...fieldProps("name")} type="text" autoComplete="name" onChange={(e) => set("name", e.target.value)} />
                {errors.name && (
                  <p id="f-name-error" className="field-error" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="field">
                <label htmlFor="f-company" className="field__label">
                  {F.about.company[lang]} <span className="field__opt">— {F.about.optional[lang]}</span>
                </label>
                <input {...fieldProps("company")} type="text" autoComplete="organization" onChange={(e) => set("company", e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="f-email" className="field__label">
                  {F.about.email[lang]}
                </label>
                <input {...fieldProps("email")} type="email" autoComplete="email" inputMode="email" onChange={(e) => set("email", e.target.value)} />
                {errors.email && (
                  <p id="f-email-error" className="field-error" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="field">
                <label htmlFor="f-budget" className="field__label">
                  {F.about.budget[lang]} <span className="field__opt">— {F.about.optional[lang]}</span>
                </label>
                <select {...fieldProps("budget")} aria-describedby="f-budget-help" onChange={(e) => set("budget", e.target.value)}>
                  <option value="">—</option>
                  {F.about.budgets.map((b) => (
                    <option key={b.key} value={b.key}>
                      {b.label[lang]}
                    </option>
                  ))}
                </select>
                <p id="f-budget-help" className="field__help">
                  {F.about.budgetHelp[lang]}
                </p>
              </div>
            </div>
          </ProjectFormStep>
        )}

        {step === 4 && (
          <div className="fstep">
            <h2 ref={headingRef} tabIndex={-1} className="fstep__title">
              {F.review.title[lang]}
            </h2>
            <p className="fstep__help">{F.review.help[lang]}</p>
            <FormSummary
              lang={lang}
              rows={[
                { key: "type", value: labelOf(F.type.options, a.type, lang) },
                { key: "current", value: labelOf(F.current.options, a.current, lang) },
                { key: "problem", value: a.problem.trim() },
                { key: "name", value: a.name.trim() },
                { key: "company", value: a.company.trim() },
                { key: "email", value: a.email.trim() },
                { key: "budget", value: labelOf(F.about.budgets, a.budget, lang) },
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
        {step === TOTAL - 1 ? (
          <>
            <button type="submit" className="btn btn--solid" disabled={status === "sending"} aria-busy={status === "sending" || undefined}>
              {status === "sending" ? F.review.sending[lang] : F.review.send[lang]} <span aria-hidden="true">→</span>
            </button>
            <button type="button" className="btn btn--line" onClick={() => go(0)}>
              {F.review.edit[lang]}
            </button>
          </>
        ) : (
          <>
            <button type="submit" className="btn btn--solid">
              {F.nav.next[lang]} <span aria-hidden="true">→</span>
            </button>
            {step > 0 && (
              <button type="button" className="btn btn--ghost" onClick={() => go(step - 1)}>
                <span aria-hidden="true">←</span> {F.nav.back[lang]}
              </button>
            )}
          </>
        )}
      </div>
    </form>
  );
}
