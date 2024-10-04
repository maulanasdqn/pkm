'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormAuth, ControlledTextField, Alert } from '@pkm/ui';
import Link from 'next/link';
import { FC, ReactElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginSchema, TLoginSchema } from '@pkm/libs/entities';
import { login } from '@pkm/libs/actions/tourism';

export const LoginModule: FC = (): ReactElement => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
  });
  const [isSuccess, setIsSuccess] = useState(isSubmitSuccessful);

  const onSubmit = async (data: TLoginSchema) => {
    try {
      await login(data);
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
      title="Masuk Akun"
      buttonName="Masuk"
      buttonLoading={isSubmitting}
    >
      <fieldset className="w-full flex flex-col gap-8 font-montserrat">
        <ControlledTextField
          placeholder="Email"
          name="email"
          control={control}
          errorMessage={errors.email?.message}
          variant={
            errors.email ? 'error' : isSubmitSuccessful ? 'success' : 'default'
          }
        />
        <div className="flex flex-col gap-2">
          <ControlledTextField
            type="password"
            placeholder="Password"
            name="password"
            control={control}
            errorMessage={errors.password?.message}
            variant={
              errors.password
                ? 'error'
                : isSubmitSuccessful
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
      <Alert
        show={isSuccess}
        onHide={() => setIsSuccess(false)}
        message="Login Berhasil"
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
