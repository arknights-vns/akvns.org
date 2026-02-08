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
import { SiDiscord, SiFacebook } from "@icons-pack/react-simple-icons";
import VNS_Donate from "@public/VNS_Donate.jpg";
import VNS_Icon from "@public/VNS_Icon.svg";
import { Heart, HeartHandshake } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DesktopNavigationMenu from "@/components/navbar/DesktopNavigationMenu";
import MobileNavigationSidebar from "@/components/navbar/MobileNavigationSidebar";
import { links } from "@/components/navbar/navigation-entries";

export default function NavigationBar() {
  return (
    <header className="flex h-18 justify-between bg-background px-4">
      <div className="place-items-center-safe flex w-[25vw] gap-4">
        <MobileNavigationSidebar links={links} />
        <Link href="/">
          <Image alt="VNS_Logo_Header" className="dark:invert" height={52} loading="eager" src={VNS_Icon} />
        </Link>
      </div>
      <DesktopNavigationMenu links={links} />
      <div className="place-items-center-safe flex w-[25vw] justify-end gap-2">
        <Button
          className="border-[#1877f2]! hover:bg-[#1877f2]!"
          nativeButton={false}
          render={
            <Link href="https://www.facebook.com/groups/1546174542442137">
              <SiFacebook />
              <span className="sr-only">Facebook</span>
            </Link>
          }
          size="icon-lg"
          variant="outline"
        />
        <Button
          className="border-[#5865F2]! hover:bg-[#5865F2]!"
          nativeButton={false}
          render={
            <Link href="https://discord.gg/arknights-vns">
              <SiDiscord />
              <span className="sr-only">Discord</span>
            </Link>
          }
          size="icon-lg"
          variant="outline"
        />
        <Dialog>
          <DialogTrigger
            render={
              <Button className="border-primary! hover:bg-primary!" size="icon-lg" variant="outline">
                <HeartHandshake />
                <span className="sr-only">Donate</span>
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
                Bằng việc Donate, các bạn đã góp phần giúp tụi mình trang trải chi phí thuê địa điểm Offline,
                đặt commission, mua merch Arknights, cũng như bảo trì hạ tầng IT.
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
      </div>
    </header>
  );
}
