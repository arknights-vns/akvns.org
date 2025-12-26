"use client";

import type { Route } from "next";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import VNS_Icon from "@public/VNS_Icon.svg";
import {
    BadgeQuestionMark,
    Check,
    ChevronDown,
    Contact,
    Crown,
    Handshake,
    Info,
    type LucideIcon,
    Menu,
    Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import DiscordInfoPill from "@/components/DiscordInfoPill";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
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
        icon:
            | {
                  type: "local";
                  src: StaticImport | string;
              }
            | {
                  type: "lucide";
                  src: LucideIcon;
              }
            | null;
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
        children: [
            {
                href: "/#main",
                description: "Các thông tin tổng quan về Arknights VNS.",
                label: "Giới thiệu",
                icon: {
                    type: "lucide",
                    src: Info,
                },
            },
            {
                href: "/#sponsors",
                description: "Các bên đã và đang hợp tác với Arknights VNS.",
                label: "Đối tác",
                icon: {
                    type: "lucide",
                    src: Handshake,
                },
            },
            {
                description: "",
                href: "/#projects",
                label: "Các dự án của Arknights VNS",
                icon: {
                    type: "lucide",
                    src: Check,
                },
            },
            {
                href: "/#faq",
                label: "Câu hỏi thường gặp",
                description: "",
                icon: {
                    type: "lucide",
                    src: BadgeQuestionMark,
                },
            },
            {
                href: "/#footer",
                description: "",
                label: "Liên hệ",
                icon: {
                    type: "lucide",
                    src: Contact,
                },
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
                icon: {
                    type: "lucide",
                    src: Crown,
                },
            },
            {
                description: "",
                href: "/staff",
                label: "Toàn bộ dàn staff",
                icon: {
                    type: "lucide",
                    src: Users,
                },
            },
        ],
        label: "Nhân sự",
        type: "dropdown",
    },
    {
        href: "/blog",
        label: "Blog",
        type: "link",
    },
    {
        href: "#",
        label: "Truyện tại Trạm",
        type: "link",
    },
];

