import process from "node:process";
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

    CONFIGCAT_API_KEY: z.string(),

    // node -e "console.log(crypto.randomBytes(32).toString('base64url'))"
    // FLAGS_SECRET: z.hash("sha256", {enc: "base64url"}),
  },
  experimental__runtimeEnv: process.env,
});
