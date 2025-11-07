"use client";

import { Download } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type DownloadCollectionButtonProperties = {
    collection: string;
};

export default function DownloadButton(properties: DownloadCollectionButtonProperties) {
    const collection = properties.collection;

    return (
        <Button asChild variant={"secondary"}>
            <Link href={`/api/comic/${collection}/archive`}>
                <Download />
                Download
            </Link>
        </Button>
    );
}
