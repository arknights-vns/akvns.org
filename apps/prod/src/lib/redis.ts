import { serverEnv } from "@arknights-vns/env-var/server";
import { Redis } from "ioredis";

export const redisClient = new Redis(serverEnv.REDIS_URL);
