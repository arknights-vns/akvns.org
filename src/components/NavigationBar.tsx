import type { Route } from "next";
import VNS_Logo from "@public/VNS.svg";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const links: { label: string, href: Route }[] = [
    { label: "Về chúng mình", href: "#about", },
    { label: "Dự án", href: "#projects", },
    { label: "Nhân sự", href: "#human-resources", },
    { label: "Truyện tại Trạm", href: "#translations", },
];

export default function NavigationBar() {
    return (
        <header className={"sticky top-0 z-50 flex h-18 w-full justify-between bg-background drop-shadow-2xl drop-shadow-neutral-400/15"}>
            <div className={"flex"}>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            className={"ml-4 self-center lg:hidden"}
                            size={"icon"}
                            variant={"outline"}
                            aria-label={"burger-menu"}
                        >
                            <Menu />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className={"max-w-2/3!"} side={"left"}>
                        <SheetHeader>
                            <SheetTitle>Arknights Vietnam Station</SheetTitle>
                            <SheetDescription>Các đường link trong website.</SheetDescription>
                        </SheetHeader>
                        <div className={"mt-2 ml-4 grid gap-2 py-6"}>
                            {links.map((entry) => {
                                return (
                                    <Link key={entry.label} href={entry.href}>
                                        {entry.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </SheetContent>
                </Sheet>
                <Link className={"ml-4 flex items-center gap-4 md:ml-12"} href={"/"}>
                    <Image alt={"VNS_Logo_Header"} className={"size-[50px] dark:invert"} src={VNS_Logo} />
                </Link>
            </div>
            <NavigationMenu className={"hidden gap-6 lg:flex"} viewport aria-label={"nav-bar"}>
                <NavigationMenuList className={"gap-x-8"}>
                    {links.map((entry) => {
                        return (
                            <NavigationMenuItem key={entry.label}>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link
                                        href={entry.href}
                                        className={"relative inline-block after:absolute after:bottom-[-0.25em] after:left-1/2 after:h-[3px] after:w-0 after:-translate-x-1/2 after:bg-current after:transition-[width] after:duration-300 hover:after:w-full"}
                                    >
                                        {entry.label}
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        );
                    })}
                </NavigationMenuList>
            </NavigationMenu>
            <div className={"flex items-center space-x-2"}>
                <ThemeSwitcher />
            </div>
        </header>
    );
}
