import type { LucideIcon } from "lucide-react";
import type { Route } from "next";

type MultiNavigation = {
    children: {
        description: string;
        href: Route;
        label: string;
        icon: LucideIcon | null;
    }[];
    label: string;
    type: "dropdown";
};

type NormalNavigation = {
    href: Route;
    label: string;
    type: "link";
};

export type Navigable = MultiNavigation | NormalNavigation;

export type NavComponentProps = { links: Navigable[] };
