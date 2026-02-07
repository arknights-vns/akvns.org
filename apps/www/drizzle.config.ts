import "dotenv/config";

import { defineConfig } from "drizzle-kit";
import { serverEnv } from "@/env-var/server";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: serverEnv.DATABASE_URL as string,
  },
  verbose: true,
  strict: true,
});
