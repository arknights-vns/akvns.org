"use client";

import membersList from "@public/data/members.json";
import { motion } from "motion/react";

import ContentArea from "@/components/ContentArea";
import MemberCard from "@/components/MemberCard";
import { FavorText, Heading } from "@/components/ui/extension/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function StaffShowcase() {
    return (
        <ContentArea
            id="#all-staffs"
            className="justify-self-center-safe place-items-center-safe"
        >
            <Heading kind="h1" className="text-center text-primary">
                Nhân sự tại Arknights VNS
            </Heading>
            <FavorText className="text-center text-muted-foreground">
                Toàn bộ nhân sự đang hoạt động tại Arknights VNS
            </FavorText>
            <Tabs className="w-full gap-y-8" defaultValue="leader">
                <TabsList className="flex h-auto flex-wrap gap-3 self-center bg-transparent [&>button]:rounded-md [&>button]:bg-neutral-200 [&>button]:px-4 [&>button]:py-2 [&>button]:data-[state=active]:bg-primary [&>button]:data-[state=active]:font-bold [&>button]:data-[state=active]:text-white [&>button]:dark:bg-neutral-600">
                    <TabsTrigger value="leader">Leader</TabsTrigger>
                    <TabsTrigger value="translator">Translator</TabsTrigger>
                    <TabsTrigger value="dreamchasers">Dreamchasers</TabsTrigger>
                    <TabsTrigger value="ph. frontiers">
                        Phoenix Frontiers
                    </TabsTrigger>
                    <TabsTrigger value="partners">Partners</TabsTrigger>
                </TabsList>
                {(
                    [
                        "Leader",
                        "Translator",
                        "Dreamchasers",
                        "Ph. Frontiers",
                        "Partners",
                    ] as const
                ).map((group) => {
                    const members = membersList[group];

                    return (
                        <TabsContent
                            className="self-center-safe place-items-center-safe grid grid-cols-1 gap-8 pt-4 md:grid-cols-3 lg:grid-cols-4"
                            key={group}
                            value={group.toLowerCase()}
                        >
                            {members.map((member, id) => (
                                <motion.div
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    initial={{
                                        opacity: 0,
                                        y: 50,
                                    }}
                                    key={member.name}
                                    transition={{
                                        delay: id * 0.12,
                                        duration: 0.5,
                                        type: "tween",
                                    }}
                                >
                                    <MemberCard {...member} />
                                </motion.div>
                            ))}
                        </TabsContent>
                    );
                })}
            </Tabs>
        </ContentArea>
    );
}
