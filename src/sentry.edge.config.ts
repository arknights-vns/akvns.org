import { init }  from "@sentry/nextjs";

init({
  dsn: "https://23fb1ca2739569b0ed844ac20c498825@o4510706038734848.ingest.de.sentry.io/4510706043912272",
  tracesSampleRate: 1,
  enableLogs: true,
  sendDefaultPii: true,
});
