import PusherClient from "pusher-js";

import { env } from "@/lib/env";

export const pusherClient = new PusherClient(env.NEXT_PUBLIC_PUSHER_APP_KEY, {
    wsHost: "localhost",
    wsPort: 6001,
    forceTLS: false,
    cluster: "",
    enabledTransports: ["ws"],
});
