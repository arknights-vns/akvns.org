import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx ./scripts/seed.ts",
  },
  typedSql: {
    path: "prisma/sql",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
