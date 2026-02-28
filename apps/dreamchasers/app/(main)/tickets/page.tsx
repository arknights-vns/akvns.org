"use client";

import type { StaticImageData } from "next/image";
import Image from "next/image";
import { useState } from "react";
import PageTitle from "@/components/PageTitle";
import PurchaseTicketButton from "@/components/PurchaseTicketButton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import PrismaDolphin from "@/public/tickets/prisma_dolphin.jpg";
import PrismaDRCH from "@/public/tickets/prisma_drch.jpg";
import PrismaWhale from "@/public/tickets/prisma_whale.jpg";
import ShirtPreview from "@/public/tickets/shirt_preview.png";

type TicketCardProps = {
    tier: string;
    price: string;
    image: StaticImageData;
    parentTier?: string;
    description: string[];
};

function TicketCard(props: TicketCardProps) {
    const [isImageOverlayOpen, setImageOverlayOpen] = useState(false);

    return (
        <>
            <Card className="m-4 flex max-h-128 min-w-84 flex-col items-center rounded-3xl border-2 border-primary py-0">
                <CardHeader className="relative mt-4 w-full px-4">
                    <Image
                        alt="BG"
                        className="h-16 w-full rounded-xl opacity-90"
                        src={props.image}
                    />
                    <div
                        className="absolute top-0 left-0 flex h-16 w-full items-center justify-center text-center text-2xl font-bold text-black md:text-3xl lg:text-4xl"
                    >
                        {props.tier.toUpperCase()}
                    </div>
                </CardHeader>
                <CardContent className="flex h-57 flex-col gap-y-2 text-center">
                    <span className="text-lg font-extrabold text-green-400 underline">
                        {
                            props.parentTier
                                ? (`✓ Bao gồm quà từ vé ${props.parentTier}`)
                                : ""
                        }
                    </span>
                    {props.description.map(line => (
                        <div
                            key={line}
                            className="text-lg"
                        >
                            ✓
                            {" "}
                            {line}
                        </div>
                    ))}
                    {props.tier === "Dreamchasers" && (
                        <Image
                            alt="Áo thun Dreamchasers"
                            className="my-2 cursor-pointer self-center rounded-lg object-cover transition-opacity hover:opacity-80"
                            height={120}
                            src={ShirtPreview}
                            onClick={() => setImageOverlayOpen(true)}
                        />
                    )}
                </CardContent>
                <CardFooter className="mb-2 gap-x-2 text-center">
                    <div className="mb-0 text-4xl font-extrabold">{props.price}</div>
                    <div className="text-lg font-bold tracking-widest">VNĐ</div>
                </CardFooter>
            </Card>
            {/* Image Overlay */}
            {isImageOverlayOpen && (
                <div
                    className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-neutral-700/90"
                    onClick={() => setImageOverlayOpen(false)}
                >

                    <Image
                        alt="Áo thun Dreamchasers - Full Size"
                        className="max-h-[65vh] max-w-[95vw] object-contain"
                        src={ShirtPreview}
                    />
                </div>
            )}
        </>
    );
}

export default function TicketOverviewPage() {
    return (
        <div className="flex h-visible flex-col bg-vns">
            <PageTitle favorText="(đã bán hết, dành cho các bạn muốn xem lại hạng vé của mình)" title="Mua vé" />
            <div className="flex w-screen flex-col items-center justify-center">
                <div className="flex flex-col justify-evenly lg:flex-row">
                    <TicketCard
                        description={[
                            "Keychain Amiya - Chasing The Dream",
                            "Sticker (ngẫu nhiên 1 trong 4)",
                            "Badge nắp chai by Rei Não Cá",
                            "Card bo góc by Rei Não Cá"
                        ]}
                        image={PrismaDolphin}
                        price="119.000"
                        tier="Dolphin"
                    />
                    <TicketCard
                        description={["Badge Amiya - Chasing The Dream", "Lanyard - Dreamchasers"]}
                        image={PrismaWhale}
                        parentTier="Dolphin"
                        price="199.000"
                        tier="Whale"
                    />
                    <TicketCard
                        description={[
                            "Badge Logos/Eyja của bibom10",
                            "Áo thun Dreamchasers (hình dưới)"
                        ]}
                        image={PrismaDRCH}
                        parentTier="Whale"
                        price="269.000"
                        tier="Dreamchasers"
                    />
                </div>
                <PurchaseTicketButton />
            </div>
        </div>
    );
}
