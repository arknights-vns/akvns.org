"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@arknights-vns/shadcn-ui/components/navigation-menu";
import { cn } from "@arknights-vns/shadcn-ui/lib/utils";
import Link from "next/link";
import type { NavComponentProps } from "@/components/navbar/navigation-type";

export default function DesktopNavigationMenu(props: NavComponentProps) {
  return (
    <NavigationMenu className="hidden w-[50vw] lg:flex">
      <NavigationMenuList className="gap-x-8">
        {props.links.map((entry) => (
          <NavigationMenuItem key={entry.label}>
            {entry.type === "dropdown" && (
              <>
                <NavigationMenuTrigger className="rounded-none bg-transparent">
                  {entry.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-75 space-y-2">
                    {entry.children.map((subentry) => (
                      <li key={subentry.label}>
                        <NavigationMenuLink
                          key={`${entry.label}-${subentry.label}`}
                          render={
                            <Link
                              className="flex flex-col items-start"
                              href={{ pathname: subentry.href, hash: subentry.hash }}
                            >
                              <div className="place-items-center-safe flex gap-2 font-bold">
                                {subentry.icon && <subentry.icon size={16} />}
                                {subentry.label}
                              </div>
                              <span className="text-muted-foreground">{subentry.description}</span>
                            </Link>
                          }
                        />
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            )}
            {entry.type === "link" && (
              <NavigationMenuLink
                className={cn(navigationMenuTriggerStyle(), "rounded-none", "bg-transparent")}
                render={
                  <Link
                    className="after:absolute after:-bottom-1 after:left-1/2 after:h-1 after:w-0 after:-translate-x-1/2 after:bg-primary after:transition-[width] after:duration-300 hover:after:w-full"
                    href={{ pathname: entry.href, hash: entry.hash }}
                  >
                    {entry.label}
                  </Link>
                }
              />
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
