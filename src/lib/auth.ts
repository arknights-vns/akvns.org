import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth/minimal";
import { nextCookies } from "better-auth/next-js";

import { serverEnv } from "@/env/server";
import { drizzleDb } from "@/lib/drizzle";
import { redisClient } from "@/lib/redis";

export const auth = betterAuth({
  database: drizzleAdapter(drizzleDb, {
    provider: "pg",
  }),
  plugins: [nextCookies()],
  secret: serverEnv.SECRET_KEY,
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
      strategy: "jwe",
      refreshCache: false,
    },
  },
  rateLimit: {
    storage: "secondary-storage",
  },
  socialProviders: {
    discord: {
      clientId: serverEnv.DISCORD_CLIENT_ID,
      clientSecret: serverEnv.DISCORD_CLIENT_SECRET,
    },
  },
  experimental: {
    joins: true,
  },
  advanced: {
    database: { generateId: "uuid" },
  },
  secondaryStorage: {
    get: async (key) => {
      return await redisClient.get(key);
    },
    set: async (key, value, ttl) => {
      if (ttl) {
        await redisClient.set(key, value, "EX", ttl);
      } else {
        await redisClient.set(key, value);
      }
    },
    delete: async (key) => {
      await redisClient.del(key);
    },
  },
});
