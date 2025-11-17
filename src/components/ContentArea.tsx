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
                "flex flex-col gap-4 py-20 md:py-28 self-center-safe",
                "[&:is(:first-child)]:pt-20",
                className,
            )}
            {...props}
            id={id}
        >
            {children}
        </section>
    );
}
