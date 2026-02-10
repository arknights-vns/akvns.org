import type { Metadata } from "next";
import ContentArea from "@/components/ContentArea";
import FatFooter from "@/components/FatFooter";
import NavigationBar from "@/components/navbar/NavigationBar";
import WeAreCooking from "@/components/WeAreCooking";

export const metadata: Metadata = {
  title: "Arknights VNS | Trang không tồn tại",
};

export default function NotFound() {
  return (
    <main>
      <NavigationBar />
      <ContentArea className="flex h-[85dvh] items-center justify-center">
        <WeAreCooking />
      </ContentArea>
      <FatFooter />
    </main>
  );
}
