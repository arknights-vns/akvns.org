import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth/minimal";
import { nextCookies } from "better-auth/next-js";

import { drizzleDb } from "@/lib/drizzle";
import { env } from "@/lib/env";

export const auth = betterAuth({
    appName: "Arknights Vietnam Station",
    baseURL: env.NEXT_PUBLIC_PRODUCTION_URL || "http://localhost:3000",
    database: drizzleAdapter(drizzleDb, {
        provider: "pg",
    }),
    plugins: [nextCookies()],
    secret: env.SECRET_KEY,
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 60 * 60,
        },
    },
    socialProviders: {
        discord: {
            clientId: env.DISCORD_CLIENT_ID as string,
            clientSecret: env.DISCORD_CLIENT_SECRET as string,
        },
    },
    experimental: {
        joins: true,
    },
    advanced: {
        database: { generateId: "uuid" },
    },
});
