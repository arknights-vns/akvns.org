import { z } from "zod";

export const noticeType = ["information"] as const;

export const SiteAnnouncement = z.object({
    type: z.enum(noticeType),
    body: z.string().nullable(),
    cta: z
        .object({
            label: z.string(),
            href: z.url(),
        })
        .nullable(),
});
