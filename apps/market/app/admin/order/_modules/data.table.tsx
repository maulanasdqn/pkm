'use client';
import {
  Button,
  DialogHeader,
  Pagination,
  PaginationContent,
  PaginationItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@pkm/ui';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import { Fragment, ReactElement, useState } from 'react';
import { DataTableOrdersProps, TOrdersTable } from './types';
import Image from 'next/image';
import {
  CaretLeftOutlined,
  CaretRightFilled,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { cn } from '@pkm/libs/clsx';
import { generatePageArray, OrderStatus } from '@pkm/libs/entities';
import { RejectButton } from './buttons/reject';
import { AcceptButton } from './buttons/accept';

export const OrdersTable = <TData extends TOrdersTable, TValue>({
  data,
  columns,
}: DataTableOrdersProps<TData, TValue>): ReactElement => {
  const [showImageModal, setShowImageModal] = useState<string | null>(null);
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
    <Fragment>
      <Dialog
        modal
        open={!!showImageModal}
        onOpenChange={() => {
          setShowImageModal(null);
        }}
      >
        <DialogContent
          aria-description="Detail Bukti Pembayaran"
          aria-describedby="Detail Bukti Pembayaran"
          className="lg:max-w-[880px] sm:max-w-[425px] sm:max-h-[721px] bg-neutral-10% overflow-y-auto"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Detail Bukti Pembayaran
            </DialogTitle>
          </DialogHeader>

          <figure className="w-full h-full">
            <Image
              src={showImageModal || ''}
              alt="Detail Bukti Pembayaran"
              width={500}
              height={500}
              quality={100}
              className="w-full h-full object-cover"
            />
          </figure>
        </DialogContent>
      </Dialog>
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

                <TableHead className="text-center text-xl font-normal">
                  Bukti Pembayaran
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
                  {row.getVisibleCells()?.map((cell, index) => (
                    <TableCell
                      key={index}
                      className="text-center font-medium max-w-[150px] py-10 "
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}

                  <TableCell className="text-center">
                    {row?.original?.status === OrderStatus.PENDING && (
                      <Fragment>
                        <RejectButton orderId={row.original.id} />
                        <AcceptButton orderId={row.original.id} />
                      </Fragment>
                    )}

                    {row?.original?.status === OrderStatus.APPROVED && (
                      <p className="font-semibold text-sm text-primary">
                        Dikonfirmasi
                      </p>
                    )}

                    {row?.original?.status === OrderStatus.REJECTED && (
                      <p className="font-semibold text-sm text-red">
                        Dibatalkan
                      </p>
                    )}
                  </TableCell>

                  <TableCell className="text-center">
                    {row?.original?.image ? (
                      <figure className="flex justify-center">
                        <Image
                          src={row.original.image || ''}
                          alt={row.original.id}
                          width={500}
                          height={500}
                          quality={100}
                          className="object-cover min-h-[110px] min-w-[70px] max-w-[70px] max-h-[110px] cursor-pointer"
                          onClick={() => setShowImageModal(row.original.image)}
                        />
                      </figure>
                    ) : (
                      <p className="font-semibold">Pembayaran Cash</p>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
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
    </Fragment>
  );
};
