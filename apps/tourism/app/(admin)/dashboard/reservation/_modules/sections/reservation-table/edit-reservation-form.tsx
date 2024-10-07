'use client';
import * as React from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Alert,
  Button,
  ControlledSelect,
  ControlledTextField,
  DatePicker,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  SelectOption,
  TextField,
} from '@pkm/ui';
import { TReservationForm } from './type';
import {
  getOneReservation,
  updateReservation,
} from '@pkm/libs/actions/tourism';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TReservationSchema,
  TUpdateReservationSchema,
  updateReservationSchema,
} from '@pkm/libs/entities';

const today = new Date();

const reservationDataEmpty: TReservationSchema = {
  id: '',
  name: '',
  email: '',
  phoneNumber: '',
  date: new Date(),
  time: '',
  quantity: 0,
  status: '',
  total: 0,
  destination: {
    id: '',
    name: '',
  },
};

export const EditReservationFormTrigger: React.FC<TReservationForm> = ({
  id,
}): React.ReactElement => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<TUpdateReservationSchema>({
    resolver: zodResolver(updateReservationSchema),
    defaultValues: {
      quantity: 0,
      time: '',
    },
    mode: 'all',
  });
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [reservationData, setReservationData] =
    React.useState(reservationDataEmpty);

  const [qty, setQty] = React.useState<number>(0);
  const [date, setDate] = React.useState<Date | undefined>(today);

  const onSubmit = async (values: TUpdateReservationSchema) => {
    try {
      await updateReservation({
        ...values,
        id,
        date: date as Date,
        quantity: qty,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    }
  };

  const fetchData = React.useCallback(async () => {
    if (!id) return;
    const { data } = await getOneReservation(id);

    if (data) {
      setDate(data.date);
      setReservationData({
        id: data.id,
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        date: data.date,
        time: data.time,
        quantity: data.quantity,
        status: data.status,
        total: data.total,
        destination: {
          id: data.destination?.id as string,
          name: data.destination?.name as string,
        },
      });
      setQty(data.quantity);

      setValue('id', data.id);
      setValue('name', data.name);
      setValue('email', data.email);
      setValue('phoneNumber', data.phoneNumber);
      setValue('date', data.date);
      setValue('time', data.time);
      setValue('quantity', data.quantity);
      setValue('status', data.status);
      setValue('total', data.total);
      setValue('destinationId', data.destination?.id as string);
    }
  }, [id, setValue]);

  console.log(errors);
  React.useEffect(() => {
    if (isSubmitSuccessful) {
      setIsSuccess(isSubmitSuccessful);
    }
  }, [isSubmitSuccessful]);

  React.useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [fetchData, id]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            <DialogDescription className="sr-only">
              Edit Reservasi Form
            </DialogDescription>
          </DialogHeader>
          <form
            id="form-reservation"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 w-full h-[60dvh] border-y border-neutral-60% p-10 overflow-y-auto"
          >
            <ControlledSelect
              name="status"
              placeholder="Pilih Status"
              control={control}
              errorMessage={errors.status?.message}
              variant={
                errors.status
                  ? 'error'
                  : isSubmitSuccessful
                  ? 'success'
                  : 'default'
              }
            >
              <SelectOption value="confirmed">Dikonfirmasi</SelectOption>
              <SelectOption value="reschedule">Dijadwal ulang</SelectOption>
              <SelectOption value="canceled">Dibatalkan</SelectOption>
            </ControlledSelect>
            <div className="grid grid-cols-5 gap-2">
              <p>Nama</p>
              <h2 className="col-span-4">
                <span className="mr-2">:</span> {reservationData.name}
              </h2>
            </div>
            <div className="grid grid-cols-5 gap-5">
              <p>Email</p>
              <h2 className="col-span-4">
                <span className="mr-2">:</span> {reservationData.email}
              </h2>
            </div>
            <div className="grid grid-cols-5 gap-5">
              <p>No Telp</p>
              <h2 className="col-span-4">
                <span className="mr-2">:</span> {reservationData.phoneNumber}
              </h2>
            </div>
            <div className="grid grid-cols-5 gap-5">
              <p>Destinasi</p>
              <h2 className="col-span-4">
                <span className="mr-2">:</span>{' '}
                {reservationData.destination?.name}
              </h2>
            </div>
            <div className="grid grid-cols-5 gap-5 items-center">
              <p>Tanggal</p>
              <span className="flex items-center gap-2 col-span-4">
                <span>:</span>{' '}
                <DatePicker
                  date={date}
                  setDate={setDate}
                  disableDayBeforeToday
                />
              </span>
            </div>
            <div className="grid grid-cols-5 gap-5 items-center">
              <p>Waktu</p>
              <span className="flex items-center gap-2 col-span-4">
                <span> : </span>
                <div>
                  <ControlledTextField
                    control={control}
                    name="time"
                    type="time"
                    placeholder="00"
                    variant={
                      errors.time
                        ? 'error'
                        : isSubmitSuccessful
                        ? 'success'
                        : 'default'
                    }
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
                      name="quantity"
                      type="number"
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
            <div className="grid grid-cols-5 gap-2">
              <p>Total harga:</p>
              <h2 className="col-span-4">
                <span className="mr-2">:</span> {reservationData.total}
              </h2>
            </div>
          </form>
          <DialogFooter className="p-5 pt-2.5 justify-end">
            <Button
              form="form-reservation"
              type="submit"
              variant="primary"
              disabled={isLoading ? true : false}
            >
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Alert
        show={isSuccess}
        onHide={() => setIsSuccess(false)}
        message={id ? 'Data berhasil diubah' : 'Data berhasil ditambahkan'}
        variant="success"
        timer={3000}
      />
    </>
  );
};
