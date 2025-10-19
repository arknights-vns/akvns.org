"use client";

import { useForm } from "@tanstack/react-form";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import RichTable from "@/components/RichTable";
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
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { FeatureFlag, FeatureFlagArray, FeatureFlagListAPIResponse } from "@/schema/feature";

type FeatureFlagListT = z.infer<typeof FeatureFlagArray>;
type FeatureFlagT = z.infer<typeof FeatureFlag>;

export default function AdminFeatureFlagPage() {
    const [flags, setFlags] = useState<FeatureFlagListT>([]);

    useEffect(() => {
        async function fetchFlags() {
            const resp = await fetch("/api/feature");
            const body = await resp.json();

            const response = await FeatureFlagListAPIResponse.parseAsync(body);
            const features = response.message;

            setFlags(features);
        }

        fetchFlags().then();
    }, []);

    const handleFeatureSwitch = useCallback((flag: string) => {
        const entry = flags.find(x => x.id === flag);

        if (!entry) return;

        const enabled = entry.enable;

        setFlags((previous) => {
            const otherEntries = previous.filter(x => x.id != flag);

            return [
                ...otherEntries,
                { ...entry,
                    enable: !enabled },
            ];
        });
    }, [flags]);

    const handleFeaturesUpdate = useCallback(() => {
        async function submit() {
            const resp = await fetch("/api/feature", { body: JSON.stringify(flags),
                method: "PATCH" });

            if (resp.ok) {
                toast.success("Done!");
            }
            else {
                toast.error("We are cooked.");
            }
        }

        submit().then();
    }, [flags]);

    const handleFeatureDelete = useCallback((flag: string) => {
        async function submit() {
            const resp = await fetch(`/api/feature/${flag}`, { method: "DELETE" });

            if (resp.ok) {
                toast.success("Done!");
                globalThis.location.reload();
            }
            else {
                toast.error("We are cooked.");
            }
        }

        submit().then();
    }, []);

    const featureCreateForm = useForm({
        defaultValues: {
            description: "Description",
            enable: true,
            group: "TEST",
            id: "EXAMPLE_FLAG_01",
        },
        onSubmit: async ({ value }) => {
            const resp = await fetch("/api/feature",
                {
                    body: JSON.stringify(value),
                    method: "POST",
                },
            );

            if (resp.ok) {
                toast.success("Done!");
                globalThis.location.reload();
            }
            else {
                toast.error("We are cooked.");
            }
        },
        validators: {
            onSubmit: FeatureFlag,
        },
    });

    const groups = [...Map.groupBy(flags, flag => flag.group).keys()];

    const columns: ColumnDef<FeatureFlagT>[] = [
        {
            accessorKey: "id",
            cell: ({ row }) => {
                return (
                    <span className={"font-mono"}>
                        {row.getValue("id")}
                    </span>
                );
            },
            header: ({ column }) => {
                return (
                    <Button
                        className={"font-extrabold"}
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        variant={"ghost"}
                    >
                        Tính năng
                        <ArrowUpDown className={"ml-2 h-4 w-4"} />
                    </Button>
                );
            },
        },
        {
            accessorKey: "description",
            header: () => {
                return (
                    <span className={"font-extrabold"}>
                        Mô tả
                    </span>
                );
            },
        },
        {
            accessorKey: "group",
            header: ({ column }) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className={"font-extrabold"} variant={"ghost"}>
                                Nhóm
                                <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align={"end"} className={"mt-1"}>
                            <DropdownMenuRadioGroup onValueChange={column.setFilterValue} value={column.getFilterValue() as string ?? "NORMAL"}>
                                {groups.map(group => (
                                    <DropdownMenuRadioItem key={group} value={group}>{group}</DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
        {
            accessorKey: "enable",
            cell: ({ row }) => {
                return (
                    <Switch
                        checked={row.getValue("enable")}
                        onClick={() => handleFeatureSwitch(row.getValue("id"))}
                    />
                );
            },
            header: ({ column }) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className={"font-extrabold"} variant={"ghost"}>
                                Trạng thái
                                <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align={"end"} className={"mt-1"}>
                            <DropdownMenuRadioGroup onValueChange={column.setFilterValue} value={column.getFilterValue() as string ?? ""}>
                                <DropdownMenuRadioItem value={""}>ALL</DropdownMenuRadioItem>
                                {/* @ts-expect-error This is a toggle. */}
                                <DropdownMenuRadioItem value>On</DropdownMenuRadioItem>
                                {/* @ts-expect-error This is a toggle. */}
                                <DropdownMenuRadioItem value={false}>Off</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
        {
            cell: ({ row }) => {
                const feature = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className={"h-8 w-8 p-0"} variant={"ghost"}>
                                <span className={"sr-only"}>Open menu</span>
                                <MoreHorizontal className={"h-4 w-4"} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align={"end"}>
                            <DropdownMenuItem
                                className={"font-extrabold text-red-400"}
                                onClick={() => handleFeatureDelete(feature.id)}
                            >
                                Xóa
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
            id: "actions",
        },
    ];

    return (
        <section className={"space-y-4"}>
            <div className={"flex justify-between"}>
                <div className={"space-y-4"}>
                    <div className={"text-4xl font-bold"}>Feature flag</div>
                    <div className={"text-muted-foreground"}>Thay đổi các tính năng của website AKVNS.</div>
                </div>
                <div className={"flex gap-4"}>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className={"self-end"}>Tạo mới</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Thêm tính năng</DialogTitle>
                                <DialogDescription>
                                    Nhớ
                                    {" "}
                                    <span className={"font-bold"}>@IT</span>
                                    {" "}
                                    trước/sau khi thêm. Và mặc định là được bật.
                                </DialogDescription>
                            </DialogHeader>
                            <form
                                id={"feature-create-form"}
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    featureCreateForm.handleSubmit().then();
                                }}
                            >
                                <FieldGroup>
                                    <featureCreateForm.Field
                                        children={(field) => {
                                            const isInvalid
                                                = field.state.meta.isTouched && !field.state.meta.isValid;
                                            return (
                                                <Field data-invalid={isInvalid}>
                                                    <FieldLabel htmlFor={field.name}>Tên tính năng</FieldLabel>
                                                    <Input
                                                        aria-invalid={isInvalid}
                                                        autoComplete={"off"}
                                                        id={field.name}
                                                        name={field.name}
                                                        onBlur={field.handleBlur}
                                                        onChange={event => field.handleChange(event.target.value)}
                                                        value={field.state.value}
                                                    />
                                                    {isInvalid && (
                                                        <FieldError errors={field.state.meta.errors} />
                                                    )}
                                                </Field>
                                            );
                                        }}
                                        name={"id"}
                                    />
                                    <featureCreateForm.Field
                                        children={(field) => {
                                            const isInvalid
                                                = field.state.meta.isTouched && !field.state.meta.isValid;
                                            return (
                                                <Field data-invalid={isInvalid}>
                                                    <FieldLabel htmlFor={field.name}>Mô tả</FieldLabel>
                                                    <Textarea
                                                        aria-invalid={isInvalid}
                                                        autoComplete={"off"}
                                                        id={field.name}
                                                        name={field.name}
                                                        onBlur={field.handleBlur}
                                                        onChange={event => field.handleChange(event.target.value)}
                                                        placeholder={"Login button not working on mobile"}
                                                        value={field.state.value}
                                                    />
                                                    {isInvalid && (
                                                        <FieldError errors={field.state.meta.errors} />
                                                    )}
                                                </Field>
                                            );
                                        }}
                                        name={"description"}
                                    />
                                    <featureCreateForm.Field
                                        children={(field) => {
                                            const isInvalid
                                                = field.state.meta.isTouched && !field.state.meta.isValid;
                                            return (
                                                <Field data-invalid={isInvalid}>
                                                    <FieldLabel htmlFor={field.name}>Nhóm</FieldLabel>
                                                    <Input
                                                        aria-invalid={isInvalid}
                                                        autoComplete={"off"}
                                                        id={field.name}
                                                        name={field.name}
                                                        onBlur={field.handleBlur}
                                                        onChange={event => field.handleChange(event.target.value)}
                                                        placeholder={"Login button not working on mobile"}
                                                        value={field.state.value}
                                                    />
                                                    {isInvalid && (
                                                        <FieldError errors={field.state.meta.errors} />
                                                    )}
                                                </Field>
                                            );
                                        }}
                                        name={"group"}
                                    />
                                </FieldGroup>
                            </form>
                            <DialogFooter>
                                <Field orientation={"horizontal"}>
                                    <Button onClick={() => featureCreateForm.reset()} type={"button"} variant={"outline"}>
                                        Reset
                                    </Button>
                                    <Button form={"feature-create-form"} type={"submit"}>
                                        Submit
                                    </Button>
                                </Field>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Button className={"self-end"} onClick={handleFeaturesUpdate} variant={"destructive"}>Lưu thay đổi</Button>
                </div>
            </div>
            <RichTable columns={columns} data={flags} />
        </section>
    );
}
