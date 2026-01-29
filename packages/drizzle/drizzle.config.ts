import dotenv from "dotenv";

// one of the rare cases I have to use this.
// shit approach, I know.
dotenv.config({ path: "../../apps/prod/.env" });

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./migrations",
  schema: "./schema",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  verbose: true,
  strict: true,
});
