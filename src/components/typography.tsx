import { ClassValue } from "clsx";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * A block quote.
 */
export function BlockQuote(
    children: ReactNode,
    className: ClassValue = "",
) {
    return (
        <blockquote
            className={cn(className, "mt-6 border-l-2 pl-6 italic text-muted-foreground")}
        >
            {children}
        </blockquote>
    );
}

/**
 * "One second, in-and-out" kind of code block.
 *
 * If needing multiline, use Shiki.js instead.
 */
export function CodeInline(
    children: ReactNode,
    className: ClassValue = "",
) {
    return (
        <code
            className={cn(className, "bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold")}
        >
            {children}
        </code>
    );
};

/**
 * Favor text.
 *
 * Most of the time, should be right below the `<h1>` tag.
 */
export function FavorText(
    children: ReactNode,
    className: ClassValue = "",
) {
    return (
        <p className={cn(className, "text-muted-foreground text-xl")}>
            {children}
        </p>
    );
}

/**
 * Footnote text.
 *
 * Something along the lines of "Your password must have uppercase, lowercase, special characters, number, min 16."
 */
export function FootNote(
    children: ReactNode,
    className: ClassValue = "",
) {
    return (
        <p className={cn(className, "text-muted-foreground text-sm")}>
            {children}
        </p>
    );
}

/**
 * Heading, yes.
 *
 * Equivalent to <h[size]> tag in HTML.
 */
export function Heading(
    children: ReactNode,
    kind: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" = "h1",
    className: ClassValue = "",
) {
    switch (kind) {
        case "h1": {
            return (
                <h1
                    className={cn(className, "scroll-m-20 text-4xl font-extrabold tracking-tight text-balance")}
                >
                    {children}
                </h1>
            );
        }
        case "h2": {
            return (
                <h2
                    className={cn(className, "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-2")}
                >
                    {children}
                </h2>
            );
        }
        case "h3": {
            return (
                <h3
                    className={cn(className, "scroll-m-20 text-2xl font-semibold tracking-tight")}
                >
                    {children}
                </h3>
            );
        }
        case "h4": {
            return (
                <h4
                    className={cn(className, "scroll-m-20 text-xl font-semibold tracking-tight")}
                >
                    {children}
                </h4>
            );
        }
        case "h5": {
            return (
                <h5
                    className={cn(className, "scroll-m-20 font-bold tracking-tight")}
                >
                    {children}
                </h5>
            );
        }
        case "h6": {
            return (
                <h6
                    className={cn(className, "scroll-m-20 text-sm leading-none font-medium")}
                >
                    {children}
                </h6>
            );
        }
    }
}

/**
 * A paragraph.
 *
 * Equivalent to <p>
 */
export function Paragraph(
    children: ReactNode,
    className: ClassValue = "",
) {
    return (
        <p
            className={cn(className, "leading-7 [&:not(:first-child)]:mt-8")}
        >
            {children}
        </p>
    );
}
