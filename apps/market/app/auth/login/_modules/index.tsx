'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Login } from '@pkm/libs/actions/market';
import { LoginSchemaMarket, TLoginSchemaMarket } from '@pkm/libs/entities';
import { Alert, ControlledTextField, FormAuth, FormAuthFooter } from '@pkm/ui';
import Link from 'next/link';
import { FC, Fragment, ReactElement } from 'react';
import { useForm } from 'react-hook-form';

export const LoginModule: FC = (): ReactElement => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TLoginSchemaMarket>({
    mode: 'all',
    resolver: zodResolver(LoginSchemaMarket),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await Login(data);

      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    } catch (error) {
      setError('root', {
        message: `${error}`,
      });
    }
  });

  return (
    <Fragment>
      <FormAuth
        title="Masuk Akun"
        buttonName="Masuk"
        onSubmit={onSubmit}
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
            name="email"
            placeholder="Email"
            control={control}
            errorMessage={errors?.email?.message}
            variant={errors?.email ? 'error' : 'default'}
          />
          <div className="flex flex-col gap-2">
            <ControlledTextField
              name="password"
              type="password"
              placeholder="Password"
              control={control}
              errorMessage={errors?.password?.message}
              variant={errors?.password ? 'error' : 'default'}
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

      <Alert
        variant="error"
        message={errors?.root?.message as string}
        show={!!errors?.root?.message}
        onHide={() => setError('root', { message: '' })}
        timer={3000}
      />
    </Fragment>
  );
};
