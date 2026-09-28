import type { ReactNode, RefObject } from "react";

// One step of the project form: a fieldset whose legend is the step's
// question. The heading takes focus when the step appears, so keyboard and
// screen-reader users start at the question, not at the top of the page.

export default function ProjectFormStep({
  id,
  title,
  help,
  error,
  headingRef,
  children,
}: {
  id: string;
  title: string;
  help?: string;
  error?: string;
  headingRef: RefObject<HTMLHeadingElement>;
  children: ReactNode;
}) {
  const describedBy = [help && `${id}-help`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <fieldset className="fstep" aria-describedby={describedBy}>
      <legend className="fstep__legend">
        <h2 ref={headingRef} tabIndex={-1} className="fstep__title">
          {title}
        </h2>
      </legend>
      {help && (
        <p id={`${id}-help`} className="fstep__help">
          {help}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className="field-error" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}
