import * as Sentry from "@sentry/nextjs";

import { clientEnv } from "@/env-var/client";

Sentry.init({
  dsn: clientEnv.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: process.env.NODE_ENV === "development" ? 1 : 0.3,
  enableLogs: true,
  sendDefaultPii: false,
});
