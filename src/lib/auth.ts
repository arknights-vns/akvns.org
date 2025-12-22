import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth/minimal";
import { nextCookies } from "better-auth/next-js";

import { drizzleDb } from "@/lib/drizzle";

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
            maxAge: 60 * 60,
        },
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
});
