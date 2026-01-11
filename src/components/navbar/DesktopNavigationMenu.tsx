import type { NavComponentProps } from "@/components/navbar/navigation-type";
import { Link } from "@tanstack/react-router";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export default function DesktopNavigationMenu(props: NavComponentProps) {
  return (
    <NavigationMenu aria-label="nav-bar" className="hidden w-[50vw] lg:flex">
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
                              hash={subentry.hash}
                              to={subentry.href}
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
                    activeProps={{
                      className: "underline underline-offset-13 decoration-primary decoration-4",
                    }}
                    className="after:absolute after:-bottom-1 after:left-1/2 after:h-1 after:w-0 after:-translate-x-1/2 after:bg-primary after:transition-[width] after:duration-300 hover:after:w-full"
                    hash={entry.hash}
                    to={entry.href}
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
