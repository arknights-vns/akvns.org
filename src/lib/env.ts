import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    client: {
        NEXT_PUBLIC_PRODUCTION_URL: z.url(),
        NEXT_PUBLIC_POSTHOG_HOST: z.url(),
        NEXT_PUBLIC_POSTHOG_ASSET_HOST: z.url(),
        NEXT_PUBLIC_POSTHOG_KEY: z.string(),
    },
    server: {
        DATABASE_URL: z.url(),
        DISCORD_CLIENT_ID: z.string(),
        DISCORD_CLIENT_SECRET: z.string(),
        PORT: z.coerce.number().min(1025).max(65_535).default(3000),
        SECRET_KEY: z.string(),
        SKIP_AUTH: z.stringbool(),
        BLOG_ASSETS_URL_PREFIX: z.url().default("https://blog-archive.akvns.org"),
        AWS_ENDPOINT: z.url(),
        AWS_REGION: z.string().default("us-east-1"),
        AWS_ACCESS_KEY_ID: z.string(),
        AWS_SECRET_ACCESS_KEY: z.string(),
        COMIC_ASSETS_AWS_BUCKET: z.string(),
        COMIC_ASSETS_URL_PREFIX: z.string().default("https://comic-assets.akvns.org"),
    },
    experimental__runtimeEnv: {
        NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        NEXT_PUBLIC_POSTHOG_ASSET_HOST: process.env.NEXT_PUBLIC_POSTHOG_ASSET_HOST,
        NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
        NEXT_PUBLIC_PRODUCTION_URL: process.env.NEXT_PUBLIC_PRODUCTION_URL,
    },
});
