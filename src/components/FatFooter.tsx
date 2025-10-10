import FacebookLogo from "@public/facebook.svg";
import SteamLogo from "@public/steam.svg";
import VNS_Logo from "@public/VNS.svg";
import YoutubeLogo from "@public/youtube.svg";
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
                    <Image src={VNS_Logo} alt={"VNS_Logo_Footer"} className={"self-center-safe"} width={96} />
                    <div className={"my-4 flex place-items-center-safe gap-x-2"}>
                        <Link href={"https://www.facebook.com/terrastationvn"}>
                            <Image src={FacebookLogo} alt={"FacebookLogo"} width={32} />
                        </Link>
                        <div>/</div>
                        <Link href={"https://www.youtube.com/@ArknightsVNS"}>
                            <Image src={YoutubeLogo} alt={"YoutubeLogo"} width={28} />
                        </Link>
                        <div>/</div>
                        <Link href={"https://steamcommunity.com/groups/arknights_vietnam_station"}>
                            <Image src={SteamLogo} alt={"SteamLogo"} width={28} />
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
                                <span className={"font-bold"}>Arknights VNS</span>
                            </Link>
                            <ArrowUpRight size={18} className={"self-center"} />
                        </div>
                        <div className={"flex gap-x-2"}>
                            <Link href={"https://discord.gg/JrZaEVu5Hz"}>
                                Discord:
                                {" "}
                                <span className={"font-bold"}>Phoenix Frontiers</span>
                            </Link>
                            <ArrowUpRight size={18} className={"self-center"} />
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
                            <Link href={"mailto:arknightsvns@gmail.com"} className={"font-mono"}>
                                arknightsvns@gmail.com
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"my-4 text-center font-bold italic"}>
                ©
                {" "}
                <Link href={"/"} className={"font-extrabold text-red-600"}>
                    Arknights Vietnam Station
                </Link>
                , 2020-nay.
            </div>
        </footer>
    );
}
