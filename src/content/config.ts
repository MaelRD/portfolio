import { defineCollection, z } from "astro:content";

// Projects shown on the home page (Featured projects). Every piece of copy is
// bilingual; strings that read the same in both languages (product names,
// technologies) can be written once.

const bi = z.object({ en: z.string(), es: z.string() });
const text = z.union([z.string(), bi]);

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
    role: bi.optional(),
    /** What kind of evidence this is, so demos never read as client work. */
    kind: z.enum(["demo", "personal", "professional"]).default("demo"),
    featured: z.boolean().default(false),
    stack: z.array(z.string()),
    /** Folder under assets/projects (and public/projects) holding this project's screenshots. */
    assets: z.string().optional(),
    /** Screenshots by name (desktop, mobile, dashboard, detail…), first is the main one. See `npm run images`. */
    images: z.array(z.object({ name: z.string(), alt: bi })).default([]),
    /** How the home page shows the project: a laptop that opens on scroll, a tilting window, or a window with a small pipeline. */
    showcase: z.enum(["laptop", "tilt", "pipeline", "tool"]).default("tool"),
    /** The few steps the pipeline showcase draws (e.g. Excel → App → API → ERP). */
    pipeline: z.array(text).optional(),
    links: z.object({
      /** Label of the call to action. */
      cta: bi,
      repo: z.string().url().optional(),
      /** Deployed demo: the call to action opens it. */
      live: z.string().url().optional(),
    }),
  }),
});

export const collections = { projects };
