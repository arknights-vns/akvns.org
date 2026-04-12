"use client";

import type { Route } from "next";
import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";

import { Button } from "@arknights-vns/shadcn-ui/components/button";
import { SiDiscord, SiFacebook } from "@icons-pack/react-simple-icons";
import VNS_Icon from "@public/VNS_Icon.svg";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import DonateButton from "@/components/DonateButton";
import DesktopNavigationMenu from "@/components/navbar/DesktopNavigationMenu";
import MobileNavigationSidebar from "@/components/navbar/MobileNavigationSidebar";
import { links } from "@/components/navbar/navigation-entries";
import { clientEnv } from "@/env-var/client";

export default function NavigationBar() {
  const { scrollY } = useScroll();

  const [isHidden, setIsHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    if (latest > previous && latest > 150) {
      setIsHidden(true);
    }
    else {
      setIsHidden(false);
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="sticky top-0 z-50 flex h-18 w-full justify-between bg-background px-4 shadow-sm"
    >
      <div className="flex w-[25vw] place-items-center-safe gap-4">
        <MobileNavigationSidebar links={links} />
        <Link href="/">
          <Image alt="VNS_Logo_Header" className="dark:invert" height={52} loading="eager" src={VNS_Icon} />
        </Link>
      </div>
      <DesktopNavigationMenu links={links} />
      <div className="flex w-[25vw] place-items-center-safe justify-end gap-2">
        <Button
          className="border-[#1877f2]! hover:bg-[#1877f2]!"
          nativeButton={false}
          render={
            <Link href="https://www.facebook.com/groups/1546174542442137">
              <SiFacebook />
              <span className="sr-only">Facebook</span>
            </Link>
          }
          size="icon-lg"
          variant="outline"
        />
        <Button
          className="border-[#5865F2]! hover:bg-[#5865F2]!"
          nativeButton={false}
          render={
            <Link href={clientEnv.NEXT_PUBLIC_VNS_DISCORD_SERVER as Route}>
              <SiDiscord />
              <span className="sr-only">Discord</span>
            </Link>
          }
          size="icon-lg"
          variant="outline"
        />
        <Suspense>
          <DonateButton />
        </Suspense>
      </div>
    </motion.header>
  );
}