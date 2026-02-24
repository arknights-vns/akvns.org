import { captureRouterTransitionStart, init, replayIntegration } from "@sentry/nextjs";
import { clientEnv } from "@/env-var/client";

// https://docs.sentry.io/platforms/javascript/configuration/options/#enabled
// "To disable Sentry completely, depending on environment, call Sentry.init conditionally."
process.env.NODE_ENV === "production" &&
  init({
    dsn: clientEnv.NEXT_PUBLIC_SENTRY_DSN,
    integrations: [replayIntegration()],
    tracesSampleRate: 1,
    enableLogs: true,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    sendDefaultPii: true,
  });

export const onRouterTransitionStart = captureRouterTransitionStart;
