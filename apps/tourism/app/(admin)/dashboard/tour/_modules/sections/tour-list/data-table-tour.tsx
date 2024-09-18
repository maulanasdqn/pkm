'use client';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import { DataTableTourProps } from './type';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@pkm/ui';
import { TourFormTrigger } from '../tour-form';
import { TDestinationSchema } from '@pkm/libs/entities';
import { DeleteTrigger } from './delete-trigger';
import { useState } from 'react';

export const DataTableTour = <TData extends TDestinationSchema, TValue>({
  columns,
  data,
}: DataTableTourProps<TData, TValue>) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });
  return (
    <>
      <Table className="-z-10">
        <TableHeader className="[&_tr]:border-b-0">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-primary-80% hover:bg-primary-90%"
            >
              <TableHead className="w-[100px]">No</TableHead>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
              <TableHead className="text-right pr-14">Aksi</TableHead>
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.id}
                className="odd:bg-primary-20% even:bg-primary-30% hover:bg-primary-50% border-0"
              >
                <TableCell>{index + 1}</TableCell>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell className="flex w-full gap-2 justify-end">
                  <TourFormTrigger text="edit" id={row.original.id} />
                  <DeleteTrigger id={row.original.id} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Belum ada data/Data tidak ditemukan.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex gap-2 mb-10 items-center w-full justify-end">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </>
  );
};
