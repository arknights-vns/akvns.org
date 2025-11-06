import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";

import prisma from "@/lib/prisma";

export const auth = betterAuth({
    appName: "Arknights Vietnam Station",
    baseURL: process.env.PRODUCTION_URL || "http://localhost:3000",
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    plugins: [admin(), nextCookies()],
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
            getUserInfo: async (token) => {
                const resp = await fetch("https://discord.com/api/users/@me", {
                    headers: {
                        Authorization: `Bearer ${token.accessToken}`,
                    },
                });

                const body = await resp.json();

                return {
                    data: body,
                    user: {
                        email: body.email,
                        emailVerified: body.verified,
                        id: body.id,
                        image: `https://cdn.discordapp.com/avatars/${body.id}/${body.avatar}.${body.avatar.startsWith("a_") ? "gif" : "png"}`,
                        name: body.username,
                    },
                };
            },
        },
    },
});
