import type { Metadata } from "next";
import { Suspense } from "react";
import LoadingLappy from "@/components/LoadingLappy";

export const metadata: Metadata = {
  title: "Arknights VNS | Truyện tại Trạm",
  description:
    "Các đầu truyện do đội ngũ dịch thuật @terrastationvn hoặc các bên có hợp tác với Arknights VNS.",
};

export default function ComicPageLayout(props: LayoutProps<"/comic">) {
  return <Suspense fallback={<LoadingLappy />}>{props.children}</Suspense>;
}
