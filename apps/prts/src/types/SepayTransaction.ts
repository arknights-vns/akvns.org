import * as z from "zod";

export const SepayTransaction = z.object({
  id: z.uuidv4(),
  payment_method: z.string(),
  transaction_id: z.string(),
  transaction_type: z.enum(["PAYMENT", "REFUND"]),
  transaction_date: z.string(),
  transaction_status: z.enum(["APPROVED", "DECLINED"]),
  transaction_amount: z.string(),
  transaction_currency: z.string(),
});
