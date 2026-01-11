import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type H1Component = ComponentProps<"h1"> & { kind: "h1" };
type H2Component = ComponentProps<"h2"> & { kind: "h2" };
type H3Component = ComponentProps<"h3"> & { kind: "h3" };
type H4Component = ComponentProps<"h4"> & { kind: "h4" };
type H5Component = ComponentProps<"h5"> & { kind: "h5" };
type H6Component = ComponentProps<"h6"> & { kind: "h6" };
type HeaderComponentProperties =
  | H1Component
  | H2Component
  | H3Component
  | H4Component
  | H5Component
  | H6Component;

/**
 * A block quote.
 */
export function BlockQuote({ children, className, ...properties }: ComponentProps<"blockquote">) {
  return (
    <blockquote
      className={cn(className, "mt-6 border-l-2 pl-6 text-muted-foreground italic")}
      {...properties}
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
export function CodeInline({ children, className, ...properties }: ComponentProps<"code">) {
  return (
    <code
      className={cn(
        className,
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold text-sm"
      )}
      {...properties}
    >
      {children}
    </code>
  );
}

/**
 * Favor text.
 *
 * Most of the time, should be right below the `<h1>` tag.
 */
export function FavorText({ children, className, ...properties }: ComponentProps<"p">) {
  return (
    <p className={cn(className, "text-muted-foreground text-xl")} {...properties}>
      {children}
    </p>
  );
}

/**
 * Footnote text.
 *
 * Something along the lines of "Your password must have uppercase, lowercase, special characters, number, min 16."
 */
export function FootNote({ children, className, ...properties }: ComponentProps<"p">) {
  return (
    <p className={cn(className, "text-muted-foreground text-sm")} {...properties}>
      {children}
    </p>
  );
}

/**
 * Heading, yes.
 *
 * Equivalent to <h[size]> tag in HTML.
 */
export function Heading({ children, className, ...properties }: HeaderComponentProperties) {
  switch (properties.kind) {
    case "h1": {
      return (
        <h1
          className={cn(className, "scroll-m-20 text-balance font-extrabold text-4xl tracking-tight")}
          {...properties}
        >
          {children}
        </h1>
      );
    }
    case "h2": {
      return (
        <h2
          className={cn(className, "scroll-m-20 font-semibold text-3xl tracking-tight first:mt-2")}
          {...properties}
        >
          {children}
        </h2>
      );
    }
    case "h3": {
      return (
        <h3 className={cn(className, "scroll-m-20 font-semibold text-2xl tracking-tight")} {...properties}>
          {children}
        </h3>
      );
    }
    case "h4": {
      return (
        <h4 className={cn(className, "scroll-m-20 font-semibold text-xl tracking-tight")} {...properties}>
          {children}
        </h4>
      );
    }
    case "h5": {
      return (
        <h5 className={cn(className, "scroll-m-20 font-bold tracking-tight")} {...properties}>
          {children}
        </h5>
      );
    }
    case "h6": {
      return (
        <h6 className={cn(className, "scroll-m-20 font-medium text-sm leading-none")} {...properties}>
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
export function Paragraph({ children, className, ...properties }: ComponentProps<"p">) {
  return (
    <p className={cn(className, "not-first:mt-8 leading-7")} {...properties}>
      {children}
    </p>
  );
}
