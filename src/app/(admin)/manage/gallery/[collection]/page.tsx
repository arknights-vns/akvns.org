"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Download, RotateCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import { toast } from "sonner";

import UploadButton from "@/components/admin/UploadButton";
import { Button } from "@/components/ui/button";
import { GalleryAssets } from "@/schema/gallery";

export default function ImageCollectionViewer(properties: PageProps<"/manage/gallery/[collection]">) {
    const { collection } = use(properties.params);
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryFn: async () => {
            const resp = await fetch(`/api/gallery/${collection}/image`);
            const json = await resp.json();
            return await GalleryAssets.parseAsync(json["message"]);
        },
        queryKey: ["gallery-assets", collection],
    });

    const wipeCollectionMutation = useMutation({
        mutationFn: async () => {
            const response = await fetch(`/api/gallery/${collection}/image`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`Unable to wipe out bucket: ${collection}.`);
            }
        },
        onError: () => toast.error("Không thể reset!"),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["gallery-assets", collection] }),
    });

    const assets = data || [];

    return (
        <section className={"space-y-4"}>
            <div className={"flex justify-between"}>
                <div className={"space-y-4"}>
                    <div className={"text-4xl font-extrabold"}>
                        Collection:
                        {" "}
                        <span className={"font-mono"}>{collection}</span>
                    </div>
                    <div className={"text-muted-foreground"}>
                        Vì collection này 1 khi upload lên là hard-freeze, nên là muốn edit gì thì chịu khó reset rồi up lại nha.
                    </div>
                </div>
                <div className={"flex gap-4 place-items-end"}>
                    <UploadButton
                        collection={collection}
                    />
                    <Button
                        asChild={assets.length > 0}
                        disabled={assets.length === 0}
                        variant={"ghost"}
                    >
                        <Link className={"flex gap-2 items-center"} href={`/api/gallery/${collection}/archive`}>
                            <Download />
                            {" "}
                            Download
                        </Link>
                    </Button>
                    <Button
                        disabled={assets.length === 0}
                        onClick={() => wipeCollectionMutation.mutate()}
                        variant={"destructive"}
                    >
                        <RotateCcw />
                        {" "}
                        Reset
                    </Button>
                </div>
            </div>
            {assets.length > 0 && (
                <div className={"flex gap-4 flex-wrap place-items-start place-content-center-safe"}>
                    {
                        assets.map(image => (
                            <div className={"flex flex-col gap-2"} key={`${collection}-${image.name}`}>
                                <span className={"font-mono text-sm text-center"}>{image.name}</span>
                                <Image
                                    alt={image.name}
                                    className={"object-cover"}
                                    height={180}
                                    src={image.url}
                                    width={250}
                                />
                            </div>
                        ))
                    }
                </div>
            )}
            {
                assets.length === 0 && (
                    <div className={"flex h-[60svh]"}>
                        <p className={"flex-1 self-center-safe text-center"}>
                            Wow, such empty.
                        </p>
                    </div>
                )
            }
        </section>
    );
}
