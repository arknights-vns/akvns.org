"use client";

import {
    type ColumnDef,
    type ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable,
} from "@tanstack/react-table";
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

type DataTableProperties<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
};

export default function RichTable<TData, TValue>({
    columns,
    data,
}: DataTableProperties<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        state: {
            columnFilters,
            sorting,
        },
    });

    return (
        <div className="flex flex-col gap-2 place-items-center-safe">
            <Table className="border rounded-md">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead
                                        className="text-center font-extrabold"
                                        key={header.id}
                                    >
                                        {header.isPlaceholder
                                            ? undefined
                                            : flexRender(
                                                  header.column.columnDef.header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow data-state={row.getIsSelected() && "selected"} key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        className="place-items-center-safe text-center"
                                        key={cell.id}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell className="h-24 text-center" colSpan={columns.length}>
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {table.getPageCount() > 0 && (
                <div className="flex flex-col items-center gap-2">
                    <div className="flex gap-2">
                        <Button
                            className="border rounded-full p-1"
                            disabled={!table.getCanPreviousPage()}
                            onClick={() => table.firstPage()}
                            size="icon"
                        >
                            <ChevronFirst />
                        </Button>
                        <Button
                            className="border rounded-full p-2"
                            disabled={!table.getCanPreviousPage()}
                            onClick={() => table.previousPage()}
                            size="icon"
                        >
                            <ChevronLeft />
                        </Button>
                        <Button
                            className="border rounded-full p-1"
                            disabled={!table.getCanNextPage()}
                            onClick={() => table.nextPage()}
                            size="icon"
                        >
                            <ChevronRight />
                        </Button>
                        <Button
                            className="border rounded-full p-1"
                            disabled={!table.getCanNextPage()}
                            onClick={() => table.lastPage()}
                            size="icon"
                        >
                            <ChevronLast />
                        </Button>
                    </div>
                    <div className="flex gap-2 items-center-safe">
                        <span className="flex items-center gap-1">
                            <div>Page</div>
                            <strong>
                                {table.getState().pagination.pageIndex + 1} of{" "}
                                {table.getPageCount().toLocaleString()}
                            </strong>
                        </span>
                        <Separator
                            className="data-[orientation=vertical]:h-6"
                            orientation="vertical"
                        />
                        <span className="flex items-center gap-1">
                            Go to page:
                            <Input
                                className="border p-1 rounded w-16"
                                defaultValue={table.getState().pagination.pageIndex + 1}
                                max={table.getPageCount()}
                                min="1"
                                onChange={(event) => {
                                    const page = event.target.value
                                        ? Number(event.target.value) - 1
                                        : 0;
                                    table.setPageIndex(page);
                                }}
                                type="number"
                            />
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
