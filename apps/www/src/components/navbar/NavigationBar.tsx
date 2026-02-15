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

export default function NavigationBar() {
  return (
    <header className="flex h-18 justify-between bg-background px-4">
      <div className="place-items-center-safe flex w-[25vw] gap-4">
        <MobileNavigationSidebar links={links} />
        <Link href="/">
          <Image alt="VNS_Logo_Header" className="dark:invert" height={52} loading="eager" src={VNS_Icon} />
        </Link>
      </div>
      <DesktopNavigationMenu links={links} />
      <div className="place-items-center-safe flex w-[25vw] justify-end gap-2">
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
            <Link href="https://discord.gg/arknights-vns">
              <SiDiscord />
              <span className="sr-only">Discord</span>
            </Link>
          }
          size="icon-lg"
          variant="outline"
        />
        <Suspense fallback={null}>
          <DonateButton />
        </Suspense>
      </div>
    </header>
  );
}
