import { init } from "@sentry/nextjs";
import { clientEnv } from "@/env-var/client";

// https://docs.sentry.io/platforms/javascript/configuration/options/#enabled
// "To disable Sentry completely, depending on environment, call Sentry.init conditionally."
process.env.NODE_ENV === "production" &&
  init({
    dsn: clientEnv.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: 1,
    enableLogs: true,
    sendDefaultPii: true,
  });
