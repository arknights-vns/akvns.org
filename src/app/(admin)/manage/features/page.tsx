"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import FeatureForm from "@/components/admin/FeatureForm";
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
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FeatureFlag, FeatureFlagListAPIResponse } from "@/schema/feature";

type FeatureFlagT = z.infer<typeof FeatureFlag>;

export default function AdminFeatureFlagPage() {
    const { data: flags, error } = useQuery({
        queryFn: async () => {
            const resp = await fetch("/api/feature");
            const body = await resp.json();

            const response = await FeatureFlagListAPIResponse.parseAsync(body);
            return response.message;
        },
        queryKey: ["features"],
    });

    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

    const queryClient = useQueryClient();

    const featureEditMutation = useMutation({
        mutationFn: async (data: z.infer<typeof FeatureFlag> & { idOld: string }) => {
            const resp = await fetch(`/api/feature/${data.idOld}`, {
                body: JSON.stringify({
                    description: data.description,
                    enable: data.enable,
                    group: data.group,
                    id: data.id,
                }),
                method: "PATCH",
            });

            if (resp.ok) {
                toast.success("Done!");
                setUpdateDialogOpen(false);
            }
            else {
                toast.error("We're cooked");
            }
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["features"] }),
    });

    const featureCreateMutation = useMutation({
        mutationFn: async (data: z.infer<typeof FeatureFlag> & { idOld: string }) => {
            const resp = await fetch("/api/feature", {
                body: JSON.stringify({
                    description: data.description,
                    enable: data.enable,
                    group: data.group,
                    id: data.id,
                }),
                method: "POST",
            });

            if (resp.ok) {
                toast.success("Done!");
                setCreateDialogOpen(false);
            }
            else {
                toast.error("We're cooked");
            }
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["features"] }),
    });

    const featureDeleteMutation = useMutation({
        mutationFn: async (flag: string) => {
            const resp = await fetch(`/api/feature/${flag}`, { method: "DELETE" });

            if (resp.ok) {
                toast.success("Done!");
            }
            else {
                toast.error("We are cooked.");
            }
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["features"] }),
    });

    if (!flags || error) return <></>;

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
                                <DropdownMenuRadioItem value={""}>ALL</DropdownMenuRadioItem>
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
                const isOn = row.original.enable;
                return (
                    isOn ? (<span className={"text-green-500"}>Bật</span>) : (<span className={"text-red-400"}>Tắt</span>)
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
                    <div className={"flex gap-2"}>
                        <TooltipProvider>
                            <Dialog onOpenChange={setUpdateDialogOpen} open={updateDialogOpen}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <DialogTrigger asChild>
                                            <Button size={"icon"}>
                                                <Pencil />
                                            </Button>
                                        </DialogTrigger>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Chỉnh sửa</p>
                                    </TooltipContent>
                                </Tooltip>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Don't ask why styling broke.</DialogTitle>
                                        <DialogDescription>Yours truly, Đụt</DialogDescription>
                                    </DialogHeader>
                                    <FeatureForm
                                        defaultValues={{
                                            description: feature.description,
                                            enable: feature.enable,
                                            group: feature.group,
                                            id: feature.id,
                                        }}
                                        formSchema={FeatureFlag}
                                        isEdit
                                        submitCallbackAction={data => featureEditMutation.mutate(data)}
                                    />
                                    <DialogFooter>
                                        <div>Nhớ réo tụi IT khi làm xong.</div>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button onClick={() => featureDeleteMutation.mutate(feature.id)} size={"icon"} variant={"destructive"}><Trash /></Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                Xóa
                            </TooltipContent>
                        </Tooltip>
                    </div>
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
                <div className={"flex gap-4 place-items-end-safe"}>
                    <Dialog onOpenChange={setCreateDialogOpen} open={createDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>Tạo mới</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Don't ask why styling broke.</DialogTitle>
                                <DialogDescription>Yours truly, Đụt</DialogDescription>
                            </DialogHeader>
                            <FeatureForm
                                defaultValues={{
                                    description: "YES",
                                    enable: true,
                                    group: "VNS TESTING",
                                    id: "VNS_SELL_TUS",
                                }}
                                formSchema={FeatureFlag}
                                isEdit={false}
                                submitCallbackAction={data => featureCreateMutation.mutate(data)}
                            />
                            <DialogFooter>
                                <div>Nhớ réo tụi IT khi làm xong.</div>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <RichTable columns={columns} data={flags} />
        </section>
    );
}
