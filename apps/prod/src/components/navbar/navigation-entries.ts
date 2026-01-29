import { Handshake, Info } from "lucide-react";
import type { Navigable } from "@/components/navbar/navigation-type";

export const links: Navigable[] = [
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
