import type { LucideIcon } from "lucide-react";

interface MultiNavigation {
  children: {
    description: string;
    href: string;
    hash: string;
    label: string;
    icon: LucideIcon | null;
  }[];
  label: string;
  type: "dropdown";
}

interface NormalNavigation {
  href: string;
  hash: string;
  label: string;
  type: "link";
}

export type Navigable = MultiNavigation | NormalNavigation;

export interface NavComponentProps {
  links: Navigable[];
}
