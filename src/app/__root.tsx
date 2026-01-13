/// <reference types="vite/client" />

import type { RouterContext } from "@/router-context";
import Amiya from "@resources/image/amiya.png";
import ogImage from "@resources/image/opengraph-image.jpg";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, HeadContent, Link, Outlet, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Image } from "@unpic/react";

import FatFooter from "@/components/FatFooter";
import NavigationBar from "@/components/NavigationBar";
import Providers from "@/components/Providers";
import { clientEnv } from "@/env/client";

import FavIconDark from "/favicon-dark.ico?url";
import FavIconLight from "/favicon-light.ico?url";
import appCss from "./globals.css?url";

const SITE_URL = import.meta.env.DEV ? "http://localhost:3000" : clientEnv.VITE_PRODUCTION_URL;
const PAGE_TITLE = "Arknights Vietnam Station";
const PAGE_DESC = "For the Dreamchasers, by the Dreamchasers.";
const PAGE_IMAGE = `${SITE_URL}${ogImage}`;

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      { title: PAGE_TITLE },
      {
        name: "description",
        content: PAGE_DESC,
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        name: "keywords",
        content: "arknights,arknights vietnam station,terrastationvn,arknights endfield,endministrator",
      },
      {
        name: "theme-color",
        content: "#fe0606",
      },
      {
        name: "color-scheme",
        content: "dark",
      },
      { property: "og:url", content: SITE_URL },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
      {
        property: "og:image",
        content: PAGE_IMAGE,
      },
      { property: "og:locale", content: "vi_VN" },
      { name: "twitter:url", content: SITE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESC },
      {
        name: "twitter:image",
        content: PAGE_IMAGE,
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "icon",
        href: "/favicon.ico",
      },
      {
        rel: "icon",
        href: FavIconLight,
        media: "(prefers-color-scheme: light)",
      },
      {
        rel: "icon",
        href: FavIconDark,
        media: "(prefers-color-scheme: dark)",
      },
    ],
  }),
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootLayout() {
  // for lint-sensitive bros, the <title> is handled by TanStack
  // noinspection HtmlRequiredTitleElement
  return (
    <html className="dark" data-scroll-behavior="smooth" lang="vi">
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased">
        <Providers>
          <Outlet />
        </Providers>
        <TanStackDevtools
          config={{
            position: "bottom-left",
          }}
          plugins={[
            {
              name: "TanStack Query",
              render: <ReactQueryDevtoolsPanel />,
              defaultOpen: true,
            },
            {
              name: "TanStack Router",
              render: <TanStackRouterDevtoolsPanel />,
              defaultOpen: false,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  return (
    <>
      <NavigationBar />
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
        <Image alt="Amiya" height={480} src={Amiya} width={240} />
        <span className="font-bold text-4xl">Hông có gì ở đây hết...</span>
        <div>
          <Link className="font-extrabold underline" to="/">
            Bấm vào đây
          </Link>{" "}
          để quay về trang chính,{" "}
          <span className="text-neutral-400 italic">hoặc là bạn nên ở lại thêm tí nữa?</span>
        </div>
      </main>
      <FatFooter />
    </>
  );
}
