import * as Sentry from "@sentry/nextjs";

import { clientEnv } from "@/env-var/client";

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: clientEnv.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: 0.5,
    enableLogs: true,
    sendDefaultPii: true,

    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1,

    integrations: [
      Sentry.replayIntegration({
        maskAllText: true,
        maskAllInputs: true,
        blockAllMedia: true,
      }),
    ],
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
