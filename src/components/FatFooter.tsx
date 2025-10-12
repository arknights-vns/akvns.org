import FacebookLogo from "@public/brands/facebook.svg";
import SteamLogo from "@public/brands/steam.svg";
import YoutubeLogo from "@public/brands/youtube.svg";
import VNS_Logo from "@public/VNS_Logo.svg";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/**
 * "Em không đùa với anh đâu Tú, tên nó thật sự là Footer Béo."
 *
 * - giabao06 / John maimai
 */
export default function FatFooter() {
    return (
        <footer className={"flex min-h-72 w-full flex-col justify-between bg-neutral-200 shadow-sm shadow-primary dark:bg-background"}>
            <div className={"flex flex-col justify-evenly gap-y-6 md:flex-1/2 md:flex-row md:place-items-center-safe"}>
                {/* Logo */}
                <div className={"mt-8 flex w-full flex-row justify-evenly gap-4 md:w-fit md:flex-col [&_img]:dark:invert"}>
                    <Image alt={"VNS_Logo_Footer"} className={"h-auto self-center-safe lg:w-[250px]"} src={VNS_Logo} width={180} />
                    <div className={"my-4 flex items-center justify-center gap-x-2"}>
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
                {/* Contacts & stuffs. */}
                <div className={"ml-8 grid h-full grid-cols-1 grid-rows-2 gap-y-2"}>
                    <div className={"self-end text-3xl font-extrabold"}>Cộng đồng</div>
                    <div className={"flex flex-col gap-y-1"}>
                        <div className={"flex gap-x-2"}>
                            <Link href={"https://discord.gg/arknights-vns"}>
                                Discord:
                                {" "}
                                <span className={"font-bold underline decoration-dotted underline-offset-4"}>Arknights VNS</span>
                            </Link>
                            <ArrowUpRight className={"self-center"} size={18} />
                        </div>
                        <div className={"flex gap-x-2"}>
                            <Link href={"https://discord.gg/JrZaEVu5Hz"}>
                                Discord:
                                {" "}
                                <span className={"font-bold underline decoration-dotted underline-offset-4"}>Phoenix Frontiers</span>
                            </Link>
                            <ArrowUpRight className={"self-center"} size={18} />
                        </div>
                    </div>
                </div>
                <div className={"ml-8 grid h-full grid-cols-1 grid-rows-2 gap-y-2"}>
                    <div className={"self-end text-3xl font-extrabold"}>Liên hệ</div>
                    <div className={"flex flex-col gap-y-1"}>
                        <div>
                            <span className={"font-bold"}>Email</span>
                            :
                            {" "}
                            <Link className={"font-mono underline decoration-dotted underline-offset-4"} href={"mailto:arknightsvns@gmail.com"}>
                                arknightsvns@gmail.com
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"my-4 text-center font-bold italic"}>
                ©
                {" "}
                <Link className={"font-extrabold text-red-600"} href={"/"}>
                    Arknights Vietnam Station
                </Link>
                , 2020-nay.
            </div>
        </footer>
    );
}
