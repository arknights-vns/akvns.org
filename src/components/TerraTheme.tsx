"use client";

import type { ComponentProps } from "react";
// import { usePathname } from "next/navigation";
import { ThemeProvider } from "next-themes";

export function TerraTheme({ children }: ComponentProps<typeof ThemeProvider>) {
    // const pathname = usePathname();
    //
    // const forcedThemeMap: Record<string, "dark" | "light"> = {};

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={true}
            forcedTheme="dark"
        >
            {children}
        </ThemeProvider>
    );
}
