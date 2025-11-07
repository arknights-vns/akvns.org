"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MoreHorizontal, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    SidebarGroup, SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu, SidebarMenuAction, SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { ComicCollection, ComicCollectionListing } from "@/schema/comic";

export default function ComicStorageListing() {
    const queryClient = useQueryClient();
    const [creationFormOpen, setCreationFormOpen] = useState(false);

    const { data, error, isFetching } = useQuery({
        queryFn: async () => {
            const resp = await fetch("/api/comic/collections");
            return await ComicCollectionListing.parseAsync(await resp.json());
        },
        queryKey: ["comic-collections"],
    });

    const createBucketMutation = useMutation({
        mutationFn: async (item: z.infer<typeof ComicCollection>) => {
            const response = await fetch(`/api/comic/${item.name}`, {
                method: "PUT",
            });
            if (!response.ok) {
                throw new Error(`Unable to create bucket ${item.name}.`);
            }
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["comic-collections"] }).then();
            setCreationFormOpen(false);
            toast.success(`Tạo collection ${variables.name} thành công.`);
        },
    });

    const deleteBucketMutation = useMutation({
        mutationFn: async (bucket: string) => {
            const response = await fetch(`/api/comic/${bucket}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`Unable to delete bucket ${bucket}.`);
            }
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comic-collections"] }),
    });

    const form = useForm<z.infer<typeof ComicCollection>>({
        defaultValues: {
            name: "vns-collection-haidilao",
        },
        mode: "onChange",
        resolver: zodResolver(ComicCollection),
    });

    const buckets = data?.message || [];

    function onSubmit(data: z.infer<typeof ComicCollection>) {
        if (buckets.includes(data.name)) {
            toast.error("Có collection đó rồi!");
            return;
        }

        createBucketMutation.mutate(data);
    }

    return (
        <SidebarGroup>
            <SidebarGroupLabel>
                Comic Collection
            </SidebarGroupLabel>
            <SidebarGroupAction title={"Add Project"}>
                <Dialog onOpenChange={setCreationFormOpen} open={creationFormOpen}>
                    <DialogTrigger asChild>
                        <Plus />
                    </DialogTrigger>
                    <DialogContent className={"sm:max-w-md"}>
                        <DialogHeader>
                            <DialogTitle>Tạo collection cho truyện</DialogTitle>
                            <DialogDescription>Đây là game 1 mạng btw, lỡ mistype phát là bú luôn.</DialogDescription>
                        </DialogHeader>
                        <form id={"form-create-comic-bucket"} onSubmit={form.handleSubmit(onSubmit)}>
                            <FieldGroup>
                                <Controller
                                    control={form.control}
                                    name={"name"}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor={"form-create-comic-bucket-title"}>
                                                Tên collection
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                aria-invalid={fieldState.invalid}
                                                autoComplete={"off"}
                                                id={"form-rhf-demo-title"}
                                                placeholder={"vns-sigma-haidilao"}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </FieldGroup>
                        </form>
                        <DialogFooter>
                            <Field orientation={"horizontal"}>
                                <Button onClick={() => form.reset()} type={"button"} variant={"outline"}>
                                    Reset
                                </Button>
                                <Button form={"form-create-comic-bucket"} type={"submit"}>
                                    Submit
                                </Button>
                            </Field>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <span className={"sr-only"}>Add Comic Collection</span>
            </SidebarGroupAction>
            <SidebarGroupContent>
                <SidebarMenu>
                    {
                        isFetching && (
                            <SidebarMenuItem>
                                <Spinner />
                            </SidebarMenuItem>
                        )
                    }
                    {
                        error && <SidebarMenuItem>We're cooked</SidebarMenuItem>
                    }
                    {!error
                        && buckets.map(bucket => (
                            <SidebarMenuItem key={bucket}>
                                <SidebarMenuButton asChild>
                                    <Link href={`/manage/comic/${bucket}`}>
                                        <div className={"flex font-bold place-items-center-safe gap-1"}>
                                            <span>{bucket}</span>
                                        </div>
                                    </Link>
                                </SidebarMenuButton>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuAction>
                                            <MoreHorizontal />
                                        </SidebarMenuAction>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align={"start"} side={"right"}>
                                        <DropdownMenuItem>
                                            <div
                                                className={"flex place-items-center-safe gap-2"}
                                                onClick={() => deleteBucketMutation.mutate(bucket)}
                                                role={"button"}
                                            >
                                                <Trash className={"stroke-red-500"} />
                                                <span className={"text-red-500 font-bold"}>Xóa</span>
                                            </div>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </SidebarMenuItem>
                        ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
