import { serverEnv } from "@arknights-vns/env-var/server";
import { redisClient } from "@arknights-vns/redis";
import { RedisDrizzleCache } from "@databuddy/cache";
import { SQL } from "bun";
import { drizzle } from "drizzle-orm/bun-sql";
// biome-ignore lint/performance/noNamespaceImport: I have to
import * as vnsSchema from "./schema/vns-schema";

const cache = new RedisDrizzleCache({
  redis: redisClient,
  defaultTtl: 360,
  namespace: "drizzle:cache",
  strategy: "all",
});

const client = new SQL(serverEnv.DATABASE_URL);

export const drizzleDb = drizzle({
  client,
  schema: {
    ...vnsSchema,
  },
  cache,
});
