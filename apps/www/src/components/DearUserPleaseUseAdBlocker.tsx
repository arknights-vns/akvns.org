"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@arknights-vns/shadcn-ui/components/dialog";
import { useQuery } from "@tanstack/react-query";

export default function DearUserPleaseUseAdBlocker() {
  const { error } = useQuery({
    queryFn: async () => await fetch("https://www.google-analytics.com"),
    queryKey: ["adblock-check"],
  });

  const currentTime = new Date(Date.now());

  // quite stupid that JS uses 0-index for month
  // and... 1-index for day.
  const isAprilFool = currentTime.getMonth() === 3 && currentTime.getDate() === 1;

  const hasUBO = error !== null;

  return (
    <Dialog open={isAprilFool && !hasUBO}>
      <DialogContent showCloseButton={false} data-testid="april-fool-adblock">
        <DialogHeader>
          <DialogTitle>AdBlock đâu?</DialogTitle>
          <DialogDescription>Vì một Internet sạch hơn :D</DialogDescription>
        </DialogHeader>
        <div>Vì bạn không dùng AdBlocker nên là website không cho bạn truy cập nhé!</div>
      </DialogContent>
    </Dialog>
  );
}
