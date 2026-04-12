import * as z from "zod";

// reference: https://docs.sepay.vn/tich-hop-webhooks.html
export const SepayWebhook = z.object({
  id: z.int(),
  gateway: z.string(),
  transactionDate: z.string(),
  accountNumber: z.string(),
  code: z.string().nullable(), // This code is used to further filter transactions
  content: z.string(),
  transferType: z.enum(["in", "out"]),
  transferAmount: z.int(),
  accumulated: z.int(), // Accumulated balance
  subAccount: z.string().nullable(), // Usage not known
  referenceCode: z.string().nullable(), // Transaction Reference code?
  description: z.string(), // SMS content?
});
