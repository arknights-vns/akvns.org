import { RedisDrizzleCache } from "@databuddy/cache";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "@/db/schema";
import { redis } from "@/lib/redis";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const cache = new RedisDrizzleCache({
    redis,
    defaultTtl: 600,
    strategy: "all",
    namespace: "akvns:cache",
});

export const drizzleDb = drizzle({ client: pool, schema, cache });
