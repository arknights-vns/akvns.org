import type { Viewport } from "next";
import type React from "react";
import { Quicksand as VNS_Font, Geist_Mono as VNS_Font_Mono } from "next/font/google";
import { TerraTheme } from "@/components/TerraTheme";
import "./globals.css";

const font = VNS_Font({
    variable: "--font-vns",
    subsets: ["latin", "vietnamese"],
});

const fontMono = VNS_Font_Mono({
    variable: "--font-vns-mono",
    subsets: ["latin"],
});

export const viewport: Viewport = {
    colorScheme: "light dark",
    initialScale: 1.0,
    themeColor: "#fe0606",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang={"en"} suppressHydrationWarning>
            <body className={`${font.variable} ${fontMono.variable} font-sans antialiased`}>
                <TerraTheme>{children}</TerraTheme>
            </body>
        </html>
    );
}
