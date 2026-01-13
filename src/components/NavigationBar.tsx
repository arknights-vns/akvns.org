import type { Navigable } from "@/components/navbar/navigation-type";
import { SiDiscord, SiFacebook } from "@icons-pack/react-simple-icons";
import VNS_Donate from "@resources/image/VNS_Donate.jpg";
import VNS_Icon from "@resources/image/VNS_Icon.svg";
import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { Handshake, Heart, HeartHandshake, Info } from "lucide-react";

import DesktopNavigationMenu from "@/components/navbar/DesktopNavigationMenu";
import MobileNavigationSidebar from "@/components/navbar/MobileNavigationSidebar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Paragraph } from "@/components/ui/extension/typography";

const links: Navigable[] = [
  {
    children: [
      {
        href: "/",
        hash: "intro",
        description: "Thông tin tổng quan về Arknights VNS.",
        label: "Giới thiệu",
        icon: Info,
      },
      {
        href: "/",
        hash: "partners",
        description: "Các bên đã và đang hợp tác với Arknights VNS.",
        label: "Đối tác",
        icon: Handshake,
      },
    ],
    type: "dropdown",
    label: "Về Arknights VNS",
  },
  {
    href: "/staff",
    hash: "",
    label: "Nhân sự",
    type: "link",
  },
  {
    href: "/projects",
    hash: "",
    label: "Dự án",
    type: "link",
  },
  // {
  //     href: "/blog",
  //     label: "Blog",
  //     type: "link",
  // },
  {
    href: "/comic",
    hash: "",
    label: "Truyện tại Trạm",
    type: "link",
  },
];

export default function NavigationBar() {
  return (
    <header className="sticky top-0 z-1 flex h-18 justify-between bg-background px-4">
      <aside className="place-items-center-safe flex w-[25vw] gap-4">
        <MobileNavigationSidebar links={links} />
        <Link to="/">
          <Image
            alt="VNS_Logo_Header"
            aspectRatio={1}
            className="dark:invert"
            height={64}
            layout="constrained"
            src={VNS_Icon}
          />
        </Link>
      </aside>
      <DesktopNavigationMenu links={links} />
      <aside className="place-items-center-safe flex w-[25vw] justify-end gap-2">
        <Button
          className="border-[#1877f2]! hover:bg-[#1877f2]!"
          nativeButton={false}
          render={
            <a href="https://www.facebook.com/groups/1546174542442137">
              <SiFacebook />
            </a>
          }
          size="icon"
          variant="outline"
        />
        <Button
          className="border-[#5865F2]! hover:bg-[#5865F2]!"
          nativeButton={false}
          render={
            <a href="https://discord.gg/arknights-vns">
              <SiDiscord />
            </a>
          }
          size="icon"
          variant="outline"
        />
        <Dialog>
          <DialogTrigger
            render={
              <Button className="border-primary! hover:bg-primary!" variant="outline">
                <HeartHandshake />
                <span className="hidden md:inline">Donate</span>
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
            <div className="flex flex-col space-y-2">
              <Paragraph>
                Bằng việc Donate, các bạn đã góp phần giúp tụi mình trang trải chi phí thuê địa điểm Offline,
                đặt commission, mua merch Arknights, cũng như bảo trì hạ tầng IT.
              </Paragraph>
              <Image
                alt="donation_qr_code"
                className="self-center"
                height={400}
                src={VNS_Donate}
                width={280}
              />
            </div>
            <DialogFooter>Có đúng 1 chỗ này thôi nhe, bị scam thì tui chịu {":<"}</DialogFooter>
          </DialogContent>
        </Dialog>
      </aside>
    </header>
  );
}
