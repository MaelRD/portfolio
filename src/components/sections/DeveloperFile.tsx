import { useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { CONTACT, CV_FILENAME, CV_PATH, type Lang } from "@/data/content";
import { ORGS } from "@/data/space";
import { CAREER_START, DEV_FILE as T, STACK_V2 } from "@/data/v2";
import { useEntrance } from "@/lib/motion";
import { TiltCard } from "../kit";

// The professional story as a small editor with three tabs:
// - developer.ts: who I am, where I work, what I use now;
// - skills.ts:    every technology on the page, by the layer it works in;
// - terminal:     a build → test → run flow, clearly labelled as an
//                 illustration (nothing runs, no timings or results).
// Every value comes from the same data the rest of the page uses (current
// role, Skills groups, studies), so the editor can't drift from it.
//
// It's real text in a <pre>, readable and copyable without any animation.
// The first file types in when it scrolls into view (useEntrance); another
// tab types in once when chosen. Tabs follow the ARIA tabs pattern (arrows,
// Home, End).

const current = ORGS[0].roles.find((r) => r.current) ?? ORGS[0].roles[0];
const since = `${CAREER_START.getFullYear()}-${String(CAREER_START.getMonth() + 1).padStart(2, "0")}`;

const S = ({ children }: { children: ReactNode }) => <span className="df__str">{children}</span>;
const K = ({ children }: { children: ReactNode }) => <span className="df__key">{children}</span>;
const C = ({ children }: { children: ReactNode }) => <span className="df__com">{children}</span>;
const list = (items: string[]) => (
  <>
    [
    {items.map((it, i) => (
      <span key={it}>
        <S>"{it}"</S>
        {i < items.length - 1 ? ", " : ""}
      </span>
    ))}
    ]
  </>
);
const caret = <span className="df__caret" aria-hidden="true" />;

const FILES = ["developer.ts", "skills.ts", "terminal"] as const;
type File = (typeof FILES)[number];

function lines(file: File, lang: Lang): ReactNode[] {
  if (file === "skills.ts")
    return [
      <C>// {T.skillsComment[lang]}</C>,
      <>
        <span className="df__kw">export const</span> skills = {"{"}
      </>,
      ...STACK_V2.groups.map((g) => (
        <>
          {"  "}
          <K>{g.key}</K>: {list(g.items)},
        </>
      )),
      <>
        {"};"}
        {caret}
      </>,
    ];
  if (file === "terminal")
    return [
      <C># {T.termNote[lang]}</C>,
      ...T.term.flatMap(([cmd, out]) => [
        <>
          <span className="df__prompt">$</span> {cmd}
        </>,
        <span className="df__ok">
          {"  "}✓ {out[lang]}
        </span>,
      ]),
      <>
        <span className="df__prompt">$</span> {caret}
      </>,
    ];
  return [
    <C>// {T.comment[lang]}</C>,
    <>
      <span className="df__kw">export const</span> developer = {"{"}
    </>,
    <>
      {"  "}<K>name</K>: <S>"Mario Yael Gordillo García"</S>,
    </>,
    <>
      {"  "}<K>role</K>: <S>"{current.title[lang]}"</S>,
    </>,
    <>
      {"  "}<K>company</K>: <S>"{ORGS[0].name}"</S>,
    </>,
    <>
      {"  "}<K>since</K>: <S>"{since}"</S>, <C>// {T.since[lang]}</C>
    </>,
    <>
      {"  "}<K>focus</K>: {list(T.focus.map((f) => f[lang]))},
    </>,
    <>
      {"  "}<K>stack</K>: {list(current.stack)},
    </>,
    <>
      {"  "}<K>architecture</K>: {list(T.architecture)},
    </>,
    <>
      {"  "}<K>studies</K>: <S>"{T.studies[lang]}"</S>,
    </>,
    <>
      {"  "}<K>openTo</K>: {list(T.openTo.map((o) => o[lang]))},
    </>,
    <>
      {"};"}
      {caret}
    </>,
  ];
}

export default function DeveloperFile({ lang }: { lang: Lang }) {
  const [ref, state] = useEntrance<HTMLDivElement>();
  const [tab, setTab] = useState<File>("developer.ts");
  const [touched, setTouched] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const choose = (i: number) => {
    setTab(FILES[i]);
    setTouched(true);
  };
  const onKey = (e: KeyboardEvent, i: number) => {
    const n = FILES.length;
    const next = e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowLeft" ? (i - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : null;
    if (next === null) return;
    e.preventDefault();
    choose(next);
    tabs.current[next]?.focus();
  };

  return (
    <TiltCard className="df-card" max={6}>
      <figure className="df spotlight" ref={ref}>
        <div className="df__bar">
          <span className="bm__dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <div className="df__tabs" role="tablist" aria-label={T.label[lang]}>
            {FILES.map((f, i) => (
              <button
                key={f}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`df-tab-${i}`}
                aria-selected={tab === f}
                aria-controls="df-panel"
                tabIndex={tab === f ? 0 : -1}
                className="df__tab"
                data-term={f === "terminal" ? "" : undefined}
                onClick={() => choose(i)}
                onKeyDown={(e) => onKey(e, i)}
              >
                {f === "terminal" ? T.termTab[lang] : f}
              </button>
            ))}
          </div>
        </div>
        {tab === "terminal" && <p className="df__notice">{T.termNotice[lang]}</p>}
        <pre
          key={tab}
          id="df-panel"
          role="tabpanel"
          aria-labelledby={`df-tab-${FILES.indexOf(tab)}`}
          className="df__code"
          data-state={touched ? undefined : state}
          data-anim={touched ? "" : undefined}
          data-term={tab === "terminal" ? "" : undefined}
          tabIndex={0}
        >
          <code>
            {lines(tab, lang).map((l, i) => (
              <span key={i} className="df__line" style={{ ["--k" as string]: i } as CSSProperties}>
                <span className="df__n" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="df__src">{l}</span>
                {"\n"}
              </span>
            ))}
          </code>
        </pre>
        <figcaption className="df__links">
          <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" data-track="GitHub" data-track-label="developer-file">
            GitHub ↗
          </a>
          <a href={CV_PATH} download={CV_FILENAME} data-track="Download Resume" data-track-label="developer-file">
            {T.cv[lang]} ↓
          </a>
        </figcaption>
      </figure>
    </TiltCard>
  );
}
