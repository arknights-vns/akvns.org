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
                    className="relative bg-background rounded-lg p-2"
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
                        <div className="flex items-center justify-center flex-col pt-3 pb-4">
                            <Paperclip />
                            <span>(1000 files, max 100mb, btw)</span>
                        </div>
                    </FileInput>
                    <FileUploaderContent className="flex items-center place-content-center-safe gap-8 flex-row flex-wrap overflow-y-scroll max-h-[50svh]">
                        {files?.map((file, index) => (
                            <FileUploaderItem
                                className="flex flex-col h-auto w-1/4 p-0 rounded-md"
                                index={index}
                                key={`${collection}-${file.name}`}
                            >
                                <div className="flex flex-col gap-4">
                                    <Image
                                        alt={file.name}
                                        className="size-30 p-0 object-cover"
                                        height={80}
                                        src={URL.createObjectURL(file)}
                                        width={80}
                                    />
                                    <span className="text-center text-xs font-mono">
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
