import type { Metadata } from "next";
import { Suspense } from "react";
import { clientEnv } from "@/env/client";

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
