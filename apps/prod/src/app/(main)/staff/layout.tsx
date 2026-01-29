import { clientEnv } from "@arknights-vns/env-var/client";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Arknights VNS | Nhân sự",
  description: "Toàn bộ nhân sự đang hoạt động tại Arknights VNS",
  alternates: {
    canonical: `${clientEnv.NEXT_PUBLIC_PRODUCTION_URL}/staff`,
  },
};

export default function StaffPageLayout(props: LayoutProps<"/staff">) {
  return <Suspense>{props.children}</Suspense>;
}
