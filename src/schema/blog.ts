import { blog } from "@/db/schema";
import { createCoercedDateSelectSchema } from "@/schema/date-coercion";

/**
 * Data for a blog, extracted from `blog` table by `drizzle-zod`.
 */
export const BlogSchema = createCoercedDateSelectSchema(blog);
