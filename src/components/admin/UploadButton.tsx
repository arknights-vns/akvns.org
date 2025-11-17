"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Paperclip, Upload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    FileInput,
    FileUploader,
    FileUploaderContent,
    FileUploaderItem,
} from "@/components/ui/extension/file-input";
import { Spinner } from "@/components/ui/spinner";

type UploadToCollectionButtonProperties = {
    collection: string;
};

export default function UploadButton(properties: UploadToCollectionButtonProperties) {
    const collection = properties.collection;

    const queryClient = useQueryClient();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [files, setFiles] = useState<File[] | null>([]);

    const uploadToCollectionMutation = useMutation({
        mutationFn: async (files: File[] | null) => {
            if (!files) return;

            const formData = new FormData();

            for (const file of files) formData.append("files", file);

            const response = await fetch(`/api/gallery/${collection}/image`, {
                body: formData,
                method: "PUT",
            });

            if (!response.ok) {
                throw new Error(`Unable to upload files to collection ${collection}.`);
            }
        },
        onSuccess: () => {
            setDialogOpen(false);
            setFiles([]);
            queryClient.invalidateQueries({ queryKey: ["gallery-assets", collection] }).then();
        },
    });

    return (
        <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
            <DialogTrigger asChild={true}>
                <Button>
                    <Upload /> Upload
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload</DialogTitle>
                    <DialogDescription>Không phải lúc nào cũng hoạt động.</DialogDescription>
                </DialogHeader>
                <FileUploader
                    className="relative rounded-lg bg-background p-2"
                    dropzoneOptions={{
                        accept: {
                            "image/jpeg": ["*"],
                            "image/png": ["*"],
                        },
                        autoFocus: true,
                        maxFiles: 1000,
                        maxSize: 1024 * 1024 * 100,
                        multiple: true,
                    }}
                    onValueChange={setFiles}
                    reSelect={true}
                    value={files}
                >
                    <FileInput className="outline-dashed outline-1 outline-white">
                        <div className="flex flex-col items-center justify-center pt-3 pb-4">
                            <Paperclip />
                            <span>(1000 files, max 100mb, btw)</span>
                        </div>
                    </FileInput>
                    <FileUploaderContent className="place-content-center-safe flex max-h-[50svh] flex-row flex-wrap items-center gap-8 overflow-y-scroll">
                        {files?.map((file, index) => (
                            <FileUploaderItem
                                className="flex h-auto w-1/4 flex-col rounded-md p-0"
                                index={index}
                                key={`${collection}-${file.name}`}
                            >
                                <div className="flex flex-col gap-4">
                                    <Image
                                        alt={file.name}
                                        className="size-30 object-cover p-0"
                                        height={80}
                                        src={URL.createObjectURL(file)}
                                        width={80}
                                    />
                                    <span className="text-center font-mono text-xs">
                                        {file.name}
                                    </span>
                                </div>
                            </FileUploaderItem>
                        ))}
                    </FileUploaderContent>
                </FileUploader>
                <DialogFooter>
                    <Button
                        disabled={uploadToCollectionMutation.isPending || !files?.length}
                        onClick={() => uploadToCollectionMutation.mutate(files)}
                        type="submit"
                    >
                        {uploadToCollectionMutation.isPending ? (
                            <>
                                <Spinner />
                                Uploading...
                            </>
                        ) : (
                            <>Upload</>
                        )}
                    </Button>
                    <Button onClick={() => setFiles([])} variant="secondary">
                        Clear
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
