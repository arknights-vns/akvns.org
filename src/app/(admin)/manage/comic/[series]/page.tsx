"use client";

import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ListRestart, MenuIcon, Plus, SaveAll, X } from "lucide-react";
import Image from "next/image";
import { use } from "react";
import { Controller, type UseFormRegister, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
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
import { ComicCategory as ComicCategoryEnum } from "@/generated/prisma/enums";
import { ComicChapter } from "@/schema/comic";

const ComicTranslatorInput = z.object({
    members: z.string(),
    role: z.string(),
});

const ComicSeriesEditForm = z.object({
    author: z.string().nonempty({ error: "Must be a string." }),
    category: z.enum(ComicCategoryEnum),
    comicChapters: z.array(ComicChapter),
    synopsis: z.string(),
    thumbnail: z.string(),
    title: z.string(),
    translators: z.array(ComicTranslatorInput),
});

type ComicSeriesFormValues = z.infer<typeof ComicSeriesEditForm>;

type DraggableChapterRowProperties = {
    id: string;
    index: number;
    register: UseFormRegister<ComicSeriesFormValues>;
    removeChapter: (index: number) => void;
};

export default function ComicSeriesEditor(properties: PageProps<"/manage/comic/[series]">) {
    const parameters = use(properties.params);
    const queryClient = useQueryClient();

    const { data, error } = useQuery({
        queryFn: async () => {
            const resp = await fetch(`/api/comic/${parameters.series}`);
            const json = await resp.json();
            const data = json.message;

            reset(data);

            // blame RHF for not having a way to handling array data.
            setValue(
                "translators",
                data.translators.map((entry: { members: string[]; role: string }) => {
                    return {
                        members: entry.members.join("; "),
                        role: entry.role,
                    };
                }),
                {
                    shouldDirty: true,
                    shouldValidate: true,
                },
            );

            // one accepts string semicolon-separated, one accepts array
            // so I quit.
            // return ComicSeriesMetadata.parseAsync(data);
            return data;
        },
        queryKey: ["comic", parameters.series],
    });

    const { control, handleSubmit, register, reset, setValue } = useForm<ComicSeriesFormValues>({
        defaultValues: {
            author: data?.author,
            category: data?.category as ComicCategoryEnum,
            comicChapters: data?.comicChapters,
            synopsis: data?.synopsis,
            title: data?.title,
            translators: data?.translators,
        },
        mode: "onChange",
        resolver: zodResolver(ComicSeriesEditForm),
    });

    const {
        append: appendTranslator,
        fields: translatorFields,
        remove: removeTranslator,
    } = useFieldArray({
        control,
        name: "translators",
    });

    const {
        append: appendChapter,
        fields: chapterFields,
        move: moveChapter,
        remove: removeChapter,
    } = useFieldArray({
        control,
        name: "comicChapters",
    });

    const handleDragEnd = (event: DragEndEvent): void => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const oldIndex = chapterFields.findIndex((chapter) => chapter.comicChapterId === active.id);
        const newIndex = chapterFields.findIndex((chapter) => chapter.comicChapterId === over.id);
        moveChapter(oldIndex, newIndex);
    };

    const comicEntryEditMutation = useMutation({
        mutationFn: async (values: ComicSeriesFormValues) => {
            const payload = {
                ...data,
                ...values,
                translators: values.translators
                    .filter((entry) => {
                        return entry.role.trim() !== "" || entry.members.trim() !== "";
                    })
                    .map((t) => {
                        return {
                            members: t.members.split(";").map((v) => v.trim()),
                            role: t.role,
                        };
                    }),
            };

            const resp = await fetch(`/api/comic/${parameters.series}`, {
                body: JSON.stringify(payload),
                method: "PUT",
            });

            if (!resp.ok) {
                throw new Error(`Unable to edit comic series.`);
            }
        },
        onError: () => {
            toast.error("Đã có lỗi xảy ra.");
            reset();
        },
        onSuccess: () => {
            toast.success("Chỉnh sửa series thành công.");
            queryClient.invalidateQueries({ queryKey: ["comic", parameters.series] }).then();
        },
    });

    const handleFormSubmit = async (values: ComicSeriesFormValues) => {
        comicEntryEditMutation.mutate(values);
    };

    if (error) {
        return <div>{error.message}</div>;
    }

    if (!data) {
        return <div>Please wait</div>;
    }

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
                    <Button form="comic-edit-form" type="submit">
                        <SaveAll /> Save
                    </Button>
                </div>
            </div>

            <form
                className="space-y-6"
                id="comic-edit-form"
                onSubmit={handleSubmit(handleFormSubmit)}
            >
                <div className="flex flex-col md:flex-row gap-4">
                    <div>
                        <Image
                            alt={`${parameters.series}-thumbnail`}
                            className="items-center h-auto"
                            height={280}
                            src={`/api/gallery/comic-thumbnail/image/${data.thumbnail}`}
                            unoptimized={true}
                            width={380}
                        />
                    </div>
                    <FieldGroup>
                        <div className="flex flex-col gap-8 w-full">
                            <Controller
                                control={control}
                                name="title"
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Title</FieldLabel>
                                        <Input {...field} aria-invalid={fieldState.invalid} />
                                        {fieldState.error && (
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
                                            <FieldLabel>Author</FieldLabel>
                                            <Input {...field} aria-invalid={fieldState.invalid} />
                                            {fieldState.error && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="category"
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Category</FieldLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <SelectTrigger aria-invalid={fieldState.invalid}>
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {Object.values(ComicCategoryEnum).map(
                                                        (categoryValue) => (
                                                            <SelectItem
                                                                key={categoryValue}
                                                                value={categoryValue}
                                                            >
                                                                {categoryValue.replaceAll("_", " ")}
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            {fieldState.error && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </div>
                            <Controller
                                control={control}
                                name="synopsis"
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Synopsis</FieldLabel>
                                        <Textarea {...field} aria-invalid={fieldState.invalid} />
                                        {fieldState.error && (
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
                                        <FieldLabel>Thumbnail</FieldLabel>
                                        <Input {...field} aria-invalid={fieldState.invalid} />
                                        {fieldState.error && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </div>
                    </FieldGroup>
                </div>

                <FieldSet className="border rounded-md p-4">
                    <FieldLegend>Translators</FieldLegend>
                    <Button
                        className="w-full"
                        onClick={() =>
                            appendTranslator({
                                members: "",
                                role: "",
                            })
                        }
                        type="button"
                        variant="secondary"
                    >
                        <Plus /> Add Translator
                    </Button>

                    <div className="space-y-1">
                        {translatorFields.map((translator, index) => (
                            <div className="flex gap-2" key={translator.id}>
                                <Input
                                    {...register(`translators.${index}.role`)}
                                    className="w-full"
                                    placeholder="Role (e.g. Typeset)"
                                />
                                <Input
                                    {...register(`translators.${index}.members`)}
                                    className="w-full"
                                    placeholder="Member(s); separated; by; a semicolon"
                                />
                                <Button
                                    className="text-red-500"
                                    onClick={() => removeTranslator(index)}
                                    size="sm"
                                    type="button"
                                    variant="ghost"
                                >
                                    <X /> Remove entry
                                </Button>
                            </div>
                        ))}
                    </div>
                </FieldSet>

                <FieldSet className="border rounded-md p-4">
                    <FieldLegend>Comic Chapters</FieldLegend>
                    <Button
                        onClick={() =>
                            appendChapter({
                                chapterName: "",
                                comicChapterId: "",
                            })
                        }
                        type="button"
                        variant="secondary"
                    >
                        <Plus /> Add Chapter
                    </Button>

                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext
                            items={chapterFields.map((chapter) => chapter.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <div className="mt-4 space-y-2">
                                {chapterFields.map((chapter, chapterIndex) => (
                                    <DraggableChapterRow
                                        id={chapter.id}
                                        index={chapterIndex}
                                        key={chapter.id}
                                        register={register}
                                        removeChapter={removeChapter}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                </FieldSet>

                <Field className="justify-end" orientation="horizontal">
                    <Button onClick={() => reset()} type="reset" variant="outline">
                        <ListRestart /> Reset
                    </Button>
                    <Button form="comic-edit-form" type="submit">
                        <SaveAll /> Save
                    </Button>
                </Field>
            </form>
        </section>
    );
}

function DraggableChapterRow({
    id,
    index,
    register,
    removeChapter,
}: DraggableChapterRowProperties) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="flex items-center gap-2 border rounded-md p-3 bg-background shadow-sm"
        >
            <Button {...listeners} className="cursor-grab">
                <MenuIcon />
            </Button>

            <div className="flex-1 grid grid-cols-2 gap-2">
                <Input
                    {...register(`comicChapters.${index}.chapterName`)}
                    placeholder="Chapter Name"
                />
                <Input
                    {...register(`comicChapters.${index}.comicChapterId`)}
                    placeholder="Gallery Name"
                />
            </div>

            <Button
                className="text-red-500"
                onClick={() => removeChapter(index)}
                size="sm"
                type="button"
                variant="ghost"
            >
                <X /> Remove Entry
            </Button>
        </div>
    );
}
