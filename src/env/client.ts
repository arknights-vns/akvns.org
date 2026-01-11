import { createEnv } from "@t3-oss/env-core";
import * as z from "zod";

export const clientEnv = createEnv({
  clientPrefix: "VITE_",
  client: {
    VITE_PRODUCTION_URL: z.url(),
  },
  runtimeEnv: import.meta.env,
});
