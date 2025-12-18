import { z } from "zod";

export const BlogSchema = z.object({
    id: z.number(),
    slug: z.string(),
    title: z.string(),
    author: z.string(),
    shortBriefing: z.string(),
    updatedAt: z.iso.datetime(),
});
