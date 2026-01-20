import type { LucideIcon } from "lucide-react";
import type { Route } from "next";

interface MultiNavigation {
  children: (Omit<NormalNavigation, "type"> & { description: string | null; icon: LucideIcon })[];
  label: string;
  type: "dropdown";
}

interface NormalNavigation {
  href: Route;
  hash: string;
  label: string;
  type: "link";
}

export type Navigable = MultiNavigation | NormalNavigation;

export interface NavComponentProps {
  links: Navigable[];
}
