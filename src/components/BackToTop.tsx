import { clsx } from "clsx";
import { ArrowUpToLine } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export default function BackToTop() {
  const [showTopButton, setShowTopButton] = useState(false);

  const goToTop = () => {
    window.scroll({
      left: 0,
      top: 0,
    });
  };

  useEffect(() => {
    const scrollHandle = () => {
      if (window.scrollY >= 25) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    window.addEventListener("scroll", scrollHandle);

    return () => window.removeEventListener("scroll", scrollHandle);
  }, []);

  return (
    <Button
      aria-label="back-to-top"
      className={clsx("right-4 bottom-4 bg-primary", showTopButton && "fixed", !showTopButton && "hidden")}
      onClick={goToTop}
      size="icon-lg"
    >
      <div className="sr-only">Back to top</div>
      <ArrowUpToLine />
    </Button>
  );
}