export default function NavigationBar() {
    return (
        <header className="sticky top-0 z-5 flex h-18 justify-between bg-background px-4">
            <div className="flex w-[25vw] gap-4">
                {/* Mobile */}
                <Sheet>
                    <SheetTrigger
                        render={
                            <Button
                                aria-label="burger-menu"
                                className="self-center lg:hidden"
                                size="icon"
                                variant="outline"
                            >
                                <div className="sr-only">Mobile menu</div>
                                <Menu />
                            </Button>
                        }
                    ></SheetTrigger>
                    <SheetContent className="max-w-xs" side="left">
                        <SheetHeader>
                            <SheetTitle>Arknights Vietnam Station</SheetTitle>
                            <SheetDescription>
                                Các đường link trong website.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="mx-4 flex flex-col gap-4">
                            {/** biome-ignore lint/suspicious/useIterableCallbackReturn: type-checked */}
                            {links.map((entry) => {
                                switch (entry.type) {
                                    case "dropdown": {
                                        return (
                                            <Collapsible
                                                key={`mobile-dropdown-${entry.label}`}
                                                defaultOpen={true}
                                                className="group/collapsible flex flex-col gap-4"
                                            >
                                                <CollapsibleTrigger className="flex">
                                                    {entry.label}
                                                    <ChevronDown className="ml-auto transition-transform group-data-open/collapsible:rotate-180" />
                                                </CollapsibleTrigger>
                                                <CollapsibleContent className="ml-4 flex flex-col gap-4">
                                                    {entry.children.map(
                                                        (subentry) => (
                                                            <Link
                                                                href={
                                                                    subentry.href
                                                                }
                                                                key={`${entry.label}-${subentry.label}`}
                                                                className="place-items-center-safe flex gap-2"
                                                            >
                                                                {subentry.icon &&
                                                                    subentry
                                                                        .icon
                                                                        .type ===
                                                                        "local" && (
                                                                        <Image
                                                                            src={
                                                                                subentry
                                                                                    .icon
                                                                                    .src
                                                                            }
                                                                            alt={`${entry.label}-icon`}
                                                                            width={
                                                                                16
                                                                            }
                                                                            className="dark:invert"
                                                                        />
                                                                    )}
                                                                {subentry.icon &&
                                                                    subentry
                                                                        .icon
                                                                        .type ===
                                                                        "lucide" && (
                                                                        <subentry.icon.src className="size-4" />
                                                                    )}
                                                                {subentry.label}
                                                            </Link>
                                                        ),
                                                    )}
                                                </CollapsibleContent>
                                            </Collapsible>
                                        );
                                    }
                                    case "link": {
                                        return (
                                            <Link
                                                href={entry.href}
                                                key={`mobile-link-${entry.label}`}
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
                <Link className="flex w-[50px] items-center" href="/">
                    <Image
                        alt="VNS_Logo_Header"
                        className="size-[50px] dark:invert"
                        src={VNS_Icon}
                        title="AKVNS Logo"
                    />
                </Link>
            </div>
            {/* Desktop */}
            <NavigationMenu
                aria-label="nav-bar"
                className="hidden w-[50vw] lg:flex"
            >
                <NavigationMenuList className="gap-x-8">
                    {/** biome-ignore lint/suspicious/useIterableCallbackReturn: type-checked */}
                    {links.map((entry) => {
                        switch (entry.type) {
                            case "dropdown": {
                                return (
                                    <NavigationMenuItem
                                        key={`desktop-downdown-${entry.label}`}
                                    >
                                        <NavigationMenuTrigger>
                                            {entry.label}
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid w-[300px] gap-4">
                                                <li>
                                                    {entry.children.map(
                                                        (subentry) => (
                                                            <NavigationMenuLink
                                                                render={
                                                                    <Link
                                                                        href={
                                                                            subentry.href
                                                                        }
                                                                        className="flex flex-col items-start"
                                                                    >
                                                                        <div className="place-items-center-safe flex gap-2">
                                                                            {/* <div> */}
                                                                            {subentry.icon &&
                                                                                subentry
                                                                                    .icon
                                                                                    .type ===
                                                                                    "local" && (
                                                                                    <Image
                                                                                        src={
                                                                                            subentry
                                                                                                .icon
                                                                                                .src
                                                                                        }
                                                                                        alt={`${entry.label}-icon`}
                                                                                        width={
                                                                                            16
                                                                                        }
                                                                                        className="dark:invert"
                                                                                    />
                                                                                )}
                                                                            {subentry.icon &&
                                                                                subentry
                                                                                    .icon
                                                                                    .type ===
                                                                                    "lucide" && (
                                                                                    <subentry.icon.src />
                                                                                )}
                                                                            {/* </div> */}
                                                                            <div>
                                                                                {
                                                                                    subentry.label
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        <div className="text-muted-foreground">
                                                                            {
                                                                                subentry.description
                                                                            }
                                                                        </div>
                                                                    </Link>
                                                                }
                                                                key={`${entry.label}-${subentry.label}`}
                                                            ></NavigationMenuLink>
                                                        ),
                                                    )}
                                                </li>
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                );
                            }
                            case "link": {
                                return (
                                    <NavigationMenuItem
                                        key={`desktop-link-${entry.label}`}
                                    >
                                        <NavigationMenuLink
                                            render={
                                                <Link
                                                    className="after:-translate-x-1/2 relative inline-block after:absolute after:bottom-[-0.25em] after:left-1/2 after:h-[3px] after:w-0 after:bg-primary after:transition-[width] after:duration-300 hover:after:w-full"
                                                    href={entry.href}
                                                >
                                                    {entry.label}
                                                </Link>
                                            }
                                            className={navigationMenuTriggerStyle()}
                                        ></NavigationMenuLink>
                                    </NavigationMenuItem>
                                );
                            }
                        }
                    })}
                </NavigationMenuList>
            </NavigationMenu>
            <div className="flex w-[25vw] items-center justify-end gap-3">
                <DiscordInfoPill />
                <ThemeSwitcher />
            </div>
        </header>
    );
}
