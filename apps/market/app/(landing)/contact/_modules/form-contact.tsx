'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { createMessage } from '@pkm/libs/actions/market';
import { createMessageSchema, TCreateMessage } from '@pkm/libs/entities';
import {
  Alert,
  Button,
  ControlledTextarea,
  ControlledTextField,
} from '@pkm/ui';
import { useSession } from 'next-auth/react';
import { FC, Fragment, ReactElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export const FormContact: FC = (): ReactElement => {
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<TCreateMessage>({
    mode: 'all',
    resolver: zodResolver(createMessageSchema),
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const { data: session, status } = useSession();

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (status === 'unauthenticated') {
        await createMessage(data);
        setIsSuccess(true);
        reset({
          sender: '',
          email: '',
          message: '',
        });
      } else if (status === 'authenticated') {
        await createMessage({
          ...data,
          sender: session.user?.fullname as string,
          email: session.user?.email as string,
        });

        setIsSuccess(true);
        reset({
          sender: '',
          email: '',
          message: '',
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        setError('root', {
          message: `${error.message}`,
        });
      }
    }
  });

  useEffect(() => {
    reset({
      sender: session?.user?.fullname as string,
      email: session?.user?.email as string,
    });
  }, [reset, session?.user?.email, session?.user?.fullname]);

  return (
    <Fragment>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-8 2xl:w-[70%] md:w-[80%]"
      >
        {status === 'unauthenticated' && (
          <Fragment>
            <ControlledTextField
              name="sender"
              control={control}
              placeholder="Nama"
              className="bg-neutral-10%"
              errorMessage={errors.sender?.message as string}
              variant={
                errors.sender?.message
                  ? 'error'
                  : isSubmitSuccessful
                  ? 'success'
                  : 'default'
              }
            />
            <ControlledTextField
              name="email"
              control={control}
              placeholder="Email"
              className="bg-neutral-10%"
              errorMessage={errors.email?.message as string}
              variant={
                errors.email?.message
                  ? 'error'
                  : isSubmitSuccessful
                  ? 'success'
                  : 'default'
              }
            />
          </Fragment>
        )}

        <ControlledTextarea
          name="message"
          control={control}
          placeholder="Pesan"
          rows={5}
          className="bg-neutral-10%"
          errorMessage={errors.message?.message as string}
          variant={
            errors.message?.message
              ? 'error'
              : isSubmitSuccessful
              ? 'success'
              : 'default'
          }
        />

        <Button type="submit" isLoading={isSubmitting}>
          Kirim
        </Button>
      </form>

      <Alert
        show={isSuccess}
        onHide={() => setIsSuccess(false)}
        message="Pesan Anda Terkirim"
        variant="success"
        timer={3000}
      />

      <Alert
        show={!!errors?.root?.message}
        onHide={() => setError('root', { message: '' })}
        message={errors?.root?.message as string}
        variant="error"
        timer={3000}
      />
    </Fragment>
  );
};
