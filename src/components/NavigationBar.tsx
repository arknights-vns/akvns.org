"use client";

import type { Navigable } from "@/components/navbar/navigation-type";
import { SiFacebook } from "@icons-pack/react-simple-icons";
import VNS_Icon from "@public/VNS_Icon.svg";
import {
    BadgeQuestionMark,
    Check,
    Contact,
    Crown,
    Handshake,
    Info,
    Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// import DiscordInfoPill from "@/components/DiscordInfoPill";
import DesktopNavigationMenu from "@/components/navbar/DesktopNavigationMenu";
import MobileNavigationSidebar from "@/components/navbar/MobileNavigationSidebar";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Button } from "@/components/ui/button";

const links: Navigable[] = [
    {
        children: [
            {
                href: "/#main",
                description: "Các thông tin tổng quan về Arknights VNS.",
                label: "Giới thiệu",
                icon: Info,
            },
            {
                href: "/#sponsors",
                description: "Các bên đã và đang hợp tác với Arknights VNS.",
                label: "Đối tác",
                icon: Handshake,
            },
            {
                description: "",
                href: "/#projects",
                label: "Các dự án của Arknights VNS",
                icon: Check,
            },
            {
                href: "/#faq",
                label: "Câu hỏi thường gặp",
                description: "",
                icon: BadgeQuestionMark,
            },
            {
                href: "/#footer",
                description: "",
                label: "Liên hệ",
                icon: Contact,
            },
        ],
        type: "dropdown",
        label: "Về Arknights VNS",
    },
    {
        children: [
            {
                description:
                    "Những người đang điều hành Arknights VNS đến hiện tại.",
                href: "/#leaders",
                label: "The Leaders",
                icon: Crown,
            },
            {
                description: "",
                href: "/staff",
                label: "Toàn bộ dàn staff",
                icon: Users,
            },
        ],
        label: "Nhân sự",
        type: "dropdown",
    },
    // {
    //     href: "/blog",
    //     label: "Blog",
    //     type: "link",
    // },
    {
        href: "/comic",
        label: "Truyện tại Trạm",
        type: "link",
    },
];

export default function NavigationBar() {
    return (
        <header className="sticky top-0 z-1 flex h-18 justify-between bg-background/50 px-4 backdrop-blur-lg">
            <aside className="place-items-center-safe flex w-[25vw] gap-4">
                <MobileNavigationSidebar links={links} />
                <Link href="/">
                    <Image
                        alt="VNS_Logo_Header"
                        className="size-12.5 dark:invert"
                        src={VNS_Icon}
                        title="AKVNS Logo"
                    />
                </Link>
            </aside>
            <DesktopNavigationMenu links={links} />
            <aside className="place-items-center-safe flex w-[25vw] justify-end gap-2">
                {/*<DiscordInfoPill />*/}
                <Button
                    className="bg-[#1877f2]"
                    render={
                        <Link href="https://www.facebook.com/terrastationvn/" />
                    }
                    nativeButton={false}
                >
                    <SiFacebook />
                    Fanpage
                </Button>
                <Button
                    className="bg-[#1877f2]"
                    render={
                        <Link href="https://www.facebook.com/groups/1546174542442137" />
                    }
                    nativeButton={false}
                >
                    <SiFacebook />
                    Group
                </Button>
                <ThemeSwitcher />
            </aside>
        </header>
    );
}
