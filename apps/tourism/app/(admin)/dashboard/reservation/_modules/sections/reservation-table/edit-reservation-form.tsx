'use client';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Select,
  SelectOption,
  TextField,
} from '@pkm/ui';
import * as React from 'react';

const today = new Date();

export const EditReservationFormTrigger: React.FC = (): React.ReactElement => {
  const [qty, setQty] = React.useState<number>(0);
  const [date, setDate] = React.useState<Date | undefined>(today);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="capitalize" size="sm">
          edit
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 border-0 max-w-3xl bg-neutral-10% overflow-hidden">
        <DialogHeader className="p-5 pb-2.5">
          <DialogTitle className="text-2xl font-bold">
            Edit Reservasi
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 w-full h-[60dvh] border-y border-neutral-60% p-10 overflow-y-auto">
          <Select placeholder="Pilih Status">
            <SelectOption value="confirm">Dikonfirmasi</SelectOption>
            <SelectOption value="reschedule">Dijadwal ulang</SelectOption>
            <SelectOption value="cancel">Dibatalkan</SelectOption>
          </Select>
          <div className="grid grid-cols-5 gap-2">
            <p>Nama</p>
            <h2 className="col-span-4">
              <span className="mr-2">:</span> Aldo
            </h2>
          </div>
          <div className="grid grid-cols-5 gap-5">
            <p>Email</p>
            <h2 className="col-span-4">
              <span className="mr-2">:</span> Aldo@example.com
            </h2>
          </div>
          <div className="grid grid-cols-5 gap-5">
            <p>No Telp</p>
            <h2 className="col-span-4">
              <span className="mr-2">:</span> 0812345678
            </h2>
          </div>
          <div className="grid grid-cols-5 gap-5">
            <p>Destinasi</p>
            <h2 className="col-span-4">
              <span className="mr-2">:</span> Danau
            </h2>
          </div>
          <div className="grid grid-cols-5 gap-5 items-center">
            <p>Tanggal</p>
            <span className="flex items-center gap-2 col-span-4">
              <span>:</span>{' '}
              <DatePicker date={date} setDate={setDate} disableDayBeforeToday />
            </span>
          </div>
          <div className="grid grid-cols-5 gap-5 items-center">
            <p>Waktu</p>
            <span className="flex items-center gap-2 col-span-4">
              <span> : </span>
              <div className="max-w-12">
                <TextField
                  name="hour"
                  type="text"
                  dimension="lg"
                  placeholder="00"
                />
              </div>
              <span> : </span>
              <div className="max-w-12">
                <TextField
                  name="minute"
                  type="text"
                  dimension="lg"
                  placeholder="00"
                />
              </div>
            </span>
          </div>
          <div className="grid grid-cols-5 gap-5 items-center">
            <p>Jumlah</p>
            <span className="flex items-center gap-2 col-span-4">
              <span>:</span>{' '}
              <div className="flex gap-1 items-center">
                <Button
                  type="button"
                  variant="text"
                  size="icon"
                  color="black"
                  className="text-sm"
                  onClick={() => {
                    setQty((prev) => prev - 1);
                  }}
                  disabled={qty === 0}
                >
                  <MinusOutlined />
                </Button>
                <div className="max-w-20">
                  <TextField
                    name="qty"
                    type="text"
                    dimension="lg"
                    placeholder="00"
                    value={qty}
                    onChange={(e) => setQty(parseInt(e.target.value))}
                  />
                </div>
                <Button
                  type="button"
                  variant="text"
                  size="icon"
                  color="black"
                  className="text-sm"
                  onClick={() => {
                    setQty((prev) => prev + 1);
                  }}
                >
                  <PlusOutlined />
                </Button>
              </div>
            </span>
          </div>
        </div>
        <DialogFooter className="p-5 pt-2.5 justify-end">
          <Button type="button" variant="primary">
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
