import { RedisDrizzleCache } from "@databuddy/cache";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
// biome-ignore lint/performance/noNamespaceImport: I have to
import * as vnsSchema from "@/db/schema/vns-schema";
import { serverEnv } from "@/env-var/server";
import { redisClient } from "@/lib/redis";

const cache = new RedisDrizzleCache({
  redis: redisClient,
  defaultTtl: 300,
  namespace: "drizzle:cache",
  strategy: "all",
});

const client = postgres(serverEnv.DATABASE_URL);

export const drizzleDb = drizzle({
  client,
  schema: {
    ...vnsSchema,
  },
  cache,
});
