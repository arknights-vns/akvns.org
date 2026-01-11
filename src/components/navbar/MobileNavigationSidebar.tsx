import type { NavComponentProps } from "@/components/navbar/navigation-type";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function MobileNavigationSidebar(props: NavComponentProps) {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button aria-label="burger-menu" className="self-center lg:hidden" size="icon" variant="outline">
            <div className="sr-only">Mobile menu</div>
            <Menu />
          </Button>
        }
      />
      <SheetContent className="max-w-xs" side="left">
        <SheetHeader>
          <SheetTitle>Arknights Vietnam Station</SheetTitle>
          <SheetDescription>Các đường link trong website.</SheetDescription>
        </SheetHeader>
        <div className="mx-4 flex flex-col gap-4">
          {props.links.map((entry) => {
            if (entry.type === "dropdown") {
              return (
                <Collapsible
                  className="group/collapsible space-y-3"
                  defaultOpen={true}
                  key={`mobile-dropdown-${entry.label}`}
                >
                  <CollapsibleTrigger className="flex w-full justify-between font-bold">
                    {entry.label}
                    <ChevronDown className="transition-all group-data-open/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="ml-4 space-y-4">
                    {entry.children.map((subentry) => (
                      <Link
                        activeOptions={{
                          includeHash: true,
                        }}
                        activeProps={{
                          className: "bg-primary p-2 rounded-lg",
                        }}
                        className="place-items-center-safe flex gap-2 p-1"
                        hash={subentry.hash}
                        key={`${entry.label}-${subentry.label}`}
                        to={subentry.href}
                      >
                        {subentry.icon && <subentry.icon size={16} />}
                        {subentry.label}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              );
            }

            return (
              <Link
                activeOptions={{
                  includeHash: true,
                }}
                activeProps={{
                  className: "bg-primary p-2 rounded-lg",
                }}
                className="font-bold"
                hash={entry.hash}
                key={`mobile-link-${entry.label}`}
                to={entry.href}
              >
                {entry.label}
              </Link>
            );
          })}
        </div>
        <SheetFooter />
      </SheetContent>
    </Sheet>
  );
}
