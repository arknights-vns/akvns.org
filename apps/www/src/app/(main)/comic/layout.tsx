import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Arknights VNS | Truyện tại Trạm",
  description:
    "Các đầu truyện do đội ngũ dịch thuật @terrastationvn hoặc các bên có hợp tác với Arknights VNS.",
};

export default function ComicPageLayout(props: LayoutProps<"/comic">) {
  return <Suspense>{props.children}</Suspense>;
}
