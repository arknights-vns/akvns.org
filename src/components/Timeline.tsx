"use client";

import projectsData from "@public/data/projects.json";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";

type Project = {
    bg?: string;
    content: string;
    date: string;
    name: string;
};

type ProjectsData = {
    cross: Project[];
    event: Project[];
    fanProjects: Project[];
};

const VISIBLE = 4;

export default function Timeline({ selectedType }: { selectedType: keyof ProjectsData }) {
    const projects: ProjectsData = projectsData;
    const [index, setIndex] = useState(0);
    const items = projects[selectedType] || [];
    const maxIndex = Math.max(0, Math.ceil(items.length / VISIBLE) - 1);

    function stepForward() {
        setIndex(c => Math.min(maxIndex, c + 1));
    }

    function stepBackward() {
        setIndex(c => Math.max(0, c - 1));
    }

    const visibleItems = items.slice(index * VISIBLE, index * VISIBLE + VISIBLE);

    return (
        <div>
            <div className={"relative max-w-5xl w-full mx-auto my-15 px-0 py-5 flex justify-center items-center"}>
                <div className={"relative w-5xl h-1 bg-linear-to-r from-gray-600 via-gray-400 to-gray-600 rounded-[4px]"}>
                    {visibleItems.map((item, index_) => {
                        const leftPercent = (index_ + ((visibleItems.length - 1) / 2 - index_) * 0.1) / (visibleItems.length - 1) * 100;
                        return (
                            <div
                                className={"absolute top-2/4 -translate-y-1/2 w-5 h-5 bg-[#ffffff] border-3 border-[#000000] rounded-[50%] cursor-pointer"}
                                key={item.name}
                                style={{ left: `${leftPercent}%` }}
                            >
                                <div className={"absolute top-7 left-2/4 -translate-x-1/2 text-4 font-semibold whitespace-nowrap"}>{item.date}</div>
                                <div className={"relative top-13 left-1/2 -translate-x-1/2 min-w-45 min-h-50 p-3 bg-background border border-[#cccccc] rounded-[8px] text-center [box-shadow:0_0_8px_rgba(0, 0, 0, 0.15)] block z-10"}>
                                    <div className={"text-2xl mb-5"}>{item.name}</div>
                                    <div className={"text-base"}>{item.content}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className={"flex justify-center gap-4 relative mx-auto my-auto top-60"}>
                <Button disabled={index === 0} onClick={stepBackward}>
                    Previous
                </Button>
                <Button disabled={index >= maxIndex} onClick={stepForward}>
                    Next
                </Button>
            </div>
        </div>
    );
}
