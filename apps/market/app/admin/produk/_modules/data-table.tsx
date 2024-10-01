'use client';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@pkm/ui';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import { ReactElement, useState } from 'react';
import { DataTableProductProps, TProductTable } from './types';
import Image from 'next/image';
import { AddProductButton, DeleteProductButton } from './buttons';
import { EditProductButton } from './buttons/edit';

export const ProductTable = <TData extends TProductTable, TValue>({
  data,
  columns,
}: DataTableProductProps<TData, TValue>): ReactElement => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 4,
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
    <div className="flex flex-col gap-4 pb-20">
      <div className="w-full flex justify-end">
        <AddProductButton />
      </div>
      <Table>
        <TableHeader className="[&_tr]:border-b-0">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-primary-80% hover:bg-primary-90%"
            >
              <TableHead className="w-[180px] text-xl font-normal text-center">
                Produk
              </TableHead>
              <TableHead className="w-[130px] text-xl font-normal text-center">
                Kategori
              </TableHead>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="text-center text-xl font-normal"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
              <TableHead className="text-center text-xl font-normal">
                Aksi
              </TableHead>
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="odd:bg-neutral-20% even:bg-primary-10% hover:bg-primary-20% border-0"
              >
                <TableCell className="w-[180px] text-center flex flex-col items-center gap-2 font-medium">
                  <Image
                    src={row.original.image}
                    alt={row.original.name}
                    width={500}
                    height={500}
                    quality={100}
                    className="object-cover max-w-[104px] max-h-[104px]"
                  />

                  {row.original.name}
                </TableCell>
                <TableCell className="w-[130px] text-center font-medium">
                  {row.original.category?.name}
                </TableCell>
                {row.getVisibleCells()?.map((cell, index) => (
                  <TableCell
                    key={index}
                    className="text-center font-medium max-w-[150px]"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell className="text-center space-x-4">
                  <EditProductButton id={row.original.id} />
                  <DeleteProductButton id={row.original.id} />
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

      <div className="flex gap-2 mb-10 items-center w-full justify-center">
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
    </div>
  );
};
