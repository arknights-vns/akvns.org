import type { StaticImageData } from "next/image";
import Image from "next/image";

type OrganizerImageProps = {
    src: StaticImageData;
    alt: string;
};

export default function OrganizerImage(props: OrganizerImageProps) {
    return (
        <Image
            alt={props.alt}
            className="h-[40px] w-auto object-contain invert dark:invert-0"
            src={props.src}
        />
    );
}
