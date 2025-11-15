"use client";
import type { Route } from "next";
import membersList from "@public/data/members.json";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function StaffShowcase() {
    return (
        <section className="flex flex-col place-content-center-safe text-center gap-6 py-24">
            <div className="text-5xl font-bold text-primary">Nhân sự tại Arknights VNS</div>
            <div className="text-muted-foreground">
                Toàn bộ nhân sự đang hoạt động tại Arknights VNS
            </div>
            <Tabs className="gap-y-8" defaultValue="leader">
                <TabsList className="mx-4 flex-wrap h-auto self-center-safe gap-4 bg-transparent [&_button]:bg-neutral-300 [&_button]:dark:bg-neutral-600 [&_button]:rounded-xl [&_button]:px-4 [&_button]:py-2 [&_button]:data-[state=active]:bg-primary [&_button]:data-[state=active]:text-white [&_button]:data-[state=active]:font-bold">
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
                            className="self-center-safe grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 pt-4 place-items-center-safe w-[90vw]"
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
                                    <Card
                                        className="bg-muted/50 w-64 relative mt-8 flex flex-col justify-center items-center"
                                        key={member.name}
                                    >
                                        <CardHeader className="mt-8 flex flex-col justify-center items-center pb-2 w-full">
                                            <Image
                                                alt={`${member.name} ${member.role}`}
                                                className="absolute border-2 -top-12 rounded-full w-24 h-24 aspect-square object-cover"
                                                height={96}
                                                src={member.avatar}
                                                width={96}
                                            />
                                            <CardTitle className="text-center text-2xl">
                                                {member.name}
                                            </CardTitle>
                                            <CardDescription className="text-primary">
                                                {member.role}
                                            </CardDescription>
                                        </CardHeader>

                                        <CardContent className="text-center">
                                            {member.quote}
                                        </CardContent>

                                        <CardFooter className="gap-2">
                                            {member.links.map((link) => (
                                                <div key={`${member.name}-${link.icon}`}>
                                                    <Link href={link.url as Route}>
                                                        <span>
                                                            {link.url}
                                                            icon
                                                        </span>
                                                    </Link>
                                                </div>
                                            ))}
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            ))}
                        </TabsContent>
                    );
                })}
            </Tabs>
        </section>
    );
}
