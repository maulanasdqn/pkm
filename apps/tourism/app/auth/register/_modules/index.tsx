'use client';
import { FormAuth, FormAuthFooter, ControlledTextField } from '@pkm/ui';
import { FC, ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import * as z from 'zod';
import { registerTourism } from '@pkm/libs/auth';

const RegisterSchema = z.object({
  fullname: z.string().min(1, {
    message: 'fullname is required!',
  }),
  email: z.string().email({
    message: 'email is required!',
  }),
  password: z.string().min(6, {
    message: 'password must be at least 6 characters!',
  }),
  confirmPassword: z.string().min(6, {
    message: 'confirm password must be at least 6 characters!',
  }),
});

type TRegisterSchema = z.infer<typeof RegisterSchema>;

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
    return registerTourism(fullname, email, password);
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
          {...form.register('fullname')}
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
          {...form.register('email')}
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
          {...form.register('password')}
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
          {...form.register('confirmPassword')}
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
