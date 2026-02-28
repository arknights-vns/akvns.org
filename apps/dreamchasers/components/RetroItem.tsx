import Image from "next/image";
import Link from "next/link";
import supabaseLoader from "@/lib/supabase/image";

type RetroItemProps = {
    title: string;
    description: string;
    year: 2024 | 2025;
    eventId: string;
};

export default function RetroItem(props: RetroItemProps) {
    const bannerImage = `/events/${props.year}/${props.eventId}/banner.jpg`;

    return (
        <div className="flex max-w-[80vw] flex-col border-2 border-primary/25 lg:flex-row">
            <figure className="flex max-h-48 w-full overflow-hidden lg:w-1/2">
                <Image
                    alt={props.eventId}
                    className="self-center border-2"
                    src={bannerImage}
                    width={3000}
                    height={1000}
                    loader={supabaseLoader}
                />
            </figure>
            <div className="flex w-full flex-col items-center justify-center bg-background lg:w-1/2">
                <Link
                    className="m-2 text-center text-xl font-extrabold hover:underline"
                    href={`/retro/${props.eventId}`}
                >
                    {props.title}
                </Link>
                <p className="m-3 text-center">{props.description}</p>
            </div>
        </div>
    );
}
