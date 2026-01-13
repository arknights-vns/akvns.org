import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const clientEnv = createEnv({
  client: {
    NEXT_PUBLIC_PRODUCTION_URL: z.url(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_PRODUCTION_URL: process.env.NEXT_PUBLIC_PRODUCTION_URL,
  },
});
