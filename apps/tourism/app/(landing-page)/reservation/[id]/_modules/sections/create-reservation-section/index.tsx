'use client';
import { FC, ReactElement, useEffect, useState } from 'react';
import {
  Alert,
  Button,
  ControlledTextField,
  DatePicker,
  TextField,
} from '@pkm/ui';
import { cn } from '@pkm/libs/clsx';
import Image from 'next/image';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createReservationSchema,
  TCreateReservationSchema,
} from '@pkm/libs/entities';
import { createReservation } from '@pkm/libs/actions/tourism';
import { useRouter } from 'next/navigation';

interface CreateReservationSectionProps {
  className?: string;
  dataDestination: {
    id: string;
    name: string;
    description: string;
    ticketPrice: number;
  };
}

export const CreateReservationSection: FC<CreateReservationSectionProps> = ({
  className,
  dataDestination,
}): ReactElement => {
  const router = useRouter();
  const [qty, setQty] = useState<number>(0);
  const [date, setDate] = useState<Date | undefined>();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitSuccessful },
  } = useForm<TCreateReservationSchema>({
    resolver: zodResolver(createReservationSchema),
    defaultValues: {
      name: '',
      phoneNumber: '',
      email: '',
      quantity: 0,
      time: '',
      total: 0,
    },
    mode: 'all',
  });

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (values: TCreateReservationSchema) => {
    try {
      await createReservation({
        ...values,
        date: date as Date,
        total: qty * dataDestination.ticketPrice,
        quantity: qty,
      });
    } catch (error) {
      console.error(error);
      router.refresh();
    } finally {
      setIsLoading(false);
      router.push('/');
    }
  };

  useEffect(() => {
    setValue('date', new Date());
    setValue('destinationId', dataDestination.id);
    setValue('status', 'confirmed');
    if (isSubmitSuccessful) {
      setIsSuccess(isSubmitSuccessful);
    }
  }, [isSubmitSuccessful, dataDestination, setValue]);
  return (
    <section
      className={cn(
        'container mx-auto lg:px-20 flex flex-col md:flex-row gap-7',
        className
      )}
    >
      <div className="rounded-lg w-full flex flex-col p-5 gap-8 border border-neutral-60% shadow-md bg-white">
        <Image
          src="/images/lake.png"
          alt="danau"
          width={250}
          height={250}
          className="max-h-[40dvh] aspect-auto w-full"
          priority
        />
        <div className="space-y-1 md:space-y-3">
          <h1 className="text-xl md:text-2xl lg:text-3xl">
            {dataDestination.name}
          </h1>
          <h2 className="text-base md:text-lg lg:text-xl">
            {dataDestination.description}
          </h2>
        </div>
        <div className="border-t-2 space-y-3 pt-8 border-neutral-50%">
          <h3 className="text-base md:text-lg lg:text-xl">Harga Tiket</h3>
          <h4 className="text-xl md:text-2xl lg:text-3xl text-primary-60%">
            Rp. {qty * dataDestination.ticketPrice}
          </h4>
        </div>
      </div>
      <div className="rounded-lg w-full flex flex-col items-center justify-center p-5 gap-8 border border-neutral-60% shadow-md bg-white">
        <h1 className="text-2xl font-bold">Isi detail reservasi</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
          <div className="flex gap-3 items-center">
            <span>Tanggal : </span>
            <DatePicker date={date} setDate={setDate} disableDayBeforeToday />
          </div>
          <div className="flex gap-3 items-center">
            <span>Pukul : </span>
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
          <ControlledTextField
            name="name"
            type="text"
            dimension="lg"
            placeholder="Masukkan Nama"
            control={control}
            errorMessage={errors.name?.message}
            variant={
              errors.name ? 'error' : isSubmitSuccessful ? 'success' : 'default'
            }
          />
          <ControlledTextField
            name="email"
            type="email"
            dimension="lg"
            placeholder="Masukkan Email"
            control={control}
            errorMessage={errors.email?.message}
            variant={
              errors.email
                ? 'error'
                : isSubmitSuccessful
                ? 'success'
                : 'default'
            }
          />
          <ControlledTextField
            name="phoneNumber"
            type="text"
            dimension="lg"
            placeholder="Nomor Telepon"
            control={control}
            errorMessage={errors.phoneNumber?.message}
            variant={
              errors.phoneNumber
                ? 'error'
                : isSubmitSuccessful
                ? 'success'
                : 'default'
            }
          />
          <div className="flex justify-between">
            <div className="flex gap-1 items-center">
              <p>Jumlah :</p>
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
                <div className="max-w-20 md:max-w-40">
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
            </div>
            <Button type="submit" disabled={isLoading ? true : false}>
              Pesan Tiket
            </Button>
          </div>
        </form>
      </div>
      <Alert
        show={isSuccess}
        onHide={() => setIsSuccess(false)}
        message="Reservasi telah dibuat, Terimakasih telah memesan tiket di kami!"
        variant="success"
        timer={3000}
      />
    </section>
  );
};
