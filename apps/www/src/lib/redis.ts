import { Redis as RedisClient } from "ioredis";
import { serverEnv } from "@/env-var/server";

export const redisClient = new RedisClient(serverEnv.REDIS_URL);
