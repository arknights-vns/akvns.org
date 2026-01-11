import { RedisDrizzleCache } from "@databuddy/cache";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "@/db/schema";
import { serverEnv } from "@/env/server";
import { redisClient } from "@/lib/redis";

const cache = new RedisDrizzleCache({
  redis: redisClient,
  defaultTtl: 360,
  namespace: "drizzle:cache",
  strategy: "all",
});

export const drizzleDb = drizzle({
  client: postgres(serverEnv.DATABASE_URL),
  schema,
  cache,
});
