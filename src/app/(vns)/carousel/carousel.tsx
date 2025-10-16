"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import carouselData from "@/app/(vns)/data/carouselData.json";

interface item {
    image: string;
    title: string;
}

export default function Carousel() {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]);

    return (
        <div className="embla items-center">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container flex">
                    {/* holds all slides horizontal */}
                    {carouselData.map((item: item) => (
                        <div
                            className="
                    embla__slide 
                    flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%]
                    flex flex-col items-center justify-center"
                            key={item.title}>
                            <Image src={item.image} alt={item.title} className="w-38 h-full object-fit-cover" />
                            <h1 className="font-bold mt-2 text-center">{item.title}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
