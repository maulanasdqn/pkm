'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormAuth, FormAuthFooter, ControlledTextField } from '@pkm/ui';
import Link from 'next/link';
import { FC, ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { LoginSchema, TLoginSchema } from '@pkm/libs/entities';
import { signIn } from 'next-auth/react';

export const LoginModule: FC = (): ReactElement => {
  const form = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
  });

  const onSubmit = (data: TLoginSchema) => {
    const { email, password } = data;
    signIn('login', { email, password });
  };

  return (
    <FormAuth
      onSubmit={form.handleSubmit(onSubmit)}
      title="Masuk Akun"
      buttonName="Masuk"
      footer={
        <FormAuthFooter
          title="Belum punya akun"
          link="/auth/register"
          linkName="Daftar"
        />
      }
    >
      <fieldset className="w-full flex flex-col gap-8 font-montserrat">
        <ControlledTextField
          placeholder="Email"
          name="email"
          control={form.control}
          errorMessage={form.formState.errors.email?.message}
          variant={
            form.formState.errors.email
              ? 'error'
              : form.formState.dirtyFields.email
              ? 'success'
              : 'default'
          }
        />
        <div className="flex flex-col gap-2">
          <ControlledTextField
            type="password"
            placeholder="Password"
            name="password"
            control={form.control}
            errorMessage={form.formState.errors.password?.message}
            variant={
              form.formState.errors.password
                ? 'error'
                : form.formState.dirtyFields.password
                ? 'success'
                : 'default'
            }
          />
          <Link
            href="/auth/forgot-password"
            className="text-xs text-neutral-60%"
          >
            Lupa password?
          </Link>
        </div>
      </fieldset>
    </FormAuth>
  );
};
