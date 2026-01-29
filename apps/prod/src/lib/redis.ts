import { Redis } from "ioredis";

import { serverEnv } from "@/env/server";

export const redisClient = new Redis(serverEnv.REDIS_URL);
