import posthog from "posthog-js";

import { env } from "@/lib/env";

posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: "/posthog",
    defaults: "2025-11-30",

    autocapture: false,
    capture_pageview: false,
});
