import { RedisDrizzleCache } from "@databuddy/cache";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// biome-ignore lint/performance/noNamespaceImport: I have to
import * as vnsSchema from "@/db/schema/vns-schema";
import { serverEnv } from "@/env/server";
import { redisClient } from "@/lib/redis";

const cache = new RedisDrizzleCache({
  redis: redisClient,
  defaultTtl: 360,
  namespace: "drizzle:cache",
  strategy: "all",
});

const client = new Pool({
  connectionString: serverEnv.DATABASE_URL,
});

export const drizzleDb = drizzle({
  client,
  schema: {
    ...vnsSchema,
  },
  cache,
});
