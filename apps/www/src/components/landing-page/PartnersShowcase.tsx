"use client";

import { Carousel, CarouselContent, CarouselItem } from "@arknights-vns/shadcn-ui/components/carousel";
import { FootNote, Heading } from "@arknights-vns/shadcn-ui/components/extension/typography";
import { cn } from "@arknights-vns/shadcn-ui/lib/utils";
import partnerList from "@resources/data/partner.json";
import AutoScroll from "embla-carousel-auto-scroll";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import ContentArea from "@/components/ContentArea";

export default function PartnersShowcase() {
  return (
    <ContentArea className="w-[99vw] space-y-8 text-center" id="partners">
      <Heading className="text-primary" kind="h1">
        Các đối tác của Arknights VNS
      </Heading>
      <Heading kind="h2">Fanpage</Heading>
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        plugins={[
          AutoScroll({
            stopOnInteraction: false,
          }),
        ]}
      >
        <CarouselContent className="place-items-center-safe">
          {partnerList
            .filter((data) => data.type === "fanpage")
            .map((data) => (
              <CarouselItem
                className="place-items-center-safe flex basis-1/2 flex-col gap-2 md:basis-1/4 lg:basis-1/5"
                key={data.title}
              >
                <Link className={cn(data.url === "#" && "pointer-events-none")} href={data.url as Route}>
                  <Image
                    alt={data.title}
                    className="aspect-square size-37.5 rounded-full border-2"
                    height={150}
                    src={data.image}
                    width={150}
                  />
                </Link>
                <FootNote className="font-bold text-lg">{data.title}</FootNote>
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
      <Heading kind="h2">Artist</Heading>
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {partnerList
          .filter((data) => data.type === "artist")
          .map((entry) => {
            return (
              <div className="place-items-center-safe flex flex-col gap-2" key={entry.title}>
                <Link className={cn(entry.url === "#" && "pointer-events-none")} href={entry.url as Route}>
                  <Image
                    alt={entry.title}
                    className="size-37.5 rounded-full border-2"
                    height={150}
                    src={entry.image}
                    width={150}
                  />
                </Link>
                <FootNote className="font-bold text-lg">{entry.title}</FootNote>
              </div>
            );
          })}
      </div>
    </ContentArea>
  );
}
