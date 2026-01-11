import { SiFacebook, SiGithub, SiSteam, SiYoutube } from "@icons-pack/react-simple-icons";
import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { ArrowUpRight, HeartHandshake } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Heading, Paragraph } from "@/components/ui/extension/typography";

import VNS_Donate from "/VNS_Donate.jpg?url";
import VNS_Logo from "/VNS_Logo.png?url";

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
        displayText: "contact@akvns.org",
        heading: "Email",
        href: "mailto:contact@akvns.org",
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
    <footer
      className="flex min-h-72 flex-col justify-between gap-2 bg-neutral-200 shadow-primary shadow-sm dark:bg-background"
      id="footer"
    >
      <div className="md:place-items-center-safe flex flex-col-reverse justify-evenly gap-x-6 md:flex-row">
        {/* Logo */}
        <div className="mt-8 flex w-full flex-col place-items-center justify-evenly gap-4 md:w-fit [&_img]:dark:invert">
          <Image alt="VNS_Logo_Footer" className="self-center-safe" height={400} src={VNS_Logo} width={200} />
          <div className="place-items-center-safe my-4 flex gap-x-2">
            <a href="https://www.facebook.com/terrastationvn">
              <SiFacebook />
            </a>
            <div>/</div>
            <a href="https://www.youtube.com/@ArknightsVNS">
              <SiYoutube />
            </a>
            <div>/</div>
            <a href="https://steamcommunity.com/groups/arknights_vietnam_station">
              <SiSteam />
            </a>
            <div>/</div>
            <a href="https://github.com/arknights-vns">
              <SiGithub />
            </a>
          </div>
        </div>
        <div className="md:place-items-center-safe flex flex-col gap-8 md:flex-row">
          {navigations.map((nav) => (
            <section className="ml-8 grid h-full grid-cols-1 grid-rows-2 gap-y-2" key={nav.group}>
              <Heading className="self-end font-extrabold text-3xl" kind="h3">
                {nav.group}
              </Heading>
              <div className="flex flex-col gap-y-1 [&_a_span]:underline [&_a_span]:decoration-dotted [&_a_span]:underline-offset-4">
                {nav.items.map((item) => (
                  <div className="flex gap-x-2" key={item.displayText}>
                    <a href={item.href}>
                      {item.heading && <>{item.heading}: </>}
                      <span className="font-bold">{item.cloak ? item.displayText : item.href}</span>
                    </a>
                    <ArrowUpRight className="self-center" size={18} />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
      <Dialog>
        <DialogTrigger
          render={
            <Button className="max-w-sm self-center font-bold">
              <HeartHandshake />
              Donate cho Arknights VNS
            </Button>
          }
        />
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">❤️ Donate</DialogTitle>
            <DialogDescription>Cảm ơn bạn đã ủng hộ Arknights VNS!</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-2">
            <Paragraph>
              Bằng việc Donate, các bạn đã góp phần giúp tụi mình trang trải chi phí thuê địa điểm Offline,
              đặt commission, mua merch Arknights, cũng như bảo trì hạ tầng IT.
            </Paragraph>
            <Image alt="donation_qr_code" className="self-center" height={600} src={VNS_Donate} width={320} />
          </div>
        </DialogContent>
      </Dialog>
      <div className="my-4 text-center font-bold text-sm italic">
        ©{" "}
        <Link className="font-extrabold text-primary" to="/">
          Arknights Vietnam Station
        </Link>
        , 2022-nay.
      </div>
    </footer>
  );
}
