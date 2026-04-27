import * as z from "zod";

import { SepayCustomer } from "./SepayCustomer";
import { SepayOrder } from "./SepayOrder";
import { SepayTransaction } from "./SepayTransaction";

// reference: https://developer.sepay.vn/vi/cong-thanh-toan/IPN
export const SepayIPN = z.object({
  timestamp: z.number(),
  notification_type: z.enum(["ORDER_PAID", "TRANSACTION_VOID"]),
  order: SepayOrder,
  transaction: SepayTransaction,
  customer: SepayCustomer,
});
