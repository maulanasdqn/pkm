'use client';
import Link from 'next/link';
import { FC, ReactElement, useEffect, useState } from 'react';
import { Alert, Button, ControlledTextField } from '@pkm/ui';
import { cn } from '@pkm/libs/clsx';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  checkReservationSchema,
  TCheckReservationSchema,
  TReservationSchema,
} from '@pkm/libs/entities';
import { getOneReservationByName } from '@pkm/libs/actions/tourism';
import { ReservationDialog } from './reservation-dialog';

export const CekReservationSection: FC<{ className?: string }> = ({
  className,
}): ReactElement => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<TCheckReservationSchema>({
    resolver: zodResolver(checkReservationSchema),
    defaultValues: {
      email: '',
      name: '',
      phoneNumber: '',
    },
  });
  const [isSuccess, setIsSuccess] = useState(isSubmitSuccessful);
  const [reservationData, setReservationData] =
    useState<TReservationSchema | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSubmit = async ({
    name,
    email,
    phoneNumber,
  }: TCheckReservationSchema) => {
    try {
      const { data } = await getOneReservationByName(name, email, phoneNumber);
      setReservationData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      setIsSuccess(isSubmitSuccessful);
    }
  }, [isSubmitSuccessful]);
  return (
    <section className={cn('container mx-auto space-y-8 lg:px-40', className)}>
      <div className="flex p-5 gap-3 rounded-lg border border-neutral-60% bg-white shadow-md">
        <ExclamationCircleOutlined className="text-xl shrink-0" />
        <div className="flex flex-col text-sm md:text-base">
          <span>Pastikan anda telah memesan reservasi terlebih dahulu!</span>
          <span>
            jika anda belum memesan reservasi, silahkan{' '}
            <Link
              href="/tours"
              className="underline hover:text-primary transition-colors duration-200"
            >
              klik disini
            </Link>{' '}
            untuk menuju ke halaman destinasi.
          </span>
        </div>
      </div>
      <div className="rounded-lg w-full flex flex-col p-5 gap-8 border border-neutral-60% shadow-md bg-white">
        <h1 className="text-xl md:text-2xl font-semibold">
          Form Cek Reservasi
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
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
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting ? true : false}
          >
            Cek Reservasi
          </Button>
        </form>
      </div>
      <ReservationDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        data={reservationData as TReservationSchema}
      />
      <Alert
        show={isSuccess}
        onHide={() => setIsSuccess(false)}
        message="Cek reservasi berhasil"
        variant="success"
        timer={3000}
      />
    </section>
  );
};
