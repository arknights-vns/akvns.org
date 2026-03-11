import type { ComponentProps } from "react";

import { cn } from "@arknights-vns/shadcn-ui/lib/utils";

export default function ContentArea({ className, ...props }: ComponentProps<"section">) {
  return (
    <section
      className={cn("flex flex-col gap-4 px-6 py-20 first:pt-20 md:px-0 md:py-28", className)}
      // oxlint-disable-next-line react/jsx-props-no-spreading
      {...props}
      id={props.id}
    >
      {props.children}
    </section>
  );
}
