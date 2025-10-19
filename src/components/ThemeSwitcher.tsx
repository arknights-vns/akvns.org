"use client";

import { Moon, Sun } from "lucide-react";
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
            <DropdownMenuTrigger asChild>
                <Button aria-label={"theme-switcher"} size={"icon"}>
                    <Sun className={"size-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"} />
                    <Moon className={"absolute size-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={"end"} className={"mt-1"}>
                <DropdownMenuRadioGroup onValueChange={setTheme} value={theme}>
                    <DropdownMenuRadioItem aria-label={"theme-light"} value={"light"}>
                        Sáng
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem aria-label={"theme-dark"} value={"dark"}>
                        Tối
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value={"system"}>Thiết bị</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
