'use client';
import { FormAuth, FormAuthFooter, ControlledTextField, Alert } from '@pkm/ui';
import { FC, ReactElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, TRegisterSchema } from '@pkm/libs/entities';
import { register } from '@pkm/libs/actions/tourism';

export const RegisterModule: FC = (): ReactElement => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'all',
  });
  const [isSuccess, setIsSuccess] = useState(isSubmitSuccessful);

  const onSubmit = async (data: TRegisterSchema) => {
    if (data.password !== data.confirmPassword) {
      return setError('confirmPassword', {
        type: 'manual',
        message: 'Password tidak sama',
      });
    }
    const { email, fullname, password } = data;
    try {
      await register(fullname, email, password);
    } catch (error) {
      console.error(error);
      setError('root', {
        type: 'alert',
        message: `${error}`,
      });
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      setIsSuccess(isSubmitSuccessful);
    }
  }, [isSubmitSuccessful]);

  return (
    <FormAuth
      onSubmit={handleSubmit(onSubmit)}
      title="Daftar Akun"
      buttonName="Daftar"
      buttonLoading={isSubmitting}
      footer={
        <FormAuthFooter
          title="Sudah punya akun"
          link="/auth/login"
          linkName="Login"
        />
      }
    >
      <fieldset className="w-full flex flex-col gap-3 font-montserrat">
        <ControlledTextField
          placeholder="Nama Lengkap"
          name="fullname"
          errorMessage={errors.fullname?.message}
          variant={
            errors.fullname || errors.root
              ? 'error'
              : isSubmitSuccessful
              ? 'success'
              : 'default'
          }
          control={control}
        />
        <ControlledTextField
          placeholder="Email"
          name="email"
          errorMessage={errors.email?.message}
          variant={
            errors.email || errors.root
              ? 'error'
              : isSubmitSuccessful
              ? 'success'
              : 'default'
          }
          control={control}
        />
        <ControlledTextField
          type="password"
          placeholder="Buat password"
          name="password"
          errorMessage={errors.password?.message}
          variant={
            errors.password || errors.root
              ? 'error'
              : isSubmitSuccessful
              ? 'success'
              : 'default'
          }
          control={control}
        />
        <ControlledTextField
          type="password"
          placeholder="Ulangi password"
          name="confirmPassword"
          errorMessage={errors.confirmPassword?.message}
          variant={
            errors.confirmPassword || errors.root
              ? 'error'
              : isSubmitSuccessful
              ? 'success'
              : 'default'
          }
          control={control}
        />
      </fieldset>
      <Alert
        show={isSuccess}
        onHide={() => setIsSuccess(false)}
        message="Registrasi Berhasil"
        variant="success"
        timer={3000}
      />
      <Alert
        show={errors.root?.type === 'alert' ? true : false}
        onHide={() =>
          setError('root', {
            type: '',
            message: '',
          })
        }
        message={errors.root?.message as string}
        variant="error"
        timer={3000}
      />
    </FormAuth>
  );
};
