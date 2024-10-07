import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(1),
  description: z.string().max(200),
  image: z.string().min(1),
  body: z.string().min(1),
  publishedAt: z.date(),
});

export const updateBlogSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  body: z.string().optional(),
  publishedAt: z.date().optional(),
  image: z.string().optional(),
});
