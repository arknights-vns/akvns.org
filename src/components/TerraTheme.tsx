"use client";

import type { ComponentProps } from "react";

import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";

export function TerraTheme({ children }: ComponentProps<typeof ThemeProvider>) {
    const pathname = usePathname();

    const forcedThemeMap: Record<string, "dark" | "light"> = {};

    return (
        <ThemeProvider attribute={"class"} defaultTheme={"system"} enableSystem forcedTheme={forcedThemeMap[pathname]}>
            {children}
        </ThemeProvider>
    );
}
