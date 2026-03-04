import type { Metadata } from "next";
import { Suspense } from "react";
import { getProductionUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Arknights VNS | Nhân sự",
  description: "Toàn bộ nhân sự đang hoạt động tại Arknights VNS",
  alternates: {
    canonical: `${getProductionUrl()}/staff`,
  },
};

export default function StaffPageLayout(props: LayoutProps<"/staff">) {
  return <Suspense>{props.children}</Suspense>;
}
