"use client";

import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/extension/typography";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Announcement } from "@/schema/announcement";

export default function AdminAlertSetup() {
    const { control, handleSubmit, watch, reset } = useForm<z.infer<typeof Announcement>>({
        resolver: zodResolver(Announcement),
        defaultValues: {
            content: "",
        },
    });

    const queryClient = useQueryClient();

    const rawContent = watch("content");

    const announcementMutation = useMutation({
        mutationFn: async (data: z.infer<typeof Announcement>) => {
            const resp = await fetch("/api/announcement", {
                method: "POST",
                body: JSON.stringify({
                    content: data.content,
                }),
            });

            if (!resp.ok) {
                throw new Error("Unable to update");
            }
        },
        onSuccess: () => {
            toast.success("Update thông báo thành công!");
        },
        onError: () => {
            toast.error("Update thông báo thất bại!");
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["announcements"] }),
    });

    const onSubmit = async (data: z.infer<typeof Announcement>) => {
        announcementMutation.mutate(data);
    };

    return (
        <section className="space-y-4">
            <div className="flex justify-between">
                <div className="space-y-4">
                    <div className="text-4xl font-extrabold">Website Alert</div>
                    <div className="text-muted-foreground">Chỉnh sửa thông báo đầu website.</div>
                </div>
                <div className="flex gap-4 place-items-end">
                    <Field orientation="horizontal">
                        <Button type="button" variant="outline" onClick={() => reset()}>
                            Reset
                        </Button>
                        <Button type="submit" form="announcement-setup">
                            Save
                        </Button>
                    </Field>
                </div>
            </div>
            <form id="announcement-setup" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="content"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="announcement-content">
                                Nội dung thông báo, HTML vẫn được.{" "}
                                <span className="font-bold">TailwindCSS vẫn được nốt.</span>{" "}
                                <span className="font-bold text-primary">
                                    {"<Image>"} và {"<Link>"} thì không.
                                </span>{" "}
                            </FieldLabel>
                            <Textarea
                                {...field}
                                spellCheck={false}
                                id="announcement-content"
                                aria-invalid={fieldState.invalid}
                                className="min-h-[120px] font-mono bg-muted/50"
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
            </form>
            <div className="space-y-2">
                <Heading kind="h2">Preview</Heading>
                <aside className="prose dark:prose-invert border-2 p-4 rounded-md min-h-[120px]">
                    {parse(DOMPurify.sanitize(rawContent))}
                </aside>
            </div>
        </section>
    );
}
