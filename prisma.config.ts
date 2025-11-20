import { defineConfig, env } from "prisma/config";
import "dotenv/config";

export default defineConfig({
    datasource: {
        url: env("DATABASE_DIRECT_URL"),
    },
    migrations: {
        path: "./prisma/migrations",
        seed: "tsx ./prisma/seed.ts",
    },
    schema: "./prisma/schema.prisma",
});
