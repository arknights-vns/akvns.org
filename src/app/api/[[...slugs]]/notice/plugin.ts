import alert from "@resources/data/site-alert.json";
import { Elysia } from "elysia";
import { CacheControl, cacheControl } from "elysiajs-cdn-cache";
import z from "zod";

import { SiteAnnouncement } from "@/schema/announcement";

const noticePlugin = new Elysia({ prefix: "/notice" }).use(cacheControl()).get(
    "/",
    async ({ cacheControl }) => {
        cacheControl.set(
            "Cache-Control",
            new CacheControl()
                .set("public", true)
                .set("max-age", 5 * 60)
                .set("s-maxage", 60 * 60),
        );

        return {
            message: await SiteAnnouncement.parseAsync(alert),
        };
    },
    {
        response: z.object({
            message: SiteAnnouncement,
        }),
    },
);

export default noticePlugin;
