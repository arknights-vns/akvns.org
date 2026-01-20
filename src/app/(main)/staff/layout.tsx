import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arknights VNS | Nhân sự",
  description: "Toàn bộ nhân sự đang hoạt động tại Arknights VNS",
};

export default function StaffPageLayout(props: LayoutProps<"/staff">) {
  return <>{props.children}</>;
}
