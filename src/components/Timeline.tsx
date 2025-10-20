"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

type Project = {
    bg: string;
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
    const [projects, setProjects] = useState<ProjectsData>();
    const [index, setIndex] = useState(0);

    useEffect(() => {
        fetch("/projects.json")
            .then(response => response.json())
            .then(data => setProjects(data))
            .catch(() =>
                setProjects({
                    cross: [],
                    event: [],
                    fanProjects: [],
                }),
            );
    }, []);

    useEffect(() => {
        if (index > 0) {
            setIndex(0);
        }
    }, [selectedType, index]);

    if (!projects) {
        return <p>Loading...</p>;
    }

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
            <div className={"relative max-w-[900px] w-full mx-[auto] my-[60px] px-[0] py-[20px] flex justify-center items-center"}>
                <div className={"relative w-[1000px] h-[4px] bg-[linear-gradient(to_right,_lightgray,_darkgray,_gray,_black,_gray,_darkgray,_lightgray)] rounded-[4px]"}>
                    {visibleItems.map((item, index_) => {
                        const leftPercent = (index_ + ((visibleItems.length - 1) / 2 - index_) * 0.1) / (visibleItems.length - 1) * 100;
                        return (
                            <div
                                className={"absolute top-2/4 -translate-y-1/2 w-[18px] h-[18px] bg-[#fff] border-[3px] border-[#000] rounded-[50%] cursor-pointer [transition:transform_0.2s_ease] hover:-translate-y-1/2 hover:scale-[1.2]"}
                                key={item.name}
                                style={{ left: `${leftPercent}%` }}
                            >
                                <div className={"absolute top-[28px] left-2/4 -translate-x-1/2 text-[14px] font-semibold whitespace-nowrap"}>{item.date}</div>
                                <div className={"relative top-[50px] left-2/4 -translate-x-1/2 min-w-[180px] min-h-[200px] p-[10px] bg-[var(--background)] border-[1px] border-[#ccc] rounded-[8px] text-center [box-shadow:0_0_8px_rgba(0,_0,_0,_0.15)] opacity-100 block [transition:opacity_0.2s_ease-in-out] z-10"}>
                                    <div className={"text-2xl mb-5"}>{item.name}</div>
                                    <div className={"text-base"}>{item.content}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className={"flex justify-center gap-4 mt-4 relative"}>
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
