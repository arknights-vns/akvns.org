import type { Navigable } from "@/components/navbar/navigation-type";
import { SiFacebook } from "@icons-pack/react-simple-icons";
import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { Check, Contact, Handshake, Info } from "lucide-react";

import DesktopNavigationMenu from "@/components/navbar/DesktopNavigationMenu";
import MobileNavigationSidebar from "@/components/navbar/MobileNavigationSidebar";
import { Button } from "@/components/ui/button";

import VNS_Icon from "/VNS_Icon.svg?url";

const links: Navigable[] = [
  {
    children: [
      {
        href: "/",
        hash: "main",
        description: "Các thông tin tổng quan về Arknights VNS.",
        label: "Giới thiệu",
        icon: Info,
      },
      {
        href: "/",
        hash: "sponsors",
        description: "Các bên đã và đang hợp tác với Arknights VNS.",
        label: "Đối tác",
        icon: Handshake,
      },
      {
        href: "/",
        hash: "projects",
        description: "",
        label: "Các dự án của Arknights VNS",
        icon: Check,
      },
      {
        href: "/",
        hash: "footer",
        description: "",
        label: "Liên hệ",
        icon: Contact,
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
          <Image alt="VNS_Logo_Header" className="dark:invert" height={52} src={VNS_Icon} width={52} />
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
              Group Facebook
            </a>
          }
          variant="outline"
        />
      </aside>
    </header>
  );
}
