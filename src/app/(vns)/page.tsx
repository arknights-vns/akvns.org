"use client";

import React, { useState } from "react";

import ProjectsHeader from "@/components/projectHeader";
import Timeline from "@/components/Timeline";
type ProjectType = "cross" | "event" | "fanProjects";

export default function MainPage() {
    const [selectedType, setSelectedType] = useState<ProjectType>("fanProjects");

    return (
        <div className={"flex h-[80svh] items-center justify-center"}>
            <div className={"w-full px-6 py-12"}>
                <ProjectsHeader onSelect={t => setSelectedType(t)} selected={selectedType} />
                <Timeline selectedType={selectedType} />
            </div>
        </div>
    );
}
