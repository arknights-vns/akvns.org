"use client";

import type { NavComponentProps } from "@/components/navbar/navigation-type";
import Link from "next/link";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export default function DesktopNavigationMenu(props: NavComponentProps) {
    return (
        <NavigationMenu
            aria-label="nav-bar"
            className="hidden w-[50vw] lg:flex"
        >
            <NavigationMenuList className="gap-x-8">
                {props.links.map((entry) => (
                    <NavigationMenuItem key={entry.label}>
                        {entry.type === "dropdown" && (
                            <>
                                <NavigationMenuTrigger className="rounded-none bg-transparent">
                                    {entry.label}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="w-75">
                                        {entry.children.map((subentry) => (
                                            <li key={subentry.label}>
                                                <NavigationMenuLink
                                                    render={
                                                        <Link
                                                            href={subentry.href}
                                                            className="flex flex-col items-start"
                                                        >
                                                            <div className="place-items-center-safe flex gap-2">
                                                                {subentry.icon && (
                                                                    <subentry.icon
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                )}
                                                                {subentry.label}
                                                            </div>
                                                            <span className="text-muted-foreground">
                                                                {
                                                                    subentry.description
                                                                }
                                                            </span>
                                                        </Link>
                                                    }
                                                    key={`${entry.label}-${subentry.label}`}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </>
                        )}
                        {entry.type === "link" && (
                            <NavigationMenuLink
                                render={
                                    <Link
                                        className="after:-translate-x-1/2 after:-bottom-1 after:absolute after:left-1/2 after:h-1 after:w-0 after:bg-primary after:transition-[width] after:duration-300 hover:after:w-full"
                                        href={entry.href}
                                    >
                                        {entry.label}
                                    </Link>
                                }
                                className={cn(
                                    navigationMenuTriggerStyle(),
                                    "rounded-none",
                                    "bg-transparent",
                                )}
                            />
                        )}
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}
