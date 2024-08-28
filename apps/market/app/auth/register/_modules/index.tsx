'use client';
import { Alert, ControlledTextField, FormAuth, FormAuthFooter } from '@pkm/ui';
import { FC, Fragment, ReactElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  RegisterSchemaMarket,
  TRegisterSchemaMarket,
} from '@pkm/libs/entities';
import { register } from 'libs/auth/src/lib/market/util';

export const RegisterModule: FC = (): ReactElement => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<TRegisterSchemaMarket>({
    resolver: zodResolver(RegisterSchemaMarket),
    mode: 'all',
  });

  const [isSuccess, setIsSuccess] = useState(isSubmitSuccessful);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (data.password !== data.confirmPassword) {
        return setError('confirmPassword', {
          type: 'manual',
          message: 'Password tidak sama',
        });
      }

      await register(data.fullname, data.email, data.password);
    } catch (error) {
      if (error instanceof Error) {
        setError('root', {
          message: `${error.message}`,
        });
      }
    }
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      setIsSuccess(isSubmitSuccessful);
    }
  }, [isSubmitSuccessful]);

  return (
    <Fragment>
      <FormAuth
        title="Daftar Akun"
        buttonName="Daftar"
        onSubmit={onSubmit}
        buttonLoading={isSubmitting}
        footer={
          <FormAuthFooter
            title="Sudah punya akun"
            link="/auth/login"
            linkName="Login"
          />
        }
      >
        <fieldset className="w-full flex flex-col gap-6 font-montserrat">
          <ControlledTextField
            name="fullname"
            placeholder="Nama Lengkap"
            variant={
              errors?.fullname?.message
                ? 'error'
                : isSubmitSuccessful
                ? 'success'
                : 'default'
            }
            control={control}
            errorMessage={errors?.fullname?.message}
          />
          <ControlledTextField
            name="email"
            placeholder="Email"
            type="email"
            variant={
              errors?.email?.message
                ? 'error'
                : isSubmitSuccessful
                ? 'success'
                : 'default'
            }
            control={control}
            errorMessage={errors?.email?.message}
          />
          <ControlledTextField
            name="password"
            type="password"
            variant={
              errors?.password?.message
                ? 'error'
                : isSubmitSuccessful
                ? 'success'
                : 'default'
            }
            placeholder="Buat password"
            control={control}
            errorMessage={errors?.password?.message}
          />
          <ControlledTextField
            name="confirmPassword"
            variant={
              errors?.confirmPassword?.message
                ? 'error'
                : isSubmitSuccessful
                ? 'success'
                : 'default'
            }
            type="password"
            placeholder="Ulangi password"
            control={control}
            errorMessage={errors?.confirmPassword?.message}
          />
        </fieldset>
      </FormAuth>

      <Alert
        show={isSuccess}
        onHide={() => setIsSuccess(false)}
        message="Registrasi Berhasil"
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
