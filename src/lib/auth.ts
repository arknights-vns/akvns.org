import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth/minimal";
import { nextCookies } from "better-auth/next-js";

import { drizzleDb } from "@/lib/drizzle";
import { redis } from "@/lib/redis";

export const auth = betterAuth({
    appName: "Arknights Vietnam Station",
    baseURL: process.env.NEXT_PUBLIC_PRODUCTION_URL || "http://localhost:3000",
    database: drizzleAdapter(drizzleDb, {
        provider: "pg",
    }),
    plugins: [nextCookies()],
    secret: process.env.SECRET_KEY,
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
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
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
            return await redis.get(key);
        },
        set: async (key, value, ttl) => {
            if (ttl) await redis.set(key, value, "EX", ttl);
            else await redis.set(key, value);
        },
        delete: async (key) => {
            await redis.del(key);
        },
    },
});
