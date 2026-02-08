import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@arknights-vns/shadcn-ui/components/collapsible";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@arknights-vns/shadcn-ui/components/sheet";
import { ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import type { NavComponentProps } from "@/components/navbar/navigation-type";

export default function MobileNavigationSidebar(props: NavComponentProps) {
  return (
    <Sheet>
      <SheetTrigger aria-label="burger-menu" className="self-center rounded-sm border bg-muted p-1 lg:hidden">
        <div className="sr-only">Mobile menu</div>
        <Menu size={20} />
      </SheetTrigger>
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
                        className="place-items-center-safe flex gap-2 p-1"
                        href={{ pathname: subentry.href, hash: subentry.hash }}
                        key={`${entry.label}-${subentry.label}`}
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
                className="font-bold"
                href={{ pathname: entry.href, hash: entry.hash }}
                key={`mobile-link-${entry.label}`}
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
