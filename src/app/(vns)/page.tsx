"use client";

import Image from "next/image";
import { useState } from "react";
import type { Member, MemberLink } from "@/components/members";
import { members } from "@/components/members";
// import { Button } from "@/components/ui/button"; might need this for later
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const tabs = Object.keys(members);

export default function MainPage() {
    const [activeTab] = useState(tabs[0]);

    return (
        <div className="flex flex-col items-center py-8">
            <h1 className="text-4xl font-bold mb-6 text-[#F25C5C]">Nhân sự tại Arknights VNS</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-12">
                {members[activeTab as keyof typeof members].map((member: Member) => (
                    // The card individual card
                    <Card key={member.name} className="flex flex-col items-center p-4 mt-20 shadow-md/12 bg-gray-100">
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
                            {member.links.map((link: MemberLink, _i: number) => (
                                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
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
