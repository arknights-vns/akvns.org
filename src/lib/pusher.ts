import PusherServer from "pusher";

import { env } from "@/lib/env";

export const pusherServer = new PusherServer({
    appId: env.PUSHER_APP_ID,
    cluster: "",
    key: env.NEXT_PUBLIC_PUSHER_APP_KEY,
    secret: env.PUSHER_APP_SECRET,
    host: "localhost",
    port: "6001",
    useTLS: false,
});
