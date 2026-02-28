"use client";

import type { ComponentProps } from "react";
import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";

export function TerraTheme({ children }: ComponentProps<typeof ThemeProvider>) {
    const pathname = usePathname();

    const forcedThemeMap: { [route: string]: "dark" | "light" } = {
        "/": "dark",
        "/contest/standing": "light"
    };

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            forcedTheme={forcedThemeMap[pathname]}
        >
            {children}
        </ThemeProvider>
    );
}
