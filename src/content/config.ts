import { defineCollection, z } from "astro:content";

// Projects and their case studies. Every piece of copy is bilingual; strings
// that read the same in both languages (product names, technologies) can be
// written once.

const bi = z.object({ en: z.string(), es: z.string() });
const text = z.union([z.string(), bi]);

/** One box in a diagram. `accent` marks the system the diagram is about. */
const node = z.object({ label: text, sub: text.optional(), accent: z.boolean().optional() });

/**
 * A left-to-right (or top-to-bottom) flow: each stage holds one or more nodes;
 * a stage with several nodes is drawn as one group (they converge or fan out
 * together). `links[i]` is the connection after stage i: "one" way or "two" way.
 */
const flow = z.object({
  stages: z.array(z.array(node).min(1)).min(2),
  links: z.array(z.enum(["one", "two"])).optional(),
  direction: z.enum(["horizontal", "vertical", "responsive"]).default("responsive"),
  label: bi,
});

/** Business rules as inputs → derived values, in the order they are computed. */
const ruleFlow = z.object({
  inputsLabel: bi,
  inputs: z.array(text),
  steps: z.array(z.object({ label: text, from: text })),
  label: bi,
});

const section = z.object({
  /** Narrative heading: an idea, not a label. */
  title: bi,
  paragraphs: z.array(bi).default([]),
  list: z.array(bi).optional(),
  /** Question → answer pairs (engineering decisions). */
  pairs: z.array(z.object({ q: bi, a: bi })).optional(),
  flow: flow.optional(),
  rules: ruleFlow.optional(),
  /** Technologies grouped by responsibility. */
  groups: z.array(z.object({ name: bi, items: z.array(z.string()) })).optional(),
  quote: bi.optional(),
});

const projects = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    order: z.number(),
    subtitle: bi,
    summary: bi,
    problem: bi,
    solution: bi,
    category: bi,
    status: bi,
    year: z.string().optional(),
    /** Shown before the status on the project card ("2026 · In development"). */
    statusPrefix: text.optional(),
    role: bi.optional(),
    featured: z.boolean().default(false),
    stack: z.array(z.string()),
    capabilities: z.array(z.string()).default([]),
    cover: z.string().optional(),
    /** Folder under assets/projects (and public/projects) holding this project's screenshots. */
    assets: z.string().optional(),
    /** Screenshots by name (desktop, mobile, dashboard, detail…), first is the main one. See `npm run images`. */
    images: z.array(z.object({ name: z.string(), alt: bi })).default([]),
    /** How the home page shows the project: a laptop that opens on scroll, a tilting window, or a window with a small pipeline. */
    showcase: z.enum(["laptop", "tilt", "pipeline", "tool"]).default("tool"),
    /** The few steps the pipeline showcase draws (e.g. Excel → GBS → API → ERP). */
    pipeline: z.array(text).optional(),
    links: z.object({
      /** Label of the call to action that opens the case study. */
      cta: bi,
      repo: z.string().url().optional(),
      /** Deployed demo. Without a case study, the call to action opens it. */
      live: z.string().url().optional(),
    }),
    /** The diagram shown on the project card. */
    diagram: z.object({ flow, layers: z.array(z.string()).optional() }),
    caseStudy: z
      .object({
        /** Shown when the project is still a concept, so nothing reads as finished. */
        notice: bi.optional(),
        context: section.optional(),
        problem: section.optional(),
        previousWorkflow: section.optional(),
        requirements: section.optional(),
        solution: section.optional(),
        businessLogic: section.optional(),
        ux: section.optional(),
        architecture: section.optional(),
        engineeringDecisions: section.optional(),
        stack: section.optional(),
        challenges: section.optional(),
        outcome: section.optional(),
        nextEvolution: section.optional(),
      })
      .optional(),
  }),
});

export const collections = { projects };
