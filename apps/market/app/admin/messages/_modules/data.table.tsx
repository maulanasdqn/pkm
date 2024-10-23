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
import {
  CaretLeftOutlined,
  CaretRightFilled,
  DeleteOutlined,
} from '@ant-design/icons';
import { cn } from '@pkm/libs/clsx';
import { generatePageArray } from '@pkm/libs/entities';
import { DataTableMessagesProps, TMessagesTable } from './types';
import { updateReadMessages } from '@pkm/libs/actions/market';
import { DeleteMessageButton } from './buttons';

export const MessagesTable = <TData extends TMessagesTable, TValue>({
  data,
  columns,
}: DataTableMessagesProps<TData, TValue>): ReactElement => {
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

              <TableHead className="text-xl font-normal">
                Detail Pesan
              </TableHead>
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={async () => {
                  if (!row.original.isRead) {
                    await updateReadMessages(row.original.id);
                  }
                }}
                className={cn('bg-neutral-20% border-0', {
                  'bg-primary-10% hover:bg-primary-20%': !row.original.isRead,
                })}
              >
                {row.getVisibleCells()?.map((cell, index) => (
                  <TableCell
                    key={index}
                    className="text-left font-medium max-w-[190px] py-10"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}

                <TableCell className="text-left font-medium max-w-[190px] py-10">
                  <div className="w-full flex gap-10 pr-4 justify-between">
                    <p>{row.original.message}</p>

                    <DeleteMessageButton id={row.original.id} />
                  </div>
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
