// Sections that can pre-fill the contact form (Solutions' "Let's talk about
// this") dispatch this event; ContactForm listens. `need` is the index of the
// option in CONTACT_FORM.needs.
export const PREFILL_EVENT = "mael:prefill";
export type Prefill = { need: number; message: string };
