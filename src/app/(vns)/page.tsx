"use client";

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

import type { Member, MemberLink } from "@/components/members";

import { members } from "@/components/members";
import ProjectsHeader from "@/components/projectHeader";
import Timeline from "@/components/Timeline";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
type ProjectType = "cross" | "event" | "fanProjects";

const tabs = Object.keys(members);

export default function MainPage() {
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [selectedType, setSelectedType] = useState<ProjectType>("fanProjects");
    return (
        <div className={"flex flex-col items-center py-8"}>
            <div className={"text-5xl font-bold mb-6 text-[#F25C5C]"}>Nhân sự tại Arknights VNS</div>
            {/* Tabs for contributor */}
            <div className={"flex gap-4 mb-8"}>
                {tabs.map(tab => (
                    <Button
                        className={clsx("px-5 py-2 rounded-full font-semibold transition-colors", {
                            "bg-[#F25C5C] text-white": activeTab === tab,
                            "bg-gray-200 text-black hover:bg-gray-300": activeTab !== tab,
                        })}
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </Button>
                ))}
            </div>

            <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-12 py-10"}>
                {members[activeTab as keyof typeof members].map((member: Member, id: number) => (
                    // The individual card
                    <Card
                        className={"flex flex-col items-center p-4 mt-4 shadow-md/12 bg-gray-100"}
                        key={`${member.name}-${id}`}
                    >
                        {/* Profile picture */}
                        <div className={"rounded-full border-1 border-black -mt-20 bg-white overflow-hidden w-30 h-30 flex items-center justify-center"}>
                            <Image
                                alt={member.name}
                                className={"rounded-full object-cover"}
                                height={100}
                                src={member.avatar}
                                width={100}
                            />
                        </div>

                        {/* Display member information */}
                        <CardContent className={"flex flex-col items-center"}>
                            <div className={"font-bold text-lg text-black"}>{member.name}</div>
                            <div className={"text-[#F25C5C] text-sm"}>{member.role}</div>
                            <div className={"italic text-xs text-gray-400 mt-1"}>
                                "
                                {member.quote}
                                "
                            </div>
                        </CardContent>
                        <CardFooter className={"flex gap-4 mt-2"}>
                            {member.links.map((link: MemberLink, _id: number) => (
                                <a href={link.url} key={`${link.url}-${_id}`} rel={"noopener noreferrer"} target={"_blank"}>
                                    {link.icon}
                                </a>
                            ))}
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <div className={"flex h-[80svh] items-center justify-center"}>
                <div className={"w-full px-6 py-12"}>
                    <ProjectsHeader onSelect={t => setSelectedType(t)} selected={selectedType} />
                    <Timeline selectedType={selectedType} />
                </div>
            </div>
        </div>
    );
}
