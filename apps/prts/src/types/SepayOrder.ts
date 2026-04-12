import * as z from "zod";

export const SepayOrder = z.object({
  id: z.uuidv4(),
  order_id: z.string(),
  order_status: z.enum(["CAPTURED", "CANCELLED", "AUTHENTICATION_NOT_NEEDED"]),
  order_currency: z.string(),
  order_amount: z.number(),
  order_invoice_number: z.string(),
  custom_data: z.array(z.object()),
  user_agent: z.string(),
  ip_address: z.ipv4(),
  order_description: z.string(),
});
