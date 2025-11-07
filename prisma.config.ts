import { defineConfig } from "prisma/config";

export default defineConfig({
    migrations: {
        path: "./prisma/migrations",
        seed: "tsx ./prisma/seed.ts",
    },
    schema: "./prisma/schema.prisma",
});
