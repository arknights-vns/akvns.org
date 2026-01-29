import { serverEnv } from "@arknights-vns/env-var/server";
import { RedisClient } from "bun";

export const redisClient = new RedisClient(serverEnv.REDIS_URL);
