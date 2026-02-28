"use client";

import type { ReactNode } from "react";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { FaDiscord } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

function underlineStyle(currentPath: string, targetPathPrefx: string) {
    const active = currentPath.startsWith(targetPathPrefx);

    return clsx(
        `
            relative cursor-pointer rounded-md py-1 text-lg transition-all
            duration-200 ease-in-out
            after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full
            after:transform after:transition-transform after:duration-200
            after:ease-in-out after:content-['']
            hover:font-bold
        `,
        {
            "font-bold after:scale-x-100 after:bg-primary": active,
            "after:scale-x-0 hover:after:scale-x-100": !active
        }
    );
}

type DesktopDropdownProps = {
    title: string;
    items: Array<{ href: string; label: string }>;
    pathname: string;
    pathPrefix: string;
};

function MobileDropdown({
    title,
    items,
    pathname
}: {
    title: string;
    items: Array<{ href: string; label: string }>;
    pathname: string;
}) {
    return (
        <details>
            <summary className="mb-2">{title}</summary>
            <div className="flex flex-col space-y-4">
                {items.map(item => (
                    <Link
                        key={item.href}
                        className={
                            clsx(
                                "ml-8 px-3 py-2",
                                { "bg-primary font-bold text-secondary": pathname.startsWith(item.href) }
                            )
                        }
                        href={item.href}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </details>
    );
}

function DesktopDropdown({ title, items, pathname, pathPrefix }: DesktopDropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className={clsx(`
                        px-0
                        hover:bg-transparent!
                        data-[state=closed]:ring-0
                        data-[state=open]:font-bold data-[state=open]:underline
                        data-[state=open]:decoration-2
                        data-[state=open]:underline-offset-8
                    `, underlineStyle(pathname, pathPrefix))}
                    variant="ghost"
                >
                    {title}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52 bg-background shadow-xs shadow-primary/50">
                {items.map(item => (
                    <DropdownMenuItem key={item.href} asChild>
                        <Link
                            className={
                                clsx(`
                                    my-1 block w-full cursor-pointer rounded-md
                                    px-2 text-center
                                    focus:bg-secondary focus:font-extrabold
                                `, {
                                    "bg-primary font-extrabold text-secondary": pathname === item.href,
                                    "text-primary": pathname !== item.href
                                })
                            }
                            href={item.href}
                        >
                            {item.label}
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function NavLink({
    pathPrefix,
    children,
    pathname
}: {
    pathPrefix: string;
    children: ReactNode;
    pathname: string;
}) {
    return (
        <Link
            className={underlineStyle(pathname, pathPrefix)}
            href={pathPrefix}
        >
            <div className="text-lg">{children}</div>
        </Link>
    );
}

function NavDivider({ width = "w-8" }: { width?: string }) {
    return (
        <div className={clsx("h-0.5 bg-primary", width)} />
    );
}

export default function NavBarItems({ isMobile = false }: { isMobile?: boolean }) {
    const links: { label: string; href: string }[] = [
        { label: "Tổ chức", href: "/crew" },
        { label: "Kỷ niệm", href: "/retro" }
    ];

    const eventItems: { label: string; href: string }[] = [
        { href: "/event/roadmap", label: "Công tác chuẩn bị" },
        { href: "/event/schedule", label: "Hoạt động của Offline" },
        { href: "/event/location", label: "Địa điểm tổ chức" },
        { href: "/event/regulations", label: "Nội quy tham gia" }
    ];
    const pathname = usePathname();

    if (isMobile) {
        return (
            <div className="flex flex-col space-y-4">
                <MobileDropdown items={eventItems} pathname={pathname} title="Sự kiện" />
                {links.map(link => (
                    <Link
                        key={link.label}
                        className={
                            clsx(
                                "px-3 py-2",
                                { "bg-primary font-bold text-background": pathname.startsWith(link.href) }
                            )
                        }
                        href={link.href}
                    >
                        {link.label}
                    </Link>
                ))}
                {/* <MobileDropdown items={tournamentItems} pathname={pathname} title="Tournament" /> */}
                <Separator className="mx-3 my-2 h-[2px] bg-muted" />
                <Link
                    className="px-3 py-2"
                    href="https://discord.gg/arknights-vns"
                >
                    <div className="flex items-center gap-2">
                        <FaDiscord />
                        Arknights VNS
                    </div>
                </Link>
                <Link
                    className="px-3 py-2"
                    href="https://discord.gg/JrZaEVu5Hz"
                >
                    <div className="flex items-center gap-2">
                        <FaDiscord />
                        Dreamchasers
                    </div>
                </Link>
            </div>
        );
    }

    return (
        <div className="mr-1 hidden cursor-pointer items-center gap-3 lg:flex">
            <DesktopDropdown
                items={eventItems}
                pathPrefix="/event"
                pathname={pathname}
                title="Sự kiện"
            />
            <NavDivider />
            {links.map((link, index) => (
                <Fragment key={link.label}>
                    {index !== 0 && <NavDivider />}
                    <NavLink pathPrefix={link.href} pathname={pathname}>
                        {link.label}
                    </NavLink>
                </Fragment>
            ))}
            <NavDivider width="w-28" />
        </div>
    );
}
