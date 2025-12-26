import { Redis } from "ioredis";

export const redis = new Redis(
    process.env.REDIS_URL || "redis://ligma:ligma@localhost:6379",
);
