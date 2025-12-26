import { RedisClient } from "bun";

export const redis = new RedisClient(
    process.env.REDIS_URL || "redis://ligma:ligma@localhost:6379",
);
