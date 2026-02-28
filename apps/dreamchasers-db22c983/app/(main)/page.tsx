"use client";

import type { StaticImageData } from "next/image";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import DRCH_Banner from "@/public/DRCH_Banner_Group.png";
import Jiangles_Banner from "@/public/organizers/jiangles_banner.png";
import ModSquad_Banner from "@/public/organizers/mod_squad_banner.png";
import VNS_Banner from "@/public/organizers/vns_banner.png";

type TimeLeft = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

type OrganizerImageProps = {
    src: StaticImageData;
    alt: string;
};

function OrganizerImage(props: OrganizerImageProps) {
    return (
        <Image
            alt={props.alt}
            className="h-[40px] w-auto object-contain invert dark:invert-0"
            src={props.src}
        />
    );
}

export default function Home() {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]);
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: -1, hours: -1, minutes: -1, seconds: -1 });

    useEffect(() => {
        const targetDate = Date.parse("2025-08-10T09:15:00+07:00");
        const now = Date.now();
        let difference = targetDate - now;

        const interval = setInterval(() => {
            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }

            difference -= 1000;
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex h-visible bg-background/50">
            {/* Image carousel. */}
            <div
                ref={emblaRef}
                className="absolute inset-0 -z-1 size-full embla"
            >
                <div className="embla__container size-full">
                    {[1, 2, 3, 4, 5, 6].map(img => (
                        <div
                            key={img}
                            className="relative size-full embla__slide"
                        >
                            <Image
                                alt={`Banner ${img + 1}`}
                                className="object-cover"
                                fill
                                priority
                                src={`/landing-bg/BG_${img}.jpg`}
                            />
                        </div>
                    ))}
                </div>
            </div>
            {/* The real shit. */}
            <div className="flex flex-1/2 flex-col items-center justify-center space-y-4">
                <Image
                    alt="DRCH"
                    className="invert dark:invert-0"
                    height={185}
                    priority
                    src={DRCH_Banner}
                    width={727}
                />
                <div className="flex w-full max-w-lg items-center justify-center px-8">
                    <div className="text-2xl font-bold md:text-4xl">
                        {
                            Object.entries(timeLeft).map(item => (
                                item[1] !== -1 ? item[1].toString().padStart(2, "0") : "--"
                            )).join(":")
                        }
                    </div>
                </div>
                <div className="absolute bottom-5 flex flex-col gap-y-2 text-center">
                    <span className="font-extrabold">Được mang đến cho bạn bởi</span>
                    <div className="flex w-[96vw] items-center justify-between text-primary md:w-[60vw] lg:w-[40vw]">
                        <OrganizerImage alt="VNS" src={VNS_Banner} />
                        <div className="text-xl md:block md:px-4">
                            •
                        </div>
                        <OrganizerImage alt="Mod_Squad" src={ModSquad_Banner} />
                        <div className="text-xl md:block md:px-4">
                            •
                        </div>
                        <OrganizerImage alt="Jiangles" src={Jiangles_Banner} />
                    </div>
                </div>
            </div>
        </div>
    );
}
