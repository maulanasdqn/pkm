'use client';
import * as React from 'react';
import { TReservationSchema } from '@pkm/libs/entities';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@pkm/ui';
import { format } from 'date-fns';
import { id } from 'date-fns/locale/id';
import { ExclamationCircleOutlined } from '@ant-design/icons';

interface ReservationDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: TReservationSchema;
}
export const ReservationDialog: React.FC<ReservationDialogProps> = ({
  isOpen,
  setIsOpen,
  data,
}): React.ReactElement => {
  const status = () => {
    if (data?.status === 'confirmed') {
      return 'dikonfirmasi';
    } else if (data?.status === 'reschedule') {
      return 'dijadwal ulang';
    } else {
      return 'dibatalkan';
    }
  };
  if (!data)
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="p-0 border-0 w-full max-w-md bg-neutral-10% overflow-hidden">
          <DialogHeader className="p-5 pb-2.5">
            <DialogTitle className="text-2xl font-bold">
              Detail Reservasi Anda Tidak Ditemukan
            </DialogTitle>
            <DialogDescription className="sr-only">
              Reservation detail
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-5 w-full border-y border-neutral-60% px-5 py-10 overflow-y-auto">
            <p>
              Data tidak ditemukan, silahkan coba cek ulang informasi yang
              diberikan.
            </p>
          </div>
          <DialogFooter className="p-5 pt-2.5 justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary" color="black">
                Tutup
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-0 border-0 w-full h-[85dvh] max-w-md bg-neutral-10% overflow-hidden">
        <DialogHeader className="p-5 pb-2.5">
          <DialogTitle className="text-2xl font-bold">
            Detail Reservasi Anda
          </DialogTitle>
          <DialogDescription className="sr-only">
            Reservation detail
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-5 w-full border-y border-neutral-60% px-5 py-10 overflow-y-auto">
          <div>
            <h1 className="text-lg font-bold">Data Pengunjung</h1>
            <p>Nama : {data?.name}</p>
            <p>Email : {data?.email}</p>
            <p>Nomor Telepon: {data?.phoneNumber}</p>
          </div>
          <div>
            <h1 className="text-lg font-bold">Reservasi</h1>
            <p>Destinasi : {data?.destination?.name}</p>
            <p>
              Tanggal : {format(data?.date, 'dd MMMM yyyy', { locale: id })}
            </p>
            <p>Jam : {data.time} WIB</p>
            <p>Jumlah tiket : {data.quantity}</p>
            <p>Status : {status()}</p>
            <p>
              Total :{' '}
              <span className="text-2xl font-semibold">{data.total}</span>{' '}
            </p>
          </div>
          <div className="flex p-5 gap-3 rounded-lg border border-neutral-60% bg-white shadow-md">
            <ExclamationCircleOutlined className="text-lg shrink-0" />
            <div className="flex flex-col text-sm md:text-base">
              <span>Pembayaran tiket dilakukan secara on-site,</span>
              <span>
                Jika anda ingin mengubah jadwal reservasi, harap hubungi
                customer service kami untuk mengubah jadwal reservasi anda.
              </span>
              <span>CS : +6282123456789 {`(WhatsApp)`}</span>
            </div>
          </div>
        </div>
        <DialogFooter className="p-5 pt-2.5 justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary" color="black">
              Tutup
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
