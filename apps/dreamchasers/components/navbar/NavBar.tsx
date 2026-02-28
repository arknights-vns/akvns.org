"use client";

import clsx from "clsx";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LandingCTAButton from "@/components/LandingCTAButton";
import NavBarItems from "@/components/navbar/NavBarItems";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import DRCH_Logo from "@/public/DRCH_Logo.png";

export default function NavBar() {
    const pathName = usePathname();

    const shouldHidden = [
        "/contest/standing",
        "/contest/voting"
    ].includes(pathName);

    return (
        <header className={
            clsx("sticky top-0 z-50 h-20 w-full bg-background/75 shadow-xs/50 shadow-primary backdrop-blur-lg", {
                flex: !shouldHidden,
                hidden: shouldHidden
            })
        }
        >
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        className="ml-4 self-center lg:hidden"
                        size="icon"
                        variant="outline"
                    >
                        <Menu />
                    </Button>
                </SheetTrigger>
                <SheetTitle />
                <SheetDescription />
                <SheetContent className="max-w-2/3!" side="left">
                    <div className="mt-2 ml-4 grid gap-2 py-6">
                        <NavBarItems isMobile />
                    </div>
                </SheetContent>
            </Sheet>
            <Link className="ml-4 flex items-center gap-4" href="/" prefetch={false}>
                <Image
                    alt="DRCH_Logo"
                    className="size-[50px] dark:invert"
                    src={DRCH_Logo}
                />
                <span className="hidden text-xl font-bold md:inline">
                    Dreamchasers
                </span>
            </Link>
            <nav className="ml-auto hidden gap-6 lg:flex">
                <NavBarItems />
            </nav>
            <div className="ml-auto flex items-center space-x-2 lg:ml-1">
                <LandingCTAButton />
                <ThemeSwitcher />
            </div>
        </header>
    );
}
