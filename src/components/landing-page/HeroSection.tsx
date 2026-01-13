import { ArrowDown } from "lucide-react";
import { Caveat } from "next/font/google";

import RevealText from "@/components/smoothui/reveal-text";
import { cn } from "@/lib/utils";

const fontCaveat = Caveat({
  weight: "400",
});

export default function HeroSection() {
  return (
    <figure className="h-[85vh] w-full bg-[url(/hero.jpg)] bg-center bg-cover bg-muted bg-no-repeat bg-blend-overlay">
      <div className="place-items-center-safe flex size-full flex-col justify-between">
        <div />
        <div className="place-items-center-safe flex flex-col gap-4 text-center">
          <div className="text-xl">Xin chào mọi người, tụi mình là...</div>
          <RevealText
            className={cn(
              fontCaveat.className,
              "text-center font-caveat text-6xl text-primary text-shadow-lg text-shadow-red-600/30 md:text-8xl"
            )}
            direction="up"
          >
            Arknights Vietnam Station
          </RevealText>
          <figcaption className="font-bold text-xl">
            Dù bạn có đang là <span className="text-cyan-400">Doctor</span> hay{" "}
            <span className="text-yellow-400">Endministrator</span>, chào mừng bạn đến với Arknights VNS!
          </figcaption>
        </div>
        <div className="place-items-center-safe grid w-[98svw] grid-cols-3">
          <div />
          <div className="place-items-center-safe my-4 flex gap-1 rounded-full border bg-secondary px-4 py-2">
            <ArrowDown size={24} />
            <span className="hidden md:block">Lướt xuống để xem thêm</span>
          </div>
          <div className="relative -z-2 text-center text-primary">
            <span className="hidden md:inline">L2Etd29ybGQteWV0LXRvLWtub3du</span>
          </div>
        </div>
      </div>
    </figure>
  );
}
