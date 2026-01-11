import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export default function ContentArea({ className, ...props }: ComponentProps<"section">) {
  return (
    <section
      className={cn("flex flex-col gap-4 px-6 py-20 first:pt-20 md:px-0 md:py-28", className)}
      {...props}
      id={props.id}
    >
      {props.children}
    </section>
  );
}
