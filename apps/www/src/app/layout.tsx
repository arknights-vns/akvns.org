import type { Metadata, Viewport } from "next";

import { cn } from "@arknights-vns/shadcn-ui/lib/utils";
import { Quicksand as VNS_Font, JetBrains_Mono as VNS_Font_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "@arknights-vns/shadcn-ui/globals.css";
import { Suspense } from "react";

import Analytics from "@/components/Analytics";
import DearUserPleaseUseAdBlocker from "@/components/DearUserPleaseUseAdBlocker";
import ExuStare from "@/components/ExuStare";
import Providers from "@/components/Providers";
import { createMetadata } from "@/lib/utils";

const fontSans = VNS_Font({
  subsets: ["latin", "vietnamese"],
  variable: "--font-vns",
});

const fontMono = VNS_Font_Mono({
  subsets: ["latin", "vietnamese"],
  variable: "--font-vns-mono",
});

const PAGE_TITLE = "Arknights Vietnam Station";
const PAGE_DESC = "For the Dreamchasers, by the Dreamchasers.";

export const metadata: Metadata = {
  ...createMetadata(PAGE_TITLE, PAGE_DESC),
  title: {
    template: "Arknights VNS | %s",
    default: "Arknights VNS | Trang chủ",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  initialScale: 1,
  themeColor: "#fe0606",
};

function RootLayout(props: LayoutProps<"/">) {
  return (
    <html className="dark" data-scroll-behavior="smooth" lang="vi">
      <body
        className={cn(
          `${fontSans.variable} ${fontMono.variable} font-sans antialiased`,
          process.env.NODE_ENV === "development" && "border-2 border-primary",
        )}
      >
        <NuqsAdapter>
          <Providers>
            {props.children}
            {/* https://nextjs.org/docs/messages/next-prerender-current-time-client */}
            <Suspense>
              <DearUserPleaseUseAdBlocker />
            </Suspense>
          </Providers>
          <ExuStare />
          <Analytics />
        </NuqsAdapter>
      </body>
    </html>
  );
}

export default RootLayout;
