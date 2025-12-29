import { RedisDrizzleCache } from "@databuddy/cache";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "@/db/schema";
import { redisClient } from "@/lib/redis";

const cache = new RedisDrizzleCache({
    redis: redisClient,
    defaultTtl: 600,
    namespace: "drizzle:cache",
    strategy: "all",
});

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export const drizzleDb = drizzle({
    client: pool,
    schema,
    cache,
});
