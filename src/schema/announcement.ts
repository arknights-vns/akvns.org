import { z } from "zod";

export const Announcement = z.object({
    content: z.string(),
});
