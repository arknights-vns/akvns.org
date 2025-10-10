"use client";

import { clsx } from "clsx";
import { ArrowUpToLine } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function BackToTop() {
    const [showTopBtn, setShowTopBtn] = useState(false);

    const goToTop = useCallback(() => {
        window.scroll({
            top: 0,
            left: 0,
        });
    }, []);

    const scrollHandle = useCallback(() => {
        if (window.scrollY >= 25) {
            setShowTopBtn(true);
        } else {
            setShowTopBtn(false);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", scrollHandle);

        return () => window.removeEventListener("scroll", scrollHandle);
    }, [scrollHandle]);

    return (
        <Button
            className={clsx("right-4 bottom-4 bg-primary", showTopBtn && "fixed", !showTopBtn && "hidden")}
            size={"icon-lg"}
            onClick={goToTop}
            aria-label={"back-to-top"}
        >
            <ArrowUpToLine />
        </Button>
    );
}
