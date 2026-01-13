import type { Route } from "next";
import { SiFacebook, SiGithub, SiSteam, SiYoutube } from "@icons-pack/react-simple-icons";
import VNS_Logo from "@public/VNS_Wordmark.png";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Heading, Paragraph } from "@/components/ui/extension/typography";

const navigations: {
  group: string;
  items: Partial<{
    cloak: boolean;
    displayText: string;
    heading: string;
    href: string;
  }>[];
}[] = [
  {
    group: "Cộng đồng",
    items: [
      {
        cloak: true,
        displayText: "Arknights VNS",
        heading: "Discord",
        href: "https://discord.gg/arknights-vns",
      },
      {
        cloak: true,
        displayText: "Phoenix Frontiers Hub",
        heading: "Discord",
        href: "https://discord.gg/dgTVWerfUk",
      },
    ],
  },
  {
    group: "Liên hệ",
    items: [
      {
        cloak: true,
        displayText: "arknightsvns@gmail.com",
        heading: "Email",
        href: "mailto:arknightsvns@gmail.com",
      },
    ],
  },
];

/**
 * "Em không đùa với anh đâu Tú, tên nó thật sự là Footer Béo."
 *
 * - giabao06 / John maimai
 */
export default function FatFooter() {
  return (
    <footer className="flex flex-col justify-between border border-primary/25" id="footer">
      <div className="md:place-items-center-safe flex flex-col-reverse justify-evenly gap-x-6 md:flex-row">
        {/* Logo */}
        <div className="mt-8 flex w-full flex-col place-items-center justify-evenly gap-4 md:w-fit [&_img]:dark:invert">
          <Image alt="VNS_Logo_Footer" className="self-center-safe" height={600} src={VNS_Logo} width={250} />
          <div className="place-items-center-safe my-4 flex gap-x-2">
            <Link href="https://www.facebook.com/terrastationvn">
              <SiFacebook />
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="https://www.youtube.com/@ArknightsVNS">
              <SiYoutube />
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="https://steamcommunity.com/groups/arknights_vietnam_station">
              <SiSteam />
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="https://github.com/arknights-vns">
              <SiGithub />
            </Link>
          </div>
        </div>
        <div className="md:place-items-center-safe flex flex-col gap-8 md:flex-row">
          {navigations.map((nav) => (
            <div className="ml-8 grid h-full grid-cols-1 grid-rows-2 gap-y-2" key={nav.group}>
              <Heading className="self-end font-bold text-primary" kind="h2">
                {nav.group}
              </Heading>
              <ul className="flex flex-col gap-y-2">
                {nav.items.map((item) => (
                  <li className="place-items-center-safe flex gap-1" key={item.displayText}>
                    <Link href={item.href as Route}>
                      {item.heading && <>{item.heading}: </>}
                      <span className="font-bold underline decoration-primary decoration-dashed underline-offset-4">
                        {item.cloak ? item.displayText : item.href}
                      </span>
                    </Link>
                    <ArrowUpRight className="self-center stroke-3 stroke-primary" size={12} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="place-items-center-safe mx-4 text-center font-inter text-muted-foreground text-xs [&>p]:not-first:mt-0">
        <Paragraph>
          "Arknights" là thương hiệu đã được đăng ký bởi Hypergryph Network Technology Co., Ltd. "Arknights:
          Endfield" là thương hiệu đã được đăng ký bởi GRYPH FRONTIER PTE. LTD. Những thương hiệu khác thuộc
          về các chủ sở hữu có thẩm quyền.
        </Paragraph>
      </div>
      <div className="m-4 text-center text-sm">
        &copy; Arknights Vietnam Station, 2022-nay. Tất cả mọi quyền được bảo lưu.
      </div>
    </footer>
  );
}
