import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const serverEnv = createEnv({
  server: {
    REDIS_URL: z.url(),
    DATABASE_URL: z.url(),
    COMIC_ASSETS_AWS_BUCKET: z.string().default("terrastationvn"),
    COMIC_ASSETS_URL_PREFIX: z.url().default("https://comic-assets.akvns.org"),

    S3_AWS_ENDPOINT: z.url("https://s3.us-east-1.amazonaws.com"),
    S3_AWS_REGION: z.string().default("us-east-1"),
    S3_AWS_ACCESS_KEY_ID: z.string(),
    S3_AWS_SECRET_ACCESS_KEY: z.string(),

    SENTRY_ORG: z.string().default("arknights-vns"),
    SENTRY_PROJECT: z.string().default("arknights-vns"),
    SENTRY_AUTH_TOKEN: z.string(),

    VNS_DISCORD_SERVER: z.url().default("https://discord.gg/akvns"),
    PFR_DISCORD_SERVER: z.url().default("https://discord.gg/SRFjXSFu"),

    MICROSOFT_CLARITY_PROJECT_ID: z.string().default("vtcuc1ictq"),
    GOOGLE_ANALYTICS_ID: z.string().default("G-Y625KEE6HT"),
    GOOGLE_TAG_MANAGER_ID: z.string().default("GTM-PT7MFG5F"),
  },
  experimental__runtimeEnv: process.env,
});
