import { createSelectSchema } from "drizzle-zod";

import { blog } from "@/db/schema";

/**
 * Data for a blog, extracted from `blog` table by `drizzle-zod`.
 */
export const BlogSchema = createSelectSchema(blog);
