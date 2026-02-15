"use client";

import { Button } from "@arknights-vns/shadcn-ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@arknights-vns/shadcn-ui/components/dialog";
import { Paragraph } from "@arknights-vns/shadcn-ui/components/extension/typography";
import VNS_Donate from "@public/VNS_Donate.jpg";
import { Heart, HeartHandshake } from "lucide-react";
import Image from "next/image";
import { parseAsBoolean, useQueryState } from "nuqs";

export default function DonateButton() {
  const [openDonate, setOpenDonate] = useQueryState("open-donate", parseAsBoolean.withDefault(false));

  return (
    <Dialog onOpenChange={(x) => setOpenDonate(x)} open={openDonate}>
      <DialogTrigger
        render={
          <Button className="border-primary! hover:bg-primary!" variant="outline">
            <HeartHandshake />
            <div className="">Donate</div>
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="place-items-center-safe flex gap-2 font-bold text-2xl">
            <Heart className="fill-primary stroke-primary" /> Thank you!
          </DialogTitle>
          <DialogDescription>Cảm ơn bạn đã ủng hộ Arknights VNS!</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Paragraph>
            Bằng việc Donate, các bạn đã góp phần giúp tụi mình trang trải chi phí thuê địa điểm Offline, đặt
            commission, mua merch Arknights, cũng như bảo trì hạ tầng IT.
          </Paragraph>
          <Image
            alt="donation_qr_code"
            className="h-auto self-center"
            height={280}
            src={VNS_Donate}
            width={248}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
