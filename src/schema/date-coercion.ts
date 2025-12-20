import { createSchemaFactory } from "drizzle-zod";

/**
 * Same as createSelectSchema, but the Date is coerced.
 *
 * I want Temporal API so bad.
 */
const { createSelectSchema } = createSchemaFactory({
    coerce: {
        date: true,
    },
});

export { createSelectSchema as createCoercedDateSelectSchema };
