import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
    }),
});

const professionalCaseStudies = defineCollection({
  loader: glob({ base: './src/content/professional-case-studies', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    company: z.string(),
    role: z.string(),
    timeframe: z.string(),
    outcome: z.string(),
    tags: z.array(z.string()).optional(),
    ndaRedacted: z.boolean().default(false),
  }),
});

const independentCaseStudies = defineCollection({
  loader: glob({ base: './src/content/independent-case-studies', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    question: z.string(),
    status: z.enum(['ongoing', 'complete']),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  blog,
  'professional-case-studies': professionalCaseStudies,
  'independent-case-studies': independentCaseStudies,
};
