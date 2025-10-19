import { z } from "zod";

export const VNS_APIError = z.object({
    message: z.string(),
});
