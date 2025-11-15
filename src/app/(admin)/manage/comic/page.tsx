"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Route } from "next";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import RichTable from "@/components/RichTable";
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
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ComicSeriesMetadata } from "@/schema/comic";

type Comic = {
    category: string;
    comicSeriesId: string;
    likeCount: number;
    thumbnail: string;
    title: string;
    viewCount: number;
};

export default function ComicManagementPage() {
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryFn: async () => {
            const resp = await fetch("/api/comic");
            const json = await resp.json();

            return json.message as Comic[];
        },
        queryKey: ["comic"],
    });

    const comicEntryDeleteMutation = useMutation({
        mutationFn: async (series: string) => {
            const resp = await fetch(`/api/comic/${series}`, { method: "DELETE" });

            if (!resp.ok) {
                throw new Error(`Unable to delete comic series ${series}.`);
            }
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comic"] }),
    });

    const columns: ColumnDef<Comic>[] = [
        {
            accessorKey: "thumbnail",
            cell: (context) => {
                const comic = context.row.original;
                return (
                    <Image
                        alt={`${comic.title}-thumbnail`}
                        className="items-center"
                        height={181}
                        src={`/api/gallery/comic-thumbnail/image/${comic.thumbnail}`}
                        unoptimized={true}
                        width={128}
                    />
                );
            },
            header: "Thumbnail",
        },
        {
            accessorKey: "comicSeriesId",
            header: "ID",
        },
        {
            accessorKey: "title",
            cell: (context) => {
                const value = context.row.original;

                return (
                    <Link
                        className="font-bold underline underline-offset-2 decoration-dashed"
                        href={`/manage/comic/${value.comicSeriesId}` as Route}
                    >
                        {value.title}
                    </Link>
                );
            },
            header: "Name",
        },
        {
            accessorKey: "category",
            header: "Kind",
        },
        {
            accessorKey: "viewCount",
            header: "Views",
        },
        {
            accessorKey: "likeCount",
            header: "Likes",
        },
        {
            accessorKey: "actions",
            cell: (context) => {
                const comic = context.row.original;

                return (
                    <Button
                        onClick={() => comicEntryDeleteMutation.mutate(comic.comicSeriesId)}
                        variant="destructive"
                    >
                        <Trash /> Xóa
                    </Button>
                );
            },
            header: "",
        },
    ];

    return (
        <section className="space-y-4">
            <div className="flex justify-between">
                <div className="space-y-4">
                    <div className="text-4xl font-extrabold">Comic Management</div>
                    <div className="text-muted-foreground">
                        Quản lý các đầu truyện của @terrastationvn.
                    </div>
                </div>
                <div className="flex gap-4 place-items-end">
                    <ComicCreateForm />
                </div>
            </div>
            {data && <RichTable columns={columns} data={data} />}
        </section>
    );
}

function ComicCreateForm() {
    const [formOpen, setFormOpen] = useState(false);
    const queryClient = useQueryClient();
    const formSchema = ComicSeriesMetadata.partial();

    const { control, handleSubmit, reset } = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            author: "Tus",
            category: "Arknights_VNS",
            comicSeriesId: "kimi-no-aiba-ga",
            synopsis: "Uma musume but...",
            thumbnail: "kimi-no-aiba-ga.png",
            title: "Angelina Musume: Pretty Derby!",
        },
        resolver: zodResolver(formSchema),
    });

    const comicEntryCreateMutation = useMutation({
        mutationFn: async (data: z.infer<typeof formSchema>) => {
            const resp = await fetch("/api/comic", {
                body: JSON.stringify(data),
                method: "POST",
            });

            if (!resp.ok) {
                throw new Error(`Unable to create comic series.`);
            }
        },
        onError: () => {
            toast.error("Đã có lỗi xảy ra.");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comic"] }).then();
            setFormOpen(false);
            toast.success("Đã tạo series thành công.");
        },
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        comicEntryCreateMutation.mutate(data);
    }

    return (
        <Dialog onOpenChange={setFormOpen} open={formOpen}>
            <DialogTrigger asChild={true}>
                <Button>
                    <Plus />
                    Tạo mới
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Thêm Comic Series</DialogTitle>
                    <DialogDescription>Your old friend "Game 1 mạng".</DialogDescription>
                </DialogHeader>
                <form id="comic-create-form" onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            control={control}
                            name="comicSeriesId"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-id">ID</FieldLabel>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        autoComplete="off"
                                        className="font-mono"
                                        id="form-id"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            control={control}
                            name="title"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-title">Title</FieldLabel>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        autoComplete="off"
                                        id="form-title"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <div className="flex gap-2">
                            <Controller
                                control={control}
                                name="author"
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-author">Author</FieldLabel>
                                        <Input
                                            {...field}
                                            aria-invalid={fieldState.invalid}
                                            autoComplete="off"
                                            id="form-author"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                control={control}
                                name="category"
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} orientation="vertical">
                                        <FieldLabel htmlFor="form-source">Source</FieldLabel>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                        <Select
                                            name={field.name}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <SelectTrigger
                                                aria-invalid={fieldState.invalid}
                                                className="min-w-[120px]"
                                                id="form-source"
                                            >
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent position="item-aligned">
                                                <SelectItem value="Arknights_VNS">
                                                    Arknights VNS
                                                </SelectItem>
                                                <SelectItem value="Partner">Partner</SelectItem>
                                                <SelectItem value="Collaboration">
                                                    Collaboration
                                                </SelectItem>
                                                <SelectItem value="Community">Community</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                )}
                            />
                        </div>
                        <Controller
                            control={control}
                            name="synopsis"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-synopsis">Synopsis</FieldLabel>
                                    <Textarea
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        autoComplete="off"
                                        id="form-synopsis"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            control={control}
                            name="thumbnail"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldContent>
                                        <FieldLabel htmlFor="form-synopsis">
                                            Thumbnail file
                                        </FieldLabel>
                                        <FieldDescription>
                                            URL hoặc tên file trong Gallery "comic-thumbnail"
                                        </FieldDescription>
                                    </FieldContent>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        autoComplete="off"
                                        id="form-synopsis"
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
                    <Field orientation="horizontal">
                        <Button onClick={() => reset()} type="button" variant="outline">
                            Reset
                        </Button>
                        <Button form="comic-create-form" type="submit">
                            Submit
                        </Button>
                    </Field>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
