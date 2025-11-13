import type { Route } from "next";

import VNS_Icon from "@public/VNS_Icon.svg";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import DiscordInfoPill from "@/components/DiscordInfoPill";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu, NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList, NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

type DropDownNavigation = {
    children: {
        description: string;
        href: Route;
        label: string;
    }[];
    label: string;
    type: "dropdown";
};

type NormalNavigation = {
    href: Route;
    label: string;
    type: "link";
};

const links: (DropDownNavigation | NormalNavigation)[] = [
    {
        href: "#",
        label: "Về chúng mình",
        type: "link",
    },
    {
        children: [
            {
                description: "",
                href: "/#leaders",
                label: "Meet the Leaders",
            },
            {
                description: "",
                href: "/staff",
                label: "Full staff",
            },
        ],
        label: "Nhân sự",
        type: "dropdown",
    },
    {
        children: [
            {
                description: "",
                href: "/#projects",
                label: "Các dự án của Arknights VNS",
            },
            {
                description: "",
                href: "#",
                label: "Truyện tại trạm",
            },
        ],
        label: "Dự án",
        type: "dropdown",
    },
    {
        href: "/#faq",
        label: "Câu hỏi thường gặp",
        type: "link",
    },
];

export default function NavigationBar() {
    return (
        <header className={"px-4 sticky top-0 z-5 flex h-18 bg-background justify-between drop-shadow-2xl drop-shadow-neutral-200/45 dark:drop-shadow-neutral-200/15"}>
            <div className={"flex gap-4 w-[25vw]"}>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            aria-label={"burger-menu"}
                            className={"self-center lg:hidden"}
                            size={"icon"}
                            variant={"outline"}
                        >
                            <div className={"sr-only"}>Mobile menu</div>
                            <Menu />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className={"max-w-xs"} side={"left"}>
                        <SheetHeader>
                            <SheetTitle>Arknights Vietnam Station</SheetTitle>
                            <SheetDescription>Các đường link trong website.</SheetDescription>
                        </SheetHeader>
                        <div className={"flex flex-col ml-4 gap-4 w-fit"}>
                            {links.map((entry) => {
                                switch (entry.type) {
                                    case "dropdown": {
                                        return (
                                            <details key={entry.label}>
                                                <summary className={"mb-2"}>{entry.label}</summary>
                                                <div className={"flex flex-col gap-y-4 ml-8"}>
                                                    {entry.children.map(subentry => (
                                                        <Link
                                                            href={subentry.href}
                                                            key={`${entry.label}-${subentry.label}`}
                                                        >
                                                            {subentry.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </details>
                                        );
                                    }
                                    case "link": {
                                        return (
                                            <Link
                                                href={entry.href}
                                                key={entry.label}
                                            >
                                                {entry.label}
                                            </Link>
                                        );
                                    }
                                }
                            })}
                        </div>
                        <SheetFooter />
                    </SheetContent>
                </Sheet>
                <Link className={"flex items-center w-[50px]"} href={"/"}>
                    <Image alt={"VNS_Logo_Header"} className={"size-[50px] dark:invert"} src={VNS_Icon} title={"AKVNS Logo"} />
                </Link>
            </div>
            <NavigationMenu aria-label={"nav-bar"} className={"hidden lg:flex w-[50vw]"} viewport={false}>
                <NavigationMenuList className={"gap-x-8"}>
                    {links.map((entry) => {
                        switch (entry.type) {
                            case "dropdown": {
                                return (
                                    <NavigationMenuItem key={entry.label}>
                                        <NavigationMenuTrigger>{entry.label}</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className={"grid w-[300px] gap-4"}>
                                                <li>
                                                    {entry.children.map(subentry => (
                                                        <NavigationMenuLink asChild key={`${entry.label}-${subentry.label}`}>
                                                            <Link href={subentry.href}>
                                                                <div className={"font-medium"}>{subentry.label}</div>
                                                                <div className={"text-muted-foreground"}>
                                                                    {subentry.description}
                                                                </div>
                                                            </Link>
                                                        </NavigationMenuLink>
                                                    ))}
                                                </li>
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                );
                            }
                            case "link": {
                                return (
                                    <NavigationMenuItem key={entry.label}>
                                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                            <Link
                                                className={"relative rounded-none inline-block after:absolute after:bottom-[-0.25em] after:left-1/2 after:h-[3px] after:w-0 after:-translate-x-1/2 after:bg-primary after:transition-[width] after:duration-300 hover:after:w-full"}
                                                href={entry.href}
                                            >
                                                {entry.label}
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                );
                            }
                        }
                    })}
                </NavigationMenuList>
            </NavigationMenu>
            <div className={"flex justify-end items-center gap-3 w-[25vw]"}>
                <DiscordInfoPill />
                <ThemeSwitcher />
            </div>
        </header>
    );
}
