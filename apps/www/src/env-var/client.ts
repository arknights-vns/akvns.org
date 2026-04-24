import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const clientEnv = createEnv({
  client: {
    NEXT_PUBLIC_PRODUCTION_URL: z.url().default("https://akvns.org"),
    NEXT_PUBLIC_VNS_DISCORD_SERVER: z.url().default("https://discord.gg/akvns"),
    NEXT_PUBLIC_PFR_DISCORD_SERVER: z.url().default("https://discord.gg/4F7R5r93TX"),
  },
  runtimeEnv: {
    NEXT_PUBLIC_PRODUCTION_URL: process.env.NEXT_PUBLIC_PRODUCTION_URL,
    NEXT_PUBLIC_VNS_DISCORD_SERVER: process.env.NEXT_PUBLIC_VNS_DISCORD_SERVER,
    NEXT_PUBLIC_PFR_DISCORD_SERVER: process.env.NEXT_PUBLIC_PFR_DISCORD_SERVER,
  },
});
