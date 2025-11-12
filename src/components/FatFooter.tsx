import FacebookLogo from "@public/brand/facebook.svg";
import SteamLogo from "@public/brand/steam.svg";
import YoutubeLogo from "@public/brand/youtube.svg";
import VNS_Donate from "@public/VNS_Donate.jpg";
import VNS_Logo from "@public/VNS_Logo.png";
import { ArrowUpRight, HeartHandshake } from "lucide-react";
import { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent, DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const navigations: {
    group: string;
    items: Partial<{
        cloak: boolean;
        displayText: string;
        heading: string;
        href: Route;
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
            }, {
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
        <footer className={"flex min-h-72 gap-2 flex-col justify-between bg-neutral-200 shadow-sm shadow-primary dark:bg-background"}>
            <div className={"flex flex-col justify-evenly gap-y-6 md:flex-1/2 md:flex-row md:place-items-center-safe"}>
                {/* Logo */}
                <div className={"mt-8 flex w-full flex-row place-items-center justify-evenly gap-4 md:w-fit md:flex-col [&_img]:dark:invert"}>
                    <Image alt={"VNS_Logo_Footer"} className={"self-center-safe"} src={VNS_Logo} title={"AKVNS Banner"} width={200} />
                    <div className={"my-4 flex place-items-center-safe gap-x-2"}>
                        <Link href={"https://www.facebook.com/terrastationvn"}>
                            <Image alt={"FacebookLogo"} src={FacebookLogo} width={32} />
                        </Link>
                        <div>/</div>
                        <Link href={"https://www.youtube.com/@ArknightsVNS"}>
                            <Image alt={"YoutubeLogo"} src={YoutubeLogo} width={28} />
                        </Link>
                        <div>/</div>
                        <Link href={"https://steamcommunity.com/groups/arknights_vietnam_station"}>
                            <Image alt={"SteamLogo"} src={SteamLogo} width={28} />
                        </Link>
                    </div>
                </div>
                {/* Community. */}
                {navigations.map(nav => (
                    <section className={"ml-8 grid h-full grid-cols-1 grid-rows-2 gap-y-2"} key={nav.group}>
                        <div className={"self-end text-3xl font-extrabold"}>{nav.group}</div>
                        <div className={"flex flex-col gap-y-1 [&_a_span]:underline [&_a_span]:decoration-dotted [&_a_span]:underline-offset-4"}>
                            {nav.items.map(item => (
                                <div className={"flex gap-x-2"} key={item.displayText}>
                                    <Link href={item.href as Route}>
                                        {item.heading && (
                                            <>
                                                {item.heading}
                                                {": "}
                                            </>
                                        )}
                                        <span className={"font-bold"}>{item.cloak ? item.displayText : item.href}</span>
                                    </Link>
                                    <ArrowUpRight className={"self-center"} size={18} />
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className={"max-w-sm self-center font-bold"}>
                        <HeartHandshake className={""} />
                        Donate cho Arknights VNS
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className={"text-2xl font-bold"}>❤️ Donate</DialogTitle>
                        <DialogDescription>
                            Cảm ơn bạn đã ủng hộ Arknights VNS!
                        </DialogDescription>
                    </DialogHeader>
                    <div className={"flex flex-col space-y-2"}>
                        <p>
                            Bằng việc Donate, các bạn đã góp phần giúp tụi mình trang trải chi phí thuê địa điểm Offline,
                            {" "}
                            đặt commission, mua merch Arknights, cũng như bảo trì hạ tầng IT.
                        </p>
                        <Image alt={"amiya_placeholder"} className={"self-center"} src={VNS_Donate} width={320} />
                    </div>
                </DialogContent>
            </Dialog>
            <div className={"my-4 text-center font-bold italic text-sm"}>
                ©
                {" "}
                <Link className={"font-extrabold text-primary"} href={"/"}>
                    Arknights Vietnam Station
                </Link>
                , 2020-nay.
            </div>
        </footer>
    );
}
