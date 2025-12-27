import { SQL } from "bun";
import { drizzle } from "drizzle-orm/bun-sql";

import * as schema from "@/db/schema";

export const drizzleDb = drizzle({
    client: new SQL(process.env.DATABASE_URL as string),
    schema,
});
