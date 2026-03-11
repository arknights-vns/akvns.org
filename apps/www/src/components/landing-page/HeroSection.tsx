import { cn } from "@arknights-vns/shadcn-ui/lib/utils";
import { ArrowDown } from "lucide-react";
import { Caveat } from "next/font/google";

import RevealText from "@/components/ui/reveal-text";

const fontCaveat = Caveat({
  weight: "400",
  subsets: ["latin"],
});

export default function HeroSection() {
  return (
    <div className="h-[85vh] w-full bg-muted bg-[url(/hero.jpg)] bg-cover bg-center bg-no-repeat bg-blend-overlay dark:bg-muted">
      <div className="flex size-full flex-col place-items-center-safe justify-between">
        <div />
        <div className="flex flex-col place-items-center-safe gap-4 text-center">
          <div className="text-xl">Xin chào mọi người, tụi mình là...</div>
          <RevealText
            className={cn(
              fontCaveat.className,
              "font-caveat text-center text-6xl text-primary text-shadow-lg text-shadow-red-600/30 md:text-8xl",
            )}
            direction="up"
          >
            Arknights Vietnam Station
          </RevealText>
          <figcaption className="text-xl font-bold">
            Dù bạn có đang là <span className="text-cyan-400">Doctor</span> hay{" "}
            <span className="text-yellow-400">Endministrator</span>, chào mừng bạn đến với Arknights VNS!
          </figcaption>
        </div>
        <div className="grid w-[98svw] grid-cols-3 place-items-center-safe">
          <div />
          <div className="my-4 flex place-items-center-safe gap-1 rounded-full border border-primary bg-secondary px-4 py-2">
            <ArrowDown size={24} />
            <span className="hidden md:block">Lướt xuống để xem thêm</span>
          </div>
          <div />
        </div>
      </div>
    </div>
  );
}
