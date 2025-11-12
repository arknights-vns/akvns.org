import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

// eslint-disable-next-line unicorn/prevent-abbreviations
export const env = createEnv({
    client: {
        NEXT_PUBLIC_PRODUCTION_URL: z.url(),
        NEXT_PUBLIC_UNLEASH_APP_NAME: z.string().default("Arknights Vietnam Station"),
        NEXT_PUBLIC_UNLEASH_FRONTEND_API_TOKEN: z.string(),
        NEXT_PUBLIC_UNLEASH_FRONTEND_API_URL: z.url().endsWith("/api/frontend"),
    },
    server: {
        AWS_S3_ACCESS_KEY_ID: z.string(),
        AWS_S3_ENDPOINT: z.url(),
        AWS_S3_FORCE_PATH_STYLE: z.stringbool().default(true),
        AWS_S3_REGION: z.string().regex(/[a-z-0-9]+/g),
        AWS_S3_SECRET_ACCESS_KEY: z.string(),
        DATABASE_URL: z.url(),
        DISCORD_CLIENT_ID: z.string(),
        DISCORD_CLIENT_SECRET: z.string(),
        PORT: z.coerce.number().min(1025).max(65_535).default(3000),
        SECRET_KEY: z.string(),
        UNLEASH_SERVER_API_TOKEN: z.string(),
        UNLEASH_SERVER_API_URL: z.url().endsWith("/api"),
    },
    // eslint-disable-next-line perfectionist/sort-objects
    experimental__runtimeEnv: {
        NEXT_PUBLIC_PRODUCTION_URL: process.env.NEXT_PUBLIC_PRODUCTION_URL,
        NEXT_PUBLIC_UNLEASH_APP_NAME: process.env.NEXT_PUBLIC_UNLEASH_APP_NAME,
        NEXT_PUBLIC_UNLEASH_FRONTEND_API_TOKEN: process.env.NEXT_PUBLIC_UNLEASH_FRONTEND_API_TOKEN,
        NEXT_PUBLIC_UNLEASH_FRONTEND_API_URL: process.env.NEXT_PUBLIC_UNLEASH_FRONTEND_API_URL,
    },
});
