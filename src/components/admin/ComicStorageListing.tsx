"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";
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
    SidebarMenu, SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ComicCollection, ComicCollectionListing } from "@/schema/comic";

export default function ComicStorageListing() {
    const queryClient = useQueryClient();

    const { data, error, isFetching } = useQuery({
        queryFn: async () => {
            const resp = await fetch("/api/comic/collections");
            return await ComicCollectionListing.parseAsync(await resp.json());
        },
        queryKey: ["comic-collections"],
    });

    const addBucketMutation = useMutation({
        mutationFn: async (item: z.infer<typeof ComicCollection>) => {
            const response = await fetch("/api/comic/collections", {
                body: JSON.stringify(item),
                method: "PUT",
            });
            if (!response.ok) {
                throw new Error("Something went wrong.");
            }
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["comic-collections"] }),
    });

    const form = useForm<z.infer<typeof ComicCollection>>({
        defaultValues: {
            name: "vns-collection-haidilao",
        },
        mode: "onChange",
        resolver: zodResolver(ComicCollection),
    });

    if (error) return <>We're cooked.</>;
    if (isFetching) return <></>;

    const buckets = data?.message || [];

    function onSubmit(data: z.infer<typeof ComicCollection>) {
        if (buckets.includes(data.name)) {
            toast.error("Có collection đó rồi!");
            return;
        }

        addBucketMutation.mutate(data);
    }

    return (
        <SidebarGroup>
            <SidebarGroupLabel>
                Comic Collection
            </SidebarGroupLabel>
            <SidebarGroupAction title={"Add Project"}>
                <Dialog>
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
                        buckets.map(bucket => (
                            <SidebarMenuItem key={bucket}>
                                <SidebarMenuButton asChild>
                                    <Link href={`/manage/comic/${bucket}`}>
                                        <span className={"font-bold"}>{bucket}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))
                    }
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
