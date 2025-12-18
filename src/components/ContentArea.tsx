import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export default function ContentArea({
    children,
    className,
    id,
    ...props
}: ComponentProps<"section"> & { id: string }) {
    return (
        <section
            className={cn(
                "container flex flex-col gap-4 px-6 py-20 first:pt-20 md:px-0 md:py-28",
                className,
            )}
            {...props}
            id={id}
        >
            {children}
        </section>
    );
}
