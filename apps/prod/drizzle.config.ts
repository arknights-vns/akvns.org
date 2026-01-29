import "dotenv/config";

import { serverEnv } from "@arknights-vns/env-var/server";
import { defineConfig } from "drizzle-kit";

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
