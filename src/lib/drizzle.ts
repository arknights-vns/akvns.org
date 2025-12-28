import { RedisDrizzleCache } from "@databuddy/cache";
import { SQL } from "bun";
import { drizzle } from "drizzle-orm/bun-sql";

import * as schema from "@/db/schema";
import { redis } from "@/lib/redis";

const cache = new RedisDrizzleCache({
    redis: redis,
    defaultTtl: 600,
    namespace: "drizzle:cache",
    strategy: "all",
});

export const drizzleDb = drizzle({
    client: new SQL(process.env.DATABASE_URL as string),
    schema,
    cache,
});
