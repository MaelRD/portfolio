import type { CollectionEntry } from "astro:content";

/** A project as stored in src/content/projects (validated by the collection schema). */
export type Project = CollectionEntry<"projects">["data"];

export const caseStudyPath = (slug: string) => `/work/${slug}`;
