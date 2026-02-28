import Link from "next/link";
import { FaDiscord } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

export default function LandingCTAButton() {
    return (
        <>
            <Button asChild className="hidden rounded-xl text-lg lg:flex">
                <Link href="https://discord.gg/arknights-vns">
                    <FaDiscord size={64} />
                    VNS
                </Link>
            </Button>
            <Button asChild className="hidden rounded-xl text-lg lg:flex">
                <Link href="https://discord.gg/JrZaEVu5Hz">
                    <FaDiscord size={64} />
                    Dreamchasers
                </Link>
            </Button>
        </>
    );
}
