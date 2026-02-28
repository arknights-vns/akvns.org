import Image from "next/image";
import { createSupabase } from "@/lib/supabase/client";
import supabaseLoader from "@/lib/supabase/image";

type ImageGalleryProps = {
    albumPath: string;
};

export default async function ImageGallery({
    albumPath
}: ImageGalleryProps) {
    const supabase = createSupabase();

    const { data } = await supabase
        .storage
        .from("events")
        .list(`${albumPath}/album`);

    const images = data?.map(x => (
        `/events/${albumPath}/album/${x.name}`
    ));

    return (
        <div className="max-w-screen">
            <div className="max-w-full [column-gap:1.12rem] [column-count:2] md:[column-count:3] lg:[column-count:4]">
                {images!.map(src => (
                    <div
                        key={src}
                        className="mb-[1.12rem] w-full break-inside-avoid overflow-hidden rounded-xl shadow-lg"
                    >
                        <Image
                            alt=""
                            className="block object-cover"
                            height={480}
                            priority
                            src={src}
                            width={854}
                            loader={supabaseLoader}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
