"use client";

import type { FC } from "react";

import React from "react";

import { Button } from "@/components/ui/button";

export type ProjectType = "cross" | "event" | "fanProjects";

type Properties = {
    onSelect: (t: ProjectType) => void;
    selected: ProjectType;
};

export default function ProjectHeader({ onSelect, selected }) => {
    return (
        <div className={"max-w-6xl mx-auto mb-8"}>
            <div className={"flex items-center justify-between mb-4"}>
                <h2 className={"text-4xl font-bold"}>Chúng tôi đã nấu cl gì?</h2>
                <div className={"flex gap-2"}>
                    <Button onClick={() => onSelect("fanProjects")} variant={selected === "fanProjects" ? "default" : "ghost"}>
                        Fan project
                    </Button>
                    <Button onClick={() => onSelect("event")} variant={selected === "event" ? "default" : "ghost"}>
                        Event
                    </Button>
                    <Button onClick={() => onSelect("cross")} variant={selected === "cross" ? "default" : "ghost"}>
                        Cross-Overs
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProjectsHeader;
