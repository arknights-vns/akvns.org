import { blog } from "@/db/schema";
import { createCoercedSelectSchema } from "@/schema/zod-coerced";

/**
 * Data for a blog, extracted from `blog` table by `drizzle-zod`.
 */
export const BlogSchema = createCoercedSelectSchema(blog);
