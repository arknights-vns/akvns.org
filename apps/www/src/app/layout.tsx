import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import { Quicksand as VNS_Font, JetBrains_Mono as VNS_Font_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import Providers from "@/components/Providers";
import "@arknights-vns/shadcn-ui/globals.css";
import { cn } from "@arknights-vns/shadcn-ui/lib/utils";
import ExuStare from "@/components/ExuStare";
import { serverEnv } from "@/env-var/server";
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
          process.env.NODE_ENV === "development" && "border-2 border-primary"
        )}
      >
        <NuqsAdapter>
          <Providers>{props.children}</Providers>
          <ExuStare />
          <GoogleAnalytics gaId={serverEnv.GOOGLE_ANALYTICS_ID} />
          <GoogleTagManager gtmId={serverEnv.GOOGLE_TAG_MANAGER_ID} />
        </NuqsAdapter>
      </body>
    </html>
  );
}

export default RootLayout;
