"use client";

import crewList from "@resources/data/crew.json";
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
                <TabsList className="tab-button mb-12 grid h-auto grid-cols-2 gap-3 self-center bg-transparent md:grid-cols-4">
                    <TabsTrigger value="facebook-mod">
                        Facebook Moderator
                    </TabsTrigger>
                    <TabsTrigger value="discord-mod">
                        Discord Moderator
                    </TabsTrigger>
                    <TabsTrigger value="dreamchasers">Dreamchasers</TabsTrigger>
                    <TabsTrigger value="translation">
                        Translation Team
                    </TabsTrigger>
                </TabsList>
                {(
                    [
                        "facebook-mod",
                        "discord-mod",
                        "dreamchasers",
                        "translation",
                    ] as const
                ).map((group) => {
                    const members = crewList.filter((entry) =>
                        entry.categories.includes(group),
                    );

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
                                    <MemberCard
                                        avatar={member.avatar || ""}
                                        name={member.name}
                                        role={member.roles[group] || ""}
                                        quote={member.quote || ""}
                                        links={member.links || {}}
                                    />
                                </motion.div>
                            ))}
                        </TabsContent>
                    );
                })}
            </Tabs>
            <div className="mt-8 text-center">
                Nếu bạn có trong team nhưng không có trong đây thì báo lại cho{" "}
                <span className="font-mono text-primary">@shostakt</span> trên
                Discord nhé!
            </div>
        </ContentArea>
    );
}
