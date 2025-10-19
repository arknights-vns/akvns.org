"use client";

import React from "react";

import "@/components/style.css";

type TabItemContent = {
    bg: string;
    content: string;
    date: string;
    name: string;
};
type TabsData = Record<string, TabItemContent[]>;

const tabs: TabsData[] = [{
    fanProjects: [
        {
            bg: "@/placeholder.png",
            content: "Dolor impedit voluptas ad recusandae neque magni cupiditate. Ut nobis corporis quisquam nihil accusamus earum",
            date: "2025-09-25",
            name: "Grandé 'Lọ tập thể'",
        },
        {
            bg: "@/placeholder.png",
            content: "DO NOT THE HORSE",
            date: "2025-09-25",
            name: "Umapyoi",
        },
        {
            bg: "@/placeholder.png",
            content: "CAN YOU REACH THE FINALS???????",
            date: "2025-09-25",
            name: "DAS FINALE",
        },
        {
            bg: "@/placeholder.png",
            content: "Welcome to maimai my ass",
            date: "2025-09-25",
            name: "maimaiDX CiRCLES",
        },
    ],
},
];

export default function Timeline() {
    return (

        <div>
            {tabs.map((tab, tabIndex) => (
            // 1 đống tabs
                <div key={tabIndex}>
                    {Object.entries(tab).map(([project, projectTimeline]) => (
                        <div key={project}>
                            <h2>{project}</h2>
                            <div className={"timeline-container"}>
                                <div className={"timeline-line"}>
                                    {projectTimeline.map((item, index) => {
                                        const leftPercent = (index + ((projectTimeline.length - 1) / 2 - index) * 0.1) / (projectTimeline.length - 1) * 100;
                                        return (
                                            <div
                                                className={"timeline-point"}
                                                key={index}
                                                style={{ left: `${leftPercent}%` }}
                                            >
                                                <div className={"timeline-label"}>
                                                    {item.date}
                                                </div>

                                                <div className={"timeline-box"}>
                                                    <h3>{item.name}</h3>
                                                    <p>{item.content}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}

        </div>

    );
}
