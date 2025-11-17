"use client";

import membersList from "@public/data/members.json";
import { motion } from "framer-motion";

import ContentArea from "@/components/ContentArea";
import MemberCard from "@/components/MemberCard";
import { FavorText, Heading } from "@/components/ui/extension/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function StaffShowcase() {
    return (
        <ContentArea id="#all-staffs" className="justify-self-center-safe place-items-center-safe">
            <Heading kind="h1" className="text-primary text-center">
                Nhân sự tại Arknights VNS
            </Heading>
            <FavorText className="text-muted-foreground text-center">
                Toàn bộ nhân sự đang hoạt động tại Arknights VNS
            </FavorText>
            <Tabs className="gap-y-8 w-full" defaultValue="leader">
                <TabsList className="flex flex-wrap h-auto self-center gap-3 bg-transparent [&>button]:bg-neutral-200 [&>button]:dark:bg-neutral-600 [&>button]:rounded-md [&>button]:px-4 [&>button]:py-2 [&>button]:data-[state=active]:bg-primary [&>button]:data-[state=active]:text-white [&>button]:data-[state=active]:font-bold">
                    <TabsTrigger value="leader">Leader</TabsTrigger>
                    <TabsTrigger value="translator">Translator</TabsTrigger>
                    <TabsTrigger value="dreamchasers">Dreamchasers</TabsTrigger>
                    <TabsTrigger value="ph. frontiers">Phoenix Frontiers</TabsTrigger>
                    <TabsTrigger value="partners">Partners</TabsTrigger>
                </TabsList>
                {(
                    ["Leader", "Translator", "Dreamchasers", "Ph. Frontiers", "Partners"] as const
                ).map((group) => {
                    const members = membersList[group];

                    return (
                        <TabsContent
                            className="self-center-safe grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 pt-4 place-items-center-safe"
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
