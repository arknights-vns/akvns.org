import type { Metadata } from "next";

import WeAreCooking from "@/components/WeAreCooking";

export const metadata: Metadata = {
  title: "Arknights VNS | Not Found",
};

export default function NotFound() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div>
        <WeAreCooking />
      </div>
    </div>
  );
}
