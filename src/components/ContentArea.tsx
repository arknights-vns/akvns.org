import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export default function ContentArea(props: ComponentProps<"section"> & { id: string }) {
    return (
        <section
            className={cn(
                "flex flex-col gap-4 py-28 place-items-center-safe self-center-safe mx-4",
                props.className,
            )}
            {...props}
            id={props.id}
        >
            {props.children}
        </section>
    );
}
