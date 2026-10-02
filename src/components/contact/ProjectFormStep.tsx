import type { ReactNode, RefObject } from "react";

// One question of the project form. A choice group is a fieldset whose legend
// is the question; a text answer is a block whose heading labels the field
// (the field points at it with aria-labelledby={`${id}-title`}). The first
// question of a step is an h2 that takes focus when the step appears, so
// keyboard and screen-reader users start at the question, not at the top of
// the page. The error sits right under the answer.

export default function Question({
  id,
  title,
  help,
  error,
  headingRef,
  group = false,
  children,
}: {
  id: string;
  title: string;
  help?: string;
  error?: string;
  /** Only the step's first question: it becomes the h2 that receives focus. */
  headingRef?: RefObject<HTMLHeadingElement>;
  /** A set of radios or checkboxes, rather than one text field. */
  group?: boolean;
  children: ReactNode;
}) {
  const Heading = headingRef ? "h2" : "h3";
  const heading = (
    <Heading ref={headingRef} id={`${id}-title`} tabIndex={headingRef ? -1 : undefined} className={`fstep__title${headingRef ? "" : " fstep__title--sub"}`}>
      {title}
    </Heading>
  );
  const helpEl = help && (
    <p id={`${id}-help`} className="fstep__help">
      {help}
    </p>
  );
  const errorEl = error && (
    <p id={`${id}-error`} className="field-error" role="alert">
      {error}
    </p>
  );

  if (group) {
    const describedBy = [help && `${id}-help`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
    return (
      <fieldset className="fstep" aria-describedby={describedBy}>
        <legend className="fstep__legend">{heading}</legend>
        {helpEl}
        {children}
        {errorEl}
      </fieldset>
    );
  }
  return (
    <div className="fstep">
      {heading}
      {helpEl}
      {children}
      {errorEl}
    </div>
  );
}
