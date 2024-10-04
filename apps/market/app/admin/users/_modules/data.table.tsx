'use client';
import {
  Button,
  Pagination,
  PaginationContent,
  PaginationItem,
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
import { DataTableUsersProps, TUsersTable } from './types';
import Image from 'next/image';
import { CaretLeftOutlined, CaretRightFilled } from '@ant-design/icons';
import { cn } from '@pkm/libs/clsx';
import { generatePageArray } from '@pkm/libs/entities';

export const ProductTable = <TData extends TUsersTable, TValue>({
  data,
  columns,
}: DataTableUsersProps<TData, TValue>): ReactElement => {
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
      <Table>
        <TableHeader className="[&_tr]:border-b-0">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-primary-80% hover:bg-primary-90%"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="text-left text-xl font-normal"
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

              <TableHead className="text-xl font-normal">Foto</TableHead>
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
                {row.getVisibleCells()?.map((cell, index) => (
                  <TableCell
                    key={index}
                    className="text-left font-medium max-w-[190px] py-10"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}

                <TableCell>
                  <Image
                    src={row.original.image || ''}
                    alt={row.original.fullname}
                    width={500}
                    height={500}
                    quality={100}
                    className="object-cover min-h-[50px] min-w-[50px] max-w-[50px] max-h-[50px] rounded-full"
                  />
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
        <Pagination>
          <PaginationContent className="gap-2 items-end">
            <PaginationItem>
              <Button
                variant="text"
                size="sm"
                color="black"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <CaretLeftOutlined className="text-lg" />
              </Button>
            </PaginationItem>

            {generatePageArray({
              page: table.getState().pagination.pageIndex + 1,
              totalPages: table.getPageCount(),
              maxButtons: 4,
            }).map((item, index) => (
              <PaginationItem key={`pagination-index-${index}`}>
                <button
                  onClick={() => table.setPageIndex(item - 1)}
                  className={cn(
                    'text-sm px-3.5 py-2 text-center border border-black rounded-lg',
                    {
                      'bg-black text-white':
                        table.getState().pagination.pageIndex === item - 1,
                    }
                  )}
                >
                  {item}
                </button>
              </PaginationItem>
            ))}

            <PaginationItem>
              <Button
                variant="text"
                size="sm"
                color="black"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <CaretRightFilled className="text-lg" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
