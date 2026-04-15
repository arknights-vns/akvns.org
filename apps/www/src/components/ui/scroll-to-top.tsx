"use client";

import { Button } from "@arknights-vns/shadcn-ui/components/button";
import { cn } from "@arknights-vns/shadcn-ui/lib/utils";
import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // oxlint-disable-next-line unicorn/consistent-function-scoping
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={cn(
        "fixed right-8 bottom-8 z-50 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:scale-110 hover:bg-primary/90",
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-10 opacity-0",
      )}
    >
      <ArrowUp className="size-6" />
    </Button>
  );
}
