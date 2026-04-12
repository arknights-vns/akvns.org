import * as z from "zod";

export const SepayCustomer = z.object({
  id: z.uuidv4(),
  customer_id: z.string(),
});
