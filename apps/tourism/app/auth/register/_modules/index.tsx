'use client';
import { FormAuth, FormAuthFooter, ControlledTextField } from '@pkm/ui';
import { FC, ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, TRegisterSchema } from '@pkm/libs/entities';
import { register } from 'libs/auth/src/lib/tourism/util';
// import { register } from '@pkm/libs/auth/tourism';
// import { registerTourism } from '@pkm/libs/auth';

export const RegisterModule: FC = (): ReactElement => {
  const form = useForm<TRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'all',
  });

  const onSubmit = (data: TRegisterSchema) => {
    const { email, fullname, password } = data;
    // return registerTourism(fullname, email, password);
    register(fullname, email, password);
  };

  return (
    <FormAuth
      onSubmit={form.handleSubmit(onSubmit)}
      title="Daftar Akun"
      buttonName="Daftar"
      footer={
        <FormAuthFooter
          title="Sudah punya akun"
          link="/auth/login"
          linkName="Login"
        />
      }
    >
      <fieldset className="w-full flex flex-col gap-4 font-montserrat">
        <ControlledTextField
          placeholder="Nama Lengkap"
          name="fullname"
          errorMessage={form.formState.errors.fullname?.message}
          variant={
            form.formState.errors.fullname
              ? 'error'
              : form.formState.dirtyFields.fullname
              ? 'success'
              : 'default'
          }
          control={form.control}
        />
        <ControlledTextField
          placeholder="Email"
          name="email"
          errorMessage={form.formState.errors.email?.message}
          variant={
            form.formState.errors.email
              ? 'error'
              : form.formState.dirtyFields.email
              ? 'success'
              : 'default'
          }
          control={form.control}
        />
        <ControlledTextField
          type="password"
          placeholder="Buat password"
          name="password"
          errorMessage={form.formState.errors.password?.message}
          variant={
            form.formState.errors.password
              ? 'error'
              : form.formState.dirtyFields.password
              ? 'success'
              : 'default'
          }
          control={form.control}
        />
        <ControlledTextField
          type="password"
          placeholder="Ulangi password"
          name="confirmPassword"
          errorMessage={form.formState.errors.confirmPassword?.message}
          variant={
            form.formState.errors.confirmPassword
              ? 'error'
              : form.formState.dirtyFields.confirmPassword
              ? 'success'
              : 'default'
          }
          control={form.control}
        />
      </fieldset>
    </FormAuth>
  );
};
