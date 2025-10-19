"use client";

import {
    ColumnDef, ColumnFiltersState,
    flexRender,
    getCoreRowModel, getFilteredRowModel, getSortedRowModel, SortingState,
    useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

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
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        [],
    );

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        state: {
            columnFilters,
            sorting,
        },
    });

    return (
        <div className={"rounded-md border"}>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead className={"text-center"} key={header.id}>
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
                    {table.getRowModel().rows?.length
                        ? (
                                table.getRowModel().rows.map(row => (
                                    <TableRow
                                        data-state={row.getIsSelected() && "selected"}
                                        key={row.id}
                                    >
                                        {row.getVisibleCells().map(cell => (
                                            <TableCell className={"justify-center items-center text-center"} key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            )
                        : (
                                <TableRow>
                                    <TableCell className={"h-24 text-center"} colSpan={columns.length}>
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                </TableBody>
            </Table>
        </div>
    );
}
