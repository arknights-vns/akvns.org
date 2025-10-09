"use client";

import Image from "next/image";
import { useState } from "react";
import type { Member, MemberLink } from "@/components/members";
import { members } from "@/components/members";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const tabs = Object.keys(members);

export default function MainPage() {
    const [activeTab, setActiveTab] = useState(tabs[0]);
    return (
        <div className="flex flex-col items-center py-8">
            <h1 className="text-4xl font-bold mb-6 text-[#F25C5C]">Nhân sự tại Arknights VNS</h1>
            {/* Tabs for contributor */}
            <div className="flex gap-4 mb-8">
                {tabs.map((tab) => (
                    <Button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 py-2 rounded-full font-semibold transition-colors
                            ${activeTab === tab ? "bg-[#F25C5C] text-white" : "bg-gray-200 text-black hover:bg-gray-300"}
                            `}>
                        {tab}
                    </Button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-12 py-10">
                {members[activeTab as keyof typeof members].map((member: Member, id: number) => (
                    // The individual card
                    <Card
                        key={`${member.name}-${id}`}
                        className="flex flex-col items-center p-4 mt-4 shadow-md/12 bg-gray-100">
                        {/* Profile picture */}
                        <div className="rounded-full border-1 border-black -mt-20 bg-white overflow-hidden w-30 h-30 flex items-center justify-center">
                            <Image
                                src={member.avatar}
                                alt={member.name}
                                width={80}
                                height={80}
                                className="rounded-full object-cover"
                            />
                        </div>

                        {/* Display member information */}
                        <CardContent className="flex flex-col items-center">
                            <div className="font-bold text-lg text-black">{member.name}</div>
                            <div className="text-[#F25C5C] text-sm">{member.role}</div>
                            <div className="italic text-xs text-gray-400 mt-1">"{member.quote}"</div>
                        </CardContent>
                        <CardFooter className="flex gap-4 mt-2">
                            {member.links.map((link: MemberLink, _id: number) => (
                                <a key={`${link.url}-${_id}`} href={link.url} target="_blank" rel="noopener noreferrer">
                                    {link.icon}
                                </a>
                            ))}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
