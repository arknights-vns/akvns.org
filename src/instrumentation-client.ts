import posthog from "posthog-js";

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || "https://eu.i.posthog.com", {
    api_host: "/posthog",
    defaults: "2025-11-30",

    autocapture: false,
    capture_pageview: false,
});
