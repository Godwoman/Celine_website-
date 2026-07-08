// This file defines the "shape" (schema) for each Content Collection.
// Every Markdown file inside a collection's folder must match its schema,
// or Astro will show an error when the site builds.

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// BLOG COLLECTION
// This was already set up by the starter template — kept as-is.
// Reads all Markdown/MDX files inside src/content/blog/
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(), // Post title
      description: z.string(), // Short summary shown in previews
      pubDate: z.coerce.date(), // Publish date (auto-converts string to a real Date)
      updatedDate: z.coerce.date().optional(), // Optional: last updated date
      heroImage: image().optional(), // Optional: featured image, auto-optimized by Astro
    }),
});

// PROFESSIONAL CASE STUDIES COLLECTION
// Case studies from work done for companies/employers.
// Reads all Markdown/MDX files inside src/content/professional-case-studies/
const professionalCaseStudies = defineCollection({
  loader: glob({ base: './src/content/professional-case-studies', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(), // Case study title
    company: z.string(), // Company/employer name
    role: z.string(), // Celine's role on the project
    timeframe: z.string(), // e.g. "2023–2024"
    outcome: z.string(), // Short outcome/result summary
    tags: z.array(z.string()).optional(), // Optional list of tags for filtering
    ndaRedacted: z.boolean().default(false), // Flags if details were anonymized for confidentiality
  }),
});

// INDEPENDENT CASE STUDIES COLLECTION
// Self-initiated projects, framed as a question/hypothesis rather than an employer outcome.
// Reads all Markdown/MDX files inside src/content/independent-case-studies/
const independentCaseStudies = defineCollection({
  loader: glob({ base: './src/content/independent-case-studies', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(), // Project title
    question: z.string(), // The question/hypothesis that started the project
    status: z.enum(['ongoing', 'complete']), // Whether the project is still in progress
    tags: z.array(z.string()).optional(), // Optional list of tags for filtering
  }),
});

// Export all collections so Astro knows about them.
// The keys here ("blog", "professional-case-studies", "independent-case-studies")
// must match the actual folder names inside src/content/
export const collections = {
  blog,
  'professional-case-studies': professionalCaseStudies,
  'independent-case-studies': independentCaseStudies,
};