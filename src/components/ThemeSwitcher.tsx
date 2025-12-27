"use client";

import { MonitorSmartphone, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeSwitcher() {
    const { setTheme, theme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button aria-label="theme-switcher" size="icon-lg">
                        <div className="sr-only">Theme switcher</div>
                        <Sun className="dark:-rotate-90 size-[1.2rem] rotate-0 scale-100 transition-all dark:scale-0" />
                        <Moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    </Button>
                }
            ></DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="mt-1">
                <DropdownMenuRadioGroup onValueChange={setTheme} value={theme}>
                    <DropdownMenuRadioItem
                        aria-label="theme-light"
                        value="light"
                    >
                        <Sun />
                        Sáng
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem aria-label="theme-dark" value="dark">
                        <Moon />
                        Tối
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="system">
                        <MonitorSmartphone />
                        Thiết bị
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
